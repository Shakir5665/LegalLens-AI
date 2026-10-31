import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();
  const [fullName, setFullName] = useState("");
  const [organization, setOrganization] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Legal Researcher");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard/new');
  };

  const roles = [
    "Law Student",
    "Legal Researcher",
    "Lawyer / Practitioner",
    "Academic / Scholar"
  ];

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

      {/* Registration Card */}
      <div
        className={`w-full max-w-lg rounded-2xl border p-8 shadow-2xl relative z-10 transition-colors ${
          isDark
            ? 'bg-[#0D1914] border-emerald-500/20 shadow-[0_20px_50px_rgba(0,0,0,0.8)]'
            : 'bg-white border-[rgba(5,150,105,0.15)] shadow-[0_15px_40px_rgba(15,23,42,0.06)]'
        }`}
      >
        <div className="pb-6 border-b mb-6 flex flex-col gap-1 border-inherit">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-500 dark:text-emerald-400 font-bold uppercase tracking-wider mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            Account Provisioning
          </div>
          <h1 className="text-[24px] font-extrabold tracking-tight font-headline">
            Create Research Account
          </h1>
          <p className="text-[13px] text-[#52796F] dark:text-[#94A79E]">
            Join LegalLens for evidence-grounded research in Sri Lankan labour jurisprudence.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Full Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-bold uppercase tracking-wider font-mono text-[#52796F] dark:text-[#A3C2B6]">
              Full Name
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g., A. Perera"
              className={`w-full px-4 py-2.5 rounded-xl text-[13px] transition-all focus:outline-none focus:ring-1 ${
                isDark
                  ? 'bg-[#060D0A] border border-emerald-500/20 text-white focus:border-emerald-400 focus:ring-emerald-400/30'
                  : 'bg-[#F4F8F6] border border-[rgba(5,150,105,0.15)] text-[#0F172A] focus:border-[#059669] focus:ring-[#059669]/20'
              }`}
            />
          </div>

          {/* User Role Type */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-bold uppercase tracking-wider font-mono text-[#52796F] dark:text-[#A3C2B6]">
              Primary Designation
            </label>
            <div className="grid grid-cols-2 gap-2">
              {roles.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`py-2 px-3 rounded-xl text-[12px] font-medium border text-left transition-all cursor-pointer ${
                    role === r
                      ? isDark
                        ? "bg-[#13251E] text-emerald-300 border-emerald-400/50 font-bold shadow-[0_0_12px_rgba(16,185,129,0.2)]"
                        : "bg-[#E8F4EE] text-[#059669] border-[#059669] font-bold shadow-sm"
                      : isDark
                      ? "bg-[#060D0A] border-emerald-500/15 text-[#94A79E] hover:border-emerald-500/30"
                      : "bg-[#F4F8F6] border-[rgba(5,150,105,0.12)] text-[#475569] hover:bg-[#E8F4EE]"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Institution / Organization */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-bold uppercase tracking-wider font-mono text-[#52796F] dark:text-[#A3C2B6]">
              University or Organization
            </label>
            <input
              type="text"
              required
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              placeholder="e.g., Faculty of Law, University of Colombo"
              className={`w-full px-4 py-2.5 rounded-xl text-[13px] transition-all focus:outline-none focus:ring-1 ${
                isDark
                  ? 'bg-[#060D0A] border border-emerald-500/20 text-white focus:border-emerald-400 focus:ring-emerald-400/30'
                  : 'bg-[#F4F8F6] border border-[rgba(5,150,105,0.15)] text-[#0F172A] focus:border-[#059669] focus:ring-[#059669]/20'
              }`}
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-bold uppercase tracking-wider font-mono text-[#52796F] dark:text-[#A3C2B6]">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@institution.lk"
              className={`w-full px-4 py-2.5 rounded-xl text-[13px] transition-all focus:outline-none focus:ring-1 ${
                isDark
                  ? 'bg-[#060D0A] border border-emerald-500/20 text-white focus:border-emerald-400 focus:ring-emerald-400/30'
                  : 'bg-[#F4F8F6] border border-[rgba(5,150,105,0.15)] text-[#0F172A] focus:border-[#059669] focus:ring-[#059669]/20'
              }`}
            />
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
            <span>Complete Registration</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-inherit text-center">
          <p className="text-[13px] text-[#52796F] dark:text-[#94A79E]">
            Already have an account?{' '}
            <Link
              to="/auth/login"
              className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
