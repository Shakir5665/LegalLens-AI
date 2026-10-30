import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockDossier } from '../../services/mockData';

export const ResearchSynthesisPage: React.FC = () => {
  const navigate = useNavigate();
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
    badge: "Verified Simulated Passage"
  });

  const selectPassage = (index: number) => {
    if (index === 1) {
      setActivePassage({
        caseTitle: "Ceylon Tobacco Co. v. Ilangaratne (Simulated Example)",
        citation: "Simulated SLLR Reference: [1989] 1 Sri L.R. 29 at p. 34",
        quote: "“An employer cannot unilaterally vary terms of remuneration to the detriment of a workman under the guise of an administrative restructuring. Where allowances have attained certainty and regular receipt, they merge into the contract.”",
        bench: "Fernando, J., Mark Fernando, J. • Supreme Court of Sri Lanka (Simulated)",
        badge: "Verified Simulated Passage"
      });
    } else if (index === 2) {
      setActivePassage({
        caseTitle: "Brown & Co. v. Fernando (Simulated Example)",
        citation: "Simulated SLLR Reference: [2004] 2 Sri L.R. 115 at p. 122",
        quote: "“Silence may imply consent, but a prompt letter of reservation of rights preserves the cause of action in its entirety. A worker does not need to quit immediately before claiming constructive dismissal.”",
        bench: "Sripavan, J. • Court of Appeal of Sri Lanka (Simulated)",
        badge: "Verified Simulated Passage"
      });
    } else {
      setActivePassage({
        caseTitle: "Hayleys Ltd. v. De Silva (Simulated Example)",
        citation: "Simulated SLLR Reference: [1994] 1 Sri L.R. 297 at p. 302",
        quote: "“A substantial deprivation of transport facilities essential to executive duties functions equivalently to formal discharge.”",
        bench: "Kulatunga, J., Dheeraratne, J. • Supreme Court of Sri Lanka (Simulated)",
        badge: "Verified Simulated Passage"
      });
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Synthetic Dataset Disclaimer Banner */}
      <div className="w-full bg-secondary-fixed/60 border-b border-secondary/20 px-gutter py-2 text-center text-label-sm text-on-secondary-fixed flex items-center justify-center gap-space-xs">
        <span className="material-symbols-outlined text-[16px] text-secondary">info</span>
        <span>
          <strong>Simulated Research Data:</strong> All cases, extracts, and citations on this page are generated for platform demonstration and technical evaluation under Section 13 of the project proposal.
        </span>
      </div>

      {/* 1. TOP RESEARCH META RIBBON */}
      <div className="w-full bg-surface-container-lowest px-gutter py-space-sm shadow-[0_1px_3px_rgba(30,58,95,0.04)] border-b border-outline-variant/30 flex flex-wrap items-center justify-between gap-space-md">
        <div className="flex items-center gap-space-md">
          <div className="flex items-center gap-space-xs text-secondary">
            <span className="material-symbols-outlined text-[18px]">folder_special</span>
            <span className="font-label-md text-label-md tracking-wider uppercase text-on-surface font-semibold">
              {mockDossier.docketId}
            </span>
          </div>
          <span className="text-outline-variant font-body-sm">•</span>
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">
            {mockDossier.sessionTerm}
          </span>
          <span className="text-outline-variant font-body-sm">•</span>
          <div className="flex items-center gap-space-xs text-tertiary">
            <span className="material-symbols-outlined text-[16px]">account_balance</span>
            <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold">
              {mockDossier.jurisdiction}
            </span>
          </div>
        </div>

        {/* Synthesis Verification Status */}
        <div className="flex items-center gap-space-md">
          <div className="flex items-center gap-space-xs px-space-sm py-1 bg-surface-container rounded text-on-surface-variant font-label-sm text-label-sm">
            <span className="material-symbols-outlined text-primary text-[15px]">fact_check</span>
            <span>Retrieved from 65 simulated documents in 4.2s</span>
          </div>
          <div className="flex items-center gap-1.5 px-space-sm py-1 rounded bg-secondary-fixed/40 text-on-secondary-fixed font-label-md text-label-md">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span>3 Citations Verified</span>
            <span className="text-outline-variant">|</span>
            <span className="text-error font-semibold flex items-center gap-0.5">
              <span className="material-symbols-outlined text-[14px]">warning</span> 1 Ambiguity
            </span>
          </div>
        </div>
      </div>

      {/* 2. PRIMARY 12-COLUMN RESEARCH WORKSPACE */}
      <div className="w-full px-gutter py-space-xl">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-space-xl">
          {/* MAIN READING CANAL (8 COLS) */}
          <article className="lg:col-span-8 flex flex-col space-y-space-xl">
            {/* Core Legal Answer */}
            <section className="pb-space-lg border-b border-outline-variant/40 space-y-space-sm">
              <div className="flex items-center justify-between font-label-sm text-label-sm text-outline">
                <span className="uppercase tracking-wider font-semibold text-primary">Core Finding</span>
                <span className="font-citation text-secondary italic">Sri Lankan Labour Law Analysis</span>
              </div>
              <h2 className="font-serif text-headline-lg text-on-surface font-semibold">
                Research Summary & Legal Finding
              </h2>
              <p className="font-serif text-headline-sm text-on-surface leading-relaxed font-normal">
                {mockDossier.executiveRatio}
              </p>
              <div className="pl-space-md border-l-2 border-primary space-y-space-xs font-body-md text-body-md text-on-surface-variant leading-relaxed">
                <p>{mockDossier.executiveProse}</p>
              </div>
            </section>

            {/* Substantive Findings */}
            <section className="pb-space-lg border-b border-outline-variant/40 space-y-space-md">
              <div className="flex items-baseline justify-between">
                <h2 className="font-serif text-headline-md text-on-surface font-semibold">
                  Detailed Findings & Supporting Evidence
                </h2>
                <span className="font-label-sm text-label-sm text-outline">3 Citations Checked</span>
              </div>

              <div className="space-y-space-md divide-y divide-outline-variant/20">
                {mockDossier.findings.map((f) => (
                  <div key={f.id} className="pt-space-sm first:pt-0 space-y-space-xs">
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif text-title-lg text-on-surface font-semibold flex items-center gap-space-sm">
                        <span className="text-primary font-bold">{f.number}</span>
                        <span>{f.title}</span>
                      </h3>
                      <span className="px-space-xs py-0.5 rounded bg-surface-container text-primary font-label-sm text-label-sm font-semibold">
                        {f.status}
                      </span>
                    </div>
                    <p className="font-sans text-body-md text-on-surface-variant pl-space-md leading-relaxed">
                      {f.summary}
                    </p>
                    <div className="pl-space-md flex items-center gap-space-md font-label-sm text-label-sm text-secondary">
                      <span className="font-semibold">{f.citationText}</span>
                      <span>•</span>
                      <button
                        onClick={() => selectPassage(f.passageIndex)}
                        className="text-primary hover:underline font-semibold cursor-pointer"
                      >
                        {f.quotePageRef} →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Applicable Legislation */}
            <section className="pb-space-lg border-b border-outline-variant/40 space-y-space-md">
              <h2 className="font-serif text-headline-md text-on-surface font-semibold">
                Relevant Statutory Framework
              </h2>
              <div className="divide-y divide-outline-variant/20 font-body-sm text-body-sm">
                {mockDossier.statutes.map((s, idx) => (
                  <div key={idx} className="py-space-sm flex flex-col sm:flex-row sm:items-start justify-between gap-space-sm">
                    <div className="sm:w-1/3">
                      <span className="font-title-sm text-title-sm text-on-surface block font-semibold">{s.actName}</span>
                      <span className="text-primary font-medium font-label-sm text-label-sm">{s.section}</span>
                    </div>
                    <p className="sm:w-2/3 text-on-surface-variant font-body-md leading-relaxed">
                      {s.summary}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Precedents on Point */}
            <section className="pb-space-lg border-b border-outline-variant/40 space-y-space-md">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-headline-md text-on-surface font-semibold">
                  Relevant Case Decisions (Simulated)
                </h2>
                <span className="font-label-sm text-label-sm text-outline">Simulated SLLR Precedents</span>
              </div>

              <div className="space-y-space-md divide-y divide-outline-variant/20">
                {mockDossier.precedents.map((p) => (
                  <div key={p.id} className="pt-space-sm first:pt-0 space-y-space-xs">
                    <div className="flex items-baseline justify-between">
                      <h3 className="font-serif text-title-lg text-on-surface font-semibold">{p.caseName}</h3>
                      <span className="font-citation text-secondary italic font-serif">{p.citation}</span>
                    </div>
                    <p className="font-sans text-body-md text-on-surface-variant leading-relaxed">
                      <strong className="text-on-surface">Legal Rule:</strong> {p.ratio}
                    </p>
                    <div className="flex items-center justify-between font-label-sm text-label-sm text-outline pt-1">
                      <span>Bench / Court: {p.bench}</span>
                      <button
                        onClick={() => navigate('/compare')}
                        className="text-primary hover:underline font-semibold cursor-pointer"
                      >
                        Compare in Matrix →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Verbatim Passages */}
            <section className="pb-space-lg border-b border-outline-variant/40 space-y-space-md">
              <h2 className="font-serif text-headline-md text-on-surface font-semibold">
                Supporting Source Passages
              </h2>
              <div className="space-y-space-md">
                <div className="space-y-space-xs">
                  <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
                    Simulated Volume 1, Page 34
                  </span>
                  <blockquote className="pl-space-md border-l-2 border-primary font-serif text-headline-sm text-on-surface italic leading-relaxed">
                    “An employer cannot unilaterally vary terms of remuneration to the detriment of a workman under the guise of an administrative restructuring. Where allowances have attained certainty and regular receipt, they merge into the contract.”
                  </blockquote>
                  <span className="font-label-sm text-label-sm text-secondary font-medium">
                    From simulated judicial decision
                  </span>
                </div>

                <div className="space-y-space-xs pt-space-sm">
                  <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
                    Simulated Volume 2, Page 122
                  </span>
                  <blockquote className="pl-space-md border-l-2 border-secondary font-serif text-headline-sm text-on-surface italic leading-relaxed">
                    “Silence may imply consent, but a prompt letter of reservation of rights preserves the cause of action in its entirety. A worker does not need to quit immediately before claiming constructive dismissal.”
                  </blockquote>
                  <span className="font-label-sm text-label-sm text-secondary font-medium">
                    From simulated judicial decision
                  </span>
                </div>
              </div>
            </section>

            {/* Caveat */}
            <section className="space-y-space-sm pt-space-xs">
              <div className="flex items-center gap-space-sm text-error">
                <span className="material-symbols-outlined text-[18px]">warning</span>
                <h2 className="font-title-md text-title-md font-semibold">{mockDossier.caveatTitle}</h2>
              </div>
              <p className="font-sans text-body-md text-on-surface-variant leading-relaxed pl-space-md border-l-2 border-error/50">
                {mockDossier.caveatText}
              </p>
            </section>
          </article>

          {/* STICKY EVIDENCE INSPECTION DOCK (4 COLS) */}
          <aside className="lg:col-span-4 flex flex-col space-y-space-xl">
            {/* Header Box */}
            <div className="pb-space-md border-b border-outline-variant/30 space-y-space-sm">
              <div className="flex items-center justify-between font-label-sm text-label-sm text-outline uppercase tracking-wider">
                <span className="font-semibold">Evidence Inspection Dock</span>
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              </div>
              <div className="space-y-0.5">
                <p className="font-title-md text-title-md text-on-surface font-semibold">
                  Inquiry Reference #{mockDossier.docketId}
                </p>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  {mockDossier.sessionTerm}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-space-sm pt-space-xs">
                <div className="p-space-sm bg-surface-container rounded">
                  <span className="block font-serif text-headline-sm text-primary font-bold">
                    {mockDossier.confidenceScore}%
                  </span>
                  <span className="font-label-sm text-label-sm text-outline">Evidence Match</span>
                </div>
                <div className="p-space-sm bg-surface-container rounded">
                  <span className="block font-serif text-headline-sm text-secondary font-bold">
                    3
                  </span>
                  <span className="font-label-sm text-label-sm text-outline">Verified Passages</span>
                </div>
              </div>
            </div>

            {/* Sticky Active Passage Inspector */}
            <div className="sticky top-24 space-y-space-md">
              <div className="flex items-center justify-between pb-1">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
                  Active Passage In View
                </span>
                <span className="font-label-sm text-label-sm text-primary font-medium">
                  {activePassage.badge}
                </span>
              </div>

              <div className="space-y-space-xs p-space-md bg-surface-container-low rounded-lg border border-outline-variant/30 shadow-[0_1px_3px_rgba(30,58,95,0.04)]">
                <h4 className="font-serif text-title-sm text-on-surface font-semibold">
                  {activePassage.caseTitle}
                </h4>
                <span className="font-citation text-secondary italic text-body-sm font-serif block">
                  {activePassage.citation}
                </span>
                <p className="font-serif italic text-body-sm text-on-surface leading-relaxed pt-1">
                  {activePassage.quote}
                </p>
                <span className="font-label-sm text-label-sm text-outline block pt-1">
                  {activePassage.bench}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-space-xs pt-space-sm">
                <button
                  onClick={() => navigate('/documents/doc-1')}
                  className="w-full py-2 px-space-md rounded bg-surface-container-lowest border border-outline-variant/40 text-on-surface font-title-sm text-title-sm hover:bg-surface-container transition-colors flex items-center justify-center gap-space-xs cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px] text-primary">description</span>
                  <span>View Sample Employment Agreement</span>
                </button>
                <button
                  onClick={() => navigate('/compare')}
                  className="w-full py-2 px-space-md rounded bg-primary-container text-on-primary font-title-sm text-title-sm font-semibold shadow-[0_1px_3px_rgba(30,58,95,0.12)] hover:bg-primary transition-colors flex items-center justify-center gap-space-xs cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">compare</span>
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
