import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockUser } from '../../services/mockData';
import { useTheme } from '../../context/ThemeContext';

interface GlobalHeaderProps {
  expandedSidebar?: boolean;
}

export const GlobalHeader: React.FC<GlobalHeaderProps> = ({ expandedSidebar }) => {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();
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
      className={`fixed top-0 ${leftClass} right-0 h-16 backdrop-blur-xl border-b z-40 px-6 flex items-center justify-between transition-colors duration-200 ${
        isDark
          ? 'bg-[#060D0A]/85 border-emerald-500/15 text-white'
          : 'bg-white/85 border-[rgba(5,150,105,0.12)] text-[#0F172A]'
      }`}
    >
      {/* Global Search Bar */}
      <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-xl">
        <span
          className={`material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[18px] transition-colors ${
            isDark ? 'text-[#7E9F90]' : 'text-[#52796F]'
          }`}
        >
          search
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search research dockets, statutory sections, or case holdings..."
          className={`w-full pl-10 pr-14 py-2 rounded-xl text-[13px] transition-all focus:outline-none focus:ring-1 ${
            isDark
              ? 'bg-[#0D1914] border border-emerald-500/20 text-white placeholder:text-[#7E9F90] focus:border-emerald-400 focus:ring-emerald-400/30'
              : 'bg-[#F4F8F6] border border-[rgba(5,150,105,0.15)] text-[#0F172A] placeholder:text-[#52796F] focus:border-[#059669] focus:ring-[#059669]/20'
          }`}
        />
        <span
          className={`absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold pointer-events-none border ${
            isDark
              ? 'bg-[#13251E] border-emerald-500/25 text-[#A3C2B6]'
              : 'bg-white border-[rgba(5,150,105,0.18)] text-[#52796F]'
          }`}
        >
          ⌘K
        </span>
      </form>

      {/* Right Controls */}
      <div className="flex items-center gap-3.5">
        {/* Synthetic Dataset Indicator */}
        <div
          className={`hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-medium border ${
            isDark
              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'
              : 'bg-[#E8F4EE] border-[rgba(5,150,105,0.2)] text-[#064E3B]'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse"></span>
          <span>Simulated SL Labour Law (Sec. 13)</span>
        </div>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className={`p-2 rounded-xl border transition-all cursor-pointer flex items-center justify-center ${
            isDark
              ? 'bg-[#0D1914] border-emerald-500/20 text-emerald-400 hover:bg-[#13251E]'
              : 'bg-white border-[rgba(5,150,105,0.2)] text-[#059669] hover:bg-[#E8F4EE]'
          }`}
          title={isDark ? "Switch to Light Theme" : "Switch to Dark Theme"}
        >
          <span className="material-symbols-outlined text-[18px]">
            {isDark ? 'light_mode' : 'dark_mode'}
          </span>
        </button>

        {/* User Role Tag & Avatar */}
        <div className="flex items-center gap-2 pl-1">
          <span
            className={`hidden sm:inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-mono font-semibold uppercase tracking-wider ${
              isDark
                ? 'bg-emerald-500/15 text-emerald-300'
                : 'bg-[#E8F4EE] text-[#064E3B]'
            }`}
          >
            {mockUser.userType}
          </span>
          <button
            onClick={() => navigate('/settings')}
            className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all shadow-sm ${
              isDark
                ? 'bg-gradient-to-br from-emerald-400 to-teal-700 text-[#041F16] hover:scale-105'
                : 'bg-[#059669] text-white hover:bg-[#047857]'
            }`}
            title={`Signed in as ${mockUser.name}`}
          >
            <span className="material-symbols-outlined text-[18px]">person</span>
          </button>
        </div>
      </div>
    </header>
  );
};
