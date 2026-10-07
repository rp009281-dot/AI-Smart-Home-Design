import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  User,
  Bookmark,
  Clock,
  Home,
  DollarSign,
  TrendingUp,
  Trash2,
  Eye,
  Plus,
  ShieldCheck,
  Zap,
  Bell,
  Sparkles,
  Sliders
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useDesign } from '../context/DesignContext';
import { savedDesignApi, projectApi } from '../services/api';

export default function DashboardPage() {
  const { user } = useAuth();
  const { setSelectedTier } = useDesign();
  const [savedDesigns, setSavedDesigns] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [savedRes, projRes] = await Promise.allSettled([
          savedDesignApi.getUserSavedDesigns(),
          projectApi.getUserProjects()
        ]);

        if (savedRes.status === 'fulfilled' && savedRes.value?.success) {
          setSavedDesigns(savedRes.value.savedDesigns || []);
        }
        if (projRes.status === 'fulfilled' && projRes.value?.success) {
          setProjects(projRes.value.projects || []);
        }
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleDeleteSaved = async (id) => {
    try {
      await savedDesignApi.deleteSavedDesign(id);
      setSavedDesigns(prev => prev.filter(s => s.id !== id));
    } catch (err) {
      console.error('Failed to remove design:', err);
    }
  };

  // Compute metrics
  const totalSaved = savedDesigns.length;
  const avgCost = savedDesigns.length > 0
    ? Math.round(savedDesigns.reduce((acc, s) => acc + (Number(s.design?.estimated_total_cost || s.estimated_total_cost || 2800000)), 0) / savedDesigns.length)
    : 2750000;
  const lastProject = savedDesigns[0]?.design?.title || 'Contemporary Harmony Villa';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-brand-700 via-brand-600 to-indigo-700 rounded-3xl p-8 sm:p-10 text-white shadow-elevated flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-brand-200 uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full">
            <User className="w-3.5 h-3.5" />
            <span>Client Workspace</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight">
            Welcome back, {user?.name || 'Home Designer'}!
          </h1>
          <p className="text-brand-100 text-sm max-w-xl">
            Track your saved house designs, compare architectural tiers, and manage your custom smart home project history.
          </p>
        </div>

        <div>
          <Link
            to="/planner"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white text-brand-700 font-bold text-xs sm:text-sm shadow-md hover:bg-brand-50 transition transform hover:-translate-y-0.5"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Plan</span>
          </Link>
        </div>
      </div>

      {/* 4 Core Metric KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-soft space-y-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Total Designs Generated
          </span>
          <div className="text-3xl font-black text-slate-900">
            {Math.max(3, totalSaved * 3)}
          </div>
          <div className="text-xs text-brand-600 font-semibold pt-1">
            Across 3 spatial tiers
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-soft space-y-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Saved Designs
          </span>
          <div className="text-3xl font-black text-slate-900">
            {totalSaved}
          </div>
          <div className="text-xs text-emerald-600 font-semibold pt-1">
            Pinned to portfolio
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-soft space-y-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Average Estimated Cost
          </span>
          <div className="text-3xl font-black text-slate-900">
            ₹{(avgCost / 100000).toFixed(1)} L
          </div>
          <div className="text-xs text-slate-500 font-semibold pt-1">
            Standard turnkey index
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-soft space-y-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Last Active Project
          </span>
          <div className="text-lg font-bold text-slate-900 truncate mt-1">
            {lastProject}
          </div>
          <div className="text-xs text-brand-600 font-semibold pt-1">
            Active in workspace
          </div>
        </div>
      </div>

      {/* Saved Designs List Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-brand-600" />
              <span>Saved Architectural Blueprints</span>
            </h3>
            <p className="text-xs text-slate-500">
              Access your previously saved design tiers, floor plans, and cost analyses.
            </p>
          </div>
          <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
            {savedDesigns.length} Saved
          </span>
        </div>

        {savedDesigns.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedDesigns.map((saved) => {
              const d = saved.design || saved;
              return (
                <div
                  key={saved.id}
                  className="rounded-2xl border border-slate-200 p-5 space-y-4 hover:shadow-md transition flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-brand-600 uppercase bg-brand-50 px-2 py-0.5 rounded">
                        {d.tier_type || 'balanced'} tier
                      </span>
                      <span className="text-xs text-slate-400">
                        {new Date(saved.saved_at || Date.now()).toLocaleDateString()}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900">{d.title || d.design_title}</h4>
                    <p className="text-xs text-slate-500 line-clamp-2">
                      {d.description || 'Full 2D floor plan with spatial optimization and Vastu analysis.'}
                    </p>

                    <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between text-xs font-bold">
                      <span className="text-slate-500">Total Outlay:</span>
                      <span className="text-brand-700 font-extrabold text-sm">
                        ₹{((d.estimated_total_cost || 2800000) / 100000).toFixed(2)} Lakh
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      to="/results"
                      onClick={() => setSelectedTier(d.tier_type || 'balanced')}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 hover:text-brand-700"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Blueprints</span>
                    </Link>
                    <button
                      onClick={() => handleDeleteSaved(saved.id)}
                      className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition"
                      title="Remove from saved"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200 space-y-3">
            <Home className="w-10 h-10 text-slate-300 mx-auto" />
            <h4 className="text-sm font-bold text-slate-700">No saved designs yet</h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Run the Smart Home Planner to generate personalized floor plans, then click "Save Design" to pin them here.
            </p>
            <div className="pt-2">
              <Link
                to="/planner"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-600 text-white rounded-xl text-xs font-bold"
              >
                <span>Launch Planner</span>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Notifications & System Activity */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Bell className="w-4 h-4 text-brand-600" />
          <span>System Updates & Architectural Notifications</span>
        </h3>
        <div className="space-y-3 text-xs text-slate-600">
          <div className="p-3 bg-brand-50/50 rounded-xl border border-brand-100 flex items-start gap-2.5">
            <span className="w-2 h-2 rounded-full bg-brand-600 mt-1 shrink-0"></span>
            <div>
              <strong>Q3 Construction Material Price Index Updated:</strong> Cement and steel rates calibrated for 2026 residential projects.
            </div>
          </div>
          <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100 flex items-start gap-2.5">
            <span className="w-2 h-2 rounded-full bg-emerald-600 mt-1 shrink-0"></span>
            <div>
              <strong>Vastu Shastra AI Model Enhancement:</strong> Updated solar illumination azimuth calculation for East-facing residential plots.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
