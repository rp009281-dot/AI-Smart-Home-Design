import React from 'react';
import { X, Check, ShieldCheck, Zap, DollarSign, Home, Compass } from 'lucide-react';

export default function DesignComparisonModal({ isOpen, onClose, designs, onSelectTier }) {
  if (!isOpen || !designs || !designs.all) return null;

  const allTiers = designs.all;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-100 flex items-center justify-between z-10">
          <div>
            <h3 className="text-xl font-bold text-slate-900">Compare Architectural Options</h3>
            <p className="text-sm text-slate-500">
              Side-by-side comparative analysis of Budget, Balanced, and Premium architectural tiers.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comparison Grid */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {allTiers.map((tier) => {
              const isRecommended = tier.tier_type === 'balanced';
              return (
                <div
                  key={tier.tier_type}
                  className={`rounded-2xl border p-5 flex flex-col justify-between transition relative ${
                    isRecommended
                      ? 'border-brand-500 bg-brand-50/20 shadow-md ring-2 ring-brand-500/20'
                      : 'border-slate-200 bg-white shadow-xs'
                  }`}
                >
                  {isRecommended && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-600 text-white text-[11px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                      Recommended
                    </span>
                  )}

                  <div>
                    <span className="text-xs font-semibold text-brand-600 uppercase tracking-wider">
                      {tier.qualityTier} Grade
                    </span>
                    <h4 className="text-lg font-bold text-slate-900 mt-1">{tier.title}</h4>
                    <p className="text-xs text-slate-500 mt-1.5 leading-relaxed min-h-[48px]">
                      {tier.description}
                    </p>

                    {/* Price Block */}
                    <div className="mt-4 pt-4 border-t border-slate-100">
                      <div className="text-2xl font-extrabold text-slate-900">
                        ₹{(tier.estimated_total_cost / 100000).toFixed(2)} Lakh
                      </div>
                      <div className="text-xs text-slate-500">
                        approx ₹{tier.cost_per_sqft} / sq.ft
                      </div>
                    </div>

                    {/* Metric Rows */}
                    <div className="mt-5 space-y-3 text-xs">
                      <div className="flex items-center justify-between py-1 border-b border-slate-100">
                        <span className="text-slate-500 flex items-center gap-1.5">
                          <Home className="w-3.5 h-3.5 text-slate-400" /> Built-up Area
                        </span>
                        <span className="font-semibold text-slate-800">{tier.total_built_up_area} sq.ft</span>
                      </div>

                      <div className="flex items-center justify-between py-1 border-b border-slate-100">
                        <span className="text-slate-500 flex items-center gap-1.5">
                          <Compass className="w-3.5 h-3.5 text-slate-400" /> Space Efficiency
                        </span>
                        <span className="font-semibold text-slate-800">{tier.space_utilization_pct}%</span>
                      </div>

                      <div className="flex items-center justify-between py-1 border-b border-slate-100">
                        <span className="text-slate-500 flex items-center gap-1.5">
                          <Zap className="w-3.5 h-3.5 text-amber-500" /> Energy Score
                        </span>
                        <span className="font-bold text-emerald-600">{tier.energy_score}/100</span>
                      </div>

                      <div className="flex items-center justify-between py-1 border-b border-slate-100">
                        <span className="text-slate-500 flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" /> Vastu Score
                        </span>
                        <span className="font-bold text-brand-600">{tier.vastu_score}/100</span>
                      </div>

                      <div className="flex items-center justify-between py-1 border-b border-slate-100">
                        <span className="text-slate-500">Smart Features</span>
                        <span className="font-semibold text-slate-800">{tier.smart_features?.length || 5} included</span>
                      </div>
                    </div>

                    {/* Highlights bullets */}
                    <div className="mt-4">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Key Highlights</span>
                      <ul className="mt-2 space-y-1.5 text-xs text-slate-600">
                        <li className="flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                          <span>{tier.tier_type === 'budget' ? 'Fly-ash lightweight bricks' : tier.tier_type === 'balanced' ? 'AAC thermal aerated blocks' : 'Italian marble + solid teakwood'}</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                          <span>{tier.tier_type === 'budget' ? 'Core smart security & lighting' : tier.tier_type === 'balanced' ? 'Full IoT climate & energy monitor' : 'Edge AI automation hub + solar PV'}</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Select CTA */}
                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <button
                      onClick={() => {
                        onSelectTier(tier.tier_type);
                        onClose();
                      }}
                      className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
                        isRecommended
                          ? 'bg-brand-600 text-white hover:bg-brand-700 shadow-sm'
                          : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                      }`}
                    >
                      View & Select This Design
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
