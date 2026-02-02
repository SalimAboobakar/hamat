import { create } from 'zustand';
import { Cable, Alert, KPI, WorkOrder, SensorReading, CableStatus } from '@/types';
import { mockCables } from '@/lib/data/mockCables';
import { mockAlerts } from '@/lib/data/mockAlerts';
import { mockKPIs } from '@/lib/data/mockKPIs';
import { mockWorkOrders } from '@/lib/data/mockWorkOrders';

interface AppState {
  // Data
  cables: Cable[];
  alerts: Alert[];
  kpis: KPI;
  workOrders: WorkOrder[];
  
  // Simulation state
  isSimulationRunning: boolean;
  isDemoScenarioActive: boolean;
  demoScenarioStep: number;
  
  // Sensor history for charts
  sensorHistory: Map<string, SensorReading[]>;
  
  // Actions
  updateCable: (cableId: string, updates: Partial<Cable>) => void;
  addAlert: (alert: Alert) => void;
  acknowledgeAlert: (alertId: string) => void;
  updateKPIs: (kpis: Partial<KPI>) => void;
  addWorkOrder: (workOrder: WorkOrder) => void;
  updateWorkOrder: (workOrderId: string, updates: Partial<WorkOrder>) => void;
  
  // Simulation actions
  startSimulation: () => void;
  stopSimulation: () => void;
  startDemoScenario: () => void;
  stopDemoScenario: () => void;
  resetData: () => void;
  
  // Sensor history actions
  addSensorReading: (cableId: string, reading: SensorReading) => void;
  getSensorHistory: (cableId: string) => SensorReading[];
}

// Generate initial sensor history (last 24 hours)
const generateInitialSensorHistory = (): Map<string, SensorReading[]> => {
  const history = new Map<string, SensorReading[]>();
  const now = Date.now();
  const hoursAgo24 = 24 * 60 * 60 * 1000;
  
  mockCables.forEach(cable => {
    const readings: SensorReading[] = [];
    const dataPoints = 144; // One reading every 10 minutes for 24 hours
    
    for (let i = 0; i < dataPoints; i++) {
      const timestamp = new Date(now - hoursAgo24 + (i * hoursAgo24 / dataPoints));
      
      // Add some realistic variation over time
      const timeProgress = i / dataPoints;
      const trendFactor = cable.status === 'critical' ? 1.0 + (timeProgress * 0.3) : 1.0;
      const noise = () => 0.95 + Math.random() * 0.1;
      
      readings.push({
        timestamp,
        temperature: cable.temperature * trendFactor * noise(),
        current: cable.current * noise(),
        vibration: cable.vibration * noise(),
        pdLevel: cable.pdLevel * noise(),
      });
    }
    
    history.set(cable.id, readings);
  });
  
  return history;
};

export const useAppStore = create<AppState>((set, get) => ({
  // Initial data
  cables: [...mockCables],
  alerts: [...mockAlerts],
  kpis: { ...mockKPIs },
  workOrders: [...mockWorkOrders],
  
  // Initial state
  isSimulationRunning: true,
  isDemoScenarioActive: false,
  demoScenarioStep: 0,
  
  // Initial sensor history
  sensorHistory: generateInitialSensorHistory(),
  
  // Update cable
  updateCable: (cableId, updates) => {
    set(state => ({
      cables: state.cables.map(cable =>
        cable.id === cableId ? { ...cable, ...updates } : cable
      ),
    }));
  },
  
  // Add alert
  addAlert: (alert) => {
    set(state => ({
      alerts: [alert, ...state.alerts],
      kpis: {
        ...state.kpis,
        activeAlerts: state.kpis.activeAlerts + 1,
      },
    }));
  },
  
  // Acknowledge alert
  acknowledgeAlert: (alertId) => {
    set(state => ({
      alerts: state.alerts.map(alert =>
        alert.id === alertId ? { ...alert, acknowledged: true } : alert
      ),
      kpis: {
        ...state.kpis,
        activeAlerts: Math.max(0, state.kpis.activeAlerts - 1),
      },
    }));
  },
  
  // Update KPIs
  updateKPIs: (updates) => {
    set(state => ({
      kpis: { ...state.kpis, ...updates },
    }));
  },
  
  // Add work order
  addWorkOrder: (workOrder) => {
    set(state => ({
      workOrders: [workOrder, ...state.workOrders],
    }));
  },
  
  // Update work order
  updateWorkOrder: (workOrderId, updates) => {
    set(state => ({
      workOrders: state.workOrders.map(wo =>
        wo.id === workOrderId ? { ...wo, ...updates } : wo
      ),
    }));
  },
  
  // Start simulation
  startSimulation: () => {
    set({ isSimulationRunning: true });
  },
  
  // Stop simulation
  stopSimulation: () => {
    set({ isSimulationRunning: false });
  },
  
  // Start demo scenario
  startDemoScenario: () => {
    set({ isDemoScenarioActive: true, demoScenarioStep: 0 });
  },
  
  // Stop demo scenario
  stopDemoScenario: () => {
    set({ isDemoScenarioActive: false, demoScenarioStep: 0 });
  },
  
  // Reset data
  resetData: () => {
    set({
      cables: [...mockCables],
      alerts: [...mockAlerts],
      kpis: { ...mockKPIs },
      workOrders: [...mockWorkOrders],
      isDemoScenarioActive: false,
      demoScenarioStep: 0,
      sensorHistory: generateInitialSensorHistory(),
    });
  },
  
  // Add sensor reading
  addSensorReading: (cableId, reading) => {
    set(state => {
      const history = new Map(state.sensorHistory);
      const cableHistory = history.get(cableId) || [];
      const newHistory = [...cableHistory, reading];
      
      // Keep only last 144 readings (24 hours at 10-min intervals)
      if (newHistory.length > 144) {
        newHistory.shift();
      }
      
      history.set(cableId, newHistory);
      return { sensorHistory: history };
    });
  },
  
  // Get sensor history
  getSensorHistory: (cableId) => {
    const history = get().sensorHistory;
    return history.get(cableId) || [];
  },
}));

