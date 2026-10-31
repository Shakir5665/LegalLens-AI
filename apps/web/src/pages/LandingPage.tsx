import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { LandingNavbar } from '../components/landing/LandingNavbar';
import { HeroSection } from '../components/landing/HeroSection';
import { TrustStrip } from '../components/landing/TrustStrip';
import { ProblemSolution } from '../components/landing/ProblemSolution';
import { CapabilitiesSection } from '../components/landing/CapabilitiesSection';
import { ProductShowcase } from '../components/landing/ProductShowcase';
import { WorkflowSection } from '../components/landing/WorkflowSection';
import { TechnologyArchitecture } from '../components/landing/TechnologyArchitecture';
import { TrustOversightSection } from '../components/landing/TrustOversightSection';
import { FinalCTA } from '../components/landing/FinalCTA';
import { LandingFooter } from '../components/landing/LandingFooter';

export const LandingPage: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-200 selection:bg-emerald-500 selection:text-white ${
        isDark ? 'bg-[#060D0A] text-[#F3FBF7]' : 'bg-[#F4F8F6] text-[#0F172A]'
      }`}
    >
      {/* Top Sticky Navigation */}
      <LandingNavbar />

      {/* Main Landing Page Content */}
      <main className="flex-1">
        {/* Section 2: Hero Section with Live Realistic Preview */}
        <HeroSection />

        {/* Section 3: Technology Trust Strip */}
        <TrustStrip />

        {/* Section 4: Problem and Solution */}
        <ProblemSolution />

        {/* Section 5: Core Capabilities */}
        <CapabilitiesSection />

        {/* Section 6: Interactive Product Showcase */}
        <ProductShowcase />

        {/* Section 7: How It Works */}
        <WorkflowSection />

        {/* Section 8: Technology Architecture */}
        <TechnologyArchitecture />

        {/* Section 9: Trust, Verification & Human Oversight */}
        <TrustOversightSection />

        {/* Section 10: Final CTA */}
        <FinalCTA />
      </main>

      {/* Section 11: Footer */}
      <LandingFooter />
    </div>
  );
};

export default LandingPage;
