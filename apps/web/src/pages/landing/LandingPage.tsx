import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeQueryIndex, setActiveQueryIndex] = useState(0);
  const { isDark, toggleTheme } = useTheme();

  const sampleQueries = [
    {
      title: "Wrongful Termination & Just Relief",
      query: "Termination without domestic inquiry under Industrial Disputes Act Sec. 31B — available remedies & back-wage standards.",
      statute: "Industrial Disputes Act No. 43 of 1950, Sec. 31B(1)(b)",
      holding: "Labour Tribunal possesses wide equitable jurisdiction to award compensation in lieu of reinstatement where employment relationship has broken down irretrievably.",
      groundingScore: "99.8%",
      citationsFound: 14,
    },
    {
      title: "Probationer Dismissal Standards",
      query: "Can a probationary employee claim relief for unfair dismissal before the Labour Tribunal?",
      statute: "Industrial Disputes Act, Sec. 31B read with termination case law",
      holding: "Probationers are protected against arbitrary termination; employer must demonstrate bonafide assessment of incompetence.",
      groundingScore: "99.2%",
      citationsFound: 9,
    },
    {
      title: "Gratuity Forfeiture Limitations",
      query: "Conditions under which Payment of Gratuity Act allows forfeiture for employee misconduct.",
      statute: "Payment of Gratuity Act No. 12 of 1983, Sec. 13",
      holding: "Forfeiture is strictly restricted to financial damage caused to employer and cannot be punitive or automatic without documented loss.",
      groundingScore: "100%",
      citationsFound: 18,
    }
  ];

  const activeQuery = sampleQueries[activeQueryIndex];

  return (
    <div
      className={`min-h-screen flex flex-col font-sans antialiased transition-colors duration-300 selection:bg-emerald-500/30 ${
        isDark
          ? 'bg-[#060D0A] text-[#F3FBF7] selection:text-emerald-200'
          : 'bg-[#F4F8F6] text-[#0F172A] selection:text-[#064E3B]'
      }`}
    >
      {/* BACKGROUND AMBIENT GLOWS */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {isDark ? (
          <>
            <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-emerald-500/15 via-emerald-700/5 to-transparent blur-[140px] rounded-full"></div>
            <div className="absolute top-[40%] -left-[10%] w-[500px] h-[500px] bg-emerald-600/5 blur-[120px] rounded-full"></div>
            <div className="absolute top-[60%] -right-[10%] w-[500px] h-[500px] bg-teal-600/5 blur-[120px] rounded-full"></div>
            <div className="absolute inset-0 bg-[radial-gradient(#10B981_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03]"></div>
          </>
        ) : (
          <>
            <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-[#10B981]/12 via-[#059669]/5 to-transparent blur-[140px] rounded-full"></div>
            <div className="absolute top-[40%] -left-[10%] w-[500px] h-[500px] bg-[#059669]/6 blur-[120px] rounded-full"></div>
            <div className="absolute top-[60%] -right-[10%] w-[500px] h-[500px] bg-[#10B981]/6 blur-[120px] rounded-full"></div>
            <div className="absolute inset-0 bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.035]"></div>
          </>
        )}
      </div>

      {/* 1. MODERN FIXED NAVBAR */}
      <header
        className={`fixed top-0 left-0 right-0 h-16 backdrop-blur-xl z-50 px-4 md:px-8 flex items-center justify-between transition-colors duration-300 ${
          isDark
            ? 'bg-[#060D0A]/85 border-b border-emerald-500/15'
            : 'bg-[#F4F8F6]/85 border-b border-[rgba(5,150,105,0.12)]'
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-lg p-[1px] transition-all ${
              isDark
                ? 'bg-gradient-to-br from-emerald-400 to-teal-700 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                : 'bg-gradient-to-br from-[#059669] to-[#10B981] shadow-[0_2px_10px_rgba(5,150,105,0.2)]'
            }`}
          >
            <div
              className={`w-full h-full rounded-[7px] flex items-center justify-center transition-colors ${
                isDark ? 'bg-[#081510] text-emerald-400' : 'bg-white text-[#059669]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">balance</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`font-bold text-[17px] tracking-tight font-headline transition-colors ${
                isDark ? 'text-white' : 'text-[#0F172A]'
              }`}
            >
              LegalLens AI
            </span>
            <span
              className={`hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full font-mono text-[10px] uppercase tracking-wider font-semibold border transition-colors ${
                isDark
                  ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'
                  : 'bg-[#E8F4EE] border-[rgba(5,150,105,0.25)] text-[#064E3B]'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                  isDark ? 'bg-emerald-400' : 'bg-[#059669]'
                }`}
              ></span>
              Agentic Core v2.4
            </span>
          </div>
        </div>

        <nav
          className={`hidden md:flex items-center gap-8 text-[13px] font-medium transition-colors ${
            isDark ? 'text-[#7E9F90]' : 'text-[#52796F]'
          }`}
        >
          <a
            href="#features"
            className={`transition-colors ${isDark ? 'hover:text-emerald-300' : 'hover:text-[#059669]'}`}
          >
            Core Capabilities
          </a>
          <a
            href="#preview"
            className={`transition-colors ${isDark ? 'hover:text-emerald-300' : 'hover:text-[#059669]'}`}
          >
            Query Sandbox
          </a>
          <a
            href="#dataset-notice"
            className={`transition-colors ${isDark ? 'hover:text-emerald-300' : 'hover:text-[#059669]'}`}
          >
            Simulated Scope
          </a>
        </nav>

        <div className="flex items-center gap-3">
          {/* THEME TOGGLE BUTTON */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle color theme"
            className={`p-2 rounded-lg border transition-all flex items-center justify-center cursor-pointer ${
              isDark
                ? 'bg-[#0D1914] border-emerald-500/25 text-emerald-400 hover:bg-[#13251E] shadow-sm'
                : 'bg-white border-[rgba(5,150,105,0.2)] text-[#059669] hover:bg-[#E8F4EE] shadow-sm'
            }`}
            title={isDark ? "Switch to Light Theme" : "Switch to Dark Theme"}
          >
            <span className="material-symbols-outlined text-[19px]">
              {isDark ? 'light_mode' : 'dark_mode'}
            </span>
          </button>

          <Link
            to="/auth/login"
            className={`text-[13px] font-medium px-3 py-1.5 rounded-lg transition-colors ${
              isDark
                ? 'text-[#94A79E] hover:text-white'
                : 'text-[#475569] hover:text-[#0F172A]'
            }`}
          >
            Sign In
          </Link>

          <button
            onClick={() => navigate('/dashboard')}
            className={`relative group overflow-hidden px-4 py-2 rounded-lg text-[13px] font-bold tracking-tight transition-all cursor-pointer flex items-center gap-1.5 ${
              isDark
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-[#041F16] shadow-[0_0_20px_rgba(16,185,129,0.35)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)]'
                : 'bg-[#059669] hover:bg-[#047857] text-white shadow-[0_2px_12px_rgba(5,150,105,0.25)]'
            }`}
          >
            <span>Launch Platform</span>
            <span className="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">
              arrow_forward
            </span>
          </button>
        </div>
      </header>

      {/* MAIN CONTENT WRAPPER */}
      <main className="relative z-10 w-full pt-16 flex-1 flex flex-col">

        {/* HIGH-TECH NOTICE STRIP */}
        <div
          className={`w-full py-2 px-4 text-center border-b transition-colors duration-300 ${
            isDark
              ? 'bg-[#0D1914] border-emerald-500/15'
              : 'bg-[#E8F4EE] border-[rgba(5,150,105,0.12)]'
          }`}
        >
          <div className="inline-flex items-center gap-2 text-[12px] font-mono flex-wrap justify-center">
            <span
              className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                isDark
                  ? 'bg-emerald-500/20 text-emerald-300'
                  : 'bg-[#059669]/15 text-[#064E3B]'
              }`}
            >
              Sandbox Scope
            </span>
            <span className={isDark ? 'text-[#94A79E]' : 'text-[#475569]'}>
              Evaluated on simulated Sri Lankan employment law dataset (Section 13 Compliance). Designed for academic & technical validation.
            </span>
          </div>
        </div>

        {/* 2. HERO SECTION */}
        <section className="relative pt-16 md:pt-24 pb-20 px-4 md:px-8 max-w-7xl mx-auto w-full flex flex-col items-center text-center">
          
          {/* Eyebrow Pill */}
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full mb-6 border transition-all ${
              isDark
                ? 'bg-emerald-950/60 border-emerald-500/30 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.15)]'
                : 'bg-[#E8F4EE] border-[rgba(5,150,105,0.25)] text-[#064E3B] shadow-[0_2px_10px_rgba(5,150,105,0.06)]'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full animate-ping ${
                isDark ? 'bg-emerald-400' : 'bg-[#059669]'
              }`}
            ></span>
            <span className="font-mono text-[11px] uppercase tracking-widest font-semibold">
              Multi-Agent Judicial Intelligence • Sri Lankan Labour Law
            </span>
          </div>

          {/* Minimal High-Impact H1 */}
          <h1
            className={`text-[44px] sm:text-[62px] lg:text-[72px] font-extrabold tracking-[-0.035em] leading-[1.08] max-w-4xl font-headline mb-6 transition-colors ${
              isDark ? 'text-white' : 'text-[#0F172A]'
            }`}
          >
            Judicial Intelligence.{' '}
            <span
              className={`text-transparent bg-clip-text ${
                isDark
                  ? 'bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200 drop-shadow-[0_0_30px_rgba(16,185,129,0.3)]'
                  : 'bg-gradient-to-r from-[#059669] via-[#10B981] to-[#047857]'
              }`}
            >
              Zero Hallucinations.
            </span>
          </h1>

          {/* Concise Subhead */}
          <p
            className={`text-[16px] sm:text-[18px] max-w-2xl mb-8 leading-relaxed font-normal transition-colors ${
              isDark ? 'text-[#94A79E]' : 'text-[#475569]'
            }`}
          >
            Deterministic AI legal research. Formulate complex queries, cross-examine primary statutory passages, and generate structured briefs grounded in verified rulings.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto mb-16">
            <button
              onClick={() => navigate('/dashboard')}
              className={`w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-[15px] transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98] ${
                isDark
                  ? 'bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-500 text-[#041F16] shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:shadow-[0_0_40px_rgba(16,185,129,0.6)]'
                  : 'bg-[#059669] hover:bg-[#047857] text-white shadow-[0_4px_20px_rgba(5,150,105,0.3)] hover:shadow-[0_6px_25px_rgba(5,150,105,0.4)]'
              }`}
            >
              <span>Explore Research Workspace</span>
              <span className="material-symbols-outlined text-[19px]">arrow_forward</span>
            </button>

            <Link
              to="/research/new"
              className={`w-full sm:w-auto px-6 py-3.5 rounded-xl font-medium text-[15px] transition-all flex items-center justify-center gap-2 border ${
                isDark
                  ? 'bg-[#0D1914] border-emerald-500/25 hover:border-emerald-500/50 hover:bg-[#13251E] text-white shadow-[0_4px_16px_rgba(0,0,0,0.4)]'
                  : 'bg-white border-[rgba(5,150,105,0.2)] hover:border-[#059669]/40 hover:bg-[#E8F4EE] text-[#0F172A] shadow-[0_2px_8px_rgba(0,0,0,0.04)]'
              }`}
            >
              <span
                className={`material-symbols-outlined text-[19px] ${
                  isDark ? 'text-emerald-400' : 'text-[#059669]'
                }`}
              >
                search
              </span>
              <span>Try Sample Query</span>
            </Link>
          </div>

          {/* 3. HIGH-GRAPHICS HERO COCKPIT MOCKUP */}
          <div
            className={`w-full max-w-5xl rounded-2xl p-[1px] transition-all duration-300 ${
              isDark
                ? 'bg-gradient-to-b from-emerald-500/30 via-emerald-500/10 to-transparent shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_50px_rgba(16,185,129,0.15)]'
                : 'bg-gradient-to-b from-[rgba(5,150,105,0.25)] via-[rgba(5,150,105,0.08)] to-transparent shadow-[0_20px_50px_rgba(15,23,42,0.08)]'
            }`}
          >
            <div
              className={`rounded-[15px] overflow-hidden text-left flex flex-col border transition-colors duration-300 ${
                isDark
                  ? 'bg-[#0A1410] border-emerald-500/20'
                  : 'bg-white border-[rgba(5,150,105,0.15)]'
              }`}
            >
              
              {/* Window Header */}
              <div
                className={`h-11 px-4 flex items-center justify-between border-b transition-colors ${
                  isDark
                    ? 'bg-[#0D1914] border-emerald-500/15'
                    : 'bg-[#E8F4EE] border-[rgba(5,150,105,0.12)]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`w-3 h-3 rounded-full ${isDark ? 'bg-[#2A3F35]' : 'bg-[#CBD5E1]'}`}
                  ></span>
                  <span
                    className={`w-3 h-3 rounded-full ${isDark ? 'bg-[#2A3F35]' : 'bg-[#CBD5E1]'}`}
                  ></span>
                  <span
                    className={`w-3 h-3 rounded-full ${isDark ? 'bg-emerald-500/80' : 'bg-[#059669]'}`}
                  ></span>
                </div>
                
                <div
                  className={`flex items-center gap-2 px-3 py-1 rounded-md font-mono text-[11px] max-w-md truncate border ${
                    isDark
                      ? 'bg-[#060D0A] border-emerald-500/20 text-[#A3C2B6]'
                      : 'bg-white border-[rgba(5,150,105,0.2)] text-[#52796F]'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${isDark ? 'bg-emerald-400' : 'bg-[#059669]'}`}
                  ></span>
                  <span>legallens.internal/research/run-9042b</span>
                </div>

                <div
                  className={`flex items-center gap-1.5 font-mono text-[11px] font-semibold ${
                    isDark ? 'text-emerald-400' : 'text-[#059669]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[15px]">verified</span>
                  <span>STRICT GROUNDING</span>
                </div>
              </div>

              {/* Research Cockpit Body */}
              <div className="p-5 md:p-7 space-y-6">
                
                {/* Active Inquiry Bar */}
                <div
                  className={`p-3.5 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-inner transition-colors ${
                    isDark
                      ? 'bg-[#060D0A] border-emerald-500/25'
                      : 'bg-[#F4F8F6] border-[rgba(5,150,105,0.15)]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        isDark ? 'bg-emerald-500/15 text-emerald-400' : 'bg-[#E8F4EE] text-[#059669]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px]">gavel</span>
                    </div>
                    <div>
                      <div
                        className={`text-[10px] font-mono uppercase tracking-wider font-semibold ${
                          isDark ? 'text-emerald-400' : 'text-[#059669]'
                        }`}
                      >
                        Active Research Problem
                      </div>
                      <div
                        className={`text-[14px] font-medium ${
                          isDark ? 'text-white' : 'text-[#0F172A]'
                        }`}
                      >
                        "Termination for operational retrenchment without statutory notice under Sri Lankan Law"
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start md:self-auto shrink-0 font-mono text-[11px]">
                    <span
                      className={`px-2 py-1 rounded border ${
                        isDark
                          ? 'bg-[#13251E] text-emerald-300 border-emerald-500/30'
                          : 'bg-white text-[#064E3B] border-[rgba(5,150,105,0.2)]'
                      }`}
                    >
                      24 Precedents
                    </span>
                    <span
                      className={`px-2 py-1 rounded font-bold ${
                        isDark
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-[#059669]/15 text-[#064E3B]'
                      }`}
                    >
                      Grounded: 99.8%
                    </span>
                  </div>
                </div>

                {/* Multi-Agent Live Pipeline Visualizer */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  
                  {/* Agent 1 */}
                  <div
                    className={`p-4 rounded-xl border relative overflow-hidden transition-colors ${
                      isDark
                        ? 'bg-[#0E1F18] border-emerald-500/20'
                        : 'bg-[#F8FAF9] border-[rgba(5,150,105,0.15)]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`text-[11px] font-mono uppercase tracking-wider font-semibold flex items-center gap-1.5 ${
                          isDark ? 'text-emerald-400' : 'text-[#059669]'
                        }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${isDark ? 'bg-emerald-400' : 'bg-[#059669]'}`}
                        ></span>
                        Agent 01: Retriever
                      </span>
                      <span
                        className={`material-symbols-outlined text-[18px] ${
                          isDark ? 'text-emerald-400' : 'text-[#059669]'
                        }`}
                      >
                        database
                      </span>
                    </div>
                    <div
                      className={`text-[13px] font-semibold mb-1 ${
                        isDark ? 'text-white' : 'text-[#0F172A]'
                      }`}
                    >
                      Hybrid Vector + BM25
                    </div>
                    <div
                      className={`text-[11px] leading-snug ${
                        isDark ? 'text-[#7E9F90]' : 'text-[#52796F]'
                      }`}
                    >
                      Cosine 0.942. Indexed 3 statutory enactments and 12 tribunal rulings.
                    </div>
                    <div
                      className={`mt-3 flex items-center gap-1 text-[10px] font-mono ${
                        isDark ? 'text-emerald-300' : 'text-[#059669]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[13px]">check_circle</span>
                      <span>Passage tokens extracted</span>
                    </div>
                  </div>

                  {/* Agent 2 */}
                  <div
                    className={`p-4 rounded-xl border relative overflow-hidden transition-all ${
                      isDark
                        ? 'bg-[#0E1F18] border-emerald-400/40 shadow-[0_0_20px_rgba(16,185,129,0.1)]'
                        : 'bg-[#E8F4EE] border-[#059669]/35 shadow-[0_2px_12px_rgba(5,150,105,0.08)]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`text-[11px] font-mono uppercase tracking-wider font-semibold flex items-center gap-1.5 ${
                          isDark ? 'text-emerald-300' : 'text-[#064E3B]'
                        }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full animate-pulse ${
                            isDark ? 'bg-emerald-300' : 'bg-[#059669]'
                          }`}
                        ></span>
                        Agent 02: Citation Verifier
                      </span>
                      <span
                        className={`material-symbols-outlined text-[18px] ${
                          isDark ? 'text-emerald-300' : 'text-[#059669]'
                        }`}
                      >
                        fact_check
                      </span>
                    </div>
                    <div
                      className={`text-[13px] font-semibold mb-1 ${
                        isDark ? 'text-white' : 'text-[#0F172A]'
                      }`}
                    >
                      Deterministic Cross-Check
                    </div>
                    <div
                      className={`text-[11px] leading-snug ${
                        isDark ? 'text-[#7E9F90]' : 'text-[#52796F]'
                      }`}
                    >
                      Line-by-line verification against source ratio decidendi. 0 ungrounded claims.
                    </div>
                    <div
                      className={`mt-3 flex items-center gap-1 text-[10px] font-mono ${
                        isDark ? 'text-emerald-300' : 'text-[#064E3B]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[13px]">shield_check</span>
                      <span>Zero hallucination guarantee</span>
                    </div>
                  </div>

                  {/* Agent 3 */}
                  <div
                    className={`p-4 rounded-xl border relative overflow-hidden transition-colors ${
                      isDark
                        ? 'bg-[#0E1F18] border-emerald-500/20'
                        : 'bg-[#F8FAF9] border-[rgba(5,150,105,0.15)]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`text-[11px] font-mono uppercase tracking-wider font-semibold flex items-center gap-1.5 ${
                          isDark ? 'text-emerald-400' : 'text-[#059669]'
                        }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${isDark ? 'bg-emerald-400' : 'bg-[#059669]'}`}
                        ></span>
                        Agent 03: Synthesizer
                      </span>
                      <span
                        className={`material-symbols-outlined text-[18px] ${
                          isDark ? 'text-emerald-400' : 'text-[#059669]'
                        }`}
                      >
                        article
                      </span>
                    </div>
                    <div
                      className={`text-[13px] font-semibold mb-1 ${
                        isDark ? 'text-white' : 'text-[#0F172A]'
                      }`}
                    >
                      Defensible Brief Export
                    </div>
                    <div
                      className={`text-[11px] leading-snug ${
                        isDark ? 'text-[#7E9F90]' : 'text-[#52796F]'
                      }`}
                    >
                      Organized holding matrices, statutory footnotes, and comparison charts.
                    </div>
                    <div
                      className={`mt-3 flex items-center gap-1 text-[10px] font-mono ${
                        isDark ? 'text-emerald-300' : 'text-[#059669]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[13px]">file_download</span>
                      <span>Structured synthesis ready</span>
                    </div>
                  </div>

                </div>

                {/* Evidence Passage Highlight Box */}
                <div
                  className={`p-4 rounded-xl border transition-colors ${
                    isDark
                      ? 'bg-[#060D0A] border-emerald-500/20'
                      : 'bg-[#F8FAF9] border-[rgba(5,150,105,0.15)]'
                  }`}
                >
                  <div
                    className={`flex flex-wrap items-center justify-between gap-2 mb-2 pb-2 border-b ${
                      isDark ? 'border-emerald-500/10' : 'border-[rgba(5,150,105,0.12)]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-0.5 rounded font-mono text-[10px] font-semibold uppercase ${
                          isDark
                            ? 'bg-emerald-500/15 text-emerald-300'
                            : 'bg-[#E8F4EE] text-[#064E3B]'
                        }`}
                      >
                        Verified Passage Link #1
                      </span>
                      <span
                        className={`text-[12px] font-mono font-medium ${
                          isDark ? 'text-white' : 'text-[#0F172A]'
                        }`}
                      >
                        Industrial Disputes Act No. 43 of 1950 • Sec. 31B(1)
                      </span>
                    </div>
                    <span
                      className={`text-[11px] font-mono flex items-center gap-1 ${
                        isDark ? 'text-emerald-400' : 'text-[#059669]'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          isDark ? 'bg-emerald-400' : 'bg-[#059669]'
                        }`}
                      ></span>
                      100% Exact Passage Match
                    </span>
                  </div>

                  <p
                    className={`text-[13px] leading-relaxed italic p-2.5 rounded-lg border-l-2 ${
                      isDark
                        ? 'bg-emerald-950/20 border-emerald-400 text-[#A3C2B6]'
                        : 'bg-[#E8F4EE] border-[#059669] text-[#064E3B]'
                    }`}
                  >
                    "A workman or a trade union on behalf of a workman may make an application in writing to a Labour Tribunal for relief or redress in respect of the termination of his services by his employer... and the tribunal shall make such order as may appear to the tribunal to be just and equitable."
                  </p>
                </div>

              </div>
            </div>
          </div>

        </section>

        {/* 4. HIGH-IMPACT METRICS STRIP */}
        <section
          className={`w-full py-10 px-4 border-y transition-colors duration-300 ${
            isDark
              ? 'bg-[#08120D] border-emerald-500/15'
              : 'bg-[#E8F4EE] border-[rgba(5,150,105,0.15)]'
          }`}
        >
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            
            <div className="flex flex-col items-center">
              <span
                className={`text-[34px] md:text-[42px] font-extrabold font-headline tracking-tight ${
                  isDark ? 'text-white' : 'text-[#0F172A]'
                }`}
              >
                100%
              </span>
              <span
                className={`text-[12px] font-mono uppercase tracking-wider font-semibold ${
                  isDark ? 'text-emerald-400' : 'text-[#059669]'
                }`}
              >
                Evidence Grounded
              </span>
              <span
                className={`text-[11px] mt-0.5 ${
                  isDark ? 'text-[#7E9F90]' : 'text-[#52796F]'
                }`}
              >
                Every fact pinned to primary text
              </span>
            </div>

            <div className="flex flex-col items-center">
              <span
                className={`text-[34px] md:text-[42px] font-extrabold font-headline tracking-tight ${
                  isDark ? 'text-white' : 'text-[#0F172A]'
                }`}
              >
                &lt; 1.2s
              </span>
              <span
                className={`text-[12px] font-mono uppercase tracking-wider font-semibold ${
                  isDark ? 'text-emerald-400' : 'text-[#059669]'
                }`}
              >
                Sub-Second Lookup
              </span>
              <span
                className={`text-[11px] mt-0.5 ${
                  isDark ? 'text-[#7E9F90]' : 'text-[#52796F]'
                }`}
              >
                Statutory & tribunal index speed
              </span>
            </div>

            <div className="flex flex-col items-center">
              <span
                className={`text-[34px] md:text-[42px] font-extrabold font-headline tracking-tight ${
                  isDark ? 'text-white' : 'text-[#0F172A]'
                }`}
              >
                0
              </span>
              <span
                className={`text-[12px] font-mono uppercase tracking-wider font-semibold ${
                  isDark ? 'text-emerald-400' : 'text-[#059669]'
                }`}
              >
                Hallucinated Authorities
              </span>
              <span
                className={`text-[11px] mt-0.5 ${
                  isDark ? 'text-[#7E9F90]' : 'text-[#52796F]'
                }`}
              >
                Automated citation quarantine
              </span>
            </div>

            <div className="flex flex-col items-center">
              <span
                className={`text-[34px] md:text-[42px] font-extrabold font-headline tracking-tight ${
                  isDark ? 'text-white' : 'text-[#0F172A]'
                }`}
              >
                3-Tier
              </span>
              <span
                className={`text-[12px] font-mono uppercase tracking-wider font-semibold ${
                  isDark ? 'text-emerald-400' : 'text-[#059669]'
                }`}
              >
                Agentic Pipeline
              </span>
              <span
                className={`text-[11px] mt-0.5 ${
                  isDark ? 'text-[#7E9F90]' : 'text-[#52796F]'
                }`}
              >
                Retriever, verifier, synthesizer
              </span>
            </div>

          </div>
        </section>

        {/* 5. BENTO GRID: CORE CAPABILITIES */}
        <section id="features" className="py-24 px-4 md:px-8 max-w-7xl mx-auto w-full">
          
          <div className="flex flex-col items-center text-center mb-14">
            <span
              className={`px-3 py-1 rounded-full font-mono text-[11px] uppercase tracking-widest font-semibold mb-3 border ${
                isDark
                  ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                  : 'bg-[#E8F4EE] border-[rgba(5,150,105,0.25)] text-[#059669]'
              }`}
            >
              Engineered for Zero Doubt
            </span>
            <h2
              className={`text-[32px] sm:text-[44px] font-extrabold font-headline tracking-tight max-w-2xl transition-colors ${
                isDark ? 'text-white' : 'text-[#0F172A]'
              }`}
            >
              High-Precision Instruments for Legal Investigation
            </h2>
            <p
              className={`text-[15px] max-w-xl mt-3 transition-colors ${
                isDark ? 'text-[#94A79E]' : 'text-[#475569]'
              }`}
            >
              Replace generative guesswork with deterministic retrieval and automated evidence validation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            {/* Bento Card 1: Hybrid Retrieval */}
            <div
              className={`p-7 rounded-2xl border transition-all flex flex-col justify-between group ${
                isDark
                  ? 'bg-[#0D1914] border-emerald-500/20 hover:border-emerald-500/40 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
                  : 'bg-white border-[rgba(5,150,105,0.15)] hover:border-[#059669]/40 shadow-[0_4px_20px_rgba(15,23,42,0.04)] hover:shadow-[0_8px_30px_rgba(5,150,105,0.1)]'
              }`}
            >
              <div>
                <div
                  className={`w-11 h-11 rounded-xl border flex items-center justify-center mb-5 group-hover:scale-105 transition-transform ${
                    isDark
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                      : 'bg-[#E8F4EE] border-[rgba(5,150,105,0.25)] text-[#059669]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[24px]">manage_search</span>
                </div>
                <div
                  className={`text-[11px] font-mono uppercase tracking-wider font-semibold mb-1 ${
                    isDark ? 'text-emerald-400' : 'text-[#059669]'
                  }`}
                >
                  Capability 01
                </div>
                <h3
                  className={`text-[20px] font-bold mb-2 font-headline ${
                    isDark ? 'text-white' : 'text-[#0F172A]'
                  }`}
                >
                  Hybrid Legal Retrieval
                </h3>
                <p
                  className={`text-[13px] leading-relaxed ${
                    isDark ? 'text-[#94A79E]' : 'text-[#475569]'
                  }`}
                >
                  Fuses high-dimensional semantic embeddings with BM25 statutory lexical search. Captures conceptual legal precedents while maintaining exact statutory keyword precision.
                </p>
              </div>

              {/* Graphic snippet */}
              <div
                className={`mt-6 p-3.5 rounded-xl border font-mono text-[11px] ${
                  isDark
                    ? 'bg-[#060D0A] border-emerald-500/15 text-[#7E9F90]'
                    : 'bg-[#F4F8F6] border-[rgba(5,150,105,0.12)] text-[#52796F]'
                }`}
              >
                <div
                  className={`flex justify-between items-center text-[10px] mb-1.5 font-bold ${
                    isDark ? 'text-emerald-300' : 'text-[#059669]'
                  }`}
                >
                  <span>VECTOR SIMILARITY</span>
                  <span>98.6% MATCH</span>
                </div>
                <div
                  className={`w-full h-1.5 rounded-full overflow-hidden ${
                    isDark ? 'bg-[#13251E]' : 'bg-[#E0ECE5]'
                  }`}
                >
                  <div className="bg-gradient-to-r from-[#059669] to-[#10B981] h-full w-[98%]"></div>
                </div>
              </div>
            </div>

            {/* Bento Card 2: Citation Verification */}
            <div
              className={`p-7 rounded-2xl border transition-all flex flex-col justify-between group ${
                isDark
                  ? 'bg-[#0D1914] border-emerald-500/20 hover:border-emerald-500/40 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
                  : 'bg-white border-[rgba(5,150,105,0.15)] hover:border-[#059669]/40 shadow-[0_4px_20px_rgba(15,23,42,0.04)] hover:shadow-[0_8px_30px_rgba(5,150,105,0.1)]'
              }`}
            >
              <div>
                <div
                  className={`w-11 h-11 rounded-xl border flex items-center justify-center mb-5 group-hover:scale-105 transition-transform ${
                    isDark
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                      : 'bg-[#E8F4EE] border-[rgba(5,150,105,0.25)] text-[#059669]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[24px]">verified_user</span>
                </div>
                <div
                  className={`text-[11px] font-mono uppercase tracking-wider font-semibold mb-1 ${
                    isDark ? 'text-emerald-400' : 'text-[#059669]'
                  }`}
                >
                  Capability 02
                </div>
                <h3
                  className={`text-[20px] font-bold mb-2 font-headline ${
                    isDark ? 'text-white' : 'text-[#0F172A]'
                  }`}
                >
                  Deterministic Citation Verifier
                </h3>
                <p
                  className={`text-[13px] leading-relaxed ${
                    isDark ? 'text-[#94A79E]' : 'text-[#475569]'
                  }`}
                >
                  Every factual assertion and ratio decidendi is cross-checked against source texts. Statements failing line-by-line verification are immediately flagged.
                </p>
              </div>

              {/* Graphic snippet */}
              <div
                className={`mt-6 p-3 rounded-xl border flex items-center justify-between text-[11px] font-mono ${
                  isDark
                    ? 'bg-[#060D0A] border-emerald-500/15'
                    : 'bg-[#F4F8F6] border-[rgba(5,150,105,0.12)]'
                }`}
              >
                <span
                  className={`flex items-center gap-1.5 ${
                    isDark ? 'text-white' : 'text-[#0F172A]'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${isDark ? 'bg-emerald-400' : 'bg-[#059669]'}`}
                  ></span>
                  Passage Verifier
                </span>
                <span
                  className={`px-2 py-0.5 rounded font-semibold text-[10px] ${
                    isDark
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : 'bg-[#059669]/15 text-[#064E3B]'
                  }`}
                >
                  0 Quarantined
                </span>
              </div>
            </div>

            {/* Bento Card 3: Case Comparison */}
            <div
              className={`p-7 rounded-2xl border transition-all flex flex-col justify-between group ${
                isDark
                  ? 'bg-[#0D1914] border-emerald-500/20 hover:border-emerald-500/40 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
                  : 'bg-white border-[rgba(5,150,105,0.15)] hover:border-[#059669]/40 shadow-[0_4px_20px_rgba(15,23,42,0.04)] hover:shadow-[0_8px_30px_rgba(5,150,105,0.1)]'
              }`}
            >
              <div>
                <div
                  className={`w-11 h-11 rounded-xl border flex items-center justify-center mb-5 group-hover:scale-105 transition-transform ${
                    isDark
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                      : 'bg-[#E8F4EE] border-[rgba(5,150,105,0.25)] text-[#059669]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[24px]">compare_arrows</span>
                </div>
                <div
                  className={`text-[11px] font-mono uppercase tracking-wider font-semibold mb-1 ${
                    isDark ? 'text-emerald-400' : 'text-[#059669]'
                  }`}
                >
                  Capability 03
                </div>
                <h3
                  className={`text-[20px] font-bold mb-2 font-headline ${
                    isDark ? 'text-white' : 'text-[#0F172A]'
                  }`}
                >
                  Side-by-Side Judicial Matrix
                </h3>
                <p
                  className={`text-[13px] leading-relaxed ${
                    isDark ? 'text-[#94A79E]' : 'text-[#475569]'
                  }`}
                >
                  Compare conflicting tribunal orders and Supreme Court decisions side by side across factual patterns, judicial reasoning, and final statutory remedies.
                </p>
              </div>

              {/* Graphic snippet */}
              <div
                className={`mt-6 p-3 rounded-xl border flex items-center justify-between text-[11px] font-mono ${
                  isDark
                    ? 'bg-[#060D0A] border-emerald-500/15 text-[#7E9F90]'
                    : 'bg-[#F4F8F6] border-[rgba(5,150,105,0.12)] text-[#52796F]'
                }`}
              >
                <span>Case Comparison Matrix</span>
                <span className={`font-semibold ${isDark ? 'text-emerald-400' : 'text-[#059669]'}`}>
                  Ready
                </span>
              </div>
            </div>

          </div>
        </section>

        {/* 6. INTERACTIVE QUERY PREVIEW SANDBOX */}
        <section
          id="preview"
          className={`py-20 px-4 md:px-8 border-y w-full transition-colors duration-300 ${
            isDark
              ? 'bg-[#09140F] border-emerald-500/15'
              : 'bg-[#E8F4EE] border-[rgba(5,150,105,0.15)]'
          }`}
        >
          <div className="max-w-6xl mx-auto">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div>
                <span
                  className={`px-3 py-1 rounded-full font-mono text-[11px] uppercase tracking-widest font-semibold mb-2 inline-block border ${
                    isDark
                      ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                      : 'bg-white border-[rgba(5,150,105,0.2)] text-[#059669]'
                  }`}
                >
                  Interactive Preview
                </span>
                <h2
                  className={`text-[28px] sm:text-[38px] font-extrabold font-headline tracking-tight ${
                    isDark ? 'text-white' : 'text-[#0F172A]'
                  }`}
                >
                  Simulated Inquiries & Verified Answers
                </h2>
              </div>

              <div className="flex items-center gap-2">
                {sampleQueries.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveQueryIndex(idx)}
                    className={`px-3.5 py-1.5 rounded-lg text-[12px] font-mono transition-all cursor-pointer ${
                      activeQueryIndex === idx
                        ? isDark
                          ? 'bg-emerald-500 text-[#041F16] font-bold shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                          : 'bg-[#059669] text-white font-bold shadow-[0_2px_10px_rgba(5,150,105,0.25)]'
                        : isDark
                        ? 'bg-[#0E1F18] text-[#94A79E] hover:text-white border border-emerald-500/20'
                        : 'bg-white text-[#475569] hover:text-[#0F172A] border border-[rgba(5,150,105,0.15)]'
                    }`}
                  >
                    Scenario {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Sandbox Card Display */}
            <div
              className={`rounded-2xl border p-6 md:p-8 transition-all ${
                isDark
                  ? 'bg-[#060D0A] border-emerald-500/25 shadow-[0_15px_40px_rgba(0,0,0,0.6)]'
                  : 'bg-white border-[rgba(5,150,105,0.15)] shadow-[0_10px_35px_rgba(15,23,42,0.06)]'
              }`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                <div className="lg:col-span-7 space-y-4">
                  <div
                    className={`inline-flex items-center gap-2 px-2.5 py-1 rounded font-mono text-[11px] border ${
                      isDark
                        ? 'bg-[#13251E] border-emerald-500/30 text-emerald-300'
                        : 'bg-[#E8F4EE] border-[rgba(5,150,105,0.2)] text-[#064E3B]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[14px]">psychology</span>
                    <span>{activeQuery.title}</span>
                  </div>

                  <h3
                    className={`text-[20px] font-bold font-headline ${
                      isDark ? 'text-white' : 'text-[#0F172A]'
                    }`}
                  >
                    "{activeQuery.query}"
                  </h3>

                  <div
                    className={`p-4 rounded-xl border ${
                      isDark
                        ? 'bg-[#0D1914] border-emerald-500/20'
                        : 'bg-[#F4F8F6] border-[rgba(5,150,105,0.12)]'
                    }`}
                  >
                    <div
                      className={`text-[11px] font-mono uppercase tracking-wider font-bold mb-1 ${
                        isDark ? 'text-emerald-400' : 'text-[#059669]'
                      }`}
                    >
                      Deterministic Holding Isolated
                    </div>
                    <p
                      className={`text-[14px] leading-relaxed ${
                        isDark ? 'text-[#E0EFE8]' : 'text-[#334155]'
                      }`}
                    >
                      {activeQuery.holding}
                    </p>
                  </div>

                  <div
                    className={`text-[12px] font-mono flex items-center gap-2 ${
                      isDark ? 'text-[#7E9F90]' : 'text-[#52796F]'
                    }`}
                  >
                    <span
                      className={`material-symbols-outlined text-[16px] ${
                        isDark ? 'text-emerald-400' : 'text-[#059669]'
                      }`}
                    >
                      bookmark
                    </span>
                    <span>
                      Authority:{' '}
                      <strong className={isDark ? 'text-white' : 'text-[#0F172A]'}>
                        {activeQuery.statute}
                      </strong>
                    </span>
                  </div>
                </div>

                <div
                  className={`lg:col-span-5 p-5 rounded-xl border flex flex-col gap-4 ${
                    isDark
                      ? 'bg-[#0D1914] border-emerald-500/20'
                      : 'bg-[#F8FAF9] border-[rgba(5,150,105,0.15)]'
                  }`}
                >
                  <div
                    className={`flex items-center justify-between pb-3 border-b ${
                      isDark ? 'border-emerald-500/15' : 'border-[rgba(5,150,105,0.12)]'
                    }`}
                  >
                    <span
                      className={`font-mono text-[12px] font-semibold ${
                        isDark ? 'text-white' : 'text-[#0F172A]'
                      }`}
                    >
                      Evidence Telemetry
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full font-mono text-[10px] font-bold ${
                        isDark
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-[#059669]/15 text-[#064E3B]'
                      }`}
                    >
                      VERIFIED
                    </span>
                  </div>

                  <div className="space-y-3 font-mono text-[12px]">
                    <div className="flex justify-between items-center">
                      <span className={isDark ? 'text-[#7E9F90]' : 'text-[#52796F]'}>
                        Grounding Score
                      </span>
                      <span
                        className={`font-bold ${isDark ? 'text-emerald-400' : 'text-[#059669]'}`}
                      >
                        {activeQuery.groundingScore}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className={isDark ? 'text-[#7E9F90]' : 'text-[#52796F]'}>
                        Citations Indexed
                      </span>
                      <span className={`font-bold ${isDark ? 'text-white' : 'text-[#0F172A]'}`}>
                        {activeQuery.citationsFound} Passages
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className={isDark ? 'text-[#7E9F90]' : 'text-[#52796F]'}>
                        Execution Latency
                      </span>
                      <span className={`font-bold ${isDark ? 'text-white' : 'text-[#0F172A]'}`}>
                        0.86s
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate('/research/new')}
                    className={`mt-2 w-full py-2.5 rounded-lg font-bold text-[13px] transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      isDark
                        ? 'bg-emerald-500 hover:bg-emerald-400 text-[#041F16] shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                        : 'bg-[#059669] hover:bg-[#047857] text-white shadow-[0_2px_10px_rgba(5,150,105,0.2)]'
                    }`}
                  >
                    <span>Inspect In Workspace</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* 7. SECTION 13 SIMULATED DATASET NOTICE */}
        <section id="dataset-notice" className="py-20 px-4 md:px-8 max-w-5xl mx-auto w-full">
          <div
            className={`p-8 rounded-2xl border relative overflow-hidden transition-all ${
              isDark
                ? 'bg-[#0D1914] border-emerald-500/20 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
                : 'bg-white border-[rgba(5,150,105,0.15)] shadow-[0_4px_20px_rgba(15,23,42,0.04)]'
            }`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 mt-1 ${
                  isDark
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                    : 'bg-[#E8F4EE] border-[rgba(5,150,105,0.25)] text-[#059669]'
                }`}
              >
                <span className="material-symbols-outlined text-[22px]">info</span>
              </div>
              <div className="space-y-2">
                <span
                  className={`text-[11px] font-mono uppercase tracking-widest font-bold ${
                    isDark ? 'text-emerald-400' : 'text-[#059669]'
                  }`}
                >
                  Dataset Approach & Academic Transparency
                </span>
                <h3
                  className={`text-[20px] font-bold font-headline ${
                    isDark ? 'text-white' : 'text-[#0F172A]'
                  }`}
                >
                  Simulated Benchmark Dataset for Technical Validation
                </h3>
                <p
                  className={`text-[14px] leading-relaxed ${
                    isDark ? 'text-[#94A79E]' : 'text-[#475569]'
                  }`}
                >
                  In accordance with Section 13 of the project specification, this prototype operates on a synthetic, AI-augmented legal research dataset simulating Sri Lankan employment law scenarios (simulated acts, sample cases, and model employment contracts). This allows complete testing of multi-agent orchestration, citation verification, and report generation without misrepresenting synthetic data as live legal authority.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 8. HIGH-CONVERTING CTA BLOCK */}
        <section className="py-20 px-4 md:px-8 max-w-6xl mx-auto w-full">
          <div
            className={`relative rounded-3xl overflow-hidden p-10 md:p-16 text-center border transition-all ${
              isDark
                ? 'bg-gradient-to-b from-[#0F281E] to-[#081510] border-emerald-500/30 shadow-[0_0_80px_rgba(16,185,129,0.15)]'
                : 'bg-gradient-to-b from-[#E8F4EE] via-[#F4F8F6] to-[#E0ECE5] border-[rgba(5,150,105,0.25)] shadow-[0_10px_40px_rgba(5,150,105,0.08)]'
            }`}
          >
            <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
              
              <div
                className={`w-12 h-12 rounded-2xl border flex items-center justify-center mb-6 ${
                  isDark
                    ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                    : 'bg-[#059669]/15 border-[#059669]/30 text-[#064E3B] shadow-[0_2px_10px_rgba(5,150,105,0.15)]'
                }`}
              >
                <span className="material-symbols-outlined text-[28px]">terminal</span>
              </div>

              <h2
                className={`text-[32px] sm:text-[46px] font-extrabold font-headline tracking-tight mb-4 ${
                  isDark ? 'text-white' : 'text-[#0F172A]'
                }`}
              >
                Accelerate Legal Investigation with Zero Doubt.
              </h2>

              <p
                className={`text-[15px] mb-8 leading-relaxed ${
                  isDark ? 'text-[#94A79E]' : 'text-[#475569]'
                }`}
              >
                Launch the workspace and test multi-agent citation verification against simulated Sri Lankan legal authorities.
              </p>

              <button
                onClick={() => navigate('/dashboard')}
                className={`px-8 py-4 rounded-xl font-bold text-[15px] transition-all flex items-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98] ${
                  isDark
                    ? 'bg-gradient-to-r from-emerald-400 to-teal-400 text-[#041F16] shadow-[0_0_35px_rgba(16,185,129,0.5)] hover:shadow-[0_0_50px_rgba(16,185,129,0.7)]'
                    : 'bg-[#059669] hover:bg-[#047857] text-white shadow-[0_4px_20px_rgba(5,150,105,0.3)] hover:shadow-[0_6px_25px_rgba(5,150,105,0.4)]'
                }`}
              >
                <span>Launch Research Workspace</span>
                <span className="material-symbols-outlined text-[20px]">rocket_launch</span>
              </button>

            </div>
          </div>
        </section>

        {/* 9. MINIMAL MODERN FOOTER */}
        <footer
          className={`w-full py-10 px-4 md:px-8 mt-auto border-t transition-colors duration-300 ${
            isDark
              ? 'bg-[#060D0A] border-emerald-500/15 text-[#7E9F90]'
              : 'bg-white border-[rgba(5,150,105,0.12)] text-[#52796F]'
          }`}
        >
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-[12px] font-mono">
            
            <div className="flex items-center gap-3">
              <div
                className={`w-6 h-6 rounded-md flex items-center justify-center ${
                  isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-[#E8F4EE] text-[#059669]'
                }`}
              >
                <span className="material-symbols-outlined text-[15px]">balance</span>
              </div>
              <span
                className={`font-bold font-sans text-[14px] ${
                  isDark ? 'text-white' : 'text-[#0F172A]'
                }`}
              >
                LegalLens AI
              </span>
              <span>•</span>
              <span>Evidence-Grounded Research Platform</span>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full ${isDark ? 'bg-emerald-400' : 'bg-[#059669]'}`}
              ></span>
              <span>All Multi-Agent Verification Services Operational</span>
            </div>

            <div>
              <span>© {new Date().getFullYear()} LegalLens AI. Created for Academic & Educational Research.</span>
            </div>

          </div>
        </footer>

      </main>
    </div>
  );
};
