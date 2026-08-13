import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  X, 
  Bed, 
  Bath, 
  Maximize2, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  Phone, 
  Mail, 
  Share2, 
  Heart, 
  ShieldCheck, 
  Building2, 
  FileText, 
  Send,
  Award
} from 'lucide-react';
import { Property, ViewingRequestInput } from '../types';
import { MortgageCalculator } from './MortgageCalculator';

interface PropertyDetailModalProps {
  property: Property | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onOpenValuation: () => void;
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
  property,
  onClose,
  isSaved,
  onToggleSave,
  onOpenValuation
}) => {
  if (!property) return null;

  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'details' | 'features' | 'calculator' | 'floorplan'>('details');
  const [viewingForm, setViewingForm] = useState<ViewingRequestInput>({
    propertyId: property.id,
    propertyTitle: property.title,
    fullName: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: 'Morning (09:00 - 12:00)',
    buyerStatus: 'First Time Buyer',
    message: ''
  });
  const [viewingSubmitted, setViewingSubmitted] = useState<boolean>(false);

  const handleViewingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setViewingSubmitted(true);
  };

  return (
    <>
      <Helmet>
        <title>{`${property.title} | Morgan Property Services Newry`}</title>
        <meta 
          name="description" 
          content={`${property.title} - ${property.priceText}. Located at ${property.address.street}, ${property.address.town}. ${property.description.slice(0, 140)}...`} 
        />
        <meta property="og:title" content={`${property.title} | Morgan Property Services`} />
        <meta property="og:description" content={`${property.priceText} - ${property.bedrooms} Bed ${property.type} in ${property.address.town}.`} />
        {property.images && property.images[0] && (
          <meta property="og:image" content={property.images[0]} />
        )}
      </Helmet>
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 md:p-6">
      <div className="bg-white border border-slate-200 rounded-sm max-w-5xl w-full max-h-[92vh] overflow-y-auto shadow-2xl text-slate-900 relative flex flex-col">
        
        {/* Modal Sticky Header Bar */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#B48C4E] bg-[#B48C4E]/10 border border-[#B48C4E]/30 px-2.5 py-1 rounded-sm">
              {property.status}
            </span>
            <span className="text-xs text-slate-400 font-mono hidden sm:inline">
              Ref: {property.reference}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleSave(property.id)}
              className={`p-2 rounded-sm border border-slate-200 transition-colors cursor-pointer ${
                isSaved ? 'bg-[#B48C4E] text-white font-bold' : 'bg-slate-100 text-slate-600 hover:text-black'
              }`}
              title={isSaved ? 'Saved' : 'Save Property'}
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-sm bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-black transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-8">
          
          {/* Main Title & Price Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-1.5 text-[#B48C4E] text-xs font-bold uppercase tracking-wider mb-1">
                <MapPin className="w-4 h-4" />
                <span>{property.address.street}, {property.address.area}, {property.address.town} ({property.address.postcode})</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold font-serif text-[#0F172A]">
                {property.title}
              </h1>
            </div>

            <div className="text-left md:text-right">
              <div className="text-2xl sm:text-3xl font-bold text-[#B48C4E] font-serif">
                {property.priceText}
              </div>
              <span className="text-xs text-slate-500 font-medium">
                {property.category === 'Rent' ? 'Rental Tenancy' : 'Residential Property Sale'}
              </span>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="space-y-3">
            <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-sm overflow-hidden bg-slate-100 border border-slate-200">
              <img
                src={property.images[activeImageIndex] || property.mainImage}
                alt={property.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 right-3 bg-[#0F172A]/80 text-xs text-white px-3 py-1 rounded-sm backdrop-blur-md font-mono">
                Image {activeImageIndex + 1} of {property.images.length}
              </div>
            </div>

            {/* Thumbnail Navigation */}
            {property.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {property.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-20 h-14 rounded-sm overflow-hidden border-2 flex-shrink-0 transition-all cursor-pointer ${
                      activeImageIndex === idx ? 'border-[#B48C4E] scale-105 shadow-sm' : 'border-slate-200 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Key Quick Specifications */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {property.bedrooms > 0 && (
              <div className="bg-[#F9FAFB] border border-slate-200 p-3.5 rounded-sm text-center">
                <Bed className="w-5 h-5 text-[#B48C4E] mx-auto mb-1" />
                <span className="text-xs text-slate-500 block">Bedrooms</span>
                <span className="text-sm font-bold text-[#0F172A]">{property.bedrooms}</span>
              </div>
            )}

            {property.bathrooms > 0 && (
              <div className="bg-[#F9FAFB] border border-slate-200 p-3.5 rounded-sm text-center">
                <Bath className="w-5 h-5 text-[#B48C4E] mx-auto mb-1" />
                <span className="text-xs text-slate-500 block">Bathrooms</span>
                <span className="text-sm font-bold text-[#0F172A]">{property.bathrooms}</span>
              </div>
            )}

            {property.receptions && (
              <div className="bg-[#F9FAFB] border border-slate-200 p-3.5 rounded-sm text-center">
                <Building2 className="w-5 h-5 text-[#B48C4E] mx-auto mb-1" />
                <span className="text-xs text-slate-500 block">Receptions</span>
                <span className="text-sm font-bold text-[#0F172A]">{property.receptions}</span>
              </div>
            )}

            {property.sqft && (
              <div className="bg-[#F9FAFB] border border-slate-200 p-3.5 rounded-sm text-center">
                <Maximize2 className="w-5 h-5 text-[#B48C4E] mx-auto mb-1" />
                <span className="text-xs text-slate-500 block">Floor Area</span>
                <span className="text-sm font-bold text-[#0F172A]">{property.sqft} sq ft</span>
              </div>
            )}

            {property.epcRating && (
              <div className="bg-[#F9FAFB] border border-slate-200 p-3.5 rounded-sm text-center">
                <Award className="w-5 h-5 text-[#B48C4E] mx-auto mb-1" />
                <span className="text-xs text-slate-500 block">EPC Rating</span>
                <span className="text-sm font-bold text-[#0F172A]">{property.epcRating}</span>
              </div>
            )}

            {property.tenure && (
              <div className="bg-[#F9FAFB] border border-slate-200 p-3.5 rounded-sm text-center">
                <ShieldCheck className="w-5 h-5 text-[#B48C4E] mx-auto mb-1" />
                <span className="text-xs text-slate-500 block">Tenure</span>
                <span className="text-sm font-bold text-[#0F172A]">{property.tenure}</span>
              </div>
            )}
          </div>

          {/* Section Tabs */}
          <div className="flex border-b border-slate-200 text-xs font-bold uppercase tracking-wider">
            <button
              onClick={() => setActiveTab('details')}
              className={`pb-3 px-4 transition-colors cursor-pointer border-b-2 ${
                activeTab === 'details' ? 'border-[#B48C4E] text-[#B48C4E]' : 'border-transparent text-slate-500 hover:text-black'
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab('features')}
              className={`pb-3 px-4 transition-colors cursor-pointer border-b-2 ${
                activeTab === 'features' ? 'border-[#B48C4E] text-[#B48C4E]' : 'border-transparent text-slate-500 hover:text-black'
              }`}
            >
              Key Features
            </button>
            <button
              onClick={() => setActiveTab('calculator')}
              className={`pb-3 px-4 transition-colors cursor-pointer border-b-2 ${
                activeTab === 'calculator' ? 'border-[#B48C4E] text-[#B48C4E]' : 'border-transparent text-slate-500 hover:text-black'
              }`}
            >
              Finance Calculator
            </button>
            {property.floorplanUrl && (
              <button
                onClick={() => setActiveTab('floorplan')}
                className={`pb-3 px-4 transition-colors cursor-pointer border-b-2 ${
                  activeTab === 'floorplan' ? 'border-[#B48C4E] text-[#B48C4E]' : 'border-transparent text-slate-500 hover:text-black'
                }`}
              >
                Floorplan
              </button>
            )}
          </div>

          {/* Tab Panes */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left 2 Cols: Tab Details */}
            <div className="lg:col-span-2 space-y-6">
              {activeTab === 'details' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold font-serif text-[#0F172A]">Property Overview</h3>
                  <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
                    {property.description}
                  </p>

                  {property.rates && (
                    <div className="p-3 rounded-sm bg-[#F9FAFB] border border-slate-200 text-xs text-slate-700">
                      <strong className="text-[#B48C4E]">Rates / Council Estimate:</strong> {property.rates}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'features' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold font-serif text-[#0F172A]">Key Features & Selling Points</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {property.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 bg-[#F9FAFB] p-3 rounded-sm border border-slate-200 text-xs text-slate-700 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-[#B48C4E] flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'calculator' && (
                <div>
                  <MortgageCalculator 
                    initialPrice={property.price} 
                    isRental={property.category === 'Rent'} 
                  />
                </div>
              )}

              {activeTab === 'floorplan' && property.floorplanUrl && (
                <div className="space-y-3">
                  <h3 className="text-lg font-bold font-serif text-[#0F172A]">Floorplan & Layout</h3>
                  <div className="bg-[#F9FAFB] border border-slate-200 p-4 rounded-sm overflow-hidden">
                    <img 
                      src={property.floorplanUrl} 
                      alt="Property Floorplan" 
                      className="w-full h-auto rounded-sm object-contain max-h-[400px] mx-auto" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Right Col: Arrange a Viewing Enquiry Form */}
            <div className="bg-[#F9FAFB] border border-slate-200 rounded-sm p-6 space-y-5 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold font-serif text-[#0F172A] flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#B48C4E]" />
                  <span>Arrange a Viewing</span>
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Connect directly with our local Newry property team
                </p>

                {viewingSubmitted ? (
                  <div className="mt-4 p-4 rounded-sm bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs space-y-2">
                    <div className="flex items-center gap-2 font-bold text-sm text-emerald-700">
                      <CheckCircle2 className="w-5 h-5" />
                      <span>Viewing Request Sent!</span>
                    </div>
                    <p>
                      Thank you, <strong>{viewingForm.fullName}</strong>. Our viewing negotiator will contact you shortly to confirm your slot for <strong>{property.title}</strong>.
                    </p>
                    <button
                      onClick={() => setViewingSubmitted(false)}
                      className="text-[#B48C4E] underline font-medium mt-2 block cursor-pointer"
                    >
                      Send another enquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleViewingSubmit} className="space-y-3 mt-4 text-xs">
                    <div>
                      <label className="block text-slate-700 mb-1 font-medium">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        value={viewingForm.fullName}
                        onChange={e => setViewingForm({ ...viewingForm, fullName: e.target.value })}
                        placeholder="e.g. Ciaran O'Neill"
                        className="w-full bg-white border border-slate-300 rounded-sm px-3 py-2 text-slate-900 focus:border-[#B48C4E] focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <label className="block text-slate-700 mb-1 font-medium">Email *</label>
                        <input
                          type="email"
                          required
                          value={viewingForm.email}
                          onChange={e => setViewingForm({ ...viewingForm, email: e.target.value })}
                          placeholder="ciaran@example.com"
                          className="w-full bg-white border border-slate-300 rounded-sm px-3 py-2 text-slate-900 focus:border-[#B48C4E] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-700 mb-1 font-medium">Phone *</label>
                        <input
                          type="tel"
                          required
                          value={viewingForm.phone}
                          onChange={e => setViewingForm({ ...viewingForm, phone: e.target.value })}
                          placeholder="07700 900123"
                          className="w-full bg-white border border-slate-300 rounded-sm px-3 py-2 text-slate-900 focus:border-[#B48C4E] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <label className="block text-slate-700 mb-1 font-medium">Preferred Date</label>
                        <input
                          type="date"
                          value={viewingForm.preferredDate}
                          onChange={e => setViewingForm({ ...viewingForm, preferredDate: e.target.value })}
                          className="w-full bg-white border border-slate-300 rounded-sm px-3 py-2 text-slate-900 focus:border-[#B48C4E] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-700 mb-1 font-medium">Buyer / Tenant Status</label>
                        <select
                          value={viewingForm.buyerStatus}
                          onChange={e => setViewingForm({ ...viewingForm, buyerStatus: e.target.value as any })}
                          className="w-full bg-white border border-slate-300 rounded-sm px-3 py-2 text-slate-900 focus:border-[#B48C4E] focus:outline-none"
                        >
                          <option value="First Time Buyer">First Time Buyer</option>
                          <option value="Looking to Sell First">Looking to Sell First</option>
                          <option value="Cash Buyer">Cash Buyer</option>
                          <option value="Investor">Investor</option>
                          <option value="Renter">Renter</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-700 mb-1 font-medium">Optional Message</label>
                      <textarea
                        rows={2}
                        value={viewingForm.message}
                        onChange={e => setViewingForm({ ...viewingForm, message: e.target.value })}
                        placeholder="Any specific questions or times..."
                        className="w-full bg-white border border-slate-300 rounded-sm px-3 py-2 text-slate-900 focus:border-[#B48C4E] focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#B48C4E] hover:bg-[#967540] text-white font-bold py-2.5 px-4 rounded-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer text-xs uppercase tracking-wider"
                    >
                      <Send className="w-4 h-4" />
                      <span>Request Accompanied Viewing</span>
                    </button>
                  </form>
                )}
              </div>

              {/* Office Contact Note */}
              <div className="pt-4 border-t border-slate-200 text-[11px] text-slate-500 space-y-1">
                <div className="flex items-center gap-2 text-slate-700">
                  <ShieldCheck className="w-4 h-4 text-[#B48C4E]" />
                  <span className="font-semibold text-[#0F172A]">Morgan Property Services</span>
                </div>
                <p>Newry City Office • Licensed NAEA Agent</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
    </>
  );
};
