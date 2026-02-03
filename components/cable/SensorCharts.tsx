'use client';

import { Card } from '@/components/shared/Card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useAppStore } from '@/lib/store/appStore';
import { motion } from 'framer-motion';

interface SensorChartsProps {
  cableId: string;
}

export function SensorCharts({ cableId }: SensorChartsProps) {
  const { t, language } = useLanguage();
  const isRTL = language === 'ar';
  
  // Get cable from store
  const { cables } = useAppStore();
  const cable = cables.find(c => c.id === cableId);

  // Check if cable exists
  if (!cable) {
    return (
      <Card className="p-6">
        <p className="text-gray-600">Cable not found</p>
      </Card>
    );
  }

  // Generate TDR-like signal data
  const generateSignalData = () => {
    const data = [];
    const points = 100;
    const faultLocationIndex = 42; // Simulated fault at 42% of the way

    for (let i = 0; i < points; i++) {
      let amplitude = Math.random() * 2 - 1; // Base noise
      
      // Transmission Pulse (Start)
      if (i < 5) {
        amplitude = 80 - (i * 10) + (Math.random() * 5);
      }
      
      // Fault Reflection
      if (Math.abs(i - faultLocationIndex) < 3) {
        amplitude = cable.status === 'healthy' ? (Math.random() * 5) : 45 + (Math.random() * 10);
        if (cable.status === 'critical') amplitude += 20;
      }

      // End of Cable Reflection
      if (i > 90) {
        amplitude = 30 + (Math.random() * 5);
      }

      data.push({
        distance: i * ((cable.length || 100) / 100), // Map to cable length with fallback
        amplitude: amplitude,
      });
    }
    return data;
  };

  const data = generateSignalData();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-gray-900">{t('signalReflection')} (TDR Trace)</h3>
            <p className="text-sm text-gray-500 mt-1">
              {t('cableLength')}: {cable.length || 100}m | VF: {cable.velocityFactor || 0.66}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
            <span className="text-sm text-gray-600">Signal Amplitude (dB)</span>
          </div>
        </div>

        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorSignal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
              <XAxis 
                dataKey="distance" 
                label={{ value: isRTL ? 'المسافة (متر)' : 'Distance (m)', position: 'insideBottomRight', offset: -5 }} 
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                domain={[-20, 100]} 
                label={{ value: 'dB', angle: -90, position: 'insideLeft' }}
                tick={{ fontSize: 12 }}
              />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                labelStyle={{ color: '#6b7280' }}
              />
              <Area 
                type="monotone" 
                dataKey="amplitude" 
                stroke="#3b82f6" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorSignal)" 
              />
              {/* Reference Line for Fault threshold */}
              <ReferenceLine y={20} stroke="red" strokeDasharray="3 3" label="Fault Threshold" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </motion.div>
  );
}
