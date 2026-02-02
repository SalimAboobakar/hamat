import { CableStatus } from '@/types';
import { clsx } from 'clsx';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface StatusBadgeProps {
  status: CableStatus;
  size?: 'sm' | 'md' | 'lg';
}

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const { t } = useLanguage();

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-1.5',
  };

  const statusColors = {
    healthy: 'bg-status-healthy text-white',
    warning: 'bg-status-warning text-white',
    caution: 'bg-status-caution text-white',
    critical: 'bg-status-critical text-white animate-pulse-slow',
  };

  return (
    <span
      className={clsx(
        'inline-flex items-center font-medium rounded-full',
        sizeClasses[size],
        statusColors[status]
      )}
    >
      <span className={clsx('w-2 h-2 rounded-full bg-white mr-1.5', size === 'lg' && 'w-3 h-3')} />
      {t(status)}
    </span>
  );
}

