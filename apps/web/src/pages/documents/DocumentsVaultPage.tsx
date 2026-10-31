import React from 'react';
import { useNavigate } from 'react-router-dom';
import { mockDocuments } from '../../services/mockData';
import { useTheme } from '../../context/ThemeContext';

export const DocumentsVaultPage: React.FC = () => {
  const navigate = useNavigate();
  const { isDark } = useTheme();

  return (
    <div className="flex flex-col w-full pb-16">
      
      {/* Synthetic Dataset Banner */}
      <div
        className={`w-full py-2 px-6 text-center text-[12px] font-mono border-b flex items-center justify-center gap-2 ${
          isDark
            ? 'bg-[#0D1914] border-emerald-500/15 text-[#A3C2B6]'
            : 'bg-[#E8F4EE] border-[rgba(5,150,105,0.12)] text-[#52796F]'
        }`}
      >
        <span
          className={`material-symbols-outlined text-[16px] ${
            isDark ? 'text-emerald-400' : 'text-[#059669]'
          }`}
        >
          folder_open
        </span>
        <span>
          <strong>Documents Vault:</strong> Sample contracts, statutory enactments, and procedural transcripts for OCR & text grounding.
        </span>
      </div>

      <div className="px-6 md:px-10 py-8 max-w-7xl mx-auto w-full flex flex-col gap-6">
        
        {/* Header Breadcrumb */}
        <div
          className={`flex flex-col md:flex-row md:items-end justify-between pb-6 border-b gap-4 ${
            isDark ? 'border-emerald-500/15' : 'border-[rgba(5,150,105,0.12)]'
          }`}
        >
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-mono text-[11px] uppercase tracking-wider font-semibold">
              <span className="material-symbols-outlined text-[16px]">folder_open</span>
              <span>Document Repository & Text Extraction</span>
            </div>
            <h1
              className={`text-[28px] font-extrabold tracking-tight font-headline ${
                isDark ? 'text-white' : 'text-[#0F172A]'
              }`}
            >
              Legal Documents Library
            </h1>
            <p className={`text-[14px] ${isDark ? 'text-[#94A79E]' : 'text-[#475569]'}`}>
              Store contracts, pleadings, and reference legislation for text extraction and clause cross-referencing.
            </p>
          </div>

          <button
            onClick={() => navigate('/documents/doc-1')}
            className={`px-5 py-2.5 rounded-xl font-bold text-[13px] tracking-tight transition-all cursor-pointer flex items-center gap-2 ${
              isDark
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-[#041F16] shadow-[0_0_18px_rgba(16,185,129,0.35)]'
                : 'bg-[#059669] hover:bg-[#047857] text-white shadow-[0_2px_12px_rgba(5,150,105,0.25)]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">upload_file</span>
            <span>Upload Document</span>
          </button>
        </div>

        {/* Document Asset Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {mockDocuments.map((doc) => (
            <div
              key={doc.id}
              onClick={() => navigate(`/documents/${doc.id}`)}
              className={`p-6 rounded-2xl border flex flex-col justify-between gap-5 transition-all cursor-pointer group ${
                isDark
                  ? 'bg-[#0D1914] border-emerald-500/20 hover:border-emerald-500/50 hover:bg-[#13251E] shadow-[0_10px_25px_rgba(0,0,0,0.4)]'
                  : 'bg-white border-[rgba(5,150,105,0.15)] hover:border-[#059669]/40 hover:bg-[#E8F4EE]/40 shadow-[0_4px_20px_rgba(15,23,42,0.04)]'
              }`}
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span
                    className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold uppercase tracking-wider ${
                      isDark
                        ? 'bg-emerald-500/15 text-emerald-300'
                        : 'bg-[#E8F4EE] text-[#064E3B]'
                    }`}
                  >
                    {doc.category}
                  </span>
                  {doc.isSynthetic && (
                    <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                      Sample
                    </span>
                  )}
                </div>

                <h3
                  className={`text-[15px] font-bold font-headline mt-1 transition-colors group-hover:text-emerald-600 dark:group-hover:text-emerald-400 ${
                    isDark ? 'text-white' : 'text-[#0F172A]'
                  }`}
                >
                  {doc.title}
                </h3>
              </div>

              <div
                className={`pt-3 border-t flex items-center justify-between font-mono text-[11px] ${
                  isDark
                    ? 'border-emerald-500/15 text-[#7E9F90]'
                    : 'border-[rgba(5,150,105,0.12)] text-[#52796F]'
                }`}
              >
                <span>{doc.fileSize}</span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  OCR Parsed
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
