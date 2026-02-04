'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Wifi, Battery, Activity, MapPin, Power, RefreshCw, Crosshair, AlertTriangle, CheckCircle, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Define different fault scenarios
const faultScenarios = [
  {
    distance: 42.6,
    zone: 'Sector B, Unit 4',
    zoneAr: 'قطاع ب، وحدة 4',
    status: 'critical' as const,
    faultType: 'Open Circuit',
    faultTypeAr: 'دائرة مفتوحة',
    recommendation: 'Immediate repair required',
    recommendationAr: 'إصلاح فوري مطلوب',
    accuracy: '±0.5m',
  },
  {
    distance: 0,
    zone: 'Sector A, Unit 2',
    zoneAr: 'قطاع أ، وحدة 2',
    status: 'healthy' as const,
    faultType: 'No Fault Detected',
    faultTypeAr: 'لا يوجد عطل',
    recommendation: 'Cable operating normally',
    recommendationAr: 'الكابل يعمل بشكل طبيعي',
    accuracy: '---',
  },
];

export const DeviceMockup = () => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const [powerOn, setPowerOn] = useState(true);
  const [status, setStatus] = useState<'idle' | 'scanning' | 'analyzing' | 'result'>('idle');
  const [progress, setProgress] = useState(0);
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [showReport, setShowReport] = useState(false);
  const currentScenario = faultScenarios[currentScenarioIndex];

  const handlePower = () => {
    setPowerOn(!powerOn);
    setStatus('idle');
    setProgress(0);
    setShowReport(false);
  };

  const handleScan = () => {
    if (!powerOn || status === 'scanning' || status === 'analyzing') return;
    
    setStatus('scanning');
    setProgress(0);
    setShowReport(false);

    // Simulate scanning process
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setStatus('analyzing');
          setTimeout(() => {
             setStatus('result');
             // Show report after 1 second
             setTimeout(() => {
               setShowReport(true);
             }, 1000);
          }, 1500);
          return 100;
        }
        return prev + 2;
      });
    }, 20);
  };

  const handleReset = () => {
      if (!powerOn) return;
      setStatus('idle');
      setProgress(0);
      setShowReport(false);
      // Move to next scenario when reset
      setCurrentScenarioIndex((prevIndex) => (prevIndex + 1) % faultScenarios.length);
  };

  // Blinking effect for the LED
  const [ledBlink, setLedBlink] = useState(false);
  useEffect(() => {
      if (powerOn && status === 'scanning') {
          const interval = setInterval(() => setLedBlink(b => !b), 100);
          return () => clearInterval(interval);
      }
      setLedBlink(false);
  }, [powerOn, status]);

  return (
    <div className="relative mx-auto max-w-[320px]">
      <div className="transform hover:scale-[1.02] transition-transform duration-500">
        {/* Device Body */}
        <div className="bg-slate-800 rounded-[3rem] p-4 border-8 border-slate-700 shadow-2xl relative z-10">
          {/* Top Header / Ports */}
          <div className="h-8 flex justify-center gap-4 mb-4">
            <div className="w-16 h-2 bg-slate-900 rounded-full" />
            <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${powerOn ? (ledBlink ? 'bg-red-400' : 'bg-red-600') : 'bg-red-900'}`} />
            <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${status === 'result' ? 'bg-green-500' : 'bg-green-900'}`} />
          </div>

          {/* Screen Area */}
          <div className={`bg-slate-900 rounded-2xl p-4 h-[400px] relative overflow-hidden border border-slate-600 transition-all duration-700 ${!powerOn ? 'brightness-50 grayscale' : ''}`}>
            
            {!powerOn ? (
                // Screen OFF
                <div className="absolute inset-0 bg-black flex items-center justify-center">
                    <div className="w-20 h-1 bg-slate-800/50 rounded-full blur-sm"></div>
                </div>
            ) : (
              <>
              {/* Screen ON Content */}
              {/* Status Bar */}
              <div className="flex justify-between items-center text-xs text-slate-400 mb-6">
                  <span className="font-mono">TDR-PRO v2.4</span>
                  <div className="flex gap-2">
                  <Wifi className={`w-3 h-3 ${status !== 'idle' ? 'animate-pulse text-blue-400' : ''}`} />
                  <Battery className="w-3 h-3 text-green-400" />
                  </div>
              </div>

              {/* Main Display Content based on Status */}
              <div className="flex flex-col items-center justify-center h-[70%] space-y-6 relative">
                  
                  {status === 'idle' && (
                      <div className="text-center space-y-4 animate-in fade-in duration-500">
                          <div className="w-20 h-20 rounded-full border-2 border-slate-700 flex items-center justify-center mx-auto text-slate-600">
                               <Power className="w-8 h-8" />
                          </div>
                          <p className="text-slate-500 text-sm">{isRTL ? 'جاهز للمسح' : 'READY TO SCAN'}</p>
                      </div>
                  )}

                  {status === 'scanning' && (
                       <div className="text-center space-y-4 w-full px-4 animate-in fade-in zoom-in duration-300">
                           <div className="relative h-32 w-full bg-slate-950 rounded-lg border border-slate-800 overflow-hidden flex items-center justify-center">
                                {/* Signal Animation */}
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full h-[1px] bg-green-900/50"></div>
                                    <div className="absolute left-0 h-[2px] w-20 bg-green-500 blur-[2px] animate-scan-fast"></div>
                                </div>
                                <span className="font-mono text-green-500 text-xs z-10">{progress}%</span>
                           </div>
                           <p className="text-green-400 text-xs animate-pulse tracking-widest">
                               {isRTL ? 'جاري إرسال الإشارة...' : 'SENDING PULSE...'}
                           </p>
                       </div>
                  )}

                  {status === 'analyzing' && (
                      <div className="text-center space-y-2 animate-in fade-in duration-300">
                          <Activity className="w-12 h-12 text-blue-400 animate-bounce mx-auto" />
                           <p className="text-blue-300 text-xs tracking-widest">
                               {isRTL ? 'تحليل الانعكاس...' : 'ANALYZING REFLECTION...'}
                           </p>
                      </div>
                  )}

                  {status === 'result' && (
                      <div className="text-center space-y-4 animate-in zoom-in duration-300">
                          {currentScenario.status === 'healthy' ? (
                              // Healthy Cable - No Fault
                              <>
                                  <div className="w-20 h-20 rounded-full bg-green-500/10 border-2 border-green-500 flex items-center justify-center mx-auto mb-2">
                                      <CheckCircle className="w-10 h-10 text-green-400" />
                                  </div>
                                  <p className="text-green-400 text-lg font-bold tracking-wider">
                                      {isRTL ? 'لا يوجد عطل' : 'NO FAULT'}
                                  </p>
                                  <p className="text-slate-400 text-xs">
                                      {isRTL ? 'الكابل يعمل بشكل طبيعي' : 'Cable operating normally'}
                                  </p>
                              </>
                          ) : (
                              // Faulty Cable
                              <>
                                  <div className="space-y-1">
                                      <p className="text-slate-400 text-xs uppercase tracking-wider">
                                          {isRTL ? 'المسافة إلى العطل' : 'FAULT DISTANCE'}
                                      </p>
                                      <h2 className="text-5xl font-mono font-bold text-white tracking-tighter shadow-green-500/20 drop-shadow-lg">
                                          {currentScenario.distance.toFixed(1)}<span className="text-xl text-slate-500 ml-1">m</span>
                                      </h2>
                                  </div>

                                  <div className="rounded-lg p-3 w-full border animate-pulse-slow bg-red-500/10 border-red-500/20">
                                      <div className="flex items-center gap-2 mb-1 justify-center">
                                          <MapPin className="w-3 h-3 text-red-400" />
                                          <span className="text-xs font-bold text-red-300">
                                              {isRTL ? 'توصية المنطقة' : 'ZONE'}
                                          </span>
                                      </div>
                                      <p className="text-xs text-slate-300 font-mono">
                                          {isRTL ? currentScenario.zoneAr : currentScenario.zone}
                                      </p>
                                  </div>
                              </>
                          )}
                      </div>
                  )}
              </div>

              {/* Bottom Actions (Soft Keys) */}
              <div className="absolute bottom-4 left-4 right-4 grid grid-cols-2 gap-2">
                  <button 
                      onClick={handleReset}
                      className="bg-slate-800 hover:bg-slate-700 active:bg-slate-600 h-10 rounded-lg flex items-center justify-center text-xs text-slate-300 font-bold border border-slate-700 transition-colors"
                  >
                  {isRTL ? 'إلغاء' : 'RESET'}
                  </button>
                  <button 
                      onClick={handleScan}
                      disabled={status === 'scanning'}
                      className={`h-10 rounded-lg flex items-center justify-center text-xs text-white font-bold shadow-lg transition-all active:scale-95 ${
                          status === 'scanning' 
                              ? 'bg-slate-700 cursor-not-allowed text-slate-500' 
                              : 'bg-blue-600 hover:bg-blue-500 shadow-blue-900/50'
                      }`}
                  >
                  {isRTL ? 'مسح' : 'SCAN'}
                  </button>
              </div>
              </>
            )}
          </div>

          {/* Physical Buttons */}
          <div className="mt-6 flex justify-center gap-8 px-4">
              {/* Power Button */}
            <button 
              onClick={handlePower}
              className={`w-12 h-12 rounded-full border shadow-lg flex items-center justify-center transition-all active:scale-90 ${
                  powerOn 
                  ? 'bg-slate-700 border-slate-600 hover:bg-slate-600' 
                  : 'bg-slate-800 border-slate-700 hover:bg-slate-700'
              }`}
              title="Power"
            >
              <Power className={`w-5 h-5 ${powerOn ? 'text-green-400 drop-shadow-[0_0_5px_rgba(74,222,128,0.5)]' : 'text-slate-500'}`} />
            </button>
            
            {/* Main Action Button (Scan) */}
            <button 
              onClick={handleScan}
              disabled={!powerOn}
              className="w-12 h-12 rounded-full bg-slate-700 border border-slate-600 shadow-lg flex items-center justify-center hover:bg-slate-600 active:scale-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              title="Scan"
            >
               <div className="w-0 h-0 border-l-[6px] border-l-transparent border-t-[8px] border-t-slate-300 border-r-[6px] border-r-transparent translate-y-0.5" />
            </button>
            
            {/* Mode/Reset Button */}
            <button 
               onClick={handleReset}
               disabled={!powerOn}
               className="w-12 h-12 rounded-full bg-slate-700 border border-slate-600 shadow-lg flex items-center justify-center hover:bg-slate-600 active:scale-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
               title="Reset"
            >
              <Crosshair className="w-5 h-5 text-slate-300" />
            </button>
          </div>
        </div>
        
        {/* Device Shadow/Glow */}
        <div className={`absolute inset-0 bg-blue-500/5 blur-3xl -z-10 rounded-[3rem] transition-opacity duration-1000 ${powerOn ? 'opacity-100' : 'opacity-0'}`} />
      </div>

      {/* Summary Report - Appears below device */}
      <AnimatePresence>
        {showReport && status === 'result' && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mt-6 bg-white rounded-xl shadow-2xl border-2 border-slate-200 overflow-hidden"
          >
            <div className={`p-4 ${
              currentScenario.status === 'critical' ? 'bg-red-50 border-b-2 border-red-200' :
              'bg-green-50 border-b-2 border-green-200'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {currentScenario.status === 'critical' ? (
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                  ) : (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  )}
                  <h3 className={`font-bold text-sm ${
                    currentScenario.status === 'critical' ? 'text-red-900' : 'text-green-900'
                  }`}>
                    {isRTL ? 'تقرير الفحص' : 'Scan Report'}
                  </h3>
                </div>
                <button 
                  onClick={() => setShowReport(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="p-4 space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">{isRTL ? 'الحالة:' : 'Status:'}</span>
                <span className={`font-bold ${currentScenario.status === 'healthy' ? 'text-green-600' : 'text-red-600'}`}>
                  {isRTL ? currentScenario.faultTypeAr : currentScenario.faultType}
                </span>
              </div>
              
              {currentScenario.status !== 'healthy' && (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">{isRTL ? 'المسافة:' : 'Distance:'}</span>
                    <span className="text-gray-900 font-mono font-bold">{currentScenario.distance.toFixed(1)}m</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">{isRTL ? 'الدقة:' : 'Accuracy:'}</span>
                    <span className="text-gray-900 font-mono">{currentScenario.accuracy}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">{isRTL ? 'منطقة الحفر:' : 'Excavation Zone:'}</span>
                    <span className="text-blue-600 font-mono text-xs">
                      {(currentScenario.distance - 0.5).toFixed(1)}m - {(currentScenario.distance + 0.5).toFixed(1)}m
                    </span>
                  </div>
                </>
              )}

              <div className={`mt-3 p-3 rounded-lg ${
                currentScenario.status === 'critical' ? 'bg-red-50' : 'bg-green-50'
              }`}>
                <p className="text-xs text-gray-600 mb-1 font-medium">{isRTL ? 'التوصية:' : 'Recommendation:'}</p>
                <p className={`text-sm font-bold ${
                  currentScenario.status === 'critical' ? 'text-red-700' : 'text-green-700'
                }`}>
                  {isRTL ? currentScenario.recommendationAr : currentScenario.recommendation}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
