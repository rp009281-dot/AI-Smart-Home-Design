// Dynamic, Configurable Cost Estimation Service

// Base construction rates per sq.ft by quality grade
const BASE_RATES = {
  Economy: {
    constructionRatePerSqft: 1650,
    materialPct: 0.52,
    labourPct: 0.28,
    electricalPct: 0.06,
    plumbingPct: 0.05,
    flooringPct: 0.04,
    paintingPct: 0.03,
    contingencyPct: 0.02
  },
  Balanced: {
    constructionRatePerSqft: 2200,
    materialPct: 0.50,
    labourPct: 0.26,
    electricalPct: 0.07,
    plumbingPct: 0.06,
    flooringPct: 0.05,
    paintingPct: 0.04,
    contingencyPct: 0.02
  },
  Premium: {
    constructionRatePerSqft: 3100,
    materialPct: 0.48,
    labourPct: 0.25,
    electricalPct: 0.08,
    plumbingPct: 0.07,
    flooringPct: 0.06,
    paintingPct: 0.04,
    contingencyPct: 0.02
  },
  Luxury: {
    constructionRatePerSqft: 4400,
    materialPct: 0.46,
    labourPct: 0.24,
    electricalPct: 0.09,
    plumbingPct: 0.08,
    flooringPct: 0.07,
    paintingPct: 0.04,
    contingencyPct: 0.02
  }
};

// Floor multiplier (higher floors require vertical hoisting and scaffolding)
const FLOOR_MULTIPLIER = {
  1: 1.0,
  2: 1.05,
  3: 1.12,
  4: 1.20
};

// Architectural style factor
const STYLE_FACTORS = {
  'Modern Contemporary': 1.0,
  'Minimalist': 0.95,
  'Neo-Classical': 1.15,
  'Traditional / Kerala': 1.08,
  'Industrial Loft': 1.02,
  'Eco Biophilic': 1.12
};

function calculateCost({
  builtUpAreaSqft,
  floors = 1,
  qualityTier = 'Balanced',
  architecturalStyle = 'Modern Contemporary',
  smartFeatures = [],
  customAddons = 0
}) {
  const rateConfig = BASE_RATES[qualityTier] || BASE_RATES.Balanced;
  const floorFactor = FLOOR_MULTIPLIER[floors] || (1.0 + (floors - 1) * 0.06);
  const styleFactor = STYLE_FACTORS[architecturalStyle] || 1.0;

  // Base raw structure cost
  const effectiveRate = Math.round(rateConfig.constructionRatePerSqft * floorFactor * styleFactor);
  const coreConstructionCost = Math.round(builtUpAreaSqft * effectiveRate);

  // Breakdown of construction
  const materialCost = Math.round(coreConstructionCost * rateConfig.materialPct);
  const labourCost = Math.round(coreConstructionCost * rateConfig.labourPct);
  const electricalCost = Math.round(coreConstructionCost * rateConfig.electricalPct);
  const plumbingCost = Math.round(coreConstructionCost * rateConfig.plumbingPct);
  const flooringCost = Math.round(coreConstructionCost * rateConfig.flooringPct);
  const paintingCost = Math.round(coreConstructionCost * rateConfig.paintingPct);
  const contingencyCost = Math.round(coreConstructionCost * rateConfig.contingencyPct);

  // Smart home features cost calculation
  let smartHomeCost = 0;
  if (Array.isArray(smartFeatures)) {
    smartHomeCost = smartFeatures.reduce((sum, item) => sum + (Number(item.approx_price || item.price || 0)), 0);
  } else if (typeof smartFeatures === 'number') {
    smartHomeCost = smartFeatures;
  }

  // Finishing upgrade additions
  const finishingCost = flooringCost + paintingCost;

  const totalCost = coreConstructionCost + smartHomeCost + Number(customAddons || 0);
  const totalCostPerSqft = Math.round(totalCost / Math.max(1, builtUpAreaSqft));

  return {
    builtUpAreaSqft,
    qualityTier,
    floors,
    baseRatePerSqft: rateConfig.constructionRatePerSqft,
    effectiveRatePerSqft: effectiveRate,
    totalCostPerSqft,
    totalEstimatedCost: totalCost,
    breakdown: {
      materialCost,
      labourCost,
      electricalCost,
      plumbingCost,
      flooringCost,
      paintingCost,
      finishingCost,
      smartHomeCost,
      contingencyCost
    },
    chartData: [
      { name: 'Materials', value: materialCost, color: '#3B82F6' },
      { name: 'Labour', value: labourCost, color: '#10B981' },
      { name: 'Electrical & Automation', value: electricalCost + smartHomeCost, color: '#F59E0B' },
      { name: 'Plumbing & Sanitary', value: plumbingCost, color: '#06B6D4' },
      { name: 'Flooring & Finishes', value: flooringCost, color: '#8B5CF6' },
      { name: 'Painting & Exterior', value: paintingCost, color: '#EC4899' },
      { name: 'Contingency & Reserve', value: contingencyCost, color: '#64748B' }
    ]
  };
}

module.exports = {
  calculateCost,
  BASE_RATES,
  FLOOR_MULTIPLIER,
  STYLE_FACTORS
};
