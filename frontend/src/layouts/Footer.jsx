import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu, Mail, Phone, MapPin, Heart, Shield, Sparkles, Compass } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 to-brand-400 flex items-center justify-center text-white shadow-md">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <span className="text-lg font-bold text-white tracking-tight">
                  AI Smart Home Design
                </span>
                <span className="text-[10px] text-brand-300 block uppercase tracking-wider">
                  Insights & Future
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              An intelligent, end-to-end residential architectural platform eliminating guesswork. Generate optimized floor plans, accurate itemized cost estimates, Vastu evaluations, eco-energy insights, and smart home ecosystems in minutes.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              AI Parametric Design Engine v2.4 Active
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white tracking-wider uppercase">Platform Tools</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link to="/planner" className="hover:text-white transition">Smart Home Planner</Link></li>
              <li><Link to="/results" className="hover:text-white transition">AI House Generator</Link></li>
              <li><Link to="/cost-estimation" className="hover:text-white transition">Cost Estimator</Link></li>
              <li><Link to="/materials" className="hover:text-white transition">Material Catalog</Link></li>
              <li><Link to="/dashboard" className="hover:text-white transition">User Dashboard</Link></li>
            </ul>
          </div>

          {/* Research & Principles */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white tracking-wider uppercase">Design Systems</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link to="/about" className="hover:text-white transition">Problem Statement</Link></li>
              <li><Link to="/about" className="hover:text-white transition">AI Methodology</Link></li>
              <li><Link to="/results" className="hover:text-white transition">Vastu Direction Engine</Link></li>
              <li><Link to="/results" className="hover:text-white transition">Energy Efficiency Scoring</Link></li>
              <li><Link to="/about" className="hover:text-white transition">Future Architecture Scope</Link></li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white tracking-wider uppercase">Get In Touch</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-400 shrink-0" />
                <span>support@aismarthome.design</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-400 shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
                <span>Smart Living Innovation Hub, Cyber City, Bangalore, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} AI Powered Smart Home Design: Insights And Future. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Powered by Node.js, React, Three.js & MySQL</span>
            <span className="text-slate-400">Version 1.0.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
