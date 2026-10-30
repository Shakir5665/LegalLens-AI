import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockUser } from '../../services/mockData';

interface GlobalHeaderProps {
  expandedSidebar?: boolean;
}

export const GlobalHeader: React.FC<GlobalHeaderProps> = ({ expandedSidebar }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const leftClass = expandedSidebar ? "left-72" : "left-[260px]";

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/research/new?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header
      className={`fixed top-0 ${leftClass} right-0 h-16 bg-surface-container-lowest/90 backdrop-blur-md border-b border-outline-variant/30 z-40 px-space-lg flex items-center justify-between shadow-[0_1px_3px_rgba(30,58,95,0.03)]`}
    >
      {/* Global Search Bar */}
      <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-xl">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">
          search
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search research questions, statutes, or case topics..."
          className="w-full pl-9 pr-14 py-space-xs rounded bg-surface border border-outline-variant/40 font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all"
        />
        <span className="absolute right-2.5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded bg-surface-container-high border border-outline-variant/50 font-label-sm text-label-sm text-on-surface-variant font-mono pointer-events-none">
          ⌘K
        </span>
      </form>

      {/* Right User Navigation */}
      <div className="flex items-center gap-space-md">
        {/* Synthetic Dataset Indicator */}
        <span className="hidden md:inline-flex items-center px-space-xs py-0.5 rounded bg-surface-container text-tertiary font-label-sm text-label-sm border border-outline-variant/40">
          Simulated Dataset (MVP)
        </span>

        {/* User Role Tag */}
        <div className="flex items-center gap-space-sm pl-space-xs">
          <span className="inline-flex items-center px-space-xs py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm uppercase tracking-wide font-medium">
            {mockUser.userType}
          </span>
          <button
            onClick={() => navigate('/settings')}
            className="w-8 h-8 rounded-full bg-primary flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity"
            title={mockUser.name}
          >
            <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
          </button>
        </div>
      </div>
    </header>
  );
};
