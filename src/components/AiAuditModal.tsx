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
  Info,
  Zap,
  Smartphone,
  Target,
  MessageSquare,
  Clock,
  Globe,
  Check,
  TrendingDown,
  Lock,
  Layers,
  Activity
} from 'lucide-react';

interface AiAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  currency: 'INR' | 'USD';
  onChoosePackage: (pkgName: string) => void;
}

interface SymptomItem {
  id: string;
  icon: React.ElementType;
  title: string;
  englishTitle: string;
  description: string;
  impactBadge: string;
  colorAccent: string;
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
  const [selectedConcerns, setSelectedConcerns] = useState<string[]>([
    'mobile_slow',
    'layout_broken'
  ]);

  if (!isOpen) return null;

  const evaluationChecklist: SymptomItem[] = [
    { 
      id: 'mobile_slow', 
      icon: Zap,
      title: '3+ सेकंड धीमी लोडिंग',
      englishTitle: 'Speed Bottleneck (3s+ Lag)',
      description: '53% मोबाइल ग्राहक 3 सेकंड में साइट बंद कर देते हैं — विज्ञापन का भारी पैसा बर्बाद।',
      impactBadge: '⚡ 53% बाउंस रिस्क',
      colorAccent: 'amber'
    },
    { 
      id: 'layout_broken', 
      icon: Smartphone,
      title: 'मोबाइल पर स्क्रीन/बटन कटना',
      englishTitle: 'Broken Mobile Layout',
      description: 'स्मार्टफोन पर टेक्स्ट या बटन कटने से ग्राहक पहली ही नज़र में साइट छोड़ देता है।',
      impactBadge: '📱 Zero Mobile Trust',
      colorAccent: 'sky'
    },
    { 
      id: 'unclear_offer', 
      icon: Target,
      title: '5 सेकंड में ऑफर समझ न आना',
      englishTitle: 'Confusing Value Proposition',
      description: 'ग्राहक को तुरंत नहीं दिखता कि आप क्या बेचते हैं और उसे क्या फायदा मिलेगा।',
      impactBadge: '🎯 जीरो कन्वर्शन',
      colorAccent: 'rose'
    },
    { 
      id: 'no_easy_contact', 
      icon: MessageSquare,
      title: 'कांटेक्ट ढूंढना पड़ता है',
      englishTitle: 'Hidden WhatsApp / Call CTA',
      description: '1-क्लिक व्हाट्सएप या डायरेक्ट कॉल न होने से 90% इन्क्वायरी हाथ से छूट जाती हैं।',
      impactBadge: '📉 -90% Direct Leads',
      colorAccent: 'emerald'
    },
    { 
      id: 'outdated_design', 
      icon: Clock,
      title: 'आउटडेटेड / पुराना डिज़ाइन',
      englishTitle: 'Dated & Slow Template',
      description: 'कंपटीटर की आधुनिक वेबसाइट देख ग्राहक को लगता है कि आपका सिस्टम कमजोर है।',
      impactBadge: '⏳ Lost To Competitors',
      colorAccent: 'purple'
    },
    { 
      id: 'low_google_rank', 
      icon: Globe,
      title: 'गूगल सर्च में वेबसाइट न दिखना',
      englishTitle: 'Zero Google SEO Visibility',
      description: 'लोकल कीवर्ड्स पर ग्राहक सर्च करता है तो आपकी वेबसाइट कहीं दिखाई नहीं देती।',
      impactBadge: '🔍 Zero Free Traffic',
      colorAccent: 'teal'
    }
  ];

  const handleToggleConcern = (id: string) => {
    setSelectedConcerns(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleRunEvaluation = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuditing(true);
    setChecklistCompleted(false);

    // Realistic diagnostic simulation
    setTimeout(() => {
      setIsAuditing(false);
      setChecklistCompleted(true);
    }, 700);
  };

  // Calculate health score & financial leak
  const healthScore = Math.max(18, 100 - (selectedConcerns.length * 16));
  const estimatedLeakMinINR = selectedConcerns.length * 15000;
  const estimatedLeakMaxINR = selectedConcerns.length * 40000;
  const estimatedLeakMinUSD = selectedConcerns.length * 200;
  const estimatedLeakMaxUSD = selectedConcerns.length * 550;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl rounded-3xl bg-[#090d16] border border-slate-800 shadow-[0_25px_70px_rgba(0,0,0,0.85)] overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Glow ambient background accents */}
        <div className="absolute top-0 right-1/4 w-80 h-40 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="relative z-10 px-5 sm:px-6 py-4 sm:py-5 border-b border-slate-800/80 bg-slate-900/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/20 shrink-0">
              <Activity className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/15 text-amber-400 border border-amber-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live Diagnostic Radar
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-white mt-0.5">
                Website Conversion & Performance Audit
              </h3>
              <p className="text-xs text-slate-400">
                पहचानें आपकी वेबसाइट से ग्राहक क्यों वापस चले जाते हैं और कहाँ बिक्री छूट रही है
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close Audit Modal"
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-all active:scale-95 shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="relative z-10 p-4 sm:p-5 overflow-y-auto custom-scrollbar space-y-4 text-slate-200">
          
          {!checklistCompleted ? (
            <form onSubmit={handleRunEvaluation} className="space-y-5">
              
              {/* Engineering Notice Badge */}
              <div className="p-3 sm:p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-start gap-3">
                <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="text-xs text-slate-300 leading-relaxed">
                  <strong className="text-amber-400 font-bold">बिज़नेस रियलिटी चेक:</strong> आपकी वेबसाइट पर आने वाला हर विज़िटर आपका संभावित ग्राहक है। अगर वेबसाइट धीमी है या मोबाइल पर ठीक से नहीं खुलती, तो वह सीधे आपके प्रतिस्पर्धी के पास चला जाता है।
                </div>
              </div>

              {/* Website URL Input */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs sm:text-sm font-extrabold text-white flex items-center gap-1.5">
                    <Globe className="w-4 h-4 text-sky-400" />
                    आपकी वेबसाइट का URL (वैकल्पिक):
                  </label>
                  <span className="text-[11px] text-slate-400">Domain / Store Link</span>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="जैसे: yourbusiness.com या mystore.in"
                    className="w-full px-4 py-3 rounded-2xl bg-slate-900/90 border border-slate-700/80 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 text-white font-medium text-xs sm:text-sm shadow-inner transition-all placeholder-slate-500"
                  />
                  {url && (
                    <button
                      type="button"
                      onClick={() => setUrl('')}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Symptom Checklist (Side-by-Side 2-Column Responsive Grid) */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs sm:text-sm font-extrabold text-white flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                    आपकी वेबसाइट में इनमें से क्या समस्याएँ महसूस होती हैं?
                  </label>
                  <span className="text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                    {selectedConcerns.length} समस्याएँ चुनी गईं
                  </span>
                </div>

                {/* 2-COLUMN SIDE-BY-SIDE GRID — NO TEDIOUS VERTICAL SCROLLING */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {evaluationChecklist.map((item) => {
                    const isSelected = selectedConcerns.includes(item.id);
                    const IconComponent = item.icon;

                    return (
                      <div 
                        key={item.id} 
                        onClick={() => handleToggleConcern(item.id)}
                        className={`group relative p-3.5 sm:p-4 rounded-2xl border cursor-pointer transition-all duration-200 select-none flex flex-col justify-between ${
                          isSelected 
                            ? 'selected-pop-green border-emerald-500 bg-emerald-950/30 ring-2 ring-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.15)]' 
                            : 'border-slate-800 bg-slate-900/70 hover:border-slate-700 hover:bg-slate-900'
                        }`}
                      >
                        {/* Top Row: Icon + Badge + Custom Checkbox */}
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2.5">
                            <div className={`p-2 rounded-xl transition-colors ${
                              isSelected 
                                ? 'bg-emerald-500 text-slate-950' 
                                : 'bg-slate-800 text-slate-300 group-hover:text-white'
                            }`}>
                              <IconComponent className="w-4 h-4" />
                            </div>
                            <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider border ${
                              isSelected
                                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                                : 'bg-slate-800 text-slate-400 border-slate-700'
                            }`}>
                              {item.impactBadge}
                            </span>
                          </div>

                          {/* Animated Checkbox Indicator */}
                          <div className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-all ${
                            isSelected
                              ? 'bg-emerald-500 border-emerald-400 text-slate-950 font-black shadow-md'
                              : 'border-slate-700 bg-slate-800/80 group-hover:border-slate-600'
                          }`}>
                            {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                        </div>

                        {/* Title & Description */}
                        <div>
                          <h4 className={`text-xs sm:text-sm font-extrabold transition-colors leading-tight ${
                            isSelected ? 'text-white' : 'text-slate-100 group-hover:text-white'
                          }`}>
                            {item.title}
                          </h4>
                          <span className="text-[11px] text-slate-400 block mb-1">
                            {item.englishTitle}
                          </span>
                          <p className={`text-[11px] sm:text-xs leading-relaxed transition-colors ${
                            isSelected ? 'text-emerald-100/90' : 'text-slate-400 group-hover:text-slate-300'
                          }`}>
                            {item.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Submit CTA Button */}
              <button
                type="submit"
                disabled={isAuditing}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 font-black text-xs sm:text-sm shadow-[0_10px_30px_rgba(245,158,11,0.35)] hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
              >
                {isAuditing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-slate-950" />
                    <span>सिस्टम व कन्वर्शन फैक्टर्स का विश्लेषण हो रहा है...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-slate-950" />
                    <span>डायग्नोस्टिक रिपोर्ट व समाधान ब्लूप्रिंट देखें (Generate Solution Plan)</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

            </form>
          ) : (
            /* =================================================================
               DIAGNOSTIC VERDICT SCREEN
               ================================================================= */
            <div className="space-y-5 animate-in fade-in duration-300">
              
              {/* Score Header Card */}
              <div className="p-4 sm:p-5 rounded-2xl border border-slate-800 bg-slate-900/90 space-y-3.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider font-extrabold text-slate-400 block">
                      वेबसाइट हेल्थ डायग्नोस्टिक
                    </span>
                    <h4 className="text-base sm:text-lg font-black text-white mt-0.5">
                      {url ? url : 'आपकी बिज़नेस वेबसाइट'}
                    </h4>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block uppercase font-bold">कन्वर्शन हेल्थ स्कोर</span>
                      <span className={`text-xl sm:text-2xl font-black ${
                        healthScore < 50 ? 'text-rose-400' : healthScore < 75 ? 'text-amber-400' : 'text-emerald-400'
                      }`}>
                        {healthScore} / 100
                      </span>
                    </div>
                    <span className={`px-2.5 py-1 rounded-xl text-xs font-black uppercase tracking-wider border ${
                      healthScore < 50 
                        ? 'bg-rose-500/15 text-rose-400 border-rose-500/30' 
                        : healthScore < 75
                        ? 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                        : 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                    }`}>
                      {healthScore < 50 ? 'Critical Leakage' : healthScore < 75 ? 'Needs Optimization' : 'Optimal'}
                    </span>
                  </div>
                </div>

                {/* Estimated Loss Card */}
                <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-900/40 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <TrendingDown className="w-5 h-5 text-rose-400 shrink-0" />
                    <div>
                      <span className="text-xs font-bold text-rose-200 block">
                        धीमी स्पीड व छुपे कांटेक्ट से अनुमानित मासिक नुकसान:
                      </span>
                      <span className="text-[11px] text-slate-400">
                        ({selectedConcerns.length} तकनीकी बॉटलनेक्स के आधार पर)
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm sm:text-base font-black text-rose-400">
                      {currency === 'INR' 
                        ? `₹${estimatedLeakMinINR.toLocaleString('en-IN')} – ₹${estimatedLeakMaxINR.toLocaleString('en-IN')}`
                        : `$${estimatedLeakMinUSD} – $${estimatedLeakMaxUSD}`
                      }
                    </span>
                    <span className="text-[10px] text-slate-400 block">/ प्रति माह संभावित नुकसान</span>
                  </div>
                </div>
              </div>

              {/* 3-Point Architectural Solution */}
              <div className="space-y-2.5">
                <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Vismart Studio द्वारा स्थायी समाधान (Architectural Fixes):
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/60 space-y-1">
                    <div className="text-amber-400 font-bold text-xs flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5" />
                      1. अंडर 1.2s स्पीड
                    </div>
                    <p className="text-[11px] text-slate-300 leading-snug">
                      Next.js/Vite हाई-स्पीड कोड जो बिना किसी लैग के तुरंत खुलता है।
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/60 space-y-1">
                    <div className="text-sky-400 font-bold text-xs flex items-center gap-1.5">
                      <Smartphone className="w-3.5 h-3.5" />
                      2. 100% Fluid Auto-Fit
                    </div>
                    <p className="text-[11px] text-slate-300 leading-snug">
                      हर मोबाइल पर बिना कटे सटीक फिट—शून्य हॉरिजॉन्टल स्क्रॉल।
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/60 space-y-1">
                    <div className="text-emerald-400 font-bold text-xs flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5" />
                      3. 1-टैप डायरेक्ट लीड्स
                    </div>
                    <p className="text-[11px] text-slate-300 leading-snug">
                      कोई लंबे फॉर्म नहीं—ग्राहक सीधे 1 क्लिक में आपके व्हाट्सएप पर आएगा।
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    onClose();
                    onChoosePackage('Website Redesign & Speed Optimization');
                  }}
                  className="flex-1 py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black text-xs sm:text-sm shadow-[0_10px_30px_rgba(16,185,129,0.3)] text-center hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>इस समाधान पर हमारी इंजीनियरिंग टीम से बात करें</span>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </button>

                <button
                  onClick={() => setChecklistCompleted(false)}
                  className="py-3.5 px-5 rounded-2xl border border-slate-700 text-slate-300 font-bold text-xs hover:bg-slate-800 hover:text-white transition-all text-center cursor-pointer"
                >
                  फिर से चेक करें
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
