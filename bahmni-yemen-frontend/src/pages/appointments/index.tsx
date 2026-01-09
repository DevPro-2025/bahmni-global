import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Calendar, Plus, Clock, User, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

// Sample appointments data
const sampleAppointments = [
  {
    id: 'A001',
    patientName: 'أحمد محمد',
    patientNameEn: 'Ahmed Mohammed',
    patientId: 'P001',
    doctor: 'د. علي حسن',
    doctorEn: 'Dr. Ali Hassan',
    department: 'طب عام',
    departmentEn: 'General Medicine',
    date: '2024-01-09',
    time: '09:00',
    status: 'confirmed',
    reason: 'فحص روتيني',
    reasonEn: 'Routine checkup',
  },
  {
    id: 'A002',
    patientName: 'فاطمة علي',
    patientNameEn: 'Fatima Ali',
    patientId: 'P002',
    doctor: 'د. سارة أحمد',
    doctorEn: 'Dr. Sara Ahmed',
    department: 'نساء وولادة',
    departmentEn: 'Obstetrics & Gynecology',
    date: '2024-01-09',
    time: '10:30',
    status: 'scheduled',
    reason: 'متابعة حمل',
    reasonEn: 'Pregnancy follow-up',
  },
  {
    id: 'A003',
    patientName: 'محمد صالح',
    patientNameEn: 'Mohammed Saleh',
    patientId: 'P003',
    doctor: 'د. خالد محمد',
    doctorEn: 'Dr. Khalid Mohammed',
    department: 'جراحة عامة',
    departmentEn: 'General Surgery',
    date: '2024-01-09',
    time: '11:00',
    status: 'completed',
    reason: 'متابعة بعد العملية',
    reasonEn: 'Post-surgery follow-up',
  },
  {
    id: 'A004',
    patientName: 'سارة أحمد',
    patientNameEn: 'Sara Ahmed',
    patientId: 'P004',
    doctor: 'د. منى علي',
    doctorEn: 'Dr. Mona Ali',
    department: 'أمراض باطنية',
    departmentEn: 'Internal Medicine',
    date: '2024-01-09',
    time: '14:00',
    status: 'cancelled',
    reason: 'استشارة طبية',
    reasonEn: 'Medical consultation',
  },
  {
    id: 'A005',
    patientName: 'عبدالله العمري',
    patientNameEn: 'Abdullah Al-Omari',
    patientId: 'P005',
    doctor: 'د. علي حسن',
    doctorEn: 'Dr. Ali Hassan',
    department: 'طب عام',
    departmentEn: 'General Medicine',
    date: '2024-01-09',
    time: '15:30',
    status: 'scheduled',
    reason: 'فحص ضغط الدم',
    reasonEn: 'Blood pressure check',
  },
];

type AppointmentStatus = 'scheduled' | 'confirmed' | 'completed' | 'cancelled';

export default function AppointmentsPage() {
  const router = useRouter();
  const locale = router.locale || 'ar';
  const isRTL = locale === 'ar';
  const [selectedDate, setSelectedDate] = useState('2024-01-09');
  const [filterStatus, setFilterStatus] = useState<AppointmentStatus | 'all'>('all');

  const t = {
    title: isRTL ? 'المواعيد' : 'Appointments',
    newAppointment: isRTL ? 'موعد جديد' : 'New Appointment',
    todayAppointments: isRTL ? 'مواعيد اليوم' : "Today's Appointments",
    date: isRTL ? 'التاريخ' : 'Date',
    time: isRTL ? 'الوقت' : 'Time',
    patient: isRTL ? 'المريض' : 'Patient',
    doctor: isRTL ? 'الطبيب' : 'Doctor',
    department: isRTL ? 'القسم' : 'Department',
    status: isRTL ? 'الحالة' : 'Status',
    reason: isRTL ? 'سبب الزيارة' : 'Reason',
    actions: isRTL ? 'الإجراءات' : 'Actions',
    scheduled: isRTL ? 'مجدول' : 'Scheduled',
    confirmed: isRTL ? 'مؤكد' : 'Confirmed',
    completed: isRTL ? 'مكتمل' : 'Completed',
    cancelled: isRTL ? 'ملغي' : 'Cancelled',
    all: isRTL ? 'الكل' : 'All',
    noAppointments: isRTL ? 'لا توجد مواعيد' : 'No appointments',
    filterByStatus: isRTL ? 'تصفية حسب الحالة' : 'Filter by status',
    total: isRTL ? 'الإجمالي' : 'Total',
  };

  const getStatusBadge = (status: AppointmentStatus) => {
    const statusConfig = {
      scheduled: { variant: 'info' as const, label: t.scheduled, icon: <Clock size={12} /> },
      confirmed: { variant: 'success' as const, label: t.confirmed, icon: <CheckCircle size={12} /> },
      completed: { variant: 'default' as const, label: t.completed, icon: <CheckCircle size={12} /> },
      cancelled: { variant: 'error' as const, label: t.cancelled, icon: <XCircle size={12} /> },
    };
    const config = statusConfig[status];
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        {config.icon}
        {config.label}
      </Badge>
    );
  };

  const filteredAppointments = sampleAppointments.filter(
    (apt) => filterStatus === 'all' || apt.status === filterStatus
  );

  const statusCounts = {
    all: sampleAppointments.length,
    scheduled: sampleAppointments.filter((a) => a.status === 'scheduled').length,
    confirmed: sampleAppointments.filter((a) => a.status === 'confirmed').length,
    completed: sampleAppointments.filter((a) => a.status === 'completed').length,
    cancelled: sampleAppointments.filter((a) => a.status === 'cancelled').length,
  };

  return (
    <>
      <Head>
        <title>{isRTL ? 'المواعيد - النظام الصحي اليمني' : 'Appointments - Yemen Health System'}</title>
      </Head>

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Calendar size={24} className="text-green-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">{t.title}</h1>
              <p className="text-sm text-slate-500">{t.todayAppointments}</p>
            </div>
          </div>
          <Button>
            <Plus size={18} className="mr-2" />
            {t.newAppointment}
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { key: 'all', label: t.all, count: statusCounts.all, color: 'bg-slate-100 text-slate-800' },
            { key: 'scheduled', label: t.scheduled, count: statusCounts.scheduled, color: 'bg-blue-100 text-blue-800' },
            { key: 'confirmed', label: t.confirmed, count: statusCounts.confirmed, color: 'bg-green-100 text-green-800' },
            { key: 'completed', label: t.completed, count: statusCounts.completed, color: 'bg-slate-100 text-slate-800' },
            { key: 'cancelled', label: t.cancelled, count: statusCounts.cancelled, color: 'bg-red-100 text-red-800' },
          ].map((stat) => (
            <button
              key={stat.key}
              onClick={() => setFilterStatus(stat.key as AppointmentStatus | 'all')}
              className={`p-4 rounded-lg border-2 transition-all ${
                filterStatus === stat.key
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-transparent bg-white hover:border-slate-200'
              }`}
            >
              <p className="text-2xl font-bold text-slate-800">{stat.count}</p>
              <p className={`text-sm ${stat.color} px-2 py-1 rounded-full inline-block mt-1`}>
                {stat.label}
              </p>
            </button>
          ))}
        </div>

        {/* Date Selector */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-slate-700">{t.date}:</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </CardContent>
        </Card>

        {/* Appointments List */}
        <div className="space-y-4">
          {filteredAppointments.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <AlertCircle size={48} className="mx-auto text-slate-300 mb-4" />
                <p className="text-slate-500">{t.noAppointments}</p>
              </CardContent>
            </Card>
          ) : (
            filteredAppointments.map((appointment) => (
              <Card key={appointment.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    {/* Time */}
                    <div className="flex items-center gap-4">
                      <div className="text-center bg-primary-50 rounded-lg p-3 min-w-[80px]">
                        <p className="text-2xl font-bold text-primary-600">{appointment.time}</p>
                      </div>
                      
                      {/* Patient Info */}
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <User size={16} className="text-slate-400" />
                          <span className="font-semibold text-slate-800">
                            {isRTL ? appointment.patientName : appointment.patientNameEn}
                          </span>
                          <span className="text-sm text-slate-500">({appointment.patientId})</span>
                        </div>
                        <p className="text-sm text-slate-600">
                          {isRTL ? appointment.doctor : appointment.doctorEn} • {isRTL ? appointment.department : appointment.departmentEn}
                        </p>
                        <p className="text-sm text-slate-500 mt-1">
                          {isRTL ? appointment.reason : appointment.reasonEn}
                        </p>
                      </div>
                    </div>

                    {/* Status & Actions */}
                    <div className="flex items-center gap-4">
                      {getStatusBadge(appointment.status as AppointmentStatus)}
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          {isRTL ? 'عرض' : 'View'}
                        </Button>
                        {appointment.status === 'scheduled' && (
                          <Button variant="primary" size="sm">
                            {isRTL ? 'تأكيد' : 'Confirm'}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </>
  );
}
