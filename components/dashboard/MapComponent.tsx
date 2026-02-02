'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Cable } from '@/types';

interface MapComponentProps {
  cables: Cable[];
  onCableClick: (cableId: string) => void;
}

export default function MapComponent({ cables, onCableClick }: MapComponentProps) {
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  useEffect(() => {
    // Initialize map
    if (!mapRef.current) {
      mapRef.current = L.map('cable-map').setView([21.5, 58.5], 7);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(mapRef.current);
    }

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add markers for each cable
    cables.forEach(cable => {
      const statusColors = {
        healthy: '#10b981',
        warning: '#fbbf24',
        caution: '#f97316',
        critical: '#ef4444',
      };

      const icon = L.divIcon({
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

      const marker = L.marker([cable.coordinates[0], cable.coordinates[1]], { icon })
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

      if (mapRef.current) {
        marker.addTo(mapRef.current);
        markersRef.current.push(marker);
      }
    });

    // Fit bounds to show all markers
    if (cables.length > 0 && mapRef.current) {
      const bounds = L.latLngBounds(cables.map(c => [c.coordinates[0], c.coordinates[1]]));
      mapRef.current.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [cables, onCableClick]);

  return <div id="cable-map" style={{ width: '100%', height: '100%' }} />;
}

