import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

export const NewResearchPage: React.FC = () => {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [searchParams] = useSearchParams();
  const initialQuery =
    searchParams.get('q') ||
    "Does reducing an employee's fixed monthly allowances by 30% without their agreement count as unfair constructive termination under Section 31B of the Industrial Disputes Act, if the employee submitted a written protest?";

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
    <div className="flex flex-col w-full pb-16">
      <div className="px-6 md:px-10 py-8 max-w-5xl mx-auto w-full flex flex-col gap-8">
        
        {/* Header & Stepper */}
        <div
          className={`flex flex-col md:flex-row md:items-center justify-between pb-6 border-b gap-4 ${
            isDark ? 'border-emerald-500/15' : 'border-[rgba(5,150,105,0.12)]'
          }`}
        >
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-mono text-[11px] uppercase tracking-wider font-semibold">
              <span className="material-symbols-outlined text-[16px]">manage_search</span>
              <span>Formulate Judicial Inquiry</span>
            </div>
            <h1
              className={`text-[28px] font-extrabold tracking-tight font-headline ${
                isDark ? 'text-white' : 'text-[#0F172A]'
              }`}
            >
              New Research Question
            </h1>
          </div>

          {/* Stepper indicator */}
          <div className="flex items-center gap-2 font-mono text-[11px]">
            <span
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                step === 'compose'
                  ? isDark
                    ? 'bg-emerald-500 text-[#041F16]'
                    : 'bg-[#059669] text-white shadow-sm'
                  : isDark
                  ? 'bg-[#13251E] text-[#94A79E]'
                  : 'bg-[#E8F4EE] text-[#52796F]'
              }`}
            >
              1. Inquiry
            </span>
            <span className={isDark ? 'text-[#7E9F90]' : 'text-[#52796F]'}>→</span>
            <span
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                step === 'validate'
                  ? isDark
                    ? 'bg-emerald-500 text-[#041F16]'
                    : 'bg-[#059669] text-white shadow-sm'
                  : isDark
                  ? 'bg-[#13251E] text-[#94A79E]'
                  : 'bg-[#E8F4EE] text-[#52796F]'
              }`}
            >
              2. Scope
            </span>
            <span className={isDark ? 'text-[#7E9F90]' : 'text-[#52796F]'}>→</span>
            <span
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                step === 'confirm'
                  ? isDark
                    ? 'bg-emerald-500 text-[#041F16]'
                    : 'bg-[#059669] text-white shadow-sm'
                  : isDark
                  ? 'bg-[#13251E] text-[#94A79E]'
                  : 'bg-[#E8F4EE] text-[#52796F]'
              }`}
            >
              3. Launch
            </span>
          </div>
        </div>

        {/* STEP 1: COMPOSE BRIEF */}
        {step === 'compose' && (
          <div className="flex flex-col gap-6">
            
            {/* Inquiry Textarea */}
            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-bold font-headline flex items-center justify-between">
                <span className={isDark ? 'text-white' : 'text-[#0F172A]'}>
                  Legal Problem or Statutory Question
                </span>
                <span className="font-mono text-[11px] text-emerald-600 dark:text-emerald-400">
                  Simulated Sri Lankan Law Corpus
                </span>
              </label>
              
              <textarea
                rows={5}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className={`w-full p-4 rounded-2xl text-[14px] leading-relaxed transition-all focus:outline-none focus:ring-1 border ${
                  isDark
                    ? 'bg-[#0D1914] border-emerald-500/20 text-white placeholder:text-[#7E9F90] focus:border-emerald-400 focus:ring-emerald-400/30'
                    : 'bg-white border-[rgba(5,150,105,0.15)] text-[#0F172A] placeholder:text-[#52796F] focus:border-[#059669] focus:ring-[#059669]/20 shadow-sm'
                }`}
                placeholder="Describe the factual situation, disputed employment clauses, or specific statutory questions..."
              />
            </div>

            {/* Target Jurisdictions */}
            <div className="flex flex-col gap-2">
              <label className={`text-[12px] font-mono uppercase tracking-wider font-bold ${isDark ? 'text-[#A3C2B6]' : 'text-[#52796F]'}`}>
                Target Judicial Fora
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  "Supreme Court of Sri Lanka (Simulated)",
                  "Court of Appeal (Simulated)",
                  "Labour Tribunals",
                  "Industrial Court"
                ].map((j) => (
                  <button
                    key={j}
                    type="button"
                    onClick={() =>
                      setSelectedJurisdictions((prev) =>
                        prev.includes(j) ? prev.filter((x) => x !== j) : [...prev, j]
                      )
                    }
                    className={`px-4 py-2 rounded-xl text-[12px] font-mono transition-all cursor-pointer border ${
                      selectedJurisdictions.includes(j)
                        ? isDark
                          ? "bg-[#13251E] text-emerald-300 border-emerald-400/50 font-bold shadow-[0_0_12px_rgba(16,185,129,0.2)]"
                          : "bg-[#E8F4EE] text-[#059669] border-[#059669] font-bold shadow-sm"
                        : isDark
                        ? "bg-[#0D1914] border-emerald-500/15 text-[#94A79E] hover:border-emerald-500/30"
                        : "bg-white border-[rgba(5,150,105,0.15)] text-[#475569] hover:bg-[#E8F4EE]"
                    }`}
                  >
                    {j}
                  </button>
                ))}
              </div>
            </div>

            {/* Statutory Scope */}
            <div className="flex flex-col gap-2">
              <label className={`text-[12px] font-mono uppercase tracking-wider font-bold ${isDark ? 'text-[#A3C2B6]' : 'text-[#52796F]'}`}>
                Primary Statutory Enactments
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  "Industrial Disputes Act (No. 43 of 1950)",
                  "Termination of Employment of Workmen Act (TEWA No. 45 of 1971)",
                  "Payment of Gratuity Act No. 12 of 1983",
                  "Shop & Office Employees Act"
                ].map((act) => (
                  <button
                    key={act}
                    type="button"
                    onClick={() =>
                      setSelectedStatutes((prev) =>
                        prev.includes(act) ? prev.filter((x) => x !== act) : [...prev, act]
                      )
                    }
                    className={`px-4 py-2 rounded-xl text-[12px] font-mono transition-all cursor-pointer border ${
                      selectedStatutes.includes(act)
                        ? isDark
                          ? "bg-[#13251E] text-emerald-300 border-emerald-400/50 font-bold shadow-[0_0_12px_rgba(16,185,129,0.2)]"
                          : "bg-[#E8F4EE] text-[#059669] border-[#059669] font-bold shadow-sm"
                        : isDark
                        ? "bg-[#0D1914] border-emerald-500/15 text-[#94A79E] hover:border-emerald-500/30"
                        : "bg-white border-[rgba(5,150,105,0.15)] text-[#475569] hover:bg-[#E8F4EE]"
                    }`}
                  >
                    {act}
                  </button>
                ))}
              </div>
            </div>

            {/* Attached Briefs Shelf */}
            <div
              className={`p-6 rounded-2xl border flex flex-col gap-4 transition-all ${
                isDark
                  ? 'bg-[#0D1914] border-emerald-500/20'
                  : 'bg-white border-[rgba(5,150,105,0.15)] shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-bold font-headline flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-600 dark:text-emerald-400 text-[18px]">
                    attachment
                  </span>
                  <span>Attached Evidence Files ({attachedFiles.length})</span>
                </span>
                <button
                  type="button"
                  onClick={addSimulatedFile}
                  className="text-[12px] font-mono text-emerald-600 dark:text-emerald-400 hover:underline font-bold cursor-pointer"
                >
                  + Add Sample File
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {attachedFiles.map((file, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-[12px] font-mono ${
                      isDark
                        ? 'bg-[#060D0A] border-emerald-500/20 text-[#E0EFE8]'
                        : 'bg-[#F4F8F6] border-[rgba(5,150,105,0.15)] text-[#0F172A]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px] text-emerald-500">
                      description
                    </span>
                    <span>{file}</span>
                    <button
                      type="button"
                      onClick={() => removeFile(idx)}
                      className="ml-1 text-[#52796F] dark:text-[#7E9F90] hover:text-red-500 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[15px]">close</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-end pt-2">
              <button
                type="button"
                onClick={() => setStep('validate')}
                className={`px-6 py-3 rounded-xl font-bold text-[14px] transition-all cursor-pointer flex items-center gap-2 ${
                  isDark
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-[#041F16] shadow-[0_0_20px_rgba(16,185,129,0.35)]'
                    : 'bg-[#059669] hover:bg-[#047857] text-white shadow-[0_4px_16px_rgba(5,150,105,0.25)]'
                }`}
              >
                <span>Check Statutory Scope & Plan</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: SCOPE CHECK */}
        {step === 'validate' && (
          <div className="flex flex-col gap-6">
            <div
              className={`p-6 rounded-2xl border-l-4 border-l-emerald-500 border p-6 flex flex-col gap-2 ${
                isDark
                  ? 'bg-[#0D1914] border-emerald-500/20'
                  : 'bg-white border-[rgba(5,150,105,0.15)] shadow-sm'
              }`}
            >
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-[14px]">
                <span className="material-symbols-outlined text-[20px]">info</span>
                <span>Jurisdictional Analysis: TEWA vs. Labour Tribunal</span>
              </div>
              <p
                className={`text-[14px] leading-relaxed ${
                  isDark ? 'text-[#94A79E]' : 'text-[#475569]'
                }`}
              >
                The inquiry centers upon a salary reduction without formal termination. In Sri Lanka, while collective business retrenchments require Labour Commissioner consent under TEWA Section 2(1), constructive termination claims fall squarely within Labour Tribunal jurisdiction under Section 31B of the Industrial Disputes Act.
              </p>
            </div>

            <div
              className={`p-6 rounded-2xl border flex flex-col gap-4 ${
                isDark
                  ? 'bg-[#0D1914] border-emerald-500/20'
                  : 'bg-white border-[rgba(5,150,105,0.15)] shadow-sm'
              }`}
            >
              <h3 className="text-[17px] font-bold font-headline">
                Planned Multi-Agent Investigation
              </h3>
              
              <div className="divide-y divide-inherit text-[13px] font-mono">
                <div className="py-3 flex items-center justify-between">
                  <span className={isDark ? 'text-[#94A79E]' : 'text-[#52796F]'}>
                    Target Knowledge Base
                  </span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    65 Simulated Sri Lankan Legal Documents
                  </span>
                </div>
                <div className="py-3 flex items-center justify-between">
                  <span className={isDark ? 'text-[#94A79E]' : 'text-[#52796F]'}>
                    Autonomous Pipeline
                  </span>
                  <span className="font-bold">
                    Retriever $\rightarrow$ Citation Verifier $\rightarrow$ Synthesizer
                  </span>
                </div>
                <div className="py-3 flex items-center justify-between">
                  <span className={isDark ? 'text-[#94A79E]' : 'text-[#52796F]'}>
                    Evidence Grounding Mode
                  </span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    Deterministic Pinpoint Passage Matching
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setStep('compose')}
                className={`px-5 py-2.5 rounded-xl text-[13px] font-mono border transition-all cursor-pointer ${
                  isDark
                    ? 'bg-[#0D1914] border-emerald-500/20 text-white hover:bg-[#13251E]'
                    : 'bg-white border-[rgba(5,150,105,0.2)] text-[#0F172A] hover:bg-[#E8F4EE]'
                }`}
              >
                ← Edit Question
              </button>
              
              <button
                type="button"
                onClick={() => setStep('confirm')}
                className={`px-6 py-3 rounded-xl font-bold text-[14px] transition-all cursor-pointer flex items-center gap-2 ${
                  isDark
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-[#041F16] shadow-[0_0_20px_rgba(16,185,129,0.35)]'
                    : 'bg-[#059669] hover:bg-[#047857] text-white shadow-[0_4px_16px_rgba(5,150,105,0.25)]'
                }`}
              >
                <span>Confirm Research Plan</span>
                <span className="material-symbols-outlined text-[18px]">verified</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: CONFIRM BEFORE LAUNCH */}
        {step === 'confirm' && (
          <div className="flex flex-col gap-6">
            <div
              className={`p-8 rounded-2xl border flex flex-col gap-6 transition-all ${
                isDark
                  ? 'bg-[#0D1914] border-emerald-500/20 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
                  : 'bg-white border-[rgba(5,150,105,0.15)] shadow-[0_4px_25px_rgba(15,23,42,0.04)]'
              }`}
            >
              <div className="pb-4 border-b flex flex-col gap-1 border-inherit">
                <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-wider font-bold">
                  Ready for Execution
                </span>
                <h2 className="text-[22px] font-extrabold font-headline">
                  Launch Multi-Agent Research
                </h2>
              </div>

              <div
                className={`p-5 rounded-xl border text-[14px] leading-relaxed font-mono ${
                  isDark
                    ? 'bg-[#060D0A] border-emerald-500/20 text-[#A3C2B6]'
                    : 'bg-[#F4F8F6] border-[rgba(5,150,105,0.15)] text-[#334155]'
                }`}
              >
                <span className="font-bold text-emerald-600 dark:text-emerald-400 block mb-1">
                  Active Inquiry:
                </span>
                "{query}"
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setStep('validate')}
                  className={`px-5 py-2.5 rounded-xl text-[13px] font-mono border transition-all cursor-pointer ${
                    isDark
                      ? 'bg-[#0D1914] border-emerald-500/20 text-white hover:bg-[#13251E]'
                      : 'bg-white border-[rgba(5,150,105,0.2)] text-[#0F172A] hover:bg-[#E8F4EE]'
                  }`}
                >
                  ← Edit Scope
                </button>
                
                <button
                  type="button"
                  onClick={handleLaunch}
                  className={`px-7 py-3.5 rounded-xl font-bold text-[14px] transition-all cursor-pointer flex items-center gap-2 ${
                    isDark
                      ? 'bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-500 text-[#041F16] shadow-[0_0_25px_rgba(16,185,129,0.5)]'
                      : 'bg-[#059669] hover:bg-[#047857] text-white shadow-[0_4px_20px_rgba(5,150,105,0.3)]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[19px]">rocket_launch</span>
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
