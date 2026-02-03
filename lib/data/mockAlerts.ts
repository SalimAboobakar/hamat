import { Alert, AlertSeverity } from '@/types';
import { mockCables } from './mockCables';

const generateAlerts = (): Alert[] => {
  const alerts: Alert[] = [];
  const now = Date.now();

  // Generate alerts for cables with non-healthy status
  const problemCables = mockCables.filter(cable => cable.status !== 'healthy');

  problemCables.forEach((cable, index) => {
    const alertMessages = {
      temperature: {
        en: `High temperature detected on ${cable.id} at ${cable.location}`,
        ar: `تم اكتشاف درجة حرارة عالية على ${cable.id} في ${cable.locationAr}`,
      },
      current: {
        en: `Abnormal current reading on ${cable.id}`,
        ar: `قراءة تيار غير طبيعية على ${cable.id}`,
      },
      vibration: {
        en: `Excessive vibration detected on ${cable.id}`,
        ar: `تم اكتشاف اهتزاز مفرط على ${cable.id}`,
      },
      pd_level: {
        en: `Elevated partial discharge on ${cable.id}`,
        ar: `ارتفاع التفريغ الجزئي على ${cable.id}`,
      },
      failure_prediction: {
        en: `AI predicts potential failure for ${cable.id}`,
        ar: `يتنبأ الذكاء الاصطناعي بفشل محتمل لـ ${cable.id}`,
      },
    };

    const getSeverity = (): AlertSeverity => {
      switch (cable.status) {
        case 'critical':
          return 'critical';
        case 'caution':
          return 'high';
        case 'warning':
          return 'medium';
        default:
          return 'low';
      }
    };

    // Generate primary alert based on highest concern
    let alertType: keyof typeof alertMessages = 'temperature';
    if (cable.temperature > 45) alertType = 'temperature';
    else if (cable.current > 12) alertType = 'current';
    else if (cable.vibration > 6) alertType = 'vibration';
    else if (cable.pdLevel > 250) alertType = 'pd_level';
    
    if (cable.failureProbability > 50) {
      alertType = 'failure_prediction';
    }

    alerts.push({
      id: `ALT-${String(alerts.length + 1).padStart(4, '0')}`,
      cableId: cable.id,
      severity: getSeverity(),
      message: alertMessages[alertType].en,
      messageAr: alertMessages[alertType].ar,
      timestamp: new Date(now - Math.random() * 7 * 24 * 60 * 60 * 1000), // Last 7 days
      acknowledged: Math.random() > 0.5,
      type: alertType,
    });
  });

  // Sort by timestamp (most recent first)
  alerts.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

  return alerts;
};

export const mockAlerts = generateAlerts();

export const getAlertsByCableId = (cableId: string): Alert[] => {
  return mockAlerts.filter(alert => alert.cableId === cableId);
};

export const getActiveAlerts = (): Alert[] => {
  return mockAlerts.filter(alert => !alert.acknowledged);
};

export const getAlertsBySeverity = (severity: AlertSeverity): Alert[] => {
  return mockAlerts.filter(alert => alert.severity === severity);
};


