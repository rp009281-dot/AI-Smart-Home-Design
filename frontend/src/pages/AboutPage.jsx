import React from 'react';
import {
  HelpCircle,
  Target,
  Cpu,
  TrendingUp,
  CheckCircle,
  Layers,
  ArrowRight,
  Code2,
  Database,
  Compass,
  Zap,
  Shield
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-brand-600 uppercase tracking-wider bg-brand-50 px-3.5 py-1.5 rounded-full border border-brand-100">
          Project Insights & Architectural Vision
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          AI Powered Smart Home Design: Insights And Future
        </h1>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
          Democratizing architectural planning through machine intelligence, spatial optimization, parametric cost modeling, and modern IoT integration.
        </p>
      </div>

      {/* 1. Problem Statement & Background */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-soft grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-5">
          <div className="flex items-center gap-2 text-rose-600 font-bold text-xs uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" />
            <span>The Core Challenge</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            The Problem Statement
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Many home buyers and plot owners face severe roadblocks during early residential design. They lack formal civil or spatial engineering knowledge, remain heavily dependent on expensive architectural consultations, struggle with erratic contractor cost estimations, suffer from wasted plot area, and receive generic, cookie-cutter floor plans.
          </p>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Existing tools are fragmented: one tool computes rough square footage, another suggests paint brands, and none intelligently link <strong>layout generation, material durability, Vastu orientation, real-time itemized cost forecasting, and smart automation</strong> under a unified roof.
          </p>
        </div>

        <div className="lg:col-span-5 bg-slate-50 rounded-2xl p-6 border border-slate-200/80 space-y-4">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
            Key Pain Points Addressed
          </h3>
          <ul className="space-y-3 text-xs sm:text-sm text-slate-600">
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0"></span>
              <span><strong>Lack of technical knowledge:</strong> Confusing blueprints and floor-area-ratio (FAR) math.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0"></span>
              <span><strong>Contractor opacity:</strong> Unforeseen budget escalations and arbitrary per-sq.ft rate inflation.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0"></span>
              <span><strong>Sub-optimal space utilization:</strong> Dark interior corridors and wasted garden setbacks.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0"></span>
              <span><strong>Disconnected smart-home planning:</strong> Post-construction retrofitting costs 3x more than integrated pre-wiring.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* 2. Project Objectives */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Our Architectural Objectives
          </h2>
          <p className="text-sm text-slate-500">
            Engineered to empower prospective homeowners with end-to-end design autonomy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Automated 2D/3D Synthesis',
              desc: 'Instantly convert raw plot dimensions into harmonious living zones with realistic isometric 3D perspectives.'
            },
            {
              title: 'Granular Cost Modeling',
              desc: 'Eliminate surprise expenses through detailed material, labour, plumbing, electrical, and finishing breakdowns.'
            },
            {
              title: 'Eco & Energy Optimization',
              desc: 'Integrate rooftop solar sizing, daylight angles, and cross-ventilation to minimize operational energy consumption.'
            },
            {
              title: 'Computational Vastu Alignment',
              desc: 'Evaluate directional elemental balance (Agni, Nairutya, Ishanya) with practical modern layout suggestions.'
            }
          ].map((obj, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-soft space-y-3">
              <div className="w-8 h-8 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-sm">
                0{i + 1}
              </div>
              <h4 className="text-base font-bold text-slate-900">{obj.title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">{obj.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. How AI is Applied */}
      <div className="bg-gradient-to-br from-slate-900 to-navy-900 text-white rounded-3xl p-8 sm:p-12 space-y-8">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-bold uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5" />
            <span>AI Design Engine Architecture</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            How The Machine Intelligence Works
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Our platform utilizes a hybrid parametric intelligence system combining geometric spatial algorithms, deterministic cost matrices, and heuristic orientation rules.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/5 rounded-2xl p-6 border border-white/10 space-y-3">
            <Compass className="w-6 h-6 text-brand-400" />
            <h4 className="text-base font-bold text-white">1. Spatial Allocation Matrix</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Analyzes plot aspect ratios (length vs width), required room typologies, and setbacks to calculate ideal room polygons, door adjacency graphs, and circulation corridors.
            </p>
          </div>

          <div className="bg-white/5 rounded-2xl p-6 border border-white/10 space-y-3">
            <Zap className="w-6 h-6 text-amber-400" />
            <h4 className="text-base font-bold text-white">2. Multi-Tier Parametric Engine</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Generates 3 simultaneous distinct options: Budget (cost-minimized), Balanced (recommended value-efficiency), and Premium (luxury specifications & full automation).
            </p>
          </div>

          <div className="bg-white/5 rounded-2xl p-6 border border-white/10 space-y-3">
            <Shield className="w-6 h-6 text-emerald-400" />
            <h4 className="text-base font-bold text-white">3. Vastu & Thermal Verification</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Computes solar azimuth angles, wind vectors, and eight-zone directional compliance to output scores, remediation notes, and energy savings estimates.
            </p>
          </div>
        </div>
      </div>

      {/* 4. Future Scope & Roadmap */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-soft space-y-6">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">
            Looking Ahead
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Future Scope & Expansion Roadmap
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-600">
          <div className="space-y-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/60">
            <h4 className="font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-600"></span>
              Real-Time Generative Neural CAD Export (DXF & IFC)
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Direct export of multi-layer AutoCAD DXF files and building information models (BIM IFC) directly importable into Revit and SketchUp for licensed structural engineers.
            </p>
          </div>

          <div className="space-y-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/60">
            <h4 className="font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-600"></span>
              Localized Contractor & Material Marketplace
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Direct bidding integration where verified regional cement, steel, and smart-device vendors provide live inventory quotes based on generated quantities.
            </p>
          </div>

          <div className="space-y-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/60">
            <h4 className="font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-600"></span>
              Augmented Reality (AR) On-Site Walkthroughs
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Visualizing the full-scale 3D house model projected live on the vacant physical plot via mobile WebXR camera overlays.
            </p>
          </div>

          <div className="space-y-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/60">
            <h4 className="font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-600"></span>
              Municipal Bye-Law & Setback AI Auditor
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Automatic validation against city-specific zoning regulations (BBMP, BMC, DDA, DTCP) for required road setbacks, FAR allowances, and rainwater compliance.
            </p>
          </div>
        </div>
      </div>

      {/* 5. Technologies Used */}
      <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 space-y-6">
        <h3 className="text-lg font-bold text-slate-900 text-center">
          Technology Stack
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
          {[
            { name: 'React 18', role: 'Frontend UI' },
            { name: 'Three.js', role: '3D WebGL Engine' },
            { name: 'Tailwind CSS', role: 'Responsive Styling' },
            { name: 'Node / Express', role: 'REST Backend' },
            { name: 'MySQL 8.0', role: 'Relational Database' },
            { name: 'Recharts', role: 'Data Visualization' }
          ].map((t, idx) => (
            <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
              <div className="text-sm font-bold text-slate-800">{t.name}</div>
              <div className="text-[11px] text-slate-400 mt-0.5">{t.role}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
