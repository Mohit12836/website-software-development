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
  Wrench,
  AlertCircle
} from 'lucide-react';

interface CaseStudiesProps {
  currency: 'INR' | 'USD';
  onOpenConsultation: (projectName: string) => void;
}

export const CaseStudiesSection: React.FC<CaseStudiesProps> = ({
  currency,
  onOpenConsultation
}) => {
  const [activeTab, setActiveTab] = useState<string>('restaurant');

  const architectures = [
    {
      id: 'restaurant',
      category: 'Hospitality Architecture',
      title: 'Direct Table Booking & QR Digital Menu Prototype',
      icon: UtensilsCrossed,
      problem: 'Third-party aggregator commissions (up to 30%) and unorganized phone reservations during peak hours.',
      solution: 'Direct mobile web app with table time-slot selector, QR digital menu, and instant confirmation dispatch.',
      deliverables: [
        'Single-page menu with instant category filter',
        'Date & guest count reservation funnel',
        'Direct location map and timing sync'
      ]
    },
    {
      id: 'clinic',
      category: 'Healthcare Architecture',
      title: 'Practitioner Profile & Live Slot Appointment System',
      icon: Stethoscope,
      problem: 'Reception phone congestion, high missed appointment rates, and patients arriving without preparation.',
      solution: 'Clean specialist directory with real-time slot calendar, transparent fee disclosure, and reminder workflow.',
      deliverables: [
        'Doctor profiles with credentials & OPD hours',
        'Mobile-friendly 3-step appointment booking',
        'Pre-consultation checklist for new patients'
      ]
    },
    {
      id: 'services',
      category: 'Trade Contractor Architecture',
      title: 'Emergency Service Estimator & Mobile Call Funnel',
      icon: Wrench,
      problem: 'Slow traditional websites lose high-value emergency repairs to competitors with faster call ergonomics.',
      solution: 'Zip-code validated dispatch funnel with prominent tap-to-call mobile buttons and license verification.',
      deliverables: [
        'Sticky mobile tap-to-call header',
        'Emergency service area zip validator',
        'Trust & license badge verification showcase'
      ]
    }
  ];

  const currentArch = architectures.find(a => a.id === activeTab) || architectures[0];
  const Icon = currentArch.icon;

  return (
    <section id="cases" className="py-20 bg-white border-b border-slate-200">
      <div className="container-fluid">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-300 text-slate-800 text-xs font-bold uppercase mb-3">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Architectural Blueprints</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
            How We Solve Specific <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Industry Challenges</span>
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-slate-600">
            Compare standard website shortcomings with Vismart Studio purpose-built architectures.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {architectures.map((arch) => (
            <button
              key={arch.id}
              onClick={() => setActiveTab(arch.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === arch.id
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {arch.category}
            </button>
          ))}
        </div>

        {/* Architecture Detail Card */}
        <div className="max-w-4xl mx-auto bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-700">
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-amber-700">
                {currentArch.category}
              </span>
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
                {currentArch.title}
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="p-5 rounded-2xl bg-white border border-rose-200 shadow-sm">
              <div className="flex items-center gap-2 text-rose-700 font-bold text-xs uppercase mb-2">
                <XCircle className="w-4 h-4" />
                <span>The Common Bottleneck</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {currentArch.problem}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-emerald-200 shadow-sm">
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase mb-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>The Engineered Solution</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {currentArch.solution}
              </p>
            </div>
          </div>

          <div className="space-y-3 mb-8">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-700">
              Technical Deliverables in this Blueprint:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {currentArch.deliverables.map((del, dIdx) => (
                <div key={dIdx} className="p-3.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 font-medium flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{del}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500">
              All architectures are fully customized with your exact brand specifications.
            </p>
            <button
              onClick={() => onOpenConsultation(currentArch.title)}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs shadow-md hover:brightness-105 active:scale-98 transition-all flex items-center justify-center gap-1.5"
            >
              <span>Build This Setup For My Business</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
