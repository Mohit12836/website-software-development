import React from 'react';
import { 
  Monitor, 
  ShoppingCart, 
  Smartphone, 
  Database, 
  Bot, 
  BarChart3, 
  ArrowRight
} from 'lucide-react';
import type { ServiceCategory } from '../data/agencyData';

interface ServiceCategoriesProps {
  currency: 'INR' | 'USD';
  onSelectCategory: (category: ServiceCategory) => void;
}

export const ServiceCategories: React.FC<ServiceCategoriesProps> = ({
  currency,
  onSelectCategory
}) => {
  const categories = [
    {
      id: 'web-dev',
      title: 'Website Development',
      subtitle: 'Landing Page, Business, Corporate, Portfolio',
      priceINR: 'From ₹7,999',
      priceUSD: 'From $650',
      icon: <Monitor className="w-6 h-6 text-blue-600" />,
      iconBg: 'bg-blue-50',
      pillBg: 'bg-blue-50 text-blue-700 hover:bg-blue-100',
      arrowBorder: 'border-blue-200 text-blue-600'
    },
    {
      id: 'ecommerce',
      title: 'E-commerce Solutions',
      subtitle: 'Online Store, Product Catalogue, Marketplace',
      priceINR: 'From ₹49,999',
      priceUSD: 'From $3,500',
      icon: <ShoppingCart className="w-6 h-6 text-orange-500" />,
      iconBg: 'bg-orange-50',
      pillBg: 'bg-orange-50 text-orange-700 hover:bg-orange-100',
      arrowBorder: 'border-orange-200 text-orange-600'
    },
    {
      id: 'mobile-apps',
      title: 'Mobile Applications',
      subtitle: 'Android, iOS, Cross Platform',
      priceINR: 'From ₹99,999',
      priceUSD: 'From $5,000',
      icon: <Smartphone className="w-6 h-6 text-emerald-500" />,
      iconBg: 'bg-emerald-50',
      pillBg: 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100',
      arrowBorder: 'border-emerald-200 text-emerald-600'
    },
    {
      id: 'web-apps',
      title: 'Web Applications',
      subtitle: 'CRM, ERP, Booking Portal, Custom Software',
      priceINR: 'From ₹1,50,000',
      priceUSD: 'From $10,000',
      icon: <Database className="w-6 h-6 text-purple-600" />,
      iconBg: 'bg-purple-50',
      pillBg: 'bg-purple-50 text-purple-700 hover:bg-purple-100',
      arrowBorder: 'border-purple-200 text-purple-600'
    },
    {
      id: 'ai-automation',
      title: 'AI & Automation',
      subtitle: 'WhatsApp Automation, AI Chatbot, AI Agents',
      priceINR: 'From ₹25,000',
      priceUSD: 'From $1,800',
      icon: <Bot className="w-6 h-6 text-pink-500" />,
      iconBg: 'bg-pink-50',
      pillBg: 'bg-pink-50 text-pink-700 hover:bg-pink-100',
      arrowBorder: 'border-pink-200 text-pink-600'
    },
    {
      id: 'growth-support',
      title: 'Digital Growth & Support',
      subtitle: 'SEO, Maintenance, Content, Integrations',
      priceINR: 'From ₹4,999/mo',
      priceUSD: 'From $249/mo',
      icon: <BarChart3 className="w-6 h-6 text-amber-500" />,
      iconBg: 'bg-amber-50',
      pillBg: 'bg-amber-50 text-amber-700 hover:bg-amber-100',
      arrowBorder: 'border-amber-200 text-amber-600'
    }
  ];

  return (
    <section id="solutions" className="py-20 bg-[#f8fafc] border-b border-slate-200/80 relative overflow-hidden">
      <div className="container-fluid relative z-10">
        
        {/* Header with High Contrast Typography */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-3">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 border border-blue-200 text-blue-800 text-xs font-bold uppercase mb-2.5">
              <span>Business Solutions</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              Find the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600">Perfect Solution</span> for Your Business
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1.5 max-w-2xl font-medium">
              Choose a service category to explore tailored solutions, transparent pricing and live interactive prototypes.
            </p>
          </div>

          <a 
            href="#pricing"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors shrink-0"
          >
            <span>View All Packages</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* 6 Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat as any)}
              className="group p-5 rounded-2xl animated-glass-card cursor-pointer flex flex-col justify-between hover:border-cyan-400/50 transition-all"
            >
              <div>
                {/* Rounded Square Icon with Glow */}
                <div className="w-12 h-12 rounded-2xl bg-slate-900/90 border border-white/15 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:border-cyan-400/40 transition-all shadow-md">
                  {cat.icon}
                </div>

                {/* Title */}
                <h3 className="font-extrabold text-sm sm:text-base text-white group-hover:text-cyan-300 transition-colors leading-snug">
                  {cat.title}
                </h3>

                {/* Subtitle with High Contrast Readability */}
                <p className="text-xs text-slate-200 mt-2 leading-relaxed line-clamp-2 min-h-[34px] font-medium">
                  {cat.subtitle}
                </p>
              </div>

              {/* Bottom Price Tag + Circled Arrow */}
              <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                <span className="px-2.5 py-1 rounded-full text-xs font-black bg-cyan-950/90 border border-cyan-500/40 text-cyan-300 shadow-xs">
                  {currency === 'INR' ? cat.priceINR : cat.priceUSD}
                </span>

                <div className="w-7 h-7 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-slate-200 group-hover:border-cyan-400 group-hover:bg-cyan-500/20 group-hover:text-cyan-300 transition-all">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
