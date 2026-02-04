'use client';

import { Card } from '@/components/shared/Card';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { mockWorkOrders } from '@/lib/data/mockWorkOrders';
import { WorkOrder, WorkOrderStatus, WorkOrderPriority } from '@/types';
import { formatDate, getPriorityColor, getWorkOrderStatusColor } from '@/lib/utils/formatters';
import { CurrencyDisplay } from '@/components/shared/OmaniRialSymbol';
import { TranslationKey } from '@/lib/i18n/translations';
import { Calendar, User, ChevronRight } from 'lucide-react';
import { clsx } from 'clsx';
import Link from 'next/link';
import { useState } from 'react';

export function WorkOrderList() {
  const { t, language } = useLanguage();
  const [filterStatus, setFilterStatus] = useState<WorkOrderStatus | 'all'>('all');
  const [filterPriority, setFilterPriority] = useState<WorkOrderPriority | 'all'>('all');

  const filteredWorkOrders = mockWorkOrders.filter(wo => {
    if (filterStatus !== 'all' && wo.status !== filterStatus) return false;
    if (filterPriority !== 'all' && wo.priority !== filterPriority) return false;
    return true;
  });

  const statusOptions: (WorkOrderStatus | 'all')[] = ['all', 'pending', 'in_progress', 'completed', 'cancelled'];
  const priorityOptions: (WorkOrderPriority | 'all')[] = ['all', 'critical', 'high', 'medium', 'low'];

  // Helper function to convert WorkOrderStatus to translation key
  const getStatusTranslationKey = (status: WorkOrderStatus | 'all'): TranslationKey => {
    if (status === 'all') return 'dashboard';
    if (status === 'in_progress') return 'inProgress';
    return status as TranslationKey;
  };

  // Helper function to convert WorkOrderPriority to translation key
  const getPriorityTranslationKey = (priority: WorkOrderPriority | 'all'): TranslationKey => {
    if (priority === 'all') return 'dashboard';
    return priority as TranslationKey;
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="text-sm text-gray-600 block mb-2">{t('status')}</label>
            <div className="flex gap-2">
              {statusOptions.map(status => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={clsx(
                    'px-3 py-1.5 text-sm rounded-lg transition-colors',
                    filterStatus === status
                      ? 'bg-oq-navy text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  )}
                >
                  {t(getStatusTranslationKey(status))}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-600 block mb-2">{t('priority')}</label>
            <div className="flex gap-2">
              {priorityOptions.map(priority => (
                <button
                  key={priority}
                  onClick={() => setFilterPriority(priority)}
                  className={clsx(
                    'px-3 py-1.5 text-sm rounded-lg transition-colors',
                    filterPriority === priority
                      ? 'bg-oq-navy text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  )}
                >
                  {t(getPriorityTranslationKey(priority))}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Work Orders */}
      <div className="space-y-3">
        {filteredWorkOrders.map(wo => (
          <Link key={wo.id} href={`/cable/${wo.cableId}`}>
            <Card hover className="p-4">
              <div className="flex items-start gap-4">
                {/* Priority Indicator */}
                <div className={clsx('w-1 h-full rounded-full', 
                  wo.priority === 'critical' ? 'bg-red-500' :
                  wo.priority === 'high' ? 'bg-orange-500' :
                  wo.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                )} />

                <div className="flex-1 min-w-0">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-gray-900">
                          {language === 'ar' ? wo.titleAr : wo.title}
                        </h3>
                        <span className={clsx('text-xs px-2 py-0.5 rounded-full font-medium', getWorkOrderStatusColor(wo.status))}>
                          {t(getStatusTranslationKey(wo.status))}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {language === 'ar' ? wo.descriptionAr : wo.description}
                      </p>
                    </div>
                    <span className={clsx('text-xs px-2 py-1 rounded border font-medium whitespace-nowrap', getPriorityColor(wo.priority))}>
                      {t(getPriorityTranslationKey(wo.priority))}
                    </span>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-700">
                        {language === 'ar' ? wo.assignedToAr : wo.assignedTo}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-700">
                        {formatDate(wo.scheduledDate, language, 'PP')}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <CurrencyDisplay 
                        amount={wo.estimatedCost} 
                        language={language} 
                        symbolSize="xs"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600 font-medium">{wo.cableId}</span>
                    </div>
                  </div>
                </div>

                <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
              </div>
            </Card>
          </Link>
        ))}

        {filteredWorkOrders.length === 0 && (
          <Card className="p-8 text-center">
            <p className="text-gray-600">{t('noData')}</p>
          </Card>
        )}
      </div>
    </div>
  );
}

