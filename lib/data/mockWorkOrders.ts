import { WorkOrder, WorkOrderStatus, WorkOrderPriority } from '@/types';
import { mockCables } from './mockCables';

const generateWorkOrders = (): WorkOrder[] => {
  const workOrders: WorkOrder[] = [];
  const now = Date.now();

  const technicians = [
    { en: 'Ahmed Al-Balushi', ar: 'أحمد البلوشي' },
    { en: 'Mohammed Al-Hinai', ar: 'محمد الحنائي' },
    { en: 'Khalid Al-Wahaibi', ar: 'خالد الوهيبي' },
    { en: 'Salem Al-Rawahi', ar: 'سالم الرواحي' },
    { en: 'Hassan Al-Siyabi', ar: 'حسن السيابي' },
  ];

  const workOrderTypes = [
    {
      en: 'Cable Inspection and Testing',
      ar: 'فحص واختبار الكابل',
      desc: 'Comprehensive visual inspection and electrical testing',
      descAr: 'فحص بصري شامل واختبار كهربائي',
    },
    {
      en: 'Temperature Sensor Replacement',
      ar: 'استبدال مستشعر درجة الحرارة',
      desc: 'Replace faulty temperature monitoring sensor',
      descAr: 'استبدال مستشعر مراقبة درجة الحرارة المعطل',
    },
    {
      en: 'Cable Termination Repair',
      ar: 'إصلاح توصيلات الكابل',
      desc: 'Repair loose or damaged cable terminations',
      descAr: 'إصلاح توصيلات الكابل الفضفاضة أو التالفة',
    },
    {
      en: 'Preventive Maintenance',
      ar: 'الصيانة الوقائية',
      desc: 'Scheduled preventive maintenance and cleaning',
      descAr: 'الصيانة الوقائية والتنظيف المجدولة',
    },
    {
      en: 'Insulation Testing',
      ar: 'اختبار العزل',
      desc: 'Perform insulation resistance testing',
      descAr: 'إجراء اختبار مقاومة العزل',
    },
    {
      en: 'Cable Replacement',
      ar: 'استبدال الكابل',
      desc: 'Full cable replacement due to degradation',
      descAr: 'استبدال الكابل بالكامل بسبب التدهور',
    },
    {
      en: 'Vibration Damper Installation',
      ar: 'تركيب مخمد الاهتزاز',
      desc: 'Install vibration dampers to reduce mechanical stress',
      descAr: 'تركيب مخمدات الاهتزاز لتقليل الإجهاد الميكانيكي',
    },
    {
      en: 'PD Monitoring System Calibration',
      ar: 'معايرة نظام مراقبة PD',
      desc: 'Calibrate partial discharge monitoring equipment',
      descAr: 'معايرة معدات مراقبة التفريغ الجزئي',
    },
  ];

  // Generate work orders for critical and caution cables
  const problematicCables = mockCables.filter(
    cable => cable.status === 'critical' || cable.status === 'caution'
  );

  problematicCables.forEach((cable, index) => {
    const techIndex = index % technicians.length;
    const typeIndex = index % workOrderTypes.length;
    const workOrderType = workOrderTypes[typeIndex];
    
    // Determine status and priority based on cable status
    let status: WorkOrderStatus;
    let priority: WorkOrderPriority;
    let scheduledDate: Date;
    let completedAt: Date | undefined;

    if (cable.status === 'critical') {
      priority = 'critical';
      status = index % 3 === 0 ? 'in_progress' : 'pending';
      scheduledDate = new Date(now + Math.random() * 3 * 24 * 60 * 60 * 1000); // Next 3 days
    } else {
      priority = 'high';
      status = index % 4 === 0 ? 'completed' : index % 3 === 0 ? 'in_progress' : 'pending';
      scheduledDate = new Date(now + (3 + Math.random() * 7) * 24 * 60 * 60 * 1000); // 3-10 days
    }

    if (status === 'completed') {
      scheduledDate = new Date(now - Math.random() * 14 * 24 * 60 * 60 * 1000); // Past 14 days
      completedAt = new Date(scheduledDate.getTime() + Math.random() * 2 * 24 * 60 * 60 * 1000);
    }

    const estimatedCost = priority === 'critical' ? 8000 + Math.random() * 7000 : 3000 + Math.random() * 5000;
    const actualCost = status === 'completed' ? estimatedCost * (0.9 + Math.random() * 0.3) : undefined;

    workOrders.push({
      id: `WO-${String(workOrders.length + 1001).padStart(4, '0')}`,
      cableId: cable.id,
      title: `${workOrderType.en} - ${cable.id}`,
      titleAr: `${workOrderType.ar} - ${cable.id}`,
      description: `${workOrderType.desc} at ${cable.location}`,
      descriptionAr: `${workOrderType.descAr} في ${cable.locationAr}`,
      status,
      priority,
      assignedTo: technicians[techIndex].en,
      assignedToAr: technicians[techIndex].ar,
      createdAt: new Date(now - Math.random() * 7 * 24 * 60 * 60 * 1000),
      scheduledDate,
      completedAt,
      estimatedCost: Math.round(estimatedCost),
      actualCost: actualCost ? Math.round(actualCost) : undefined,
      technicianNotes: status === 'completed' 
        ? 'Work completed successfully. Cable performance restored to normal parameters.'
        : undefined,
    });
  });

  // Add some routine maintenance work orders for healthy cables
  const healthyCables = mockCables.filter(cable => cable.status === 'healthy').slice(0, 5);
  
  healthyCables.forEach((cable, index) => {
    const techIndex = index % technicians.length;
    
    workOrders.push({
      id: `WO-${String(workOrders.length + 1001).padStart(4, '0')}`,
      cableId: cable.id,
      title: `${workOrderTypes[3].en} - ${cable.id}`,
      titleAr: `${workOrderTypes[3].ar} - ${cable.id}`,
      description: `${workOrderTypes[3].desc} at ${cable.location}`,
      descriptionAr: `${workOrderTypes[3].descAr} في ${cable.locationAr}`,
      status: 'pending',
      priority: 'low',
      assignedTo: technicians[techIndex].en,
      assignedToAr: technicians[techIndex].ar,
      createdAt: new Date(now - Math.random() * 3 * 24 * 60 * 60 * 1000),
      scheduledDate: new Date(now + (10 + Math.random() * 20) * 24 * 60 * 60 * 1000), // 10-30 days
      estimatedCost: Math.round(1500 + Math.random() * 1500),
    });
  });

  // Sort by priority and scheduled date
  workOrders.sort((a, b) => {
    const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return a.scheduledDate.getTime() - b.scheduledDate.getTime();
  });

  return workOrders;
};

export const mockWorkOrders = generateWorkOrders();

export const getWorkOrdersByCableId = (cableId: string): WorkOrder[] => {
  return mockWorkOrders.filter(wo => wo.cableId === cableId);
};

export const getWorkOrdersByStatus = (status: WorkOrderStatus): WorkOrder[] => {
  return mockWorkOrders.filter(wo => wo.status === status);
};

export const getWorkOrdersByPriority = (priority: WorkOrderPriority): WorkOrder[] => {
  return mockWorkOrders.filter(wo => wo.priority === priority);
};


