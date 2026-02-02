'use client';

import { CostSavings } from '@/components/analytics/CostSavings';
import { TrendCharts } from '@/components/analytics/TrendCharts';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Download, TrendingUp } from 'lucide-react';

export default function AnalyticsPage() {
  const { t, language } = useLanguage();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('analytics')}</h1>
          <p className="text-gray-600 mt-1">
            {language === 'ar' 
              ? 'ذكاء الأعمال وتحليل عائد الاستثمار'
              : 'Business Intelligence & ROI Analysis'}
          </p>
        </div>

        <button className="flex items-center gap-2 px-4 py-2 bg-oq-navy hover:bg-oq-navy-light text-white rounded-lg transition-colors font-medium">
          <Download className="w-4 h-4" />
          {t('exportReport')}
        </button>
      </div>

      {/* Executive Summary */}
      <div className="bg-gradient-to-r from-oq-navy to-oq-navy-light text-white rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp className="w-8 h-8" />
          <h2 className="text-2xl font-bold">
            {language === 'ar' ? 'الملخص التنفيذي' : 'Executive Summary'}
          </h2>
        </div>
        <p className="text-oq-blue text-lg">
          {language === 'ar'
            ? 'أدى تطبيق الصيانة التنبؤية إلى توفير بنسبة 50٪ في تكاليف الصيانة وتحسين وقت تشغيل النظام بنسبة 69٪. متوسط فترة الاسترداد للاستثمار هو 2 أشهر فقط.'
            : 'Implementation of predictive maintenance has resulted in 50% savings in maintenance costs and 69% improvement in system uptime. Average ROI payback period is just 2 months.'}
        </p>
      </div>

      {/* Cost Savings Analysis */}
      <CostSavings />

      {/* Trend Charts */}
      <TrendCharts />
    </div>
  );
}

