import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const NewResearchPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || "Does reducing an employee's fixed monthly allowances by 30% without their agreement count as unfair constructive termination under Section 31B of the Industrial Disputes Act, if the employee submitted a written protest?";

  const [query, setQuery] = useState(initialQuery);
  const [selectedJurisdictions, setSelectedJurisdictions] = useState<string[]>([
    "Supreme Court of Sri Lanka (Simulated)",
    "Labour Tribunals"
  ]);
  const [selectedStatutes, setSelectedStatutes] = useState<string[]>([
    "Industrial Disputes Act (No. 43 of 1950)",
    "Termination of Employment of Workmen Act (TEWA No. 45 of 1971)"
  ]);
  const [attachedFiles, setAttachedFiles] = useState<string[]>([
    "Sample_Employment_Agreement.pdf (1.4 MB)",
    "Sample_Employee_Protest_Letter.pdf (480 KB)"
  ]);
  const [step, setStep] = useState<'compose' | 'validate' | 'confirm'>('compose');

  const removeFile = (idx: number) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== idx));
  };

  const addSimulatedFile = () => {
    setAttachedFiles(prev => [...prev, "Sample_Additional_Document.pdf (620 KB)"]);
  };

  const handleLaunch = () => {
    navigate('/research/run/RES-2025-001');
  };

  return (
    <div className="flex flex-col w-full">
      <div className="px-margin py-space-xl max-w-5xl mx-auto w-full flex flex-col gap-space-xl">
        {/* Header Breadcrumb */}
        <div className="flex items-center justify-between pb-space-md border-b border-outline-variant/30">
          <div className="flex flex-col gap-space-xs">
            <div className="flex items-center gap-space-xs text-primary font-label-sm uppercase tracking-wider font-semibold">
              <span className="material-symbols-outlined text-[16px]">manage_search</span>
              <span>Question Analysis & Investigation Plan</span>
            </div>
            <h1 className="font-serif text-headline-lg text-on-surface font-semibold">
              New Legal Research Question
            </h1>
          </div>

          {/* Stepper indicator */}
          <div className="flex items-center gap-space-sm font-label-sm text-label-sm">
            <span className={`px-2 py-0.5 rounded font-semibold ${step === 'compose' ? 'bg-primary-container text-on-primary' : 'bg-surface-container text-on-surface-variant'}`}>
              1. Research Question
            </span>
            <span className="text-outline">→</span>
            <span className={`px-2 py-0.5 rounded font-semibold ${step === 'validate' ? 'bg-primary-container text-on-primary' : 'bg-surface-container text-on-surface-variant'}`}>
              2. Scope Check
            </span>
            <span className="text-outline">→</span>
            <span className={`px-2 py-0.5 rounded font-semibold ${step === 'confirm' ? 'bg-primary-container text-on-primary' : 'bg-surface-container text-on-surface-variant'}`}>
              3. Run Research
            </span>
          </div>
        </div>

        {/* STEP 1: COMPOSE BRIEF */}
        {step === 'compose' && (
          <div className="flex flex-col gap-space-lg">
            {/* Inquiry Textarea */}
            <div className="flex flex-col gap-space-xs">
              <label className="font-title-sm text-title-sm text-on-surface flex items-center justify-between">
                <span>Enter Your Legal Research Question or Problem</span>
                <span className="font-label-sm text-label-sm text-outline">Simulated Sri Lankan Law Dataset</span>
              </label>
              <textarea
                rows={5}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full p-space-md rounded bg-surface-container-lowest border border-outline-variant/40 font-body-md text-body-md text-on-surface leading-relaxed focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-[0_1px_3px_rgba(30,58,95,0.03)]"
                placeholder="Describe the situation, parties involved, disputed clauses, or legal question..."
              />
            </div>

            {/* Target Jurisdictions */}
            <div className="flex flex-col gap-space-xs">
              <label className="font-title-sm text-title-sm text-on-surface">Target Courts / Tribunals</label>
              <div className="flex flex-wrap gap-space-xs">
                {["Supreme Court of Sri Lanka (Simulated)", "Court of Appeal (Simulated)", "Labour Tribunals", "Industrial Court"].map(j => (
                  <button
                    key={j}
                    type="button"
                    onClick={() => setSelectedJurisdictions(prev => prev.includes(j) ? prev.filter(x => x !== j) : [...prev, j])}
                    className={`px-space-md py-1.5 rounded text-body-sm transition-colors cursor-pointer border ${
                      selectedJurisdictions.includes(j)
                        ? "bg-surface-container text-primary border-primary font-semibold"
                        : "bg-surface-container-lowest border-outline-variant/40 text-on-surface-variant"
                    }`}
                  >
                    {j}
                  </button>
                ))}
              </div>
            </div>

            {/* Statutory Scope */}
            <div className="flex flex-col gap-space-xs">
              <label className="font-title-sm text-title-sm text-on-surface">Target Legislation (Extracts)</label>
              <div className="flex flex-wrap gap-space-xs">
                {[
                  "Industrial Disputes Act (No. 43 of 1950)",
                  "Termination of Employment of Workmen Act (TEWA No. 45 of 1971)",
                  "Payment of Gratuity Act No. 12 of 1983",
                  "Shop & Office Employees Act"
                ].map(act => (
                  <button
                    key={act}
                    type="button"
                    onClick={() => setSelectedStatutes(prev => prev.includes(act) ? prev.filter(x => x !== act) : [...prev, act])}
                    className={`px-space-md py-1.5 rounded text-body-sm transition-colors cursor-pointer border ${
                      selectedStatutes.includes(act)
                        ? "bg-surface-container text-primary border-primary font-semibold"
                        : "bg-surface-container-lowest border-outline-variant/40 text-on-surface-variant"
                    }`}
                  >
                    {act}
                  </button>
                ))}
              </div>
            </div>

            {/* Attached Briefs Shelf */}
            <div className="p-space-lg bg-surface-container-lowest rounded-md border border-outline-variant/30 flex flex-col gap-space-md">
              <div className="flex items-center justify-between">
                <span className="font-title-sm text-title-sm text-on-surface font-semibold flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-primary text-[18px]">attachment</span>
                  <span>Attached Documents for Analysis ({attachedFiles.length})</span>
                </span>
                <button
                  type="button"
                  onClick={addSimulatedFile}
                  className="font-label-sm text-label-sm text-primary hover:underline font-semibold cursor-pointer"
                >
                  + Add Sample File
                </button>
              </div>

              <div className="flex flex-wrap gap-space-sm">
                {attachedFiles.map((file, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-space-xs px-space-md py-1.5 rounded bg-surface-container-low border border-outline-variant/30 text-body-sm text-on-surface"
                  >
                    <span className="material-symbols-outlined text-[16px] text-secondary">description</span>
                    <span>{file}</span>
                    <button
                      type="button"
                      onClick={() => removeFile(idx)}
                      className="ml-1 text-outline hover:text-error cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">close</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-end gap-space-md pt-space-md">
              <button
                type="button"
                onClick={() => setStep('validate')}
                className="px-space-xl py-space-sm rounded bg-primary-container text-on-primary font-title-sm text-title-sm font-semibold shadow-[0_1px_3px_rgba(30,58,95,0.12)] hover:bg-primary transition-colors cursor-pointer flex items-center gap-space-xs"
              >
                <span>Check Scope and Relevant Statutes</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: SCOPE CHECK */}
        {step === 'validate' && (
          <div className="flex flex-col gap-space-lg">
            <div className="p-space-lg bg-surface-container-lowest rounded-md border-l-4 border-primary border border-outline-variant/30 flex flex-col gap-space-sm">
              <div className="flex items-center gap-space-xs text-primary font-semibold font-title-sm">
                <span className="material-symbols-outlined text-[20px]">info</span>
                <span>Legal Scope Note: TEWA vs. Labour Tribunal</span>
              </div>
              <p className="font-sans text-body-md text-on-surface-variant leading-relaxed">
                Your question describes a salary reduction without formal termination. In Sri Lanka, while general business closures or retrenchments require Labour Commissioner consent under TEWA Section 2(1), claims for constructive termination are usually heard directly by the Labour Tribunal under the Industrial Disputes Act Section 31B.
              </p>
            </div>

            <div className="p-space-lg bg-surface-container-lowest rounded-md border border-outline-variant/30 flex flex-col gap-space-md">
              <h3 className="font-serif text-title-md text-on-surface font-semibold">Planned Investigation Steps</h3>
              <div className="divide-y divide-outline-variant/20 font-body-sm">
                <div className="py-2 flex items-center justify-between">
                  <span className="text-on-surface-variant">Target Simulated Knowledge Base</span>
                  <span className="font-semibold text-primary">65 Simulated Legal Documents</span>
                </div>
                <div className="py-2 flex items-center justify-between">
                  <span className="text-on-surface-variant">Specialist Agents Assigned</span>
                  <span className="font-semibold text-on-surface">Legislation, Case Discovery, Citation Verification</span>
                </div>
                <div className="py-2 flex items-center justify-between">
                  <span className="text-on-surface-variant">Evidence Verification</span>
                  <span className="font-semibold text-on-surface">Extract exact passages and check citations</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-space-md">
              <button
                type="button"
                onClick={() => setStep('compose')}
                className="px-space-lg py-space-sm rounded bg-surface border border-outline-variant/40 text-on-surface font-title-sm hover:bg-surface-container cursor-pointer"
              >
                ← Back to Question
              </button>
              <button
                type="button"
                onClick={() => setStep('confirm')}
                className="px-space-xl py-space-sm rounded bg-primary-container text-on-primary font-title-sm text-title-sm font-semibold shadow-[0_1px_3px_rgba(30,58,95,0.12)] hover:bg-primary transition-colors cursor-pointer flex items-center gap-space-xs"
              >
                <span>Confirm Research Plan</span>
                <span className="material-symbols-outlined text-[18px]">verified</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: CONFIRM BEFORE LAUNCH */}
        {step === 'confirm' && (
          <div className="flex flex-col gap-space-lg">
            <div className="p-space-xl bg-surface-container-lowest rounded-md border border-outline-variant/30 shadow-[0_1px_8px_rgba(30,58,95,0.05)] flex flex-col gap-space-lg">
              <div className="pb-space-md border-b border-outline-variant/20">
                <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider font-semibold">
                  Ready to Start
                </span>
                <h2 className="font-serif text-headline-sm text-on-surface font-semibold mt-1">
                  Launch Evidence-Grounded Research
                </h2>
              </div>

              <div className="p-space-md bg-surface-container-low rounded font-body-sm text-on-surface-variant leading-relaxed">
                <span className="font-semibold text-on-surface block mb-1">Research Question:</span>
                "{query}"
              </div>

              <div className="flex items-center justify-between pt-space-md">
                <button
                  type="button"
                  onClick={() => setStep('validate')}
                  className="px-space-lg py-space-sm rounded bg-surface border border-outline-variant/40 text-on-surface font-title-sm hover:bg-surface-container cursor-pointer"
                >
                  ← Edit Plan
                </button>
                <button
                  type="button"
                  onClick={handleLaunch}
                  className="px-space-xl py-space-sm rounded bg-primary-container text-on-primary font-title-sm text-title-sm font-semibold shadow-[0_4px_12px_rgba(30,58,95,0.15)] hover:bg-primary transition-colors cursor-pointer flex items-center gap-space-xs"
                >
                  <span className="material-symbols-outlined text-[20px]">manage_search</span>
                  <span>Start Multi-Agent Research</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
