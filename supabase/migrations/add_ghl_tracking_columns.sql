-- Add GoHighLevel tracking columns to leads table
-- Run this in your Supabase SQL Editor

ALTER TABLE leads
ADD COLUMN IF NOT EXISTS lead_tier VARCHAR(20),
ADD COLUMN IF NOT EXISTS lead_score INTEGER,
ADD COLUMN IF NOT EXISTS estimated_cost_low INTEGER,
ADD COLUMN IF NOT EXISTS estimated_cost_high INTEGER,
ADD COLUMN IF NOT EXISTS ghl_contact_id VARCHAR(255),
ADD COLUMN IF NOT EXISTS ghl_opportunity_id VARCHAR(255),
ADD COLUMN IF NOT EXISTS ghl_sync_status VARCHAR(20) DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS ghl_sync_error TEXT;

-- Add indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_leads_ghl_contact_id ON leads(ghl_contact_id);
CREATE INDEX IF NOT EXISTS idx_leads_ghl_opportunity_id ON leads(ghl_opportunity_id);
CREATE INDEX IF NOT EXISTS idx_leads_ghl_sync_status ON leads(ghl_sync_status);
CREATE INDEX IF NOT EXISTS idx_leads_lead_tier ON leads(lead_tier);

-- Add comments for documentation
COMMENT ON COLUMN leads.lead_tier IS 'Lead tier: platinum, gold, silver, or bronze';
COMMENT ON COLUMN leads.lead_score IS 'Calculated lead score 0-100';
COMMENT ON COLUMN leads.estimated_cost_low IS 'Lower bound of cost estimate in cents';
COMMENT ON COLUMN leads.estimated_cost_high IS 'Upper bound of cost estimate in cents';
COMMENT ON COLUMN leads.ghl_contact_id IS 'GoHighLevel contact ID';
COMMENT ON COLUMN leads.ghl_opportunity_id IS 'GoHighLevel opportunity ID';
COMMENT ON COLUMN leads.ghl_sync_status IS 'GHL sync status: pending, synced, failed';
COMMENT ON COLUMN leads.ghl_sync_error IS 'Error message if GHL sync failed';
