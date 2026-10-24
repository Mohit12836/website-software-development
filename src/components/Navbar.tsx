import React, { useState } from 'react';
import { 
  Globe, 
  Menu, 
  X, 
  ChevronDown, 
  Search, 
  ArrowRight
} from 'lucide-react';

interface NavbarProps {
  currency: 'INR' | 'USD';
  setCurrency: (c: 'INR' | 'USD') => void;
  isDark: boolean;
  setIsDark: (dark: boolean) => void;
  onOpenConsultation: () => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currency,
  setCurrency,
  onOpenConsultation,
  onOpenSearch
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full transition-colors duration-300">
      {/* 1. Golden Navbar Strip ("golen navbar strip") */}
      <div className="golden-navbar-strip w-full py-1.5 px-4 text-center font-black text-[11px] sm:text-xs text-slate-950 flex items-center justify-center gap-2 tracking-wider shadow-sm select-none">
        <span className="inline-block w-2 h-2 rounded-full bg-slate-950 animate-ping"></span>
        <span>
          ⚡ <strong>2026 DIRECT PRICING LIVE:</strong> Transparent Quotations • ₹0 Advance Scoping Call • 100% On-Time Delivery
        </span>
        <span className="hidden sm:inline text-slate-900/80 font-bold">• 24/7 Priority Support</span>
      </div>

      {/* Main Glass Navbar Bar */}
      <div className="w-full bg-[#060913]/90 backdrop-blur-2xl border-b border-white/10">
        <div className="container-fluid">
          <div className="flex items-center justify-between h-20 gap-4">
            
            {/* Brand Logo - Vibrant Vismart Studio V */}
            <a href="#" className="flex items-center gap-3 shrink-0 group">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-500 flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-orange-500/30 group-hover:scale-105 transition-transform duration-300">
                <span className="italic font-extrabold tracking-tighter">V</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-[17px] tracking-tight text-white leading-tight">
                    Vismart Studio
                  </span>
                  <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    Public Digital Services
                  </span>
                </div>
                <span className="text-[10px] font-semibold tracking-wider text-slate-400">
                  Websites • Apps • AI Automation
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-6 text-[13px] font-semibold text-slate-300">
              <a 
                href="#" 
                className="text-white font-bold relative py-1 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-amber-400 after:via-cyan-400 after:to-emerald-400 after:shadow-[0_0_8px_#38bdf8]"
              >
                Home
              </a>
              
              <a href="#solution-finder" className="hover:text-amber-400 transition-colors">
                Solution Finder
              </a>

              <a href="#demos" className="hover:text-cyan-400 transition-colors">
                Live Demos
              </a>

              <a href="#pricing" className="hover:text-cyan-400 transition-colors">
                Pricing
              </a>

              <a href="#industries" className="hover:text-cyan-400 transition-colors">
                By Industry
              </a>

              <a href="#audit" className="hover:text-cyan-400 transition-colors">
                Free Diagnostic
              </a>

              <a href="#case-studies" className="hover:text-cyan-400 transition-colors">
                Before / After Proof
              </a>

              <a href="#process" className="hover:text-cyan-400 transition-colors">
                How It Works
              </a>
            </nav>

            {/* Right Action Bar (Search Pill + Currency + Black Glass Rotating Border Button) */}
            <div className="hidden md:flex items-center gap-3 shrink-0">
              
              {/* Pill Search Input with Black Glass Finish */}
              <div 
                onClick={onOpenSearch}
                className="flex items-center gap-2 px-3.5 py-2 rounded-full border border-white/10 bg-black/40 hover:bg-black/60 text-slate-400 text-xs cursor-pointer w-48 lg:w-56 transition-all shadow-inner hover:border-amber-400/40"
              >
                <Search className="w-3.5 h-3.5 text-amber-400" />
                <span className="truncate">Search service or industry...</span>
              </div>

              {/* Currency Selector (INR vs USD) */}
              <div className="relative">
                <button
                  onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold border border-white/10 bg-black/40 text-slate-200 hover:border-amber-400/50 hover:bg-black/60 transition-all shadow-inner"
                >
                  <Globe className="w-3.5 h-3.5 text-amber-400" />
                  <span>{currency === 'INR' ? 'INR (₹)' : 'USD ($)'}</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {currencyDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-36 rounded-xl bg-slate-900 border border-white/10 shadow-2xl py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
                    <button
                      onClick={() => { setCurrency('INR'); setCurrencyDropdownOpen(false); }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-left transition-colors ${
                        currency === 'INR' ? 'bg-amber-500/20 text-amber-300' : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <span>🇮🇳 INR (₹)</span>
                      {currency === 'INR' && <span className="text-amber-400 font-bold">✓</span>}
                    </button>
                    <button
                      onClick={() => { setCurrency('USD'); setCurrencyDropdownOpen(false); }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-left transition-colors ${
                        currency === 'USD' ? 'bg-amber-500/20 text-amber-300' : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <span>🇺🇸 USD ($)</span>
                      {currency === 'USD' && <span className="text-amber-400 font-bold">✓</span>}
                    </button>
                  </div>
                )}
              </div>

              {/* Top Black Glass Button with Continuous Rotating Border Light ("Upar black kanch jaisa button, border par light ghumti hui") */}
              <button
                onClick={onOpenConsultation}
                className="black-glass-btn-orbit group"
                aria-label="Get Free Consultation"
              >
                <span className="btn-glass-inner">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_#fbbf24]"></span>
                  <span className="text-white group-hover:text-amber-200 transition-colors">Get Free Consultation</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </button>
            </div>

            {/* Mobile Menu & Currency Trigger */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={() => setCurrency(currency === 'INR' ? 'USD' : 'INR')}
                className="px-2.5 py-1.5 rounded-lg text-xs font-bold border border-white/10 bg-black/40 text-slate-200"
              >
                {currency === 'INR' ? '₹ INR' : '$ USD'}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-300 hover:bg-slate-800"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Golden Hairline Under Navbar */}
        <div className="golden-hairline h-[1.5px] w-full"></div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/10 bg-[#060913]/98 backdrop-blur-2xl px-6 py-5 flex flex-col gap-3 text-sm font-semibold shadow-2xl animate-in slide-in-from-top-4 duration-200">
          <a href="#" onClick={() => setMobileMenuOpen(false)} className="text-amber-400 font-bold">
            Home
          </a>
          <a href="#solution-finder" onClick={() => setMobileMenuOpen(false)} className="text-slate-200 hover:text-amber-400">
            Solution Finder
          </a>
          <a href="#demos" onClick={() => setMobileMenuOpen(false)} className="text-slate-200 hover:text-cyan-400">
            Live Demo Showroom
          </a>
          <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="text-slate-200 hover:text-cyan-400">
            Pricing Packages
          </a>
          <a href="#industries" onClick={() => setMobileMenuOpen(false)} className="text-slate-200 hover:text-cyan-400">
            Industry Solutions
          </a>
          <a href="#audit" onClick={() => setMobileMenuOpen(false)} className="text-slate-200 hover:text-cyan-400">
            Free Diagnostic
          </a>
          <a href="#case-studies" onClick={() => setMobileMenuOpen(false)} className="text-slate-200 hover:text-cyan-400">
            Before / After Proof
          </a>
          <a href="#process" onClick={() => setMobileMenuOpen(false)} className="text-slate-200 hover:text-cyan-400">
            How It Works
          </a>
          <div className="pt-2">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenConsultation(); }}
              className="black-glass-btn-orbit w-full"
            >
              <span className="btn-glass-inner w-full justify-center py-3 text-xs">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                <span>Get Free Consultation</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
              </span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
