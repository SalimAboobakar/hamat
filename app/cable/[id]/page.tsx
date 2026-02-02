'use client';

import { useParams, useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store/appStore';
import { CableDetails } from '@/components/cable/CableDetails';
import { SensorCharts } from '@/components/cable/SensorCharts';
import { PredictionPanel } from '@/components/cable/PredictionPanel';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { ArrowLeft } from 'lucide-react';

export default function CablePage() {
  const params = useParams();
  const router = useRouter();
  const { t } = useLanguage();
  const { cables } = useAppStore();
  
  const cableId = params.id as string;
  const cable = cables.find(c => c.id === cableId);

  if (!cable) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Cable Not Found</h1>
        <button
          onClick={() => router.push('/')}
          className="text-oq-navy hover:underline"
        >
          {t('dashboard')}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back button */}
      <button
        onClick={() => router.push('/')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        {t('dashboard')}
      </button>

      {/* Cable Details */}
      <CableDetails cable={cable} />

      {/* Sensor Charts */}
      <SensorCharts cableId={cable.id} />

      {/* AI Prediction Panel */}
      <PredictionPanel cable={cable} />
    </div>
  );
}

