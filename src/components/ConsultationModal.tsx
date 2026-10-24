import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Send, 
  MessageCircle, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck,
  ArrowRight,
  Loader2,
  AlertCircle,
  Phone,
  Mail,
  Building2,
  FileText,
  Edit3,
  Bot,
  User,
  ExternalLink,
  ChevronRight,
  Clock,
  Layers,
  HelpCircle,
  Check
} from 'lucide-react';
import { NICHE_SOLUTIONS } from '../data/agencyData';
import type { NicheSolution } from '../data/agencyData';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currency: 'INR' | 'USD';
  initialSubject?: string;
}

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  options?: string[];
  demoCard?: {
    title: string;
    image: string;
    demoUrl?: string;
  };
  showBlueprintCta?: boolean;
}

export interface ProjectBlueprintData {
  businessName: string;
  industry: string;
  primaryGoals: string[];
  painPoints: string[];
  solutionTitle: string;
  solutionType: string;
  essentialFeatures: string[];
  optionalFeatures: string[];
  demoImage: string;
  demoUrl?: string;
  indicativeBudget: string;
  estimatedTimeline: string;
  clientInputsNeeded: string[];
  status: 'draft' | 'blueprint_ready' | 'client_confirmed' | 'under_owner_review' | 'quote_sent';
  contactName?: string;
  contactPhone?: string;
  contactEmail?: string;
  contactPreference?: 'whatsapp' | 'phone' | 'email';
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  currency,
  initialSubject
}) => {
  // Mode: 'consultation' (natural chat) | 'blueprint' (structured project brief) | 'quick_form' (direct quote request)
  const [activeView, setActiveView] = useState<'consultation' | 'blueprint' | 'quick_form'>('consultation');
  
  // Chat Conversation State
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatTurn, setChatTurn] = useState<number>(0);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Structured Project Blueprint Data (Persistent state)
  const [blueprint, setBlueprint] = useState<ProjectBlueprintData>({
    businessName: '',
    industry: initialSubject || 'Restaurant',
    primaryGoals: ['Online Presence', 'Direct Enquiries'],
    painPoints: ['Manual orders and scattered information'],
    solutionTitle: 'Tailored Web & Automation Platform',
    solutionType: 'Business Website & Lead Funnel',
    essentialFeatures: ['Mobile-first fluid responsive layout', '1-Tap WhatsApp Lead Capture', 'Google Maps & SEO Schema'],
    optionalFeatures: ['Custom CRM Integration', 'Automated WhatsApp Bot Reminders'],
    demoImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    indicativeBudget: currency === 'INR' ? '₹18,000 – ₹45,000 (Scope Guidance)' : '$1,200 – $3,500 (Scope Guidance)',
    estimatedTimeline: '7 से 12 कार्य दिवस',
    clientInputsNeeded: ['Brand logo & high-res photos', 'Menu / Service price list', 'Domain preference'],
    status: 'draft'
  });

  // Contact capture for quotation finalization
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPref, setContactPref] = useState<'whatsapp' | 'phone' | 'email'>('whatsapp');
  const [isSubmittingQuote, setIsSubmittingQuote] = useState(false);
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  // Initialize consultation on open
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      initConversation(initialSubject);
    }
  }, [isOpen, initialSubject]);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!isOpen) return null;

  // Initialize consultation conversation
  const initConversation = (subject?: string) => {
    const defaultIndustry = subject || 'Restaurant';
    const initialMatched = NICHE_SOLUTIONS.find(n => n.name.toLowerCase().includes(defaultIndustry.toLowerCase())) || NICHE_SOLUTIONS[0];

    updateBlueprintFromIndustry(initialMatched.name, initialMatched);

    const greeting: ChatMessage = {
      id: 'msg-1',
      sender: 'ai',
      text: `नमस्ते! मैं Vismart AI Project Consultant हूँ।\n\nमेरा उद्देश्य आपको कोई महँगा पैकेज बेचना नहीं, बल्कि आपके बिज़नेस की वास्तविक आवश्यकता को समझना और सही समाधान का खाका (Project Blueprint) तैयार करना है।\n\nआपका बिज़नेस किस प्रकार का है?`,
      options: [
        'Restaurant / Cafe',
        'Clinic / Healthcare',
        'Retail / Kirana Shop',
        'Service / Contractor',
        'Coaching / Education',
        'B2B / Manufacturer',
        'E-commerce / D2C'
      ]
    };

    setMessages([greeting]);
    setChatTurn(1);
  };

  const updateBlueprintFromIndustry = (industryName: string, matchedSolution: NicheSolution) => {
    setBlueprint(prev => ({
      ...prev,
      industry: industryName,
      solutionTitle: `${industryName} Dedicated Digital Platform`,
      solutionType: matchedSolution.solution,
      painPoints: [matchedSolution.painPoint],
      primaryGoals: [matchedSolution.businessImpact],
      essentialFeatures: matchedSolution.deliverables.slice(0, 4),
      optionalFeatures: matchedSolution.deliverables.slice(4),
      demoImage: matchedSolution.demoImage,
      indicativeBudget: currency === 'INR' ? matchedSolution.indiaBudget : matchedSolution.usaBudget,
      estimatedTimeline: '7 से 12 कार्य दिवस'
    }));
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text.trim()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      processNextAiTurn(text.trim(), chatTurn);
      setIsTyping(false);
    }, 600);
  };

  const processNextAiTurn = (userInput: string, currentTurn: number) => {
    const lower = userInput.toLowerCase();

    // Turn 1: Process Industry Selection
    if (currentTurn === 1) {
      const matched = NICHE_SOLUTIONS.find(n => 
        lower.includes(n.name.toLowerCase()) || 
        lower.includes(n.hindiName.toLowerCase()) ||
        n.painPoint.toLowerCase().includes(lower) ||
        n.solution.toLowerCase().includes(lower)
      ) || NICHE_SOLUTIONS[0];

      updateBlueprintFromIndustry(matched.name, matched);
      setChatTurn(2);

      let questionText = '';
      let options: string[] = [];

      if (lower.includes('restaurant') || lower.includes('cafe')) {
        questionText = `बहुत बढ़िया! Restaurant के लिए साधारण वेबसाइट के मुकाबले ऑनलाइन मेनू और बुकिंग सिस्टम ज्यादा उपयोगी होता है।\n\nआपका मुख्य उद्देश्य क्या है?`;
        options = [
          'Direct Food Orders + WhatsApp',
          'Table Booking + Google Maps',
          'Only Digital QR Menu',
          'All of the above'
        ];
      } else if (lower.includes('clinic') || lower.includes('doctor') || lower.includes('health')) {
        questionText = `क्लीनिक और हेल्थकेयर के लिए मरीजों का भरोसा और समय पर अपॉइंटमेंट सबसे ज़रूरी है।\n\nआपकी मुख्य प्राथमिकता क्या है?`;
        options = [
          '24/7 Live Patient Appointment Slots',
          'Auto WhatsApp Reminders (No-Shows कम करना)',
          'Doctor Profiles & Transparent Fees',
          'All of the above'
        ];
      } else if (lower.includes('contractor') || lower.includes('service') || lower.includes('hvac')) {
        questionText = `सर्विस और कॉन्ट्रैक्टर बिज़नेस में ग्राहक एरिया और तुरंत कॉल लीड्स चाहते हैं।\n\nआपकी मुख्य ज़रूरत क्या है?`;
        options = [
          'Emergency 1-Tap Call Dispatch',
          'Zip-Code Territory Validator',
          'Instant Online Quote Estimator',
          'All of the above'
        ];
      } else if (lower.includes('b2b') || lower.includes('manufactur')) {
        questionText = `B2B और मैन्युफैक्चरिंग में भारी कैटलॉग भेजने के बजाय डिजिटल RFQ (Request for Quote) सबसे असरदार है।\n\nआप क्या चाहते हैं?`;
        options = [
          'Digital B2B Catalog + 1-Click RFQ',
          'Technical Spec Sheets / TDS Download',
          'Export / Multi-Currency Inquiry System',
          'All of the above'
        ];
      } else {
        questionText = `उत्कृष्ट! इस बिज़नेस के लिए डिजिटल पहचान और लीड फनल सबसे ज्यादा महत्वपूर्ण है।\n\nआपकी मुख्य प्राथमिकता क्या है?`;
        options = [
          'ऑनलाइन लीड्स और ग्राहक पूछताछ',
          'ऑनलाइन बिक्री और पेमेंट्स',
          'कस्टम बिज़नेस मैनेजमेंट व ऑटोमेशन'
        ];
      }

      setMessages(prev => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: questionText,
          options
        }
      ]);
    }
    // Turn 2: Process Primary Goals & Suggest Live Demo
    else if (currentTurn === 2) {
      setBlueprint(prev => ({
        ...prev,
        primaryGoals: [userInput, ...prev.primaryGoals]
      }));
      setChatTurn(3);

      setMessages(prev => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: `समझ गया! इस उद्देश्य के लिए हमने पहले भी सफल समाधान तैयार किए हैं।\n\nक्या आप इससे मिलता-जुलता वास्तविक वर्किंग डेमो देखना चाहेंगे?`,
          demoCard: {
            title: `${blueprint.industry} Interactive Working Demo`,
            image: blueprint.demoImage,
            demoUrl: '#demos'
          },
          options: [
            'हाँ, डेमो प्रोटोटाइप देखना है',
            'सीधे प्रोजेक्ट का Blueprint तैयार करें',
            'मुझे कुछ विशेष फीचर्स भी जोड़ने हैं'
          ]
        }
      ]);
    }
    // Turn 3: Current Digital Presence & Timeline Scoping
    else if (currentTurn === 3) {
      setChatTurn(4);

      setMessages(prev => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: `क्या आपके पास पहले से कोई डोमेन या पुरानी वेबसाइट है, या आप बिल्कुल नया (Scratch से) शुरू कर रहे हैं? और आपकी लक्षित समय-सीमा क्या है?`,
          options: [
            'बिल्कुल नया शुरू करना है (Fresh Project)',
            'पुरानी वेबसाइट को नया रूप देना है (Redesign)',
            'जल्द से जल्द (1-2 हफ्तों में लॉन्च)',
            'आराम से 3-4 हफ्तों में'
          ]
        }
      ]);
    }
    // Turn 4: Finalize Requirements & Produce "Your Project Blueprint"
    else {
      setBlueprint(prev => ({
        ...prev,
        status: 'blueprint_ready'
      }));

      setMessages(prev => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: `शानदार! मैंने आपकी सभी बातों को ध्यानपूर्वक समझ लिया है।\n\nआपके प्रोजेक्ट के लिए एक संपूर्ण **"Your Project Blueprint"** तैयार कर दिया गया है।\n\nआप नीचे दिए गए बटन पर क्लिक करके अपना ब्लूप्रिंट देख सकते हैं, आवश्यकतानुसार सुधार कर सकते हैं, और फिर हमारे स्टूडियो ओनर से **मानव-सत्यापित अंतिम कोटेशन (Human-Approved Final Quotation)** माँग सकते हैं।`,
          showBlueprintCta: true
        }
      ]);
    }
  };

  // Submit human-approved final quote request
  const handleFinalQuoteRequest = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!contactName.trim()) {
      setSubmissionError('कृपया अपना पूरा नाम लिखें।');
      return;
    }

    if (!contactPhone.trim() && !contactEmail.trim()) {
      setSubmissionError('कृपया WhatsApp नंबर या ईमेल आईडी प्रदान करें।');
      return;
    }

    setIsSubmittingQuote(true);
    setSubmissionError(null);

    const updatedBlueprint: ProjectBlueprintData = {
      ...blueprint,
      contactName: contactName.trim(),
      contactPhone: contactPhone.trim(),
      contactEmail: contactEmail.trim(),
      contactPreference: contactPref,
      status: 'under_owner_review'
    };

    setBlueprint(updatedBlueprint);

    // Save locally for persistence
    try {
      const existingBriefs = JSON.parse(localStorage.getItem('vismart_project_briefs') || '[]');
      existingBriefs.push({
        ...updatedBlueprint,
        submittedAt: new Date().toISOString()
      });
      localStorage.setItem('vismart_project_briefs', JSON.stringify(existingBriefs));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }

    // Try sending to lead endpoint
    try {
      await fetch('http://localhost:3000/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: contactName.trim(),
          phone: contactPhone.trim(),
          email: contactEmail.trim(),
          category: blueprint.industry,
          service: blueprint.solutionTitle,
          requirements: JSON.stringify({
            primaryGoals: blueprint.primaryGoals,
            painPoints: blueprint.painPoints,
            essentialFeatures: blueprint.essentialFeatures,
            indicativeBudget: blueprint.indicativeBudget
          }),
          source: 'Vismart AI Consultant - Project Blueprint'
        })
      });
    } catch (err) {
      console.log('CRM endpoint offline, local draft preserved.');
    }

    setIsSubmittingQuote(false);
    setQuoteSubmitted(true);
  };

  const getWhatsAppBlueprintLink = () => {
    const text = `Hello Vismart Studio,
I have finalized my Project Blueprint via Vismart AI Consultant:

• Business / Client: ${contactName || 'Prospective Client'}
• Industry: ${blueprint.industry}
• Solution Architecture: ${blueprint.solutionTitle}
• Primary Goals: ${blueprint.primaryGoals.join(', ')}
• Indicative Budget Guidance: ${blueprint.indicativeBudget}
• Contact: ${contactPhone || contactEmail || 'Via WhatsApp'}

Please review this brief and issue the Human-Approved Final Quotation & Scope Agreement.`;

    return `https://wa.me/919999999999?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl animated-glass-card rounded-3xl overflow-hidden border border-white/20 shadow-2xl flex flex-col max-h-[92vh]">
        
        {/* Top Header with Navigation Tabs */}
        <div className="p-4 sm:p-5 border-b border-white/10 bg-[#060913]/90 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-500 flex items-center justify-center text-white font-black text-xl shadow-glow shrink-0">
              <Bot className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-black text-white">
                  Vismart AI Project Consultant
                </h3>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-amber-400 text-slate-950">
                  Trust-First Engine
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">
                Consult First • Understand Fully • Blueprint • Human-Approved Quotation
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* View Switcher Tabs */}
            <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-white/10 text-xs font-bold">
              <button
                onClick={() => setActiveView('consultation')}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  activeView === 'consultation' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                Chat
              </button>
              <button
                onClick={() => setActiveView('blueprint')}
                className={`px-3 py-1 rounded-lg flex items-center gap-1 transition-colors ${
                  activeView === 'blueprint' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>Blueprint</span>
                {blueprint.status === 'blueprint_ready' && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                )}
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* =========================================================================
            VIEW 1: NATURAL AI CONSULTATION CHAT
            ========================================================================= */}
        {activeView === 'consultation' && (
          <div className="flex-1 flex flex-col justify-between overflow-hidden bg-slate-950/70">
            
            {/* Scrollable Messages Area */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
              
              {/* Trust Disclaimer */}
              <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-500/30 text-blue-200 text-xs flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  <strong>Zero-Pressure Guarantee:</strong> यह AI प्रोजेक्ट कंसल्टेंट है। हम शुरुआत में कोई अंतिम बिल या पैकेज नहीं थोपते। आपकी आवश्यकताओं की पुष्टि के बाद ही स्टूडियो ओनर द्वारा फाइनल कोटेशन तैयार किया जाएगा।
                </span>
              </div>

              {/* Message Feed */}
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'ai' && (
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-slate-950 shrink-0 text-xs font-black shadow-md mt-1">
                      V
                    </div>
                  )}

                  <div className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                    msg.sender === 'user' 
                      ? 'bg-amber-400 text-slate-950 font-bold rounded-tr-none shadow-md' 
                      : 'bg-slate-900 border border-white/15 text-slate-100 rounded-tl-none shadow-xl'
                  }`}>
                    <p className="whitespace-pre-line">{msg.text}</p>

                    {/* Inline Demo Preview Card if suggested */}
                    {msg.demoCard && (
                      <div className="mt-3 rounded-xl overflow-hidden border border-white/15 bg-slate-950 group">
                        <img 
                          src={msg.demoCard.image} 
                          alt={msg.demoCard.title}
                          className="w-full h-32 object-cover group-hover:scale-105 transition-transform" 
                        />
                        <div className="p-3 flex items-center justify-between">
                          <span className="font-bold text-xs text-white">{msg.demoCard.title}</span>
                          <span className="text-[10px] text-cyan-400 font-black uppercase">Live Working Demo</span>
                        </div>
                      </div>
                    )}

                    {/* Quick Choice Pills */}
                    {msg.options && msg.options.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5 pt-2 border-t border-white/10">
                        {msg.options.map((opt, oIdx) => (
                          <button
                            key={oIdx}
                            onClick={() => handleSendMessage(opt)}
                            className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-amber-400 hover:text-slate-950 border border-white/15 text-slate-200 text-xs font-bold transition-all active:scale-95 text-left"
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Direct CTA to open Blueprint */}
                    {msg.showBlueprintCta && (
                      <div className="mt-4 pt-3 border-t border-white/15">
                        <button
                          onClick={() => setActiveView('blueprint')}
                          className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-500/30 hover:scale-102 transition-transform"
                        >
                          <FileText className="w-4 h-4" />
                          <span>View Your Project Blueprint Now →</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex gap-2 items-center text-slate-400 text-xs">
                  <div className="w-6 h-6 rounded-lg bg-slate-900 border border-white/10 flex items-center justify-center">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" />
                  </div>
                  <span>Vismart AI Consultant is formulating insights...</span>
                </div>
              )}

              <div ref={chatBottomRef} />
            </div>

            {/* Input Bar */}
            <div className="p-3 sm:p-4 bg-slate-900/95 border-t border-white/10 shrink-0">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="अपनी बात लिखें या ऊपर विकल्प चुनें..."
                  className="flex-1 px-4 py-3 rounded-xl bg-slate-950 border border-white/15 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-amber-400 shadow-inner"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="p-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold hover:brightness-110 active:scale-95 disabled:opacity-40 transition-all shadow-md shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>

          </div>
        )}

        {/* =========================================================================
            VIEW 2: THE VALUABLE "YOUR PROJECT BLUEPRINT" CARD
            ========================================================================= */}
        {activeView === 'blueprint' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-950/80 text-white space-y-5">
            
            {!quoteSubmitted ? (
              <>
                {/* Blueprint Header */}
                <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-amber-950/30 border border-amber-500/30 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 block mb-1">
                      Preliminary Solution Specification
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black text-white">
                      Your Project Blueprint
                    </h2>
                    <p className="text-xs text-slate-300 mt-1">
                      Prepared from your project discussion with Vismart AI Consultant
                    </p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-950 border border-white/10 text-right shrink-0">
                    <span className="text-[9px] font-bold text-slate-400 uppercase block">Status</span>
                    <span className="text-xs font-black text-amber-400 flex items-center gap-1 justify-end">
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                      <span>Blueprint Ready</span>
                    </span>
                  </div>
                </div>

                {/* 2-Column Blueprint Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  
                  {/* Left: What We Understood */}
                  <div className="p-4 rounded-xl bg-slate-900/90 border border-white/10 space-y-3">
                    <div className="flex items-center gap-1.5 text-amber-400 font-bold text-xs uppercase tracking-wider">
                      <Building2 className="w-4 h-4" />
                      <span>1. What We Understood (आपकी पहचान व लक्ष्य)</span>
                    </div>

                    <div>
                      <span className="text-slate-400 text-[10px] block">Business / Industry:</span>
                      <strong className="text-white text-sm">{blueprint.industry}</strong>
                    </div>

                    <div>
                      <span className="text-slate-400 text-[10px] block">Primary Business Goals:</span>
                      <ul className="space-y-1 mt-1 text-slate-200">
                        {blueprint.primaryGoals.map((g, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-emerald-400 font-bold">✓</span>
                            <span>{g}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <span className="text-slate-400 text-[10px] block">Identified Pain Points:</span>
                      <p className="text-slate-300 mt-0.5">{blueprint.painPoints[0] || 'Manual operations and scattered lead collection'}</p>
                    </div>
                  </div>

                  {/* Right: Suggested Solution Architecture */}
                  <div className="p-4 rounded-xl bg-slate-900/90 border border-white/10 space-y-3">
                    <div className="flex items-center gap-1.5 text-cyan-400 font-bold text-xs uppercase tracking-wider">
                      <Layers className="w-4 h-4" />
                      <span>2. Suggested Solution Architecture</span>
                    </div>

                    <div>
                      <span className="text-slate-400 text-[10px] block">Architecture Name:</span>
                      <strong className="text-cyan-300 text-sm">{blueprint.solutionTitle}</strong>
                    </div>

                    <div>
                      <span className="text-slate-400 text-[10px] block">Estimated Delivery Timeline:</span>
                      <span className="text-white font-bold">{blueprint.estimatedTimeline}</span>
                    </div>

                    {/* Budget Guidance Box (Clearly Labeled Subject to Final Scope) */}
                    <div className="p-3 rounded-lg bg-slate-950 border border-white/10">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Indicative Investment Band (Guidance Only):
                      </span>
                      <div className="text-lg font-black text-amber-400 mt-0.5">
                        {blueprint.indicativeBudget}
                      </div>
                      <span className="text-[10px] text-slate-400 block mt-0.5">
                        * वास्तविक फाइनल कोटेशन स्कोप व मानव-सत्यापन के बाद तय होगा।
                      </span>
                    </div>
                  </div>

                </div>

                {/* Features & Deliverables Checklist */}
                <div className="p-4 rounded-xl bg-slate-900/90 border border-white/10">
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-3">
                    3. Key Features Included in this Blueprint:
                  </span>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {blueprint.essentialFeatures.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 p-2 rounded-lg bg-slate-950/60 border border-white/5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="text-slate-200">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Relevant Live Prototype Match */}
                <div className="p-4 rounded-xl bg-slate-900/90 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img 
                      src={blueprint.demoImage} 
                      alt="Demo Match" 
                      className="w-16 h-12 rounded-lg object-cover border border-white/10 shrink-0" 
                    />
                    <div>
                      <span className="text-[10px] font-bold text-cyan-400 uppercase block">Matched Working Prototype</span>
                      <h4 className="text-xs font-bold text-white">{blueprint.industry} Live Interactive Demo</h4>
                    </div>
                  </div>

                  <a
                    href="#demos"
                    onClick={onClose}
                    className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5 border border-white/10 shrink-0"
                  >
                    <span>Test Working Demo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Final Step: Human-Approved Quotation Request Form */}
                <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-amber-500/40 shadow-xl">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center">
                      4
                    </span>
                    <div>
                      <h3 className="text-sm font-black text-white">
                        Next Step — Request Human-Approved Final Quotation
                      </h3>
                      <p className="text-[11px] text-slate-400">
                        Vismart Studio के फाउंडर आपकी आवश्यकताओं का रिव्यू करेंगे और लिखित कोटेशन तैयार करेंगे।
                      </p>
                    </div>
                  </div>

                  {submissionError && (
                    <div className="mb-3 p-2.5 rounded-lg bg-rose-950/70 border border-rose-500/50 text-rose-200 text-xs">
                      {submissionError}
                    </div>
                  )}

                  <form onSubmit={handleFinalQuoteRequest} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="block text-slate-300 font-bold mb-1">Your Name *</label>
                        <input
                          type="text"
                          required
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          placeholder="e.g. Mohit Sharma"
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:outline-none focus:border-amber-400"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-300 font-bold mb-1">WhatsApp / Phone Number *</label>
                        <input
                          type="tel"
                          required
                          value={contactPhone}
                          onChange={(e) => setContactPhone(e.target.value)}
                          placeholder="e.g. +91 98765 43210"
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="block text-slate-300 font-bold mb-1">Email (Optional for PDF Quote)</label>
                        <input
                          type="email"
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          placeholder="name@business.com"
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:outline-none focus:border-amber-400"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-300 font-bold mb-1">Preferred Contact Mode</label>
                        <select
                          value={contactPref}
                          onChange={(e) => setContactPref(e.target.value as any)}
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-white text-xs focus:outline-none focus:border-amber-400"
                        >
                          <option value="whatsapp">WhatsApp (Fastest Response)</option>
                          <option value="phone">Direct Phone Call</option>
                          <option value="email">Email Proposal</option>
                        </select>
                      </div>
                    </div>

                    {/* Dual Action Buttons */}
                    <div className="pt-2 flex flex-col sm:flex-row items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setActiveView('consultation')}
                        className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit Requirements</span>
                      </button>

                      <button
                        type="submit"
                        disabled={isSubmittingQuote}
                        className="flex-1 w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-500/30 hover:scale-102 transition-transform disabled:opacity-50"
                      >
                        {isSubmittingQuote ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Submitting to Studio Owner...</span>
                          </>
                        ) : (
                          <>
                            <ShieldCheck className="w-4 h-4" />
                            <span>Submit for Human-Approved Final Quote →</span>
                          </>
                        )}
                      </button>
                    </div>

                  </form>
                </div>
              </>
            ) : (
              /* Success Confirmation */
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto text-2xl font-black">
                  ✓
                </div>

                <h3 className="text-xl font-black text-white">
                  Project Blueprint Received by Vismart Studio!
                </h3>

                <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                  धन्यवाद <strong>{contactName}</strong>! आपकी आवश्यकताओं का पूरा विवरण Vismart Studio की तकनीकी समीक्षा टीम के पास पहुँच चुका है। कोई ऑटोमैटिक अनुमान नहीं—वास्तविक स्कोप देखकर हमारे फाउंडर आपसे संपर्क करेंगे।
                </p>

                <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={getWhatsAppBlueprintLink()}
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition-all hover:scale-105"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Fast-Track on WhatsApp with Blueprint</span>
                  </a>

                  <button
                    onClick={onClose}
                    className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs"
                  >
                    Close & Keep Browsing
                  </button>
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
