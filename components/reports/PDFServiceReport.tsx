'use client';

import { useRef } from 'react';
import { Card } from '@/components/shared/Card';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useAppStore } from '@/lib/store/appStore';
import { Download, Printer, Calendar, MapPin, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { formatDate } from '@/lib/utils/formatters';
import { motion } from 'framer-motion';

export function PDFServiceReport() {
  const { t, language } = useLanguage();
  const { cables, kpis } = useAppStore();
  const reportRef = useRef<HTMLDivElement>(null);

  const criticalCables = cables.filter(c => c.status === 'critical');
  const cautionCables = cables.filter(c => c.status === 'caution');
  const warningCables = cables.filter(c => c.status === 'warning');
  const healthyCables = cables.filter(c => c.status === 'healthy');

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    try {
      // Dynamically import jspdf and html2canvas
      const jsPDF = (await import('jspdf')).default;
      const html2canvas = (await import('html2canvas')).default;

      if (reportRef.current) {
        // Create canvas from the report content
        const canvas = await html2canvas(reportRef.current, {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff'
        });

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 297; // A4 height in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        // Add first page
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        // Add additional pages if needed
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        // Save the PDF
        pdf.save(`OQ-RPI-Service-Report-${Date.now()}.pdf`);
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('PDF generation requires jspdf and html2canvas libraries. Please run: npm install jspdf html2canvas');
    }
  };

  return (
    <div className="space-y-6">
      {/* Action Buttons - Fixed at top */}
      <div className="sticky top-4 z-50 flex justify-end gap-3 print:hidden">
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-700 rounded-lg transition-all shadow-lg"
        >
          <Printer className="w-4 h-4" />
          {language === 'ar' ? 'طباعة' : 'Print'}
        </button>
        <button
          onClick={handleDownloadPDF}
          className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-oq-navy to-blue-900 hover:from-blue-900 hover:to-oq-navy text-white rounded-lg transition-all shadow-lg font-bold"
        >
          <Download className="w-4 h-4" />
          {t('downloadPDF')}
        </button>
      </div>

      {/* PDF Content - Optimized for printing */}
      <div ref={reportRef} className="bg-white p-8 shadow-2xl rounded-lg">
        {/* Header with OQ Logo */}
        <div className="border-b-4 border-oq-navy pb-6 mb-6">
          <div className="flex items-start justify-between">
            {/* OQ Logo Area */}
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-oq-navy rounded-xl flex items-center justify-center">
                <span className="text-4xl font-bold text-oq-gold">OQ</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-oq-navy mb-1">
                  {language === 'ar' ? 'مصافي النفط العمانية' : 'OQ RPI'}
                </h1>
                <p className="text-sm text-gray-600">
                  {language === 'ar' ? 'تقرير خدمة TDR الشامل' : 'Comprehensive TDR Service Report'}
                </p>
              </div>
            </div>

            {/* Report Metadata */}
            <div className="text-right space-y-2">
              <div className="flex items-center gap-2 justify-end text-sm text-gray-600">
                <span>{formatDate(new Date(), language)}</span>
                <Calendar className="w-4 h-4" />
              </div>
              <div className="flex items-center gap-2 justify-end text-sm text-gray-600">
                <span>Sohar & Duqm Refineries</span>
                <MapPin className="w-4 h-4" />
              </div>
              <div className="px-3 py-1 bg-oq-gold/20 border border-oq-gold rounded text-xs font-bold text-oq-navy">
                CONFIDENTIAL
              </div>
            </div>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <div className="w-1 h-8 bg-oq-navy rounded-full"></div>
            {language === 'ar' ? 'الملخص التنفيذي' : 'Executive Summary'}
          </h2>
          
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border-l-4 border-blue-600">
              <p className="text-sm text-blue-700 font-semibold mb-1">{t('cablesScanned')}</p>
              <p className="text-4xl font-bold text-blue-900">{cables.length}</p>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-lg border-l-4 border-red-600">
              <p className="text-sm text-red-700 font-semibold mb-1">{language === 'ar' ? 'حرجة' : 'Critical'}</p>
              <p className="text-4xl font-bold text-red-900">{criticalCables.length}</p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg border-l-4 border-orange-600">
              <p className="text-sm text-orange-700 font-semibold mb-1">{language === 'ar' ? 'حذر' : 'Caution'}</p>
              <p className="text-4xl font-bold text-orange-900">{cautionCables.length}</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border-l-4 border-green-600">
              <p className="text-sm text-green-700 font-semibold mb-1">{language === 'ar' ? 'سليمة' : 'Healthy'}</p>
              <p className="text-4xl font-bold text-green-900">{healthyCables.length}</p>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <p className="text-gray-700 leading-relaxed">
              {language === 'ar' 
                ? `تم فحص ${cables.length} كابل صناعي في مصفاتي صحار والدقم باستخدام تقنية TDR المتقدمة. تم اكتشاف ${criticalCables.length + cautionCables.length} كابل يحتاج إلى تدخل صيانة فوري أو مجدول. التقنية المستخدمة وفرت ساعات من العمل اليدوي وحددت مواقع الأعطال بدقة عالية.`
                : `${cables.length} industrial cables scanned across Sohar and Duqm refineries using advanced TDR technology. ${criticalCables.length + cautionCables.length} cables detected requiring immediate or scheduled maintenance intervention. The technology saved hours of manual work and accurately pinpointed fault locations.`
              }
            </p>
          </div>
        </div>

        {/* Critical Findings - Page break before */}
        {criticalCables.length > 0 && (
          <div className="mb-8 page-break-before">
            <h2 className="text-2xl font-bold text-red-900 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6" />
              {language === 'ar' ? 'نتائج حرجة - إجراء فوري مطلوب' : 'Critical Findings - Immediate Action Required'}
            </h2>
            
            <div className="space-y-4">
              {criticalCables.map(cable => (
                <div key={cable.id} className="bg-red-50 border-2 border-red-300 rounded-lg p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{cable.id}</h3>
                      <p className="text-sm text-gray-600">
                        📍 {language === 'ar' ? cable.locationAr : cable.location}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500 mb-1">{language === 'ar' ? 'احتمالية العطل' : 'Fault Probability'}</p>
                      <p className="text-3xl font-bold text-red-600">{Math.round(cable.failureProbability)}%</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3 mb-3 p-3 bg-white rounded">
                    <div>
                      <p className="text-xs text-gray-500">{language === 'ar' ? 'المسافة المقدرة' : 'Est. Distance'}</p>
                      <p className="text-lg font-bold text-gray-900">{cable.length || 100}m</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">{language === 'ar' ? 'نوع الكابل' : 'Cable Type'}</p>
                      <p className="text-sm font-semibold text-gray-900">{cable.cableType}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">{language === 'ar' ? 'الجهد' : 'Voltage'}</p>
                      <p className="text-sm font-semibold text-gray-900">{cable.voltage/1000}kV</p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-red-200">
                    <p className="text-sm font-semibold text-gray-900 mb-2">
                      {language === 'ar' ? '📋 التوصية:' : '📋 Recommendation:'}
                    </p>
                    <p className="text-sm text-gray-700">
                      {language === 'ar' 
                        ? 'فحص فوري وإصلاح أو استبدال الكابل. ينصح بإيقاف التشغيل حتى إتمام الإصلاح لتجنب مخاطر السلامة.'
                        : 'Immediate inspection and repair/replace cable. Recommend shutdown until repair completed to avoid safety hazards.'
                      }
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Caution Cables */}
        {cautionCables.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-orange-900 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6" />
              {language === 'ar' ? 'صيانة مجدولة موصى بها' : 'Recommended Scheduled Maintenance'}
            </h2>
            
            <div className="grid grid-cols-2 gap-3">
              {cautionCables.map(cable => (
                <div key={cable.id} className="bg-orange-50 border border-orange-300 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-1">{cable.id}</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {language === 'ar' ? cable.locationAr : cable.location}
                  </p>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-orange-700 font-semibold">
                      {language === 'ar' ? 'مراقبة دورية' : 'Periodic monitoring'}
                    </span>
                    <span className="font-mono text-gray-500">{cable.length || 100}m</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Healthy Cables Summary */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-green-900 mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6" />
            {language === 'ar' ? 'الكابلات السليمة' : 'Healthy Cables'}
          </h2>
          <div className="bg-green-50 border border-green-300 rounded-lg p-4">
            <p className="text-gray-700">
              {language === 'ar' 
                ? `${healthyCables.length} كابل في حالة ممتازة ولا يحتاج إلى صيانة فورية. يوصى بالفحص الدوري المجدول.`
                : `${healthyCables.length} cables in excellent condition with no immediate maintenance required. Scheduled periodic inspection recommended.`
              }
            </p>
          </div>
        </div>

        {/* Footer / Signature */}
        <div className="border-t-2 border-gray-200 pt-6 mt-8">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-sm text-gray-600 mb-1">
                {language === 'ar' ? 'تم الإنشاء بواسطة:' : 'Generated by:'}
              </p>
              <p className="font-bold text-oq-navy">CableGuard AI TDR System</p>
              <p className="text-xs text-gray-500 mt-2">
                {language === 'ar' ? 'هذا تقرير تلقائي - لا يتطلب توقيع' : 'This is an automated report - No signature required'}
              </p>
            </div>
            
            <div className="text-right">
              <div className="flex items-center gap-2 justify-end mb-2">
                <span className="w-3 h-3 bg-oq-navy rounded-full"></span>
                <span className="text-sm font-semibold text-gray-700">Powered by CableGuard AI</span>
              </div>
              <p className="text-xs text-gray-500">
                www.oqrpi.om | support@cableguard-ai.com
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          .page-break-before {
            page-break-before: always;
          }
        }
      `}</style>
    </div>
  );
}

