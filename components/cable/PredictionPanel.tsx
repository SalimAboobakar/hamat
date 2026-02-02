'use client';

import { Card } from '@/components/shared/Card';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Cable } from '@/types';
import { AlertTriangle, TrendingDown, DollarSign, Wrench, Calendar } from 'lucide-react';
import { formatCurrency, formatPercentage } from '@/lib/utils/formatters';

interface PredictionPanelProps {
  cable: Cable;
}

export function PredictionPanel({ cable }: PredictionPanelProps) {
  const { t, language } = useLanguage();

  const getFailureProbabilityColor = (probability: number) => {
    if (probability >= 70) return 'text-red-600 bg-red-50 border-red-200';
    if (probability >= 45) return 'text-orange-600 bg-orange-50 border-orange-200';
    if (probability >= 20) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-green-600 bg-green-50 border-green-200';
  };

  const getRecommendations = () => {
    const recommendations = [];
    
    if (cable.temperature > 45) {
      recommendations.push({
        en: 'Immediate inspection required - High temperature detected',
        ar: 'مطلوب فحص فوري - تم اكتشاف درجة حرارة عالية',
      });
    }
    
    if (cable.current > 12) {
      recommendations.push({
        en: 'Check electrical connections for loose contacts',
        ar: 'فحص التوصيلات الكهربائية للاتصالات الفضفاضة',
      });
    }
    
    if (cable.vibration > 6) {
      recommendations.push({
        en: 'Install vibration dampers to reduce mechanical stress',
        ar: 'تركيب مخمدات الاهتزاز لتقليل الإجهاد الميكانيكي',
      });
    }
    
    if (cable.pdLevel > 250) {
      recommendations.push({
        en: 'Perform detailed partial discharge analysis',
        ar: 'إجراء تحليل مفصل للتفريغ الجزئي',
      });
    }
    
    if (cable.failureProbability > 50) {
      recommendations.push({
        en: 'Schedule replacement within next maintenance window',
        ar: 'جدولة الاستبدال في نافذة الصيانة التالية',
      });
    } else if (cable.failureProbability > 20) {
      recommendations.push({
        en: 'Increase monitoring frequency to weekly',
        ar: 'زيادة وتيرة المراقبة إلى أسبوعية',
      });
    }
    
    return recommendations;
  };

  const recommendations = getRecommendations();
  const estimatedCost = cable.failureProbability > 50 ? 12000 : cable.failureProbability > 20 ? 5000 : 2000;
  const confidence = 85 + Math.random() * 10;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Failure Probability */}
      <Card className={`p-6 border-2 ${getFailureProbabilityColor(cable.failureProbability)}`}>
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="w-6 h-6" />
          <h3 className="text-lg font-bold">{t('failureProbability')}</h3>
        </div>
        
        <div className="text-center mb-4">
          <div className="text-5xl font-bold mb-2" suppressHydrationWarning>
            {formatPercentage(cable.failureProbability)}
          </div>
          <div className="text-sm opacity-75">
            {t('daysToFailure')}: <span className="font-bold" suppressHydrationWarning>{cable.daysToFailure}</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${
              cable.failureProbability >= 70
                ? 'bg-red-500'
                : cable.failureProbability >= 45
                ? 'bg-orange-500'
                : cable.failureProbability >= 20
                ? 'bg-yellow-500'
                : 'bg-green-500'
            }`}
            style={{ width: `${cable.failureProbability}%` }}
          />
        </div>
        
        <div className="mt-4 pt-4 border-t">
          <div className="flex items-center justify-between text-sm">
            <span className="opacity-75">{t('confidence')}</span>
            <span className="font-bold" suppressHydrationWarning>{formatPercentage(confidence, 1)}</span>
          </div>
        </div>
      </Card>

      {/* Recommendations */}
      <Card className="p-6 lg:col-span-2">
        <div className="flex items-center gap-3 mb-4">
          <Wrench className="w-6 h-6 text-oq-navy" />
          <h3 className="text-lg font-bold text-gray-900">{t('recommendations')}</h3>
        </div>

        <div className="space-y-3 mb-6">
          {recommendations.length === 0 ? (
            <p className="text-gray-600 text-sm">
              {language === 'ar' 
                ? 'لا توجد توصيات في هذا الوقت. الكابل يعمل بشكل طبيعي.'
                : 'No recommendations at this time. Cable is operating normally.'}
            </p>
          ) : (
            recommendations.map((rec, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-6 h-6 rounded-full bg-oq-navy text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  {index + 1}
                </div>
                <p className="text-sm text-gray-900">
                  {language === 'ar' ? rec.ar : rec.en}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Cost Impact */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
          <div className="flex items-center gap-3">
            <DollarSign className="w-5 h-5 text-oq-gold" />
            <div>
              <p className="text-xs text-gray-600">{t('estimatedCost')}</p>
              <p className="text-lg font-bold text-gray-900" suppressHydrationWarning>
                {formatCurrency(estimatedCost, language)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-blue-500" />
            <div>
              <p className="text-xs text-gray-600">{t('scheduledDate')}</p>
              <p className="text-sm font-medium text-gray-900" suppressHydrationWarning>
                {cable.daysToFailure < 30 
                  ? language === 'ar' ? 'عاجل' : 'Urgent'
                  : language === 'ar' ? `${cable.daysToFailure} يوم` : `${cable.daysToFailure} days`}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

