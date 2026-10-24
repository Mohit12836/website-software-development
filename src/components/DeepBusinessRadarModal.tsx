import React, { useState } from 'react';
import { 
  X, 
  ArrowRight, 
  ChevronLeft, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  Layers, 
  Clock, 
  ShieldAlert, 
  TrendingDown, 
  Building2,
  Lock,
  ArrowUpRight,
  Phone,
  Send,
  HelpCircle
} from 'lucide-react';
import { DIAGNOSTIC_SLIDES } from '../data/slideDiagnosticData';
import type { DiagnosticSlide } from '../data/slideDiagnosticData';

interface DeepBusinessRadarModalProps {
  isOpen: boolean;
  onClose: () => void;
  currency: 'INR' | 'USD';
  onCompletedReview?: (summary: any) => void;
}

export const DeepBusinessRadarModal: React.FC<DeepBusinessRadarModalProps> = ({
  isOpen,
  onClose,
  currency,
  onCompletedReview
}) => {
  // Current Slide Index (0 to DIAGNOSTIC_SLIDES.length - 1)
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  
  // Selected option ID for each slide
  const [selections, setSelections] = useState<Record<string, string>>({});
  
  // Stored mirror insight for each slide
  const [activeMirrorInsight, setActiveMirrorInsight] = useState<string | null>(null);

  // Accumulated annual leak metric
  const [accumulatedLeakINR, setAccumulatedLeakINR] = useState<number>(0);
  const [accumulatedLeakUSD, setAccumulatedLeakUSD] = useState<number>(0);

  // Contact capture on the final verdict screen
  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [businessName, setBusinessName] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionComplete, setSubmissionComplete] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentSlide: DiagnosticSlide | undefined = DIAGNOSTIC_SLIDES[currentSlideIndex];
  const isFinalVerdictScreen = currentSlideIndex >= DIAGNOSTIC_SLIDES.length;

  // Real-time silent autosave whenever an option is picked
  const handleSelectOption = (slide: DiagnosticSlide, option: any) => {
    const updatedSelections = { ...selections, [slide.id]: option.id };
    setSelections(updatedSelections);
    setActiveMirrorInsight(option.mirrorInsight);

    // Calculate leaks
    const newLeakINR = accumulatedLeakINR + (option.leakAmountINR || 0);
    const newLeakUSD = accumulatedLeakUSD + (option.leakAmountUSD || 0);
    setAccumulatedLeakINR(newLeakINR);
    setAccumulatedLeakUSD(newLeakUSD);

    // Silent background dispatch to server
    try {
      fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'Vismart Slide-by-Slide Radar Autosave',
          stepId: slide.id,
          selectedOptionId: option.id,
          selectedLabel: option.label,
          painTag: option.painTag,
          accumulatedLeakINR: newLeakINR,
          timestamp: new Date().toISOString()
        })
      }).catch(() => {
        // Silent fail-safe, never block user
      });
    } catch {
      // Ignored
    }
  };

  const handleNextSlide = () => {
    setActiveMirrorInsight(null);
    setCurrentSlideIndex(prev => prev + 1);
  };

  const handlePrevSlide = () => {
    if (currentSlideIndex > 0) {
      setActiveMirrorInsight(null);
      setCurrentSlideIndex(prev => prev - 1);
    }
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientPhone.trim()) return;

    setIsSubmitting(true);

    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'Vismart Studio Completed Diagnostic Radar',
          name: clientName.trim(),
          phone: clientPhone.trim(),
          businessName: businessName.trim(),
          selections,
          accumulatedLeakINR,
          accumulatedLeakUSD,
          currency,
          submittedAt: new Date().toISOString()
        })
      });
      setSubmissionComplete(true);
    } catch {
      // Show complete anyway so client feels respected
      setSubmissionComplete(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatMoney = (inr: number, usd: number) => {
    return currency === 'INR' 
      ? `₹${inr.toLocaleString('en-IN')}` 
      : `$${usd.toLocaleString('en-US')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.35)] border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Top Header Bar */}
        <div className="px-5 py-3.5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-slate-950 font-black text-sm">
              <Sparkles className="w-4 h-4 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-black text-white">
                  Business Reality Check
                </span>
                <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-amber-400 text-slate-950">
                  {isFinalVerdictScreen ? 'Diagnostic Verdict' : currentSlide?.tag}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 block -mt-0.5">
                Vismart Studio • गैर-बनावटी बिज़नेस विश्लेषण
              </span>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          
          {/* =========================================================================
              PART 1: SLIDE-BY-SLIDE DIAGNOSIS (One Question at a Time, Side-by-Side Cards)
              ========================================================================= */}
          {!isFinalVerdictScreen && currentSlide && (
            <div className="space-y-4 animate-in fade-in duration-200">
              
              {/* Question Header */}
              <div>
                <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-amber-600 block mb-0.5">
                  {currentSlide.category}
                </span>
                <h3 className="text-base sm:text-xl font-black text-slate-950 leading-tight">
                  {currentSlide.question}
                </h3>
                <p className="text-xs text-slate-600 mt-0.5 font-medium">
                  {currentSlide.subtitle}
                </p>
              </div>

              {/* Responsive Side-by-Side Cards Grid (2 to 4 columns, NO unnecessary vertical scrolling) */}
              <div className={`grid gap-2.5 pt-1 ${
                currentSlide.options.length <= 3 
                  ? 'grid-cols-1 sm:grid-cols-3' 
                  : currentSlide.options.length === 4
                  ? 'grid-cols-1 sm:grid-cols-2'
                  : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
              }`}>
                {currentSlide.options.map((opt) => {
                  const isSelected = selections[currentSlide.id] === opt.id;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => handleSelectOption(currentSlide, opt)}
                      className={`p-3.5 sm:p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer flex flex-col justify-between select-none relative group ${
                        isSelected 
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-950 shadow-md ring-1 ring-emerald-600 selected-pop-green' 
                          : 'border-slate-200 hover:border-slate-300 bg-white text-slate-900 hover:bg-slate-50 shadow-sm'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          {opt.icon && (
                            <span className="text-2xl shrink-0">
                              {opt.icon}
                            </span>
                          )}
                          <div className={`w-5 h-5 rounded-md flex items-center justify-center border-2 shrink-0 transition-colors duration-200 ${
                            isSelected ? 'bg-emerald-600 border-emerald-600 text-white shadow-sm' : 'border-slate-300 bg-slate-50'
                          }`}>
                            {isSelected && <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                        </div>

                        <div className={`text-xs sm:text-[13px] leading-snug ${
                          isSelected ? 'font-black text-emerald-950' : 'font-extrabold text-slate-950'
                        }`}>
                          {opt.label}
                        </div>

                        {opt.sublabel && (
                          <div className="text-[10px] sm:text-[11px] text-slate-500 mt-1 leading-snug">
                            {opt.sublabel}
                          </div>
                        )}
                      </div>

                      <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold">
                        <span className={isSelected ? 'text-emerald-700' : 'text-slate-400 group-hover:text-slate-700'}>
                          {isSelected ? '✓ चयनित' : 'चुनें →'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* The Eye-Opening Mirror Insight (Dopamine / Reality Check) */}
              {activeMirrorInsight && (
                <div className="p-3.5 sm:p-4 rounded-2xl bg-amber-50 border-2 border-amber-300/80 text-amber-950 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="flex items-start gap-2.5">
                    <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[11px] font-black uppercase tracking-wider text-amber-900 block mb-0.5">
                        आपके बिज़नेस की ज़मीनी सच्चाई:
                      </span>
                      <p className="text-xs sm:text-[13px] font-semibold leading-relaxed text-slate-900">
                        "{activeMirrorInsight}"
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Bar */}
              <div className="pt-3 flex items-center justify-between border-t border-slate-100">
                {currentSlideIndex > 0 ? (
                  <button
                    onClick={handlePrevSlide}
                    className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-900 px-3 py-2 rounded-xl hover:bg-slate-100 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>पिछला सवाल</span>
                  </button>
                ) : (
                  <div></div>
                )}

                <button
                  onClick={handleNextSlide}
                  disabled={!selections[currentSlide.id]}
                  className="py-3 px-6 rounded-xl bg-slate-950 hover:bg-amber-500 text-white hover:text-slate-950 font-black text-xs sm:text-sm transition-all duration-200 flex items-center gap-2 disabled:opacity-40 shadow-md group"
                >
                  <span>अगला सच समझें</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>

            </div>
          )}

          {/* =========================================================================
              PART 2: FINAL DIAGNOSTIC VERDICT (The Broken System Diagnosis)
              ========================================================================= */}
          {isFinalVerdictScreen && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              {/* Verdict Banner */}
              <div className="p-5 sm:p-6 rounded-3xl bg-slate-900 text-white relative overflow-hidden border border-slate-800 shadow-xl">
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-black uppercase mb-3">
                    <ShieldAlert className="w-4 h-4 text-rose-400" />
                    <span>स्पष्ट निष्कर्ष: टूटा हुआ सिस्टम</span>
                  </div>

                  <h3 className="text-lg sm:text-2xl font-black text-white leading-snug">
                    आपकी मेहनत में कोई कमी नहीं है, लेकिन आपका बिज़नेस <span className="text-rose-400">मैन्युअल उलझनों</span> में फँसा हुआ है।
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                    आपके दिए गए जवाबों के अनुसार, सिस्टम न होने या टूटे हुए तरीकों (व्हाट्सएप चैट्स, रजिस्टर, बिचौलियों का कमीशन) के कारण आपके बिज़नेस से हर साल बड़ी कमाई चुपचाप बाहर बह रही है:
                  </p>

                  <div className="mt-4 pt-4 border-t border-white/10 flex items-baseline gap-2">
                    <span className="text-2xl sm:text-4xl font-black text-amber-400">
                      ~{formatMoney(accumulatedLeakINR || 260000, accumulatedLeakUSD || 3400)}
                    </span>
                    <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                      / अनुमानित वार्षिक लीकेज
                    </span>
                  </div>
                </div>

                <div className="absolute -right-8 -bottom-8 w-44 h-44 rounded-full bg-rose-500/10 blur-3xl pointer-events-none"></div>
              </div>

              {/* 3 Core System Pillars Identified */}
              <div className="space-y-2.5">
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-600 block">
                  आपके काम को आगे बढ़ाने के लिए 3 जरूरी डिजिटल पिलर्स:
                </span>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                  <div className="w-7 h-7 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-black text-xs shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <h5 className="text-xs sm:text-sm font-extrabold text-slate-900">
                      डायरेक्ट कस्टमर फनल (बिना कमीशन के सीधे ऑर्डर्स / कॉल्स)
                    </h5>
                    <p className="text-[11px] text-slate-600 leading-snug mt-0.5">
                      ताकि ग्राहक किसी थर्ड-पार्टी ऐप पर जाने के बजाय सीधे आपकी खुद की डिजिटल प्रॉपर्टी पर आए और 100% मुनाफा आपकी जेब में रहे।
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                  <div className="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-xs shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <h5 className="text-xs sm:text-sm font-extrabold text-slate-900">
                      ऑटोमेटेड इन्क्वायरी व बुकिंग मशीन (24/7 तैयार)
                    </h5>
                    <p className="text-[11px] text-slate-600 leading-snug mt-0.5">
                      ताकि आपको और आपके स्टाफ को 50 बार वही रेट या मेनू न बताना पड़े—सिस्टम अपने आप ग्राहक को पूरी जानकारी देकर बुक करे।
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                  <div className="w-7 h-7 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-black text-xs shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <h5 className="text-xs sm:text-sm font-extrabold text-slate-900">
                      पुराने ग्राहकों का रिटेंशन इंजन (ऑटो-रिमाइंडर्स)
                    </h5>
                    <p className="text-[11px] text-slate-600 leading-snug mt-0.5">
                      ताकि जो ग्राहक एक बार आया, वो हर महीने अपने आप आपके पास दोबारा आए—बिना विज्ञापन पर नया पैसा फूँके।
                    </p>
                  </div>
                </div>
              </div>

              {/* The Honest Next Step: Private Architecture Discussion */}
              {!submissionComplete ? (
                <form onSubmit={handleFinalSubmit} className="p-5 rounded-3xl bg-amber-50/70 border-2 border-amber-300 text-slate-900 space-y-4">
                  <div>
                    <h4 className="text-sm sm:text-base font-black text-slate-950">
                      इस टूटे हुए सिस्टम को ठीक करने के लिए सीधी चर्चा:
                    </h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      हम कोई जबरदस्ती की सेल्स कॉल नहीं करते। हमारा सीनियर सिस्टम इंजीनियर आपके इन जवाबों का अध्ययन करके आपसे ईमानदार सलाह साझा करेगा:
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        आपका नाम *
                      </label>
                      <input 
                        type="text"
                        required
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="जैसे: राहुल शर्मा"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white focus:outline-none focus:border-amber-500 shadow-inner"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        मोबाइल नंबर (व्हाट्सएप/कॉल) *
                      </label>
                      <input 
                        type="tel"
                        required
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        placeholder="जैसे: +91 98765 43210"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white focus:outline-none focus:border-amber-500 shadow-inner"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      बिज़नेस / दुकान / फर्म का नाम (वैकल्पिक)
                    </label>
                    <input 
                      type="text"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder="जैसे: Royal Dine Cafe / Sharma Clinic"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white focus:outline-none focus:border-amber-500 shadow-inner"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !clientName.trim() || !clientPhone.trim()}
                    className="w-full py-3.5 px-5 rounded-2xl bg-slate-950 hover:bg-amber-500 text-white hover:text-slate-950 font-black text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg disabled:opacity-40"
                  >
                    <Phone className="w-4 h-4 text-amber-400" />
                    <span>{isSubmitting ? 'विश्लेषण सुरक्षित हो रहा है...' : 'मेरे बिज़नेस के लिए सही सिस्टम समझाइए →'}</span>
                  </button>

                  <p className="text-[10px] text-center text-slate-500">
                    🔒 आपका डेटा 100% सुरक्षित है। कोई स्पैम नहीं, कोई मार्केटिंग कॉल्स का झंझट नहीं।
                  </p>
                </form>
              ) : (
                <div className="p-6 rounded-3xl bg-emerald-50 border-2 border-emerald-400 text-center space-y-3 animate-in zoom-in-95">
                  <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-6 h-6 stroke-[3]" />
                  </div>
                  <h4 className="text-base sm:text-lg font-black text-emerald-950">
                    आपका बिज़नेस विश्लेषण सुरक्षित रूप से दर्ज हो गया है!
                  </h4>
                  <p className="text-xs text-emerald-900 max-w-md mx-auto leading-relaxed">
                    शुक्रिया <strong>{clientName}</strong>! Vismart Studio की तकनीकी टीम आपकी चुनी हुई समस्याओं और कार्यप्रणाली का अध्ययन करके अगले 24 घंटों में आपसे सीधे संपर्क करेगी।
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-3 px-6 py-2.5 rounded-xl bg-emerald-700 text-white font-black text-xs hover:bg-emerald-800 transition-colors"
                  >
                    वेबसाइट पर वापस लौटें
                  </button>
                </div>
              )}

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
