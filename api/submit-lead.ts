import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createGHLContact } from './ghl.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // CORS headers (allows your frontend to call this API)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { firstName, name, email, phone, comment, source } = req.body;

    // Validate required fields
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Prepare tags based on source
    const tags = [];
    if (source === 'contact-form') {
      tags.push('Website Lead', 'Contact Form');
    } else if (source === 'case-study') {
      tags.push('Website Lead', 'Case Study Form');
    } else {
      tags.push('Website Lead');
    }

    // Create contact in GHL
    const result = await createGHLContact({
      firstName: firstName || name,
      email,
      phone,
      tags,
      source: source || 'website',
      customFields: {
        comment: comment || '',
        lead_source_detail: source || 'unknown',
      },
    });

    return res.status(200).json({
      success: true,
      message: 'Thank you! We\'ll be in touch soon.',
      contactId: result.contact?.id,
    });
  } catch (error: any) {
    console.error('Submit Lead Error:', error);
    return res.status(500).json({
      error: 'Failed to submit form. Please try again or contact us directly.',
      details: error.message,
    });
  }
}

