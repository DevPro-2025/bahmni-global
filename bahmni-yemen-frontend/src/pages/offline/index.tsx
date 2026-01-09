'use client';

import React, { useState, useEffect } from 'react';
import { MainLayout } from '@/components/layout';
import { Card, Button, Badge } from '@/components/ui';
import {
  Wifi,
  WifiOff,
  RefreshCw,
  Download,
  Upload,
  Database,
  HardDrive,
  Clock,
  CheckCircle,
  AlertCircle,
  Users,
  FileText,
  Calendar,
  Settings,
  Trash2,
  Shield,
} from 'lucide-react';

// Bahmni Connect Offline/Sync Module
// Matches the workflow of bahmni-connect, bahmni-offline-sync, bahmni-offline

interface SyncStatus {
  category: string;
  lastSync: string;
  pendingChanges: number;
  status: 'synced' | 'pending' | 'error';
  icon: React.ReactNode;
}

interface StorageInfo {
  used: number;
  total: number;
  percentage: number;
}

export default function OfflinePage() {
  const [locale, setLocale] = useState<'ar' | 'en'>('ar');
  const [isOnline, setIsOnline] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastFullSync, setLastFullSync] = useState('2024-01-09 18:30');
  
  const translations = {
    ar: {
      title: 'الوضع غير متصل',
      pageTitle: 'المزامنة والوضع غير المتصل',
      connectionStatus: 'حالة الاتصال',
      online: 'متصل',
      offline: 'غير متصل',
      syncNow: 'مزامنة الآن',
      syncing: 'جاري المزامنة...',
      lastSync: 'آخر مزامنة كاملة',
      syncStatus: 'حالة المزامنة',
      pendingChanges: 'تغييرات معلقة',
      synced: 'متزامن',
      pending: 'معلق',
      error: 'خطأ',
      patients: 'المرضى',
      encounters: 'الزيارات',
      appointments: 'المواعيد',
      observations: 'الملاحظات',
      orders: 'الطلبات',
      forms: 'النماذج',
      localStorage: 'التخزين المحلي',
      used: 'مستخدم',
      available: 'متاح',
      clearCache: 'مسح الذاكرة المؤقتة',
      downloadData: 'تحميل البيانات',
      uploadChanges: 'رفع التغييرات',
      syncSettings: 'إعدادات المزامنة',
      autoSync: 'مزامنة تلقائية',
      syncInterval: 'فترة المزامنة',
      minutes: 'دقيقة',
      syncOnStartup: 'مزامنة عند بدء التشغيل',
      syncOnNetwork: 'مزامنة عند توفر الشبكة',
      encryptData: 'تشفير البيانات المحلية',
      locationFilter: 'تصفية حسب الموقع',
      allLocations: 'جميع المواقع',
      currentLocation: 'الموقع الحالي فقط',
      dataCategories: 'فئات البيانات',
      selectAll: 'تحديد الكل',
      offlineCapabilities: 'الإمكانيات في وضع عدم الاتصال',
      viewPatients: 'عرض المرضى',
      registerPatients: 'تسجيل مرضى جدد',
      recordEncounters: 'تسجيل الزيارات',
      viewAppointments: 'عرض المواعيد',
      fillForms: 'ملء النماذج',
      viewReports: 'عرض التقارير المحفوظة',
      pendingUploads: 'في انتظار الرفع',
      records: 'سجل',
      syncProgress: 'تقدم المزامنة',
      downloading: 'جاري التحميل',
      uploading: 'جاري الرفع',
      processing: 'جاري المعالجة',
      completed: 'مكتمل',
    },
    en: {
      title: 'Offline Mode',
      pageTitle: 'Sync & Offline Mode',
      connectionStatus: 'Connection Status',
      online: 'Online',
      offline: 'Offline',
      syncNow: 'Sync Now',
      syncing: 'Syncing...',
      lastSync: 'Last Full Sync',
      syncStatus: 'Sync Status',
      pendingChanges: 'Pending Changes',
      synced: 'Synced',
      pending: 'Pending',
      error: 'Error',
      patients: 'Patients',
      encounters: 'Encounters',
      appointments: 'Appointments',
      observations: 'Observations',
      orders: 'Orders',
      forms: 'Forms',
      localStorage: 'Local Storage',
      used: 'Used',
      available: 'Available',
      clearCache: 'Clear Cache',
      downloadData: 'Download Data',
      uploadChanges: 'Upload Changes',
      syncSettings: 'Sync Settings',
      autoSync: 'Auto Sync',
      syncInterval: 'Sync Interval',
      minutes: 'minutes',
      syncOnStartup: 'Sync on Startup',
      syncOnNetwork: 'Sync when Network Available',
      encryptData: 'Encrypt Local Data',
      locationFilter: 'Location Filter',
      allLocations: 'All Locations',
      currentLocation: 'Current Location Only',
      dataCategories: 'Data Categories',
      selectAll: 'Select All',
      offlineCapabilities: 'Offline Capabilities',
      viewPatients: 'View Patients',
      registerPatients: 'Register New Patients',
      recordEncounters: 'Record Encounters',
      viewAppointments: 'View Appointments',
      fillForms: 'Fill Forms',
      viewReports: 'View Saved Reports',
      pendingUploads: 'Pending Uploads',
      records: 'records',
      syncProgress: 'Sync Progress',
      downloading: 'Downloading',
      uploading: 'Uploading',
      processing: 'Processing',
      completed: 'Completed',
    },
  };

  const t = translations[locale];
  const isRTL = locale === 'ar';

  // Simulate online/offline detection
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const syncCategories: SyncStatus[] = [
    {
      category: t.patients,
      lastSync: '2024-01-09 18:30',
      pendingChanges: 3,
      status: 'pending',
      icon: <Users className="h-5 w-5" />,
    },
    {
      category: t.encounters,
      lastSync: '2024-01-09 18:30',
      pendingChanges: 5,
      status: 'pending',
      icon: <FileText className="h-5 w-5" />,
    },
    {
      category: t.appointments,
      lastSync: '2024-01-09 18:25',
      pendingChanges: 0,
      status: 'synced',
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      category: t.observations,
      lastSync: '2024-01-09 18:30',
      pendingChanges: 12,
      status: 'pending',
      icon: <FileText className="h-5 w-5" />,
    },
    {
      category: t.orders,
      lastSync: '2024-01-09 18:20',
      pendingChanges: 0,
      status: 'synced',
      icon: <FileText className="h-5 w-5" />,
    },
    {
      category: t.forms,
      lastSync: '2024-01-09 17:00',
      pendingChanges: 0,
      status: 'synced',
      icon: <FileText className="h-5 w-5" />,
    },
  ];

  const storageInfo: StorageInfo = {
    used: 245,
    total: 500,
    percentage: 49,
  };

  const [syncSettings, setSyncSettings] = useState({
    autoSync: true,
    syncInterval: 15,
    syncOnStartup: true,
    syncOnNetwork: true,
    encryptData: true,
    locationFilter: 'current',
  });

  const handleSync = () => {
    setIsSyncing(true);
    // Simulate sync process
    setTimeout(() => {
      setIsSyncing(false);
      setLastFullSync(new Date().toLocaleString());
    }, 3000);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'synced':
        return <Badge variant="success">{t.synced}</Badge>;
      case 'pending':
        return <Badge variant="warning">{t.pending}</Badge>;
      case 'error':
        return <Badge variant="danger">{t.error}</Badge>;
      default:
        return null;
    }
  };

  return (
    <MainLayout title={t.pageTitle} locale={locale} onLocaleChange={setLocale}>
      <div className={`p-6 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
        {/* Connection Status Banner */}
        <div className={`mb-6 p-4 rounded-lg flex items-center justify-between ${
          isOnline ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
        }`}>
          <div className="flex items-center gap-3">
            {isOnline ? (
              <Wifi className="h-6 w-6 text-green-600" />
            ) : (
              <WifiOff className="h-6 w-6 text-red-600" />
            )}
            <div>
              <h2 className={`font-semibold ${isOnline ? 'text-green-800' : 'text-red-800'}`}>
                {t.connectionStatus}: {isOnline ? t.online : t.offline}
              </h2>
              <p className={`text-sm ${isOnline ? 'text-green-600' : 'text-red-600'}`}>
                {t.lastSync}: {lastFullSync}
              </p>
            </div>
          </div>
          <Button
            onClick={handleSync}
            disabled={isSyncing || !isOnline}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isSyncing ? 'animate-spin' : ''}`} />
            {isSyncing ? t.syncing : t.syncNow}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sync Status */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Database className="h-5 w-5 text-blue-600" />
                {t.syncStatus}
              </h3>
              
              <div className="space-y-3">
                {syncCategories.map((category, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white rounded-lg text-blue-600">
                        {category.icon}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{category.category}</p>
                        <p className="text-sm text-gray-500">
                          {t.lastSync}: {category.lastSync}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {category.pendingChanges > 0 && (
                        <span className="text-sm text-orange-600">
                          {category.pendingChanges} {t.pendingChanges}
                        </span>
                      )}
                      {getStatusBadge(category.status)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-wrap gap-3">
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  {t.downloadData}
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  {t.uploadChanges}
                </Button>
                <Button variant="outline" className="flex items-center gap-2 text-red-600 border-red-300 hover:bg-red-50">
                  <Trash2 className="h-4 w-4" />
                  {t.clearCache}
                </Button>
              </div>
            </Card>

            {/* Offline Capabilities */}
            <Card className="p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <WifiOff className="h-5 w-5 text-blue-600" />
                {t.offlineCapabilities}
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { label: t.viewPatients, available: true },
                  { label: t.registerPatients, available: true },
                  { label: t.recordEncounters, available: true },
                  { label: t.viewAppointments, available: true },
                  { label: t.fillForms, available: true },
                  { label: t.viewReports, available: false },
                ].map((capability, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg flex items-center gap-2 ${
                      capability.available
                        ? 'bg-green-50 text-green-700'
                        : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {capability.available ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <AlertCircle className="h-4 w-4" />
                    )}
                    <span className="text-sm">{capability.label}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Storage Info */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <HardDrive className="h-5 w-5 text-blue-600" />
                {t.localStorage}
              </h3>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">{t.used}: {storageInfo.used} MB</span>
                  <span className="text-gray-600">{storageInfo.total} MB</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-blue-600 h-3 rounded-full"
                    style={{ width: `${storageInfo.percentage}%` }}
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  {t.available}: {storageInfo.total - storageInfo.used} MB
                </p>
              </div>
            </Card>

            {/* Sync Settings */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Settings className="h-5 w-5 text-blue-600" />
                {t.syncSettings}
              </h3>
              
              <div className="space-y-4">
                <label className="flex items-center justify-between">
                  <span className="text-gray-700">{t.autoSync}</span>
                  <input
                    type="checkbox"
                    checked={syncSettings.autoSync}
                    onChange={(e) =>
                      setSyncSettings({ ...syncSettings, autoSync: e.target.checked })
                    }
                    className="h-4 w-4 text-blue-600 rounded"
                  />
                </label>

                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    {t.syncInterval}
                  </label>
                  <select
                    value={syncSettings.syncInterval}
                    onChange={(e) =>
                      setSyncSettings({
                        ...syncSettings,
                        syncInterval: parseInt(e.target.value),
                      })
                    }
                    className="w-full border rounded-lg px-3 py-2"
                  >
                    <option value={5}>5 {t.minutes}</option>
                    <option value={15}>15 {t.minutes}</option>
                    <option value={30}>30 {t.minutes}</option>
                    <option value={60}>60 {t.minutes}</option>
                  </select>
                </div>

                <label className="flex items-center justify-between">
                  <span className="text-gray-700">{t.syncOnStartup}</span>
                  <input
                    type="checkbox"
                    checked={syncSettings.syncOnStartup}
                    onChange={(e) =>
                      setSyncSettings({ ...syncSettings, syncOnStartup: e.target.checked })
                    }
                    className="h-4 w-4 text-blue-600 rounded"
                  />
                </label>

                <label className="flex items-center justify-between">
                  <span className="text-gray-700">{t.syncOnNetwork}</span>
                  <input
                    type="checkbox"
                    checked={syncSettings.syncOnNetwork}
                    onChange={(e) =>
                      setSyncSettings({ ...syncSettings, syncOnNetwork: e.target.checked })
                    }
                    className="h-4 w-4 text-blue-600 rounded"
                  />
                </label>

                <label className="flex items-center justify-between">
                  <span className="text-gray-700 flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    {t.encryptData}
                  </span>
                  <input
                    type="checkbox"
                    checked={syncSettings.encryptData}
                    onChange={(e) =>
                      setSyncSettings({ ...syncSettings, encryptData: e.target.checked })
                    }
                    className="h-4 w-4 text-blue-600 rounded"
                  />
                </label>

                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    {t.locationFilter}
                  </label>
                  <select
                    value={syncSettings.locationFilter}
                    onChange={(e) =>
                      setSyncSettings({
                        ...syncSettings,
                        locationFilter: e.target.value,
                      })
                    }
                    className="w-full border rounded-lg px-3 py-2"
                  >
                    <option value="all">{t.allLocations}</option>
                    <option value="current">{t.currentLocation}</option>
                  </select>
                </div>
              </div>
            </Card>

            {/* Pending Uploads */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5 text-orange-600" />
                {t.pendingUploads}
              </h3>
              
              <div className="text-center py-4">
                <p className="text-3xl font-bold text-orange-600">20</p>
                <p className="text-gray-500">{t.records}</p>
              </div>
              
              <Button
                className="w-full"
                disabled={!isOnline}
                onClick={handleSync}
              >
                <Upload className="h-4 w-4 mr-2" />
                {t.uploadChanges}
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
