import React from 'react';
import { useNavigate } from 'react-router-dom';
import { mockReports } from '../../services/mockData';

export const ReportsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full">
      <div className="px-margin py-space-xl max-w-7xl mx-auto w-full flex flex-col gap-space-xl">
        {/* Header Breadcrumb */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-space-md border-b border-outline-variant/30 gap-space-md">
          <div className="flex flex-col gap-space-xs">
            <div className="flex items-center gap-space-xs text-primary font-label-sm uppercase tracking-wider font-semibold">
              <span className="material-symbols-outlined text-[16px]">description</span>
              <span>Research Reports • Evidence-Grounded Outputs</span>
            </div>
            <h1 className="font-serif text-headline-lg text-on-surface font-semibold">
              Structured Research Reports
            </h1>
            <p className="font-sans text-body-md text-on-surface-variant">
              Comprehensive reports containing executive summaries, applicable statutes, relevant judicial decisions, and linked source passages.
            </p>
          </div>

          <button
            onClick={() => navigate('/research/new')}
            className="px-space-md py-space-sm rounded bg-primary-container text-on-primary font-title-sm shadow-[0_1px_3px_rgba(30,58,95,0.12)] hover:bg-primary transition-colors cursor-pointer flex items-center gap-space-xs"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span>New Research Report</span>
          </button>
        </div>

        {/* Opinion Reports List */}
        <div className="flex flex-col gap-space-md">
          {mockReports.map((r) => (
            <div
              key={r.id}
              className="p-space-xl bg-surface-container-lowest rounded-md border border-outline-variant/30 shadow-[0_1px_3px_rgba(30,58,95,0.04)] flex flex-col md:flex-row md:items-center justify-between gap-space-lg"
            >
              <div className="flex flex-col gap-space-xs max-w-3xl">
                <div className="flex items-center gap-space-sm">
                  <span className="px-space-xs py-0.5 rounded bg-surface-container text-primary font-label-sm text-label-sm font-semibold">
                    {r.status}
                  </span>
                  <span className="font-mono text-label-sm text-outline">{r.docketNumber}</span>
                  <span className="text-outline-variant">•</span>
                  <span className="font-label-sm text-label-sm text-secondary font-medium">{r.forum}</span>
                  {r.isSynthetic && (
                    <span className="px-space-xs py-0.5 rounded bg-secondary-fixed/50 text-on-secondary-fixed text-[11px] font-medium">
                      Simulated Data
                    </span>
                  )}
                </div>
                <h3 className="font-serif text-title-lg text-on-surface font-semibold">{r.title}</h3>
                <p className="font-sans text-body-md text-on-surface-variant leading-relaxed">
                  {r.summary}
                </p>
              </div>

              <div className="flex items-center gap-space-sm shrink-0">
                <button
                  onClick={() => navigate(`/research/${r.docketNumber}`)}
                  className="px-space-md py-space-xs rounded bg-surface border border-outline-variant/40 text-on-surface font-title-sm hover:bg-surface-container cursor-pointer"
                >
                  View Evidence
                </button>
                <button
                  onClick={() => alert(`Exporting report ${r.docketNumber} as PDF...`)}
                  className="px-space-md py-space-xs rounded bg-primary-container text-on-primary font-title-sm font-semibold hover:bg-primary transition-colors shadow-sm cursor-pointer flex items-center gap-space-xs"
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
