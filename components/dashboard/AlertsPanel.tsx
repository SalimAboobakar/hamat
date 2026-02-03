'use client';

import { Card } from '@/components/shared/Card';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useAppStore } from '@/lib/store/appStore';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { formatRelativeDate } from '@/lib/utils/formatters';
import { clsx } from 'clsx';
import Link from 'next/link';

export function AlertsPanel() {
  const { t, language } = useLanguage();
  const { alerts } = useAppStore();

  // Show only unacknowledged alerts, sorted by severity and time
  const activeAlerts = alerts
    .filter(alert => !alert.acknowledged)
    .sort((a, b) => {
      const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
      if (severityOrder[a.severity] !== severityOrder[b.severity]) {
        return severityOrder[a.severity] - severityOrder[b.severity];
      }
      return b.timestamp.getTime() - a.timestamp.getTime();
    })
    .slice(0, 8);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'high':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default:
        return 'text-blue-600 bg-blue-50 border-blue-200';
    }
  };

  return (
    <Card className="p-6 h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">{t('recentAlerts')}</h2>
        <Link 
          href="/alerts"
          className="text-sm text-oq-navy hover:underline font-medium"
        >
          {t('viewDetails')}
        </Link>
      </div>

      <div className="space-y-3">
        {activeAlerts.length === 0 ? (
          <div className="text-center py-8">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
            <p className="text-gray-600">{t('noData')}</p>
          </div>
        ) : (
          activeAlerts.map((alert) => (
            <Link
              key={alert.id}
              href={`/cable/${alert.cableId}`}
              className="block"
            >
              <div
                className={clsx(
                  'p-3 rounded-lg border transition-all hover:shadow-md',
                  getSeverityColor(alert.severity)
                )}
              >
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {language === 'ar' ? alert.messageAr : alert.message}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="w-3 h-3" />
                      <p className="text-xs opacity-75">
                        {formatRelativeDate(alert.timestamp, language)}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold uppercase flex-shrink-0">
                    {alert.severity}
                  </span>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </Card>
  );
}


