'use client';

import Link from 'next/link';
import { Globe, Menu } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useState } from 'react';

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const { language, setLanguage, t, isRTL } = useLanguage();
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
    setIsLangMenuOpen(false);
  };

  return (
    <header className="bg-oq-navy text-white shadow-lg sticky top-0 z-40">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left side: Menu button and logo */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-lg hover:bg-oq-navy-light transition-colors lg:hidden"
            aria-label="Toggle menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-oq-gold rounded-lg flex items-center justify-center font-bold text-oq-navy">
              OQ
            </div>
            <div>
              <h1 className="text-lg font-bold leading-tight">
                {language === 'ar' ? 'مصافي النفط العمانية' : 'OQ RPI'}
              </h1>
              <p className="text-xs text-oq-blue">
                {language === 'ar' ? 'مراقبة صحة الكابلات' : 'Cable Health Monitoring'}
              </p>
            </div>
          </Link>
        </div>

        {/* Right side: Language toggle and user */}
        <div className="flex items-center gap-3">
          {/* Language Toggle */}
          <div className="relative">
            <button
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-oq-navy-light transition-colors"
            >
              <Globe className="w-5 h-5" />
              <span className="text-sm font-medium">{language === 'en' ? 'EN' : 'ع'}</span>
            </button>

            {isLangMenuOpen && (
              <div className="absolute top-full mt-2 right-0 bg-white text-gray-900 rounded-lg shadow-lg overflow-hidden min-w-[120px]">
                <button
                  onClick={toggleLanguage}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors"
                >
                  {language === 'en' ? 'العربية' : 'English'}
                </button>
              </div>
            )}
          </div>

          {/* User Avatar */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-oq-navy-light">
            <div className="w-8 h-8 rounded-full bg-oq-gold flex items-center justify-center text-oq-navy font-bold text-sm">
              {language === 'ar' ? 'م' : 'A'}
            </div>
            <span className="text-sm font-medium hidden sm:inline">
              {language === 'ar' ? 'المشرف' : 'Admin'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}


