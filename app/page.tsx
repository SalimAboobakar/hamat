'use client';

import { KPICards } from '@/components/dashboard/KPICards';
import { CableMap } from '@/components/dashboard/CableMap';
import { AlertsPanel } from '@/components/dashboard/AlertsPanel';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { TDRCalculator } from '@/components/tdr/TDRCalculator';
import { TDREquation } from '@/components/tdr/TDREquation';
import { DeviceMockup } from '@/components/tdr/DeviceMockup';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useAppStore } from '@/lib/store/appStore';
import { PlayCircle, RotateCcw, FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const { t, language } = useLanguage();
  const { isDemoScenarioActive, startDemoScenario, stopDemoScenario, resetData } = useAppStore();
  const isRTL = language === 'ar';
  const router = useRouter();

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
    <div className="space-y-8 pb-8 relative">
      {/* Header with demo controls */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('appName')}</h1>
          <p className="text-gray-600 mt-1 text-lg">
            {t('tagline')}
          </p>
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          <button
            onClick={handleReset}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium"
          >
            <RotateCcw className="w-4 h-4" />
            {t('resetDemo')}
          </button>
          <button
            onClick={handleStartDemo}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors font-medium ${
              isDemoScenarioActive
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : 'bg-oq-navy hover:bg-oq-navy-light text-white'
            }`}
          >
            <PlayCircle className="w-4 h-4" />
            {isDemoScenarioActive ? (isRTL ? 'إيقاف العرض' : 'Stop Demo') : t('simulateAlert')}
          </button>
        </div>
      </div>

      {/* Generate Report Button */}
      <div className="flex justify-center">
        <button
          onClick={() => router.push('/service-report')}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-oq-gold to-yellow-400 hover:from-yellow-400 hover:to-oq-gold text-oq-navy rounded-lg transition-all font-bold shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <FileText className="w-5 h-5" />
          {t('generateReport')}
        </button>
      </div>

      {/* KPI Cards - Context Shifted to Fault Detection */}
      <div className="relative z-10">
        <KPICards />
      </div>

      {/* Main TDR Workstation Section */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 relative z-10 mb-12">
        {/* Left: TDR Calculator */}
        <div className="xl:col-span-7 flex flex-col gap-6">
           <TDRCalculator />
           <TDREquation />
        </div>

        {/* Right: Device Showcase */}
        <div className="xl:col-span-5 bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-6 border border-slate-700 flex flex-col items-center justify-center min-h-[500px]">
          <h3 className="text-white text-xl font-bold mb-8 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"/>
            {t('portableDevice')}
          </h3>
          <DeviceMockup />
          <div className="mt-8 text-center">
            <p className="text-slate-400 text-sm font-medium tracking-wide">
              {t('connectTestLocate')}
            </p>
            <div className="flex justify-center gap-2 mt-4">
              <span className="px-2 py-1 bg-slate-800 rounded text-xs text-slate-500 border border-slate-700">IP67 Rated</span>
              <span className="px-2 py-1 bg-slate-800 rounded text-xs text-slate-500 border border-slate-700">Explosion Proof</span>
            </div>
          </div>
        </div>
      </div>

      {/* Map & Alerts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-0">
        {/* Map: Visualizing Fault Locations */}
        <div className="lg:col-span-2 relative z-0">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800">{t('faultLocation')} Map</h3>
          </div>
          <CableMap />
        </div>

        {/* Alerts: Recent Detections */}
        <div className="relative z-10">
           <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800">{t('recentAlerts')}</h3>
          </div>
          <AlertsPanel />
        </div>
      </div>

      {/* Bottom: Recent Activity */}
      <div className="relative z-10">
        <RecentActivity />
      </div>
    </div>
  );
}
