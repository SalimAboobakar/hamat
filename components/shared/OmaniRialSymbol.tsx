'use client';

import React from 'react';

interface OmaniRialSymbolProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

export const OmaniRialSymbol: React.FC<OmaniRialSymbolProps> = ({ 
  className = '', 
  size = 'md' 
}) => {
  const sizeClasses = {
    xs: 'w-4 h-4',
    sm: 'w-5 h-5',
    md: 'w-7 h-7',
    lg: 'w-8 h-8',
  };

  return (
    <svg 
      className={`inline-block ${sizeClasses[size]} ${className}`}
      viewBox="0 0 798.31 440.47" 
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
    >
      <path d="M81.06,299.73l45.71-82.79,156.27-.37c-1.56-58.06,20.14-128.93,58.17-173.5,46.34-54.3,115.4-27.63,161.54,11.98,5.82,4.99,22.82,20.21,22.58,26.93l-30.86,117.94c-36.47-40.56-83.3-85.47-143.16-75.47-11.27,1.88-26.48,12.6-32.28,22.36-14.43,24.25,15.49,53.68,31.72,69.75h437.78l-46.1,83.16h-309.95c13.29,11.36,32.13,21.87,48.28,28.94,8.46,3.7,40.8,16.2,47.95,16.2h188.69l-46.1,83.16H9.77l46.33-83.16h291.08l-33.27-45.15H81.06Z"/>
    </svg>
  );
};

// Helper component for displaying currency with the symbol
interface CurrencyDisplayProps {
  amount: number;
  language?: 'en' | 'ar';
  className?: string;
  symbolSize?: 'xs' | 'sm' | 'md' | 'lg';
}

export const CurrencyDisplay: React.FC<CurrencyDisplayProps> = ({
  amount,
  language = 'en',
  className = '',
  symbolSize = 'sm'
}) => {
  const formatted = new Intl.NumberFormat(language === 'ar' ? 'ar-OM' : 'en-OM', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);

  let displayAmount = formatted;
  if (amount >= 1000000) {
    displayAmount = `${(amount / 1000000).toFixed(1)}M`;
  } else if (amount >= 1000) {
    displayAmount = `${(amount / 1000).toFixed(0)}K`;
  }

  return (
    <span className={`inline-flex items-center gap-1 ${className}`}>
      <OmaniRialSymbol size={symbolSize} />
      <span>{displayAmount}</span>
    </span>
  );
};

