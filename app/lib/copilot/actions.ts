'use client';

import { useCopilotAction, useCopilotReadable } from "@copilotkit/react-core";
import { useDamageAssessment } from "./damageAssessmentState";
import { calculateRestorationCost, calculateLeadScore, getLeadTier } from "./costEstimator";
import { submitLead } from "@/lib/supabase";

export function useDamageAssessmentActions() {
  const assessment = useDamageAssessment();

  // Share current assessment state with AI
  useCopilotReadable({
    description: "Current damage assessment progress and collected information",
    value: assessment,
  });

  // Action: Set damage type
  useCopilotAction({
    name: "setDamageType",
    description: "Record the type of damage the customer is experiencing",
    parameters: [
      {
        name: "damageType",
        type: "string",
        description: "Type of damage: water, fire, mold, storm, industrial, or environmental",
        required: true,
      },
    ],
    handler: async ({ damageType }) => {
      assessment.updateAssessment({ damageType });
      assessment.nextStep();
      return `Damage type recorded: ${damageType}. Moving to urgency assessment.`;
    },
  });

  // Action: Set urgency level
  useCopilotAction({
    name: "setUrgency",
    description: "Record the urgency level of the situation",
    parameters: [
      {
        name: "urgency",
        type: "string",
        description: "Urgency level: emergency, urgent, scheduled, or assessment",
        required: true,
      },
    ],
    handler: async ({ urgency }) => {
      assessment.updateAssessment({
        urgency: urgency as 'emergency' | 'urgent' | 'scheduled' | 'assessment'
      });
      assessment.nextStep();
      return `Urgency level recorded: ${urgency}. Now assessing damage severity.`;
    },
  });

  // Action: Set damage severity
  useCopilotAction({
    name: "setDamageSeverity",
    description: "Record the severity of the damage",
    parameters: [
      {
        name: "severity",
        type: "string",
        description: "Severity level: minor, moderate, severe, or catastrophic",
        required: true,
      },
    ],
    handler: async ({ severity }) => {
      assessment.updateAssessment({
        severity: severity as 'minor' | 'moderate' | 'severe' | 'catastrophic'
      });
      assessment.nextStep();
      return `Severity recorded: ${severity}. Now need property information.`;
    },
  });

  // Action: Set property details
  useCopilotAction({
    name: "setPropertyDetails",
    description: "Record property type and size",
    parameters: [
      {
        name: "propertyType",
        type: "string",
        description: "Type of commercial property (office, warehouse, manufacturing, retail, healthcare, educational, multi-family, restaurant, other)",
        required: true,
      },
      {
        name: "squareFootage",
        type: "number",
        description: "Property size in square feet",
        required: true,
      },
    ],
    handler: async ({ propertyType, squareFootage }) => {
      assessment.updateAssessment({ propertyType, squareFootage });
      assessment.nextStep();
      return `Property recorded: ${propertyType}, ${squareFootage} sq ft. Ready to calculate cost estimate.`;
    },
  });

  // Action: Set affected areas
  useCopilotAction({
    name: "setAffectedAreas",
    description: "Record which areas or systems are affected by the damage",
    parameters: [
      {
        name: "affectedAreas",
        type: "object",
        description: "Array of affected areas",
        required: true,
      },
    ],
    handler: async ({ affectedAreas }) => {
      const areasArray = Array.isArray(affectedAreas) ? affectedAreas : [affectedAreas];
      assessment.updateAssessment({ affectedAreas: areasArray });
      return `Affected areas recorded: ${areasArray.join(', ')}`;
    },
  });

  // Action: Calculate cost estimate
  useCopilotAction({
    name: "calculateCostEstimate",
    description: "Calculate restoration cost estimate based on collected information",
    parameters: [],
    handler: async () => {
      const cost = calculateRestorationCost(assessment);
      assessment.updateAssessment({ estimatedCost: cost });
      assessment.nextStep();

      return `Cost estimate calculated: $${cost.low.toLocaleString()} - $${cost.high.toLocaleString()}. Based on ${assessment.severity} ${assessment.damageType} damage for ${assessment.squareFootage} sq ft ${assessment.propertyType}.`;
    },
  });

  // Action: Collect contact information
  useCopilotAction({
    name: "setContactInfo",
    description: "Record customer contact information",
    parameters: [
      {
        name: "name",
        type: "string",
        description: "Customer's full name",
        required: true,
      },
      {
        name: "phone",
        type: "string",
        description: "Customer's phone number",
        required: true,
      },
      {
        name: "email",
        type: "string",
        description: "Customer's email address (optional)",
        required: false,
      },
      {
        name: "businessName",
        type: "string",
        description: "Business or organization name (optional)",
        required: false,
      },
    ],
    handler: async ({ name, phone, email, businessName }) => {
      assessment.updateAssessment({
        contactInfo: {
          name,
          phone,
          email: email || '',
          businessName: businessName || ''
        },
      });
      assessment.nextStep();
      return `Contact information recorded for ${name}. Now need property address.`;
    },
  });

  // Action: Set property address
  useCopilotAction({
    name: "setPropertyAddress",
    description: "Record the property address and determine service area",
    parameters: [
      {
        name: "address",
        type: "string",
        description: "Full property address",
        required: true,
      },
      {
        name: "serviceArea",
        type: "string",
        description: "Service area: MD, DC, or VA",
        required: true,
      },
    ],
    handler: async ({ address, serviceArea }) => {
      assessment.updateAssessment({
        propertyAddress: address,
        serviceArea: serviceArea as 'MD' | 'DC' | 'VA',
      });
      assessment.nextStep();
      return `Property address recorded: ${address} in ${serviceArea}. Ready to submit assessment.`;
    },
  });

  // Action: Submit lead to database
  useCopilotAction({
    name: "submitAssessment",
    description: "Submit the complete damage assessment as a lead to the database",
    parameters: [],
    handler: async () => {
      const state = assessment;

      // Calculate lead score
      const leadScore = calculateLeadScore(state);
      const leadTier = getLeadTier(leadScore);

      // Map to existing Supabase Lead schema
      const lead = {
        business_name: state.contactInfo.businessName || 'Commercial Property',
        contact_name: state.contactInfo.name,
        phone: state.contactInfo.phone,
        email: state.contactInfo.email || undefined,
        property_address: state.propertyAddress,
        property_type: state.propertyType as any,
        property_size: state.squareFootage || 0,
        damage_type: [state.damageType || 'unknown'],
        damage_description: `AI Assessment: ${state.severity} ${state.damageType} damage. Estimated: $${state.estimatedCost?.low.toLocaleString()}-$${state.estimatedCost?.high.toLocaleString()}. Affected areas: ${state.affectedAreas.join(', ')}`,
        urgency_level: state.urgency as any,
        service_area: state.serviceArea as any,
        lead_source: 'ai_damage_assessment_chat',
        status: leadTier === 'platinum' || leadTier === 'gold' ? 'new' : 'pending',
      };

      try {
        const result = await submitLead(lead);

        if (result.success) {
          assessment.resetAssessment(); // Clear state for next user
          return `Assessment submitted successfully! Lead ID: ${result.data?.[0]?.id}. Priority: ${leadTier.toUpperCase()}. Our team will contact ${state.contactInfo.name} at ${state.contactInfo.phone} shortly.`;
        } else {
          return `Error submitting assessment. Please call us directly at: MD 301-900-5171, DC 202-796-7422, VA 703-844-4204`;
        }
      } catch (error) {
        console.error('Error submitting lead:', error);
        return `Technical error occurred. Please call us directly for immediate assistance: MD 301-900-5171, DC 202-796-7422, VA 703-844-4204`;
      }
    },
  });

  // Action: Emergency handoff
  useCopilotAction({
    name: "urgentHandoff",
    description: "Provide immediate phone contact for emergency situations",
    parameters: [],
    handler: async () => {
      const serviceArea = assessment.serviceArea || 'MD';
      const phoneNumbers = {
        MD: '301-900-5171',
        DC: '202-796-7422',
        VA: '703-844-4204',
      };

      return `This is an EMERGENCY situation. Please call us immediately at ${phoneNumbers[serviceArea]}. We're available 24/7 and will dispatch a team right away.`;
    },
  });
}
