'use client';

import React, { useState } from 'react';
import { MainLayout } from '@/components/layout';
import { Card, Button, Badge } from '@/components/ui';
import {
  Scissors,
  Clock,
  User,
  Calendar,
  PlayCircle,
  PauseCircle,
  CheckCircle,
  XCircle,
  AlertCircle,
  Plus,
  Search,
  Filter,
} from 'lucide-react';

// OT (Operating Theatre) Module - Matches Bahmni OT module
// Surgical scheduling, OT calendar, surgery status tracking

type SurgeryStatus = 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'POSTPONED';

interface Surgery {
  id: string;
  patient: {
    id: string;
    identifier: string;
    name: string;
    nameAr: string;
    gender: 'M' | 'F';
    age: number;
  };
  procedure: string;
  procedureAr: string;
  surgeryType: 'ELECTIVE' | 'EMERGENCY';
  ot: string;
  scheduledDate: string;
  scheduledTime: string;
  estimatedDuration: number; // in minutes
  actualStartTime?: string;
  actualEndTime?: string;
  surgeon: string;
  surgeonAr: string;
  anesthetist: string;
  anesthetistAr: string;
  status: SurgeryStatus;
  notes?: string;
}

interface OperatingTheatre {
  id: string;
  name: string;
  nameAr: string;
  type: 'GENERAL' | 'CARDIAC' | 'NEURO' | 'ORTHOPEDIC' | 'OBSTETRIC';
  status: 'AVAILABLE' | 'IN_USE' | 'CLEANING' | 'MAINTENANCE';
  currentSurgery?: Surgery;
}

const mockOTs: OperatingTheatre[] = [
  { id: 'ot1', name: 'OT-1 (General)', nameAr: 'غرفة عمليات 1 (عامة)', type: 'GENERAL', status: 'IN_USE' },
  { id: 'ot2', name: 'OT-2 (Cardiac)', nameAr: 'غرفة عمليات 2 (قلب)', type: 'CARDIAC', status: 'AVAILABLE' },
  { id: 'ot3', name: 'OT-3 (Neuro)', nameAr: 'غرفة عمليات 3 (أعصاب)', type: 'NEURO', status: 'CLEANING' },
  { id: 'ot4', name: 'OT-4 (Orthopedic)', nameAr: 'غرفة عمليات 4 (عظام)', type: 'ORTHOPEDIC', status: 'IN_USE' },
  { id: 'ot5', name: 'OT-5 (Obstetric)', nameAr: 'غرفة عمليات 5 (ولادة)', type: 'OBSTETRIC', status: 'AVAILABLE' },
];

const mockSurgeries: Surgery[] = [
  {
    id: 's1',
    patient: {
      id: '1', identifier: 'YEM-001', name: 'Ahmed Mohammed', nameAr: 'أحمد محمد', gender: 'M', age: 45
    },
    procedure: 'Appendectomy',
    procedureAr: 'استئصال الزائدة الدودية',
    surgeryType: 'EMERGENCY',
    ot: 'OT-1',
    scheduledDate: '2024-01-10',
    scheduledTime: '08:00',
    estimatedDuration: 90,
    actualStartTime: '08:15',
    surgeon: 'Dr. Ali Hassan',
    surgeonAr: 'د. علي حسن',
    anesthetist: 'Dr. Omar Saleh',
    anesthetistAr: 'د. عمر صالح',
    status: 'IN_PROGRESS',
  },
  {
    id: 's2',
    patient: {
      id: '2', identifier: 'YEM-002', name: 'Fatima Ali', nameAr: 'فاطمة علي', gender: 'F', age: 32
    },
    procedure: 'Cesarean Section',
    procedureAr: 'عملية قيصرية',
    surgeryType: 'ELECTIVE',
    ot: 'OT-5',
    scheduledDate: '2024-01-10',
    scheduledTime: '10:00',
    estimatedDuration: 60,
    surgeon: 'Dr. Salma Mohammed',
    surgeonAr: 'د. سلمى محمد',
    anesthetist: 'Dr. Khalid Ahmed',
    anesthetistAr: 'د. خالد أحمد',
    status: 'SCHEDULED',
  },
  {
    id: 's3',
    patient: {
      id: '3', identifier: 'YEM-003', name: 'Mohammed Saleh', nameAr: 'محمد صالح', gender: 'M', age: 58
    },
    procedure: 'Hip Replacement',
    procedureAr: 'استبدال مفصل الورك',
    surgeryType: 'ELECTIVE',
    ot: 'OT-4',
    scheduledDate: '2024-01-10',
    scheduledTime: '09:00',
    estimatedDuration: 180,
    actualStartTime: '09:10',
    surgeon: 'Dr. Ibrahim Nasser',
    surgeonAr: 'د. إبراهيم ناصر',
    anesthetist: 'Dr. Yasmin Hassan',
    anesthetistAr: 'د. ياسمين حسن',
    status: 'IN_PROGRESS',
  },
  {
    id: 's4',
    patient: {
      id: '4', identifier: 'YEM-004', name: 'Sara Abdullah', nameAr: 'سارة عبدالله', gender: 'F', age: 28
    },
    procedure: 'Laparoscopic Cholecystectomy',
    procedureAr: 'استئصال المرارة بالمنظار',
    surgeryType: 'ELECTIVE',
    ot: 'OT-1',
    scheduledDate: '2024-01-10',
    scheduledTime: '14:00',
    estimatedDuration: 75,
    surgeon: 'Dr. Ali Hassan',
    surgeonAr: 'د. علي حسن',
    anesthetist: 'Dr. Omar Saleh',
    anesthetistAr: 'د. عمر صالح',
    status: 'SCHEDULED',
  },
  {
    id: 's5',
    patient: {
      id: '5', identifier: 'YEM-005', name: 'Khalid Omar', nameAr: 'خالد عمر', gender: 'M', age: 65
    },
    procedure: 'Coronary Artery Bypass',
    procedureAr: 'تحويل مسار الشريان التاجي',
    surgeryType: 'ELECTIVE',
    ot: 'OT-2',
    scheduledDate: '2024-01-11',
    scheduledTime: '07:00',
    estimatedDuration: 300,
    surgeon: 'Dr. Hassan Mohammed',
    surgeonAr: 'د. حسن محمد',
    anesthetist: 'Dr. Nadia Ali',
    anesthetistAr: 'د. نادية علي',
    status: 'SCHEDULED',
  },
];

export default function OTPage() {
  const [locale, setLocale] = useState<'ar' | 'en'>('ar');
  const [selectedDate, setSelectedDate] = useState('2024-01-10');
  const [selectedStatus, setSelectedStatus] = useState<SurgeryStatus | 'ALL'>('ALL');
  const [selectedSurgery, setSelectedSurgery] = useState<Surgery | null>(null);

  const isRTL = locale === 'ar';

  const t = {
    title: isRTL ? 'جدول غرفة العمليات' : 'Operating Theatre Schedule',
    subtitle: isRTL ? 'إدارة العمليات الجراحية والجدولة' : 'Manage surgeries and scheduling',
    otStatus: isRTL ? 'حالة غرف العمليات' : 'OT Status',
    todaySchedule: isRTL ? 'جدول اليوم' : 'Today\'s Schedule',
    newSurgery: isRTL ? 'جدولة عملية جديدة' : 'Schedule New Surgery',
    searchPlaceholder: isRTL ? 'البحث...' : 'Search...',
    available: isRTL ? 'متاح' : 'Available',
    inUse: isRTL ? 'قيد الاستخدام' : 'In Use',
    cleaning: isRTL ? 'تنظيف' : 'Cleaning',
    maintenance: isRTL ? 'صيانة' : 'Maintenance',
    scheduled: isRTL ? 'مجدول' : 'Scheduled',
    inProgress: isRTL ? 'قيد التنفيذ' : 'In Progress',
    completed: isRTL ? 'مكتمل' : 'Completed',
    cancelled: isRTL ? 'ملغي' : 'Cancelled',
    postponed: isRTL ? 'مؤجل' : 'Postponed',
    elective: isRTL ? 'اختياري' : 'Elective',
    emergency: isRTL ? 'طوارئ' : 'Emergency',
    patient: isRTL ? 'المريض' : 'Patient',
    procedure: isRTL ? 'الإجراء' : 'Procedure',
    ot: isRTL ? 'غرفة العمليات' : 'OT',
    time: isRTL ? 'الوقت' : 'Time',
    duration: isRTL ? 'المدة' : 'Duration',
    surgeon: isRTL ? 'الجراح' : 'Surgeon',
    anesthetist: isRTL ? 'طبيب التخدير' : 'Anesthetist',
    status: isRTL ? 'الحالة' : 'Status',
    actions: isRTL ? 'الإجراءات' : 'Actions',
    start: isRTL ? 'بدء' : 'Start',
    complete: isRTL ? 'إكمال' : 'Complete',
    cancel: isRTL ? 'إلغاء' : 'Cancel',
    postpone: isRTL ? 'تأجيل' : 'Postpone',
    view: isRTL ? 'عرض' : 'View',
    minutes: isRTL ? 'دقيقة' : 'min',
    all: isRTL ? 'الكل' : 'All',
    surgeryDetails: isRTL ? 'تفاصيل العملية' : 'Surgery Details',
    patientId: isRTL ? 'رقم المريض' : 'Patient ID',
    scheduledTime: isRTL ? 'الوقت المجدول' : 'Scheduled Time',
    actualStart: isRTL ? 'وقت البدء الفعلي' : 'Actual Start',
    estimatedDuration: isRTL ? 'المدة المقدرة' : 'Estimated Duration',
    notes: isRTL ? 'ملاحظات' : 'Notes',
    general: isRTL ? 'عامة' : 'General',
    cardiac: isRTL ? 'قلب' : 'Cardiac',
    neuro: isRTL ? 'أعصاب' : 'Neuro',
    orthopedic: isRTL ? 'عظام' : 'Orthopedic',
    obstetric: isRTL ? 'ولادة' : 'Obstetric',
  };

  const getStatusBadge = (status: SurgeryStatus) => {
    switch (status) {
      case 'SCHEDULED': return <Badge variant="info">{t.scheduled}</Badge>;
      case 'IN_PROGRESS': return <Badge variant="warning">{t.inProgress}</Badge>;
      case 'COMPLETED': return <Badge variant="success">{t.completed}</Badge>;
      case 'CANCELLED': return <Badge variant="danger">{t.cancelled}</Badge>;
      case 'POSTPONED': return <Badge variant="secondary">{t.postponed}</Badge>;
    }
  };

  const getOTStatusBadge = (status: OperatingTheatre['status']) => {
    switch (status) {
      case 'AVAILABLE': return <Badge variant="success">{t.available}</Badge>;
      case 'IN_USE': return <Badge variant="danger">{t.inUse}</Badge>;
      case 'CLEANING': return <Badge variant="warning">{t.cleaning}</Badge>;
      case 'MAINTENANCE': return <Badge variant="secondary">{t.maintenance}</Badge>;
    }
  };

  const filteredSurgeries = mockSurgeries.filter((surgery) => {
    const matchesDate = surgery.scheduledDate === selectedDate;
    const matchesStatus = selectedStatus === 'ALL' || surgery.status === selectedStatus;
    return matchesDate && matchesStatus;
  });

  return (
    <MainLayout
      title={t.title}
      locale={locale}
      onLocaleChange={setLocale}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
              <Scissors className="text-primary-500" />
              {t.title}
            </h1>
            <p className="text-slate-500 mt-1">{t.subtitle}</p>
          </div>
          <Button>
            <Plus size={18} className={isRTL ? 'ml-2' : 'mr-2'} />
            {t.newSurgery}
          </Button>
        </div>

        {/* OT Status Cards */}
        <Card>
          <div className="p-4 border-b border-slate-200">
            <h2 className="font-semibold text-slate-800">{t.otStatus}</h2>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {mockOTs.map((ot) => (
                <div
                  key={ot.id}
                  className={`
                    p-4 rounded-lg border-2 transition-colors
                    ${ot.status === 'AVAILABLE' ? 'border-green-200 bg-green-50' :
                      ot.status === 'IN_USE' ? 'border-red-200 bg-red-50' :
                      ot.status === 'CLEANING' ? 'border-yellow-200 bg-yellow-50' :
                      'border-slate-200 bg-slate-50'}
                  `}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Scissors size={20} className="text-slate-500" />
                    {getOTStatusBadge(ot.status)}
                  </div>
                  <h3 className="font-medium text-slate-800">
                    {isRTL ? ot.nameAr : ot.name}
                  </h3>
                  <p className="text-sm text-slate-500">
                    {isRTL ? 
                      (ot.type === 'GENERAL' ? t.general :
                       ot.type === 'CARDIAC' ? t.cardiac :
                       ot.type === 'NEURO' ? t.neuro :
                       ot.type === 'ORTHOPEDIC' ? t.orthopedic : t.obstetric)
                      : ot.type}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Filters */}
        <Card className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex items-center gap-2">
              <Calendar size={20} className="text-slate-400" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter size={20} className="text-slate-400" />
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as SurgeryStatus | 'ALL')}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              >
                <option value="ALL">{t.all}</option>
                <option value="SCHEDULED">{t.scheduled}</option>
                <option value="IN_PROGRESS">{t.inProgress}</option>
                <option value="COMPLETED">{t.completed}</option>
                <option value="CANCELLED">{t.cancelled}</option>
                <option value="POSTPONED">{t.postponed}</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Surgery Schedule Table */}
        <Card>
          <div className="p-4 border-b border-slate-200">
            <h2 className="font-semibold text-slate-800">{t.todaySchedule}</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-start text-sm font-medium text-slate-600">{t.time}</th>
                  <th className="px-4 py-3 text-start text-sm font-medium text-slate-600">{t.patient}</th>
                  <th className="px-4 py-3 text-start text-sm font-medium text-slate-600">{t.procedure}</th>
                  <th className="px-4 py-3 text-start text-sm font-medium text-slate-600">{t.ot}</th>
                  <th className="px-4 py-3 text-start text-sm font-medium text-slate-600">{t.surgeon}</th>
                  <th className="px-4 py-3 text-start text-sm font-medium text-slate-600">{t.duration}</th>
                  <th className="px-4 py-3 text-start text-sm font-medium text-slate-600">{t.status}</th>
                  <th className="px-4 py-3 text-start text-sm font-medium text-slate-600">{t.actions}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredSurgeries.map((surgery) => (
                  <tr key={surgery.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <Clock size={14} className="text-slate-400" />
                        <span className="text-sm font-medium">{surgery.scheduledTime}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
                          <User size={14} className="text-slate-500" />
                        </div>
                        <div>
                          <div className="text-sm font-medium">
                            {isRTL ? surgery.patient.nameAr : surgery.patient.name}
                          </div>
                          <div className="text-xs text-slate-500">{surgery.patient.identifier}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm font-medium">
                        {isRTL ? surgery.procedureAr : surgery.procedure}
                      </div>
                      <Badge variant={surgery.surgeryType === 'EMERGENCY' ? 'danger' : 'secondary'} className="mt-1">
                        {surgery.surgeryType === 'EMERGENCY' ? t.emergency : t.elective}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-sm">{surgery.ot}</td>
                    <td className="px-4 py-3 text-sm">
                      {isRTL ? surgery.surgeonAr : surgery.surgeon}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {surgery.estimatedDuration} {t.minutes}
                    </td>
                    <td className="px-4 py-3">{getStatusBadge(surgery.status)}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        {surgery.status === 'SCHEDULED' && (
                          <>
                            <Button variant="outline" size="sm">
                              <PlayCircle size={14} className={isRTL ? 'ml-1' : 'mr-1'} />
                              {t.start}
                            </Button>
                            <Button variant="outline" size="sm">
                              {t.postpone}
                            </Button>
                          </>
                        )}
                        {surgery.status === 'IN_PROGRESS' && (
                          <Button variant="primary" size="sm">
                            <CheckCircle size={14} className={isRTL ? 'ml-1' : 'mr-1'} />
                            {t.complete}
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedSurgery(surgery)}
                        >
                          {t.view}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredSurgeries.length === 0 && (
              <div className="text-center py-12">
                <AlertCircle size={48} className="mx-auto text-slate-300 mb-4" />
                <p className="text-slate-500">
                  {isRTL ? 'لا توجد عمليات مجدولة' : 'No surgeries scheduled'}
                </p>
              </div>
            )}
          </div>
        </Card>

        {/* Surgery Details Modal */}
        {selectedSurgery && (
          <Card>
            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
              <h2 className="font-semibold text-slate-800">{t.surgeryDetails}</h2>
              <button
                onClick={() => setSelectedSurgery(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <XCircle size={20} />
              </button>
            </div>
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-slate-500">{t.patient}</label>
                  <p className="font-medium">
                    {isRTL ? selectedSurgery.patient.nameAr : selectedSurgery.patient.name}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-slate-500">{t.patientId}</label>
                  <p className="font-medium text-primary-600">{selectedSurgery.patient.identifier}</p>
                </div>
                <div>
                  <label className="text-sm text-slate-500">{t.procedure}</label>
                  <p className="font-medium">
                    {isRTL ? selectedSurgery.procedureAr : selectedSurgery.procedure}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-slate-500">{t.ot}</label>
                  <p className="font-medium">{selectedSurgery.ot}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-slate-500">{t.surgeon}</label>
                  <p className="font-medium">
                    {isRTL ? selectedSurgery.surgeonAr : selectedSurgery.surgeon}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-slate-500">{t.anesthetist}</label>
                  <p className="font-medium">
                    {isRTL ? selectedSurgery.anesthetistAr : selectedSurgery.anesthetist}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-slate-500">{t.scheduledTime}</label>
                  <p className="font-medium">{selectedSurgery.scheduledTime}</p>
                </div>
                {selectedSurgery.actualStartTime && (
                  <div>
                    <label className="text-sm text-slate-500">{t.actualStart}</label>
                    <p className="font-medium">{selectedSurgery.actualStartTime}</p>
                  </div>
                )}
                <div>
                  <label className="text-sm text-slate-500">{t.estimatedDuration}</label>
                  <p className="font-medium">{selectedSurgery.estimatedDuration} {t.minutes}</p>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </MainLayout>
  );
}
