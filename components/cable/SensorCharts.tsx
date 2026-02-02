'use client';

import { Card } from '@/components/shared/Card';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useAppStore } from '@/lib/store/appStore';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { format } from 'date-fns';

interface SensorChartsProps {
  cableId: string;
}

export function SensorCharts({ cableId }: SensorChartsProps) {
  const { t, language } = useLanguage();
  const { getSensorHistory } = useAppStore();
  
  const sensorHistory = getSensorHistory(cableId);
  
  // Get last 50 data points for better performance
  const chartData = sensorHistory.slice(-50).map(reading => ({
    time: format(reading.timestamp, 'HH:mm'),
    timestamp: reading.timestamp.getTime(),
    temperature: parseFloat(reading.temperature.toFixed(1)),
    current: parseFloat(reading.current.toFixed(1)),
    vibration: parseFloat(reading.vibration.toFixed(1)),
    pdLevel: parseFloat(reading.pdLevel.toFixed(0)),
  }));

  const charts = [
    {
      title: t('temperature'),
      dataKey: 'temperature',
      color: '#f97316',
      unit: '°C',
      thresholdWarning: 40,
      thresholdCritical: 50,
    },
    {
      title: t('current'),
      dataKey: 'current',
      color: '#3b82f6',
      unit: 'A',
      thresholdWarning: 10,
      thresholdCritical: 14,
    },
    {
      title: t('vibration'),
      dataKey: 'vibration',
      color: '#8b5cf6',
      unit: 'Hz',
      thresholdWarning: 5,
      thresholdCritical: 8,
    },
    {
      title: t('pdLevel'),
      dataKey: 'pdLevel',
      color: '#ef4444',
      unit: 'pC',
      thresholdWarning: 200,
      thresholdCritical: 300,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {charts.map((chart) => (
        <Card key={chart.dataKey} className="p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            {chart.title} ({chart.unit})
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="time"
                stroke="#6b7280"
                tick={{ fontSize: 12 }}
              />
              <YAxis
                stroke="#6b7280"
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '8px',
                }}
                labelStyle={{ color: '#374151', fontWeight: 'bold' }}
              />
              <ReferenceLine
                y={chart.thresholdWarning}
                stroke="#fbbf24"
                strokeDasharray="3 3"
                label={{ value: 'Warning', position: 'right', fill: '#fbbf24', fontSize: 10 }}
              />
              <ReferenceLine
                y={chart.thresholdCritical}
                stroke="#ef4444"
                strokeDasharray="3 3"
                label={{ value: 'Critical', position: 'right', fill: '#ef4444', fontSize: 10 }}
              />
              <Line
                type="monotone"
                dataKey={chart.dataKey}
                stroke={chart.color}
                strokeWidth={2}
                dot={false}
                isAnimationActive={true}
                animationDuration={300}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      ))}
    </div>
  );
}

