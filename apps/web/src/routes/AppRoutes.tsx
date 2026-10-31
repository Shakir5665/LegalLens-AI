import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ChambersShell } from '../components/layout/ChambersShell';
import { LandingPage } from '../pages/LandingPage';
import { SignInPage } from '../pages/auth/SignInPage';
import { RegisterPage } from '../pages/auth/RegisterPage';
import { DashboardReturningPage } from '../pages/dashboard/DashboardReturningPage';
import { DashboardNewPage } from '../pages/dashboard/DashboardNewPage';
import { NewResearchPage } from '../pages/research/NewResearchPage';
import { ResearchProgressPage } from '../pages/research/ResearchProgressPage';
import { ResearchSynthesisPage } from '../pages/research/ResearchSynthesisPage';
import { CompareCasesPage } from '../pages/research/CompareCasesPage';
import { DocumentsVaultPage } from '../pages/documents/DocumentsVaultPage';
import { DocumentViewerPage } from '../pages/documents/DocumentViewerPage';
import { ReportsPage } from '../pages/reports/ReportsPage';
import { ResearchHistoryPage } from '../pages/history/ResearchHistoryPage';
import { ProfileSettingsPage } from '../pages/settings/ProfileSettingsPage';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Root Landing Page */}
      <Route path="/" element={<LandingPage />} />

      {/* Public Auth Pages */}
      <Route path="/login" element={<SignInPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/auth/login" element={<SignInPage />} />
      <Route path="/auth/register" element={<RegisterPage />} />

      {/* Authenticated Chambers Shell */}
      <Route element={<ChambersShell />}>
        <Route path="/dashboard" element={<DashboardReturningPage />} />
        <Route path="/dashboard/new" element={<DashboardNewPage />} />
        <Route path="/research/new" element={<NewResearchPage />} />
        <Route path="/research/run/:runId" element={<ResearchProgressPage />} />
        <Route path="/research/:id" element={<ResearchSynthesisPage />} />
        <Route path="/research/:id/evidence" element={<ResearchSynthesisPage />} />
        <Route path="/compare" element={<CompareCasesPage />} />
        <Route path="/documents" element={<DocumentsVaultPage />} />
        <Route path="/documents/:id" element={<DocumentViewerPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/research/history" element={<ResearchHistoryPage />} />
        <Route path="/settings" element={<ProfileSettingsPage />} />
      </Route>

      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

