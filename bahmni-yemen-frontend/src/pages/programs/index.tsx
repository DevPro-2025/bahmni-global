'use client';

import React, { useState } from 'react';
import { MainLayout } from '@/components/layout';
import { Card, Button, Badge } from '@/components/ui';
import {
  Layers,
  User,
  Calendar,
  Plus,
  Search,
  Eye,
  Edit,
  Pause,
  Play,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
} from 'lucide-react';

// Programs Module - Patient Programs/Care Management
// Matches Bahmni programs functionality for managing patient enrollment in care programs

type ProgramStatus = 'ACTIVE' | 'COMPLETED' | 'CANCELLED' | 'ON_HOLD';

interface PatientProgram {
  id: string;
  patient: {
    id: string;
    identifier: string;
    name: string;
    nameAr: string;
    gender: 'M' | 'F';
    age: number;
  };
  program: {
    id: string;
    name: string;
    nameAr: string;
    description: string;
    descriptionAr: string;
  };
  enrollmentDate: string;
  completionDate?: string;
  status: ProgramStatus;
  currentState?: string;
  currentStateAr?: string;
  outcomes?: string[];
  careCoordinator: string;
  careCoordinatorAr: string;
}

interface Program {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  duration?: string;
  enrolledPatients: number;
  activePatients: number;
}

const mockPrograms: Program[] = [
  {
    id: 'p1',
    name: 'Maternal & Child Health',
    nameAr: 'صحة الأم والطفل',
    description: 'Comprehensive prenatal, delivery, and postnatal care program',
    descriptionAr: 'برنامج شامل لرعاية ما قبل الولادة والولادة وما بعد الولادة',
    duration: '9-12 months',
    enrolledPatients: 156,
    activePatients: 89,
  },
  {
    id: 'p2',
    name: 'Diabetes Management',
    nameAr: 'إدارة السكري',
    description: 'Ongoing care for diabetic patients including monitoring and education',
    descriptionAr: 'رعاية مستمرة لمرضى السكري تشمل المتابعة والتثقيف',
    enrolledPatients: 245,
    activePatients: 198,
  },
  {
    id: 'p3',
    name: 'Tuberculosis Treatment',
    nameAr: 'علاج السل',
    description: 'DOTS program for TB treatment and monitoring',
    descriptionAr: 'برنامج DOTS لعلاج السل ومتابعته',
    duration: '6-9 months',
    enrolledPatients: 34,
    activePatients: 28,
  },
  {
    id: 'p4',
    name: 'HIV/AIDS Care',
    nameAr: 'رعاية فيروس نقص المناعة',
    description: 'Comprehensive care for HIV positive patients',
    descriptionAr: 'رعاية شاملة للمرضى المصابين بفيروس نقص المناعة',
    enrolledPatients: 67,
    activePatients: 62,
  },
  {
    id: 'p5',
    name: 'Malnutrition Program',
    nameAr: 'برنامج سوء التغذية',
    description: 'Treatment and monitoring for malnourished children',
    descriptionAr: 'علاج ومتابعة الأطفال الذين يعانون من سوء التغذية',
    duration: '3-6 months',
    enrolledPatients: 89,
    activePatients: 45,
  },
];

const mockPatientPrograms: PatientProgram[] = [
  {
    id: 'pp1',
    patient: { id: '1', identifier: 'YEM-001', name: 'Fatima Ahmed', nameAr: 'فاطمة أحمد', gender: 'F', age: 28 },
    program: mockPrograms[0],
    enrollmentDate: '2024-01-05',
    status: 'ACTIVE',
    currentState: 'Third Trimester',
    currentStateAr: 'الثلث الثالث',
    careCoordinator: 'Dr. Salma Mohammed',
    careCoordinatorAr: 'د. سلمى محمد',
  },
  {
    id: 'pp2',
    patient: { id: '2', identifier: 'YEM-002', name: 'Mohammed Ali', nameAr: 'محمد علي', gender: 'M', age: 55 },
    program: mockPrograms[1],
    enrollmentDate: '2023-08-15',
    status: 'ACTIVE',
    currentState: 'Stable Control',
    currentStateAr: 'تحكم مستقر',
    careCoordinator: 'Dr. Ahmed Hassan',
    careCoordinatorAr: 'د. أحمد حسن',
  },
  {
    id: 'pp3',
    patient: { id: '3', identifier: 'YEM-003', name: 'Sara Abdullah', nameAr: 'سارة عبدالله', gender: 'F', age: 32 },
    program: mockPrograms[2],
    enrollmentDate: '2023-11-01',
    status: 'ACTIVE',
    currentState: 'Intensive Phase',
    currentStateAr: 'المرحلة المكثفة',
    careCoordinator: 'Dr. Omar Saleh',
    careCoordinatorAr: 'د. عمر صالح',
  },
  {
    id: 'pp4',
    patient: { id: '4', identifier: 'YEM-004', name: 'Khalid Hassan', nameAr: 'خالد حسن', gender: 'M', age: 62 },
    program: mockPrograms[1],
    enrollmentDate: '2023-03-10',
    completionDate: '2024-01-05',
    status: 'COMPLETED',
    currentState: 'Graduated',
    currentStateAr: 'تخرج',
    outcomes: ['HbA1c reduced to 6.5%', 'Weight loss achieved'],
    careCoordinator: 'Dr. Ahmed Hassan',
    careCoordinatorAr: 'د. أحمد حسن',
  },
  {
    id: 'pp5',
    patient: { id: '5', identifier: 'YEM-005', name: 'Amina Saleh', nameAr: 'أمينة صالح', gender: 'F', age: 25 },
    program: mockPrograms[0],
    enrollmentDate: '2023-12-01',
    status: 'ON_HOLD',
    currentState: 'Referral Pending',
    currentStateAr: 'بانتظار التحويل',
    careCoordinator: 'Dr. Salma Mohammed',
    careCoordinatorAr: 'د. سلمى محمد',
  },
];

export default function ProgramsPage() {
  const [locale, setLocale] = useState<'ar' | 'en'>('ar');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProgram, setSelectedProgram] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<ProgramStatus | 'ALL'>('ALL');
  const [selectedPatientProgram, setSelectedPatientProgram] = useState<PatientProgram | null>(null);
  const [view, setView] = useState<'programs' | 'enrollments'>('programs');

  const isRTL = locale === 'ar';

  const t = {
    title: isRTL ? 'برامج الرعاية' : 'Care Programs',
    subtitle: isRTL ? 'إدارة تسجيل المرضى في برامج الرعاية' : 'Manage patient enrollment in care programs',
    programs: isRTL ? 'البرامج' : 'Programs',
    enrollments: isRTL ? 'التسجيلات' : 'Enrollments',
    newEnrollment: isRTL ? 'تسجيل جديد' : 'New Enrollment',
    searchPlaceholder: isRTL ? 'البحث بالاسم أو رقم المريض...' : 'Search by name or patient ID...',
    allPrograms: isRTL ? 'جميع البرامج' : 'All Programs',
    allStatuses: isRTL ? 'جميع الحالات' : 'All Statuses',
    active: isRTL ? 'نشط' : 'Active',
    completed: isRTL ? 'مكتمل' : 'Completed',
    cancelled: isRTL ? 'ملغي' : 'Cancelled',
    onHold: isRTL ? 'معلق' : 'On Hold',
    patient: isRTL ? 'المريض' : 'Patient',
    program: isRTL ? 'البرنامج' : 'Program',
    enrollmentDate: isRTL ? 'تاريخ التسجيل' : 'Enrollment Date',
    status: isRTL ? 'الحالة' : 'Status',
    currentState: isRTL ? 'الحالة الحالية' : 'Current State',
    careCoordinator: isRTL ? 'منسق الرعاية' : 'Care Coordinator',
    actions: isRTL ? 'الإجراءات' : 'Actions',
    view: isRTL ? 'عرض' : 'View',
    edit: isRTL ? 'تعديل' : 'Edit',
    complete: isRTL ? 'إكمال' : 'Complete',
    hold: isRTL ? 'تعليق' : 'Hold',
    resume: isRTL ? 'استئناف' : 'Resume',
    cancel: isRTL ? 'إلغاء' : 'Cancel',
    enrolledPatients: isRTL ? 'المرضى المسجلين' : 'Enrolled Patients',
    activePatients: isRTL ? 'المرضى النشطين' : 'Active Patients',
    duration: isRTL ? 'المدة' : 'Duration',
    description: isRTL ? 'الوصف' : 'Description',
    enrollmentDetails: isRTL ? 'تفاصيل التسجيل' : 'Enrollment Details',
    completionDate: isRTL ? 'تاريخ الإكمال' : 'Completion Date',
    outcomes: isRTL ? 'النتائج' : 'Outcomes',
    patientId: isRTL ? 'رقم المريض' : 'Patient ID',
    gender: isRTL ? 'الجنس' : 'Gender',
    age: isRTL ? 'العمر' : 'Age',
    male: isRTL ? 'ذكر' : 'Male',
    female: isRTL ? 'أنثى' : 'Female',
    years: isRTL ? 'سنة' : 'years',
    noEnrollments: isRTL ? 'لا توجد تسجيلات' : 'No enrollments found',
    manageProgram: isRTL ? 'إدارة البرنامج' : 'Manage Program',
    viewEnrollments: isRTL ? 'عرض التسجيلات' : 'View Enrollments',
  };

  const getStatusBadge = (status: ProgramStatus) => {
    switch (status) {
      case 'ACTIVE': return <Badge variant="success">{t.active}</Badge>;
      case 'COMPLETED': return <Badge variant="info">{t.completed}</Badge>;
      case 'CANCELLED': return <Badge variant="danger">{t.cancelled}</Badge>;
      case 'ON_HOLD': return <Badge variant="warning">{t.onHold}</Badge>;
    }
  };

  const filteredEnrollments = mockPatientPrograms.filter((pp) => {
    const matchesSearch =
      pp.patient.identifier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pp.patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pp.patient.nameAr.includes(searchTerm);
    const matchesProgram = selectedProgram === 'ALL' || pp.program.id === selectedProgram;
    const matchesStatus = selectedStatus === 'ALL' || pp.status === selectedStatus;
    return matchesSearch && matchesProgram && matchesStatus;
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
              <Layers className="text-primary-500" />
              {t.title}
            </h1>
            <p className="text-slate-500 mt-1">{t.subtitle}</p>
          </div>
          <div className="flex gap-2">
            <div className="flex bg-slate-100 rounded-lg p-1">
              <button
                onClick={() => setView('programs')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  view === 'programs' ? 'bg-white shadow' : 'text-slate-600'
                }`}
              >
                {t.programs}
              </button>
              <button
                onClick={() => setView('enrollments')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  view === 'enrollments' ? 'bg-white shadow' : 'text-slate-600'
                }`}
              >
                {t.enrollments}
              </button>
            </div>
            <Button>
              <Plus size={18} className={isRTL ? 'ml-2' : 'mr-2'} />
              {t.newEnrollment}
            </Button>
          </div>
        </div>

        {view === 'programs' ? (
          /* Programs Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockPrograms.map((program) => (
              <Card key={program.id} className="hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                      <Layers className="text-primary-500" size={24} />
                    </div>
                    <Badge variant="primary">{program.activePatients} {isRTL ? 'نشط' : 'active'}</Badge>
                  </div>
                  <h3 className="font-semibold text-lg text-slate-800 mb-2">
                    {isRTL ? program.nameAr : program.name}
                  </h3>
                  <p className="text-sm text-slate-500 mb-4">
                    {isRTL ? program.descriptionAr : program.description}
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-500">{t.enrolledPatients}:</span>
                      <span className="font-medium">{program.enrolledPatients}</span>
                    </div>
                    {program.duration && (
                      <div className="flex justify-between">
                        <span className="text-slate-500">{t.duration}:</span>
                        <span className="font-medium">{program.duration}</span>
                      </div>
                    )}
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      {t.manageProgram}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => {
                        setSelectedProgram(program.id);
                        setView('enrollments');
                      }}
                    >
                      {t.viewEnrollments}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          /* Enrollments View */
          <>
            {/* Filters */}
            <Card className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute top-1/2 -translate-y-1/2 start-3 text-slate-400" size={20} />
                  <input
                    type="text"
                    placeholder={t.searchPlaceholder}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full ps-10 pe-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <select
                  value={selectedProgram}
                  onChange={(e) => setSelectedProgram(e.target.value)}
                  className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                >
                  <option value="ALL">{t.allPrograms}</option>
                  {mockPrograms.map((program) => (
                    <option key={program.id} value={program.id}>
                      {isRTL ? program.nameAr : program.name}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value as ProgramStatus | 'ALL')}
                  className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                >
                  <option value="ALL">{t.allStatuses}</option>
                  <option value="ACTIVE">{t.active}</option>
                  <option value="COMPLETED">{t.completed}</option>
                  <option value="ON_HOLD">{t.onHold}</option>
                  <option value="CANCELLED">{t.cancelled}</option>
                </select>
              </div>
            </Card>

            {/* Enrollments Table */}
            <Card>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-4 py-3 text-start text-sm font-medium text-slate-600">{t.patient}</th>
                      <th className="px-4 py-3 text-start text-sm font-medium text-slate-600">{t.program}</th>
                      <th className="px-4 py-3 text-start text-sm font-medium text-slate-600">{t.enrollmentDate}</th>
                      <th className="px-4 py-3 text-start text-sm font-medium text-slate-600">{t.currentState}</th>
                      <th className="px-4 py-3 text-start text-sm font-medium text-slate-600">{t.status}</th>
                      <th className="px-4 py-3 text-start text-sm font-medium text-slate-600">{t.actions}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {filteredEnrollments.map((pp) => (
                      <tr key={pp.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
                              <User size={14} className="text-slate-500" />
                            </div>
                            <div>
                              <div className="text-sm font-medium">
                                {isRTL ? pp.patient.nameAr : pp.patient.name}
                              </div>
                              <div className="text-xs text-slate-500">{pp.patient.identifier}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-sm font-medium">
                            {isRTL ? pp.program.nameAr : pp.program.name}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1 text-sm">
                            <Calendar size={14} className="text-slate-400" />
                            {pp.enrollmentDate}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {isRTL ? pp.currentStateAr : pp.currentState}
                        </td>
                        <td className="px-4 py-3">{getStatusBadge(pp.status)}</td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedPatientProgram(pp)}
                            >
                              <Eye size={14} className={isRTL ? 'ml-1' : 'mr-1'} />
                              {t.view}
                            </Button>
                            {pp.status === 'ACTIVE' && (
                              <>
                                <Button variant="outline" size="sm">
                                  <Pause size={14} />
                                </Button>
                                <Button variant="outline" size="sm">
                                  <CheckCircle size={14} />
                                </Button>
                              </>
                            )}
                            {pp.status === 'ON_HOLD' && (
                              <Button variant="outline" size="sm">
                                <Play size={14} />
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {filteredEnrollments.length === 0 && (
                  <div className="text-center py-12">
                    <AlertCircle size={48} className="mx-auto text-slate-300 mb-4" />
                    <p className="text-slate-500">{t.noEnrollments}</p>
                  </div>
                )}
              </div>
            </Card>
          </>
        )}

        {/* Enrollment Details Panel */}
        {selectedPatientProgram && (
          <Card>
            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
              <h2 className="font-semibold text-slate-800">{t.enrollmentDetails}</h2>
              <button
                onClick={() => setSelectedPatientProgram(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                ×
              </button>
            </div>
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-slate-500">{t.patient}</label>
                  <p className="font-medium">
                    {isRTL ? selectedPatientProgram.patient.nameAr : selectedPatientProgram.patient.name}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-slate-500">{t.patientId}</label>
                  <p className="font-medium text-primary-600">{selectedPatientProgram.patient.identifier}</p>
                </div>
                <div>
                  <label className="text-sm text-slate-500">{t.program}</label>
                  <p className="font-medium">
                    {isRTL ? selectedPatientProgram.program.nameAr : selectedPatientProgram.program.name}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-slate-500">{t.currentState}</label>
                  <p className="font-medium">
                    {isRTL ? selectedPatientProgram.currentStateAr : selectedPatientProgram.currentState}
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-slate-500">{t.enrollmentDate}</label>
                  <p className="font-medium">{selectedPatientProgram.enrollmentDate}</p>
                </div>
                {selectedPatientProgram.completionDate && (
                  <div>
                    <label className="text-sm text-slate-500">{t.completionDate}</label>
                    <p className="font-medium">{selectedPatientProgram.completionDate}</p>
                  </div>
                )}
                <div>
                  <label className="text-sm text-slate-500">{t.careCoordinator}</label>
                  <p className="font-medium">
                    {isRTL ? selectedPatientProgram.careCoordinatorAr : selectedPatientProgram.careCoordinator}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-slate-500">{t.status}</label>
                  <p>{getStatusBadge(selectedPatientProgram.status)}</p>
                </div>
              </div>
            </div>
            {selectedPatientProgram.outcomes && selectedPatientProgram.outcomes.length > 0 && (
              <div className="p-4 border-t border-slate-200">
                <label className="text-sm text-slate-500 block mb-2">{t.outcomes}</label>
                <ul className="list-disc list-inside space-y-1">
                  {selectedPatientProgram.outcomes.map((outcome, index) => (
                    <li key={index} className="text-sm">{outcome}</li>
                  ))}
                </ul>
              </div>
            )}
          </Card>
        )}
      </div>
    </MainLayout>
  );
}
