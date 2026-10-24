import React, { useState } from 'react';
import { 
  Check, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  RotateCcw, 
  Info,
  Layers,
  HelpCircle
} from 'lucide-react';
import { CORE_PACKAGES, CARE_RETAINERS, PackagePlan, CarePlan } from '../data/agencyData';

interface PricingPackagesProps {
  currency: 'INR' | 'USD';
  onSelectPackage: (pkgName: string) => void;
}

export const PricingPackages: React.FC<PricingPackagesProps> = ({
  currency,
  onSelectPackage
}) => {
  const [pricingMode, setPricingMode] = useState<'build' | 'care'>('build');

  return (
    <section id="pricing" className="py-24 bg-[#f1f5f9] relative overflow-hidden border-b border-slate-200/80">
      <div className="container-fluid relative z-10">
        
        {/* Section Header with High Contrast Typography */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 border border-blue-200 text-blue-800 text-xs font-bold uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Transparent & Honest Investment</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Compare Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">Proposed Packages</span>
          </h2>
          
          <p className="mt-3 text-sm sm:text-base text-slate-600 font-medium">
            Current Currency: <strong className="text-blue-600">{currency === 'INR' ? '🇮🇳 India (INR ₹)' : '🇺🇸 USA (USD $)'}</strong>. Switch anytime from the top bar.
          </p>

          {/* Pricing Toggle: One-Time Build vs Monthly Care Plans */}
          <div className="mt-8 inline-flex p-1.5 rounded-2xl bg-white border border-slate-200/90 shadow-md">
            <button
              onClick={() => setPricingMode('build')}
              className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                pricingMode === 'build'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              One-Time Development Builds (5 Packages)
            </button>
            <button
              onClick={() => setPricingMode('care')}
              className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                pricingMode === 'care'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Website Care & Growth Retainers (Monthly)
            </button>
          </div>
        </div>

        {/* MODE 1: One-Time Build Packages */}
        {pricingMode === 'build' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {CORE_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className={`animated-glass-card rounded-2xl p-6 flex flex-col justify-between relative ${
                  pkg.popular ? 'ring-2 ring-cyan-400/80 shadow-2xl xl:-translate-y-2' : ''
                }`}
              >
                {pkg.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-cyan-500 to-fuchsia-600 text-white text-[10px] font-black uppercase tracking-wider shadow-lg z-20">
                    Most Popular Choice
                  </span>
                )}

                <div>
                  <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider block">
                    One-Time Build
                  </span>
                  
                  <h3 className="text-lg font-black text-white mt-1">
                    {pkg.name}
                  </h3>
                  
                  <p className="text-xs text-slate-300 mt-1 min-h-[32px]">
                    {pkg.tagline}
                  </p>

                  {/* Price */}
                  <div className="mt-4 pb-4 border-b border-white/10">
                    <span className="text-xl sm:text-2xl font-black text-white block tracking-tight">
                      {currency === 'INR' ? pkg.priceINR : pkg.priceUSD}
                    </span>
                    <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-400">
                      <span className="flex items-center gap-1 font-semibold text-cyan-300">
                        <Clock className="w-3 h-3 text-cyan-400" />
                        {pkg.timeline}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 font-semibold text-purple-300">
                        <RotateCcw className="w-3 h-3 text-purple-400" />
                        {pkg.revisions}
                      </span>
                    </div>
                  </div>

                  {/* Feature checklist */}
                  <ul className="mt-5 space-y-2.5">
                    {pkg.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-200">
                        <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-500/30">
                          <Check className="w-2.5 h-2.5 font-bold" />
                        </div>
                        <span className="leading-tight">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom CTA */}
                <div className="mt-6 pt-4 border-t border-white/10">
                  <button
                    onClick={() => onSelectPackage(pkg.name)}
                    className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                      pkg.popular
                        ? 'bilberrry-btn-glow text-white font-extrabold'
                        : 'bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-white/10'
                    }`}
                  >
                    <span>{pkg.ctaText}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* MODE 2: Monthly Care Retainers */}
        {pricingMode === 'care' && (
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {CARE_RETAINERS.map((plan) => (
              <div
                key={plan.id}
                className={`animated-glass-card rounded-2xl p-8 flex flex-col justify-between relative ${
                  plan.popular ? 'ring-2 ring-cyan-400/80 shadow-2xl' : ''
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-cyan-500 to-fuchsia-600 text-white text-[10px] font-black uppercase tracking-wider shadow-lg z-20">
                    Recommended Monthly Retainer
                  </span>
                )}

                <div>
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">
                    Ongoing Growth Plan
                  </span>
                  
                  <h3 className="text-2xl font-black text-white mt-1">
                    {plan.name}
                  </h3>
                  
                  <p className="text-xs text-slate-300 mt-2">
                    {plan.description}
                  </p>

                  <div className="mt-6 pb-6 border-b border-white/10">
                    <span className="text-3xl font-black text-white block">
                      {currency === 'INR' ? plan.priceINR : plan.priceUSD}
                    </span>
                    <span className="text-xs text-cyan-300 font-semibold">{plan.frequency}</span>
                  </div>

                  <ul className="mt-6 space-y-3">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4 border-t border-white/10">
                  <button
                    onClick={() => onSelectPackage(`Retainer: ${plan.name}`)}
                    className="w-full py-3 rounded-xl bilberrry-btn-glow text-white font-extrabold text-xs shadow-glow hover:opacity-95"
                  >
                    Subscribe to {plan.name}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Third-Party Transparency Box */}
        <div className="mt-12 max-w-4xl mx-auto p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-start gap-3.5 text-xs text-slate-700">
          <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="text-slate-900 block mb-1">
              Third-Party Fee Transparency Guarantee:
            </strong>
            Domain registrations, cloud hosting server costs (e.g. AWS, Vercel, Hostinger), Shopify monthly subscriptions, Meta WhatsApp Business conversation fees, and payment gateway transaction fees (e.g. 2% Razorpay / 2.9% Stripe) are billed directly by the providers or at actuals. Vismart Studio charges strictly for design, software engineering, automation architecture, and maintenance.
          </div>
        </div>

      </div>
    </section>
  );
};
