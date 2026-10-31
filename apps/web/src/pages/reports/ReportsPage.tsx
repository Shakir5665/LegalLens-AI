import React from 'react';
import { useNavigate } from 'react-router-dom';
import { mockReports } from '../../services/mockData';
import { useTheme } from '../../context/ThemeContext';

export const ReportsPage: React.FC = () => {
  const navigate = useNavigate();
  const { isDark } = useTheme();

  return (
    <div className="flex flex-col w-full pb-16">
      <div className="px-6 md:px-10 py-8 max-w-7xl mx-auto w-full flex flex-col gap-6">
        
        {/* Header Breadcrumb */}
        <div
          className={`flex flex-col md:flex-row md:items-end justify-between pb-6 border-b gap-4 ${
            isDark ? 'border-emerald-500/15' : 'border-[rgba(5,150,105,0.12)]'
          }`}
        >
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-mono text-[11px] uppercase tracking-wider font-semibold">
              <span className="material-symbols-outlined text-[16px]">description</span>
              <span>Research Reports • Evidence-Grounded Outputs</span>
            </div>
            <h1
              className={`text-[28px] font-extrabold tracking-tight font-headline ${
                isDark ? 'text-white' : 'text-[#0F172A]'
              }`}
            >
              Structured Research Reports
            </h1>
            <p className={`text-[14px] ${isDark ? 'text-[#94A79E]' : 'text-[#475569]'}`}>
              Comprehensive dossiers containing legal ratios, applicable statutes, relevant judicial decisions, and linked source passages.
            </p>
          </div>

          <button
            onClick={() => navigate('/research/new')}
            className={`px-5 py-2.5 rounded-xl font-bold text-[13px] tracking-tight transition-all cursor-pointer flex items-center gap-2 ${
              isDark
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-[#041F16] shadow-[0_0_18px_rgba(16,185,129,0.35)]'
                : 'bg-[#059669] hover:bg-[#047857] text-white shadow-[0_2px_12px_rgba(5,150,105,0.25)]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span>New Research Report</span>
          </button>
        </div>

        {/* Opinion Reports List */}
        <div className="flex flex-col gap-4">
          {mockReports.map((r) => (
            <div
              key={r.id}
              className={`p-6 md:p-8 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all ${
                isDark
                  ? 'bg-[#0D1914] border-emerald-500/20 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
                  : 'bg-white border-[rgba(5,150,105,0.15)] shadow-[0_4px_25px_rgba(15,23,42,0.04)]'
              }`}
            >
              <div className="flex flex-col gap-2 max-w-3xl">
                <div className="flex items-center gap-2 font-mono text-[11px] flex-wrap">
                  <span
                    className={`px-2 py-0.5 rounded font-bold uppercase tracking-wider ${
                      isDark
                        ? 'bg-emerald-500/15 text-emerald-300'
                        : 'bg-[#E8F4EE] text-[#064E3B]'
                    }`}
                  >
                    {r.status}
                  </span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                    {r.docketNumber}
                  </span>
                  <span className="text-gray-400">•</span>
                  <span className={isDark ? 'text-[#7E9F90]' : 'text-[#52796F]'}>{r.forum}</span>
                  {r.isSynthetic && (
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 font-semibold text-[10px]">
                      Simulated Corpus
                    </span>
                  )}
                </div>

                <h3
                  className={`text-[19px] font-bold font-headline ${
                    isDark ? 'text-white' : 'text-[#0F172A]'
                  }`}
                >
                  {r.title}
                </h3>
                
                <p className={`text-[14px] leading-relaxed ${isDark ? 'text-[#94A79E]' : 'text-[#475569]'}`}>
                  {r.summary}
                </p>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <button
                  onClick={() => navigate(`/research/${r.docketNumber}`)}
                  className={`px-4 py-2.5 rounded-xl text-[13px] font-mono border transition-all cursor-pointer ${
                    isDark
                      ? 'bg-[#060D0A] border-emerald-500/20 text-white hover:bg-[#13251E]'
                      : 'bg-white border-[rgba(5,150,105,0.2)] text-[#0F172A] hover:bg-[#E8F4EE]'
                  }`}
                >
                  View Evidence
                </button>
                <button
                  onClick={() => alert(`Exporting report ${r.docketNumber} as PDF...`)}
                  className={`px-4 py-2.5 rounded-xl font-bold text-[13px] transition-all cursor-pointer flex items-center gap-1.5 ${
                    isDark
                      ? 'bg-emerald-500 hover:bg-emerald-400 text-[#041F16]'
                      : 'bg-[#059669] hover:bg-[#047857] text-white shadow-sm'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">download</span>
                  <span>Export PDF</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
