import React, { useState, useEffect } from 'react';
import {
  Layers,
  Search,
  Filter,
  CheckCircle,
  ShieldCheck,
  Zap,
  Info,
  Sparkles,
  Leaf
} from 'lucide-react';
import { materialsApi } from '../services/api';

export default function MaterialsPage() {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [qualityFilter, setQualityFilter] = useState('All');

  const categories = [
    'All',
    'Cement',
    'Steel',
    'Bricks/Blocks',
    'Flooring',
    'Paint',
    'Doors',
    'Windows',
    'Roofing',
    'Electrical',
    'Plumbing'
  ];

  useEffect(() => {
    async function loadMaterials() {
      try {
        const res = await materialsApi.getMaterials();
        if (res.success && res.materials) {
          setMaterials(res.materials);
        }
      } catch (err) {
        console.error('Failed to load materials from API, fallback used:', err);
      } finally {
        setLoading(false);
      }
    }
    loadMaterials();
  }, []);

  const filteredMaterials = materials.filter(m => {
    const matchesCategory = selectedCategory === 'All' || m.category === selectedCategory;
    const matchesQuality = qualityFilter === 'All' || m.quality_grade === qualityFilter;
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (m.brand && m.brand.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (m.description && m.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesQuality && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold text-brand-600 uppercase tracking-wider bg-brand-50 px-3.5 py-1.5 rounded-full border border-brand-100">
          Structural Engineering & Finishing Catalog
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Recommended Materials & Standards
        </h1>
        <p className="text-slate-600 text-sm sm:text-base">
          Engineered recommendations evaluating tensile strength, thermal resistance, eco-sustainability, and market price predictability.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
            <input
              type="text"
              placeholder="Search by material name, brand, or feature..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={qualityFilter}
              onChange={(e) => setQualityFilter(e.target.value)}
              className="w-full sm:w-auto px-4 py-3 rounded-2xl border border-slate-200 text-xs font-bold text-slate-700 bg-white"
            >
              <option value="All">All Quality Grades</option>
              <option value="Economy">Economy</option>
              <option value="Balanced">Balanced</option>
              <option value="Premium">Premium</option>
              <option value="Luxury">Luxury</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                selectedCategory === cat
                  ? 'bg-brand-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Material Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMaterials.map((mat) => {
          const isEco = mat.energy_efficiency === 'Eco-Certified';
          return (
            <div
              key={mat.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft hover:shadow-lg transition-all flex flex-col justify-between group space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-brand-600 uppercase tracking-wider bg-brand-50 px-2.5 py-1 rounded-md">
                    {mat.category}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {isEco && (
                      <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Leaf className="w-3 h-3 text-emerald-600" />
                        Eco
                      </span>
                    )}
                    <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">
                      {mat.quality_grade}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-600 transition">
                    {mat.name}
                  </h3>
                  {mat.brand && (
                    <span className="text-xs text-slate-400 font-medium block mt-0.5">
                      Leading Brand: <strong className="text-slate-600">{mat.brand}</strong>
                    </span>
                  )}
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-500">Price Range:</span>
                  <span className="text-emerald-700 font-bold">
                    ₹{mat.price_min} - ₹{mat.price_max} / {mat.unit}
                  </span>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed">
                  {mat.description}
                </p>
              </div>

              {/* Bottom spec badges */}
              <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-[11px] text-slate-500">
                <div>
                  <span>Durability:</span>
                  <strong className="text-slate-800 block">{mat.durability}</strong>
                </div>
                <div>
                  <span>Sustainability:</span>
                  <strong className="text-emerald-600 block">{mat.sustainability_rating} / 5 Stars</strong>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredMaterials.length === 0 && (
        <div className="text-center py-12 text-slate-500 bg-white rounded-3xl border border-slate-200">
          No materials match your filter query.
        </div>
      )}
    </div>
  );
}
