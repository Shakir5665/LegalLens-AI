import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { ResearchWorkspacePreview } from './ResearchWorkspacePreview';
import { EvidenceExplorerPreview } from './EvidenceExplorerPreview';
import { ResearchReportPreview } from './ResearchReportPreview';

export const ProductShowcase: React.FC = () => {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState<'workspace' | 'evidence' | 'report'>('workspace');

  const tabs = [
    {
      id: 'workspace' as const,
      num: '01',
      title: 'Research Workspace',
      subtitle: 'Structured investigation workspace',
      description:
        'Transform natural-language queries into structured legal issues with automated statutory and case discovery.',
      icon: 'dashboard',
      features: ['Legal issue extraction', 'Statutory code discovery', 'Appellate precedent matrix'],
    },
    {
      id: 'evidence' as const,
      num: '02',
      title: 'Evidence Explorer',
      subtitle: 'Pinpoint citation grounding',
      description:
        'Inspect every source authority, relevant judgment passage, and statutory section with page-level confidence.',
      icon: 'search_check',
      features: ['Retrieved primary source list', 'Verbatim excerpt inspection', 'Zero-hallucination validation'],
    },
    {
      id: 'report' as const,
      num: '03',
      title: 'Research Report',
      subtitle: 'Comprehensive chamber dossier',
      description:
        'Generate structured, defensible research dossiers equipped with executive ratios, legal frameworks, and caveats.',
      icon: 'description',
      features: ['Executive legal summary', 'Statutory provisions & analysis', 'Limitations & chamber review flags'],
    },
  ];

  return (
    <section id="platform" className="py-20 md:py-28 relative">
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
            <span>INTERACTIVE PRODUCT SHOWCASE</span>
          </div>
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-headline mb-5 ${
              isDark ? 'text-white' : 'text-[#0F172A]'
            }`}
          >
            Engineered for legal precision at every step.
          </h2>
          <p
            className={`text-base sm:text-lg leading-relaxed ${
              isDark ? 'text-[#9BB8AC]' : 'text-[#475569]'
            }`}
          >
            Explore the three primary interfaces powering verified legal intelligence in LegalLens AI.
          </p>
        </div>

        {/* Two-Column Interactive Layout: Left Tabs, Right Dynamic Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Selector Rail */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <div
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`p-6 rounded-2xl border cursor-pointer transition-all duration-200 text-left relative overflow-hidden ${
                    isActive
                      ? isDark
                        ? 'bg-[#0D1914] border-emerald-400 shadow-[0_0_24px_rgba(16,185,129,0.2)]'
                        : 'bg-[#E8F4EE]/90 border-[#059669] shadow-[0_4px_20px_rgba(5,150,105,0.12)]'
                      : isDark
                        ? 'bg-[#08120D] border-emerald-500/15 hover:border-emerald-500/30 hover:bg-[#0D1914]/70'
                        : 'bg-white border-[rgba(5,150,105,0.12)] hover:border-[rgba(5,150,105,0.3)] hover:bg-[#F4F8F6]'
                  }`}
                >
                  {/* Active Indicator Bar */}
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#10B981] to-[#059669]" />
                  )}

                  <div className="flex items-center justify-between mb-2.5">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          isActive
                            ? 'bg-emerald-500 text-white'
                            : isDark
                              ? 'bg-[#13251E] text-emerald-400'
                              : 'bg-[#F4F8F6] text-[#059669]'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
                      </div>
                      <span
                        className={`font-mono text-[11px] font-bold uppercase tracking-wider ${
                          isActive
                            ? 'text-emerald-500'
                            : isDark
                              ? 'text-[#7E9F90]'
                              : 'text-[#52796F]'
                        }`}
                      >
                        {tab.subtitle}
                      </span>
                    </div>
                    <span className="font-mono text-xs font-bold opacity-50">{tab.num}</span>
                  </div>

                  <h3
                    className={`text-lg font-bold font-headline mb-2 ${
                      isActive
                        ? isDark
                          ? 'text-white'
                          : 'text-[#0F172A]'
                        : isDark
                          ? 'text-[#A3C2B6]'
                          : 'text-[#334155]'
                    }`}
                  >
                    {tab.title}
                  </h3>

                  <p
                    className={`text-xs sm:text-[13px] leading-relaxed mb-4 ${
                      isDark ? 'text-[#9BB8AC]' : 'text-[#475569]'
                    }`}
                  >
                    {tab.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {tab.features.map((feat, fIdx) => (
                      <span
                        key={fIdx}
                        className={`inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded ${
                          isActive
                            ? isDark
                              ? 'bg-emerald-500/20 text-emerald-300'
                              : 'bg-white text-[#064E3B] border border-[rgba(5,150,105,0.2)]'
                            : isDark
                              ? 'bg-[#13251E]/60 text-[#7E9F90]'
                              : 'bg-[#E8F4EE] text-[#52796F]'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[13px] text-emerald-500">check</span>
                        <span>{feat}</span>
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Product Preview Area */}
          <div className="lg:col-span-7">
            <div className="transition-all duration-300">
              {activeTab === 'workspace' && <ResearchWorkspacePreview />}
              {activeTab === 'evidence' && <EvidenceExplorerPreview />}
              {activeTab === 'report' && <ResearchReportPreview />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
