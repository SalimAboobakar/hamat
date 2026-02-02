'use client';

import { ReactNode, useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { ToastContainer } from '@/components/shared/AlertToast';
import { useDataSimulator } from '@/lib/hooks/useDataSimulator';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [toasts, setToasts] = useState<Array<{ id: string; type: 'info' | 'success' | 'warning' | 'error'; message: string }>>([]);

  // Start data simulation
  useDataSimulator();

  const handleCloseToast = (id: string) => {
    setToasts(toasts.filter(toast => toast.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <div className="flex">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        
        <main className="flex-1 p-4 lg:p-8">
          {children}
        </main>
      </div>

      <ToastContainer toasts={toasts} onClose={handleCloseToast} />
    </div>
  );
}

