import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

export const DocumentViewerPage: React.FC = () => {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [selectedClause, setSelectedClause] = useState<string>("clause-8-2");

  return (
    <div className="flex flex-col w-full pb-16">
      
      {/* Top Document Ribbon */}
      <div
        className={`w-full px-6 md:px-10 py-3.5 border-b flex items-center justify-between transition-colors ${
          isDark
            ? 'bg-[#060D0A] border-emerald-500/15 text-white'
            : 'bg-white border-[rgba(5,150,105,0.12)] text-[#0F172A]'
        }`}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/documents')}
            className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
              isDark
                ? 'bg-[#0D1914] border-emerald-500/20 hover:bg-[#13251E] text-white'
                : 'bg-white border-[rgba(5,150,105,0.15)] hover:bg-[#E8F4EE] text-[#0F172A]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          </button>
          <div className="flex flex-col">
            <span className="font-extrabold text-[15px] font-headline">
              Sample Executive Employment Agreement (Simulated)
            </span>
            <span className="font-mono text-[11px] text-[#52796F] dark:text-[#7E9F90]">
              Ref: RES-2025-001 • 4 Pages • OCR & Semantic Chunking Complete
            </span>
          </div>
        </div>

        <button
          onClick={() => navigate('/research/RES-2025-001')}
          className={`px-4 py-2 rounded-xl font-bold text-[13px] tracking-tight transition-all cursor-pointer flex items-center gap-1.5 ${
            isDark
              ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-[#041F16] shadow-[0_0_15px_rgba(16,185,129,0.3)]'
              : 'bg-[#059669] hover:bg-[#047857] text-white shadow-[0_2px_10px_rgba(5,150,105,0.2)]'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">gavel</span>
          <span>View Synthesis on Clause</span>
        </button>
      </div>

      {/* Split-Pane Document Viewer */}
      <div className="w-full px-6 md:px-10 py-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT CANAL: PAGINATED LEGAL CONTRACT (8 COLS) */}
          <div
            className={`lg:col-span-8 rounded-2xl border p-8 space-y-6 transition-all ${
              isDark
                ? 'bg-[#0D1914] border-emerald-500/20 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
                : 'bg-white border-[rgba(5,150,105,0.15)] shadow-[0_4px_25px_rgba(15,23,42,0.04)]'
            }`}
          >
            <div className="text-center pb-6 border-b border-inherit">
              <span
                className={`px-3 py-1 rounded-full font-mono text-[11px] uppercase tracking-wider font-bold mb-2 inline-block ${
                  isDark
                    ? 'bg-emerald-500/15 text-emerald-300'
                    : 'bg-[#E8F4EE] text-[#064E3B]'
                }`}
              >
                Sample Contract for Clause Extraction
              </span>
              <h2 className="text-[22px] font-extrabold font-headline uppercase tracking-wider">
                Contract of Senior Executive Employment
              </h2>
              <span className="font-mono text-[12px] text-[#52796F] dark:text-[#7E9F90] block mt-1">
                Simulated Execution Date: 1st February 2021 • Colombo, Sri Lanka
              </span>
            </div>

            {/* Clause 4 */}
            <div
              onClick={() => setSelectedClause("clause-4-1")}
              className={`p-4 rounded-xl transition-all cursor-pointer border ${
                selectedClause === "clause-4-1"
                  ? isDark
                    ? "bg-[#13251E] border-emerald-400/50 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
                    : "bg-[#E8F4EE] border-[#059669]"
                  : isDark
                  ? "border-transparent hover:bg-[#13251E]/50"
                  : "border-transparent hover:bg-[#F4F8F6]"
              }`}
            >
              <h4 className="font-bold text-[15px] font-headline mb-1">
                4. Remuneration & Fixed Managerial Allowances
              </h4>
              <p className={`text-[14px] leading-relaxed ${isDark ? 'text-[#E0EFE8]' : 'text-[#334155]'}`}>
                4.1 The Employer covenants to pay the Executive a consolidated basic salary of LKR 650,000 per calendar month, together with guaranteed fixed monthly operational allowances totaling LKR 350,000 comprising vehicle provision and client entertainment, payable on the penultimate bank business day of each month.
              </p>
            </div>

            {/* Clause 8 */}
            <div
              onClick={() => setSelectedClause("clause-8-2")}
              className={`p-4 rounded-xl transition-all cursor-pointer border ${
                selectedClause === "clause-8-2"
                  ? isDark
                    ? "bg-[#13251E] border-amber-500/60 shadow-[0_0_15px_rgba(245,158,11,0.15)]"
                    : "bg-[#FEF3C7] border-amber-500"
                  : isDark
                  ? "border-transparent hover:bg-[#13251E]/50"
                  : "border-transparent hover:bg-[#F4F8F6]"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-[15px] font-headline">
                  8. Reorganization & Operational Variation Clause
                </h4>
                <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-amber-500/20 text-amber-600 dark:text-amber-400 uppercase">
                  Disputed Pay Cut Clause
                </span>
              </div>
              <p
                className={`text-[14px] leading-relaxed p-3 rounded-lg border font-mono ${
                  isDark
                    ? 'bg-[#060D0A] border-emerald-500/20 text-white'
                    : 'bg-white border-[rgba(5,150,105,0.15)] text-[#0F172A]'
                }`}
              >
                8.2 The Company reserves managerial prerogative to review, modify, or retrench discretionary operational facilities upon thirty (30) days written notice where economic exigencies or enterprise reorganization warrant adjustment, subject always to prevailing statutory enactments.
              </p>
            </div>

            {/* Clause 14 */}
            <div className="p-4 rounded-xl">
              <h4 className="font-bold text-[15px] font-headline mb-1">
                14. Governing Law & Dispute Forum
              </h4>
              <p className={`text-[14px] leading-relaxed ${isDark ? 'text-[#A3C2B6]' : 'text-[#475569]'}`}>
                This contract shall be construed in accordance with the substantive laws of Sri Lanka. Any statutory dispute arising herefrom shall be submitted to the competent Labour Tribunal established under the Industrial Disputes Act.
              </p>
            </div>
          </div>

          {/* RIGHT CANAL: STATUTORY COMMENTARY & PRECEDENT MAPPING (4 COLS) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div
              className={`p-6 rounded-2xl border flex flex-col gap-3 sticky top-24 transition-all ${
                isDark
                  ? 'bg-[#0D1914] border-emerald-500/20 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
                  : 'bg-white border-[rgba(5,150,105,0.15)] shadow-[0_4px_25px_rgba(15,23,42,0.04)]'
              }`}
            >
              <span className="font-mono text-[11px] uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-bold">
                Clause Analysis Dock
              </span>

              {selectedClause === "clause-8-2" ? (
                <>
                  <h3 className="text-[17px] font-bold font-headline">
                    Clause 8.2: Unilateral Pay Reduction
                  </h3>
                  
                  <div
                    className={`p-3.5 rounded-xl border text-[13px] leading-relaxed ${
                      isDark
                        ? 'bg-[#060D0A] border-emerald-500/20 text-[#A3C2B6]'
                        : 'bg-[#F4F8F6] border-[rgba(5,150,105,0.15)] text-[#334155]'
                    }`}
                  >
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 block mb-1">
                      Simulated Precedent Ratio:
                    </span>
                    Reorganization clauses cannot circumvent Section 31B if an allowance was regularly paid as integral remuneration.
                  </div>

                  <div className="text-[12px] font-mono text-[#52796F] dark:text-[#7E9F90] pt-1">
                    <strong className="block text-emerald-600 dark:text-emerald-400">
                      Key Procedural Finding:
                    </strong>
                    Submitting a prompt written protest prevents implied waiver of rights under Sri Lankan case law.
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-[17px] font-bold font-headline">
                    Clause 4.1: Regular Monthly Allowances
                  </h3>
                  <p className={`text-[13px] leading-relaxed ${isDark ? 'text-[#94A79E]' : 'text-[#475569]'}`}>
                    Fixed vehicle and operational allowances paid systematically on a monthly basis are judicially construed as part of total basic remuneration under Ceylon Tobacco Co. v. Ilangaratne.
                  </p>
                </>
              )}

              <button
                onClick={() => navigate('/research/RES-2025-001')}
                className={`mt-3 w-full py-2.5 rounded-xl font-bold text-[13px] transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  isDark
                    ? 'bg-emerald-500 hover:bg-emerald-400 text-[#041F16]'
                    : 'bg-[#059669] hover:bg-[#047857] text-white shadow-sm'
                }`}
              >
                <span>Cross-Examine in Workspace</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
