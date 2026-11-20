export type AgentName =
  | "leadership"
  | "services"
  | "legal"
  | "technology"
  | "market"
  | "contact";

export type AnalyzeCompanyRequest = {
  company_url: string;
  max_pages?: number;
  selected_agents?: AgentName[] | null;
};

export type AnalyzeCompanyResponse = {
  status: "success";
  company: string;
  results_path: string;
};

export type AnalysisRunStatus =
  | "queued"
  | "running"
  | "completed"
  | "cancelled"
  | "failed";

export type AnalysisRun = {
  run_id: string;
  status: AnalysisRunStatus;
  step: string;
  company_url: string;
  company: string;
  max_pages: number;
  selected_agents?: AgentName[] | null;
  results_path: string;
  error: string;
  result: CompanyResults | null;
  cancel_requested: boolean;
  created_at: string;
  updated_at: string;
};

export type CompanySummary = {
  company: string;
  industry: string;
  ceo: string;
};

export type CompanyResults = {
  leadership: Record<string, unknown>;
  services: Record<string, unknown>;
  legal: Record<string, unknown>;
  technology: Record<string, unknown>;
  market: Record<string, unknown>;
  contact: Record<string, unknown>;
};

export type HealthResponse = {
  status: "healthy" | string;
};
