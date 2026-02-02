'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Cable, 
  TrendingUp, 
  Wrench, 
  FileText,
  Settings,
  X 
} from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { clsx } from 'clsx';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { t, isRTL } = useLanguage();

  const navigation = [
    { name: t('dashboard'), href: '/', icon: LayoutDashboard },
    { name: t('cables'), href: '/cables', icon: Cable },
    { name: t('analytics'), href: '/analytics', icon: TrendingUp },
    { name: t('maintenance'), href: '/maintenance', icon: Wrench },
    { name: t('reports'), href: '/reports', icon: FileText },
    { name: t('settings'), href: '/settings', icon: Settings },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          'fixed top-0 bottom-0 z-50 w-64 bg-white border-r border-gray-200 shadow-lg transition-transform duration-300 lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)]',
          isRTL ? 'right-0 lg:right-auto' : 'left-0 lg:left-auto',
          isOpen ? 'translate-x-0' : isRTL ? 'translate-x-full lg:translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Close button for mobile */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 lg:hidden">
          <h2 className="text-lg font-semibold text-oq-navy">{t('dashboard')}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => onClose()}
                className={clsx(
                  'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium',
                  isActive
                    ? 'bg-oq-navy text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                )}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50">
          <div className="text-xs text-gray-600">
            <p className="font-semibold">{t('systemHealth')}</p>
            <div className="mt-2 flex items-center gap-2">
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-status-healthy rounded-full" style={{ width: '96%' }} />
              </div>
              <span className="font-medium text-status-healthy">96%</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

