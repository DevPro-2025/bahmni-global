import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import {
  TestTube,
  Search,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
  Plus,
  Filter,
  Download,
  Printer,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

// Sample lab orders data (matching OpenMRS/OpenELIS structure)
const sampleLabOrders = [
  {
    uuid: 'order-001',
    orderNumber: 'ORD-2024-001',
    patient: { identifier: 'YEM-001', name: 'أحمد عبدالله محمد' },
    concept: { display: 'Complete Blood Count (CBC)' },
    orderer: { display: 'Dr. Mohammed Ali' },
    dateActivated: '2024-01-15T09:00:00',
    urgency: 'ROUTINE',
    status: 'PENDING',
  },
  {
    uuid: 'order-002',
    orderNumber: 'ORD-2024-002',
    patient: { identifier: 'YEM-002', name: 'فاطمة علي أحمد' },
    concept: { display: 'Blood Glucose (Fasting)' },
    orderer: { display: 'Dr. Sara Hassan' },
    dateActivated: '2024-01-15T10:30:00',
    urgency: 'STAT',
    status: 'COLLECTED',
  },
  {
    uuid: 'order-003',
    orderNumber: 'ORD-2024-003',
    patient: { identifier: 'YEM-003', name: 'محمد صالح العمري' },
    concept: { display: 'Liver Function Test (LFT)' },
    orderer: { display: 'Dr. Ahmed Saleh' },
    dateActivated: '2024-01-15T08:15:00',
    urgency: 'ROUTINE',
    status: 'IN_PROGRESS',
  },
  {
    uuid: 'order-004',
    orderNumber: 'ORD-2024-004',
    patient: { identifier: 'YEM-004', name: 'سارة محمد الحسني' },
    concept: { display: 'Urinalysis' },
    orderer: { display: 'Dr. Fatima Omar' },
    dateActivated: '2024-01-14T14:00:00',
    urgency: 'ROUTINE',
    status: 'COMPLETED',
    results: [
      { parameter: 'Color', value: 'Yellow', normalRange: 'Yellow', status: 'normal' },
      { parameter: 'pH', value: '6.5', normalRange: '5.0-8.0', status: 'normal' },
      { parameter: 'Specific Gravity', value: '1.020', normalRange: '1.005-1.030', status: 'normal' },
      { parameter: 'Protein', value: 'Negative', normalRange: 'Negative', status: 'normal' },
      { parameter: 'Glucose', value: 'Negative', normalRange: 'Negative', status: 'normal' },
    ],
  },
  {
    uuid: 'order-005',
    orderNumber: 'ORD-2024-005',
    patient: { identifier: 'YEM-005', name: 'عبدالله أحمد السعيدي' },
    concept: { display: 'Malaria Rapid Test' },
    orderer: { display: 'Dr. Hassan Ali' },
    dateActivated: '2024-01-14T11:00:00',
    urgency: 'STAT',
    status: 'COMPLETED',
    results: [
      { parameter: 'P. falciparum', value: 'Negative', normalRange: 'Negative', status: 'normal' },
      { parameter: 'P. vivax', value: 'Negative', normalRange: 'Negative', status: 'normal' },
    ],
  },
];

// Sample test panels/templates
const testPanels = [
  { name: 'Complete Blood Count (CBC)', tests: ['WBC', 'RBC', 'Hemoglobin', 'Hematocrit', 'Platelets'] },
  { name: 'Liver Function Test (LFT)', tests: ['ALT', 'AST', 'Bilirubin', 'Albumin', 'ALP'] },
  { name: 'Kidney Function Test (KFT)', tests: ['BUN', 'Creatinine', 'eGFR'] },
  { name: 'Lipid Profile', tests: ['Total Cholesterol', 'Triglycerides', 'HDL', 'LDL'] },
  { name: 'Thyroid Panel', tests: ['TSH', 'T3', 'T4', 'Free T4'] },
];

type OrderStatus = 'PENDING' | 'COLLECTED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

export default function LaboratoryPage() {
  const router = useRouter();
  const locale = router.locale || 'ar';
  const isRTL = locale === 'ar';

  const [activeTab, setActiveTab] = useState<'worklist' | 'results' | 'reports'>('worklist');
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<typeof sampleLabOrders[0] | null>(null);

  const t = {
    title: isRTL ? 'المختبر' : 'Laboratory',
    worklist: isRTL ? 'قائمة العمل' : 'Worklist',
    results: isRTL ? 'النتائج' : 'Results',
    reports: isRTL ? 'التقارير' : 'Reports',
    search: isRTL ? 'بحث...' : 'Search...',
    orderNumber: isRTL ? 'رقم الطلب' : 'Order #',
    patient: isRTL ? 'المريض' : 'Patient',
    test: isRTL ? 'الفحص' : 'Test',
    orderedBy: isRTL ? 'طلب بواسطة' : 'Ordered By',
    orderDate: isRTL ? 'تاريخ الطلب' : 'Order Date',
    urgency: isRTL ? 'الأولوية' : 'Urgency',
    status: isRTL ? 'الحالة' : 'Status',
    actions: isRTL ? 'الإجراءات' : 'Actions',
    pending: isRTL ? 'قيد الانتظار' : 'Pending',
    collected: isRTL ? 'تم جمع العينة' : 'Collected',
    inProgress: isRTL ? 'قيد التحليل' : 'In Progress',
    completed: isRTL ? 'مكتمل' : 'Completed',
    cancelled: isRTL ? 'ملغي' : 'Cancelled',
    routine: isRTL ? 'عادي' : 'Routine',
    stat: isRTL ? 'عاجل' : 'STAT',
    collectSample: isRTL ? 'جمع العينة' : 'Collect Sample',
    enterResults: isRTL ? 'إدخال النتائج' : 'Enter Results',
    viewResults: isRTL ? 'عرض النتائج' : 'View Results',
    print: isRTL ? 'طباعة' : 'Print',
    all: isRTL ? 'الكل' : 'All',
    filterByStatus: isRTL ? 'تصفية حسب الحالة' : 'Filter by Status',
    pendingOrders: isRTL ? 'طلبات معلقة' : 'Pending Orders',
    todayCompleted: isRTL ? 'مكتملة اليوم' : 'Completed Today',
    inQueue: isRTL ? 'في قائمة الانتظار' : 'In Queue',
    parameter: isRTL ? 'المعامل' : 'Parameter',
    value: isRTL ? 'القيمة' : 'Value',
    normalRange: isRTL ? 'المعدل الطبيعي' : 'Normal Range',
    close: isRTL ? 'إغلاق' : 'Close',
    testResults: isRTL ? 'نتائج الفحص' : 'Test Results',
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'PENDING':
        return 'warning';
      case 'COLLECTED':
        return 'info';
      case 'IN_PROGRESS':
        return 'default';
      case 'COMPLETED':
        return 'success';
      case 'CANCELLED':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: OrderStatus) => {
    switch (status) {
      case 'PENDING':
        return t.pending;
      case 'COLLECTED':
        return t.collected;
      case 'IN_PROGRESS':
        return t.inProgress;
      case 'COMPLETED':
        return t.completed;
      case 'CANCELLED':
        return t.cancelled;
      default:
        return status;
    }
  };

  const filteredOrders = sampleLabOrders.filter(order => {
    const matchesStatus = statusFilter === 'ALL' || order.status === statusFilter;
    const matchesSearch = searchQuery === '' || 
      order.patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.patient.identifier.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const pendingCount = sampleLabOrders.filter(o => o.status === 'PENDING').length;
  const completedTodayCount = sampleLabOrders.filter(o => o.status === 'COMPLETED').length;
  const inProgressCount = sampleLabOrders.filter(o => o.status === 'IN_PROGRESS' || o.status === 'COLLECTED').length;

  return (
    <>
      <Head>
        <title>{isRTL ? 'المختبر - النظام الصحي اليمني' : 'Laboratory - Yemen Health System'}</title>
      </Head>

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <TestTube size={24} className="text-orange-600" />
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
                  <p className="text-sm text-yellow-700">{t.pendingOrders}</p>
                  <p className="text-3xl font-bold text-yellow-800">{pendingCount}</p>
                </div>
                <Clock size={32} className="text-yellow-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-700">{t.inQueue}</p>
                  <p className="text-3xl font-bold text-blue-800">{inProgressCount}</p>
                </div>
                <AlertCircle size={32} className="text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-700">{t.todayCompleted}</p>
                  <p className="text-3xl font-bold text-green-800">{completedTodayCount}</p>
                </div>
                <CheckCircle size={32} className="text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="border-b border-slate-200">
          <div className="flex gap-4">
            {(['worklist', 'results', 'reports'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 font-medium border-b-2 transition-colors ${
                  activeTab === tab
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                {t[tab]}
              </button>
            ))}
          </div>
        </div>

        {/* Worklist Tab */}
        {activeTab === 'worklist' && (
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
                  className={`w-full py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'}`}
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter size={20} className="text-slate-500" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as OrderStatus | 'ALL')}
                  className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                >
                  <option value="ALL">{t.all}</option>
                  <option value="PENDING">{t.pending}</option>
                  <option value="COLLECTED">{t.collected}</option>
                  <option value="IN_PROGRESS">{t.inProgress}</option>
                  <option value="COMPLETED">{t.completed}</option>
                </select>
              </div>
            </div>

            {/* Orders Table */}
            <Card>
              <CardContent className="p-0 overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50">
                      <th className={`px-4 py-3 text-sm font-semibold text-slate-600 ${isRTL ? 'text-right' : 'text-left'}`}>{t.orderNumber}</th>
                      <th className={`px-4 py-3 text-sm font-semibold text-slate-600 ${isRTL ? 'text-right' : 'text-left'}`}>{t.patient}</th>
                      <th className={`px-4 py-3 text-sm font-semibold text-slate-600 ${isRTL ? 'text-right' : 'text-left'}`}>{t.test}</th>
                      <th className={`px-4 py-3 text-sm font-semibold text-slate-600 ${isRTL ? 'text-right' : 'text-left'}`}>{t.urgency}</th>
                      <th className={`px-4 py-3 text-sm font-semibold text-slate-600 ${isRTL ? 'text-right' : 'text-left'}`}>{t.status}</th>
                      <th className={`px-4 py-3 text-sm font-semibold text-slate-600 ${isRTL ? 'text-right' : 'text-left'}`}>{t.actions}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order) => (
                      <tr key={order.uuid} className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="px-4 py-3 text-sm font-medium text-orange-600">{order.orderNumber}</td>
                        <td className="px-4 py-3">
                          <div>
                            <p className="text-sm font-medium text-slate-800">{order.patient.name}</p>
                            <p className="text-xs text-slate-500">{order.patient.identifier}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-700">{order.concept.display}</td>
                        <td className="px-4 py-3">
                          <Badge variant={order.urgency === 'STAT' ? 'error' : 'default'}>
                            {order.urgency === 'STAT' ? t.stat : t.routine}
                          </Badge>
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant={getStatusColor(order.status as OrderStatus)}>
                            {getStatusLabel(order.status as OrderStatus)}
                          </Badge>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            {order.status === 'PENDING' && (
                              <Button size="sm" variant="outline">
                                {t.collectSample}
                              </Button>
                            )}
                            {(order.status === 'COLLECTED' || order.status === 'IN_PROGRESS') && (
                              <Button size="sm" variant="outline">
                                {t.enterResults}
                              </Button>
                            )}
                            {order.status === 'COMPLETED' && (
                              <>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => setSelectedOrder(order)}
                                >
                                  {t.viewResults}
                                </Button>
                                <button className="p-1.5 text-slate-500 hover:text-orange-600 hover:bg-orange-50 rounded">
                                  <Printer size={16} />
                                </button>
                              </>
                            )}
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

        {/* Results Tab */}
        {activeTab === 'results' && (
          <Card>
            <CardHeader>
              <CardTitle>{isRTL ? 'نتائج الفحوصات المكتملة' : 'Completed Test Results'}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sampleLabOrders.filter(o => o.status === 'COMPLETED').map(order => (
                  <div key={order.uuid} className="border border-slate-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-slate-800">{order.concept.display}</h3>
                        <p className="text-sm text-slate-500">{order.patient.name} - {order.patient.identifier}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => setSelectedOrder(order)}>
                          <FileText size={14} className={isRTL ? 'ml-1' : 'mr-1'} />
                          {t.viewResults}
                        </Button>
                        <Button size="sm" variant="outline">
                          <Printer size={14} className={isRTL ? 'ml-1' : 'mr-1'} />
                          {t.print}
                        </Button>
                      </div>
                    </div>
                    {order.results && (
                      <div className="bg-slate-50 rounded-lg p-3">
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          {order.results.slice(0, 3).map((r, idx) => (
                            <div key={idx}>
                              <span className="text-slate-500">{r.parameter}: </span>
                              <span className={`font-medium ${r.status === 'normal' ? 'text-green-600' : 'text-red-600'}`}>
                                {r.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <Card>
            <CardHeader>
              <CardTitle>{isRTL ? 'تقارير المختبر' : 'Laboratory Reports'}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: isRTL ? 'تقرير يومي' : 'Daily Report', icon: FileText },
                  { name: isRTL ? 'تقرير أسبوعي' : 'Weekly Report', icon: FileText },
                  { name: isRTL ? 'إحصائيات الفحوصات' : 'Test Statistics', icon: FileText },
                  { name: isRTL ? 'تقرير الفحوصات المعلقة' : 'Pending Tests Report', icon: FileText },
                ].map((report, idx) => (
                  <button
                    key={idx}
                    className="flex items-center gap-3 p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-start"
                  >
                    <report.icon size={24} className="text-orange-500" />
                    <span className="font-medium text-slate-700">{report.name}</span>
                    <Download size={16} className={`text-slate-400 ${isRTL ? 'mr-auto' : 'ml-auto'}`} />
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results Modal */}
        {selectedOrder && selectedOrder.results && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-2xl">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{t.testResults}: {selectedOrder.concept.display}</span>
                  <button onClick={() => setSelectedOrder(null)} className="text-slate-400 hover:text-slate-600">
                    ×
                  </button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4 p-3 bg-slate-50 rounded-lg">
                  <p className="text-sm"><strong>{t.patient}:</strong> {selectedOrder.patient.name}</p>
                  <p className="text-sm"><strong>{t.orderNumber}:</strong> {selectedOrder.orderNumber}</p>
                </div>
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className={`py-2 ${isRTL ? 'text-right' : 'text-left'}`}>{t.parameter}</th>
                      <th className={`py-2 ${isRTL ? 'text-right' : 'text-left'}`}>{t.value}</th>
                      <th className={`py-2 ${isRTL ? 'text-right' : 'text-left'}`}>{t.normalRange}</th>
                      <th className={`py-2 ${isRTL ? 'text-right' : 'text-left'}`}>{t.status}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.results.map((result, idx) => (
                      <tr key={idx} className="border-b border-slate-100">
                        <td className="py-2">{result.parameter}</td>
                        <td className={`py-2 font-medium ${result.status === 'normal' ? 'text-slate-800' : 'text-red-600'}`}>
                          {result.value}
                        </td>
                        <td className="py-2 text-slate-500">{result.normalRange}</td>
                        <td className="py-2">
                          <Badge variant={result.status === 'normal' ? 'success' : 'error'}>
                            {result.status === 'normal' ? (isRTL ? 'طبيعي' : 'Normal') : (isRTL ? 'غير طبيعي' : 'Abnormal')}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex justify-end gap-3 mt-4">
                  <Button variant="outline" onClick={() => setSelectedOrder(null)}>
                    {t.close}
                  </Button>
                  <Button>
                    <Printer size={16} className={isRTL ? 'ml-2' : 'mr-2'} />
                    {t.print}
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
