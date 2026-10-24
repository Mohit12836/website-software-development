import React, { useState } from 'react';
import { 
  Laptop, 
  Smartphone, 
  X, 
  ArrowRight, 
  CheckCircle2,
  ExternalLink,
  Layers,
  Sparkles,
  Info
} from 'lucide-react';
import { LIVE_DEMOS } from '../data/agencyData';
import type { LiveDemoItem } from '../data/agencyData';

interface LiveDemosSectionProps {
  currency: 'INR' | 'USD';
  onOpenConsultation: (demoTitle?: string) => void;
}

export const LiveDemosSection: React.FC<LiveDemosSectionProps> = ({
  onOpenConsultation
}) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeDemoModal, setActiveDemoModal] = useState<LiveDemoItem | null>(null);
  const [modalDevice, setModalDevice] = useState<'desktop' | 'mobile'>('desktop');

  const filters = ['All', 'Hospitality', 'Healthcare', 'E-commerce', 'Real Estate', 'Beauty', 'Web Applications'];

  // Clearly differentiated prototypes and concept previews (Crystal-Clear 1200px Resolution)
  const demos: LiveDemoItem[] = [
    {
      id: 'demo-restaurant',
      title: 'The Table & Spoon (Hospitality Prototype)',
      category: 'Hospitality',
      rating: 4.9,
      reviewsCount: 14,
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=90',
      tag: 'Interactive Prototype',
      liveUrl: '',
      features: ['Digital QR Menu Layout', 'Table Reservation Form Funnel', 'Direct Location Map Routing']
    },
    {
      id: 'demo-clinic',
      title: 'CareHealth Medical Clinic (Healthcare Prototype)',
      category: 'Healthcare',
      rating: 4.95,
      reviewsCount: 18,
      image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=90',
      tag: 'Interactive Prototype',
      liveUrl: '',
      features: ['Doctor Practitioner Profiles', 'Live Calendar Slot Selector', 'Pre-Consultation Intake Checklist']
    },
    {
      id: 'demo-ecommerce',
      title: 'Aura Lifestyle Modern Store (E-Com Architecture)',
      category: 'E-commerce',
      rating: 4.88,
      reviewsCount: 22,
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=90',
      tag: 'Architecture Concept',
      liveUrl: '',
      features: ['Single-Page Express Checkout', 'UPI / Card Payment Gateway Integration', 'Dynamic Cart Counter & Discounts']
    },
    {
      id: 'demo-realestate',
      title: 'Skyline Luxury Towers & Villas (Real Estate Concept)',
      category: 'Real Estate',
      rating: 4.92,
      reviewsCount: 9,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=90',
      tag: 'Concept Preview',
      liveUrl: '',
      features: ['Floor Plan Visualizer', 'Gated PDF Project Brochure Download', 'VIP Site Visit Booking Funnel']
    },
    {
      id: 'demo-salon',
      title: 'Luxe Hair & Aesthetic Spa (Booking Concept)',
      category: 'Beauty',
      rating: 4.9,
      reviewsCount: 12,
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=90',
      tag: 'Concept Preview',
      liveUrl: '',
      features: ['Specialist Stylist Selector', 'Transparent Service Card Pricing', 'Automated SMS/Email Notification Spec']
    },
    {
      id: 'demo-webapp',
      title: 'PulseOps Business Operations Dashboard (Web App Spec)',
      category: 'Web Applications',
      rating: 4.97,
      reviewsCount: 16,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=90',
      tag: 'Design Architecture',
      liveUrl: '',
      features: ['Role-Based Authentication (Admin/Staff)', 'Real-Time Pipeline Kanban', 'CSV / Excel Exportable Analytics']
    }
  ];

  const filteredDemos = activeFilter === 'All' 
    ? demos 
    : demos.filter(d => d.category.toLowerCase() === activeFilter.toLowerCase());

  return (
    <section id="demos" className="py-20 bg-[#f8fafc] border-b border-slate-200 relative">
      <div className="container-fluid">
        
        {/* Transparent Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 border border-blue-200 text-blue-800 text-xs font-bold uppercase mb-2">
              <Layers className="w-3.5 h-3.5 text-blue-600" />
              <span>Studio Prototypes & Architecture</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              Interactive Prototypes & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Concept Previews</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
              Inspect how we structure layouts, reservation funnels and software dashboards for specific industries.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                  activeFilter === filter
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Demo Cards Grid with Running Border Light Beam */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDemos.map((demo) => (
            <div
              key={demo.id}
              className="group card-border-beam rounded-3xl p-[1.5px] shadow-sm hover:shadow-2xl transition-all duration-300"
            >
              <div className="card-beam-content rounded-[22px] overflow-hidden">
                <div>
                  <div className="relative h-52 overflow-hidden bg-slate-950">
                    <img
                      src={demo.image}
                      alt={demo.title}
                      loading="lazy"
                      className="w-full h-full object-cover crisp-studio-img group-hover:scale-105 transition-transform duration-500 brightness-[0.97] group-hover:brightness-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-black/20 pointer-events-none"></div>

                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/95 text-slate-900 shadow-md backdrop-blur-sm">
                      {demo.tag}
                    </div>
                    <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded text-[10px] font-bold bg-slate-950/85 text-white backdrop-blur-sm border border-white/10">
                      {demo.category}
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-base font-extrabold text-slate-900 mb-2 leading-snug group-hover:text-blue-600 transition-colors">
                      {demo.title}
                    </h3>

                    <div className="space-y-1.5 my-3">
                      {demo.features.map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => setActiveDemoModal(demo)}
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-amber-400 text-slate-900 hover:text-slate-950 font-black text-xs transition-colors flex items-center justify-center gap-1.5 group-hover:bg-slate-900 group-hover:text-white"
                  >
                    <span>Inspect Architecture Preview</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Architecture Preview Modal */}
      {activeDemoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-3xl rounded-3xl bg-white border border-slate-200 shadow-2xl flex flex-col overflow-hidden text-slate-900 max-h-[90vh]">
            
            {/* Top Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
              <div className="flex items-center gap-2.5">
                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-blue-100 text-blue-800">
                  {activeDemoModal.tag}
                </span>
                <h4 className="text-sm font-extrabold text-slate-900">
                  {activeDemoModal.title}
                </h4>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-slate-200 p-1 rounded-xl">
                  <button
                    onClick={() => setModalDevice('desktop')}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                      modalDevice === 'desktop' ? 'bg-white text-slate-950 shadow-sm' : 'text-slate-600'
                    }`}
                  >
                    <Laptop className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Desktop</span>
                  </button>
                  <button
                    onClick={() => setModalDevice('mobile')}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                      modalDevice === 'mobile' ? 'bg-white text-slate-950 shadow-sm' : 'text-slate-600'
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Mobile</span>
                  </button>
                </div>

                <button
                  onClick={() => setActiveDemoModal(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-auto p-6 bg-slate-100 flex items-center justify-center">
              <div
                className={`transition-all duration-300 rounded-2xl overflow-hidden bg-white shadow-xl border border-slate-200 ${
                  modalDevice === 'mobile' ? 'w-[340px] rounded-[32px] border-8 border-slate-800' : 'w-full'
                }`}
              >
                <img
                  src={activeDemoModal.image}
                  alt={activeDemoModal.title}
                  className="w-full h-48 sm:h-64 object-cover crisp-studio-img"
                />
                
                <div className="p-5 space-y-4">
                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-2 text-xs text-amber-900">
                    <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Concept Preview Notice:</strong> This architectural prototype demonstrates layout ergonomics, touch targets, and feature logic. When contracted, your bespoke site is developed with your actual branding and database integrations.
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-xs font-bold text-slate-800 block">
                      Engineered Capabilities:
                    </span>
                    {activeDemoModal.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      const title = activeDemoModal.title;
                      setActiveDemoModal(null);
                      onOpenConsultation(title);
                    }}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs shadow-md hover:brightness-105 active:scale-98 transition-all"
                  >
                    Discuss Building This Architecture For My Business →
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
