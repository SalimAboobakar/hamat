export type CableStatus = 'healthy' | 'warning' | 'caution' | 'critical';
export type Zone = 'Sohar' | 'Duqm' | 'Muscat';
export type AlertSeverity = 'low' | 'medium' | 'high' | 'critical';
export type WorkOrderStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';
export type WorkOrderPriority = 'low' | 'medium' | 'high' | 'critical';

export interface Cable {
  id: string;
  location: string;
  locationAr: string;
  zone: Zone;
  status: CableStatus;
  temperature: number;
  current: number;
  vibration: number;
  pdLevel: number;
  failureProbability: number;
  daysToFailure: number;
  coordinates: [number, number];
  lastMaintenance: Date;
  installDate: Date;
  unit: string;
  voltage: number;
  velocityFactor: number;
  cableType: '4-20mA' | 'Control' | 'Instrumentation' | 'Communication';
  length: number;
}

export interface Alert {
  id: string;
  cableId: string;
  severity: AlertSeverity;
  message: string;
  messageAr: string;
  timestamp: Date;
  acknowledged: boolean;
  type: 'temperature' | 'current' | 'vibration' | 'pd_level' | 'failure_prediction';
}

export interface KPI {
  totalCables: number;
  activeAlerts: number;
  systemHealth: number;
  monthlySavings: number;
  preventedFailures: number;
  uptime: number;
  maintenanceCompleted: number;
  avgResponseTime: number;
}

export interface WorkOrder {
  id: string;
  cableId: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  status: WorkOrderStatus;
  priority: WorkOrderPriority;
  assignedTo: string;
  assignedToAr: string;
  createdAt: Date;
  scheduledDate: Date;
  completedAt?: Date;
  estimatedCost: number;
  actualCost?: number;
  technicianNotes?: string;
}

export interface SensorReading {
  timestamp: Date;
  temperature: number;
  current: number;
  vibration: number;
  pdLevel: number;
}

export interface MaintenanceHistory {
  id: string;
  cableId: string;
  date: Date;
  type: 'inspection' | 'repair' | 'replacement' | 'preventive';
  description: string;
  descriptionAr: string;
  technician: string;
  cost: number;
}

export interface Prediction {
  cableId: string;
  failureProbability: number;
  daysToFailure: number;
  confidence: number;
  factors: string[];
  factorsAr: string[];
  recommendations: string[];
  recommendationsAr: string[];
  estimatedCost: number;
}

export interface ActivityLog {
  id: string;
  timestamp: Date;
  type: 'alert' | 'maintenance' | 'status_change' | 'work_order';
  message: string;
  messageAr: string;
  cableId?: string;
  severity?: AlertSeverity;
}

