import React, { useState } from 'react';
import { 
  X, 
  Send, 
  MessageCircle, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck,
  ArrowRight,
  Loader2,
  AlertCircle,
  Phone,
  Mail,
  Building2
} from 'lucide-react';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currency: 'INR' | 'USD';
  initialSubject?: string;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  currency,
  initialSubject
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState(initialSubject || 'Restaurant');
  const [budget, setBudget] = useState(currency === 'INR' ? '₹18,000 – ₹45,000' : '$1,200 – $3,500');
  const [requirements, setRequirements] = useState('');
  const [contactPreference, setContactPreference] = useState<'whatsapp' | 'phone' | 'email'>('whatsapp');
  const [consent, setConsent] = useState(true);
  
  // Anti-Spam honeypot field (hidden from real users)
  const [hpField, setHpField] = useState('');

  // Submission States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [serverLead, setServerLead] = useState<any>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation
    if (!name.trim()) {
      setSubmitError('Please enter your full name.');
      return;
    }

    if (!phone.trim() && !email.trim()) {
      setSubmitError('Please provide at least a phone number or email address.');
      return;
    }

    if (!consent) {
      setSubmitError('Please agree to receive your tailored proposal.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('http://localhost:3000/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          business_name: businessName.trim() || name.trim(),
          category: businessType,
          phone: phone.trim(),
          email: email.trim(),
          service: initialSubject || businessType,
          package_name: initialSubject || 'Starter Solution',
          budget,
          requirements: requirements.trim() || `Client interested in ${initialSubject || businessType}.`,
          contact_preference: contactPreference,
          consent,
          source: 'Public Website - Consultation Modal',
          hp_field: hpField, // honeypot
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setServerLead(data.lead);
        setSubmitted(true);
      } else {
        setSubmitError(data.error || 'Failed to submit enquiry. Please try again.');
      }
    } catch (err: any) {
      console.error('Enquiry submission error:', err);
      setSubmitError(
        'Unable to connect to the CRM server right now. You can also connect directly via WhatsApp!'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const getWhatsAppLink = () => {
    const text = `Hello Vismart Studio,
My Name: ${name || 'Prospective Client'}
Business: ${businessName || 'Business'} (${businessType})
Preferred Currency: ${currency}
Target Budget: ${budget}
Requirements: ${requirements || 'Tailored proposal discussion'}
I would like to discuss my project scope.`;
    return `https://wa.me/919999999999?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg animated-glass-card p-6 sm:p-8 overflow-hidden border border-white/20 max-h-[95vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400">
              Zero Pressure • 100% Free Consultation
            </span>
            <h3 className="text-lg font-black text-white mt-0.5">
              {initialSubject ? `Inquire: ${initialSubject}` : (currency === 'INR' ? 'Free Project Consultation & Scope' : 'Schedule 15-Min Scoping Call')}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
            
            {/* Spam Prevention Honeypot (hidden from screen reader and real users) */}
            <input
              type="text"
              name="_hp"
              value={hpField}
              onChange={(e) => setHpField(e.target.value)}
              style={{ display: 'none' }}
              tabIndex={-1}
              autoComplete="off"
            />

            {/* Error Message Box */}
            {submitError && (
              <div className="p-3 rounded-xl bg-rose-950/70 border border-rose-500/50 flex items-start gap-2 text-rose-200 text-xs">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{submitError}</span>
              </div>
            )}

            {/* Name & Business */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1">
                  Business / Brand Name
                </label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="e.g. Royal Cafe / Care Clinic"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            {/* Contact Details: Phone & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1">
                  Phone / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={currency === 'INR' ? '+91 98765 43210' : '+1 (555) 000-0000'}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@business.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            {/* Industry & Target Budget */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1">
                  Business Industry
                </label>
                <select
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400"
                >
                  <option value="Restaurant">Restaurant & Cafe</option>
                  <option value="Clinic">Clinic & Healthcare</option>
                  <option value="Coaching">Coaching & Education</option>
                  <option value="Hotel">Hotel & Homestay</option>
                  <option value="Real Estate">Real Estate & Builders</option>
                  <option value="Retail">Retail & Kirana</option>
                  <option value="Salon">Salon & Spa</option>
                  <option value="Manufacturing">Manufacturing / B2B</option>
                  <option value="Lawyer">Lawyer & Consultant</option>
                  <option value="Plumber">Plumber / HVAC / Contractor</option>
                  <option value="E-commerce">D2C & E-commerce</option>
                  <option value="Service Firm">Custom Web App</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1">
                  Target Budget ({currency})
                </label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400"
                >
                  {currency === 'INR' ? (
                    <>
                      <option value="₹7,999 – ₹14,999">₹7,999 – ₹14,999 (Starter)</option>
                      <option value="₹18,000 – ₹45,000">₹18,000 – ₹45,000 (Business)</option>
                      <option value="₹45,000 – ₹1,20,000">₹45,000 – ₹1,20,000 (Growth)</option>
                      <option value="₹1,50,000+">₹1,50,000+ (Custom Software)</option>
                    </>
                  ) : (
                    <>
                      <option value="$650 – $1,200">$650 – $1,200 (Starter)</option>
                      <option value="$1,200 – $3,500">$1,200 – $3,500 (Business)</option>
                      <option value="$3,500 – $7,500">$3,500 – $7,500 (Growth)</option>
                      <option value="$10,000+">$10,000+ (Custom Web App)</option>
                    </>
                  )}
                </select>
              </div>
            </div>

            {/* Requirements & Specific Scope */}
            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1">
                Project Requirements / Specific Features Needed
              </label>
              <textarea
                rows={2}
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                placeholder="e.g. Need mobile-friendly digital menu, online table booking, and WhatsApp customer inquiry bot..."
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900/90 border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-cyan-400 resize-none"
              />
            </div>

            {/* Contact Preference Pills & Consent Checkbox */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-slate-400 font-semibold">Preferred Connect:</span>
                {(['whatsapp', 'phone', 'email'] as const).map((pref) => (
                  <button
                    key={pref}
                    type="button"
                    onClick={() => setContactPreference(pref)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition ${
                      contactPreference === pref
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {pref === 'whatsapp' ? 'WhatsApp' : pref === 'phone' ? 'Phone' : 'Email'}
                  </button>
                ))}
              </div>

              <label className="flex items-center gap-1.5 text-[11px] text-slate-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="rounded bg-slate-900 border-white/20 text-cyan-500 focus:ring-0"
                />
                <span>I consent to be contacted</span>
              </label>
            </div>

            {/* Submit Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bilberrry-btn-glow flex-1 py-3.5 rounded-xl text-white font-extrabold text-xs shadow-glow flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Connecting to Agency CRM...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Consultation Request</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noreferrer"
                className="py-3.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-600/30 border border-emerald-400/30 transition-all hover:scale-105 active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Instant WhatsApp</span>
              </a>
            </div>

            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Direct CRM integration • You get a custom scoped roadmap within 4 hours.</span>
            </div>
          </form>
        ) : (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Consultation Request Saved to CRM!
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 max-w-sm mx-auto leading-relaxed">
              Thank you, <strong>{name}</strong>! Your inquiry for <strong>{businessName || businessType}</strong> has been registered directly in our client pipeline. Our solutions architect will reach out via {contactPreference.toUpperCase()} within 4 business hours.
            </p>

            <div className="bg-slate-900/80 p-3 rounded-xl border border-white/10 text-left text-xs max-w-xs mx-auto space-y-1">
              <div className="text-[10px] uppercase font-bold text-cyan-400">Enquiry Confirmation:</div>
              <div className="text-slate-200">ID: <span className="font-mono text-cyan-300">{serverLead?.id || 'Registered'}</span></div>
              <div className="text-slate-200">Scope: <span className="text-white font-medium">{businessType} ({budget})</span></div>
              <div className="text-slate-200">Contact: <span className="text-white font-medium">{phone || email}</span></div>
            </div>

            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-2">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-sm transition"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Fast-Track on WhatsApp Now</span>
              </a>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
