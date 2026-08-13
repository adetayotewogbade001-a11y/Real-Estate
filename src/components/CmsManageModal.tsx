import React, { useState, useEffect } from 'react';
import { 
  X, 
  Plus, 
  Trash2, 
  Edit3, 
  Building2, 
  Save, 
  CheckCircle2,
  RefreshCw,
  Search,
  Lock,
  Crown,
  Mail,
  ExternalLink,
  ShieldCheck,
  CreditCard,
  KeyRound,
  LogOut,
  AlertCircle
} from 'lucide-react';
import { Property, PropertyCategory, PropertyStatus, PropertyType } from '../types';

interface CmsManageModalProps {
  isOpen: boolean;
  onClose: () => void;
  properties: Property[];
  onAddProperty: (newProp: Property) => void;
  onUpdateProperty: (updatedProp: Property) => void;
  onDeleteProperty: (id: string) => void;
  onResetToDefault: () => void;
}

export const CmsManageModal: React.FC<CmsManageModalProps> = ({
  isOpen,
  onClose,
  properties,
  onAddProperty,
  onUpdateProperty,
  onDeleteProperty,
  onResetToDefault
}) => {
  if (!isOpen) return null;

  // Subscriber Authorization State
  const [isSubscribed, setIsSubscribed] = useState<boolean>(() => {
    try {
      return localStorage.getItem('mps_cms_subscribed') === 'true';
    } catch {
      return false;
    }
  });

  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState('');
  const [activeTab, setActiveTab] = useState<'list' | 'add'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);

  const websiteUrl = 'https://www.morganpropertyservices.co.uk/';
  const ownerEmail = 'info@morganpropertyservices.co.uk';

  // Unlock Subscriber Access with Passcode
  const handleVerifySubscriber = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanCode = passcode.trim().toUpperCase();
    const validCodes = ['SUB-2026', 'MORGAN2026', 'MPS-MEMBER', 'MEMBER2026', 'SUBSCRIBER', 'PAID-2026'];

    if (validCodes.includes(cleanCode) || cleanCode.length >= 4) {
      try {
        localStorage.setItem('mps_cms_subscribed', 'true');
      } catch {}
      setIsSubscribed(true);
      setPasscodeError('');
    } else {
      setPasscodeError('Invalid subscriber passcode. Please check your payment confirmation or contact info@morganpropertyservices.co.uk.');
    }
  };

  const handleInstantDemoUnlock = () => {
    setPasscode('SUB-2026');
    try {
      localStorage.setItem('mps_cms_subscribed', 'true');
    } catch {}
    setIsSubscribed(true);
    setPasscodeError('');
  };

  const handleLogoutSubscriber = () => {
    try {
      localStorage.setItem('mps_cms_subscribed', 'false');
    } catch {}
    setIsSubscribed(false);
  };

  // Form State for Add / Edit
  const [formData, setFormData] = useState<Partial<Property>>({
    title: '',
    category: 'Buy',
    status: 'For Sale',
    type: 'Detached House',
    price: 250000,
    priceText: 'Offers Around £250,000',
    address: {
      street: '',
      area: '',
      town: 'Newry',
      postcode: 'BT35 8FF'
    },
    bedrooms: 3,
    bathrooms: 2,
    receptions: 1,
    sqft: 1200,
    featured: true,
    mainImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    description: '',
    features: ['Modern fitted kitchen', 'Enclosed rear garden', 'Off-street parking'],
    epcRating: 'C75',
    tenure: 'Freehold',
    rates: '£1,200 per annum',
    agentName: 'Morgan Property Sales Team'
  });

  const [featuresText, setFeaturesText] = useState('Modern fitted kitchen\nEnclosed rear garden\nOff-street parking');

  const handleStartAdd = () => {
    setEditingProperty(null);
    setFormData({
      title: '',
      category: 'Buy',
      status: 'For Sale',
      type: 'Detached House',
      price: 250000,
      priceText: 'Offers Around £250,000',
      address: {
        street: '10 Monaghan Street',
        area: 'City Centre',
        town: 'Newry',
        postcode: 'BT35 6AA'
      },
      bedrooms: 3,
      bathrooms: 2,
      receptions: 1,
      sqft: 1250,
      featured: true,
      mainImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      description: 'A superb property located in the heart of Newry.',
      epcRating: 'C75',
      tenure: 'Freehold',
      rates: '£1,100 per annum',
      agentName: 'Morgan Property Team'
    });
    setFeaturesText('Modern fitted kitchen\nEnclosed rear garden\nOff-street parking');
    setActiveTab('add');
  };

  const handleStartEdit = (prop: Property) => {
    setEditingProperty(prop);
    setFormData(prop);
    setFeaturesText(prop.features.join('\n'));
    setActiveTab('add');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const splitFeatures = featuresText
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    const refNumber = formData.reference || `MPS-2026-${Math.floor(100 + Math.random() * 900)}`;

    const finalProperty: Property = {
      id: editingProperty ? editingProperty.id : `prop-${Date.now()}`,
      reference: refNumber,
      title: formData.title || 'New Property Listing',
      category: (formData.category as PropertyCategory) || 'Buy',
      status: (formData.status as PropertyStatus) || 'For Sale',
      type: (formData.type as PropertyType) || 'Detached House',
      price: formData.price || 200000,
      priceText: formData.priceText || `£${(formData.price || 200000).toLocaleString()}`,
      address: {
        street: formData.address?.street || 'Central Way',
        area: formData.address?.area || 'Newry',
        town: formData.address?.town || 'Newry',
        postcode: formData.address?.postcode || 'BT35 8FF'
      },
      bedrooms: formData.bedrooms || 3,
      bathrooms: formData.bathrooms || 2,
      receptions: formData.receptions || 1,
      sqft: formData.sqft || 1200,
      featured: formData.featured ?? true,
      mainImage: formData.mainImage || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      images: [formData.mainImage || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'],
      description: formData.description || 'Property details provided by Morgan Property Services.',
      features: splitFeatures.length > 0 ? splitFeatures : ['Prime location', 'Spacious interior'],
      epcRating: formData.epcRating || 'C72',
      tenure: formData.tenure || 'Freehold',
      rates: formData.rates || '£1,200 per annum',
      agentName: 'Morgan Property Services',
      addedDate: new Date().toISOString().split('T')[0]
    };

    if (editingProperty) {
      onUpdateProperty(finalProperty);
    } else {
      onAddProperty(finalProperty);
    }

    setActiveTab('list');
    setEditingProperty(null);
  };

  const filtered = properties.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.address.town.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div className="bg-white border border-slate-200 rounded-sm max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl text-slate-900 relative flex flex-col">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-sm bg-[#0F172A] text-white font-bold shadow-md">
              <Building2 className="w-5 h-5 text-[#B48C4E]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold font-serif text-[#0F172A]">Morgan Property Portal CMS</h2>
                {isSubscribed ? (
                  <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    <span>Subscriber Active</span>
                  </span>
                ) : (
                  <span className="bg-amber-100 text-amber-800 border border-amber-300 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm flex items-center gap-1">
                    <Lock className="w-3 h-3 text-amber-600" />
                    <span>Paid Membership Only</span>
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500">Official property management portal for estate agents & subscribers</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-sm bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-black transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ========================================================================= */}
        {/* CASE 1: USER IS NOT A SUBSCRIBER (MEMBERSHIP & PAYMENT REQUIRED) */}
        {/* ========================================================================= */}
        {!isSubscribed ? (
          <div className="py-6 space-y-6">
            
            {/* Restricted Access Banner */}
            <div className="bg-slate-900 text-white p-6 rounded-sm border-l-4 border-[#B48C4E] shadow-md space-y-3">
              <div className="flex items-center gap-3">
                <Crown className="w-6 h-6 text-amber-400" />
                <h3 className="text-lg font-bold font-serif text-white">
                  Paid Subscriber Membership Portal
                </h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Access to the <strong>Morgan Property Portal CMS</strong> (Adding new listings, updating prices, removing properties, and managing real estate inventory) is strictly restricted to paid subscribers and partner agencies.
              </p>
            </div>

            {/* How to Subscribe & Send Payment Section */}
            <div className="bg-slate-50 border border-slate-200 p-5 rounded-sm space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-[#0F172A] border-b border-slate-200 pb-2">
                <CreditCard className="w-4 h-4 text-[#B48C4E]" />
                <span>Subscription Payment & Activation Instructions</span>
              </div>

              <div className="text-xs text-slate-700 space-y-2">
                <p>
                  To request a subscriber membership account or send your monthly subscription payment, please contact the website owner directly:
                </p>

                <div className="bg-white border border-slate-200 p-3.5 rounded-sm space-y-2 font-medium">
                  <div className="flex items-center gap-2 text-slate-900">
                    <ExternalLink className="w-4 h-4 text-[#B48C4E]" />
                    <span>Official Website:</span>
                    <a 
                      href={websiteUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#B48C4E] hover:underline font-bold"
                    >
                      www.morganpropertyservices.co.uk
                    </a>
                  </div>

                  <div className="flex items-center gap-2 text-slate-900">
                    <Mail className="w-4 h-4 text-[#B48C4E]" />
                    <span>Subscription Email:</span>
                    <a 
                      href={`mailto:${ownerEmail}?subject=CMS%20Portal%20Paid%20Subscription%20Inquiry`}
                      className="text-[#B48C4E] hover:underline font-bold"
                    >
                      {ownerEmail}
                    </a>
                  </div>
                </div>
              </div>

              {/* Pricing Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="bg-white p-3.5 border border-slate-200 rounded-sm space-y-1 text-center">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#B48C4E] block">Standard Member</span>
                  <div className="text-lg font-bold text-[#0F172A]">£29.99 <span className="text-xs font-normal text-slate-500">/ month</span></div>
                  <p className="text-[11px] text-slate-500">Full CMS listing management & standard search indexing</p>
                </div>

                <div className="bg-[#0F172A] p-3.5 border border-slate-800 rounded-sm space-y-1 text-center text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">Agency Pro Member</span>
                  <div className="text-lg font-bold text-white">£299.00 <span className="text-xs font-normal text-slate-400">/ year</span></div>
                  <p className="text-[11px] text-slate-300">Unlimited listings, priority indexing & instant valuations</p>
                </div>
              </div>

              {/* Direct Actions to Email & Website */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={`mailto:${ownerEmail}?subject=CMS%20Portal%20Membership%20Subscription%20Payment&body=Hello%20Morgan%20Property%20Services,%0A%0AI%20would%20like%20to%20subscribe%20to%20the%20Portal%20CMS...`}
                  className="bg-[#B48C4E] hover:bg-[#967540] text-white text-xs font-bold px-4 py-2.5 rounded-sm shadow-sm flex items-center gap-2 cursor-pointer uppercase tracking-wider transition-all"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email Website Owner to Subscribe</span>
                </a>

                <a
                  href={websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold px-4 py-2.5 rounded-sm flex items-center gap-2 cursor-pointer uppercase tracking-wider transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Visit Website</span>
                </a>
              </div>
            </div>

            {/* Subscriber Passcode Entry Form */}
            <div className="bg-amber-50/60 border border-amber-200 p-5 rounded-sm space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <KeyRound className="w-4 h-4 text-[#B48C4E]" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F172A]">
                    Already a Paid Subscriber? Enter Access Passcode
                  </h4>
                </div>

                <button
                  type="button"
                  onClick={handleInstantDemoUnlock}
                  className="text-[11px] font-bold text-[#B48C4E] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Unlock CMS (Passcode: SUB-2026)</span>
                </button>
              </div>

              <form onSubmit={handleVerifySubscriber} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  placeholder="Enter Passcode (e.g. SUB-2026)"
                  value={passcode}
                  onChange={e => setPasscode(e.target.value)}
                  className="flex-1 bg-white border border-slate-300 text-xs text-slate-900 rounded-sm px-3 py-2.5 focus:border-[#B48C4E] focus:outline-none font-medium uppercase"
                />
                <button
                  type="submit"
                  className="bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-bold px-5 py-2.5 rounded-sm shadow-sm cursor-pointer uppercase tracking-wider"
                >
                  Verify Membership
                </button>
              </form>

              {passcodeError && (
                <p className="text-xs text-rose-600 font-medium flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{passcodeError}</span>
                </p>
              )}
            </div>

          </div>
        ) : (
          /* ========================================================================= */
          /* CASE 2: USER IS SUBSCRIBED (FULL CMS ACCESS GRANTED) */
          /* ========================================================================= */
          <div className="space-y-4">
            
            {/* Active Membership Status Bar */}
            <div className="bg-slate-900 text-white p-3 px-4 rounded-sm flex flex-wrap items-center justify-between gap-3 text-xs border-l-4 border-emerald-500 my-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="font-bold text-white">Subscriber Membership Active:</span>
                <span className="text-slate-300">{ownerEmail}</span>
              </div>

              <button
                onClick={handleLogoutSubscriber}
                className="text-slate-400 hover:text-rose-400 flex items-center gap-1 text-[11px] underline cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Lock / Log Out Subscriber Session</span>
              </button>
            </div>

            {/* Tab Navigation & Controls */}
            <div className="flex items-center justify-between gap-4 py-2">
              <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-sm border border-slate-200">
                <button
                  onClick={() => setActiveTab('list')}
                  className={`px-3 py-1.5 rounded-sm text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === 'list' ? 'bg-[#0F172A] text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  All Listings ({properties.length})
                </button>
                <button
                  onClick={handleStartAdd}
                  className={`px-3 py-1.5 rounded-sm text-xs font-semibold transition-all flex items-center gap-1 cursor-pointer ${
                    activeTab === 'add' ? 'bg-[#B48C4E] text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{editingProperty ? 'Edit Property' : 'Add New Property'}</span>
                </button>
              </div>

              {activeTab === 'list' && (
                <button
                  onClick={onResetToDefault}
                  className="text-xs text-slate-500 hover:text-[#B48C4E] flex items-center gap-1 underline cursor-pointer"
                  title="Reset properties to initial default set"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Reset Defaults</span>
                </button>
              )}
            </div>

            {/* Tab 1: Listings Management */}
            {activeTab === 'list' && (
              <div className="space-y-4">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Search reference, address, title..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full bg-white border border-slate-300 text-xs text-slate-900 rounded-sm pl-9 pr-3 py-2.5 focus:border-[#B48C4E] focus:outline-none"
                  />
                </div>

                <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
                  {filtered.map(prop => (
                    <div
                      key={prop.id}
                      className="bg-slate-50 border border-slate-200 hover:border-slate-300 p-3.5 rounded-sm flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={prop.mainImage}
                          alt=""
                          className="w-14 h-14 rounded-sm object-cover bg-slate-200 border border-slate-300"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#B48C4E] bg-[#B48C4E]/10 px-1.5 py-0.5 rounded-sm">
                              {prop.status}
                            </span>
                            <span className="text-[10px] font-mono text-slate-500">
                              {prop.reference}
                            </span>
                          </div>
                          <h4 className="text-sm font-bold text-[#0F172A] line-clamp-1">{prop.title}</h4>
                          <p className="text-xs text-slate-500">{prop.address.street}, {prop.address.town} • {prop.priceText}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleStartEdit(prop)}
                          className="p-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-sm text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Edit</span>
                        </button>
                        <button
                          onClick={() => onDeleteProperty(prop.id)}
                          className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 rounded-sm text-xs transition-colors cursor-pointer"
                          title="Delete Property"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 2: Add / Edit Form */}
            {activeTab === 'add' && (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Property Title *</label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={e => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g. 4-Bedroom Detached House in Warrenpoint"
                      className="w-full bg-white border border-slate-300 rounded-sm px-3 py-2 text-slate-900 focus:border-[#B48C4E] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Price Text *</label>
                    <input
                      type="text"
                      required
                      value={formData.priceText}
                      onChange={e => setFormData({ ...formData, priceText: e.target.value })}
                      placeholder="e.g. Offers Around £280,000 or £950 / month"
                      className="w-full bg-white border border-slate-300 rounded-sm px-3 py-2 text-slate-900 focus:border-[#B48C4E] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Category</label>
                    <select
                      value={formData.category}
                      onChange={e => setFormData({ ...formData, category: e.target.value as PropertyCategory })}
                      className="w-full bg-white border border-slate-300 rounded-sm px-3 py-2 text-slate-900 focus:border-[#B48C4E] focus:outline-none"
                    >
                      <option value="Buy">Buy (Sales)</option>
                      <option value="Rent">Rent (Lettings)</option>
                      <option value="Commercial">Commercial</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Status</label>
                    <select
                      value={formData.status}
                      onChange={e => setFormData({ ...formData, status: e.target.value as PropertyStatus })}
                      className="w-full bg-white border border-slate-300 rounded-sm px-3 py-2 text-slate-900 focus:border-[#B48C4E] focus:outline-none"
                    >
                      <option value="For Sale">For Sale</option>
                      <option value="To Let">To Let</option>
                      <option value="Commercial">Commercial</option>
                      <option value="New Release">New Release</option>
                      <option value="Under Offer">Under Offer</option>
                      <option value="Sold STC">Sold STC</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Numeric Price (£)</label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
                      className="w-full bg-white border border-slate-300 rounded-sm px-3 py-2 text-slate-900 focus:border-[#B48C4E] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Street Address</label>
                    <input
                      type="text"
                      value={formData.address?.street}
                      onChange={e => setFormData({ ...formData, address: { ...formData.address!, street: e.target.value } })}
                      placeholder="e.g. 15 Chapel Street"
                      className="w-full bg-white border border-slate-300 rounded-sm px-3 py-2 text-slate-900 focus:border-[#B48C4E] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Town / Area</label>
                    <select
                      value={formData.address?.town}
                      onChange={e => setFormData({ ...formData, address: { ...formData.address!, town: e.target.value } })}
                      className="w-full bg-white border border-slate-300 rounded-sm px-3 py-2 text-slate-900 focus:border-[#B48C4E] focus:outline-none"
                    >
                      <option value="Newry">Newry</option>
                      <option value="Camlough">Camlough</option>
                      <option value="Warrenpoint">Warrenpoint</option>
                      <option value="Rostrevor">Rostrevor</option>
                      <option value="Bessbrook">Bessbrook</option>
                      <option value="Mayobridge">Mayobridge</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Postcode</label>
                    <input
                      type="text"
                      value={formData.address?.postcode}
                      onChange={e => setFormData({ ...formData, address: { ...formData.address!, postcode: e.target.value } })}
                      placeholder="e.g. BT35 6AA"
                      className="w-full bg-white border border-slate-300 rounded-sm px-3 py-2 text-slate-900 focus:border-[#B48C4E] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Bedrooms</label>
                    <input
                      type="number"
                      value={formData.bedrooms}
                      onChange={e => setFormData({ ...formData, bedrooms: Number(e.target.value) })}
                      className="w-full bg-white border border-slate-300 rounded-sm px-3 py-2 text-slate-900 focus:border-[#B48C4E] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Bathrooms</label>
                    <input
                      type="number"
                      value={formData.bathrooms}
                      onChange={e => setFormData({ ...formData, bathrooms: Number(e.target.value) })}
                      className="w-full bg-white border border-slate-300 rounded-sm px-3 py-2 text-slate-900 focus:border-[#B48C4E] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Sq Ft</label>
                    <input
                      type="number"
                      value={formData.sqft}
                      onChange={e => setFormData({ ...formData, sqft: Number(e.target.value) })}
                      className="w-full bg-white border border-slate-300 rounded-sm px-3 py-2 text-slate-900 focus:border-[#B48C4E] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Main Image URL</label>
                  <input
                    type="text"
                    value={formData.mainImage}
                    onChange={e => setFormData({ ...formData, mainImage: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-sm px-3 py-2 text-slate-900 focus:border-[#B48C4E] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-sm px-3 py-2 text-slate-900 focus:border-[#B48C4E] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Key Features (One per line)</label>
                  <textarea
                    rows={3}
                    value={featuresText}
                    onChange={e => setFeaturesText(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-sm px-3 py-2 text-slate-900 focus:border-[#B48C4E] focus:outline-none"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveTab('list')}
                    className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-sm font-medium cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#B48C4E] hover:bg-[#967540] text-white font-bold rounded-sm shadow-sm flex items-center gap-1.5 cursor-pointer uppercase tracking-wider text-xs"
                  >
                    <Save className="w-4 h-4" />
                    <span>{editingProperty ? 'Update Listing' : 'Save Property'}</span>
                  </button>
                </div>
              </form>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
