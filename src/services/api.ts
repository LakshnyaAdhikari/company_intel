import type {
  AnalyzeCompanyRequest,
  AnalyzeCompanyResponse,
  AnalysisRun,
  CompanyResults,
  CompanySummary,
  HealthResponse
} from "@/types/api";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

async function request<TResponse>(
  path: string,
  options?: RequestInit
): Promise<TResponse> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers
    },
    ...options
  });

  const contentType = response.headers.get("content-type") ?? "";
  const body = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const detail = typeof body === "object" && body !== null && "detail" in body
      ? body.detail
      : body;
    const message = Array.isArray(detail)
      ? detail.map((item) => item.msg ?? String(item)).join(", ")
      : String(detail || "Request failed");

    throw new Error(message);
  }

  return body as TResponse;
}

export function analyzeCompany(
  payload: AnalyzeCompanyRequest
): Promise<AnalyzeCompanyResponse> {
  return request<AnalyzeCompanyResponse>("/analyze", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export function startAnalysisRun(
  payload: AnalyzeCompanyRequest
): Promise<AnalysisRun> {
  return request<AnalysisRun>("/analysis-runs", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export function getAnalysisRun(runId: string): Promise<AnalysisRun> {
  return request<AnalysisRun>(`/analysis-runs/${encodeURIComponent(runId)}`);
}

export function cancelAnalysisRun(runId: string): Promise<AnalysisRun> {
  return request<AnalysisRun>(
    `/analysis-runs/${encodeURIComponent(runId)}/cancel`,
    {
      method: "POST"
    }
  );
}

export function getCompanyAnalysisCsvUrl() {
  return `${API_BASE_URL}/download/company-analysis.csv`;
}

export function getCompanyResults(company: string): Promise<CompanyResults> {
  return request<CompanyResults>(`/results/${encodeURIComponent(company)}`);
}

export function getCompanies(): Promise<CompanySummary[]> {
  return request<CompanySummary[]>("/companies");
}

export function getHealth(): Promise<HealthResponse> {
  return request<HealthResponse>("/health");
}
