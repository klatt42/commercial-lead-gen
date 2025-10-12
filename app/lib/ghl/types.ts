/**
 * GoHighLevel API Type Definitions
 */

export interface GHLContact {
  id: string;
  locationId: string;
  firstName: string;
  lastName?: string;
  email?: string;
  phone?: string;
  companyName?: string;
  address1?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  source?: string;
  tags?: string[];
  customFields?: Record<string, string>;
}

export interface CreateContactRequest {
  locationId: string;
  firstName: string;
  lastName?: string;
  email?: string;
  phone?: string;
  companyName?: string;
  address1?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  source?: string;
  tags?: string[];
  customField?: Record<string, string>;
}

export interface GHLOpportunity {
  id: string;
  locationId: string;
  contactId: string;
  pipelineId: string;
  pipelineStageId: string;
  name: string;
  monetaryValue?: number;
  status: 'open' | 'won' | 'lost' | 'abandoned';
  source?: string;
}

export interface CreateOpportunityRequest {
  locationId: string;
  contactId: string;
  pipelineId: string;
  pipelineStageId: string;
  name: string;
  monetaryValue?: number;
  status?: 'open' | 'won' | 'lost' | 'abandoned';
  source?: string;
}

export interface GHLApiError {
  message: string;
  statusCode: number;
  details?: any;
}

export interface GHLApiResponse<T> {
  success: boolean;
  data?: T;
  error?: GHLApiError;
}
