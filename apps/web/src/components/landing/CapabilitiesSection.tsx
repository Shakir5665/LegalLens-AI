import React from 'react';
import { useTheme } from '../../context/ThemeContext';

export const CapabilitiesSection: React.FC = () => {
  const { isDark } = useTheme();

  const capabilities = [
    {
      num: '01',
      title: 'Intelligent Research',
      description:
        'Translate natural-language legal questions into structured legal issues, jurisdictions, and execution plans.',
      icon: 'psychology',
      badge: 'QUESTION ANALYSIS',
      highlight: 'Extracts domain, issues, parties, and missing factual context.',
    },
    {
      num: '02',
      title: 'Legislation Discovery',
      description:
        'Find relevant Acts, regulations, and legal provisions with dense semantic understanding and statutory indexing.',
      icon: 'menu_book',
      badge: 'STATUTORY RETRIEVAL',
      highlight: 'Cross-references statutory provisions against current amendments.',
    },
    {
      num: '03',
      title: 'Case Law Intelligence',
      description:
        'Discover judgments, extract core ratio decidendi, and compare judicial reasoning across appellate jurisdictions.',
      icon: 'balance',
      badge: 'PRECEDENT MATRIX',
      highlight: 'Identifies binding authorities, obiter dicta, and judicial divergence.',
    },
    {
      num: '04',
      title: 'Citation Verification',
      description:
        'Connect research claims to supporting passages and legal sources with page-level verbatim proof.',
      icon: 'verified',
      badge: 'EVIDENCE GROUNDING',
      highlight: 'Flagged ambiguities and missing citations prevented before export.',
    },
    {
      num: '05',
      title: 'Document Intelligence',
      description:
        'Upload and analyse pleadings, employment contracts, and petitions to support deeper factual investigation.',
      icon: 'description',
      badge: 'DOCUMENT VAULT',
      highlight: 'Parses complex contracts and maps clauses to statutory frameworks.',
    },
    {
      num: '06',
      title: 'Structured Reports',
      description:
        'Generate organised research reports with findings, citations, and verifiable evidence trails ready for chamber use.',
      icon: 'assignment_turned_in',
      badge: 'EXECUTIVE DOSSIERS',
      highlight: 'Includes executive summary, ratio decidendi, and limitation points.',
    },
  ];

  return (
    <section id="capabilities" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono font-semibold uppercase tracking-widest border mb-4 ${
              isDark
                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'
                : 'bg-[#E8F4EE] border-[rgba(5,150,105,0.2)] text-[#064E3B]'
            }`}
          >
            <span>CORE PLATFORM CAPABILITIES</span>
          </div>
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-headline mb-5 ${
              isDark ? 'text-white' : 'text-[#0F172A]'
            }`}
          >
            From legal question to defensible insight.
          </h2>
          <p
            className={`text-base sm:text-lg leading-relaxed ${
              isDark ? 'text-[#9BB8AC]' : 'text-[#475569]'
            }`}
          >
            A cohesive suite of intelligence tools designed specifically for the rigor and precision of legal inquiry.
          </p>
        </div>

        {/* 6 Capabilities Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {capabilities.map((item) => (
            <div
              key={item.num}
              className={`rounded-2xl p-6 sm:p-7 border transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 ${
                isDark
                  ? 'bg-[#0D1914] border-emerald-500/20 hover:border-emerald-400/50 hover:bg-[#13251E] shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_8px_30px_rgba(16,185,129,0.15)]'
                  : 'bg-white border-[rgba(5,150,105,0.16)] hover:border-[#059669] hover:bg-[#F4F8F6]/60 shadow-[0_4px_16px_rgba(5,150,105,0.06)] hover:shadow-[0_8px_24px_rgba(5,150,105,0.12)]'
              }`}
            >
              <div>
                {/* Card Top: Number & Icon Container */}
                <div className="flex items-center justify-between mb-5">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-300 group-hover:scale-105 ${
                      isDark
                        ? 'bg-[#060D0A] border-emerald-500/25 text-emerald-400 group-hover:border-emerald-400 group-hover:shadow-[0_0_16px_rgba(16,185,129,0.3)]'
                        : 'bg-[#E8F4EE] border-[rgba(5,150,105,0.2)] text-[#059669] shadow-[0_2px_6px_rgba(5,150,105,0.1)]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[24px]">{item.icon}</span>
                  </div>
                  <span
                    className={`font-mono text-sm font-bold tracking-wider ${
                      isDark ? 'text-emerald-500/70' : 'text-[#059669]/70'
                    }`}
                  >
                    {item.num}
                  </span>
                </div>

                {/* Badge */}
                <div className="mb-2.5">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider uppercase border ${
                      isDark
                        ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'
                        : 'bg-[#E8F4EE] border-[rgba(5,150,105,0.18)] text-[#064E3B]'
                    }`}
                  >
                    {item.badge}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className={`text-xl font-bold font-headline mb-3 transition-colors ${
                    isDark ? 'text-white group-hover:text-emerald-300' : 'text-[#0F172A] group-hover:text-[#059669]'
                  }`}
                >
                  {item.title}
                </h3>

                {/* Description */}
                <p
                  className={`text-[14px] leading-relaxed mb-5 ${
                    isDark ? 'text-[#9BB8AC]' : 'text-[#475569]'
                  }`}
                >
                  {item.description}
                </p>
              </div>

              {/* Bottom Highlight */}
              <div
                className={`pt-3.5 border-t text-[12px] flex items-center gap-2 ${
                  isDark
                    ? 'border-emerald-500/10 text-[#7E9F90]'
                    : 'border-[rgba(5,150,105,0.12)] text-[#52796F]'
                }`}
              >
                <span className="material-symbols-outlined text-[15px] text-emerald-500 shrink-0">check_circle</span>
                <span className="line-clamp-1">{item.highlight}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
