export const STUDIO_CONFIG = {
  name: 'Vismart Studio',
  tagline: 'Websites • Apps • Custom Software Solutions',
  subtext: 'Engineering high-converting digital products for businesses in India & the US',
  
  // Real verified contact channels
  contacts: {
    // Official intake email
    email: 'contact@vismartstudio.com',
    supportEmail: 'support@vismartstudio.com',
    
    // Direct quote request intake: Enabled via server-side /api/leads endpoint
    intakeEnabled: true,
    
    // Direct Phone & WhatsApp: Set to disabled until the dedicated business number is connected
    // This prevents fake placeholder links (919999999999) from confusing prospective clients.
    phoneSupportEnabled: false,
    phoneDisplay: '+91 (Toll-Free/Desk In Setup)',
    phoneCallable: '',
    
    whatsappDirectEnabled: false,
    whatsappNumber: '',
    whatsappDisplayMessage: 'WhatsApp line is being configured for official business messaging. Please submit your Project Brief via the website or email for prompt 24h quotation.',
  },

  offices: [
    {
      country: 'India',
      city: 'New Delhi',
      label: '🇮🇳 India Operations (New Delhi)',
      desc: 'Development, UI/UX Engineering & Client Support'
    },
    {
      country: 'USA',
      city: 'Delaware / Global Clients',
      label: '🇺🇸 US & International Client Desk',
      desc: 'Contracting, USD Invoicing & Architecture Consultation'
    }
  ]
};
