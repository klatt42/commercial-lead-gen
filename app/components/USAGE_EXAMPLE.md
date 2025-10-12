# Service Page Components - Usage Example

This guide shows how to use the three new service page components together.

## Example Service Page

Here's how to combine `ServiceHero`, `ServiceDetails`, and `FAQSection` on a service page:

```typescript
import ServiceHero from '../components/ServiceHero'
import ServiceDetails from '../components/ServiceDetails'
import FAQSection from '../components/FAQSection'

export default function WaterDamagePage() {
  return (
    <>
      {/* Hero Section */}
      <ServiceHero
        emoji="💧"
        title="Commercial Water Damage Restoration"
        subtitle="Expert 24/7 Emergency Water Extraction & Drying"
        description="When water damage strikes your commercial property, every minute counts. Our rapid response team provides professional water extraction, structural drying, and complete restoration to minimize downtime and protect your business operations."
        urgencyMessage="Water damage spreads exponentially every hour. Standing water can cause structural damage, mold growth, and equipment failure within 24-48 hours. Call now for immediate emergency response."
      />

      {/* Process, Benefits, and Certifications */}
      <ServiceDetails
        processTitle="Our Water Damage Restoration Process"
        process={[
          {
            step: 1,
            title: "Emergency Contact & Dispatch",
            description: "Call our 24/7 hotline and speak with a live restoration specialist. We dispatch a team to your location immediately.",
            duration: "< 60 minutes"
          },
          {
            step: 2,
            title: "Inspection & Assessment",
            description: "Our certified technicians assess the extent of damage, identify the water source, and develop a comprehensive restoration plan.",
            duration: "1-2 hours"
          },
          {
            step: 3,
            title: "Water Extraction & Removal",
            description: "Using industrial-grade pumps and vacuums, we remove standing water quickly to prevent further damage and contamination.",
            duration: "2-4 hours"
          },
          {
            step: 4,
            title: "Drying & Dehumidification",
            description: "High-powered air movers and dehumidifiers ensure complete moisture removal from walls, floors, and structural components.",
            duration: "3-5 days"
          },
          {
            step: 5,
            title: "Cleaning & Sanitizing",
            description: "We clean, sanitize, and deodorize all affected areas to prevent mold growth and ensure a safe environment.",
            duration: "1-2 days"
          },
          {
            step: 6,
            title: "Restoration & Reconstruction",
            description: "Final repairs and reconstruction return your property to pre-damage condition, including flooring, drywall, and paint.",
            duration: "1-2 weeks"
          }
        ]}
        benefitsTitle="Why Choose Our Water Damage Services"
        benefits={[
          "60-minute emergency response time across MD, DC, and VA",
          "Industrial-grade water extraction and drying equipment",
          "IICRC-certified water damage restoration technicians",
          "Direct insurance billing and claims assistance",
          "24/7 emergency service with live phone support",
          "Complete documentation for insurance claims",
          "Moisture monitoring and testing throughout process",
          "Anti-microbial treatment to prevent mold growth"
        ]}
        certificationsTitle="Our Certifications & Partnerships"
        certifications={[
          "IICRC Certified",
          "EPA Lead-Safe",
          "OSHA Compliant",
          "Licensed & Insured",
          "BBB A+ Rated",
          "Institute of Inspection"
        ]}
      />

      {/* FAQ Section */}
      <FAQSection
        faqs={[
          {
            question: "How quickly can you respond to a water emergency?",
            answer: "We provide emergency response within 60 minutes across Maryland, Washington DC, and Virginia. Our teams are on standby 24/7/365 to respond to commercial water damage emergencies immediately."
          },
          {
            question: "Will my business insurance cover water damage restoration?",
            answer: "Most commercial insurance policies cover water damage from sudden incidents like burst pipes or equipment failures. We work directly with your insurance company, provide detailed documentation, and assist with claims processing to maximize your coverage."
          },
          {
            question: "How long does the water damage restoration process take?",
            answer: "Timeline varies based on the extent of damage. Water extraction typically takes 2-4 hours, drying takes 3-5 days, and complete restoration can take 1-3 weeks. We work efficiently to minimize business disruption while ensuring thorough restoration."
          },
          {
            question: "Can you work around my business hours to minimize disruption?",
            answer: "Yes! We understand minimizing downtime is critical for commercial properties. We can schedule work during off-hours, weekends, or coordinate with your operations to ensure minimal business interruption."
          },
          {
            question: "What equipment do you use for commercial water extraction?",
            answer: "We use industrial-grade equipment including truck-mounted extractors, high-volume air movers, commercial dehumidifiers, moisture meters, thermal imaging cameras, and antimicrobial treatments designed specifically for large commercial properties."
          },
          {
            question: "Do you handle mold remediation if water damage leads to mold?",
            answer: "Yes, we provide complete mold remediation services. Our teams are certified in mold inspection, containment, removal, and prevention. We address mold issues immediately to protect your property and ensure a safe environment."
          }
        ]}
      />
    </>
  )
}
```

## Component Props Reference

### ServiceHero Props

```typescript
interface ServiceHeroProps {
  emoji: string           // Large emoji displayed at top (e.g., "💧", "🔥", "🦠")
  title: string          // Main H1 title
  subtitle: string       // Gold-colored subtitle
  description: string    // Paragraph description
  urgencyMessage: string // Message displayed in urgent warning box
}
```

### ServiceDetails Props

```typescript
interface ProcessStep {
  step: number          // Step number (1, 2, 3, etc.)
  title: string        // Step title
  description: string  // Step description
  duration?: string    // Optional duration (e.g., "< 60 minutes")
}

interface ServiceDetailsProps {
  processTitle: string           // Title for process section
  process: ProcessStep[]         // Array of process steps
  benefitsTitle: string          // Title for benefits section
  benefits: string[]             // Array of benefit strings
  certificationsTitle: string    // Title for certifications section
  certifications: string[]       // Array of certification names
}
```

### FAQSection Props

```typescript
interface FAQ {
  question: string  // The FAQ question
  answer: string    // The FAQ answer
}

interface FAQSectionProps {
  faqs: FAQ[]  // Array of FAQ objects
}
```

## Design Features

### ServiceHero
- Same gradient background as homepage hero
- Large animated emoji
- Prominent emergency phone CTAs for all three regions
- Urgency message with warning icon
- Trust badges at bottom
- Fully responsive and conversion-focused

### ServiceDetails
- **Process Section**: Timeline-style with numbered badges, alternating left/right layout on desktop
- **Benefits Section**: 2-column grid with green checkmark icons
- **Certifications Section**: Badge-style display on dark gradient background
- All sections use consistent blues, golds, and gradients

### FAQSection
- Accordion-style (one open at a time)
- Smooth expand/collapse animations
- Schema.org FAQPage structured data for SEO
- Call-to-action section at bottom
- Full accessibility with ARIA attributes

## Styling Notes

All components use:
- TypeScript for type safety
- Tailwind CSS for styling
- Mobile-first responsive design
- Consistent color palette (blues: #1a1a2e, #16213e, #0f3460; gold: #FFD700)
- Smooth transitions and hover effects
- Proper semantic HTML and accessibility features
