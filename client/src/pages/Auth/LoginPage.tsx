import { useState, useTransition, useId } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginApi } from "../../service/auth.js";
import { useAuth } from "../../context/AuthContext.tsx";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const emailId = useId();
  const passwordId = useId();

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      setError("All fields are required.");
      return;
    }

    startTransition(async () => {
      try {
        const res = await loginApi({ email, password });
        login(res.data);

        const role = res.data?.user?.role;
        const routes: Record<string, string> = {
          driver: "/driver/dashboard",
          admin: "/admin/dashboard",
        };

        navigate(routes[role] || "/user/dashboard");
      } catch (err: any) {
        setError(err?.response?.data?.message || "Invalid credentials. Please try again.");
        console.error(err);
      }
    });
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-[#fafafa] text-[#111111] selection:bg-neutral-200">
      
      {/* Left Panel: Visual Branding Side (Hidden on Mobile) */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-neutral-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(40,40,40,0.8),transparent)] pointer-events-none" />
        
        {/* Left Side Brand Header */}
        <div className="flex items-center gap-2 z-10 font-medium tracking-tight text-lg">
          <div className="h-6 w-6 rounded-md bg-white flex items-center justify-center text-black font-black text-xs">▲</div>
          <span>Platform</span>
        </div>

        <div className="z-10 max-w-md space-y-3">
          <h2 className="text-3xl font-normal tracking-tight leading-tight">
            Streamlining fleet routing and administration in real-time.
          </h2>
          <p className="text-sm text-neutral-400 font-light">
            Secure connection protocols safeguard your operations dashboard and logistics data pipelines.
          </p>
        </div>

        <div className="z-10 text-xs text-neutral-500 font-light">
          &copy; {new Date().getFullYear()} Platform Inc. All rights reserved.
        </div>
      </div>

      {/* Right Panel: The Modern Login Form */}
      <div className="flex items-center justify-center p-6 sm:p-12 relative">
        <div className="w-full max-w-[420px] space-y-8">
          
          {/* Header Block with Logo Slot */}
          <div className="space-y-6">
            
            {/* Logo Wrapper Asset Container */}
            <div className="flex items-center gap-2.5">
              {/* Option A: Modern Inline CSS Shape Placeholder */}
              <div className="h-9 w-9 rounded-xl bg-neutral-950 flex items-center justify-center text-white font-black text-sm shadow-sm">
                ▲
              </div>
              
              {/* Option B: Standard Image Tag (Uncomment and add your path when ready) */}
              {/* <img src="/logo.svg" alt="Company Logo" className="h-9 w-auto" /> */}
              
              <span className="font-semibold tracking-tight text-base text-neutral-900">Platform</span>
            </div>

            {/* Typography Heading Group */}
            <div className="space-y-1.5">
              <h1 className="text-3xl font-semibold tracking-tight text-neutral-900">Welcome back</h1>
              <p className="text-sm text-neutral-500 font-light">Enter your credentials to manage your workflow</p>
            </div>
            
          </div>

          {/* Dynamic Error State */}
          {error && (
            <div className="p-3.5 text-xs font-medium text-red-600 bg-red-50/60 backdrop-blur-sm rounded-xl border border-red-100/80 flex items-center gap-2.5 animate-in fade-in slide-in-from-top-2 duration-200">
              <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {/* Form Layer */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              
              {/* Email Field */}
              <div className="space-y-1.5">
                <label htmlFor={emailId} className="text-xs font-medium text-neutral-700">Email Address</label>
                <div className="relative">
                  <input
                    id={emailId}
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    disabled={isPending}
                    placeholder="name@company.com"
                    className="w-full bg-white border border-neutral-200/80 px-4 py-3 rounded-xl text-sm transition-all focus:border-neutral-900 focus:ring-4 focus:ring-neutral-100/80 focus:outline-none disabled:bg-neutral-50 disabled:text-neutral-400 placeholder:text-neutral-400 font-light"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label htmlFor={passwordId} className="text-xs font-medium text-neutral-700">Password</label>
                  <a href="#forgot" className="text-xs text-neutral-500 hover:text-neutral-900 transition-colors font-light">Forgot?</a>
                </div>
                <div className="relative">
                  <input
                    id={passwordId}
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    disabled={isPending}
                    placeholder="••••••••"
                    className="w-full bg-white border border-neutral-200/80 pl-4 pr-11 py-3 rounded-xl text-sm transition-all focus:border-neutral-900 focus:ring-4 focus:ring-neutral-100/80 focus:outline-none disabled:bg-neutral-50 disabled:text-neutral-400 placeholder:text-neutral-400 tracking-wide font-light"
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 p-1 rounded transition-colors focus:outline-none"
                  >
                    {showPassword ? (
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" /></svg>
                    ) : (
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                    )}
                  </button>
                </div>
              </div>

            </div>

            {/* Actions Block */}
            <div className="space-y-4">
              <button
                type="submit"
                disabled={isPending}
                className="w-full bg-neutral-950 hover:bg-neutral-850 active:scale-[0.99] text-white py-3 rounded-xl text-sm font-medium transition-all flex items-center justify-center min-h-[46px] shadow-sm hover:shadow focus:ring-4 focus:ring-neutral-200 disabled:bg-neutral-300 disabled:scale-100 disabled:cursor-not-allowed"
              >
                {isPending ? (
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                ) : (
                  "Continue"
                )}
              </button>

              <p className="text-center text-xs text-neutral-500 font-light">
                Don&apos;t have an account?{" "}
                <Link 
                  to="/register" 
                  className="font-medium text-neutral-900 hover:underline underline-offset-4 transition-all"
                >
                  Create an account
                </Link>
              </p>
            </div>
          </form>

        </div>
      </div>

    </div>
  );
}
