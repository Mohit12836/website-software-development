import React from 'react';
import { 
  FileText, 
  Layout, 
  Cpu, 
  Rocket, 
  KeyRound, 
  ShieldCheck, 
  Clock, 
  ArrowRight,
  Headphones,
  CheckCircle2
} from 'lucide-react';

interface ProjectWorkflowProps {
  onOpenConsultation: () => void;
}

export const ProjectWorkflowSection: React.FC<ProjectWorkflowProps> = ({
  onOpenConsultation
}) => {
  const steps = [
    {
      step: '01',
      title: '₹0 Scoping & Written Scope Agreement',
      time: 'Day 1',
      icon: FileText,
      tag: 'Zero Risk',
      description: 'बिना किसी एडवांस के 20 मिनट का कॉल। हम आपकी बिज़नेस समस्या, पेज काउंट, फीचर्स और डिलीवरी की तारीख लिखित में तय करते हैं। कोई छिपे हुए नियम नहीं।',
      deliverables: ['लिखित प्रोजेक्ट स्कोप व टाइमलाइन', 'फिक्स कोटेशन गारंटी', 'फ्री टेक आर्किटेक्चर प्लान']
    },
    {
      step: '02',
      title: 'Interactive Prototype & UI/UX Testing',
      time: 'Day 3 – 5',
      icon: Layout,
      tag: 'Live Preview',
      description: 'हम सीधे लाइव वर्किंग प्रोटोटाइप दिखाते हैं। आप अपने मोबाइल और लैपटॉप पर चलाकर देखते हैं। जब तक आप 100% संतुष्ट न हों, तब तक बदलाव किए जाते हैं।',
      deliverables: ['मोबाइल और पीसी लाइव डेमो लिंक', 'ब्रांड कलर व टाइपोग्राफी फाइनल', 'प्रस्तावित पैकेज अनुसार रिवीजन']
    },
    {
      step: '03',
      title: 'High-Speed Engineering & Integrations',
      time: 'Day 6 – 10',
      icon: Cpu,
      tag: '100% Auto-Fit',
      description: 'Next.js/React पर 1.2 सेकंड स्पीड, Google SEO स्कीमा, 1-टैप WhatsApp इंटीग्रेशन और रेज़रपे/स्ट्राइप सिक्योर पेमेंट गेटवे का एंड-टू-एंड डेवलपमेंट।',
      deliverables: ['Core Web Vitals < 1.5s स्पीड', 'WhatsApp ऑटोमेशन व CRM सिंक', 'सिक्योर SSL & डेटाबेस बैकअप']
    },
    {
      step: '04',
      title: 'Launch, 100% Code Handover & 30 Days Care',
      time: 'Launch Day',
      icon: Rocket,
      tag: 'Complete Ownership',
      description: 'वेबसाइट लाइव होने के बाद डोमेन, गिटहब सोर्स कोड और होस्टिंग क्रेडेंशियल्स 100% आपको ट्रांसफर कर दिए जाते हैं। साथ में 30 दिन का फ्री मेंटेनेंस सपोर्ट।',
      deliverables: ['100% कोड व डोमेन आपके नाम', 'स्टाफ ट्रेनिंग वीडियो ट्यूटोरियल', '30 दिन की फ्री वारंटी व सपोर्ट']
    }
  ];

  return (
    <section id="process" className="py-20 bg-[#f8fafc] border-b border-slate-200">
      <div className="container-fluid">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-950 text-xs font-black uppercase tracking-wider mb-3">
            <ShieldCheck className="w-4 h-4 text-amber-700" />
            <span>100% Transparent Project Delivery</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
            How Your Project Works: शुरू से अंत तक की स्पष्ट प्रक्रिया
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            आपको पहले दिन से पता होगा कि काम कौन कर रहा है, क्या मिलेगा, डोमेन व कोड किसके पास रहेगा और डिलीवरी के बाद कौन संभालेगा।
          </p>
        </div>

        {/* 4-Step Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="animated-glass-card rounded-2xl p-6 flex flex-col justify-between relative shadow-xl hover:-translate-y-1.5 transition-transform duration-300 group"
              >
                <div>
                  {/* Top Step Number & Time Badge */}
                  <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                    <span className="text-3xl font-black text-amber-400/80 font-mono">
                      {item.step}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300 bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
                      <Clock className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{item.time}</span>
                    </div>
                  </div>

                  {/* Icon & Title */}
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500/20 to-cyan-500/20 border border-white/15 flex items-center justify-center mb-4 text-amber-300 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>

                  <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 inline-block mb-2">
                    {item.tag}
                  </span>

                  <h3 className="text-base font-black text-white leading-snug mb-3">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Deliverables Checklist */}
                <div className="mt-6 pt-4 border-t border-white/10">
                  <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider block mb-2">
                    इस चरण का Deliverable:
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-200">
                    {item.deliverables.map((d, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="text-[11px] font-medium leading-tight">{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            );
          })}
        </div>

        {/* The 100% Code Ownership & Trust Guarantee Callout */}
        <div className="mt-12 max-w-4xl mx-auto p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700 shrink-0">
              <KeyRound className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-black text-slate-900">
                100% Code & Domain Ownership Guarantee
              </h4>
              <p className="text-xs text-slate-600 mt-0.5">
                हम कभी भी क्लाइंट को लॉक नहीं करते। आपकी वेबसाइट, डोमेन, गिटहब कोड और होस्टिंग के पूर्ण मालिक आप रहेंगे।
              </p>
            </div>
          </div>

          <button
            onClick={onOpenConsultation}
            className="px-6 py-3 rounded-xl bg-slate-950 text-white hover:bg-slate-800 font-black text-xs shrink-0 flex items-center gap-2 shadow-md transition-all hover:scale-105"
          >
            <span>Book ₹0 Scoping Call</span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
          </button>
        </div>

      </div>
    </section>
  );
};
