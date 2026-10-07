import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Compass,
  Cpu,
  Layers,
  ShieldCheck,
  Zap,
  TrendingDown,
  Maximize2,
  CheckCircle2,
  DollarSign,
  ChevronRight,
  Eye,
  Sliders,
  Check,
  Star
} from 'lucide-react';
import HomePreview3D from '../components/design/HomePreview3D';

export default function HomePage() {
  return (
    <div className="space-y-24 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 overflow-hidden">
        {/* Soft atmospheric gradient */}
        <div className="absolute inset-0 gradient-mesh -z-10 opacity-70"></div>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-brand-400/20 blur-[120px] rounded-full -z-10 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-brand-700 text-xs font-bold tracking-wide uppercase shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-brand-600 animate-spin" />
                <span>Next-Gen Architectural Intelligence</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
                Design Your Dream Home <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-indigo-600">with AI</span>
              </h1>

              {/* Subheading */}
              <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
                Plan smarter, optimize space, estimate costs, and create an intelligent home design tailored to your needs.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-3">
                <Link
                  to="/planner"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 text-white font-bold text-base shadow-elevated hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                >
                  <Sparkles className="w-5 h-5 text-brand-200" />
                  <span>Start Designing</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <a
                  href="#features"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-base shadow-soft transition"
                >
                  <Eye className="w-4 h-4 text-brand-600" />
                  <span>Explore Features</span>
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 text-left">
                <div>
                  <div className="text-2xl font-black text-slate-900">3 Tiers</div>
                  <div className="text-xs text-slate-500 font-medium">Budget, Balanced & Luxury</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-slate-900">98%</div>
                  <div className="text-xs text-slate-500 font-medium">Cost Precision Model</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-slate-900">100%</div>
                  <div className="text-xs text-slate-500 font-medium">Vastu & Eco Compliant</div>
                </div>
              </div>
            </div>

            {/* Right Interactive 3D Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border border-white/60 ring-1 ring-slate-900/5">
                <HomePreview3D tier="balanced" />
              </div>
              <div className="absolute -bottom-6 -right-6 w-72 h-72 bg-brand-500/10 rounded-full blur-3xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CORE FEATURES SECTION */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold text-brand-600 tracking-wider uppercase bg-brand-50 px-3 py-1 rounded-full border border-brand-100">
            Intelligent Platform Modules
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Everything You Need To Build Intelligently
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Traditional home building is plagued by architectural delays, hidden vendor markups, and poor space planning. Our AI unifies every step into one seamless workflow.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: Compass,
              title: 'AI House Design Generator',
              desc: 'Parametric generation of room layouts, circulation zones, plot coverage, and 3 design variations tailored to your plot dimensions.',
              color: 'bg-blue-500',
              badge: 'Automated 2D & 3D'
            },
            {
              icon: DollarSign,
              title: 'Real-Time Cost Estimation',
              desc: 'Dynamic breakdown of materials, labour, electrical, plumbing, finishing, and smart home tech with configurable sq.ft rates.',
              color: 'bg-emerald-500',
              badge: '98% Variance Accurate'
            },
            {
              icon: Layers,
              title: 'Material Recommendation',
              desc: 'Objective recommendations for cement, steel, AAC blocks, flooring, paint, doors, and fenestration with price & durability ratings.',
              color: 'bg-indigo-500',
              badge: 'Eco & Strength Verified'
            },
            {
              icon: Cpu,
              title: 'Smart Home Ecosystem',
              desc: 'Complete IoT automation planning including CCT circadian lights, smart biometric locks, HVAC controllers, and solar net-metering.',
              color: 'bg-amber-500',
              badge: 'Matter & Zigbee Ready'
            },
            {
              icon: Zap,
              title: 'Energy Efficiency Analysis',
              desc: 'Evaluate rooftop solar capacity, natural cross-ventilation, daylight penetration, and receive an instant energy rating score.',
              color: 'bg-cyan-500',
              badge: 'Net-Zero Optimization'
            },
            {
              icon: ShieldCheck,
              title: 'Vastu Shastra Checker',
              desc: 'Directional alignment evaluation across Agni, Nairutya, and Ishanya zones with clear corrective remedies and compliance scores.',
              color: 'bg-purple-500',
              badge: 'Computational Vastu'
            }
          ].map((feature, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-soft hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-2xl ${feature.color} text-white flex items-center justify-center shadow-md shadow-brand-500/10`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                    {feature.badge}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-brand-600 transition">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {feature.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs font-bold text-brand-600 group-hover:text-brand-700">
                <span>Learn how it calculates</span>
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. HOW IT WORKS SECTION */}
      <section className="bg-slate-900 text-white py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-brand-400 tracking-wider uppercase">
              Step-By-Step Workflow
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              From Plot Dimensions to Complete Blueprint in 4 Steps
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              No technical architectural jargon required. Our smart wizard guides you through every step.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Input Plot & Rooms',
                desc: 'Enter your plot length, width, facing direction, budget, and desired bedrooms and bathrooms.'
              },
              {
                step: '02',
                title: 'Set Lifestyle & IoT',
                desc: 'Select lifestyle preferences, smart automation requirements, and desired construction finishing tier.'
              },
              {
                step: '03',
                title: 'AI Generates 3 Tiers',
                desc: 'Algorithms compute 3 architectural options (Budget, Balanced, Premium) with 2D floor plans & 3D previews.'
              },
              {
                step: '04',
                title: 'Inspect, Compare & Export',
                desc: 'Review itemized cost cards, Vastu scores, materials, and download a ready-to-use construction brief.'
              }
            ].map((s, idx) => (
              <div key={idx} className="relative bg-slate-800/60 rounded-3xl p-6 border border-slate-700/60 space-y-3">
                <span className="text-3xl font-black text-brand-400 font-mono block">
                  {s.step}
                </span>
                <h4 className="text-lg font-bold text-white">{s.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link
              to="/planner"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm shadow-lg shadow-brand-500/25 transition"
            >
              <span>Launch Smart Home Planner</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. COST ESTIMATION PREVIEW HIGHLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-brand-50 via-white to-blue-50 rounded-3xl p-8 sm:p-12 border border-brand-100 shadow-soft">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-bold text-brand-700 uppercase tracking-wider bg-white px-3 py-1 rounded-full border border-brand-200">
                Transparent Cost Engineering
              </span>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-snug">
                Eliminate Hidden Construction Expenses Before Breaking Ground
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Traditional construction projects suffer 20-35% budget overruns due to unaccounted labour inflation, uncoordinated electrical/plumbing chases, and material wastage. Our algorithm provides clear line-item predictability.
              </p>
              <div className="space-y-3">
                {[
                  'Itemized material breakdown for cement, steel, bricks, and paint',
                  'Configurable construction rates per sq.ft based on city & finishing tier',
                  'Explicit reserve allocation for 2% contingency margin',
                  'Dedicated smart home automation tech budget'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="pt-2">
                <Link
                  to="/cost-estimation"
                  className="inline-flex items-center gap-2 text-sm font-bold text-brand-600 hover:text-brand-700"
                >
                  <span>Explore Interactive Cost Estimator</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Quick Preview Card */}
            <div className="lg:col-span-6">
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-500 uppercase">Sample 1,200 sq.ft Villa</span>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    Balanced Tier
                  </span>
                </div>
                <div className="flex items-baseline justify-between">
                  <div>
                    <div className="text-3xl font-black text-slate-900">₹27.60 Lakh</div>
                    <div className="text-xs text-slate-400">Total Estimated Outlay (turnkey)</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-brand-600">₹2,300 / sq.ft</div>
                    <div className="text-xs text-slate-400">Ground Coverage: 70%</div>
                  </div>
                </div>

                <div className="space-y-2 pt-2 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Structural Core & Materials</span>
                    <span className="font-semibold text-slate-900">₹13.80 L (50%)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-600 rounded-full w-1/2"></div>
                  </div>

                  <div className="flex justify-between text-slate-600 pt-1">
                    <span>Labour & Civil Execution</span>
                    <span className="font-semibold text-slate-900">₹7.18 L (26%)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full w-1/4"></div>
                  </div>

                  <div className="flex justify-between text-slate-600 pt-1">
                    <span>Smart Home Ecosystem & Solar</span>
                    <span className="font-semibold text-slate-900">₹1.95 L (7%)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full w-[12%]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS & BENEFITS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">
            User Success
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Designed By Algorithms. Loved By Homeowners.
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              quote: "The Vastu and cross-ventilation analysis helped us catch a major bathroom placement issue before our local contractor drew up the slab blueprints. Saved us lakhs in rework.",
              author: "Aditya & Neha Sharma",
              role: "Plot Owners, Bangalore",
              stars: 5
            },
            {
              quote: "We compared the Budget and Balanced tiers side-by-side. The AAC lightweight block recommendation alone cut down our AC cooling power bill by 25% this summer.",
              author: "Rajesh Kulkarni",
              role: "Homeowner, Pune",
              stars: 5
            },
            {
              quote: "The 3D interactive viewer let my entire family test different day/night lighting setups and see how our covered parking integrated with the lawn.",
              author: "Priya Venkatesh",
              role: "Property Investor, Chennai",
              stars: 5
            }
          ].map((t, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex gap-1 text-amber-400">
                  {[...Array(t.stars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-600 italic leading-relaxed">
                  "{t.quote}"
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100">
                <h5 className="text-sm font-bold text-slate-900">{t.author}</h5>
                <span className="text-xs text-slate-400">{t.role}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. BOTTOM CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-brand-700 via-brand-600 to-indigo-700 rounded-3xl p-10 sm:p-14 text-center text-white shadow-elevated relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Ready to Design Your Intelligent Home?
            </h2>
            <p className="text-brand-100 text-sm sm:text-base leading-relaxed">
              Step into the future of home planning. Configure your plot dimensions, bedroom preferences, and budget to generate tailored 2D & 3D floor plans right now.
            </p>
            <div className="pt-2">
              <Link
                to="/planner"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-white text-brand-700 font-extrabold text-sm sm:text-base shadow-lg hover:bg-brand-50 transition transform hover:scale-105"
              >
                <Sparkles className="w-5 h-5 text-brand-600" />
                <span>Start Designing Now — It's Free</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
