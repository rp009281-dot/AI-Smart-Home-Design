import React, { useState } from 'react';
import {
  DollarSign,
  Layers,
  Users,
  Zap,
  Droplets,
  Paintbrush,
  Cpu,
  ShieldCheck,
  TrendingUp,
  Sliders,
  HelpCircle,
  FileSpreadsheet
} from 'lucide-react';
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

export default function CostEstimationPage() {
  // Interactive Simulator State
  const [areaSqft, setAreaSqft] = useState(1500);
  const [floors, setFloors] = useState(1);
  const [tier, setTier] = useState('Balanced');
  const [style, setStyle] = useState('Modern Contemporary');
  const [smartPack, setSmartPack] = useState('Essential'); // 'None', 'Essential', 'Advanced', 'Ultra'

  // Dynamic calculation
  const baseRates = {
    Economy: 1650,
    Balanced: 2200,
    Premium: 3100,
    Luxury: 4400
  };

  const smartPackCosts = {
    None: 0,
    Essential: 45000,
    Advanced: 125000,
    Ultra: 295000
  };

  const floorMultiplier = 1 + (floors - 1) * 0.06;
  const effectiveRate = Math.round(baseRates[tier] * floorMultiplier);
  const coreCost = Math.round(areaSqft * effectiveRate);
  const smartCost = smartPackCosts[smartPack];

  const materialCost = Math.round(coreCost * 0.50);
  const labourCost = Math.round(coreCost * 0.26);
  const electricalCost = Math.round(coreCost * 0.07);
  const plumbingCost = Math.round(coreCost * 0.06);
  const flooringCost = Math.round(coreCost * 0.05);
  const paintingCost = Math.round(coreCost * 0.04);
  const contingencyCost = Math.round(coreCost * 0.02);
  const finishingCost = flooringCost + paintingCost;

  const totalCost = coreCost + smartCost;
  const costPerSqft = Math.round(totalCost / Math.max(1, areaSqft));

  const chartData = [
    { name: 'Structural Materials', value: materialCost, color: '#3B82F6' },
    { name: 'Civil Labour', value: labourCost, color: '#10B981' },
    { name: 'Electrical & Automation', value: electricalCost + smartCost, color: '#F59E0B' },
    { name: 'Plumbing & Drainage', value: plumbingCost, color: '#06B6D4' },
    { name: 'Flooring Finishes', value: flooringCost, color: '#8B5CF6' },
    { name: 'Painting & Waterproofing', value: paintingCost, color: '#EC4899' },
    { name: 'Contingency Reserve (2%)', value: contingencyCost, color: '#64748B' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Title */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold text-brand-600 uppercase tracking-wider bg-brand-50 px-3.5 py-1.5 rounded-full border border-brand-100">
          Dynamic Cost Engineering Studio
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Construction Cost Estimator
        </h1>
        <p className="text-slate-600 text-sm sm:text-base">
          Adjust built-up area, quality tiers, and smart ecosystems in real-time to preview accurate line-item budgets.
        </p>
      </div>

      {/* Simulator Inputs & Top Output Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Interactive Sliders Card */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-6">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Sliders className="w-5 h-5 text-brand-600" />
            <span>Interactive Parameters</span>
          </h3>

          {/* Area Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-slate-700">
              <span>Total Built-Up Area</span>
              <span className="text-brand-600 font-mono text-sm">{areaSqft} sq.ft</span>
            </div>
            <input
              type="range"
              min="500"
              max="6000"
              step="50"
              value={areaSqft}
              onChange={(e) => setAreaSqft(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
            />
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>500 sq.ft (Compact)</span>
              <span>6,000 sq.ft (Estate)</span>
            </div>
          </div>

          {/* Floors Picker */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 uppercase">
              Number of Floors
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((f) => (
                <button
                  key={f}
                  onClick={() => setFloors(f)}
                  className={`py-2 text-xs font-bold rounded-xl border transition ${
                    floors === f
                      ? 'bg-brand-600 text-white border-brand-600 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {f === 1 ? '1 Floor' : `G+${f - 1}`}
                </button>
              ))}
            </div>
          </div>

          {/* Quality Tier */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 uppercase">
              Material & Finishing Grade
            </label>
            <div className="grid grid-cols-2 gap-2">
              {['Economy', 'Balanced', 'Premium', 'Luxury'].map((t) => (
                <button
                  key={t}
                  onClick={() => setTier(t)}
                  className={`p-3 rounded-xl border text-left transition ${
                    tier === t
                      ? 'border-brand-600 bg-brand-50/50 ring-1 ring-brand-500'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <span className="text-xs font-bold text-slate-900 block">{t}</span>
                  <span className="text-[11px] text-brand-600 font-semibold">₹{baseRates[t]}/sq.ft</span>
                </button>
              ))}
            </div>
          </div>

          {/* Smart Home Automation Tier */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 uppercase">
              Smart Automation Package
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'None', label: 'Conventional', cost: '₹0' },
                { id: 'Essential', label: 'Essential IoT', cost: '+₹45K' },
                { id: 'Advanced', label: 'Advanced Hub', cost: '+₹1.25L' },
                { id: 'Ultra', label: 'Full Solar & AI', cost: '+₹2.95L' }
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSmartPack(p.id)}
                  className={`p-2.5 rounded-xl border text-left transition ${
                    smartPack === p.id
                      ? 'border-amber-500 bg-amber-50/40 ring-1 ring-amber-500'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <span className="text-xs font-bold text-slate-900 block">{p.label}</span>
                  <span className="text-[10px] text-amber-700 font-semibold">{p.cost}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Calculated Metrics & Chart */}
        <div className="lg:col-span-7 space-y-6">
          {/* Key Output Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-brand-600 to-brand-800 text-white p-6 rounded-3xl shadow-lg space-y-1">
              <span className="text-xs font-medium text-brand-200 uppercase tracking-wider">
                Total Estimated Outlay
              </span>
              <div className="text-3xl sm:text-4xl font-black">
                ₹{(totalCost / 100000).toFixed(2)} Lakh
              </div>
              <div className="text-xs text-brand-200 pt-1">
                Based on current market rates & regional labor index
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-soft space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Turnkey Rate per Sq.Ft
              </span>
              <div className="text-3xl sm:text-4xl font-black text-slate-900">
                ₹{costPerSqft} <span className="text-sm font-normal text-slate-400">/ sq.ft</span>
              </div>
              <div className="text-xs text-emerald-600 font-semibold pt-1">
                {tier} specifications with {floors} level(s)
              </div>
            </div>
          </div>

          {/* Donut Chart & Detailed Line-Items */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-6">
            <h4 className="text-base font-bold text-slate-900">
              Categorized Cost Distribution
            </h4>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                  >
                    {chartData.map((entry, index) => (
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                { label: 'Structural Materials', val: materialCost, color: '#3B82F6' },
                { label: 'Civil Labour Execution', val: labourCost, color: '#10B981' },
                { label: 'Electrical Wiring', val: electricalCost, color: '#F59E0B' },
                { label: 'Plumbing & Drainage', val: plumbingCost, color: '#06B6D4' },
                { label: 'Flooring & Painting', val: finishingCost, color: '#8B5CF6' },
                { label: 'Smart Tech / Solar', val: smartCost, color: '#EC4899' }
              ].map((item, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2 text-slate-700">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                    {item.label}
                  </span>
                  <span className="font-bold text-slate-900 font-mono">
                    ₹{item.val.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
