import React, { useState, useEffect } from 'react';
import { 
  X, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck,
  ArrowRight,
  Loader2,
  AlertCircle,
  Phone,
  Mail,
  Building2,
  FileText,
  Edit3,
  Bot,
  User,
  ChevronRight,
  Clock,
  Layers,
  HelpCircle,
  Check,
  ExternalLink,
  Minimize2
} from 'lucide-react';
import { NICHE_SOLUTIONS } from '../data/agencyData';
import { STUDIO_CONFIG } from '../data/studioConfig';
import type { ProjectBrief } from '../data/projectBriefState';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currency: 'INR' | 'USD';
  initialSubject?: string;
  projectBrief: ProjectBrief;
  setProjectBrief: React.Dispatch<React.SetStateAction<ProjectBrief>>;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  currency,
  initialSubject,
  projectBrief,
  setProjectBrief
}) => {
  // Navigation tabs:
  // 'guided': step-by-step technical discovery
  // 'blueprint': structured review of collected project brief
  const [activeTab, setActiveTab] = useState<'guided' | 'blueprint'>('guided');

  // Step state within guided consultation (1 to 5)
  // Step 1: Core Goal
  // Step 2: Industry / Nature of Business
  // Step 3: Current State & Specific Requirements
  // Step 4: Budget & Timeline Expectations
  // Step 5: Contact & Verification Submission
  const [consultationStep, setConsultationStep] = useState<number>(1);

  // Submission status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [submissionSuccess, setSubmissionSuccess] = useState<{
    referenceId: string;
    message: string;
  } | null>(null);

  // Honeypot field for spam prevention
  const [honeypot, setHoneypot] = useState('');

  // Handle initial subject passed from outside (e.g. from a demo click or industry click)
  useEffect(() => {
    if (initialSubject && isOpen) {
      // Check if it matches an industry
      const matchedNiche = NICHE_SOLUTIONS.find(n => 
        n.name.toLowerCase().includes(initialSubject.toLowerCase()) ||
        initialSubject.toLowerCase().includes(n.name.toLowerCase())
      );

      if (matchedNiche) {
        setProjectBrief(prev => ({
          ...prev,
          industryId: matchedNiche.id,
          industryName: matchedNiche.name,
          essentialFeatures: prev.essentialFeatures.length > 0 
            ? prev.essentialFeatures 
            : matchedNiche.deliverables.slice(0, 3)
        }));
      } else {
        setProjectBrief(prev => ({
          ...prev,
          goalTitle: initialSubject
        }));
      }
    }
  }, [initialSubject, isOpen]);

  if (!isOpen) return null;

  // Step 1: Select Goal
  const handleSelectGoal = (goalKey: string, goalTitle: string) => {
    setProjectBrief(prev => ({
      ...prev,
      goal: goalKey,
      goalTitle
    }));
    setConsultationStep(2);
  };

  // Step 2: Select Industry
  const handleSelectIndustry = (industryId: string, industryName: string) => {
    const matched = NICHE_SOLUTIONS.find(n => n.id === industryId);
    setProjectBrief(prev => ({
      ...prev,
      industryId,
      industryName,
      customIndustryName: '',
      essentialFeatures: matched ? matched.deliverables.slice(0, 3) : prev.essentialFeatures
    }));
    setConsultationStep(3);
  };

  const handleCustomIndustry = (name: string) => {
    setProjectBrief(prev => ({
      ...prev,
      industryId: 'custom',
      industryName: name || 'Custom Business',
      customIndustryName: name
    }));
  };

  // Step 3: Feature Toggles
  const handleToggleFeature = (feature: string) => {
    setProjectBrief(prev => {
      const exists = prev.essentialFeatures.includes(feature);
      const updated = exists 
        ? prev.essentialFeatures.filter(f => f !== feature)
        : [...prev.essentialFeatures, feature];
      return { ...prev, essentialFeatures: updated };
    });
  };

  // Step 4: Budget & Timeline selection
  const handleSelectBudget = (budget: string) => {
    setProjectBrief(prev => ({ ...prev, indicativeBudget: budget }));
  };

  const handleSelectTimeline = (timeline: string) => {
    setProjectBrief(prev => ({ ...prev, estimatedTimeline: timeline }));
  };

  // Step 5: Final Submission to Serverless Lead Intake API
  const handleSubmitBrief = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionError(null);

    // Validation
    if (!projectBrief.clientName.trim() || projectBrief.clientName.trim().length < 2) {
      setSubmissionError('Please enter your full name (at least 2 characters).');
      return;
    }

    if (!projectBrief.clientContact.trim() || projectBrief.clientContact.trim().length < 6) {
      setSubmissionError('Please enter a valid phone number or email address so we can reply.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: projectBrief.clientName.trim(),
          contact: projectBrief.clientContact.trim(),
          email: projectBrief.clientEmail || (projectBrief.clientContact.includes('@') ? projectBrief.clientContact.trim() : null),
          phone: projectBrief.clientPhone || (!projectBrief.clientContact.includes('@') ? projectBrief.clientContact.trim() : null),
          businessType: projectBrief.industryName || projectBrief.customIndustryName || 'Custom Business',
          goals: [projectBrief.goalTitle || 'Digital Platform Development'],
          scope: projectBrief.hasExistingSite === 'yes' ? 'Website Redesign & Modernization' : 'Brand New Platform Build',
          essentialFeatures: projectBrief.essentialFeatures,
          optionalFeatures: projectBrief.optionalFeatures,
          budget: projectBrief.indicativeBudget || 'To be scoped with team',
          timeline: projectBrief.estimatedTimeline,
          notes: projectBrief.additionalNotes || '',
          source: 'Vismart Studio Web Portal — Structured Consultation Modal',
          honeypot
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Server rejected lead submission.');
      }

      // Mark confirmed by backend
      setProjectBrief(prev => ({
        ...prev,
        isComplete: true,
        serverConfirmed: true,
        referenceId: data.referenceId,
        submittedAt: new Date().toISOString()
      }));

      setSubmissionSuccess({
        referenceId: data.referenceId,
        message: data.message
      });
    } catch (err: any) {
      console.error('Lead submission failure:', err);
      setSubmissionError(
        err.message || 'Unable to connect to the studio lead intake server. Please check your internet connection or email us directly at ' + STUDIO_CONFIG.contacts.email
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const industriesList = [
    { id: 'restaurant', name: 'Restaurant / Cafe / Food' },
    { id: 'clinic', name: 'Clinic / Healthcare / Doctor' },
    { id: 'retail', name: 'Retail Store / Supermarket' },
    { id: 'services', name: 'Services / HVAC / Contractor' },
    { id: 'coaching', name: 'Coaching / Education Institute' },
    { id: 'realestate', name: 'Real Estate / Developer' },
    { id: 'ecommerce', name: 'E-commerce Brand / D2C' },
    { id: 'b2b', name: 'B2B Wholesale / Manufacturing' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl border border-slate-200 shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        
        {/* Modal Header */}
        <div className="px-5 py-4 sm:px-6 sm:py-5 border-b border-slate-100 flex items-center justify-between gap-3 shrink-0 bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-slate-900 text-amber-400 flex items-center justify-center shadow-md shrink-0">
              <Building2 className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                  Project Consultation & Brief
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-slate-100 text-slate-700 border border-slate-300">
                  {activeTab === 'guided' ? `Step ${consultationStep} of 5` : 'Project Dossier'}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Structured technical discovery for official human-approved quotation
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Tab Switcher */}
            <div className="flex items-center p-1 rounded-xl bg-slate-100 text-xs font-bold">
              <button
                onClick={() => setActiveTab('guided')}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  activeTab === 'guided' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Guided Form
              </button>
              <button
                onClick={() => setActiveTab('blueprint')}
                className={`px-3 py-1 rounded-lg flex items-center gap-1 transition-colors ${
                  activeTab === 'blueprint' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <span>Project Brief</span>
                {projectBrief.serverConfirmed && (
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                )}
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Progress Bar (Only in Guided Mode) */}
        {activeTab === 'guided' && !submissionSuccess && (
          <div className="w-full bg-slate-100 h-1">
            <div 
              className="bg-gradient-to-r from-amber-500 to-orange-500 h-1 transition-all duration-300"
              style={{ width: `${(consultationStep / 5) * 100}%` }}
            ></div>
          </div>
        )}

        {/* Modal Scrollable Canvas */}
        <div className="flex-1 p-5 sm:p-6 overflow-y-auto space-y-5 bg-white text-slate-800 text-xs sm:text-sm">
          
          {/* ===================================================================
              TAB 1: GUIDED TECHNICAL INTAKE
              =================================================================== */}
          {activeTab === 'guided' && (
            <div className="space-y-5">
              
              {/* STEP 1: Core Goal */}
              {consultationStep === 1 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="space-y-1">
                    <h4 className="text-sm sm:text-base font-extrabold text-slate-900">
                      Step 1: What is the primary purpose of your project?
                    </h4>
                    <p className="text-xs text-slate-500">
                      Select the closest goal so we ask relevant architectural questions:
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {[
                      {
                        key: 'new_website',
                        title: 'Build a Brand New Website',
                        desc: 'Fresh corporate site, business presence, menu or product catalogue'
                      },
                      {
                        key: 'redesign',
                        title: 'Modernize Existing Website',
                        desc: 'Fix slow loading speeds, broken mobile layouts, and poor lead conversion'
                      },
                      {
                        key: 'custom_app',
                        title: 'Custom Web Application or Portal',
                        desc: 'Client portal, booking engine, operational dashboard or internal software'
                      },
                      {
                        key: 'automation',
                        title: 'Workflow Automation & Integrations',
                        desc: 'Automated email alerts, CRM sync, database pipelines and API integrations'
                      }
                    ].map((item) => (
                      <button
                        key={item.key}
                        onClick={() => handleSelectGoal(item.key, item.title)}
                        className={`p-4 rounded-2xl border-2 text-left transition-all flex flex-col justify-between ${
                          projectBrief.goal === item.key 
                            ? 'border-amber-500 bg-amber-50/50 shadow-sm' 
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div>
                          <h5 className="font-bold text-slate-900 mb-1">{item.title}</h5>
                          <p className="text-[11px] text-slate-500 leading-snug">{item.desc}</p>
                        </div>
                        <div className="mt-3 text-right">
                          <span className="text-[11px] font-bold text-amber-700">Select →</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 2: Industry / Business Type */}
              {consultationStep === 2 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <div>
                      <h4 className="text-sm sm:text-base font-extrabold text-slate-900">
                        Step 2: Which industry best describes your business?
                      </h4>
                      <p className="text-xs text-slate-500">
                        This customizes feature recommendations to your customer expectations:
                      </p>
                    </div>
                    <button
                      onClick={() => setConsultationStep(1)}
                      className="text-xs text-slate-400 hover:text-slate-700 underline font-medium"
                    >
                      ← Back
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                    {industriesList.map((ind) => (
                      <button
                        key={ind.id}
                        onClick={() => handleSelectIndustry(ind.id, ind.name)}
                        className={`p-3 rounded-2xl border-2 text-center text-xs font-bold transition-all ${
                          projectBrief.industryId === ind.id 
                            ? 'border-amber-500 bg-amber-50 text-amber-900 shadow-sm' 
                            : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                        }`}
                      >
                        {ind.name}
                      </button>
                    ))}
                  </div>

                  {/* Or Custom Industry Input */}
                  <div className="pt-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Or type your custom business sector:
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={projectBrief.customIndustryName || ''}
                        onChange={(e) => handleCustomIndustry(e.target.value)}
                        placeholder="e.g. Solar Energy, Legal Advisory, Fitness Gym..."
                        className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:border-amber-500 shadow-inner"
                      />
                      <button
                        onClick={() => {
                          if (projectBrief.customIndustryName) {
                            setConsultationStep(3);
                          }
                        }}
                        disabled={!projectBrief.customIndustryName}
                        className="px-4 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs disabled:opacity-40"
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Specific Features & Scope */}
              {consultationStep === 3 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <div>
                      <h4 className="text-sm sm:text-base font-extrabold text-slate-900">
                        Step 3: Select Essential Capabilities
                      </h4>
                      <p className="text-xs text-slate-500">
                        Industry: <strong>{projectBrief.industryName || 'Custom'}</strong> • Check all features needed:
                      </p>
                    </div>
                    <button
                      onClick={() => setConsultationStep(2)}
                      className="text-xs text-slate-400 hover:text-slate-700 underline font-medium"
                    >
                      ← Back
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    {[
                      '100% Fluid Auto-Fit Mobile & Tablet Ergonomics',
                      'Direct Lead / Inquiry Capture Funnel',
                      'Online Reservation or Appointment Scheduling',
                      'Product or Service Price Catalogue Display',
                      'Payment Gateway Integration (Razorpay / Stripe)',
                      'Customer Testimonials & Case Study Proofs',
                      'Interactive Cost / Estimate Calculator',
                      'Search Engine Schema & Google Maps Local SEO',
                      'Automated Email Confirmation Notifications'
                    ].map((feature, fIdx) => {
                      const isChecked = projectBrief.essentialFeatures.includes(feature);
                      return (
                        <div
                          key={fIdx}
                          onClick={() => handleToggleFeature(feature)}
                          className={`p-3.5 rounded-xl border-2 transition-all duration-200 cursor-pointer flex items-center justify-between select-none ${
                            isChecked 
                              ? "border-emerald-600 bg-emerald-50 text-emerald-950 font-bold shadow-md shadow-emerald-600/15 selected-pop-green ring-1 ring-emerald-600" 
                              : "border-slate-300 bg-white text-slate-950 hover:border-emerald-500 hover:bg-slate-50 shadow-sm"
                          }`}
                        >
                          <span className={`text-xs sm:text-[13px] leading-snug ${
                            isChecked ? "text-emerald-950 font-extrabold" : "text-slate-950 font-bold"
                          }`}>{feature}</span>
                          <div className={`w-5 h-5 rounded-md flex items-center justify-center border-2 shrink-0 ml-2.5 transition-colors duration-200 ${
                            isChecked ? "bg-emerald-600 border-emerald-600 text-white shadow-sm" : "border-slate-400 bg-slate-100"
                          }`}>
                            {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="pt-3 flex justify-between items-center">
                    <span className="text-xs text-slate-500">
                      Selected: <strong>{projectBrief.essentialFeatures.length} features</strong>
                    </span>
                    <button
                      onClick={() => setConsultationStep(4)}
                      className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs hover:brightness-105 transition-all shadow-md"
                    >
                      Continue to Budget & Timeline →
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: Budget & Timeline */}
              {consultationStep === 4 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <div>
                      <h4 className="text-sm sm:text-base font-extrabold text-slate-900">
                        Step 4: Investment Expectations & Timeline
                      </h4>
                      <p className="text-xs text-slate-500">
                        Provides clarity so our technical architect configures appropriate infrastructure:
                      </p>
                    </div>
                    <button
                      onClick={() => setConsultationStep(3)}
                      className="text-xs text-slate-400 hover:text-slate-700 underline font-medium"
                    >
                      ← Back
                    </button>
                  </div>

                  {/* Budget Options */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-2">
                      Target Investment Range ({currency}):
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {(currency === 'INR' ? [
                        '₹15,000 – ₹35,000 (Standard Website)',
                        '₹35,000 – ₹85,000 (Growth Lead Engine)',
                        '₹85,000+ (Custom Portal / Web App)'
                      ] : [
                        '$800 – $1,800 (Standard Website)',
                        '$1,800 – $4,500 (Growth Lead Engine)',
                        '$4,500+ (Custom Portal / Web App)'
                      ]).map((bTier, bIdx) => (
                        <button
                          key={bIdx}
                          type="button"
                          onClick={() => handleSelectBudget(bTier)}
                          className={`p-3 rounded-xl border-2 text-left text-xs transition-all duration-200 ${
                            projectBrief.indicativeBudget === bTier 
                              ? 'border-emerald-600 bg-emerald-50 font-extrabold text-emerald-950 shadow-md ring-1 ring-emerald-600 selected-pop-green' 
                              : 'border-slate-300 bg-white text-slate-950 font-bold hover:border-emerald-500 hover:bg-slate-50 shadow-sm'
                          }`}
                        >
                          {bTier}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Timeline Options */}
                  <div className="pt-2">
                    <label className="block text-xs font-bold text-slate-800 mb-2">
                      Required Delivery Timeline:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {[
                        'Standard Delivery (2–3 Weeks)',
                        'Accelerated Priority (7–10 Days)',
                        'Flexible / Scoping Phase'
                      ].map((tOpt, tIdx) => (
                        <button
                          key={tIdx}
                          type="button"
                          onClick={() => handleSelectTimeline(tOpt)}
                          className={`p-3 rounded-xl border-2 text-left text-xs transition-all duration-200 ${
                            projectBrief.estimatedTimeline === tOpt 
                              ? 'border-emerald-600 bg-emerald-50 font-extrabold text-emerald-950 shadow-md ring-1 ring-emerald-600 selected-pop-green' 
                              : 'border-slate-300 bg-white text-slate-950 font-bold hover:border-emerald-500 hover:bg-slate-50 shadow-sm'
                          }`}
                        >
                          {tOpt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 text-right">
                    <button
                      onClick={() => setConsultationStep(5)}
                      className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs hover:brightness-105 transition-all shadow-md"
                    >
                      Proceed to Final Verification & Submission →
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 5: Contact Verification & Server Lead Dispatch */}
              {consultationStep === 5 && !submissionSuccess && (
                <form onSubmit={handleSubmitBrief} className="space-y-4 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <div>
                      <h4 className="text-sm sm:text-base font-extrabold text-slate-900">
                        Step 5: Contact Verification
                      </h4>
                      <p className="text-xs text-slate-500">
                        Submit your brief directly to Vismart Studio servers for human quotation review:
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setConsultationStep(4)}
                      className="text-xs text-slate-400 hover:text-slate-700 underline font-medium"
                    >
                      ← Back
                    </button>
                  </div>

                  {/* Honeypot hidden input */}
                  <div className="hidden" aria-hidden="true">
                    <input 
                      type="text" 
                      value={honeypot} 
                      onChange={(e) => setHoneypot(e.target.value)} 
                      tabIndex={-1} 
                      autoComplete="off" 
                    />
                  </div>

                  {submissionError && (
                    <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-300 text-rose-800 text-xs flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      <span>{submissionError}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        value={projectBrief.clientName}
                        onChange={(e) => setProjectBrief(prev => ({ ...prev, clientName: e.target.value }))}
                        placeholder="e.g. John Doe / Rajesh Sharma"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:border-amber-500 shadow-inner"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        Contact Phone or Email *
                      </label>
                      <input
                        type="text"
                        value={projectBrief.clientContact}
                        onChange={(e) => setProjectBrief(prev => ({ ...prev, clientContact: e.target.value }))}
                        placeholder="Phone or official email"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:border-amber-500 shadow-inner"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      Additional Requirements or Existing Website URL (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={projectBrief.additionalNotes || ''}
                      onChange={(e) => setProjectBrief(prev => ({ ...prev, additionalNotes: e.target.value }))}
                      placeholder="Share existing website link, design preferences, or specific software you currently run..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:border-amber-500 shadow-inner"
                    />
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 space-y-1">
                    <div className="font-bold text-slate-800 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>Human-Approved Quotation Guarantee:</span>
                    </div>
                    <p>
                      Submitting this brief does not bind you to any purchase. Our studio founders review the architecture, confirm technical feasibility, and send a verified formal quotation within 24 hours.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-slate-950 font-black text-xs sm:text-sm shadow-xl shadow-orange-500/20 hover:brightness-105 active:scale-98 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Transmitting to Studio Server...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Project Brief for Quotation Approval</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* SUCCESS STATE */}
              {submissionSuccess && (
                <div className="p-6 rounded-2xl bg-emerald-50 border-2 border-emerald-300 text-center space-y-4 animate-in zoom-in-95">
                  <div className="w-14 h-14 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-lg">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <span className="text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                      Server Confirmed Delivery
                    </span>
                    <h4 className="text-lg font-black text-slate-900 mt-2">
                      Project Brief Successfully Received
                    </h4>
                    <p className="text-xs text-slate-600 max-w-md mx-auto mt-1">
                      {submissionSuccess.message}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-emerald-200 inline-block text-xs font-mono font-bold text-slate-800">
                    Reference ID: <span className="text-emerald-700">{submissionSuccess.referenceId}</span>
                  </div>

                  <div className="pt-2 flex justify-center gap-2">
                    <button
                      onClick={() => setActiveTab('blueprint')}
                      className="py-2.5 px-4 rounded-xl bg-slate-900 text-white font-bold text-xs"
                    >
                      View Full Submitted Dossier
                    </button>
                    <button
                      onClick={onClose}
                      className="py-2.5 px-4 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-100"
                    >
                      Done & Return to Site
                    </button>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* ===================================================================
              TAB 2: STRUCTURED PROJECT BRIEF DOSSIER (Honest, Real Answers Only)
              =================================================================== */}
          {activeTab === 'blueprint' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h4 className="text-base font-extrabold text-slate-900">
                    Project Blueprint Dossier
                  </h4>
                  <p className="text-xs text-slate-500">
                    {projectBrief.serverConfirmed 
                      ? 'Officially recorded and queued for engineering review' 
                      : 'Draft brief — review your captured inputs below'}
                  </p>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                    projectBrief.serverConfirmed 
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                      : 'bg-amber-100 text-amber-800 border border-amber-300'
                  }`}>
                    {projectBrief.serverConfirmed ? 'Confirmed by Studio Server' : 'Draft in Progress'}
                  </span>
                </div>
              </div>

              {/* Dossier Fields */}
              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 block">
                    Core Specifications
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-slate-500">Primary Goal:</span>
                      <p className="font-bold text-slate-900">{projectBrief.goalTitle || 'Not selected yet'}</p>
                    </div>
                    <div>
                      <span className="text-slate-500">Industry / Sector:</span>
                      <p className="font-bold text-slate-900">{projectBrief.industryName || projectBrief.customIndustryName || 'Not specified'}</p>
                    </div>
                    <div>
                      <span className="text-slate-500">Target Budget:</span>
                      <p className="font-bold text-slate-900">{projectBrief.indicativeBudget || 'To be scoped with team'}</p>
                    </div>
                    <div>
                      <span className="text-slate-500">Estimated Timeline:</span>
                      <p className="font-bold text-slate-900">{projectBrief.estimatedTimeline || 'Standard 2–3 Weeks'}</p>
                    </div>
                  </div>
                </div>

                {/* Essential Features */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 block">
                    Required Functional Capabilities ({projectBrief.essentialFeatures.length}):
                  </span>
                  {projectBrief.essentialFeatures.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {projectBrief.essentialFeatures.map((f, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-800 text-xs font-medium flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{f}</span>
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 italic">No specific features selected yet.</p>
                  )}
                </div>

                {/* Contact & Status */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 block">
                    Contact & Delivery Record
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-slate-500">Prospective Client:</span>
                      <p className="font-bold text-slate-900">{projectBrief.clientName || 'Not provided yet'}</p>
                    </div>
                    <div>
                      <span className="text-slate-500">Contact Method:</span>
                      <p className="font-bold text-slate-900">{projectBrief.clientContact || 'Not provided yet'}</p>
                    </div>
                    {projectBrief.referenceId && (
                      <div className="sm:col-span-2">
                        <span className="text-slate-500">Server Reference ID:</span>
                        <p className="font-mono font-bold text-emerald-700">{projectBrief.referenceId}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                {!projectBrief.serverConfirmed ? (
                  <button
                    onClick={() => {
                      setActiveTab('guided');
                      setConsultationStep(5);
                    }}
                    className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs shadow-md text-center hover:brightness-105 transition-all"
                  >
                    Complete & Submit This Brief →
                  </button>
                ) : (
                  <button
                    onClick={onClose}
                    className="flex-1 py-3 px-4 rounded-xl bg-slate-900 text-white font-bold text-xs text-center hover:bg-slate-800 transition-colors"
                  >
                    Done • Quotation Under Founder Review
                  </button>
                )}

                <button
                  onClick={() => {
                    setActiveTab('guided');
                    setConsultationStep(1);
                  }}
                  className="py-3 px-4 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 transition-colors"
                >
                  Edit Specifications
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
