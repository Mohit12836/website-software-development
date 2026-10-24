import React, { useState } from 'react';
import { 
  ArrowRight, 
  Play, 
  Check, 
  X, 
  Zap, 
  Monitor, 
  ShoppingCart, 
  Smartphone, 
  Cpu
} from 'lucide-react';
import { AnimatedCounter } from './AnimatedCounter';

interface HeroSectionProps {
  currency: 'INR' | 'USD';
  onExploreServices: () => void;
  onOpenConsultation: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreServices,
  onOpenConsultation
}) => {
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  return (
    <section className="relative overflow-hidden cosmic-hero-bg text-white pt-10 pb-12 lg:pt-14 lg:pb-16 border-b border-white/10">
      
      {/* 1. Giant Glowing Blue Horizon Planet Curve (matching reference image) */}
      <div className="absolute top-[-140px] right-[-80px] lg:right-[80px] w-[550px] lg:w-[750px] h-[550px] lg:h-[750px] rounded-full bg-gradient-to-b from-blue-500/40 via-indigo-600/20 to-transparent blur-[70px] pointer-events-none z-0"></div>
      
      {/* Glowing curved horizon line stroke */}
      <div className="absolute top-4 right-10 lg:right-32 w-[400px] lg:w-[600px] h-[300px] rounded-[100%] border-t-2 border-cyan-400/60 shadow-[0_0_30px_#38bdf8] -rotate-12 pointer-events-none hidden sm:block z-0"></div>

      {/* Floating Magenta & Cyan Cosmic Energy Ribbons */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-12 left-6 w-3 h-3 rounded-full bg-magenta-400 shadow-[0_0_15px_#ec4899] pointer-events-none"></div>
      <div className="absolute top-28 left-1/3 w-4 h-4 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 shadow-[0_0_20px_#d946ef] pointer-events-none"></div>

      <div className="container-fluid relative z-10">
        
        {/* Main Hero Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Badge, Typography, Dual CTA Buttons & 6 Trust Checks */}
          <div className="lg:col-span-5 flex flex-col items-start z-10 w-full">
            
            {/* Top Lightning Pill Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-300 text-[10px] sm:text-[11px] font-extrabold tracking-wider uppercase mb-4 sm:mb-5 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
              <Zap className="w-3 h-3 text-purple-400 fill-current shrink-0" />
              <span className="truncate">VISMART STUDIO • PUBLIC DIGITAL SERVICES</span>
            </div>

            {/* Main Headline with fluid clamp typography */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-black tracking-tight leading-[1.12] text-white">
              Grow Your Business with{' '}
              <span className="relative inline-block mt-0.5">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-400 to-fuchsia-400">
                  Digital Solutions
                </span>
                {/* Glowing cyan brush underline flourish */}
                <svg className="absolute -bottom-2 left-0 w-full h-2.5 text-cyan-400 overflow-visible" viewBox="0 0 250 12" fill="none">
                  <path d="M3 9C60 3, 180 3, 247 8" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            {/* Subtitle Paragraph */}
            <p className="mt-4 sm:mt-6 text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed max-w-lg font-normal">
              High-impact Websites, Mobile Apps, and Autonomous AI Automation Solutions engineered to help your business scale faster, smarter, and bigger.
            </p>

            {/* Dual Strategic Paths: 100% full width on small mobile, auto on sm+ */}
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3.5 w-full sm:w-auto">
              <a
                href="#solution-finder"
                className="black-glass-btn-orbit group w-full sm:w-auto"
              >
                <span className="btn-glass-inner w-full justify-center px-4 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_#fbbf24] shrink-0"></span>
                  <span className="text-white group-hover:text-amber-200 transition-colors font-bold">1. Find Your Solution (समाधान खोजें)</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-1 transition-transform shrink-0" />
                </span>
              </a>

              <a
                href="#demos"
                className="glass-pill-dark px-4 py-2.5 sm:px-5 sm:py-3 rounded-full text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 hover:border-cyan-400/50 hover:bg-white/10 transition-all shadow-md w-full sm:w-auto"
              >
                <div className="w-5 h-5 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center font-black text-xs shrink-0">
                  <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                </div>
                <span>2. Explore Live Demos (डेमो देखें)</span>
              </a>
            </div>

            {/* 6 Trust Check Badges: Clean 2-column grid with balanced mobile touch */}
            <div className="mt-6 sm:mt-8 grid grid-cols-2 sm:grid-cols-3 gap-x-3 gap-y-2.5 text-[11px] sm:text-xs font-semibold text-slate-200 w-full">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="w-3.5 h-3.5 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-400 flex items-center justify-center text-[9px] font-black shrink-0">
                  ✓
                </span>
                <span>Modern Design</span>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="w-3.5 h-3.5 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-400 flex items-center justify-center text-[9px] font-black shrink-0">
                  ✓
                </span>
                <span>Mobile Friendly</span>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="w-3.5 h-3.5 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-400 flex items-center justify-center text-[9px] font-black shrink-0">
                  ✓
                </span>
                <span>SEO Ready</span>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="w-3.5 h-3.5 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-400 flex items-center justify-center text-[9px] font-black shrink-0">
                  ✓
                </span>
                <span>Conversion Focused</span>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="w-3.5 h-3.5 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-400 flex items-center justify-center text-[9px] font-black shrink-0">
                  ✓
                </span>
                <span>Ongoing Support</span>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="w-3.5 h-3.5 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-400 flex items-center justify-center text-[9px] font-black shrink-0">
                  ✓
                </span>
                <span>Automation</span>
              </div>
            </div>

          </div>

          {/* Right Column: 3 Devices resting on glowing rocky terrain */}
          <div className="lg:col-span-7 relative pt-4 lg:pt-0 overflow-hidden lg:overflow-visible">
            
            {/* Hand-drawn Annotation 1: Above Laptop */}
            <div className="absolute -top-3 left-10 hidden sm:flex items-center gap-1.5 text-cyan-300 text-xs italic tracking-wider z-20 pointer-events-none" style={{ fontFamily: 'cursive, system-ui' }}>
              <span>WEBSITE DESIGN<br />& DEVELOPMENT</span>
              <svg className="w-6 h-6 text-cyan-300 rotate-45" viewBox="0 0 30 30" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 25 Q 15 5, 25 10 M 20 8 L 25 10 L 22 17" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* 3 Devices Stage Composition */}
            <div className="relative flex items-end justify-center max-w-sm sm:max-w-xl mx-auto lg:max-w-none scale-[0.92] sm:scale-100 origin-bottom">
              
              {/* Device 1: Central Masterpiece Laptop (VISMART STUDIO Interiors) */}
              <div className="relative w-[280px] sm:w-[460px] lg:w-[480px] z-10 shrink-0 -mr-12 sm:-mr-20">
                <div className="rounded-2xl p-1.5 sm:p-2.5 bg-gradient-to-b from-slate-600 via-slate-800 to-slate-950 border border-slate-600/80 shadow-2xl overflow-hidden backdrop-blur-xl">
                  <div className="rounded-xl overflow-hidden bg-slate-950 aspect-[16/10] relative">
                    <img 
                      src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80" 
                      alt="VISMART STUDIO Modern Interiors Demo"
                      className="w-full h-full object-cover"
                    />
                    {/* Overlay simulating Vismart Studio Modern Interiors Store */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-slate-950/60 p-2.5 sm:p-5 flex flex-col justify-between">
                      <div className="flex items-center justify-between text-white text-[9px] sm:text-[10px] font-semibold">
                        <span className="font-extrabold tracking-widest text-amber-400 uppercase">VISMART STUDIO</span>
                        <div className="hidden sm:flex items-center gap-3 text-slate-300">
                          <span>Home</span>
                          <span>Services</span>
                          <span>Contact</span>
                        </div>
                      </div>

                      <div className="max-w-[180px] sm:max-w-[220px]">
                        <span className="text-[8px] sm:text-[9px] uppercase tracking-wider text-amber-400 font-bold">MODERN INTERIORS</span>
                        <h3 className="text-xs sm:text-xl font-black text-white leading-tight mt-0.5">
                          Elevate Your Living Space
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Laptop Base Stand */}
                <div className="h-2 sm:h-2.5 bg-slate-700/80 rounded-b-xl mx-6 sm:mx-8 border-t border-slate-500 shadow-xl"></div>
              </div>

              {/* Device 2: Tablet (StyleHub Fashion E-commerce) */}
              <div className="relative w-[140px] sm:w-[240px] z-20 shrink-0 -mr-8 sm:-mr-12 rounded-xl sm:rounded-2xl p-1 sm:p-1.5 bg-slate-800 border-2 border-slate-700 shadow-2xl">
                <div className="rounded-lg sm:rounded-xl overflow-hidden bg-white text-slate-900 aspect-[3/4] p-1.5 sm:p-2 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-1 border-b border-slate-100 text-[8px] sm:text-[10px] font-black">
                      <span className="text-slate-900 tracking-tight">StyleHub</span>
                      <span className="text-slate-400">🛒</span>
                    </div>
                    <div className="mt-1 relative rounded-md overflow-hidden h-16 sm:h-28">
                      <img 
                        src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80" 
                        alt="Fashion"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Device 3: Smartphone (Business Growth App) */}
              <div className="relative w-[95px] sm:w-[150px] z-30 shrink-0 rounded-[18px] sm:rounded-[24px] p-1 sm:p-1.5 bg-slate-900 border-2 border-purple-500/80 shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                <div className="rounded-[14px] sm:rounded-[20px] overflow-hidden bg-[#0d1424] text-white p-1.5 sm:p-2">
                  <div className="text-[7px] sm:text-[8px] font-bold text-slate-400">Growth App</div>
                  <div className="text-[8px] sm:text-[9px] font-black text-emerald-400 mt-0.5">+62% Live</div>
                </div>
              </div>

            </div>

            {/* Glowing Stage Reflection */}
            <div className="h-4 sm:h-6 w-full -mt-1 sm:-mt-2 bg-gradient-to-r from-cyan-500/30 via-purple-500/40 to-pink-500/30 blur-md rounded-full pointer-events-none"></div>

          </div>

        </div>

        {/* Unified Bottom Floating Glass Console (Refined & Balanced for Mobile) */}
        <div className="mt-8 sm:mt-12 rounded-2xl sm:rounded-3xl p-4 sm:p-5 bg-slate-950/90 backdrop-blur-2xl border border-white/15 shadow-[0_15px_40px_-5px_rgba(0,0,0,0.8)] relative overflow-hidden">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
            
            {/* 4 Core Services */}
            <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              
              <div className="flex items-center gap-2 sm:gap-2.5">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                  <Monitor className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-white truncate">Website Design</div>
                  <div className="text-[10px] text-slate-400 truncate">Modern & Fast</div>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-2.5">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-orange-400 shrink-0">
                  <ShoppingCart className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-white truncate">E-commerce</div>
                  <div className="text-[10px] text-slate-400 truncate">Sell More</div>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-2.5">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-white truncate">Mobile Apps</div>
                  <div className="text-[10px] text-slate-400 truncate">iOS & Android</div>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-2.5">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
                  <Cpu className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-white truncate">Automation</div>
                  <div className="text-[10px] text-slate-400 truncate">Smart AI CRM</div>
                </div>
              </div>

            </div>

            {/* Divider line on desktop */}
            <div className="hidden md:block w-px h-10 bg-white/15"></div>

            {/* Right Segment: 4 Balanced Key Stats with Smooth Number Animation */}
            <div className="md:col-span-4 grid grid-cols-4 gap-1.5 text-center pt-2 md:pt-0 border-t md:border-t-0 border-white/10">
              <div>
                <span className="text-sm sm:text-lg font-black text-cyan-400 block leading-tight">
                  <AnimatedCounter value={500} suffix="+" duration={1800} />
                </span>
                <span className="text-[8px] sm:text-[9px] text-slate-400 uppercase font-semibold">Delivered</span>
              </div>
              <div>
                <span className="text-sm sm:text-lg font-black text-fuchsia-400 block leading-tight">
                  <AnimatedCounter value={98} suffix="%" duration={1600} />
                </span>
                <span className="text-[8px] sm:text-[9px] text-slate-400 uppercase font-semibold">Satisfaction</span>
              </div>
              <div>
                <span className="text-sm sm:text-lg font-black text-amber-400 block leading-tight">
                  <AnimatedCounter value={5} suffix="+" duration={1200} />
                </span>
                <span className="text-[8px] sm:text-[9px] text-slate-400 uppercase font-semibold">Years</span>
              </div>
              <div>
                <span className="text-sm sm:text-lg font-black text-cyan-400 block leading-tight">24/7</span>
                <span className="text-[8px] sm:text-[9px] text-slate-400 uppercase font-semibold">Support</span>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Video Modal */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl rounded-2xl bg-slate-900 border border-slate-800 p-6 text-white shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h4 className="font-bold text-sm">2-Minute Portfolio Walkthrough</h4>
              <button onClick={() => setVideoModalOpen(false)} className="p-1 rounded text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="my-6 aspect-video bg-slate-950 rounded-xl flex flex-col items-center justify-center text-center p-4">
              <div className="w-14 h-14 rounded-full bg-cyan-600/30 border border-cyan-500 text-cyan-400 flex items-center justify-center mb-3">
                <Play className="w-6 h-6 fill-current ml-0.5" />
              </div>
              <p className="text-xs text-slate-300 max-w-sm">
                Discover how Vismart Studio builds high-converting websites, mobile apps, and autonomous AI automation solutions.
              </p>
            </div>
            <button 
              onClick={() => { setVideoModalOpen(false); onOpenConsultation(); }}
              className="bilberrry-btn-glow w-full py-2.5 rounded-full font-bold text-xs"
            >
              Get Free Consultation →
            </button>
          </div>
        </div>
      )}

    </section>
  );
};
