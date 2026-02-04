'use client';

import { Card } from '@/components/shared/Card';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Wifi, WifiOff, Battery, BatteryCharging, Signal, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export function DeviceStatus() {
  const { t, language } = useLanguage();
  const [isConnected, setIsConnected] = useState(true);
  const [batteryLevel, setBatteryLevel] = useState(87);
  const [signalQuality, setSignalQuality] = useState(95);

  // Simulate battery drain
  useEffect(() => {
    const interval = setInterval(() => {
      setBatteryLevel(prev => Math.max(60, prev - 0.1));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const getBatteryIcon = () => {
    if (batteryLevel > 80) return Battery;
    if (batteryLevel > 20) return BatteryCharging;
    return Battery;
  };

  const BatteryIcon = getBatteryIcon();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-4 bg-gradient-to-r from-slate-800 to-slate-900 border-slate-700">
        <div className="flex items-center justify-between">
          {/* Device Connection Status */}
          <div className="flex items-center gap-3">
            {isConnected ? (
              <>
                <div className="relative">
                  <Wifi className="w-6 h-6 text-green-400" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{t('deviceConnected')}</p>
                  <p className="text-xs text-slate-400">CableGuard Pro TDR-3000</p>
                </div>
              </>
            ) : (
              <>
                <WifiOff className="w-6 h-6 text-red-400" />
                <div>
                  <p className="text-sm font-medium text-white">{t('deviceDisconnected')}</p>
                  <p className="text-xs text-slate-400">{t('connectDevice')}</p>
                </div>
              </>
            )}
          </div>

          {/* Device Metrics */}
          {isConnected && (
            <div className="flex items-center gap-6">
              {/* Battery */}
              <div className="flex items-center gap-2">
                <BatteryIcon 
                  className={`w-5 h-5 ${
                    batteryLevel > 20 ? 'text-green-400' : 'text-red-400'
                  }`} 
                />
                <div>
                  <p className="text-xs text-slate-400">{t('batteryLevel')}</p>
                  <p className="text-sm font-bold text-white">{Math.round(batteryLevel)}%</p>
                </div>
              </div>

              {/* Signal Quality */}
              <div className="flex items-center gap-2">
                <Signal className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-xs text-slate-400">{t('signalQuality')}</p>
                  <p className="text-sm font-bold text-white">{signalQuality}%</p>
                </div>
              </div>

              {/* Status Indicator */}
              <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/20 rounded-lg border border-green-500/30">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-xs font-medium text-green-400">
                  {language === 'ar' ? 'جاهز' : 'Ready'}
                </span>
              </div>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}

