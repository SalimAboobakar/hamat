import { format, formatDistanceToNow } from 'date-fns';
import { ar, enUS } from 'date-fns/locale';

// Format currency in Omani Rials
export function formatCurrency(amount: number, language: 'en' | 'ar' = 'en'): string {
  const formatted = new Intl.NumberFormat(language === 'ar' ? 'ar-OM' : 'en-OM', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);

  if (language === 'ar') {
    return `${formatted} ريال عماني`;
  }
  
  if (amount >= 1000000) {
    return `${(amount / 1000000).toFixed(1)}M OMR`;
  } else if (amount >= 1000) {
    return `${(amount / 1000).toFixed(0)}K OMR`;
  }
  return `${formatted} OMR`;
}

// Format number with thousands separator
export function formatNumber(num: number, language: 'en' | 'ar' = 'en'): string {
  return new Intl.NumberFormat(language === 'ar' ? 'ar-OM' : 'en-OM').format(num);
}

// Format percentage
export function formatPercentage(value: number, decimals: number = 0): string {
  return `${value.toFixed(decimals)}%`;
}

// Format date
export function formatDate(date: Date, language: 'en' | 'ar' = 'en', formatString: string = 'PPP'): string {
  return format(date, formatString, { locale: language === 'ar' ? ar : enUS });
}

// Format date relative to now
export function formatRelativeDate(date: Date, language: 'en' | 'ar' = 'en'): string {
  return formatDistanceToNow(date, { 
    addSuffix: true,
    locale: language === 'ar' ? ar : enUS,
  });
}

// Format date and time
export function formatDateTime(date: Date, language: 'en' | 'ar' = 'en'): string {
  return format(date, 'PPpp', { locale: language === 'ar' ? ar : enUS });
}

// Format sensor value with unit
export function formatSensorValue(value: number, unit: string, decimals: number = 1): string {
  return `${value.toFixed(decimals)}${unit}`;
}

// Get status color class
export function getStatusColor(status: string): string {
  switch (status) {
    case 'healthy':
      return 'text-status-healthy bg-green-100 border-green-300';
    case 'warning':
      return 'text-status-warning bg-yellow-100 border-yellow-300';
    case 'caution':
      return 'text-status-caution bg-orange-100 border-orange-300';
    case 'critical':
      return 'text-status-critical bg-red-100 border-red-300';
    default:
      return 'text-gray-600 bg-gray-100 border-gray-300';
  }
}

// Get status badge color
export function getStatusBadgeColor(status: string): string {
  switch (status) {
    case 'healthy':
      return 'bg-status-healthy text-white';
    case 'warning':
      return 'bg-status-warning text-white';
    case 'caution':
      return 'bg-status-caution text-white';
    case 'critical':
      return 'bg-status-critical text-white';
    default:
      return 'bg-gray-500 text-white';
  }
}

// Get priority color
export function getPriorityColor(priority: string): string {
  switch (priority) {
    case 'critical':
      return 'bg-red-100 text-red-800 border-red-300';
    case 'high':
      return 'bg-orange-100 text-orange-800 border-orange-300';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    case 'low':
      return 'bg-green-100 text-green-800 border-green-300';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-300';
  }
}

// Get work order status color
export function getWorkOrderStatusColor(status: string): string {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'in_progress':
      return 'bg-blue-100 text-blue-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'cancelled':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}


