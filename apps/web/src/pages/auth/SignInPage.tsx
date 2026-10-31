import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

export const SignInPage: React.FC = () => {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();
  const [email, setEmail] = useState("researcher@legallens.local");
  const [password, setPassword] = useState("••••••••••••");
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div
      className={`min-h-screen flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden transition-colors duration-200 ${
        isDark ? 'bg-[#060D0A] text-[#F3FBF7]' : 'bg-[#F4F8F6] text-[#0F172A]'
      }`}
    >
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className={`absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] blur-[140px] rounded-full ${
            isDark ? 'bg-emerald-600/10' : 'bg-[#10B981]/10'
          }`}
        ></div>
      </div>

      {/* Top Bar with Home & Theme Switcher */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div
            className={`w-8 h-8 rounded-lg p-[1px] ${
              isDark
                ? 'bg-gradient-to-br from-emerald-400 to-teal-700'
                : 'bg-gradient-to-br from-[#059669] to-[#10B981]'
            }`}
          >
            <div
              className={`w-full h-full rounded-[7px] flex items-center justify-center ${
                isDark ? 'bg-[#081510] text-emerald-400' : 'bg-white text-[#059669]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">balance</span>
            </div>
          </div>
          <span className="font-extrabold text-[16px] tracking-tight font-headline">LegalLens AI</span>
        </Link>

        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className={`p-2 rounded-xl border transition-all cursor-pointer ${
            isDark
              ? 'bg-[#0D1914] border-emerald-500/20 text-emerald-400 hover:bg-[#13251E]'
              : 'bg-white border-[rgba(5,150,105,0.2)] text-[#059669] hover:bg-[#E8F4EE]'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">
            {isDark ? 'light_mode' : 'dark_mode'}
          </span>
        </button>
      </div>

      {/* Main Authentication Card */}
      <div
        className={`w-full max-w-md rounded-2xl border p-8 shadow-2xl relative z-10 transition-colors ${
          isDark
            ? 'bg-[#0D1914] border-emerald-500/20 shadow-[0_20px_50px_rgba(0,0,0,0.8)]'
            : 'bg-white border-[rgba(5,150,105,0.15)] shadow-[0_15px_40px_rgba(15,23,42,0.06)]'
        }`}
      >
        <div className="pb-6 border-b mb-6 flex flex-col gap-1 border-inherit">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-500 dark:text-emerald-400 font-bold uppercase tracking-wider mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            Chambers Authentication
          </div>
          <h1 className="text-[24px] font-extrabold tracking-tight font-headline">
            Sign In to LegalLens
          </h1>
          <p className="text-[13px] text-[#52796F] dark:text-[#94A79E]">
            Access your verified dockets, extracted authorities, and legal synthesis reports.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-bold uppercase tracking-wider font-mono text-[#52796F] dark:text-[#A3C2B6]">
              Work Email
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[18px] text-[#52796F] dark:text-[#7E9F90]">
                mail
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-[13px] transition-all focus:outline-none focus:ring-1 ${
                  isDark
                    ? 'bg-[#060D0A] border border-emerald-500/20 text-white focus:border-emerald-400 focus:ring-emerald-400/30'
                    : 'bg-[#F4F8F6] border border-[rgba(5,150,105,0.15)] text-[#0F172A] focus:border-[#059669] focus:ring-[#059669]/20'
                }`}
                placeholder="name@organization.lk"
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-[12px] font-bold uppercase tracking-wider font-mono text-[#52796F] dark:text-[#A3C2B6]">
                Password
              </label>
              <a
                href="#"
                className="text-[12px] text-emerald-600 dark:text-emerald-400 hover:underline font-medium"
              >
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[18px] text-[#52796F] dark:text-[#7E9F90]">
                lock
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-[13px] transition-all focus:outline-none focus:ring-1 ${
                  isDark
                    ? 'bg-[#060D0A] border border-emerald-500/20 text-white focus:border-emerald-400 focus:ring-emerald-400/30'
                    : 'bg-[#F4F8F6] border border-[rgba(5,150,105,0.15)] text-[#0F172A] focus:border-[#059669] focus:ring-[#059669]/20'
                }`}
              />
            </div>
          </div>

          {/* Remember Checkbox */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-[13px] text-[#52796F] dark:text-[#94A79E]">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-gray-300 dark:border-emerald-500/30"
              />
              <span>Remember this session</span>
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className={`w-full mt-2 py-3 px-4 rounded-xl font-bold text-[14px] transition-all cursor-pointer flex items-center justify-center gap-2 ${
              isDark
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-[#041F16] shadow-[0_0_20px_rgba(16,185,129,0.35)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]'
                : 'bg-[#059669] hover:bg-[#047857] text-white shadow-[0_4px_16px_rgba(5,150,105,0.25)]'
            }`}
          >
            <span>Enter Chambers Workspace</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-inherit text-center">
          <p className="text-[13px] text-[#52796F] dark:text-[#94A79E]">
            Need a research account?{' '}
            <Link
              to="/auth/register"
              className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
