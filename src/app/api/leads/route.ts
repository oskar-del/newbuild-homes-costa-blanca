/**
 * Lead Submission API Route
 * 
 * Handles form submissions and forwards to Airtable
 * Also supports email notifications via SendGrid/Resend
 */

import { NextRequest, NextResponse } from 'next/server';

interface LeadData {
  name: string;
  email: string;
  phone?: string;
  message?: string;
  propertyInterest?: string;
  source?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

// Airtable configuration
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME || 'Leads';

// Email notification configuration (optional)
const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL;
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

export async function POST(request: NextRequest) {
  try {
    const data: LeadData = await request.json();

    // Validate required fields
    if (!data.name || !data.email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Get metadata
    const timestamp = new Date().toISOString();
    const userAgent = request.headers.get('user-agent') || 'Unknown';
    const referer = request.headers.get('referer') || '';

    // Prepare lead record
    const leadRecord = {
      Name: data.name,
      Email: data.email,
      Phone: data.phone || '',
      Message: data.message || '',
      'Property Interest': data.propertyInterest || '',
      Source: data.source || 'website',
      'UTM Source': data.utmSource || '',
      'UTM Medium': data.utmMedium || '',
      'UTM Campaign': data.utmCampaign || '',
      'Submitted At': timestamp,
      'User Agent': userAgent,
      Referer: referer,
      Status: 'New'
    };

    // Submit to Airtable (if configured)
    if (AIRTABLE_API_KEY && AIRTABLE_BASE_ID) {
      try {
        const airtableResponse = await fetch(
          `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              records: [{ fields: leadRecord }]
            })
          }
        );

        if (!airtableResponse.ok) {
          const errorData = await airtableResponse.json();
          console.error('Airtable error:', errorData);
          // Don't fail the request - continue to success
        }
      } catch (airtableError) {
        console.error('Airtable submission failed:', airtableError);
        // Don't fail the request - log and continue
      }
    } else {
      // Log lead for debugging when Airtable isn't configured
      console.log('Lead received (Airtable not configured):', leadRecord);
    }

    // Send email notification (if configured)
    if (SENDGRID_API_KEY && NOTIFICATION_EMAIL) {
      try {
        await sendEmailNotification(data, timestamp);
      } catch (emailError) {
        console.error('Email notification failed:', emailError);
        // Don't fail the request
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you for your enquiry. We will be in touch shortly.'
    });

  } catch (error) {
    console.error('Lead submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit enquiry. Please try again or contact us directly.' },
      { status: 500 }
    );
  }
}

// Optional: Email notification function
async function sendEmailNotification(data: LeadData, timestamp: string) {
  if (!SENDGRID_API_KEY || !NOTIFICATION_EMAIL) return;

  const emailContent = `
New Lead from New Build Homes Costa Blanca

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}
Property Interest: ${data.propertyInterest || 'Not specified'}
Source: ${data.source || 'Website'}

Message:
${data.message || 'No message provided'}

Submitted: ${timestamp}
UTM Source: ${data.utmSource || '-'}
UTM Medium: ${data.utmMedium || '-'}
UTM Campaign: ${data.utmCampaign || '-'}
  `.trim();

  await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${SENDGRID_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: NOTIFICATION_EMAIL }] }],
      from: { email: 'leads@newbuildhomescostablanca.com', name: 'Website Leads' },
      subject: `New Lead: ${data.name} - ${data.propertyInterest || 'General Enquiry'}`,
      content: [{ type: 'text/plain', value: emailContent }]
    })
  });
}

// Handle other methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
