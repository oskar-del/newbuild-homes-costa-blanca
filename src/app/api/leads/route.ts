import { NextRequest, NextResponse } from 'next/server';

interface LeadData {
  name: string;
  email: string;
  phone?: string;
  message?: string;
  area?: string;
  propertyType?: string;
  budgetRange?: string;
  developmentName?: string;
  formType?: string;
  sourcePage?: string;
  language?: string;
}

// Validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Map language codes to Airtable singleSelect option names
function mapLanguage(lang: string): string {
  const map: Record<string, string> = {
    'en': 'English',
    'sv': 'Svenska',
    'nl': 'Nederlands',
    'nl-be': 'Nederlands',
    'fr': 'Francais',
    'de': 'Deutsch',
    'no': 'Norsk',
    'pl': 'Polski',
    'ru': 'Russian',
  };
  return map[lang.toLowerCase()] || 'English';
}

// Push to Airtable
async function pushToAirtable(data: LeadData): Promise<boolean> {
  const apiToken = process.env.AIRTABLE_API_TOKEN;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableId = process.env.AIRTABLE_TABLE_ID;

  // If Airtable is not configured, log warning but return success
  if (!apiToken || !baseId || !tableId) {
    console.warn('Airtable configuration missing. Leads will not be stored.');
    return true;
  }

  try {
    const response = await fetch(`https://api.airtable.com/v0/${baseId}/${tableId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        records: [
          {
            fields: {
              'Name': data.name,
              'Email': data.email,
              // Only include optional text fields if they have values
              ...(data.phone ? { 'Phone': data.phone } : {}),
              ...(data.message ? { 'Message': data.message } : {}),
              // singleSelect fields must match exact option names or be omitted
              ...(data.area ? { 'Area': data.area } : {}),
              ...(data.propertyType ? { 'Property Type': data.propertyType } : {}),
              ...(data.budgetRange ? { 'Budget Range': data.budgetRange } : {}),
              ...(data.developmentName ? { 'Development Name': data.developmentName } : {}),
              ...(data.formType ? { 'Form Type': data.formType } : {}),
              ...(data.sourcePage ? { 'Source Page': data.sourcePage } : {}),
              // Language mapping to match Airtable singleSelect options
              'Language': mapLanguage(data.language || 'en'),
              'Status': 'New Lead',
              'Created Date': new Date().toISOString(),
            },
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Airtable API error:', errorData);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error pushing to Airtable:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: LeadData = await request.json();

    // Validate required fields
    if (!body.name || !body.name.trim()) {
      return NextResponse.json(
        { success: false, error: 'Name is required' },
        { status: 400 }
      );
    }

    if (!body.email || !body.email.trim()) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!isValidEmail(body.email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Normalize data
    const leadData: LeadData = {
      name: body.name.trim(),
      email: body.email.trim().toLowerCase(),
      phone: body.phone?.trim() || undefined,
      message: body.message?.trim() || undefined,
      area: body.area?.trim() || undefined,
      propertyType: body.propertyType?.trim() || undefined,
      budgetRange: body.budgetRange?.trim() || undefined,
      developmentName: body.developmentName?.trim() || undefined,
      formType: body.formType?.trim() || 'lead-inquiry',
      sourcePage: body.sourcePage?.trim() || undefined,
      language: body.language?.trim() || 'en',
    };

    // Push to Airtable
    const airtableSuccess = await pushToAirtable(leadData);

    // Log the lead (optional - for debugging or alternative storage)
    console.log('Lead received:', leadData);

    // Always return success to the client (graceful degradation)
    // This way the user gets positive feedback even if Airtable fails
    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for your inquiry. We will be in touch soon.',
        airtableSuccess,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing lead:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process inquiry' },
      { status: 500 }
    );
  }
}
