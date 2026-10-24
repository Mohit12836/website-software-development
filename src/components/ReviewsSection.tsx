import React from 'react';
import { Star, ShieldCheck, Quote, Sparkles } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const reviews = [
    {
      name: 'Rajesh Varma',
      role: 'Owner, The Royal Biryani & Cafe',
      location: 'New Delhi, India',
      rating: 5,
      comment: 'Swiggy aur Zomato par 30% commission jaata tha. Vismart Studio ne humara QR Digital Menu aur WhatsApp direct table reservation lagaya. 2 mahine mein humara direct orders 40% badh gaya aur monthly commission mein ₹45,000 bacha!',
      metric: '₹45,000/mo Commission Saved',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
    },
    {
      name: 'Dr. Ananya Sharma',
      role: 'Founder, CareDental Specialists',
      location: 'Bangalore, India',
      rating: 5,
      comment: 'Patients ko appointment ke liye clinic call karna padta tha aur reception par bohot chaos tha. Inhone live slot calendar aur auto WhatsApp reminder setup kiya. No-shows 40% kam ho gaye aur patient booking 24/7 chalti hai!',
      metric: '40% Drop in Patient No-Shows',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=150&q=80'
    },
    {
      name: 'Mark Henderson',
      role: 'Operations Director, Apex HVAC & Roofing',
      location: 'Dallas, Texas, USA',
      rating: 5,
      comment: 'Most web designers just give you a static brochure. Vismart Studio built a zip-code based emergency quote funnel. Within 3 weeks of launch, our inbound emergency HVAC service calls doubled. Their attention to US mobile UX is top tier.',
      metric: '2.4x Emergency Service Calls',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80'
    },
    {
      name: 'Suresh Singhania',
      role: 'Managing Director, Singhania Polymers & B2B',
      location: 'Ahmedabad, Gujarat',
      rating: 5,
      comment: 'Humara B2B catalogue aur Request for Quote (RFQ) system inhone 15 din mein live kiya. Ab UAE aur Africa ke distributors directly specifications download karke bulk quotation mangte hain. Outstanding ROI!',
      metric: '₹85 Lakhs B2B Inquiries Generated',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80'
    }
  ];

  return (
    <section id="reviews" className="py-24 bg-[#f1f5f9] relative overflow-hidden border-b border-slate-200/80">
      <div className="container-fluid relative z-10">
        
        {/* Header with High Contrast Typography */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Proven Business Outcomes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Backed by <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600">500+ Business Owners</span>
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Read how businesses in India and the USA transformed their websites from expensive brochure costs into revenue generating engines.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="animated-glass-card p-6 sm:p-8 rounded-3xl flex flex-col justify-between"
            >
              <div>
                {/* Rating & Metric Tag */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-emerald-950/60 text-emerald-300 border border-emerald-500/30">
                    {rev.metric}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author info */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-3">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-cyan-400/50"
                />
                <div>
                  <h4 className="text-xs sm:text-sm font-black text-white flex items-center gap-1.5">
                    {rev.name}
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    {rev.role} • <span className="font-semibold text-cyan-300">{rev.location}</span>
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
