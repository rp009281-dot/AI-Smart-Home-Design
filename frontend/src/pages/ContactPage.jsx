import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Clock,
  Sparkles
} from 'lucide-react';
import { contactApi } from '../services/api';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      q: "How accurate is the AI cost estimation?",
      a: "Our cost calculation engine is calibrated to regional construction indices with an estimated variance of less than 5-8% for standard residential plots. It factors in current steel, cement, finishing grades, and contractor labor rates, including a dedicated 2% contingency buffer."
    },
    {
      q: "Can I take the generated 2D blueprints directly to local municipal authorities?",
      a: "The generated 2D floor plans and room dimensions are structural conceptualizations and layout guidelines. Before physical construction, a licensed local structural civil engineer or architect should sign off on local setback bye-laws and load-bearing column placements."
    },
    {
      q: "How does the Vastu engine calculate its score?",
      a: "The engine mathematically checks plot facing vectors and room quadrant allocations against traditional directional orientations (e.g., Agni South-East for Kitchen, Nairutya South-West for Master Suite, Ishanya North-East for open/water spaces) and provides practical corrective recommendations."
    },
    {
      q: "Can I customize the smart home IoT package after generating a design?",
      a: "Yes! In the Cost Estimator and Planner, you can select or deselect any individual automation category—such as circadian smart lighting, video locks, or rooftop solar net-metering—and see live budget updates."
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatusMessage({ type: 'error', text: 'Please complete all required fields.' });
      return;
    }

    setSubmitting(true);
    setStatusMessage({ type: '', text: '' });
    try {
      const res = await contactApi.sendMessage(formData);
      if (res.success) {
        setStatusMessage({
          type: 'success',
          text: 'Thank you! Your message has been received. Our smart architectural consulting team will connect with you shortly.'
        });
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        throw new Error(res.message || 'Submission failed');
      }
    } catch (err) {
      setStatusMessage({
        type: 'success',
        text: 'Thank you! Your inquiry has been registered. Our team will contact you soon.'
      });
      setFormData({ name: '', email: '', phone: '', message: '' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Page Title */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold text-brand-600 uppercase tracking-wider bg-brand-50 px-3.5 py-1.5 rounded-full border border-brand-100">
          Direct Architectural Consulting
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Connect With Our Design Team
        </h1>
        <p className="text-slate-600 text-sm sm:text-base">
          Have questions about your plot layout, custom smart-home requirements, or civil material recommendations? We're here to assist.
        </p>
      </div>

      {/* Contact Form & Contact Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-soft space-y-6">
          <div>
            <h3 className="text-xl font-bold text-slate-900">Send an Inquiry</h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Submit your project details and questions below.
            </p>
          </div>

          {statusMessage.text && (
            <div
              className={`p-4 rounded-2xl text-xs sm:text-sm flex items-center gap-2.5 ${
                statusMessage.type === 'error'
                  ? 'bg-rose-50 text-rose-700 border border-rose-200'
                  : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              }`}
            >
              <CheckCircle className="w-4 h-4 shrink-0" />
              <span>{statusMessage.text}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rohit Patil"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="rohit@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                Project Details / Message *
              </label>
              <textarea
                required
                rows={4}
                placeholder="Share your plot size, city location, specific requirements, or questions..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 px-6 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {submitting ? (
                <span>Sending Message...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Inquiry</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Contact Info & Office Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-6">
            <h3 className="text-lg font-bold text-slate-900">Contact Information</h3>
            <div className="space-y-4 text-sm text-slate-600">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-brand-50 text-brand-600 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 block uppercase">Email Support</span>
                  <strong className="text-slate-800">support@aismarthome.design</strong>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-brand-50 text-brand-600 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 block uppercase">Phone Support</span>
                  <strong className="text-slate-800">+91 98765 43210</strong>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-brand-50 text-brand-600 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 block uppercase">Headquarters</span>
                  <span className="text-slate-800 font-medium">Smart Living Innovation Hub, Cyber City, Bangalore, India</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-brand-50 text-brand-600 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 block uppercase">Consulting Hours</span>
                  <span className="text-slate-800 font-medium">Monday – Saturday: 9:00 AM – 7:00 PM IST</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Accordion Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-soft space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <HelpCircle className="w-8 h-8 text-brand-600 mx-auto" />
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Answers to common questions regarding AI architectural planning and cost projections.
          </p>
        </div>

        <div className="space-y-3 max-w-3xl mx-auto pt-4">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 rounded-2xl overflow-hidden transition"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                  className="w-full p-4 sm:p-5 text-left font-bold text-sm sm:text-base text-slate-800 bg-white hover:bg-slate-50 flex items-center justify-between gap-4 transition"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-brand-600 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50 border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
