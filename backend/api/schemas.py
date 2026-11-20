from typing import Optional

from pydantic import BaseModel, Field


class AnalyzeRequest(BaseModel):
    company_url: str
    max_pages: int = Field(default=10, ge=1, le=30)
    selected_agents: Optional[list[str]] = None


class AnalyzeResponse(BaseModel):
    status: str
    company: str
    results_path: str


class AnalysisRunResponse(BaseModel):
    run_id: str
    status: str
    step: str
    company_url: str
    company: str
    max_pages: int
    selected_agents: Optional[list[str]] = None
    results_path: str
    error: str = ""
    result: dict | None = None
    cancel_requested: bool = False
    created_at: str
    updated_at: str
