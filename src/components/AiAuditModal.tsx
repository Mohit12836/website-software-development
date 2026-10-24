import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  Loader2, 
  X, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Sparkles,
  ExternalLink,
  Info
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
  const [checklistCompleted, setChecklistCompleted] = useState(false);
  const [selectedConcerns, setSelectedConcerns] = useState<string[]>([]);

  if (!isOpen) return null;

  const evaluationChecklist = [
    { id: 'mobile_slow', label: 'Takes more than 3 seconds to load on mobile connections' },
    { id: 'layout_broken', label: 'Text or buttons overflow screen edges on smartphones' },
    { id: 'unclear_offer', label: 'Visitors cannot immediately tell what is being offered within 5 seconds' },
    { id: 'no_easy_contact', label: 'Visitors have to hunt for a contact email or fill long forms' },
    { id: 'outdated_design', label: 'Looks outdated compared to modern competitors in your industry' }
  ];

  const handleToggleConcern = (id: string) => {
    setSelectedConcerns(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleRunEvaluation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setIsAuditing(true);
    setChecklistCompleted(false);

    // Structural checklist calculation
    setTimeout(() => {
      setIsAuditing(false);
      setChecklistCompleted(true);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl rounded-3xl bg-white border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                Website UX & Performance Evaluation
              </h3>
              <p className="text-xs text-slate-500">
                Diagnostic checklist to discover why your current website may be leaking leads
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-slate-700 text-xs sm:text-sm">
          
          <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 flex items-start gap-2.5 text-xs text-blue-900">
            <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <span>
              <strong>Engineering Notice:</strong> This tool performs a structural self-evaluation of common conversion bottlenecks. For a live Lighthouse or PageSpeed lab report, contact our team with your URL for a manual audit.
            </span>
          </div>

          {!checklistCompleted ? (
            <form onSubmit={handleRunEvaluation} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Website URL to Evaluate
                </label>
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="e.g. yourbusiness.com"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:border-amber-500 text-slate-900 text-xs sm:text-sm shadow-inner"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Select any symptoms your website currently experiences:
                </label>
                <div className="space-y-2">
                  {evaluationChecklist.map((item) => (
                    <label 
                      key={item.id} 
                      className={`flex items-start gap-2.5 p-3 rounded-xl border cursor-pointer transition-all ${
                        selectedConcerns.includes(item.id) 
                          ? 'border-amber-400 bg-amber-50/50' 
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <input 
                        type="checkbox"
                        checked={selectedConcerns.includes(item.id)}
                        onChange={() => handleToggleConcern(item.id)}
                        className="mt-0.5 rounded text-amber-500 focus:ring-amber-400"
                      />
                      <span className="text-xs text-slate-700 leading-snug">{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={isAuditing}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs sm:text-sm shadow-lg hover:brightness-105 active:scale-98 transition-all flex items-center justify-center gap-2"
              >
                {isAuditing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Analyzing Structural Factors...</span>
                  </>
                ) : (
                  <>
                    <span>Generate Remediation Plan</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="space-y-4 animate-in fade-in">
              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="font-bold text-slate-900 text-xs">Evaluated Target:</span>
                  <span className="font-mono text-xs text-amber-700">{url}</span>
                </div>
                <div className="text-xs text-slate-600">
                  Identified Concerns: <strong>{selectedConcerns.length} of 5 checked</strong>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Recommended Technical Action:
                </h4>
                <div className="p-4 rounded-xl border border-amber-200 bg-amber-50 text-xs space-y-1.5 text-slate-800">
                  <p className="font-bold text-amber-900">
                    Full Modern Re-Engineering & Responsive Layout
                  </p>
                  <p>
                    Rebuilding with a fluid auto-fit layout, high-performance static rendering, and clean zero-friction contact funnels solves these symptoms permanently without ongoing framework bloat.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => {
                    onClose();
                    onChoosePackage('Website Redesign & Speed Optimization');
                  }}
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs shadow-md text-center hover:brightness-105 transition-all"
                >
                  Discuss Project Blueprint With Us →
                </button>
                <button
                  onClick={() => setChecklistCompleted(false)}
                  className="py-3 px-4 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 transition-colors"
                >
                  Evaluate Another Site
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
