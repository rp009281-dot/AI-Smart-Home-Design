import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Compass,
  Home,
  Users,
  Layers,
  Cpu,
  Zap,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Save,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  Shield,
  HelpCircle
} from 'lucide-react';
import { useDesign } from '../context/DesignContext';

export default function PlannerPage() {
  const navigate = useNavigate();
  const { plannerInput, updatePlannerInput, generateDesigns, isGenerating } = useDesign();
  const [currentStep, setCurrentStep] = useState(1);
  const [saveToast, setSaveToast] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const totalSteps = 6;

  const stepsMeta = [
    { num: 1, title: 'Plot Details', icon: Compass },
    { num: 2, title: 'Home Rooms', icon: Home },
    { num: 3, title: 'Lifestyle', icon: Users },
    { num: 4, title: 'Materials', icon: Layers },
    { num: 5, title: 'Smart Home', icon: Cpu },
    { num: 6, title: 'Vastu & Energy', icon: Zap }
  ];

  const handleNext = () => {
    setErrorMsg('');
    // Validation for Step 1
    if (currentStep === 1) {
      if (!plannerInput.plot_length || Number(plannerInput.plot_length) <= 0) {
        setErrorMsg('Please specify a valid plot length in feet.');
        return;
      }
      if (!plannerInput.plot_width || Number(plannerInput.plot_width) <= 0) {
        setErrorMsg('Please specify a valid plot width in feet.');
        return;
      }
    }
    // Validation for Step 2
    if (currentStep === 2) {
      if (!plannerInput.bedrooms || Number(plannerInput.bedrooms) < 1) {
        setErrorMsg('Please specify at least 1 bedroom.');
        return;
      }
    }

    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    setErrorMsg('');
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handleSaveDraft = () => {
    localStorage.setItem('smart_home_planner_draft', JSON.stringify(plannerInput));
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      const res = await generateDesigns();
      if (res.success) {
        navigate('/results');
      }
    } catch (err) {
      setErrorMsg('Failed to generate design. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-bold text-brand-600 uppercase tracking-wider bg-brand-50 px-3.5 py-1 rounded-full border border-brand-200">
          Smart Home Architectural Wizard
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Smart Home Planner
        </h1>
        <p className="text-sm sm:text-base text-slate-500 max-w-xl mx-auto">
          Customize your dimensions, spatial priorities, smart home automation, and budget to generate tailored designs.
        </p>
      </div>

      {/* Save Draft Floating Notification */}
      {saveToast && (
        <div className="fixed top-24 right-6 z-50 bg-emerald-600 text-white px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 text-xs font-semibold animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          <span>Progress saved to draft!</span>
        </div>
      )}

      {/* Step Progress Indicator */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-soft">
        <div className="grid grid-cols-6 gap-2 text-center">
          {stepsMeta.map((s) => {
            const isCompleted = currentStep > s.num;
            const isCurrent = currentStep === s.num;
            return (
              <button
                key={s.num}
                onClick={() => setCurrentStep(s.num)}
                className="group flex flex-col items-center focus:outline-none"
              >
                <div
                  className={`w-9 h-9 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center text-xs sm:text-sm font-bold transition-all ${
                    isCurrent
                      ? 'bg-brand-600 text-white ring-4 ring-brand-100 shadow-md'
                      : isCompleted
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <s.icon className="w-5 h-5" />}
                </div>
                <span className={`text-[10px] sm:text-xs font-semibold mt-2 hidden sm:block truncate max-w-[80px] ${
                  isCurrent ? 'text-brand-700' : 'text-slate-500'
                }`}>
                  {s.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Linear progress bar */}
        <div className="mt-4 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-brand-600 h-full transition-all duration-300 ease-out"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Form Error Banner */}
      {errorMsg && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-xs sm:text-sm text-rose-700 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Form Body Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-soft">
        {/* STEP 1: Plot Details */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Step 1: Plot Details</h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Specify your land dimensions and orientation to calculate ground coverage and setbacks.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Project Title / Name
                </label>
                <input
                  type="text"
                  value={plannerInput.project_name}
                  onChange={(e) => updatePlannerInput({ project_name: e.target.value })}
                  placeholder="e.g. Dream Haven Villa"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 transition text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Plot Facing Direction
                </label>
                <select
                  value={plannerInput.facing_direction}
                  onChange={(e) => updatePlannerInput({ facing_direction: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 transition text-sm bg-white"
                >
                  <option value="East">East (Most Auspicious for Vastu)</option>
                  <option value="North">North (Wealth & Abundance)</option>
                  <option value="North-East">North-East (Ishanya Zone)</option>
                  <option value="West">West (Sunset Natural Warmth)</option>
                  <option value="South">South (Requires Front Porch Shading)</option>
                  <option value="North-West">North-West (Vayu Zone)</option>
                  <option value="South-East">South-East (Agni Zone)</option>
                  <option value="South-West">South-West (Nairutya Zone)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Plot Length (Feet)
                </label>
                <input
                  type="number"
                  min="15"
                  max="200"
                  value={plannerInput.plot_length}
                  onChange={(e) => updatePlannerInput({ plot_length: Number(e.target.value) })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 transition text-sm"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">Front to back depth</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Plot Width (Feet)
                </label>
                <input
                  type="number"
                  min="15"
                  max="150"
                  value={plannerInput.plot_width}
                  onChange={(e) => updatePlannerInput({ plot_width: Number(e.target.value) })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 transition text-sm"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">Road frontage width</span>
              </div>
            </div>

            {/* Calculated Area Preview Banner */}
            <div className="p-4 bg-brand-50/70 border border-brand-200/60 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-xs text-brand-800 font-medium">Computed Total Plot Area</span>
                <div className="text-xl font-black text-brand-900">
                  {plannerInput.plot_size_sqft} sq.ft
                </div>
              </div>
              <div className="text-right text-xs text-slate-500">
                approx {(plannerInput.plot_size_sqft / 9).toFixed(1)} sq.yards
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Home Requirements */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Step 2: Home Requirements</h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Define the number of floors, bedrooms, bathrooms, and room styles.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Number of Floors
                </label>
                <select
                  value={plannerInput.floors}
                  onChange={(e) => updatePlannerInput({ floors: Number(e.target.value) })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm bg-white"
                >
                  <option value={1}>Ground Floor Only (1 Floor)</option>
                  <option value={2}>G + 1 (Duplex / 2 Floors)</option>
                  <option value={3}>G + 2 (Triplex / 3 Floors)</option>
                  <option value={4}>G + 3 (4 Floors)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Bedrooms (BHK)
                </label>
                <select
                  value={plannerInput.bedrooms}
                  onChange={(e) => updatePlannerInput({ bedrooms: Number(e.target.value) })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm bg-white"
                >
                  <option value={1}>1 Bedroom</option>
                  <option value={2}>2 Bedrooms</option>
                  <option value={3}>3 Bedrooms</option>
                  <option value={4}>4 Bedrooms</option>
                  <option value={5}>5+ Bedrooms</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Bathrooms
                </label>
                <select
                  value={plannerInput.bathrooms}
                  onChange={(e) => updatePlannerInput({ bathrooms: Number(e.target.value) })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm bg-white"
                >
                  <option value={1}>1 Bathroom</option>
                  <option value={2}>2 Bathrooms</option>
                  <option value={3}>3 Bathrooms</option>
                  <option value={4}>4 Bathrooms</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Kitchen Preference
                </label>
                <select
                  value={plannerInput.kitchen_type}
                  onChange={(e) => updatePlannerInput({ kitchen_type: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm bg-white"
                >
                  <option value="Modular Island Kitchen">Modular Island Kitchen (Open)</option>
                  <option value="Enclosed Traditional Kitchen">Enclosed Traditional Kitchen</option>
                  <option value="L-Shaped Compact Modular">L-Shaped Compact Modular</option>
                  <option value="Parallel Chef Style">Parallel Chef Style with Utility</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Living Room Layout
                </label>
                <select
                  value={plannerInput.living_room_type}
                  onChange={(e) => updatePlannerInput({ living_room_type: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm bg-white"
                >
                  <option value="Spacious Open-Concept Lounge">Spacious Open-Concept Lounge</option>
                  <option value="Formal Drawing + Family Living">Formal Drawing + Family Living</option>
                  <option value="Double-Height Luxury Lounge">Double-Height Luxury Lounge</option>
                  <option value="Cozy Minimalist Living">Cozy Minimalist Living</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Car Parking Capacity
                </label>
                <select
                  value={plannerInput.parking_slots}
                  onChange={(e) => updatePlannerInput({ parking_slots: Number(e.target.value) })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm bg-white"
                >
                  <option value={0}>No Dedicated Car Parking</option>
                  <option value={1}>1 Car Covered Parking</option>
                  <option value={2}>2 Cars (Side-by-Side or Tandem)</option>
                  <option value={3}>3+ Cars (Large Portico)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Architectural Style
                </label>
                <select
                  value={plannerInput.architectural_style}
                  onChange={(e) => updatePlannerInput({ architectural_style: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm bg-white"
                >
                  <option value="Modern Contemporary">Modern Contemporary</option>
                  <option value="Minimalist">Minimalist Japanese / Scandinavian</option>
                  <option value="Traditional / Kerala">Traditional / Sloped Clay Roof</option>
                  <option value="Neo-Classical">Neo-Classical Villa</option>
                  <option value="Eco Biophilic">Eco Biophilic & Courtyard</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Lifestyle Preferences */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Step 3: Lifestyle Preferences</h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Tailor acoustic zones, circulation pathways, and outdoor interaction.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  key: 'workFromHome',
                  title: 'Dedicated Home Office / Study Nook',
                  desc: 'Acoustically buffered quiet zone for remote work & video calls'
                },
                {
                  key: 'petFriendly',
                  title: 'Pet Friendly Space & Scratch-Proof Surfaces',
                  desc: 'Durable vitrified flooring, easy garden access, and wash nook'
                },
                {
                  key: 'outdoorEntertaining',
                  title: 'Outdoor Entertaining & Terrace BBQ',
                  desc: 'Spacious balcony deck or green lawn for hosting guests'
                },
                {
                  key: 'elderlyAccessible',
                  title: 'Elderly / Universal Accessibility',
                  desc: 'Ground floor master suite, zero-threshold doors, wide corridors'
                }
              ].map((item) => {
                const isChecked = !!plannerInput.lifestyle_preferences?.[item.key];
                return (
                  <div
                    key={item.key}
                    onClick={() => {
                      updatePlannerInput({
                        lifestyle_preferences: {
                          ...plannerInput.lifestyle_preferences,
                          [item.key]: !isChecked
                        }
                      });
                    }}
                    className={`p-5 rounded-2xl border cursor-pointer transition-all flex items-start gap-4 ${
                      isChecked
                        ? 'border-brand-500 bg-brand-50/40 ring-1 ring-brand-500'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {}}
                      className="mt-1 w-4 h-4 text-brand-600 rounded border-slate-300 pointer-events-none"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 4: Materials & Finishing */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Step 4: Materials & Construction Quality</h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Select your preferred quality grade, finishing level, and total target budget.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Total Budget Ceiling (₹ INR)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="1000000"
                  step="50000"
                  value={plannerInput.budget_max}
                  onChange={(e) => updatePlannerInput({ budget_max: Number(e.target.value) })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-900"
                />
                <span className="absolute right-4 top-3.5 text-xs font-semibold text-slate-400">
                  ₹{(plannerInput.budget_max / 100000).toFixed(2)} Lakh
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Construction Finishing Grade
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  {
                    tier: 'Economy',
                    title: 'Standard Economical',
                    rate: '₹1,650 / sq.ft',
                    desc: 'Fly-ash bricks, ceramic flooring, standard CPVC pipes, washable emulsion paint.'
                  },
                  {
                    tier: 'Balanced Durable',
                    title: 'Balanced Premium',
                    rate: '₹2,200 / sq.ft',
                    desc: 'AAC lightweight blocks, vitrified large format tiles, UPVC windows, PU exterior.'
                  },
                  {
                    tier: 'Luxury',
                    title: 'Luxury Villa Grade',
                    rate: '₹3,100 / sq.ft',
                    desc: 'Italian marble, solid teak doors, Low-E double glazing, anti-bacterial luxury paint.'
                  }
                ].map((item) => {
                  const isSelected = plannerInput.material_preference === item.tier;
                  return (
                    <div
                      key={item.tier}
                      onClick={() => updatePlannerInput({ material_preference: item.tier })}
                      className={`p-5 rounded-2xl border cursor-pointer transition ${
                        isSelected
                          ? 'border-brand-600 bg-brand-50/50 ring-2 ring-brand-500/20'
                          : 'border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-[11px] font-bold text-brand-600">{item.rate}</span>
                      <h4 className="text-sm font-bold text-slate-900 mt-1">{item.title}</h4>
                      <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{item.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: Smart Home Requirements */}
        {currentStep === 5 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Step 5: Smart Home Requirements</h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Pick the IoT systems and automation features you want integrated into your blueprints.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { name: 'Lighting', label: 'AI Circadian Tunable Smart Lighting', desc: 'Auto-adjusts warm/cool white based on natural daylight' },
                { name: 'Security', label: 'Biometric AI Video Door Lock & Cameras', desc: 'Keyless entry, visitor chime cameras, motion alerts' },
                { name: 'Climate', label: 'Smart Thermostat & Inverter AC Controller', desc: 'Reduces HVAC cooling power by up to 28%' },
                { name: 'Energy', label: 'Rooftop Solar PV & IoT Energy Monitor', desc: 'Panel-level wattage monitoring and net metering' },
                { name: 'Water', label: 'Ultrasonic Automated Water Tank Manager', desc: 'Prevents tank overflow and pump motor dry-runs' },
                { name: 'Hub', label: 'Matter & Zigbee Edge Smart Hub', desc: 'Unified local dashboard without internet dependency' }
              ].map((feature) => {
                const isSelected = (plannerInput.smart_features_preference || []).includes(feature.name);
                return (
                  <div
                    key={feature.name}
                    onClick={() => {
                      const cur = plannerInput.smart_features_preference || [];
                      const updated = isSelected
                        ? cur.filter(f => f !== feature.name)
                        : [...cur, feature.name];
                      updatePlannerInput({ smart_features_preference: updated });
                    }}
                    className={`p-5 rounded-2xl border cursor-pointer transition ${
                      isSelected
                        ? 'border-brand-500 bg-brand-50/40 ring-1 ring-brand-500'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-slate-900">{feature.label}</h4>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => {}}
                        className="w-4 h-4 text-brand-600 rounded pointer-events-none"
                      />
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{feature.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 6: Vastu & Energy Preferences */}
        {currentStep === 6 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Step 6: Vastu & Energy Preferences</h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Fine-tune directional harmony and environmental sustainability parameters.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Vastu Compliance Priority
                </label>
                <select
                  value={plannerInput.vastu_importance}
                  onChange={(e) => updatePlannerInput({ vastu_importance: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm bg-white"
                >
                  <option value="moderate">Moderate (Standard room zones & kitchen in Agni)</option>
                  <option value="strict">Strict (Strict elemental compliance & remedies)</option>
                  <option value="none">Flexible (Prioritize maximum spatial openness)</option>
                </select>
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Design assistance advice based on spatial orientation
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Target Energy Efficiency
                </label>
                <select
                  value={plannerInput.energy_efficiency_level}
                  onChange={(e) => updatePlannerInput({ energy_efficiency_level: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm bg-white"
                >
                  <option value="high">High Efficiency (30-40% savings with solar & LED)</option>
                  <option value="net_zero">Net-Zero Ready (Full solar, cool roof, Low-E glass)</option>
                  <option value="standard">Standard Grid Compliant</option>
                </select>
              </div>
            </div>

            {/* Submission Summary Box */}
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <h4 className="text-sm font-bold text-slate-900">Summary Before Generation:</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 block">Plot Dimensions:</span>
                  <span className="font-semibold text-slate-800">{plannerInput.plot_length}' × {plannerInput.plot_width}' ({plannerInput.plot_size_sqft} sq.ft)</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Configuration:</span>
                  <span className="font-semibold text-slate-800">{plannerInput.bedrooms} BHK | {plannerInput.floors} Floor(s)</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Target Budget:</span>
                  <span className="font-semibold text-slate-800">₹{(plannerInput.budget_max / 100000).toFixed(1)} Lakh</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Facing:</span>
                  <span className="font-semibold text-brand-600">{plannerInput.facing_direction}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer Navigation Bar */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handlePrev}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold transition flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleSaveDraft}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-medium transition flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              <span>Save Draft</span>
            </button>
          </div>

          <div>
            {currentStep < totalSteps ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold transition shadow-sm flex items-center gap-2"
              >
                <span>Continue Next</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                disabled={isGenerating}
                onClick={handleGenerate}
                className="px-8 py-3 rounded-2xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 text-white text-sm font-bold shadow-md hover:shadow-lg transition flex items-center gap-2 disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Computing 3 House Layouts...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate AI Designs</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
