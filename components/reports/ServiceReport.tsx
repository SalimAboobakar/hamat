'use client';

import { Card } from '@/components/shared/Card';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useAppStore } from '@/lib/store/appStore';
import { FileText, Download, Printer, Calendar, MapPin } from 'lucide-react';
import { formatDate } from '@/lib/utils/formatters';
import { motion } from 'framer-motion';

export function ServiceReport() {
  const { t, language } = useLanguage();
  const { cables, kpis } = useAppStore();

  const criticalCables = cables.filter(c => c.status === 'critical');
  const cautionCables = cables.filter(c => c.status === 'caution');
  const warningCables = cables.filter(c => c.status === 'warning');
  const healthyCables = cables.filter(c => c.status === 'healthy');

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Simple download simulation - in real app would generate PDF
    const reportData = {
      date: new Date().toISOString(),
      cablesScanned: cables.length,
      faultsDetected: criticalCables.length + cautionCables.length,
      recommendations: 'Immediate action required for critical cables'
    };
    
    const dataStr = JSON.stringify(reportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `OQ-RPI-Service-Report-${Date.now()}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Report Header */}
      <Card className="p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {language === 'ar' ? 'تقرير خدمة TDR الشامل' : 'Comprehensive TDR Service Report'}
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(new Date(), language)}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>OQ RPI - Sohar & Duqm Refineries</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
            >
              <Printer className="w-4 h-4" />
              {language === 'ar' ? 'طباعة' : 'Print'}
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 bg-oq-navy hover:bg-oq-navy-light text-white rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              {t('downloadPDF')}
            </button>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-600 font-medium">{t('cablesScanned')}</p>
            <p className="text-3xl font-bold text-blue-900 mt-1">{cables.length}</p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <p className="text-sm text-red-600 font-medium">{language === 'ar' ? 'حرجة' : 'Critical'}</p>
            <p className="text-3xl font-bold text-red-900 mt-1">{criticalCables.length}</p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <p className="text-sm text-orange-600 font-medium">{language === 'ar' ? 'حذر' : 'Caution'}</p>
            <p className="text-3xl font-bold text-orange-900 mt-1">{cautionCables.length}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-green-600 font-medium">{language === 'ar' ? 'سليمة' : 'Healthy'}</p>
            <p className="text-3xl font-bold text-green-900 mt-1">{healthyCables.length}</p>
          </div>
        </div>
      </Card>

      {/* Critical Cables - Immediate Action Required */}
      {criticalCables.length > 0 && (
        <Card className="p-6 border-2 border-red-200">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            <h2 className="text-xl font-bold text-red-900">
              {language === 'ar' ? 'إجراء فوري مطلوب' : 'Immediate Action Required'}
            </h2>
          </div>
          
          <div className="space-y-3">
            {criticalCables.map(cable => (
              <div key={cable.id} className="bg-red-50 p-4 rounded-lg">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900">{cable.id}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {language === 'ar' ? cable.locationAr : cable.location}
                    </p>
                    <p className="text-sm text-red-600 mt-2 font-medium">
                      {language === 'ar' 
                        ? `احتمالية العطل: ${Math.round(cable.failureProbability)}%`
                        : `Fault Probability: ${Math.round(cable.failureProbability)}%`
                      }
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">{language === 'ar' ? 'المسافة المقدرة' : 'Est. Distance'}</p>
                    <p className="text-lg font-bold text-red-900">{cable.length || 100}m</p>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-red-200">
                  <p className="text-sm text-gray-700">
                    <strong>{language === 'ar' ? 'التوصية:' : 'Recommendation:'}</strong>{' '}
                    {language === 'ar' 
                      ? 'فحص فوري وإصلاح أو استبدال الكابل'
                      : 'Immediate inspection and repair/replace cable'
                    }
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Caution Cables - Schedule Maintenance */}
      {cautionCables.length > 0 && (
        <Card className="p-6 border-2 border-orange-200">
          <h2 className="text-xl font-bold text-orange-900 mb-4">
            {language === 'ar' ? 'صيانة مجدولة موصى بها' : 'Recommended Scheduled Maintenance'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {cautionCables.map(cable => (
              <div key={cable.id} className="bg-orange-50 p-3 rounded-lg">
                <h3 className="font-bold text-gray-900">{cable.id}</h3>
                <p className="text-sm text-gray-600">
                  {language === 'ar' ? cable.locationAr : cable.location}
                </p>
                <p className="text-sm text-orange-600 mt-1">
                  {language === 'ar' ? 'مراقبة دورية' : 'Periodic monitoring recommended'}
                </p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Summary & Recommendations */}
      <Card className="p-6 bg-gradient-to-r from-oq-navy to-oq-navy-light text-white">
        <h2 className="text-xl font-bold mb-4">
          {language === 'ar' ? 'الملخص والتوصيات' : 'Summary & Recommendations'}
        </h2>
        
        <div className="space-y-3 text-oq-blue">
          <p>
            {language === 'ar' 
              ? `تم فحص ${cables.length} كابل في مصفاتي صحار والدقم باستخدام تقنية TDR.`
              : `${cables.length} cables scanned across Sohar and Duqm refineries using TDR technology.`
            }
          </p>
          <p>
            {language === 'ar'
              ? `تم اكتشاف ${criticalCables.length + cautionCables.length} كابل يحتاج إلى صيانة.`
              : `${criticalCables.length + cautionCables.length} cables detected requiring maintenance attention.`
            }
          </p>
          <p>
            {language === 'ar'
              ? 'تقنية TDR وفرت ساعات من الحفر اليدوي وحددت مواقع الأعطال بدقة.'
              : 'TDR technology saved hours of manual excavation and accurately pinpointed fault locations.'
            }
          </p>
        </div>

        <div className="mt-4 pt-4 border-t border-oq-blue/30">
          <p className="text-sm text-oq-blue/80">
            {language === 'ar' 
              ? 'تم إنشاء هذا التقرير تلقائياً بواسطة CableGuard AI'
              : 'This report was automatically generated by CableGuard AI'
            }
          </p>
        </div>
      </Card>
    </motion.div>
  );
}

