import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const CompareCasesPage: React.FC = () => {
  const navigate = useNavigate();
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
    <div className="flex flex-col w-full">
      {/* Synthetic Notice */}
      <div className="w-full bg-secondary-fixed/50 border-b border-secondary/20 px-gutter py-2 text-center text-label-sm text-on-secondary-fixed">
        <strong>Notice:</strong> Case comparisons shown below are simulated examples for evaluating platform comparison tools.
      </div>

      <div className="px-margin py-space-xl max-w-7xl mx-auto w-full flex flex-col gap-space-xl">
        {/* Header Breadcrumb */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-space-md border-b border-outline-variant/30 gap-space-md">
          <div className="flex flex-col gap-space-xs">
            <div className="flex items-center gap-space-xs text-primary font-label-sm uppercase tracking-wider font-semibold">
              <span className="material-symbols-outlined text-[16px]">compare</span>
              <span>Case Comparison Agent • Structured Investigation</span>
            </div>
            <h1 className="font-serif text-headline-lg text-on-surface font-semibold">
              Precedent Comparison Matrix
            </h1>
            <p className="font-sans text-body-md text-on-surface-variant">
              Side-by-side comparison of facts, legal questions, judicial reasoning, and remedies across relevant decisions.
            </p>
          </div>

          <button
            onClick={() => navigate('/research/RES-2025-001')}
            className="px-space-md py-space-xs rounded bg-surface-container text-primary font-title-sm hover:bg-surface-container-high transition-colors cursor-pointer flex items-center gap-space-xs"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>Back to Research Results</span>
          </button>
        </div>

        {/* Selected Cases Header Chips */}
        <div className="flex flex-wrap gap-space-sm items-center">
          <span className="font-label-sm uppercase tracking-wider text-outline font-semibold">Compared Cases:</span>
          {selectedCases.map((c, i) => (
            <span
              key={i}
              className="px-space-sm py-1 rounded bg-surface-container-lowest border border-outline-variant/40 font-serif font-medium text-body-sm text-secondary shadow-sm"
            >
              {c}
            </span>
          ))}
        </div>

        {/* Comparison Matrix Table */}
        <div className="bg-surface-container-lowest rounded-md border border-outline-variant/30 shadow-[0_1px_3px_rgba(30,58,95,0.04)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-outline-variant/20 bg-surface-container-low/50 font-serif text-title-sm text-on-surface">
                  <th className="py-space-md px-space-md w-1/4">Comparison Dimension</th>
                  <th className="py-space-md px-space-md w-1/4 border-l border-outline-variant/20 text-primary">
                    CTC v. Ilangaratne (Simulated)
                  </th>
                  <th className="py-space-md px-space-md w-1/4 border-l border-outline-variant/20 text-secondary">
                    Brown & Co. v. Fernando (Simulated)
                  </th>
                  <th className="py-space-md px-space-md w-1/4 border-l border-outline-variant/20 text-on-surface">
                    Hayleys Ltd. v. De Silva (Simulated)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20 font-sans text-body-sm">
                {comparisonData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-surface-container-low/40 transition-colors">
                    <td className="py-space-md px-space-md font-semibold text-on-surface bg-surface-container-low/20">
                      {row.criterion}
                    </td>
                    <td className="py-space-md px-space-md text-on-surface-variant border-l border-outline-variant/20 leading-relaxed">
                      {row.case1}
                    </td>
                    <td className="py-space-md px-space-md text-on-surface-variant border-l border-outline-variant/20 leading-relaxed">
                      {row.case2}
                    </td>
                    <td className="py-space-md px-space-md text-on-surface-variant border-l border-outline-variant/20 leading-relaxed">
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
