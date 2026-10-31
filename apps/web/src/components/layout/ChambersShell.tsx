import React from 'react';
import { Outlet } from 'react-router-dom';
import { ChambersSidebar } from './ChambersSidebar';
import { GlobalHeader } from './GlobalHeader';

interface ChambersShellProps {
  expandedSidebar?: boolean;
}

export const ChambersShell: React.FC<ChambersShellProps> = ({ expandedSidebar }) => {
  const plClass = expandedSidebar ? "pl-72" : "pl-[260px]";

  return (
    <div className="min-h-screen bg-[#F4F8F6] dark:bg-[#060D0A] text-[#0F172A] dark:text-[#F3FBF7] flex flex-col antialiased transition-colors duration-200">
      <ChambersSidebar expanded={expandedSidebar} />
      <div className={plClass}>
        <GlobalHeader expandedSidebar={expandedSidebar} />
        <main className="w-full pt-16 min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
