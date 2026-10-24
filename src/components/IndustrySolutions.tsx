import React, { useState } from 'react';
import { 
  UtensilsCrossed, 
  Stethoscope, 
  GraduationCap, 
  Building2, 
  Home, 
  Store, 
  Scissors, 
  Factory, 
  Scale, 
  Wrench, 
  ShoppingBag, 
  Briefcase,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  MessageCircle,
  ExternalLink
} from 'lucide-react';
import { NICHE_SOLUTIONS } from '../data/agencyData';
import type { NicheSolution } from '../data/agencyData';

interface IndustrySolutionsProps {
  currency: 'INR' | 'USD';
  selectedSolution: NicheSolution;
  onSelectSolution: (sol: NicheSolution) => void;
  onOpenConsultation: (nicheName?: string) => void;
}

export const IndustrySolutions: React.FC<IndustrySolutionsProps> = ({
  currency,
  selectedSolution,
  onSelectSolution,
  onOpenConsultation
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'ladder' | 'deliverables'>('overview');

  const getNicheIcon = (iconName: string) => {
    switch (iconName) {
      case 'UtensilsCrossed': return <UtensilsCrossed className="w-5 h-5 text-amber-700" />;
      case 'Stethoscope': return <Stethoscope className="w-5 h-5 text-blue-600" />;
      case 'GraduationCap': return <GraduationCap className="w-5 h-5 text-sky-600" />;
      case 'Building2': return <Building2 className="w-5 h-5 text-indigo-600" />;
      case 'Home': return <Home className="w-5 h-5 text-emerald-600" />;
      case 'Store': return <Store className="w-5 h-5 text-orange-600" />;
      case 'Scissors': return <Scissors className="w-5 h-5 text-pink-600" />;
      case 'Factory': return <Factory className="w-5 h-5 text-slate-700" />;
      case 'Scale': return <Scale className="w-5 h-5 text-amber-800" />;
      case 'Wrench': return <Wrench className="w-5 h-5 text-slate-600" />;
      case 'ShoppingBag': return <ShoppingBag className="w-5 h-5 text-rose-600" />;
      case 'Briefcase': return <Briefcase className="w-5 h-5 text-slate-800" />;
      default: return <Briefcase className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <section id="industries" className="py-20 bg-[#f1f5f9] border-b border-slate-200/80 relative overflow-hidden">
      <div className="container-fluid relative z-10">
        
        {/* Section Header with High Contrast Typography */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-3">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-100 border border-purple-200 text-purple-800 text-xs font-bold uppercase mb-2.5">
              <span>Targeted Business Niches</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              Solutions for <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600">Every Business Industry</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1.5 max-w-2xl font-medium">
              Select your exact business below to explore tailored conversion workflows, deliverables and realistic budgets.
            </p>
          </div>

          <a 
            href="#pricing"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-purple-600 hover:text-purple-700 transition-colors shrink-0"
          >
            <span>View All Packages</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* 12 Industry Selector Tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-12 gap-2.5 mb-10">
          {NICHE_SOLUTIONS.map((niche) => {
            const isSelected = selectedSolution.id === niche.id;
            return (
              <button
                key={niche.id}
                onClick={() => onSelectSolution(niche)}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all duration-200 ${
                  isSelected
                    ? 'border-purple-600 bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/30 scale-105 ring-2 ring-purple-400/40'
                    : 'bg-white border-slate-200/90 hover:border-purple-400 text-slate-700 hover:text-purple-700 hover:shadow-md'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-1.5 ${
                  isSelected ? 'text-white' : 'text-slate-800'
                }`}>
                  {getNicheIcon(niche.icon)}
                </div>
                <span className={`text-[11px] font-black leading-tight block ${
                  isSelected ? 'text-white' : 'text-slate-800'
                }`}>
                  {niche.name.split(' & ')[0]}
                </span>
                <span className={`text-[10px] leading-tight block mt-0.5 ${
                  isSelected ? 'text-purple-100 font-medium' : 'text-slate-500'
                }`}>
                  {niche.name.split(' & ')[1] || niche.hindiName}
                </span>
              </button>
            );
          })}
        </div>

        {/* Detailed Industry Deep-Dive Card (Black Obsidian Animated Glass Card) */}
        <div className="rounded-3xl p-6 sm:p-8 animated-glass-card relative overflow-hidden">
          
          {/* Top Bar of the Deep Dive */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-5 border-b border-white/10 gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 text-[11px] font-bold">
                  {selectedSolution.badgeText}
                </span>
                <span className="text-xs font-semibold text-slate-300">
                  Targeted Business Solution
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
                {selectedSolution.name} <span className="text-cyan-400 font-bold text-xl">({selectedSolution.hindiName})</span>
              </h3>
            </div>

            {/* Budget Badge + CTA */}
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 rounded-xl bg-slate-900/90 border border-white/15 text-right shadow-inner">
                <span className="text-[10px] font-bold text-cyan-400 block uppercase tracking-wider">
                  Proposed Scope Budget
                </span>
                <span className="text-base sm:text-xl font-black text-white">
                  {currency === 'INR' ? selectedSolution.indiaBudget : selectedSolution.usaBudget}
                </span>
              </div>

              <button
                onClick={() => onOpenConsultation(selectedSolution.name)}
                className="bilberrry-btn-glow px-5 py-3 rounded-xl text-white font-extrabold text-xs shadow-glow"
              >
                Request Custom Quote
              </button>
            </div>
          </div>

          {/* Nav Tabs for Deep Dive */}
          <div className="flex border-b border-white/10 my-5 gap-6">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-2.5 text-xs font-black uppercase tracking-wider transition-all ${
                activeTab === 'overview'
                  ? 'border-b-2 border-cyan-400 text-cyan-400'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              1. Problem & Business Solution
            </button>
            <button
              onClick={() => setActiveTab('ladder')}
              className={`pb-2.5 text-xs font-black uppercase tracking-wider transition-all ${
                activeTab === 'ladder'
                  ? 'border-b-2 border-cyan-400 text-cyan-400'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              2. Three-Tier Value Ladder (Level 1 → 3)
            </button>
            <button
              onClick={() => setActiveTab('deliverables')}
              className={`pb-2.5 text-xs font-black uppercase tracking-wider transition-all ${
                activeTab === 'deliverables'
                  ? 'border-b-2 border-cyan-400 text-cyan-400'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              3. Deliverables & Business ROI
            </button>
          </div>

          {/* Tab 1: Overview */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-7 space-y-4">
                
                {/* Pain Point */}
                <div className="p-4 rounded-2xl bg-rose-950/50 border border-rose-500/40">
                  <div className="flex items-center gap-1.5 text-rose-400 text-xs font-black uppercase tracking-wider mb-1">
                    <AlertCircle className="w-4 h-4 text-rose-400" />
                    <span>ग्राहक की वास्तविक परेशानी (Real Pain Point)</span>
                  </div>
                  <p className="text-xs sm:text-sm text-rose-100 font-semibold leading-relaxed">
                    "{selectedSolution.painPoint}"
                  </p>
                </div>

                {/* Business Impact */}
                <div className="p-4 rounded-2xl bg-amber-950/50 border border-amber-500/40">
                  <div className="flex items-center gap-1.5 text-amber-400 text-xs font-black uppercase tracking-wider mb-1">
                    <TrendingUp className="w-4 h-4 text-amber-400" />
                    <span>बिज़नेस का नुकसान (Real Revenue Leak)</span>
                  </div>
                  <p className="text-xs sm:text-sm text-amber-100 font-medium leading-relaxed">
                    {selectedSolution.businessImpact}
                  </p>
                </div>

                {/* Our Solution */}
                <div className="p-4 rounded-2xl bg-emerald-950/50 border border-emerald-500/40">
                  <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-black uppercase tracking-wider mb-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Vismart Studio का डायरेक्ट समाधान</span>
                  </div>
                  <p className="text-xs sm:text-sm text-white font-black leading-relaxed">
                    {selectedSolution.solution}
                  </p>
                </div>

              </div>

              {/* Right Image Preview */}
              <div className="lg:col-span-5">
                <div className="rounded-2xl overflow-hidden border border-white/20 bg-slate-950 relative shadow-2xl group">
                  <img
                    src={selectedSolution.demoImage}
                    alt={selectedSolution.name}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent p-5 flex flex-col justify-end text-white">
                    <span className="text-[10px] font-black text-cyan-400 uppercase tracking-wider">Live Prototype</span>
                    <h4 className="text-base font-black mt-0.5 text-white">{selectedSolution.name} Demo</h4>
                    <p className="text-xs text-slate-300 mt-1">{selectedSolution.businessValue}</p>
                    
                    <div className="mt-3.5 flex gap-2">
                      <a
                        href="#demos"
                        className="flex-1 py-2 px-3 rounded-xl bg-white text-slate-950 text-xs font-black flex items-center justify-center gap-1 hover:bg-slate-200 transition-colors shadow-md"
                      >
                        <span>View Concept Prototype</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      
                      <button
                        onClick={() => onOpenConsultation(selectedSolution.name)}
                        className="py-2 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 text-xs font-black flex items-center justify-center gap-1 shadow-md transition-all hover:brightness-105"
                      >
                        <span>Discuss Brief</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Three-Tier Value Ladder */}
          {activeTab === 'ladder' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="p-6 rounded-2xl bg-slate-900/90 border border-white/15 flex flex-col justify-between text-white">
                <div>
                  <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">Level 1 • Foundation</span>
                  <h4 className="text-base font-black text-white mt-1">{selectedSolution.level1.title}</h4>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">{selectedSolution.level1.desc}</p>
                </div>
                <div className="mt-5 pt-4 border-t border-white/10 flex justify-between items-center text-xs">
                  <span className="text-slate-400">Starting Scope</span>
                  <strong className="text-cyan-400 font-black text-sm">{currency === 'INR' ? selectedSolution.level1.priceINR : selectedSolution.level1.priceUSD}</strong>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-b from-purple-950/70 via-slate-900 to-slate-950 border-2 border-purple-400 flex flex-col justify-between relative shadow-xl text-white">
                <span className="absolute -top-3 left-4 px-3 py-0.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[10px] font-black uppercase tracking-wider shadow-md">
                  Recommended Sweet Spot
                </span>
                <div>
                  <span className="text-[10px] font-bold text-fuchsia-400 uppercase tracking-wider block">Level 2 • Automated Engine</span>
                  <h4 className="text-base font-black text-white mt-1">{selectedSolution.level2.title}</h4>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">{selectedSolution.level2.desc}</p>
                </div>
                <div className="mt-5 pt-4 border-t border-white/10 flex justify-between items-center text-xs">
                  <span className="text-purple-300 font-bold">Standard Build</span>
                  <strong className="text-fuchsia-400 font-black text-sm">{currency === 'INR' ? selectedSolution.level2.priceINR : selectedSolution.level2.priceUSD}</strong>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/90 border border-white/15 flex flex-col justify-between text-white">
                <div>
                  <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">Level 3 • Full Business OS</span>
                  <h4 className="text-base font-black text-white mt-1">{selectedSolution.level3.title}</h4>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">{selectedSolution.level3.desc}</p>
                </div>
                <div className="mt-5 pt-4 border-t border-white/10 flex justify-between items-center text-xs">
                  <span className="text-slate-400">Custom Enterprise</span>
                  <strong className="text-cyan-400 font-black text-sm">{currency === 'INR' ? selectedSolution.level3.priceINR : selectedSolution.level3.priceUSD}</strong>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Deliverables */}
          {activeTab === 'deliverables' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white">
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-cyan-400 mb-3">Included Deliverables</h4>
                <ul className="space-y-3">
                  {selectedSolution.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                      <span className="w-4 h-4 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                        ✓
                      </span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/90 border border-white/15 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">Business Impact Guarantee</span>
                  <h4 className="text-base sm:text-lg font-black text-white mt-1.5">{selectedSolution.businessValue}</h4>
                </div>
                <button
                  onClick={() => onOpenConsultation(selectedSolution.name)}
                  className="bilberrry-btn-glow mt-6 py-3 rounded-xl text-white font-black text-xs shadow-glow"
                >
                  Get Proposal for {selectedSolution.name}
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
