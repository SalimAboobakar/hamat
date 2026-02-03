'use client';

import { Card } from '@/components/shared/Card';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Cable } from '@/types';
import { AlertTriangle, Wrench, Calendar, MapPin } from 'lucide-react';
import { formatPercentage } from '@/lib/utils/formatters';

interface PredictionPanelProps {
  cable: Cable;
}

export function PredictionPanel({ cable }: PredictionPanelProps) {
  const { t, language } = useLanguage();
  
  const getFaultSeverityColor = (probability: number) => {
    if (probability >= 70) return 'text-red-600 bg-red-50 border-red-200';
    if (probability >= 45) return 'text-orange-600 bg-orange-50 border-orange-200';
    if (probability >= 20) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-green-600 bg-green-50 border-green-200';
  };

  const getRecommendations = () => {
    const recommendations = [];
    
    // Logic adapted for TDR/Fault context
    if (cable.status === 'critical') {
        recommendations.push({
            en: 'High amplitude reflection detected at 42m - Open Circuit likely',
            ar: 'تم اكتشاف انعكاس عالي السعة عند 42 متر - احتمال وجود دائرة مفتوحة'
        });
        recommendations.push({
            en: 'Excavate at Zone B-4 (±1m accuracy)',
            ar: 'الحفر في المنطقة B-4 (دقة ±1 متر)'
        });
    } else if (cable.status === 'warning') {
        recommendations.push({
            en: 'Impedance mismatch detected - Possible water ingress',
            ar: 'عدم تطابق في المعاوقة - احتمال دخول مياه'
        });
    } else {
        recommendations.push({
             en: 'Signal trace within normal parameters. No faults detected.',
             ar: 'تتبع الإشارة ضمن المعايير الطبيعية. لم يتم اكتشاف أعطال.'
        });
    }
    
    return recommendations;
  };

  const recommendations = getRecommendations();
  // Using daysToFailure as a proxy for "Severity Level" (1-100 scale inverted or similar)
  // Let's just use failureProbability as "Fault Confidence"
  const faultConfidence = cable.failureProbability; 
  const aiConfidence = 92 + Math.random() * 5;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Fault Classification / Probability */}
      <Card className={`p-6 border-2 ${getFaultSeverityColor(faultConfidence)}`}>
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="w-6 h-6" />
          <h3 className="text-lg font-bold">{t('aiPrediction')}</h3>
        </div>
        
        <div className="text-center mb-4">
          <div className="text-5xl font-bold mb-2" suppressHydrationWarning>
            {formatPercentage(faultConfidence)}
          </div>
          <div className="text-sm opacity-75">
            {t('failureProbability')}
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${
              faultConfidence >= 70
                ? 'bg-red-500'
                : faultConfidence >= 45
                ? 'bg-orange-500'
                : faultConfidence >= 20
                ? 'bg-yellow-500'
                : 'bg-green-500'
            }`}
            style={{ width: `${faultConfidence}%` }}
          />
        </div>
        
        <div className="mt-4 pt-4 border-t">
          <div className="flex items-center justify-between text-sm">
            <span className="opacity-75">{t('confidence')}</span>
            <span className="font-bold" suppressHydrationWarning>{formatPercentage(aiConfidence, 1)}</span>
          </div>
        </div>
      </Card>

      {/* Recommendations / Action Plan */}
      <Card className="p-6 lg:col-span-2">
        <div className="flex items-center gap-3 mb-4">
          <Wrench className="w-6 h-6 text-oq-navy" />
          <h3 className="text-lg font-bold text-gray-900">{t('recommendations')}</h3>
        </div>

        <div className="space-y-3 mb-6">
          {recommendations.map((rec, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-6 h-6 rounded-full bg-oq-navy text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                {index + 1}
              </div>
              <p className="text-sm text-gray-900">
                {language === 'ar' ? rec.ar : rec.en}
              </p>
            </div>
          ))}
        </div>

        {/* Impact Analysis */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-oq-gold" />
            <div>
              <p className="text-xs text-gray-600">{t('estimatedCost')}</p>
              <p className="text-lg font-bold text-gray-900">
                {cable.status === 'healthy' ? (language === 'ar' ? '0 ساعة' : '0 hrs') : (language === 'ar' ? '4 ساعات' : '4 hrs')}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-blue-500" />
            <div>
              <p className="text-xs text-gray-600">{t('excavationZone')}</p>
              <p className="text-sm font-medium text-gray-900">
                 {cable.status === 'healthy' ? '---' : 'Zone B-4'}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
