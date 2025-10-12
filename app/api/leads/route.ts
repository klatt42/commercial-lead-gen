import { NextRequest, NextResponse } from 'next/server'
import { submitLead, type Lead } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.business_name || !body.contact_name || !body.phone || !body.property_address) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Submit lead (this will trigger GHL sync on server-side)
    const result = await submitLead(body as Lead)

    if (result.success) {
      return NextResponse.json({ success: true, data: result.data })
    } else {
      console.error('Failed to submit lead:', result.error)
      return NextResponse.json(
        { success: false, error: 'Failed to save lead' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
