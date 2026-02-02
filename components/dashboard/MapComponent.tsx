'use client';

import { useEffect, useRef, useState } from 'react';
import { Cable } from '@/types';

interface MapComponentProps {
  cables: Cable[];
  onCableClick: (cableId: string) => void;
}

export default function MapComponent({ cables, onCableClick }: MapComponentProps) {
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || typeof window === 'undefined') return;

    // Dynamically import Leaflet only on client side
    import('leaflet').then((L) => {
      // Fix for default marker icon issue
      delete (L.default as any).Icon.Default.prototype._getIconUrl;
      (L.default as any).Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      });

      // Initialize map
      if (!mapRef.current && document.getElementById('cable-map')) {
        mapRef.current = L.default.map('cable-map').setView([21.5, 58.5], 7);

        L.default.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
        }).addTo(mapRef.current);
      }

      // Clear existing markers
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];

      // Add markers for each cable
      if (mapRef.current) {
        cables.forEach(cable => {
          const statusColors = {
            healthy: '#10b981',
            warning: '#fbbf24',
            caution: '#f97316',
            critical: '#ef4444',
          };

          const icon = L.default.divIcon({
            className: 'custom-marker',
            html: `
              <div style="
                width: 24px;
                height: 24px;
                background-color: ${statusColors[cable.status]};
                border: 3px solid white;
                border-radius: 50%;
                box-shadow: 0 2px 8px rgba(0,0,0,0.3);
                ${cable.status === 'critical' ? 'animation: pulse 2s infinite;' : ''}
              "></div>
            `,
            iconSize: [24, 24],
            iconAnchor: [12, 12],
          });

          const marker = L.default.marker([cable.coordinates[0], cable.coordinates[1]], { icon })
            .bindPopup(`
              <div style="font-family: sans-serif;">
                <strong>${cable.id}</strong><br/>
                ${cable.location}<br/>
                <span style="color: ${statusColors[cable.status]}; font-weight: bold;">
                  ${cable.status.toUpperCase()}
                </span>
              </div>
            `)
            .on('click', () => onCableClick(cable.id));

          marker.addTo(mapRef.current);
          markersRef.current.push(marker);
        });

        // Fit bounds to show all markers
        if (cables.length > 0) {
          const bounds = L.default.latLngBounds(cables.map(c => [c.coordinates[0], c.coordinates[1]]));
          mapRef.current.fitBounds(bounds, { padding: [50, 50] });
        }
      }
    });
  }, [cables, onCableClick, isMounted]);

  if (!isMounted) {
    return <div id="cable-map" style={{ width: '100%', height: '100%', background: '#f3f4f6' }} />;
  }

  return <div id="cable-map" style={{ width: '100%', height: '100%' }} />;
}

