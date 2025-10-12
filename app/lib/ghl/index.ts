/**
 * GoHighLevel Integration Module
 * Main entry point for GHL API functionality
 */

export * from './types';
export * from './client';
export * from './contacts';
export * from './opportunities';

import { createGHLContact, mapLeadToContact } from './contacts';
import { createGHLOpportunity, mapLeadToOpportunity } from './opportunities';
import { logGHLEvent } from './client';

/**
 * Sync a lead to GoHighLevel (create contact + opportunity)
 * This is the main function called after a lead is submitted
 */
export async function syncLeadToGHL(lead: any) {
  try {
    logGHLEvent('syncLead:start', { leadId: lead.id }, true);

    // Step 1: Create contact in GHL
    const contactData = mapLeadToContact(lead);
    const contactResponse = await createGHLContact(contactData);

    if (!contactResponse.success || !contactResponse.data) {
      logGHLEvent('syncLead:contactFailed', contactResponse.error, false);
      return {
        success: false,
        error: `Failed to create contact: ${contactResponse.error?.message}`,
        ghlContactId: null,
        ghlOpportunityId: null,
      };
    }

    const ghlContactId = contactResponse.data.contact.id;
    logGHLEvent('syncLead:contactCreated', { ghlContactId }, true);

    // Step 2: Create opportunity in GHL
    const opportunityData = mapLeadToOpportunity(lead, ghlContactId);
    const opportunityResponse = await createGHLOpportunity(opportunityData);

    if (!opportunityResponse.success || !opportunityResponse.data) {
      logGHLEvent('syncLead:opportunityFailed', opportunityResponse.error, false);
      // Contact was created, but opportunity failed
      return {
        success: false,
        error: `Contact created but opportunity failed: ${opportunityResponse.error?.message}`,
        ghlContactId,
        ghlOpportunityId: null,
      };
    }

    const ghlOpportunityId = opportunityResponse.data.opportunity.id;
    logGHLEvent('syncLead:complete', {
      ghlContactId,
      ghlOpportunityId
    }, true);

    return {
      success: true,
      ghlContactId,
      ghlOpportunityId,
    };

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    logGHLEvent('syncLead:exception', errorMessage, false);

    return {
      success: false,
      error: errorMessage,
      ghlContactId: null,
      ghlOpportunityId: null,
    };
  }
}
