'use client';

import React, { useState } from 'react';
import { MainLayout } from '@/components/layout';
import { Card, Button, Badge, Input } from '@/components/ui';
import {
  Scan,
  Search,
  Eye,
  Download,
  Upload,
  Clock,
  CheckCircle,
  AlertCircle,
  FileImage,
  Monitor,
  Printer,
  Share2,
  Calendar,
  User,
  Activity,
  Layers,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Maximize,
} from 'lucide-react';

// PACS/DICOM Radiology Module
// Matches the workflow of pacs-integration, pacsquery

interface ImagingStudy {
  id: string;
  patientId: string;
  patientName: string;
  studyType: string;
  modality: string;
  studyDate: string;
  status: 'pending' | 'in_progress' | 'completed' | 'reported';
  priority: 'routine' | 'urgent' | 'stat';
  referringPhysician: string;
  radiologist?: string;
  images: number;
  reportStatus?: 'pending' | 'draft' | 'final';
}

export default function RadiologyPage() {
  const [locale, setLocale] = useState<'ar' | 'en'>('ar');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudy, setSelectedStudy] = useState<ImagingStudy | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterModality, setFilterModality] = useState<string>('all');
  
  const translations = {
    ar: {
      title: 'الأشعة والتصوير الطبي',
      pageTitle: 'قسم الأشعة - PACS',
      searchPlaceholder: 'البحث عن مريض أو دراسة...',
      worklist: 'قائمة العمل',
      viewer: 'عارض الصور',
      reports: 'التقارير',
      upload: 'رفع صور',
      patientId: 'رقم المريض',
      patientName: 'اسم المريض',
      studyType: 'نوع الفحص',
      modality: 'جهاز التصوير',
      studyDate: 'تاريخ الفحص',
      status: 'الحالة',
      priority: 'الأولوية',
      referringPhysician: 'الطبيب المحيل',
      radiologist: 'أخصائي الأشعة',
      images: 'عدد الصور',
      viewStudy: 'عرض الدراسة',
      createReport: 'إنشاء تقرير',
      pending: 'في الانتظار',
      inProgress: 'جاري التنفيذ',
      completed: 'مكتمل',
      reported: 'تم التقرير',
      routine: 'عادي',
      urgent: 'عاجل',
      stat: 'طارئ',
      allStatus: 'جميع الحالات',
      allModalities: 'جميع الأجهزة',
      xray: 'أشعة سينية',
      ct: 'أشعة مقطعية',
      mri: 'رنين مغناطيسي',
      ultrasound: 'موجات فوق صوتية',
      mammography: 'تصوير الثدي',
      fluoroscopy: 'تنظير فلوري',
      todayStudies: 'دراسات اليوم',
      pendingReports: 'تقارير معلقة',
      completedToday: 'مكتمل اليوم',
      urgentStudies: 'دراسات عاجلة',
      studyDetails: 'تفاصيل الدراسة',
      imageViewer: 'عارض الصور',
      tools: 'الأدوات',
      zoom: 'تكبير',
      rotate: 'تدوير',
      fullscreen: 'ملء الشاشة',
      measurements: 'القياسات',
      annotations: 'التعليقات التوضيحية',
      print: 'طباعة',
      share: 'مشاركة',
      download: 'تحميل',
      findings: 'النتائج',
      impression: 'الانطباع',
      recommendations: 'التوصيات',
      saveDraft: 'حفظ مسودة',
      finalize: 'إنهاء التقرير',
      reportPending: 'التقرير معلق',
      reportDraft: 'مسودة',
      reportFinal: 'نهائي',
      noStudySelected: 'اختر دراسة لعرضها',
    },
    en: {
      title: 'Radiology & Medical Imaging',
      pageTitle: 'Radiology - PACS',
      searchPlaceholder: 'Search patient or study...',
      worklist: 'Worklist',
      viewer: 'Image Viewer',
      reports: 'Reports',
      upload: 'Upload Images',
      patientId: 'Patient ID',
      patientName: 'Patient Name',
      studyType: 'Study Type',
      modality: 'Modality',
      studyDate: 'Study Date',
      status: 'Status',
      priority: 'Priority',
      referringPhysician: 'Referring Physician',
      radiologist: 'Radiologist',
      images: 'Images',
      viewStudy: 'View Study',
      createReport: 'Create Report',
      pending: 'Pending',
      inProgress: 'In Progress',
      completed: 'Completed',
      reported: 'Reported',
      routine: 'Routine',
      urgent: 'Urgent',
      stat: 'STAT',
      allStatus: 'All Status',
      allModalities: 'All Modalities',
      xray: 'X-Ray',
      ct: 'CT Scan',
      mri: 'MRI',
      ultrasound: 'Ultrasound',
      mammography: 'Mammography',
      fluoroscopy: 'Fluoroscopy',
      todayStudies: "Today's Studies",
      pendingReports: 'Pending Reports',
      completedToday: 'Completed Today',
      urgentStudies: 'Urgent Studies',
      studyDetails: 'Study Details',
      imageViewer: 'Image Viewer',
      tools: 'Tools',
      zoom: 'Zoom',
      rotate: 'Rotate',
      fullscreen: 'Fullscreen',
      measurements: 'Measurements',
      annotations: 'Annotations',
      print: 'Print',
      share: 'Share',
      download: 'Download',
      findings: 'Findings',
      impression: 'Impression',
      recommendations: 'Recommendations',
      saveDraft: 'Save Draft',
      finalize: 'Finalize Report',
      reportPending: 'Report Pending',
      reportDraft: 'Draft',
      reportFinal: 'Final',
      noStudySelected: 'Select a study to view',
    },
  };

  const t = translations[locale];
  const isRTL = locale === 'ar';

  const studies: ImagingStudy[] = [
    {
      id: 'RAD-001',
      patientId: 'YEM-001',
      patientName: isRTL ? 'أحمد عبدالله محمد' : 'Ahmed Abdullah Mohammed',
      studyType: isRTL ? 'أشعة صدر' : 'Chest X-Ray',
      modality: 'CR',
      studyDate: '2024-01-09',
      status: 'pending',
      priority: 'routine',
      referringPhysician: isRTL ? 'د. محمد علي' : 'Dr. Mohammed Ali',
      images: 2,
      reportStatus: 'pending',
    },
    {
      id: 'RAD-002',
      patientId: 'YEM-002',
      patientName: isRTL ? 'فاطمة علي أحمد' : 'Fatima Ali Ahmed',
      studyType: isRTL ? 'أشعة مقطعية للبطن' : 'Abdominal CT',
      modality: 'CT',
      studyDate: '2024-01-09',
      status: 'in_progress',
      priority: 'urgent',
      referringPhysician: isRTL ? 'د. سارة أحمد' : 'Dr. Sara Ahmed',
      radiologist: isRTL ? 'د. خالد العمري' : 'Dr. Khalid Al-Omari',
      images: 150,
      reportStatus: 'draft',
    },
    {
      id: 'RAD-003',
      patientId: 'YEM-003',
      patientName: isRTL ? 'محمد صالح العمري' : 'Mohammed Saleh Al-Omari',
      studyType: isRTL ? 'رنين مغناطيسي للدماغ' : 'Brain MRI',
      modality: 'MR',
      studyDate: '2024-01-09',
      status: 'completed',
      priority: 'stat',
      referringPhysician: isRTL ? 'د. عبدالله حسن' : 'Dr. Abdullah Hassan',
      radiologist: isRTL ? 'د. نورا السعيد' : 'Dr. Noura Al-Saeed',
      images: 200,
      reportStatus: 'final',
    },
    {
      id: 'RAD-004',
      patientId: 'YEM-004',
      patientName: isRTL ? 'سارة محمد الحسني' : 'Sara Mohammed Al-Hasani',
      studyType: isRTL ? 'موجات فوق صوتية للبطن' : 'Abdominal Ultrasound',
      modality: 'US',
      studyDate: '2024-01-09',
      status: 'reported',
      priority: 'routine',
      referringPhysician: isRTL ? 'د. أمينة صالح' : 'Dr. Amina Saleh',
      radiologist: isRTL ? 'د. خالد العمري' : 'Dr. Khalid Al-Omari',
      images: 25,
      reportStatus: 'final',
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="warning">{t.pending}</Badge>;
      case 'in_progress':
        return <Badge variant="primary">{t.inProgress}</Badge>;
      case 'completed':
        return <Badge variant="success">{t.completed}</Badge>;
      case 'reported':
        return <Badge variant="success">{t.reported}</Badge>;
      default:
        return null;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'routine':
        return <Badge variant="secondary">{t.routine}</Badge>;
      case 'urgent':
        return <Badge variant="warning">{t.urgent}</Badge>;
      case 'stat':
        return <Badge variant="danger">{t.stat}</Badge>;
      default:
        return null;
    }
  };

  const getModalityName = (modality: string) => {
    switch (modality) {
      case 'CR':
      case 'DX':
        return t.xray;
      case 'CT':
        return t.ct;
      case 'MR':
        return t.mri;
      case 'US':
        return t.ultrasound;
      case 'MG':
        return t.mammography;
      case 'RF':
        return t.fluoroscopy;
      default:
        return modality;
    }
  };

  const filteredStudies = studies.filter((study) => {
    const matchesSearch =
      study.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      study.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      study.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || study.status === filterStatus;
    const matchesModality = filterModality === 'all' || study.modality === filterModality;
    return matchesSearch && matchesStatus && matchesModality;
  });

  const stats = {
    todayStudies: studies.length,
    pendingReports: studies.filter((s) => s.reportStatus === 'pending' || s.reportStatus === 'draft').length,
    completedToday: studies.filter((s) => s.status === 'completed' || s.status === 'reported').length,
    urgentStudies: studies.filter((s) => s.priority === 'urgent' || s.priority === 'stat').length,
  };

  return (
    <MainLayout title={t.pageTitle} locale={locale} onLocaleChange={setLocale}>
      <div className={`p-6 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <Scan className="h-7 w-7 text-blue-600" />
            {t.title}
          </h1>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{t.todayStudies}</p>
                <p className="text-2xl font-bold text-gray-900">{stats.todayStudies}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <FileImage className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{t.pendingReports}</p>
                <p className="text-2xl font-bold text-orange-600">{stats.pendingReports}</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <Clock className="h-6 w-6 text-orange-600" />
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
                <p className="text-sm text-gray-500">{t.urgentStudies}</p>
                <p className="text-2xl font-bold text-red-600">{stats.urgentStudies}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Worklist */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Activity className="h-5 w-5 text-blue-600" />
                  {t.worklist}
                </h3>
                <Button variant="outline" className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  {t.upload}
                </Button>
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
                  <option value="pending">{t.pending}</option>
                  <option value="in_progress">{t.inProgress}</option>
                  <option value="completed">{t.completed}</option>
                  <option value="reported">{t.reported}</option>
                </select>
                <select
                  value={filterModality}
                  onChange={(e) => setFilterModality(e.target.value)}
                  className="border rounded-lg px-3 py-2"
                >
                  <option value="all">{t.allModalities}</option>
                  <option value="CR">{t.xray}</option>
                  <option value="CT">{t.ct}</option>
                  <option value="MR">{t.mri}</option>
                  <option value="US">{t.ultrasound}</option>
                </select>
              </div>

              {/* Studies Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">
                        {t.patientName}
                      </th>
                      <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">
                        {t.studyType}
                      </th>
                      <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">
                        {t.modality}
                      </th>
                      <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">
                        {t.priority}
                      </th>
                      <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">
                        {t.status}
                      </th>
                      <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">
                        {t.images}
                      </th>
                      <th className="px-4 py-3 text-center text-sm font-medium text-gray-600">
                        -
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudies.map((study) => (
                      <tr
                        key={study.id}
                        className={`border-b hover:bg-gray-50 cursor-pointer ${
                          selectedStudy?.id === study.id ? 'bg-blue-50' : ''
                        }`}
                        onClick={() => setSelectedStudy(study)}
                      >
                        <td className="px-4 py-3">
                          <div>
                            <p className="font-medium text-gray-900">{study.patientName}</p>
                            <p className="text-sm text-gray-500">{study.patientId}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-700">{study.studyType}</td>
                        <td className="px-4 py-3 text-gray-700">{getModalityName(study.modality)}</td>
                        <td className="px-4 py-3">{getPriorityBadge(study.priority)}</td>
                        <td className="px-4 py-3">{getStatusBadge(study.status)}</td>
                        <td className="px-4 py-3 text-gray-700">{study.images}</td>
                        <td className="px-4 py-3">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* Study Details / Viewer */}
          <div>
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Monitor className="h-5 w-5 text-blue-600" />
                {t.studyDetails}
              </h3>

              {selectedStudy ? (
                <div className="space-y-4">
                  {/* Image Preview Area */}
                  <div className="bg-gray-900 rounded-lg h-48 flex items-center justify-center">
                    <FileImage className="h-16 w-16 text-gray-600" />
                  </div>

                  {/* Viewer Tools */}
                  <div className="flex justify-center gap-2">
                    <Button size="sm" variant="outline" title={t.zoom}>
                      <ZoomIn className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" title={t.zoom}>
                      <ZoomOut className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" title={t.rotate}>
                      <RotateCw className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" title={t.fullscreen}>
                      <Maximize className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Study Info */}
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">{t.patientName}:</span>
                      <span className="font-medium">{selectedStudy.patientName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">{t.studyType}:</span>
                      <span className="font-medium">{selectedStudy.studyType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">{t.studyDate}:</span>
                      <span className="font-medium">{selectedStudy.studyDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">{t.referringPhysician}:</span>
                      <span className="font-medium">{selectedStudy.referringPhysician}</span>
                    </div>
                    {selectedStudy.radiologist && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">{t.radiologist}:</span>
                        <span className="font-medium">{selectedStudy.radiologist}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-500">{t.images}:</span>
                      <span className="font-medium">{selectedStudy.images}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2 mt-4">
                    <Button className="w-full flex items-center justify-center gap-2">
                      <Eye className="h-4 w-4" />
                      {t.viewStudy}
                    </Button>
                    <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                      <FileImage className="h-4 w-4" />
                      {t.createReport}
                    </Button>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Printer className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Share2 className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <FileImage className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>{t.noStudySelected}</p>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
