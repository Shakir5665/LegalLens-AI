import React from 'react';
import { useNavigate } from 'react-router-dom';

export const DashboardNewPage: React.FC = () => {
  const navigate = useNavigate();

  const starterQueries = [
    {
      title: "Salary Reduction Without Consent",
      statute: "Industrial Disputes Act Section 31B",
      description: "Analyze whether an employer can reduce regular allowances by 30% and whether the employee can claim constructive termination.",
      params: "unilateral salary reduction allowances constructive termination"
    },
    {
      title: "Non-Disciplinary Termination Approval",
      statute: "TEWA No. 45 of 1971 Section 2(1)",
      description: "Understand the requirements for getting prior written consent or Labour Commissioner approval before ending employment.",
      params: "TEWA non-disciplinary termination approval commissioner"
    },
    {
      title: "Gratuity Calculation After Disputed Pay Cut",
      statute: "Payment of Gratuity Act No. 12 of 1983",
      description: "Check how end-of-service gratuity is calculated when an employee's salary was reduced prior to leaving.",
      params: "gratuity calculation last drawn wage pay cut"
    }
  ];

  return (
    <div className="flex flex-col w-full">
      <div className="px-margin py-space-xl max-w-7xl mx-auto w-full flex flex-col gap-space-xl">
        {/* Onboarding Welcome Header */}
        <div className="p-space-xl bg-surface-container-lowest rounded-md border border-outline-variant/30 shadow-[0_1px_3px_rgba(30,58,95,0.04)] flex flex-col gap-space-sm">
          <div className="flex items-center gap-space-xs text-primary font-label-sm uppercase tracking-wider font-semibold">
            <span className="material-symbols-outlined text-[18px]">verified</span>
            <span>Research Workspace Initialized</span>
          </div>
          <h1 className="font-serif text-headline-lg text-on-surface font-semibold">
            Welcome to LegalLens AI
          </h1>
          <p className="font-sans text-body-md text-on-surface-variant max-w-3xl leading-relaxed">
            LegalLens AI helps you perform evidence-grounded legal research with verified citations. The platform uses a synthetic benchmark dataset simulating Sri Lankan employment law to test research queries, citation verification, and report generation.
          </p>
        </div>

        {/* Starter Query Cards */}
        <div className="flex flex-col gap-space-md">
          <h2 className="font-serif text-title-lg text-on-surface font-semibold">
            Suggested Research Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
            {starterQueries.map((q) => (
              <div
                key={q.title}
                className="p-space-lg bg-surface-container-lowest rounded-md border border-outline-variant/30 shadow-[0_1px_3px_rgba(30,58,95,0.04)] flex flex-col justify-between gap-space-md hover:border-primary/50 transition-colors"
              >
                <div className="flex flex-col gap-space-xs">
                  <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider font-semibold">
                    {q.statute}
                  </span>
                  <h3 className="font-serif text-title-md text-on-surface font-semibold">{q.title}</h3>
                  <p className="font-sans text-body-sm text-on-surface-variant leading-relaxed">
                    {q.description}
                  </p>
                </div>
                <button
                  onClick={() => navigate(`/research/new?q=${encodeURIComponent(q.params)}`)}
                  className="w-full py-2 px-space-md rounded bg-surface-container text-primary font-title-sm text-title-sm font-semibold hover:bg-primary-container hover:text-on-primary transition-colors cursor-pointer flex items-center justify-center gap-space-xs"
                >
                  <span>Start This Research</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
