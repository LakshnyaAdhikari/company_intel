import json
import os
import re
from pathlib import Path
from urllib.parse import urlparse

from backend.services.agents import run_company_analysis
from backend.services.crawler import get_internal_links
from backend.services.storage import save_to_csv
from backend.services.extractor import extract_page_text


BACKEND_DIR = Path(__file__).resolve().parents[1]
RESULTS_DIR = BACKEND_DIR / "results"


AGENT_NAMES = [
    "leadership",
    "services",
    "legal",
    "technology",
    "market",
    "contact"
]


class AnalysisCancelled(Exception):
    pass


class NoContentExtracted(ValueError):
    pass


def _raise_if_cancelled(should_cancel):
    if should_cancel and should_cancel():
        raise AnalysisCancelled("Analysis was cancelled")


def _prepare_crewai_storage():
    storage_dir = os.path.abspath(BACKEND_DIR / ".crewai_storage")
    os.makedirs(storage_dir, exist_ok=True)
    os.environ.setdefault("CREWAI_STORAGE_DIR", storage_dir)


def _validate_max_pages(max_pages):
    if max_pages < 1:
        raise ValueError("max_pages must be at least 1")

    if max_pages > 30:
        raise ValueError("max_pages cannot exceed the hard limit of 30")

    return max_pages


def _parse_agent_output(value):
    if isinstance(value, dict):
        return value

    if not value:
        return {}

    try:
        parsed = json.loads(value)
    except json.JSONDecodeError:
        return {"raw": value}

    return parsed if isinstance(parsed, dict) else {"value": parsed}


def _to_csv_result(structured_result):
    return {
        agent_name: json.dumps(
            structured_result.get(agent_name, {}),
            ensure_ascii=False,
            indent=2
        )
        for agent_name in AGENT_NAMES
    }


def _company_slug(company_url):
    parsed_url = urlparse(company_url)
    domain = parsed_url.netloc or parsed_url.path
    domain = domain.lower().replace("www.", "")
    domain = domain.split(":")[0]
    slug = domain.split(".")[0]
    slug = re.sub(r"[^a-z0-9]+", "_", slug).strip("_")
    return slug or "company"


def get_company_slug(company_url: str):
    return _company_slug(company_url)


def get_results_path(company_url: str):
    return f"backend/results/{get_company_slug(company_url)}.json"


def get_results_file_path(company_url: str):
    return RESULTS_DIR / f"{get_company_slug(company_url)}.json"


def _save_json_result(company_url, structured_result):
    RESULTS_DIR.mkdir(parents=True, exist_ok=True)
    output_path = get_results_file_path(company_url)

    with open(output_path, mode="w", encoding="utf-8") as file:
        json.dump(structured_result, file, ensure_ascii=False, indent=2)

    print(f"Structured JSON saved to {get_results_path(company_url)}")


def analyze_company(
    company_url: str,
    max_pages: int = 10,
    selected_agents: list[str] | None = None,
    should_cancel=None,
    progress_callback=None
):
    """
    Crawl a company website, run selected intelligence agents, save outputs,
    and return structured JSON-ready analysis.

    Recommended max_pages range: 5-20. Hard limit: 30.
    """
    max_pages = _validate_max_pages(max_pages)

    if selected_agents is not None:
        if not selected_agents:
            raise ValueError("selected_agents must include at least one agent")

        invalid_agent_names = set(selected_agents) - set(AGENT_NAMES)
        if invalid_agent_names:
            raise ValueError(
                f"Invalid selected_agents: {sorted(invalid_agent_names)}. "
                f"Choose from: {AGENT_NAMES}"
            )

    def update_progress(step):
        if progress_callback:
            progress_callback(step)

    _raise_if_cancelled(should_cancel)
    update_progress("Validating URL")

    print("\n Crawling company website...\n")
    update_progress("Crawling")
    links = get_internal_links(
        company_url,
        max_pages=max_pages,
        should_cancel=should_cancel
    )

    print("Total links found:", len(links))
    print("Links:", links[:10])

    print(" Extracting and aggregating content...\n")
    update_progress("Extraction")
    selected_links = links[:max_pages]
    print(f" Selected {len(selected_links)} links for aggregation.\n")
    company_content = ""

    for link in selected_links:
        _raise_if_cancelled(should_cancel)
        print(f"Extracting: {link}")

        page_text = extract_page_text(link)

        print(f"Extracted chars from {link}: {len(page_text)}")

        if page_text:
            company_content += f"\n\n--- PAGE: {link} ---\n"
            company_content += page_text

    print("Total aggregated chars:", len(company_content))
    print(company_content[:1000])

    if len(company_content.strip()) == 0:
        print("No content extracted from website.")
        raise NoContentExtracted("No content extracted from website.")

    _raise_if_cancelled(should_cancel)
    print("\n Running AI agents...\n")
    update_progress("AI Analysis")
    _prepare_crewai_storage()
    raw_result = run_company_analysis(
        company_content,
        selected_agents=selected_agents,
        should_cancel=should_cancel
    )

    _raise_if_cancelled(should_cancel)
    structured_result = {
        agent_name: _parse_agent_output(raw_result.get(agent_name, "{}"))
        for agent_name in AGENT_NAMES
    }

    update_progress("Export")
    save_to_csv(company_url, _to_csv_result(structured_result))
    _save_json_result(company_url, structured_result)

    print("\n FINAL COMPANY ANALYSIS:\n")
    print(structured_result)

    update_progress("Complete")
    return structured_result
