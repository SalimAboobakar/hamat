'use client';

import { Card } from '@/components/shared/Card';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { historicalKPIs } from '@/lib/data/mockKPIs';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export function TrendCharts() {
  const { t, language } = useLanguage();

  const chartData = historicalKPIs.map(kpi => ({
    month: kpi.month,
    systemHealth: kpi.systemHealth,
    preventedFailures: kpi.preventedFailures,
    savings: kpi.monthlySavings / 1000, // Convert to thousands
    uptime: kpi.uptime,
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* System Health Trend */}
      <Card className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          {t('systemHealth')} {t('trends')}
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" tick={{ fontSize: 12 }} />
            <YAxis stroke="#6b7280" tick={{ fontSize: 12 }} domain={[85, 100]} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="systemHealth"
              stroke="#10b981"
              strokeWidth={3}
              name={t('systemHealth') + ' (%)'}
              dot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="uptime"
              stroke="#3b82f6"
              strokeWidth={2}
              name={t('uptime') + ' (%)'}
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Prevented Failures */}
      <Card className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          {t('preventedFailures')} {language === 'ar' ? 'الاتجاه' : 'Trend'}
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" tick={{ fontSize: 12 }} />
            <YAxis stroke="#6b7280" tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
              }}
            />
            <Legend />
            <Bar
              dataKey="preventedFailures"
              fill="#f97316"
              name={t('preventedFailures')}
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Cost Savings Trend */}
      <Card className="p-6 lg:col-span-2">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span>{t('monthlySavings')} {t('trends')}</span>
          <span className="text-sm text-gray-600">(Hours)</span>
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" tick={{ fontSize: 12 }} />
            <YAxis stroke="#6b7280" tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
              }}
            />
            <Legend />
            <Bar
              dataKey="savings"
              fill="#F9E795"
              stroke="#1E2761"
              strokeWidth={1}
              name={t('monthlySavings') + ' (Hours)'}
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}


