import React from 'react';
import { useTheme } from '../../context/ThemeContext';

export const ResearchWorkspacePreview: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <div
      className={`rounded-2xl border p-5 md:p-6 transition-all duration-300 ${
        isDark
          ? 'bg-[#0A1410] border-emerald-500/20 text-[#F3FBF7]'
          : 'bg-white border-[rgba(5,150,105,0.18)] text-[#0F172A]'
      }`}
    >
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-5 border-b border-emerald-500/15 gap-2">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-xs font-bold text-emerald-500 uppercase tracking-wider">
            Active Workspace • Docket RES-2025-001
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold ${
              isDark ? 'bg-emerald-500/15 text-emerald-300' : 'bg-[#E8F4EE] text-[#064E3B]'
            }`}
          >
            STATUS: SYNTHESIS COMPLETE
          </span>
          <span className="text-xs font-mono opacity-60">Confidence: 92%</span>
        </div>
      </div>

      {/* Legal Research Question Bar */}
      <div
        className={`p-4 rounded-xl border mb-5 ${
          isDark
            ? 'bg-[#0D1914] border-emerald-500/25'
            : 'bg-[#F4F8F6] border-[rgba(5,150,105,0.15)]'
        }`}
      >
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Legal Question (Sri Lanka Labour Law)
          </span>
          <span className="text-[10px] font-mono opacity-60">Session Term 2025</span>
        </div>
        <p className="text-[14px] font-semibold leading-relaxed">
          &quot;Does unilateral reduction of fixed monthly allowances constitute constructive termination under the
          Industrial Disputes Act, and does working under prompt written protest protect employee claims?&quot;
        </p>
      </div>

      {/* Key Issues Identified */}
      <div className="mb-5">
        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-500 mb-2">
          Key Research Issues
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <div
            className={`p-3 rounded-lg border text-xs ${
              isDark ? 'bg-[#13251E] border-emerald-500/20' : 'bg-[#E8F4EE]/50 border-[rgba(5,150,105,0.15)]'
            }`}
          >
            <span className="font-bold block mb-0.5">Issue 1: Contractual Variation</span>
            <p className={isDark ? 'text-[#A3C2B6]' : 'text-[#475569]'}>
              Whether a 30% reduction in fixed car & performance allowances forms a repudiatory breach of core salary.
            </p>
          </div>
          <div
            className={`p-3 rounded-lg border text-xs ${
              isDark ? 'bg-[#13251E] border-emerald-500/20' : 'bg-[#E8F4EE]/50 border-[rgba(5,150,105,0.15)]'
            }`}
          >
            <span className="font-bold block mb-0.5">Issue 2: Reservation of Rights</span>
            <p className={isDark ? 'text-[#A3C2B6]' : 'text-[#475569]'}>
              Whether immediate written protest bars employer from arguing employee impliedly consented to the pay cut.
            </p>
          </div>
        </div>
      </div>

      {/* Discovered Legislation & Judgments Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Legislation Discovery */}
        <div
          className={`p-3.5 rounded-xl border ${
            isDark ? 'bg-[#0D1914] border-emerald-500/15' : 'bg-white border-[rgba(5,150,105,0.15)]'
          }`}
        >
          <div className="flex items-center gap-2 text-xs font-bold font-mono text-teal-500 mb-2">
            <span className="material-symbols-outlined text-[16px]">menu_book</span>
            <span>Legislation Discovered (2 Acts)</span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="p-2 rounded bg-emerald-500/5 border border-emerald-500/10">
              <span className="font-bold block">IDA No. 43 of 1950 — § 31B(1)(a)</span>
              <span className={`text-[11px] ${isDark ? 'text-[#7E9F90]' : 'text-[#52796F]'}`}>
                Empowers Labour Tribunal to grant equitable relief for constructive dismissal.
              </span>
            </div>
            <div className="p-2 rounded bg-emerald-500/5 border border-emerald-500/10">
              <span className="font-bold block">TEWA No. 45 of 1971 — § 2(1)</span>
              <span className={`text-[11px] ${isDark ? 'text-[#7E9F90]' : 'text-[#52796F]'}`}>
                Requires written employee consent or Commissioner approval for variations.
              </span>
            </div>
          </div>
        </div>

        {/* Judgment Discovery */}
        <div
          className={`p-3.5 rounded-xl border ${
            isDark ? 'bg-[#0D1914] border-emerald-500/15' : 'bg-white border-[rgba(5,150,105,0.15)]'
          }`}
        >
          <div className="flex items-center gap-2 text-xs font-bold font-mono text-emerald-500 mb-2">
            <span className="material-symbols-outlined text-[16px]">balance</span>
            <span>Judgments Discovered (2 Authorities)</span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="p-2 rounded bg-emerald-500/5 border border-emerald-500/10">
              <span className="font-bold block">Ceylon Tobacco Co. v. Ilangaratne [1989]</span>
              <span className={`text-[11px] ${isDark ? 'text-[#7E9F90]' : 'text-[#52796F]'}`}>
                Supreme Court: Regular allowances merge into core contract; unilateral reduction is void.
              </span>
            </div>
            <div className="p-2 rounded bg-emerald-500/5 border border-emerald-500/10">
              <span className="font-bold block">Brown & Co. v. Fernando [2004]</span>
              <span className={`text-[11px] ${isDark ? 'text-[#7E9F90]' : 'text-[#52796F]'}`}>
                Court of Appeal: Serving under written objection negates implied acquiescence.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
