import React from 'react';
import { useTheme } from '../../context/ThemeContext';

export const TrustOversightSection: React.FC = () => {
  const { isDark } = useTheme();

  const trustPrinciples = [
    {
      num: '01',
      title: 'Source-grounded research',
      description:
        'Every proposition is extracted directly from verified legislative enactments and appellate law reports. Speculative generation is constrained by strict semantic retrieval boundaries.',
      icon: 'menu_book',
    },
    {
      num: '02',
      title: 'Inspectable citations',
      description:
        'Citations are not decorative text strings. LegalLens AI surfaces the exact volume, report series, page number, and paragraph excerpt for immediate manual verification.',
      icon: 'find_in_page',
    },
    {
      num: '03',
      title: 'Transparent research trace',
      description:
        'Review the complete agent execution trajectory. Inspect which statutes were queried, which cases were compared, and which retrieval gates evaluated sufficiency before synthesis.',
      icon: 'history_edu',
    },
    {
      num: '04',
      title: 'Human oversight',
      description:
        'AI serves as an accelerated research assistant, never a substitute for legal judgment. The platform explicitly highlights ambiguities, dissenting opinions, and boundaries requiring practitioner review.',
      icon: 'supervisor_account',
    },
  ];

  return (
    <section id="trust" className="py-20 md:py-28 relative">
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
            <span>INTEGRITY & GOVERNANCE</span>
          </div>
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-headline mb-5 ${
              isDark ? 'text-white' : 'text-[#0F172A]'
            }`}
          >
            AI can assist. Evidence must lead.
          </h2>
          <p
            className={`text-base sm:text-lg leading-relaxed ${
              isDark ? 'text-[#9BB8AC]' : 'text-[#475569]'
            }`}
          >
            Built upon the firm stance that legal research requires unyielding source fidelity, inspectability, and human-in-the-loop validation.
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {trustPrinciples.map((item) => (
            <div
              key={item.num}
              className={`rounded-2xl p-6 sm:p-8 border transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 ${
                isDark
                  ? 'bg-[#0D1914] border-emerald-500/20 hover:border-emerald-400/50 hover:bg-[#13251E] shadow-[0_4px_20px_rgba(0,0,0,0.4)]'
                  : 'bg-white border-[rgba(5,150,105,0.16)] hover:border-[#059669] hover:bg-[#F4F8F6]/80 shadow-[0_4px_16px_rgba(5,150,105,0.06)]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-300 group-hover:scale-105 ${
                      isDark
                        ? 'bg-[#060D0A] border-emerald-500/25 text-emerald-400'
                        : 'bg-[#E8F4EE] border-[rgba(5,150,105,0.2)] text-[#059669]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[24px]">{item.icon}</span>
                  </div>
                  <span className="font-mono text-xs font-bold text-emerald-500/70">
                    PRINCIPLE {item.num}
                  </span>
                </div>

                <h3
                  className={`text-xl font-bold font-headline mb-3 transition-colors ${
                    isDark ? 'text-white group-hover:text-emerald-300' : 'text-[#0F172A] group-hover:text-[#059669]'
                  }`}
                >
                  {item.title}
                </h3>

                <p
                  className={`text-sm leading-relaxed ${
                    isDark ? 'text-[#9BB8AC]' : 'text-[#475569]'
                  }`}
                >
                  {item.description}
                </p>
              </div>

              <div
                className={`pt-4 mt-6 border-t text-[11px] font-mono flex items-center gap-2 ${
                  isDark ? 'border-emerald-500/10 text-[#7E9F90]' : 'border-[rgba(5,150,105,0.12)] text-[#52796F]'
                }`}
              >
                <span className="material-symbols-outlined text-[15px] text-emerald-500">verified</span>
                <span>Human-In-The-Loop Oversight Protocol</span>
              </div>
            </div>
          ))}
        </div>

        {/* Ethical / Legal Clarification Card */}
        <div
          className={`mt-10 p-5 rounded-2xl border text-center max-w-3xl mx-auto text-xs ${
            isDark
              ? 'bg-[#08120D] border-emerald-500/15 text-[#9BB8AC]'
              : 'bg-[#E8F4EE]/60 border-[rgba(5,150,105,0.15)] text-[#52796F]'
          }`}
        >
          <div className="flex items-center justify-center gap-2 font-bold font-mono text-[11px] uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">
            <span className="material-symbols-outlined text-[16px]">info</span>
            <span>Professional Responsibility Notice</span>
          </div>
          <p className="leading-relaxed">
            LegalLens AI is designed to augment and accelerate legal analysis by qualified practitioners, researchers,
            and scholars. It does not provide automated legal advice or replace the independent professional judgment of
            an enrolled attorney-at-law.
          </p>
        </div>
      </div>
    </section>
  );
};
