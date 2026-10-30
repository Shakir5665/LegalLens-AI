import React from 'react';
import { useNavigate } from 'react-router-dom';
import { mockDocuments } from '../../services/mockData';

export const DocumentsVaultPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full">
      {/* Synthetic Dataset Banner */}
      <div className="w-full bg-secondary-fixed/50 border-b border-secondary/20 px-gutter py-2 text-center text-label-sm text-on-secondary-fixed">
        <strong>Notice:</strong> Document library contains sample employment contracts, statutory extracts, and procedural briefs for testing parsing and analysis.
      </div>

      <div className="px-margin py-space-xl max-w-7xl mx-auto w-full flex flex-col gap-space-xl">
        {/* Header Breadcrumb */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-space-md border-b border-outline-variant/30 gap-space-md">
          <div className="flex flex-col gap-space-xs">
            <div className="flex items-center gap-space-xs text-primary font-label-sm uppercase tracking-wider font-semibold">
              <span className="material-symbols-outlined text-[16px]">folder_open</span>
              <span>Document Repository & Parsing</span>
            </div>
            <h1 className="font-serif text-headline-lg text-on-surface font-semibold">
              Legal Documents Library
            </h1>
            <p className="font-sans text-body-md text-on-surface-variant">
              Upload contracts, pleadings, and reference legislation for text extraction and clause analysis.
            </p>
          </div>

          <button
            onClick={() => navigate('/documents/doc-1')}
            className="px-space-md py-space-sm rounded bg-primary-container text-on-primary font-title-sm shadow-[0_1px_3px_rgba(30,58,95,0.12)] hover:bg-primary transition-colors cursor-pointer flex items-center gap-space-xs"
          >
            <span className="material-symbols-outlined text-[18px]">upload_file</span>
            <span>Upload Document</span>
          </button>
        </div>

        {/* Document Asset Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">
          {mockDocuments.map((doc) => (
            <div
              key={doc.id}
              onClick={() => navigate(`/documents/${doc.id}`)}
              className="p-space-lg bg-surface-container-lowest rounded-md border border-outline-variant/30 shadow-[0_1px_3px_rgba(30,58,95,0.04)] flex flex-col justify-between gap-space-md hover:border-primary/50 transition-all cursor-pointer group"
            >
              <div className="flex flex-col gap-space-xs">
                <div className="flex items-center justify-between">
                  <span className="px-space-xs py-0.5 rounded bg-surface-container text-secondary font-label-sm text-label-sm font-semibold">
                    {doc.category}
                  </span>
                  {doc.isSynthetic && (
                    <span className="text-[11px] text-outline font-medium">Sample</span>
                  )}
                </div>
                <h3 className="font-serif text-title-sm text-on-surface font-semibold group-hover:text-primary transition-colors mt-1">
                  {doc.title}
                </h3>
              </div>

              <div className="pt-space-sm border-t border-outline-variant/20 flex items-center justify-between font-label-sm text-label-sm text-outline">
                <span>{doc.fileSize}</span>
                <span>{doc.uploadedAt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
