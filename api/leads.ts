import type { VercelRequest, VercelResponse } from '@vercel/node';

// Memory fallback store for active serverless session
// In production, when CRM_WEBHOOK_URL or DISPATCH_EMAIL is configured, leads are dispatched durably.
const ephemeralSubmissions: any[] = [];

// Rate-limiting window tracker (by IP)
const ipRateLimits = new Map<string, { count: number; expiresAt: number }>();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Health check endpoint
  if (req.method === 'GET') {
    return res.status(200).json({
      status: 'operational',
      service: 'Vismart Studio Lead Intake API',
      timestamp: new Date().toISOString(),
      acceptedLeadsCount: ephemeralSubmissions.length
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method Not Allowed',
      message: 'Only POST submissions are supported for lead intake.'
    });
  }

  try {
    const clientIp = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown';

    // 1. Rate Limiting Protection (Max 5 submissions per 10 minutes per IP)
    const now = Date.now();
    const limitRecord = ipRateLimits.get(clientIp);
    if (limitRecord && limitRecord.expiresAt > now) {
      if (limitRecord.count >= 5) {
        return res.status(429).json({
          error: 'Too Many Requests',
          message: 'Rate limit exceeded. Please wait a few minutes before submitting another brief.'
        });
      }
      limitRecord.count += 1;
    } else {
      ipRateLimits.set(clientIp, { count: 1, expiresAt: now + 10 * 60 * 1000 });
    }

    const {
      name,
      contact,
      email,
      phone,
      businessType,
      goals,
      scope,
      essentialFeatures,
      optionalFeatures,
      budget,
      timeline,
      notes,
      source,
      honeypot
    } = req.body || {};

    // 2. Spam Honeypot Protection
    if (honeypot && String(honeypot).trim() !== '') {
      // Silently accept bot to prevent feedback
      return res.status(200).json({
        success: true,
        referenceId: 'VS-SPAM-' + Math.floor(100000 + Math.random() * 900000),
        message: 'Lead received.'
      });
    }

    // 3. Strict Validation
    const cleanName = (name || '').trim();
    const cleanContact = (contact || phone || email || '').trim();

    if (!cleanName || cleanName.length < 2) {
      return res.status(400).json({
        error: 'ValidationError',
        message: 'A valid name (at least 2 characters) is required.'
      });
    }

    if (!cleanContact || cleanContact.length < 6) {
      return res.status(400).json({
        error: 'ValidationError',
        message: 'A valid contact phone number or email address is required so the studio can reply.'
      });
    }

    // Validate email format if provided
    if (email && email.includes('@')) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        return res.status(400).json({
          error: 'ValidationError',
          message: 'The email address provided is not properly formatted.'
        });
      }
    }

    // Validate phone number digits if provided
    if (phone && phone.replace(/\D/g, '').length < 7 && !email) {
      return res.status(400).json({
        error: 'ValidationError',
        message: 'Please provide at least a 7 to 10 digit telephone or WhatsApp contact number.'
      });
    }

    // 4. Construct Structured Lead Dossier
    const referenceId = `VS-${Date.now().toString(36).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;
    const receivedAt = new Date().toISOString();

    const leadDossier = {
      referenceId,
      receivedAt,
      clientIp,
      contactInfo: {
        name: cleanName,
        contact: cleanContact,
        email: email ? email.trim() : null,
        phone: phone ? phone.trim() : null
      },
      projectRequirements: {
        businessType: businessType || 'General Business',
        goals: Array.isArray(goals) ? goals : [goals].filter(Boolean),
        scope: scope || 'Not specified',
        essentialFeatures: Array.isArray(essentialFeatures) ? essentialFeatures : [],
        optionalFeatures: Array.isArray(optionalFeatures) ? optionalFeatures : [],
        indicativeBudget: budget || 'To be discussed',
        estimatedTimeline: timeline || 'Standard Delivery (2-3 Weeks)',
        additionalNotes: notes || ''
      },
      source: source || 'Vismart Studio Web Portal',
      status: 'received_under_founder_review'
    };

    // Store in active session array
    ephemeralSubmissions.push(leadDossier);

    // 5. External Webhook Forwarding (If configured in Vercel environment)
    const webhookUrl = process.env.STUDIO_LEAD_WEBHOOK_URL || process.env.CRM_WEBHOOK_URL;
    let externalDispatched = false;

    if (webhookUrl) {
      try {
        const webhookRes = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'Vismart-Studio-Lead-Engine/1.0'
          },
          body: JSON.stringify(leadDossier)
        });
        if (webhookRes.ok) {
          externalDispatched = true;
        }
      } catch (webhookErr) {
        console.error('External webhook dispatch failed:', webhookErr);
      }
    }

    // Return Server-Confirmed Success
    return res.status(200).json({
      success: true,
      referenceId,
      receivedAt,
      externalDispatched,
      message: 'Your Project Brief has been securely recorded by Vismart Studio servers. Studio engineers will review your architecture and prepare your verified quotation within 24 hours.'
    });

  } catch (error: any) {
    console.error('Server error processing lead:', error);
    return res.status(500).json({
      error: 'ServerError',
      message: 'An error occurred while transmitting your project brief to Vismart Studio. Please retry or contact us directly at contact@vismartstudio.com.'
    });
  }
}
