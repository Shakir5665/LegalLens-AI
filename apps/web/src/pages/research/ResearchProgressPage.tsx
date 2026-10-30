import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const ResearchProgressPage: React.FC = () => {
  const navigate = useNavigate();
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
    <div className="flex flex-col w-full min-h-[calc(100vh-64px)] justify-center items-center px-gutter py-space-xl">
      <div className="w-full max-w-2xl bg-surface-container-lowest rounded-lg border border-outline-variant/30 p-space-xl shadow-[0_1px_8px_rgba(30,58,95,0.05)] flex flex-col gap-space-xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-space-md border-b border-outline-variant/20">
          <div className="flex items-center gap-space-sm">
            <span className="w-3 h-3 rounded-full bg-primary animate-pulse"></span>
            <div className="flex flex-col">
              <span className="font-serif text-title-lg text-on-surface font-semibold">
                Multi-Agent Legal Research Workflow
              </span>
              <span className="font-label-sm text-label-sm text-outline">
                Research Identifier: {runId || 'RES-2025-001'} (Simulated Dataset)
              </span>
            </div>
          </div>
          <div className="px-space-md py-1 rounded bg-surface-container text-primary font-mono font-semibold text-title-sm">
            00:{seconds < 10 ? `0${seconds}` : seconds}s
          </div>
        </div>

        {/* 4-Stage Stepper */}
        <div className="flex flex-col gap-space-md">
          <div className={`p-space-md rounded border flex items-center justify-between ${stage >= 1 ? 'border-primary/40 bg-surface-container/30' : 'border-outline-variant/20 opacity-50'}`}>
            <div className="flex items-center gap-space-sm">
              <span className="material-symbols-outlined text-[20px] text-primary">
                {stage > 1 ? 'check_circle' : 'hourglass_top'}
              </span>
              <span className="font-body-md text-body-md font-medium text-on-surface">
                1. Question Analysis & Document Parsing
              </span>
            </div>
            <span className="font-label-sm text-label-sm text-primary font-semibold">
              {stage > 1 ? 'Completed' : 'Running'}
            </span>
          </div>

          <div className={`p-space-md rounded border flex items-center justify-between ${stage >= 2 ? 'border-primary/40 bg-surface-container/30' : 'border-outline-variant/20 opacity-50'}`}>
            <div className="flex items-center gap-space-sm">
              <span className="material-symbols-outlined text-[20px] text-secondary">
                {stage > 2 ? 'check_circle' : (stage === 2 ? 'sync' : 'pending')}
              </span>
              <span className="font-body-md text-body-md font-medium text-on-surface">
                2. Legislation Research & Case Discovery
              </span>
            </div>
            <span className="font-label-sm text-label-sm text-secondary font-semibold">
              {stage > 2 ? 'Completed' : (stage === 2 ? 'Matching sources...' : 'Queued')}
            </span>
          </div>

          <div className={`p-space-md rounded border flex items-center justify-between ${stage >= 3 ? 'border-primary/40 bg-surface-container/30' : 'border-outline-variant/20 opacity-50'}`}>
            <div className="flex items-center gap-space-sm">
              <span className="material-symbols-outlined text-[20px] text-primary">
                {stage === 3 ? 'fact_check' : 'pending'}
              </span>
              <span className="font-body-md text-body-md font-medium text-on-surface">
                3. Citation Verification & Passage Extraction
              </span>
            </div>
            <span className="font-label-sm text-label-sm text-primary font-semibold">
              {stage === 3 ? 'Verifying passages...' : 'Queued'}
            </span>
          </div>

          <div className="p-space-md rounded border border-outline-variant/20 opacity-50 flex items-center justify-between">
            <div className="flex items-center gap-space-sm">
              <span className="material-symbols-outlined text-[20px] text-outline">pending</span>
              <span className="font-body-md text-body-md font-medium text-on-surface">
                4. Legal Synthesis & Report Assembly
              </span>
            </div>
            <span className="font-label-sm text-label-sm text-outline">Finalizing</span>
          </div>
        </div>

        {/* Execution Log */}
        <div className="p-space-md bg-surface-container-high rounded font-mono text-[12px] text-on-surface-variant flex flex-col gap-1 border border-outline-variant/30">
          <div>[ORCHESTRATOR] Research task initialized for Sri Lankan employment law domain.</div>
          <div>[LEGISLATION AGENT] Identified relevant statute: Industrial Disputes Act Section 31B.</div>
          <div>[CASE AGENT] Retrieved simulated decisions: CTC v. Ilangaratne and Brown & Co. v. Fernando.</div>
          <div>[VERIFICATION AGENT] Validating verbatim quotations against passage IDs...</div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => navigate(`/research/${runId || 'RES-2025-001'}`)}
            className="text-label-sm font-semibold text-primary hover:underline cursor-pointer"
          >
            Skip to completed results →
          </button>
        </div>
      </div>
    </div>
  );
};
