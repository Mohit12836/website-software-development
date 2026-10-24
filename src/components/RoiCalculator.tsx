import React, { useState } from 'react';
import { 
  Calculator, 
  TrendingUp, 
  Clock, 
  DollarSign, 
  ArrowRight, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { AnimatedCounter } from './AnimatedCounter';

interface RoiCalculatorProps {
  currency: 'INR' | 'USD';
  onGetCustomQuote: () => void;
}

export const RoiCalculator: React.FC<RoiCalculatorProps> = ({
  currency,
  onGetCustomQuote
}) => {
  const [industry, setIndustry] = useState<'restaurant' | 'clinic' | 'contractor' | 'retail'>('restaurant');
  const [monthlyCustomers, setMonthlyCustomers] = useState(250);
  const [avgTicket, setAvgTicket] = useState(currency === 'INR' ? 800 : 80);

  // Auto calculations based on industry metrics
  const getCommissionRate = () => {
    switch (industry) {
      case 'restaurant': return 0.25; // 25% delivery app cut
      case 'clinic': return 0.20; // 20% lost to no-shows and manual staff overhead
      case 'contractor': return 0.30; // 30% lost emergency calls
      case 'retail': return 0.15; // 15% marketplace cut
      default: return 0.20;
    }
  };

  const monthlyGross = monthlyCustomers * avgTicket;
  const monthlyLeak = Math.round(monthlyGross * getCommissionRate());
  const annualLeak = monthlyLeak * 12;
  const hoursSavedWeekly = industry === 'clinic' ? 18 : industry === 'restaurant' ? 14 : 10;

  const formatCurrency = (val: number) => {
    return currency === 'INR' 
      ? `₹${val.toLocaleString('en-IN')}`
      : `$${val.toLocaleString('en-US')}`;
  };

  return (
    <section id="calculator" className="py-24 bg-[#f8fafc] relative overflow-hidden border-b border-slate-200/80">
      <div className="container-fluid relative z-10">
        
        <div className="max-w-4xl mx-auto rounded-3xl p-6 sm:p-10 animated-glass-card shadow-2xl">
          
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase mb-2">
              <Calculator className="w-3.5 h-3.5" />
              <span>Real Financial Proof</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Calculate Your Business Revenue Leak
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-slate-300">
              See exactly how much revenue slips away through commissions, missed inquiries, and manual phone scheduling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            {/* Input Controls */}
            <div className="space-y-5">
              
              <div>
                <label className="block text-xs font-bold uppercase text-cyan-400 mb-2">
                  Select Your Business Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'restaurant', label: 'Restaurant / Cafe' },
                    { id: 'clinic', label: 'Clinic / Healthcare' },
                    { id: 'contractor', label: 'HVAC / Contractor' },
                    { id: 'retail', label: 'Retail / Store' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setIndustry(item.id as any)}
                      className={`p-2.5 rounded-xl text-xs font-bold border transition-all text-left ${
                        industry === item.id
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-cyan-400 shadow-md shadow-cyan-500/30'
                          : 'bg-slate-900/80 border-white/10 text-slate-300 hover:text-white hover:border-cyan-500/40'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-slate-200">Monthly Customers / Orders:</span>
                  <span className="text-cyan-400 font-extrabold">{monthlyCustomers}</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="1500"
                  step="25"
                  value={monthlyCustomers}
                  onChange={(e) => setMonthlyCustomers(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-slate-200">
                    Average Ticket / Order Value ({currency === 'INR' ? '₹' : '$'}):
                  </span>
                  <span className="text-cyan-400 font-extrabold">{formatCurrency(avgTicket)}</span>
                </div>
                <input
                  type="range"
                  min={currency === 'INR' ? 200 : 20}
                  max={currency === 'INR' ? 10000 : 500}
                  step={currency === 'INR' ? 100 : 10}
                  value={avgTicket}
                  onChange={(e) => setAvgTicket(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

            </div>

            {/* Live Calculation Output Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900/95 to-slate-950/95 text-white border border-white/15 shadow-2xl flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold text-rose-400 uppercase tracking-wider block">
                  Estimated Current Loss to Friction
                </span>
                
                <div className="mt-2">
                  <span className="text-3xl sm:text-4xl font-black text-rose-400">
                    <AnimatedCounter 
                      value={monthlyLeak} 
                      prefix={currency === 'INR' ? '₹' : '$'} 
                      locale={currency === 'INR' ? 'en-IN' : 'en-US'}
                      duration={600}
                    />
                  </span>
                  <span className="text-xs text-slate-400 block mt-0.5">lost every single month</span>
                </div>

                <div className="mt-4 pt-4 border-t border-white/10 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span>Annual Revenue at Risk:</span>
                    <strong className="text-white">
                      <AnimatedCounter 
                        value={annualLeak} 
                        prefix={currency === 'INR' ? '₹' : '$'} 
                        locale={currency === 'INR' ? 'en-IN' : 'en-US'}
                        duration={600}
                      />
                    </strong>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Staff Phone Time Wasted:</span>
                    <strong className="text-amber-400">
                      <AnimatedCounter value={hoursSavedWeekly} suffix=" hours / week" duration={500} />
                    </strong>
                  </div>
                </div>

                <div className="mt-4 p-3 rounded-xl bg-emerald-950/50 border border-emerald-500/30 text-xs text-emerald-300">
                  <CheckCircle2 className="w-3.5 h-3.5 inline mr-1 text-emerald-400" />
                  Our direct booking & digital ordering engine recovers up to <strong>75%</strong> of this revenue from Month 1!
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10">
                <button
                  onClick={onGetCustomQuote}
                  className="w-full py-3 rounded-xl bilberrry-btn-glow text-white font-extrabold text-xs shadow-glow hover:opacity-95 text-center flex items-center justify-center gap-1.5"
                >
                  <span>Stop This Leak — Build My Solution</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
