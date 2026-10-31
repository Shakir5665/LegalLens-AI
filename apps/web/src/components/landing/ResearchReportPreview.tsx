import React from 'react';
import { useTheme } from '../../context/ThemeContext';

export const ResearchReportPreview: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <div
      className={`rounded-2xl border p-5 md:p-6 transition-all duration-300 font-sans ${
        isDark
          ? 'bg-[#0A1410] border-emerald-500/20 text-[#F3FBF7]'
          : 'bg-white border-[rgba(5,150,105,0.18)] text-[#0F172A]'
      }`}
    >
      {/* Report Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-emerald-500/15 gap-2">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px] text-emerald-500">description</span>
          <span className="font-mono text-xs font-bold text-emerald-500 uppercase tracking-wider">
            LegalLens AI • Structured Legal Investigation Report
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
              isDark ? 'bg-emerald-500/15 text-emerald-300' : 'bg-[#E8F4EE] text-[#064E3B]'
            }`}
          >
            REPORT #LL-2025-REP-01
          </span>
          <span className="text-[11px] font-mono opacity-60">Verified Benchmarks</span>
        </div>
      </div>

      <div className="space-y-4 text-xs">
        {/* Executive Summary */}
        <div
          className={`p-3.5 rounded-xl border ${
            isDark ? 'bg-[#0D1914] border-emerald-500/15' : 'bg-[#F4F8F6] border-[rgba(5,150,105,0.14)]'
          }`}
        >
          <div className="flex items-center gap-1.5 font-bold font-mono text-[11px] text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">
            <span className="material-symbols-outlined text-[14px]">summarize</span>
            <span>1. Executive Summary</span>
          </div>
          <p className="leading-relaxed">
            The employer&apos;s unilateral 30% reduction of fixed monthly allowances amounts to a constructive
            termination under Sri Lankan Labour jurisprudence. The employee&apos;s prompt submission of written protest
            bars the defense of acquiescence, preserving the right to claim equitable relief before the Labour Tribunal.
          </p>
        </div>

        {/* Legal Issues */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div
            className={`p-3 rounded-lg border ${
              isDark ? 'bg-[#0D1914] border-emerald-500/10' : 'bg-[#F4F8F6] border-[rgba(5,150,105,0.1)]'
            }`}
          >
            <span className="font-mono font-bold text-[10px] text-emerald-500 uppercase block mb-1">
              2. Identified Legal Issues
            </span>
            <ul className="list-disc list-inside space-y-1 text-[11px] opacity-90">
              <li>Whether allowances form integral salary (Ceylon Tobacco test)</li>
              <li>Whether continuing under protest constitutes constructive repudiation</li>
            </ul>
          </div>

          <div
            className={`p-3 rounded-lg border ${
              isDark ? 'bg-[#0D1914] border-emerald-500/10' : 'bg-[#F4F8F6] border-[rgba(5,150,105,0.1)]'
            }`}
          >
            <span className="font-mono font-bold text-[10px] text-teal-500 uppercase block mb-1">
              3. Applicable Legal Framework
            </span>
            <ul className="list-disc list-inside space-y-1 text-[11px] opacity-90">
              <li>Industrial Disputes Act No. 43 of 1950 (§ 31B)</li>
              <li>Termination of Employment of Workmen Act (TEWA) § 2(1)</li>
            </ul>
          </div>
        </div>

        {/* Legal Analysis */}
        <div
          className={`p-3 rounded-lg border ${
            isDark ? 'bg-[#13251E] border-emerald-500/20' : 'bg-[#E8F4EE]/60 border-[rgba(5,150,105,0.15)]'
          }`}
        >
          <span className="font-mono font-bold text-[10px] text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block mb-1">
            4. Judicial Analysis & Synthesis
          </span>
          <p className="leading-relaxed text-[11px]">
            In <em>Ceylon Tobacco Co. v. Ilangaratne [1989]</em>, the Supreme Court ruled that regular monthly allowances
            merge into contract remuneration and cannot be reduced unilaterally under corporate restructuring.
            Furthermore, <em>Brown & Co. v. Fernando [2004]</em> establishes that a written reservation of rights preserves
            statutory remedies even while remaining in temporary service.
          </p>
        </div>

        {/* Source References & Limitations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div
            className={`p-3 rounded-lg border text-[11px] ${
              isDark ? 'bg-[#0D1914] border-emerald-500/15' : 'bg-white border-[rgba(5,150,105,0.12)]'
            }`}
          >
            <span className="font-mono font-bold text-[10px] text-emerald-500 uppercase block mb-1">
              5. Verified Source References
            </span>
            <div className="space-y-1 font-mono text-[10px]">
              <div className="flex justify-between">
                <span>[1989] 1 Sri L.R. 34</span>
                <span className="text-emerald-400">Vol 1, p. 34</span>
              </div>
              <div className="flex justify-between">
                <span>[2004] 2 Sri L.R. 122</span>
                <span className="text-emerald-400">Vol 2, p. 122</span>
              </div>
            </div>
          </div>

          <div
            className={`p-3 rounded-lg border text-[11px] ${
              isDark ? 'bg-[#0D1914] border-emerald-500/15' : 'bg-white border-[rgba(5,150,105,0.12)]'
            }`}
          >
            <span className="font-mono font-bold text-[10px] text-amber-500 uppercase block mb-1">
              6. Limitations & Review Points
            </span>
            <p className={`text-[10px] leading-tight ${isDark ? 'text-[#A3C2B6]' : 'text-[#64748B]'}`}>
              Requires chamber verification of actual appointment letter clause 8.2 and verification that written protest
              was received within 30 days.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
