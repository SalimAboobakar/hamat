'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/shared/Card';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useAppStore } from '@/lib/store/appStore';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

// Dynamically import map to avoid SSR issues
const MapComponent = dynamic(() => import('./MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="h-full flex items-center justify-center">
      <LoadingSpinner size="lg" />
    </div>
  ),
});

export function CableMap() {
  const { t } = useLanguage();
  const { cables } = useAppStore();
  const [selectedZone, setSelectedZone] = useState<'all' | 'Sohar' | 'Duqm' | 'Muscat'>('all');
  const router = useRouter();

  const filteredCables = selectedZone === 'all' 
    ? cables 
    : cables.filter(cable => cable.zone === selectedZone);

  const statusCounts = {
    healthy: filteredCables.filter(c => c.status === 'healthy').length,
    warning: filteredCables.filter(c => c.status === 'warning').length,
    caution: filteredCables.filter(c => c.status === 'caution').length,
    critical: filteredCables.filter(c => c.status === 'critical').length,
  };

  return (
    <Card className="p-6 h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">{t('cables')}</h2>
        
        {/* Zone filter */}
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedZone('all')}
            className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
              selectedZone === 'all'
                ? 'bg-oq-navy text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {t('dashboard')}
          </button>
          <button
            onClick={() => setSelectedZone('Sohar')}
            className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
              selectedZone === 'Sohar'
                ? 'bg-oq-navy text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {t('sohar')}
          </button>
          <button
            onClick={() => setSelectedZone('Muscat')}
            className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
              selectedZone === 'Muscat'
                ? 'bg-oq-navy text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {t('muscat')}
          </button>
          <button
            onClick={() => setSelectedZone('Duqm')}
            className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
              selectedZone === 'Duqm'
                ? 'bg-oq-navy text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {t('duqm')}
          </button>
        </div>
      </div>

      {/* Status legend */}
      <div className="flex gap-4 mb-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-status-healthy" />
          <span className="text-gray-600" suppressHydrationWarning>{t('healthy')}: {statusCounts.healthy}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-status-warning" />
          <span className="text-gray-600" suppressHydrationWarning>{t('warning')}: {statusCounts.warning}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-status-caution" />
          <span className="text-gray-600" suppressHydrationWarning>{t('caution')}: {statusCounts.caution}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-status-critical animate-pulse" />
          <span className="text-gray-600" suppressHydrationWarning>{t('critical')}: {statusCounts.critical}</span>
        </div>
      </div>

      {/* Map container */}
      <div className="h-[400px] rounded-lg overflow-hidden border border-gray-200">
        <MapComponent cables={filteredCables} onCableClick={(cableId) => router.push(`/cable/${cableId}`)} />
      </div>
    </Card>
  );
}

