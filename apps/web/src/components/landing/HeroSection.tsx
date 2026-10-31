import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

export const HeroSection: React.FC = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'agents' | 'citations'>('overview');

  const scrollToPlatform = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('platform');
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Ambient background glow and grid */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        <div
          className={`absolute top-16 left-1/2 -translate-x-1/2 w-[720px] h-[480px] blur-[150px] rounded-full opacity-60 ${
            isDark ? 'bg-emerald-500/10' : 'bg-[#10B981]/12'
          }`}
        />
        <div
          className={`absolute top-64 right-1/4 w-[360px] h-[360px] blur-[130px] rounded-full opacity-40 ${
            isDark ? 'bg-teal-500/10' : 'bg-[#059669]/10'
          }`}
        />
        {/* Subtle grid pattern */}
        <div
          className={`absolute inset-0 opacity-[0.03] ${
            isDark
              ? 'bg-[radial-gradient(#10B981_1px,transparent_1px)] [background-size:24px_24px]'
              : 'bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:24px_24px]'
          }`}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Hero Header Content */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-14 md:mb-18">
          {/* Eyebrow */}
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-mono font-semibold uppercase tracking-widest border mb-6 transition-all ${
              isDark
                ? 'bg-emerald-500/10 border-emerald-500/25 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.15)]'
                : 'bg-[#E8F4EE] border-[rgba(5,150,105,0.22)] text-[#064E3B] shadow-[0_1px_4px_rgba(5,150,105,0.1)]'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
            <span>LEGAL INTELLIGENCE, REDEFINED</span>
          </div>

          {/* Main Headline */}
          <h1
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-extrabold tracking-tight font-headline leading-[1.08] mb-6 ${
              isDark ? 'text-white' : 'text-[#0F172A]'
            }`}
          >
            Legal research.
            <br />
            <span className="bg-gradient-to-r from-emerald-500 via-teal-400 to-[#10B981] bg-clip-text text-transparent">
              Reimagined with intelligence.
            </span>
          </h1>

          {/* Description */}
          <p
            className={`text-base sm:text-lg md:text-xl font-normal leading-relaxed max-w-2xl mb-8 ${
              isDark ? 'text-[#9BB8AC]' : 'text-[#475569]'
            }`}
          >
            Move from complex legal questions to clear, evidence-backed insight. Investigate
            legislation, discover judgments, and verify every citation — with AI built for legal work.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-10">
            <button
              onClick={() => navigate('/research/new')}
              className={`w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-[14px] tracking-tight transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 shadow-lg ${
                isDark
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-[#041F16] shadow-[0_0_24px_rgba(16,185,129,0.35)] hover:shadow-[0_0_32px_rgba(16,185,129,0.55)]'
                  : 'bg-[#059669] hover:bg-[#047857] text-white shadow-[0_4px_16px_rgba(5,150,105,0.3)] hover:shadow-[0_6px_20px_rgba(5,150,105,0.4)]'
              }`}
            >
              <span>Start Researching</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>

            <button
              onClick={scrollToPlatform}
              className={`w-full sm:w-auto px-6 py-3.5 rounded-xl font-medium text-[14px] border transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 ${
                isDark
                  ? 'bg-[#0D1914] border-emerald-500/25 text-[#F3FBF7] hover:bg-[#13251E] hover:border-emerald-500/40'
                  : 'bg-white border-[rgba(5,150,105,0.22)] text-[#0F172A] hover:bg-[#E8F4EE] hover:border-[#059669]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">visibility</span>
              <span>Explore the Platform</span>
            </button>
          </div>

          {/* Supporting Technology Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-emerald-500">hub</span>
              <span className={isDark ? 'text-[#A3C2B6]' : 'text-[#52796F]'}>Multi-agent orchestration</span>
            </div>
            <span className={isDark ? 'text-emerald-500/30' : 'text-slate-300'}>•</span>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-emerald-500">search</span>
              <span className={isDark ? 'text-[#A3C2B6]' : 'text-[#52796F]'}>Hybrid RAG (Semantic + BM25)</span>
            </div>
            <span className={isDark ? 'text-emerald-500/30' : 'text-slate-300'}>•</span>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-emerald-500">verified</span>
              <span className={isDark ? 'text-[#A3C2B6]' : 'text-[#52796F]'}>Evidence traceability</span>
            </div>
          </div>
        </div>

        {/* Hero Visual — Realistic Product Dashboard Preview */}
        <div className="relative max-w-5xl mx-auto">
          {/* Subtle outer glow border */}
          <div
            className={`rounded-2xl p-[1px] transition-all duration-300 shadow-2xl ${
              isDark
                ? 'bg-gradient-to-b from-emerald-500/30 via-emerald-500/10 to-transparent shadow-[0_20px_50px_rgba(0,0,0,0.8)]'
                : 'bg-gradient-to-b from-[rgba(5,150,105,0.3)] via-[rgba(5,150,105,0.1)] to-transparent shadow-[0_20px_40px_rgba(5,150,105,0.1)]'
            }`}
          >
            <div
              className={`rounded-[15px] overflow-hidden border ${
                isDark
                  ? 'bg-[#08120D] border-emerald-500/20 text-[#F3FBF7]'
                  : 'bg-white border-[rgba(5,150,105,0.18)] text-[#0F172A]'
              }`}
            >
              {/* Window Chrome / Title Bar */}
              <div
                className={`px-4 py-3 border-b flex items-center justify-between text-xs ${
                  isDark ? 'bg-[#0D1914] border-emerald-500/15' : 'bg-[#E8F4EE]/70 border-[rgba(5,150,105,0.14)]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className={`ml-3 font-mono text-[11px] font-medium hidden sm:inline ${
                    isDark ? 'text-[#7E9F90]' : 'text-[#52796F]'
                  }`}>
                    legallens.app/research/docket-2025-001
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium border ${
                      isDark
                        ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'
                        : 'bg-white border-[rgba(5,150,105,0.2)] text-[#064E3B]'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <span>Sri Lanka Labour Law Benchmark</span>
                  </span>
                </div>
              </div>

              {/* Main Product Frame: Mini Sidebar + Workspace */}
              <div className="grid grid-cols-1 md:grid-cols-12 min-h-[520px]">
                {/* Mini Sidebar */}
                <div
                  className={`hidden md:flex md:col-span-3 flex-col border-r p-4 justify-between ${
                    isDark ? 'bg-[#060D0A]/70 border-emerald-500/15' : 'bg-[#F4F8F6]/80 border-[rgba(5,150,105,0.12)]'
                  }`}
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2.5 px-2 py-1">
                      <div className="w-6 h-6 rounded-md bg-emerald-500 flex items-center justify-center text-white">
                        <span className="material-symbols-outlined text-[15px]">balance</span>
                      </div>
                      <span className="font-bold text-xs tracking-tight">LegalLens AI</span>
                    </div>

                    <div className="flex flex-col gap-1">
                      <div
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium ${
                          isDark ? 'bg-emerald-500/15 text-emerald-300' : 'bg-[#E8F4EE] text-[#064E3B]'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[16px]">dashboard</span>
                        <span>Active Inquiry</span>
                      </div>
                      <div
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs opacity-70 ${
                          isDark ? 'text-[#7E9F90]' : 'text-[#52796F]'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[16px]">compare_arrows</span>
                        <span>Precedent Matrix</span>
                      </div>
                      <div
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs opacity-70 ${
                          isDark ? 'text-[#7E9F90]' : 'text-[#52796F]'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[16px]">folder_open</span>
                        <span>Documents Vault</span>
                      </div>
                      <div
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs opacity-70 ${
                          isDark ? 'text-[#7E9F90]' : 'text-[#52796F]'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[16px]">description</span>
                        <span>Research Dossiers</span>
                      </div>
                    </div>
                  </div>

                  {/* Active Investigation Status Card */}
                  <div
                    className={`p-3 rounded-xl border text-[11px] ${
                      isDark ? 'bg-[#0D1914] border-emerald-500/20' : 'bg-white border-[rgba(5,150,105,0.15)]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-mono font-medium text-emerald-500 text-[10px]">DOCKET #001</span>
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-500/15 text-emerald-400">
                        VERIFIED
                      </span>
                    </div>
                    <p className="font-semibold line-clamp-1 mb-1">Constructive Termination</p>
                    <div className="flex items-center justify-between text-[10px] opacity-75">
                      <span>Indexed Authorities</span>
                      <span className="font-mono font-semibold">65 items</span>
                    </div>
                  </div>
                </div>

                {/* Workspace Content */}
                <div className="md:col-span-9 p-5 md:p-6 flex flex-col justify-between">
                  <div>
                    {/* Legal Research Question Input Bar */}
                    <div
                      className={`p-3.5 rounded-xl border mb-5 shadow-sm ${
                        isDark ? 'bg-[#0D1914] border-emerald-500/20' : 'bg-[#E8F4EE]/50 border-[rgba(5,150,105,0.18)]'
                      }`}
                    >
                      <div className="flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-emerald-400 mb-2">
                        <span className="material-symbols-outlined text-[15px]">psychology</span>
                        <span className="font-semibold uppercase tracking-wider text-[10px]">
                          Legal Inquiry Formulation
                        </span>
                      </div>
                      <p className="text-[14px] font-medium leading-snug">
                        &quot;Does unilateral reduction of fixed monthly allowances constitute constructive termination
                        under Sri Lankan Labour Law when employee worked under written protest?&quot;
                      </p>
                    </div>

                    {/* Interactive Sub-views Tabs */}
                    <div className="flex items-center gap-2 border-b pb-3 mb-4 text-xs font-medium border-emerald-500/10">
                      <button
                        onClick={() => setActiveTab('overview')}
                        className={`px-3 py-1.5 rounded-lg transition-all ${
                          activeTab === 'overview'
                            ? isDark
                              ? 'bg-emerald-500/20 text-emerald-300 font-semibold'
                              : 'bg-[#E8F4EE] text-[#064E3B] font-semibold'
                            : isDark
                              ? 'text-[#7E9F90] hover:text-white'
                              : 'text-[#52796F] hover:text-[#0F172A]'
                        }`}
                      >
                        Investigation Preview
                      </button>
                      <button
                        onClick={() => setActiveTab('agents')}
                        className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                          activeTab === 'agents'
                            ? isDark
                              ? 'bg-emerald-500/20 text-emerald-300 font-semibold'
                              : 'bg-[#E8F4EE] text-[#064E3B] font-semibold'
                            : isDark
                              ? 'text-[#7E9F90] hover:text-white'
                              : 'text-[#52796F] hover:text-[#0F172A]'
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span>Agent Orchestration (4 Active)</span>
                      </button>
                      <button
                        onClick={() => setActiveTab('citations')}
                        className={`px-3 py-1.5 rounded-lg transition-all ${
                          activeTab === 'citations'
                            ? isDark
                              ? 'bg-emerald-500/20 text-emerald-300 font-semibold'
                              : 'bg-[#E8F4EE] text-[#064E3B] font-semibold'
                            : isDark
                              ? 'text-[#7E9F90] hover:text-white'
                              : 'text-[#52796F] hover:text-[#0F172A]'
                        }`}
                      >
                        Citation Verification
                      </button>
                    </div>

                    {/* Tab 1: Overview */}
                    {activeTab === 'overview' && (
                      <div className="space-y-4">
                        {/* Executive Ratio Banner */}
                        <div
                          className={`p-4 rounded-xl border text-xs leading-relaxed ${
                            isDark
                              ? 'bg-[#13251E] border-emerald-500/20 text-[#E8F4EE]'
                              : 'bg-[#F4F8F6] border-[rgba(5,150,105,0.16)] text-[#0F172A]'
                          }`}
                        >
                          <div className="flex items-center gap-2 font-mono text-[11px] text-emerald-600 dark:text-emerald-400 font-bold mb-1.5">
                            <span className="material-symbols-outlined text-[16px]">gavel</span>
                            <span>Synthesized Judicial Ratio Decidendi</span>
                          </div>
                          <p>
                            Reducing regular fixed allowances without employee consent amounts to unfair constructive
                            termination under Section 31B of the Industrial Disputes Act. Continuing to serve under prompt
                            written protest preserves the right of action in full.
                          </p>
                        </div>

                        {/* Two discovered primary authorities */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div
                            className={`p-3 rounded-lg border text-xs ${
                              isDark ? 'bg-[#0D1914] border-emerald-500/15' : 'bg-white border-[rgba(5,150,105,0.12)]'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-mono text-[10px] text-emerald-500 font-bold">CASE PRECEDENT</span>
                              <span className="text-[10px] font-mono opacity-60">[1989] SLLR</span>
                            </div>
                            <p className="font-bold text-[12px] mb-1">Ceylon Tobacco Co. v. Ilangaratne</p>
                            <p className={`text-[11px] line-clamp-2 ${isDark ? 'text-[#7E9F90]' : 'text-[#52796F]'}`}>
                              Unilateral variation of regular remuneration invalid under administrative restructuring.
                            </p>
                          </div>

                          <div
                            className={`p-3 rounded-lg border text-xs ${
                              isDark ? 'bg-[#0D1914] border-emerald-500/15' : 'bg-white border-[rgba(5,150,105,0.12)]'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-mono text-[10px] text-teal-500 font-bold">STATUTORY AUTHORITY</span>
                              <span className="text-[10px] font-mono opacity-60">Act 43 of 1950</span>
                            </div>
                            <p className="font-bold text-[12px] mb-1">Industrial Disputes Act § 31B</p>
                            <p className={`text-[11px] line-clamp-2 ${isDark ? 'text-[#7E9F90]' : 'text-[#52796F]'}`}>
                              Labour Tribunal jurisdiction over non-consensual contractual variations and relief.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Tab 2: Agent Orchestration */}
                    {activeTab === 'agents' && (
                      <div className="space-y-2.5">
                        {[
                          {
                            agent: 'Question Analysis Agent',
                            action: 'Extracted 2 core legal issues & parsed statutory jurisdiction (Sri Lanka)',
                            time: '0.4s',
                            status: 'Completed',
                          },
                          {
                            agent: 'Statutory Discovery Agent',
                            action: 'Queried Sri Lanka Labour Code; retrieved IDA § 31B & TEWA § 2(1)',
                            time: '1.2s',
                            status: 'Completed',
                          },
                          {
                            agent: 'Case Comparison Agent',
                            action: 'Cross-aligned Colombo Labour Tribunal & Court of Appeal precedents',
                            time: '1.8s',
                            status: 'Completed',
                          },
                          {
                            agent: 'Citation Verification Agent',
                            action: 'Corroborated 3 verbatim excerpts against benchmark source records',
                            time: '0.8s',
                            status: 'Verified',
                          },
                        ].map((item, idx) => (
                          <div
                            key={idx}
                            className={`p-2.5 rounded-lg border flex items-center justify-between text-xs ${
                              isDark ? 'bg-[#0D1914] border-emerald-500/15' : 'bg-white border-[rgba(5,150,105,0.12)]'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <div className="w-2 h-2 rounded-full bg-emerald-400" />
                              <div className="flex flex-col">
                                <span className="font-bold font-mono text-[11px]">{item.agent}</span>
                                <span className={`text-[11px] ${isDark ? 'text-[#7E9F90]' : 'text-[#52796F]'}`}>
                                  {item.action}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-[10px] opacity-60">{item.time}</span>
                              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-400">
                                {item.status}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tab 3: Citation Verification */}
                    {activeTab === 'citations' && (
                      <div className="space-y-2.5 text-xs">
                        <div
                          className={`p-3 rounded-lg border ${
                            isDark ? 'bg-[#0D1914] border-emerald-500/15' : 'bg-white border-[rgba(5,150,105,0.12)]'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold font-mono text-[11px] text-emerald-500">
                              Ceylon Tobacco Co. v. Ilangaratne (p. 34)
                            </span>
                            <span className="text-[10px] font-mono text-emerald-400 font-semibold flex items-center gap-1">
                              <span className="material-symbols-outlined text-[14px]">check_circle</span>
                              100% Match
                            </span>
                          </div>
                          <blockquote
                            className={`font-citation italic text-[11px] pl-3 border-l-2 border-emerald-500 ${
                              isDark ? 'text-[#A3C2B6]' : 'text-[#475569]'
                            }`}
                          >
                            &quot;Where allowances have attained certainty and regular receipt, they merge into the
                            contract... unilateral variation is invalid.&quot;
                          </blockquote>
                        </div>

                        <div
                          className={`p-3 rounded-lg border ${
                            isDark ? 'bg-[#0D1914] border-emerald-500/15' : 'bg-white border-[rgba(5,150,105,0.12)]'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold font-mono text-[11px] text-emerald-500">
                              Brown & Co. v. Fernando (p. 122)
                            </span>
                            <span className="text-[10px] font-mono text-emerald-400 font-semibold flex items-center gap-1">
                              <span className="material-symbols-outlined text-[14px]">check_circle</span>
                              100% Match
                            </span>
                          </div>
                          <blockquote
                            className={`font-citation italic text-[11px] pl-3 border-l-2 border-emerald-500 ${
                              isDark ? 'text-[#A3C2B6]' : 'text-[#475569]'
                            }`}
                          >
                            &quot;A prompt letter of reservation of rights preserves the cause of action in its
                            entirety.&quot;
                          </blockquote>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Bottom Investigation Status Bar */}
                  <div
                    className={`pt-4 mt-4 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs ${
                      isDark ? 'border-emerald-500/15' : 'border-[rgba(5,150,105,0.12)]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1.5 font-mono text-emerald-500 font-semibold text-[11px]">
                        <span className="material-symbols-outlined text-[15px]">verified_user</span>
                        Confidence: 92%
                      </span>
                      <span className="text-slate-400">•</span>
                      <span className={`text-[11px] ${isDark ? 'text-[#7E9F90]' : 'text-[#52796F]'}`}>
                        3 Authorities Verified • 0 Hallucinations Flagged
                      </span>
                    </div>

                    <button
                      onClick={() => navigate('/research/new')}
                      className={`text-[11px] font-mono font-semibold transition-colors flex items-center gap-1 ${
                        isDark ? 'text-emerald-400 hover:text-emerald-300' : 'text-[#059669] hover:text-[#047857]'
                      }`}
                    >
                      <span>Open in Research Studio</span>
                      <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
