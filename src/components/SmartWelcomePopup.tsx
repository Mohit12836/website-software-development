import React, { useState, useEffect } from 'react';
import { 
  X, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  ExternalLink,
  ChevronRight, 
  Layers,
  UtensilsCrossed,
  Stethoscope,
  Store,
  Briefcase,
  GraduationCap,
  Building2,
  Minimize2,
  Compass,
  FileText,
  RotateCcw,
  Zap,
  Bot
} from 'lucide-react';
import { NICHE_SOLUTIONS } from '../data/agencyData';
import type { NicheSolution } from '../data/agencyData';

interface SmartWelcomePopupProps {
  currency: 'INR' | 'USD';
  onOpenConsultationModal: (subject?: string) => void;
}

export const SmartWelcomePopup: React.FC<SmartWelcomePopupProps> = ({
  currency,
  onOpenConsultationModal
}) => {
  // Modal State:
  // 'hidden': initial load before timer
  // 'popup': smooth, crisp white attractive popup open
  // 'docked': minimized into side floating icon badge
  const [modalState, setModalState] = useState<'hidden' | 'popup' | 'docked'>('hidden');

  // Journey Steps:
  // 1: Primary Goal (What do you want to build?)
  // 2: Industry / Business Type
  // 3: Solution Showcase & Value Card (Live preview, 3 benefits)
  // 4: Project Scope Confirmation (Blueprint Ready)
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedGoal, setSelectedGoal] = useState<string>('');
  const [selectedNiche, setSelectedNiche] = useState<NicheSolution>(NICHE_SOLUTIONS[0]);
  const [selectedScope, setSelectedScope] = useState<string>('Brand New Solution');

  // Show smooth attractive popup gently after 3.2 seconds
  useEffect(() => {
    const hasInteracted = sessionStorage.getItem('vismart_welcome_popup_seen');
    if (!hasInteracted) {
      const timer = setTimeout(() => {
        setModalState('popup');
      }, 3200);
      return () => clearTimeout(timer);
    } else {
      setModalState('docked');
    }
  }, []);

  const handleCloseToDock = () => {
    setModalState('docked');
    sessionStorage.setItem('vismart_welcome_popup_seen', 'true');
  };

  const handleOpenFromDock = () => {
    setModalState('popup');
  };

  const handleSelectGoal = (goal: string) => {
    setSelectedGoal(goal);
    setCurrentStep(2);
  };

  const handleSelectIndustry = (nicheName: string) => {
    const match = NICHE_SOLUTIONS.find(n => 
      n.name.toLowerCase().includes(nicheName.toLowerCase()) || 
      nicheName.toLowerCase().includes(n.name.toLowerCase())
    ) || NICHE_SOLUTIONS[0];
    
    setSelectedNiche(match);
    setCurrentStep(3);
  };

  const handleSelectScope = (scope: string) => {
    setSelectedScope(scope);
    setCurrentStep(4);
  };

  const handleOpenFullBlueprint = () => {
    handleCloseToDock();
    onOpenConsultationModal(selectedNiche.name);
  };

  const handleResetJourney = () => {
    setCurrentStep(1);
    setSelectedGoal('');
  };

  const industryIcons = [
    { name: 'Restaurant / Food', icon: UtensilsCrossed, key: 'Restaurant' },
    { name: 'Clinic / Healthcare', icon: Stethoscope, key: 'Clinic' },
    { name: 'E-commerce / Retail', icon: Store, key: 'Store' },
    { name: 'Services / Contractor', icon: Briefcase, key: 'Salon' },
    { name: 'Coaching / Education', icon: GraduationCap, key: 'Coaching' },
    { name: 'Real Estate / Corporate', icon: Building2, key: 'Real Estate' }
  ];

  return (
    <>
      {/* =========================================================================
          STATE 1: FLOATING DOCKED ICON (Side Me Chhota Sa Icon Ban Ke Baith Jata Hai)
          Does not obstruct website. Always visible with pulse ring.
          ========================================================================= */}
      {modalState === 'docked' && (
        <div className="fixed bottom-20 sm:bottom-8 right-4 sm:right-8 z-40 animate-in fade-in zoom-in-95 duration-300">
          <button
            onClick={handleOpenFromDock}
            className="group relative flex items-center gap-3 px-4 py-3 rounded-full bg-white text-slate-900 shadow-2xl border-2 border-amber-400 hover:border-amber-500 hover:scale-105 active:scale-95 transition-all duration-200"
            title="Open Vismart Project Journey"
            aria-label="Open Project Journey"
          >
            {/* Glowing avatar with gold gradient */}
            <div className="relative w-9 h-9 rounded-full bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-500 flex items-center justify-center text-white font-black text-sm shadow-md pulse-gold-ring">
              <Compass className="w-5 h-5 text-slate-950 animate-spin-slow" />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white"></span>
            </div>

            {/* Label and Badge */}
            <div className="text-left hidden sm:block">
              <div className="text-xs font-black text-slate-900 group-hover:text-amber-600 transition-colors flex items-center gap-1.5">
                <span>Start Project Journey</span>
                <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                  Step {currentStep}/4
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium">
                Click to plan website or app
              </p>
            </div>
          </button>
        </div>
      )}

      {/* =========================================================================
          STATE 2: SMOOTHLY WHITE COLOUR FULL ATTRACTIVE POPUP
          Full attractive modal with bright white canvas, crystal clarity, zero dark gloom,
          progress indicator, and interactive guided business journey.
          ========================================================================= */}
      {modalState === 'popup' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-300">
          
          <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.35)] border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] smooth-white-popup">
            
            {/* Top Amber Shimmer Strip */}
            <div className="h-1.5 w-full bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400"></div>

            {/* Modal Header: Clean, Crisp White with Dark Text & Gold Accents */}
            <div className="px-5 py-4 sm:px-6 sm:py-5 bg-white border-b border-slate-100 flex items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 via-orange-400 to-rose-400 flex items-center justify-center text-slate-950 shadow-md shrink-0">
                  <Compass className="w-5 h-5 text-slate-950" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                      Vismart Project Journey
                    </h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-300">
                      Guided Step {currentStep} of 4
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">
                    Find the exact digital solution for your business in 60 seconds
                  </p>
                </div>
              </div>

              {/* Action buttons: Minimize to side dock & Close */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleCloseToDock}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                  title="Minimize to side icon"
                  aria-label="Minimize popup to side icon"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
                <button
                  onClick={handleCloseToDock}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                  title="Close popup"
                  aria-label="Close popup"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Progress Bar (Crisp Gold Fill) */}
            <div className="w-full bg-slate-100 h-1">
              <div 
                className="bg-gradient-to-r from-amber-500 to-orange-500 h-1 transition-all duration-300"
                style={{ width: `${(currentStep / 4) * 100}%` }}
              ></div>
            </div>

            {/* Body Canvas: Clean White, High Readability, zero eye strain */}
            <div className="flex-1 p-5 sm:p-6 overflow-y-auto space-y-5 bg-white text-slate-800">
              
              {/* ===================================================================
                  STEP 1: PRIMARY GOAL (What are you looking to achieve?)
                  =================================================================== */}
              {currentStep === 1 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="space-y-1">
                    <h4 className="text-sm sm:text-base font-bold text-slate-900">
                      नमस्ते! आप अपने बिज़नेस के लिए क्या बनवाना चाहते हैं?
                    </h4>
                    <p className="text-xs text-slate-500">
                      नीचे से एक विकल्प चुनें ताकि हम आपको सही दिशा और वास्तविक समाधान दिखा सकें:
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {[
                      {
                        title: 'नई वेबसाइट या ऑनलाइन स्टोर',
                        desc: 'Fresh professional website, menu, catalogue or e-commerce shop',
                        icon: Sparkles,
                        color: 'from-amber-500/10 to-orange-500/10 text-amber-700 border-amber-300'
                      },
                      {
                        title: 'पुरानी वेबसाइट को नया बनाना',
                        desc: 'Modern redesign, faster speed, mobile friendly & better conversions',
                        icon: Zap,
                        color: 'from-blue-500/10 to-cyan-500/10 text-blue-700 border-blue-300'
                      },
                      {
                        title: 'मोबाइल ऐप या कस्टम सॉफ्टवेयर',
                        desc: 'Android/iOS app, booking software, CRM, or client portal',
                        icon: Layers,
                        color: 'from-purple-500/10 to-pink-500/10 text-purple-700 border-purple-300'
                      },
                      {
                        title: 'AI ऑटोमेशन व WhatsApp Bot',
                        desc: 'Auto-reply bots, lead capture, WhatsApp orders & smart sales closer',
                        icon: Bot,
                        color: 'from-emerald-500/10 to-teal-500/10 text-emerald-700 border-emerald-300'
                      }
                    ].map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={idx}
                          onClick={() => handleSelectGoal(item.title)}
                          className="group p-4 rounded-2xl border-2 border-slate-200 hover:border-amber-400 bg-white hover:bg-amber-50/40 text-left transition-all duration-200 shadow-sm hover:shadow-md flex flex-col justify-between"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-amber-100 flex items-center justify-center text-slate-800 group-hover:text-amber-700 transition-colors">
                              <Icon className="w-5 h-5" />
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-amber-500 group-hover:translate-x-0.5 transition-all" />
                          </div>
                          <div>
                            <h5 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-amber-900">
                              {item.title}
                            </h5>
                            <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                              {item.desc}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ===================================================================
                  STEP 2: INDUSTRY SELECTION (What is your business category?)
                  =================================================================== */}
              {currentStep === 2 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-slate-900">
                        आपका बिज़नेस किस श्रेणी में आता है?
                      </h4>
                      <p className="text-xs text-slate-500">
                        ताकि हम आपकी इंडस्ट्री का वास्तविक लाइव डेमो और फीचर्स लोड कर सकें:
                      </p>
                    </div>
                    <button
                      onClick={() => setCurrentStep(1)}
                      className="text-xs text-slate-400 hover:text-slate-700 underline font-medium"
                    >
                      ← Back
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
                    {industryIcons.map((ind, idx) => {
                      const Icon = ind.icon;
                      return (
                        <button
                          key={idx}
                          onClick={() => handleSelectIndustry(ind.key)}
                          className="p-3.5 rounded-2xl border-2 border-slate-200 hover:border-amber-400 bg-white hover:bg-amber-50/50 text-center transition-all duration-200 shadow-sm hover:shadow-md flex flex-col items-center justify-center gap-2 group"
                        >
                          <div className="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-amber-100 flex items-center justify-center text-slate-700 group-hover:text-amber-700 transition-colors">
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className="text-xs font-bold text-slate-900 group-hover:text-amber-900">
                            {ind.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ===================================================================
                  STEP 3: VALUE FIRST! (Recommended Solution Card & Benefits)
                  =================================================================== */}
              {currentStep === 3 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-emerald-100 text-emerald-800">
                        Recommended Solution
                      </span>
                    </div>
                    <button
                      onClick={() => setCurrentStep(2)}
                      className="text-xs text-slate-400 hover:text-slate-700 underline font-medium"
                    >
                      ← Change Industry
                    </button>
                  </div>

                  {/* Card with image, title, and benefits */}
                  <div className="rounded-2xl border-2 border-amber-200 bg-amber-50/40 p-4 sm:p-5 space-y-3.5">
                    <div className="flex flex-col sm:flex-row gap-4 items-center">
                      <img 
                        src={selectedNiche.demoImage} 
                        alt={selectedNiche.name}
                        className="w-full sm:w-44 h-28 object-cover rounded-xl shadow-md border border-slate-200" 
                      />
                      <div className="space-y-1 text-center sm:text-left">
                        <h5 className="text-sm sm:text-base font-black text-slate-900">
                          {selectedNiche.name} Digital Platform
                        </h5>
                        <p className="text-xs text-slate-600 leading-snug">
                          {selectedNiche.solution}
                        </p>
                        <div className="pt-1 flex flex-wrap gap-1.5 justify-center sm:justify-start">
                          <span className="px-2 py-0.5 rounded-full bg-white text-slate-700 text-[10px] font-bold border border-slate-200">
                            100% Mobile Fluid
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-white text-slate-700 text-[10px] font-bold border border-slate-200">
                            WhatsApp Sync
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-white text-emerald-700 text-[10px] font-bold border border-slate-200">
                            Fast Delivery
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-amber-200/60 space-y-2">
                      <span className="text-[11px] font-bold uppercase text-amber-900 tracking-wider">
                        Key Business Benefits for you:
                      </span>
                      <ul className="space-y-1.5 text-xs text-slate-700">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span><strong>समस्या का समाधान:</strong> {selectedNiche.painPoint} से मुक्ति</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span><strong>कारोबारी बढ़त:</strong> {selectedNiche.businessImpact}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span><strong>जीरो तकनीकी झंझट:</strong> होस्टिंग, डोमेन, SSL व सुरक्षा सब शामिल</span>
                        </li>
                      </ul>
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row gap-2">
                      <a
                        href="#demos"
                        onClick={handleCloseToDock}
                        className="flex-1 py-2 px-3 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs border border-slate-300 shadow-sm flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <span>View Working Demo on Page</span>
                        <ExternalLink className="w-3.5 h-3.5 text-amber-600" />
                      </a>
                      <button
                        onClick={() => setCurrentStep(4)}
                        className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs hover:brightness-105 shadow-md flex items-center justify-center gap-1.5 transition-all"
                      >
                        <span>Next: Confirm Project Scope →</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* ===================================================================
                  STEP 4: SCOPE & PROJECT BLUEPRINT (Trust-First Confirmation)
                  =================================================================== */}
              {currentStep === 4 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-slate-900">
                        अंतिम कदम: प्रोजेक्ट का दायरा (Scope)
                      </h4>
                      <p className="text-xs text-slate-500">
                        क्या आपके पास पहले से कोई सिस्टम मौजूद है या शून्य से शुरू करना है?
                      </p>
                    </div>
                    <button
                      onClick={() => setCurrentStep(3)}
                      className="text-xs text-slate-400 hover:text-slate-700 underline font-medium"
                    >
                      ← Back
                    </button>
                  </div>

                  <div className="space-y-2">
                    {[
                      {
                        title: 'बिल्कुल नया सिस्टम (Fresh Launch)',
                        desc: 'मुझे डोमेन, डिजाइन, डेवलपमेंट और लॉन्च सब शुरू से चाहिए।'
                      },
                      {
                        title: 'मौजूदा सिस्टम को अपग्रेड करना (Redesign / Upgrade)',
                        desc: 'मेरी पुरानी वेबसाइट या सॉफ्टवेयर है, उसे नया रूप और तेज़ बनाना है।'
                      },
                      {
                        title: 'विशेष सलाह चाहिए (Custom Consultation)',
                        desc: 'मेरी कुछ विशेष ज़रूरतें हैं, मुझे पहले तकनीकी सलाह समझनी है।'
                      }
                    ].map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedScope(opt.title)}
                        className={`w-full p-3.5 rounded-2xl border-2 text-left transition-all flex items-start justify-between ${
                          selectedScope === opt.title 
                            ? 'border-amber-500 bg-amber-50/60 shadow-sm' 
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <div>
                          <h5 className="text-xs sm:text-sm font-bold text-slate-900">
                            {opt.title}
                          </h5>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            {opt.desc}
                          </p>
                        </div>
                        {selectedScope === opt.title && (
                          <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Summary Box */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      <span>आपकी चुनी हुई योजना:</span>
                    </div>
                    <p className="text-slate-600">
                      • <strong>उद्योग:</strong> {selectedNiche.name} | • <strong>प्रकार:</strong> {selectedScope}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      कोई पूर्व-भुगतान या बाध्यता नहीं। अब आप अपना प्रोजेक्ट ब्लूप्रिंट देख सकते हैं।
                    </p>
                  </div>

                  {/* CTA to Open Full Blueprint */}
                  <div className="pt-2">
                    <button
                      onClick={handleOpenFullBlueprint}
                      className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-slate-950 font-black text-xs sm:text-sm shadow-xl shadow-orange-500/25 hover:brightness-105 active:scale-98 transition-all flex items-center justify-center gap-2"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Open Your Project Blueprint & Get Quotation →</span>
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* Modal Footer: Reset, Minimize, Trust Guarantee */}
            <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs shrink-0">
              <button
                onClick={handleResetJourney}
                className="flex items-center gap-1.5 text-slate-500 hover:text-slate-800 transition-colors font-medium"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Start Journey Over</span>
              </button>

              <button
                onClick={handleCloseToDock}
                className="text-slate-500 hover:text-slate-800 font-medium flex items-center gap-1"
              >
                <span>Close to side icon</span>
                <Minimize2 className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>
      )}
    </>
  );
};
