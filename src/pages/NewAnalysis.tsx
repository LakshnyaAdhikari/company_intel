import { CheckCircle2, Circle, Loader2, PlayCircle } from "lucide-react";
import type { FormEvent } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  cancelAnalysisRun,
  getAnalysisRun,
  startAnalysisRun
} from "@/services/api";
import type { AgentName, AnalysisRun } from "@/types/api";

const agents: AgentName[] = [
  "leadership",
  "services",
  "legal",
  "technology",
  "market",
  "contact"
];

const progressSteps = [
  "Validating URL",
  "Crawling",
  "Extraction",
  "AI Analysis",
  "Export",
  "Complete"
];

const ACTIVE_RUN_STORAGE_KEY = "company-intel.active-analysis-run";
const terminalStatuses = new Set(["completed", "cancelled", "failed"]);

export function NewAnalysis() {
  const [companyUrl, setCompanyUrl] = useState("https://grab.com");
  const [maxPages, setMaxPages] = useState(10);
  const [selectedAgents, setSelectedAgents] = useState<AgentName[]>([
    "leadership",
    "services",
    "legal",
    "technology",
    "market",
    "contact"
  ]);
  const [activeStep, setActiveStep] = useState(-1);
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState("");
  const [run, setRun] = useState<AnalysisRun | null>(null);
  const pollTimer = useRef<number | null>(null);

  function stopPolling() {
    if (pollTimer.current) {
      window.clearInterval(pollTimer.current);
      pollTimer.current = null;
    }
  }

  function applyRun(latestRun: AnalysisRun) {
    setRun(latestRun);
    setActiveStep(stepIndex(latestRun.step));
    setIsRunning(!terminalStatuses.has(latestRun.status));

    if (latestRun.status === "failed") {
      setError(latestRun.error || "Analysis failed");
    }

    if (terminalStatuses.has(latestRun.status)) {
      stopPolling();
    }
  }

  function beginPolling(runId: string) {
    stopPolling();
    pollTimer.current = window.setInterval(async () => {
      try {
        applyRun(await getAnalysisRun(runId));
      } catch (err) {
        stopPolling();
        setIsRunning(false);
        setError(err instanceof Error ? err.message : "Unable to poll run");
      }
    }, 1200);
  }

  const canSubmit = useMemo(
    () => companyUrl.trim() && selectedAgents.length && !isRunning,
    [companyUrl, selectedAgents.length, isRunning]
  );

  useEffect(() => {
    const savedRunId = window.localStorage.getItem(ACTIVE_RUN_STORAGE_KEY);

    if (savedRunId) {
      getAnalysisRun(savedRunId)
        .then((savedRun) => {
          applyRun(savedRun);
          setCompanyUrl(savedRun.company_url);
          setMaxPages(savedRun.max_pages);
          if (savedRun.selected_agents?.length) {
            setSelectedAgents(savedRun.selected_agents as AgentName[]);
          }
          if (!terminalStatuses.has(savedRun.status)) {
            beginPolling(savedRun.run_id);
          }
        })
        .catch(() => {
          window.localStorage.removeItem(ACTIVE_RUN_STORAGE_KEY);
        });
    }

    return () => {
      stopPolling();
    };
  }, []);

  function toggleAgent(agent: AgentName) {
    setSelectedAgents((current) =>
      current.includes(agent)
        ? current.filter((item) => item !== agent)
        : [...current, agent]
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setRun(null);
    setIsRunning(true);
    setActiveStep(0);
    stopPolling();
    window.localStorage.removeItem(ACTIVE_RUN_STORAGE_KEY);

    try {
      const createdRun = await startAnalysisRun({
        company_url: companyUrl.trim(),
        max_pages: maxPages,
        selected_agents: selectedAgents
      });

      window.localStorage.setItem(ACTIVE_RUN_STORAGE_KEY, createdRun.run_id);
      applyRun(createdRun);
      beginPolling(createdRun.run_id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Analysis failed");
      setIsRunning(false);
    }
  }

  async function handleCancel() {
    if (!run) {
      return;
    }

    try {
      const cancelledRun = await cancelAnalysisRun(run.run_id);
      applyRun(cancelledRun);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to stop run");
    }
  }

  return (
    <div className="space-y-6">
      <section className="surface-panel p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <PlayCircle className="h-3.5 w-3.5" />
              New intelligence run
            </div>
            <h1 className="text-3xl font-semibold tracking-normal">
              Analyze a Company
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              Enter a public company website, choose the agents, and generate a
              structured report saved to the backend results folder.
            </p>
          </div>
        </div>
      </section>

      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="surface-panel p-5">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <label className="grid gap-2 text-sm font-medium">
              Company URL
              <input
                className="rounded-md border bg-background px-3 py-2 shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                value={companyUrl}
                onChange={(event) => setCompanyUrl(event.target.value)}
                placeholder="https://grab.com"
                required
              />
            </label>

            <label className="grid gap-2 text-sm font-medium">
              Max Pages
              <input
                className="rounded-md border bg-background px-3 py-2 shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                type="number"
                min={1}
                max={30}
                value={maxPages}
                onChange={(event) => setMaxPages(Number(event.target.value))}
                required
              />
              <span className="text-xs font-normal text-muted-foreground">
                Recommended range: 5-20. Hard limit: 30.
              </span>
            </label>

            <div>
              <p className="mb-3 text-sm font-medium">Agents</p>
              <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
                {agents.map((agent) => (
                  <label
                    key={agent}
                    className="flex items-center gap-2 rounded-md border bg-background px-3 py-2 text-sm capitalize shadow-sm transition-colors hover:bg-muted/60"
                  >
                    <input
                      type="checkbox"
                      checked={selectedAgents.includes(agent)}
                      onChange={() => toggleAgent(agent)}
                    />
                    {agent}
                  </label>
                ))}
              </div>
            </div>

            <Button disabled={!canSubmit} type="submit">
              {isRunning ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Running
                </>
              ) : (
                "Run Analysis"
              )}
            </Button>
            {isRunning && run ? (
              <Button
                onClick={handleCancel}
                type="button"
                variant="outline"
              >
                Stop Analysis
              </Button>
            ) : null}
          </form>
        </section>

        <section className="surface-panel p-5">
          <h2 className="text-base font-semibold">Progress</h2>
          <div className="mt-4 space-y-3">
            {progressSteps.map((step, index) => {
              const done = activeStep > index || run?.status === "completed";
              const active = activeStep === index && isRunning;

              return (
                <div key={step} className="flex items-center gap-3 text-sm">
                  {done ? (
                    <CheckCircle2 className="h-4 w-4 text-secondary" />
                  ) : active ? (
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  ) : (
                    <Circle className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span className={active ? "font-medium" : ""}>{step}</span>
                </div>
              );
            })}
          </div>

          {error ? (
            <div className="mt-5 rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          ) : null}

          {run ? (
            <div className="mt-5 rounded-md border bg-muted/50 p-3 text-sm">
              <p className="font-medium capitalize">Status: {run.status}</p>
              <p className="mt-1 text-muted-foreground">
                Current step: {run.step}
              </p>
              {run.status === "completed" ? (
                <>
                  <p className="mt-1 text-muted-foreground">
                    Saved to {run.results_path}
                  </p>
                  <Button asChild className="mt-3" size="sm" variant="outline">
                    <Link to={`/company/${run.company}`}>Open Profile</Link>
                  </Button>
                </>
              ) : null}
              {run.status === "cancelled" ? (
                <p className="mt-2 text-muted-foreground">
                  The run was stopped. If an AI request was already in flight,
                  cancellation applies at the next safe checkpoint.
                </p>
              ) : null}
            </div>
          ) : null}
        </section>
      </div>
    </div>
  );
}

function stepIndex(step: string) {
  const index = progressSteps.findIndex(
    (progressStep) => progressStep.toLowerCase() === step.toLowerCase()
  );

  if (step === "Queued") {
    return 0;
  }

  if (step === "Cancelled" || step === "Failed") {
    return -1;
  }

  return index >= 0 ? index : 0;
}
