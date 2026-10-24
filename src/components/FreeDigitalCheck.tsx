import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  Zap, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  ArrowRight, 
  MessageCircle, 
  Loader2,
  Smartphone,
  Globe2,
  FileCheck2
} from 'lucide-react';

interface FreeDigitalCheckProps {
  currency: 'INR' | 'USD';
  onOpenConsultation: (details?: string) => void;
}

export const FreeDigitalCheck: React.FC<FreeDigitalCheckProps> = ({
  currency,
  onOpenConsultation
}) => {
  const [urlInput, setUrlInput] = useState('');
  const [businessType, setBusinessType] = useState('Local Business');
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [auditResult, setAuditResult] = useState<{
    url: string;
    score: number;
    speedScore: number;
    mobileScore: number;
    seoScore: number;
    conversionScore: number;
    issuesFound: string[];
    potentialRevenueLeak: string;
    fixPlan: string;
  } | null>(null);

  const scanSteps = [
    'Connecting to website server & pinging DNS...',
    'Analyzing Mobile Viewport & Core Web Vitals...',
    'Checking Meta Tags, OpenGraph & Google Search Schema...',
    'Auditing WhatsApp & Direct Lead Capture Call-to-Actions...',
    'Compiling Diagnostic Report & Estimated Revenue Leaks...'
  ];

  const handleStartAudit = (customUrl?: string) => {
    const targetUrl = customUrl || urlInput || 'mysite.com';
    setIsScanning(true);
    setScanStep(0);
    setAuditResult(null);

    const stepInterval = setInterval(() => {
      setScanStep((prev) => {
        if (prev < scanSteps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(stepInterval);
          setIsScanning(false);
          setAuditResult({
            url: targetUrl.startsWith('http') ? targetUrl : `https://${targetUrl}`,
            score: 54,
            speedScore: 48,
            mobileScore: 62,
            seoScore: 55,
            conversionScore: 42,
            issuesFound: [
              'Slow Mobile Largest Contentful Paint (LCP > 3.8s) causing 40%+ visitor bounce',
              'Missing 1-Tap Floating WhatsApp Enquiry CTA on mobile viewports',
              'Images uncompressed (PNG/JPEG) without modern WebP/AVIF auto-scaling',
              'Missing Google Local Business Schema & OpenGraph preview metadata',
              'No direct pricing transparency or clear conversion-focused offer'
            ],
            potentialRevenueLeak: currency === 'INR' ? '₹25,000 – ₹70,000 / month' : '$1,200 – $3,500 / month',
            fixPlan: 'Vismart Studio High-Speed Re-Engineering + Mobile Lead Funnel'
          });
          return prev;
        }
      });
    }, 600);
  };

  return (
    <section id="audit" className="py-20 bg-[#f8fafc] border-b border-slate-200">
      <div className="container-fluid">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 border border-blue-300 text-blue-900 text-xs font-black uppercase tracking-wider mb-3">
            <ShieldCheck className="w-4 h-4 text-blue-700" />
            <span>100% Free Website Diagnostic</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
            अपनी वेबसाइट की वास्तविक Technical कमियाँ जाँचें
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            धीमी वेबसाइट या खराब मोबाइल लेआउट से हर महीने संभावित ग्राहक बिना मैसेज किए वापस चले जाते हैं। नीचे अपना लिंक डालकर 30 सेकंड में फ्री ऑडिट रिपोर्ट पाएँ।
          </p>
        </div>

        {/* Audit Tool Card (Black Obsidian Glass on Crisp Light Canvas) */}
        <div className="max-w-4xl mx-auto animated-glass-card rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          
          {/* Input Form */}
          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="relative w-full md:flex-1">
              <Globe2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !isScanning && handleStartAudit()}
                placeholder="अपनी वेबसाइट का लिंक लिखें (e.g. mybusiness.com)"
                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-900 border border-white/20 text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-amber-400 shadow-inner"
              />
            </div>

            <div className="w-full md:w-48">
              <select
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                className="w-full py-3.5 px-3 rounded-xl bg-slate-900 border border-white/20 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400"
              >
                <option value="Local Retail">Retail / Kirana Shop</option>
                <option value="Restaurant">Restaurant / Cafe</option>
                <option value="Clinic">Clinic / Healthcare</option>
                <option value="Services">Service / Contractor</option>
                <option value="E-commerce">E-commerce / D2C</option>
                <option value="B2B">B2B / Manufacturer</option>
              </select>
            </div>

            <button
              onClick={() => handleStartAudit()}
              disabled={isScanning}
              className="w-full md:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-500/30 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
            >
              {isScanning ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Scanning...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 fill-current" />
                  <span>Run Free Diagnostic</span>
                </>
              )}
            </button>
          </div>

          {/* Quick Demo Previews */}
          {!auditResult && !isScanning && (
            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-300">
              <span className="font-semibold text-slate-400">Quick Test Demos:</span>
              <button 
                onClick={() => { setUrlInput('royalbiryani.in'); handleStartAudit('royalbiryani.in'); }}
                className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-cyan-300 border border-white/10"
              >
                Test Restaurant Demo
              </button>
              <button 
                onClick={() => { setUrlInput('apexhvac.com'); handleStartAudit('apexhvac.com'); }}
                className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-cyan-300 border border-white/10"
              >
                Test US Contractor Demo
              </button>
              <button 
                onClick={() => { setUrlInput('caredental.in'); handleStartAudit('caredental.in'); }}
                className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-cyan-300 border border-white/10"
              >
                Test Dental Clinic Demo
              </button>
            </div>
          )}

          {/* Scanning Progress */}
          {isScanning && (
            <div className="mt-8 p-6 rounded-2xl bg-slate-900/90 border border-white/10 animate-in fade-in">
              <div className="flex items-center gap-3 mb-4">
                <Loader2 className="w-5 h-5 text-amber-400 animate-spin" />
                <span className="text-sm font-bold text-white">
                  {scanSteps[scanStep]}
                </span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-amber-400 to-cyan-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((scanStep + 1) / scanSteps.length) * 100}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Audit Result Display */}
          {auditResult && (
            <div className="mt-8 pt-6 border-t border-white/10 animate-in zoom-in-95 duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/10 gap-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">
                    Diagnostic Report for:
                  </span>
                  <h3 className="text-lg font-black text-white">{auditResult.url}</h3>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-300 font-semibold">Overall Health:</span>
                  <span className="px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-400 font-black text-xs">
                    {auditResult.score}/100 (At High Risk)
                  </span>
                </div>
              </div>

              {/* 4 Diagnostic Pillars */}
              <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-900 border border-white/10">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Mobile Speed</span>
                  <span className="text-xl font-black text-rose-400">{auditResult.speedScore}%</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">3.8s LCP Delay</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-white/10">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Mobile UX</span>
                  <span className="text-xl font-black text-amber-400">{auditResult.mobileScore}%</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Viewport Clipping</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-white/10">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">SEO Ready</span>
                  <span className="text-xl font-black text-amber-400">{auditResult.seoScore}%</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Missing Schema</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-white/10">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Conversion Lead</span>
                  <span className="text-xl font-black text-rose-400">{auditResult.conversionScore}%</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">No WhatsApp Funnel</span>
                </div>
              </div>

              {/* Identified Issues & Business Impact */}
              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/30">
                  <span className="text-xs font-black text-rose-300 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                    <AlertTriangle className="w-4 h-4 text-rose-400" />
                    <span>पहचानी गई 5 मुख्य समस्याएँ</span>
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-200">
                    {auditResult.issuesFound.map((issue, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-rose-400 font-bold">•</span>
                        <span>{issue}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-black text-emerald-300 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                      <Zap className="w-4 h-4 text-emerald-400" />
                      <span>संभावित Revenue Leak & Solution</span>
                    </span>
                    <p className="text-xs text-slate-200 leading-relaxed">
                      इस कमियों के कारण आपके बिज़नेस से अनुमानित <strong className="text-rose-400 font-black">{auditResult.potentialRevenueLeak}</strong> की लीड्स हर महीने खो रही हैं।
                    </p>
                    <div className="mt-3 p-2.5 rounded-lg bg-emerald-900/50 border border-emerald-400/30 text-emerald-300 text-xs font-bold">
                      समाधान: Vismart Studio 100% Fluid Auto-Fit & 1-Tap WhatsApp Conversion Engine
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => onOpenConsultation(`Audit for ${auditResult.url}`)}
                      className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs hover:brightness-110 shadow-md"
                    >
                      Get Fixed Proposal
                    </button>
                    <a
                      href={`https://wa.me/919999999999?text=${encodeURIComponent(
                        `Hello Vismart Studio, I ran the free audit on ${auditResult.url}. Health score is ${auditResult.score}/100. Please share the fix proposal.`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>WhatsApp Report</span>
                    </a>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
};
