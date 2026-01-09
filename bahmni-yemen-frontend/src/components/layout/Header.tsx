'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Menu, Bell, User, Globe, LogOut } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
  locale: string;
  onLocaleChange?: (locale: 'ar' | 'en') => void;
}

export function Header({ onMenuClick, locale, onLocaleChange }: HeaderProps) {
  const router = useRouter();
  const isRTL = locale === 'ar';

  const toggleLocale = () => {
    const newLocale = locale === 'ar' ? 'en' : 'ar';
    if (onLocaleChange) {
      onLocaleChange(newLocale);
    } else {
      router.push(router.pathname, router.asPath, { locale: newLocale });
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-30">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left side */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-slate-100 rounded-lg"
            aria-label="Toggle menu"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-xl font-semibold text-slate-800 hidden sm:block">
            {isRTL ? 'النظام الصحي اليمني' : 'Yemen Health System'}
          </h1>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Language Toggle */}
          <button
            onClick={toggleLocale}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            title={isRTL ? 'Switch to English' : 'التحويل للعربية'}
          >
            <Globe size={18} />
            <span>{locale === 'ar' ? 'EN' : 'عربي'}</span>
          </button>

          {/* Notifications */}
          <button
            className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
            aria-label="Notifications"
          >
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Menu */}
          <div className="flex items-center gap-2 px-3 py-2 hover:bg-slate-100 rounded-lg cursor-pointer">
            <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-slate-700">
                {isRTL ? 'المشرف' : 'Admin'}
              </p>
              <p className="text-xs text-slate-500">
                {isRTL ? 'مدير النظام' : 'System Admin'}
              </p>
            </div>
          </div>

          {/* Logout */}
          <button
            className="p-2 text-slate-600 hover:bg-red-50 hover:text-red-600 rounded-lg"
            aria-label="Logout"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
