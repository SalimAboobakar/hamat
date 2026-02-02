'use client';

import { Card } from '@/components/shared/Card';
import { Cable, TrendingUp, AlertCircle, DollarSign } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useAppStore } from '@/lib/store/appStore';
import { formatCurrency, formatPercentage } from '@/lib/utils/formatters';
import { motion } from 'framer-motion';

export function KPICards() {
  const { t, language } = useLanguage();
  const { kpis } = useAppStore();

  const kpiData = [
    {
      title: t('totalCables'),
      value: kpis.totalCables.toString(),
      icon: Cable,
      color: 'bg-blue-500',
      trend: null,
    },
    {
      title: t('activeAlerts'),
      value: kpis.activeAlerts.toString(),
      icon: AlertCircle,
      color: kpis.activeAlerts > 5 ? 'bg-red-500' : 'bg-yellow-500',
      trend: null,
      pulse: kpis.activeAlerts > 0,
    },
    {
      title: t('systemHealth'),
      value: formatPercentage(kpis.systemHealth),
      icon: TrendingUp,
      color: 'bg-green-500',
      trend: '+2%',
    },
    {
      title: t('monthlySavings'),
      value: formatCurrency(kpis.monthlySavings, language),
      icon: DollarSign,
      color: 'bg-oq-gold',
      trend: '+15%',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {kpiData.map((kpi, index) => {
        const Icon = kpi.icon;
        
        return (
          <motion.div
            key={kpi.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card hover className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm text-gray-600 font-medium">{kpi.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2" suppressHydrationWarning>{kpi.value}</p>
                  {kpi.trend && (
                    <p className="text-xs text-green-600 mt-2 font-medium">
                      {kpi.trend} {t('thisMonth')}
                    </p>
                  )}
                </div>
                <div className={`p-3 rounded-lg ${kpi.color} ${kpi.pulse ? 'animate-pulse-slow' : ''}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}

