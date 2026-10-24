import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  Loader2, 
  X, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  MessageCircle,
  ExternalLink,
  Sparkles
} from 'lucide-react';

interface AiAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  currency: 'INR' | 'USD';
  onChoosePackage: (pkgName: string) => void;
}

export const AiAuditModal: React.FC<AiAuditModalProps> = ({
  isOpen,
  onClose,
  currency,
  onChoosePackage
}) => {
  const [url, setUrl] = useState('');
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditResult, setAuditResult] = useState<{
    score: number;
    speed: string;
    issues: string[];
    wins: string[];
    recommendedPackage: string;
    budget: string;
  } | null>(null);

  if (!isOpen) return null;

  const handleStartAudit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setIsAuditing(true);
    setAuditResult(null);

    // Simulate diagnostic scan
    setTimeout(() => {
      setIsAuditing(false);
      setAuditResult({
        score: 54,
        speed: '4.2s (Too Slow for Mobile)',
        issues: [
          'Mobile view shows horizontal overflow scroll (Fails Google Mobile UX)',
          'No direct 1-click WhatsApp reservation/inquiry trigger',
          'Contact form requires 7 fields (causing 60%+ checkout drop-off)',
          'Missing local service schema metadata for Google Search ranking'
        ],
        wins: [
          'Brand logo & business hours are visible',
          'SSL certificate is active & valid'
        ],
        recommendedPackage: 'Business Website Package',
        budget: currency === 'INR' ? '₹35,000' : '$2,200'
      });
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl animated-glass-card p-6 sm:p-8 overflow-hidden border border-white/20">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-black text-white">
                Live AI Website & Conversion Audit
              </h3>
              <p className="text-xs text-slate-400">Objective, evidence-backed diagnostic analysis</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Audit Form or Results */}
        {!auditResult ? (
          <form onSubmit={handleStartAudit} className="mt-6">
            <label className="block text-xs font-bold uppercase text-cyan-400 mb-2">
              Enter Your Current Website URL
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                required
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="e.g. www.yourrestaurant.com or yourclinic.in"
                className="flex-1 px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400"
              />
              <button
                type="submit"
                disabled={isAuditing}
                className="bilberrry-btn-glow px-6 py-3.5 rounded-xl text-white font-extrabold text-xs shadow-glow flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isAuditing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <span>Run AI Audit</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
            <p className="mt-3 text-[11px] text-slate-400 leading-relaxed">
              We check load speed, mobile responsive fit, broken form friction, and missing lead channels without asking for your password.
            </p>
          </form>
        ) : (
          <div className="mt-5 space-y-4">
            
            {/* Score Banner */}
            <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/40 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-amber-300">
                  Diagnostic Health Score: {auditResult.score}/100
                </span>
                <p className="text-xs text-slate-300 mt-0.5">
                  Mobile Speed: <strong className="text-rose-400">{auditResult.speed}</strong>
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-rose-600 text-white text-[11px] font-black uppercase tracking-wider">
                Needs Immediate Fix
              </span>
            </div>

            {/* Critical Leaks */}
            <div>
              <h4 className="text-xs font-bold uppercase text-cyan-400 mb-2 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                Detected Friction Leaks:
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-200">
                {auditResult.issues.map((iss, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold">•</span>
                    <span>{iss}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Proposed Solution Package */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400">
                  Recommended Plug-and-Play Solution
                </span>
                <h5 className="text-sm font-black text-white mt-0.5">
                  {auditResult.recommendedPackage}
                </h5>
                <span className="text-xs text-slate-300">
                  Fixed Scope Investment: <strong className="text-cyan-400 font-bold">{auditResult.budget}</strong>
                </span>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onChoosePackage(auditResult.recommendedPackage);
                }}
                className="bilberrry-btn-glow px-5 py-2.5 rounded-xl text-white font-extrabold text-xs shadow-glow"
              >
                Fix This With Us
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
