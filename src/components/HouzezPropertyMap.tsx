import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Property } from '../types';
import { MapPin, ExternalLink, Bed, Bath, Building2 } from 'lucide-react';

interface HouzezPropertyMapProps {
  properties: Property[];
  onSelectProperty: (property: Property) => void;
  hoveredPropertyId?: string | null;
}

// Coordinate mapping for Newry & Mourne towns/areas
const LOCATION_COORDINATES: Record<string, [number, number]> = {
  'Camlough': [54.1782, -6.4251],
  'Carnagat': [54.1850, -6.3500],
  'City Centre': [54.1751, -6.3402],
  'Bessbrook': [54.1950, -6.3890],
  'Warrenpoint': [54.1030, -6.2520],
  'Canal Bank': [54.1810, -6.3350],
  'Newry': [54.1751, -6.3402]
};

export const HouzezPropertyMap: React.FC<HouzezPropertyMapProps> = ({
  properties,
  onSelectProperty,
  hoveredPropertyId
}) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const leafletInstance = useRef<L.Map | null>(null);
  const markersRef = useRef<Record<string, L.Marker>>({});

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map if not existing
    if (!leafletInstance.current) {
      const defaultCenter: [number, number] = [54.1751, -6.3402]; // Newry
      const map = L.map(mapRef.current, {
        center: defaultCenter,
        zoom: 12,
        scrollWheelZoom: false
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors | Morgan Property Services'
      }).addTo(map);

      leafletInstance.current = map;
    }

    const map = leafletInstance.current;

    // Clear old markers
    Object.values(markersRef.current).forEach((marker: L.Marker) => marker.remove());
    markersRef.current = {};

    const bounds: L.LatLngBounds = L.latLngBounds([]);

    properties.forEach((property, index) => {
      // Get lat/lng based on area or default with slight offset
      const baseCoords = LOCATION_COORDINATES[property.address.area] || LOCATION_COORDINATES[property.address.town] || [54.1751, -6.3402];
      // Add slight jitter so overlapping points spread nicely
      const lat = baseCoords[0] + (index % 3 - 1) * 0.006;
      const lng = baseCoords[1] + (Math.floor(index / 3) % 3 - 1) * 0.007;

      bounds.extend([lat, lng]);

      const isHovered = hoveredPropertyId === property.id;

      // Custom Houzez Price Marker HTML
      const priceLabel = property.category === 'Rent' ? `£${property.price}/mo` : `£${(property.price / 1000).toFixed(0)}k`;
      const customIcon = L.divIcon({
        className: 'custom-houzez-marker',
        html: `
          <div class="houzez-pin ${isHovered ? 'active' : ''}">
            <span class="price-tag">${priceLabel}</span>
            <div class="arrow"></div>
          </div>
        `,
        iconSize: [60, 30],
        iconAnchor: [30, 30]
      });

      const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);

      // Popup content
      const popupHtml = `
        <div style="font-family: sans-serif; width: 180px; padding: 2px;">
          <img src="${property.mainImage}" style="width: 100%; height: 90px; object-fit: cover; border-radius: 2px; margin-bottom: 6px;" />
          <div style="font-size: 10px; font-weight: bold; color: #B48C4E; text-transform: uppercase;">${property.status}</div>
          <div style="font-size: 12px; font-weight: bold; color: #0F172A; line-height: 1.2; margin: 2px 0;">${property.title}</div>
          <div style="font-size: 12px; font-weight: bold; color: #B48C4E;">${property.priceText}</div>
        </div>
      `;

      marker.bindPopup(popupHtml);
      marker.on('click', () => {
        onSelectProperty(property);
      });

      markersRef.current[property.id] = marker;
    });

    if (properties.length > 0) {
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
    }

  }, [properties, hoveredPropertyId, onSelectProperty]);

  return (
    <div className="relative w-full h-[450px] sm:h-[550px] rounded-sm overflow-hidden border border-slate-300 shadow-md">
      <div ref={mapRef} className="w-full h-full z-10" />

      {/* Map Legend Overlay */}
      <div className="absolute top-3 left-3 z-20 bg-[#0F172A]/90 backdrop-blur-md text-white p-2.5 rounded-sm border border-slate-700/80 shadow-lg text-xs">
        <div className="flex items-center gap-1.5 font-serif font-bold text-[#B48C4E]">
          <MapPin className="w-3.5 h-3.5" />
          <span>Newry & Mourne Real Estate Map</span>
        </div>
        <p className="text-[10px] text-slate-300 mt-0.5">
          Showing {properties.length} active listing markers
        </p>
      </div>

      <style>{`
        .custom-houzez-marker {
          background: transparent;
          border: none;
        }
        .houzez-pin {
          background-color: #0F172A;
          color: #ffffff;
          padding: 4px 8px;
          border-radius: 3px;
          font-weight: 700;
          font-size: 11px;
          border: 1.5px solid #B48C4E;
          box-shadow: 0 4px 10px rgba(0,0,0,0.3);
          text-align: center;
          white-space: nowrap;
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
        }
        .houzez-pin.active, .houzez-pin:hover {
          background-color: #B48C4E;
          color: #ffffff;
          border-color: #0F172A;
          transform: scale(1.1);
        }
        .houzez-pin .arrow {
          position: absolute;
          bottom: -6px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-top: 6px solid #0F172A;
        }
        .houzez-pin.active .arrow, .houzez-pin:hover .arrow {
          border-top-color: #B48C4E;
        }
      `}</style>
    </div>
  );
};
