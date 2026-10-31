import React from 'react';
import { useTheme } from '../../context/ThemeContext';

export const WorkflowSection: React.FC = () => {
  const { isDark } = useTheme();

  const steps = [
    {
      step: '01',
      name: 'ASK',
      title: 'Inquiry & Ingestion',
      description: 'The user describes a legal question or uploads legal briefs and contracts.',
      icon: 'chat_paste_go',
      tag: 'Natural Language / Docs',
    },
    {
      step: '02',
      name: 'PLAN',
      title: 'Issue Extraction',
      description: 'The system identifies core legal issues, determines jurisdiction, and maps a research plan.',
      icon: 'schema',
      tag: 'LangGraph Planner',
    },
    {
      step: '03',
      name: 'INVESTIGATE',
      title: 'Hybrid Retrieval',
      description: 'The system discovers relevant statutes, regulations, and appellate judgments via Hybrid RAG.',
      icon: 'manage_search',
      tag: 'Dense + BM25 + MCP',
    },
    {
      step: '04',
      name: 'VERIFY',
      title: 'Citation Grounding',
      description: 'Sources, citations, supporting passages, and conflicting authorities are rigorously verified.',
      icon: 'verified_user',
      tag: 'Zero-Hallucination Gate',
    },
    {
      step: '05',
      name: 'GENERATE',
      title: 'Structured Output',
      description: 'The system produces a comprehensive, defensible research dossier ready for courtroom application.',
      icon: 'assignment_turned_in',
      tag: 'Chambers Dossier',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono font-semibold uppercase tracking-widest border mb-4 ${
              isDark
                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'
                : 'bg-[#E8F4EE] border-[rgba(5,150,105,0.2)] text-[#064E3B]'
            }`}
          >
            <span>RESEARCH METHODOLOGY</span>
          </div>
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-headline mb-5 ${
              isDark ? 'text-white' : 'text-[#0F172A]'
            }`}
          >
            Five steps. One clearer path.
          </h2>
          <p
            className={`text-base sm:text-lg leading-relaxed ${
              isDark ? 'text-[#9BB8AC]' : 'text-[#475569]'
            }`}
          >
            Transforming ambiguous legal dilemmas into structured, evidence-grounded research in five coordinated phases.
          </p>
        </div>

        {/* Workflow Diagram: Horizontal on Desktop, Vertical on Mobile */}
        <div className="relative">
          {/* Desktop Connecting Line behind nodes */}
          <div
            className={`hidden lg:block absolute top-[68px] left-[10%] right-[10%] h-[2px] z-0 ${
              isDark ? 'bg-gradient-to-r from-emerald-500/10 via-emerald-500/40 to-emerald-500/10' : 'bg-gradient-to-r from-[rgba(5,150,105,0.1)] via-[#059669]/30 to-[rgba(5,150,105,0.1)]'
            }`}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-4 relative z-10">
            {steps.map((item, idx) => (
              <div
                key={item.step}
                className={`rounded-2xl p-6 sm:p-5 border transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 ${
                  isDark
                    ? 'bg-[#0D1914] border-emerald-500/20 hover:border-emerald-400/50 hover:bg-[#13251E] shadow-[0_4px_20px_rgba(0,0,0,0.4)]'
                    : 'bg-white border-[rgba(5,150,105,0.16)] hover:border-[#059669] hover:bg-[#F4F8F6]/80 shadow-[0_4px_16px_rgba(5,150,105,0.06)]'
                }`}
              >
                <div>
                  {/* Step Node Circle & Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center border font-mono font-bold text-sm transition-all duration-300 group-hover:scale-105 ${
                        isDark
                          ? 'bg-[#08120D] border-emerald-500/30 text-emerald-400 group-hover:border-emerald-400 group-hover:shadow-[0_0_16px_rgba(16,185,129,0.3)]'
                          : 'bg-[#E8F4EE] border-[rgba(5,150,105,0.25)] text-[#059669] shadow-[0_2px_8px_rgba(5,150,105,0.15)]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
                    </div>

                    <div className="flex flex-col items-end">
                      <span className="text-[10px] font-mono uppercase text-emerald-500 font-bold">
                        STEP {item.step}
                      </span>
                      <span
                        className={`text-xs font-mono font-black tracking-wider ${
                          isDark ? 'text-white' : 'text-[#0F172A]'
                        }`}
                      >
                        {item.name}
                      </span>
                    </div>
                  </div>

                  {/* Step Title */}
                  <h3
                    className={`text-base font-bold font-headline mb-2 transition-colors ${
                      isDark ? 'text-[#F3FBF7] group-hover:text-emerald-300' : 'text-[#0F172A] group-hover:text-[#059669]'
                    }`}
                  >
                    {item.title}
                  </h3>

                  {/* Step Description */}
                  <p
                    className={`text-xs leading-relaxed mb-4 ${
                      isDark ? 'text-[#9BB8AC]' : 'text-[#475569]'
                    }`}
                  >
                    {item.description}
                  </p>
                </div>

                {/* Bottom Tag */}
                <div
                  className={`pt-3 border-t text-[10px] font-mono flex items-center justify-between ${
                    isDark ? 'border-emerald-500/10 text-[#7E9F90]' : 'border-[rgba(5,150,105,0.12)] text-[#52796F]'
                  }`}
                >
                  <span className="truncate">{item.tag}</span>
                  <span className="material-symbols-outlined text-[13px] text-emerald-500">
                    {idx === steps.length - 1 ? 'task_alt' : 'arrow_forward'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
