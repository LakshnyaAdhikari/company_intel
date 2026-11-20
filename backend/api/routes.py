from pathlib import Path

from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse

from backend.api.schemas import (
    AnalysisRunResponse,
    AnalyzeRequest,
    AnalyzeResponse
)
from backend.services.analysis_service import (
    analyze_company,
    get_company_slug,
    get_results_path
)
from backend.services.result_store import list_companies, load_company_result
from backend.services.run_manager import (
    cancel_analysis_run,
    get_analysis_run,
    start_analysis_run
)


router = APIRouter()
BACKEND_DIR = Path(__file__).resolve().parents[1]


@router.get("/health")
def health():
    return {"status": "healthy"}


@router.post("/analyze", response_model=AnalyzeResponse)
def analyze(request: AnalyzeRequest):
    try:
        analyze_company(
            request.company_url,
            max_pages=request.max_pages,
            selected_agents=request.selected_agents
        )
    except ValueError as error:
        raise HTTPException(status_code=400, detail=str(error)) from error

    return {
        "status": "success",
        "company": get_company_slug(request.company_url),
        "results_path": get_results_path(request.company_url)
    }


@router.post("/analysis-runs", response_model=AnalysisRunResponse)
def create_analysis_run(request: AnalyzeRequest):
    try:
        return start_analysis_run(
            request.company_url,
            max_pages=request.max_pages,
            selected_agents=request.selected_agents
        )
    except ValueError as error:
        raise HTTPException(status_code=400, detail=str(error)) from error


@router.get("/analysis-runs/{run_id}", response_model=AnalysisRunResponse)
def get_run(run_id: str):
    run = get_analysis_run(run_id)

    if run is None:
        raise HTTPException(status_code=404, detail=f"Run not found: {run_id}")

    return run


@router.post("/analysis-runs/{run_id}/cancel", response_model=AnalysisRunResponse)
def cancel_run(run_id: str):
    run = cancel_analysis_run(run_id)

    if run is None:
        raise HTTPException(status_code=404, detail=f"Run not found: {run_id}")

    return run


@router.get("/results/{company}")
def get_results(company: str):
    result = load_company_result(company)

    if result is None:
        raise HTTPException(
            status_code=404,
            detail=f"No stored results found for company: {company}"
        )

    return result


@router.get("/companies")
def get_companies():
    return list_companies()


@router.get("/download/company-analysis.csv")
def download_company_analysis_csv():
    csv_path = BACKEND_DIR / "company_analysis.csv"

    if not csv_path.exists():
        raise HTTPException(status_code=404, detail="CSV file not found")

    return FileResponse(
        csv_path,
        media_type="text/csv",
        filename="company_analysis.csv"
    )
