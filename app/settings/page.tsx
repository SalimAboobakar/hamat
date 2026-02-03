'use client';

import { Card } from '@/components/shared/Card';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Settings as SettingsIcon } from 'lucide-react';

export default function SettingsPage() {
  const { t, language } = useLanguage();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{t('settings')}</h1>
        <p className="text-gray-600 mt-1">
          {language === 'ar' 
            ? 'إعدادات النظام والتكوين'
            : 'System Settings & Configuration'}
        </p>
      </div>

      <Card className="p-12 text-center">
        <SettingsIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          {language === 'ar' ? 'قريباً' : 'Coming Soon'}
        </h2>
        <p className="text-gray-600">
          {language === 'ar'
            ? 'ستكون ميزة الإعدادات متاحة قريباً'
            : 'Settings feature will be available soon'}
        </p>
      </Card>
    </div>
  );
}


