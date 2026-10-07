// AI Design Recommendation & Generation Engine
const { calculateCost } = require('./costEstimationService');
const { defaultMaterials, defaultSmartFeatures } = require('../utils/seedData');

// Generates 3 distinct design options: Budget, Balanced, Premium
function generateAiHouseDesigns(input) {
  const {
    plot_length = 40,
    plot_width = 30,
    plot_size_sqft = 1200,
    budget_max = 3500000,
    floors = 1,
    bedrooms = 3,
    bathrooms = 2,
    kitchen_type = 'Modular',
    living_room_type = 'Spacious Open-Concept',
    parking_slots = 1,
    lifestyle_preferences = {},
    material_preference = 'Balanced',
    smart_features_preference = [],
    architectural_style = 'Modern Contemporary',
    vastu_importance = 'moderate',
    energy_efficiency_level = 'high'
  } = input;

  const actualPlotArea = Number(plot_size_sqft) || (Number(plot_length) * Number(plot_width)) || 1200;
  const numFloors = Math.max(1, Number(floors) || 1);
  const numBedrooms = Math.max(1, Number(bedrooms) || 2);
  const numBaths = Math.max(1, Number(bathrooms) || 1);
  const parkingCount = Math.max(0, Number(parking_slots) || 1);

  // Design Tiers: Budget, Balanced, Premium
  const tiers = [
    {
      tier_type: 'budget',
      title: 'Smart Economical Haven',
      qualityTier: 'Economy',
      groundCoveragePct: 0.65, // 65% ground coverage
      description: 'Maximum value design optimized for low lifecycle costs, structural durability, and high spatial efficiency without compromising on modern comfort.',
      tag: 'Best Value'
    },
    {
      tier_type: 'balanced',
      title: 'Contemporary Harmony Villa',
      qualityTier: 'Balanced',
      groundCoveragePct: 0.70, // 70% ground coverage
      description: 'The optimal equilibrium of smart home automation, high-grade eco materials, spacious open layouts, and natural thermal ventilation.',
      tag: 'Recommended'
    },
    {
      tier_type: 'premium',
      title: 'Elite Intelligent Estate',
      qualityTier: 'Premium',
      groundCoveragePct: 0.76, // 76% ground coverage
      description: 'Luxurious high-tech sanctuary featuring full matter-enabled automation, premium Italian marble/wood textures, panoramic glazing, and rooftop solar micro-grid.',
      tag: 'Luxury Grade'
    }
  ];

  return tiers.map(tier => {
    // Spatial calculations
    const groundBuiltUp = Math.round(actualPlotArea * tier.groundCoveragePct);
    const totalBuiltUpArea = Math.round(groundBuiltUp * (1 + (numFloors - 1) * 0.88));
    const carpetArea = Math.round(totalBuiltUpArea * 0.82);
    const openSpaceArea = Math.round(actualPlotArea - groundBuiltUp);
    const spaceUtilizationPct = Math.min(95, Math.round((groundBuiltUp / actualPlotArea) * 100));

    // Space distribution breakdown
    const parkingArea = parkingCount * (tier.tier_type === 'premium' ? 180 : 150);
    const gardenArea = Math.max(60, openSpaceArea - parkingArea);
    const roomArea = carpetArea;

    // Floor plan layout generator for ground floor (2D visualization)
    const floorPlan = generateFloorPlanLayout({
      plotLength: Number(plot_length) || Math.round(Math.sqrt(actualPlotArea * 1.33)),
      plotWidth: Number(plot_width) || Math.round(Math.sqrt(actualPlotArea * 0.75)),
      builtUpArea: groundBuiltUp,
      bedrooms: numBedrooms,
      bathrooms: numBaths,
      kitchenType: kitchen_type,
      livingType: living_room_type,
      parkingSlots: parkingCount,
      tier: tier.tier_type,
      facing: input.facing_direction || 'East'
    });

    // Smart Features tailored to tier and user preferences
    const selectedSmartFeatures = filterSmartFeaturesForTier(tier.tier_type, smart_features_preference);

    // Cost Calculation
    const costEstimate = calculateCost({
      builtUpAreaSqft: totalBuiltUpArea,
      floors: numFloors,
      qualityTier: tier.qualityTier,
      architecturalStyle: architectural_style,
      smartFeatures: selectedSmartFeatures
    });

    // Material Recommendations
    const materialRecommendations = getMaterialRecommendationsForTier(tier.tier_type);

    // Energy Efficiency Analysis
    const energyAnalysis = evaluateEnergyEfficiency({
      tier: tier.tier_type,
      energyPreference: energy_efficiency_level,
      hasSolar: selectedSmartFeatures.some(f => f.category === 'Energy'),
      builtUpArea: totalBuiltUpArea
    });

    // Vastu Analysis
    const vastuAnalysis = evaluateVastu({
      facing: input.facing_direction || 'East',
      rooms: floorPlan.rooms,
      vastuImportance: vastu_importance
    });

    // Space Optimization Suggestions
    const spaceOptimization = {
      totalPlotArea: actualPlotArea,
      builtUpArea: totalBuiltUpArea,
      groundBuiltUpArea: groundBuiltUp,
      carpetArea,
      openSpaceArea,
      parkingArea,
      gardenArea,
      spaceUtilizationPct,
      efficiencyRating: spaceUtilizationPct > 70 ? 'Optimal' : 'Moderate',
      suggestions: [
        `Compact circulation corridors saved approx ${Math.round(totalBuiltUpArea * 0.08)} sq.ft of usable space.`,
        `Cross-ventilation windows oriented along North-South axis reduce daytime artificial cooling by 20%.`,
        parkingCount > 0 ? `Dedicated covered driveway integrates seamlessly with the front perimeter without obstructing foyer access.` : 'Front courtyard can easily be converted to compact 2-wheeler or EV charging pad.',
        `Rooftop terrace provides ${Math.round(groundBuiltUp * 0.8)} sq.ft of recreational or solar panel mounting surface.`
      ]
    };

    return {
      tier_type: tier.tier_type,
      title: tier.title,
      tag: tier.tag,
      description: tier.description,
      qualityTier: tier.qualityTier,
      total_built_up_area: totalBuiltUpArea,
      carpet_area: carpetArea,
      open_space_area: openSpaceArea,
      space_utilization_pct: spaceUtilizationPct,
      estimated_total_cost: costEstimate.totalEstimatedCost,
      cost_per_sqft: costEstimate.totalCostPerSqft,
      cost_breakdown: costEstimate,
      floor_plan: floorPlan,
      energy_score: energyAnalysis.score,
      energy_analysis: energyAnalysis,
      vastu_score: vastuAnalysis.score,
      vastu_analysis: vastuAnalysis,
      space_optimization: spaceOptimization,
      materials: materialRecommendations,
      smart_features: selectedSmartFeatures,
      preview_3d_meta: {
        floors: numFloors,
        exteriorStyle: architectural_style,
        roofType: tier.tier_type === 'premium' ? 'Flat Terrace with Pergola' : 'Parapet Flat Slab',
        wallColor: tier.tier_type === 'premium' ? '#F1F5F9' : '#FFFFFF',
        accentColor: tier.tier_type === 'premium' ? '#1E293B' : '#3B82F6',
        windowGlass: 'Double Glazed Low-E Blue Tint',
        hasSolarOnRoof: selectedSmartFeatures.some(s => s.category === 'Energy')
      }
    };
  });
}

// 2D Floor Plan Layout Coordinator
function generateFloorPlanLayout({
  plotLength,
  plotWidth,
  builtUpArea,
  bedrooms,
  bathrooms,
  kitchenType,
  livingType,
  parkingSlots,
  tier,
  facing
}) {
  // Normalize layout dimensions on a 100x100 grid scale
  const rooms = [];
  const connections = [];

  // 1. Parking / Front Courtyard (Front area)
  if (parkingSlots > 0) {
    rooms.push({
      id: 'parking',
      name: parkingSlots > 1 ? 'Double Carport' : 'Covered Parking',
      type: 'Parking',
      x: 5,
      y: 72,
      w: 32,
      h: 24,
      color: '#CBD5E1',
      vastu_zone: 'North-West',
      doors: [{ wall: 'top', pos: 0.5 }]
    });
  }

  // 2. Front Garden / Open Space
  rooms.push({
    id: 'garden',
    name: 'Landscape Garden',
    type: 'Garden',
    x: parkingSlots > 0 ? 40 : 5,
    y: 75,
    w: parkingSlots > 0 ? 55 : 90,
    h: 21,
    color: '#86EFAC',
    vastu_zone: 'North-East',
    doors: []
  });

  // 3. Living Room (Grand entrance)
  rooms.push({
    id: 'living',
    name: `${livingType.split(' ')[0]} Living Room`,
    type: 'Living',
    x: 5,
    y: 38,
    w: 48,
    h: 30,
    color: '#93C5FD',
    vastu_zone: 'North / East',
    doors: [
      { wall: 'bottom', pos: 0.5, label: 'Main Entrance' },
      { wall: 'right', pos: 0.5, label: 'To Dining' },
      { wall: 'top', pos: 0.5, label: 'To Foyer' }
    ]
  });

  // 4. Dining & Kitchen (Agni / South-East corner)
  rooms.push({
    id: 'dining',
    name: 'Dining Lounge',
    type: 'Dining',
    x: 56,
    y: 38,
    w: 39,
    h: 15,
    color: '#FDE047',
    vastu_zone: 'East',
    doors: [
      { wall: 'bottom', pos: 0.5, label: 'To Kitchen' }
    ]
  });

  rooms.push({
    id: 'kitchen',
    name: `${kitchenType} Kitchen`,
    type: 'Kitchen',
    x: 56,
    y: 55,
    w: 39,
    h: 17,
    color: '#FCA5A5',
    vastu_zone: 'South-East (Agni)',
    doors: [
      { wall: 'top', pos: 0.5, label: 'Kitchen Door' }
    ]
  });

  // 5. Master Bedroom (Nairutya / South-West corner)
  rooms.push({
    id: 'master_bed',
    name: 'Master Suite + Wardrobe',
    type: 'Bedroom',
    x: 5,
    y: 5,
    w: 45,
    h: 30,
    color: '#DDD6FE',
    vastu_zone: 'South-West (Nairutya)',
    doors: [
      { wall: 'bottom', pos: 0.5, label: 'Bedroom Entry' },
      { wall: 'right', pos: 0.5, label: 'To En-Suite' }
    ]
  });

  // 6. Master Bathroom En-suite
  rooms.push({
    id: 'master_bath',
    name: 'En-Suite Bath',
    type: 'Bathroom',
    x: 52,
    y: 5,
    w: 20,
    h: 14,
    color: '#A5F3FC',
    vastu_zone: 'West',
    doors: [
      { wall: 'left', pos: 0.5, label: 'Bath Door' }
    ]
  });

  // 7. Common/Guest Bathroom
  rooms.push({
    id: 'common_bath',
    name: 'Powder Room / Bath',
    type: 'Bathroom',
    x: 74,
    y: 5,
    w: 21,
    h: 14,
    color: '#67E8F9',
    vastu_zone: 'North-West',
    doors: [
      { wall: 'bottom', pos: 0.5, label: 'Common Access' }
    ]
  });

  // 8. Bedroom 2 (Guest / Kids Bedroom)
  if (bedrooms >= 2) {
    rooms.push({
      id: 'bed_2',
      name: bedrooms > 2 ? 'Kids Bedroom' : 'Guest Bedroom',
      type: 'Bedroom',
      x: 52,
      y: 21,
      w: 43,
      h: 15,
      color: '#E9D5FF',
      vastu_zone: 'North-West (Vayu)',
      doors: [
        { wall: 'bottom', pos: 0.5, label: 'Door' }
      ]
    });
  }

  // Connections / corridors for visual lines
  connections.push({ from: 'living', to: 'dining', label: 'Archway' });
  connections.push({ from: 'dining', to: 'kitchen', label: 'Breakfast Bar' });
  connections.push({ from: 'living', to: 'master_bed', label: 'Private Hallway' });
  if (parkingSlots > 0) {
    connections.push({ from: 'parking', to: 'living', label: 'Front Porch' });
  }

  return {
    plotDimensions: { length: plotLength, width: plotWidth },
    rooms,
    connections,
    legend: [
      { label: 'Living & Common', color: '#93C5FD' },
      { label: 'Bedrooms', color: '#DDD6FE' },
      { label: 'Kitchen & Dining', color: '#FCA5A5' },
      { label: 'Bathrooms', color: '#A5F3FC' },
      { label: 'Parking & Porch', color: '#CBD5E1' },
      { label: 'Garden & Greenery', color: '#86EFAC' }
    ]
  };
}

// Smart Feature Filter by Tier
function filterSmartFeaturesForTier(tier, userPreferences = []) {
  const allFeatures = defaultSmartFeatures;
  if (tier === 'budget') {
    return allFeatures.filter(f => ['Lighting', 'Safety', 'Water'].includes(f.category));
  } else if (tier === 'balanced') {
    return allFeatures.filter(f => ['Lighting', 'Security', 'Climate', 'Water', 'Hub', 'Safety'].includes(f.category));
  } else {
    // Premium: includes all 10 smart features
    return allFeatures;
  }
}

// Material Recommendations for Tiers
function getMaterialRecommendationsForTier(tier) {
  const grade = tier === 'budget' ? 'Economy' : tier === 'balanced' ? 'Balanced' : 'Premium';
  const categories = ['Cement', 'Steel', 'Bricks/Blocks', 'Flooring', 'Paint', 'Doors', 'Windows', 'Roofing', 'Electrical', 'Plumbing'];

  return categories.map(cat => {
    const matched = defaultMaterials.find(m => m.category === cat && m.quality_grade === grade)
      || defaultMaterials.find(m => m.category === cat && m.quality_grade === 'Balanced')
      || defaultMaterials.find(m => m.category === cat);

    const reasons = {
      Cement: tier === 'premium' ? 'High initial compressive strength for multi-story load-bearing durability.' : 'Optimal fly-ash blend reducing shrinkage cracking and carbon footprint.',
      Steel: 'Fe-500D/550D rebar provides superior seismic ductility and tensile tolerance.',
      'Bricks/Blocks': tier === 'budget' ? 'Interlocking blocks save up to 18% mortar and plastering labor.' : 'AAC lightweight blocks offer 3x thermal insulation, drastically reducing summer AC consumption.',
      Flooring: tier === 'premium' ? 'Italian Statuario marble offers timeless grandeur and cool indoor surface temperatures.' : 'Large format vitrified tiles deliver stain resistance with minimal grout lines.',
      Paint: tier === 'premium' ? 'Teflon-infused anti-bacterial emulsion with zero volatile organic compounds (VOC).' : 'High-durability washable acrylic emulsion with low maintenance cycle.',
      Doors: tier === 'premium' ? 'Engineered solid teakwood core providing acoustic dampening and high-grade security.' : 'HDF molded waterproof flush doors for warp-free operation.',
      Windows: tier === 'premium' ? 'UPVC double-glazed Low-E profiles reduce ambient street noise by 40dB and solar heat ingress.' : 'Anodized powder-coated aluminum 3-track sliding system with integrated insect mesh.',
      Roofing: 'Solar reflective high-SRI coating paired with elastomeric waterproofing membrane to prevent terrace leakages.',
      Electrical: 'FR-LSH flame-retardant electrolytic copper wiring ensuring fire safety and minimal voltage drop.',
      Plumbing: 'Lead-free CPVC and UV-stabilized UPVC pipes certified for NSF potable drinking water.'
    };

    return {
      category: cat,
      material_name: matched.name,
      brand: matched.brand,
      price_range: `₹${matched.price_min} - ₹${matched.price_max} / ${matched.unit}`,
      quality: matched.quality_grade,
      durability: matched.durability,
      energy_efficiency: matched.energy_efficiency,
      sustainability_rating: matched.sustainability_rating,
      reason: reasons[cat] || matched.description
    };
  });
}

// Energy Efficiency Scoring & Recommendations
function evaluateEnergyEfficiency({ tier, energyPreference, hasSolar, builtUpArea }) {
  let score = 75;
  if (tier === 'balanced') score += 10;
  if (tier === 'premium') score += 15;
  if (hasSolar) score += 8;
  if (energyPreference === 'net_zero') score += 4;
  score = Math.min(98, score);

  const solarCapacityKw = Math.round((builtUpArea / 500) * 1.5 * 10) / 10;
  const annualSavingsUnits = Math.round(solarCapacityKw * 1450);

  return {
    score,
    rating: score >= 90 ? 'Net-Zero Ready (A+)' : score >= 80 ? 'Highly Efficient (A)' : 'Standard Efficient (B)',
    solarRecommendedKw: solarCapacityKw,
    estimatedAnnualSolarGenUnits: annualSavingsUnits,
    estimatedCo2ReductionTons: Math.round(annualSavingsUnits * 0.82 / 100) / 10,
    recommendations: [
      {
        feature: 'Rooftop Solar PV Installation',
        detail: `Install ${solarCapacityKw} kW on-grid solar system to generate ~${annualSavingsUnits} kWh/year.`,
        impact: 'High (60-80% electric bill offset)'
      },
      {
        feature: 'Passive Daylight & Ventilation Orientation',
        detail: 'Windows sized at 18% of floor area placed across North & East elevations maximize natural illumination.',
        impact: 'Medium (Reduces daytime lighting power)'
      },
      {
        feature: 'Thermal Insulation & Cool Roof Coating',
        detail: 'High Solar Reflectance Index (SRI) roof coating reduces heat transfer into top floors by up to 10°C.',
        impact: 'High (Reduces AC cooling tonnage required)'
      },
      {
        feature: 'Rainwater Harvesting & Ground Recharge',
        detail: 'Rainwater collection piping leading to a 3,000L filtration sump for landscaping and borewell recharge.',
        impact: 'Medium (Conserves municipal water)'
      },
      {
        feature: 'Smart Inverter & Smart Lighting Controls',
        detail: 'Motion-activated occupancy sensors and scheduled setback thermostats prevent wasteful standby draw.',
        impact: 'Medium (15-20% load optimization)'
      }
    ]
  };
}

// Vastu Scoring & Orientation Analysis
function evaluateVastu({ facing = 'East', rooms = [], vastuImportance = 'moderate' }) {
  const positivePoints = [];
  const possibleIssues = [];
  const suggestions = [];
  let score = 84;

  if (['East', 'North', 'North-East'].includes(facing)) {
    positivePoints.push(`Main plot facing ${facing} is auspicious and promotes natural morning sunlight and positive energy flow.`);
    score += 4;
  } else {
    possibleIssues.push(`Main entrance facing ${facing} can introduce direct afternoon solar glare.`);
    suggestions.push(`Install a transitional foyer or wooden decorative louvers near the entrance.`);
    score -= 3;
  }

  positivePoints.push('Kitchen positioned in the South-East (Agni zone) aligns with elemental fire principles.');
  positivePoints.push('Master Suite situated in the South-West (Nairutya corner) fosters stability and restful peace.');
  positivePoints.push('Open garden/courtyard located in the North-East maximizes subtle morning electromagnetic fields.');

  possibleIssues.push('Bathrooms adjacent to bedroom require proper ventilation shafts to prevent negative humidity.');
  suggestions.push('Keep bathroom doors consistently closed and use natural exhaust fans directed towards the West/North-West.');
  suggestions.push('Place sacred water elements or indoor plants near the North-East window of the living lounge.');

  if (vastuImportance === 'strict') {
    score = Math.min(94, Math.max(78, score + 2));
  }

  return {
    score,
    grade: score >= 88 ? 'Excellent Vastu Harmony' : score >= 80 ? 'Good Vastu Alignment' : 'Moderate Vastu Alignment',
    disclaimer: 'This Vastu analysis is provided as a computational design-assistance guide based on ancient spatial orientation principles, not professional architectural or legal advice.',
    positivePoints,
    possibleIssues,
    suggestions
  };
}

module.exports = {
  generateAiHouseDesigns,
  evaluateEnergyEfficiency,
  evaluateVastu
};
