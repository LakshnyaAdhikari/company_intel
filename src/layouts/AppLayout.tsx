import { BarChart3, Download, GitCompare, LayoutDashboard, Play, Search, Table2 } from "lucide-react";
import { Link, NavLink, Outlet } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getCompanyAnalysisCsvUrl } from "@/services/api";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "New Analysis", href: "/analyze", icon: Play },
  { name: "Companies", href: "/companies", icon: Table2 },
  { name: "Compare", href: "/compare", icon: GitCompare }
];

export function AppLayout() {
  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r bg-card px-4 py-5 shadow-sm lg:block">
        <div className="mb-8 flex items-center gap-3 px-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-sm">
            <BarChart3 className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold leading-5 tracking-normal">Company Intel</p>
            <p className="text-xs text-muted-foreground">Studio</p>
          </div>
        </div>

        <nav className="space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                  isActive && "bg-primary/10 text-primary ring-1 ring-primary/15"
                )
              }
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-10 border-b bg-background/95 px-4 py-3 backdrop-blur lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-sm font-medium">Company Intel Studio</p>
              <p className="text-xs text-muted-foreground">Research workspace</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden items-center gap-2 rounded-md border bg-card px-3 py-2 text-sm text-muted-foreground md:flex">
                <Search className="h-4 w-4" />
                Company intelligence
              </div>
              <Button asChild size="sm" variant="outline">
                <a download href={getCompanyAnalysisCsvUrl()}>
                  <Download className="h-4 w-4" />
                  CSV
                </a>
              </Button>
              <Button asChild size="sm">
                <Link to="/analyze">New Analysis</Link>
              </Button>
            </div>
          </div>
        </header>

        <main className="px-4 py-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
