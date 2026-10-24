export interface NicheSolution {
  id: string;
  name: string;
  hindiName: string;
  icon: string;
  painPoint: string;
  businessImpact: string;
  solution: string;
  deliverables: string[];
  indiaBudget: string;
  usaBudget: string;
  indiaNumericMin: number;
  usaNumericMin: number;
  level1: { title: string; desc: string; priceINR: string; priceUSD: string };
  level2: { title: string; desc: string; priceINR: string; priceUSD: string };
  level3: { title: string; desc: string; priceINR: string; priceUSD: string };
  businessValue: string;
  demoUrl?: string;
  demoImage: string;
  badgeText: string;
}

export interface ServiceCategory {
  id: string;
  title: string;
  subtitle: string;
  fromINR: string;
  fromUSD: string;
  iconName: string;
  tags: string[];
}

export interface PackagePlan {
  id: string;
  name: string;
  tagline: string;
  priceINR: string;
  priceUSD: string;
  numericINR: number;
  numericUSD: number;
  timeline: string;
  revisions: string;
  popular?: boolean;
  features: string[];
  ctaText: string;
}

export interface CarePlan {
  id: string;
  name: string;
  priceINR: string;
  priceUSD: string;
  frequency: string;
  description: string;
  features: string[];
  popular?: boolean;
}

export interface LiveDemoItem {
  id: string;
  title: string;
  category: string;
  rating: number;
  reviewsCount: number;
  image: string;
  tag: string;
  liveUrl: string;
  features: string[];
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: 'web-dev',
    title: 'Website Development',
    subtitle: 'Landing Page, Business, Corporate, Portfolio',
    fromINR: '₹7,999',
    fromUSD: '$650',
    iconName: 'Layout',
    tags: ['Ultra Fast', 'Mobile-Fit', 'SEO Ready']
  },
  {
    id: 'ecommerce',
    title: 'E-commerce Solutions',
    subtitle: 'Online Store, Product Catalogue, Marketplace',
    fromINR: '₹49,999',
    fromUSD: '$3,500',
    iconName: 'ShoppingCart',
    tags: ['Payment Gateway', 'Inventory', '1-Click Checkout']
  },
  {
    id: 'mobile-apps',
    title: 'Mobile Applications',
    subtitle: 'Android, iOS, PWA, Cross Platform',
    fromINR: '₹99,999',
    fromUSD: '$5,000',
    iconName: 'Smartphone',
    tags: ['Native Feel', 'Push Alerts', 'Offline Mode']
  },
  {
    id: 'web-apps',
    title: 'Web Applications',
    subtitle: 'CRM, ERP, Booking Portal, Custom Software',
    fromINR: '₹1,50,000',
    fromUSD: '$10,000',
    iconName: 'Database',
    tags: ['Role Auth', 'Workflows', 'Custom DB']
  },
  {
    id: 'ai-automation',
    title: 'AI & Automation',
    subtitle: 'WhatsApp Automation, AI Chatbot, AI Agents',
    fromINR: '₹25,000',
    fromUSD: '$1,800',
    iconName: 'Bot',
    tags: ['24/7 Sales Lead', 'Meta WACA', 'Smart Memory']
  },
  {
    id: 'growth-support',
    title: 'Digital Growth & Support',
    subtitle: 'SEO, Maintenance, Content, Integrations',
    fromINR: '₹4,999/mo',
    fromUSD: '$249/mo',
    iconName: 'TrendingUp',
    tags: ['Zero Downtime', 'Fast Updates', 'Analytics']
  }
];

export const NICHE_SOLUTIONS: NicheSolution[] = [
  {
    id: 'restaurant',
    name: 'Restaurant & Cafe',
    hindiName: 'रेस्टोरेंट / कैफे',
    icon: 'UtensilsCrossed',
    painPoint: 'लोग Instagram पर खाना देखते हैं, लेकिन menu, कीमत, location और table booking के लिए बार-बार कॉल करना पड़ता है। Swiggy/Zomato पर 25-30% कमीशन कटता है।',
    businessImpact: '30% कमाई कमीशन में चली जाती है, बिजी ऑवर्स में फोन उठाने का समय नहीं मिलता, और टेबल बुकिंग छूट जाती है।',
    solution: 'Restaurant Website + QR Digital Menu + WhatsApp Table Reservation + Google Maps Integration.',
    deliverables: [
      'Interactive QR Digital Menu (Instant load, mobile optimized)',
      '1-Tap WhatsApp Table Reservation & Party Booking',
      'Direct Takeaway Order Funnel (Zero Commission)',
      'Google Maps 1-Click Directions & Instagram Feed Embed',
      'Special Offers & Happy Hours Dynamic Banner'
    ],
    indiaBudget: '₹18,000 – ₹50,000',
    usaBudget: '$1,200 – $3,500',
    indiaNumericMin: 18000,
    usaNumericMin: 1200,
    level1: {
      title: 'Level 1 — Digital Menu & Location',
      desc: 'Mobile QR menu, photos, price card, location map & WhatsApp call button.',
      priceINR: '₹18,000',
      priceUSD: '$1,200'
    },
    level2: {
      title: 'Level 2 — Smart Reservation Engine',
      desc: 'Date & time slot table booking, guest count, instant WhatsApp confirmation.',
      priceINR: '₹32,000',
      priceUSD: '$2,200'
    },
    level3: {
      title: 'Level 3 — Complete Direct Ordering OS',
      desc: 'Direct online food order, payment gateway, kitchen receipt print & loyalty points.',
      priceINR: '₹50,000',
      priceUSD: '$3,500'
    },
    businessValue: '30% थर्ड-पार्टी कमीशन की बचत + 40% ज्यादा डायरेक्ट टेबल बुकिंग्स।',
    demoImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    badgeText: 'Popular Hospitality Solution'
  },
  {
    id: 'clinic',
    name: 'Clinic & Healthcare',
    hindiName: 'क्लिनिक / डेंटल / डॉक्टर्स',
    icon: 'Stethoscope',
    painPoint: 'मरीजों को डॉक्टर की टाइमिंग, कंसल्टेशन फीस और सेवाओं की सही जानकारी नहीं मिलती। रिसेप्शन पर कॉल का अंबार रहता है और 35% मरीज समय पर नहीं आते (No-shows)।',
    businessImpact: 'स्टाफ का दिन में 3-4 घंटे सिर्फ फोन उठाने में बर्बाद होता है, डॉक्टर का कीमती समय खाली स्लॉट्स में जाता है।',
    solution: 'Clinic Website + Smart Doctor Profiles + Online Slot Booking + Automated WhatsApp Reminders.',
    deliverables: [
      'Doctor Qualifications, Specialty & Treatment Pages',
      'Interactive Patient Appointment Booking Calendar',
      'Clinic Timings, OPD Schedule & Consultation Fees Display',
      'Automated WhatsApp/SMS Confirmation & Reminder Integration',
      'Patient Testimonials & Google Review Rating Badges'
    ],
    indiaBudget: '₹25,000 – ₹75,000',
    usaBudget: '$1,800 – $5,000',
    indiaNumericMin: 25000,
    usaNumericMin: 1800,
    level1: {
      title: 'Level 1 — Clinic Profile & Timings',
      desc: 'Specialities, doctor profiles, clinic photos, location map & phone CTA.',
      priceINR: '₹25,000',
      priceUSD: '$1,800'
    },
    level2: {
      title: 'Level 2 — Automated Appointment Calendar',
      desc: 'Live slot selection, token system, auto reminder messages to stop no-shows.',
      priceINR: '₹48,000',
      priceUSD: '$3,200'
    },
    level3: {
      title: 'Level 3 — Patient Portal & Digital OPD',
      desc: 'Digital prescription download, previous visit records & online consultation fee.',
      priceINR: '₹75,000',
      priceUSD: '$5,000'
    },
    businessValue: 'नो-शो में 40% की कमी + रिसेप्शन कॉलिंग का समय 70% कम।',
    demoImage: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80',
    badgeText: 'High Conversion Healthcare'
  },
  {
    id: 'coaching',
    name: 'Coaching & Education',
    hindiName: 'कोचिंग / स्कूल / इंस्टिट्यूट',
    icon: 'GraduationCap',
    painPoint: 'नए बैच के एडमिशन और इन्क्वायरीज व्हाट्सएप चैट और पर्चियों में खो जाती हैं। छात्र कोर्स का पूरा सिलेबस और रिजल्ट्स नहीं देख पाते।',
    businessImpact: 'हर एडमिशन सीजन में 20-30% संभावित छात्र कॉम्पिटिटर के पास चले जाते हैं क्योंकि सही समय पर फॉलो-अप नहीं हुआ।',
    solution: 'Institute Portal + Course Catalog + Free Demo Booking Funnel + Lead Capture CRM.',
    deliverables: [
      'Comprehensive Course Pages with Syllabus, Batch Timing & Fees',
      'Faculty Profiles, Hall of Fame & Toppers Result Gallery',
      '1-Click "Book Free Demo Class" Lead Capture Form',
      'Download Brochure / Prospectus Gate (Captures phone & email)',
      'Automated WhatsApp Welcome & Admission Coordinator routing'
    ],
    indiaBudget: '₹25,000 – ₹80,000',
    usaBudget: '$2,000 – $6,000',
    indiaNumericMin: 25000,
    usaNumericMin: 2000,
    level1: {
      title: 'Level 1 — Course Showcase & Results',
      desc: 'Course list, faculty, photo gallery, admission enquiry form.',
      priceINR: '₹25,000',
      priceUSD: '$2,000'
    },
    level2: {
      title: 'Level 2 — Demo Class Funnel & Brochure Download',
      desc: 'Gated PDF downloads, automated lead notification to counselors, batch countdowns.',
      priceINR: '₹45,000',
      priceUSD: '$3,800'
    },
    level3: {
      title: 'Level 3 — Student Admission & Fee Portal',
      desc: 'Online fee payment, student login, study material library & attendance.',
      priceINR: '₹80,000',
      priceUSD: '$6,000'
    },
    businessValue: 'एडमिशन इन्क्वायरी में 3x बढ़ोतरी + 100% लीड्स का सेंट्रलाइज्ड रिकॉर्ड।',
    demoImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    badgeText: 'Education Lead Engine'
  },
  {
    id: 'hotel',
    name: 'Hotel & Homestay',
    hindiName: 'होटल / रिजॉर्ट / होमस्टे',
    icon: 'Building2',
    painPoint: 'ग्राहक कमरे की असली तस्वीरें, सुविधाएं और रेट्स नहीं समझ पाता। MakeMyTrip, Agoda, Airbnb पर 18-25% भारी कमीशन कटता है।',
    businessImpact: 'डायरेक्ट कस्टमर बेस नहीं बन पाता, होटल का मुनाफा कमीशन में कट जाता है और ऑफ-सीजन में कमरे खाली रहते हैं।',
    solution: 'Luxury Property Showcase + Room Availability Engine + Direct Zero-Commission Booking.',
    deliverables: [
      'High-Definition Room Gallery, Video Tour Embed & 360 View',
      'Live Room Availability Checker & Direct Booking Request',
      'Nearby Attractions, Sightseeing Guide & Distance Map',
      'Direct WhatsApp Reception Desk & Group Tour Inquiry Form',
      'Google Reviews Embed & Verified Guest Testimonials'
    ],
    indiaBudget: '₹30,000 – ₹90,000',
    usaBudget: '$2,000 – $6,000',
    indiaNumericMin: 30000,
    usaNumericMin: 2000,
    level1: {
      title: 'Level 1 — Property & Room Showcase',
      desc: 'Room photos, amenities, tariff card, location & direct call/WhatsApp.',
      priceINR: '₹30,000',
      priceUSD: '$2,000'
    },
    level2: {
      title: 'Level 2 — Direct Booking Request Engine',
      desc: 'Check-in/Check-out date selector, guest count, instant price quote calculation.',
      priceINR: '₹55,000',
      priceUSD: '$3,900'
    },
    level3: {
      title: 'Level 3 — Channel Manager & Instant Payment',
      desc: 'Calendar sync with Booking.com/Airbnb, instant credit card deposit payment.',
      priceINR: '₹90,000',
      priceUSD: '$6,000'
    },
    businessValue: '20% OTA कमीशन की बचत + डायरेक्ट कॉर्पोरेट व फैमिली बुकिंग्स में 50% वृद्धि।',
    demoImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    badgeText: 'Direct Booking Revenue'
  },
  {
    id: 'real-estate',
    name: 'Real Estate & Builders',
    hindiName: 'रियल एस्टेट / बिल्डर्स / डेवलपर्स',
    icon: 'Home',
    painPoint: 'प्रॉपर्टीज की फोटो, फ्लोर प्लान्स और लीगल अप्रूवल्स बिखरे हुए हैं। एजेंट्स को बार-बार व्हाट्सएप पर भारी PDF फाइलें भेजनी पड़ती हैं।',
    businessImpact: 'सीरियस बायर्स की जगह टाइम-पास इन्क्वायरीज में समय खराब होता है। प्रोजेक्ट की प्रीमियम ब्रांड वैल्यू नहीं बन पाती।',
    solution: 'Real Estate Showcase + Project Micro-site + Instant WhatsApp Brochure Download + Lead Scoring.',
    deliverables: [
      'Interactive Project Showcase (Apartments, Villas, Commercial)',
      'High-Res Floor Plans, Master Layout & Pricing Breakdown',
      'Interactive EMI Calculator & Payment Milestone Table',
      'Gated "Download Full Brochure" Funnel (Auto-pushes lead to sales team)',
      'Site Visit Booking Calendar with Google Map Directions'
    ],
    indiaBudget: '₹35,000 – ₹1,20,000',
    usaBudget: '$2,500 – $8,000',
    indiaNumericMin: 35000,
    usaNumericMin: 2500,
    level1: {
      title: 'Level 1 — Project Portfolio & Brochure',
      desc: 'Property specs, gallery, amenities, location map, direct call.',
      priceINR: '₹35,000',
      priceUSD: '$2,500'
    },
    level2: {
      title: 'Level 2 — Interactive Site Visit & EMI Calculator',
      desc: 'Floor plan viewer, site visit scheduler, automated WhatsApp brochure push.',
      priceINR: '₹65,000',
      priceUSD: '$4,500'
    },
    level3: {
      title: 'Level 3 — Builder Multi-Project Portal & CRM',
      desc: 'Agent tracking, inventory status (Sold/Available), CRM integration.',
      priceINR: '₹1,20,000',
      priceUSD: '$8,000'
    },
    businessValue: 'हाई-नेटवर्थ बायर्स से डायरेक्ट संपर्क + ब्रोकर डिपेंडेंसी में 30% कमी।',
    demoImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    badgeText: 'High-Ticket Real Estate'
  },
  {
    id: 'retail',
    name: 'Retail & Kirana Store',
    hindiName: 'किराना / लोकल रिटेल स्टोर',
    icon: 'Store',
    painPoint: 'स्थानीय ग्राहकों को दुकान का पूरा स्टॉक, नए प्रोडक्ट्स और दैनिक ऑफर्स नहीं दिखते। ग्राहक Blinkit / Zepto / Amazon की तरफ आकर्षित होते हैं।',
    businessImpact: 'स्थानीय पक्के ग्राहक भी ऑनलाइन ऐप्स की तरफ शिफ्ट हो रहे हैं, मंथली बास्केट साइज घट रहा है।',
    solution: 'Digital Storefront + Online Catalogue + 1-Click WhatsApp Quick Order + Daily Offers.',
    deliverables: [
      'Visual Category Catalogue (Groceries, Spices, Dairy, Snacks)',
      'Daily Specials & Discount Banner Manager',
      '1-Click WhatsApp Cart order (No complicated passwords)',
      'Local Free Home Delivery Minimum Order Notification',
      'Store UPI QR Code & Contactless Payment Integration'
    ],
    indiaBudget: '₹9,000 – ₹25,000',
    usaBudget: '$650 – $1,800',
    indiaNumericMin: 9000,
    usaNumericMin: 650,
    level1: {
      title: 'Level 1 — Digital Catalogue & WhatsApp Order',
      desc: 'Top 50 products list, store address, timing, WhatsApp direct order button.',
      priceINR: '₹9,000',
      priceUSD: '$650'
    },
    level2: {
      title: 'Level 2 — Full Smart Store Catalogue',
      desc: 'Searchable 300+ items, cart builder, automated bill summary on WhatsApp.',
      priceINR: '₹16,000',
      priceUSD: '$1,200'
    },
    level3: {
      title: 'Level 3 — Complete Local Delivery Mini-App',
      desc: 'Customer address book, delivery slot selection, order tracking SMS.',
      priceINR: '₹25,000',
      priceUSD: '$1,800'
    },
    businessValue: 'लोकल ग्राहकों की लॉयल्टी बरकरार + बिना किसी 3rd party फीस के डायरेक्ट होम डिलीवरी।',
    demoImage: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=80',
    badgeText: 'Quick Local Commerce'
  },
  {
    id: 'salon',
    name: 'Salon & Spa',
    hindiName: 'सैलून / ब्यूटी पार्लर / स्पा',
    icon: 'Scissors',
    painPoint: 'अपॉइंटमेंट फोन पर लेने से ओवरलैपिंग और मिसमैनेजमेंट होता है। ग्राहकों को सटीक सर्विस रेट्स और पैकेज ऑफर्स नहीं मिलते।',
    businessImpact: 'पीक आवर्स में कॉल्स छूट जाती हैं, वीकेंड्स पर स्टाफ खाली बैठता है और क्लाइंट्स बिना बताए नहीं आते।',
    solution: 'Treatment Showcase + Stylist Booking Calendar + Auto Reminders + Package Deals.',
    deliverables: [
      'Visual Service Menu with Transparent Pricing & Duration',
      'Stylist / Therapist Selection & Live Slot Booking Calendar',
      'Bridal & Groom Special Package Showcases',
      'Before / After Hair & Skin Transformation Gallery',
      'Automated Appointment Confirmation & 2-Hour Pre-Alert on WhatsApp'
    ],
    indiaBudget: '₹18,000 – ₹50,000',
    usaBudget: '$1,200 – $4,000',
    indiaNumericMin: 18000,
    usaNumericMin: 1200,
    level1: {
      title: 'Level 1 — Service Menu & Salon Ambience',
      desc: 'Services list, pricing card, salon photos, direct WhatsApp book link.',
      priceINR: '₹18,000',
      priceUSD: '$1,200'
    },
    level2: {
      title: 'Level 2 — Slot Booking & Stylist Selector',
      desc: 'Date & time selection, staff picker, automated WhatsApp booking reminder.',
      priceINR: '₹32,000',
      priceUSD: '$2,400'
    },
    level3: {
      title: 'Level 3 — Salon Management & Loyalty OS',
      desc: 'Client visit history, loyalty points wallet, advance deposit payment via UPI/Stripe.',
      priceINR: '₹50,000',
      priceUSD: '$4,000'
    },
    businessValue: '24/7 ऑटोमैटिक बुकिंग + नो-शो में 35% कमी + खाली स्लॉट्स 30% ज्यादा भरे।',
    demoImage: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
    badgeText: 'Beauty & Wellness Specialist'
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing & Wholesale',
    hindiName: 'मैन्युफैक्चरर / B2B होलसेलर',
    icon: 'Factory',
    painPoint: 'देश-विदेश के खरीदारों को प्रोडक्ट टेक्निकल स्पेसिफिकेशन्स, कैटलॉग और मिनिमम ऑर्डर क्वांटिटी (MOQ) नहीं मिलती।',
    businessImpact: 'लाखों-करोड़ों के बड़े एक्सपोर्ट और डिस्ट्रीब्यूटर ऑर्डर्स छूट जाते हैं क्योंकि वेबसाइट 10 साल पुरानी या आउटडेटेड है।',
    solution: 'B2B Digital Showroom + RFQ (Request for Quote) Funnel + Spec Sheets + Export Trust Badges.',
    deliverables: [
      'Industrial Product Catalogue with Technical Datasheets (PDF)',
      'Automated "Request for Quote (RFQ)" Multi-Item Form',
      'Factory Machinery, Infrastructure, Capacity & Video Showcase',
      'ISO, CE, Export Compliance Certificates & Quality Badges',
      'Direct International WhatsApp & Inquiry Export to Sales Email'
    ],
    indiaBudget: '₹40,000 – ₹1,50,000',
    usaBudget: '$3,000 – $10,000',
    indiaNumericMin: 40000,
    usaNumericMin: 3000,
    level1: {
      title: 'Level 1 — Company Profile & Catalog',
      desc: 'Factory photos, core product specs, certifications & contact RFQ.',
      priceINR: '₹40,000',
      priceUSD: '$3,000'
    },
    level2: {
      title: 'Level 2 — Interactive RFQ & Spec Sheet Downloader',
      desc: 'Multi-item quote builder, MOQ matrix, instant technical PDF download.',
      priceINR: '₹75,000',
      priceUSD: '$5,500'
    },
    level3: {
      title: 'Level 3 — B2B Dealer Portal & Order Tracking',
      desc: 'Wholesale dealer login, custom price tiers, bulk order dispatch status.',
      priceINR: '₹1,50,000',
      priceUSD: '$10,000'
    },
    businessValue: '₹5L से ₹50L+ के हाई-टिकट B2B इन्क्वायरी ऑर्डर्स सीधे आपके इनबॉक्स में।',
    demoImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    badgeText: 'Heavy B2B Pipeline'
  },
  {
    id: 'lawyer',
    name: 'Lawyers & Consultants',
    hindiName: 'वकील / सीए / कंसल्टेंट्स',
    icon: 'Scale',
    painPoint: 'क्लाइंट्स को प्रोफेशनल की एक्सपर्टीज, केस हिस्ट्री और क्रेडिबिलिटी ऑनलाइन नहीं दिखती। फोन पर मुफ्त सलाह मांगने वाले समय बर्बाद करते हैं।',
    businessImpact: 'हाई-पेइंग क्लाइंट्स बड़ी फर्म्स की तरफ चले जाते हैं। टाइम-वेस्टर्स की वजह से बिलिंग ऑवर्स खराब होते हैं।',
    solution: 'Authority Portfolio + Practice Area Guides + Paid Consultation Booking Engine.',
    deliverables: [
      'Authoritative Practice Areas (Corporate, Tax, Civil, Criminal, Audit)',
      'Pre-Paid Consultation Booking Integration (Eliminates free-loaders)',
      'Case Studies, Landmark Judgments & Client Testimonials',
      'Client Confidential Document Upload Portal Link',
      'Articles, Legal Insights & Credibility Publication Badges'
    ],
    indiaBudget: '₹20,000 – ₹70,000',
    usaBudget: '$1,500 – $5,000',
    indiaNumericMin: 20000,
    usaNumericMin: 1500,
    level1: {
      title: 'Level 1 — Professional Authority Portfolio',
      desc: 'Practice areas, bio, credentials, office location & appointment form.',
      priceINR: '₹20,000',
      priceUSD: '$1,500'
    },
    level2: {
      title: 'Level 2 — Pre-Paid Consultation Scheduler',
      desc: 'Calendly/Stripe integration, 30/60 min slots, automated video meet link.',
      priceINR: '₹40,000',
      priceUSD: '$3,000'
    },
    level3: {
      title: 'Level 3 — Client Portal & Document Vault',
      desc: 'Secure encrypted document sharing, case status tracking, online retainer billing.',
      priceINR: '₹70,000',
      priceUSD: '$5,000'
    },
    businessValue: 'मुफ्त सलाह मांगने वाले 90% फिल्टर + केवल हाई-टिकट सीरियस क्लाइंट्स।',
    demoImage: 'https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?auto=format&fit=crop&w=800&q=80',
    badgeText: 'High Trust Authority'
  },
  {
    id: 'plumber-hvac',
    name: 'Plumber / HVAC & Contractors',
    hindiName: 'प्लम्बर / एसी / कांट्रेक्टर',
    icon: 'Wrench',
    painPoint: 'ग्राहक को इमरजेंसी में सर्विस एरिया, रेट और वारंटी का भरोसा नहीं मिलता। फोन नहीं उठा तो तुरंत दूसरे को कॉल लग जाता है।',
    businessImpact: '$500–$2,000 या ₹5,000–₹25,000 की हाई-टिकट इमरजेंसी रिपेयर और इंस्टॉलेशन जॉब्स हाथ से निकल जाती हैं।',
    solution: 'Service-Area Web Engine + Emergency Quote Form + Zip Code Checker + Verified Reviews.',
    deliverables: [
      'Instant "Emergency Service Call" Click-to-Dial Floating CTA',
      'Service Areas & Zip Code Coverage Checker',
      'Transparent Pricing Guide & Before/After Project Photos',
      'License, Insurance & Work Guarantee Trust Badges',
      'Interactive "Get Instant Free Estimate" Step Form'
    ],
    indiaBudget: '₹18,000 – ₹60,000',
    usaBudget: '$1,500 – $5,000',
    indiaNumericMin: 18000,
    usaNumericMin: 1500,
    level1: {
      title: 'Level 1 — Emergency Service Page',
      desc: 'Services list, coverage area, click-to-call, customer review cards.',
      priceINR: '₹18,000',
      priceUSD: '$1,500'
    },
    level2: {
      title: 'Level 2 — Smart Estimate Calculator & Zip Tool',
      desc: 'Job type selector, square feet calculation, instant quote estimate funnel.',
      priceINR: '₹35,000',
      priceUSD: '$3,200'
    },
    level3: {
      title: 'Level 3 — Field Service Booking & Dispatch System',
      desc: 'Live technician dispatch slot, SMS dispatch alerts & online invoice pay.',
      priceINR: '₹60,000',
      priceUSD: '$5,000'
    },
    businessValue: 'इमरजेंसी कॉल्स तुरंत कैप्चर + $1,500+ वाली एवरेज जॉब्स में 2x वृद्धि।',
    demoImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
    badgeText: 'Top USA Home Service'
  },
  {
    id: 'ecommerce-d2c',
    name: 'D2C & E-commerce Brands',
    hindiName: 'D2C / ई-कॉमर्स ब्रांड्स',
    icon: 'ShoppingBag',
    painPoint: 'इंस्टाग्राम विज्ञापनों से ट्रैफिक आता है, लेकिन धीमी वेबसाइट और लंबे चेकआउट प्रोसेस के कारण 75% लोग कार्ट छोड़कर भाग जाते हैं।',
    businessImpact: 'महंगे फेसबुक/गूगल एड्स का पैसा डूबता है, प्रति ग्राहक अधिग्रहण लागत (CAC) बहुत ज्यादा हो जाती है।',
    solution: 'Ultra-Fast Custom Storefront + 1-Page Express Checkout + Upsell/Cross-sell System.',
    deliverables: [
      'Under-1.5s Ultra Fast Storefront (Zero lag, Mobile First)',
      '1-Page Express Checkout with UPI / Apple Pay / Card Pre-fill',
      'Dynamic Cross-sell & Bundle Discounts in Cart',
      'Abandoned Cart Auto-Recovery via WhatsApp & Email',
      'Real-time Inventory & Courier Tracking Integration'
    ],
    indiaBudget: '₹45,000 – ₹1,50,000',
    usaBudget: '$3,500 – $12,000',
    indiaNumericMin: 45000,
    usaNumericMin: 3500,
    level1: {
      title: 'Level 1 — Starter D2C Storefront',
      desc: 'Up to 30 products, clean checkout, payment gateway, basic order alerts.',
      priceINR: '₹45,000',
      priceUSD: '$3,500'
    },
    level2: {
      title: 'Level 2 — High-Conversion Scale Store',
      desc: '1-click upsells, customer reviews with photos, pincode delivery checker, COD verify.',
      priceINR: '₹85,000',
      priceUSD: '$6,800'
    },
    level3: {
      title: 'Level 3 — Enterprise Omnichannel Commerce',
      desc: 'Multi-warehouse sync, automated courier routing (Shiprocket/ShipStation), custom ERP.',
      priceINR: '₹1,50,000',
      priceUSD: '$12,000'
    },
    businessValue: 'कार्ट अबैंडनमेंट में 25% की कमी + प्रति ऑर्डर वैल्यू (AOV) में 30% बढ़ोतरी।',
    demoImage: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80',
    badgeText: 'High ROAS E-commerce'
  },
  {
    id: 'service-firm',
    name: 'Growing Service Companies',
    hindiName: 'सर्विस कंपनी / कस्टम वेब ऐप',
    icon: 'Briefcase',
    painPoint: 'क्लाइंट्स, लीड्स, टीम का काम और इनवॉइस 5 अलग-अलग एक्सेल शीट्स और व्हाट्सएप ग्रुप्स में बिखरे हुए हैं।',
    businessImpact: 'डेडलाइन मिस होती हैं, क्लाइंट्स असंतुष्ट होकर छोड़ देते हैं, और नए कर्मचारी जोड़ने पर अराजकता फैलती है।',
    solution: 'Custom Business Web App / Client Portal / Operations CRM tailored to company workflow.',
    deliverables: [
      'Role-based Secure Authentication (Admin, Manager, Client, Staff)',
      'Custom Task & Project Pipeline Tracker',
      'Client Dashboard for Live Project Status & Invoices',
      'Automated Email & WhatsApp Notifications on Status Changes',
      'Financial Analytics, Revenue Charts & Export to Excel'
    ],
    indiaBudget: '₹1,50,000 – ₹6,00,000+',
    usaBudget: '$10,000 – $40,000+',
    indiaNumericMin: 150000,
    usaNumericMin: 10000,
    level1: {
      title: 'Level 1 — Internal Workflow & Pipeline Tool',
      desc: 'Lead tracker, client management, task status boards, basic roles.',
      priceINR: '₹1,50,000',
      priceUSD: '$10,000'
    },
    level2: {
      title: 'Level 2 — Full Custom CRM & Client Portal',
      desc: 'Client login, file uploads, automated milestone billing, team timesheets.',
      priceINR: '₹3,20,000',
      priceUSD: '$22,000'
    },
    level3: {
      title: 'Level 3 — Enterprise Multi-Branch Business OS',
      desc: 'Custom APIs, deep analytics, automated SLA monitoring, legacy DB migration.',
      priceINR: '₹6,00,000+',
      priceUSD: '$40,000+'
    },
    businessValue: 'मैनुअल काम में 50% समय की बचत + बिना नया स्टाफ रखे 3x रेवेन्यू स्केल।',
    demoImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    badgeText: 'Enterprise Grade Operations'
  }
];

export const CORE_PACKAGES: PackagePlan[] = [
  {
    id: 'starter',
    name: 'Starter Landing Page',
    tagline: 'Single-purpose high-converting offer',
    priceINR: '₹7,999 – ₹14,999',
    priceUSD: '$650 – $1,200',
    numericINR: 7999,
    numericUSD: 650,
    timeline: '3 – 5 Days',
    revisions: '1 Revision Round',
    features: [
      '1 Responsive high-speed landing page',
      'WhatsApp, Call & Email direct CTA',
      'Basic SEO & Meta Tags configuration',
      'Lead enquiry form with instant email alerts',
      'Mobile-first performance (<1.5s load)',
      'Google Analytics & Meta Pixel setup'
    ],
    ctaText: 'Get Starter Page'
  },
  {
    id: 'business',
    name: 'Business Website',
    tagline: 'For small businesses, clinics & local brands',
    priceINR: '₹18,000 – ₹45,000',
    priceUSD: '$1,200 – $3,500',
    numericINR: 18000,
    numericUSD: 1200,
    timeline: '7 – 10 Days',
    revisions: '2 Revision Rounds',
    popular: true,
    features: [
      'Up to 5 custom-designed responsive pages',
      'Services, Photo Gallery, Testimonials & FAQs',
      'Interactive Contact, Quote & Booking Forms',
      'Google Business Map integration & reviews feed',
      'On-Page SEO setup for local ranking',
      'Admin training & 30-day bug guarantee'
    ],
    ctaText: 'Choose Business Website'
  },
  {
    id: 'growth',
    name: 'Growth Website',
    tagline: 'Engineered for maximum lead generation',
    priceINR: '₹45,000 – ₹1,20,000',
    priceUSD: '$3,500 – $7,500',
    numericINR: 45000,
    numericUSD: 3500,
    timeline: '14 – 20 Days',
    revisions: '3 Revision Rounds',
    features: [
      'Up to 10 custom pages with conversion UX',
      'Editable CMS for blog, services & case studies',
      'Smart lead capture forms & CRM integration',
      'Advanced event tracking & heatmaps setup',
      'A/B tested headlines & high-trust badges',
      'Priority 45-day post launch warranty'
    ],
    ctaText: 'Accelerate with Growth'
  },
  {
    id: 'store',
    name: 'Online Store (E-Com)',
    tagline: 'Sell products online with 1-page checkout',
    priceINR: '₹50,000 – ₹1,50,000',
    priceUSD: '$3,500 – $12,000',
    numericINR: 50000,
    numericUSD: 3500,
    timeline: '15 – 25 Days',
    revisions: '2 Revision Rounds',
    features: [
      'High-speed modern storefront design',
      'Up to 50 initial product uploads & categories',
      'Payment gateway (Razorpay / Cashfree / Stripe)',
      'Automated shipping & courier integration',
      'Abandoned cart recovery alerts',
      'Order management & invoice generation'
    ],
    ctaText: 'Launch Online Store'
  },
  {
    id: 'webapp',
    name: 'Custom Web App / Portal',
    tagline: 'Custom business software & client portal',
    priceINR: '₹1,50,000+',
    priceUSD: '$10,000+',
    numericINR: 150000,
    numericUSD: 10000,
    timeline: '4 – 8 Weeks',
    revisions: 'Milestone Based',
    features: [
      'Detailed requirements & architectural blueprint',
      'Role-based authentication & data security',
      'Scalable PostgreSQL/MongoDB database schema',
      'Custom workflows, analytics & client dashboard',
      'Third-party API & payment integrations',
      'End-to-end automated testing & cloud handover'
    ],
    ctaText: 'Request Scoping Call'
  }
];

export const CARE_RETAINERS: CarePlan[] = [
  {
    id: 'basic-care',
    name: 'Basic Care',
    priceINR: '₹1,500 – ₹3,000',
    priceUSD: '$79 – $149',
    frequency: 'per month',
    description: 'Essential security, uptime monitoring and disaster recovery for peace of mind.',
    features: [
      'Weekly cloud backups & disaster restore',
      '24/7 Uptime & security monitoring',
      'Core software & security patch updates',
      'SSL certificate renewal checks',
      'Monthly health & speed score report'
    ]
  },
  {
    id: 'business-care',
    name: 'Business Care',
    priceINR: '₹4,000 – ₹8,000',
    priceUSD: '$199 – $399',
    frequency: 'per month',
    popular: true,
    description: 'Active maintenance and monthly content updates for growing businesses.',
    features: [
      'Everything in Basic Care included',
      'Up to 2 hours of monthly content/text updates',
      'Monthly speed & Core Web Vitals tune-up',
      'Broken link & contact form testing',
      'Priority email & WhatsApp support (24h SLA)'
    ]
  },
  {
    id: 'growth-support',
    name: 'Growth Support',
    priceINR: '₹10,000 – ₹25,000',
    priceUSD: '$499 – $999',
    frequency: 'per month',
    description: 'Continuous conversion optimization and landing page iterations.',
    features: [
      'Everything in Business Care included',
      'Up to 6 hours of custom design/dev updates',
      'Monthly conversion rate audit & suggestions',
      'New campaign landing page creation/refresh',
      'Dedicated Slack/WhatsApp channel with 4h SLA'
    ]
  }
];

export const LIVE_DEMOS: LiveDemoItem[] = [
  {
    id: 'demo-restaurant',
    title: 'Restaurant & Fine Dining',
    category: 'Restaurant Website',
    rating: 4.9,
    reviewsCount: 380,
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    tag: 'Hospitality',
    liveUrl: '#demo',
    features: ['QR Digital Menu', 'Table Booking', 'Google Map']
  },
  {
    id: 'demo-clinic',
    title: 'CareHealth Multispecialty Clinic',
    category: 'Clinic Website',
    rating: 4.95,
    reviewsCount: 520,
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
    tag: 'Healthcare',
    liveUrl: '#demo',
    features: ['Doctor Profiles', 'Slot Booking', 'WhatsApp Alerts']
  },
  {
    id: 'demo-ecommerce',
    title: 'Aura Lifestyle Modern Store',
    category: 'E-commerce Store',
    rating: 4.88,
    reviewsCount: 1420,
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
    tag: 'E-commerce',
    liveUrl: '#demo',
    features: ['1-Page Checkout', 'UPI & Cards', 'Fast CDN']
  },
  {
    id: 'demo-realestate',
    title: 'Skyline Luxury Towers & Villas',
    category: 'Real Estate Website',
    rating: 4.92,
    reviewsCount: 290,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    tag: 'Real Estate',
    liveUrl: '#demo',
    features: ['Floor Plan Zoom', 'EMI Calc', 'Brochure Gate']
  },
  {
    id: 'demo-salon',
    title: 'Luxe Hair & Aesthetic Spa',
    category: 'Salon Website',
    rating: 4.9,
    reviewsCount: 410,
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
    tag: 'Salon & Spa',
    liveUrl: '#demo',
    features: ['Stylist Picker', 'Service Cards', 'Auto Reminders']
  },
  {
    id: 'demo-webapp',
    title: 'PulseOps Business ERP & CRM',
    category: 'Business Web App',
    rating: 4.97,
    reviewsCount: 180,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    tag: 'Web Applications',
    liveUrl: '#demo',
    features: ['Role Auth', 'Task Pipeline', 'Financial Reports']
  }
];
