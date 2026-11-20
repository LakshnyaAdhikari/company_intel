import { BarChart3, Download, GitCompare, LayoutDashboard, Play, Search, Table2, LogOut, User } from "lucide-react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getCompanyAnalysisCsvUrl } from "@/services/api";
import { useAuth } from "@/context/AuthContext";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "New Analysis", href: "/analyze", icon: Play },
  { name: "Companies", href: "/companies", icon: Table2 },
  { name: "Compare", href: "/compare", icon: GitCompare }
];

export function AppLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      console.error("Failed to log out", err);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r bg-card px-4 py-5 shadow-sm lg:block flex-col justify-between">
        <div>
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
        </div>
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

              {/* User Identity & Logout */}
              <div className="flex items-center gap-2 border-l pl-3 ml-1">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <User className="h-3.5 w-3.5" />
                  </div>
                  <span className="hidden sm:inline max-w-[120px] truncate" title={user?.email || "User"}>
                    {user?.email || "Researcher"}
                  </span>
                </div>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="h-8 px-2 text-muted-foreground hover:text-destructive"
                  onClick={handleLogout}
                  title="Sign out"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
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
