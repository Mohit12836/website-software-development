import React from 'react';
import { 
  Building2, 
  Mail, 
  ShieldCheck, 
  ArrowUp, 
  Globe, 
  Clock, 
  FileText,
  Sparkles
} from 'lucide-react';
import { NICHE_SOLUTIONS } from '../data/agencyData';
import { STUDIO_CONFIG } from '../data/studioConfig';

interface FooterProps {
  currency: 'INR' | 'USD';
  setCurrency: (currency: 'INR' | 'USD') => void;
  onOpenAudit: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  currency,
  setCurrency,
  onOpenAudit
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#060913] text-slate-300 border-t border-white/10 relative overflow-hidden">
      
      {/* Pre-footer Callout Banner */}
      <div className="border-b border-white/10 py-12">
        <div className="container-fluid">
          <div className="rounded-3xl p-8 sm:p-12 animated-glass-card flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-[11px] font-black uppercase tracking-widest text-cyan-400 block mb-1">
                Zero Upfront Risk • Clear Deliverables
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                Ready to Stop Losing Clients to Inefficient Websites?
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm mt-2 max-w-xl">
                Get an objective diagnostic assessment or submit your project brief directly to our engineering desk.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 shrink-0">
              <button
                onClick={onOpenAudit}
                className="bilberrry-btn-glow px-6 py-3.5 rounded-xl text-white font-black text-xs shadow-glow"
              >
                Run Structural Website Check
              </button>
              
              <a
                href={`mailto:${STUDIO_CONFIG.contacts.email}?subject=Website%20Project%20Brief%20Inquiry`}
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-2 border border-white/20 transition-all hover:scale-105 active:scale-95"
              >
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>Email Engineering Desk</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="py-16">
        <div className="container-fluid">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            
            {/* Col 1: Brand & Verified Contact */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-500 flex items-center justify-center text-white font-black text-xl shadow-glow">
                  V
                </div>
                <div>
                  <h4 className="font-extrabold text-base text-white">{STUDIO_CONFIG.name}</h4>
                  <span className="text-[10px] tracking-wider text-amber-400 uppercase font-bold block">
                    Public Digital Services Website
                  </span>
                  <span className="text-[10px] tracking-wider text-slate-400 font-semibold block">
                    {STUDIO_CONFIG.tagline}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                We engineer conversion-driven, 100% fluid auto-fit websites and digital software systems for ambitious businesses.
              </p>

              {/* Verified Contact Details */}
              <div className="pt-2 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Direct Intake: <a href={`mailto:${STUDIO_CONFIG.contacts.email}`} className="text-cyan-400 underline font-semibold">{STUDIO_CONFIG.contacts.email}</a></span>
                </div>

                <div className="flex items-center gap-2 text-slate-300">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Quotation SLA: Official Human-Approved Quotations Issued Within 24 Hours</span>
                </div>
              </div>

              {/* Verified Locations */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                {STUDIO_CONFIG.offices.map((office, idx) => (
                  <div key={idx} className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-semibold text-slate-300 flex items-center gap-1.5">
                    <span>{office.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Col 2: 12 Industry Solutions */}
            <div>
              <h5 className="font-extrabold text-white text-xs uppercase tracking-wider mb-4">
                12 Industry Solutions
              </h5>
              <ul className="space-y-2 text-xs">
                {NICHE_SOLUTIONS.slice(0, 6).map((n) => (
                  <li key={n.id}>
                    <a href="#industries" className="hover:text-white transition-colors">
                      {n.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: More Industries */}
            <div>
              <h5 className="font-extrabold text-white text-xs uppercase tracking-wider mb-4">
                Specialized Niches
              </h5>
              <ul className="space-y-2 text-xs">
                {NICHE_SOLUTIONS.slice(6, 12).map((n) => (
                  <li key={n.id}>
                    <a href="#industries" className="hover:text-white transition-colors">
                      {n.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4: Core Offerings */}
            <div>
              <h5 className="font-extrabold text-white text-xs uppercase tracking-wider mb-4">
                Core Offerings
              </h5>
              <ul className="space-y-2 text-xs">
                <li><a href="#pricing" className="hover:text-white">Starter Landing Page</a></li>
                <li><a href="#pricing" className="hover:text-white">Business Website</a></li>
                <li><a href="#pricing" className="hover:text-white">Growth Lead Engine</a></li>
                <li><a href="#pricing" className="hover:text-white">Online E-Com Store</a></li>
                <li><a href="#pricing" className="hover:text-white">Custom Web Application</a></li>
                <li><a href="#pricing" className="hover:text-white">Monthly Care Retainers</a></li>
              </ul>
            </div>

          </div>

          {/* Bottom Legal & Currency Switcher Bar */}
          <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
            <div>
              © 2026 {STUDIO_CONFIG.name} — Public Digital Services Website. All deliverables backed by official written contracts.
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setCurrency(currency === 'INR' ? 'USD' : 'INR')}
                className="flex items-center gap-1.5 text-slate-300 hover:text-white font-bold"
              >
                <Globe className="w-3.5 h-3.5 text-amber-400" />
                <span>Switch to {currency === 'INR' ? '🇺🇸 USD ($)' : '🇮🇳 INR (₹)'}</span>
              </button>

              <button
                onClick={scrollToTop}
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300"
                title="Scroll to Top"
              >
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </div>

    </footer>
  );
};
