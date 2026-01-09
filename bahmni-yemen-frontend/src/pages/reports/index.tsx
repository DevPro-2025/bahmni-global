import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import {
  BarChart3,
  FileText,
  Download,
  Calendar,
  Filter,
  Printer,
  RefreshCw,
  TrendingUp,
  Users,
  Activity,
  DollarSign,
  TestTube,
  Pill,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

// Report categories
const reportCategories = [
  {
    id: 'patient',
    icon: Users,
    color: 'blue',
    reports: [
      { id: 'daily-registrations', name: 'Daily Registrations', nameAr: 'التسجيلات اليومية' },
      { id: 'patient-demographics', name: 'Patient Demographics', nameAr: 'التركيبة السكانية للمرضى' },
      { id: 'patient-visits', name: 'Patient Visits Summary', nameAr: 'ملخص زيارات المرضى' },
      { id: 'new-vs-returning', name: 'New vs Returning Patients', nameAr: 'المرضى الجدد مقابل العائدين' },
    ],
  },
  {
    id: 'clinical',
    icon: Activity,
    color: 'green',
    reports: [
      { id: 'diagnosis-summary', name: 'Diagnosis Summary', nameAr: 'ملخص التشخيصات' },
      { id: 'icd10-report', name: 'ICD-10 Coding Report', nameAr: 'تقرير تشفير ICD-10' },
      { id: 'obs-summary', name: 'Observations Summary', nameAr: 'ملخص الملاحظات السريرية' },
      { id: 'program-enrollment', name: 'Program Enrollment', nameAr: 'التسجيل في البرامج' },
    ],
  },
  {
    id: 'laboratory',
    icon: TestTube,
    color: 'orange',
    reports: [
      { id: 'lab-orders', name: 'Laboratory Orders', nameAr: 'طلبات المختبر' },
      { id: 'lab-results', name: 'Laboratory Results', nameAr: 'نتائج المختبر' },
      { id: 'pending-tests', name: 'Pending Tests', nameAr: 'الفحوصات المعلقة' },
      { id: 'lab-turnaround', name: 'Lab Turnaround Time', nameAr: 'وقت استجابة المختبر' },
    ],
  },
  {
    id: 'pharmacy',
    icon: Pill,
    color: 'purple',
    reports: [
      { id: 'prescriptions', name: 'Prescriptions Report', nameAr: 'تقرير الوصفات' },
      { id: 'drug-dispensing', name: 'Drug Dispensing', nameAr: 'صرف الأدوية' },
      { id: 'stock-report', name: 'Stock Report', nameAr: 'تقرير المخزون' },
      { id: 'expiry-report', name: 'Expiry Alert Report', nameAr: 'تقرير تنبيه انتهاء الصلاحية' },
    ],
  },
  {
    id: 'financial',
    icon: DollarSign,
    color: 'emerald',
    reports: [
      { id: 'daily-revenue', name: 'Daily Revenue', nameAr: 'الإيرادات اليومية' },
      { id: 'monthly-revenue', name: 'Monthly Revenue', nameAr: 'الإيرادات الشهرية' },
      { id: 'outstanding-bills', name: 'Outstanding Bills', nameAr: 'الفواتير المستحقة' },
      { id: 'collection-report', name: 'Collection Report', nameAr: 'تقرير التحصيل' },
      { id: 'service-revenue', name: 'Revenue by Service', nameAr: 'الإيرادات حسب الخدمة' },
    ],
  },
];

// Sample report data for preview
const sampleDailyStats = {
  newPatients: 45,
  totalVisits: 128,
  labTests: 67,
  prescriptions: 89,
  revenue: 1250000,
};

export default function ReportsPage() {
  const router = useRouter();
  const locale = router.locale || 'ar';
  const isRTL = locale === 'ar';

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState({
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
  });
  const [outputFormat, setOutputFormat] = useState<'HTML' | 'PDF' | 'CSV' | 'EXCEL'>('HTML');
  const [isGenerating, setIsGenerating] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(isRTL ? 'ar-YE' : 'en-YE', {
      style: 'decimal',
      minimumFractionDigits: 0,
    }).format(amount) + (isRTL ? ' ر.ي' : ' YER');
  };

  const t = {
    title: isRTL ? 'التقارير' : 'Reports',
    selectCategory: isRTL ? 'اختر فئة التقرير' : 'Select Report Category',
    selectReport: isRTL ? 'اختر التقرير' : 'Select Report',
    parameters: isRTL ? 'معاملات التقرير' : 'Report Parameters',
    startDate: isRTL ? 'من تاريخ' : 'Start Date',
    endDate: isRTL ? 'إلى تاريخ' : 'End Date',
    format: isRTL ? 'صيغة الإخراج' : 'Output Format',
    generate: isRTL ? 'إنشاء التقرير' : 'Generate Report',
    download: isRTL ? 'تحميل' : 'Download',
    print: isRTL ? 'طباعة' : 'Print',
    refresh: isRTL ? 'تحديث' : 'Refresh',
    generating: isRTL ? 'جاري الإنشاء...' : 'Generating...',
    patient: isRTL ? 'المرضى' : 'Patients',
    clinical: isRTL ? 'السريري' : 'Clinical',
    laboratory: isRTL ? 'المختبر' : 'Laboratory',
    pharmacy: isRTL ? 'الصيدلية' : 'Pharmacy',
    financial: isRTL ? 'المالية' : 'Financial',
    quickStats: isRTL ? 'إحصائيات سريعة' : 'Quick Stats',
    today: isRTL ? 'اليوم' : 'Today',
    newPatients: isRTL ? 'مرضى جدد' : 'New Patients',
    totalVisits: isRTL ? 'إجمالي الزيارات' : 'Total Visits',
    labTests: isRTL ? 'فحوصات المختبر' : 'Lab Tests',
    prescriptions: isRTL ? 'الوصفات' : 'Prescriptions',
    revenue: isRTL ? 'الإيرادات' : 'Revenue',
    recentReports: isRTL ? 'التقارير الأخيرة' : 'Recent Reports',
    noReportSelected: isRTL ? 'اختر تقريراً لعرض المعاملات' : 'Select a report to view parameters',
    reportPreview: isRTL ? 'معاينة التقرير' : 'Report Preview',
    back: isRTL ? 'رجوع' : 'Back',
  };

  const getCategoryName = (id: string) => {
    const names: Record<string, { en: string; ar: string }> = {
      patient: { en: 'Patients', ar: 'المرضى' },
      clinical: { en: 'Clinical', ar: 'السريري' },
      laboratory: { en: 'Laboratory', ar: 'المختبر' },
      pharmacy: { en: 'Pharmacy', ar: 'الصيدلية' },
      financial: { en: 'Financial', ar: 'المالية' },
    };
    return isRTL ? names[id]?.ar : names[id]?.en;
  };

  const getCategoryColor = (color: string) => {
    const colors: Record<string, string> = {
      blue: 'bg-blue-100 text-blue-600 border-blue-200',
      green: 'bg-green-100 text-green-600 border-green-200',
      orange: 'bg-orange-100 text-orange-600 border-orange-200',
      purple: 'bg-purple-100 text-purple-600 border-purple-200',
      emerald: 'bg-emerald-100 text-emerald-600 border-emerald-200',
    };
    return colors[color] || colors.blue;
  };

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsGenerating(false);
  };

  return (
    <>
      <Head>
        <title>{isRTL ? 'التقارير - النظام الصحي اليمني' : 'Reports - Yemen Health System'}</title>
      </Head>

      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <BarChart3 size={24} className="text-indigo-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">{t.title}</h1>
          </div>
        </div>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp size={20} className="text-indigo-500" />
              {t.quickStats} - {t.today}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Users size={24} className="mx-auto text-blue-500 mb-2" />
                <p className="text-2xl font-bold text-blue-700">{sampleDailyStats.newPatients}</p>
                <p className="text-sm text-blue-600">{t.newPatients}</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <Activity size={24} className="mx-auto text-green-500 mb-2" />
                <p className="text-2xl font-bold text-green-700">{sampleDailyStats.totalVisits}</p>
                <p className="text-sm text-green-600">{t.totalVisits}</p>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <TestTube size={24} className="mx-auto text-orange-500 mb-2" />
                <p className="text-2xl font-bold text-orange-700">{sampleDailyStats.labTests}</p>
                <p className="text-sm text-orange-600">{t.labTests}</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <Pill size={24} className="mx-auto text-purple-500 mb-2" />
                <p className="text-2xl font-bold text-purple-700">{sampleDailyStats.prescriptions}</p>
                <p className="text-sm text-purple-600">{t.prescriptions}</p>
              </div>
              <div className="text-center p-4 bg-emerald-50 rounded-lg">
                <DollarSign size={24} className="mx-auto text-emerald-500 mb-2" />
                <p className="text-xl font-bold text-emerald-700">{formatCurrency(sampleDailyStats.revenue)}</p>
                <p className="text-sm text-emerald-600">{t.revenue}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Report Categories */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-lg font-semibold text-slate-800">{t.selectCategory}</h2>
            
            {reportCategories.map((category) => (
              <Card 
                key={category.id}
                className={`cursor-pointer transition-all ${
                  selectedCategory === category.id 
                    ? 'ring-2 ring-indigo-500 border-indigo-300' 
                    : 'hover:shadow-md'
                }`}
                onClick={() => setSelectedCategory(category.id === selectedCategory ? null : category.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2 rounded-lg ${getCategoryColor(category.color)}`}>
                      <category.icon size={20} />
                    </div>
                    <h3 className="font-semibold text-slate-800">{getCategoryName(category.id)}</h3>
                  </div>
                  
                  {selectedCategory === category.id && (
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
                      {category.reports.map((report) => (
                        <button
                          key={report.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedReport(report.id);
                          }}
                          className={`p-3 text-start rounded-lg border transition-colors ${
                            selectedReport === report.id
                              ? 'bg-indigo-50 border-indigo-300 text-indigo-700'
                              : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          <FileText size={16} className="inline mr-2" />
                          {isRTL ? report.nameAr : report.name}
                        </button>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Report Parameters */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-800">{t.parameters}</h2>
            
            <Card>
              <CardContent className="p-4 space-y-4">
                {selectedReport ? (
                  <>
                    {/* Date Range */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        <Calendar size={14} className="inline mr-1" />
                        {t.startDate}
                      </label>
                      <input
                        type="date"
                        value={dateRange.startDate}
                        onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        <Calendar size={14} className="inline mr-1" />
                        {t.endDate}
                      </label>
                      <input
                        type="date"
                        value={dateRange.endDate}
                        onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    {/* Output Format */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        {t.format}
                      </label>
                      <select
                        value={outputFormat}
                        onChange={(e) => setOutputFormat(e.target.value as typeof outputFormat)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="HTML">HTML</option>
                        <option value="PDF">PDF</option>
                        <option value="CSV">CSV</option>
                        <option value="EXCEL">Excel</option>
                      </select>
                    </div>

                    {/* Generate Button */}
                    <Button 
                      className="w-full" 
                      onClick={handleGenerateReport}
                      disabled={isGenerating}
                    >
                      {isGenerating ? (
                        <>
                          <RefreshCw size={16} className={`animate-spin ${isRTL ? 'ml-2' : 'mr-2'}`} />
                          {t.generating}
                        </>
                      ) : (
                        <>
                          <BarChart3 size={16} className={isRTL ? 'ml-2' : 'mr-2'} />
                          {t.generate}
                        </>
                      )}
                    </Button>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1">
                        <Download size={16} className={isRTL ? 'ml-2' : 'mr-2'} />
                        {t.download}
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Printer size={16} className={isRTL ? 'ml-2' : 'mr-2'} />
                        {t.print}
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8 text-slate-500">
                    <FileText size={48} className="mx-auto mb-3 text-slate-300" />
                    <p>{t.noReportSelected}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Reports */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">{t.recentReports}</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-slate-100">
                  {[
                    { name: isRTL ? 'الإيرادات اليومية' : 'Daily Revenue', date: '2024-01-15', format: 'PDF' },
                    { name: isRTL ? 'التسجيلات اليومية' : 'Daily Registrations', date: '2024-01-15', format: 'HTML' },
                    { name: isRTL ? 'تقرير المخزون' : 'Stock Report', date: '2024-01-14', format: 'EXCEL' },
                  ].map((report, idx) => (
                    <div key={idx} className="px-4 py-3 flex items-center justify-between hover:bg-slate-50">
                      <div>
                        <p className="text-sm font-medium text-slate-700">{report.name}</p>
                        <p className="text-xs text-slate-500">{report.date}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="default">{report.format}</Badge>
                        <button className="p-1 text-slate-400 hover:text-indigo-600">
                          <Download size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
