-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create leads table
CREATE TABLE leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    -- Contact Information
    business_name TEXT NOT NULL,
    contact_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,

    -- Property Details
    property_address TEXT NOT NULL,
    property_size INTEGER, -- Square footage
    property_type TEXT CHECK(property_type IN ('office', 'retail', 'warehouse', 'manufacturing', 'healthcare', 'education', 'hospitality')),

    -- Damage Information
    damage_type TEXT[] NOT NULL, -- Array: water, fire, storm, mold, other
    damage_description TEXT,
    urgency_level TEXT CHECK(urgency_level IN ('emergency', 'urgent', 'standard', 'non-urgent')) DEFAULT 'standard',
    estimated_damage_severity INTEGER CHECK(estimated_damage_severity BETWEEN 1 AND 10),

    -- Service Area
    service_area TEXT CHECK(service_area IN ('MD', 'DC', 'VA')) NOT NULL,
    zip_code TEXT,

    -- Insurance
    insurance_carrier TEXT,
    policy_number TEXT,
    claim_number TEXT,

    -- Lead Processing
    qualification_score INTEGER CHECK(qualification_score BETWEEN 0 AND 100),
    assigned_provider UUID,
    lead_source TEXT DEFAULT 'website',

    -- Status Tracking
    status TEXT CHECK(status IN ('new', 'qualified', 'assigned', 'contacted', 'quoted', 'converted', 'closed_lost')) DEFAULT 'new',

    -- Metadata
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Create service providers table
CREATE TABLE service_providers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    -- Company Information
    company_name TEXT NOT NULL,
    contact_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    website TEXT,

    -- Service Capabilities
    service_areas TEXT[] NOT NULL, -- MD, DC, VA regions
    zip_codes_served TEXT[],
    specializations TEXT[] NOT NULL, -- water, fire, storm, mold, large_loss
    certifications TEXT[], -- IICRC, RIA, etc.

    -- Capacity & Performance
    current_capacity INTEGER DEFAULT 100, -- Percentage
    max_concurrent_projects INTEGER DEFAULT 5,
    average_response_time_hours DECIMAL DEFAULT 2.0,

    -- Insurance & Business
    insurance_partners TEXT[],
    license_numbers TEXT[],
    bonded BOOLEAN DEFAULT false,
    insured BOOLEAN DEFAULT false,

    -- Ratings & Status
    rating DECIMAL CHECK(rating BETWEEN 0 AND 5) DEFAULT 0,
    total_projects INTEGER DEFAULT 0,
    active BOOLEAN DEFAULT true,

    -- Metadata
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Create damage assessments table
CREATE TABLE damage_assessments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    -- Relationship
    lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,

    -- Assessment Data
    assessment_type TEXT CHECK(assessment_type IN ('preliminary', 'detailed', 'final')) DEFAULT 'preliminary',
    assessment_data JSONB NOT NULL, -- Structured assessment results

    -- AI Analysis
    ai_confidence_score DECIMAL CHECK(ai_confidence_score BETWEEN 0 AND 1),
    damage_categories JSONB, -- Categorized damage types and severity

    -- Cost Estimation
    estimated_cost_min INTEGER, -- In cents
    estimated_cost_max INTEGER, -- In cents
    estimated_timeline_days INTEGER,

    -- Recommendations
    recommended_services TEXT[],
    priority_actions TEXT[],

    -- Validation
    human_validated BOOLEAN DEFAULT false,
    validator_id UUID,
    validation_notes TEXT
);

-- Create indexes for performance
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_urgency ON leads(urgency_level);
CREATE INDEX idx_leads_service_area ON leads(service_area);
CREATE INDEX idx_leads_created_at ON leads(created_at);
CREATE INDEX idx_leads_damage_type ON leads USING GIN(damage_type);

CREATE INDEX idx_providers_active ON service_providers(active);
CREATE INDEX idx_providers_service_areas ON service_providers USING GIN(service_areas);
CREATE INDEX idx_providers_specializations ON service_providers USING GIN(specializations);
CREATE INDEX idx_providers_rating ON service_providers(rating);

CREATE INDEX idx_assessments_lead_id ON damage_assessments(lead_id);
CREATE INDEX idx_assessments_type ON damage_assessments(assessment_type);

-- Enable Row Level Security
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE damage_assessments ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (basic - refine based on auth requirements)
CREATE POLICY "Allow public read access to leads" ON leads FOR SELECT USING (true);
CREATE POLICY "Allow public insert to leads" ON leads FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read access to providers" ON service_providers FOR SELECT USING (active = true);

CREATE POLICY "Allow related access to assessments" ON damage_assessments FOR ALL USING (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$ language 'plpgsql';

-- Apply updated_at triggers
CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_providers_updated_at BEFORE UPDATE ON service_providers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();