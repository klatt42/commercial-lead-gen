# Phase 4D Scout Report
## GoHighLevel CRM Integration & Provider Matching System

**Date**: 2025-10-11
**Status**: 🔍 **RESEARCH COMPLETE**
**Next Phase**: Planning & Architecture Design

---

## 🎯 Executive Summary

This report details technical requirements for integrating the commercial restoration lead generation system with GoHighLevel CRM and implementing an intelligent provider matching algorithm to route leads to appropriate restoration contractors.

**Key Findings**:
- ✅ GHL V2 API fully documented and production-ready
- ✅ OAuth 2.0 authentication required with Bearer tokens
- ✅ Clear contact and opportunity creation endpoints identified
- ✅ Rate limits defined: 100 req/10sec burst, 200k req/day
- ⚠️ LocationId and PipelineId must be pre-configured
- ⚠️ Provider database schema needs design
- ⚠️ Matching algorithm requires business logic

---

## 🔌 GoHighLevel API Integration

### 1. Authentication & Authorization

**Method**: OAuth 2.0 Bearer Token

**Required Headers**:
```javascript
{
  "Authorization": "Bearer YOUR_ACCESS_TOKEN",
  "Content-Type": "application/json",
  "Version": "2021-07-28"
}
```

**Token Storage**:
- Store in environment variables
- Secure with encryption
- Implement token refresh logic
- Handle expiration gracefully

**Environment Variables Needed**:
```bash
GHL_ACCESS_TOKEN=Bearer_xxx
GHL_LOCATION_ID=loc_xxx
GHL_PIPELINE_ID=pipeline_xxx
```

### 2. Create Contact Endpoint

**Endpoint**: `POST https://services.leadconnectorhq.com/contacts/`

**Required Fields**:
```typescript
interface CreateContactRequest {
  locationId: string;        // REQUIRED - Your GHL location ID
  firstName: string;         // REQUIRED
  lastName?: string;
  email?: string;
  phone: string;            // REQUIRED
  source?: string;          // e.g., "AI Damage Assessment Chat"
  tags?: string[];          // e.g., ["platinum-lead", "water-damage", "emergency"]
  customFields?: Record<string, any>;
  address1?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  companyName?: string;     // Business name for commercial leads
}
```

**Example Request**:
```typescript
const contactPayload = {
  locationId: process.env.GHL_LOCATION_ID,
  firstName: "John",
  lastName: "Smith",
  phone: "+13019005171",
  email: "john@example.com",
  companyName: "ABC Manufacturing Inc",
  source: "AI Damage Assessment Chat",
  tags: ["platinum-lead", "fire-damage", "emergency"],
  customFields: {
    propertyType: "manufacturing",
    squareFootage: "25000",
    estimatedCost: "$564000-$846000",
    leadScore: "96",
    leadTier: "platinum",
    damageType: "fire",
    severity: "catastrophic",
    urgency: "emergency",
    serviceArea: "MD"
  },
  address1: "123 Main St",
  city: "Baltimore",
  state: "MD",
  postalCode: "21201",
  country: "US"
};
```

**Response**:
```typescript
{
  "contact": {
    "id": "contact_xxx",
    "locationId": "loc_xxx",
    "firstName": "John",
    // ... other fields
  }
}
```

### 3. Create Opportunity Endpoint

**Endpoint**: `POST https://services.leadconnectorhq.com/opportunities/`

**Required Fields**:
```typescript
interface CreateOpportunityRequest {
  locationId: string;        // REQUIRED
  contactId: string;        // REQUIRED - From create contact response
  pipelineId: string;       // REQUIRED - Your restoration pipeline ID
  pipelineStageId: string;  // REQUIRED - Initial stage ID
  name: string;             // REQUIRED - e.g., "Fire Damage - ABC Manufacturing"
  monetaryValue: number;    // REQUIRED - Estimated job value
  assignedTo?: string;      // User ID of assigned contractor
  source?: string;          // Lead source
  status: string;           // "open" | "won" | "lost" | "abandoned"
}
```

**Example Request**:
```typescript
const opportunityPayload = {
  locationId: process.env.GHL_LOCATION_ID,
  contactId: createdContact.id,
  pipelineId: process.env.GHL_PIPELINE_ID,
  pipelineStageId: "stage_new_lead",  // First stage in pipeline
  name: "Catastrophic Fire Damage - ABC Manufacturing",
  monetaryValue: 705000,  // Midpoint of estimate
  assignedTo: matchedProvider.ghlUserId,  // From provider matching
  source: "AI Damage Assessment Chat",
  status: "open"
};
```

**Pipeline Stages** (Recommended):
```typescript
const PIPELINE_STAGES = {
  NEW_LEAD: "stage_new_lead",              // Initial contact
  ASSESSMENT_SCHEDULED: "stage_scheduled", // On-site scheduled
  QUOTE_SENT: "stage_quote_sent",          // Estimate provided
  NEGOTIATING: "stage_negotiating",        // Discussing terms
  CONTRACT_SIGNED: "stage_signed",         // Job confirmed
  IN_PROGRESS: "stage_in_progress",        // Restoration underway
  COMPLETED: "stage_completed",            // Job finished
  WON: "stage_won",                        // Payment received
  LOST: "stage_lost"                       // Did not win job
};
```

### 4. Rate Limits & Best Practices

**GHL V2 API Rate Limits**:
- **Burst Limit**: 100 requests per 10 seconds
- **Daily Limit**: 200,000 requests per day per app per location/company
- **Recommendation**: Implement exponential backoff retry logic

**Best Practices**:
```typescript
// Retry logic with exponential backoff
async function callGHLAPI(endpoint, payload, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.GHL_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
          'Version': '2021-07-28'
        },
        body: JSON.stringify(payload)
      });

      if (response.status === 429) {
        // Rate limited - exponential backoff
        const delay = Math.pow(2, i) * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }

      if (!response.ok) {
        throw new Error(`GHL API Error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      if (i === retries - 1) throw error;
    }
  }
}
```

---

## 🏢 Provider Matching System

### 1. Provider Database Schema

**Supabase Table: `restoration_providers`**

```sql
CREATE TABLE restoration_providers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Business Information
  business_name VARCHAR(255) NOT NULL,
  contact_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,

  -- Service Areas
  service_areas TEXT[] NOT NULL,  -- ['MD', 'DC', 'VA'] or specific counties
  primary_service_area VARCHAR(10),  -- 'MD', 'DC', or 'VA'

  -- Specialties
  specialties TEXT[] NOT NULL,  -- ['water', 'fire', 'mold', 'storm', 'industrial', 'environmental']
  certifications TEXT[],        -- ['IICRC', 'EPA', 'OSHA', 'etc']

  -- Capacity & Availability
  max_concurrent_jobs INTEGER DEFAULT 5,
  current_active_jobs INTEGER DEFAULT 0,
  accepts_emergency BOOLEAN DEFAULT true,
  available_24_7 BOOLEAN DEFAULT true,

  -- Property Type Preferences
  property_types TEXT[],  -- ['office', 'warehouse', 'manufacturing', 'retail', etc]
  min_job_size INTEGER,   -- Minimum square footage
  max_job_size INTEGER,   -- Maximum square footage

  -- Lead Tier Preferences
  accepts_platinum BOOLEAN DEFAULT true,
  accepts_gold BOOLEAN DEFAULT true,
  accepts_silver BOOLEAN DEFAULT true,
  accepts_bronze BOOLEAN DEFAULT false,

  -- Performance Metrics
  total_leads_received INTEGER DEFAULT 0,
  total_jobs_won INTEGER DEFAULT 0,
  average_response_time_minutes INTEGER,
  customer_rating DECIMAL(3,2),  -- 0.00 to 5.00

  -- GHL Integration
  ghl_user_id VARCHAR(255),  -- GHL user ID for assignment
  ghl_contact_id VARCHAR(255),

  -- Status
  status VARCHAR(20) DEFAULT 'active',  -- 'active', 'inactive', 'suspended'
  priority_score INTEGER DEFAULT 50  -- 0-100, higher = higher priority
);

-- Indexes for fast matching
CREATE INDEX idx_providers_service_areas ON restoration_providers USING GIN(service_areas);
CREATE INDEX idx_providers_specialties ON restoration_providers USING GIN(specialties);
CREATE INDEX idx_providers_status ON restoration_providers(status) WHERE status = 'active';
CREATE INDEX idx_providers_capacity ON restoration_providers(current_active_jobs, max_concurrent_jobs);
```

### 2. Provider Matching Algorithm

**Matching Criteria** (in priority order):

1. **Service Area Match** (Weight: 30%)
   - MUST match: Lead service area in provider's service_areas array
   - If no exact match, reject provider

2. **Specialty Match** (Weight: 25%)
   - MUST match: Lead damage type in provider's specialties array
   - If no match, reject provider

3. **Capacity Availability** (Weight: 20%)
   - Provider must have capacity: `current_active_jobs < max_concurrent_jobs`
   - Emergency leads: Provider must have `accepts_emergency = true`

4. **Property Size Match** (Weight: 10%)
   - Lead square footage must be between `min_job_size` and `max_job_size`

5. **Lead Tier Acceptance** (Weight: 10%)
   - Provider must accept the lead tier (platinum/gold/silver/bronze)

6. **Performance Score** (Weight: 5%)
   - Higher priority_score = higher preference
   - Based on: win rate, response time, customer ratings

**Matching Algorithm Implementation**:

```typescript
interface ProviderMatchCriteria {
  serviceArea: 'MD' | 'DC' | 'VA';
  damageType: string;
  propertySize: number;
  propertyType: string;
  leadTier: 'platinum' | 'gold' | 'silver' | 'bronze';
  urgency: 'emergency' | 'urgent' | 'scheduled' | 'assessment';
  estimatedValue: number;
}

interface ProviderScore {
  provider: RestorationProvider;
  score: number;
  matchReasons: string[];
}

async function matchProvider(criteria: ProviderMatchCriteria): Promise<ProviderScore | null> {
  // Step 1: Get all active providers
  const { data: providers } = await supabase
    .from('restoration_providers')
    .select('*')
    .eq('status', 'active');

  if (!providers || providers.length === 0) return null;

  // Step 2: Filter and score each provider
  const scoredProviders: ProviderScore[] = [];

  for (const provider of providers) {
    let score = 0;
    const reasons: string[] = [];

    // REQUIRED: Service Area Match (30%)
    if (!provider.service_areas.includes(criteria.serviceArea)) {
      continue; // Skip if service area doesn't match
    }
    score += 30;
    reasons.push(`Services ${criteria.serviceArea}`);

    // REQUIRED: Specialty Match (25%)
    if (!provider.specialties.includes(criteria.damageType)) {
      continue; // Skip if specialty doesn't match
    }
    score += 25;
    reasons.push(`Specializes in ${criteria.damageType}`);

    // REQUIRED: Capacity Check (20%)
    if (provider.current_active_jobs >= provider.max_concurrent_jobs) {
      continue; // Skip if at capacity
    }
    const capacityPercent = (provider.max_concurrent_jobs - provider.current_active_jobs) / provider.max_concurrent_jobs;
    score += capacityPercent * 20;
    reasons.push(`${provider.max_concurrent_jobs - provider.current_active_jobs} jobs available`);

    // REQUIRED: Emergency Availability
    if (criteria.urgency === 'emergency' && !provider.accepts_emergency) {
      continue; // Skip if can't handle emergency
    }
    if (criteria.urgency === 'emergency' && provider.accepts_emergency) {
      reasons.push('24/7 emergency service');
    }

    // Property Size Match (10%)
    if (criteria.propertySize >= provider.min_job_size &&
        criteria.propertySize <= provider.max_job_size) {
      score += 10;
      reasons.push(`Handles ${criteria.propertySize} sqft projects`);
    } else if (criteria.propertySize > provider.max_job_size) {
      score += 5; // Partial credit if larger than preferred
    } else {
      score += 2; // Small penalty if smaller than preferred
    }

    // Lead Tier Acceptance (10%)
    const acceptsTier = {
      platinum: provider.accepts_platinum,
      gold: provider.accepts_gold,
      silver: provider.accepts_silver,
      bronze: provider.accepts_bronze
    }[criteria.leadTier];

    if (!acceptsTier) {
      continue; // Skip if doesn't accept this tier
    }
    score += 10;
    reasons.push(`Accepts ${criteria.leadTier} tier leads`);

    // Performance Score (5%)
    const performanceScore = (provider.priority_score / 100) * 5;
    score += performanceScore;
    if (provider.customer_rating >= 4.5) {
      reasons.push(`${provider.customer_rating}⭐ rating`);
    }

    scoredProviders.push({
      provider,
      score,
      matchReasons: reasons
    });
  }

  // Step 3: Sort by score (highest first)
  scoredProviders.sort((a, b) => b.score - a.score);

  // Step 4: Return best match
  if (scoredProviders.length === 0) return null;

  return scoredProviders[0];
}
```

### 3. Provider Round-Robin & Load Balancing

**Strategy**: Prevent lead hoarding and distribute fairly

```typescript
async function selectProviderWithLoadBalancing(
  matchedProviders: ProviderScore[]
): Promise<RestorationProvider> {
  // Filter providers with similar scores (within 10 points)
  const topScore = matchedProviders[0].score;
  const topTier = matchedProviders.filter(p => p.score >= topScore - 10);

  // Among top tier, prefer provider with:
  // 1. Fewest current active jobs
  // 2. Longest time since last lead assignment

  topTier.sort((a, b) => {
    // Primary: current job load
    const loadDiff = a.provider.current_active_jobs - b.provider.current_active_jobs;
    if (loadDiff !== 0) return loadDiff;

    // Secondary: priority score
    return b.provider.priority_score - a.provider.priority_score;
  });

  return topTier[0].provider;
}
```

---

## 📊 Integration Workflow

### End-to-End Lead Flow

```
1. User completes AI damage assessment
   ↓
2. Lead saved to Supabase (existing)
   ↓
3. Provider matching algorithm runs
   ↓
4. Best provider selected
   ↓
5. Create GHL Contact
   ├→ Map lead data to GHL format
   ├→ Include lead score & tier as custom fields
   └→ Tag with damage type, urgency, service area
   ↓
6. Create GHL Opportunity
   ├→ Link to contact ID
   ├→ Set monetary value (estimated cost midpoint)
   ├→ Assign to matched provider's GHL user ID
   └→ Set initial pipeline stage
   ↓
7. Update Supabase lead record
   ├→ Set ghl_contact_id
   ├→ Set ghl_opportunity_id
   └→ Set assigned_provider_id
   ↓
8. Update provider's active job count
   ↓
9. Trigger GHL workflow automation
   ├→ Send SMS to provider
   ├→ Send email with lead details
   ├→ Create task for follow-up call
   └→ Start automated nurture sequence for customer
   ↓
10. Return success to user
```

### Error Handling Strategy

```typescript
async function processLeadIntegration(leadId: string) {
  const errors: string[] = [];

  try {
    // 1. Get lead from Supabase
    const lead = await getLeadById(leadId);
    if (!lead) throw new Error('Lead not found');

    // 2. Match provider
    const providerMatch = await matchProvider({
      serviceArea: lead.service_area,
      damageType: lead.damage_type[0],
      propertySize: lead.property_size,
      propertyType: lead.property_type,
      leadTier: lead.lead_tier,
      urgency: lead.urgency_level,
      estimatedValue: lead.estimated_cost_midpoint
    });

    if (!providerMatch) {
      // No provider available - flag for manual assignment
      await updateLead(leadId, {
        status: 'pending_assignment',
        notes: 'No matching provider found - manual assignment required'
      });
      return { success: false, reason: 'no_provider_match' };
    }

    // 3. Create GHL contact
    let ghlContactId: string;
    try {
      const contactResponse = await createGHLContact(lead);
      ghlContactId = contactResponse.contact.id;
    } catch (error) {
      errors.push(`GHL contact creation failed: ${error.message}`);
      // Continue without GHL integration
      await updateLead(leadId, {
        status: 'ghl_sync_failed',
        notes: `GHL contact creation failed: ${error.message}`
      });
    }

    // 4. Create GHL opportunity
    if (ghlContactId) {
      try {
        const opportunityResponse = await createGHLOpportunity({
          ...lead,
          contactId: ghlContactId,
          providerId: providerMatch.provider.ghl_user_id
        });

        // Update lead with GHL IDs
        await updateLead(leadId, {
          ghl_contact_id: ghlContactId,
          ghl_opportunity_id: opportunityResponse.opportunity.id,
          assigned_provider_id: providerMatch.provider.id,
          status: 'assigned'
        });

        // Update provider job count
        await incrementProviderJobCount(providerMatch.provider.id);

      } catch (error) {
        errors.push(`GHL opportunity creation failed: ${error.message}`);
        await updateLead(leadId, {
          ghl_contact_id: ghlContactId,
          status: 'partial_ghl_sync',
          notes: `Contact created but opportunity failed: ${error.message}`
        });
      }
    }

    return {
      success: errors.length === 0,
      provider: providerMatch.provider,
      ghlContactId,
      errors
    };

  } catch (error) {
    console.error('Lead integration error:', error);
    return {
      success: false,
      error: error.message
    };
  }
}
```

---

## 🔐 Security Considerations

### 1. API Key Management
- Store GHL tokens in encrypted environment variables
- Never expose tokens in client-side code
- Implement token rotation schedule (every 90 days)
- Use separate tokens for dev/staging/prod

### 2. Data Privacy
- Encrypt sensitive lead data in Supabase
- Implement row-level security (RLS) policies
- Log all GHL API calls for audit trail
- GDPR compliance: Allow data deletion requests

### 3. Rate Limit Protection
```typescript
// Implement request queue
class GHLRequestQueue {
  private queue: Array<() => Promise<any>> = [];
  private processing = false;
  private requestCount = 0;
  private windowStart = Date.now();

  async enqueue(fn: () => Promise<any>): Promise<any> {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try {
          const result = await fn();
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
      this.processQueue();
    });
  }

  private async processQueue() {
    if (this.processing) return;
    this.processing = true;

    while (this.queue.length > 0) {
      // Check rate limit (100 req / 10 sec)
      const now = Date.now();
      if (now - this.windowStart > 10000) {
        this.requestCount = 0;
        this.windowStart = now;
      }

      if (this.requestCount >= 100) {
        // Wait until window resets
        await new Promise(resolve => setTimeout(resolve, 10000 - (now - this.windowStart)));
        continue;
      }

      const fn = this.queue.shift();
      if (fn) {
        this.requestCount++;
        await fn();
      }
    }

    this.processing = false;
  }
}
```

---

## 📈 Monitoring & Analytics

### Key Metrics to Track

1. **Lead Processing Metrics**
   - Time to match provider (target: <1 second)
   - GHL contact creation success rate (target: 99%+)
   - GHL opportunity creation success rate (target: 99%+)
   - End-to-end processing time (target: <5 seconds)

2. **Provider Performance Metrics**
   - Lead acceptance rate by provider
   - Average response time to leads
   - Lead-to-job conversion rate
   - Provider utilization (active jobs / max capacity)
   - Geographic coverage (leads per service area)

3. **System Health Metrics**
   - API error rates
   - Rate limit hits
   - Failed integrations requiring manual intervention
   - Average retry attempts before success

### Logging Strategy

```typescript
interface IntegrationLog {
  timestamp: Date;
  leadId: string;
  event: 'provider_match' | 'ghl_contact_create' | 'ghl_opportunity_create' | 'error';
  details: any;
  duration_ms?: number;
  success: boolean;
}

async function logIntegrationEvent(log: IntegrationLog) {
  await supabase
    .from('integration_logs')
    .insert({
      ...log,
      timestamp: new Date().toISOString()
    });
}
```

---

## 🚀 Implementation Roadmap

### Phase 4D Build Tasks

1. **Database Setup** (Est: 1-2 hours)
   - [ ] Create `restoration_providers` table in Supabase
   - [ ] Create `integration_logs` table
   - [ ] Add indexes for fast querying
   - [ ] Implement RLS policies
   - [ ] Seed with test providers

2. **GHL API Integration** (Est: 3-4 hours)
   - [ ] Create `/app/lib/ghl/client.ts` - API client with retry logic
   - [ ] Create `/app/lib/ghl/contacts.ts` - Contact creation logic
   - [ ] Create `/app/lib/ghl/opportunities.ts` - Opportunity creation logic
   - [ ] Implement rate limiting queue
   - [ ] Add error handling and logging

3. **Provider Matching System** (Est: 2-3 hours)
   - [ ] Create `/app/lib/providers/matching.ts` - Matching algorithm
   - [ ] Create `/app/lib/providers/scoring.ts` - Scoring logic
   - [ ] Implement load balancing
   - [ ] Add performance tracking

4. **Integration Workflow** (Est: 2-3 hours)
   - [ ] Create `/app/lib/integration/workflow.ts` - End-to-end flow
   - [ ] Modify `submitLead()` in Copilot actions to trigger integration
   - [ ] Create `/app/api/integration/sync` - Manual sync endpoint
   - [ ] Add webhook receiver for GHL updates

5. **Admin Dashboard** (Est: 3-4 hours)
   - [ ] Create `/app/admin/providers` - Provider management UI
   - [ ] Create `/app/admin/leads` - Lead assignment UI
   - [ ] Add integration logs viewer
   - [ ] Create provider performance dashboard

### Estimated Total Time: 11-16 hours

---

## ❓ Open Questions for User

1. **GHL Account Access**
   - Do you have a GHL agency/location account set up?
   - Do you have API credentials (OAuth access token)?
   - What is your GHL location ID?

2. **Pipeline Configuration**
   - Do you have a restoration pipeline created in GHL?
   - What are the pipeline stage IDs?
   - How should leads be assigned to users in GHL?

3. **Provider Network**
   - How many restoration providers are in your network?
   - Do you have their service areas/specialties documented?
   - Are they already set up as users in GHL?

4. **Business Rules**
   - Should platinum leads always go to premium providers?
   - Emergency leads - how fast should assignment happen?
   - What happens if no provider matches?
   - Should customers be notified when assigned?

5. **Testing Environment**
   - Do you have a GHL sandbox/test account?
   - Should we implement a "test mode" flag?

---

## ✅ Conclusion

**Scout Phase Complete** - Ready for Phase 4D Planning

**Key Takeaways**:
1. GHL V2 API is well-documented and production-ready
2. Clear integration path identified for contacts and opportunities
3. Provider matching algorithm designed with multi-factor scoring
4. Rate limiting and error handling strategies defined
5. Comprehensive monitoring and logging planned

**Blockers Identified**:
- Need GHL API credentials from user
- Need GHL location ID and pipeline IDs
- Need provider database populated with real contractors

**Recommended Next Steps**:
1. Clarify open questions with user
2. Obtain GHL API credentials
3. Design detailed database schema
4. Begin Phase 4D Planning document
5. Create implementation timeline

---

## 📚 References

- [GHL API Documentation](https://marketplace.gohighlevel.com/docs/)
- [GHL Developers Community](https://developers.gohighlevel.com/)
- [Create Contact Endpoint](https://marketplace.gohighlevel.com/docs/ghl/contacts/create-contact/)
- [Create Opportunity Endpoint](https://marketplace.gohighlevel.com/docs/ghl/opportunities/create-opportunity/)
- [OAuth 2.0 Authentication](https://marketplace.gohighlevel.com/docs/Authorization/)
