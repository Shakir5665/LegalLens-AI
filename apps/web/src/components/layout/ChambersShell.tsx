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
    <div className="min-h-screen bg-surface flex flex-col antialiased">
      <ChambersSidebar expanded={expandedSidebar} />
      <div className={plClass}>
        <GlobalHeader expandedSidebar={expandedSidebar} />
        <main className="w-full pt-16 min-h-screen bg-surface">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

