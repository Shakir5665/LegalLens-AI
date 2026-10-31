import React from 'react';
import { useTheme } from '../../context/ThemeContext';

export const TrustStrip: React.FC = () => {
  const { isDark } = useTheme();

  const trustItems = [
    {
      title: 'Multi-Agent AI',
      subtitle: 'Specialized LangGraph nodes',
      icon: 'hub',
    },
    {
      title: 'Hybrid RAG',
      subtitle: 'Dense semantic + BM25 keyword',
      icon: 'sync_alt',
    },
    {
      title: 'Knowledge Graph',
      subtitle: 'Entity & authority topology',
      icon: 'account_tree',
    },
    {
      title: 'Citation Verification',
      subtitle: 'Pinpoint page & statute grounding',
      icon: 'verified',
    },
  ];

  return (
    <section
      className={`py-8 border-y transition-colors duration-200 ${
        isDark
          ? 'bg-[#08120D]/60 border-emerald-500/15'
          : 'bg-[#E8F4EE]/50 border-[rgba(5,150,105,0.12)]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {trustItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3.5 group"
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-200 group-hover:scale-105 shrink-0 ${
                  isDark
                    ? 'bg-[#0D1914] border-emerald-500/25 text-emerald-400 group-hover:border-emerald-400/50'
                    : 'bg-white border-[rgba(5,150,105,0.2)] text-[#059669] shadow-[0_1px_4px_rgba(5,150,105,0.08)]'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
              </div>
              <div className="flex flex-col">
                <span
                  className={`text-[14px] font-bold tracking-tight font-headline transition-colors ${
                    isDark ? 'text-white' : 'text-[#0F172A]'
                  }`}
                >
                  {item.title}
                </span>
                <span
                  className={`text-[12px] font-normal transition-colors ${
                    isDark ? 'text-[#7E9F90]' : 'text-[#52796F]'
                  }`}
                >
                  {item.subtitle}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
