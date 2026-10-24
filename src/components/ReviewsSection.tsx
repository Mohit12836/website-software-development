import React from 'react';
import { Star, ShieldCheck, Quote, Sparkles, AlertCircle } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  // Honest Case Study Models: Accurately labeled as Studio Design Systems & Production Case Prototypes
  const clientArchitectures = [
    {
      title: 'Hospitality & QR Ordering Model',
      sector: 'Restaurant & Dining Architecture',
      highlights: [
        'Eliminates aggregator order commissions via direct online ordering',
        'Mobile QR menu with zero-latency category switching',
        'Direct table reservation funnel with automated confirmation dispatch'
      ],
      deliverable: 'Delivered as Full-Stack React / Next.js Custom Build',
      designScope: 'Menu Design, Table Booking Logic, Location Geocoding'
    },
    {
      title: 'Healthcare & Patient Slot Calendar',
      sector: 'Specialist Clinic & Healthcare',
      highlights: [
        'Solves reception bottleneck through real-time slot availability',
        'Automated appointment pre-alert notifications',
        'Zero-confusion fee disclosure & practitioner credential cards'
      ],
      deliverable: 'HIPAA/Privacy-Conscious Booking Engine Architecture',
      designScope: 'Doctor Schedule Management & Mobile Calendar Integration'
    },
    {
      title: 'Emergency Service Dispatch Funnel',
      sector: 'Trade Contractors (HVAC, Electrical, Roofing)',
      highlights: [
        'Zip-code validated emergency quote estimator',
        'Instant tap-to-call mobile ergonomics for urgent homeowner repairs',
        'Trust-engineered licensing, insurance and review verification displays'
      ],
      deliverable: 'US & Global High-Conversion Lead Engine',
      designScope: 'Service Area Mapping & Dynamic Estimate Calculation'
    },
    {
      title: 'B2B Wholesale & Specification RFQ',
      sector: 'Industrial Manufacturing & Polymers',
      highlights: [
        'Direct technical datasheet & PDF specification downloads',
        'Tiered Request For Quotation (RFQ) inquiry capture with MOQ rules',
        'Multi-currency export inquiry routing for international buyers'
      ],
      deliverable: 'Enterprise B2B Product Catalogue Architecture',
      designScope: 'High-Volume SKU Catalog & Secure Quotation Intake'
    }
  ];

  return (
    <section id="reviews" className="py-24 bg-[#f8fafc] relative overflow-hidden border-b border-slate-200">
      <div className="container-fluid relative z-10">
        
        {/* Transparent, Honest Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-300 text-slate-800 text-xs font-bold uppercase mb-3">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Engineered Architecture & Case Studies</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            How Vismart Studio Solves <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Core Business Bottlenecks</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Every business problem is different. Below are genuine architectural blueprints showing how our digital platforms replace slow brochure sites with real operational outcomes.
          </p>

          <div className="mt-4 p-3 rounded-xl bg-amber-50 border border-amber-200 inline-flex items-center gap-2 text-xs text-amber-900 text-left max-w-xl">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>Transparency Note:</strong> As an engineering studio, we present verifiable architectural outcomes and technical deliverables rather than unverified third-party vanity ratings.
            </span>
          </div>
        </div>

        {/* Real Architectural Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {clientArchitectures.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                  <span className="text-xs font-black uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg">
                    {item.sector}
                  </span>
                  <span className="text-[11px] font-bold text-slate-500">
                    Production Architecture
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-black text-slate-900 mb-3">
                  {item.title}
                </h3>

                <ul className="space-y-2 mb-6">
                  {item.highlights.map((h, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-2"></span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500">
                <div>
                  <span className="font-semibold text-slate-700 block">Deliverable:</span>
                  <span>{item.deliverable}</span>
                </div>
                <div className="text-slate-400 text-[11px]">
                  {item.designScope}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
