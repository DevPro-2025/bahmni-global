'use client';

import React, { useState } from 'react';
import { MainLayout } from '@/components/layout';
import { Card, Button, Badge } from '@/components/ui';
import {
  FileText,
  Upload,
  Download,
  Trash2,
  Eye,
  Search,
  Filter,
  Calendar,
  User,
  Image,
  File,
  FileImage,
  FileScan,
  Plus,
  FolderOpen,
  AlertCircle,
} from 'lucide-react';

// Document Upload Module - Matches Bahmni document-upload module
// Patient document management: medical records, scans, reports, images

type DocumentType = 'MEDICAL_RECORD' | 'LAB_REPORT' | 'RADIOLOGY' | 'PRESCRIPTION' | 'CONSENT' | 'ID_DOCUMENT' | 'OTHER';
type DocumentFormat = 'PDF' | 'IMAGE' | 'DICOM';

interface PatientDocument {
  id: string;
  patient: {
    id: string;
    identifier: string;
    name: string;
    nameAr: string;
  };
  fileName: string;
  fileSize: number; // in KB
  documentType: DocumentType;
  format: DocumentFormat;
  uploadDate: string;
  uploadedBy: string;
  uploadedByAr: string;
  description?: string;
  descriptionAr?: string;
  encounterDate?: string;
  tags?: string[];
}

const mockDocuments: PatientDocument[] = [
  {
    id: '1',
    patient: { id: '1', identifier: 'YEM-001', name: 'Ahmed Mohammed', nameAr: 'أحمد محمد' },
    fileName: 'chest_xray_2024.jpg',
    fileSize: 2450,
    documentType: 'RADIOLOGY',
    format: 'IMAGE',
    uploadDate: '2024-01-08',
    uploadedBy: 'Dr. Ali Hassan',
    uploadedByAr: 'د. علي حسن',
    description: 'Chest X-Ray - Pneumonia follow-up',
    descriptionAr: 'أشعة سينية للصدر - متابعة الالتهاب الرئوي',
    encounterDate: '2024-01-08',
    tags: ['xray', 'chest', 'pneumonia'],
  },
  {
    id: '2',
    patient: { id: '1', identifier: 'YEM-001', name: 'Ahmed Mohammed', nameAr: 'أحمد محمد' },
    fileName: 'blood_test_results.pdf',
    fileSize: 156,
    documentType: 'LAB_REPORT',
    format: 'PDF',
    uploadDate: '2024-01-07',
    uploadedBy: 'Lab Technician',
    uploadedByAr: 'فني المختبر',
    description: 'Complete Blood Count (CBC)',
    descriptionAr: 'تحليل دم شامل',
    encounterDate: '2024-01-07',
    tags: ['cbc', 'blood'],
  },
  {
    id: '3',
    patient: { id: '2', identifier: 'YEM-002', name: 'Fatima Ali', nameAr: 'فاطمة علي' },
    fileName: 'ultrasound_pregnancy.jpg',
    fileSize: 3200,
    documentType: 'RADIOLOGY',
    format: 'IMAGE',
    uploadDate: '2024-01-09',
    uploadedBy: 'Dr. Salma Mohammed',
    uploadedByAr: 'د. سلمى محمد',
    description: 'Pregnancy ultrasound - 38 weeks',
    descriptionAr: 'سونار الحمل - 38 أسبوع',
    encounterDate: '2024-01-09',
    tags: ['ultrasound', 'pregnancy'],
  },
  {
    id: '4',
    patient: { id: '3', identifier: 'YEM-003', name: 'Mohammed Saleh', nameAr: 'محمد صالح' },
    fileName: 'consent_form_surgery.pdf',
    fileSize: 89,
    documentType: 'CONSENT',
    format: 'PDF',
    uploadDate: '2024-01-10',
    uploadedBy: 'Nurse Sara',
    uploadedByAr: 'الممرضة سارة',
    description: 'Surgery consent form - Hip replacement',
    descriptionAr: 'نموذج موافقة الجراحة - استبدال مفصل الورك',
    encounterDate: '2024-01-10',
    tags: ['consent', 'surgery'],
  },
  {
    id: '5',
    patient: { id: '4', identifier: 'YEM-004', name: 'Sara Abdullah', nameAr: 'سارة عبدالله' },
    fileName: 'national_id.jpg',
    fileSize: 450,
    documentType: 'ID_DOCUMENT',
    format: 'IMAGE',
    uploadDate: '2024-01-05',
    uploadedBy: 'Registration Clerk',
    uploadedByAr: 'موظف التسجيل',
    description: 'National ID Card',
    descriptionAr: 'البطاقة الشخصية',
    tags: ['id', 'identity'],
  },
  {
    id: '6',
    patient: { id: '5', identifier: 'YEM-005', name: 'Khalid Omar', nameAr: 'خالد عمر' },
    fileName: 'ecg_report.pdf',
    fileSize: 245,
    documentType: 'MEDICAL_RECORD',
    format: 'PDF',
    uploadDate: '2024-01-08',
    uploadedBy: 'Dr. Hassan Mohammed',
    uploadedByAr: 'د. حسن محمد',
    description: 'ECG Report - Pre-surgery',
    descriptionAr: 'تقرير تخطيط القلب - قبل الجراحة',
    encounterDate: '2024-01-08',
    tags: ['ecg', 'cardiac', 'pre-surgery'],
  },
];

export default function DocumentsPage() {
  const [locale, setLocale] = useState<'ar' | 'en'>('ar');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<DocumentType | 'ALL'>('ALL');
  const [selectedPatient, setSelectedPatient] = useState<string>('');
  const [selectedDocument, setSelectedDocument] = useState<PatientDocument | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const isRTL = locale === 'ar';

  const t = {
    title: isRTL ? 'إدارة المستندات' : 'Document Management',
    subtitle: isRTL ? 'رفع وإدارة مستندات المرضى' : 'Upload and manage patient documents',
    uploadDocument: isRTL ? 'رفع مستند' : 'Upload Document',
    searchPlaceholder: isRTL ? 'البحث بالاسم أو رقم المريض...' : 'Search by name or patient ID...',
    allTypes: isRTL ? 'جميع الأنواع' : 'All Types',
    medicalRecord: isRTL ? 'سجل طبي' : 'Medical Record',
    labReport: isRTL ? 'تقرير مختبر' : 'Lab Report',
    radiology: isRTL ? 'أشعة' : 'Radiology',
    prescription: isRTL ? 'وصفة طبية' : 'Prescription',
    consent: isRTL ? 'موافقة' : 'Consent',
    idDocument: isRTL ? 'وثيقة هوية' : 'ID Document',
    other: isRTL ? 'أخرى' : 'Other',
    fileName: isRTL ? 'اسم الملف' : 'File Name',
    patient: isRTL ? 'المريض' : 'Patient',
    type: isRTL ? 'النوع' : 'Type',
    uploadDate: isRTL ? 'تاريخ الرفع' : 'Upload Date',
    uploadedBy: isRTL ? 'تم الرفع بواسطة' : 'Uploaded By',
    size: isRTL ? 'الحجم' : 'Size',
    actions: isRTL ? 'الإجراءات' : 'Actions',
    view: isRTL ? 'عرض' : 'View',
    download: isRTL ? 'تحميل' : 'Download',
    delete: isRTL ? 'حذف' : 'Delete',
    documentDetails: isRTL ? 'تفاصيل المستند' : 'Document Details',
    description: isRTL ? 'الوصف' : 'Description',
    encounterDate: isRTL ? 'تاريخ الزيارة' : 'Encounter Date',
    tags: isRTL ? 'التصنيفات' : 'Tags',
    recentUploads: isRTL ? 'آخر الملفات المرفوعة' : 'Recent Uploads',
    documentsByType: isRTL ? 'المستندات حسب النوع' : 'Documents by Type',
    totalDocuments: isRTL ? 'إجمالي المستندات' : 'Total Documents',
    totalSize: isRTL ? 'الحجم الإجمالي' : 'Total Size',
    kb: isRTL ? 'ك.ب' : 'KB',
    mb: isRTL ? 'م.ب' : 'MB',
  };

  const getDocumentTypeLabel = (type: DocumentType) => {
    switch (type) {
      case 'MEDICAL_RECORD': return t.medicalRecord;
      case 'LAB_REPORT': return t.labReport;
      case 'RADIOLOGY': return t.radiology;
      case 'PRESCRIPTION': return t.prescription;
      case 'CONSENT': return t.consent;
      case 'ID_DOCUMENT': return t.idDocument;
      case 'OTHER': return t.other;
    }
  };

  const getDocumentIcon = (format: DocumentFormat) => {
    switch (format) {
      case 'PDF': return <File size={20} className="text-red-500" />;
      case 'IMAGE': return <FileImage size={20} className="text-blue-500" />;
      case 'DICOM': return <FileScan size={20} className="text-purple-500" />;
    }
  };

  const getDocumentTypeBadgeColor = (type: DocumentType): 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'secondary' => {
    switch (type) {
      case 'MEDICAL_RECORD': return 'primary';
      case 'LAB_REPORT': return 'success';
      case 'RADIOLOGY': return 'info';
      case 'PRESCRIPTION': return 'warning';
      case 'CONSENT': return 'secondary';
      case 'ID_DOCUMENT': return 'danger';
      case 'OTHER': return 'secondary';
    }
  };

  const formatFileSize = (sizeInKB: number) => {
    if (sizeInKB >= 1024) {
      return `${(sizeInKB / 1024).toFixed(1)} ${t.mb}`;
    }
    return `${sizeInKB} ${t.kb}`;
  };

  const filteredDocuments = mockDocuments.filter((doc) => {
    const matchesSearch =
      doc.patient.identifier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.patient.nameAr.includes(searchTerm) ||
      doc.fileName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'ALL' || doc.documentType === selectedType;
    return matchesSearch && matchesType;
  });

  // Calculate statistics
  const stats = {
    total: mockDocuments.length,
    totalSize: mockDocuments.reduce((acc, doc) => acc + doc.fileSize, 0),
    byType: {
      medicalRecord: mockDocuments.filter(d => d.documentType === 'MEDICAL_RECORD').length,
      labReport: mockDocuments.filter(d => d.documentType === 'LAB_REPORT').length,
      radiology: mockDocuments.filter(d => d.documentType === 'RADIOLOGY').length,
      prescription: mockDocuments.filter(d => d.documentType === 'PRESCRIPTION').length,
      consent: mockDocuments.filter(d => d.documentType === 'CONSENT').length,
      idDocument: mockDocuments.filter(d => d.documentType === 'ID_DOCUMENT').length,
    },
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
              <FileText className="text-primary-500" />
              {t.title}
            </h1>
            <p className="text-slate-500 mt-1">{t.subtitle}</p>
          </div>
          <Button onClick={() => setShowUploadModal(true)}>
            <Upload size={18} className={isRTL ? 'ml-2' : 'mr-2'} />
            {t.uploadDocument}
          </Button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                <FolderOpen className="text-primary-500" size={20} />
              </div>
              <div>
                <div className="text-sm text-slate-500">{t.totalDocuments}</div>
                <div className="text-xl font-bold text-slate-800">{stats.total}</div>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <File className="text-green-500" size={20} />
              </div>
              <div>
                <div className="text-sm text-slate-500">{t.totalSize}</div>
                <div className="text-xl font-bold text-slate-800">{formatFileSize(stats.totalSize)}</div>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileScan className="text-blue-500" size={20} />
              </div>
              <div>
                <div className="text-sm text-slate-500">{t.radiology}</div>
                <div className="text-xl font-bold text-slate-800">{stats.byType.radiology}</div>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <FileText className="text-yellow-500" size={20} />
              </div>
              <div>
                <div className="text-sm text-slate-500">{t.labReport}</div>
                <div className="text-xl font-bold text-slate-800">{stats.byType.labReport}</div>
              </div>
            </div>
          </Card>
        </div>

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
            <div className="flex items-center gap-2">
              <Filter size={20} className="text-slate-400" />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as DocumentType | 'ALL')}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              >
                <option value="ALL">{t.allTypes}</option>
                <option value="MEDICAL_RECORD">{t.medicalRecord}</option>
                <option value="LAB_REPORT">{t.labReport}</option>
                <option value="RADIOLOGY">{t.radiology}</option>
                <option value="PRESCRIPTION">{t.prescription}</option>
                <option value="CONSENT">{t.consent}</option>
                <option value="ID_DOCUMENT">{t.idDocument}</option>
                <option value="OTHER">{t.other}</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Documents Table */}
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-start text-sm font-medium text-slate-600">{t.fileName}</th>
                  <th className="px-4 py-3 text-start text-sm font-medium text-slate-600">{t.patient}</th>
                  <th className="px-4 py-3 text-start text-sm font-medium text-slate-600">{t.type}</th>
                  <th className="px-4 py-3 text-start text-sm font-medium text-slate-600">{t.uploadDate}</th>
                  <th className="px-4 py-3 text-start text-sm font-medium text-slate-600">{t.size}</th>
                  <th className="px-4 py-3 text-start text-sm font-medium text-slate-600">{t.actions}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredDocuments.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {getDocumentIcon(doc.format)}
                        <div>
                          <div className="text-sm font-medium text-slate-800">{doc.fileName}</div>
                          <div className="text-xs text-slate-500">
                            {isRTL ? doc.descriptionAr : doc.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
                          <User size={14} className="text-slate-500" />
                        </div>
                        <div>
                          <div className="text-sm font-medium">
                            {isRTL ? doc.patient.nameAr : doc.patient.name}
                          </div>
                          <div className="text-xs text-slate-500">{doc.patient.identifier}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={getDocumentTypeBadgeColor(doc.documentType)}>
                        {getDocumentTypeLabel(doc.documentType)}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 text-sm text-slate-600">
                        <Calendar size={14} className="text-slate-400" />
                        {doc.uploadDate}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">
                      {formatFileSize(doc.fileSize)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedDocument(doc)}
                        >
                          <Eye size={14} className={isRTL ? 'ml-1' : 'mr-1'} />
                          {t.view}
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download size={14} />
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-500 hover:bg-red-50">
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredDocuments.length === 0 && (
              <div className="text-center py-12">
                <AlertCircle size={48} className="mx-auto text-slate-300 mb-4" />
                <p className="text-slate-500">
                  {isRTL ? 'لا توجد مستندات' : 'No documents found'}
                </p>
              </div>
            )}
          </div>
        </Card>

        {/* Document Details Panel */}
        {selectedDocument && (
          <Card>
            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
              <h2 className="font-semibold text-slate-800">{t.documentDetails}</h2>
              <button
                onClick={() => setSelectedDocument(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                ×
              </button>
            </div>
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-slate-500">{t.fileName}</label>
                  <p className="font-medium flex items-center gap-2">
                    {getDocumentIcon(selectedDocument.format)}
                    {selectedDocument.fileName}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-slate-500">{t.patient}</label>
                  <p className="font-medium">
                    {isRTL ? selectedDocument.patient.nameAr : selectedDocument.patient.name}
                    <span className="text-primary-600 ms-2">({selectedDocument.patient.identifier})</span>
                  </p>
                </div>
                <div>
                  <label className="text-sm text-slate-500">{t.type}</label>
                  <p>
                    <Badge variant={getDocumentTypeBadgeColor(selectedDocument.documentType)}>
                      {getDocumentTypeLabel(selectedDocument.documentType)}
                    </Badge>
                  </p>
                </div>
                <div>
                  <label className="text-sm text-slate-500">{t.description}</label>
                  <p className="font-medium">
                    {isRTL ? selectedDocument.descriptionAr : selectedDocument.description}
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-slate-500">{t.uploadDate}</label>
                  <p className="font-medium">{selectedDocument.uploadDate}</p>
                </div>
                <div>
                  <label className="text-sm text-slate-500">{t.uploadedBy}</label>
                  <p className="font-medium">
                    {isRTL ? selectedDocument.uploadedByAr : selectedDocument.uploadedBy}
                  </p>
                </div>
                {selectedDocument.encounterDate && (
                  <div>
                    <label className="text-sm text-slate-500">{t.encounterDate}</label>
                    <p className="font-medium">{selectedDocument.encounterDate}</p>
                  </div>
                )}
                <div>
                  <label className="text-sm text-slate-500">{t.size}</label>
                  <p className="font-medium">{formatFileSize(selectedDocument.fileSize)}</p>
                </div>
                {selectedDocument.tags && (
                  <div>
                    <label className="text-sm text-slate-500">{t.tags}</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {selectedDocument.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="p-4 border-t border-slate-200 flex gap-2">
              <Button>
                <Download size={18} className={isRTL ? 'ml-2' : 'mr-2'} />
                {t.download}
              </Button>
              <Button variant="outline" className="text-red-500 hover:bg-red-50">
                <Trash2 size={18} className={isRTL ? 'ml-2' : 'mr-2'} />
                {t.delete}
              </Button>
            </div>
          </Card>
        )}
      </div>
    </MainLayout>
  );
}
