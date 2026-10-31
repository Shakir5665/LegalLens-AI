import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

export const EvidenceExplorerPreview: React.FC = () => {
  const { isDark } = useTheme();
  const [selectedSource, setSelectedSource] = useState(0);

  const sources = [
    {
      id: 'src-1',
      title: 'Ceylon Tobacco Co. v. Ilangaratne',
      citation: '[1989] 1 Sri L.R. 34',
      category: 'Supreme Court Judgment',
      court: 'Supreme Court of Sri Lanka',
      page: 'Page 34, Paras 4-6',
      status: 'VERIFIED',
      excerpt:
        'An employer cannot unilaterally vary terms of remuneration to the detriment of a workman under the guise of an administrative restructuring. Where allowances have attained certainty and regular receipt, they merge into the contract of employment.',
      keyRatio: 'Unilateral allowance reduction constitutes repudiation of core salary obligations.',
    },
    {
      id: 'src-2',
      title: 'Brown & Co. v. Fernando',
      citation: '[2004] 2 Sri L.R. 122',
      category: 'Appellate Precedent',
      court: 'Court of Appeal of Sri Lanka',
      page: 'Page 122, Para 12',
      status: 'VERIFIED',
      excerpt:
        'Silence may imply consent, but a prompt letter of reservation of rights preserves the cause of action in its entirety. A worker does not need to quit immediately before claiming constructive dismissal.',
      keyRatio: 'Working under written protest negates waiver or implied consent.',
    },
    {
      id: 'src-3',
      title: 'Industrial Disputes Act No. 43 of 1950',
      citation: 'Legislative Enactment § 31B(1)',
      category: 'Statutory Code',
      court: 'Parliament of Sri Lanka',
      page: 'Part IVA, Section 31B',
      status: 'STATUTORY BINDING',
      excerpt:
        'A workman or a trade union on behalf of a workman may make an application in writing to a Labour Tribunal for relief or redress in respect of the termination of services by his employer.',
      keyRatio: 'Statutory basis for constructive dismissal applications and relief.',
    },
  ];

  return (
    <div
      className={`rounded-2xl border p-5 md:p-6 transition-all duration-300 ${
        isDark
          ? 'bg-[#0A1410] border-emerald-500/20 text-[#F3FBF7]'
          : 'bg-white border-[rgba(5,150,105,0.18)] text-[#0F172A]'
      }`}
    >
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-5 border-b border-emerald-500/15 gap-2">
        <div className="flex items-center gap-2.5">
          <span className="material-symbols-outlined text-[18px] text-emerald-500">search_check</span>
          <span className="font-mono text-xs font-bold text-emerald-500 uppercase tracking-wider">
            Evidence Explorer & Citation Inspector
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-emerald-400 font-semibold">3 Sources Corroborated</span>
          <span className="opacity-40">•</span>
          <span className="opacity-70">100% Citation Grounding</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Source List (Left Rail) */}
        <div className="md:col-span-5 space-y-2.5">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block mb-1">
            Retrieved Primary Sources
          </span>

          {sources.map((src, index) => (
            <div
              key={src.id}
              onClick={() => setSelectedSource(index)}
              className={`p-3 rounded-xl border cursor-pointer transition-all ${
                selectedSource === index
                  ? isDark
                    ? 'bg-[#13251E] border-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.25)]'
                    : 'bg-[#E8F4EE] border-[#059669] shadow-[0_2px_8px_rgba(5,150,105,0.15)]'
                  : isDark
                    ? 'bg-[#0D1914] border-emerald-500/15 hover:border-emerald-500/30'
                    : 'bg-[#F4F8F6] border-[rgba(5,150,105,0.12)] hover:border-[#059669]/40'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 font-bold">
                  {src.category}
                </span>
                <span className="text-[10px] font-mono opacity-60">{src.page}</span>
              </div>
              <p className="font-bold text-xs line-clamp-1">{src.title}</p>
              <p className={`text-[11px] font-mono ${isDark ? 'text-[#7E9F90]' : 'text-[#52796F]'}`}>
                {src.citation}
              </p>
            </div>
          ))}
        </div>

        {/* Evidence Inspection Interface (Right Pane) */}
        <div
          className={`md:col-span-7 rounded-xl border p-4 flex flex-col justify-between ${
            isDark ? 'bg-[#0D1914] border-emerald-500/20' : 'bg-[#F4F8F6] border-[rgba(5,150,105,0.15)]'
          }`}
        >
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-emerald-500/15">
              <div>
                <span className="text-[10px] font-mono uppercase text-emerald-500 font-bold block">
                  {sources[selectedSource].court}
                </span>
                <h4 className="font-bold text-sm">{sources[selectedSource].title}</h4>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                {sources[selectedSource].status}
              </span>
            </div>

            <div className="mb-4">
              <span className="text-[11px] font-mono font-semibold uppercase tracking-wider block mb-1 text-emerald-600 dark:text-emerald-400">
                Relevant Source Passage (Exact Verbatim Excerpt)
              </span>
              <div
                className={`p-3.5 rounded-lg border italic font-citation text-xs leading-relaxed ${
                  isDark
                    ? 'bg-[#13251E]/90 border-emerald-500/20 text-[#E8F4EE]'
                    : 'bg-white border-[rgba(5,150,105,0.15)] text-[#0F172A]'
                }`}
              >
                &ldquo;{sources[selectedSource].excerpt}&rdquo;
              </div>
            </div>

            <div>
              <span className="text-[11px] font-mono font-semibold uppercase tracking-wider block mb-1 opacity-80">
                Corroborated Legal Ratio
              </span>
              <p className={`text-xs ${isDark ? 'text-[#A3C2B6]' : 'text-[#475569]'}`}>
                {sources[selectedSource].keyRatio}
              </p>
            </div>
          </div>

          <div className="pt-3 mt-4 border-t border-emerald-500/15 flex items-center justify-between text-[11px] font-mono">
            <span className="text-emerald-500 font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px]">verified</span>
              Citation Hash: #LK-1989-SLLR-034
            </span>
            <span className="opacity-60">{sources[selectedSource].page}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
