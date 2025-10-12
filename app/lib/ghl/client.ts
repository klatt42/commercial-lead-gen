/**
 * GoHighLevel API Client
 * Handles authentication, rate limiting, and retry logic
 */

import { GHLApiError, GHLApiResponse } from './types';

const GHL_API_BASE_URL = process.env.GHL_API_BASE_URL || 'https://services.leadconnectorhq.com';
const GHL_API_VERSION = process.env.GHL_API_VERSION || '2021-07-28';
const GHL_API_KEY = process.env.GHL_API_KEY;
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID;

if (!GHL_API_KEY) {
  console.warn('⚠️  GHL_API_KEY not found in environment variables');
}

if (!GHL_LOCATION_ID) {
  console.warn('⚠️  GHL_LOCATION_ID not found in environment variables');
}

/**
 * Make an authenticated request to the GHL API with retry logic
 */
export async function ghlApiRequest<T>(
  endpoint: string,
  options: RequestInit = {},
  retries = 3
): Promise<GHLApiResponse<T>> {
  if (!GHL_API_KEY) {
    return {
      success: false,
      error: {
        message: 'GHL API key not configured',
        statusCode: 500,
      },
    };
  }

  const url = `${GHL_API_BASE_URL}${endpoint}`;

  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Authorization': `Bearer ${GHL_API_KEY}`,
          'Content-Type': 'application/json',
          'Version': GHL_API_VERSION,
          ...options.headers,
        },
      });

      // Handle rate limiting with exponential backoff
      if (response.status === 429) {
        const delay = Math.pow(2, attempt) * 1000; // 1s, 2s, 4s
        console.warn(`Rate limited by GHL API. Retrying in ${delay}ms (attempt ${attempt + 1}/${retries})`);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }

      // Parse response
      const responseData = await response.json().catch(() => ({}));

      if (!response.ok) {
        return {
          success: false,
          error: {
            message: responseData.message || `GHL API error: ${response.statusText}`,
            statusCode: response.status,
            details: responseData,
          },
        };
      }

      return {
        success: true,
        data: responseData as T,
      };

    } catch (error) {
      // Network error or other exception
      if (attempt === retries - 1) {
        return {
          success: false,
          error: {
            message: error instanceof Error ? error.message : 'Unknown error',
            statusCode: 500,
            details: error,
          },
        };
      }

      // Wait before retrying
      const delay = Math.pow(2, attempt) * 1000;
      console.warn(`GHL API request failed. Retrying in ${delay}ms (attempt ${attempt + 1}/${retries})`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  return {
    success: false,
    error: {
      message: 'Max retries exceeded',
      statusCode: 500,
    },
  };
}

/**
 * Get the configured location ID
 */
export function getLocationId(): string {
  if (!GHL_LOCATION_ID) {
    throw new Error('GHL_LOCATION_ID not configured in environment variables');
  }
  return GHL_LOCATION_ID;
}

/**
 * Log GHL integration events for debugging
 */
export function logGHLEvent(event: string, data: any, success: boolean) {
  const timestamp = new Date().toISOString();
  console.log(`[GHL Integration] ${timestamp} - ${event}`, {
    success,
    data: success ? '✅ Success' : data,
  });
}
