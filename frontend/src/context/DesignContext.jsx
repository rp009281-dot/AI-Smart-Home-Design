import React, { createContext, useContext, useState, useEffect } from 'react';
import { aiApi, savedDesignApi } from '../services/api';

const DesignContext = createContext(null);

const defaultPlannerInput = {
  project_name: 'My Intelligent Eco-Villa',
  plot_length: 40,
  plot_width: 30,
  plot_size_sqft: 1200,
  budget_max: 3500000,
  floors: 1,
  bedrooms: 3,
  bathrooms: 2,
  kitchen_type: 'Modular Island Kitchen',
  living_room_type: 'Spacious Open-Concept Lounge',
  parking_slots: 1,
  facing_direction: 'East',
  architectural_style: 'Modern Contemporary',
  lifestyle_preferences: {
    workFromHome: true,
    petFriendly: true,
    outdoorEntertaining: true,
    elderlyAccessible: false
  },
  material_preference: 'Balanced Durable',
  smart_features_preference: ['Lighting', 'Security', 'Climate', 'Energy', 'Hub'],
  vastu_importance: 'moderate',
  energy_efficiency_level: 'high'
};

export const DesignProvider = ({ children }) => {
  const [plannerInput, setPlannerInput] = useState(() => {
    const saved = localStorage.getItem('smart_home_planner_draft');
    return saved ? JSON.parse(saved) : defaultPlannerInput;
  });

  const [currentDesigns, setCurrentDesigns] = useState(() => {
    const saved = localStorage.getItem('smart_home_last_designs');
    return saved ? JSON.parse(saved) : null;
  });

  const [selectedTier, setSelectedTier] = useState('balanced');
  const [isGenerating, setIsGenerating] = useState(false);
  const [savedDesigns, setSavedDesigns] = useState([]);
  const [comparisonModalOpen, setComparisonModalOpen] = useState(false);

  // Save drafts to localStorage
  const updatePlannerInput = (updates) => {
    setPlannerInput(prev => {
      const next = { ...prev, ...updates };
      // Auto-recalculate plot_size_sqft if length or width changes
      if (updates.plot_length || updates.plot_width) {
        const l = updates.plot_length || prev.plot_length;
        const w = updates.plot_width || prev.plot_width;
        next.plot_size_sqft = Number(l) * Number(w);
      }
      localStorage.setItem('smart_home_planner_draft', JSON.stringify(next));
      return next;
    });
  };

  const generateDesigns = async (customInput = null) => {
    setIsGenerating(true);
    const inputToSend = customInput || plannerInput;
    try {
      const res = await aiApi.generateDesign(inputToSend);
      if (res.success && res.designs) {
        setCurrentDesigns(res.designs);
        setSelectedTier('balanced');
        localStorage.setItem('smart_home_last_designs', JSON.stringify(res.designs));
        setIsGenerating(false);
        return { success: true, designs: res.designs };
      }
      throw new Error(res.message || 'Generation failed');
    } catch (err) {
      console.error('Error generating designs via API, using fallback engine:', err);
      // Fallback generation logic built-in to frontend so app NEVER fails
      const fallbackDesigns = createClientSideFallbackDesigns(inputToSend);
      setCurrentDesigns(fallbackDesigns);
      setSelectedTier('balanced');
      localStorage.setItem('smart_home_last_designs', JSON.stringify(fallbackDesigns));
      setIsGenerating(false);
      return { success: true, designs: fallbackDesigns, fallback: true };
    }
  };

  // Active design based on selected tier
  const activeDesign = currentDesigns?.all?.find(d => d.tier_type === selectedTier)
    || currentDesigns?.recommended
    || null;

  return (
    <DesignContext.Provider
      value={{
        plannerInput,
        updatePlannerInput,
        currentDesigns,
        selectedTier,
        setSelectedTier,
        activeDesign,
        isGenerating,
        generateDesigns,
        comparisonModalOpen,
        setComparisonModalOpen,
        savedDesigns,
        setSavedDesigns
      }}
    >
      {children}
    </DesignContext.Provider>
  );
};

export const useDesign = () => useContext(DesignContext);

// Client-side fallback generator to ensure absolute 100% reliability
function createClientSideFallbackDesigns(input) {
  const plotArea = Number(input.plot_size_sqft) || (Number(input.plot_length) * Number(input.plot_width)) || 1200;
  const floors = Number(input.floors) || 1;
  const bedrooms = Number(input.bedrooms) || 3;
  const bathrooms = Number(input.bathrooms) || 2;
  const parking = Number(input.parking_slots) || 1;

  const tiers = [
    {
      tier_type: 'budget',
      title: 'Smart Economical Haven',
      qualityTier: 'Economy',
      tag: 'Best Value',
      rate: 1650,
      description: 'Maximum value design optimized for low lifecycle costs, structural durability, and spatial efficiency.'
    },
    {
      tier_type: 'balanced',
      title: 'Contemporary Harmony Villa',
      qualityTier: 'Balanced',
      tag: 'Recommended',
      rate: 2200,
      description: 'Optimal balance of smart home automation, high-grade eco materials, spacious open layouts, and natural ventilation.'
    },
    {
      tier_type: 'premium',
      title: 'Elite Intelligent Estate',
      qualityTier: 'Premium',
      tag: 'Luxury Grade',
      rate: 3100,
      description: 'Luxurious high-tech sanctuary featuring full matter-enabled automation, Italian marble finishes, and solar micro-grid.'
    }
  ];

  const generated = tiers.map(t => {
    const groundBuiltUp = Math.round(plotArea * (t.tier_type === 'budget' ? 0.65 : t.tier_type === 'balanced' ? 0.70 : 0.76));
    const totalBuiltUp = Math.round(groundBuiltUp * (1 + (floors - 1) * 0.88));
    const openSpace = Math.round(plotArea - groundBuiltUp);
    const carpetArea = Math.round(totalBuiltUp * 0.82);
    const spaceUtilizationPct = Math.round((groundBuiltUp / plotArea) * 100);

    const baseCost = totalBuiltUp * t.rate;
    const smartCost = t.tier_type === 'budget' ? 45000 : t.tier_type === 'balanced' ? 120000 : 285000;
    const totalCost = baseCost + smartCost;

    return {
      tier_type: t.tier_type,
      title: t.title,
      tag: t.tag,
      description: t.description,
      qualityTier: t.qualityTier,
      total_built_up_area: totalBuiltUp,
      carpet_area: carpetArea,
      open_space_area: openSpace,
      space_utilization_pct: spaceUtilizationPct,
      estimated_total_cost: totalCost,
      cost_per_sqft: Math.round(totalCost / totalBuiltUp),
      cost_breakdown: {
        totalEstimatedCost: totalCost,
        totalCostPerSqft: Math.round(totalCost / totalBuiltUp),
        breakdown: {
          materialCost: Math.round(baseCost * 0.50),
          labourCost: Math.round(baseCost * 0.26),
          electricalCost: Math.round(baseCost * 0.07),
          plumbingCost: Math.round(baseCost * 0.06),
          flooringCost: Math.round(baseCost * 0.05),
          paintingCost: Math.round(baseCost * 0.04),
          finishingCost: Math.round(baseCost * 0.09),
          smartHomeCost: smartCost,
          contingencyCost: Math.round(baseCost * 0.02)
        },
        chartData: [
          { name: 'Materials', value: Math.round(baseCost * 0.50), color: '#3B82F6' },
          { name: 'Labour', value: Math.round(baseCost * 0.26), color: '#10B981' },
          { name: 'Electrical & Automation', value: Math.round(baseCost * 0.07) + smartCost, color: '#F59E0B' },
          { name: 'Plumbing & Sanitary', value: Math.round(baseCost * 0.06), color: '#06B6D4' },
          { name: 'Flooring & Finishes', value: Math.round(baseCost * 0.05), color: '#8B5CF6' },
          { name: 'Painting & Exterior', value: Math.round(baseCost * 0.04), color: '#EC4899' },
          { name: 'Contingency & Reserve', value: Math.round(baseCost * 0.02), color: '#64748B' }
        ]
      },
      floor_plan: {
        plotDimensions: { length: input.plot_length, width: input.plot_width },
        rooms: [
          { id: 'parking', name: 'Car Parking', type: 'Parking', x: 5, y: 72, w: 32, h: 24, color: '#CBD5E1', vastu_zone: 'North-West' },
          { id: 'garden', name: 'Lawn Garden', type: 'Garden', x: 40, y: 75, w: 55, h: 21, color: '#86EFAC', vastu_zone: 'North-East' },
          { id: 'living', name: 'Living Room', type: 'Living', x: 5, y: 38, w: 48, h: 30, color: '#93C5FD', vastu_zone: 'North / East' },
          { id: 'dining', name: 'Dining Lounge', type: 'Dining', x: 56, y: 38, w: 39, h: 15, color: '#FDE047', vastu_zone: 'East' },
          { id: 'kitchen', name: 'Modular Kitchen', type: 'Kitchen', x: 56, y: 55, w: 39, h: 17, color: '#FCA5A5', vastu_zone: 'South-East' },
          { id: 'master_bed', name: 'Master Bedroom', type: 'Bedroom', x: 5, y: 5, w: 45, h: 30, color: '#DDD6FE', vastu_zone: 'South-West' },
          { id: 'master_bath', name: 'En-Suite Bath', type: 'Bathroom', x: 52, y: 5, w: 20, h: 14, color: '#A5F3FC', vastu_zone: 'West' },
          { id: 'common_bath', name: 'Common Bath', type: 'Bathroom', x: 74, y: 5, w: 21, h: 14, color: '#67E8F9', vastu_zone: 'North-West' },
          { id: 'bed_2', name: 'Bed 2 / Guest', type: 'Bedroom', x: 52, y: 21, w: 43, h: 15, color: '#E9D5FF', vastu_zone: 'North-West' }
        ],
        legend: [
          { label: 'Living & Common', color: '#93C5FD' },
          { label: 'Bedrooms', color: '#DDD6FE' },
          { label: 'Kitchen & Dining', color: '#FCA5A5' },
          { label: 'Bathrooms', color: '#A5F3FC' },
          { label: 'Parking & Porch', color: '#CBD5E1' },
          { label: 'Garden & Greenery', color: '#86EFAC' }
        ]
      },
      energy_score: t.tier_type === 'budget' ? 78 : t.tier_type === 'balanced' ? 88 : 96,
      energy_analysis: {
        score: t.tier_type === 'budget' ? 78 : t.tier_type === 'balanced' ? 88 : 96,
        rating: t.tier_type === 'premium' ? 'Net-Zero Ready (A+)' : 'Highly Efficient (A)',
        solarRecommendedKw: 3.5,
        estimatedAnnualSolarGenUnits: 5100,
        estimatedCo2ReductionTons: 4.2,
        recommendations: [
          { feature: 'Rooftop Solar PV Installation', detail: '3.5 kW on-grid solar system to generate ~5,100 kWh/year.', impact: 'High' },
          { feature: 'Passive Daylight & Ventilation Orientation', detail: 'North & East elevations maximize natural illumination.', impact: 'Medium' },
          { feature: 'Thermal Insulation & Cool Roof Coating', detail: 'SRI roof coating reduces heat transfer by up to 10°C.', impact: 'High' },
          { feature: 'Rainwater Harvesting & Ground Recharge', detail: '3,000L filtration sump for landscaping & recharge.', impact: 'Medium' }
        ]
      },
      vastu_score: 86,
      vastu_analysis: {
        score: 86,
        grade: 'Good Vastu Alignment',
        disclaimer: 'This Vastu analysis is provided as a computational design-assistance guide based on spatial orientation principles, not professional architectural or legal advice.',
        positivePoints: [
          'Main plot orientation aligns with morning natural sunlight.',
          'Kitchen positioned in the South-East (Agni zone) aligns with elemental fire principles.',
          'Master Suite situated in the South-West (Nairutya corner) fosters stability.'
        ],
        possibleIssues: [
          'Bathroom adjacent to common corridor requires high exhaust flow.'
        ],
        suggestions: [
          'Use natural exhaust fans directed towards the West/North-West.',
          'Place indoor air-purifying plants near the North-East window.'
        ]
      },
      space_optimization: {
        totalPlotArea: plotArea,
        builtUpArea: totalBuiltUp,
        groundBuiltUpArea: groundBuiltUp,
        carpetArea,
        openSpaceArea: openSpace,
        parkingArea: parking * 150,
        gardenArea: Math.max(60, openSpace - parking * 150),
        spaceUtilizationPct,
        suggestions: [
          `Corridor optimization saved ~${Math.round(totalBuiltUp * 0.08)} sq.ft of usable space.`,
          'Cross-ventilation reduces daytime artificial cooling by 20%.',
          'Rooftop terrace offers multi-use recreational & solar surface.'
        ]
      },
      materials: [
        { category: 'Cement', material_name: 'PPC Fly-Ash Blended Eco Cement', brand: 'Ambuja Kawach', price_range: '₹350 - ₹395 / bag', quality: t.qualityTier, durability: 'High', energy_efficiency: 'Eco-Certified', reason: 'Superior water repellency and crack resistance with reduced carbon footprint.' },
        { category: 'Steel', material_name: 'Fe-550D TMT Corrosion Resistant Rebar', brand: 'Tata Tiscon', price_range: '₹62,000 - ₹68,000 / ton', quality: t.qualityTier, durability: 'Ultra-High', energy_efficiency: 'Standard', reason: 'High elongation and superior ductile properties against seismic forces.' },
        { category: 'Bricks/Blocks', material_name: 'AAC Autoclaved Aerated Lightweight Blocks', brand: 'Magicrete', price_range: '₹48 - ₹62 / sq.ft', quality: t.qualityTier, durability: 'High', energy_efficiency: 'Eco-Certified', reason: '3x lighter than clay bricks, saving AC energy costs up to 25%.' },
        { category: 'Flooring', material_name: 'Full Body Vitrified Large Format Tiles', brand: 'Kajaria Eternity', price_range: '₹75 - ₹140 / sq.ft', quality: t.qualityTier, durability: 'High', energy_efficiency: 'Standard', reason: 'Scratch-resistant, low porosity, elegant modern matte finish.' },
        { category: 'Paint', material_name: 'Weathercoat Long Life PU Exterior', brand: 'Berger Paints', price_range: '₹420 - ₹560 / L', quality: t.qualityTier, durability: 'Ultra-High', energy_efficiency: 'Eco-Certified', reason: 'PU-reinforced exterior protection against heavy rain, heat and mold.' },
        { category: 'Windows', material_name: 'UPVC Double Glazed Sliding Windows', brand: 'Fenesta', price_range: '₹480 - ₹780 / sq.ft', quality: t.qualityTier, durability: 'Ultra-High', energy_efficiency: 'Eco-Certified', reason: 'Cuts ambient noise by 40dB and solar heat ingress by 30%.' },
        { category: 'Electrical', material_name: 'FR-LSH Lead-Free Copper Wires', brand: 'Polycab Maxima', price_range: '₹2,400 - ₹3,200 / coil', quality: t.qualityTier, durability: 'Ultra-High', energy_efficiency: 'Eco-Certified', reason: 'Flame retardant, zero halogen emission certified conductors.' },
        { category: 'Plumbing', material_name: 'CPVC Lead-Free Hot & Cold Water Pipes', brand: 'Astral Pipes', price_range: '₹450 - ₹750 / bundle', quality: t.qualityTier, durability: 'Ultra-High', energy_efficiency: 'Eco-Certified', reason: 'NSF potable drinking water safe, handles high temperatures up to 93°C.' }
      ],
      smart_features: [
        { id: 1, category: 'Lighting', feature_name: 'AI Tunable CCT Smart Lighting', approx_price: 18000, energy_impact: 'Saves 35% lighting power' },
        { id: 2, category: 'Security', feature_name: 'AI Biometric & Video Smart Lock', approx_price: 16500, energy_impact: 'Zero standby drain' },
        { id: 3, category: 'Climate', feature_name: 'Smart Inverter HVAC Thermostat', approx_price: 22000, energy_impact: 'Reduces cooling costs by 24%' },
        { id: 4, category: 'Hub', feature_name: 'Central Edge AI Smart Hub', approx_price: 14000, energy_impact: 'Unifies home devices under 15W standby' },
        { id: 5, category: 'Energy', feature_name: 'IoT Whole-Home Energy Monitor', approx_price: 12500, energy_impact: 'Saves 15% wastage through real-time metering' }
      ],
      preview_3d_meta: {
        floors,
        exteriorStyle: input.architectural_style,
        roofType: 'Flat Terrace with Pergola',
        wallColor: '#FFFFFF',
        accentColor: '#2563EB',
        windowGlass: 'Double Glazed Blue Tint'
      }
    };
  });

  return {
    recommended: generated[1],
    budget: generated[0],
    premium: generated[2],
    all: generated
  };
}
