'use client';

import { KPICards } from '@/components/dashboard/KPICards';
import { CableMap } from '@/components/dashboard/CableMap';
import { AlertsPanel } from '@/components/dashboard/AlertsPanel';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useAppStore } from '@/lib/store/appStore';
import { PlayCircle, RotateCcw } from 'lucide-react';

export default function DashboardPage() {
  const { t } = useLanguage();
  const { isDemoScenarioActive, startDemoScenario, stopDemoScenario, resetData } = useAppStore();

  const handleStartDemo = () => {
    if (isDemoScenarioActive) {
      stopDemoScenario();
    } else {
      startDemoScenario();
    }
  };

  const handleReset = () => {
    stopDemoScenario();
    resetData();
  };

  return (
    <div className="space-y-6">
      {/* Header with demo controls */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('dashboard')}</h1>
          <p className="text-gray-600 mt-1">
            {t('systemHealth')} & {t('monitoring')}
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium"
          >
            <RotateCcw className="w-4 h-4" />
            {t('resetDemo')}
          </button>
          <button
            onClick={handleStartDemo}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-medium ${
              isDemoScenarioActive
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : 'bg-oq-navy hover:bg-oq-navy-light text-white'
            }`}
          >
            <PlayCircle className="w-4 h-4" />
            {isDemoScenarioActive ? 'Stop Demo' : t('simulateAlert')}
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <KPICards />

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left side: Map */}
        <div className="lg:col-span-2">
          <CableMap />
        </div>

        {/* Right side: Alerts */}
        <div>
          <AlertsPanel />
        </div>
      </div>

      {/* Bottom: Recent Activity */}
      <RecentActivity />
    </div>
  );
}

