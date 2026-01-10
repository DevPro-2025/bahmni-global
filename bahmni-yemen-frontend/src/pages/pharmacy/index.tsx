import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import {
  Pill,
  Search,
  Package,
  ShoppingCart,
  AlertTriangle,
  CheckCircle,
  Clock,
  Plus,
  Filter,
  Printer,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

// Sample prescriptions (matching Bahmni DrugOrder structure)
const samplePrescriptions = [
  {
    uuid: 'rx-001',
    patient: { identifier: 'YEM-001', name: 'أحمد عبدالله محمد' },
    drug: { name: 'Amoxicillin 500mg', form: 'Capsule' },
    dose: '500',
    doseUnits: 'mg',
    frequency: 'Three times a day',
    duration: 7,
    durationUnits: 'Days',
    quantity: 21,
    instructions: 'Take after meals',
    orderer: { display: 'Dr. Mohammed Ali' },
    dateActivated: '2024-01-15T09:00:00',
    status: 'PENDING',
  },
  {
    uuid: 'rx-002',
    patient: { identifier: 'YEM-002', name: 'فاطمة علي أحمد' },
    drug: { name: 'Metformin 500mg', form: 'Tablet' },
    dose: '500',
    doseUnits: 'mg',
    frequency: 'Twice a day',
    duration: 30,
    durationUnits: 'Days',
    quantity: 60,
    instructions: 'Take with meals',
    orderer: { display: 'Dr. Sara Hassan' },
    dateActivated: '2024-01-15T10:30:00',
    status: 'DISPENSED',
  },
  {
    uuid: 'rx-003',
    patient: { identifier: 'YEM-003', name: 'محمد صالح العمري' },
    drug: { name: 'Amlodipine 5mg', form: 'Tablet' },
    dose: '5',
    doseUnits: 'mg',
    frequency: 'Once a day',
    duration: 30,
    durationUnits: 'Days',
    quantity: 30,
    instructions: 'Take in the morning',
    orderer: { display: 'Dr. Ahmed Saleh' },
    dateActivated: '2024-01-15T08:15:00',
    status: 'PENDING',
  },
  {
    uuid: 'rx-004',
    patient: { identifier: 'YEM-004', name: 'سارة محمد الحسني' },
    drug: { name: 'Paracetamol 500mg', form: 'Tablet' },
    dose: '1000',
    doseUnits: 'mg',
    frequency: 'As needed',
    duration: 5,
    durationUnits: 'Days',
    quantity: 20,
    instructions: 'Take when needed for pain or fever. Max 4 tablets per day.',
    orderer: { display: 'Dr. Fatima Omar' },
    dateActivated: '2024-01-14T14:00:00',
    status: 'DISPENSED',
  },
  {
    uuid: 'rx-005',
    patient: { identifier: 'YEM-001', name: 'أحمد عبدالله محمد' },
    drug: { name: 'Omeprazole 20mg', form: 'Capsule' },
    dose: '20',
    doseUnits: 'mg',
    frequency: 'Once a day',
    duration: 14,
    durationUnits: 'Days',
    quantity: 14,
    instructions: 'Take 30 minutes before breakfast',
    orderer: { display: 'Dr. Mohammed Ali' },
    dateActivated: '2024-01-15T09:00:00',
    status: 'PENDING',
  },
];

// Sample drug inventory
const sampleInventory = [
  { uuid: '1', name: 'Amoxicillin 500mg Capsule', stock: 500, minStock: 100, expiryDate: '2025-06-30', batchNo: 'AMX-2024-001' },
  { uuid: '2', name: 'Metformin 500mg Tablet', stock: 1200, minStock: 200, expiryDate: '2025-09-15', batchNo: 'MET-2024-002' },
  { uuid: '3', name: 'Amlodipine 5mg Tablet', stock: 45, minStock: 100, expiryDate: '2025-03-20', batchNo: 'AML-2024-003' },
  { uuid: '4', name: 'Paracetamol 500mg Tablet', stock: 2000, minStock: 500, expiryDate: '2025-12-31', batchNo: 'PAR-2024-004' },
  { uuid: '5', name: 'Omeprazole 20mg Capsule', stock: 300, minStock: 100, expiryDate: '2025-08-10', batchNo: 'OMP-2024-005' },
  { uuid: '6', name: 'Ciprofloxacin 500mg Tablet', stock: 20, minStock: 50, expiryDate: '2024-02-28', batchNo: 'CIP-2023-006' },
  { uuid: '7', name: 'Ibuprofen 400mg Tablet', stock: 800, minStock: 200, expiryDate: '2025-11-15', batchNo: 'IBU-2024-007' },
];

type PrescriptionStatus = 'PENDING' | 'DISPENSED' | 'CANCELLED';

export default function PharmacyPage() {
  const router = useRouter();
  const locale = router.locale || 'ar';
  const isRTL = locale === 'ar';

  const [activeTab, setActiveTab] = useState<'prescriptions' | 'dispense' | 'inventory'>('prescriptions');
  const [statusFilter, setStatusFilter] = useState<PrescriptionStatus | 'ALL'>('PENDING');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPrescription, setSelectedPrescription] = useState<typeof samplePrescriptions[0] | null>(null);

  const t = {
    title: isRTL ? 'الصيدلية' : 'Pharmacy',
    prescriptions: isRTL ? 'الوصفات' : 'Prescriptions',
    dispense: isRTL ? 'الصرف' : 'Dispense',
    inventory: isRTL ? 'المخزون' : 'Inventory',
    search: isRTL ? 'بحث...' : 'Search...',
    patient: isRTL ? 'المريض' : 'Patient',
    drug: isRTL ? 'الدواء' : 'Drug',
    dose: isRTL ? 'الجرعة' : 'Dose',
    frequency: isRTL ? 'التكرار' : 'Frequency',
    duration: isRTL ? 'المدة' : 'Duration',
    quantity: isRTL ? 'الكمية' : 'Quantity',
    instructions: isRTL ? 'التعليمات' : 'Instructions',
    prescribedBy: isRTL ? 'وصف بواسطة' : 'Prescribed By',
    status: isRTL ? 'الحالة' : 'Status',
    actions: isRTL ? 'الإجراءات' : 'Actions',
    pending: isRTL ? 'قيد الانتظار' : 'Pending',
    dispensed: isRTL ? 'تم الصرف' : 'Dispensed',
    cancelled: isRTL ? 'ملغي' : 'Cancelled',
    dispenseNow: isRTL ? 'صرف الآن' : 'Dispense Now',
    print: isRTL ? 'طباعة' : 'Print',
    all: isRTL ? 'الكل' : 'All',
    pendingPrescriptions: isRTL ? 'وصفات معلقة' : 'Pending Prescriptions',
    dispensedToday: isRTL ? 'صرف اليوم' : 'Dispensed Today',
    lowStock: isRTL ? 'نقص المخزون' : 'Low Stock',
    drugName: isRTL ? 'اسم الدواء' : 'Drug Name',
    stock: isRTL ? 'المخزون' : 'Stock',
    minStock: isRTL ? 'الحد الأدنى' : 'Min Stock',
    expiryDate: isRTL ? 'تاريخ الانتهاء' : 'Expiry Date',
    batchNo: isRTL ? 'رقم الدفعة' : 'Batch No',
    stockStatus: isRTL ? 'حالة المخزون' : 'Stock Status',
    inStock: isRTL ? 'متوفر' : 'In Stock',
    lowStockLabel: isRTL ? 'منخفض' : 'Low',
    outOfStock: isRTL ? 'نفد' : 'Out of Stock',
    expiringSoon: isRTL ? 'ينتهي قريباً' : 'Expiring Soon',
    close: isRTL ? 'إغلاق' : 'Close',
    confirm: isRTL ? 'تأكيد' : 'Confirm',
    confirmDispense: isRTL ? 'تأكيد الصرف' : 'Confirm Dispense',
    dispensedQuantity: isRTL ? 'الكمية المصروفة' : 'Dispensed Quantity',
    patientId: isRTL ? 'رقم المريض' : 'Patient ID',
    days: isRTL ? 'أيام' : 'Days',
  };

  const getStatusColor = (status: PrescriptionStatus) => {
    switch (status) {
      case 'PENDING':
        return 'warning';
      case 'DISPENSED':
        return 'success';
      case 'CANCELLED':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStockStatus = (item: typeof sampleInventory[0]) => {
    if (item.stock === 0) return { label: t.outOfStock, variant: 'error' as const };
    if (item.stock < item.minStock) return { label: t.lowStockLabel, variant: 'warning' as const };
    return { label: t.inStock, variant: 'success' as const };
  };

  const isExpiringSoon = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const today = new Date();
    const monthsUntilExpiry = (expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24 * 30);
    return monthsUntilExpiry < 3;
  };

  const filteredPrescriptions = samplePrescriptions.filter(rx => {
    const matchesStatus = statusFilter === 'ALL' || rx.status === statusFilter;
    const matchesSearch = searchQuery === '' || 
      rx.patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rx.patient.identifier.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rx.drug.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const filteredInventory = sampleInventory.filter(item =>
    searchQuery === '' || item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pendingCount = samplePrescriptions.filter(rx => rx.status === 'PENDING').length;
  const dispensedTodayCount = samplePrescriptions.filter(rx => rx.status === 'DISPENSED').length;
  const lowStockCount = sampleInventory.filter(item => item.stock < item.minStock).length;

  const handleDispense = (prescription: typeof samplePrescriptions[0]) => {
    setSelectedPrescription(prescription);
  };

  return (
    <>
      <Head>
        <title>{isRTL ? 'الصيدلية - النظام الصحي اليمني' : 'Pharmacy - Yemen Health System'}</title>
      </Head>

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Pill size={24} className="text-purple-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">{t.title}</h1>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-yellow-50 border-yellow-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-yellow-700">{t.pendingPrescriptions}</p>
                  <p className="text-3xl font-bold text-yellow-800">{pendingCount}</p>
                </div>
                <Clock size={32} className="text-yellow-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-700">{t.dispensedToday}</p>
                  <p className="text-3xl font-bold text-green-800">{dispensedTodayCount}</p>
                </div>
                <CheckCircle size={32} className="text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-red-50 border-red-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-red-700">{t.lowStock}</p>
                  <p className="text-3xl font-bold text-red-800">{lowStockCount}</p>
                </div>
                <AlertTriangle size={32} className="text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="border-b border-slate-200">
          <div className="flex gap-4">
            {(['prescriptions', 'inventory'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 font-medium border-b-2 transition-colors ${
                  activeTab === tab
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                {t[tab]}
              </button>
            ))}
          </div>
        </div>

        {/* Prescriptions Tab */}
        {activeTab === 'prescriptions' && (
          <>
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search size={20} className={`absolute top-1/2 -translate-y-1/2 text-slate-400 ${isRTL ? 'right-3' : 'left-3'}`} />
                <input
                  type="text"
                  placeholder={t.search}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'}`}
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter size={20} className="text-slate-500" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as PrescriptionStatus | 'ALL')}
                  className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                >
                  <option value="ALL">{t.all}</option>
                  <option value="PENDING">{t.pending}</option>
                  <option value="DISPENSED">{t.dispensed}</option>
                </select>
              </div>
            </div>

            {/* Prescriptions Table */}
            <Card>
              <CardContent className="p-0 overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50">
                      <th className={`px-4 py-3 text-sm font-semibold text-slate-600 ${isRTL ? 'text-right' : 'text-left'}`}>{t.patient}</th>
                      <th className={`px-4 py-3 text-sm font-semibold text-slate-600 ${isRTL ? 'text-right' : 'text-left'}`}>{t.drug}</th>
                      <th className={`px-4 py-3 text-sm font-semibold text-slate-600 ${isRTL ? 'text-right' : 'text-left'}`}>{t.dose}</th>
                      <th className={`px-4 py-3 text-sm font-semibold text-slate-600 ${isRTL ? 'text-right' : 'text-left'}`}>{t.frequency}</th>
                      <th className={`px-4 py-3 text-sm font-semibold text-slate-600 ${isRTL ? 'text-right' : 'text-left'}`}>{t.quantity}</th>
                      <th className={`px-4 py-3 text-sm font-semibold text-slate-600 ${isRTL ? 'text-right' : 'text-left'}`}>{t.status}</th>
                      <th className={`px-4 py-3 text-sm font-semibold text-slate-600 ${isRTL ? 'text-right' : 'text-left'}`}>{t.actions}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPrescriptions.map((rx) => (
                      <tr key={rx.uuid} className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="px-4 py-3">
                          <div>
                            <p className="text-sm font-medium text-slate-800">{rx.patient.name}</p>
                            <p className="text-xs text-slate-500">{rx.patient.identifier}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div>
                            <p className="text-sm font-medium text-slate-800">{rx.drug.name}</p>
                            <p className="text-xs text-slate-500">{rx.drug.form}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-700">
                          {rx.dose} {rx.doseUnits}
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-700">{rx.frequency}</td>
                        <td className="px-4 py-3 text-sm text-slate-700">{rx.quantity}</td>
                        <td className="px-4 py-3">
                          <Badge variant={getStatusColor(rx.status as PrescriptionStatus)}>
                            {rx.status === 'PENDING' ? t.pending : t.dispensed}
                          </Badge>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            {rx.status === 'PENDING' && (
                              <Button size="sm" onClick={() => handleDispense(rx)}>
                                <ShoppingCart size={14} className={isRTL ? 'ml-1' : 'mr-1'} />
                                {t.dispenseNow}
                              </Button>
                            )}
                            <button className="p-1.5 text-slate-500 hover:text-purple-600 hover:bg-purple-50 rounded">
                              <Printer size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </>
        )}

        {/* Inventory Tab */}
        {activeTab === 'inventory' && (
          <>
            {/* Search */}
            <div className="flex-1 relative max-w-md">
              <Search size={20} className={`absolute top-1/2 -translate-y-1/2 text-slate-400 ${isRTL ? 'right-3' : 'left-3'}`} />
              <input
                type="text"
                placeholder={t.search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'}`}
              />
            </div>

            {/* Inventory Table */}
            <Card>
              <CardContent className="p-0 overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50">
                      <th className={`px-4 py-3 text-sm font-semibold text-slate-600 ${isRTL ? 'text-right' : 'text-left'}`}>{t.drugName}</th>
                      <th className={`px-4 py-3 text-sm font-semibold text-slate-600 ${isRTL ? 'text-right' : 'text-left'}`}>{t.batchNo}</th>
                      <th className={`px-4 py-3 text-sm font-semibold text-slate-600 ${isRTL ? 'text-right' : 'text-left'}`}>{t.stock}</th>
                      <th className={`px-4 py-3 text-sm font-semibold text-slate-600 ${isRTL ? 'text-right' : 'text-left'}`}>{t.minStock}</th>
                      <th className={`px-4 py-3 text-sm font-semibold text-slate-600 ${isRTL ? 'text-right' : 'text-left'}`}>{t.expiryDate}</th>
                      <th className={`px-4 py-3 text-sm font-semibold text-slate-600 ${isRTL ? 'text-right' : 'text-left'}`}>{t.stockStatus}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInventory.map((item) => {
                      const stockStatus = getStockStatus(item);
                      const expiringSoon = isExpiringSoon(item.expiryDate);
                      return (
                        <tr key={item.uuid} className="border-b border-slate-100 hover:bg-slate-50">
                          <td className="px-4 py-3 text-sm font-medium text-slate-800">{item.name}</td>
                          <td className="px-4 py-3 text-sm text-slate-600">{item.batchNo}</td>
                          <td className={`px-4 py-3 text-sm font-medium ${item.stock < item.minStock ? 'text-red-600' : 'text-slate-700'}`}>
                            {item.stock}
                          </td>
                          <td className="px-4 py-3 text-sm text-slate-600">{item.minStock}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <span className={`text-sm ${expiringSoon ? 'text-red-600 font-medium' : 'text-slate-600'}`}>
                                {item.expiryDate}
                              </span>
                              {expiringSoon && (
                                <Badge variant="error">{t.expiringSoon}</Badge>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <Badge variant={stockStatus.variant}>{stockStatus.label}</Badge>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </>
        )}

        {/* Dispense Modal */}
        {selectedPrescription && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-lg">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{t.confirmDispense}</span>
                  <button onClick={() => setSelectedPrescription(null)} className="text-slate-400 hover:text-slate-600">
                    ×
                  </button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-lg space-y-2">
                  <p><strong>{t.patient}:</strong> {selectedPrescription.patient.name}</p>
                  <p><strong>{t.patientId}:</strong> {selectedPrescription.patient.identifier}</p>
                  <p><strong>{t.drug}:</strong> {selectedPrescription.drug.name}</p>
                  <p><strong>{t.dose}:</strong> {selectedPrescription.dose} {selectedPrescription.doseUnits}</p>
                  <p><strong>{t.frequency}:</strong> {selectedPrescription.frequency}</p>
                  <p><strong>{t.duration}:</strong> {selectedPrescription.duration} {t.days}</p>
                  <p><strong>{t.quantity}:</strong> {selectedPrescription.quantity}</p>
                  <p><strong>{t.instructions}:</strong> {selectedPrescription.instructions}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    {t.dispensedQuantity}
                  </label>
                  <input
                    type="number"
                    defaultValue={selectedPrescription.quantity}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setSelectedPrescription(null)}>
                    {t.close}
                  </Button>
                  <Button onClick={() => setSelectedPrescription(null)}>
                    <CheckCircle size={16} className={isRTL ? 'ml-2' : 'mr-2'} />
                    {t.confirm}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </>
  );
}
