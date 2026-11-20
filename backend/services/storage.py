import csv
import os
from pathlib import Path


BACKEND_DIR = Path(__file__).resolve().parents[1]
CSV_PATH = BACKEND_DIR / "company_analysis.csv"


def save_to_csv(company_url, analysis_result):
    file_exists = os.path.isfile(CSV_PATH)

    with open(CSV_PATH, mode="a", newline="", encoding="utf-8") as file:
        writer = csv.writer(file)

        # write header only once
        if not file_exists:
            writer.writerow([
                "Company URL",
                "Leadership",
                "Services",
                "Legal",
                "Technology",
                "Market",
                "Contact"
            ])

        writer.writerow([
            company_url,
            analysis_result.get("leadership", ""),
            analysis_result.get("services", ""),
            analysis_result.get("legal", ""),
            analysis_result.get("technology", ""),
            analysis_result.get("market", ""),
            analysis_result.get("contact", "")
        ])

    print("Results saved to backend/company_analysis.csv")
