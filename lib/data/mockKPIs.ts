import { KPI } from '@/types';
import { mockCables } from './mockCables';
import { getActiveAlerts } from './mockAlerts';

const calculateKPIs = (): KPI => {
  const totalCables = mockCables.length;
  const activeAlerts = getActiveAlerts().length;
  
  // Calculate system health (percentage of healthy cables)
  const healthyCables = mockCables.filter(cable => cable.status === 'healthy').length;
  const systemHealth = Math.round((healthyCables / totalCables) * 100);
  
  // Estimated monthly savings (based on prevented failures)
  // Average cost per failure: ~15,000 OMR
  // Estimated failures prevented per month based on cable status distribution
  const criticalCables = mockCables.filter(cable => cable.status === 'critical').length;
  const cautionCables = mockCables.filter(cable => cable.status === 'caution').length;
  const preventedFailures = criticalCables + Math.floor(cautionCables * 0.6);
  const monthlySavings = preventedFailures * 15000;
  
  // System uptime (based on health)
  const uptime = 94 + (systemHealth / 100) * 5; // 94-99%
  
  // Maintenance completed this month
  const maintenanceCompleted = 12 + Math.floor(Math.random() * 8);
  
  // Average response time in hours
  const avgResponseTime = 2 + Math.random() * 2; // 2-4 hours

  return {
    totalCables,
    activeAlerts,
    systemHealth,
    monthlySavings,
    preventedFailures,
    uptime: Math.round(uptime * 10) / 10,
    maintenanceCompleted,
    avgResponseTime: Math.round(avgResponseTime * 10) / 10,
  };
};

export const mockKPIs = calculateKPIs();

// Historical KPI data for trends (last 6 months)
export const historicalKPIs = [
  {
    month: 'Aug 2025',
    systemHealth: 89,
    preventedFailures: 3,
    monthlySavings: 45000,
    uptime: 94.2,
  },
  {
    month: 'Sep 2025',
    systemHealth: 91,
    preventedFailures: 4,
    monthlySavings: 60000,
    uptime: 95.1,
  },
  {
    month: 'Oct 2025',
    systemHealth: 92,
    preventedFailures: 5,
    monthlySavings: 75000,
    uptime: 95.8,
  },
  {
    month: 'Nov 2025',
    systemHealth: 94,
    preventedFailures: 6,
    monthlySavings: 90000,
    uptime: 96.3,
  },
  {
    month: 'Dec 2025',
    systemHealth: 95,
    preventedFailures: 8,
    monthlySavings: 120000,
    uptime: 97.1,
  },
  {
    month: 'Jan 2026',
    systemHealth: mockKPIs.systemHealth,
    preventedFailures: mockKPIs.preventedFailures,
    monthlySavings: mockKPIs.monthlySavings,
    uptime: mockKPIs.uptime,
  },
];

// Cost comparison data
export const costComparison = {
  traditional: {
    annualCost: 2400000, // 2.4M OMR
    unplannedDowntime: 156, // hours per year
    failureRate: 24, // failures per year
    maintenanceCost: 1800000,
    downtimeCost: 600000,
  },
  predictive: {
    annualCost: 1200000, // 1.2M OMR
    unplannedDowntime: 48, // hours per year
    failureRate: 6, // failures per year
    maintenanceCost: 900000,
    downtimeCost: 300000,
    systemCost: 200000, // Cost of predictive system
  },
  savings: {
    annual: 1200000, // 50% reduction
    roi: 600, // 600% ROI
    paybackPeriod: 2, // months
  },
};

