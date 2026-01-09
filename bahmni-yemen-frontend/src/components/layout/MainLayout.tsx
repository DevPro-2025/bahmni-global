'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const locale = router.locale || 'ar';
  const isRTL = locale === 'ar';

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className={isRTL ? 'font-arabic' : 'font-english'}>
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        locale={locale}
      />
      
      <div className={`${isRTL ? 'lg:mr-64' : 'lg:ml-64'} min-h-screen bg-slate-50`}>
        <Header onMenuClick={() => setSidebarOpen(true)} locale={locale} />
        
        <main className="p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
