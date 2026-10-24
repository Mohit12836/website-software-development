export interface DiagnosticResponse {
  id: string;
  industry: string;
  industryName: string;
  businessName?: string;
  clientName?: string;
  clientPhone?: string;
  clientCountry?: string;
  acquisitionChannel?: string;
  operationsMethod?: string;
  commissionCut?: string;
  retentionSystem?: string;
  ownerTimeTrap?: string;
  detectedPainPoints: string[];
  systemVerdict: string;
  potentialAnnualLeakINR: number;
  potentialAnnualLeakUSD: number;
  recommendedEngine: string;
  updatedAt: string;
}

export interface DiagnosticSlide {
  id: string;
  category: string;
  tag: string;
  question: string;
  subtitle: string;
  options: {
    id: string;
    label: string;
    sublabel?: string;
    icon?: string;
    mirrorInsight: string; // The eye-opening truth shown right after selecting
    leakAmountINR?: number;
    leakAmountUSD?: number;
    painTag: string;
  }[];
}

export const DIAGNOSTIC_SLIDES: DiagnosticSlide[] = [
  // SLIDE 1: Business Type & Sector
  {
    id: 'industry',
    category: 'धंधे की पहचान',
    tag: 'पहचान',
    question: 'आपका बिज़नेस मुख्य रूप से किस श्रेणी में आता है?',
    subtitle: 'आपके काम के अनुसार आगे का पूरा विश्लेषण तैयार होगा:',
    options: [
      {
        id: 'restaurant',
        label: 'रेस्टोरेंट / कैफे / फूड कोर्ट',
        sublabel: 'Dine-in, टेकअवे या डिलीवरी',
        icon: '🍽️',
        mirrorInsight: 'इस सेक्टर में 85% मुनाफ़ा इसलिए कम होता है क्योंकि पीक ऑवर्स में फोन कॉल्स छूटते हैं और 25% तक कमीशन फूड डिलीवरी ऐप्स ले जाते हैं।',
        leakAmountINR: 240000,
        leakAmountUSD: 3200,
        painTag: 'aggregator_commission'
      },
      {
        id: 'clinic',
        label: 'क्लिनिक / डेंटल / डॉक्टर / थेरेपी',
        sublabel: 'अपॉइंटमेंट और मरीज परामर्श',
        icon: '🩺',
        mirrorInsight: 'डॉक्टर्स का सबसे बड़ा दर्द: रिसेप्शन पर फोन की घंटी बजती रहना, स्लॉट्स का क्लैश होना और मरीजों का बिना बताए न आना (No-Shows)।',
        leakAmountINR: 180000,
        leakAmountUSD: 2500,
        painTag: 'appointment_clash'
      },
      {
        id: 'retail',
        label: 'दुकान / शोरूम / रिटेल स्टोर',
        sublabel: 'कपड़े, इलेक्ट्रॉनिक्स, किराना या जनरल स्टोर',
        icon: '🏪',
        mirrorInsight: 'दुकानदार हर दिन व्हाट्सएप पर वही फोटो और रेट भेजने में थक जाता है। ग्राहक दुकान आता है, पसंद करता है लेकिन दोबारा ऑनलाइन नहीं जुड़ पाता।',
        leakAmountINR: 150000,
        leakAmountUSD: 2000,
        painTag: 'manual_catalog_dispatch'
      },
      {
        id: 'services',
        label: 'ठेकेदार / होम सर्विसेज / रिपेयर',
        sublabel: 'प्लंबर, इलेक्ट्रीशियन, इंटीरियर, एसी',
        icon: '🔧',
        mirrorInsight: 'इमरजेंसी काम में जो कॉल 30 सेकंड में नहीं उठती, वो ग्राहक तुरंत दूसरे मिस्त्री या ठेकेदार को कॉल कर देता है। सारा खेल स्पीड का है।',
        leakAmountINR: 280000,
        leakAmountUSD: 3600,
        painTag: 'missed_emergency_calls'
      },
      {
        id: 'coaching',
        label: 'कोचिंग / ट्रेनिंग / स्कूल / क्लासेस',
        sublabel: 'विद्यार्थी एडमिशन और फीस',
        icon: '🎓',
        mirrorInsight: 'एडमिशन इन्क्वायरी कागजों या चैट्स में खो जाती हैं और स्टाफ हर महीने फीस का तकादा करने में असहज महसूस करता है।',
        leakAmountINR: 200000,
        leakAmountUSD: 2800,
        painTag: 'admission_leak'
      },
      {
        id: 'manufacturing',
        label: 'B2B / मैन्युफैक्चरिंग / डिस्ट्रीब्यूटर',
        sublabel: 'होलसेल और बड़े कोटेशन',
        icon: '🏭',
        mirrorInsight: 'कोटेशन बनाने में 2-3 दिन लग जाते हैं, तब तक बायर किसी और सप्लायर से डील फाइनल कर लेता है।',
        leakAmountINR: 350000,
        leakAmountUSD: 4500,
        painTag: 'slow_rfq_turnaround'
      },
      {
        id: 'realestate',
        label: 'रियल एस्टेट ब्रोकर / बिल्डर',
        sublabel: 'प्रॉपर्टी और साइट विजिट्स',
        icon: '🏢',
        mirrorInsight: 'हजारों रुपये के विज्ञापन चलते हैं लेकिन लीड आते ही फॉलो-अप न होने से 70% बायर्स ठंडे पड़ जाते हैं।',
        leakAmountINR: 400000,
        leakAmountUSD: 5000,
        painTag: 'lead_followup_loss'
      },
      {
        id: 'other',
        label: 'अन्य प्राइवेट सर्विस या एजेंसी',
        sublabel: 'कस्टम बिजनेस मॉडल',
        icon: '💼',
        mirrorInsight: 'जब तक बिज़नेस मालिक खुद हर क्लाइंट को हैंडल करेगा, तब तक कंपनी 10 गुना बड़ी कभी नहीं हो पाएगी।',
        leakAmountINR: 220000,
        leakAmountUSD: 3000,
        painTag: 'owner_dependency'
      }
    ]
  },

  // SLIDE 2: How Customers Reach You
  {
    id: 'acquisition',
    category: 'ग्राहक का रास्ता',
    tag: 'इनकमिंग ट्रैफ़िक',
    question: 'नए और पुराने ग्राहक आपसे संपर्क कैसे करते हैं?',
    subtitle: 'देखते हैं ग्राहक के आने का रास्ता कितना मजबूत या टूटा हुआ है:',
    options: [
      {
        id: 'phone_only',
        label: 'ज्यादातर सीधा फोन कॉल्स पर',
        sublabel: 'दिनभर कॉल्स अटेंड करते हैं',
        icon: '📞',
        mirrorInsight: 'यहीं से पहली बड़ी लीकेज है! जब आप किसी एक ग्राहक से 5 मिनट बात कर रहे होते हैं, ठीक उसी वक्त 2 और ग्राहक कॉल बिजी पाकर किसी प्रतियोगी के पास चले जाते हैं।',
        leakAmountINR: 180000,
        leakAmountUSD: 2400,
        painTag: 'single_line_congestion'
      },
      {
        id: 'whatsapp_manual',
        label: 'व्हाट्सएप चैट और मैसेजेस पर',
        sublabel: 'फोटो भेजना, रेट बताना सब चैट में',
        icon: '💬',
        mirrorInsight: 'व्हाट्सएप पर हर ग्राहक को वही 10 फोटो, वही रेट और वही बैंक डिटेल बार-बार टाइप करना समय की भयंकर बर्बादी है। शाम होते-होते आधी चैट्स का जवाब देना भूल जाते हैं।',
        leakAmountINR: 140000,
        leakAmountUSD: 1800,
        painTag: 'whatsapp_manual_fatigue'
      },
      {
        id: 'walkin_local',
        label: 'दुकान या ऑफिस पर सीधा आकर (Walk-in)',
        sublabel: 'स्थानीय फुटफॉल पर निर्भर',
        icon: '🚶',
        mirrorInsight: 'केवल वॉक-इन पर निर्भर रहना खतरनाक है। अगर बारिश हो जाए या सड़क पर काम लग जाए, तो धंधा 50% गिर जाता है क्योंकि आपके पास उनका कोई डिजिटल कनेक्शन नहीं है।',
        leakAmountINR: 160000,
        leakAmountUSD: 2100,
        painTag: 'zero_digital_retention'
      },
      {
        id: 'social_ads',
        label: 'इंस्टाग्राम / फेसबुक / गूगल विज्ञापनों से',
        sublabel: 'रोज नए लीड्स के विज्ञापन चलते हैं',
        icon: '📢',
        mirrorInsight: 'विज्ञापन से लीड्स तो आ रही हैं, लेकिन अगर 15 मिनट में रिस्पॉन्स नहीं मिला, तो विज्ञापन का 60% पैसा पानी में बह जाता है क्योंकि ग्राहक का मूड बदल जाता है।',
        leakAmountINR: 220000,
        leakAmountUSD: 2900,
        painTag: 'ad_budget_waste'
      }
    ]
  },

  // SLIDE 3: How Operations Are Managed
  {
    id: 'operations',
    category: 'काम करने का तरीका',
    tag: 'ऑपरेशंस',
    question: 'ऑर्डर्स, बुकिंग्स या काम का हिसाब-किताब कहाँ दर्ज होता है?',
    subtitle: 'टूटा हुआ सिस्टम काम को धीमा और स्टाफ को लाचार बना देता है:',
    options: [
      {
        id: 'paper_diary',
        label: 'कागज के रजिस्टर या डायरी में पेन से',
        sublabel: 'पारंपरिक रजिस्टर रिकॉर्ड',
        icon: '📓',
        mirrorInsight: 'टूटा हुआ सिस्टम! डायरी में लिखा रिकॉर्ड न तो कभी सर्च हो सकता है, न ही पुराने ग्राहक को दोबारा बुलाने में काम आता है। डायरी फटी या खोई, तो पूरा इतिहास गायब।',
        leakAmountINR: 120000,
        leakAmountUSD: 1500,
        painTag: 'paper_record_blindness'
      },
      {
        id: 'verbal_memory',
        label: 'जुबानी याद रखकर या स्टाफ के भरोसे',
        sublabel: 'माइंड में याद रहता है सब',
        icon: '🧠',
        mirrorInsight: 'सबसे ज्यादा तनाव यहीं है! जब स्टाफ भूल जाता है या गलत काम कर देता है, तो ग्राहक आपसे नाराज होता है। सिस्टम नहीं होगा तो स्टाफ हमेशा गलतियाँ करेगा।',
        leakAmountINR: 190000,
        leakAmountUSD: 2400,
        painTag: 'staff_human_error'
      },
      {
        id: 'excel_sheets',
        label: 'एक्सेल शीट्स / गूगल स्प्रेडशीट में',
        sublabel: 'मैन्युअल एंट्री शाम को करते हैं',
        icon: '📊',
        mirrorInsight: 'एक्सेल में डेटा तो आ जाता है, लेकिन वो ग्राहक से ऑटोमैटिक बात नहीं कर सकता। वो सिर्फ एक मुर्दा लिस्ट है जो अपने आप कोई ऑर्डर या पेमेंट नहीं लाती।',
        leakAmountINR: 90000,
        leakAmountUSD: 1200,
        painTag: 'static_excel_trap'
      },
      {
        id: 'whatsapp_notes',
        label: 'व्हाट्सएप ग्रुप्स या पर्सनल चैट्स में',
        sublabel: 'स्क्रीनशॉट और चैट्स ही रिकॉर्ड हैं',
        icon: '📱',
        mirrorInsight: 'चैट्स में काम का स्टेटस ढूंढना किसी दलदल जैसा है। ग्राहक पूछता है "मेरा काम कहाँ तक पहुँचा?", और आप 10 ग्रुप्स में स्टाफ से पूछ रहे होते हैं।',
        leakAmountINR: 130000,
        leakAmountUSD: 1700,
        painTag: 'chat_chaos_delay'
      }
    ]
  },

  // SLIDE 4: Commission & Middlemen
  {
    id: 'commission',
    category: 'कमाई की चोरी',
    tag: 'कमीशन व बिचौलिए',
    question: 'क्या आपकी कमाई का एक हिस्सा बिचौलियों या थर्ड-पार्टी ऐप्स में कटता है?',
    subtitle: 'मेहनत आपकी, दुकान आपकी—लेकिन मलाई कोई और काट रहा है:',
    options: [
      {
        id: 'heavy_cut',
        label: 'हाँ, हर बिक्री पर 15% से 30% तक मोटा कमीशन कटता है',
        sublabel: 'Swiggy, Zomato, Justdial, Amazon आदि',
        icon: '💸',
        mirrorInsight: 'कच्ची कमाई का सबसे बड़ा गड्ढा! अगर आप महीने का 3 लाख कमाते हैं, तो ₹75,000 तो बिना कुछ किए ऐप वाले ले जा रहे हैं। साल का 9 लाख रुपये! और ग्राहक भी आपका नहीं, उनका बन रहा है।',
        leakAmountINR: 360000,
        leakAmountUSD: 4800,
        painTag: 'aggregator_blood_drain'
      },
      {
        id: 'lead_portal_scam',
        label: 'हम लीड्स के लिए पैसे देते हैं लेकिन वो 5 और लोगों को बेची जाती हैं',
        sublabel: 'Justdial, Sulekha, IndiaMART आदि',
        icon: '📉',
        mirrorInsight: 'सस्ती लीड का झांसा! एक ही ग्राहक का नंबर 5 अलग-अलग दुकानदारों को दिया जाता है। फिर ग्राहक रेट गिराने की होड़ करवाता है और मार्जिन शून्य हो जाता है।',
        leakAmountINR: 240000,
        leakAmountUSD: 3000,
        painTag: 'shared_lead_race_to_bottom'
      },
      {
        id: 'no_commission_direct',
        label: 'नहीं, हम सीधा बेचते हैं लेकिन नए ग्राहक बहुत धीरे आ रहे हैं',
        sublabel: 'कमीशन नहीं देते लेकिन ग्रोथ धीमी है',
        icon: '⏳',
        mirrorInsight: 'कमीशन न देना अच्छा है, लेकिन अगर आपकी अपनी वेबसाइट या डायरेक्ट बुकिंग फनल नहीं है, तो आपकी रफ्तार कछुए जैसी रहेगी।',
        leakAmountINR: 110000,
        leakAmountUSD: 1400,
        painTag: 'slow_organic_ceiling'
      }
    ]
  },

  // SLIDE 5: Customer Retention & Repeat Business
  {
    id: 'retention',
    category: 'पुराने ग्राहक',
    tag: 'रिपीट कस्टमर',
    question: 'पुराने ग्राहक को दोबारा खींचने के लिए आपके पास क्या ऑटोमैटिक सिस्टम है?',
    subtitle: 'नया ग्राहक लाना 5 गुना महंगा है; पुराने ग्राहक ही असली वेल्थ हैं:',
    options: [
      {
        id: 'no_system_luck',
        label: 'कुछ नहीं, वो खुद मर्जी से याद करके आए तो ठीक',
        sublabel: 'कोई फॉलो-अप या रिमाइंडर नहीं',
        icon: '🕳️',
        mirrorInsight: 'बाल्टी में नीचे बड़ा छेद है! नए ग्राहक ऊपर से आ रहे हैं और पुराने ग्राहक चुपचाप गायब हो रहे हैं क्योंकि आपने उन्हें याद ही नहीं दिलाया। इस अकेले लीकेज से 40% बिक्री कम हो रही है।',
        leakAmountINR: 250000,
        leakAmountUSD: 3300,
        painTag: 'leaky_bucket_syndrome'
      },
      {
        id: 'occasional_broadcast',
        label: 'त्योहारों पर कभी-कभार व्हाट्सएप पर मैसेज डाल देते हैं',
        sublabel: 'मैन्युअल ब्रॉडकास्ट',
        icon: '📩',
        mirrorInsight: 'सबको एक जैसा मैसेज भेजना स्पैम जैसा लगता है। जब तक सिस्टम ग्राहक की पसंद के अनुसार पर्सनलाइज्ड मैसेज नहीं भेजेगा, लोग मैसेज डिलीट कर देंगे।',
        leakAmountINR: 130000,
        leakAmountUSD: 1700,
        painTag: 'generic_spam_broadcast'
      },
      {
        id: 'want_automatic_machine',
        label: 'हमें एक ऐसा ऑटोमैटिक सिस्टम चाहिए जो खुद फॉलो-अप करे',
        sublabel: 'बिना हमारे हाथ लगाए',
        icon: '🚀',
        mirrorInsight: 'यही एक अमीर और सफल बिज़नेस की पहचान है। एक ऑटो-रिमाइंडर या लॉयल्टी इंजन बिना किसी सैलरी के 24 घंटे आपके पुराने ग्राहकों को वापस बुलाता रहता है।',
        leakAmountINR: 50000,
        leakAmountUSD: 600,
        painTag: 'ready_for_automation'
      }
    ]
  },

  // SLIDE 6: Owner's Time Trap (The Real Bottleneck)
  {
    id: 'timetrap',
    category: 'मालिक का फँसाव',
    tag: 'समय की बर्बादी',
    question: 'एक मालिक के रूप में, आपका सबसे ज्यादा समय किस फालतू काम में फँसता है?',
    subtitle: 'मालिक को बिजनेस बढ़ाना चाहिए, क्लर्क का काम नहीं करना चाहिए:',
    options: [
      {
        id: 'answering_same_rates',
        label: 'दिनभर बार-बार वही रेट, मेनू या फोटो सबको समझाना',
        sublabel: 'एक ही बात 50 बार बोलना',
        icon: '🔁',
        mirrorInsight: 'आप मालिक हैं, लेकिन काम ₹10,000 वाले टेलीकॉलर का कर रहे हैं! जिस समय में आपको नई ब्रांच या बड़ा टाई-अप सोचना चाहिए, उस समय आप फोन पर रेट बता रहे हैं।',
        leakAmountINR: 210000,
        leakAmountUSD: 2700,
        painTag: 'owner_telecaller_trap'
      },
      {
        id: 'staff_supervision',
        label: 'स्टाफ के सिर पर खड़े रहना पड़ता है, नहीं तो काम बिगड़ जाता है',
        sublabel: 'छुट्टी नहीं ले सकते',
        icon: '👀',
        mirrorInsight: 'अगर आपके दुकान या ऑफिस से 3 दिन बाहर जाने पर धंधा रुक जाता है, तो आपने बिज़नेस नहीं बनाया—अपने लिए एक खुद की नौकरी बना ली है। सिस्टम ही आपको आजादी देगा।',
        leakAmountINR: 260000,
        leakAmountUSD: 3400,
        painTag: 'owner_prison_trap'
      },
      {
        id: 'payment_chasing',
        label: 'पेमेंट और बिल की उधारी वसूलने में बार-बार फोन मिलाना',
        sublabel: 'पैसे अटके रहते हैं',
        icon: '💳',
        mirrorInsight: 'उधारी बिज़नेस का साइलेंट किलर है। जब तक पेमेंट गेटवे और डिजिटल इनवॉइसिंग ऑटोमैटिक नहीं होगी, आपका वर्किंग कैपिटल हमेशा फंसा रहेगा।',
        leakAmountINR: 180000,
        leakAmountUSD: 2300,
        painTag: 'manual_payment_chasing'
      }
    ]
  }
];
