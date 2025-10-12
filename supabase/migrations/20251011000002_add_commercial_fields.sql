-- Migration: Add commercial property fields to leads table
-- Date: October 11, 2025
-- Purpose: Support commercial property lead capture for Phase 4A transformation

-- Add property_type column (required for commercial leads)
ALTER TABLE leads
ADD COLUMN IF NOT EXISTS property_type VARCHAR(50);

-- Add property_size column (square footage)
ALTER TABLE leads
ADD COLUMN IF NOT EXISTS property_size INTEGER;

-- Add comments for documentation
COMMENT ON COLUMN leads.property_type IS 'Commercial property type: office, warehouse, manufacturing, retail, healthcare, educational, other';
COMMENT ON COLUMN leads.property_size IS 'Property size in square feet';

-- Add index for property_type if filtering/reporting needed
CREATE INDEX IF NOT EXISTS idx_leads_property_type ON leads(property_type);

-- Add property_type to testimonials for display (optional field)
ALTER TABLE testimonials
ADD COLUMN IF NOT EXISTS property_type VARCHAR(50);

COMMENT ON COLUMN testimonials.property_type IS 'Property type for testimonial display (optional)';

-- Note: Columns are added as nullable to maintain backward compatibility with existing data
-- The application layer will enforce required validation for new leads
