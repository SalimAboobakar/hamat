import { KPI } from '@/types';
import { mockCables } from './mockCables';
import { getActiveAlerts } from './mockAlerts';

const calculateKPIs = (): KPI => {
  const totalCables = 142; // Total Scans Performed
  const activeAlerts = getActiveAlerts().length;
  
  // Calculate system accuracy (mocked for demo)
  const systemHealth = 98; // 98% Accuracy
  
  // Estimated monthly savings (Time Saved in Hours)
  // Traditional: 10 hours per fault
  // CableGuard: 0.5 hours per fault
  // Savings: 9.5 hours per fault
  const faultsDetected = 12; // Mock faults found this month
  const monthlySavings = Math.round(faultsDetected * 9.5); // Hours saved
  
  const preventedFailures = faultsDetected; // Excavations Avoided (used loosely)
  
  // System uptime (Device readiness)
  const uptime = 99.5;
  
  // Maintenance completed this month
  const maintenanceCompleted = 12;
  
  // Average response time in hours
  const avgResponseTime = 0.5; // 30 minutes

  return {
    totalCables,
    activeAlerts,
    systemHealth,
    monthlySavings,
    preventedFailures,
    uptime,
    maintenanceCompleted,
    avgResponseTime,
  };
};

export const mockKPIs = calculateKPIs();

// Historical KPI data for trends (last 6 months)
export const historicalKPIs = [
  {
    month: 'Aug 2025',
    systemHealth: 96,
    preventedFailures: 8,
    monthlySavings: 75, // hours
    uptime: 98.2,
  },
  {
    month: 'Sep 2025',
    systemHealth: 97,
    preventedFailures: 10,
    monthlySavings: 92, // hours
    uptime: 98.5,
  },
  {
    month: 'Oct 2025',
    systemHealth: 97,
    preventedFailures: 11,
    monthlySavings: 105, // hours
    uptime: 98.8,
  },
  {
    month: 'Nov 2025',
    systemHealth: 98,
    preventedFailures: 14,
    monthlySavings: 130, // hours
    uptime: 99.1,
  },
  {
    month: 'Dec 2025',
    systemHealth: 98,
    preventedFailures: 15,
    monthlySavings: 142, // hours
    uptime: 99.3,
  },
  {
    month: 'Jan 2026',
    systemHealth: mockKPIs.systemHealth,
    preventedFailures: mockKPIs.preventedFailures,
    monthlySavings: mockKPIs.monthlySavings,
    uptime: mockKPIs.uptime,
  },
];

// Cost comparison data (Time & Money)
export const costComparison = {
  traditional: {
    annualCost: 15000, // Man-hours cost (mock)
    unplannedDowntime: 240, // hours searching
    failureRate: 24, // faults per year
    maintenanceCost: 12000,
    downtimeCost: 3000,
  },
  predictive: {
    annualCost: 1500, // Man-hours cost
    unplannedDowntime: 12, // hours searching
    failureRate: 24, // faults per year
    maintenanceCost: 1000,
    downtimeCost: 500,
    systemCost: 5000, // Device cost
  },
  savings: {
    annual: 13500,
    roi: 270, // %
    paybackPeriod: 4, // months
  },
};
