'use client';

import { Card } from '@/components/shared/Card';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { mockActivityLogs } from '@/lib/data/mockActivityLogs';
import { formatRelativeDate } from '@/lib/utils/formatters';
import { Activity, AlertCircle, Wrench, TrendingUp, CheckCircle } from 'lucide-react';
import { clsx } from 'clsx';

export function RecentActivity() {
  const { t, language } = useLanguage();
  const recentActivities = mockActivityLogs.slice(0, 10);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'alert':
        return AlertCircle;
      case 'maintenance':
        return Wrench;
      case 'status_change':
        return TrendingUp;
      case 'work_order':
        return CheckCircle;
      default:
        return Activity;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'alert':
        return 'text-red-600 bg-red-50';
      case 'maintenance':
        return 'text-blue-600 bg-blue-50';
      case 'status_change':
        return 'text-green-600 bg-green-50';
      case 'work_order':
        return 'text-purple-600 bg-purple-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <Card className="p-6 h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">{t('recentAlerts')}</h2>
        <Activity className="w-5 h-5 text-gray-400" />
      </div>

      <div className="space-y-3 max-h-[500px] overflow-y-auto">
        {recentActivities.map((activity) => {
          const Icon = getActivityIcon(activity.type);
          const colorClass = getActivityColor(activity.type);

          return (
            <div key={activity.id} className="flex items-start gap-3">
              <div className={clsx('p-2 rounded-lg', colorClass)}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900">
                  {language === 'ar' ? activity.messageAr : activity.message}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {formatRelativeDate(activity.timestamp, language)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

