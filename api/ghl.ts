export interface GHLContact {
  firstName?: string;
  lastName?: string;
  name?: string;
  email: string;
  phone?: string;
  tags?: string[];
  source?: string;
  customFields?: Record<string, any>;
}

export interface GHLResponse {
  contact?: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
  };
  message?: string;
  error?: string;
}

export async function createGHLContact(data: GHLContact): Promise<GHLResponse> {
  const apiKey = process.env.GHL_API_KEY;
  const locationId = process.env.GHL_LOCATION_ID;

  if (!apiKey || !locationId) {
    throw new Error('GHL API credentials not configured');
  }

  // Format phone number (remove non-digits and add +1 if not present)
  let formattedPhone = data.phone?.replace(/\D/g, '') || '';
  if (formattedPhone && !formattedPhone.startsWith('1')) {
    formattedPhone = '1' + formattedPhone;
  }
  if (formattedPhone) {
    formattedPhone = '+' + formattedPhone;
  }

  // Split name into first/last if needed
  let firstName = data.firstName;
  let lastName = data.lastName;
  
  if (data.name && !firstName) {
    const nameParts = data.name.trim().split(' ');
    firstName = nameParts[0];
    lastName = nameParts.slice(1).join(' ') || '';
  }

  const payload: any = {
    email: data.email,
    locationId: locationId,
  };

  // Only add optional fields if they exist
  if (firstName) payload.firstName = firstName;
  if (lastName) payload.lastName = lastName;
  if (formattedPhone) payload.phone = formattedPhone;
  if (data.tags && data.tags.length > 0) payload.tags = data.tags;
  if (data.source) payload.source = data.source;

  try {
    const response = await fetch('https://services.leadconnectorhq.com/contacts/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Version': '2021-07-28',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `GHL API error: ${response.status}`);
    }

    const result = await response.json();
    return { contact: result.contact, message: 'Contact created successfully' };
  } catch (error: any) {
    console.error('GHL API Error:', error);
    throw new Error(error.message || 'Failed to create contact in GHL');
  }
}

