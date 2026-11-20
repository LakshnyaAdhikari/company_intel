import argparse
import json
import os

from dotenv import load_dotenv

from backend.services.analysis_service import NoContentExtracted, analyze_company


def main():
    load_dotenv()

    api_key = os.getenv("AZURE_OPENAI_API_KEY")
    if not api_key:
        raise ValueError("AZURE_OPENAI_API_KEY not found in .env file")

    parser = argparse.ArgumentParser(
        description="Run company intelligence analysis."
    )
    parser.add_argument("company_url", help="Company website URL to analyze")
    parser.add_argument(
        "--max-pages",
        type=int,
        default=10,
        help="Pages to crawl and aggregate. Recommended: 5-20. Hard limit: 30."
    )
    parser.add_argument(
        "--agents",
        nargs="+",
        default=None,
        help=(
            "Optional agents to run: leadership services legal technology "
            "market contact"
        )
    )

    args = parser.parse_args()
    try:
        result = analyze_company(
            args.company_url,
            max_pages=args.max_pages,
            selected_agents=args.agents
        )
    except NoContentExtracted:
        raise SystemExit(1)

    print(json.dumps(result, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
