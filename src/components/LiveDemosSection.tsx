import React, { useState } from 'react';
import { 
  Laptop, 
  Smartphone, 
  X, 
  ArrowRight, 
  CheckCircle2
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

  const filters = ['All', 'Business Website', 'E-commerce', 'Mobile App', 'Web App', 'Industry Wise'];

  const demos = [
    {
      id: 'demo-restaurant',
      title: 'Restaurant Website',
      category: 'Hospitality',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
      headline: 'Taste the Good Life',
      features: ['QR Digital Menu', 'Direct Table Booking', 'Google Map Directions']
    },
    {
      id: 'demo-clinic',
      title: 'Clinic Website',
      category: 'Healthcare',
      image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80',
      headline: 'Your Health Our Priority',
      features: ['Doctor Timings', 'Live Slot Booking', 'Automated Reminders']
    },
    {
      id: 'demo-ecommerce',
      title: 'E-commerce Store',
      category: 'E-commerce',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
      headline: 'Latest Smart Watches',
      features: ['1-Page Checkout', 'UPI & Card Pre-fill', 'Instant Order SMS']
    },
    {
      id: 'demo-realestate',
      title: 'Real Estate Website',
      category: 'Real Estate',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      headline: 'Find Your Dream Home',
      features: ['Floor Plan Zoom', 'Instant Brochure Gate', 'Site Visit Calendar']
    },
    {
      id: 'demo-salon',
      title: 'Salon Website',
      category: 'Beauty',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
      headline: 'Look Good Feel Better',
      features: ['Stylist Selector', 'Service Card Pricing', 'WhatsApp Confirmation']
    },
    {
      id: 'demo-webapp',
      title: 'Business Web App',
      category: 'Web Applications',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      headline: 'Operations Dashboard',
      features: ['Role-based Security', 'Real-time Pipeline', 'Financial Analytics']
    }
  ];

  return (
    <section id="demos" className="py-20 bg-[#f8fafc] border-b border-slate-200/80 relative">
      <div className="container-fluid">
        
        {/* Header with High Contrast Typography */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 border border-cyan-200 text-cyan-800 text-xs font-bold uppercase mb-2">
              <span>Verified Portfolios</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">Live Demo</span> Architecture & Prototypes
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
              Explore real interactive prototypes of the websites, digital menus and software systems we build.
            </p>
          </div>

          {/* Right Filter Pills + Link */}
          <div className="flex flex-wrap items-center gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shadow-xs ${
                  activeFilter === filter
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                    : 'bg-white border border-slate-200/90 text-slate-700 hover:border-blue-400 hover:text-blue-600'
                }`}
              >
                {filter}
              </button>
            ))}

            <a 
              href="#demos"
              className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 ml-2"
            >
              <span>View All Demos</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* 6 Cards Grid strictly matching screenshot */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {demos.map((demo) => (
            <div
              key={demo.id}
              className="rounded-2xl overflow-hidden animated-glass-card flex flex-col justify-between group"
            >
              <div>
                {/* Image Aspect Box */}
                <div className="relative aspect-[16/11] overflow-hidden bg-slate-900">
                  <img
                    src={demo.image}
                    alt={demo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Subtle headline overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent p-2.5 flex flex-col justify-end text-white">
                    <span className="text-[10px] font-bold text-slate-200 drop-shadow line-clamp-1">
                      {demo.headline}
                    </span>
                  </div>
                </div>

                {/* Body: Title */}
                <div className="p-3">
                  <h3 className="font-extrabold text-xs text-white group-hover:text-cyan-400 transition-colors">
                    {demo.title}
                  </h3>
                </div>
              </div>

              {/* Bottom: "Live Demo ->" Button */}
              <div className="p-3 pt-0">
                <button
                  onClick={() => setActiveDemoModal(demo as any)}
                  className="w-full py-1.5 px-2.5 rounded-lg border border-cyan-500/30 bg-cyan-500/10 hover:bg-cyan-500 hover:text-slate-950 text-cyan-400 text-[11px] font-bold flex items-center justify-center gap-1 transition-all"
                >
                  <span>Live Demo</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Interactive Modal */}
      {activeDemoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
          <div className="relative w-full max-w-4xl h-[85vh] rounded-3xl bg-[#0b111e] border border-white/15 shadow-2xl flex flex-col overflow-hidden text-slate-100">
            
            {/* Modal Top Bar */}
            <div className="flex items-center justify-between px-6 py-3.5 border-b border-white/10 bg-[#0e1626]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <h4 className="text-sm font-extrabold text-white">
                  {activeDemoModal.title} — Working Architecture
                </h4>
              </div>

              <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-white/10">
                <button
                  onClick={() => setModalDevice('desktop')}
                  className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    modalDevice === 'desktop' ? 'bg-cyan-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Laptop className="w-3.5 h-3.5" />
                  <span>Desktop</span>
                </button>
                <button
                  onClick={() => setModalDevice('mobile')}
                  className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    modalDevice === 'mobile' ? 'bg-cyan-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Mobile</span>
                </button>
              </div>

              <button
                onClick={() => setActiveDemoModal(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-auto bg-[#070b14] p-4 flex items-center justify-center">
              <div
                className={`transition-all duration-300 rounded-2xl overflow-hidden border border-white/15 bg-[#0f172a] shadow-2xl ${
                  modalDevice === 'mobile' ? 'w-[360px] h-[620px] rounded-[32px] border-8 border-slate-800' : 'w-full h-full'
                }`}
              >
                <img
                  src={activeDemoModal.image}
                  alt={activeDemoModal.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5 space-y-4">
                  <h3 className="text-lg font-black text-white">{activeDemoModal.title}</h3>
                  <p className="text-xs text-slate-300">
                    Engineered for high conversion, 100% fluid mobile auto-fit, and instant lead capture.
                  </p>
                  <div className="p-3 rounded-xl bg-slate-900/90 border border-white/10 space-y-1.5 text-xs">
                    <span className="font-bold text-cyan-300 block">Core Built-in Capabilities:</span>
                    {activeDemoModal.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-slate-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      setActiveDemoModal(null);
                      onOpenConsultation(activeDemoModal.title);
                    }}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs shadow-lg transition-all"
                  >
                    Build This Setup For My Business
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
