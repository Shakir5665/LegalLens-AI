import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

export const DashboardNewPage: React.FC = () => {
  const navigate = useNavigate();
  const { isDark } = useTheme();

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
    <div className="flex flex-col w-full pb-16">
      <div className="px-6 md:px-10 py-8 max-w-7xl mx-auto w-full flex flex-col gap-8">
        
        {/* Onboarding Welcome Header */}
        <div
          className={`p-8 rounded-2xl border flex flex-col gap-3 transition-all ${
            isDark
              ? 'bg-[#0D1914] border-emerald-500/20 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
              : 'bg-white border-[rgba(5,150,105,0.15)] shadow-[0_4px_25px_rgba(15,23,42,0.04)]'
          }`}
        >
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-mono text-[11px] uppercase tracking-wider font-bold">
            <span className="material-symbols-outlined text-[18px]">verified</span>
            <span>Research Workspace Initialized</span>
          </div>
          <h1
            className={`text-[32px] font-extrabold tracking-tight font-headline ${
              isDark ? 'text-white' : 'text-[#0F172A]'
            }`}
          >
            Welcome to LegalLens AI
          </h1>
          <p
            className={`text-[15px] max-w-3xl leading-relaxed ${
              isDark ? 'text-[#94A79E]' : 'text-[#475569]'
            }`}
          >
            LegalLens AI automates evidence-grounded legal research with verified citations. The platform uses a synthetic benchmark dataset simulating Sri Lankan employment law to test research queries, citation verification, and report generation.
          </p>
        </div>

        {/* Starter Query Cards */}
        <div className="flex flex-col gap-4">
          <h2
            className={`text-[20px] font-extrabold font-headline ${
              isDark ? 'text-white' : 'text-[#0F172A]'
            }`}
          >
            Suggested Starter Inquiries
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {starterQueries.map((q) => (
              <div
                key={q.title}
                className={`p-6 rounded-2xl border flex flex-col justify-between gap-6 transition-all ${
                  isDark
                    ? 'bg-[#0D1914] border-emerald-500/20 hover:border-emerald-500/40 shadow-[0_10px_25px_rgba(0,0,0,0.4)]'
                    : 'bg-white border-[rgba(5,150,105,0.15)] hover:border-[#059669]/40 shadow-[0_4px_20px_rgba(15,23,42,0.04)]'
                }`}
              >
                <div className="flex flex-col gap-2">
                  <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider">
                    {q.statute}
                  </span>
                  <h3
                    className={`text-[17px] font-bold font-headline ${
                      isDark ? 'text-white' : 'text-[#0F172A]'
                    }`}
                  >
                    {q.title}
                  </h3>
                  <p className={`text-[13px] leading-relaxed ${isDark ? 'text-[#94A79E]' : 'text-[#475569]'}`}>
                    {q.description}
                  </p>
                </div>
                
                <button
                  onClick={() => navigate(`/research/new?q=${encodeURIComponent(q.params)}`)}
                  className={`w-full py-2.5 px-4 rounded-xl text-[13px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    isDark
                      ? 'bg-[#13251E] text-emerald-300 hover:bg-emerald-500 hover:text-[#041F16] border border-emerald-500/25'
                      : 'bg-[#E8F4EE] text-[#059669] hover:bg-[#059669] hover:text-white border border-[rgba(5,150,105,0.2)]'
                  }`}
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
