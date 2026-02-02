import { ActivityLog } from '@/types';
import { mockAlerts } from './mockAlerts';
import { mockWorkOrders } from './mockWorkOrders';

const generateActivityLogs = (): ActivityLog[] => {
  const logs: ActivityLog[] = [];
  let logId = 1;

  // Add alert activities
  mockAlerts.slice(0, 15).forEach(alert => {
    logs.push({
      id: `LOG-${String(logId++).padStart(4, '0')}`,
      timestamp: alert.timestamp,
      type: 'alert',
      message: alert.message,
      messageAr: alert.messageAr,
      cableId: alert.cableId,
      severity: alert.severity,
    });

    if (alert.acknowledged) {
      logs.push({
        id: `LOG-${String(logId++).padStart(4, '0')}`,
        timestamp: new Date(alert.timestamp.getTime() + Math.random() * 2 * 60 * 60 * 1000),
        type: 'alert',
        message: `Alert ${alert.id} acknowledged`,
        messageAr: `تم الإقرار بالتنبيه ${alert.id}`,
        cableId: alert.cableId,
        severity: alert.severity,
      });
    }
  });

  // Add work order activities
  mockWorkOrders.slice(0, 10).forEach(wo => {
    logs.push({
      id: `LOG-${String(logId++).padStart(4, '0')}`,
      timestamp: wo.createdAt,
      type: 'work_order',
      message: `Work order ${wo.id} created: ${wo.title}`,
      messageAr: `تم إنشاء أمر العمل ${wo.id}: ${wo.titleAr}`,
      cableId: wo.cableId,
    });

    if (wo.status === 'completed' && wo.completedAt) {
      logs.push({
        id: `LOG-${String(logId++).padStart(4, '0')}`,
        timestamp: wo.completedAt,
        type: 'maintenance',
        message: `Maintenance completed for ${wo.cableId}`,
        messageAr: `اكتملت الصيانة لـ ${wo.cableId}`,
        cableId: wo.cableId,
      });

      logs.push({
        id: `LOG-${String(logId++).padStart(4, '0')}`,
        timestamp: new Date(wo.completedAt.getTime() + 5 * 60 * 1000),
        type: 'status_change',
        message: `${wo.cableId} status changed to healthy`,
        messageAr: `تغيرت حالة ${wo.cableId} إلى سليم`,
        cableId: wo.cableId,
      });
    }
  });

  // Sort by timestamp (most recent first)
  logs.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

  return logs.slice(0, 50); // Keep last 50 activities
};

export const mockActivityLogs = generateActivityLogs();

export const getRecentActivities = (limit: number = 10): ActivityLog[] => {
  return mockActivityLogs.slice(0, limit);
};

export const getActivitiesByCableId = (cableId: string): ActivityLog[] => {
  return mockActivityLogs.filter(log => log.cableId === cableId);
};

