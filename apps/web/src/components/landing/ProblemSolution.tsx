import React from 'react';
import { useTheme } from '../../context/ThemeContext';

export const ProblemSolution: React.FC = () => {
  const { isDark } = useTheme();

  const oldWayItems = [
    {
      title: 'Search across disconnected sources',
      desc: 'Sifting through paper gazettes, fragmented digital repositories, and siloed law reports.',
    },
    {
      title: 'Manually compare lengthy judgments',
      desc: 'Spending hours reconciling divergent benches, obiter dicta, and jurisdictional nuances.',
    },
    {
      title: 'Spend hours checking citations',
      desc: 'Validating volume and page references manually to ensure citations remain good law.',
    },
    {
      title: 'Risk missing context or conflicting authority',
      desc: 'Generic chatbots hallucinate case precedents and overlook binding statutory provisions.',
    },
  ];

  const legalLensWayItems = [
    {
      title: 'One structured research workflow',
      desc: 'From initial factual inquiry to indexed statutes and appellate authority in one continuous trace.',
    },
    {
      title: 'AI-assisted case comparison and synthesis',
      desc: 'Specialist agents extract ratio decidendi, compare judicial reasoning, and isolate points of conflict.',
    },
    {
      title: 'Citations connected to source evidence',
      desc: 'Every quote and legal proposition links directly to verified source page numbers and sections.',
    },
    {
      title: 'Transparent research traces and human oversight',
      desc: 'Inspectable execution steps, confidence metrics, and human-in-the-loop review boundaries.',
    },
  ];

  return (
    <section className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-18">
          <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono font-semibold uppercase tracking-widest border mb-4 ${
              isDark
                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'
                : 'bg-[#E8F4EE] border-[rgba(5,150,105,0.2)] text-[#064E3B]'
            }`}
          >
            <span>RESEARCH METHODOLOGY</span>
          </div>
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-headline mb-5 ${
              isDark ? 'text-white' : 'text-[#0F172A]'
            }`}
          >
            Legal work deserves more than a chatbot.
          </h2>
          <p
            className={`text-base sm:text-lg leading-relaxed ${
              isDark ? 'text-[#9BB8AC]' : 'text-[#475569]'
            }`}
          >
            Legal research involves understanding questions, examining authority, comparing
            decisions, and validating evidence.
          </p>
        </div>

        {/* Two-Column Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* The Old Way */}
          <div
            className={`rounded-2xl p-6 sm:p-8 border transition-all duration-200 flex flex-col justify-between ${
              isDark
                ? 'bg-[#09100C]/70 border-rose-500/20 shadow-[0_4px_24px_rgba(0,0,0,0.4)]'
                : 'bg-white border-rose-200/80 shadow-[0_4px_20px_rgba(225,29,72,0.04)]'
            }`}
          >
            <div>
              <div className="flex items-center justify-between pb-5 mb-6 border-b border-rose-500/15">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/25 flex items-center justify-center text-rose-500">
                    <span className="material-symbols-outlined text-[20px]">close</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-headline text-rose-500">
                      The Old Way
                    </h3>
                    <p className={`text-xs ${isDark ? 'text-[#7E9F90]' : 'text-[#52796F]'}`}>
                      Manual, fragmented, and vulnerable to gaps
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded text-[11px] font-mono font-semibold bg-rose-500/10 text-rose-500">
                  FRAGMENTED
                </span>
              </div>

              <div className="space-y-5">
                {oldWayItems.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3.5">
                    <div className="w-5 h-5 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-[13px] text-rose-500">remove</span>
                    </div>
                    <div>
                      <h4
                        className={`text-[14px] font-bold mb-0.5 ${
                          isDark ? 'text-[#E2E8F0]' : 'text-[#1E293B]'
                        }`}
                      >
                        {item.title}
                      </h4>
                      <p className={`text-[13px] leading-relaxed ${isDark ? 'text-[#7E9F90]' : 'text-[#64748B]'}`}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className={`mt-8 pt-4 border-t text-[11px] font-mono flex items-center justify-between ${
                isDark ? 'border-rose-500/10 text-[#7E9F90]' : 'border-rose-100 text-[#64748B]'
              }`}
            >
              <span>High labor expenditure</span>
              <span className="text-rose-500 font-bold">Unverified Hallucination Risk</span>
            </div>
          </div>

          {/* The LegalLens Way */}
          <div
            className={`rounded-2xl p-6 sm:p-8 border relative transition-all duration-200 flex flex-col justify-between ${
              isDark
                ? 'bg-[#0D1914] border-emerald-500/30 shadow-[0_8px_32px_rgba(16,185,129,0.12)]'
                : 'bg-[#F4F8F6] border-[rgba(5,150,105,0.25)] shadow-[0_8px_32px_rgba(5,150,105,0.08)]'
            }`}
          >
            {/* Ambient emerald highlight */}
            <div className="absolute top-0 right-0 w-44 h-44 bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none" />

            <div>
              <div className="flex items-center justify-between pb-5 mb-6 border-b border-emerald-500/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-500">
                    <span className="material-symbols-outlined text-[20px]">verified</span>
                  </div>
                  <div>
                    <h3
                      className={`text-xl font-bold font-headline ${
                        isDark ? 'text-emerald-300' : 'text-[#064E3B]'
                      }`}
                    >
                      The LegalLens Way
                    </h3>
                    <p className={`text-xs ${isDark ? 'text-[#A3C2B6]' : 'text-[#52796F]'}`}>
                      Coordinated intelligence, evidence-backed
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded text-[11px] font-mono font-semibold bg-emerald-500/15 text-emerald-400">
                  GROUNDED
                </span>
              </div>

              <div className="space-y-5">
                {legalLensWayItems.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3.5">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center shrink-0 mt-0.5 text-emerald-500">
                      <span className="material-symbols-outlined text-[13px]">check</span>
                    </div>
                    <div>
                      <h4
                        className={`text-[14px] font-bold mb-0.5 ${
                          isDark ? 'text-white' : 'text-[#0F172A]'
                        }`}
                      >
                        {item.title}
                      </h4>
                      <p className={`text-[13px] leading-relaxed ${isDark ? 'text-[#A3C2B6]' : 'text-[#475569]'}`}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className={`mt-8 pt-4 border-t text-[11px] font-mono flex items-center justify-between ${
                isDark ? 'border-emerald-500/15 text-[#A3C2B6]' : 'border-[rgba(5,150,105,0.15)] text-[#064E3B]'
              }`}
            >
              <span>Multi-agent precision</span>
              <span className="text-emerald-500 font-bold">Traceable Source Passages</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
