import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import {
  Receipt,
  Search,
  DollarSign,
  CreditCard,
  Clock,
  CheckCircle,
  AlertTriangle,
  Plus,
  Filter,
  Printer,
  Download,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

// Sample bills (matching Bahmni/Odoo billing structure)
const sampleBills = [
  {
    uuid: 'bill-001',
    billNumber: 'INV-2024-0001',
    patient: { identifier: 'YEM-001', name: 'أحمد عبدالله محمد' },
    billDate: '2024-01-15',
    lineItems: [
      { service: 'Consultation Fee', quantity: 1, unitPrice: 5000, total: 5000 },
      { service: 'Blood Test (CBC)', quantity: 1, unitPrice: 3000, total: 3000 },
      { service: 'Amoxicillin 500mg', quantity: 21, unitPrice: 100, total: 2100 },
    ],
    totalAmount: 10100,
    paidAmount: 10100,
    status: 'PAID',
    paymentMethod: 'CASH',
  },
  {
    uuid: 'bill-002',
    billNumber: 'INV-2024-0002',
    patient: { identifier: 'YEM-002', name: 'فاطمة علي أحمد' },
    billDate: '2024-01-15',
    lineItems: [
      { service: 'Consultation Fee', quantity: 1, unitPrice: 5000, total: 5000 },
      { service: 'Metformin 500mg', quantity: 60, unitPrice: 50, total: 3000 },
    ],
    totalAmount: 8000,
    paidAmount: 5000,
    status: 'PARTIALLY_PAID',
    paymentMethod: 'CASH',
  },
  {
    uuid: 'bill-003',
    billNumber: 'INV-2024-0003',
    patient: { identifier: 'YEM-003', name: 'محمد صالح العمري' },
    billDate: '2024-01-15',
    lineItems: [
      { service: 'Emergency Consultation', quantity: 1, unitPrice: 8000, total: 8000 },
      { service: 'X-Ray Chest', quantity: 1, unitPrice: 5000, total: 5000 },
      { service: 'ECG', quantity: 1, unitPrice: 3000, total: 3000 },
    ],
    totalAmount: 16000,
    paidAmount: 0,
    status: 'PENDING',
    paymentMethod: null,
  },
  {
    uuid: 'bill-004',
    billNumber: 'INV-2024-0004',
    patient: { identifier: 'YEM-004', name: 'سارة محمد الحسني' },
    billDate: '2024-01-14',
    lineItems: [
      { service: 'Consultation Fee', quantity: 1, unitPrice: 5000, total: 5000 },
      { service: 'Urinalysis', quantity: 1, unitPrice: 2000, total: 2000 },
      { service: 'Paracetamol 500mg', quantity: 20, unitPrice: 30, total: 600 },
    ],
    totalAmount: 7600,
    paidAmount: 7600,
    status: 'PAID',
    paymentMethod: 'CARD',
  },
  {
    uuid: 'bill-005',
    billNumber: 'INV-2024-0005',
    patient: { identifier: 'YEM-005', name: 'عبدالله أحمد السعيدي' },
    billDate: '2024-01-14',
    lineItems: [
      { service: 'Consultation Fee', quantity: 1, unitPrice: 5000, total: 5000 },
      { service: 'Malaria Rapid Test', quantity: 1, unitPrice: 2500, total: 2500 },
    ],
    totalAmount: 7500,
    paidAmount: 7500,
    status: 'PAID',
    paymentMethod: 'CASH',
  },
];

// Sample billable services
const billableServices = [
  { uuid: '1', name: 'Consultation Fee', category: 'CONSULTATION', price: 5000 },
  { uuid: '2', name: 'Emergency Consultation', category: 'CONSULTATION', price: 8000 },
  { uuid: '3', name: 'Specialist Consultation', category: 'CONSULTATION', price: 10000 },
  { uuid: '4', name: 'Complete Blood Count', category: 'INVESTIGATION', price: 3000 },
  { uuid: '5', name: 'Urinalysis', category: 'INVESTIGATION', price: 2000 },
  { uuid: '6', name: 'Liver Function Test', category: 'INVESTIGATION', price: 4500 },
  { uuid: '7', name: 'X-Ray', category: 'INVESTIGATION', price: 5000 },
  { uuid: '8', name: 'Ultrasound', category: 'INVESTIGATION', price: 8000 },
];

type BillStatus = 'PENDING' | 'PARTIALLY_PAID' | 'PAID' | 'CANCELLED';

export default function BillingPage() {
  const router = useRouter();
  const locale = router.locale || 'ar';
  const isRTL = locale === 'ar';

  const [activeTab, setActiveTab] = useState<'bills' | 'payments' | 'services'>('bills');
  const [statusFilter, setStatusFilter] = useState<BillStatus | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBill, setSelectedBill] = useState<typeof sampleBills[0] | null>(null);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'CASH' | 'CARD' | 'INSURANCE'>('CASH');

  // Currency formatting for Yemeni Rial
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(isRTL ? 'ar-YE' : 'en-YE', {
      style: 'decimal',
      minimumFractionDigits: 0,
    }).format(amount) + (isRTL ? ' ر.ي' : ' YER');
  };

  const t = {
    title: isRTL ? 'الفوترة' : 'Billing',
    bills: isRTL ? 'الفواتير' : 'Bills',
    payments: isRTL ? 'المدفوعات' : 'Payments',
    services: isRTL ? 'الخدمات' : 'Services',
    search: isRTL ? 'بحث...' : 'Search...',
    billNumber: isRTL ? 'رقم الفاتورة' : 'Bill #',
    patient: isRTL ? 'المريض' : 'Patient',
    date: isRTL ? 'التاريخ' : 'Date',
    totalAmount: isRTL ? 'المبلغ الإجمالي' : 'Total Amount',
    paidAmount: isRTL ? 'المبلغ المدفوع' : 'Paid Amount',
    balance: isRTL ? 'المتبقي' : 'Balance',
    status: isRTL ? 'الحالة' : 'Status',
    actions: isRTL ? 'الإجراءات' : 'Actions',
    pending: isRTL ? 'قيد الانتظار' : 'Pending',
    partiallyPaid: isRTL ? 'مدفوع جزئياً' : 'Partially Paid',
    paid: isRTL ? 'مدفوع' : 'Paid',
    cancelled: isRTL ? 'ملغي' : 'Cancelled',
    recordPayment: isRTL ? 'تسجيل دفعة' : 'Record Payment',
    print: isRTL ? 'طباعة' : 'Print',
    view: isRTL ? 'عرض' : 'View',
    all: isRTL ? 'الكل' : 'All',
    todayRevenue: isRTL ? 'إيرادات اليوم' : "Today's Revenue",
    pendingPayments: isRTL ? 'مدفوعات معلقة' : 'Pending Payments',
    totalBills: isRTL ? 'إجمالي الفواتير' : 'Total Bills',
    serviceName: isRTL ? 'اسم الخدمة' : 'Service Name',
    category: isRTL ? 'الفئة' : 'Category',
    price: isRTL ? 'السعر' : 'Price',
    consultation: isRTL ? 'استشارة' : 'Consultation',
    investigation: isRTL ? 'فحص' : 'Investigation',
    procedure: isRTL ? 'إجراء' : 'Procedure',
    drug: isRTL ? 'دواء' : 'Drug',
    close: isRTL ? 'إغلاق' : 'Close',
    confirm: isRTL ? 'تأكيد' : 'Confirm',
    paymentDetails: isRTL ? 'تفاصيل الدفع' : 'Payment Details',
    amount: isRTL ? 'المبلغ' : 'Amount',
    paymentMethod: isRTL ? 'طريقة الدفع' : 'Payment Method',
    cash: isRTL ? 'نقداً' : 'Cash',
    card: isRTL ? 'بطاقة' : 'Card',
    insurance: isRTL ? 'تأمين' : 'Insurance',
    billDetails: isRTL ? 'تفاصيل الفاتورة' : 'Bill Details',
    service: isRTL ? 'الخدمة' : 'Service',
    quantity: isRTL ? 'الكمية' : 'Quantity',
    unitPrice: isRTL ? 'سعر الوحدة' : 'Unit Price',
    total: isRTL ? 'الإجمالي' : 'Total',
    newBill: isRTL ? 'فاتورة جديدة' : 'New Bill',
  };

  const getStatusColor = (status: BillStatus) => {
    switch (status) {
      case 'PENDING':
        return 'warning';
      case 'PARTIALLY_PAID':
        return 'info';
      case 'PAID':
        return 'success';
      case 'CANCELLED':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: BillStatus) => {
    switch (status) {
      case 'PENDING':
        return t.pending;
      case 'PARTIALLY_PAID':
        return t.partiallyPaid;
      case 'PAID':
        return t.paid;
      case 'CANCELLED':
        return t.cancelled;
      default:
        return status;
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'CONSULTATION':
        return t.consultation;
      case 'INVESTIGATION':
        return t.investigation;
      case 'PROCEDURE':
        return t.procedure;
      case 'DRUG':
        return t.drug;
      default:
        return category;
    }
  };

  const filteredBills = sampleBills.filter(bill => {
    const matchesStatus = statusFilter === 'ALL' || bill.status === statusFilter;
    const matchesSearch = searchQuery === '' || 
      bill.patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bill.patient.identifier.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bill.billNumber.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const todayRevenue = sampleBills
    .filter(b => b.status === 'PAID' || b.status === 'PARTIALLY_PAID')
    .reduce((sum, b) => sum + b.paidAmount, 0);
  
  const pendingAmount = sampleBills
    .filter(b => b.status === 'PENDING' || b.status === 'PARTIALLY_PAID')
    .reduce((sum, b) => sum + (b.totalAmount - b.paidAmount), 0);
  
  const totalBillsCount = sampleBills.length;

  return (
    <>
      <Head>
        <title>{isRTL ? 'الفوترة - النظام الصحي اليمني' : 'Billing - Yemen Health System'}</title>
      </Head>

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <Receipt size={24} className="text-emerald-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">{t.title}</h1>
            </div>
          </div>
          <Button>
            <Plus size={18} className={isRTL ? 'ml-2' : 'mr-2'} />
            {t.newBill}
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-700">{t.todayRevenue}</p>
                  <p className="text-2xl font-bold text-green-800">{formatCurrency(todayRevenue)}</p>
                </div>
                <DollarSign size={32} className="text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-yellow-50 border-yellow-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-yellow-700">{t.pendingPayments}</p>
                  <p className="text-2xl font-bold text-yellow-800">{formatCurrency(pendingAmount)}</p>
                </div>
                <Clock size={32} className="text-yellow-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-700">{t.totalBills}</p>
                  <p className="text-3xl font-bold text-blue-800">{totalBillsCount}</p>
                </div>
                <Receipt size={32} className="text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="border-b border-slate-200">
          <div className="flex gap-4">
            {(['bills', 'services'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 font-medium border-b-2 transition-colors ${
                  activeTab === tab
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                {t[tab]}
              </button>
            ))}
          </div>
        </div>

        {/* Bills Tab */}
        {activeTab === 'bills' && (
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
                  className={`w-full py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'}`}
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter size={20} className="text-slate-500" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as BillStatus | 'ALL')}
                  className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="ALL">{t.all}</option>
                  <option value="PENDING">{t.pending}</option>
                  <option value="PARTIALLY_PAID">{t.partiallyPaid}</option>
                  <option value="PAID">{t.paid}</option>
                </select>
              </div>
            </div>

            {/* Bills Table */}
            <Card>
              <CardContent className="p-0 overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50">
                      <th className={`px-4 py-3 text-sm font-semibold text-slate-600 ${isRTL ? 'text-right' : 'text-left'}`}>{t.billNumber}</th>
                      <th className={`px-4 py-3 text-sm font-semibold text-slate-600 ${isRTL ? 'text-right' : 'text-left'}`}>{t.patient}</th>
                      <th className={`px-4 py-3 text-sm font-semibold text-slate-600 ${isRTL ? 'text-right' : 'text-left'}`}>{t.date}</th>
                      <th className={`px-4 py-3 text-sm font-semibold text-slate-600 ${isRTL ? 'text-right' : 'text-left'}`}>{t.totalAmount}</th>
                      <th className={`px-4 py-3 text-sm font-semibold text-slate-600 ${isRTL ? 'text-right' : 'text-left'}`}>{t.paidAmount}</th>
                      <th className={`px-4 py-3 text-sm font-semibold text-slate-600 ${isRTL ? 'text-right' : 'text-left'}`}>{t.balance}</th>
                      <th className={`px-4 py-3 text-sm font-semibold text-slate-600 ${isRTL ? 'text-right' : 'text-left'}`}>{t.status}</th>
                      <th className={`px-4 py-3 text-sm font-semibold text-slate-600 ${isRTL ? 'text-right' : 'text-left'}`}>{t.actions}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBills.map((bill) => (
                      <tr key={bill.uuid} className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="px-4 py-3 text-sm font-medium text-emerald-600">{bill.billNumber}</td>
                        <td className="px-4 py-3">
                          <div>
                            <p className="text-sm font-medium text-slate-800">{bill.patient.name}</p>
                            <p className="text-xs text-slate-500">{bill.patient.identifier}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-600">{bill.billDate}</td>
                        <td className="px-4 py-3 text-sm font-medium text-slate-800">
                          {formatCurrency(bill.totalAmount)}
                        </td>
                        <td className="px-4 py-3 text-sm text-green-600">
                          {formatCurrency(bill.paidAmount)}
                        </td>
                        <td className={`px-4 py-3 text-sm font-medium ${bill.totalAmount - bill.paidAmount > 0 ? 'text-red-600' : 'text-slate-600'}`}>
                          {formatCurrency(bill.totalAmount - bill.paidAmount)}
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant={getStatusColor(bill.status as BillStatus)}>
                            {getStatusLabel(bill.status as BillStatus)}
                          </Badge>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => setSelectedBill(bill)}
                            >
                              {t.view}
                            </Button>
                            {(bill.status === 'PENDING' || bill.status === 'PARTIALLY_PAID') && (
                              <Button size="sm" onClick={() => setSelectedBill(bill)}>
                                <CreditCard size={14} className={isRTL ? 'ml-1' : 'mr-1'} />
                                {t.recordPayment}
                              </Button>
                            )}
                            <button className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded">
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

        {/* Services Tab */}
        {activeTab === 'services' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{isRTL ? 'قائمة الأسعار' : 'Price List'}</span>
                <Button size="sm">
                  <Plus size={16} className={isRTL ? 'ml-1' : 'mr-1'} />
                  {isRTL ? 'إضافة خدمة' : 'Add Service'}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className={`px-4 py-3 text-sm font-semibold text-slate-600 ${isRTL ? 'text-right' : 'text-left'}`}>{t.serviceName}</th>
                    <th className={`px-4 py-3 text-sm font-semibold text-slate-600 ${isRTL ? 'text-right' : 'text-left'}`}>{t.category}</th>
                    <th className={`px-4 py-3 text-sm font-semibold text-slate-600 ${isRTL ? 'text-right' : 'text-left'}`}>{t.price}</th>
                  </tr>
                </thead>
                <tbody>
                  {billableServices.map((service) => (
                    <tr key={service.uuid} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="px-4 py-3 text-sm font-medium text-slate-800">{service.name}</td>
                      <td className="px-4 py-3">
                        <Badge variant="default">{getCategoryLabel(service.category)}</Badge>
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-emerald-600">
                        {formatCurrency(service.price)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        )}

        {/* Bill Details / Payment Modal */}
        {selectedBill && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{t.billDetails}: {selectedBill.billNumber}</span>
                  <button onClick={() => setSelectedBill(null)} className="text-slate-400 hover:text-slate-600">
                    ×
                  </button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Patient Info */}
                <div className="p-3 bg-slate-50 rounded-lg">
                  <p><strong>{t.patient}:</strong> {selectedBill.patient.name}</p>
                  <p><strong>{isRTL ? 'رقم المريض' : 'Patient ID'}:</strong> {selectedBill.patient.identifier}</p>
                  <p><strong>{t.date}:</strong> {selectedBill.billDate}</p>
                </div>

                {/* Line Items */}
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-slate-50">
                      <th className={`py-2 px-3 text-sm ${isRTL ? 'text-right' : 'text-left'}`}>{t.service}</th>
                      <th className={`py-2 px-3 text-sm ${isRTL ? 'text-right' : 'text-left'}`}>{t.quantity}</th>
                      <th className={`py-2 px-3 text-sm ${isRTL ? 'text-right' : 'text-left'}`}>{t.unitPrice}</th>
                      <th className={`py-2 px-3 text-sm ${isRTL ? 'text-right' : 'text-left'}`}>{t.total}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedBill.lineItems.map((item, idx) => (
                      <tr key={idx} className="border-b border-slate-100">
                        <td className="py-2 px-3 text-sm">{item.service}</td>
                        <td className="py-2 px-3 text-sm">{item.quantity}</td>
                        <td className="py-2 px-3 text-sm">{formatCurrency(item.unitPrice)}</td>
                        <td className="py-2 px-3 text-sm font-medium">{formatCurrency(item.total)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-slate-50 font-semibold">
                      <td colSpan={3} className={`py-2 px-3 ${isRTL ? 'text-left' : 'text-right'}`}>{t.totalAmount}:</td>
                      <td className="py-2 px-3">{formatCurrency(selectedBill.totalAmount)}</td>
                    </tr>
                    <tr>
                      <td colSpan={3} className={`py-2 px-3 text-green-600 ${isRTL ? 'text-left' : 'text-right'}`}>{t.paidAmount}:</td>
                      <td className="py-2 px-3 text-green-600">{formatCurrency(selectedBill.paidAmount)}</td>
                    </tr>
                    <tr className="font-semibold">
                      <td colSpan={3} className={`py-2 px-3 text-red-600 ${isRTL ? 'text-left' : 'text-right'}`}>{t.balance}:</td>
                      <td className="py-2 px-3 text-red-600">{formatCurrency(selectedBill.totalAmount - selectedBill.paidAmount)}</td>
                    </tr>
                  </tfoot>
                </table>

                {/* Payment Form (if not fully paid) */}
                {selectedBill.status !== 'PAID' && (
                  <div className="border-t pt-4 space-y-4">
                    <h3 className="font-semibold">{t.recordPayment}</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          {t.amount}
                        </label>
                        <input
                          type="number"
                          value={paymentAmount}
                          onChange={(e) => setPaymentAmount(e.target.value)}
                          placeholder={(selectedBill.totalAmount - selectedBill.paidAmount).toString()}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          {t.paymentMethod}
                        </label>
                        <select
                          value={paymentMethod}
                          onChange={(e) => setPaymentMethod(e.target.value as 'CASH' | 'CARD' | 'INSURANCE')}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                        >
                          <option value="CASH">{t.cash}</option>
                          <option value="CARD">{t.card}</option>
                          <option value="INSURANCE">{t.insurance}</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-end gap-3 pt-4 border-t">
                  <Button variant="outline" onClick={() => setSelectedBill(null)}>
                    {t.close}
                  </Button>
                  <Button variant="outline">
                    <Printer size={16} className={isRTL ? 'ml-2' : 'mr-2'} />
                    {t.print}
                  </Button>
                  {selectedBill.status !== 'PAID' && (
                    <Button onClick={() => setSelectedBill(null)}>
                      <CheckCircle size={16} className={isRTL ? 'ml-2' : 'mr-2'} />
                      {t.confirm}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </>
  );
}
