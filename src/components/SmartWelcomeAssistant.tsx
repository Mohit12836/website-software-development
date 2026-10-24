import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  X, 
  MessageCircle, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  ChevronRight, 
  Minimize2, 
  Maximize2, 
  ExternalLink,
  CheckCircle2,
  FileText,
  RotateCcw,
  Send,
  Building2,
  Zap,
  HelpCircle,
  Stethoscope,
  UtensilsCrossed,
  Store,
  Briefcase,
  Layers
} from 'lucide-react';
import { NICHE_SOLUTIONS } from '../data/agencyData';
import type { NicheSolution } from '../data/agencyData';

interface SmartWelcomeAssistantProps {
  currency: 'INR' | 'USD';
  onOpenConsultationModal: (subject?: string) => void;
}

interface AssistantMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  options?: string[];
  suggestedDirection?: {
    title: string;
    image: string;
    benefits: string[];
    demoAnchor?: string;
  };
  showBlueprintButton?: boolean;
}

export const SmartWelcomeAssistant: React.FC<SmartWelcomeAssistantProps> = ({
  currency,
  onOpenConsultationModal
}) => {
  // Assistant States
  // 'hidden': not rendered
  // 'bubble': small non-intrusive greeting in corner
  // 'minimized': small floating pill
  // 'panel': full dockable side-panel / mobile bottom-sheet
  const [assistantState, setAssistantState] = useState<'hidden' | 'bubble' | 'minimized' | 'panel'>('hidden');
  
  const [messages, setMessages] = useState<AssistantMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedPath, setSelectedPath] = useState<string>('');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('Restaurant');
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Progressive Disclosure: Show bubble gently after 3 seconds on first visit
  useEffect(() => {
    const hasDismissed = sessionStorage.getItem('vismart_assistant_dismissed');
    if (!hasDismissed) {
      const timer = setTimeout(() => {
        setAssistantState('bubble');
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      // Show minimized pill
      setAssistantState('minimized');
    }
  }, []);

  useEffect(() => {
    if (assistantState === 'panel') {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, assistantState]);

  // Start guided consultation
  const startConsultation = () => {
    setAssistantState('panel');
    if (messages.length === 0) {
      const initialGreeting: AssistantMessage = {
        id: 'msg-start',
        sender: 'ai',
        text: `नमस्ते! मैं Vismart AI Project Guide हूँ।\n\nआप क्या करना चाहते हैं? एक विकल्प चुनिए, मैं आपको सीधे सही दिशा में ले जाऊँगा।`,
        options: [
          '✨ नई वेबसाइट या ऑनलाइन स्टोर बनवानी है',
          '⚡ पुरानी वेबसाइट को नया व आधुनिक बनाना है',
          '🤖 ऐप, कस्टम सॉफ्टवेयर या AI ऑटोमेशन चाहिए',
          '💡 समझ नहीं आ रहा क्या सही रहेगा (Need Guidance)'
        ]
      };
      setMessages([initialGreeting]);
      setCurrentStep(1);
    }
  };

  const dismissBubble = () => {
    setAssistantState('minimized');
    sessionStorage.setItem('vismart_assistant_dismissed', 'true');
  };

  const handleOptionClick = (option: string) => {
    // Push user response
    const userMsg: AssistantMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: option
    };
    setMessages(prev => [...prev, userMsg]);

    setTimeout(() => {
      processNextStep(option, currentStep);
    }, 450);
  };

  const processNextStep = (userChoice: string, step: number) => {
    // Step 1: User chose what they want to build -> Ask Industry
    if (step === 1) {
      setSelectedPath(userChoice);
      setCurrentStep(2);

      setMessages(prev => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: `बहुत बढ़िया! आपकी ज़रूरतों के सटीक समाधान के लिए, आपका बिज़नेस या इंडस्ट्री कौन-सी है?`,
          options: [
            'Restaurant / Cafe',
            'Clinic / Healthcare',
            'Retail / Kirana Shop',
            'Service / Contractor',
            'Coaching / Education',
            'B2B / Wholesaler'
          ]
        }
      ]);
    }
    // Step 2: User chose Industry -> SHOW VALUE FIRST! (Suggested Direction Card)
    else if (step === 2) {
      setSelectedIndustry(userChoice);
      setCurrentStep(3);

      const matchedSolution = NICHE_SOLUTIONS.find(n => 
        userChoice.toLowerCase().includes(n.name.toLowerCase()) || 
        n.name.toLowerCase().includes(userChoice.toLowerCase())
      ) || NICHE_SOLUTIONS[0];

      setMessages(prev => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: `आपकी बताई ज़रूरत के अनुसार Vismart Studio की तरफ से यह सिस्टम सबसे उपयुक्त रहेगा:`,
          suggestedDirection: {
            title: `${matchedSolution.name} Web & Digital Platform`,
            image: matchedSolution.demoImage,
            benefits: [
              matchedSolution.painPoint + ' का स्थायी निवारण',
              matchedSolution.businessImpact,
              '100% Fluid Auto-Fit Across Mobile & PC • 1-Tap WhatsApp Sync'
            ],
            demoAnchor: '#demos'
          },
          options: [
            '👁️ इस प्रकार का Live Demo चलाकर देखें',
            'आगे की प्लानिंग करें (Next Step)',
            'मुझे कुछ विशेष फीचर्स चाहिए'
          ]
        }
      ]);
    }
    // Step 3: Scoping Question (Existing software or fresh?)
    else if (step === 3) {
      setCurrentStep(4);

      setMessages(prev => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: `आगे क्या समझना ज़रूरी है:\n\nक्या आपके यहाँ पहले से कोई सॉफ्टवेयर या वेबसाइट इस्तेमाल होती है, या आपको बिल्कुल नया सिस्टम चाहिए?`,
          options: [
            'बिल्कुल नया सिस्टम चाहिए (Need New System)',
            'मौजूदा सॉफ्टवेयर के साथ जोड़ना है (Existing System)',
            'निश्चित नहीं हूँ / आपकी सलाह चाहिए (Not Sure)'
          ]
        }
      ]);
    }
    // Step 4: Ready for Full Blueprint
    else {
      setMessages(prev => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: `उत्कृष्ट! आपकी प्रारंभिक आवश्यकताओं का पूरा खाका तैयार है।\n\nअब आप **"Your Project Blueprint"** देख सकते हैं, जहाँ आपकी ज़रूरतों का लिखित ब्यौरा है और आप हमारे स्टूडियो ओनर से **मानव-सत्यापित अंतिम कोटेशन** की पुष्टि कर सकते हैं।`,
          showBlueprintButton: true
        }
      ]);
    }
  };

  const handleOpenFullBlueprint = () => {
    setAssistantState('minimized');
    onOpenConsultationModal(selectedIndustry);
  };

  return (
    <>
      {/* =========================================================================
          STATE 1: NON-INTRUSIVE WELCOME BUBBLE (Appears gently after 3 seconds)
          ========================================================================= */}
      {assistantState === 'bubble' && (
        <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 max-w-sm w-[calc(100%-2rem)] sm:w-88 animate-in slide-in-from-bottom-5 duration-300">
          <div className="animated-glass-card rounded-2xl p-4 sm:p-5 shadow-2xl border border-amber-500/30 relative">
            
            {/* Close / Dismiss button */}
            <button
              onClick={dismissBubble}
              className="absolute top-3 right-3 p-1 rounded-lg text-slate-400 hover:text-white transition-colors"
              aria-label="Dismiss assistant"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header with Vismart Assistant Avatar */}
            <div className="flex items-center gap-3 mb-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-500 flex items-center justify-center text-slate-950 font-black text-sm shadow-md shrink-0">
                <Bot className="w-4 h-4 text-slate-950" />
              </div>
              <div>
                <h4 className="text-xs font-black text-white leading-tight">
                  Vismart Project Assistant
                </h4>
                <span className="text-[10px] text-amber-400 font-bold">
                  Zero Sales Pressure • Guided Tour
                </span>
              </div>
            </div>

            {/* Friendly Greeting Message */}
            <p className="text-xs text-slate-200 leading-relaxed">
              नमस्ते! आप चाहें तो मैं आपके बिज़नेस के हिसाब से सही समाधान और Live Demo खोजने में मदद कर सकता हूँ।
            </p>

            {/* Dual Strategic Choices */}
            <div className="mt-3.5 flex items-center gap-2">
              <button
                onClick={startConsultation}
                className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-slate-950 font-black text-xs hover:brightness-110 shadow-md transition-transform active:scale-95 flex items-center justify-center gap-1.5"
              >
                <span>Start Consultation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={dismissBubble}
                className="py-2 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-slate-300 font-semibold text-xs transition-colors"
              >
                Explore Freely
              </button>
            </div>

          </div>
        </div>
      )}

      {/* =========================================================================
          STATE 2: MINIMIZED FLOATING PILL (Always available, never in the way)
          ========================================================================= */}
      {assistantState === 'minimized' && (
        <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 animate-in fade-in">
          <button
            onClick={() => setAssistantState('panel')}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-slate-950 border border-amber-400/40 text-white text-xs font-bold shadow-2xl hover:border-amber-400 hover:scale-105 active:scale-95 transition-all group"
          >
            <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-slate-950 shrink-0">
              <Bot className="w-3.5 h-3.5" />
            </div>
            <span className="text-amber-200 group-hover:text-white transition-colors">
              AI Project Guide
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          </button>
        </div>
      )}

      {/* =========================================================================
          STATE 3: FULL DOCKABLE SIDE PANEL (Desktop) & BOTTOM SHEET (Mobile)
          ========================================================================= */}
      {assistantState === 'panel' && (
        <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[440px] md:w-[480px] bg-[#060913]/98 backdrop-blur-2xl border-l border-white/15 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          
          {/* Panel Top Header */}
          <div className="p-4 border-b border-white/10 bg-[#090d1a] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-slate-950 font-black text-sm shadow-md shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-black text-white">
                  Vismart AI Project Guide
                </h3>
                <span className="text-[10px] text-slate-400">
                  Step-by-Step Guided Consultation
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setAssistantState('minimized')}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                title="Minimize assistant"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setAssistantState('minimized')}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Scrollable Conversation Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            
            {/* Trust Banner */}
            <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-500/30 text-blue-200 text-[11px] flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>
                <strong>मार्गदर्शन, बंधन नहीं:</strong> आप कभी भी इस पैनल को minimize करके पूरी वेबसाइट स्वतंत्र रूप से देख सकते हैं।
              </span>
            </div>

            {/* Messages */}
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-slate-950 shrink-0 text-[10px] font-black mt-1">
                    V
                  </div>
                )}

                <div className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                  msg.sender === 'user' 
                    ? 'bg-amber-400 text-slate-950 font-bold rounded-tr-none' 
                    : 'bg-slate-900 border border-white/15 text-slate-100 rounded-tl-none'
                }`}>
                  <p className="whitespace-pre-line">{msg.text}</p>

                  {/* VALUE CARD: Suggested Direction & Demo Showcase */}
                  {msg.suggestedDirection && (
                    <div className="mt-3.5 p-3 rounded-xl bg-slate-950 border border-white/15 space-y-2.5">
                      <div className="flex items-center justify-between pb-1.5 border-b border-white/10">
                        <span className="text-[10px] font-black uppercase text-amber-400">Your Suggested Direction</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">Recommended</span>
                      </div>

                      <img 
                        src={msg.suggestedDirection.image} 
                        alt={msg.suggestedDirection.title}
                        className="w-full h-28 object-cover rounded-lg border border-white/10" 
                      />

                      <h4 className="text-xs font-bold text-white">
                        {msg.suggestedDirection.title}
                      </h4>

                      <ul className="space-y-1 text-[11px] text-slate-300">
                        {msg.suggestedDirection.benefits.map((b, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="pt-1 flex gap-2">
                        <a
                          href="#demos"
                          onClick={() => setAssistantState('minimized')}
                          className="flex-1 py-1.5 px-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-[11px] flex items-center justify-center gap-1 border border-white/10 transition-colors"
                        >
                          <span>View Working Demo</span>
                          <ExternalLink className="w-3 h-3 text-cyan-400" />
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Interactive Quick Choices */}
                  {msg.options && (
                    <div className="mt-3 pt-2 border-t border-white/10 flex flex-col gap-1.5">
                      {msg.options.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          onClick={() => handleOptionClick(opt)}
                          className="p-2 rounded-lg bg-white/5 hover:bg-amber-400 hover:text-slate-950 border border-white/10 text-slate-200 text-[11px] font-bold text-left transition-all active:scale-98 flex items-center justify-between"
                        >
                          <span>{opt}</span>
                          <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Open Project Blueprint Button */}
                  {msg.showBlueprintButton && (
                    <div className="mt-4 pt-3 border-t border-white/15">
                      <button
                        onClick={handleOpenFullBlueprint}
                        className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-orange-500/25 hover:brightness-110 active:scale-95 transition-all"
                      >
                        <FileText className="w-4 h-4" />
                        <span>Open Your Project Blueprint →</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            <div ref={chatEndRef} />
          </div>

          {/* Panel Footer / Quick Reset */}
          <div className="p-3 bg-slate-900 border-t border-white/10 flex items-center justify-between text-[11px] shrink-0">
            <button
              onClick={() => {
                setMessages([]);
                startConsultation();
              }}
              className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Start Over</span>
            </button>

            <button
              onClick={handleOpenFullBlueprint}
              className="text-amber-400 hover:underline font-bold"
            >
              Skip to Project Blueprint →
            </button>
          </div>

        </div>
      )}
    </>
  );
};
