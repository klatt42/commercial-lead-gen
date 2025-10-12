/**
 * GoHighLevel Contacts API
 * Create and manage contacts in GHL
 */

import { ghlApiRequest, getLocationId, logGHLEvent } from './client';
import { CreateContactRequest, GHLContact, GHLApiResponse } from './types';

/**
 * Create a new contact in GoHighLevel
 */
export async function createGHLContact(
  contactData: Omit<CreateContactRequest, 'locationId'>
): Promise<GHLApiResponse<{ contact: GHLContact }>> {
  try {
    const locationId = getLocationId();

    const payload: CreateContactRequest = {
      locationId,
      ...contactData,
    };

    // Log the attempt
    logGHLEvent('createContact:start', {
      name: `${contactData.firstName} ${contactData.lastName}`,
      phone: contactData.phone
    }, true);

    const response = await ghlApiRequest<{ contact: GHLContact }>(
      '/contacts/',
      {
        method: 'POST',
        body: JSON.stringify(payload),
      }
    );

    if (response.success && response.data) {
      logGHLEvent('createContact:success', {
        contactId: response.data.contact.id
      }, true);
    } else {
      logGHLEvent('createContact:error', response.error, false);
    }

    return response;

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    logGHLEvent('createContact:exception', errorMessage, false);

    return {
      success: false,
      error: {
        message: errorMessage,
        statusCode: 500,
        details: error,
      },
    };
  }
}

/**
 * Map lead data to GHL contact format
 */
export function mapLeadToContact(lead: any): Omit<CreateContactRequest, 'locationId'> {
  // Parse name into first and last
  const nameParts = (lead.contact_name || '').trim().split(' ');
  const firstName = nameParts[0] || 'Unknown';
  const lastName = nameParts.slice(1).join(' ') || '';

  // Parse address
  const addressParts = (lead.property_address || '').split(',').map((p: string) => p.trim());
  const address1 = addressParts[0] || '';
  const city = addressParts[1] || '';
  const stateZip = addressParts[2] || '';
  const state = stateZip.split(' ')[0] || lead.service_area || '';
  const postalCode = stateZip.split(' ').slice(1).join(' ') || '';

  // Generate tags based on lead attributes
  // Include key info in tags since custom fields aren't supported in this API version
  const tags: string[] = [
    `${lead.lead_tier || 'bronze'}-lead`,  // platinum-lead, gold-lead, etc.
    `${lead.urgency_level || 'assessment'}`,  // emergency, urgent, scheduled, assessment
    ...(lead.damage_type || []),  // water, fire, mold, storm, etc.
    lead.service_area || 'unknown-area',  // MD, DC, VA
    `property:${lead.property_type || 'unknown'}`,  // property type as tag
    `size:${Math.floor((lead.property_size || 0) / 1000)}k`,  // size in thousands
  ].filter(Boolean);

  return {
    firstName,
    lastName,
    email: lead.email || undefined,
    phone: lead.phone || '',
    companyName: lead.business_name || undefined,
    address1,
    city,
    state,
    postalCode,
    country: 'US',
    source: 'AI Damage Assessment Chat',
    tags,
    // Note: customField not supported in GHL API v2021-07-28
    // All important data is captured in tags and will be in opportunity notes
  };
}
