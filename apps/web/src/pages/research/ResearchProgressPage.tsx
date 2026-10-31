import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

export const ResearchProgressPage: React.FC = () => {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const { runId } = useParams();
  const [seconds, setSeconds] = useState(0);
  const [stage, setStage] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    const stageTimer = setTimeout(() => setStage(2), 2000);
    const stageTimer2 = setTimeout(() => setStage(3), 4000);
    const completeTimer = setTimeout(() => {
      navigate(`/research/${runId || 'RES-2025-001'}`);
    }, 6000);

    return () => {
      clearInterval(timer);
      clearTimeout(stageTimer);
      clearTimeout(stageTimer2);
      clearTimeout(completeTimer);
    };
  }, [navigate, runId]);

  return (
    <div className="flex flex-col w-full min-h-[calc(100vh-64px)] justify-center items-center px-4 py-12">
      <div
        className={`w-full max-w-2xl rounded-2xl border p-8 shadow-2xl flex flex-col gap-6 transition-all ${
          isDark
            ? 'bg-[#0D1914] border-emerald-500/20 shadow-[0_20px_60px_rgba(0,0,0,0.8)]'
            : 'bg-white border-[rgba(5,150,105,0.15)] shadow-[0_15px_40px_rgba(15,23,42,0.06)]'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b border-inherit">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping"></span>
            <div className="flex flex-col">
              <span className="text-[18px] font-extrabold font-headline">
                Multi-Agent Legal Research Running
              </span>
              <span className="font-mono text-[11px] text-[#52796F] dark:text-[#7E9F90]">
                Docket ID: {runId || 'RES-2025-001'} (Simulated Dataset)
              </span>
            </div>
          </div>
          
          <div
            className={`px-3 py-1 rounded-lg font-mono font-bold text-[13px] border ${
              isDark
                ? 'bg-[#060D0A] border-emerald-500/25 text-emerald-400'
                : 'bg-[#E8F4EE] border-[rgba(5,150,105,0.2)] text-[#059669]'
            }`}
          >
            00:{seconds < 10 ? `0${seconds}` : seconds}s
          </div>
        </div>

        {/* 4-Stage Stepper */}
        <div className="flex flex-col gap-3 font-mono text-[13px]">
          
          <div
            className={`p-4 rounded-xl border flex items-center justify-between transition-all ${
              stage >= 1
                ? isDark
                  ? 'border-emerald-500/40 bg-[#13251E]'
                  : 'border-[#059669]/30 bg-[#E8F4EE]'
                : 'opacity-40 border-inherit'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[20px] text-emerald-500">
                {stage > 1 ? 'check_circle' : 'hourglass_top'}
              </span>
              <span className="font-medium">1. Question Parsing & Lexical Decomposition</span>
            </div>
            <span className="font-bold text-emerald-600 dark:text-emerald-400 text-[11px] uppercase">
              {stage > 1 ? 'Complete' : 'Running'}
            </span>
          </div>

          <div
            className={`p-4 rounded-xl border flex items-center justify-between transition-all ${
              stage >= 2
                ? isDark
                  ? 'border-emerald-500/40 bg-[#13251E]'
                  : 'border-[#059669]/30 bg-[#E8F4EE]'
                : 'opacity-40 border-inherit'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[20px] text-emerald-500">
                {stage > 2 ? 'check_circle' : stage === 2 ? 'sync' : 'pending'}
              </span>
              <span className="font-medium">2. Hybrid Vector Search across Sri Lankan Precedents</span>
            </div>
            <span className="font-bold text-emerald-600 dark:text-emerald-400 text-[11px] uppercase">
              {stage > 2 ? 'Complete' : stage === 2 ? 'Matching...' : 'Queued'}
            </span>
          </div>

          <div
            className={`p-4 rounded-xl border flex items-center justify-between transition-all ${
              stage >= 3
                ? isDark
                  ? 'border-emerald-500/40 bg-[#13251E]'
                  : 'border-[#059669]/30 bg-[#E8F4EE]'
                : 'opacity-40 border-inherit'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[20px] text-emerald-500">
                {stage === 3 ? 'fact_check' : 'pending'}
              </span>
              <span className="font-medium">3. Deterministic Citation Verification & Diff Checking</span>
            </div>
            <span className="font-bold text-emerald-600 dark:text-emerald-400 text-[11px] uppercase">
              {stage === 3 ? 'Grounded 100%' : 'Queued'}
            </span>
          </div>

          <div className="p-4 rounded-xl border border-inherit opacity-40 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[20px]">pending</span>
              <span className="font-medium">4. Structured Brief Assembly & Ratio Decidendi Isolation</span>
            </div>
            <span className="text-[11px] uppercase">Queued</span>
          </div>

        </div>

        {/* Live Processing Terminal Message */}
        <div
          className={`p-4 rounded-xl border text-[12px] font-mono flex items-center gap-2.5 ${
            isDark
              ? 'bg-[#060D0A] border-emerald-500/20 text-[#A3C2B6]'
              : 'bg-[#F4F8F6] border-[rgba(5,150,105,0.15)] text-[#52796F]'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Cross-examining Section 31B against Supreme Court decision transcripts...</span>
        </div>

      </div>
    </div>
  );
};
