import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Users,
  UserPlus,
  Calendar,
  Stethoscope,
  FlaskConical,
  Pill,
  Receipt,
  BarChart3,
  TrendingUp,
  Clock,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

// Dashboard stats - would come from API in real app
const stats = {
  totalPatients: 1250,
  todayAppointments: 45,
  pendingLabResults: 12,
  activePrescriptions: 89,
};

// Quick action items
const quickActions = [
  { href: '/registration', labelAr: 'تسجيل مريض جديد', labelEn: 'Register New Patient', icon: <UserPlus size={24} />, color: 'bg-blue-500' },
  { href: '/appointments', labelAr: 'حجز موعد', labelEn: 'Book Appointment', icon: <Calendar size={24} />, color: 'bg-green-500' },
  { href: '/patients', labelAr: 'البحث عن مريض', labelEn: 'Search Patient', icon: <Users size={24} />, color: 'bg-purple-500' },
  { href: '/laboratory', labelAr: 'طلب مختبر', labelEn: 'Lab Order', icon: <FlaskConical size={24} />, color: 'bg-orange-500' },
];

export default function HomePage() {
  const router = useRouter();
  const locale = router.locale || 'ar';
  const isRTL = locale === 'ar';

  const t = {
    title: isRTL ? 'لوحة التحكم' : 'Dashboard',
    welcome: isRTL ? 'مرحباً بك في النظام الصحي اليمني' : 'Welcome to Yemen Health System',
    quickActions: isRTL ? 'الإجراءات السريعة' : 'Quick Actions',
    statistics: isRTL ? 'الإحصائيات' : 'Statistics',
    totalPatients: isRTL ? 'إجمالي المرضى' : 'Total Patients',
    todayAppointments: isRTL ? 'مواعيد اليوم' : "Today's Appointments",
    pendingLabResults: isRTL ? 'نتائج مختبر معلقة' : 'Pending Lab Results',
    activePrescriptions: isRTL ? 'وصفات نشطة' : 'Active Prescriptions',
    recentActivity: isRTL ? 'النشاط الأخير' : 'Recent Activity',
    viewAll: isRTL ? 'عرض الكل' : 'View All',
  };

  return (
    <>
      <Head>
        <title>{isRTL ? 'لوحة التحكم - النظام الصحي اليمني' : 'Dashboard - Yemen Health System'}</title>
      </Head>

      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">{t.welcome}</h1>
          <p className="opacity-90">
            {isRTL
              ? 'نظام إدارة معلومات المستشفيات الحديث'
              : 'Modern Hospital Information Management System'}
          </p>
        </div>

        {/* Quick Actions */}
        <section>
          <h2 className="text-lg font-semibold text-slate-800 mb-4">{t.quickActions}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-100"
              >
                <div className={`${action.color} p-3 rounded-full text-white mb-3`}>
                  {action.icon}
                </div>
                <span className="text-sm font-medium text-slate-700 text-center">
                  {isRTL ? action.labelAr : action.labelEn}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Statistics */}
        <section>
          <h2 className="text-lg font-semibold text-slate-800 mb-4">{t.statistics}</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">{t.totalPatients}</p>
                    <p className="text-2xl font-bold text-slate-800">{stats.totalPatients.toLocaleString()}</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Users size={24} className="text-blue-600" />
                  </div>
                </div>
                <div className="mt-2 flex items-center text-sm text-green-600">
                  <TrendingUp size={16} className="mr-1" />
                  <span>+12%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">{t.todayAppointments}</p>
                    <p className="text-2xl font-bold text-slate-800">{stats.todayAppointments}</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-full">
                    <Calendar size={24} className="text-green-600" />
                  </div>
                </div>
                <div className="mt-2 flex items-center text-sm text-slate-500">
                  <Clock size={16} className="mr-1" />
                  <span>{isRTL ? '8 قادمة' : '8 upcoming'}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">{t.pendingLabResults}</p>
                    <p className="text-2xl font-bold text-slate-800">{stats.pendingLabResults}</p>
                  </div>
                  <div className="p-3 bg-orange-100 rounded-full">
                    <FlaskConical size={24} className="text-orange-600" />
                  </div>
                </div>
                <div className="mt-2 flex items-center text-sm text-orange-600">
                  <span>{isRTL ? 'بحاجة للمراجعة' : 'Needs review'}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">{t.activePrescriptions}</p>
                    <p className="text-2xl font-bold text-slate-800">{stats.activePrescriptions}</p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-full">
                    <Pill size={24} className="text-purple-600" />
                  </div>
                </div>
                <div className="mt-2 flex items-center text-sm text-slate-500">
                  <span>{isRTL ? 'هذا الأسبوع' : 'This week'}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Recent Activity */}
        <section>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{t.recentActivity}</CardTitle>
              <Link href="/reports" className="text-sm text-primary-500 hover:underline">
                {t.viewAll}
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { time: '10:30', action: isRTL ? 'تسجيل مريض جديد - أحمد محمد' : 'New patient registered - Ahmed Mohammed' },
                  { time: '10:15', action: isRTL ? 'موعد مكتمل - فاطمة علي' : 'Appointment completed - Fatima Ali' },
                  { time: '10:00', action: isRTL ? 'نتائج مختبر جاهزة - محمد صالح' : 'Lab results ready - Mohammed Saleh' },
                  { time: '09:45', action: isRTL ? 'وصفة طبية صرفت - سارة أحمد' : 'Prescription dispensed - Sara Ahmed' },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-50">
                    <span className="text-sm text-slate-500 font-mono">{activity.time}</span>
                    <span className="text-sm text-slate-700">{activity.action}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </>
  );
}
