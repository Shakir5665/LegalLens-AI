import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const DocumentViewerPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedClause, setSelectedClause] = useState<string>("clause-8-2");

  return (
    <div className="flex flex-col w-full">
      {/* Top Document Ribbon */}
      <div className="w-full bg-surface-container-lowest px-gutter py-space-sm border-b border-outline-variant/30 flex items-center justify-between shadow-[0_1px_3px_rgba(30,58,95,0.03)]">
        <div className="flex items-center gap-space-md">
          <button
            onClick={() => navigate('/documents')}
            className="p-1 rounded hover:bg-surface-container text-on-surface-variant cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          </button>
          <div className="flex flex-col">
            <span className="font-serif text-title-sm text-on-surface font-semibold">
              Sample Executive Employment Agreement (Simulated)
            </span>
            <span className="font-label-sm text-label-sm text-outline">
              File Reference: RES-2025-001 • 4 Pages • OCR & Parsing Complete
            </span>
          </div>
        </div>

        <div className="flex items-center gap-space-sm">
          <button
            onClick={() => navigate('/research/RES-2025-001')}
            className="px-space-md py-1.5 rounded bg-primary-container text-on-primary font-title-sm text-title-sm font-semibold hover:bg-primary transition-colors cursor-pointer flex items-center gap-space-xs"
          >
            <span className="material-symbols-outlined text-[16px]">gavel</span>
            <span>View Synthesis on Selected Clause</span>
          </button>
        </div>
      </div>

      {/* Split-Pane Document Viewer */}
      <div className="w-full px-gutter py-space-lg">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
          {/* LEFT CANAL: PAGINATED LEGAL CONTRACT (8 COLS) */}
          <div className="lg:col-span-8 bg-surface-container-lowest rounded-md border border-outline-variant/30 p-space-xl shadow-[0_1px_8px_rgba(30,58,95,0.04)] font-serif space-y-space-lg">
            <div className="text-center pb-space-md border-b border-outline-variant/20">
              <span className="px-space-xs py-0.5 rounded bg-surface-container text-secondary text-label-sm font-sans font-semibold mb-2 inline-block">
                Sample Document for Clause Extraction
              </span>
              <h2 className="text-title-lg font-bold uppercase tracking-wider text-on-surface">
                Contract of Senior Executive Employment
              </h2>
              <span className="text-body-sm text-on-surface-variant italic">
                Simulated Date: 1st February 2021 • Colombo, Sri Lanka
              </span>
            </div>

            {/* Clause 4 */}
            <div
              onClick={() => setSelectedClause("clause-4-1")}
              className={`p-space-md rounded transition-colors cursor-pointer border ${
                selectedClause === "clause-4-1"
                  ? "bg-surface-container-low border-primary/40"
                  : "border-transparent hover:bg-surface-container-low/40"
              }`}
            >
              <h4 className="font-bold text-title-sm text-on-surface mb-1">
                4. Remuneration & Fixed Managerial Allowances
              </h4>
              <p className="font-sans text-body-md text-on-surface leading-relaxed">
                4.1 The Employer covenants to pay the Executive a consolidated basic salary of LKR 650,000 per calendar month, together with guaranteed fixed monthly operational allowances totaling LKR 350,000 comprising vehicle provision and client entertainment, payable on the penultimate bank business day of each month.
              </p>
            </div>

            {/* Clause 8 */}
            <div
              onClick={() => setSelectedClause("clause-8-2")}
              className={`p-space-md rounded transition-colors cursor-pointer border ${
                selectedClause === "clause-8-2"
                  ? "bg-surface-container-low border-error/50"
                  : "border-transparent hover:bg-surface-container-low/40"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-bold text-title-sm text-on-surface">
                  8. Reorganization & Operational Variation Clause
                </h4>
                <span className="px-space-xs py-0.5 rounded bg-error/10 text-error font-sans text-label-sm font-semibold">
                  Disputed Pay Cut Clause
                </span>
              </div>
              <p className="font-sans text-body-md text-on-surface leading-relaxed bg-surface-container-high/40 p-space-sm rounded border border-outline-variant/30">
                8.2 The Company reserves managerial prerogative to review, modify, or retrench discretionary operational facilities upon thirty (30) days written notice where economic exigencies or enterprise reorganization warrant adjustment, subject always to prevailing statutory enactments.
              </p>
            </div>

            {/* Clause 14 */}
            <div className="p-space-md">
              <h4 className="font-bold text-title-sm text-on-surface mb-1">
                14. Governing Law & Dispute Forum
              </h4>
              <p className="font-sans text-body-md text-on-surface leading-relaxed">
                This contract shall be construed in accordance with the substantive laws of Sri Lanka. Any statutory dispute arising herefrom shall be submitted to the competent Labour Tribunal established under the Industrial Disputes Act.
              </p>
            </div>
          </div>

          {/* RIGHT CANAL: STATUTORY COMMENTARY & PRECEDENT MAPPING (4 COLS) */}
          <div className="lg:col-span-4 flex flex-col space-y-space-md">
            <div className="p-space-lg bg-surface-container-lowest rounded-md border border-outline-variant/30 shadow-[0_1px_3px_rgba(30,58,95,0.04)] flex flex-col gap-space-sm sticky top-20">
              <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider font-semibold">
                Clause Analysis Dock
              </span>

              {selectedClause === "clause-8-2" ? (
                <>
                  <h3 className="font-serif text-title-md text-on-surface font-semibold">
                    Clause 8.2: Unilateral Pay Reduction
                  </h3>
                  <div className="p-space-sm rounded bg-surface-container font-sans text-body-sm text-on-surface leading-relaxed">
                    <span className="font-semibold text-primary block mb-1">Simulated Case Finding:</span>
                    Reorganization clauses cannot override fair statutory protection under Section 31B if an allowance was regularly paid as part of normal monthly salary.
                  </div>
                  <div className="pt-space-xs font-label-sm text-label-sm text-secondary">
                    <span className="font-semibold block">Key Procedural Point:</span>
                    Continuing to work while immediately submitting a written objection protects the worker's rights, showing they did not accept the pay cut.
                  </div>
                </>
              ) : (
                <>
                  <h3 className="font-serif text-title-md text-on-surface font-semibold">
                    Clause 4.1: Regular Monthly Allowances
                  </h3>
                  <p className="font-sans text-body-sm text-on-surface-variant leading-relaxed">
                    Fixed vehicle allowances paid regularly in cash every month are generally treated as part of total wages rather than optional benefits that can be canceled at will.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
