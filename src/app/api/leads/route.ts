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
  propertyReference?: string;
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

// Map language codes to MailerLite group names
function getMailerLiteGroups(data: LeadData): string[] {
  const groups: string[] = [];

  // Language-based group
  const langGroupMap: Record<string, string> = {
    'en': 'English Buyers',
    'sv': 'Swedish Buyers',
    'nl': 'Dutch Buyers',
    'nl-be': 'Dutch Buyers',
    'fr': 'French Buyers',
    'de': 'German Buyers',
    'no': 'Norwegian Buyers',
    'pl': 'Polish Buyers',
    'ru': 'Russian Buyers',
    'es': 'Spanish Buyers',
  };
  const langGroup = langGroupMap[(data.language || 'en').toLowerCase()];
  if (langGroup) groups.push(langGroup);

  // Area-based group
  const area = (data.area || '').toLowerCase();
  const northAreas = ['javea', 'jávea', 'denia', 'dénia', 'moraira', 'calpe', 'benissa', 'altea', 'benidorm', 'finestrat', 'villajoyosa', 'polop', 'la nucia'];
  const southAreas = ['torrevieja', 'orihuela', 'guardamar', 'pilar de la horadada', 'san miguel', 'villamartin', 'los montesinos', 'rojales', 'ciudad quesada'];

  if (northAreas.some(a => area.includes(a))) {
    groups.push('Costa Blanca North');
  } else if (southAreas.some(a => area.includes(a))) {
    groups.push('Costa Blanca South');
  }

  // Flow-based groups (triggers different email automations)
  if (data.formType === 'Newsletter Signup') {
    groups.push('Newsletter Subscribers');
  } else if (data.formType === 'Consultation Request') {
    groups.push('Consultation Requests');
  } else {
    // Property Inquiry, Development Inquiry, or any other form
    groups.push('Property Inquiries');
  }

  return groups;
}

// Push to MailerLite
async function pushToMailerLite(data: LeadData): Promise<boolean> {
  const apiKey = process.env.MAILERLITE_API_KEY;

  if (!apiKey) {
    console.warn('MailerLite API key missing. Subscribers will not be added.');
    return true;
  }

  try {
    // Step 1: Add/update subscriber with custom fields
    const propertyUrl = data.sourcePage
      ? `https://newbuildhomescostablanca.com${data.sourcePage}`
      : '';

    const subscriberResponse = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        email: data.email,
        fields: {
          name: data.name,
          phone: data.phone || '',
          // Custom fields for email personalization
          property_reference: data.propertyReference || '',
          property_url: propertyUrl,
          property_area: data.area || '',
          property_type: data.propertyType || '',
          budget_range: data.budgetRange || '',
          form_type: data.formType || '',
          source_page: data.sourcePage || '',
          development_name: data.developmentName || '',
        },
        status: 'active',
      }),
    });

    if (!subscriberResponse.ok) {
      const errorData = await subscriberResponse.json();
      console.error('MailerLite subscriber error:', errorData);
      return false;
    }

    const subscriberData = await subscriberResponse.json();
    const subscriberId = subscriberData.data?.id;

    if (!subscriberId) {
      console.error('MailerLite: No subscriber ID returned');
      return false;
    }

    // Step 2: Assign to groups
    const groupNames = getMailerLiteGroups(data);

    if (groupNames.length > 0) {
      // First, fetch all groups to get their IDs
      const groupsResponse = await fetch('https://connect.mailerlite.com/api/groups?limit=50', {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Accept': 'application/json',
        },
      });

      if (groupsResponse.ok) {
        const groupsData = await groupsResponse.json();
        const allGroups = groupsData.data || [];

        // Match group names to IDs and assign subscriber
        for (const groupName of groupNames) {
          const group = allGroups.find((g: any) => g.name === groupName);
          if (group) {
            await fetch(`https://connect.mailerlite.com/api/subscribers/${subscriberId}/groups/${group.id}`, {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
              },
            });
          }
        }
      }
    }

    console.log(`MailerLite: Added ${data.email} to groups: ${groupNames.join(', ')}`);
    return true;
  } catch (error) {
    console.error('Error pushing to MailerLite:', error);
    return false;
  }
}

// Map budget value to Airtable singleSelect options
function mapBudgetRange(budget: string): string | undefined {
  if (!budget) return undefined;
  // Extract numeric value from strings like "€293,000" or "250k-350k"
  const numStr = budget.replace(/[€$£,\s]/g, '');
  const num = parseInt(numStr);
  if (isNaN(num)) {
    // Already in the right format?
    const validOptions = ['Under 150k', '150k-250k', '250k-350k', '350k-500k', '500k+'];
    if (validOptions.includes(budget)) return budget;
    return undefined; // Skip if we can't map it
  }
  if (num < 150000) return 'Under 150k';
  if (num < 250000) return '150k-250k';
  if (num < 350000) return '250k-350k';
  if (num < 500000) return '350k-500k';
  return '500k+';
}

// Map form type to Airtable singleSelect options
function mapFormType(formType: string): string {
  const map: Record<string, string> = {
    'Property Inquiry': 'Property Inquiry',
    'Newsletter Signup': 'Newsletter Signup',
    'Consultation Request': 'Consultation Request',
    'General Contact': 'General Contact',
    'Development Inquiry': 'Development Inquiry',
    'Area Inquiry': 'Area Inquiry',
    'Guide Download': 'Guide Download',
    'Property Alert': 'Property Alert',
  };
  return map[formType] || 'General Contact';
}

// Map property type to Airtable singleSelect options
function mapPropertyType(propType: string): string | undefined {
  if (!propType) return undefined;
  const validOptions = ['Apartment', 'Villa', 'Townhouse', 'Bungalow', 'Penthouse', 'Duplex', 'Other'];
  // Try exact match first
  const exact = validOptions.find(o => o.toLowerCase() === propType.toLowerCase());
  if (exact) return exact;
  // Try partial match
  const partial = validOptions.find(o => propType.toLowerCase().includes(o.toLowerCase()));
  if (partial) return partial;
  return 'Other';
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
              // singleSelect fields — mapped to match exact Airtable option names
              ...(data.area ? { 'Area': data.area } : {}),
              ...(mapPropertyType(data.propertyType || '') ? { 'Property Type': mapPropertyType(data.propertyType || '') } : {}),
              ...(mapBudgetRange(data.budgetRange || '') ? { 'Budget Range': mapBudgetRange(data.budgetRange || '') } : {}),
              ...(data.developmentName ? { 'Development Name': data.developmentName } : {}),
              'Form Type': mapFormType(data.formType || 'General Contact'),
              // Source Page as full URL
              ...(data.sourcePage ? { 'Source Page': `https://newbuildhomescostablanca.com${data.sourcePage}` } : {}),
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
      propertyReference: body.propertyReference?.trim() || undefined,
    };

    // Push to Airtable and MailerLite in parallel
    const [airtableSuccess, mailerliteSuccess] = await Promise.all([
      pushToAirtable(leadData),
      pushToMailerLite(leadData),
    ]);

    // Log the lead
    console.log('Lead received:', { ...leadData, airtableSuccess, mailerliteSuccess });

    // Always return success to the client (graceful degradation)
    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for your inquiry. We will be in touch soon.',
        airtableSuccess,
        mailerliteSuccess,
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
