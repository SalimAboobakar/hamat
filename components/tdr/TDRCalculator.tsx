'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { translations } from '@/lib/i18n/translations';
import { Calculator, Zap, Ruler, Clock, Activity, RefreshCw } from 'lucide-react';

export const TDRCalculator = () => {
  const { language, t } = useLanguage();
  const isRTL = language === 'ar';
  
  const [cableType, setCableType] = useState('4-20mA');
  const [vf, setVf] = useState(0.66);
  const [time, setTime] = useState(0.43); // microseconds
  const [calculatedDistance, setCalculatedDistance] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState(false);

  const cableTypes = [
    { id: '4-20mA', label: translations[language].type420mA, vf: 0.66 },
    { id: 'Control', label: translations[language].typeControl, vf: 0.70 },
    { id: 'Instrumentation', label: translations[language].typeInstrumentation, vf: 0.65 },
    { id: 'Communication', label: translations[language].typeCommunication, vf: 0.78 },
  ];

  // Real-time calculation effect
  useEffect(() => {
    // d = (VF * c * t) / 2
    // c = 299.792458 meters/microsecond
    // t is in microseconds
    const c = 299.792458;
    const distance = (vf * c * time) / 2;
    setCalculatedDistance(distance);
  }, [vf, time]);

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const type = cableTypes.find(t => t.id === e.target.value);
    if (type) {
      setCableType(type.id);
      setVf(type.vf);
    }
  };

  const simulateRandomFault = () => {
    setIsSimulating(true);
    // Animate values changing
    let count = 0;
    const interval = setInterval(() => {
      setTime(prev => Math.max(0.1, prev + (Math.random() - 0.5) * 0.5));
      count++;
      if (count > 10) {
        clearInterval(interval);
        // Set final random value
        setTime(Number((0.2 + Math.random() * 2.0).toFixed(2)));
        setIsSimulating(false);
      }
    }, 50);
  };

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-xl overflow-hidden flex flex-col">
      <div className="p-4 border-b border-slate-700 bg-slate-900/50 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Calculator className="w-5 h-5 text-blue-400" />
          {isRTL ? 'حاسبة TDR الفورية' : 'Real-time TDR Calculator'}
        </h3>
        <div className="flex items-center gap-2">
            <button 
                onClick={simulateRandomFault}
                disabled={isSimulating}
                className="p-1.5 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors"
                title={isRTL ? 'محاكاة عطل عشوائي' : 'Simulate Random Fault'}
            >
                <RefreshCw className={`w-4 h-4 ${isSimulating ? 'animate-spin' : ''}`} />
            </button>
            <div className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full border border-green-500/30">
            {isRTL ? 'نشط' : 'Active System'}
            </div>
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 gap-8 flex-1">
        <div className="space-y-6">
          {/* Cable Type Selector */}
          <div className="space-y-2">
            <label className="text-sm text-slate-400 flex items-center gap-2">
              <Activity className="w-4 h-4" />
              {isRTL ? 'نوع الكابل' : 'Cable Type'}
            </label>
            <select
              value={cableType}
              onChange={handleTypeChange}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            >
              {cableTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.label} (VF: {type.vf})
                </option>
              ))}
            </select>
          </div>

          {/* Time Slider & Input */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
                <label className="text-sm text-slate-400 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {isRTL ? 'وقت الانعكاس (t)' : 'Reflection Time (t)'}
                </label>
                <span className="text-xs font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">
                    {time.toFixed(3)} µs
                </span>
            </div>
            
            <input
              type="range"
              min="0.05"
              max="5.00"
              step="0.01"
              value={time}
              onChange={(e) => setTime(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            
            <div className="flex justify-between text-xs text-slate-500 font-mono">
                <span>0.05 µs</span>
                <span>5.00 µs</span>
            </div>
          </div>
        </div>

        {/* Results Display */}
        <div className="bg-slate-900 rounded-xl p-6 border border-slate-700 flex flex-col justify-center items-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-blue-500/5 pattern-grid-lg group-hover:bg-blue-500/10 transition-colors duration-500" />
          
          <div className="relative z-10 text-center space-y-4 w-full">
            <div className="flex justify-center items-end gap-2">
                <div className="text-5xl font-bold text-white font-mono tracking-tight">
                    {calculatedDistance.toFixed(1)}
                </div>
                <div className="text-xl text-slate-500 font-medium mb-2">meters</div>
            </div>
            
            <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden relative">
                 <div 
                    className="h-full bg-blue-500 transition-all duration-300 ease-out relative"
                    style={{ width: `${Math.min(100, (calculatedDistance / 500) * 100)}%` }}
                 >
                    <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/50 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                 </div>
            </div>

            <div className="pt-4 border-t border-slate-800 w-full grid grid-cols-2 gap-4">
                <div className="text-center">
                    <p className="text-xs text-slate-500 mb-1">{translations[language].excavationZone}</p>
                    <p className="text-amber-400 font-mono text-sm">
                        {(calculatedDistance - 0.5).toFixed(1)}m - {(calculatedDistance + 0.5).toFixed(1)}m
                    </p>
                </div>
                <div className="text-center border-l border-slate-800">
                     <p className="text-xs text-slate-500 mb-1">{isRTL ? 'معامل السرعة' : 'Velocity Factor'}</p>
                    <p className="text-blue-400 font-mono text-sm">{vf.toFixed(2)}</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
