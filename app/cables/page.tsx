'use client';

import { Card } from '@/components/shared/Card';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useAppStore } from '@/lib/store/appStore';
import { formatSensorValue } from '@/lib/utils/formatters';
import { Search } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function CablesPage() {
  const { t, language } = useLanguage();
  const { cables } = useAppStore();
  const [search, setSearch] = useState('');

  const filteredCables = cables.filter(cable =>
    cable.id.toLowerCase().includes(search.toLowerCase()) ||
    cable.location.toLowerCase().includes(search.toLowerCase()) ||
    cable.locationAr.includes(search)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('cables')}</h1>
          <p className="text-gray-600 mt-1">
            {language === 'ar' 
              ? 'جميع الكابلات المراقبة'
              : 'All monitored cables'}
          </p>
        </div>
      </div>

      {/* Search */}
      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder={t('search')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-oq-navy focus:border-transparent"
          />
        </div>
      </Card>

      {/* Cables Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCables.map(cable => (
          <Link key={cable.id} href={`/cable/${cable.id}`}>
            <Card hover className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-gray-900">{cable.id}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {language === 'ar' ? cable.locationAr : cable.location}
                  </p>
                </div>
                <StatusBadge status={cable.status} size="sm" />
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-gray-600">{t('temperature')}</p>
                  <p className="font-medium">{formatSensorValue(cable.temperature, '°C')}</p>
                </div>
                <div>
                  <p className="text-gray-600">{t('current')}</p>
                  <p className="font-medium">{formatSensorValue(cable.current, 'A')}</p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

