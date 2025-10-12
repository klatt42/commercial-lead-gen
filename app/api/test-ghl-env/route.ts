import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    GHL_API_KEY: process.env.GHL_API_KEY ? '✅ Set (length: ' + process.env.GHL_API_KEY.length + ')' : '❌ Not set',
    GHL_LOCATION_ID: process.env.GHL_LOCATION_ID ? '✅ Set (' + process.env.GHL_LOCATION_ID + ')' : '❌ Not set',
    GHL_PIPELINE_ID: process.env.GHL_PIPELINE_ID ? '✅ Set (' + process.env.GHL_PIPELINE_ID + ')' : '❌ Not set',
    GHL_STAGE_NEW_CLIENT: process.env.GHL_STAGE_NEW_CLIENT ? '✅ Set (' + process.env.GHL_STAGE_NEW_CLIENT + ')' : '❌ Not set',
    GHL_API_BASE_URL: process.env.GHL_API_BASE_URL || 'https://services.leadconnectorhq.com (default)',
  })
}
