'use client';

import { WorkOrderList } from '@/components/maintenance/WorkOrderList';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { mockWorkOrders } from '@/lib/data/mockWorkOrders';
import { Plus, Calendar, List } from 'lucide-react';
import { useState } from 'react';
import { Card } from '@/components/shared/Card';

export default function MaintenancePage() {
  const { t, language } = useLanguage();
  const [view, setView] = useState<'list' | 'calendar'>('list');

  const stats = {
    pending: mockWorkOrders.filter(wo => wo.status === 'pending').length,
    inProgress: mockWorkOrders.filter(wo => wo.status === 'in_progress').length,
    completed: mockWorkOrders.filter(wo => wo.status === 'completed').length,
    total: mockWorkOrders.length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('maintenance')}</h1>
          <p className="text-gray-600 mt-1">
            {language === 'ar' 
              ? 'إدارة أوامر العمل والصيانة المجدولة'
              : 'Work Order Management & Scheduled Maintenance'}
          </p>
        </div>

        <div className="flex gap-3">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setView('list')}
              className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                view === 'list' ? 'bg-white shadow-sm' : 'text-gray-600'
              }`}
            >
              <List className="w-4 h-4" />
              <span className="text-sm font-medium">{language === 'ar' ? 'قائمة' : 'List'}</span>
            </button>
            <button
              onClick={() => setView('calendar')}
              className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                view === 'calendar' ? 'bg-white shadow-sm' : 'text-gray-600'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span className="text-sm font-medium">{language === 'ar' ? 'تقويم' : 'Calendar'}</span>
            </button>
          </div>

          <button className="flex items-center gap-2 px-4 py-2 bg-oq-navy hover:bg-oq-navy-light text-white rounded-lg transition-colors font-medium">
            <Plus className="w-4 h-4" />
            {t('createWorkOrder')}
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-sm text-gray-600">{t('pending')}</p>
          <p className="text-2xl font-bold text-yellow-600 mt-1">{stats.pending}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-600">{t('inProgress')}</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">{stats.inProgress}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-600">{t('completed')}</p>
          <p className="text-2xl font-bold text-green-600 mt-1">{stats.completed}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-600">{t('workOrders')}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
        </Card>
      </div>

      {/* Content */}
      {view === 'list' ? (
        <WorkOrderList />
      ) : (
        <Card className="p-8 text-center">
          <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">
            {language === 'ar' 
              ? 'عرض التقويم قيد التطوير'
              : 'Calendar view coming soon'}
          </p>
        </Card>
      )}
    </div>
  );
}


