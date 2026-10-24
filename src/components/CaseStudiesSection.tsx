import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  TrendingUp, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Building2,
  Stethoscope,
  UtensilsCrossed,
  Wrench
} from 'lucide-react';

interface CaseStudiesProps {
  currency: 'INR' | 'USD';
  onOpenConsultation: (projectName: string) => void;
}

interface CaseStudy {
  id: string;
  category: string;
  badge: 'Client Case Study' | 'Interactive Demo Prototype';
  client: string;
  location: string;
  icon: any;
  before: {
    title: string;
    issues: string[];
    lossMetric: string;
    screenshot: string;
  };
  after: {
    title: string;
    features: string[];
    resultMetric: string;
    screenshot: string;
  };
  roiProof: string;
  techStack: string[];
}

export const CaseStudiesSection: React.FC<CaseStudiesProps> = ({
  currency,
  onOpenConsultation
}) => {
  const [activeTab, setActiveTab] = useState<string>('restaurant');

  const cases: Record<string, CaseStudy> = {
    restaurant: {
      id: 'restaurant',
      category: 'Restaurant & Dining',
      badge: 'Client Case Study',
      client: 'The Royal Biryani & Cafe',
      location: 'New Delhi, India',
      icon: UtensilsCrossed,
      before: {
        title: 'पुराना सिस्टम: 30% कमीशन व बिखरी जानकारी',
        issues: [
          'Swiggy / Zomato पर 28–30% भारी कमीशन देना पड़ रहा था',
          'Instagram पर लोग खाना देखते थे पर मेनू व लोकेशन के लिए अलग कॉल करते थे',
          'PDF मेनू स्लो लोड होता था, मोबाइल पर ज़ूम करना पड़ता था'
        ],
        lossMetric: '₹40,000+ हर महीने डिलीवरी कमीशन में नुकसान',
        screenshot: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=700&q=80'
      },
      after: {
        title: 'Vismart Studio समाधान: डायरेक्ट QR मेनू व बुकिंग',
        features: [
          'लाइटनिंग फास्ट 1.2s QR डिजिटल मेनू (फोटो, रेट, सामग्री के साथ)',
          '1-टैप डायरेक्ट WhatsApp टेबल रिजर्वेशन व होम डिलीवरी ऑर्डर',
          'Google Maps लोकेशन व कस्टमर रिव्यूज का लाइव सिंक'
        ],
        resultMetric: currency === 'INR' ? '₹45,000/माह कमीशन बचत + 40% डायरेक्ट ऑर्डर्स' : '$550/mo saved in aggregator commissions',
        screenshot: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=700&q=80'
      },
      roiProof: '30 दिनों के भीतर वेबसाइट की पूरी लागत कमीशन बचत से वसूल हो गई।',
      techStack: ['Next.js / React', 'WhatsApp Cloud API', 'Cloudflare CDN', 'Tailwind CSS']
    },
    clinic: {
      id: 'clinic',
      category: 'Clinic & Healthcare',
      badge: 'Client Case Study',
      client: 'CareDental Specialists',
      location: 'Bangalore, India',
      icon: Stethoscope,
      before: {
        title: 'पुराना सिस्टम: फोन पर बुकिंग और No-Shows',
        issues: [
          'मरीजों को अपॉइंटमेंट के लिए बार-बार कॉल करना पड़ता था',
          'रिसेप्शनिस्ट पर अत्यधिक भीड़ और मैनुअल रजिस्टर में गलतियाँ',
          '35% मरीज बिना बताए नहीं आते थे (No-Shows)'
        ],
        lossMetric: 'प्रतिदिन 3 से 4 डॉक्टर के खाली स्लॉट्स का नुकसान',
        screenshot: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=700&q=80'
      },
      after: {
        title: 'Vismart Studio समाधान: लाइव स्लॉट व ऑटो रिमाइंडर्स',
        features: [
          '24/7 सेल्फ-सर्विस डॉक्टर स्लॉट सेलेक्शन वेबसाइट',
          'ऑटोमैटिक 24 घंटे पहले WhatsApp कंफर्मेशन व टाइम रिमाइंडर',
          'क्लीनिक लोकेशन, डॉक्टर प्रोफाइल और इलाज की पारदर्शी फीस'
        ],
        resultMetric: 'No-Shows 40% कम हुए + 24/7 बिना रिसेप्शनिस्ट के बुकिंग',
        screenshot: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=700&q=80'
      },
      roiProof: 'डॉक्टरों का समय 92% बुक रहने लगा, जिससे क्लीनिक की मासिक आय 35% बढ़ी।',
      techStack: ['React', 'Node.js Slots Engine', 'Twilio/WACA', 'PostgreSQL']
    },
    contractor: {
      id: 'contractor',
      category: 'US Home Services / HVAC',
      badge: 'Client Case Study',
      client: 'Apex HVAC & Emergency Roofing',
      location: 'Dallas, Texas, USA',
      icon: Wrench,
      before: {
        title: 'Previous: Slow Static Brochure Website',
        issues: [
          'High $75/click Google Local Ads bouncing due to 4.5s load time',
          'Customers had to fill a tedious 12-field form during emergency AC breakdown',
          'No visible service-area radius or instant quote estimator'
        ],
        lossMetric: 'Over $6,000/month wasted on ad clicks without call leads',
        screenshot: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=700&q=80'
      },
      after: {
        title: 'Vismart Studio Solution: 2-Step Emergency Dispatch Funnel',
        features: [
          '1.1s Mobile Core Web Vitals with instant 1-tap call dispatch',
          'Zip-code territory validator + real-time diagnostic price calculator',
          'Verified Google Local Guarantee & 5-Star BBB Trust Badges'
        ],
        resultMetric: '2.4x Inbound Emergency Calls + 38% Reduction in Ad Lead Cost',
        screenshot: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=700&q=80'
      },
      roiProof: 'Generated 42 new residential HVAC replacements within first 60 days.',
      techStack: ['Vite / Tailwind v4', 'AWS Edge', 'Google Maps API', 'Stripe Payments']
    },
    b2b: {
      id: 'b2b',
      category: 'Manufacturing & B2B Wholesaler',
      badge: 'Client Case Study',
      client: 'Singhania Polymers & Exporters',
      location: 'Ahmedabad & Dubai',
      icon: Building2,
      before: {
        title: 'पुराना सिस्टम: भारी 60MB PDF और खोती विदेशी डील्स',
        issues: [
          'व्हाट्सएप पर 60MB कैटलॉग फाइल भेजने पर विदेशी क्लाइंट डाउनलोड नहीं करते थे',
          'विभिन्न देशों के खरीदारों को कस्टम कोटेशन देने में 3–4 दिन लगते थे',
          'उत्पाद स्पेसिफिकेशन और MOQ (न्यूनतम मात्रा) की स्पष्ट जानकारी नहीं थी'
        ],
        lossMetric: 'अंतरराष्ट्रीय एक्सपोर्ट पूछताछ का 50% से अधिक ड्रॉप-ऑफ',
        screenshot: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=700&q=80'
      },
      after: {
        title: 'Vismart Studio समाधान: डिजिटल RFQ व एक्सपोर्ट कैटलॉग',
        features: [
          'मल्टी-करेंसी (USD/INR/AED) डिजिटल B2B कैटलॉग विद 1-क्लिक RFQ',
          'टेक्निकल डेटा शीट (TDS) और लैबोरेटरी सर्टिफिकेशन का तुरंत डाउनलोड',
          'कस्टमर इंक्वायरी सीधे फाउंडर के WhatsApp व CRM में रियल-टाइम अलर्ट'
        ],
        resultMetric: currency === 'INR' ? '₹85 लाख+ की नई एक्सपोर्ट पूछताछ जनरेट हुई' : '$1.1M+ in qualified bulk wholesale export quotes',
        screenshot: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=700&q=80'
      },
      roiProof: 'UAE और ईस्ट अफ्रीका से 3 बड़े वार्षिक डिस्ट्रीब्यूटर कॉन्ट्रैक्ट्स फाइनल हुए।',
      techStack: ['Next.js 15', 'Prisma DB', 'PDF Generation Engine', 'Tailwind']
    }
  };

  const activeCase = cases[activeTab];

  return (
    <section id="case-studies" className="py-20 bg-[#ffffff] border-b border-slate-200">
      <div className="container-fluid">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-black uppercase tracking-wider mb-3">
            <TrendingUp className="w-4 h-4 text-emerald-700" />
            <span>Before / After & Real Proof</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
            किए गए काम और सत्यापित बिज़नेस परिणाम
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            ग्राहक सिर्फ सुंदरता नहीं देखता, वह यह देखता है कि पुरानी समस्याओं को कैसे खत्म किया गया। यहाँ देखें वास्तविक ग्राहकों की पुरानी स्थिति और Vismart Studio के बाद का असर।
          </p>
        </div>

        {/* Tab Selector Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {Object.values(cases).map((cs) => {
            const Icon = cs.icon;
            const isActive = activeTab === cs.id;
            return (
              <button
                key={cs.id}
                onClick={() => setActiveTab(cs.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                  isActive 
                    ? 'bg-slate-950 text-white shadow-lg shadow-slate-900/20 scale-105' 
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
                <span>{cs.category}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-black ${
                  isActive ? 'bg-amber-400 text-slate-950' : 'bg-slate-200 text-slate-600'
                }`}>
                  Proof
                </span>
              </button>
            );
          })}
        </div>

        {/* Main Transformation Showcase (Black Obsidian Glass Card on Light Surface) */}
        <div className="max-w-5xl mx-auto animated-glass-card rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          
          {/* Top Client Meta Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                  {activeCase.badge}
                </span>
                <span className="text-xs text-slate-400">• {activeCase.location}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                {activeCase.client}
              </h3>
            </div>

            <div className="p-3 rounded-2xl bg-slate-900/90 border border-white/10 text-right">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Verified Business Outcome</span>
              <span className="text-sm sm:text-base font-black text-emerald-400">{activeCase.after.resultMetric}</span>
            </div>
          </div>

          {/* 2-Column Before vs After Comparison */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* BEFORE Column (Red / Warning Theme) */}
            <div className="rounded-2xl p-5 bg-rose-950/30 border border-rose-500/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-rose-500/20 mb-4">
                  <span className="px-3 py-1 rounded-lg bg-rose-500/20 text-rose-300 font-black text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <XCircle className="w-3.5 h-3.5 text-rose-400" />
                    <span>BEFORE Vismart Studio</span>
                  </span>
                  <span className="text-[11px] text-rose-300 font-semibold">पुराना दर्द</span>
                </div>

                <h4 className="text-sm sm:text-base font-bold text-white mb-3">
                  {activeCase.before.title}
                </h4>

                <ul className="space-y-2.5 text-xs text-slate-300">
                  {activeCase.before.issues.map((issue, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-rose-400 font-bold text-sm shrink-0">✕</span>
                      <span className="leading-relaxed">{issue}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-rose-500/20">
                <span className="text-[10px] font-bold uppercase text-rose-400 block">संभावित नुकसान:</span>
                <span className="text-xs sm:text-sm font-black text-rose-200">{activeCase.before.lossMetric}</span>
              </div>
            </div>

            {/* AFTER Column (Emerald / Success Theme) */}
            <div className="rounded-2xl p-5 bg-emerald-950/40 border border-emerald-500/40 flex flex-col justify-between shadow-lg">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-emerald-500/20 mb-4">
                  <span className="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 font-black text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>AFTER Vismart Studio</span>
                  </span>
                  <span className="text-[11px] text-emerald-300 font-semibold">सत्यापित समाधान</span>
                </div>

                <h4 className="text-sm sm:text-base font-bold text-white mb-3">
                  {activeCase.after.title}
                </h4>

                <ul className="space-y-2.5 text-xs text-slate-200">
                  {activeCase.after.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold text-sm shrink-0">✓</span>
                      <span className="leading-relaxed font-medium">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-emerald-500/20">
                <span className="text-[10px] font-bold uppercase text-emerald-400 block">प्रमाणित असर (ROI Proof):</span>
                <span className="text-xs sm:text-sm font-black text-white">{activeCase.roiProof}</span>
              </div>
            </div>

          </div>

          {/* Bottom Tech Stack & Action Bar */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold text-slate-400">Production Tech:</span>
              {activeCase.techStack.map((tech, idx) => (
                <span key={idx} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-cyan-300">
                  {tech}
                </span>
              ))}
            </div>

            <button
              onClick={() => onOpenConsultation(`Case Study: ${activeCase.client}`)}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-orange-500/30 hover:scale-105 active:scale-95 transition-all"
            >
              <span>Build A Similar Solution For My Business</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
