import React, { useState, useEffect } from 'react';
import { 
  X, 
  ArrowRight, 
  Sparkles, 
  Layers,
  Compass,
  FileText,
  RotateCcw,
  Zap,
  Bot,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';
import type { ProjectBrief } from '../data/projectBriefState';

interface SmartWelcomePopupProps {
  onOpenConsultationModal: (initialGoalOrIndustry?: string) => void;
  currentBrief?: ProjectBrief;
}

export const SmartWelcomePopup: React.FC<SmartWelcomePopupProps> = ({
  onOpenConsultationModal,
  currentBrief
}) => {
  // 'hidden': not rendered
  // 'popup': clean modal invitation (never locks screen abruptly, remembers dismissal)
  // 'docked': unobtrusive bottom-right floating pill
  const [modalState, setModalState] = useState<'hidden' | 'popup' | 'docked'>('hidden');

  useEffect(() => {
    // Check if visitor has previously dismissed or opened consultation
    const hasInteracted = sessionStorage.getItem('vismart_welcome_journey_interacted');
    if (!hasInteracted) {
      // 3.5s delay allows visitor to observe the hero section and understand the brand first
      const timer = setTimeout(() => {
        setModalState('popup');
      }, 3500);
      return () => clearTimeout(timer);
    } else {
      setModalState('docked');
    }
  }, []);

  const handleDismissToDock = () => {
    setModalState('docked');
    sessionStorage.setItem('vismart_welcome_journey_interacted', 'true');
  };

  const handleLaunchConsultation = (path?: string) => {
    handleDismissToDock();
    onOpenConsultationModal(path);
  };

  const scrollToDemos = () => {
    handleDismissToDock();
    const el = document.getElementById('demos');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToSolutions = () => {
    handleDismissToDock();
    const el = document.getElementById('industries');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* =========================================================================
          STATE 1: DOCKED FLOATING BADGE (Small, Unobtrusive, Bottom-Right)
          ========================================================================= */}
      {modalState === 'docked' && (
        <div className="fixed bottom-20 sm:bottom-6 right-3 sm:right-6 z-40 animate-in fade-in zoom-in-95 duration-200">
          <button
            onClick={() => handleLaunchConsultation()}
            className="group flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full bg-white text-slate-900 shadow-2xl border-2 border-amber-400 hover:border-amber-500 hover:scale-105 active:scale-95 transition-all"
            title="Open Project Consultation & Quotation"
          >
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-500 flex items-center justify-center text-slate-950 font-black text-xs shadow-sm shrink-0">
              <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-950" />
            </div>

            <div className="text-left">
              <span className="text-[11px] sm:text-xs font-black text-slate-900 group-hover:text-amber-700 transition-colors block leading-tight">
                Discuss Project
              </span>
              <span className="text-[9px] sm:text-[10px] text-slate-500 block truncate max-w-[120px] sm:max-w-none">
                {currentBrief?.goalTitle || 'Free Scoping'}
              </span>
            </div>
          </button>
        </div>
      )}

      {/* =========================================================================
          STATE 2: SMOOTH WELCOME INVITATION (Crisp White Canvas, Zero Distortion)
          ========================================================================= */}
      {modalState === 'popup' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] border border-slate-200 overflow-hidden flex flex-col smooth-white-popup">
            
            {/* Top Amber Accent Line */}
            <div className="h-1.5 w-full bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400"></div>

            {/* Header */}
            <div className="p-5 sm:p-6 pb-3 flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-700 shrink-0">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-slate-900">
                    Welcome to Vismart Studio
                  </h3>
                  <p className="text-xs text-slate-500">
                    How can our digital engineering team assist your business today?
                  </p>
                </div>
              </div>

              <button
                onClick={handleDismissToDock}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                title="Continue browsing website"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 4 Clear Guided Pathways */}
            <div className="p-5 sm:p-6 pt-2 space-y-2.5">
              <button
                onClick={() => handleLaunchConsultation('New Website or Web App')}
                className="w-full p-3.5 rounded-2xl border-2 border-slate-200 hover:border-amber-400 bg-white hover:bg-amber-50/40 text-left transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 group-hover:bg-amber-100 flex items-center justify-center text-slate-700 group-hover:text-amber-800 transition-colors">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-amber-900">
                      Discuss My Project & Get Quotation
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      Structured 5-minute technical brief with human-approved proposal
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-0.5 transition-all" />
              </button>

              <button
                onClick={scrollToDemos}
                className="w-full p-3.5 rounded-2xl border-2 border-slate-200 hover:border-blue-400 bg-white hover:bg-blue-50/40 text-left transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 group-hover:bg-blue-100 flex items-center justify-center text-slate-700 group-hover:text-blue-800 transition-colors">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-900">
                      Explore Interactive Prototypes & Demos
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      Examine working layouts for restaurants, clinics, retail and B2B
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
              </button>

              <button
                onClick={scrollToSolutions}
                className="w-full p-3.5 rounded-2xl border-2 border-slate-200 hover:border-indigo-400 bg-white hover:bg-indigo-50/40 text-left transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 group-hover:bg-indigo-100 flex items-center justify-center text-slate-700 group-hover:text-indigo-800 transition-colors">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-indigo-900">
                      Browse 12 Industry Solutions
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      Deliverables, tech stacks, and indicative investment tiers
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all" />
              </button>
            </div>

            {/* Bottom Actions */}
            <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
              <button
                onClick={handleDismissToDock}
                className="text-slate-500 hover:text-slate-800 font-medium transition-colors"
              >
                Continue Browsing Freely →
              </button>

              <span className="text-[11px] text-slate-400">
                You can reopen anytime from the side badge
              </span>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
