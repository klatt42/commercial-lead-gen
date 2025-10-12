-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    -- Testimonial Content
    customer_name TEXT NOT NULL,
    location TEXT NOT NULL, -- City, State format
    service_type TEXT NOT NULL, -- water, fire, mold, storm
    quote TEXT NOT NULL,
    rating INTEGER CHECK(rating BETWEEN 1 AND 5) DEFAULT 5,

    -- Display Control
    display_order INTEGER DEFAULT 0,
    active BOOLEAN DEFAULT true,

    -- Optional fields
    before_image_url TEXT,
    after_image_url TEXT,
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Create index for active testimonials
CREATE INDEX idx_testimonials_active ON testimonials(active);
CREATE INDEX idx_testimonials_display_order ON testimonials(display_order);

-- Enable Row Level Security
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Create RLS policy for public read access to active testimonials
CREATE POLICY "Allow public read access to active testimonials"
    ON testimonials FOR SELECT
    USING (active = true);

-- Apply updated_at trigger
CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample testimonials
INSERT INTO testimonials (customer_name, location, service_type, quote, rating, display_order, active) VALUES
('Sarah M.', 'Alexandria, VA', 'water', 'When our basement flooded at 2 AM, they answered immediately. The team arrived within an hour and started work right away. Professional, compassionate, and thorough.', 5, 1, true),
('Michael R.', 'Bethesda, MD', 'fire', 'After the fire, we were devastated. This team walked us through every step with patience and expertise. They made a terrible situation manageable. Highly recommend.', 5, 2, true),
('Jennifer L.', 'Georgetown, DC', 'mold', 'Found mold in our office building and needed immediate remediation. They responded quickly, contained the area professionally, and completed the work ahead of schedule.', 5, 3, true),
('David K.', 'Fairfax, VA', 'storm', 'Storm damage to our roof caused extensive water intrusion. The emergency response was incredible - they had tarps up within hours and prevented further damage. Excellent work.', 5, 4, true),
('Amanda T.', 'Rockville, MD', 'water', 'Insurance company wanted us to wait days for their contractor. We called them instead and they started immediately. Best decision we made during a stressful time.', 5, 5, true),
('Robert H.', 'Arlington, VA', 'fire', 'The team was knowledgeable, respectful, and incredibly efficient. They restored our home beautifully. You would never know we had a fire. Thank you!', 5, 6, true);
