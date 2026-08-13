import React, { useState, useEffect } from 'react';
import { Property, PropertyFilter } from './types';
import { INITIAL_PROPERTIES } from './data/mockProperties';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { PropertyDetailModal } from './components/PropertyDetailModal';
import { ValuationModal } from './components/ValuationModal';
import { CmsManageModal } from './components/CmsManageModal';
import { LegalModal } from './components/LegalModal';
import { PropertyCompareBar } from './components/PropertyCompareBar';
import { PropertyCompareModal } from './components/PropertyCompareModal';
import { SavedFavoritesDrawer } from './components/SavedFavoritesDrawer';
import { ScheduleTourModal } from './components/ScheduleTourModal';

import { HomeView } from './views/HomeView';
import { PropertiesView } from './views/PropertiesView';
import { SalesView } from './views/SalesView';
import { LettingsView } from './views/LettingsView';
import { CommercialView } from './views/CommercialView';
import { AboutView } from './views/AboutView';
import { ServicesView } from './views/ServicesView';
import { ContactView } from './views/ContactView';

export default function App() {
  // 1. Current Navigation View
  const [currentView, setCurrentView] = useState<string>(() => {
    const hash = window.location.hash.replace('#', '');
    return ['home', 'properties', 'sales', 'lettings', 'commercial', 'about', 'services', 'contact'].includes(hash)
      ? hash
      : 'home';
  });

  // Sync Hash with View
  useEffect(() => {
    window.location.hash = currentView;
  }, [currentView]);

  // Handle browser back/forward
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (['home', 'properties', 'sales', 'lettings', 'commercial', 'about', 'services', 'contact'].includes(hash)) {
        setCurrentView(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // 2. Properties Persistent State
  const [properties, setProperties] = useState<Property[]>(() => {
    try {
      const stored = localStorage.getItem('mps_properties_v1');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (err) {
      console.warn('Failed to load local properties:', err);
    }
    return INITIAL_PROPERTIES;
  });

  useEffect(() => {
    try {
      localStorage.setItem('mps_properties_v1', JSON.stringify(properties));
    } catch (err) {
      console.warn('Failed to save properties locally:', err);
    }
  }, [properties]);

  // 3. Saved Properties / Wishlist State
  const [savedPropertyIds, setSavedPropertyIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('mps_saved_properties');
      if (stored) return JSON.parse(stored);
    } catch (err) {}
    return ['prop-001'];
  });

  useEffect(() => {
    try {
      localStorage.setItem('mps_saved_properties', JSON.stringify(savedPropertyIds));
    } catch (err) {}
  }, [savedPropertyIds]);

  const toggleSaveProperty = (id: string) => {
    setSavedPropertyIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // 4. Houzez Compare Properties State
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState<boolean>(false);

  const toggleCompareProperty = (property: Property) => {
    setCompareIds(prev => {
      if (prev.includes(property.id)) {
        return prev.filter(id => id !== property.id);
      }
      if (prev.length >= 4) {
        return prev;
      }
      return [...prev, property.id];
    });
  };

  const removeCompareProperty = (id: string) => {
    setCompareIds(prev => prev.filter(pId => pId !== id));
  };

  const clearCompareProperties = () => {
    setCompareIds([]);
  };

  const compareProperties = properties.filter(p => compareIds.includes(p.id));

  // 5. Saved Wishlist Drawer State
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState<boolean>(false);
  const savedPropertiesList = properties.filter(p => savedPropertyIds.includes(p.id));

  // 6. Schedule Tour Viewing State
  const [scheduleTourProperty, setScheduleTourProperty] = useState<Property | null>(null);

  // 7. Property Detail Modal State
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  // 8. Valuation Modal State
  const [valuationModalOpen, setValuationModalOpen] = useState<boolean>(false);

  // 9. CMS Manage Modal State
  const [cmsModalOpen, setCmsModalOpen] = useState<boolean>(false);

  // 10. Legal Modals
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | 'cookies' | null>(null);

  // 11. Shared Filter State
  const [filter, setFilter] = useState<PropertyFilter>({
    category: 'All',
    propertyType: '',
    location: '',
    minPrice: 0,
    maxPrice: 0,
    minBedrooms: 0,
    searchQuery: '',
    statusFilter: ''
  });

  const handleSearchProperties = () => {
    setCurrentView('properties');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // CMS Handlers
  const handleAddProperty = (newProp: Property) => {
    setProperties(prev => [newProp, ...prev]);
  };

  const handleUpdateProperty = (updatedProp: Property) => {
    setProperties(prev => prev.map(p => p.id === updatedProp.id ? updatedProp : p));
  };

  const handleDeleteProperty = (id: string) => {
    setProperties(prev => prev.filter(p => p.id !== id));
  };

  const handleResetDefaultProperties = () => {
    setProperties(INITIAL_PROPERTIES);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-slate-900 flex flex-col font-sans selection:bg-[#B48C4E] selection:text-white">
      
      {/* Navigation Header */}
      <Header
        currentView={currentView}
        setCurrentView={setCurrentView}
        savedCount={savedPropertyIds.length}
        onOpenValuation={() => setValuationModalOpen(true)}
        onOpenCms={() => setCmsModalOpen(true)}
        onOpenSavedDrawer={() => setIsSavedDrawerOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomeView
            properties={properties}
            onSelectProperty={setSelectedProperty}
            savedPropertyIds={savedPropertyIds}
            onToggleSaveProperty={toggleSaveProperty}
            filter={filter}
            setFilter={setFilter}
            onSearchProperties={handleSearchProperties}
            onOpenValuation={() => setValuationModalOpen(true)}
            onNavigate={setCurrentView}
          />
        )}

        {currentView === 'properties' && (
          <PropertiesView
            properties={properties}
            onSelectProperty={setSelectedProperty}
            savedPropertyIds={savedPropertyIds}
            onToggleSaveProperty={toggleSaveProperty}
            filter={filter}
            setFilter={setFilter}
            onOpenCms={() => setCmsModalOpen(true)}
            onOpenValuation={() => setValuationModalOpen(true)}
            compareIds={compareIds}
            onToggleCompare={toggleCompareProperty}
            onScheduleViewing={setScheduleTourProperty}
          />
        )}

        {currentView === 'sales' && (
          <SalesView
            onOpenValuation={() => setValuationModalOpen(true)}
            onNavigate={setCurrentView}
          />
        )}

        {currentView === 'lettings' && (
          <LettingsView
            onNavigate={setCurrentView}
            onOpenValuation={() => setValuationModalOpen(true)}
          />
        )}

        {currentView === 'commercial' && (
          <CommercialView
            onNavigate={setCurrentView}
          />
        )}

        {currentView === 'about' && (
          <AboutView
            onOpenValuation={() => setValuationModalOpen(true)}
            onNavigate={setCurrentView}
          />
        )}

        {currentView === 'services' && (
          <ServicesView
            onOpenValuation={() => setValuationModalOpen(true)}
            onNavigate={setCurrentView}
          />
        )}

        {currentView === 'contact' && (
          <ContactView />
        )}
      </main>

      {/* Footer */}
      <Footer
        setCurrentView={setCurrentView}
        onOpenValuation={() => setValuationModalOpen(true)}
        onOpenLegal={setLegalModalType}
      />

      {/* Houzez Floating Compare Bar */}
      <PropertyCompareBar
        compareProperties={compareProperties}
        onOpenCompareModal={() => setIsCompareModalOpen(true)}
        onRemoveProperty={removeCompareProperty}
        onClearAll={clearCompareProperties}
      />

      {/* Houzez Full Comparison Modal */}
      <PropertyCompareModal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        compareProperties={compareProperties}
        onRemoveFromCompare={removeCompareProperty}
        onSelectProperty={setSelectedProperty}
        onClearAll={clearCompareProperties}
      />

      {/* Houzez Saved Wishlist Drawer */}
      <SavedFavoritesDrawer
        isOpen={isSavedDrawerOpen}
        onClose={() => setIsSavedDrawerOpen(false)}
        savedProperties={savedPropertiesList}
        onRemoveFavorite={toggleSaveProperty}
        onClearAll={() => setSavedPropertyIds([])}
        onSelectProperty={setSelectedProperty}
        onToggleCompare={toggleCompareProperty}
        compareIds={compareIds}
      />

      {/* Houzez Schedule a Viewing / Tour Modal */}
      <ScheduleTourModal
        property={scheduleTourProperty}
        isOpen={!!scheduleTourProperty}
        onClose={() => setScheduleTourProperty(null)}
      />

      {/* Modals */}
      <PropertyDetailModal
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
        isSaved={selectedProperty ? savedPropertyIds.includes(selectedProperty.id) : false}
        onToggleSave={toggleSaveProperty}
        onOpenValuation={() => {
          setSelectedProperty(null);
          setValuationModalOpen(true);
        }}
      />

      <ValuationModal
        isOpen={valuationModalOpen}
        onClose={() => setValuationModalOpen(false)}
      />

      <CmsManageModal
        isOpen={cmsModalOpen}
        onClose={() => setCmsModalOpen(false)}
        properties={properties}
        onAddProperty={handleAddProperty}
        onUpdateProperty={handleUpdateProperty}
        onDeleteProperty={handleDeleteProperty}
        onResetToDefault={handleResetDefaultProperties}
      />

      <LegalModal
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />

    </div>
  );
}
