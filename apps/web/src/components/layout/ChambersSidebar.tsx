import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { mockUser } from '../../services/mockData';

interface ChambersSidebarProps {
  expanded?: boolean;
}

export const ChambersSidebar: React.FC<ChambersSidebarProps> = ({ expanded }) => {
  const navigate = useNavigate();
  const widthClass = expanded ? "w-72" : "w-[260px]";

  const navItems = [
    { label: "Dashboard", path: "/dashboard", icon: "dashboard" },
    { label: "Research History", path: "/research/history", icon: "history_edu" },
    { label: "Documents", path: "/documents", icon: "folder_open" },
    { label: "Reports", path: "/reports", icon: "description" },
    { label: "Settings", path: "/settings", icon: "settings" },
  ];

  return (
    <aside
      className={`fixed left-0 top-0 h-full ${widthClass} bg-surface-container-lowest border-r border-outline-variant/30 z-50 flex flex-col justify-between shadow-[0_1px_8px_rgba(30,58,95,0.04)]`}
    >
      <div className="flex flex-col flex-1 min-h-0">
        {/* Brand Header */}
        <div className="px-space-md pt-space-lg pb-space-md border-b border-outline-variant/20 flex flex-col gap-space-xs">
          <Link to="/dashboard" className="flex items-center gap-space-sm group">
            <div className="w-8 h-8 rounded-lg bg-primary-container flex items-center justify-center text-on-primary-container shadow-[0_1px_3px_rgba(30,58,95,0.08)] group-hover:bg-primary transition-colors">
              <span className="material-symbols-outlined text-[20px]">balance</span>
            </div>
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm text-primary tracking-tight font-serif">LegalLens AI</span>
            </div>
          </Link>
          <div className="mt-space-xs flex items-center gap-space-xs">
            <span className="inline-flex items-center px-space-xs py-0.5 rounded bg-surface-container text-tertiary font-label-sm text-label-sm uppercase tracking-wider font-medium">
              Legal Research Platform
            </span>
          </div>
        </div>

        {/* Primary Action Button: New Research */}
        <div className="px-space-md pt-space-md pb-space-xs">
          <button
            onClick={() => navigate('/research/new')}
            className="flex items-center justify-center gap-space-xs w-full py-space-sm px-space-md rounded bg-primary-container text-on-primary font-title-sm text-title-sm shadow-[0_1px_3px_rgba(30,58,95,0.12)] hover:bg-primary transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span>New Research</span>
          </button>
        </div>

        {/* Workspace Navigation Links */}
        <nav className="flex-1 flex flex-col gap-0.5 px-space-xs py-space-sm overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-space-sm px-space-md py-space-sm rounded-r transition-colors ${
                  isActive
                    ? "bg-surface-container text-primary font-title-sm font-semibold border-l-2 border-primary"
                    : "text-on-surface-variant font-body-md text-body-md hover:bg-surface-container-low hover:text-on-surface"
                }`
              }
            >
              <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* User Profile Footer */}
      <div className="p-space-md border-t border-outline-variant/20 bg-surface-container-low/40">
        <Link to="/settings" className="flex items-center gap-space-sm group">
          <div className="w-8 h-8 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-title-sm text-title-sm font-semibold group-hover:bg-primary transition-colors">
            <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="font-title-sm text-title-sm text-on-surface truncate group-hover:text-primary transition-colors">
              {mockUser.name}
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant truncate">
              {mockUser.organization}
            </span>
          </div>
        </Link>
      </div>
    </aside>
  );
};
