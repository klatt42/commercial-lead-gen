/**
 * GoHighLevel Opportunities API
 * Create and manage opportunities in GHL pipelines
 */

import { ghlApiRequest, getLocationId, logGHLEvent } from './client';
import { CreateOpportunityRequest, GHLOpportunity, GHLApiResponse } from './types';

const GHL_PIPELINE_ID = process.env.GHL_PIPELINE_ID;
const GHL_STAGE_NEW_CLIENT = process.env.GHL_STAGE_NEW_CLIENT;

if (!GHL_PIPELINE_ID) {
  console.warn('⚠️  GHL_PIPELINE_ID not found in environment variables');
}

if (!GHL_STAGE_NEW_CLIENT) {
  console.warn('⚠️  GHL_STAGE_NEW_CLIENT not found in environment variables');
}

/**
 * Create a new opportunity in GoHighLevel
 */
export async function createGHLOpportunity(
  opportunityData: Omit<CreateOpportunityRequest, 'locationId' | 'pipelineId' | 'pipelineStageId'>
): Promise<GHLApiResponse<{ opportunity: GHLOpportunity }>> {
  try {
    if (!GHL_PIPELINE_ID || !GHL_STAGE_NEW_CLIENT) {
      return {
        success: false,
        error: {
          message: 'Pipeline configuration missing. Set GHL_PIPELINE_ID and GHL_STAGE_NEW_CLIENT',
          statusCode: 500,
        },
      };
    }

    const locationId = getLocationId();

    const payload: CreateOpportunityRequest = {
      locationId,
      pipelineId: GHL_PIPELINE_ID,
      pipelineStageId: GHL_STAGE_NEW_CLIENT, // Always start at "New Client" stage
      status: 'open',
      ...opportunityData,
    };

    // Log the attempt
    logGHLEvent('createOpportunity:start', {
      name: opportunityData.name,
      contactId: opportunityData.contactId,
      value: opportunityData.monetaryValue
    }, true);

    const response = await ghlApiRequest<{ opportunity: GHLOpportunity }>(
      '/opportunities/',
      {
        method: 'POST',
        body: JSON.stringify(payload),
      }
    );

    if (response.success && response.data) {
      logGHLEvent('createOpportunity:success', {
        opportunityId: response.data.opportunity.id
      }, true);
    } else {
      logGHLEvent('createOpportunity:error', response.error, false);
    }

    return response;

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    logGHLEvent('createOpportunity:exception', errorMessage, false);

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
 * Map lead data to GHL opportunity format
 */
export function mapLeadToOpportunity(
  lead: any,
  contactId: string
): Omit<CreateOpportunityRequest, 'locationId' | 'pipelineId' | 'pipelineStageId'> {
  // Generate opportunity name
  const damageType = lead.damage_type?.[0] || 'damage';
  const propertyType = lead.property_type || 'property';
  const businessName = lead.business_name || lead.contact_name || 'Commercial Property';

  const opportunityName = `${damageType.charAt(0).toUpperCase() + damageType.slice(1)} Restoration - ${businessName}`;

  // Calculate monetary value (use midpoint of estimate)
  let monetaryValue = 0;
  if (lead.estimated_cost_low && lead.estimated_cost_high) {
    monetaryValue = Math.round((lead.estimated_cost_low + lead.estimated_cost_high) / 2);
  }

  return {
    contactId,
    name: opportunityName,
    monetaryValue,
    source: 'AI Damage Assessment Chat',
    status: 'open',
  };
}
