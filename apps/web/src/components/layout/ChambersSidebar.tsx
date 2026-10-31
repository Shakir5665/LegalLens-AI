import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { mockUser } from '../../services/mockData';
import { useTheme } from '../../context/ThemeContext';

interface ChambersSidebarProps {
  expanded?: boolean;
}

export const ChambersSidebar: React.FC<ChambersSidebarProps> = ({ expanded }) => {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const widthClass = expanded ? "w-72" : "w-[260px]";

  const navItems = [
    { label: "Dashboard", path: "/dashboard", icon: "dashboard" },
    { label: "New Inquiry", path: "/research/new", icon: "add_box" },
    { label: "Precedent Matrix", path: "/compare", icon: "compare_arrows" },
    { label: "Documents Vault", path: "/documents", icon: "folder_open" },
    { label: "Research Reports", path: "/reports", icon: "description" },
    { label: "Inquiry History", path: "/research/history", icon: "history_edu" },
    { label: "Preferences", path: "/settings", icon: "settings" },
  ];

  return (
    <aside
      className={`fixed left-0 top-0 h-full ${widthClass} z-50 flex flex-col justify-between border-r transition-colors duration-200 ${
        isDark
          ? 'bg-[#08120D] border-emerald-500/15 text-white'
          : 'bg-white border-[rgba(5,150,105,0.12)] text-[#0F172A]'
      }`}
    >
      <div className="flex flex-col flex-1 min-h-0">
        
        {/* Brand Header */}
        <div
          className={`px-5 pt-5 pb-4 border-b flex flex-col gap-2 ${
            isDark ? 'border-emerald-500/15' : 'border-[rgba(5,150,105,0.12)]'
          }`}
        >
          <Link to="/dashboard" className="flex items-center gap-3 group">
            <div
              className={`w-9 h-9 rounded-xl p-[1px] transition-all ${
                isDark
                  ? 'bg-gradient-to-br from-emerald-400 to-teal-700 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                  : 'bg-gradient-to-br from-[#059669] to-[#10B981] shadow-[0_2px_8px_rgba(5,150,105,0.2)]'
              }`}
            >
              <div
                className={`w-full h-full rounded-[10px] flex items-center justify-center transition-colors ${
                  isDark ? 'bg-[#081510] text-emerald-400' : 'bg-white text-[#059669]'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">balance</span>
              </div>
            </div>

            <div className="flex flex-col">
              <span className="font-extrabold text-[16px] tracking-tight font-headline">LegalLens AI</span>
              <span className="text-[10px] font-mono text-[#52796F] dark:text-[#7E9F90] uppercase tracking-wider font-semibold">
                Judicial Intelligence
              </span>
            </div>
          </Link>
        </div>

        {/* Primary Action Button: New Research */}
        <div className="px-4 pt-4 pb-2">
          <button
            onClick={() => navigate('/research/new')}
            className={`w-full py-2.5 px-4 rounded-xl font-bold text-[13px] tracking-tight transition-all cursor-pointer flex items-center justify-center gap-2 ${
              isDark
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-[#041F16] shadow-[0_0_18px_rgba(16,185,129,0.3)] hover:shadow-[0_0_24px_rgba(16,185,129,0.5)]'
                : 'bg-[#059669] hover:bg-[#047857] text-white shadow-[0_2px_10px_rgba(5,150,105,0.25)]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span>New Research</span>
          </button>
        </div>

        {/* Workspace Navigation Links */}
        <nav className="flex-1 flex flex-col gap-1 px-3 py-3 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13px] font-medium transition-all ${
                  isActive
                    ? isDark
                      ? "bg-[#13251E] text-emerald-300 font-semibold border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.1)]"
                      : "bg-[#E8F4EE] text-[#059669] font-bold border border-[#059669]/25 shadow-sm"
                    : isDark
                    ? "text-[#94A79E] hover:bg-[#0E1F18] hover:text-white"
                    : "text-[#475569] hover:bg-[#F4F8F6] hover:text-[#0F172A]"
                }`
              }
            >
              <span className="material-symbols-outlined text-[19px]">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Live Multi-Agent Telemetry Card */}
        <div className="px-4 py-3">
          <div
            className={`p-3 rounded-xl border text-[11px] font-mono flex flex-col gap-1.5 ${
              isDark
                ? 'bg-[#060D0A] border-emerald-500/20 text-[#7E9F90]'
                : 'bg-[#F4F8F6] border-[rgba(5,150,105,0.15)] text-[#52796F]'
            }`}
          >
            <div className="flex items-center justify-between font-bold">
              <span className="flex items-center gap-1.5 text-emerald-500 dark:text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Agentic Pipeline
              </span>
              <span className="text-[10px] uppercase">Active</span>
            </div>
            <div className="text-[10px] text-[#52796F] dark:text-[#94A79E]">
              SL Labour Law Benchmark v1.0
            </div>
          </div>
        </div>

      </div>

      {/* User Profile Footer */}
      <div
        className={`p-4 border-t transition-colors ${
          isDark
            ? 'border-emerald-500/15 bg-[#060D0A]'
            : 'border-[rgba(5,150,105,0.12)] bg-[#F8FAF9]'
        }`}
      >
        <Link to="/settings" className="flex items-center gap-3 group">
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-[13px] shrink-0 transition-all ${
              isDark
                ? 'bg-[#13251E] text-emerald-400 border border-emerald-500/30 group-hover:border-emerald-400'
                : 'bg-[#E8F4EE] text-[#059669] border border-[rgba(5,150,105,0.2)] group-hover:border-[#059669]'
            }`}
          >
            <span className="material-symbols-outlined text-[19px]">account_circle</span>
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <span
              className={`text-[13px] font-bold truncate group-hover:text-emerald-500 transition-colors ${
                isDark ? 'text-white' : 'text-[#0F172A]'
              }`}
            >
              {mockUser.name}
            </span>
            <span className="text-[11px] font-mono text-[#52796F] dark:text-[#7E9F90] truncate">
              {mockUser.organization}
            </span>
          </div>
        </Link>
      </div>
    </aside>
  );
};
