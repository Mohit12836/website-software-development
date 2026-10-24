import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Check, 
  MessageCircle, 
  Zap, 
  Search, 
  Store, 
  UtensilsCrossed, 
  Stethoscope, 
  Briefcase, 
  GraduationCap, 
  Building2,
  CheckCircle2
} from 'lucide-react';
import { NICHE_SOLUTIONS } from '../data/agencyData';
import type { NicheSolution } from '../data/agencyData';

interface AiRecommendationWidgetProps {
  currency: 'INR' | 'USD';
  onSelectSolution: (solution: NicheSolution) => void;
  onOpenConsultation?: (solTitle: string) => void;
}

export const AiRecommendationWidget: React.FC<AiRecommendationWidgetProps> = ({
  currency,
  onSelectSolution,
  onOpenConsultation
}) => {
  // Step 1: Selected Business
  const [selectedNicheId, setSelectedNicheId] = useState<string>('restaurant');
  
  // Step 2: What do you want to improve?
  const [selectedGoal, setSelectedGoal] = useState<'leads' | 'sales' | 'automation'>('leads');

  // Custom AI Search
  const [customInput, setCustomInput] = useState('');

  const businessTypes = [
    { id: 'retail', name: 'Retail / Kirana Shop', icon: Store },
    { id: 'restaurant', name: 'Restaurant / Cafe', icon: UtensilsCrossed },
    { id: 'clinic', name: 'Clinic / Healthcare', icon: Stethoscope },
    { id: 'services', name: 'Service Business / Contractor', icon: Briefcase },
    { id: 'coaching', name: 'Coaching / Education', icon: GraduationCap },
    { id: 'manufacturing', name: 'B2B / Wholesaler', icon: Building2 },
  ];

  const goals = [
    {
      id: 'leads',
      label: 'ऑनलाइन पहचान और Enquiries',
      subtext: 'वेबसाइट, गूगल मैप्स और व्हाट्सएप पर नई लीड्स पाना'
    },
    {
      id: 'sales',
      label: 'ऑनलाइन बिक्री या Bookings',
      subtext: 'डिजिटल मेनू, अपॉइंटमेंट्स और रेज़रपे/स्ट्राइप डायरेक्ट पेमेंट'
    },
    {
      id: 'automation',
      label: 'Business Management और AI Automation',
      subtext: 'ऑटो व्हाट्सएप फॉलो-अप, लीड ट्रैकिंग और कस्टम CRM'
    }
  ];

  // Find corresponding niche solution from data
  const currentSolution = NICHE_SOLUTIONS.find(n => n.id === selectedNicheId) || NICHE_SOLUTIONS[0];

  // Calculate tailored recommendation based on goal
  const getTailoredPlan = () => {
    if (selectedGoal === 'leads') {
      return {
        level: 'Starter / Business Level',
        title: currentSolution.level1.title,
        priceInr: currentSolution.level1.priceINR,
        priceUsd: currentSolution.level1.priceUSD,
        features: currentSolution.deliverables,
        timeline: '3 से 5 कार्य दिवस'
      };
    } else if (selectedGoal === 'sales') {
      return {
        level: 'Growth Level (Recommended)',
        title: currentSolution.level2.title,
        priceInr: currentSolution.level2.priceINR,
        priceUsd: currentSolution.level2.priceUSD,
        features: currentSolution.deliverables,
        timeline: '7 से 10 कार्य दिवस'
      };
    } else {
      return {
        level: 'Scale / Custom Automation Level',
        title: currentSolution.level3.title,
        priceInr: currentSolution.level3.priceINR,
        priceUsd: currentSolution.level3.priceUSD,
        features: currentSolution.deliverables,
        timeline: '12 से 18 कार्य दिवस'
      };
    }
  };

  const tailoredPlan = getTailoredPlan();

  return (
    <section id="solution-finder" className="py-20 bg-[#ffffff] border-b border-slate-200">
      <div className="container-fluid">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-100 border border-cyan-300 text-cyan-900 text-xs font-black uppercase tracking-wider mb-3">
            <Sparkles className="w-4 h-4 text-cyan-700" />
            <span>Interactive Business Solutions Advisor</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
            Vismart Smart Solution Finder
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            अपना बिज़नेस और मुख्य जरूरत चुनें। नीचे उसी के हिसाब से मिलने वाला संभावित समाधान, डिलीवरी समय और बजट तुरंत देखें।
          </p>
        </div>

        {/* The 2-Step Interactive Selector Container (Obsidian Glass Card on Light Canvas) */}
        <div className="max-w-5xl mx-auto animated-glass-card rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: 2-Step Interactive Picker (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Step 1: Select Your Business */}
              <div>
                <label className="flex items-center gap-2 text-xs font-black text-amber-400 uppercase tracking-wider mb-3">
                  <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center text-[10px]">1</span>
                  <span>Select Your Business (अपना बिज़नेस चुनें):</span>
                </label>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {businessTypes.map((biz) => {
                    const Icon = biz.icon;
                    const isSelected = selectedNicheId === biz.id;
                    return (
                      <button
                        key={biz.id}
                        onClick={() => setSelectedNicheId(biz.id)}
                        className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all ${
                          isSelected 
                            ? 'bg-amber-400/20 border-amber-400 text-white shadow-lg shadow-amber-400/20 scale-102' 
                            : 'bg-slate-900/80 border-white/10 hover:border-white/30 text-slate-300 hover:text-white'
                        }`}
                      >
                        <Icon className={`w-5 h-5 mb-1.5 ${isSelected ? 'text-amber-400' : 'text-slate-400'}`} />
                        <span className="text-[11px] font-bold leading-tight">{biz.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: What do you want to improve? */}
              <div>
                <label className="flex items-center gap-2 text-xs font-black text-cyan-400 uppercase tracking-wider mb-3">
                  <span className="w-5 h-5 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center text-[10px]">2</span>
                  <span>What Do You Want To Improve? (आप क्या सुधारना चाहते हैं?):</span>
                </label>

                <div className="space-y-2">
                  {goals.map((g) => {
                    const isSelected = selectedGoal === g.id;
                    return (
                      <button
                        key={g.id}
                        onClick={() => setSelectedGoal(g.id as any)}
                        className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition-all ${
                          isSelected 
                            ? 'bg-cyan-950/60 border-cyan-400 text-white shadow-md' 
                            : 'bg-slate-900/60 border-white/10 hover:border-white/25 text-slate-300'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center shrink-0 ${
                            isSelected ? 'border-cyan-400 bg-cyan-400 text-slate-950' : 'border-slate-500'
                          }`}>
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <div>
                            <span className="text-xs sm:text-sm font-bold block text-white">{g.label}</span>
                            <span className="text-[11px] text-slate-400 block mt-0.5">{g.subtext}</span>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-cyan-400 shrink-0 ml-2">✓</span>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Right Column: Instant Live Recommendation Card (5 cols) */}
            <div className="lg:col-span-5 bg-gradient-to-b from-slate-900/95 to-slate-950 p-6 rounded-2xl border border-white/15 shadow-2xl flex flex-col justify-between text-white relative">
              
              <div>
                {/* Badge & Level */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-400 fill-current" />
                    <span>Vismart Suggested Solution</span>
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                    {tailoredPlan.level}
                  </span>
                </div>

                {/* Solution Title */}
                <h3 className="text-lg sm:text-xl font-black text-white leading-tight">
                  {tailoredPlan.title}
                </h3>

                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  {currentSolution.solution}
                </p>

                {/* Transparent Budget Box */}
                <div className="mt-4 p-4 rounded-xl bg-slate-950/80 border border-white/10">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Estimated One-Time Quotation Range:
                  </span>
                  <div className="text-2xl sm:text-3xl font-black text-amber-400 mt-1">
                    {currency === 'INR' ? tailoredPlan.priceInr : tailoredPlan.priceUsd}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-2">
                    <span>⏱️ Delivery: <strong>{tailoredPlan.timeline}</strong></span>
                    <span>•</span>
                    <span>100% Code Ownership</span>
                  </div>
                </div>

                {/* Included Deliverables */}
                <div className="mt-4">
                  <span className="text-[11px] font-bold uppercase text-slate-400 tracking-wider block mb-2">
                    Key Deliverables Included:
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-200">
                    {tailoredPlan.features.slice(0, 4).map((feat: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-tight">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-2.5">
                <button
                  onClick={() => onSelectSolution(currentSolution)}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white font-black text-xs hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-orange-500/25"
                >
                  <span>Discuss This Blueprint</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
