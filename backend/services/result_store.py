import json
import os
from pathlib import Path


BACKEND_DIR = Path(__file__).resolve().parents[1]
RESULTS_DIR = BACKEND_DIR / "results"


def _result_path(company: str):
    return RESULTS_DIR / f"{company}.json"


def load_company_result(company: str):
    path = _result_path(company)

    if not os.path.exists(path):
        return None

    with open(path, mode="r", encoding="utf-8") as file:
        return json.load(file)


def list_companies():
    if not os.path.isdir(RESULTS_DIR):
        return []

    companies = []

    for filename in sorted(os.listdir(RESULTS_DIR)):
        if not filename.endswith(".json"):
            continue

        company = filename[:-5]
        result = load_company_result(company) or {}
        leadership = result.get("leadership", {})
        market = result.get("market", {})

        companies.append({
            "company": company,
            "industry": market.get("industry", ""),
            "ceo": leadership.get("ceo", "")
        })

    return companies
