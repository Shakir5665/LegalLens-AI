import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

export const LandingFooter: React.FC = () => {
  const { isDark } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className={`border-t transition-colors duration-200 ${
        isDark
          ? 'bg-[#060D0A] border-emerald-500/15 text-[#9BB8AC]'
          : 'bg-[#F4F8F6] border-[rgba(5,150,105,0.14)] text-[#475569]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Col */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <Link to="/" onClick={scrollToTop} className="flex items-center gap-3 group w-fit">
              <div
                className={`w-9 h-9 rounded-xl p-[1px] transition-transform duration-200 group-hover:scale-105 ${
                  isDark
                    ? 'bg-gradient-to-br from-emerald-400 to-teal-700 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                    : 'bg-gradient-to-br from-[#059669] to-[#10B981] shadow-[0_2px_8px_rgba(5,150,105,0.2)]'
                }`}
              >
                <div
                  className={`w-full h-full rounded-[10px] flex items-center justify-center ${
                    isDark ? 'bg-[#081510] text-emerald-400' : 'bg-white text-[#059669]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">balance</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span
                  className={`font-extrabold text-[17px] tracking-tight font-headline ${
                    isDark ? 'text-white' : 'text-[#0F172A]'
                  }`}
                >
                  LegalLens AI
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-semibold">
                  Judicial Intelligence
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-[13px] leading-relaxed max-w-sm">
              Agentic AI-powered legal research and document intelligence platform. Transforming complex legal questions
              into structured, evidence-backed investigations.
            </p>

            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className={isDark ? 'text-[#A3C2B6]' : 'text-[#064E3B]'}>
                Initial Jurisdiction: Sri Lanka (Labour Law)
              </span>
            </div>
          </div>

          {/* Platform Links */}
          <div className="flex flex-col gap-3 text-xs">
            <span
              className={`font-mono font-bold uppercase tracking-wider text-[11px] ${
                isDark ? 'text-white' : 'text-[#0F172A]'
              }`}
            >
              Platform
            </span>
            <Link to="/research/new" className="hover:text-emerald-500 transition-colors">
              Research Workspace
            </Link>
            <Link to="/compare" className="hover:text-emerald-500 transition-colors">
              Precedent Matrix
            </Link>
            <Link to="/documents" className="hover:text-emerald-500 transition-colors">
              Document Vault
            </Link>
            <Link to="/reports" className="hover:text-emerald-500 transition-colors">
              Executive Dossiers
            </Link>
            <Link to="/research/history" className="hover:text-emerald-500 transition-colors">
              Inquiry History
            </Link>
          </div>

          {/* Technology Links */}
          <div className="flex flex-col gap-3 text-xs">
            <span
              className={`font-mono font-bold uppercase tracking-wider text-[11px] ${
                isDark ? 'text-white' : 'text-[#0F172A]'
              }`}
            >
              Architecture
            </span>
            <span className="hover:text-emerald-500 transition-colors cursor-default">
              LangGraph State Machine
            </span>
            <span className="hover:text-emerald-500 transition-colors cursor-default">
              Hybrid RAG (BM25 + Semantic)
            </span>
            <span className="hover:text-emerald-500 transition-colors cursor-default">
              Knowledge Graph
            </span>
            <span className="hover:text-emerald-500 transition-colors cursor-default">
              MCP Tools Protocol
            </span>
            <span className="hover:text-emerald-500 transition-colors cursor-default">
              Citation Verification Gate
            </span>
          </div>

          {/* Access & Chambers */}
          <div className="flex flex-col gap-3 text-xs">
            <span
              className={`font-mono font-bold uppercase tracking-wider text-[11px] ${
                isDark ? 'text-white' : 'text-[#0F172A]'
              }`}
            >
              Access & Chambers
            </span>
            <Link to="/auth/login" className="hover:text-emerald-500 transition-colors">
              Sign In to Chambers
            </Link>
            <Link to="/auth/register" className="hover:text-emerald-500 transition-colors">
              Request Early Access
            </Link>
            <Link to="/dashboard" className="hover:text-emerald-500 transition-colors">
              Workspace Overview
            </Link>
            <Link to="/settings" className="hover:text-emerald-500 transition-colors">
              Jurisdiction Preferences
            </Link>
          </div>
        </div>

        {/* Legal Disclaimer & Bottom Line */}
        <div
          className={`pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4 text-xs ${
            isDark ? 'border-emerald-500/15' : 'border-[rgba(5,150,105,0.12)]'
          }`}
        >
          {/* Mandatory Legal Disclaimer */}
          <p className="font-mono text-[11px] text-center md:text-left text-amber-600 dark:text-amber-400">
            <strong>Disclaimer:</strong> AI-assisted research is not a substitute for professional legal advice.
          </p>

          <p className="text-[11px] font-mono opacity-60 text-center md:text-right">
            &copy; 2025-2026 LegalLens AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
