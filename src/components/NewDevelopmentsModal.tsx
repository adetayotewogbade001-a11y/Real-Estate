import React, { useState } from 'react';
import { 
  X, 
  Building2, 
  Calendar, 
  CheckCircle2, 
  FileText, 
  Layers, 
  Download, 
  ArrowRight,
  ShieldCheck,
  Percent
} from 'lucide-react';
import { OffPlanProject, CurrencyOption } from '../types';
import { MOCK_OFFPLAN_PROJECTS } from '../data/portalData';
import { formatPrice } from '../utils/formatters';

interface NewDevelopmentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currency: CurrencyOption;
}

export const NewDevelopmentsModal: React.FC<NewDevelopmentsModalProps> = ({
  isOpen,
  onClose,
  currency
}) => {
  const [selectedProject, setSelectedProject] = useState<OffPlanProject>(MOCK_OFFPLAN_PROJECTS[0]);
  const [brochureRequested, setBrochureRequested] = useState<boolean>(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 animate-fadeIn">
      <div className="bg-white border border-slate-200 rounded-sm max-w-5xl w-full overflow-hidden shadow-2xl text-slate-900 relative">
        
        {/* Header */}
        <div className="bg-[#0F172A] text-white p-4 sm:p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-sm bg-[#B48C4E] flex items-center justify-center text-white font-bold">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-serif font-bold text-white">
                VIP Off-Plan & New Residential Developments
              </h2>
              <p className="text-xs text-slate-300">
                Exclusive pre-launch projects, payment plan schedules & site brochures
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

        {/* Content Body */}
        <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 max-h-[82vh] overflow-y-auto">
          
          {/* Left Projects List Selector */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Featured Flagship Projects
            </span>

            {MOCK_OFFPLAN_PROJECTS.map((proj) => {
              const isSelected = selectedProject.id === proj.id;
              return (
                <div
                  key={proj.id}
                  onClick={() => {
                    setSelectedProject(proj);
                    setBrochureRequested(false);
                  }}
                  className={`p-3 rounded-sm border cursor-pointer transition-all space-y-2 ${
                    isSelected
                      ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-md'
                      : 'bg-white text-slate-800 border-slate-200 hover:border-[#B48C4E] hover:bg-slate-50'
                  }`}
                >
                  <div className="flex justify-between items-start gap-2">
                    <h4 className="font-serif font-bold text-xs line-clamp-1">
                      {proj.name}
                    </h4>
                    <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                      isSelected ? 'bg-[#B48C4E] text-white' : 'bg-slate-100 text-slate-800'
                    }`}>
                      {proj.completionDate}
                    </span>
                  </div>

                  <p className={`text-[10px] line-clamp-1 ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                    {proj.location}
                  </p>

                  <div className="flex justify-between items-center text-[10px] pt-1 border-t border-slate-700/30">
                    <span className={isSelected ? 'text-slate-300' : 'text-slate-500'}>Starting From:</span>
                    <span className="font-bold text-[#B48C4E]">
                      {formatPrice(proj.startingPriceGBP, currency)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Selected Project Details */}
          <div className="lg:col-span-8 space-y-5">
            
            {/* Project Image Banner */}
            <div className="relative h-56 rounded-sm overflow-hidden border border-slate-200">
              <img
                src={selectedProject.image}
                alt={selectedProject.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/30 to-transparent" />

              <div className="absolute top-3 left-3 bg-[#0F172A] text-white px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider border border-[#B48C4E]">
                Est. Completion: {selectedProject.completionDate}
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#B48C4E] block">
                  Developer: {selectedProject.developer}
                </span>
                <h3 className="text-xl font-serif font-bold text-white mt-0.5">
                  {selectedProject.name}
                </h3>
              </div>
            </div>

            {/* Construction Progress Bar */}
            <div className="bg-slate-50 border border-slate-200 p-3 rounded-sm space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-[#0F172A]">
                <span>Construction Progress Status:</span>
                <span className="text-[#B48C4E]">{selectedProject.progressPercent}% Complete</span>
              </div>
              <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#B48C4E] h-full rounded-full transition-all duration-700"
                  style={{ width: `${selectedProject.progressPercent}%` }}
                />
              </div>
            </div>

            {/* Key Stats Bar */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-sm">
                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block">
                  Starting Price
                </span>
                <span className="text-sm font-serif font-bold text-[#0F172A]">
                  {formatPrice(selectedProject.startingPriceGBP, currency)}
                </span>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-sm">
                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block">
                  Units Available
                </span>
                <span className="text-sm font-bold text-emerald-600">
                  {selectedProject.availableUnits} of {selectedProject.totalUnits} Units
                </span>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-sm">
                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block">
                  Target Yield
                </span>
                <span className="text-sm font-serif font-bold text-[#B48C4E]">
                  6.5% - 7.2% p.a.
                </span>
              </div>
            </div>

            {/* Flexible Payment Plan */}
            <div className="p-3 bg-slate-900 text-white rounded-sm space-y-1">
              <span className="text-[10px] uppercase font-bold text-[#B48C4E] tracking-wider block">
                Structured Off-Plan Payment Schedule
              </span>
              <p className="text-xs font-mono text-slate-200">
                {selectedProject.paymentPlan}
              </p>
            </div>

            {/* Highlights */}
            <div className="space-y-2">
              <p className="text-xs text-slate-600 leading-relaxed">
                {selectedProject.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                {selectedProject.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-slate-50 p-2 rounded-sm border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-[#B48C4E] flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Request Site Brochure */}
            <div className="pt-3 border-t border-slate-200">
              {brochureRequested ? (
                <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded text-center text-xs font-bold">
                  ✓ Developer Master Brochure & VIP Floor Plans dispatched to your email!
                </div>
              ) : (
                <button
                  onClick={() => setBrochureRequested(true)}
                  className="w-full bg-[#B48C4E] hover:bg-[#967540] text-white font-bold text-xs uppercase tracking-wider py-3 rounded-sm transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  <span>Request VIP Developer Brochure & Floor Plans</span>
                </button>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
