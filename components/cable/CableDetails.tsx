'use client';

import { Card } from '@/components/shared/Card';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Cable } from '@/types';
import { MapPin, Calendar, Zap, ThermometerSun } from 'lucide-react';
import { formatDate, formatSensorValue } from '@/lib/utils/formatters';

interface CableDetailsProps {
  cable: Cable;
}

export function CableDetails({ cable }: CableDetailsProps) {
  const { t, language } = useLanguage();

  const details = [
    {
      icon: MapPin,
      label: t('location'),
      value: language === 'ar' ? cable.locationAr : cable.location,
    },
    {
      icon: MapPin,
      label: t('zone'),
      value: language === 'ar' && cable.zone === 'Sohar' ? 'مصفاة صحار' : cable.zone === 'Duqm' ? 'مصفاة الدقم' : cable.zone,
    },
    {
      icon: Calendar,
      label: t('installDate'),
      value: formatDate(cable.installDate, language),
    },
    {
      icon: Calendar,
      label: t('lastMaintenance'),
      value: formatDate(cable.lastMaintenance, language),
    },
    {
      icon: Zap,
      label: 'Voltage',
      value: `${cable.voltage / 1000}kV`,
    },
    {
      icon: MapPin,
      label: 'Coordinates',
      value: `${cable.coordinates[0].toFixed(4)}, ${cable.coordinates[1].toFixed(4)}`,
    },
  ];

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{cable.id}</h2>
          <p className="text-gray-600 mt-1">{language === 'ar' ? cable.locationAr : cable.location}</p>
        </div>
        <StatusBadge status={cable.status} size="lg" />
      </div>

      {/* Current Sensor Readings */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
        <div>
          <p className="text-sm text-gray-600">{t('temperature')}</p>
          <p className="text-xl font-bold text-gray-900">
            {formatSensorValue(cable.temperature, '°C')}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600">{t('current')}</p>
          <p className="text-xl font-bold text-gray-900">
            {formatSensorValue(cable.current, 'A')}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600">{t('vibration')}</p>
          <p className="text-xl font-bold text-gray-900">
            {formatSensorValue(cable.vibration, 'Hz')}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600">{t('pdLevel')}</p>
          <p className="text-xl font-bold text-gray-900">
            {formatSensorValue(cable.pdLevel, 'pC')}
          </p>
        </div>
      </div>

      {/* Cable Information Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {details.map((detail, index) => {
          const Icon = detail.icon;
          return (
            <div key={index} className="flex items-center gap-3">
              <div className="p-2 bg-oq-blue rounded-lg">
                <Icon className="w-5 h-5 text-oq-navy" />
              </div>
              <div>
                <p className="text-sm text-gray-600">{detail.label}</p>
                <p className="text-sm font-medium text-gray-900">{detail.value}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

