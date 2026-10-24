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
    <header className="sticky top-0 z-50 w-full transition-colors duration-300 bg-[#060913]/95 backdrop-blur-2xl">
      {/* 1. Golden Navbar Announcement Strip (100% Fluid & Auto-fit) */}
      <div className="golden-navbar-strip w-full py-1 px-3 sm:px-4 text-center font-bold text-[10px] sm:text-xs text-slate-950 flex items-center justify-center gap-1.5 sm:gap-2 shadow-sm select-none overflow-hidden">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-slate-950 animate-ping shrink-0"></span>
        <span className="truncate">
          ⚡ <strong>2026 DIRECT PRICING LIVE:</strong> Transparent Quotes • ₹0 Scoping Call
        </span>
        <span className="hidden md:inline text-slate-950/80 font-bold">• 100% On-Time Delivery</span>
        <span className="hidden xl:inline text-slate-950/80 font-bold">• 24/7 Priority Support</span>
      </div>

      {/* Main Glass Navbar Bar */}
      <div className="w-full border-b border-white/10">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
            
            {/* Brand Logo - Compact, Auto-Fit */}
            <a href="#" className="flex items-center gap-2 sm:gap-2.5 shrink-0 group">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-500 flex items-center justify-center text-white font-black text-xl shadow-md group-hover:scale-105 transition-transform shrink-0">
                <span className="italic font-extrabold tracking-tighter">V</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-sm sm:text-base tracking-tight text-white leading-tight">
                    Vismart Studio
                  </span>
                  <span className="hidden 2xl:inline-block px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    Public Digital Services
                  </span>
                </div>
                <span className="hidden sm:block text-[9px] sm:text-[10px] font-semibold tracking-wider text-slate-400">
                  Websites • Apps • AI Automation
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links (Compact 6 Core Links - Visible on XL+) */}
            <nav className="hidden xl:flex items-center gap-4 lg:gap-5 text-xs lg:text-[13px] font-semibold text-slate-300">
              <a href="#solution-finder" className="hover:text-amber-400 transition-colors py-1">
                Solution Finder
              </a>
              <a href="#demos" className="hover:text-cyan-400 transition-colors py-1">
                Live Demos
              </a>
              <a href="#pricing" className="hover:text-cyan-400 transition-colors py-1">
                Pricing
              </a>
              <a href="#industries" className="hover:text-cyan-400 transition-colors py-1">
                Industries
              </a>
              <a href="#case-studies" className="hover:text-cyan-400 transition-colors py-1">
                Before / After
              </a>
              <a href="#process" className="hover:text-cyan-400 transition-colors py-1">
                How It Works
              </a>
            </nav>

            {/* Right Action Bar (Search + Currency + Black Glass Button) */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              
              {/* Search: Icon on tablet, pill on large screens */}
              <button 
                onClick={onOpenSearch}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full border border-white/10 bg-black/40 hover:bg-black/60 text-slate-400 text-xs transition-colors shadow-inner hover:border-amber-400/40 shrink-0"
                aria-label="Search services"
              >
                <Search className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="hidden 2xl:inline text-[11px] truncate max-w-[80px]">Search...</span>
              </button>

              {/* Currency Selector (Compact Pill) */}
              <div className="relative shrink-0">
                <button
                  onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[11px] font-bold border border-white/10 bg-black/40 text-slate-200 hover:border-amber-400/50 hover:bg-black/60 transition-all shadow-inner shrink-0"
                >
                  <Globe className="w-3 h-3 text-amber-400 shrink-0" />
                  <span>{currency === 'INR' ? '₹ INR' : '$ USD'}</span>
                  <ChevronDown className="w-2.5 h-2.5 text-slate-400 shrink-0" />
                </button>

                {currencyDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-32 rounded-xl bg-slate-900 border border-white/10 shadow-2xl py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
                    <button
                      onClick={() => { setCurrency('INR'); setCurrencyDropdownOpen(false); }}
                      className={`w-full flex items-center justify-between px-3 py-1.5 text-xs font-semibold text-left transition-colors ${
                        currency === 'INR' ? 'bg-amber-500/20 text-amber-300' : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <span>🇮🇳 ₹ INR</span>
                      {currency === 'INR' && <span className="text-amber-400 font-bold">✓</span>}
                    </button>
                    <button
                      onClick={() => { setCurrency('USD'); setCurrencyDropdownOpen(false); }}
                      className={`w-full flex items-center justify-between px-3 py-1.5 text-xs font-semibold text-left transition-colors ${
                        currency === 'USD' ? 'bg-amber-500/20 text-amber-300' : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <span>🇺🇸 $ USD</span>
                      {currency === 'USD' && <span className="text-amber-400 font-bold">✓</span>}
                    </button>
                  </div>
                )}
              </div>

              {/* Black Glass Button with Continuous Rotating Border Light (Visible on md+) */}
              <div className="hidden sm:block shrink-0">
                <button
                  onClick={onOpenConsultation}
                  className="black-glass-btn-orbit group"
                  aria-label="Free Consultation"
                >
                  <span className="btn-glass-inner">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shadow-[0_0_6px_#fbbf24] shrink-0"></span>
                    <span className="text-white group-hover:text-amber-200 transition-colors">Free Consultation</span>
                    <ArrowRight className="w-3 h-3 text-amber-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
                  </span>
                </button>
              </div>

              {/* Mobile / Tablet Menu Toggle Button (Visible on < xl) */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors shrink-0"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-amber-400" /> : <Menu className="w-5 h-5" />}
              </button>

            </div>

          </div>
        </div>

        {/* Golden Hairline Under Navbar */}
        <div className="golden-hairline h-[1.5px] w-full"></div>
      </div>

      {/* Mobile Drawer (Zero-Breakage & Clean) */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-b border-white/10 bg-[#060913]/98 backdrop-blur-2xl px-5 py-4 flex flex-col gap-2.5 text-sm font-semibold shadow-2xl animate-in slide-in-from-top-4 duration-200">
          <a href="#" onClick={() => setMobileMenuOpen(false)} className="text-amber-400 font-bold py-1">
            Home
          </a>
          <a href="#solution-finder" onClick={() => setMobileMenuOpen(false)} className="text-slate-200 hover:text-amber-400 py-1">
            Solution Finder
          </a>
          <a href="#demos" onClick={() => setMobileMenuOpen(false)} className="text-slate-200 hover:text-cyan-400 py-1">
            Live Demo Showroom
          </a>
          <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="text-slate-200 hover:text-cyan-400 py-1">
            Pricing Packages
          </a>
          <a href="#industries" onClick={() => setMobileMenuOpen(false)} className="text-slate-200 hover:text-cyan-400 py-1">
            Industry Solutions
          </a>
          <a href="#audit" onClick={() => setMobileMenuOpen(false)} className="text-slate-200 hover:text-cyan-400 py-1">
            Free Diagnostic
          </a>
          <a href="#case-studies" onClick={() => setMobileMenuOpen(false)} className="text-slate-200 hover:text-cyan-400 py-1">
            Before / After Proof
          </a>
          <a href="#process" onClick={() => setMobileMenuOpen(false)} className="text-slate-200 hover:text-cyan-400 py-1">
            How It Works
          </a>

          {/* Full-width CTA inside Mobile Drawer */}
          <div className="pt-2">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenConsultation(); }}
              className="black-glass-btn-orbit w-full"
            >
              <span className="btn-glass-inner w-full justify-center py-2.5 text-xs">
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
