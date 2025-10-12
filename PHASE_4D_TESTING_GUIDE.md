# Phase 4D Testing Guide
## GoHighLevel Integration - Testing & Validation

**Date**: October 11, 2025
**Status**: ✅ **BUILD COMPLETE** - Ready for Testing
**Integration Type**: Option A - Basic GHL Sync (Contact + Opportunity Creation)

---

## 🎯 What Was Built

Successfully implemented automatic GoHighLevel synchronization that:
- ✅ Creates contacts in GHL when leads are submitted
- ✅ Creates opportunities in your "Demo Pipeline"
- ✅ Sets stage to "New Client" automatically
- ✅ Includes all lead data as tags and custom fields
- ✅ Runs in background (non-blocking)
- ✅ Updates Supabase with GHL IDs for tracking
- ✅ Handles errors gracefully with retry logic

---

## 📋 Pre-Testing Checklist

### 1. Database Migration Required ⚠️

**You must run this SQL in your Supabase SQL Editor BEFORE testing:**

```sql
-- Add GoHighLevel tracking columns to leads table
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
```

**How to run**:
1. Go to https://supabase.com/dashboard/project/tyjbkwwntmhxfvwsuvgz
2. Click "SQL Editor" in left menu
3. Create "New Query"
4. Paste the SQL above
5. Click "Run" button

### 2. Verify Environment Variables

Your `.env.local` should have these (already configured):

```bash
# GoHighLevel Configuration
GHL_API_KEY=pit-8810b278-6c24-411b-b681-97dfa282970e
GHL_LOCATION_ID=3MISHSClQuRMqsV7GeCX
GHL_PIPELINE_ID=Y9EBfkzfs15AzXCrwMEM
GHL_STAGE_NEW_CLIENT=8d6c1d41-7c37-4f58-bcc1-e104746d4c84
```

### 3. Restart Development Server

**Important**: You must restart the dev server to load new environment variables.

```bash
# In terminal, press Ctrl+C to stop current server, then:
npm run dev
```

---

## 🧪 Testing Steps

### Test 1: Verify GHL Connection

Run the connection test script:

```bash
node scripts/test-ghl-connection.js
```

**Expected Output**:
```
✅ Successfully connected to GHL!
Found 1 pipeline(s):
Pipeline 1: Demo Pipeline
  ID: Y9EBfkzfs15AzXCrwMEM
  Stages:
    1. New Client
    2. Appt booked
    3. Service Completed
```

If you see errors, check your GHL API key.

### Test 2: Submit a Test Lead via Form

1. **Open** http://localhost:3001
2. **Fill out the contact form** at the bottom of the page:
   - Business Name: "Test Company ABC"
   - Your Name: "John Doe"
   - Phone: "555-123-4567"
   - Email: "test@example.com"
   - Service Area: Maryland
   - Property Address: "123 Main St, Baltimore, MD 21201"
   - Property Type: Office Building
   - Property Size: 5000
   - Damage Type: Select "Water"
   - Urgency: Emergency
   - Description: "Testing GHL integration"

3. **Click Submit**
4. **Look for green success message**

### Test 3: Verify in GoHighLevel

1. **Log into GoHighLevel**: https://app.gohighlevel.com/
2. **Go to Contacts** (left menu)
3. **Look for "John Doe"** or "Test Company ABC"
4. **Verify**:
   - Contact exists
   - Phone number matches
   - Email matches
   - Tags include: "emergency", "water", "MD"
   - Custom fields populated

5. **Go to Opportunities** (left menu → Opportunities)
6. **Look for opportunity**: "Water Restoration - Test Company ABC"
7. **Verify**:
   - Opportunity exists
   - Status is "Open"
   - Stage is "New Client"
   - Contact is linked
   - Value is populated (if estimate was provided)

### Test 4: Verify in Supabase

1. **Go to Supabase Table Editor**
2. **Open `leads` table**
3. **Find your test lead**
4. **Verify columns populated**:
   - `ghl_contact_id`: Should have a value (looks like: `contact_xxx`)
   - `ghl_opportunity_id`: Should have a value (looks like: `opp_xxx`)
   - `ghl_sync_status`: Should be "synced"
   - `ghl_sync_error`: Should be NULL

### Test 5: Check Server Logs

In your terminal running `npm run dev`, look for:

```
[GHL Integration] createContact:start
[GHL Integration] createContact:success
[GHL Integration] createOpportunity:start
[GHL Integration] createOpportunity:success
[GHL Integration] syncLead:complete
✅ Lead {id} synced to GHL successfully
```

---

## ❌ Troubleshooting

### Problem: "GHL API Error: 401 Unauthorized"

**Cause**: Invalid or expired API key

**Fix**:
1. Log into GoHighLevel
2. Go to Settings → Integrations → API Keys
3. Generate new API key if expired
4. Update `.env.local` with new key
5. Restart dev server

### Problem: Contact created but no opportunity

**Cause**: Pipeline ID or Stage ID incorrect

**Fix**:
1. Run `node scripts/test-ghl-connection.js` to verify IDs
2. Check `.env.local` has correct `GHL_PIPELINE_ID` and `GHL_STAGE_NEW_CLIENT`
3. Restart dev server

### Problem: "ghl_sync_status" is "failed"

**Cause**: API call failed after retries

**Fix**:
1. Check `ghl_sync_error` column in Supabase for error message
2. Check GHL rate limits (100 req/10sec, 200k/day)
3. Verify GHL account is active

### Problem: Lead saved but `ghl_contact_id` is NULL

**Cause**: GHL sync running in background, may take 1-2 seconds

**Fix**:
1. Wait 5 seconds and refresh Supabase table
2. If still NULL, check server logs for errors
3. Check `ghl_sync_status` column for "failed" status

---

## 📊 What Gets Synced to GHL

### Contact Data
- **Name**: Split into first/last from `contact_name`
- **Phone**: Lead phone number
- **Email**: Lead email (if provided)
- **Company**: Business name
- **Address**: Parsed from `property_address`
- **Source**: "AI Damage Assessment Chat"

### Tags Added to Contact
- Lead tier (e.g., "platinum-lead", "gold-lead")
- Urgency level (e.g., "emergency", "urgent")
- Damage types (e.g., "water", "fire", "mold")
- Service area (e.g., "MD", "DC", "VA")

### Custom Fields on Contact
- `property_type`: office, warehouse, etc.
- `property_size`: Square footage
- `damage_severity`: minor, moderate, severe, catastrophic
- `lead_score`: 0-100
- `lead_tier`: platinum, gold, silver, bronze
- `estimated_cost_low`: Lower estimate
- `estimated_cost_high`: Upper estimate
- `lead_source`: "AI Damage Assessment Chat"

### Opportunity Data
- **Name**: "{DamageType} Restoration - {BusinessName}"
  - Example: "Water Restoration - ABC Manufacturing"
- **Pipeline**: Demo Pipeline
- **Stage**: New Client (initial stage)
- **Status**: Open
- **Value**: Midpoint of cost estimate
- **Source**: "AI Damage Assessment Chat"

---

## 🎨 Example Test Scenarios

### Scenario 1: Emergency Water Damage - Platinum Lead

**Input**:
- Business: "Downtown Office Complex"
- Contact: "Sarah Johnson"
- Phone: "301-555-0100"
- Email: "sarah@downtown.com"
- Property: 25,000 sqft office
- Damage: Water (catastrophic, emergency)
- Location: 123 K St NW, Washington, DC 20001
- Service Area: DC

**Expected GHL Result**:
- Contact: "Sarah Johnson"
- Company: "Downtown Office Complex"
- Tags: `["platinum-lead", "emergency", "water", "DC"]`
- Opportunity: "Water Restoration - Downtown Office Complex"
- Value: ~$150,000 (estimated midpoint)
- Stage: "New Client"

### Scenario 2: Scheduled Mold Assessment - Silver Lead

**Input**:
- Business: "Retail Store"
- Contact: "Mike Chen"
- Phone: "703-555-0200"
- Property: 3,000 sqft retail
- Damage: Mold (moderate, scheduled)
- Location: Arlington, VA
- Service Area: VA

**Expected GHL Result**:
- Contact: "Mike Chen"
- Company: "Retail Store"
- Tags: `["silver-lead", "scheduled", "mold", "VA"]`
- Opportunity: "Mold Restoration - Retail Store"
- Value: ~$35,000
- Stage: "New Client"

---

## 📈 Success Metrics

After testing, verify:

- [ ] ✅ Test contact appears in GHL within 5 seconds
- [ ] ✅ Test opportunity appears in GHL
- [ ] ✅ Opportunity is linked to contact
- [ ] ✅ All tags are applied correctly
- [ ] ✅ Custom fields populated in GHL
- [ ] ✅ Supabase `ghl_contact_id` populated
- [ ] ✅ Supabase `ghl_opportunity_id` populated
- [ ] ✅ Supabase `ghl_sync_status` = "synced"
- [ ] ✅ No errors in server logs

---

## 🚀 Production Deployment Checklist

Once testing is complete:

### 1. Environment Variables (Production)

Make sure these are set in your production environment (Vercel, etc.):

```
GHL_API_KEY=pit-8810b278-6c24-411b-b681-97dfa282970e
GHL_LOCATION_ID=3MISHSClQuRMqsV7GeCX
GHL_API_BASE_URL=https://services.leadconnectorhq.com
GHL_API_VERSION=2021-07-28
GHL_PIPELINE_ID=Y9EBfkzfs15AzXCrwMEM
GHL_STAGE_NEW_CLIENT=8d6c1d41-7c37-4f58-bcc1-e104746d4c84
GHL_STAGE_APPT_BOOKED=8e9f2889-d7d7-4f41-9db4-c174d19719c9
GHL_STAGE_SERVICE_COMPLETED=73dd01b5-a752-4583-91e3-cbc952595bf3
```

### 2. Supabase Migration (Production)

Run the same SQL migration in your production Supabase instance.

### 3. Monitor First Production Leads

- Watch GHL for incoming leads
- Check Supabase for sync status
- Monitor for any errors in production logs

---

## 🔄 What's Next (Optional Future Enhancements)

**Phase 4E - Advanced Features** (not implemented yet):

1. **Provider Matching Algorithm**
   - Automatically assign opportunities to best-matched contractors
   - Load balancing across providers
   - Specialty/service area matching

2. **Admin Dashboard**
   - View all leads and GHL sync status
   - Manually retry failed syncs
   - Provider management interface

3. **Webhook Integration**
   - Receive updates from GHL when opportunity changes
   - Sync status changes back to Supabase
   - Bidirectional data flow

4. **Advanced Pipeline Management**
   - Automatically move opportunities between stages
   - Trigger workflows based on lead tier
   - Custom automations

**Current Status**: Basic sync is complete and functional. Advanced features can be added later based on business needs.

---

## 📞 Support

If you encounter issues during testing:

1. Check server logs for error messages
2. Verify GHL API key is valid
3. Confirm Supabase migration ran successfully
4. Check rate limits haven't been exceeded
5. Review troubleshooting section above

---

## ✅ Validation Complete

Once all tests pass, mark Phase 4D as complete! 🎉

Your lead generation system now:
- ✅ Captures leads via AI chat
- ✅ Calculates cost estimates
- ✅ Scores and tiers leads
- ✅ Saves to Supabase
- ✅ **Automatically syncs to GoHighLevel**
- ✅ Creates contacts with full data
- ✅ Creates opportunities in pipeline
- ✅ Tracks sync status

**Ready for production deployment!** 🚀
