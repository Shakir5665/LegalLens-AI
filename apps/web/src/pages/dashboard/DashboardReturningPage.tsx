import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { mockUser, mockRecentDockets } from '../../services/mockData';

export const DashboardReturningPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full">
      {/* Synthetic Dataset Evaluation Banner */}
      <div className="w-full bg-surface-container border-b border-outline-variant/30 px-gutter py-2 text-center text-label-sm text-on-surface-variant flex items-center justify-center gap-space-xs">
        <span className="material-symbols-outlined text-[16px] text-tertiary">info</span>
        <span>
          <strong>Simulated Dataset Active:</strong> Research results are generated using the synthetic employment law benchmark dataset for system demonstration.
        </span>
      </div>

      <div className="px-margin py-space-xl max-w-7xl mx-auto w-full flex flex-col gap-space-xl">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between pb-space-lg border-b border-outline-variant/30 gap-space-lg">
          <div className="flex flex-col gap-space-xs max-w-2xl">
            <div className="flex items-center gap-space-xs text-primary font-label-sm uppercase tracking-wider font-semibold">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span>{mockUser.organization} • Active Workspace</span>
            </div>
            <h1 className="font-serif text-headline-xl text-on-surface tracking-tight font-semibold">
              Research Dashboard
            </h1>
            <p className="font-sans text-body-lg text-on-surface-variant">
              Manage your legal research inquiries, explore case comparisons, and verify citations against source passages.
            </p>
          </div>

          <div className="flex items-center gap-space-md">
            <button
              onClick={() => navigate('/research/new')}
              className="flex items-center gap-space-xs px-space-md py-space-sm rounded bg-primary-container text-on-primary font-title-sm text-title-sm shadow-[0_1px_3px_rgba(30,58,95,0.12)] hover:bg-primary transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">add_circle</span>
              <span>New Research Question</span>
            </button>
          </div>
        </div>

        {/* High-Level Metric Tiles */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-space-md">
          <div className="p-space-lg bg-surface-container-lowest rounded-md border border-outline-variant/30 shadow-[0_1px_3px_rgba(30,58,95,0.04)] flex flex-col gap-1">
            <div className="flex items-center justify-between text-outline">
              <span className="font-label-sm text-label-sm uppercase tracking-wider">Research Projects</span>
              <span className="material-symbols-outlined text-[20px] text-primary">folder</span>
            </div>
            <span className="font-serif text-[32px] font-semibold text-on-surface">3</span>
            <span className="font-label-sm text-label-sm text-primary flex items-center gap-0.5">
              <span className="material-symbols-outlined text-[14px]">check</span> Active inquiries
            </span>
          </div>

          <div className="p-space-lg bg-surface-container-lowest rounded-md border border-outline-variant/30 shadow-[0_1px_3px_rgba(30,58,95,0.04)] flex flex-col gap-1">
            <div className="flex items-center justify-between text-outline">
              <span className="font-label-sm text-label-sm uppercase tracking-wider">Simulated Documents</span>
              <span className="material-symbols-outlined text-[20px] text-secondary">menu_book</span>
            </div>
            <span className="font-serif text-[32px] font-semibold text-on-surface">65</span>
            <span className="font-label-sm text-label-sm text-secondary">Acts, Cases & Contracts</span>
          </div>

          <div className="p-space-lg bg-surface-container-lowest rounded-md border border-outline-variant/30 shadow-[0_1px_3px_rgba(30,58,95,0.04)] flex flex-col gap-1">
            <div className="flex items-center justify-between text-outline">
              <span className="font-label-sm text-label-sm uppercase tracking-wider">Citations Verified</span>
              <span className="material-symbols-outlined text-[20px] text-primary">verified</span>
            </div>
            <span className="font-serif text-[32px] font-semibold text-primary">9</span>
            <span className="font-label-sm text-label-sm text-outline">Linked to exact passages</span>
          </div>

          <div className="p-space-lg bg-surface-container-lowest rounded-md border border-outline-variant/30 shadow-[0_1px_3px_rgba(30,58,95,0.04)] flex flex-col gap-1">
            <div className="flex items-center justify-between text-outline">
              <span className="font-label-sm text-label-sm uppercase tracking-wider">Target Domain</span>
              <span className="material-symbols-outlined text-[20px] text-secondary">gavel</span>
            </div>
            <span className="font-serif text-[28px] font-semibold text-on-surface">Employment</span>
            <span className="font-label-sm text-label-sm text-outline">Sri Lanka Labour Law</span>
          </div>
        </div>

        {/* Recent Research Projects Table */}
        <div className="bg-surface-container-lowest rounded-md border border-outline-variant/30 shadow-[0_1px_3px_rgba(30,58,95,0.04)] overflow-hidden">
          <div className="p-space-md border-b border-outline-variant/20 flex items-center justify-between">
            <div className="flex items-center gap-space-sm">
              <h2 className="font-serif text-title-lg text-on-surface font-semibold">Recent Research Inquiries</h2>
              <span className="px-space-xs py-0.5 rounded bg-surface-container text-primary font-label-sm text-label-sm font-semibold">
                Simulated Cases
              </span>
            </div>
            <Link to="/research/history" className="font-label-sm text-label-sm text-primary hover:underline font-medium">
              View all inquiries →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-outline-variant/20 bg-surface-container-low/50 text-outline font-label-sm text-label-sm uppercase tracking-wider">
                  <th className="py-space-sm px-space-md">Inquiry ID</th>
                  <th className="py-space-sm px-space-md">Research Subject</th>
                  <th className="py-space-sm px-space-md">Legal Domain</th>
                  <th className="py-space-sm px-space-md">Sources Found</th>
                  <th className="py-space-sm px-space-md">Confidence</th>
                  <th className="py-space-sm px-space-md">Status</th>
                  <th className="py-space-sm px-space-md text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20 font-body-sm text-body-sm">
                {mockRecentDockets.map((row) => (
                  <tr
                    key={row.docketNumber}
                    onClick={() => navigate(`/research/${row.docketNumber}`)}
                    className="hover:bg-surface-container-low/60 transition-colors cursor-pointer group"
                  >
                    <td className="py-space-md px-space-md font-mono font-medium text-on-surface">
                      {row.docketNumber}
                    </td>
                    <td className="py-space-md px-space-md font-medium text-on-surface group-hover:text-primary transition-colors">
                      {row.subject}
                    </td>
                    <td className="py-space-md px-space-md text-on-surface-variant">
                      {row.jurisdiction}
                    </td>
                    <td className="py-space-md px-space-md text-secondary font-medium">
                      {row.sllrPrecedents} cases linked
                    </td>
                    <td className="py-space-md px-space-md font-semibold text-primary">
                      {row.confidence}
                    </td>
                    <td className="py-space-md px-space-md">
                      <span className="inline-flex items-center px-space-xs py-0.5 rounded text-label-sm font-medium bg-surface-container text-primary font-semibold">
                        {row.status}
                      </span>
                    </td>
                    <td className="py-space-md px-space-md text-right text-primary font-medium group-hover:underline">
                      View Synthesis →
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
