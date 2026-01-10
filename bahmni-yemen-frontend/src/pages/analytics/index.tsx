'use client';

import React, { useState } from 'react';
import { MainLayout } from '@/components/layout';
import { Card, Button, Badge } from '@/components/ui';
import {
  BarChart3,
  LineChart,
  PieChart,
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  Filter,
  RefreshCw,
  Users,
  Activity,
  Stethoscope,
  TestTube,
  Pill,
  DollarSign,
  Clock,
  FileText,
  Database,
  Settings,
  Play,
  Pause,
} from 'lucide-react';

// Analytics / Bahmni Mart Module
// Matches the workflow of bahmni-mart, bahmni-mart-playbook

interface MetricCard {
  title: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  icon: React.ReactNode;
  color: string;
}

interface DataPipeline {
  id: string;
  name: string;
  source: string;
  lastRun: string;
  nextRun: string;
  status: 'running' | 'completed' | 'failed' | 'scheduled';
  recordsProcessed: number;
}

export default function AnalyticsPage() {
  const [locale, setLocale] = useState<'ar' | 'en'>('ar');
  const [dateRange, setDateRange] = useState('month');
  const [selectedDashboard, setSelectedDashboard] = useState('overview');
  
  const translations = {
    ar: {
      title: 'التحليلات والإحصائيات',
      pageTitle: 'مركز البيانات',
      overview: 'نظرة عامة',
      patients: 'المرضى',
      clinical: 'السريري',
      laboratory: 'المختبر',
      pharmacy: 'الصيدلية',
      financial: 'المالي',
      dataWarehouse: 'مستودع البيانات',
      dataPipelines: 'خطوط البيانات',
      totalPatients: 'إجمالي المرضى',
      newPatients: 'مرضى جدد',
      totalVisits: 'إجمالي الزيارات',
      avgWaitTime: 'متوسط وقت الانتظار',
      labTests: 'فحوصات المختبر',
      prescriptions: 'الوصفات الطبية',
      revenue: 'الإيرادات',
      pendingBills: 'فواتير معلقة',
      today: 'اليوم',
      week: 'أسبوع',
      month: 'شهر',
      quarter: 'ربع سنة',
      year: 'سنة',
      custom: 'مخصص',
      refresh: 'تحديث',
      export: 'تصدير',
      filter: 'تصفية',
      patientsByGender: 'المرضى حسب الجنس',
      patientsByAge: 'المرضى حسب العمر',
      visitsTrend: 'اتجاه الزيارات',
      topDiagnoses: 'أكثر التشخيصات شيوعاً',
      labTestsDistribution: 'توزيع الفحوصات',
      prescriptionsTrend: 'اتجاه الوصفات',
      revenueByService: 'الإيرادات حسب الخدمة',
      collectionRate: 'نسبة التحصيل',
      male: 'ذكر',
      female: 'أنثى',
      increase: 'زيادة',
      decrease: 'انخفاض',
      compared: 'مقارنة بالفترة السابقة',
      yer: 'ر.ي',
      minutes: 'دقيقة',
      records: 'سجل',
      pipelineName: 'اسم الخط',
      source: 'المصدر',
      lastRun: 'آخر تشغيل',
      nextRun: 'التشغيل التالي',
      status: 'الحالة',
      recordsProcessed: 'السجلات المعالجة',
      running: 'قيد التشغيل',
      completed: 'مكتمل',
      failed: 'فشل',
      scheduled: 'مجدول',
      runNow: 'تشغيل الآن',
      pause: 'إيقاف مؤقت',
      viewLogs: 'عرض السجلات',
      etlStatus: 'حالة ETL',
      dataFreshness: 'حداثة البيانات',
      lastUpdate: 'آخر تحديث',
      tablesCount: 'عدد الجداول',
      storageUsed: 'التخزين المستخدم',
      queryPerformance: 'أداء الاستعلامات',
      avgQueryTime: 'متوسط وقت الاستعلام',
      queriesPerDay: 'استعلامات / يوم',
      kpi: 'مؤشرات الأداء الرئيسية',
      bedOccupancy: 'نسبة إشغال الأسرة',
      patientSatisfaction: 'رضا المرضى',
      appointmentNoShow: 'نسبة الغياب عن المواعيد',
    },
    en: {
      title: 'Analytics & Statistics',
      pageTitle: 'Data Center',
      overview: 'Overview',
      patients: 'Patients',
      clinical: 'Clinical',
      laboratory: 'Laboratory',
      pharmacy: 'Pharmacy',
      financial: 'Financial',
      dataWarehouse: 'Data Warehouse',
      dataPipelines: 'Data Pipelines',
      totalPatients: 'Total Patients',
      newPatients: 'New Patients',
      totalVisits: 'Total Visits',
      avgWaitTime: 'Avg Wait Time',
      labTests: 'Lab Tests',
      prescriptions: 'Prescriptions',
      revenue: 'Revenue',
      pendingBills: 'Pending Bills',
      today: 'Today',
      week: 'Week',
      month: 'Month',
      quarter: 'Quarter',
      year: 'Year',
      custom: 'Custom',
      refresh: 'Refresh',
      export: 'Export',
      filter: 'Filter',
      patientsByGender: 'Patients by Gender',
      patientsByAge: 'Patients by Age',
      visitsTrend: 'Visits Trend',
      topDiagnoses: 'Top Diagnoses',
      labTestsDistribution: 'Lab Tests Distribution',
      prescriptionsTrend: 'Prescriptions Trend',
      revenueByService: 'Revenue by Service',
      collectionRate: 'Collection Rate',
      male: 'Male',
      female: 'Female',
      increase: 'increase',
      decrease: 'decrease',
      compared: 'compared to previous period',
      yer: 'YER',
      minutes: 'minutes',
      records: 'records',
      pipelineName: 'Pipeline Name',
      source: 'Source',
      lastRun: 'Last Run',
      nextRun: 'Next Run',
      status: 'Status',
      recordsProcessed: 'Records Processed',
      running: 'Running',
      completed: 'Completed',
      failed: 'Failed',
      scheduled: 'Scheduled',
      runNow: 'Run Now',
      pause: 'Pause',
      viewLogs: 'View Logs',
      etlStatus: 'ETL Status',
      dataFreshness: 'Data Freshness',
      lastUpdate: 'Last Update',
      tablesCount: 'Tables Count',
      storageUsed: 'Storage Used',
      queryPerformance: 'Query Performance',
      avgQueryTime: 'Avg Query Time',
      queriesPerDay: 'Queries / Day',
      kpi: 'Key Performance Indicators',
      bedOccupancy: 'Bed Occupancy',
      patientSatisfaction: 'Patient Satisfaction',
      appointmentNoShow: 'Appointment No-Show Rate',
    },
  };

  const t = translations[locale];
  const isRTL = locale === 'ar';

  const metrics: MetricCard[] = [
    {
      title: t.totalPatients,
      value: '12,450',
      change: 12,
      trend: 'up',
      icon: <Users className="h-6 w-6" />,
      color: 'blue',
    },
    {
      title: t.totalVisits,
      value: '3,280',
      change: 8,
      trend: 'up',
      icon: <Activity className="h-6 w-6" />,
      color: 'green',
    },
    {
      title: t.labTests,
      value: '1,540',
      change: -3,
      trend: 'down',
      icon: <TestTube className="h-6 w-6" />,
      color: 'purple',
    },
    {
      title: t.prescriptions,
      value: '2,890',
      change: 15,
      trend: 'up',
      icon: <Pill className="h-6 w-6" />,
      color: 'orange',
    },
  ];

  const pipelines: DataPipeline[] = [
    {
      id: '1',
      name: 'Patient Demographics',
      source: 'OpenMRS',
      lastRun: '2024-01-09 10:00',
      nextRun: '2024-01-09 11:00',
      status: 'completed',
      recordsProcessed: 12450,
    },
    {
      id: '2',
      name: 'Clinical Encounters',
      source: 'OpenMRS',
      lastRun: '2024-01-09 10:00',
      nextRun: '2024-01-09 11:00',
      status: 'running',
      recordsProcessed: 45230,
    },
    {
      id: '3',
      name: 'Lab Results',
      source: 'OpenELIS',
      lastRun: '2024-01-09 09:30',
      nextRun: '2024-01-09 10:30',
      status: 'completed',
      recordsProcessed: 8920,
    },
    {
      id: '4',
      name: 'Billing Data',
      source: 'Odoo',
      lastRun: '2024-01-09 08:00',
      nextRun: '2024-01-09 12:00',
      status: 'scheduled',
      recordsProcessed: 15680,
    },
    {
      id: '5',
      name: 'Pharmacy Inventory',
      source: 'Odoo',
      lastRun: '2024-01-09 07:00',
      nextRun: '2024-01-09 13:00',
      status: 'failed',
      recordsProcessed: 0,
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'running':
        return <Badge variant="primary">{t.running}</Badge>;
      case 'completed':
        return <Badge variant="success">{t.completed}</Badge>;
      case 'failed':
        return <Badge variant="danger">{t.failed}</Badge>;
      case 'scheduled':
        return <Badge variant="secondary">{t.scheduled}</Badge>;
      default:
        return null;
    }
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return { bg: 'bg-blue-100', text: 'text-blue-600' };
      case 'green':
        return { bg: 'bg-green-100', text: 'text-green-600' };
      case 'purple':
        return { bg: 'bg-purple-100', text: 'text-purple-600' };
      case 'orange':
        return { bg: 'bg-orange-100', text: 'text-orange-600' };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-600' };
    }
  };

  return (
    <MainLayout title={t.pageTitle} locale={locale} onLocaleChange={setLocale}>
      <div className={`p-6 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <BarChart3 className="h-7 w-7 text-blue-600" />
            {t.title}
          </h1>
          <div className="flex items-center gap-3">
            {/* Date Range Selector */}
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="border rounded-lg px-3 py-2"
            >
              <option value="today">{t.today}</option>
              <option value="week">{t.week}</option>
              <option value="month">{t.month}</option>
              <option value="quarter">{t.quarter}</option>
              <option value="year">{t.year}</option>
            </select>
            <Button variant="outline" className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              {t.refresh}
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              {t.export}
            </Button>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <div className="flex gap-2 mb-6 border-b pb-2 overflow-x-auto">
          {[
            { id: 'overview', label: t.overview, icon: <BarChart3 className="h-4 w-4" /> },
            { id: 'patients', label: t.patients, icon: <Users className="h-4 w-4" /> },
            { id: 'clinical', label: t.clinical, icon: <Stethoscope className="h-4 w-4" /> },
            { id: 'laboratory', label: t.laboratory, icon: <TestTube className="h-4 w-4" /> },
            { id: 'pharmacy', label: t.pharmacy, icon: <Pill className="h-4 w-4" /> },
            { id: 'financial', label: t.financial, icon: <DollarSign className="h-4 w-4" /> },
            { id: 'warehouse', label: t.dataWarehouse, icon: <Database className="h-4 w-4" /> },
          ].map((tab) => (
            <Button
              key={tab.id}
              variant={selectedDashboard === tab.id ? 'primary' : 'outline'}
              onClick={() => setSelectedDashboard(tab.id)}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              {tab.icon}
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {metrics.map((metric, index) => {
            const colors = getColorClasses(metric.color);
            return (
              <Card key={index} className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-3 rounded-full ${colors.bg}`}>
                    <div className={colors.text}>{metric.icon}</div>
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${
                    metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.trend === 'up' ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : (
                      <TrendingDown className="h-4 w-4" />
                    )}
                    {metric.change}%
                  </div>
                </div>
                <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                <p className="text-sm text-gray-500">{metric.title}</p>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Charts Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Visits Trend Chart */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <LineChart className="h-5 w-5 text-blue-600" />
                  {t.visitsTrend}
                </h3>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
              {/* Placeholder for chart */}
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <LineChart className="h-12 w-12 mx-auto mb-2" />
                  <p>{t.visitsTrend}</p>
                </div>
              </div>
            </Card>

            {/* Revenue Chart */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-green-600" />
                  {t.revenueByService}
                </h3>
              </div>
              {/* Placeholder for chart */}
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <BarChart3 className="h-12 w-12 mx-auto mb-2" />
                  <p>{t.revenueByService}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Side Stats */}
          <div className="space-y-6">
            {/* KPIs */}
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Activity className="h-5 w-5 text-blue-600" />
                {t.kpi}
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">{t.bedOccupancy}</span>
                    <span className="font-medium">78%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '78%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">{t.patientSatisfaction}</span>
                    <span className="font-medium">92%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '92%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">{t.collectionRate}</span>
                    <span className="font-medium">85%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-600 h-2 rounded-full" style={{ width: '85%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">{t.appointmentNoShow}</span>
                    <span className="font-medium text-red-600">12%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-red-600 h-2 rounded-full" style={{ width: '12%' }} />
                  </div>
                </div>
              </div>
            </Card>

            {/* Gender Distribution */}
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <PieChart className="h-5 w-5 text-purple-600" />
                {t.patientsByGender}
              </h3>
              <div className="h-40 bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <PieChart className="h-12 w-12 mx-auto mb-2" />
                </div>
              </div>
              <div className="flex justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  <span className="text-sm text-gray-600">{t.male}: 52%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-pink-500" />
                  <span className="text-sm text-gray-600">{t.female}: 48%</span>
                </div>
              </div>
            </Card>

            {/* Data Freshness */}
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Database className="h-5 w-5 text-blue-600" />
                {t.dataFreshness}
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">{t.lastUpdate}:</span>
                  <span className="font-medium">10:00 AM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t.tablesCount}:</span>
                  <span className="font-medium">45</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t.storageUsed}:</span>
                  <span className="font-medium">2.4 GB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t.avgQueryTime}:</span>
                  <span className="font-medium">120ms</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Data Pipelines Section */}
        <Card className="p-6 mt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <Settings className="h-5 w-5 text-blue-600" />
              {t.dataPipelines}
            </h3>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              {t.refresh}
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">{t.pipelineName}</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">{t.source}</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">{t.lastRun}</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">{t.nextRun}</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">{t.recordsProcessed}</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">{t.status}</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-gray-600">-</th>
                </tr>
              </thead>
              <tbody>
                {pipelines.map((pipeline) => (
                  <tr key={pipeline.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">{pipeline.name}</td>
                    <td className="px-4 py-3 text-gray-700">{pipeline.source}</td>
                    <td className="px-4 py-3 text-gray-500">{pipeline.lastRun}</td>
                    <td className="px-4 py-3 text-gray-500">{pipeline.nextRun}</td>
                    <td className="px-4 py-3 text-gray-700">{pipeline.recordsProcessed.toLocaleString()}</td>
                    <td className="px-4 py-3">{getStatusBadge(pipeline.status)}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-center gap-2">
                        {pipeline.status === 'running' ? (
                          <Button size="sm" variant="outline">
                            <Pause className="h-4 w-4" />
                          </Button>
                        ) : (
                          <Button size="sm" variant="outline">
                            <Play className="h-4 w-4" />
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          <FileText className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
}
