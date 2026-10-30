import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-surface flex flex-col antialiased">
      {/* 1. PUBLIC HEADER */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-surface-container-lowest/90 backdrop-blur-md border-b border-outline-variant/30 z-50 px-gutter flex items-center justify-between">
        <div className="flex items-center gap-space-sm">
          <div className="w-8 h-8 rounded-lg bg-primary-container flex items-center justify-center text-on-primary-container shadow-[0_1px_3px_rgba(30,58,95,0.08)]">
            <span className="material-symbols-outlined text-[20px]">balance</span>
          </div>
          <span className="font-serif font-semibold text-[20px] text-primary tracking-tight">LegalLens AI</span>
          <span className="hidden sm:inline-block ml-2 px-2 py-0.5 rounded bg-surface-container text-tertiary text-[11px] uppercase tracking-wider font-medium">
            Evidence-Grounded Research
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-space-lg text-body-md text-on-surface-variant font-medium">
          <a href="#how-it-works" className="hover:text-primary transition-colors">How It Works</a>
          <a href="#features" className="hover:text-primary transition-colors">Core Features</a>
          <a href="#dataset-notice" className="hover:text-primary transition-colors">Dataset Scope</a>
        </nav>

        <div className="flex items-center gap-space-sm">
          <Link
            to="/auth/login"
            className="text-[13px] font-medium text-on-surface-variant hover:text-on-surface px-3 py-1.5 rounded transition-colors"
          >
            Sign In
          </Link>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-primary-container text-on-primary hover:bg-primary transition-all px-4 py-2 rounded text-[13px] font-semibold tracking-normal shadow-[0_1px_3px_rgba(30,58,95,0.12)] cursor-pointer"
          >
            Open Platform
          </button>
        </div>
      </header>

      {/* 2. HERO SECTION WITH SUBTLE CSS MIST BACKGROUND */}
      <main className="w-full pt-16 flex-1 flex flex-col">
        {/* Synthetic Dataset Banner Notice */}
        <div className="w-full bg-secondary-fixed/50 border-b border-secondary/20 py-2 px-gutter text-center font-label-sm text-label-sm text-on-secondary-fixed">
          <strong>Notice:</strong> Prototype environment utilizing a simulated Sri Lankan employment law dataset for technical validation and agentic workflow demonstration. Not authentic legal authority.
        </div>

        {/* Lightweight CSS ambient background matching Stitch palette (#F0F7F6 / #0F766E) */}
        <section className="relative overflow-hidden w-full bg-gradient-to-b from-[#f0f7f6] via-surface to-surface border-b border-outline-variant/30 pt-16 md:pt-24 pb-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(15,118,110,0.06),transparent_60%)] pointer-events-none"></div>

          <div className="relative max-w-5xl mx-auto px-gutter text-center flex flex-col items-center">
            <div className="inline-flex items-center gap-space-xs px-space-md py-1 rounded bg-surface-container text-primary border border-primary/20 mb-space-lg shadow-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                Multi-Agent Legal Research • Sri Lankan Labour Law
              </span>
            </div>

            <h1 className="font-serif text-headline-xl md:text-[50px] md:leading-[58px] text-on-surface tracking-tight max-w-4xl font-semibold mb-space-md">
              Evidence-Grounded AI for Legal Research and Citation Verification
            </h1>

            <p className="font-sans text-body-lg text-on-surface-variant max-w-3xl mb-space-xl leading-relaxed">
              Designed for law students, legal researchers, lawyers, and academics. Ask complex research questions, explore relevant decisions, verify legal citations against supporting passages, and generate structured reports with clear evidence tracking.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-space-md w-full sm:w-auto">
              <button
                onClick={() => navigate('/dashboard')}
                className="w-full sm:w-auto px-space-xl py-3 rounded bg-primary-container text-on-primary font-title-sm text-title-sm shadow-[0_4px_12px_rgba(30,58,95,0.12)] hover:bg-primary transition-all flex items-center justify-center gap-space-xs cursor-pointer"
              >
                <span>Explore Research Workspace</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
              <Link
                to="/research/new"
                className="w-full sm:w-auto px-space-lg py-3 rounded bg-surface-container-lowest border border-outline-variant/50 text-secondary hover:bg-surface-container-low font-title-sm text-title-sm shadow-[0_1px_3px_rgba(30,58,95,0.05)] transition-all flex items-center justify-center gap-space-xs"
              >
                <span className="material-symbols-outlined text-[18px]">search</span>
                <span>Try a Sample Research Query</span>
              </Link>
            </div>
          </div>
        </section>

        {/* 3. CAPABILITIES GRID */}
        <section id="features" className="py-space-xl max-w-7xl mx-auto px-gutter w-full">
          <div className="flex flex-col gap-space-xs mb-space-xl">
            <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider font-semibold">
              Research Capabilities
            </span>
            <h2 className="font-serif text-headline-lg text-on-surface font-semibold">
              Structured Tools for Reliable Legal Investigation
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
            <div className="p-space-lg bg-surface-container-lowest rounded-md border border-outline-variant/30 shadow-[0_1px_3px_rgba(30,58,95,0.05)] flex flex-col gap-space-sm">
              <div className="w-10 h-10 rounded bg-surface-container flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[24px]">manage_search</span>
              </div>
              <h3 className="font-serif text-title-lg text-on-surface font-semibold">Hybrid Legal Retrieval</h3>
              <p className="font-sans text-body-md text-on-surface-variant leading-relaxed">
                Combines keyword full-text search with semantic vector search to find relevant statutory sections, past decisions, and legal passages without missing key terms.
              </p>
            </div>

            <div className="p-space-lg bg-surface-container-lowest rounded-md border border-outline-variant/30 shadow-[0_1px_3px_rgba(30,58,95,0.05)] flex flex-col gap-space-sm">
              <div className="w-10 h-10 rounded bg-surface-container flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-[24px]">fact_check</span>
              </div>
              <h3 className="font-serif text-title-lg text-on-surface font-semibold">Citation & Evidence Verification</h3>
              <p className="font-sans text-body-md text-on-surface-variant leading-relaxed">
                Every conclusion is linked back to the exact passage in the source document. The system flags unsupported claims, missing references, and conflicting statements.
              </p>
            </div>

            <div className="p-space-lg bg-surface-container-lowest rounded-md border border-outline-variant/30 shadow-[0_1px_3px_rgba(30,58,95,0.05)] flex flex-col gap-space-sm">
              <div className="w-10 h-10 rounded bg-surface-container flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[24px]">compare</span>
              </div>
              <h3 className="font-serif text-title-lg text-on-surface font-semibold">Structured Case Comparison</h3>
              <p className="font-sans text-body-md text-on-surface-variant leading-relaxed">
                Compare multiple judicial decisions side by side across key facts, legal issues, reasoning, and final outcomes to quickly understand how precedents apply.
              </p>
            </div>
          </div>
        </section>

        {/* 4. DATASET NOTICE SECTION */}
        <section id="dataset-notice" className="w-full bg-surface-container-low border-t border-outline-variant/30 py-space-xl">
          <div className="max-w-5xl mx-auto px-gutter flex flex-col gap-space-sm text-center">
            <span className="font-label-sm uppercase tracking-wider text-secondary font-semibold">
              Dataset Approach & Transparency
            </span>
            <h2 className="font-serif text-title-lg text-on-surface font-semibold">
              Simulated Benchmark Dataset for System Evaluation
            </h2>
            <p className="font-sans text-body-md text-on-surface-variant leading-relaxed">
              In accordance with Section 13 of the project specification, this prototype operates on a synthetic, AI-augmented legal research dataset simulating Sri Lankan employment law scenarios (simulated acts, sample cases, and model employment contracts). This allows complete testing of multi-agent orchestration, citation verification, and report generation without misrepresenting synthetic data as live legal authority.
            </p>
          </div>
        </section>

        {/* 5. FOOTER */}
        <footer className="w-full bg-surface-container-lowest border-t border-outline-variant/30 py-space-lg mt-auto">
          <div className="max-w-7xl mx-auto px-gutter flex flex-col md:flex-row items-center justify-between gap-space-md text-on-surface-variant font-label-sm text-label-sm">
            <div className="flex items-center gap-space-sm">
              <span className="font-serif font-bold text-on-surface text-[15px]">LegalLens AI</span>
              <span>•</span>
              <span>Evidence-Grounded Research Platform</span>
            </div>
            <div>
              <span>© {new Date().getFullYear()} LegalLens AI Project. Created for Academic and Educational Research.</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};
