'use client';

import React, { useState } from 'react';
import { MainLayout } from '@/components/layout';
import { Card, Button, Badge } from '@/components/ui';
import {
  BedDouble,
  User,
  Search,
  Plus,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Clock,
  XCircle,
} from 'lucide-react';

// Bed Management - Matches Bahmni bedmanagement module
// Shows ward layout, bed status, and patient assignments

type BedStatus = 'AVAILABLE' | 'OCCUPIED' | 'RESERVED' | 'HOUSEKEEPING' | 'OUT_OF_SERVICE';

interface Bed {
  id: string;
  number: string;
  status: BedStatus;
  patient?: {
    id: string;
    identifier: string;
    name: string;
    nameAr: string;
    gender: 'M' | 'F';
    age: number;
    admissionDate: string;
    diagnosis: string;
    diagnosisAr: string;
  };
  type: 'NORMAL' | 'ICU' | 'ISOLATION' | 'PEDIATRIC';
}

interface Ward {
  id: string;
  name: string;
  nameAr: string;
  floor: number;
  beds: Bed[];
}

const mockWards: Ward[] = [
  {
    id: 'w1',
    name: 'General Ward A',
    nameAr: 'الجناح العام أ',
    floor: 1,
    beds: [
      {
        id: 'b1', number: 'GW-101', status: 'OCCUPIED', type: 'NORMAL',
        patient: {
          id: '1', identifier: 'YEM-001', name: 'Ahmed Mohammed', nameAr: 'أحمد محمد',
          gender: 'M', age: 45, admissionDate: '2024-01-05', diagnosis: 'Pneumonia', diagnosisAr: 'التهاب رئوي'
        }
      },
      { id: 'b2', number: 'GW-102', status: 'AVAILABLE', type: 'NORMAL' },
      {
        id: 'b3', number: 'GW-103', status: 'OCCUPIED', type: 'NORMAL',
        patient: {
          id: '2', identifier: 'YEM-005', name: 'Saleh Al-Omari', nameAr: 'صالح العمري',
          gender: 'M', age: 62, admissionDate: '2024-01-07', diagnosis: 'Diabetes management', diagnosisAr: 'إدارة السكري'
        }
      },
      { id: 'b4', number: 'GW-104', status: 'RESERVED', type: 'NORMAL' },
      { id: 'b5', number: 'GW-105', status: 'HOUSEKEEPING', type: 'NORMAL' },
      { id: 'b6', number: 'GW-106', status: 'AVAILABLE', type: 'NORMAL' },
    ]
  },
  {
    id: 'w2',
    name: 'ICU',
    nameAr: 'العناية المركزة',
    floor: 2,
    beds: [
      {
        id: 'b7', number: 'ICU-01', status: 'OCCUPIED', type: 'ICU',
        patient: {
          id: '3', identifier: 'YEM-010', name: 'Khalid Hassan', nameAr: 'خالد حسن',
          gender: 'M', age: 58, admissionDate: '2024-01-08', diagnosis: 'Post-surgery monitoring', diagnosisAr: 'مراقبة ما بعد الجراحة'
        }
      },
      { id: 'b8', number: 'ICU-02', status: 'OCCUPIED', type: 'ICU',
        patient: {
          id: '4', identifier: 'YEM-012', name: 'Amina Saleh', nameAr: 'أمينة صالح',
          gender: 'F', age: 70, admissionDate: '2024-01-09', diagnosis: 'Cardiac care', diagnosisAr: 'رعاية القلب'
        }
      },
      { id: 'b9', number: 'ICU-03', status: 'AVAILABLE', type: 'ICU' },
      { id: 'b10', number: 'ICU-04', status: 'OUT_OF_SERVICE', type: 'ICU' },
    ]
  },
  {
    id: 'w3',
    name: 'Maternity Ward',
    nameAr: 'جناح الولادة',
    floor: 3,
    beds: [
      {
        id: 'b11', number: 'MW-201', status: 'OCCUPIED', type: 'NORMAL',
        patient: {
          id: '5', identifier: 'YEM-015', name: 'Fatima Ali', nameAr: 'فاطمة علي',
          gender: 'F', age: 28, admissionDate: '2024-01-09', diagnosis: 'Post-delivery care', diagnosisAr: 'رعاية ما بعد الولادة'
        }
      },
      { id: 'b12', number: 'MW-202', status: 'AVAILABLE', type: 'NORMAL' },
      { id: 'b13', number: 'MW-203', status: 'RESERVED', type: 'NORMAL' },
      { id: 'b14', number: 'MW-204', status: 'AVAILABLE', type: 'NORMAL' },
    ]
  },
  {
    id: 'w4',
    name: 'Pediatric Ward',
    nameAr: 'جناح الأطفال',
    floor: 3,
    beds: [
      {
        id: 'b15', number: 'PW-301', status: 'OCCUPIED', type: 'PEDIATRIC',
        patient: {
          id: '6', identifier: 'YEM-020', name: 'Omar Abdullah', nameAr: 'عمر عبدالله',
          gender: 'M', age: 5, admissionDate: '2024-01-08', diagnosis: 'Respiratory infection', diagnosisAr: 'عدوى تنفسية'
        }
      },
      { id: 'b16', number: 'PW-302', status: 'AVAILABLE', type: 'PEDIATRIC' },
      { id: 'b17', number: 'PW-303', status: 'AVAILABLE', type: 'PEDIATRIC' },
      { id: 'b18', number: 'PW-304', status: 'HOUSEKEEPING', type: 'PEDIATRIC' },
    ]
  },
];

export default function BedManagementPage() {
  const [locale, setLocale] = useState<'ar' | 'en'>('ar');
  const [selectedWard, setSelectedWard] = useState<string | 'all'>('all');
  const [selectedBed, setSelectedBed] = useState<Bed | null>(null);
  const [showAssignModal, setShowAssignModal] = useState(false);

  const isRTL = locale === 'ar';

  const t = {
    title: isRTL ? 'إدارة الأسرة' : 'Bed Management',
    subtitle: isRTL ? 'عرض وإدارة أسرة المستشفى' : 'View and manage hospital beds',
    allWards: isRTL ? 'جميع الأجنحة' : 'All Wards',
    floor: isRTL ? 'الطابق' : 'Floor',
    refresh: isRTL ? 'تحديث' : 'Refresh',
    available: isRTL ? 'متاح' : 'Available',
    occupied: isRTL ? 'مشغول' : 'Occupied',
    reserved: isRTL ? 'محجوز' : 'Reserved',
    housekeeping: isRTL ? 'تنظيف' : 'Housekeeping',
    outOfService: isRTL ? 'خارج الخدمة' : 'Out of Service',
    bedDetails: isRTL ? 'تفاصيل السرير' : 'Bed Details',
    bedNumber: isRTL ? 'رقم السرير' : 'Bed Number',
    bedType: isRTL ? 'نوع السرير' : 'Bed Type',
    bedStatus: isRTL ? 'حالة السرير' : 'Bed Status',
    patientInfo: isRTL ? 'معلومات المريض' : 'Patient Information',
    patientId: isRTL ? 'رقم المريض' : 'Patient ID',
    patientName: isRTL ? 'اسم المريض' : 'Patient Name',
    admissionDate: isRTL ? 'تاريخ الدخول' : 'Admission Date',
    diagnosis: isRTL ? 'التشخيص' : 'Diagnosis',
    assignPatient: isRTL ? 'تعيين مريض' : 'Assign Patient',
    discharge: isRTL ? 'إخراج' : 'Discharge',
    transfer: isRTL ? 'نقل' : 'Transfer',
    changeStatus: isRTL ? 'تغيير الحالة' : 'Change Status',
    normal: isRTL ? 'عادي' : 'Normal',
    icu: isRTL ? 'عناية مركزة' : 'ICU',
    isolation: isRTL ? 'عزل' : 'Isolation',
    pediatric: isRTL ? 'أطفال' : 'Pediatric',
    summary: isRTL ? 'ملخص الإشغال' : 'Occupancy Summary',
    total: isRTL ? 'الإجمالي' : 'Total',
  };

  const getBedStatusColor = (status: BedStatus) => {
    switch (status) {
      case 'AVAILABLE': return 'bg-green-100 border-green-500 text-green-700';
      case 'OCCUPIED': return 'bg-red-100 border-red-500 text-red-700';
      case 'RESERVED': return 'bg-yellow-100 border-yellow-500 text-yellow-700';
      case 'HOUSEKEEPING': return 'bg-blue-100 border-blue-500 text-blue-700';
      case 'OUT_OF_SERVICE': return 'bg-slate-100 border-slate-500 text-slate-700';
    }
  };

  const getBedStatusIcon = (status: BedStatus) => {
    switch (status) {
      case 'AVAILABLE': return <CheckCircle size={16} className="text-green-500" />;
      case 'OCCUPIED': return <User size={16} className="text-red-500" />;
      case 'RESERVED': return <Clock size={16} className="text-yellow-500" />;
      case 'HOUSEKEEPING': return <RefreshCw size={16} className="text-blue-500" />;
      case 'OUT_OF_SERVICE': return <XCircle size={16} className="text-slate-500" />;
    }
  };

  const getBedStatusLabel = (status: BedStatus) => {
    switch (status) {
      case 'AVAILABLE': return t.available;
      case 'OCCUPIED': return t.occupied;
      case 'RESERVED': return t.reserved;
      case 'HOUSEKEEPING': return t.housekeeping;
      case 'OUT_OF_SERVICE': return t.outOfService;
    }
  };

  const getBedTypeLabel = (type: Bed['type']) => {
    switch (type) {
      case 'NORMAL': return t.normal;
      case 'ICU': return t.icu;
      case 'ISOLATION': return t.isolation;
      case 'PEDIATRIC': return t.pediatric;
    }
  };

  const filteredWards = selectedWard === 'all'
    ? mockWards
    : mockWards.filter(w => w.id === selectedWard);

  // Calculate summary
  const allBeds = mockWards.flatMap(w => w.beds);
  const summary = {
    total: allBeds.length,
    available: allBeds.filter(b => b.status === 'AVAILABLE').length,
    occupied: allBeds.filter(b => b.status === 'OCCUPIED').length,
    reserved: allBeds.filter(b => b.status === 'RESERVED').length,
    housekeeping: allBeds.filter(b => b.status === 'HOUSEKEEPING').length,
    outOfService: allBeds.filter(b => b.status === 'OUT_OF_SERVICE').length,
  };

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
              <BedDouble className="text-primary-500" />
              {t.title}
            </h1>
            <p className="text-slate-500 mt-1">{t.subtitle}</p>
          </div>
          <div className="flex gap-2">
            <select
              value={selectedWard}
              onChange={(e) => setSelectedWard(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">{t.allWards}</option>
              {mockWards.map((ward) => (
                <option key={ward.id} value={ward.id}>
                  {isRTL ? ward.nameAr : ward.name}
                </option>
              ))}
            </select>
            <Button variant="outline">
              <RefreshCw size={18} className={isRTL ? 'ml-2' : 'mr-2'} />
              {t.refresh}
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card className="p-4">
            <div className="text-sm text-slate-500">{t.total}</div>
            <div className="text-2xl font-bold text-slate-800">{summary.total}</div>
          </Card>
          <Card className="p-4 border-l-4 border-l-green-500">
            <div className="text-sm text-slate-500">{t.available}</div>
            <div className="text-2xl font-bold text-green-600">{summary.available}</div>
          </Card>
          <Card className="p-4 border-l-4 border-l-red-500">
            <div className="text-sm text-slate-500">{t.occupied}</div>
            <div className="text-2xl font-bold text-red-600">{summary.occupied}</div>
          </Card>
          <Card className="p-4 border-l-4 border-l-yellow-500">
            <div className="text-sm text-slate-500">{t.reserved}</div>
            <div className="text-2xl font-bold text-yellow-600">{summary.reserved}</div>
          </Card>
          <Card className="p-4 border-l-4 border-l-blue-500">
            <div className="text-sm text-slate-500">{t.housekeeping}</div>
            <div className="text-2xl font-bold text-blue-600">{summary.housekeeping}</div>
          </Card>
          <Card className="p-4 border-l-4 border-l-slate-500">
            <div className="text-sm text-slate-500">{t.outOfService}</div>
            <div className="text-2xl font-bold text-slate-600">{summary.outOfService}</div>
          </Card>
        </div>

        {/* Legend */}
        <Card className="p-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-green-500" />
              <span className="text-sm">{t.available}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-red-500" />
              <span className="text-sm">{t.occupied}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-yellow-500" />
              <span className="text-sm">{t.reserved}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-blue-500" />
              <span className="text-sm">{t.housekeeping}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-slate-500" />
              <span className="text-sm">{t.outOfService}</span>
            </div>
          </div>
        </Card>

        {/* Wards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredWards.map((ward) => (
            <Card key={ward.id}>
              <div className="p-4 border-b border-slate-200 bg-slate-50">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-slate-800">
                    {isRTL ? ward.nameAr : ward.name}
                  </h2>
                  <Badge variant="secondary">
                    {t.floor} {ward.floor}
                  </Badge>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                  {ward.beds.map((bed) => (
                    <button
                      key={bed.id}
                      onClick={() => setSelectedBed(bed)}
                      className={`
                        p-3 rounded-lg border-2 transition-all hover:scale-105 cursor-pointer
                        ${getBedStatusColor(bed.status)}
                        ${selectedBed?.id === bed.id ? 'ring-2 ring-primary-500' : ''}
                      `}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <BedDouble size={16} />
                        {getBedStatusIcon(bed.status)}
                      </div>
                      <div className="font-medium text-sm">{bed.number}</div>
                      {bed.patient && (
                        <div className="text-xs mt-1 truncate">
                          {isRTL ? bed.patient.nameAr : bed.patient.name}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Selected Bed Details */}
        {selectedBed && (
          <Card>
            <div className="p-4 border-b border-slate-200 bg-slate-50">
              <h2 className="font-semibold text-slate-800">{t.bedDetails}</h2>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-slate-700 mb-3">
                    {t.bedDetails}
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-500">{t.bedNumber}:</span>
                      <span className="font-medium">{selectedBed.number}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">{t.bedType}:</span>
                      <span className="font-medium">{getBedTypeLabel(selectedBed.type)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">{t.bedStatus}:</span>
                      <Badge variant={
                        selectedBed.status === 'AVAILABLE' ? 'success' :
                        selectedBed.status === 'OCCUPIED' ? 'danger' :
                        selectedBed.status === 'RESERVED' ? 'warning' : 'secondary'
                      }>
                        {getBedStatusLabel(selectedBed.status)}
                      </Badge>
                    </div>
                  </div>
                </div>

                {selectedBed.patient && (
                  <div>
                    <h3 className="font-medium text-slate-700 mb-3">
                      {t.patientInfo}
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-500">{t.patientId}:</span>
                        <span className="font-medium text-primary-600">{selectedBed.patient.identifier}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">{t.patientName}:</span>
                        <span className="font-medium">
                          {isRTL ? selectedBed.patient.nameAr : selectedBed.patient.name}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">{t.admissionDate}:</span>
                        <span className="font-medium">{selectedBed.patient.admissionDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">{t.diagnosis}:</span>
                        <span className="font-medium">
                          {isRTL ? selectedBed.patient.diagnosisAr : selectedBed.patient.diagnosis}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 flex gap-2">
                {selectedBed.status === 'AVAILABLE' && (
                  <Button onClick={() => setShowAssignModal(true)}>
                    <Plus size={18} className={isRTL ? 'ml-2' : 'mr-2'} />
                    {t.assignPatient}
                  </Button>
                )}
                {selectedBed.status === 'OCCUPIED' && (
                  <>
                    <Button variant="outline">{t.discharge}</Button>
                    <Button variant="outline">{t.transfer}</Button>
                  </>
                )}
                <Button variant="outline">{t.changeStatus}</Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </MainLayout>
  );
}
