'use client';

import React, { useState } from 'react';
import { MainLayout } from '@/components/layout';
import { Card, Button, Input, Badge } from '@/components/ui';
import {
  ArrowRightLeft,
  LogIn,
  LogOut,
  RefreshCw,
  Search,
  User,
  BedDouble,
  Clock,
  AlertCircle,
} from 'lucide-react';

// ADT = Admission, Discharge, Transfer
// Matches Bahmni ADT module workflow

interface AdtPatient {
  id: string;
  identifier: string;
  name: string;
  nameAr: string;
  gender: 'M' | 'F';
  age: number;
  ward: string;
  wardAr: string;
  bed: string;
  admissionDate: string;
  admissionType: 'IPD' | 'EMERGENCY';
  status: 'ADMITTED' | 'AWAITING_DISCHARGE' | 'AWAITING_TRANSFER';
  diagnosis: string;
  diagnosisAr: string;
  attendingPhysician: string;
}

const mockPatients: AdtPatient[] = [
  {
    id: '1',
    identifier: 'YEM-001',
    name: 'Ahmed Abdullah Mohammed',
    nameAr: 'أحمد عبدالله محمد',
    gender: 'M',
    age: 45,
    ward: 'General Ward',
    wardAr: 'الجناح العام',
    bed: 'GW-101',
    admissionDate: '2024-01-05',
    admissionType: 'IPD',
    status: 'ADMITTED',
    diagnosis: 'Pneumonia',
    diagnosisAr: 'التهاب رئوي',
    attendingPhysician: 'Dr. Ali Hassan',
  },
  {
    id: '2',
    identifier: 'YEM-002',
    name: 'Fatima Ali Ahmed',
    nameAr: 'فاطمة علي أحمد',
    gender: 'F',
    age: 32,
    ward: 'Maternity Ward',
    wardAr: 'جناح الولادة',
    bed: 'MW-205',
    admissionDate: '2024-01-08',
    admissionType: 'IPD',
    status: 'AWAITING_DISCHARGE',
    diagnosis: 'Post-delivery care',
    diagnosisAr: 'رعاية ما بعد الولادة',
    attendingPhysician: 'Dr. Salma Mohammed',
  },
  {
    id: '3',
    identifier: 'YEM-003',
    name: 'Mohammed Saleh Al-Omari',
    nameAr: 'محمد صالح العمري',
    gender: 'M',
    age: 58,
    ward: 'ICU',
    wardAr: 'العناية المركزة',
    bed: 'ICU-02',
    admissionDate: '2024-01-07',
    admissionType: 'EMERGENCY',
    status: 'AWAITING_TRANSFER',
    diagnosis: 'Cardiac monitoring',
    diagnosisAr: 'مراقبة القلب',
    attendingPhysician: 'Dr. Khalid Ahmed',
  },
];

interface WardSummary {
  name: string;
  nameAr: string;
  totalBeds: number;
  occupied: number;
  available: number;
}

const wardSummaries: WardSummary[] = [
  { name: 'General Ward', nameAr: 'الجناح العام', totalBeds: 30, occupied: 24, available: 6 },
  { name: 'ICU', nameAr: 'العناية المركزة', totalBeds: 8, occupied: 6, available: 2 },
  { name: 'Maternity Ward', nameAr: 'جناح الولادة', totalBeds: 15, occupied: 10, available: 5 },
  { name: 'Pediatric Ward', nameAr: 'جناح الأطفال', totalBeds: 20, occupied: 12, available: 8 },
  { name: 'Surgery Ward', nameAr: 'جناح الجراحة', totalBeds: 25, occupied: 18, available: 7 },
];

export default function AdtPage() {
  const [locale, setLocale] = useState<'ar' | 'en'>('ar');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState<'admitted' | 'pending_discharge' | 'pending_transfer'>('admitted');
  const [selectedPatient, setSelectedPatient] = useState<AdtPatient | null>(null);
  const [showAdmitModal, setShowAdmitModal] = useState(false);

  const isRTL = locale === 'ar';

  const t = {
    title: isRTL ? 'إدارة الدخول والخروج والنقل' : 'Admission, Discharge & Transfer',
    subtitle: isRTL ? 'إدارة حركة المرضى داخل المستشفى' : 'Manage patient movement within the hospital',
    searchPlaceholder: isRTL ? 'البحث برقم المريض أو الاسم...' : 'Search by patient ID or name...',
    admitted: isRTL ? 'المرضى المقيمون' : 'Admitted Patients',
    pendingDischarge: isRTL ? 'بانتظار الخروج' : 'Pending Discharge',
    pendingTransfer: isRTL ? 'بانتظار النقل' : 'Pending Transfer',
    newAdmission: isRTL ? 'دخول جديد' : 'New Admission',
    patientId: isRTL ? 'رقم المريض' : 'Patient ID',
    patientName: isRTL ? 'اسم المريض' : 'Patient Name',
    ward: isRTL ? 'الجناح' : 'Ward',
    bed: isRTL ? 'السرير' : 'Bed',
    admissionDate: isRTL ? 'تاريخ الدخول' : 'Admission Date',
    diagnosis: isRTL ? 'التشخيص' : 'Diagnosis',
    status: isRTL ? 'الحالة' : 'Status',
    actions: isRTL ? 'الإجراءات' : 'Actions',
    admit: isRTL ? 'إدخال' : 'Admit',
    discharge: isRTL ? 'خروج' : 'Discharge',
    transfer: isRTL ? 'نقل' : 'Transfer',
    undo: isRTL ? 'تراجع' : 'Undo',
    wardOccupancy: isRTL ? 'إشغال الأجنحة' : 'Ward Occupancy',
    totalBeds: isRTL ? 'إجمالي الأسرة' : 'Total Beds',
    occupied: isRTL ? 'مشغول' : 'Occupied',
    available: isRTL ? 'متاح' : 'Available',
    gender: isRTL ? 'الجنس' : 'Gender',
    age: isRTL ? 'العمر' : 'Age',
    male: isRTL ? 'ذكر' : 'Male',
    female: isRTL ? 'أنثى' : 'Female',
    admissionType: isRTL ? 'نوع الدخول' : 'Admission Type',
    ipd: isRTL ? 'قسم داخلي' : 'IPD',
    emergency: isRTL ? 'طوارئ' : 'Emergency',
    attendingPhysician: isRTL ? 'الطبيب المعالج' : 'Attending Physician',
    statusAdmitted: isRTL ? 'مقيم' : 'Admitted',
    statusAwaitingDischarge: isRTL ? 'بانتظار الخروج' : 'Awaiting Discharge',
    statusAwaitingTransfer: isRTL ? 'بانتظار النقل' : 'Awaiting Transfer',
  };

  const getStatusBadge = (status: AdtPatient['status']) => {
    switch (status) {
      case 'ADMITTED':
        return <Badge variant="success">{t.statusAdmitted}</Badge>;
      case 'AWAITING_DISCHARGE':
        return <Badge variant="warning">{t.statusAwaitingDischarge}</Badge>;
      case 'AWAITING_TRANSFER':
        return <Badge variant="info">{t.statusAwaitingTransfer}</Badge>;
    }
  };

  const filteredPatients = mockPatients.filter((patient) => {
    const matchesSearch =
      patient.identifier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.nameAr.includes(searchTerm);

    const matchesTab =
      selectedTab === 'admitted'
        ? patient.status === 'ADMITTED'
        : selectedTab === 'pending_discharge'
        ? patient.status === 'AWAITING_DISCHARGE'
        : patient.status === 'AWAITING_TRANSFER';

    return matchesSearch && matchesTab;
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
              <ArrowRightLeft className="text-primary-500" />
              {t.title}
            </h1>
            <p className="text-slate-500 mt-1">{t.subtitle}</p>
          </div>
          <Button onClick={() => setShowAdmitModal(true)}>
            <LogIn size={18} className={isRTL ? 'ml-2' : 'mr-2'} />
            {t.newAdmission}
          </Button>
        </div>

        {/* Ward Occupancy Summary */}
        <Card>
          <div className="p-4 border-b border-slate-200">
            <h2 className="font-semibold text-slate-800">{t.wardOccupancy}</h2>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {wardSummaries.map((ward) => (
                <div key={ward.name} className="bg-slate-50 rounded-lg p-4">
                  <h3 className="font-medium text-slate-800">
                    {isRTL ? ward.nameAr : ward.name}
                  </h3>
                  <div className="mt-2 space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-500">{t.totalBeds}:</span>
                      <span className="font-medium">{ward.totalBeds}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-red-500">{t.occupied}:</span>
                      <span className="font-medium text-red-600">{ward.occupied}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-500">{t.available}:</span>
                      <span className="font-medium text-green-600">{ward.available}</span>
                    </div>
                  </div>
                  {/* Occupancy bar */}
                  <div className="mt-3 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        (ward.occupied / ward.totalBeds) > 0.9
                          ? 'bg-red-500'
                          : (ward.occupied / ward.totalBeds) > 0.7
                          ? 'bg-yellow-500'
                          : 'bg-green-500'
                      }`}
                      style={{ width: `${(ward.occupied / ward.totalBeds) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Tabs and Search */}
        <Card>
          <div className="p-4 border-b border-slate-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Tabs */}
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedTab('admitted')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedTab === 'admitted'
                      ? 'bg-primary-500 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {t.admitted}
                </button>
                <button
                  onClick={() => setSelectedTab('pending_discharge')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedTab === 'pending_discharge'
                      ? 'bg-primary-500 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {t.pendingDischarge}
                </button>
                <button
                  onClick={() => setSelectedTab('pending_transfer')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedTab === 'pending_transfer'
                      ? 'bg-primary-500 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {t.pendingTransfer}
                </button>
              </div>

              {/* Search */}
              <div className="relative w-full md:w-80">
                <Search className="absolute top-1/2 -translate-y-1/2 start-3 text-slate-400" size={20} />
                <input
                  type="text"
                  placeholder={t.searchPlaceholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full ps-10 pe-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>
          </div>

          {/* Patients Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-start text-sm font-medium text-slate-600">{t.patientId}</th>
                  <th className="px-4 py-3 text-start text-sm font-medium text-slate-600">{t.patientName}</th>
                  <th className="px-4 py-3 text-start text-sm font-medium text-slate-600">{t.ward}</th>
                  <th className="px-4 py-3 text-start text-sm font-medium text-slate-600">{t.bed}</th>
                  <th className="px-4 py-3 text-start text-sm font-medium text-slate-600">{t.admissionDate}</th>
                  <th className="px-4 py-3 text-start text-sm font-medium text-slate-600">{t.diagnosis}</th>
                  <th className="px-4 py-3 text-start text-sm font-medium text-slate-600">{t.status}</th>
                  <th className="px-4 py-3 text-start text-sm font-medium text-slate-600">{t.actions}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredPatients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 text-sm font-medium text-primary-600">{patient.identifier}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
                          <User size={16} className="text-slate-500" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-slate-800">
                            {isRTL ? patient.nameAr : patient.name}
                          </div>
                          <div className="text-xs text-slate-500">
                            {patient.gender === 'M' ? t.male : t.female}, {patient.age} {isRTL ? 'سنة' : 'years'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">{isRTL ? patient.wardAr : patient.ward}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 text-sm">
                        <BedDouble size={14} className="text-slate-400" />
                        {patient.bed}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">{patient.admissionDate}</td>
                    <td className="px-4 py-3 text-sm">{isRTL ? patient.diagnosisAr : patient.diagnosis}</td>
                    <td className="px-4 py-3">{getStatusBadge(patient.status)}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        {patient.status === 'ADMITTED' && (
                          <>
                            <Button variant="outline" size="sm">
                              <LogOut size={14} className={isRTL ? 'ml-1' : 'mr-1'} />
                              {t.discharge}
                            </Button>
                            <Button variant="outline" size="sm">
                              <RefreshCw size={14} className={isRTL ? 'ml-1' : 'mr-1'} />
                              {t.transfer}
                            </Button>
                          </>
                        )}
                        {patient.status === 'AWAITING_DISCHARGE' && (
                          <>
                            <Button variant="primary" size="sm">
                              {t.discharge}
                            </Button>
                            <Button variant="outline" size="sm">
                              {t.undo}
                            </Button>
                          </>
                        )}
                        {patient.status === 'AWAITING_TRANSFER' && (
                          <>
                            <Button variant="primary" size="sm">
                              {t.transfer}
                            </Button>
                            <Button variant="outline" size="sm">
                              {t.undo}
                            </Button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredPatients.length === 0 && (
              <div className="text-center py-12">
                <AlertCircle size={48} className="mx-auto text-slate-300 mb-4" />
                <p className="text-slate-500">
                  {isRTL ? 'لا توجد نتائج' : 'No results found'}
                </p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </MainLayout>
  );
}
