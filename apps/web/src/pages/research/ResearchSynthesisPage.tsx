import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockDossier } from '../../services/mockData';
import { useTheme } from '../../context/ThemeContext';

export const ResearchSynthesisPage: React.FC = () => {
  const navigate = useNavigate();
  const { isDark } = useTheme();

  const [activePassage, setActivePassage] = useState<{
    caseTitle: string;
    citation: string;
    quote: string;
    bench: string;
    badge: string;
  }>({
    caseTitle: "Ceylon Tobacco Co. v. Ilangaratne (Simulated Example)",
    citation: "Simulated SLLR Reference: [1989] 1 Sri L.R. 29 at p. 34",
    quote: "“An employer cannot unilaterally vary terms of remuneration to the detriment of a workman under the guise of an administrative restructuring. Where allowances have attained certainty and regular receipt, they merge into the contract.”",
    bench: "Fernando, J., Mark Fernando, J. • Supreme Court of Sri Lanka (Simulated)",
    badge: "Verified Statutory Match"
  });

  const selectPassage = (index: number) => {
    if (index === 1) {
      setActivePassage({
        caseTitle: "Ceylon Tobacco Co. v. Ilangaratne (Simulated Example)",
        citation: "Simulated SLLR Reference: [1989] 1 Sri L.R. 29 at p. 34",
        quote: "“An employer cannot unilaterally vary terms of remuneration to the detriment of a workman under the guise of an administrative restructuring. Where allowances have attained certainty and regular receipt, they merge into the contract.”",
        bench: "Fernando, J., Mark Fernando, J. • Supreme Court of Sri Lanka (Simulated)",
        badge: "Verified Statutory Match"
      });
    } else if (index === 2) {
      setActivePassage({
        caseTitle: "Brown & Co. v. Fernando (Simulated Example)",
        citation: "Simulated SLLR Reference: [2004] 2 Sri L.R. 115 at p. 122",
        quote: "“Silence may imply consent, but a prompt letter of reservation of rights preserves the cause of action in its entirety. A worker does not need to quit immediately before claiming constructive dismissal.”",
        bench: "Sripavan, J. • Court of Appeal of Sri Lanka (Simulated)",
        badge: "Verified Ratio Decidendi"
      });
    } else {
      setActivePassage({
        caseTitle: "Hayleys Ltd. v. De Silva (Simulated Example)",
        citation: "Simulated SLLR Reference: [1994] 1 Sri L.R. 297 at p. 302",
        quote: "“A substantial deprivation of transport facilities essential to executive duties functions equivalently to formal discharge.”",
        bench: "Kulatunga, J., Dheeraratne, J. • Supreme Court of Sri Lanka (Simulated)",
        badge: "Verified Judicial Remedy"
      });
    }
  };

  return (
    <div className="flex flex-col w-full pb-20">
      
      {/* Synthetic Dataset Disclaimer Banner */}
      <div
        className={`w-full py-2 px-6 text-center text-[12px] font-mono border-b flex items-center justify-center gap-2 ${
          isDark
            ? 'bg-[#0D1914] border-emerald-500/15 text-[#A3C2B6]'
            : 'bg-[#E8F4EE] border-[rgba(5,150,105,0.12)] text-[#52796F]'
        }`}
      >
        <span
          className={`material-symbols-outlined text-[16px] ${
            isDark ? 'text-emerald-400' : 'text-[#059669]'
          }`}
        >
          info
        </span>
        <span>
          <strong>Simulated Research Docket:</strong> Rulings, statutory sections, and passages synthesized for Section 13 platform verification.
        </span>
      </div>

      {/* 1. TOP RESEARCH META RIBBON */}
      <div
        className={`w-full px-6 md:px-10 py-3.5 border-b flex flex-wrap items-center justify-between gap-4 transition-colors ${
          isDark
            ? 'bg-[#060D0A] border-emerald-500/15 text-white'
            : 'bg-white border-[rgba(5,150,105,0.12)] text-[#0F172A]'
        }`}
      >
        <div className="flex items-center gap-3 font-mono text-[12px]">
          <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
            <span className="material-symbols-outlined text-[18px]">folder_special</span>
            <span>{mockDossier.docketId}</span>
          </div>
          <span className="text-[#CBD5E1] dark:text-[#2A3F35]">•</span>
          <span className="text-[#52796F] dark:text-[#7E9F90]">{mockDossier.sessionTerm}</span>
          <span className="text-[#CBD5E1] dark:text-[#2A3F35]">•</span>
          <div className="flex items-center gap-1.5 text-[#52796F] dark:text-[#A3C2B6]">
            <span className="material-symbols-outlined text-[16px]">account_balance</span>
            <span className="font-semibold">{mockDossier.jurisdiction}</span>
          </div>
        </div>

        {/* Synthesis Verification Status Badges */}
        <div className="flex items-center gap-3">
          <div
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-mono text-[11px] border ${
              isDark
                ? 'bg-[#0D1914] border-emerald-500/20 text-[#A3C2B6]'
                : 'bg-[#F4F8F6] border-[rgba(5,150,105,0.15)] text-[#52796F]'
            }`}
          >
            <span className="material-symbols-outlined text-[15px] text-emerald-500">
              fact_check
            </span>
            <span>Retrieved in 4.2s</span>
          </div>

          <div
            className={`flex items-center gap-2 px-3 py-1 rounded-lg font-mono text-[11px] font-bold border ${
              isDark
                ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
                : 'bg-[#E8F4EE] border-[rgba(5,150,105,0.25)] text-[#064E3B]'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>3 Grounded Citations</span>
            <span className="text-gray-400">|</span>
            <span className="text-amber-500 font-semibold flex items-center gap-0.5">
              <span className="material-symbols-outlined text-[14px]">warning</span> 1 Nuance
            </span>
          </div>
        </div>
      </div>

      {/* 2. PRIMARY 12-COLUMN RESEARCH WORKSPACE */}
      <div className="w-full px-6 md:px-10 py-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* MAIN READING CANAL (8 COLS) */}
          <article className="lg:col-span-8 flex flex-col gap-8">
            
            {/* Core Legal Answer */}
            <section
              className={`p-7 rounded-2xl border transition-all ${
                isDark
                  ? 'bg-[#0D1914] border-emerald-500/20 shadow-[0_10px_30px_rgba(0,0,0,0.4)]'
                  : 'bg-white border-[rgba(5,150,105,0.15)] shadow-[0_4px_25px_rgba(15,23,42,0.04)]'
              }`}
            >
              <div className="flex items-center justify-between font-mono text-[11px] mb-3">
                <span className="uppercase tracking-widest font-bold text-emerald-600 dark:text-emerald-400">
                  Judicial Ratio Decidendi
                </span>
                <span className="text-[#52796F] dark:text-[#7E9F90] italic">
                  Labour Disputes Jurisprudence
                </span>
              </div>

              <h2
                className={`text-[24px] font-extrabold tracking-tight font-headline mb-4 ${
                  isDark ? 'text-white' : 'text-[#0F172A]'
                }`}
              >
                Synthesized Legal Finding
              </h2>

              <p
                className={`text-[17px] font-medium leading-relaxed mb-4 ${
                  isDark ? 'text-white' : 'text-[#0F172A]'
                }`}
              >
                {mockDossier.executiveRatio}
              </p>

              <div
                className={`p-4 rounded-xl border-l-4 border-l-emerald-500 text-[14px] leading-relaxed ${
                  isDark
                    ? 'bg-[#060D0A] border border-emerald-500/15 text-[#A3C2B6]'
                    : 'bg-[#F4F8F6] border border-[rgba(5,150,105,0.12)] text-[#475569]'
                }`}
              >
                {mockDossier.executiveProse}
              </div>
            </section>

            {/* Substantive Findings */}
            <section
              className={`p-7 rounded-2xl border flex flex-col gap-6 ${
                isDark
                  ? 'bg-[#0D1914] border-emerald-500/20'
                  : 'bg-white border-[rgba(5,150,105,0.15)] shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between pb-3 border-b border-inherit">
                <h2 className="text-[19px] font-bold font-headline">
                  Grounded Substantive Findings
                </h2>
                <span className="font-mono text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">
                  3 Authorities Verified
                </span>
              </div>

              <div className="divide-y divide-inherit space-y-6">
                {mockDossier.findings.map((f) => (
                  <div key={f.id} className="pt-6 first:pt-0 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-[16px] font-bold font-headline flex items-center gap-2">
                        <span className="w-6 h-6 rounded-md bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-mono text-[12px] flex items-center justify-center font-bold">
                          {f.number}
                        </span>
                        <span>{f.title}</span>
                      </h3>
                      <span
                        className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider ${
                          isDark
                            ? 'bg-emerald-500/15 text-emerald-300'
                            : 'bg-[#E8F4EE] text-[#064E3B]'
                        }`}
                      >
                        {f.status}
                      </span>
                    </div>

                    <p className={`text-[14px] leading-relaxed ${isDark ? 'text-[#94A79E]' : 'text-[#475569]'}`}>
                      {f.summary}
                    </p>

                    <div className="flex items-center gap-3 font-mono text-[12px] pt-1">
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">
                        {f.citationText}
                      </span>
                      <span className="text-gray-400">•</span>
                      <button
                        onClick={() => selectPassage(f.passageIndex)}
                        className="text-emerald-600 dark:text-emerald-300 hover:underline font-bold cursor-pointer flex items-center gap-1"
                      >
                        <span>{f.quotePageRef}</span>
                        <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Applicable Legislation */}
            <section
              className={`p-7 rounded-2xl border flex flex-col gap-4 ${
                isDark
                  ? 'bg-[#0D1914] border-emerald-500/20'
                  : 'bg-white border-[rgba(5,150,105,0.15)] shadow-sm'
              }`}
            >
              <h2 className="text-[19px] font-bold font-headline">
                Statutory Framework & Sections
              </h2>

              <div className="divide-y divide-inherit text-[13px]">
                {mockDossier.statutes.map((s, idx) => (
                  <div key={idx} className="py-4 first:pt-0 flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="sm:w-1/3">
                      <span className="font-bold font-headline block">{s.actName}</span>
                      <span className="font-mono text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                        {s.section}
                      </span>
                    </div>
                    <p className={`sm:w-2/3 leading-relaxed ${isDark ? 'text-[#94A79E]' : 'text-[#475569]'}`}>
                      {s.summary}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Precedents on Point */}
            <section
              className={`p-7 rounded-2xl border flex flex-col gap-4 ${
                isDark
                  ? 'bg-[#0D1914] border-emerald-500/20'
                  : 'bg-white border-[rgba(5,150,105,0.15)] shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-[19px] font-bold font-headline">
                  Relevant Judicial Authorities
                </h2>
                <span className="font-mono text-[11px] text-[#52796F] dark:text-[#7E9F90]">
                  Simulated SLLR Precedents
                </span>
              </div>

              <div className="divide-y divide-inherit space-y-4">
                {mockDossier.precedents.map((p) => (
                  <div key={p.id} className="pt-4 first:pt-0 flex flex-col gap-1.5">
                    <div className="flex items-baseline justify-between">
                      <h3 className="font-bold text-[15px]">{p.caseName}</h3>
                      <span className="font-mono text-[12px] text-emerald-600 dark:text-emerald-400">
                        {p.citation}
                      </span>
                    </div>
                    <p className={`text-[13px] leading-relaxed ${isDark ? 'text-[#94A79E]' : 'text-[#475569]'}`}>
                      <strong>Ratio:</strong> {p.ratio}
                    </p>
                    <div className="flex items-center justify-between font-mono text-[11px] pt-1">
                      <span className={isDark ? 'text-[#7E9F90]' : 'text-[#52796F]'}>
                        Bench: {p.bench}
                      </span>
                      <button
                        onClick={() => navigate('/compare')}
                        className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline cursor-pointer"
                      >
                        Compare in Matrix →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Procedural Caveat */}
            <section
              className={`p-6 rounded-2xl border-l-4 border-l-amber-500 border flex flex-col gap-2 ${
                isDark
                  ? 'bg-[#0D1914] border-emerald-500/20'
                  : 'bg-white border-[rgba(5,150,105,0.15)] shadow-sm'
              }`}
            >
              <div className="flex items-center gap-2 text-amber-500 font-bold text-[14px]">
                <span className="material-symbols-outlined text-[18px]">warning</span>
                <h2>{mockDossier.caveatTitle}</h2>
              </div>
              <p className={`text-[13px] leading-relaxed ${isDark ? 'text-[#94A79E]' : 'text-[#475569]'}`}>
                {mockDossier.caveatText}
              </p>
            </section>

          </article>

          {/* STICKY EVIDENCE INSPECTION DOCK (4 COLS) */}
          <aside className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Header Telemetry Box */}
            <div
              className={`p-6 rounded-2xl border flex flex-col gap-4 ${
                isDark
                  ? 'bg-[#0D1914] border-emerald-500/20 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
                  : 'bg-white border-[rgba(5,150,105,0.15)] shadow-[0_4px_25px_rgba(15,23,42,0.04)]'
              }`}
            >
              <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-wider font-bold">
                <span className="text-emerald-600 dark:text-emerald-400">Evidence Telemetry</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              </div>

              <div>
                <p className="font-extrabold text-[16px] font-headline">
                  Inquiry #{mockDossier.docketId}
                </p>
                <p className="font-mono text-[11px] text-[#52796F] dark:text-[#7E9F90]">
                  {mockDossier.sessionTerm}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div
                  className={`p-3.5 rounded-xl border text-center ${
                    isDark
                      ? 'bg-[#060D0A] border-emerald-500/20'
                      : 'bg-[#F4F8F6] border-[rgba(5,150,105,0.15)]'
                  }`}
                >
                  <span className="block font-headline text-[26px] font-extrabold text-emerald-600 dark:text-emerald-400">
                    {mockDossier.confidenceScore}%
                  </span>
                  <span className="font-mono text-[10px] uppercase font-bold text-[#52796F] dark:text-[#7E9F90]">
                    Evidence Grounded
                  </span>
                </div>

                <div
                  className={`p-3.5 rounded-xl border text-center ${
                    isDark
                      ? 'bg-[#060D0A] border-emerald-500/20'
                      : 'bg-[#F4F8F6] border-[rgba(5,150,105,0.15)]'
                  }`}
                >
                  <span className="block font-headline text-[26px] font-extrabold">3</span>
                  <span className="font-mono text-[10px] uppercase font-bold text-[#52796F] dark:text-[#7E9F90]">
                    Verified Quotes
                  </span>
                </div>
              </div>
            </div>

            {/* Sticky Active Passage Inspector */}
            <div className="sticky top-24 flex flex-col gap-4">
              
              <div
                className={`p-6 rounded-2xl border flex flex-col gap-3 shadow-lg ${
                  isDark
                    ? 'bg-[#0D1914] border-emerald-500/30 shadow-[0_15px_40px_rgba(0,0,0,0.6)]'
                    : 'bg-white border-[rgba(5,150,105,0.2)] shadow-[0_8px_30px_rgba(15,23,42,0.08)]'
                }`}
              >
                <div className="flex items-center justify-between pb-2 border-b border-inherit">
                  <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-[#52796F] dark:text-[#7E9F90]">
                    Inspected Authority
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold ${
                      isDark
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : 'bg-[#E8F4EE] text-[#064E3B]'
                    }`}
                  >
                    {activePassage.badge}
                  </span>
                </div>

                <h4 className="font-bold text-[15px] font-headline">
                  {activePassage.caseTitle}
                </h4>

                <span className="font-mono text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                  {activePassage.citation}
                </span>

                <blockquote
                  className={`p-3 rounded-xl border-l-2 border-l-emerald-500 italic text-[13px] leading-relaxed ${
                    isDark
                      ? 'bg-[#060D0A] text-[#E0EFE8]'
                      : 'bg-[#E8F4EE] text-[#064E3B]'
                  }`}
                >
                  {activePassage.quote}
                </blockquote>

                <span className="font-mono text-[11px] text-[#52796F] dark:text-[#7E9F90] pt-1">
                  {activePassage.bench}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2.5">
                <button
                  onClick={() => navigate('/documents/doc-1')}
                  className={`w-full py-2.5 px-4 rounded-xl font-bold text-[13px] border transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    isDark
                      ? 'bg-[#0D1914] border-emerald-500/20 text-white hover:bg-[#13251E]'
                      : 'bg-white border-[rgba(5,150,105,0.2)] text-[#0F172A] hover:bg-[#E8F4EE]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px] text-emerald-500">
                    description
                  </span>
                  <span>Inspect Employment Agreement</span>
                </button>

                <button
                  onClick={() => navigate('/compare')}
                  className={`w-full py-2.5 px-4 rounded-xl font-bold text-[13px] transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    isDark
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-[#041F16] shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_20px_rgba(16,185,129,0.5)]'
                      : 'bg-[#059669] hover:bg-[#047857] text-white shadow-[0_2px_10px_rgba(5,150,105,0.25)]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">compare_arrows</span>
                  <span>Compare Precedents Side-by-Side</span>
                </button>
              </div>

            </div>
          </aside>

        </div>
      </div>
    </div>
  );
};
