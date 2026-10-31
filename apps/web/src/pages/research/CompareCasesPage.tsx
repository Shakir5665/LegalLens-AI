import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

export const CompareCasesPage: React.FC = () => {
  const navigate = useNavigate();
  const { isDark } = useTheme();

  const [selectedCases] = useState<string[]>([
    "CTC v. Ilangaratne (Simulated Example)",
    "Brown & Co. v. Fernando (Simulated Example)",
    "Hayleys Ltd. v. De Silva (Simulated Example)"
  ]);

  const comparisonData = [
    {
      criterion: "Court & Bench",
      case1: "Supreme Court (Simulated Example: Fernando, J.)",
      case2: "Court of Appeal (Simulated Example: Sripavan, J.)",
      case3: "Supreme Court (Simulated Example: Kulatunga, J.)"
    },
    {
      criterion: "Key Dispute Facts",
      case1: "Employer unilaterally cut regular car and entertainment allowances by about 30%.",
      case2: "Employee moved to a subordinate role with a direct cut in fixed allowances.",
      case3: "Withdrawal of official transport benefits making up over 25% of total pay."
    },
    {
      criterion: "Core Legal Finding",
      case1: "Regular allowances form part of basic contractual pay and cannot be cut without agreement.",
      case2: "Working while submitting a written protest prevents the employer from claiming the employee agreed to the cut.",
      case3: "Removing essential tools and major benefits is equivalent to terminating employment."
    },
    {
      criterion: "Statutory Forum & Remedy",
      case1: "Industrial Disputes Act § 31B: Substantial compensation awarded.",
      case2: "Industrial Disputes Act § 31B: Back-pay and compensation upheld.",
      case3: "Industrial Disputes Act § 31B: Compensation in place of reinstatement."
    },
    {
      criterion: "Impact of Continuing to Work",
      case1: "Did not cancel employee's rights because a prompt objection letter was delivered.",
      case2: "Employee does not need to quit immediately before filing for relief.",
      case3: "Employee resigned under protest within 14 days."
    }
  ];

  return (
    <div className="flex flex-col w-full pb-16">
      
      {/* Synthetic Notice */}
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
          compare
        </span>
        <span>
          <strong>Comparative Jurisprudence:</strong> Side-by-side precedent matrix evaluating ratio decidendi across Section 13 simulated decisions.
        </span>
      </div>

      <div className="px-6 md:px-10 py-8 max-w-7xl mx-auto w-full flex flex-col gap-6">
        
        {/* Header Breadcrumb */}
        <div
          className={`flex flex-col md:flex-row md:items-end justify-between pb-6 border-b gap-4 ${
            isDark ? 'border-emerald-500/15' : 'border-[rgba(5,150,105,0.12)]'
          }`}
        >
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-mono text-[11px] uppercase tracking-wider font-semibold">
              <span className="material-symbols-outlined text-[16px]">compare_arrows</span>
              <span>Case Comparison Agent • Structured Investigation</span>
            </div>
            <h1
              className={`text-[28px] font-extrabold tracking-tight font-headline ${
                isDark ? 'text-white' : 'text-[#0F172A]'
              }`}
            >
              Precedent Comparison Matrix
            </h1>
            <p className={`text-[14px] ${isDark ? 'text-[#94A79E]' : 'text-[#475569]'}`}>
              Side-by-side analysis of material facts, legal questions, and remedies across Sri Lankan labour authorities.
            </p>
          </div>

          <button
            onClick={() => navigate('/research/RES-2025-001')}
            className={`px-4 py-2.5 rounded-xl font-bold text-[13px] border transition-all flex items-center gap-2 cursor-pointer ${
              isDark
                ? 'bg-[#0D1914] border-emerald-500/20 text-white hover:bg-[#13251E]'
                : 'bg-white border-[rgba(5,150,105,0.2)] text-[#0F172A] hover:bg-[#E8F4EE]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>Back to Research Synthesis</span>
          </button>
        </div>

        {/* Selected Cases Header Chips */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="font-mono text-[11px] uppercase tracking-wider text-[#52796F] dark:text-[#7E9F90] font-bold">
            Compared Decisions:
          </span>
          {selectedCases.map((c, i) => (
            <span
              key={i}
              className={`px-3 py-1 rounded-lg border font-mono text-[11px] font-semibold flex items-center gap-1.5 ${
                isDark
                  ? 'bg-[#0D1914] border-emerald-500/20 text-emerald-300'
                  : 'bg-white border-[rgba(5,150,105,0.18)] text-[#064E3B] shadow-sm'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              {c}
            </span>
          ))}
        </div>

        {/* Comparison Matrix Table */}
        <div
          className={`rounded-2xl border overflow-hidden transition-all ${
            isDark
              ? 'bg-[#0D1914] border-emerald-500/20 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
              : 'bg-white border-[rgba(5,150,105,0.15)] shadow-[0_4px_25px_rgba(15,23,42,0.04)]'
          }`}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr
                  className={`border-b font-mono text-[12px] uppercase tracking-wider ${
                    isDark
                      ? 'border-emerald-500/15 bg-[#060D0A]'
                      : 'border-[rgba(5,150,105,0.12)] bg-[#F4F8F6]'
                  }`}
                >
                  <th className="py-4 px-6 w-1/4">Comparison Metric</th>
                  <th className="py-4 px-6 w-1/4 border-l border-inherit text-emerald-600 dark:text-emerald-400 font-bold">
                    CTC v. Ilangaratne
                  </th>
                  <th className="py-4 px-6 w-1/4 border-l border-inherit text-emerald-600 dark:text-emerald-300 font-bold">
                    Brown & Co. v. Fernando
                  </th>
                  <th className="py-4 px-6 w-1/4 border-l border-inherit font-bold">
                    Hayleys v. De Silva
                  </th>
                </tr>
              </thead>
              <tbody
                className={`divide-y text-[13px] ${
                  isDark ? 'divide-emerald-500/10' : 'divide-[rgba(5,150,105,0.08)]'
                }`}
              >
                {comparisonData.map((row, idx) => (
                  <tr
                    key={idx}
                    className={`transition-colors ${
                      isDark ? 'hover:bg-[#13251E]' : 'hover:bg-[#E8F4EE]/50'
                    }`}
                  >
                    <td
                      className={`py-4 px-6 font-bold font-headline ${
                        isDark ? 'bg-[#0A1410] text-white' : 'bg-[#F8FAF9] text-[#0F172A]'
                      }`}
                    >
                      {row.criterion}
                    </td>
                    <td className={`py-4 px-6 border-l border-inherit leading-relaxed ${isDark ? 'text-[#A3C2B6]' : 'text-[#475569]'}`}>
                      {row.case1}
                    </td>
                    <td className={`py-4 px-6 border-l border-inherit leading-relaxed ${isDark ? 'text-[#A3C2B6]' : 'text-[#475569]'}`}>
                      {row.case2}
                    </td>
                    <td className={`py-4 px-6 border-l border-inherit leading-relaxed ${isDark ? 'text-[#A3C2B6]' : 'text-[#475569]'}`}>
                      {row.case3}
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
