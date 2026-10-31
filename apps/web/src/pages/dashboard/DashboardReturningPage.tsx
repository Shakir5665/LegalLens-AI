import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { mockUser, mockRecentDockets } from '../../services/mockData';
import { useTheme } from '../../context/ThemeContext';

export const DashboardReturningPage: React.FC = () => {
  const navigate = useNavigate();
  const { isDark } = useTheme();

  return (
    <div className="flex flex-col w-full pb-16">
      {/* Synthetic Dataset Evaluation Banner */}
      <div
        className={`w-full py-2 px-6 text-center text-[12px] font-mono border-b flex items-center justify-center gap-2 ${
          isDark
            ? 'bg-[#0D1914] border-emerald-500/15 text-[#A3C2B6]'
            : 'bg-[#E8F4EE] border-[rgba(5,150,105,0.12)] text-[#52796F]'
        }`}
      >
        <span
          className={`material-symbols-outlined text-[16px] ${
            isDark ? 'text-emerald-400' : 'text-[#059669]'
          }`}
        >
          verified
        </span>
        <span>
          <strong>Simulated Sri Lankan Labour Law Active:</strong> Automated citation verification against Section 13 benchmark dataset.
        </span>
      </div>

      <div className="px-6 md:px-10 py-8 max-w-7xl mx-auto w-full flex flex-col gap-8">
        
        {/* Header */}
        <div
          className={`flex flex-col lg:flex-row lg:items-end justify-between pb-6 border-b gap-4 ${
            isDark ? 'border-emerald-500/15' : 'border-[rgba(5,150,105,0.12)]'
          }`}
        >
          <div className="flex flex-col gap-1 max-w-2xl">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-mono text-[11px] uppercase tracking-wider font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>{mockUser.organization} • Active Chambers</span>
            </div>
            <h1
              className={`text-[32px] font-extrabold tracking-tight font-headline ${
                isDark ? 'text-white' : 'text-[#0F172A]'
              }`}
            >
              Research Workspace
            </h1>
            <p className={`text-[14px] ${isDark ? 'text-[#94A79E]' : 'text-[#475569]'}`}>
              Manage active legal inquiries, cross-examine judicial ratio decidendi, and export verified reports.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/compare')}
              className={`px-4 py-2.5 rounded-xl text-[13px] font-medium border transition-all flex items-center gap-1.5 cursor-pointer ${
                isDark
                  ? 'bg-[#0D1914] border-emerald-500/20 text-white hover:bg-[#13251E]'
                  : 'bg-white border-[rgba(5,150,105,0.2)] text-[#0F172A] hover:bg-[#E8F4EE]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">compare_arrows</span>
              <span>Compare Precedents</span>
            </button>

            <button
              onClick={() => navigate('/research/new')}
              className={`px-5 py-2.5 rounded-xl font-bold text-[13px] tracking-tight transition-all cursor-pointer flex items-center gap-2 ${
                isDark
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-[#041F16] shadow-[0_0_18px_rgba(16,185,129,0.35)] hover:shadow-[0_0_24px_rgba(16,185,129,0.5)]'
                  : 'bg-[#059669] hover:bg-[#047857] text-white shadow-[0_2px_12px_rgba(5,150,105,0.25)]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">add_circle</span>
              <span>New Research Question</span>
            </button>
          </div>
        </div>

        {/* High-Level Metric Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div
            className={`p-5 rounded-2xl border transition-all ${
              isDark
                ? 'bg-[#0D1914] border-emerald-500/20 shadow-[0_10px_25px_rgba(0,0,0,0.4)]'
                : 'bg-white border-[rgba(5,150,105,0.15)] shadow-[0_4px_20px_rgba(15,23,42,0.04)]'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#52796F] dark:text-[#7E9F90] font-semibold">
                Active Projects
              </span>
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  isDark ? 'bg-emerald-500/10 text-emerald-400' : 'bg-[#E8F4EE] text-[#059669]'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">folder</span>
              </div>
            </div>
            <div
              className={`text-[32px] font-extrabold font-headline tracking-tight ${
                isDark ? 'text-white' : 'text-[#0F172A]'
              }`}
            >
              3
            </div>
            <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
              <span className="material-symbols-outlined text-[14px]">check_circle</span>
              <span>All citations corroborated</span>
            </div>
          </div>

          <div
            className={`p-5 rounded-2xl border transition-all ${
              isDark
                ? 'bg-[#0D1914] border-emerald-500/20 shadow-[0_10px_25px_rgba(0,0,0,0.4)]'
                : 'bg-white border-[rgba(5,150,105,0.15)] shadow-[0_4px_20px_rgba(15,23,42,0.04)]'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#52796F] dark:text-[#7E9F90] font-semibold">
                Simulated Corpus
              </span>
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  isDark ? 'bg-emerald-500/10 text-emerald-400' : 'bg-[#E8F4EE] text-[#059669]'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">library_books</span>
              </div>
            </div>
            <div
              className={`text-[32px] font-extrabold font-headline tracking-tight ${
                isDark ? 'text-white' : 'text-[#0F172A]'
              }`}
            >
              65
            </div>
            <div className="text-[11px] text-[#52796F] dark:text-[#7E9F90] mt-1 font-mono">
              Acts, Decrees & Judgments
            </div>
          </div>

          <div
            className={`p-5 rounded-2xl border transition-all ${
              isDark
                ? 'bg-[#0D1914] border-emerald-500/20 shadow-[0_10px_25px_rgba(0,0,0,0.4)]'
                : 'bg-white border-[rgba(5,150,105,0.15)] shadow-[0_4px_20px_rgba(15,23,42,0.04)]'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#52796F] dark:text-[#7E9F90] font-semibold">
                Passages Grounded
              </span>
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  isDark ? 'bg-emerald-500/10 text-emerald-400' : 'bg-[#E8F4EE] text-[#059669]'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">fact_check</span>
              </div>
            </div>
            <div className="text-[32px] font-extrabold font-headline tracking-tight text-emerald-600 dark:text-emerald-400">
              9
            </div>
            <div className="text-[11px] text-[#52796F] dark:text-[#7E9F90] mt-1 font-mono">
              Deterministic line-by-line matches
            </div>
          </div>

          <div
            className={`p-5 rounded-2xl border transition-all ${
              isDark
                ? 'bg-[#0D1914] border-emerald-500/20 shadow-[0_10px_25px_rgba(0,0,0,0.4)]'
                : 'bg-white border-[rgba(5,150,105,0.15)] shadow-[0_4px_20px_rgba(15,23,42,0.04)]'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#52796F] dark:text-[#7E9F90] font-semibold">
                Jurisdiction
              </span>
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  isDark ? 'bg-emerald-500/10 text-emerald-400' : 'bg-[#E8F4EE] text-[#059669]'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">gavel</span>
              </div>
            </div>
            <div
              className={`text-[24px] font-extrabold font-headline tracking-tight mt-1 ${
                isDark ? 'text-white' : 'text-[#0F172A]'
              }`}
            >
              Labour Law
            </div>
            <div className="text-[11px] text-[#52796F] dark:text-[#7E9F90] mt-1 font-mono">
              Sri Lanka Tribunal System
            </div>
          </div>

        </div>

        {/* Recent Research Projects Table */}
        <div
          className={`rounded-2xl border overflow-hidden transition-all ${
            isDark
              ? 'bg-[#0D1914] border-emerald-500/20 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
              : 'bg-white border-[rgba(5,150,105,0.15)] shadow-[0_4px_25px_rgba(15,23,42,0.04)]'
          }`}
        >
          <div
            className={`p-5 border-b flex items-center justify-between ${
              isDark ? 'border-emerald-500/15' : 'border-[rgba(5,150,105,0.12)]'
            }`}
          >
            <div className="flex items-center gap-3">
              <h2
                className={`text-[17px] font-extrabold font-headline ${
                  isDark ? 'text-white' : 'text-[#0F172A]'
                }`}
              >
                Recent Research Inquiries
              </h2>
              <span
                className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold uppercase tracking-wider ${
                  isDark
                    ? 'bg-emerald-500/15 text-emerald-300'
                    : 'bg-[#E8F4EE] text-[#064E3B]'
                }`}
              >
                Grounding Active
              </span>
            </div>
            <Link
              to="/research/history"
              className="text-[12px] font-mono text-emerald-600 dark:text-emerald-400 hover:underline font-bold"
            >
              View all inquiries →
            </Link>
          </div>

          <div className="overflow-x-auto">
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
                  <th className="py-3 px-5">Research Subject</th>
                  <th className="py-3 px-5">Legal Domain</th>
                  <th className="py-3 px-5">Sources Found</th>
                  <th className="py-3 px-5">Grounding</th>
                  <th className="py-3 px-5">Status</th>
                  <th className="py-3 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody
                className={`divide-y text-[13px] ${
                  isDark ? 'divide-emerald-500/10' : 'divide-[rgba(5,150,105,0.08)]'
                }`}
              >
                {mockRecentDockets.map((row) => (
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
                    <td className="py-4 px-5 font-mono text-[12px] text-emerald-600 dark:text-emerald-300 font-medium">
                      {row.sllrPrecedents} cases
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
