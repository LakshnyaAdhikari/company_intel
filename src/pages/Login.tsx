import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { BarChart3, Lock, Mail, ArrowRight, AlertCircle, ShieldCheck } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { loginWithEmail } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/dashboard";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await loginWithEmail(email, password);
      navigate(from, { replace: true });
    } catch (err: any) {
      console.error(err);
      if (err.code === "auth/invalid-credential" || err.code === "auth/wrong-password" || err.code === "auth/user-not-found") {
        setError("Invalid email or password. Please check your credentials.");
      } else if (err.code === "auth/too-many-requests") {
        setError("Too many failed attempts. Please try again later.");
      } else {
        setError(err.message || "Failed to sign in. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5EFEB] text-[#1C1917] selection:bg-[#E2CEB9] selection:text-[#1C1917] font-sans antialiased flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background Gradients & Grid consistent with Landing Page */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-[0.45] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_0%,#000_80%,transparent_100%)]"
          style={{
            backgroundImage: `linear-gradient(to right, #D8C7B5 1px, transparent 1px), linear-gradient(to bottom, #D8C7B5 1px, transparent 1px)`,
            backgroundSize: "3.5rem 3.5rem"
          }}
        />
        <div className="absolute -top-[120px] left-1/2 -translate-x-1/2 w-[750px] h-[450px] bg-gradient-to-tr from-[#F59E0B]/35 via-[#F97316]/25 to-[#D97706]/35 rounded-full blur-[90px]" />
        <div className="absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] bg-[#EAB308]/20 rounded-full blur-[90px]" />
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-3 group">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-b from-[#292524] to-[#1C1917] text-[#FAF7F2] shadow-md shadow-[#1C1917]/15 transition-transform duration-200 group-hover:scale-105">
            <BarChart3 className="h-6 w-6" />
          </div>
          <div className="text-left">
            <div className="flex items-center gap-2">
              <span className="text-base font-bold tracking-tight text-[#1C1917]">Company Intel</span>
              <span className="rounded-full bg-[#E5D5C3] px-2 py-0.5 text-[10px] font-bold text-[#57534E] uppercase tracking-wider">
                Studio
              </span>
            </div>
            <p className="text-[11px] text-[#8C827A] font-medium leading-none mt-0.5">Autonomous Corporate Intelligence</p>
          </div>
        </Link>
        <h2 className="mt-6 text-3xl font-serif font-bold tracking-tight text-[#1C1917]">
          Sign in to your account
        </h2>
        <p className="mt-2 text-sm text-[#57534E]">
          Or{" "}
          <Link to="/signup" className="font-semibold text-[#B45309] hover:underline">
            create a new researcher workspace
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="rounded-2xl border-2 border-[#D4C0AD] bg-white p-8 shadow-[0_20px_50px_-15px_rgba(180,83,9,0.12)] ring-1 ring-black/5">
          {error && (
            <div className="mb-6 flex items-center gap-2.5 rounded-lg bg-red-50 p-3.5 text-xs font-semibold text-red-700 border border-red-200">
              <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#665E57]">
                Email Address
              </label>
              <div className="relative mt-1.5">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#9C8F84]">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="analyst@company.com"
                  className="block w-full rounded-xl border border-[#DBCAB9] bg-[#FAF6F0] py-2.5 pl-10 pr-3.5 text-sm text-[#1C1917] placeholder:text-[#A89C91] focus:border-[#B45309] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#B45309]/20 transition-all font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#665E57]">
                Password
              </label>
              <div className="relative mt-1.5">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#9C8F84]">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="block w-full rounded-xl border border-[#DBCAB9] bg-[#FAF6F0] py-2.5 pl-10 pr-3.5 text-sm text-[#1C1917] placeholder:text-[#A89C91] focus:border-[#B45309] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#B45309]/20 transition-all font-medium"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-11 gap-2 bg-[#1C1917] text-[#FAF7F2] hover:bg-[#292524] shadow-md shadow-[#1C1917]/20 font-semibold rounded-xl transition-all hover:translate-y-[-1px]"
              disabled={loading}
            >
              {loading ? "Authenticating..." : "Sign in to Studio"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          <div className="mt-6 pt-5 border-t border-[#F2E8DC] text-center">
            <div className="flex items-center justify-center gap-1.5 text-xs text-[#8C827A] font-medium">
              <ShieldCheck className="h-3.5 w-3.5 text-[#15803D]" />
              <span>Encrypted enterprise authentication</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
