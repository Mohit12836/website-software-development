import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Globe2, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Zap, 
  HelpCircle,
  FileCheck2,
  ExternalLink
} from 'lucide-react';

interface FreeDigitalCheckProps {
  currency: 'INR' | 'USD';
  onOpenAuditModal: () => void;
  onOpenConsultation: (subject?: string) => void;
}

export const FreeDigitalCheck: React.FC<FreeDigitalCheckProps> = ({
  currency,
  onOpenAuditModal,
  onOpenConsultation
}) => {
  const [checkedPoints, setCheckedPoints] = useState<string[]>([]);

  const benchmarkCriteria = [
    {
      id: 'speed',
      title: 'Under 1.5s Mobile Load Time',
      description: 'Pages taking over 3 seconds lose over 40% of prospective clients before the headline even renders.'
    },
    {
      id: 'autofit',
      title: 'Zero Horizontal Scroll on Small Phones',
      description: 'Every layout element, card and form must wrap seamlessly on 320px–420px viewports without breaking.'
    },
    {
      id: 'clarity',
      title: '5-Second Value Proposition Clarity',
      description: 'Visitors must immediately know what you provide, who it is for, and how to contact you without reading paragraphs.'
    },
    {
      id: 'action',
      title: 'Low-Friction Contact Funnel',
      description: 'Direct 1-tap contact methods or minimal 2-field quotation intake rather than lengthy 8-field barriers.'
    }
  ];

  const handleToggle = (id: string) => {
    setCheckedPoints(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  return (
    <section id="audit" className="py-20 bg-[#f8fafc] border-b border-slate-200">
      <div className="container-fluid">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-300 text-slate-800 text-xs font-bold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Digital Performance Standards</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
            Does Your Current Website Pass <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">The 4 Production Tests?</span>
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            A website is an investment designed to generate business inquiries. Use our self-assessment rubric below to evaluate whether your current setup is helping or hindering your growth.
          </p>
        </div>

        {/* Rubric Container */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm relative overflow-hidden">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {benchmarkCriteria.map((item) => {
              const isChecked = checkedPoints.includes(item.id);
              return (
                <div 
                  key={item.id}
                  onClick={() => handleToggle(item.id)}
                  className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                    isChecked 
                      ? 'border-emerald-500 bg-emerald-50/40' 
                      : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-sm text-slate-900">{item.title}</span>
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                        isChecked ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300'
                      }`}>
                        {isChecked && <CheckCircle2 className="w-4 h-4" />}
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] font-semibold text-slate-500">
                    {isChecked ? '✓ Meets Modern Standard' : 'Click if your current site satisfies this'}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Result Evaluation Box */}
          <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
                Your Assessment Summary:
              </span>
              <p className="text-sm font-bold text-slate-800">
                {checkedPoints.length === 4 
                  ? 'Excellent — Your website appears to follow best conversion practices.' 
                  : `Your website satisfies ${checkedPoints.length} of 4 criteria. We can help engineer the rest.`}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={() => onOpenConsultation('Website Performance Remediation')}
                className="py-3 px-5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs shadow-md hover:brightness-105 transition-all flex items-center gap-1.5"
              >
                <span>Discuss Upgrading Your Site</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenAuditModal}
                className="py-3 px-4 rounded-xl border border-slate-300 bg-white text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors"
              >
                Detailed Structural Checklist
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
