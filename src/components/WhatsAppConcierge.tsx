import React, { useState } from 'react';
import { MessageSquare, Phone, X, Send, Clock, UserCheck, ShieldCheck } from 'lucide-react';

interface WhatsAppConciergeProps {
  onOpenValuation: () => void;
  onOpenRoiCalculator: () => void;
  onOpenOffPlan: () => void;
}

export const WhatsAppConcierge: React.FC<WhatsAppConciergeProps> = ({
  onOpenValuation,
  onOpenRoiCalculator,
  onOpenOffPlan
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedTopic, setSelectedTopic] = useState<string>('Request Floor Plans & Brochure');

  const topics = [
    'Request Floor Plans & Brochure',
    'Book a Priority Property Viewing',
    'Calculate Investor Yield & ROI',
    'Book Free Home Valuation',
    'Inquire About Off-Plan Developments'
  ];

  const handleSendWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Morgan Property Services, I am inquiring regarding: "${selectedTopic}". Please connect me with an agent.`
    );
    window.open(`https://wa.me/442830261234?text=${text}`, '_blank');
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end">
      
      {/* Pop-up Agent Card */}
      {isOpen && (
        <div className="mb-3 w-80 bg-white border border-slate-200 rounded-sm shadow-2xl overflow-hidden animate-slideUp text-slate-900 border-t-4 border-t-[#25D366]">
          
          {/* Top Bar */}
          <div className="bg-[#0F172A] text-white p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=120&q=80"
                  alt="Agent"
                  className="w-9 h-9 rounded-full object-cover border-2 border-[#25D366]"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#25D366] rounded-full border-2 border-[#0F172A]" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-xs text-white">David Morgan</h4>
                <p className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                  <span>● Online</span> • Senior Managing Director
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Body */}
          <div className="p-4 space-y-3 text-xs bg-slate-50">
            <div className="bg-white p-3 rounded-sm border border-slate-200 shadow-2xs space-y-1">
              <p className="text-slate-700 font-medium leading-snug">
                "Welcome to Morgan Property Services. How can our team assist your property search or valuation today?"
              </p>
              <span className="text-[9px] text-slate-400 block text-right font-mono">Replies in &lt; 5 mins</span>
            </div>

            {/* Quick Action Chips */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Select Your Inquiry
              </span>
              {topics.map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTopic(t)}
                  className={`w-full text-left px-2.5 py-1.5 rounded text-[11px] font-medium border transition-all cursor-pointer ${
                    selectedTopic === t
                      ? 'bg-[#0F172A] text-white border-[#0F172A]'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-[#B48C4E]'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <button
              onClick={handleSendWhatsApp}
              className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs uppercase tracking-wider py-2.5 rounded-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>Start WhatsApp Fast-Chat</span>
            </button>
          </div>

          {/* Footer Direct Phone */}
          <div className="p-2.5 bg-slate-100 border-t border-slate-200 text-center text-[11px]">
            <span className="text-slate-500">Or Call Direct Office: </span>
            <a href="tel:+442830261234" className="font-bold text-[#0F172A] hover:text-[#B48C4E]">
              +44 28 3026 1234
            </a>
          </div>

        </div>
      )}

      {/* Floating Speed Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#25D366] hover:bg-[#20bd5a] text-white p-3.5 rounded-full shadow-2xl flex items-center gap-2 transition-transform hover:scale-105 cursor-pointer border-2 border-white"
        title="WhatsApp Direct Concierge"
      >
        <MessageSquare className="w-6 h-6 fill-white" />
        <span className="hidden sm:inline font-bold text-xs uppercase tracking-wider pr-1">
          WhatsApp Fast-Connect
        </span>
      </button>

    </div>
  );
};
