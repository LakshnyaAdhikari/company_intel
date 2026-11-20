import { ArrowRight, Building2, Factory, HeartPulse, History, Sparkles } from "lucide-react";
import type { ComponentType } from "react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { getCompanies, getHealth } from "@/services/api";
import type { CompanySummary, HealthResponse } from "@/types/api";

export function Dashboard() {
  const [companies, setCompanies] = useState<CompanySummary[]>([]);
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([getCompanies(), getHealth()])
      .then(([companyData, healthData]) => {
        setCompanies(companyData);
        setHealth(healthData);
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "Unable to load dashboard");
      });
  }, []);

  const industries = useMemo(
    () =>
      Array.from(
        new Set(companies.map((company) => company.industry).filter(Boolean))
      ),
    [companies]
  );

  const latest = companies.slice(-5).reverse();

  return (
    <div className="space-y-6">
      <section className="surface-panel overflow-hidden">
        <div className="grid gap-5 p-6 lg:grid-cols-[1.2fr_0.8fr] lg:p-7">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              Intelligence workspace
            </div>
            <h1 className="text-3xl font-semibold tracking-normal">
              Company Intel Studio
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              Track analyzed companies, scan market coverage, and open the
              latest intelligence reports from one place.
            </p>
          </div>
          <div className="grid gap-3 rounded-md border bg-muted/40 p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Backend status</span>
              <span className="font-semibold capitalize text-secondary">
                {health?.status ?? "checking"}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Saved reports</span>
              <span className="font-semibold">{companies.length}</span>
            </div>
            <Button asChild size="sm">
              <Link to="/analyze">Start New Analysis</Link>
            </Button>
          </div>
        </div>
      </section>

      {error ? (
        <div className="rounded-md border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-4">
        <MetricCard
          icon={Building2}
          label="Total Companies"
          value={companies.length}
        />
        <MetricCard
          icon={Factory}
          label="Industry Categories"
          value={industries.length}
          helper="Unique market labels extracted from saved profiles"
        />
        <MetricCard
          icon={History}
          label="Recent Runs"
          value={companies.length}
          helper="Saved analysis records"
        />
        <MetricCard
          icon={HeartPulse}
          label="Backend"
          value={health?.status ?? "-"}
          helper="FastAPI service health"
        />
        <MetricCard
          icon={Building2}
          label="Reports Ready"
          value={latest.length}
          helper="Latest profiles available to open"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <section className="surface-panel p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-semibold">Latest Analyses</h2>
              <p className="text-sm text-muted-foreground">
                Quick access to latest reports.
              </p>
            </div>
            <Button asChild size="sm" variant="outline">
              <Link to="/companies">View all</Link>
            </Button>
          </div>

          <div className="divide-y overflow-hidden rounded-md border">
            {latest.length ? (
              latest.map((company) => (
                <Link
                  key={company.company}
                  to={`/company/${company.company}`}
                  className="flex items-center justify-between gap-4 px-4 py-3 text-sm transition-colors hover:bg-muted/60"
                >
                  <div>
                    <p className="font-medium">{company.company}</p>
                    <p className="text-muted-foreground">
                      {company.industry || "Industry unavailable"}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              ))
            ) : (
              <div className="px-4 py-6 text-sm text-muted-foreground">
                No analyses saved yet.
              </div>
            )}
          </div>
        </section>

        <section className="surface-panel p-5">
          <h2 className="section-title">Industry Categories</h2>
          <p className="section-subtitle">
            These are the unique `market.industry` labels extracted by the AI
            from saved company reports.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {industries.length ? (
              industries.map((industry) => (
                <span
                  key={industry}
                  className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
                >
                  {industry}
                </span>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                Industries will appear after analysis.
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

type MetricCardProps = {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string | number;
  helper?: string;
};

function MetricCard({ helper, icon: Icon, label, value }: MetricCardProps) {
  return (
    <section className="surface-panel p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <div className="rounded-md bg-muted p-2">
          <Icon className="h-4 w-4 text-primary" />
        </div>
      </div>
      <p className="mt-3 truncate text-2xl font-semibold">{value}</p>
      {helper ? (
        <p className="mt-1 text-xs leading-5 text-muted-foreground">{helper}</p>
      ) : null}
    </section>
  );
}
