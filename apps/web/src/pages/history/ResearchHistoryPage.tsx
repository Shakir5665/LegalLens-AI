import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockRecentDockets } from '../../services/mockData';
import { useTheme } from '../../context/ThemeContext';

export const ResearchHistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [filterTerm, setFilterTerm] = useState("");

  const filtered = mockRecentDockets.filter(
    (d) =>
      d.subject.toLowerCase().includes(filterTerm.toLowerCase()) ||
      d.docketNumber.toLowerCase().includes(filterTerm.toLowerCase())
  );

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
              <span className="material-symbols-outlined text-[16px]">history_edu</span>
              <span>Saved Inquiries & Research Log</span>
            </div>
            <h1
              className={`text-[28px] font-extrabold tracking-tight font-headline ${
                isDark ? 'text-white' : 'text-[#0F172A]'
              }`}
            >
              Research History
            </h1>
            <p className={`text-[14px] ${isDark ? 'text-[#94A79E]' : 'text-[#475569]'}`}>
              Chronological log of legal questions, retrieved statutory passages, and verified findings.
            </p>
          </div>

          <div className="w-full md:w-80">
            <input
              type="text"
              value={filterTerm}
              onChange={(e) => setFilterTerm(e.target.value)}
              placeholder="Filter by ID or topic..."
              className={`w-full px-4 py-2.5 rounded-xl text-[13px] transition-all focus:outline-none focus:ring-1 border ${
                isDark
                  ? 'bg-[#0D1914] border-emerald-500/20 text-white placeholder:text-[#7E9F90] focus:border-emerald-400 focus:ring-emerald-400/30'
                  : 'bg-white border-[rgba(5,150,105,0.15)] text-[#0F172A] placeholder:text-[#52796F] focus:border-[#059669] focus:ring-[#059669]/20 shadow-sm'
              }`}
            />
          </div>
        </div>

        {/* Tabular Register */}
        <div
          className={`rounded-2xl border overflow-hidden transition-all ${
            isDark
              ? 'bg-[#0D1914] border-emerald-500/20 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
              : 'bg-white border-[rgba(5,150,105,0.15)] shadow-[0_4px_25px_rgba(15,23,42,0.04)]'
          }`}
        >
          <table className="w-full text-left border-collapse">
            <thead>
              <tr
                className={`border-b font-mono text-[11px] uppercase tracking-wider ${
                  isDark
                    ? 'border-emerald-500/15 bg-[#060D0A] text-[#7E9F90]'
                    : 'border-[rgba(5,150,105,0.12)] bg-[#F4F8F6] text-[#52796F]'
                }`}
              >
                <th className="py-3 px-5">Inquiry ID</th>
                <th className="py-3 px-5">Research Question</th>
                <th className="py-3 px-5">Legal Domain</th>
                <th className="py-3 px-5">Date</th>
                <th className="py-3 px-5">Confidence</th>
                <th className="py-3 px-5">Status</th>
                <th className="py-3 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody
              className={`divide-y text-[13px] ${
                isDark ? 'divide-emerald-500/10' : 'divide-[rgba(5,150,105,0.08)]'
              }`}
            >
              {filtered.map((row) => (
                <tr
                  key={row.docketNumber}
                  onClick={() => navigate(`/research/${row.docketNumber}`)}
                  className={`transition-colors cursor-pointer group ${
                    isDark ? 'hover:bg-[#13251E]' : 'hover:bg-[#E8F4EE]/60'
                  }`}
                >
                  <td className="py-4 px-5 font-mono text-[12px] font-semibold text-emerald-600 dark:text-emerald-400">
                    {row.docketNumber}
                  </td>
                  <td
                    className={`py-4 px-5 font-semibold transition-colors group-hover:text-emerald-600 dark:group-hover:text-emerald-400 ${
                      isDark ? 'text-white' : 'text-[#0F172A]'
                    }`}
                  >
                    {row.subject}
                  </td>
                  <td className={`py-4 px-5 ${isDark ? 'text-[#94A79E]' : 'text-[#52796F]'}`}>
                    {row.jurisdiction}
                  </td>
                  <td className="py-4 px-5 font-mono text-[12px] text-[#52796F] dark:text-[#7E9F90]">
                    {row.date}
                  </td>
                  <td className="py-4 px-5 font-mono text-[12px] font-bold text-emerald-600 dark:text-emerald-400">
                    {row.confidence}
                  </td>
                  <td className="py-4 px-5">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider ${
                        isDark
                          ? 'bg-emerald-500/15 text-emerald-300'
                          : 'bg-[#E8F4EE] text-[#064E3B]'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      {row.status}
                    </span>
                  </td>
                  <td className="py-4 px-5 text-right font-bold text-[12px] text-emerald-600 dark:text-emerald-400 group-hover:underline">
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
