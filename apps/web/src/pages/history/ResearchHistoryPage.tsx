import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockRecentDockets } from '../../services/mockData';

export const ResearchHistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const [filterTerm, setFilterTerm] = useState("");

  const filtered = mockRecentDockets.filter(d =>
    d.subject.toLowerCase().includes(filterTerm.toLowerCase()) ||
    d.docketNumber.toLowerCase().includes(filterTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col w-full">
      <div className="px-margin py-space-xl max-w-7xl mx-auto w-full flex flex-col gap-space-xl">
        {/* Header Breadcrumb */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-space-md border-b border-outline-variant/30 gap-space-md">
          <div className="flex flex-col gap-space-xs">
            <div className="flex items-center gap-space-xs text-primary font-label-sm uppercase tracking-wider font-semibold">
              <span className="material-symbols-outlined text-[16px]">history_edu</span>
              <span>Saved Inquiries & Research Log</span>
            </div>
            <h1 className="font-serif text-headline-lg text-on-surface font-semibold">
              Research History
            </h1>
            <p className="font-sans text-body-md text-on-surface-variant">
              Chronological log of past legal research questions, retrieved sources, and verified citations.
            </p>
          </div>

          <div className="w-full md:w-72">
            <input
              type="text"
              value={filterTerm}
              onChange={(e) => setFilterTerm(e.target.value)}
              placeholder="Search by ID or topic..."
              className="w-full px-space-md py-space-xs rounded bg-surface-container-lowest border border-outline-variant/40 font-body-sm text-body-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        {/* Tabular Register */}
        <div className="bg-surface-container-lowest rounded-md border border-outline-variant/30 shadow-[0_1px_3px_rgba(30,58,95,0.04)] overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant/20 bg-surface-container-low/50 text-outline font-label-sm text-label-sm uppercase tracking-wider">
                <th className="py-space-sm px-space-md">Inquiry ID</th>
                <th className="py-space-sm px-space-md">Research Question</th>
                <th className="py-space-sm px-space-md">Legal Domain</th>
                <th className="py-space-sm px-space-md">Date</th>
                <th className="py-space-sm px-space-md">Confidence</th>
                <th className="py-space-sm px-space-md">Status</th>
                <th className="py-space-sm px-space-md text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 font-body-sm text-body-sm">
              {filtered.map((row) => (
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
                  <td className="py-space-md px-space-md text-outline">
                    {row.date}
                  </td>
                  <td className="py-space-md px-space-md font-semibold text-primary">
                    {row.confidence}
                  </td>
                  <td className="py-space-md px-space-md">
                    <span className="inline-flex items-center px-space-xs py-0.5 rounded bg-surface-container text-primary font-label-sm font-semibold">
                      {row.status}
                    </span>
                  </td>
                  <td className="py-space-md px-space-md text-right text-primary font-medium group-hover:underline">
                    View Findings →
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
