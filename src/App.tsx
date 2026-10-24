import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AiRecommendationWidget } from './components/AiRecommendationWidget';
import { LiveDemosSection } from './components/LiveDemosSection';
import { PricingPackages } from './components/PricingPackages';
import { IndustrySolutions } from './components/IndustrySolutions';
import { FreeDigitalCheck } from './components/FreeDigitalCheck';
import { CaseStudiesSection } from './components/CaseStudiesSection';
import { ProjectWorkflowSection } from './components/ProjectWorkflowSection';
import { ServiceCategories } from './components/ServiceCategories';
import { RoiCalculator } from './components/RoiCalculator';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';
import { ConsultationModal } from './components/ConsultationModal';
import { SmartWelcomePopup } from './components/SmartWelcomePopup';
import { AiAuditModal } from './components/AiAuditModal';
import { SearchModal } from './components/SearchModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { NICHE_SOLUTIONS } from './data/agencyData';
import type { NicheSolution, ServiceCategory } from './data/agencyData';
import { MessageCircle } from 'lucide-react';

export function App() {
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');
  const [isDark, setIsDark] = useState<boolean>(false);
  const [selectedSolution, setSelectedSolution] = useState<NicheSolution>(NICHE_SOLUTIONS[0]);
  
  // Modals state
  const [consultationModalOpen, setConsultationModalOpen] = useState(false);
  const [consultationSubject, setConsultationSubject] = useState<string>('');
  const [auditModalOpen, setAuditModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  // Sync dark mode class on document
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const handleOpenConsultation = (subject?: string) => {
    setConsultationSubject(subject || selectedSolution.name);
    setConsultationModalOpen(true);
  };

  const handleSelectCategory = (cat: ServiceCategory) => {
    const el = document.getElementById('pricing');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-900">
      
      {/* Global Navigation Bar with Golden Shimmer Strip & Black Glass Orbit Button */}
      <Navbar
        currency={currency}
        setCurrency={setCurrency}
        isDark={isDark}
        setIsDark={setIsDark}
        onOpenConsultation={() => handleOpenConsultation()}
        onOpenSearch={() => setSearchModalOpen(true)}
      />

      {/* Main Content: Exact 9-Step Strategic Customer Journey */}
      <main className="flex-1 pb-16 sm:pb-0">
        
        {/* 1. Premium Hero (2 Paths: Find Solution or Watch Demos) */}
        <HeroSection
          currency={currency}
          onExploreServices={() => {
            const el = document.getElementById('solution-finder');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenConsultation={() => handleOpenConsultation()}
        />

        {/* 2. Find Your Solution (Vismart Smart Solution Finder / AI Advisor) */}
        <AiRecommendationWidget
          currency={currency}
          onSelectSolution={(sol) => {
            setSelectedSolution(sol);
            const el = document.getElementById('industries');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenConsultation={(solTitle) => handleOpenConsultation(solTitle)}
        />

        {/* 3. Live Demo Showroom (Interactive Website, App & Store Simulator) */}
        <LiveDemosSection
          currency={currency}
          onOpenConsultation={(demo) => handleOpenConsultation(demo)}
        />

        {/* 4. Popular Services & Starting Prices (Packages + Deliverables + Care) */}
        <PricingPackages
          currency={currency}
          onSelectPackage={(pkg) => handleOpenConsultation(pkg)}
        />

        {/* 5. 12 Industry Solutions Matrix & Value Ladder */}
        <IndustrySolutions
          currency={currency}
          selectedSolution={selectedSolution}
          onSelectSolution={(sol) => setSelectedSolution(sol)}
          onOpenConsultation={(niche) => handleOpenConsultation(niche)}
        />

        {/* 6. Free Digital Check (Website & Technical Flaw Scanner) */}
        <FreeDigitalCheck
          currency={currency}
          onOpenConsultation={(details) => handleOpenConsultation(details)}
        />

        {/* 7. Our Work & Case Studies (Before / After Real Proof & Verified Metrics) */}
        <CaseStudiesSection
          currency={currency}
          onOpenConsultation={(projectName) => handleOpenConsultation(projectName)}
        />

        {/* 8. How Your Project Works (4-Step Process & 100% Code Ownership Handover) */}
        <ProjectWorkflowSection
          onOpenConsultation={() => handleOpenConsultation('Project Scoping Call')}
        />

        {/* 9. Interactive Financial ROI Calculator & Start Project */}
        <RoiCalculator
          currency={currency}
          onGetCustomQuote={() => handleOpenConsultation()}
        />

        {/* Client Reviews & Social Proof */}
        <ReviewsSection />

      </main>

      {/* 10. Comprehensive Footer */}
      <Footer
        currency={currency}
        setCurrency={setCurrency}
        onOpenAudit={() => setAuditModalOpen(true)}
      />

      {/* Floating Desktop WhatsApp Button */}
      <a
        href="https://wa.me/919999999999?text=Hello%20Vismart%20Studio,%20I%20am%20interested%20in%20a%20website/app/AI%20automation%20proposal."
        target="_blank"
        rel="noreferrer"
        className="hidden sm:flex fixed bottom-6 right-6 z-40 items-center gap-2 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-2xl hover:scale-105 active:scale-95 transition-all group"
      >
        <MessageCircle className="w-5 h-5 fill-current" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300">
          Chat on WhatsApp
        </span>
      </a>

      {/* Native Mobile Bottom Navigation Bar */}
      <MobileBottomNav
        onOpenConsultation={() => handleOpenConsultation()}
      />

      {/* Smooth White Attractive Welcome Popup (Closes into floating side icon) */}
      <SmartWelcomePopup
        currency={currency}
        onOpenConsultationModal={(niche) => handleOpenConsultation(niche)}
      />

      {/* Interactive Modals */}
      <ConsultationModal
        isOpen={consultationModalOpen}
        onClose={() => setConsultationModalOpen(false)}
        currency={currency}
        initialSubject={consultationSubject}
      />

      <AiAuditModal
        isOpen={auditModalOpen}
        onClose={() => setAuditModalOpen(false)}
        currency={currency}
        onChoosePackage={(pkg) => handleOpenConsultation(pkg)}
      />

      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectSolution={(sol) => setSelectedSolution(sol)}
        currency={currency}
      />

    </div>
  );
}

export default App;
