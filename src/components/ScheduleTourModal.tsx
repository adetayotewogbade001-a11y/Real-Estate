import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  Video, 
  CheckCircle2, 
  Building2,
  HelpCircle,
  Send
} from 'lucide-react';
import { Property } from '../types';

interface ScheduleTourModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ScheduleTourModal: React.FC<ScheduleTourModalProps> = ({
  property,
  isOpen,
  onClose
}) => {
  const [tourType, setTourType] = useState<'In-Person' | 'Video Tour'>('In-Person');
  const [preferredDate, setPreferredDate] = useState<string>('');
  const [timeSlot, setTimeSlot] = useState<string>('Morning (10am - 12pm)');
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [buyerStatus, setBuyerStatus] = useState<string>('First Time Buyer');
  const [notes, setNotes] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [bookingRef, setBookingRef] = useState<string>('');

  if (!isOpen || !property) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const refNum = `MPS-VW-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingRef(refNum);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFullName('');
    setEmail('');
    setPhone('');
    setPreferredDate('');
    setNotes('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div className="bg-white border border-slate-200 rounded-sm max-w-lg w-full overflow-hidden shadow-2xl text-slate-900 relative">
        
        {/* Header */}
        <div className="bg-[#0F172A] text-white p-4 sm:p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-sm bg-[#B48C4E] flex items-center justify-center text-white">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-serif font-bold text-white">
                Schedule a Property Tour
              </h3>
              <p className="text-[11px] text-slate-300">
                Morgan Property Services Viewing Portal
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-sm bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {submitted ? (
          <div className="p-6 sm:p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center mx-auto text-emerald-600">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <h4 className="text-xl font-serif font-bold text-[#0F172A]">
              Viewing Request Confirmed!
            </h4>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Thank you, <span className="font-bold text-slate-900">{fullName}</span>. Your {tourType} request for <span className="font-bold text-[#B48C4E]">{property.title}</span> has been logged with our Newry sales office.
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-sm p-4 text-left space-y-2 text-xs">
              <div className="flex justify-between border-b border-slate-200 pb-1.5">
                <span className="text-slate-500">Booking Reference:</span>
                <span className="font-mono font-bold text-[#0F172A]">{bookingRef}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-1.5">
                <span className="text-slate-500">Requested Tour Type:</span>
                <span className="font-bold text-slate-800">{tourType}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-1.5">
                <span className="text-slate-500">Requested Date & Time:</span>
                <span className="font-bold text-slate-800">{preferredDate || 'Earliest Available'} ({timeSlot})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Assigned Agent:</span>
                <span className="font-bold text-[#B48C4E]">{property.agentName || 'Morgan Property Team'}</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 italic">
              Our agent will contact you shortly on {phone} to confirm property key access and address details.
            </p>

            <button
              onClick={handleReset}
              className="w-full bg-[#0F172A] hover:bg-[#B48C4E] text-white font-bold text-xs uppercase tracking-wider py-3 rounded-sm transition-colors cursor-pointer"
            >
              Done & Return
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-4 max-h-[80vh] overflow-y-auto">
            
            {/* Target Property Summary */}
            <div className="flex items-center gap-3 bg-slate-50 p-2.5 rounded-sm border border-slate-200">
              <img
                src={property.mainImage}
                alt={property.title}
                className="w-14 h-14 object-cover rounded-sm flex-shrink-0"
                referrerPolicy="no-referrer"
              />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#B48C4E]">
                  Ref: {property.reference} • {property.status}
                </p>
                <h4 className="font-serif font-bold text-xs text-[#0F172A] line-clamp-1">
                  {property.title}
                </h4>
                <p className="text-xs font-serif font-bold text-[#B48C4E]">
                  {property.priceText}
                </p>
              </div>
            </div>

            {/* Tour Type Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Select Tour Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setTourType('In-Person')}
                  className={`p-3 rounded-sm border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    tourType === 'In-Person'
                      ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-sm'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <Building2 className="w-4 h-4 text-[#B48C4E]" />
                  <span>In-Person Viewing</span>
                </button>

                <button
                  type="button"
                  onClick={() => setTourType('Video Tour')}
                  className={`p-3 rounded-sm border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    tourType === 'Video Tour'
                      ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-sm'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <Video className="w-4 h-4 text-[#B48C4E]" />
                  <span>Live Video Walkthrough</span>
                </button>
              </div>
            </div>

            {/* Date & Time Slot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Preferred Date
                </label>
                <input
                  type="date"
                  required
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-sm text-xs focus:bg-white focus:outline-none focus:border-[#B48C4E]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Preferred Time Slot
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-sm text-xs focus:bg-white focus:outline-none focus:border-[#B48C4E]"
                >
                  <option value="Morning (10am - 12pm)">Morning (10am - 12pm)</option>
                  <option value="Afternoon (2pm - 4pm)">Afternoon (2pm - 4pm)</option>
                  <option value="Evening (5pm - 7pm)">Evening (5pm - 7pm)</option>
                </select>
              </div>
            </div>

            {/* Buyer Status */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Your Buyer / Renter Status
              </label>
              <select
                value={buyerStatus}
                onChange={(e) => setBuyerStatus(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-sm text-xs focus:bg-white focus:outline-none focus:border-[#B48C4E]"
              >
                <option value="First Time Buyer">First Time Buyer</option>
                <option value="Looking to Sell First">Property to Sell First</option>
                <option value="Cash Buyer">Cash Buyer (Funds Ready)</option>
                <option value="Mortgage Approved">Mortgage Approved in Principle</option>
                <option value="Investor / Landlord">Property Investor</option>
                <option value="Tenant Searching">Prospective Tenant</option>
              </select>
            </div>

            {/* Contact Information */}
            <div className="space-y-3 pt-2 border-t border-slate-200">
              <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                Contact Details
              </label>

              <div>
                <input
                  type="text"
                  required
                  placeholder="Full Name *"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-sm text-xs focus:bg-white focus:outline-none focus:border-[#B48C4E]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="email"
                  required
                  placeholder="Email Address *"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-sm text-xs focus:bg-white focus:outline-none focus:border-[#B48C4E]"
                />
                <input
                  type="tel"
                  required
                  placeholder="Phone Number *"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-sm text-xs focus:bg-white focus:outline-none focus:border-[#B48C4E]"
                />
              </div>

              <textarea
                rows={2}
                placeholder="Additional notes, specific questions or accessibility requirements (optional)"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-sm text-xs focus:bg-white focus:outline-none focus:border-[#B48C4E]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#B48C4E] hover:bg-[#967540] text-white font-bold text-xs uppercase tracking-wider py-3 rounded-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-4"
            >
              <Send className="w-4 h-4" />
              <span>Confirm & Book Viewing</span>
            </button>

          </form>
        )}

      </div>
    </div>
  );
};
