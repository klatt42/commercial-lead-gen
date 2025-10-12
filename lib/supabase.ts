import { createClient } from '@supabase/supabase-js'
import { syncLeadToGHL } from '@/app/lib/ghl'

// Supabase client configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

const isConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!isConfigured && typeof window !== 'undefined') {
  console.warn('Supabase credentials not configured. Using placeholder values for build.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for database tables
export interface Lead {
  id?: string
  created_at?: string
  business_name: string
  contact_name: string
  phone: string
  email?: string
  property_address: string
  property_type: 'office' | 'warehouse' | 'manufacturing' | 'retail' | 'healthcare' | 'educational' | 'other'
  property_size: number
  damage_type: string[]
  damage_description?: string
  urgency_level: 'emergency' | 'urgent' | 'standard' | 'non-urgent'
  service_area: 'MD' | 'DC' | 'VA'
  zip_code?: string
  insurance_carrier?: string
  policy_number?: string
  lead_source?: string
  status?: string
  lead_tier?: string
  lead_score?: number
  estimated_cost_low?: number
  estimated_cost_high?: number
  ghl_contact_id?: string
  ghl_opportunity_id?: string
  ghl_sync_status?: string
  ghl_sync_error?: string
}

export interface Testimonial {
  id?: string
  created_at?: string
  customer_name: string
  location: string
  service_type: string
  property_type?: string
  quote: string
  rating: number
  display_order?: number
  active?: boolean
}

// Lead submission function with GHL integration
export async function submitLead(lead: Lead) {
  try {
    // Step 1: Save lead to Supabase
    const { data, error } = await supabase
      .from('leads')
      .insert([lead])
      .select()

    if (error) throw error

    if (!data || data.length === 0) {
      throw new Error('No data returned from Supabase insert')
    }

    const savedLead = data[0]

    // Step 2: Sync to GoHighLevel (non-blocking)
    // Run in background to avoid delaying response to user
    syncLeadToGHL(savedLead)
      .then(async (ghlResult) => {
        if (ghlResult.success) {
          // Update Supabase record with GHL IDs
          await supabase
            .from('leads')
            .update({
              ghl_contact_id: ghlResult.ghlContactId,
              ghl_opportunity_id: ghlResult.ghlOpportunityId,
              ghl_sync_status: 'synced',
            })
            .eq('id', savedLead.id)

          console.log(`✅ Lead ${savedLead.id} synced to GHL successfully`)
        } else {
          // Update Supabase record with error
          await supabase
            .from('leads')
            .update({
              ghl_sync_status: 'failed',
              ghl_sync_error: ghlResult.error,
            })
            .eq('id', savedLead.id)

          console.error(`❌ Failed to sync lead ${savedLead.id} to GHL:`, ghlResult.error)
        }
      })
      .catch((error) => {
        console.error('Error in GHL sync:', error)
      })

    return { success: true, data }
  } catch (error) {
    console.error('Error submitting lead:', error)
    return { success: false, error }
  }
}

// Fetch testimonials
export async function getTestimonials() {
  try {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('active', true)
      .order('display_order', { ascending: true })
      .limit(6)

    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return { success: false, data: [] }
  }
}
