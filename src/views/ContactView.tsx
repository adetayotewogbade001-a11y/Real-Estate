import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  Award, 
  Facebook, 
  ExternalLink,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { ContactFormInput } from '../types';

export const ContactView: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormInput>({
    fullName: '',
    email: '',
    phone: '',
    enquiryType: 'General Enquiry',
    message: ''
  });

  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="space-y-12 pb-12 text-slate-900">
      <Helmet>
        <title>Contact Us & Valuation Enquiries | Morgan Property Services | Newry</title>
        <meta 
          name="description" 
          content="Contact Morgan Property Services in Newry City Centre for property advice, viewings, and free pre-sale home valuations." 
        />
        <link rel="canonical" href="https://morganpropertyservices.co.uk/#contact" />
        <meta property="og:title" content="Contact Morgan Property Services | Newry City Office" />
        <meta property="og:description" content="Get in touch with our Licensed NAEA property specialists in Newry. Telephone, office location, opening hours and enquiry form." />
      </Helmet>
      
      {/* Hero Banner Header with Background Property Image & Far Left Alignment */}
      <section className="relative min-h-[360px] sm:min-h-[420px] flex items-center bg-[#0F172A] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=2000&q=80"
            alt="Morgan Property Services Newry Office Contact"
            className="w-full h-full object-cover opacity-30"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] via-[#0F172A]/90 to-[#0F172A]/50" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-white flex flex-col items-start text-left">
          <div className="max-w-2xl space-y-5 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 bg-[#B48C4E]/20 border border-[#B48C4E]/30 text-[#B48C4E] px-3.5 py-1.5 rounded-sm text-xs font-semibold">
              <MapPin className="w-4 h-4" />
              <span className="text-[10px] uppercase font-bold tracking-widest">Newry City Centre • Co. Down</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold font-serif text-white tracking-tight leading-tight text-left">
              Let's talk about your property.
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed text-left">
              Whether you're looking to sell, buy, let, rent or discuss a commercial property, our team at Morgan Property Services is here to help.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Column: Office Information & Opening Hours */}
        <div className="space-y-6 lg:col-span-1">
          
          {/* Office Details Card */}
          <div className="bg-white border border-slate-200 rounded-sm p-6 space-y-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-sm bg-[#0F172A] text-[#B48C4E] flex items-center justify-center font-bold">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold font-serif text-[#0F172A]">Morgan Property Services</h3>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#B48C4E] block">Newry City, Northern Ireland</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Long-established independent estate agency providing residential sales, lettings, commercial property, and valuation services across Newry and Mourne.
            </p>

            <div className="pt-2 space-y-3 text-xs text-slate-700">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#B48C4E] flex-shrink-0" />
                <span>Newry City Centre, Co. Down, BT34 / BT35</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Award className="w-4 h-4 text-[#B48C4E] flex-shrink-0" />
                <span>Licensed NAEA Agent</span>
              </div>
            </div>

            {/* Facebook Link */}
            <div className="pt-2 border-t border-slate-100">
              <a
                href="https://www.facebook.com/morganpropertyservices?fref=ts"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs text-[#B48C4E] hover:underline font-semibold"
              >
                <Facebook className="w-4 h-4" />
                <span>Visit our Facebook Page</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Opening Hours Box */}
          <div className="bg-white border border-slate-200 rounded-sm p-6 space-y-3 shadow-sm">
            <h3 className="text-sm font-bold font-serif text-[#0F172A] flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#B48C4E]" />
              <span>Office Opening Hours</span>
            </h3>

            <div className="bg-[#F9FAFB] border border-slate-200 rounded-sm p-4 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Monday:</span>
                <span className="font-semibold text-[#0F172A]">09:00 – 17:30</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Tuesday:</span>
                <span className="font-semibold text-[#0F172A]">09:00 – 17:30</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Wednesday:</span>
                <span className="font-semibold text-[#0F172A]">09:00 – 17:30</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Thursday:</span>
                <span className="font-semibold text-[#0F172A]">09:00 – 17:30</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Friday:</span>
                <span className="font-semibold text-[#0F172A]">09:00 – 17:30</span>
              </div>
              <div className="flex justify-between text-slate-600 pt-1.5 border-t border-slate-200">
                <span>Saturday:</span>
                <span className="font-semibold text-[#B48C4E]">09:00 – 12:00</span>
              </div>
              <div className="flex justify-between text-slate-400 pt-1 border-t border-slate-200">
                <span>Sunday:</span>
                <span className="text-slate-400">Closed</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Interactive Enquiry Form */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-sm p-6 sm:p-8 space-y-6 shadow-sm">
          <div>
            <h2 className="text-xl font-bold font-serif text-[#0F172A]">Send Us a Direct Message</h2>
            <p className="text-xs text-slate-500 mt-1">
              Select your enquiry type below and our local property team will respond promptly.
            </p>
          </div>

          {submitted ? (
            <div className="p-6 rounded-sm bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-3">
              <div className="flex items-center gap-2 font-bold text-base text-emerald-700">
                <CheckCircle2 className="w-6 h-6" />
                <span>Enquiry Submitted Successfully!</span>
              </div>
              <p className="text-xs leading-relaxed">
                Thank you, <strong>{formData.fullName}</strong>. Your enquiry regarding <strong>{formData.enquiryType}</strong> has been logged. A member of Morgan Property Services will be in touch shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-[#B48C4E] underline text-xs font-bold block pt-2 cursor-pointer"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Mary Hughes"
                    className="w-full bg-white border border-slate-300 rounded-sm px-3.5 py-2.5 text-slate-900 focus:border-[#B48C4E] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. 07700 900123"
                    className="w-full bg-white border border-slate-300 rounded-sm px-3.5 py-2.5 text-slate-900 focus:border-[#B48C4E] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="mary@example.com"
                    className="w-full bg-white border border-slate-300 rounded-sm px-3.5 py-2.5 text-slate-900 focus:border-[#B48C4E] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Enquiry Type *</label>
                  <select
                    value={formData.enquiryType}
                    onChange={e => setFormData({ ...formData, enquiryType: e.target.value as any })}
                    className="w-full bg-white border border-slate-300 rounded-sm px-3.5 py-2.5 text-slate-900 focus:border-[#B48C4E] focus:outline-none"
                  >
                    <option value="Buying">Buying</option>
                    <option value="Selling">Selling</option>
                    <option value="Letting">Letting (Landlords)</option>
                    <option value="Renting">Renting (Tenants)</option>
                    <option value="Commercial Property">Commercial Property</option>
                    <option value="Valuation">Valuation Request</option>
                    <option value="Property Management">Property Management</option>
                    <option value="General Enquiry">General Enquiry</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Message / Details *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can we assist with your property requirements in Newry & Mourne?"
                  className="w-full bg-white border border-slate-300 rounded-sm px-3.5 py-2.5 text-slate-900 focus:border-[#B48C4E] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#B48C4E] hover:bg-[#967540] text-white font-bold py-3.5 px-6 rounded-sm shadow-sm transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wider cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Send Enquiry</span>
              </button>
            </form>
          )}
        </div>

      </div>

      {/* Visual Newry Region Map Overview Box */}
      <div className="bg-white border border-slate-200 rounded-sm p-6 sm:p-8 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold font-serif text-[#0F172A] flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#B48C4E]" />
            <span>Serving Newry & Mourne Region</span>
          </h3>
          <span className="text-xs text-slate-500 font-medium">Co. Down / Armagh Border</span>
        </div>

        <div className="bg-[#F9FAFB] border border-slate-200 rounded-sm p-6 text-xs text-slate-700 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-3 bg-white border border-slate-200 rounded-sm">
            <span className="font-bold text-[#0F172A] block">Newry City Centre</span>
            <span className="text-slate-500 text-[11px]">Primary Office Base</span>
          </div>
          <div className="p-3 bg-white border border-slate-200 rounded-sm">
            <span className="font-bold text-[#0F172A] block">Camlough & Bessbrook</span>
            <span className="text-slate-500 text-[11px]">South Armagh Villages</span>
          </div>
          <div className="p-3 bg-white border border-slate-200 rounded-sm">
            <span className="font-bold text-[#0F172A] block">Warrenpoint & Rostrevor</span>
            <span className="text-slate-500 text-[11px]">Carlingford Lough Coast</span>
          </div>
          <div className="p-3 bg-white border border-slate-200 rounded-sm">
            <span className="font-bold text-[#0F172A] block">A1 Transport Corridor</span>
            <span className="text-slate-500 text-[11px]">Belfast - Dublin Link</span>
          </div>
        </div>
      </div>

    </div>
    </div>
  );
};
