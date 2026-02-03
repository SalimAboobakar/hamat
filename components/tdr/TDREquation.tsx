'use client';

import React from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export const TDREquation = () => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-lg">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
        {isRTL ? 'المبدأ العلمي (TDR)' : 'Scientific Principle (TDR)'}
      </h3>
      
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="bg-slate-900 p-6 rounded-lg border border-slate-700 shadow-inner min-w-[200px] flex justify-center">
          <div className="text-2xl font-mono text-blue-400 font-bold tracking-wider">
            d = <span className="text-white">(VF × c × t)</span> / 2
          </div>
        </div>

        <div className={`flex-1 text-slate-300 space-y-2 ${isRTL ? 'text-right' : 'text-left'}`}>
          <p className="font-medium text-white mb-2">
            {isRTL ? ':حيث' : 'Where:'}
          </p>
          <ul className="space-y-1 text-sm">
            <li className="flex items-center gap-2">
              <span className="text-blue-400 font-mono font-bold w-6">d</span>
              <span>= {isRTL ? 'المسافة إلى العطل (متر)' : 'Distance to fault (meters)'}</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-blue-400 font-mono font-bold w-6">VF</span>
              <span>= {isRTL ? 'معامل السرعة (يعتمد على نوع الكابل)' : 'Velocity Factor (cable-dependent)'}</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-blue-400 font-mono font-bold w-6">c</span>
              <span>= {isRTL ? 'سرعة الضوء (3×10⁸ م/ث)' : 'Speed of light (3×10⁸ m/s)'}</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-blue-400 font-mono font-bold w-6">t</span>
              <span>= {isRTL ? 'وقت الانعكاس المقاس' : 'Measured reflection time'}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

