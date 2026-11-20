import { useState, useEffect } from "react";
import { 
  BarChart3, 
  Download, 
  GitCompare, 
  LayoutDashboard, 
  Play, 
  Search, 
  Table2, 
  LogOut, 
  User, 
  ChevronLeft, 
  ChevronRight,
  Sparkles,
  X,
  Building2,
  ArrowRight
} from "lucide-react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getCompanyAnalysisCsvUrl, getCompanies } from "@/services/api";
import { useAuth } from "@/context/AuthContext";
import type { CompanySummary } from "@/types/api";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "New Analysis", href: "/analyze", icon: Play },
  { name: "Companies", href: "/companies", icon: Table2 },
  { name: "Compare", href: "/compare", icon: GitCompare }
];

export function AppLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  // Search modal state
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [companies, setCompanies] = useState<CompanySummary[]>([]);
  const [loadingCompanies, setLoadingCompanies] = useState(false);

  // Keyboard shortcut listener (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Fetch companies when search modal opens
  useEffect(() => {
    if (searchOpen && companies.length === 0) {
      setLoadingCompanies(true);
      getCompanies()
        .then((data) => setCompanies(data || []))
        .catch(() => setCompanies([]))
        .finally(() => setLoadingCompanies(false));
    }
  }, [searchOpen, companies.length]);

  const filteredCompanies = companies.filter((c) =>
    (c.company || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (c.industry || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (c.ceo || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectCompany = (companyName: string) => {
    setSearchOpen(false);
    setSearchQuery("");
    navigate(`/company/${encodeURIComponent(companyName)}`);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      console.error("Failed to log out", err);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col antialiased selection:bg-[#E2CEB9] selection:text-[#1C1917]">
      
      {/* Collapsible Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 hidden border-r border-[#D8C7B5] bg-[#FAF7F2] shadow-xs lg:flex flex-col justify-between z-30 transition-all duration-300 ease-in-out",
          collapsed ? "w-20 px-3 py-5" : "w-64 px-4 py-5"
        )}
      >
        <div>
          {/* Header Brand */}
          <div className={cn("mb-8 flex items-center justify-between", collapsed ? "px-1 justify-center" : "px-2")}>
            <Link to="/dashboard" className="flex items-center gap-3 group min-w-0">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-b from-[#292524] to-[#1C1917] text-[#FAF7F2] shadow-md shadow-[#1C1917]/15 transition-transform duration-200 group-hover:scale-105">
                <BarChart3 className="h-5 w-5" />
              </div>
              {!collapsed && (
                <div className="min-w-0 animate-in fade-in duration-200">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold tracking-tight text-[#1C1917]">Company Intel</span>
                    <span className="rounded-full bg-[#E5D5C3] px-1.5 py-0.2 text-[9px] font-bold text-[#57534E] uppercase">
                      Studio
                    </span>
                  </div>
                  <p className="text-[11px] text-[#8C827A] font-medium leading-none mt-0.5 truncate">Corporate Research</p>
                </div>
              )}
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {navigation.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                title={collapsed ? item.name : undefined}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-xl py-2.5 text-sm font-medium transition-all group relative",
                    collapsed ? "justify-center px-2" : "px-3.5",
                    isActive 
                      ? "bg-[#1C1917] text-[#FAF7F2] shadow-sm font-semibold" 
                      : "text-[#665E57] hover:bg-[#EFE6DC] hover:text-[#1C1917]"
                  )
                }
              >
                <item.icon className="h-4 w-4 shrink-0 transition-transform group-hover:scale-110" />
                {!collapsed && (
                  <span className="animate-in fade-in duration-150">{item.name}</span>
                )}
                {/* Floating tooltip when collapsed */}
                {collapsed && (
                  <div className="absolute left-full ml-3 px-2.5 py-1 bg-[#1C1917] text-[#FAF7F2] text-xs font-semibold rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity shadow-lg z-50 whitespace-nowrap">
                    {item.name}
                  </div>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Bottom Area: User Badge + Collapse Toggle */}
        <div className="space-y-3 pt-4 border-t border-[#E7D7C7]">
          {/* User Section */}
          <div className={cn("flex items-center", collapsed ? "justify-center" : "justify-between px-1")}>
            <div className="flex items-center gap-2.5 min-w-0">
              <div 
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#EAE0D2] to-[#DFD0BE] text-[#1C1917] font-bold text-xs shrink-0 border border-[#D5C5B2] shadow-2xs"
                title={user?.email || "Analyst"}
              >
                <User className="h-4 w-4 text-[#57534E]" />
              </div>
              {!collapsed && (
                <div className="min-w-0 animate-in fade-in duration-200">
                  <p className="text-xs font-bold text-[#1C1917] truncate" title={user?.email || "Analyst"}>
                    {user?.email?.split("@")[0] || "Researcher"}
                  </p>
                  <p className="text-[10px] text-[#8C827A] truncate font-medium">Pro Workspace</p>
                </div>
              )}
            </div>

            {!collapsed && (
              <button
                onClick={handleLogout}
                className="p-1.5 text-[#8C827A] hover:text-[#DC2626] rounded-lg hover:bg-[#EFE6DC] transition-colors"
                title="Sign out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Toggle Shrink / Expand Button */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold text-[#8C827A] hover:text-[#1C1917] rounded-xl hover:bg-[#EFE6DC] border border-[#E7D7C7] transition-colors shadow-2xs cursor-pointer"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <>
                <ChevronLeft className="h-4 w-4" />
                <span>Collapse Sidebar</span>
              </>
            )}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div 
        className={cn(
          "flex flex-col flex-1 transition-all duration-300 ease-in-out",
          collapsed ? "lg:pl-20" : "lg:pl-64"
        )}
      >
        {/* Top Navbar */}
        <header className="sticky top-0 z-20 border-b border-[#D8C7B5] bg-[#F5EFEB]/90 px-4 py-3 backdrop-blur-md lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2.5">
                <p className="text-sm font-bold tracking-tight text-[#1C1917]">Company Intel Studio</p>
                <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-[#DCFCE7] px-2.5 py-0.5 text-[10px] font-bold text-[#15803D] border border-[#86EFAC] shadow-2xs">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#16A34A] animate-pulse" />
                  Fleet Online
                </span>
              </div>
              <p className="text-[11px] text-[#8C827A] font-medium">Autonomous Multi-Agent Telemetry</p>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Working Interactive Quick Search Button */}
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="hidden items-center gap-2.5 rounded-xl border border-[#D8C7B5] bg-card px-3.5 py-1.5 text-xs font-medium text-[#78716C] md:flex shadow-2xs hover:bg-[#EFE6DC] hover:text-[#1C1917] transition-all cursor-pointer"
              >
                <Search className="h-3.5 w-3.5 text-[#B45309]" />
                <span>Quick search</span>
                <kbd className="hidden lg:inline-block rounded bg-[#EFE6DC] px-1.5 py-0.5 text-[10px] font-mono font-semibold text-[#57534E] border border-[#D8C7B5]">
                  ⌘K
                </kbd>
              </button>
              
              <Button asChild size="sm" variant="outline" className="border-[#D8C7B5] bg-card hover:bg-[#EFE6DC] text-xs font-semibold rounded-xl shadow-2xs">
                <a download href={getCompanyAnalysisCsvUrl()}>
                  <Download className="h-3.5 w-3.5 mr-1 text-[#B45309]" />
                  Export CSV
                </a>
              </Button>
              
              <Button asChild size="sm" className="bg-[#1C1917] text-[#FAF7F2] hover:bg-[#292524] text-xs font-semibold rounded-xl shadow-sm transition-all hover:translate-y-[-1px]">
                <Link to="/analyze" className="flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-[#F59E0B]" />
                  <span>New Analysis</span>
                </Link>
              </Button>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="px-4 py-8 lg:px-8 flex-1 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>

      {/* Interactive Quick Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div 
            className="w-full max-w-lg rounded-2xl border-2 border-[#D4C0AD] bg-white p-4 shadow-2xl ring-1 ring-black/5 animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input Bar */}
            <div className="relative flex items-center border-b border-[#EBE0D3] pb-3">
              <Search className="h-5 w-5 text-[#B45309] shrink-0 ml-1" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search companies by name or industry..."
                className="w-full bg-transparent px-3 text-sm text-[#1C1917] placeholder:text-[#A89C91] focus:outline-none font-medium"
              />
              <button 
                onClick={() => setSearchOpen(false)}
                className="p-1 rounded-md text-[#8C827A] hover:bg-[#FAF6F0] hover:text-[#1C1917]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Results List */}
            <div className="mt-3 max-h-72 overflow-y-auto space-y-1">
              {loadingCompanies ? (
                <div className="py-8 text-center text-xs text-[#8C827A]">Loading companies...</div>
              ) : filteredCompanies.length > 0 ? (
                filteredCompanies.map((c) => (
                  <button
                    key={c.company}
                    onClick={() => handleSelectCompany(c.company)}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl text-left hover:bg-[#FAF6F0] transition-colors group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FAF0E4] text-[#B45309] font-bold text-xs border border-[#EEDBCA]">
                        <Building2 className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#1C1917] group-hover:text-[#B45309] transition-colors">
                          {c.company}
                        </p>
                        <p className="text-[11px] text-[#8C827A]">
                          {c.industry || "Enterprise"} {c.ceo ? `• CEO: ${c.ceo}` : ""}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-[#C4B7AA] group-hover:text-[#B45309] group-hover:translate-x-0.5 transition-all" />
                  </button>
                ))
              ) : (
                <div className="py-8 text-center">
                  <p className="text-sm font-semibold text-[#1C1917]">No companies found</p>
                  <p className="text-xs text-[#8C827A] mt-1">
                    Try analyzing this company under{" "}
                    <Link 
                      to="/analyze" 
                      onClick={() => setSearchOpen(false)}
                      className="text-[#B45309] font-bold underline"
                    >
                      New Analysis
                    </Link>
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="mt-3 pt-2.5 border-t border-[#F2E8DC] flex items-center justify-between text-[11px] text-[#8C827A]">
              <span>Press <kbd className="font-mono bg-[#FAF6F0] px-1 rounded border">ESC</kbd> to exit</span>
              <span>Quick navigation</span>
            </div>
          </div>
          <div className="fixed inset-0 -z-10" onClick={() => setSearchOpen(false)} />
        </div>
      )}
    </div>
  );
}
