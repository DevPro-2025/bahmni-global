'use client';

import React, { useState } from 'react';
import { MainLayout } from '@/components/layout';
import { Card, Button, Badge, Input } from '@/components/ui';
import {
  Video,
  Phone,
  PhoneOff,
  Mic,
  MicOff,
  Camera,
  CameraOff,
  Monitor,
  MessageSquare,
  Users,
  Calendar,
  Clock,
  User,
  Search,
  Plus,
  CheckCircle,
  XCircle,
  Settings,
  Maximize,
  Share,
  FileText,
} from 'lucide-react';

// Teleconsultation Module
// Matches the workflow of openmrs-module-teleconsultation

interface Consultation {
  id: string;
  patientId: string;
  patientName: string;
  scheduledTime: string;
  duration: number;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled' | 'missed';
  type: 'video' | 'audio';
  provider: string;
  specialty: string;
  notes?: string;
}

export default function TeleconsultationPage() {
  const [locale, setLocale] = useState<'ar' | 'en'>('ar');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null);
  const [isInCall, setIsInCall] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  
  const translations = {
    ar: {
      title: 'الاستشارات عن بُعد',
      pageTitle: 'الطب عن بُعد',
      searchPlaceholder: 'البحث عن مريض أو استشارة...',
      upcomingConsultations: 'الاستشارات القادمة',
      todayConsultations: 'استشارات اليوم',
      completedConsultations: 'استشارات مكتملة',
      newConsultation: 'استشارة جديدة',
      patientId: 'رقم المريض',
      patientName: 'اسم المريض',
      scheduledTime: 'الوقت المحدد',
      duration: 'المدة',
      status: 'الحالة',
      type: 'النوع',
      provider: 'مقدم الخدمة',
      specialty: 'التخصص',
      startCall: 'بدء المكالمة',
      endCall: 'إنهاء المكالمة',
      joinCall: 'الانضمام للمكالمة',
      scheduled: 'مجدولة',
      inProgress: 'جارية',
      completed: 'مكتملة',
      cancelled: 'ملغاة',
      missed: 'فائتة',
      video: 'فيديو',
      audio: 'صوت',
      minutes: 'دقيقة',
      allStatus: 'جميع الحالات',
      waiting: 'في الانتظار',
      connecting: 'جاري الاتصال...',
      connected: 'متصل',
      mute: 'كتم الصوت',
      unmute: 'إلغاء الكتم',
      cameraOn: 'تشغيل الكاميرا',
      cameraOff: 'إيقاف الكاميرا',
      shareScreen: 'مشاركة الشاشة',
      fullscreen: 'ملء الشاشة',
      chat: 'المحادثة',
      participants: 'المشاركون',
      settings: 'الإعدادات',
      consultationDetails: 'تفاصيل الاستشارة',
      notes: 'الملاحظات',
      addNotes: 'إضافة ملاحظات',
      saveSummary: 'حفظ الملخص',
      todaySchedule: 'جدول اليوم',
      noConsultationSelected: 'اختر استشارة لعرض التفاصيل',
      totalToday: 'إجمالي اليوم',
      completedToday: 'مكتملة',
      pendingToday: 'قادمة',
      averageDuration: 'متوسط المدة',
      quickStats: 'إحصائيات سريعة',
      waitingRoom: 'غرفة الانتظار',
      patientsWaiting: 'مرضى في الانتظار',
    },
    en: {
      title: 'Teleconsultation',
      pageTitle: 'Telemedicine',
      searchPlaceholder: 'Search patient or consultation...',
      upcomingConsultations: 'Upcoming Consultations',
      todayConsultations: "Today's Consultations",
      completedConsultations: 'Completed Consultations',
      newConsultation: 'New Consultation',
      patientId: 'Patient ID',
      patientName: 'Patient Name',
      scheduledTime: 'Scheduled Time',
      duration: 'Duration',
      status: 'Status',
      type: 'Type',
      provider: 'Provider',
      specialty: 'Specialty',
      startCall: 'Start Call',
      endCall: 'End Call',
      joinCall: 'Join Call',
      scheduled: 'Scheduled',
      inProgress: 'In Progress',
      completed: 'Completed',
      cancelled: 'Cancelled',
      missed: 'Missed',
      video: 'Video',
      audio: 'Audio',
      minutes: 'minutes',
      allStatus: 'All Status',
      waiting: 'Waiting',
      connecting: 'Connecting...',
      connected: 'Connected',
      mute: 'Mute',
      unmute: 'Unmute',
      cameraOn: 'Camera On',
      cameraOff: 'Camera Off',
      shareScreen: 'Share Screen',
      fullscreen: 'Fullscreen',
      chat: 'Chat',
      participants: 'Participants',
      settings: 'Settings',
      consultationDetails: 'Consultation Details',
      notes: 'Notes',
      addNotes: 'Add Notes',
      saveSummary: 'Save Summary',
      todaySchedule: "Today's Schedule",
      noConsultationSelected: 'Select a consultation to view details',
      totalToday: 'Total Today',
      completedToday: 'Completed',
      pendingToday: 'Pending',
      averageDuration: 'Avg Duration',
      quickStats: 'Quick Stats',
      waitingRoom: 'Waiting Room',
      patientsWaiting: 'patients waiting',
    },
  };

  const t = translations[locale];
  const isRTL = locale === 'ar';

  const consultations: Consultation[] = [
    {
      id: 'TC-001',
      patientId: 'YEM-001',
      patientName: isRTL ? 'أحمد عبدالله محمد' : 'Ahmed Abdullah Mohammed',
      scheduledTime: '09:00',
      duration: 30,
      status: 'scheduled',
      type: 'video',
      provider: isRTL ? 'د. محمد علي' : 'Dr. Mohammed Ali',
      specialty: isRTL ? 'طب عام' : 'General Medicine',
    },
    {
      id: 'TC-002',
      patientId: 'YEM-002',
      patientName: isRTL ? 'فاطمة علي أحمد' : 'Fatima Ali Ahmed',
      scheduledTime: '09:30',
      duration: 20,
      status: 'in_progress',
      type: 'video',
      provider: isRTL ? 'د. سارة أحمد' : 'Dr. Sara Ahmed',
      specialty: isRTL ? 'أمراض نساء' : 'Gynecology',
    },
    {
      id: 'TC-003',
      patientId: 'YEM-003',
      patientName: isRTL ? 'محمد صالح العمري' : 'Mohammed Saleh Al-Omari',
      scheduledTime: '10:00',
      duration: 15,
      status: 'completed',
      type: 'audio',
      provider: isRTL ? 'د. عبدالله حسن' : 'Dr. Abdullah Hassan',
      specialty: isRTL ? 'باطنية' : 'Internal Medicine',
      notes: isRTL ? 'تم مراجعة نتائج الفحوصات وتعديل الأدوية' : 'Lab results reviewed, medications adjusted',
    },
    {
      id: 'TC-004',
      patientId: 'YEM-004',
      patientName: isRTL ? 'سارة محمد الحسني' : 'Sara Mohammed Al-Hasani',
      scheduledTime: '10:30',
      duration: 30,
      status: 'scheduled',
      type: 'video',
      provider: isRTL ? 'د. نورا السعيد' : 'Dr. Noura Al-Saeed',
      specialty: isRTL ? 'جلدية' : 'Dermatology',
    },
    {
      id: 'TC-005',
      patientId: 'YEM-005',
      patientName: isRTL ? 'عبدالله أحمد السعيدي' : 'Abdullah Ahmed Al-Saeedi',
      scheduledTime: '11:00',
      duration: 20,
      status: 'cancelled',
      type: 'video',
      provider: isRTL ? 'د. خالد العمري' : 'Dr. Khalid Al-Omari',
      specialty: isRTL ? 'عظام' : 'Orthopedics',
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <Badge variant="primary">{t.scheduled}</Badge>;
      case 'in_progress':
        return <Badge variant="success">{t.inProgress}</Badge>;
      case 'completed':
        return <Badge variant="secondary">{t.completed}</Badge>;
      case 'cancelled':
        return <Badge variant="danger">{t.cancelled}</Badge>;
      case 'missed':
        return <Badge variant="warning">{t.missed}</Badge>;
      default:
        return null;
    }
  };

  const filteredConsultations = consultations.filter((consultation) => {
    const matchesSearch =
      consultation.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      consultation.patientId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || consultation.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    totalToday: consultations.length,
    completedToday: consultations.filter((c) => c.status === 'completed').length,
    pendingToday: consultations.filter((c) => c.status === 'scheduled').length,
    inProgressNow: consultations.filter((c) => c.status === 'in_progress').length,
  };

  const handleStartCall = () => {
    setIsInCall(true);
  };

  const handleEndCall = () => {
    setIsInCall(false);
    setIsMuted(false);
    setIsVideoOff(false);
  };

  return (
    <MainLayout title={t.pageTitle} locale={locale} onLocaleChange={setLocale}>
      <div className={`p-6 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <Video className="h-7 w-7 text-blue-600" />
            {t.title}
          </h1>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            {t.newConsultation}
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{t.totalToday}</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalToday}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{t.completedToday}</p>
                <p className="text-2xl font-bold text-green-600">{stats.completedToday}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{t.pendingToday}</p>
                <p className="text-2xl font-bold text-orange-600">{stats.pendingToday}</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{t.waitingRoom}</p>
                <p className="text-2xl font-bold text-purple-600">{stats.inProgressNow}</p>
                <p className="text-xs text-gray-500">{t.patientsWaiting}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Consultations List */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  {t.todaySchedule}
                </h3>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-4 mb-4">
                <div className="flex-1 min-w-[200px]">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="text"
                      placeholder={t.searchPlaceholder}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="border rounded-lg px-3 py-2"
                >
                  <option value="all">{t.allStatus}</option>
                  <option value="scheduled">{t.scheduled}</option>
                  <option value="in_progress">{t.inProgress}</option>
                  <option value="completed">{t.completed}</option>
                  <option value="cancelled">{t.cancelled}</option>
                </select>
              </div>

              {/* Consultations */}
              <div className="space-y-3">
                {filteredConsultations.map((consultation) => (
                  <div
                    key={consultation.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedConsultation?.id === consultation.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedConsultation(consultation)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-gray-100 rounded-full">
                          {consultation.type === 'video' ? (
                            <Video className="h-5 w-5 text-blue-600" />
                          ) : (
                            <Phone className="h-5 w-5 text-green-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{consultation.patientName}</p>
                          <p className="text-sm text-gray-500">
                            {consultation.specialty} - {consultation.provider}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">{consultation.scheduledTime}</p>
                        <p className="text-sm text-gray-500">
                          {consultation.duration} {t.minutes}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      {getStatusBadge(consultation.status)}
                      {consultation.status === 'scheduled' && (
                        <Button
                          size="sm"
                          className="flex items-center gap-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedConsultation(consultation);
                            handleStartCall();
                          }}
                        >
                          <Video className="h-4 w-4" />
                          {t.startCall}
                        </Button>
                      )}
                      {consultation.status === 'in_progress' && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex items-center gap-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedConsultation(consultation);
                            handleStartCall();
                          }}
                        >
                          <Video className="h-4 w-4" />
                          {t.joinCall}
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Video Call / Details Panel */}
          <div>
            {isInCall ? (
              <Card className="p-0 overflow-hidden">
                {/* Video Area */}
                <div className="bg-gray-900 h-64 flex items-center justify-center relative">
                  <div className="absolute top-4 right-4 w-24 h-18 bg-gray-700 rounded-lg flex items-center justify-center">
                    <User className="h-8 w-8 text-gray-400" />
                  </div>
                  <User className="h-20 w-20 text-gray-600" />
                  <div className="absolute bottom-4 left-4 text-white text-sm">
                    <span className="bg-green-600 px-2 py-1 rounded">{t.connected}</span>
                  </div>
                </div>

                {/* Call Controls */}
                <div className="p-4 bg-gray-800 flex items-center justify-center gap-4">
                  <Button
                    size="sm"
                    variant={isMuted ? 'danger' : 'outline'}
                    className={isMuted ? '' : 'bg-gray-700 text-white border-gray-600'}
                    onClick={() => setIsMuted(!isMuted)}
                  >
                    {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                  </Button>
                  <Button
                    size="sm"
                    variant={isVideoOff ? 'danger' : 'outline'}
                    className={isVideoOff ? '' : 'bg-gray-700 text-white border-gray-600'}
                    onClick={() => setIsVideoOff(!isVideoOff)}
                  >
                    {isVideoOff ? <CameraOff className="h-5 w-5" /> : <Camera className="h-5 w-5" />}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-gray-700 text-white border-gray-600"
                  >
                    <Monitor className="h-5 w-5" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-gray-700 text-white border-gray-600"
                  >
                    <MessageSquare className="h-5 w-5" />
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={handleEndCall}
                  >
                    <PhoneOff className="h-5 w-5" />
                  </Button>
                </div>

                {/* Patient Info */}
                {selectedConsultation && (
                  <div className="p-4 space-y-3">
                    <h4 className="font-medium text-gray-900">{selectedConsultation.patientName}</h4>
                    <p className="text-sm text-gray-500">{selectedConsultation.patientId}</p>
                    <div className="pt-3 border-t">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t.notes}
                      </label>
                      <textarea
                        className="w-full border rounded-lg px-3 py-2 text-sm"
                        rows={3}
                        placeholder={t.addNotes}
                      />
                      <Button size="sm" className="mt-2 w-full">
                        <FileText className="h-4 w-4 mr-2" />
                        {t.saveSummary}
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
            ) : (
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Monitor className="h-5 w-5 text-blue-600" />
                  {t.consultationDetails}
                </h3>

                {selectedConsultation ? (
                  <div className="space-y-4">
                    <div className="text-center p-6 bg-gray-50 rounded-lg">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <User className="h-8 w-8 text-blue-600" />
                      </div>
                      <h4 className="font-medium text-gray-900">{selectedConsultation.patientName}</h4>
                      <p className="text-sm text-gray-500">{selectedConsultation.patientId}</p>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">{t.scheduledTime}:</span>
                        <span className="font-medium">{selectedConsultation.scheduledTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">{t.duration}:</span>
                        <span className="font-medium">{selectedConsultation.duration} {t.minutes}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">{t.type}:</span>
                        <span className="font-medium">
                          {selectedConsultation.type === 'video' ? t.video : t.audio}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">{t.provider}:</span>
                        <span className="font-medium">{selectedConsultation.provider}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">{t.specialty}:</span>
                        <span className="font-medium">{selectedConsultation.specialty}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">{t.status}:</span>
                        {getStatusBadge(selectedConsultation.status)}
                      </div>
                    </div>

                    {selectedConsultation.notes && (
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm font-medium text-gray-700 mb-1">{t.notes}:</p>
                        <p className="text-sm text-gray-600">{selectedConsultation.notes}</p>
                      </div>
                    )}

                    {(selectedConsultation.status === 'scheduled' || selectedConsultation.status === 'in_progress') && (
                      <Button
                        className="w-full flex items-center justify-center gap-2"
                        onClick={handleStartCall}
                      >
                        <Video className="h-4 w-4" />
                        {selectedConsultation.status === 'scheduled' ? t.startCall : t.joinCall}
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <Video className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>{t.noConsultationSelected}</p>
                  </div>
                )}
              </Card>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
