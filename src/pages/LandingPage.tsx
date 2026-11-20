import { Link } from "react-router-dom";
import { 
  BarChart3, 
  ArrowRight, 
  Sparkles, 
  TrendingUp, 
  Database, 
  GitCompare, 
  FileSpreadsheet, 
  Layers,
  ShieldCheck,
  Cpu,
  CheckCircle2,
  ArrowUpRight,
  Search,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F5EFEB] text-[#1C1917] selection:bg-[#E2CEB9] selection:text-[#1C1917] font-sans antialiased flex flex-col relative overflow-x-hidden">
      
      {/* High-Impact Vibrant Enterprise Gradient Meshes & Grid */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Crisp Geometric Grid */}
        <div 
          className="absolute inset-0 opacity-[0.45] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_0%,#000_80%,transparent_100%)]"
          style={{
            backgroundImage: `linear-gradient(to right, #D8C7B5 1px, transparent 1px), linear-gradient(to bottom, #D8C7B5 1px, transparent 1px)`,
            backgroundSize: "3.5rem 3.5rem"
          }}
        />

        {/* BOLD, Vivid Golden Amber & Warm Apricot Gradient Orbs */}
        <div className="absolute -top-[120px] left-1/2 -translate-x-1/2 w-[850px] h-[520px] bg-gradient-to-tr from-[#F59E0B]/40 via-[#F97316]/30 to-[#D97706]/40 rounded-full blur-[90px]" />
        <div className="absolute top-[8%] left-[10%] w-[450px] h-[450px] bg-[#FB923C]/30 rounded-full blur-[80px]" />
        <div className="absolute top-[12%] right-[10%] w-[480px] h-[480px] bg-[#EAB308]/35 rounded-full blur-[85px]" />
        <div className="absolute top-[35%] left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#FDBA74]/30 rounded-full blur-[100px]" />
      </div>

      {/* Glassmorphic Top Navbar */}
      <header className="sticky top-0 z-50 border-b border-[#DFCFBE]/90 bg-[#F5EFEB]/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-b from-[#292524] to-[#1C1917] text-[#FAF7F2] shadow-md shadow-[#1C1917]/15 transition-transform duration-200 group-hover:scale-105">
              <BarChart3 className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold tracking-tight text-[#1C1917]">Company Intel</span>
                <span className="rounded-full bg-[#E5D5C3] px-2 py-0.5 text-[10px] font-bold text-[#57534E] uppercase tracking-wider">
                  Studio
                </span>
              </div>
              <p className="text-[11px] text-[#8C827A] font-medium leading-none mt-0.5">Autonomous Corporate Intelligence</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#665E57]">
            <a href="#features" className="transition-colors hover:text-[#1C1917]">Capabilities</a>
            <a href="#preview" className="transition-colors hover:text-[#1C1917]">Live Telemetry</a>
            <a href="#matrix" className="transition-colors hover:text-[#1C1917]">Comparison Matrix</a>
            <a href="#workflow" className="transition-colors hover:text-[#1C1917]">Methodology</a>
          </nav>

          <div className="flex items-center gap-3">
            <Button asChild variant="ghost" size="sm" className="text-[#57534E] font-medium hover:text-[#1C1917] hover:bg-[#EADBCB]">
              <Link to="/login">Sign In</Link>
            </Button>
            <Button asChild size="sm" className="bg-[#1C1917] text-[#FAF7F2] hover:bg-[#292524] shadow-sm font-medium">
              <Link to="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 pb-14 lg:pt-16 lg:pb-20">
        <div className="mx-auto max-w-5xl px-6 text-center">
          
          {/* Shimmer Badge */}
          <div className="inline-flex items-center gap-2.5 rounded-full border border-[#D4BFAB] bg-white/80 px-4 py-1.5 text-xs font-semibold text-[#57534E] shadow-sm mb-6 backdrop-blur-md">
            <span className="flex h-2.5 w-2.5 rounded-full bg-[#16A34A] ring-4 ring-[#16A34A]/25" />
            <span className="text-[#1C1917]">Autonomous Synthesis Engine v2.4</span>
            <span className="text-[#BCA592]">•</span>
            <span className="flex items-center gap-1 text-[#B45309] bg-[#FEF3C7] px-2 py-0.5 rounded-full font-bold">
              <Sparkles className="h-3.5 w-3.5 text-[#D97706]" /> Live Telemetry
            </span>
          </div>

          {/* VIBRANT High-Contrast Gradient Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-[72px] lg:leading-[1.1] font-serif font-bold tracking-tight text-[#1C1917] text-balance">
            Uncover deep market truths,{" "}
            <span className="bg-gradient-to-r from-[#B45309] via-[#D97706] to-[#EA580C] bg-clip-text text-transparent italic font-normal">
              in seconds.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-[#57534E] font-medium text-balance leading-relaxed">
            Eliminate hours of manual corporate research. Multi-agent AI synthesizes corporate filings, earnings disclosures, financial metrics, and executive signals into structured, investment-grade dossiers.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg" className="h-12 px-8 bg-[#1C1917] text-[#FAF7F2] hover:bg-[#292524] shadow-lg shadow-[#1C1917]/20 font-semibold transition-all hover:translate-y-[-1px]">
              <Link to="/signup" className="flex items-center gap-2">
                Get Started <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 px-8 border-[#C9B4A0] bg-white/90 text-[#1C1917] hover:bg-[#EFE3D5] font-semibold shadow-xs">
              <Link to="/login">Sign In</Link>
            </Button>
          </div>

          {/* Social Proof */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-y-2 gap-x-8 text-xs text-[#665E57] font-semibold max-w-3xl mx-auto">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-[#16A34A]" />
              <span>1,200+ Corporate Profiles</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-[#16A34A]" />
              <span>Multi-Agent Parallel Synthesis</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-[#16A34A]" />
              <span>Instant CSV & JSON Export</span>
            </div>
          </div>
        </div>

        {/* High-Visibility Dossier Window Preview in Hero Viewport */}
        <div id="preview" className="mx-auto max-w-6xl px-6 mt-10">
          <div className="rounded-2xl border-2 border-[#D4C0AD] bg-white p-3 sm:p-4 shadow-[0_25px_70px_-15px_rgba(180,83,9,0.18)] ring-1 ring-black/5">
            <div className="rounded-xl border border-[#E7D7C7] bg-[#FAF6F0] p-5 sm:p-6">
              
              {/* Window Header with Realistic Search Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E3D3C3] pb-4 mb-5">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-[#EF4444]" />
                    <span className="h-3 w-3 rounded-full bg-[#F59E0B]" />
                    <span className="h-3 w-3 rounded-full bg-[#10B981]" />
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-[#57534E] bg-white px-3.5 py-1.5 rounded-lg border border-[#DBCAB9] shadow-2xs">
                    <Search className="h-3.5 w-3.5 text-[#B45309]" />
                    <span className="text-[#1C1917] font-semibold">stripe.com</span>
                    <span className="text-[#9C8F84]">--deep-analysis --competitors</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1.5 text-xs font-bold text-[#15803D] bg-[#DCFCE7] px-3 py-1 rounded-full border border-[#86EFAC]">
                    <span className="h-2 w-2 rounded-full bg-[#16A34A] animate-pulse" />
                    Agent Fleet Active
                  </span>
                  <span className="text-xs font-semibold text-[#8C827A] hidden sm:inline">Telemetry synced</span>
                </div>
              </div>

              {/* Dossier Mock Grid */}
              <div className="grid gap-5 lg:grid-cols-3">
                {/* Left: Target Profile */}
                <div className="rounded-xl border border-[#DFCEBD] bg-white p-5 flex flex-col justify-between shadow-xs">
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-[#F59E0B]/20 to-[#EA580C]/20 flex items-center justify-center font-serif font-bold text-base text-[#B45309] border border-[#F59E0B]/30">
                          SL
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-[#1C1917]">Stripe, Inc.</h4>
                          <p className="text-xs text-[#78716C]">Fintech & Developer Rails</p>
                        </div>
                      </div>
                      <span className="text-[11px] font-bold text-[#15803D] bg-[#DCFCE7] px-2.5 py-0.5 rounded border border-[#86EFAC]">
                        Strong Moat
                      </span>
                    </div>

                    <div className="mt-4 space-y-2 text-xs">
                      <div className="flex justify-between py-1.5 border-b border-[#F5ECE1]">
                        <span className="text-[#78716C] font-medium">Implied Valuation</span>
                        <span className="font-bold text-[#1C1917] font-mono">$70.0B</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-[#F5ECE1]">
                        <span className="text-[#78716C] font-medium">Sentiment Signal</span>
                        <span className="font-bold text-[#15803D]">94% High Conviction</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-[#F5ECE1]">
                        <span className="text-[#78716C] font-medium">Direct Competitors</span>
                        <span className="font-semibold text-[#1C1917]">Adyen, PayPal, Checkout</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-[#F5ECE1]">
                        <span className="text-[#78716C] font-medium">Headcount Trajectory</span>
                        <span className="font-bold text-[#15803D] flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" /> +12% YoY
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#F5ECE1]">
                    <p className="text-[11px] text-[#665E57] leading-relaxed italic">
                      &quot;Uncontested market leader in global developer monetization with rapid acceleration into financial automation agents.&quot;
                    </p>
                  </div>
                </div>

                {/* Right: Live Agent Pipeline Execution */}
                <div className="rounded-xl border border-[#DFCEBD] bg-white p-5 lg:col-span-2 flex flex-col justify-between shadow-xs">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Cpu className="h-4 w-4 text-[#B45309]" />
                        <h4 className="font-bold text-sm text-[#1C1917]">Autonomous Research Pipeline</h4>
                      </div>
                      <span className="text-xs text-[#15803D] font-mono font-bold">3 / 3 stages complete</span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between rounded-lg bg-[#FAF6F0] p-3 text-xs border border-[#E7D7C7]">
                        <div className="flex items-center gap-2.5">
                          <CheckCircle2 className="h-4 w-4 text-[#15803D] shrink-0" />
                          <div>
                            <p className="font-bold text-[#1C1917]">SEC & Corporate Filings Harvester</p>
                            <p className="text-[11px] text-[#78716C]">Extracted revenue multiples, corporate structure & board updates</p>
                          </div>
                        </div>
                        <span className="text-[#15803D] font-mono font-bold bg-[#DCFCE7] px-2 py-0.5 rounded">DONE</span>
                      </div>

                      <div className="flex items-center justify-between rounded-lg bg-[#FAF6F0] p-3 text-xs border border-[#E7D7C7]">
                        <div className="flex items-center gap-2.5">
                          <CheckCircle2 className="h-4 w-4 text-[#15803D] shrink-0" />
                          <div>
                            <p className="font-bold text-[#1C1917]">Direct Competitor Feature & Pricing Matrix</p>
                            <p className="text-[11px] text-[#78716C]">Benchmarked Stripe Billing vs Adyen & Braintree take-rates</p>
                          </div>
                        </div>
                        <span className="text-[#15803D] font-mono font-bold bg-[#DCFCE7] px-2 py-0.5 rounded">DONE</span>
                      </div>

                      <div className="flex items-center justify-between rounded-lg bg-[#FAF6F0] p-3 text-xs border border-[#E7D7C7]">
                        <div className="flex items-center gap-2.5">
                          <CheckCircle2 className="h-4 w-4 text-[#15803D] shrink-0" />
                          <div>
                            <p className="font-bold text-[#1C1917]">Executive Sentiment & Leadership Movements</p>
                            <p className="text-[11px] text-[#78716C]">Analyzed earnings calls, key executive departures, and hiring surges</p>
                          </div>
                        </div>
                        <span className="text-[#15803D] font-mono font-bold bg-[#DCFCE7] px-2 py-0.5 rounded">DONE</span>
                      </div>
                    </div>
                  </div>

                  {/* Summary Bar */}
                  <div className="mt-4 pt-3.5 border-t border-[#F5ECE1] flex flex-wrap items-center justify-between gap-3 text-xs">
                    <span className="text-[#78716C] font-medium">Generated output: Ready for CSV & Markdown Download</span>
                    <Link to="/signup" className="font-bold text-[#B45309] inline-flex items-center gap-1 hover:underline">
                      Launch workspace to query any company <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Capabilities Grid */}
      <section id="features" className="border-t border-[#DFCFBE] bg-[#EFE6DC] py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8C7A6B]">Capabilities</span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight text-[#1C1917] font-serif">
              Built for high-conviction decision-makers
            </h2>
            <p className="mt-3 text-[#57534E] text-base leading-relaxed">
              Replace fragmented web browsing with a unified intelligence pipeline that aggregates, cross-examines, and structures corporate telemetry.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-[#D8C7B5] bg-white p-8 shadow-xs hover:border-[#B49E89] transition-colors">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FAF6F0] text-[#B45309] border border-[#E7D7C7] mb-5">
                <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-[#1C1917]">Autonomous Deep Dives</h3>
              <p className="mt-2 text-sm text-[#57534E] leading-relaxed">
                Provide a company name or domain. Autonomous workers crawl web footprints, corporate disclosures, and news to generate cohesive profiles.
              </p>
            </div>

            <div className="rounded-xl border border-[#D8C7B5] bg-white p-8 shadow-xs hover:border-[#B49E89] transition-colors">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FAF6F0] text-[#B45309] border border-[#E7D7C7] mb-5">
                <GitCompare className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-[#1C1917]">Head-to-Head Compare</h3>
              <p className="mt-2 text-sm text-[#57534E] leading-relaxed">
                Run side-by-side matrices comparing market position, estimated ARR, leadership team, funding rounds, and technical defensibility.
              </p>
            </div>

            <div className="rounded-xl border border-[#D8C7B5] bg-white p-8 shadow-xs hover:border-[#B49E89] transition-colors">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FAF6F0] text-[#B45309] border border-[#E7D7C7] mb-5">
                <FileSpreadsheet className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-[#1C1917]">One-Click Data Export</h3>
              <p className="mt-2 text-sm text-[#57534E] leading-relaxed">
                Instantly download your intelligence dossiers in structured CSV or JSON to populate financial models, decks, and CRM pipelines.
              </p>
            </div>

            <div className="rounded-xl border border-[#D8C7B5] bg-white p-8 shadow-xs hover:border-[#B49E89] transition-colors">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FAF6F0] text-[#B45309] border border-[#E7D7C7] mb-5">
                <Database className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-[#1C1917]">Structured Knowledge Vault</h3>
              <p className="mt-2 text-sm text-[#57534E] leading-relaxed">
                Historical records are organized in an interactive ledger with full search, sorting, and tag filtering across industry verticals.
              </p>
            </div>

            <div className="rounded-xl border border-[#D8C7B5] bg-white p-8 shadow-xs hover:border-[#B49E89] transition-colors">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FAF6F0] text-[#B45309] border border-[#E7D7C7] mb-5">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-[#1C1917]">Secure Workspaces</h3>
              <p className="mt-2 text-sm text-[#57534E] leading-relaxed">
                Enterprise session security ensuring your research targets, query history, and generated outputs remain strictly private to your team.
              </p>
            </div>

            <div className="rounded-xl border border-[#D8C7B5] bg-white p-8 shadow-xs hover:border-[#B49E89] transition-colors">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FAF6F0] text-[#B45309] border border-[#E7D7C7] mb-5">
                <Layers className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-[#1C1917]">High-Density Editorial UI</h3>
              <p className="mt-2 text-sm text-[#57534E] leading-relaxed">
                Crafted with an editorial aesthetic for maximum legibility, clean visual hierarchies, and distraction-free analysis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Matrix: Traditional Manual Research vs Company Intel Studio */}
      <section id="matrix" className="py-20 border-t border-[#DFCFBE]">
        <div className="mx-auto max-w-5xl px-6">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8C7A6B]">The Competitive Advantage</span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight text-[#1C1917] font-serif">
              Why manual research is obsolete
            </h2>
            <p className="mt-3 text-[#57534E] text-base leading-relaxed">
              Compare the friction of traditional analyst gathering against our autonomous agent architecture.
            </p>
          </div>

          <div className="rounded-2xl border border-[#D4C0AD] bg-white overflow-hidden shadow-sm">
            <div className="grid grid-cols-3 bg-[#FAF6F0] p-4 text-xs font-bold uppercase tracking-wider text-[#665E57] border-b border-[#E3D3C3]">
              <div>Dimension</div>
              <div>Traditional Analyst Sourcing</div>
              <div className="text-[#B45309] font-extrabold">Company Intel Studio</div>
            </div>

            <div className="divide-y divide-[#F2E8DC] text-sm">
              <div className="grid grid-cols-3 p-4 items-center">
                <div className="font-bold text-[#1C1917]">Turnaround Time</div>
                <div className="text-[#78716C]">2 to 5 business days</div>
                <div className="font-bold text-[#15803D] flex items-center gap-1.5">
                  <Zap className="h-4 w-4" /> 15 to 30 seconds
                </div>
              </div>

              <div className="grid grid-cols-3 p-4 items-center">
                <div className="font-bold text-[#1C1917]">Multi-Source Cross-Check</div>
                <div className="text-[#78716C]">Manual tab juggling & note-taking</div>
                <div className="font-bold text-[#1C1917]">Automated multi-agent synthesis</div>
              </div>

              <div className="grid grid-cols-3 p-4 items-center">
                <div className="font-bold text-[#1C1917]">Competitor Benchmarking</div>
                <div className="text-[#78716C]">Static slides, out of date quickly</div>
                <div className="font-bold text-[#1C1917]">Live side-by-side matrices</div>
              </div>

              <div className="grid grid-cols-3 p-4 items-center">
                <div className="font-bold text-[#1C1917]">Data Export</div>
                <div className="text-[#78716C]">Copy-pasting into spreadsheets</div>
                <div className="font-bold text-[#15803D] flex items-center gap-1.5">
                  <FileSpreadsheet className="h-4 w-4" /> 1-Click CSV & structured JSON
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section id="workflow" className="border-t border-[#DFCFBE] bg-[#EFE6DC] py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8C7A6B]">Methodology</span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight text-[#1C1917] font-serif">
              How intelligence is generated
            </h2>
            <p className="mt-3 text-[#57534E] text-base leading-relaxed">
              A 3-step synthesis protocol ensuring accuracy, speed, and clean categorization.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            <div className="rounded-xl border border-[#D8C7B5] bg-white p-8 text-left shadow-xs">
              <div className="text-3xl font-serif font-bold text-[#C9B4A0] mb-4">01</div>
              <h4 className="font-bold text-base text-[#1C1917]">Define Target Scope</h4>
              <p className="mt-2 text-sm text-[#57534E] leading-relaxed">
                Provide a company name, website domain, or sector keyword. Specify whether you want broad landscape mapping or specific competitive comparisons.
              </p>
            </div>

            <div className="rounded-xl border border-[#D8C7B5] bg-white p-8 text-left shadow-xs">
              <div className="text-3xl font-serif font-bold text-[#C9B4A0] mb-4">02</div>
              <h4 className="font-bold text-base text-[#1C1917]">Multi-Vector Telemetry</h4>
              <p className="mt-2 text-sm text-[#57534E] leading-relaxed">
                Autonomous agents fan out in parallel to scrape product offerings, leadership profiles, investor history, and recent market developments.
              </p>
            </div>

            <div className="rounded-xl border border-[#D8C7B5] bg-white p-8 text-left shadow-xs">
              <div className="text-3xl font-serif font-bold text-[#C9B4A0] mb-4">03</div>
              <h4 className="font-semibold text-base text-[#1C1917]">Synthesize & Export</h4>
              <p className="mt-2 text-sm text-[#57534E] leading-relaxed">
                Review the consolidated summary dossier in your workspace or export directly to CSV to support your firm's strategic presentations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="rounded-2xl border border-[#D4C0AD] bg-[#EFE6DC] p-10 sm:p-14 text-center shadow-xs">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#1C1917] font-serif">
              Elevate your corporate research workflow today.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[#57534E] text-sm sm:text-base leading-relaxed">
              Join analysts, investors, and founders who rely on automated company intelligence to stay ahead.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button asChild size="lg" className="h-12 px-8 bg-[#1C1917] text-[#FAF7F2] hover:bg-[#292524] shadow-md font-semibold">
                <Link to="/signup">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-[#DFCFBE] bg-[#F5EFEB] py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 sm:flex-row text-xs text-[#78716C]">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-md bg-[#1C1917] text-[#FAF7F2] flex items-center justify-center font-bold text-xs">
              CI
            </div>
            <span className="font-bold text-[#1C1917]">Company Intel Studio</span>
            <span>&copy; {new Date().getFullYear()} All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#features" className="hover:text-[#1C1917]">Capabilities</a>
            <a href="#matrix" className="hover:text-[#1C1917]">Comparison</a>
            <a href="#workflow" className="hover:text-[#1C1917]">Methodology</a>
            <Link to="/login" className="hover:text-[#1C1917]">Sign In</Link>
            <Link to="/signup" className="hover:text-[#1C1917]">Register</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
