import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Download,
  Share2,
  Bookmark,
  CheckCircle,
  BarChart3,
  Home,
  Compass,
  Layers,
  Zap,
  Shield,
  Eye,
  Maximize2,
  ArrowRight,
  TrendingUp,
  Cpu,
  Info,
  Sliders,
  DollarSign,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useDesign } from '../context/DesignContext';
import { useAuth } from '../context/AuthContext';
import { savedDesignApi } from '../services/api';
import FloorPlanCanvas from '../components/design/FloorPlanCanvas';
import HomePreview3D from '../components/design/HomePreview3D';
import DesignComparisonModal from '../components/design/DesignComparisonModal';
import { generateDesignReportPDF } from '../utils/pdfExport';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';

export default function DesignResultsPage() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const {
    currentDesigns,
    selectedTier,
    setSelectedTier,
    activeDesign,
    plannerInput,
    generateDesigns,
    comparisonModalOpen,
    setComparisonModalOpen
  } = useDesign();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'floorplan' | 'preview3d' | 'cost' | 'materials' | 'smart' | 'vastu_energy'
  const [saveSuccessToast, setSaveSuccessToast] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Trigger celebration confetti on mount if design was just generated
  useEffect(() => {
    if (currentDesigns) {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    } else {
      // If no design loaded yet, generate one automatically from draft or defaults
      generateDesigns();
    }
  }, []);

  if (!currentDesigns || !activeDesign) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center animate-bounce">
          <Sparkles className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">Generating AI House Blueprints...</h2>
        <p className="text-sm text-slate-500 max-w-md">
          Synthesizing floor plans, calculating structural cost estimates, and optimizing space distribution.
        </p>
      </div>
    );
  }

  const handleSaveDesign = async () => {
    if (!isAuthenticated) {
      setSaveSuccessToast('Please sign in or create an account to save designs to your dashboard.');
      setTimeout(() => setSaveSuccessToast(''), 4000);
      return;
    }
    setIsSaving(true);
    try {
      await savedDesignApi.saveDesign({
        design: activeDesign,
        notes: `Saved ${activeDesign.title} (${activeDesign.tier_type})`
      });
      setSaveSuccessToast('Design successfully saved to your dashboard portfolio!');
    } catch (err) {
      setSaveSuccessToast('Saved locally in your active session.');
    } finally {
      setIsSaving(false);
      setTimeout(() => setSaveSuccessToast(''), 4000);
    }
  };

  const handleDownloadPDF = () => {
    generateDesignReportPDF({ design: activeDesign, plannerInput });
  };

  const costBreakdown = activeDesign.cost_breakdown?.breakdown || {};
  const costChartData = activeDesign.cost_breakdown?.chartData || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Toast Notification */}
      {saveSuccessToast && (
        <div className="fixed top-24 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 text-xs sm:text-sm font-medium animate-fadeIn">
          <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{saveSuccessToast}</span>
        </div>
      )}

      {/* Top Banner & Tier Switcher */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              AI Generation Completed
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {activeDesign.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
              {activeDesign.description}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setComparisonModalOpen(true)}
              className="px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-700 transition flex items-center gap-1.5"
            >
              <Sliders className="w-4 h-4 text-brand-600" />
              <span>Compare Designs</span>
            </button>

            <button
              onClick={handleSaveDesign}
              disabled={isSaving}
              className="px-4 py-2.5 rounded-xl border border-brand-200 bg-brand-50 hover:bg-brand-100 text-xs font-bold text-brand-700 transition flex items-center gap-1.5"
            >
              <Bookmark className="w-4 h-4" />
              <span>{isSaving ? 'Saving...' : 'Save Design'}</span>
            </button>

            <button
              onClick={handleDownloadPDF}
              className="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold transition shadow-sm flex items-center gap-1.5"
            >
              <Download className="w-4 h-4" />
              <span>Download Report</span>
            </button>

            <Link
              to="/planner"
              className="px-3 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-500 hover:text-slate-800 text-xs font-semibold transition"
              title="Start New Design"
            >
              <RotateCcw className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* 3 Tier Selector Tabs */}
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">
            Select Architectural Option:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {currentDesigns.all?.map((tier) => {
              const isSelected = selectedTier === tier.tier_type;
              return (
                <button
                  key={tier.tier_type}
                  onClick={() => setSelectedTier(tier.tier_type)}
                  className={`p-4 rounded-2xl border text-left transition-all relative ${
                    isSelected
                      ? 'border-brand-600 bg-brand-50/40 ring-2 ring-brand-500/20 shadow-sm'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-500 uppercase">
                      {tier.qualityTier} Grade
                    </span>
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                      tier.tier_type === 'balanced'
                        ? 'bg-emerald-100 text-emerald-800'
                        : tier.tier_type === 'premium'
                        ? 'bg-indigo-100 text-indigo-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {tier.tag}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mt-1">{tier.title}</h4>
                  <div className="mt-2 text-base font-extrabold text-brand-700">
                    ₹{(tier.estimated_total_cost / 100000).toFixed(2)} Lakh
                    <span className="text-xs font-normal text-slate-500 ml-1.5">
                      (~₹{tier.cost_per_sqft}/sq.ft)
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
        {[
          { id: 'overview', label: 'Design Overview', icon: Home },
          { id: 'floorplan', label: '2D Floor Plan', icon: Compass },
          { id: 'preview3d', label: '3D Visualizer', icon: Eye },
          { id: 'cost', label: 'Cost Breakdown', icon: DollarSign },
          { id: 'materials', label: 'Materials', icon: Layers },
          { id: 'smart', label: 'Smart Home IoT', icon: Cpu },
          { id: 'vastu_energy', label: 'Vastu & Energy', icon: Shield }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition flex items-center gap-2 ${
              activeTab === tab.id
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* TAB CONTENT: 1. OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Key KPI Cards Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-soft">
              <span className="text-xs font-bold text-slate-400 uppercase">Estimated Total Cost</span>
              <div className="text-2xl font-black text-slate-900 mt-1">
                ₹{(activeDesign.estimated_total_cost / 100000).toFixed(2)} L
              </div>
              <div className="text-xs text-brand-600 font-semibold mt-1">
                ₹{activeDesign.cost_per_sqft} / sq.ft
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-soft">
              <span className="text-xs font-bold text-slate-400 uppercase">Built-Up Area</span>
              <div className="text-2xl font-black text-slate-900 mt-1">
                {activeDesign.total_built_up_area} sq.ft
              </div>
              <div className="text-xs text-slate-500 mt-1">
                Carpet: {activeDesign.carpet_area} sq.ft
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-soft">
              <span className="text-xs font-bold text-slate-400 uppercase">Energy Score</span>
              <div className="text-2xl font-black text-emerald-600 mt-1">
                {activeDesign.energy_score} <span className="text-sm font-medium text-slate-400">/ 100</span>
              </div>
              <div className="text-xs text-emerald-700 font-medium mt-1">
                {activeDesign.energy_analysis?.rating || 'High Efficiency'}
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-soft">
              <span className="text-xs font-bold text-slate-400 uppercase">Vastu Compliance</span>
              <div className="text-2xl font-black text-brand-600 mt-1">
                {activeDesign.vastu_score} <span className="text-sm font-medium text-slate-400">/ 100</span>
              </div>
              <div className="text-xs text-brand-700 font-medium mt-1">
                {activeDesign.vastu_analysis?.grade || 'Harmonious Alignment'}
              </div>
            </div>
          </div>

          {/* Side by side: 2D Floor Plan + 3D Preview Quick Views */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Compass className="w-5 h-5 text-brand-600" />
                  <span>2D Floor Plan Preview</span>
                </h3>
                <button
                  onClick={() => setActiveTab('floorplan')}
                  className="text-xs font-bold text-brand-600 hover:underline"
                >
                  Full View & Controls →
                </button>
              </div>
              <FloorPlanCanvas floorPlan={activeDesign.floor_plan} facingDirection={plannerInput?.facing_direction} />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Eye className="w-5 h-5 text-brand-600" />
                  <span>3D Interactive Isometric Model</span>
                </h3>
                <button
                  onClick={() => setActiveTab('preview3d')}
                  className="text-xs font-bold text-brand-600 hover:underline"
                >
                  Inspect in 3D Mode →
                </button>
              </div>
              <HomePreview3D designMeta={activeDesign.preview_3d_meta} tier={activeDesign.tier_type} />
            </div>
          </div>

          {/* Space Optimization Analysis Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Space Optimization Analysis</h3>
                <p className="text-xs text-slate-500">
                  How efficiently your plot footprint is being converted into usable living spaces.
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-slate-400 uppercase">Plot Utilization</span>
                <div className="text-2xl font-black text-brand-600">
                  {activeDesign.space_utilization_pct}%
                </div>
              </div>
            </div>

            {/* Visual Breakdown Bar */}
            <div className="space-y-2">
              <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden flex shadow-inner">
                <div
                  style={{ width: `${activeDesign.space_utilization_pct * 0.7}%` }}
                  className="bg-brand-600 h-full"
                  title="Rooms & Indoor Built-up"
                ></div>
                <div
                  style={{ width: `${activeDesign.space_utilization_pct * 0.3}%` }}
                  className="bg-slate-400 h-full"
                  title="Parking & Portico"
                ></div>
                <div
                  style={{ width: `${100 - activeDesign.space_utilization_pct}%` }}
                  className="bg-emerald-400 h-full"
                  title="Open Garden & Setbacks"
                ></div>
              </div>
              <div className="flex flex-wrap items-center justify-between text-xs text-slate-600 pt-1">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-600"></span>
                  Indoor Living: {activeDesign.carpet_area} sq.ft
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span>
                  Parking: {activeDesign.space_optimization?.parkingArea || 150} sq.ft
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                  Garden / Open Courtyard: {activeDesign.open_space_area} sq.ft
                </span>
              </div>
            </div>

            {/* Spatial Suggestions */}
            <div className="pt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                AI Space Optimization Suggestions:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeDesign.space_optimization?.suggestions?.map((sug, i) => (
                  <div key={i} className="p-3 bg-slate-50 rounded-xl text-xs text-slate-700 flex items-start gap-2 border border-slate-200/60">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{sug}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: 2. 2D FLOOR PLAN */}
      {activeTab === 'floorplan' && (
        <div className="space-y-6 animate-fadeIn">
          <FloorPlanCanvas floorPlan={activeDesign.floor_plan} facingDirection={plannerInput?.facing_direction} />
        </div>
      )}

      {/* TAB CONTENT: 3. 3D PREVIEW */}
      {activeTab === 'preview3d' && (
        <div className="space-y-6 animate-fadeIn">
          <HomePreview3D designMeta={activeDesign.preview_3d_meta} tier={activeDesign.tier_type} />
        </div>
      )}

      {/* TAB CONTENT: 4. COST BREAKDOWN */}
      {activeTab === 'cost' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-soft space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <h3 className="text-2xl font-black text-slate-900">Itemized Cost Estimation</h3>
                <p className="text-xs sm:text-sm text-slate-500">
                  Calculated based on {activeDesign.total_built_up_area} sq.ft built-up area and {activeDesign.qualityTier} specifications.
                </p>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-xs text-slate-400 uppercase font-semibold">Total Turnkey Outlay</span>
                <div className="text-3xl font-black text-brand-700">
                  ₹{(activeDesign.estimated_total_cost / 100000).toFixed(2)} Lakh
                </div>
              </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Donut Chart */}
              <div className="lg:col-span-6 h-72">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider text-center mb-2">
                  Expense Distribution (% Outlay)
                </h4>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={costChartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={95}
                      paddingAngle={4}
                    >
                      {costChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(val) => `₹${Number(val).toLocaleString()}`}
                      contentStyle={{ borderRadius: '12px', border: '1px solid #E2E8F0' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Bar breakdown */}
              <div className="lg:col-span-6 space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Key Cost Categories
                </h4>
                {[
                  { label: 'Structural Materials (Cement, Steel, Bricks)', val: costBreakdown.materialCost, color: '#3B82F6' },
                  { label: 'Skilled Labour & Civil Execution', val: costBreakdown.labourCost, color: '#10B981' },
                  { label: 'Electrical Wiring & Modular Points', val: costBreakdown.electricalCost, color: '#F59E0B' },
                  { label: 'Plumbing & Sanitary Lines', val: costBreakdown.plumbingCost, color: '#06B6D4' },
                  { label: 'Flooring, Tiling & Painting Finishes', val: costBreakdown.finishingCost, color: '#8B5CF6' },
                  { label: 'Smart Home IoT & Solar Automation', val: costBreakdown.smartHomeCost, color: '#EC4899' },
                  { label: 'Contingency & Reserve Margin (2%)', val: costBreakdown.contingencyCost, color: '#64748B' }
                ].map((row, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                    <span className="font-medium text-slate-700 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: row.color }}></span>
                      {row.label}
                    </span>
                    <span className="font-bold text-slate-900">
                      ₹{Number(row.val || 0).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: 5. MATERIALS */}
      {activeTab === 'materials' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft">
            <h3 className="text-xl font-bold text-slate-900">
              Recommended Building Materials ({activeDesign.qualityTier} Tier)
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mb-6">
              Tailored structural and finishing materials selected for longevity, seismic stability, and thermal efficiency.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeDesign.materials?.map((mat, i) => (
                <div key={i} className="p-5 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-brand-600 uppercase">
                        {mat.category}
                      </span>
                      <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                        {mat.quality} Grade
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 mt-1">{mat.material_name}</h4>
                    {mat.brand && (
                      <span className="text-xs font-medium text-slate-400 block mt-0.5">Brand: {mat.brand}</span>
                    )}
                    <div className="text-xs font-semibold text-emerald-700 mt-2">
                      Price: {mat.price_range}
                    </div>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                      {mat.reason}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Durability: <strong className="text-slate-700">{mat.durability}</strong></span>
                    <span>Energy: <strong className="text-slate-700">{mat.energy_efficiency}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: 6. SMART HOME IOT */}
      {activeTab === 'smart' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Integrated Smart Home & Automation Ecosystem
                </h3>
                <p className="text-xs sm:text-sm text-slate-500">
                  Pre-configured IoT modules to be pre-wired into structural slabs and conduit chases.
                </p>
              </div>
              <span className="text-xs font-bold bg-amber-50 text-amber-800 px-3 py-1 rounded-full border border-amber-200">
                {activeDesign.smart_features?.length || 5} Devices Planned
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeDesign.smart_features?.map((feature, i) => (
                <div key={i} className="p-5 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-amber-600 uppercase">
                        {feature.category}
                      </span>
                      <span className="text-xs font-bold text-slate-900">
                        ₹{Number(feature.approx_price).toLocaleString()}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 mt-1">{feature.feature_name}</h4>
                    <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 text-[11px] text-emerald-700 font-medium flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 shrink-0" />
                    <span>{feature.energy_impact}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: 7. VASTU & ENERGY */}
      {activeTab === 'vastu_energy' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fadeIn">
          {/* Vastu Checker Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Vastu Harmony Evaluation</h3>
                <p className="text-xs text-slate-500">
                  Orientation scoring based on ancient spatial orientation principles.
                </p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-200 flex flex-col items-center justify-center">
                <span className="text-lg font-black text-indigo-700">{activeDesign.vastu_score}</span>
                <span className="text-[9px] text-indigo-400 font-bold uppercase">/ 100</span>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Positive Alignments</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-600">
                {activeDesign.vastu_analysis?.positivePoints?.map((p, i) => (
                  <li key={i} className="flex items-start gap-2 bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>

              <h4 className="text-xs font-bold text-amber-700 uppercase tracking-wider flex items-center gap-1.5 pt-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Corrective Suggestions</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-600">
                {activeDesign.vastu_analysis?.suggestions?.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 bg-amber-50/50 p-2.5 rounded-xl border border-amber-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0"></span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-[11px] text-slate-400 italic pt-2 border-t border-slate-100">
              {activeDesign.vastu_analysis?.disclaimer}
            </p>
          </div>

          {/* Energy Efficiency Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Energy & Eco-Efficiency</h3>
                <p className="text-xs text-slate-500">
                  Solar forecasting, natural daylighting, and carbon reduction metrics.
                </p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col items-center justify-center">
                <span className="text-lg font-black text-emerald-700">{activeDesign.energy_score}</span>
                <span className="text-[9px] text-emerald-500 font-bold uppercase">/ 100</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-[11px] text-slate-400 block font-semibold">Recommended Solar PV</span>
                <span className="text-lg font-black text-slate-900">
                  {activeDesign.energy_analysis?.solarRecommendedKw || 3.5} kW
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-[11px] text-slate-400 block font-semibold">CO₂ Offset / Year</span>
                <span className="text-lg font-black text-emerald-600">
                  ~{activeDesign.energy_analysis?.estimatedCo2ReductionTons || 4.2} Tons
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Eco Architectural Recommendations:
              </h4>
              <div className="space-y-2">
                {activeDesign.energy_analysis?.recommendations?.map((r, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 text-xs space-y-1">
                    <div className="flex items-center justify-between font-bold text-slate-900">
                      <span>{r.feature}</span>
                      <span className="text-[10px] text-brand-700 bg-brand-50 px-2 py-0.5 rounded-full">{r.impact}</span>
                    </div>
                    <p className="text-slate-500">{r.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Comparison Modal */}
      <DesignComparisonModal
        isOpen={comparisonModalOpen}
        onClose={() => setComparisonModalOpen(false)}
        designs={currentDesigns}
        onSelectTier={(tier) => setSelectedTier(tier)}
      />
    </div>
  );
}
