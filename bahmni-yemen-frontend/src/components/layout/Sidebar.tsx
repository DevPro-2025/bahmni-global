'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Home,
  Users,
  UserPlus,
  Stethoscope,
  Calendar,
  FlaskConical,
  Pill,
  Receipt,
  BarChart3,
  Settings,
  Menu,
  X,
  BedDouble,
  ArrowRightLeft,
  Scissors,
  FileText,
  Shield,
  Layers,
} from 'lucide-react';

interface NavItem {
  href: string;
  labelAr: string;
  labelEn: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { href: '/', labelAr: 'الرئيسية', labelEn: 'Home', icon: <Home size={20} /> },
  { href: '/patients', labelAr: 'المرضى', labelEn: 'Patients', icon: <Users size={20} /> },
  { href: '/registration', labelAr: 'التسجيل', labelEn: 'Registration', icon: <UserPlus size={20} /> },
  { href: '/clinical', labelAr: 'السجل السريري', labelEn: 'Clinical', icon: <Stethoscope size={20} /> },
  { href: '/appointments', labelAr: 'المواعيد', labelEn: 'Appointments', icon: <Calendar size={20} /> },
  { href: '/adt', labelAr: 'الدخول/الخروج', labelEn: 'ADT', icon: <ArrowRightLeft size={20} /> },
  { href: '/bedmanagement', labelAr: 'إدارة الأسرة', labelEn: 'Bed Management', icon: <BedDouble size={20} /> },
  { href: '/ot', labelAr: 'غرفة العمليات', labelEn: 'OT', icon: <Scissors size={20} /> },
  { href: '/laboratory', labelAr: 'المختبر', labelEn: 'Laboratory', icon: <FlaskConical size={20} /> },
  { href: '/pharmacy', labelAr: 'الصيدلية', labelEn: 'Pharmacy', icon: <Pill size={20} /> },
  { href: '/billing', labelAr: 'الفوترة', labelEn: 'Billing', icon: <Receipt size={20} /> },
  { href: '/documents', labelAr: 'المستندات', labelEn: 'Documents', icon: <FileText size={20} /> },
  { href: '/reports', labelAr: 'التقارير', labelEn: 'Reports', icon: <BarChart3 size={20} /> },
  { href: '/programs', labelAr: 'البرامج', labelEn: 'Programs', icon: <Layers size={20} /> },
  { href: '/admin', labelAr: 'الإدارة', labelEn: 'Admin', icon: <Shield size={20} /> },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  locale: string;
}

export function Sidebar({ isOpen, onClose, locale }: SidebarProps) {
  const router = useRouter();
  const isRTL = locale === 'ar';

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 ${isRTL ? 'right-0' : 'left-0'} h-full w-64 bg-white shadow-lg z-50
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0
          ${isOpen ? 'translate-x-0' : isRTL ? 'translate-x-full' : '-translate-x-full'}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">YH</span>
            </div>
            <span className="font-bold text-lg text-primary-600">
              {isRTL ? 'اليمن الصحي' : 'Yemen Health'}
            </span>
          </div>
          <button onClick={onClose} className="lg:hidden p-1 hover:bg-slate-100 rounded">
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActive = router.pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                      ${isActive
                        ? 'bg-primary-500 text-white'
                        : 'text-slate-600 hover:bg-slate-100'
                      }
                    `}
                  >
                    {item.icon}
                    <span>{isRTL ? item.labelAr : item.labelEn}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200">
          <Link
            href="/settings"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <Settings size={20} />
            <span>{isRTL ? 'الإعدادات' : 'Settings'}</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
