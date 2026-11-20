import { Link } from "react-router-dom";
import { 
  BarChart3, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  TrendingUp, 
  Database, 
  GitCompare, 
  FileSpreadsheet, 
  Layers
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
              <BarChart3 className="h-5 w-5" />
            </div>
            <div>
              <span className="text-base font-bold tracking-tight">Company Intel</span>
              <span className="ml-1 text-xs text-muted-foreground font-medium">Studio</span>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <Button asChild variant="ghost" size="sm">
              <Link to="/login">Sign In</Link>
            </Button>
            <Button asChild size="sm">
              <Link to="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary mb-6">
            <Sparkles className="h-3.5 w-3.5" />
            Autonomous AI-Powered Market Research
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-balance">
            Next-Generation Corporate & Competitor <span className="text-primary">Intelligence</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-muted-foreground text-balance">
            Autonomous multi-agent research that discovers, structures, and synthesizes 
            critical company signals, competitive benchmarks, and executive insights in seconds.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg" className="h-11 px-6 shadow-sm">
              <Link to="/signup" className="flex items-center gap-2">
                Get Started <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-11 px-6">
              <Link to="/login">Sign In</Link>
            </Button>
          </div>

          {/* Product UI Preview / Stats Mockup */}
          <div className="mt-14 rounded-xl border bg-card p-4 shadow-xl sm:p-6 lg:p-8 max-w-5xl mx-auto text-left">
            <div className="flex items-center justify-between border-b pb-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-destructive/60" />
                <span className="h-3 w-3 rounded-full bg-accent/60" />
                <span className="h-3 w-3 rounded-full bg-secondary/60" />
                <span className="ml-2 text-xs font-mono text-muted-foreground">company-intel-studio://dashboard</span>
              </div>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-secondary/15 text-secondary">
                Autonomous Agents Active
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-lg border bg-background/50 p-4">
                <p className="text-xs font-medium text-muted-foreground">Companies Tracked</p>
                <p className="mt-1 text-2xl font-bold">1,240+</p>
                <p className="mt-1 text-xs text-secondary flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" /> +18% this month
                </p>
              </div>
              <div className="rounded-lg border bg-background/50 p-4">
                <p className="text-xs font-medium text-muted-foreground">Research Datapoints</p>
                <p className="mt-1 text-2xl font-bold">48,500+</p>
                <p className="mt-1 text-xs text-muted-foreground">Structured JSON & CSV</p>
              </div>
              <div className="rounded-lg border bg-background/50 p-4">
                <p className="text-xs font-medium text-muted-foreground">Synthesis Speed</p>
                <p className="mt-1 text-2xl font-bold">~15 sec</p>
                <p className="mt-1 text-xs text-primary">Multi-agent parallel flow</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="border-t bg-muted/40 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight">Enterprise-Grade Intelligence Suite</h2>
            <p className="mt-3 text-muted-foreground text-sm sm:text-base">
              Built to streamline corporate evaluation, market mapping, and executive decision-making.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="surface-panel p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold">Autonomous Analysis</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Feed any company domain or name. Intelligent agents comb web sources, filings, and public metrics to structure insights.
              </p>
            </div>

            <div className="surface-panel p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/15 text-secondary mb-4">
                <GitCompare className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold">Head-to-Head Compare</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Directly compare competing companies side-by-side across key parameters, business models, funding, and target audiences.
              </p>
            </div>

            <div className="surface-panel p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/20 text-accent-foreground mb-4">
                <FileSpreadsheet className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold">Export & Reporting</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Export generated dossiers in ready-to-use CSV and JSON formats for spreadsheets, slides, and executive reports.
              </p>
            </div>

            <div className="surface-panel p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                <Database className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold">Structured Company Profiles</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Deep profile view with funding history, key leadership, tech stack overview, strengths, and risk signals.
              </p>
            </div>

            <div className="surface-panel p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/15 text-secondary mb-4">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold">Authenticated Workspaces</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Secure access with cloud user management so research teams can maintain private search histories and dossiers.
              </p>
            </div>

            <div className="surface-panel p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/20 text-accent-foreground mb-4">
                <Layers className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold">Clean, High-Density UI</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Modern tabular views and interactive cards designed for fast skimming by analysts and decision-makers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight">How it works in 3 steps</h2>
            <p className="mt-3 text-muted-foreground text-sm">From query to comprehensive intelligence dossier in moments.</p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            <div className="flex flex-col items-center text-center p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold mb-4 shadow-sm">
                1
              </div>
              <h4 className="font-semibold text-base">Create Workspace Account</h4>
              <p className="mt-2 text-sm text-muted-foreground">
                Sign up in seconds to access your dedicated intelligence platform.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold mb-4 shadow-sm">
                2
              </div>
              <h4 className="font-semibold text-base">Request Analysis</h4>
              <p className="mt-2 text-sm text-muted-foreground">
                Enter any company name or query. Autonomous AI agents extract and structure market telemetry.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold mb-4 shadow-sm">
                3
              </div>
              <h4 className="font-semibold text-base">Explore & Compare</h4>
              <p className="mt-2 text-sm text-muted-foreground">
                Inspect deep multi-vector profiles, compare rivals, or export formatted CSV dossiers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t bg-card py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 sm:flex-row text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-primary" />
            <span className="font-medium text-foreground">Company Intel Studio</span>
            <span>&copy; {new Date().getFullYear()} Company Intel Inc. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="hover:text-foreground">Sign In</Link>
            <Link to="/signup" className="hover:text-foreground">Register</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
