export const translations = {
  en: {
    // Navigation
    dashboard: 'Dashboard',
    cables: 'Cables',
    analytics: 'Analytics',
    maintenance: 'Maintenance',
    reports: 'Reports',
    settings: 'Settings',
    monitoring: 'Fault Detection', // Changed from Monitoring
    
    // Header
    appName: 'CableGuard AI',
    tagline: 'AI-Powered Fault Detection for Buried Industrial Cables',

    // TDR Specific
    tdrAnalysis: 'TDR Analysis',
    faultLocation: 'Fault Location',
    velocityFactor: 'Velocity Factor (VF)',
    reflectionTime: 'Reflection Time',
    calculatedDistance: 'Calculated Distance',
    cableLength: 'Cable Length',
    measure: 'Measure',
    calculate: 'Calculate',
    signalReflection: 'Signal Reflection',
    impedanceMismatch: 'Impedance Mismatch',
    accuracy: 'Accuracy',
    excavationZone: 'Excavation Zone',
    portableDevice: 'Portable Device',
    connectTestLocate: 'Connect. Test. Locate.',
    
    // Cable Types
    type420mA: '4-20mA Signal',
    typeControl: '24-48VDC Control',
    typeInstrumentation: 'Instrumentation',
    typeCommunication: 'Communication',

    // KPIs
    totalCables: 'Total Scans', // Changed context
    activeAlerts: 'Faults Detected', // Changed context
    systemHealth: 'System Accuracy', // Changed context
    monthlySavings: 'Time Saved', // Changed context
    preventedFailures: 'Excavation Avoided', // Changed context
    uptime: 'Device Uptime',
    
    // Status
    healthy: 'Healthy',
    warning: 'Warning',
    caution: 'Caution',
    critical: 'Critical',
    
    // Work Orders
    workOrders: 'Work Orders',
    pending: 'Pending',
    inProgress: 'In Progress',
    completed: 'Completed',
    cancelled: 'Cancelled',
    
    // Priorities
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    
    // Actions
    viewDetails: 'View Analysis',
    createWorkOrder: 'Create Report',
    exportReport: 'Export Data',
    simulateAlert: 'Simulate Test',
    resetDemo: 'Reset Demo',
    refresh: 'New Scan',
    filter: 'Filter',
    search: 'Search ID',
    
    // Device Connection
    deviceConnected: 'Device Connected',
    deviceDisconnected: 'Device Disconnected',
    connectDevice: 'Connect TDR Device',
    deviceStatus: 'Device Status',
    batteryLevel: 'Battery Level',
    signalQuality: 'Signal Quality',
    generateReport: 'Generate Full Report',
    downloadPDF: 'Download PDF',
    serviceReport: 'Service Report',
    testCompleted: 'Test Completed',
    cablesScanned: 'Cables Scanned',
    
    // Cable Details
    cableId: 'Cable ID',
    location: 'Location',
    zone: 'Zone',
    temperature: 'Signal Noise', // Context change
    current: 'Resistance', // Context change
    vibration: 'Impedance', // Context change
    pdLevel: 'Return Loss', // Context change
    failureProbability: 'Fault Probability',
    daysToFailure: 'Severity Level', // Context change
    lastMaintenance: 'Last Scan',
    installDate: 'Install Date',
    
    // Zones
    sohar: 'Sohar Refinery',
    muscat: 'Muscat Refinery',
    duqm: 'Duqm Refinery',
    
    // Alerts
    alerts: 'Fault Alerts',
    recentAlerts: 'Recent Faults',
    alertHistory: 'Fault History',
    acknowledge: 'Acknowledge',
    
    // Analytics
    costSavings: 'Efficiency Metrics',
    roi: 'Time ROI',
    trends: 'Fault Trends',
    comparison: 'Method Comparison',
    beforeAfter: 'Manual vs TDR',
    traditional: 'Traditional Excavation',
    predictive: 'CableGuard AI TDR',
    
    // Maintenance
    scheduledMaintenance: 'Scheduled Scans',
    maintenanceHistory: 'Scan History',
    technician: 'Technician',
    assignedTo: 'Assigned To',
    scheduledDate: 'Scheduled Date',
    estimatedCost: 'Est. Resolution Time',
    actualCost: 'Actual Time',
    
    // Predictions
    aiPrediction: 'AI Fault Classification',
    confidence: 'Confidence',
    recommendations: 'Action Plan',
    costImpact: 'Time Impact',
    
    // Time
    today: 'Today',
    yesterday: 'Yesterday',
    thisWeek: 'This Week',
    thisMonth: 'This Month',
    last7Days: 'Last 7 Days',
    last30Days: 'Last 30 Days',
    
    // Currency
    omr: 'Hours', // Changed unit context for some metrics
    
    // Units
    celsius: 'dB', // Changed unit
    amperes: 'Ω', // Changed unit
    hertz: 'MHz', // Changed unit
    picocoulombs: 'dB', // Changed unit
    
    // Common
    loading: 'Processing Signal...',
    noData: 'No signal data',
    error: 'Error',
    success: 'Success',
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    close: 'Close',
    status: 'Status',
    priority: 'Priority',
  },
  ar: {
    // Navigation
    dashboard: 'لوحة التحكم',
    cables: 'الكابلات',
    analytics: 'التحليلات',
    maintenance: 'الصيانة',
    reports: 'التقارير',
    settings: 'الإعدادات',
    monitoring: 'كشف الأعطال', // Changed
    
    // Header
    appName: 'CableGuard AI',
    tagline: 'كشف الأعطال للكابلات الصناعية المدفونة بالذكاء الاصطناعي',

    // TDR Specific
    tdrAnalysis: 'تحليل TDR',
    faultLocation: 'تحديد موقع العطل',
    velocityFactor: 'معامل السرعة (VF)',
    reflectionTime: 'وقت الانعكاس',
    calculatedDistance: 'المسافة المحسوبة',
    cableLength: 'طول الكابل',
    measure: 'قياس',
    calculate: 'حساب',
    signalReflection: 'انعكاس الإشارة',
    impedanceMismatch: 'عدم تطابق المعاوقة',
    accuracy: 'الدقة',
    excavationZone: 'منطقة الحفر',
    portableDevice: 'جهاز محمول',
    connectTestLocate: 'وصل. افحص. حدد.',

    // Cable Types
    type420mA: 'إشارة 4-20mA',
    typeControl: 'تحكم 24-48VDC',
    typeInstrumentation: 'أجهزة دقيقة',
    typeCommunication: 'اتصالات',

    // KPIs
    totalCables: 'إجمالي الفحوصات',
    activeAlerts: 'أعطال مكتشفة',
    systemHealth: 'دقة النظام',
    monthlySavings: 'الوقت الموفر',
    preventedFailures: 'تجنب الحفر',
    uptime: 'جاهزية الجهاز',
    
    // Status
    healthy: 'سليم',
    warning: 'تحذير',
    caution: 'حذر',
    critical: 'حرج',
    
    // Work Orders
    workOrders: 'أوامر العمل',
    pending: 'قيد الانتظار',
    inProgress: 'قيد التنفيذ',
    completed: 'مكتمل',
    cancelled: 'ملغى',
    
    // Priorities
    low: 'منخفض',
    medium: 'متوسط',
    high: 'عالي',
    
    // Actions
    viewDetails: 'عرض التحليل',
    createWorkOrder: 'إنشاء تقرير',
    exportReport: 'تصدير البيانات',
    simulateAlert: 'محاكاة فحص',
    resetDemo: 'إعادة تعيين',
    refresh: 'فحص جديد',
    filter: 'تصفية',
    search: 'بحث',
    
    // Device Connection
    deviceConnected: 'الجهاز متصل',
    deviceDisconnected: 'الجهاز غير متصل',
    connectDevice: 'توصيل جهاز TDR',
    deviceStatus: 'حالة الجهاز',
    batteryLevel: 'مستوى البطارية',
    signalQuality: 'جودة الإشارة',
    generateReport: 'إنشاء التقرير الشامل',
    downloadPDF: 'تحميل PDF',
    serviceReport: 'تقرير الخدمة',
    testCompleted: 'اكتمل الفحص',
    cablesScanned: 'كابلات تم فحصها',
    
    // Cable Details
    cableId: 'معرف الكابل',
    location: 'الموقع',
    zone: 'المنطقة',
    temperature: 'ضجيج الإشارة',
    current: 'المقاومة',
    vibration: 'المعاوقة',
    pdLevel: 'فقد العودة',
    failureProbability: 'احتمالية العطل',
    daysToFailure: 'مستوى الخطورة',
    lastMaintenance: 'آخر فحص',
    installDate: 'تاريخ التركيب',
    
    // Zones
    sohar: 'مصفاة صحار',
    muscat: 'مصفاة مسقط',
    duqm: 'مصفاة الدقم',
    
    // Alerts
    alerts: 'تنبيهات الأعطال',
    recentAlerts: 'أعطال حديثة',
    alertHistory: 'سجل الأعطال',
    acknowledge: 'إقرار',
    
    // Analytics
    costSavings: 'مؤشرات الكفاءة',
    roi: 'عائد الوقت',
    trends: 'اتجاهات الأعطال',
    comparison: 'مقارنة الطرق',
    beforeAfter: 'يدوي vs TDR',
    traditional: 'الحفر التقليدي',
    predictive: 'CableGuard AI',
    
    // Maintenance
    scheduledMaintenance: 'فحوصات مجدولة',
    maintenanceHistory: 'سجل الفحص',
    technician: 'الفني',
    assignedTo: 'مسند إلى',
    scheduledDate: 'التاريخ المجدول',
    estimatedCost: 'وقت الإصلاح المقدر',
    actualCost: 'الوقت الفعلي',
    
    // Predictions
    aiPrediction: 'تصنيف العطل (AI)',
    confidence: 'الثقة',
    recommendations: 'خطة العمل',
    costImpact: 'تأثير الوقت',
    
    // Time
    today: 'اليوم',
    yesterday: 'أمس',
    thisWeek: 'هذا الأسبوع',
    thisMonth: 'هذا الشهر',
    last7Days: 'آخر 7 أيام',
    last30Days: 'آخر 30 يومًا',
    
    // Currency
    omr: 'ساعة',
    
    // Units
    celsius: 'ديسيبل',
    amperes: 'أوم',
    hertz: 'ميجاهرتز',
    picocoulombs: 'ديسيبل',
    
    // Common
    loading: 'جاري معالجة الإشارة...',
    noData: 'لا توجد إشارة',
    error: 'خطأ',
    success: 'نجاح',
    cancel: 'إلغاء',
    save: 'حفظ',
    delete: 'حذف',
    edit: 'تعديل',
    close: 'إغلاق',
    status: 'الحالة',
    priority: 'الأولوية',
  },
};

export type TranslationKey = keyof typeof translations.en;
export type Language = 'en' | 'ar';
