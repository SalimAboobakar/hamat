'use client';

import { Card } from '@/components/shared/Card';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { costComparison } from '@/lib/data/mockKPIs';
import { formatCurrency, formatPercentage } from '@/lib/utils/formatters';
import { TrendingDown, TrendingUp, DollarSign } from 'lucide-react';

export function CostSavings() {
  const { t, language } = useLanguage();

  const comparisonData = [
    {
      title: language === 'ar' ? 'التكلفة السنوية' : 'Annual Cost',
      traditional: costComparison.traditional.annualCost,
      predictive: costComparison.predictive.annualCost,
    },
    {
      title: language === 'ar' ? 'وقت التوقف غير المخطط' : 'Unplanned Downtime',
      traditional: `${costComparison.traditional.unplannedDowntime} hrs`,
      predictive: `${costComparison.predictive.unplannedDowntime} hrs`,
    },
    {
      title: language === 'ar' ? 'معدل الفشل' : 'Failure Rate',
      traditional: `${costComparison.traditional.failureRate}/year`,
      predictive: `${costComparison.predictive.failureRate}/year`,
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* ROI Card */}
      <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-green-500 rounded-lg">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">{t('roi')}</h3>
        </div>
        
        <div className="text-center mb-4">
          <div className="text-5xl font-bold text-green-600 mb-2">
            {formatPercentage(costComparison.savings.roi)}
          </div>
          <p className="text-sm text-gray-700">
            {language === 'ar' ? 'العائد على الاستثمار' : 'Return on Investment'}
          </p>
        </div>

        <div className="pt-4 border-t border-green-200">
          <p className="text-sm text-gray-700 text-center">
            {language === 'ar' 
              ? `فترة الاسترداد: ${costComparison.savings.paybackPeriod} أشهر`
              : `Payback Period: ${costComparison.savings.paybackPeriod} months`}
          </p>
        </div>
      </Card>

      {/* Annual Savings */}
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-blue-500 rounded-lg">
            <DollarSign className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">{t('costSavings')}</h3>
        </div>
        
        <div className="text-center mb-4">
          <div className="text-3xl font-bold text-blue-600 mb-2">
            {formatCurrency(costComparison.savings.annual, language)}
          </div>
          <p className="text-sm text-gray-700">
            {language === 'ar' ? 'التوفير السنوي' : 'Annual Savings'}
          </p>
        </div>

        <div className="pt-4 border-t border-blue-200">
          <div className="flex items-center justify-center gap-2 text-green-600">
            <TrendingDown className="w-4 h-4" />
            <p className="text-sm font-medium">50% {t('traditional')} {language === 'ar' ? 'تخفيض' : 'reduction'}</p>
          </div>
        </div>
      </Card>

      {/* Cost Comparison Summary */}
      <Card className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">{t('comparison')}</h3>
        
        <div className="space-y-4">
          {comparisonData.map((item, index) => (
            <div key={index}>
              <p className="text-sm text-gray-600 mb-2">{item.title}</p>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 bg-red-50 rounded text-center">
                  <p className="text-xs text-red-600 font-medium">{t('traditional')}</p>
                  <p className="text-sm font-bold text-red-700">
                    {typeof item.traditional === 'number' 
                      ? formatCurrency(item.traditional, language)
                      : item.traditional}
                  </p>
                </div>
                <div className="p-2 bg-green-50 rounded text-center">
                  <p className="text-xs text-green-600 font-medium">{t('predictive')}</p>
                  <p className="text-sm font-bold text-green-700">
                    {typeof item.predictive === 'number'
                      ? formatCurrency(item.predictive, language)
                      : item.predictive}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

