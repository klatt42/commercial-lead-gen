interface CostBreakdown {
  low: number;
  high: number;
  baseCost: number;
  complexity: number;
  breakdown: {
    baseCostPerSqFt: number;
    squareFootage: number;
    severityMultiplier: number;
    urgencyFactor: number;
    propertyModifier: number;
  };
}

const BASE_COSTS: Record<string, any> = {
  water: {
    category1: 3.75, // Clean water
    category2: 4.50, // Gray water
    category3: 7.00, // Black water
    default: 5.00,
  },
  fire: {
    default: 10.00,
    classB: 12.00, // Flammable liquids
    classC: 13.00, // Electrical
    classD: 14.00, // Combustible metals
  },
  mold: {
    standard: 15.00,
    blackMold: 20.00,
    default: 17.50,
  },
  storm: {
    default: 7.00,
    roof: 10.00,
  },
  industrial: {
    // Equipment-based, not sq ft
    smallEquipment: 1500,
    largeEquipment: 15000,
  },
  environmental: {
    asbestos: 12.50,
    hazmat: 25.00,
    default: 20.00,
  },
};

const SEVERITY_MULTIPLIERS = {
  minor: 1.0,
  moderate: 1.5,
  severe: 2.0,
  catastrophic: 3.0,
};

const URGENCY_FACTORS = {
  emergency: 1.20,
  urgent: 1.10,
  scheduled: 1.00,
  assessment: 0.90,
};

const PROPERTY_MODIFIERS: Record<string, number> = {
  office: 1.00,
  warehouse: 0.90,
  manufacturing: 1.15,
  retail: 1.05,
  healthcare: 1.25,
  educational: 1.10,
  'multi-family': 1.05,
  restaurant: 1.10,
  other: 1.00,
};

export function calculateRestorationCost(assessment: any): CostBreakdown {
  // Get base cost per sq ft
  const damageType = assessment.damageType || 'water';
  let baseCostPerSqFt = BASE_COSTS[damageType]?.default || 10.00;

  // Calculate base total
  const squareFootage = assessment.squareFootage || 1000;
  let baseTotal = baseCostPerSqFt * squareFootage;

  // Apply severity multiplier
  const severity = assessment.severity || 'moderate';
  const severityMultiplier = SEVERITY_MULTIPLIERS[severity as keyof typeof SEVERITY_MULTIPLIERS] || 1.5;
  baseTotal *= severityMultiplier;

  // Apply urgency factor
  const urgency = assessment.urgency || 'urgent';
  const urgencyFactor = URGENCY_FACTORS[urgency as keyof typeof URGENCY_FACTORS] || 1.10;
  baseTotal *= urgencyFactor;

  // Apply property type modifier
  const propertyType = assessment.propertyType || 'office';
  const propertyModifier = PROPERTY_MODIFIERS[propertyType] || 1.00;
  baseTotal *= propertyModifier;

  // Add complexity factors
  let complexityAddOn = 0;
  const affectedAreas = assessment.affectedAreas || [];

  if (affectedAreas.includes('hvac') || affectedAreas.includes('HVAC system')) {
    complexityAddOn += 10000;
  }
  if (affectedAreas.includes('electrical') || affectedAreas.includes('Electrical systems')) {
    complexityAddOn += 5000;
  }
  if (affectedAreas.includes('contents') || affectedAreas.includes('Contents/inventory')) {
    complexityAddOn += squareFootage * 2;
  }

  // Calculate range (±20%)
  const totalCost = baseTotal + complexityAddOn;
  const lowEstimate = Math.round(totalCost * 0.80);
  const highEstimate = Math.round(totalCost * 1.20);

  return {
    low: lowEstimate,
    high: highEstimate,
    baseCost: Math.round(baseTotal),
    complexity: complexityAddOn,
    breakdown: {
      baseCostPerSqFt,
      squareFootage,
      severityMultiplier,
      urgencyFactor,
      propertyModifier,
    },
  };
}

// Lead scoring function
export function calculateLeadScore(assessment: any): number {
  let score = 50; // Base score

  // Urgency scoring (0-30 points)
  const urgencyScores: Record<string, number> = {
    emergency: 30,
    urgent: 20,
    scheduled: 10,
    assessment: 5,
  };
  score += urgencyScores[assessment.urgency] || 10;

  // Property size scoring (0-20 points)
  const sqft = assessment.squareFootage || 0;
  if (sqft > 20000) score += 20;
  else if (sqft > 10000) score += 15;
  else if (sqft > 5000) score += 10;
  else score += 5;

  // Severity scoring (0-15 points)
  const severityScores: Record<string, number> = {
    catastrophic: 15,
    severe: 12,
    moderate: 8,
    minor: 4,
  };
  score += severityScores[assessment.severity] || 8;

  // Damage type scoring (0-10 points)
  const highValueDamage = ['fire', 'environmental', 'industrial'];
  if (highValueDamage.includes(assessment.damageType)) {
    score += 10;
  } else {
    score += 5;
  }

  // Property type scoring (0-10 points)
  const commercialTypes = ['manufacturing', 'healthcare', 'warehouse'];
  if (commercialTypes.includes(assessment.propertyType)) {
    score += 10;
  } else {
    score += 5;
  }

  // Estimated value scoring (0-15 points)
  const estimatedValue = assessment.estimatedCost?.high || 0;
  if (estimatedValue > 100000) score += 15;
  else if (estimatedValue > 50000) score += 12;
  else if (estimatedValue > 25000) score += 8;
  else score += 4;

  return Math.min(score, 100); // Cap at 100
}

export function getLeadTier(score: number): 'platinum' | 'gold' | 'silver' | 'bronze' {
  if (score >= 90) return 'platinum';
  if (score >= 70) return 'gold';
  if (score >= 50) return 'silver';
  return 'bronze';
}
