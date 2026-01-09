'use client';

import React, { useState } from 'react';
import { MainLayout } from '@/components/layout';
import { Card, Button, Badge } from '@/components/ui';
import {
  Settings,
  Globe,
  Palette,
  Bell,
  Lock,
  Database,
  Printer,
  HelpCircle,
  ChevronRight,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Save,
  RefreshCw,
} from 'lucide-react';

// Settings Module - User preferences and application settings

interface SettingSection {
  id: string;
  icon: React.ReactNode;
  label: string;
  labelAr: string;
  description: string;
  descriptionAr: string;
}

const settingSections: SettingSection[] = [
  {
    id: 'language', icon: <Globe size={24} />,
    label: 'Language & Region', labelAr: 'اللغة والمنطقة',
    description: 'Interface language and regional settings', descriptionAr: 'لغة الواجهة والإعدادات الإقليمية'
  },
  {
    id: 'appearance', icon: <Palette size={24} />,
    label: 'Appearance', labelAr: 'المظهر',
    description: 'Theme, colors, and display preferences', descriptionAr: 'السمة والألوان وتفضيلات العرض'
  },
  {
    id: 'notifications', icon: <Bell size={24} />,
    label: 'Notifications', labelAr: 'الإشعارات',
    description: 'Manage notification preferences', descriptionAr: 'إدارة تفضيلات الإشعارات'
  },
  {
    id: 'privacy', icon: <Lock size={24} />,
    label: 'Privacy & Security', labelAr: 'الخصوصية والأمان',
    description: 'Account security and privacy settings', descriptionAr: 'أمان الحساب وإعدادات الخصوصية'
  },
  {
    id: 'printing', icon: <Printer size={24} />,
    label: 'Printing', labelAr: 'الطباعة',
    description: 'Print settings and templates', descriptionAr: 'إعدادات الطباعة والقوالب'
  },
  {
    id: 'data', icon: <Database size={24} />,
    label: 'Data Management', labelAr: 'إدارة البيانات',
    description: 'Sync, export, and cache settings', descriptionAr: 'إعدادات المزامنة والتصدير والتخزين المؤقت'
  },
  {
    id: 'help', icon: <HelpCircle size={24} />,
    label: 'Help & Support', labelAr: 'المساعدة والدعم',
    description: 'Documentation and support resources', descriptionAr: 'الوثائق وموارد الدعم'
  },
];

export default function SettingsPage() {
  const [locale, setLocale] = useState<'ar' | 'en'>('ar');
  const [selectedSection, setSelectedSection] = useState<string>('language');
  
  // Settings state
  const [settings, setSettings] = useState({
    language: 'ar',
    region: 'YE',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '12h',
    currency: 'YER',
    theme: 'light',
    primaryColor: 'blue',
    fontSize: 'medium',
    compactMode: false,
    emailNotifications: true,
    pushNotifications: true,
    soundEnabled: true,
    twoFactorEnabled: false,
    sessionTimeout: 30,
    autoLogout: true,
    defaultPrinter: 'default',
    paperSize: 'A4',
    headerLogo: true,
    autoSync: true,
    syncInterval: 5,
    offlineMode: true,
  });

  const isRTL = locale === 'ar';

  const t = {
    title: isRTL ? 'الإعدادات' : 'Settings',
    subtitle: isRTL ? 'تخصيص تفضيلات التطبيق' : 'Customize your application preferences',
    save: isRTL ? 'حفظ التغييرات' : 'Save Changes',
    reset: isRTL ? 'إعادة تعيين' : 'Reset',
    language: isRTL ? 'اللغة' : 'Language',
    arabic: isRTL ? 'العربية' : 'Arabic',
    english: isRTL ? 'الإنجليزية' : 'English',
    region: isRTL ? 'المنطقة' : 'Region',
    yemen: isRTL ? 'اليمن' : 'Yemen',
    dateFormat: isRTL ? 'تنسيق التاريخ' : 'Date Format',
    timeFormat: isRTL ? 'تنسيق الوقت' : 'Time Format',
    currency: isRTL ? 'العملة' : 'Currency',
    yemeniRial: isRTL ? 'ريال يمني' : 'Yemeni Rial',
    theme: isRTL ? 'السمة' : 'Theme',
    light: isRTL ? 'فاتح' : 'Light',
    dark: isRTL ? 'داكن' : 'Dark',
    system: isRTL ? 'النظام' : 'System',
    primaryColor: isRTL ? 'اللون الأساسي' : 'Primary Color',
    fontSize: isRTL ? 'حجم الخط' : 'Font Size',
    small: isRTL ? 'صغير' : 'Small',
    medium: isRTL ? 'متوسط' : 'Medium',
    large: isRTL ? 'كبير' : 'Large',
    compactMode: isRTL ? 'الوضع المضغوط' : 'Compact Mode',
    emailNotifications: isRTL ? 'إشعارات البريد' : 'Email Notifications',
    pushNotifications: isRTL ? 'الإشعارات الفورية' : 'Push Notifications',
    soundEnabled: isRTL ? 'تفعيل الصوت' : 'Sound Enabled',
    twoFactorAuth: isRTL ? 'المصادقة الثنائية' : 'Two-Factor Authentication',
    sessionTimeout: isRTL ? 'انتهاء الجلسة (دقائق)' : 'Session Timeout (minutes)',
    autoLogout: isRTL ? 'تسجيل خروج تلقائي' : 'Auto Logout',
    defaultPrinter: isRTL ? 'الطابعة الافتراضية' : 'Default Printer',
    paperSize: isRTL ? 'حجم الورق' : 'Paper Size',
    headerLogo: isRTL ? 'شعار الترويسة' : 'Header Logo',
    autoSync: isRTL ? 'مزامنة تلقائية' : 'Auto Sync',
    syncInterval: isRTL ? 'فترة المزامنة (دقائق)' : 'Sync Interval (minutes)',
    offlineMode: isRTL ? 'وضع عدم الاتصال' : 'Offline Mode',
    enabled: isRTL ? 'مفعل' : 'Enabled',
    disabled: isRTL ? 'معطل' : 'Disabled',
    changePassword: isRTL ? 'تغيير كلمة المرور' : 'Change Password',
    documentation: isRTL ? 'الوثائق' : 'Documentation',
    contactSupport: isRTL ? 'الاتصال بالدعم' : 'Contact Support',
    version: isRTL ? 'الإصدار' : 'Version',
  };

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const renderLanguageSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">{t.language}</label>
        <select
          value={settings.language}
          onChange={(e) => {
            handleSettingChange('language', e.target.value);
            setLocale(e.target.value as 'ar' | 'en');
          }}
          className="w-full md:w-64 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500"
        >
          <option value="ar">{t.arabic}</option>
          <option value="en">{t.english}</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">{t.region}</label>
        <select
          value={settings.region}
          onChange={(e) => handleSettingChange('region', e.target.value)}
          className="w-full md:w-64 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500"
        >
          <option value="YE">{t.yemen}</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">{t.dateFormat}</label>
        <select
          value={settings.dateFormat}
          onChange={(e) => handleSettingChange('dateFormat', e.target.value)}
          className="w-full md:w-64 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500"
        >
          <option value="DD/MM/YYYY">DD/MM/YYYY</option>
          <option value="MM/DD/YYYY">MM/DD/YYYY</option>
          <option value="YYYY-MM-DD">YYYY-MM-DD</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">{t.timeFormat}</label>
        <select
          value={settings.timeFormat}
          onChange={(e) => handleSettingChange('timeFormat', e.target.value)}
          className="w-full md:w-64 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500"
        >
          <option value="12h">12 Hour (AM/PM)</option>
          <option value="24h">24 Hour</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">{t.currency}</label>
        <select
          value={settings.currency}
          onChange={(e) => handleSettingChange('currency', e.target.value)}
          className="w-full md:w-64 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500"
        >
          <option value="YER">{t.yemeniRial} (YER)</option>
        </select>
      </div>
    </div>
  );

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">{t.theme}</label>
        <div className="flex gap-4">
          {[
            { value: 'light', icon: <Sun size={20} />, label: t.light },
            { value: 'dark', icon: <Moon size={20} />, label: t.dark },
          ].map((theme) => (
            <button
              key={theme.value}
              onClick={() => handleSettingChange('theme', theme.value)}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg border-2 transition-colors ${
                settings.theme === theme.value
                  ? 'border-primary-500 bg-primary-50 text-primary-600'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              {theme.icon}
              <span>{theme.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">{t.primaryColor}</label>
        <div className="flex gap-3">
          {['blue', 'green', 'purple', 'red', 'orange'].map((color) => (
            <button
              key={color}
              onClick={() => handleSettingChange('primaryColor', color)}
              className={`w-10 h-10 rounded-full transition-transform ${
                settings.primaryColor === color ? 'scale-110 ring-2 ring-offset-2 ring-slate-400' : ''
              }`}
              style={{ backgroundColor: {
                blue: '#3B82F6',
                green: '#10B981',
                purple: '#8B5CF6',
                red: '#EF4444',
                orange: '#F97316',
              }[color] }}
            />
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">{t.fontSize}</label>
        <select
          value={settings.fontSize}
          onChange={(e) => handleSettingChange('fontSize', e.target.value)}
          className="w-full md:w-64 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500"
        >
          <option value="small">{t.small}</option>
          <option value="medium">{t.medium}</option>
          <option value="large">{t.large}</option>
        </select>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <div className="font-medium text-slate-700">{t.compactMode}</div>
          <div className="text-sm text-slate-500">
            {isRTL ? 'تقليل المسافات بين العناصر' : 'Reduce spacing between elements'}
          </div>
        </div>
        <button
          onClick={() => handleSettingChange('compactMode', !settings.compactMode)}
          className={`w-12 h-6 rounded-full transition-colors ${
            settings.compactMode ? 'bg-primary-500' : 'bg-slate-300'
          }`}
        >
          <div className={`w-5 h-5 rounded-full bg-white shadow transform transition-transform ${
            settings.compactMode ? (isRTL ? '-translate-x-6' : 'translate-x-6') : 'translate-x-0.5'
          }`} />
        </button>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      {[
        { key: 'emailNotifications', label: t.emailNotifications },
        { key: 'pushNotifications', label: t.pushNotifications },
      ].map((item) => (
        <div key={item.key} className="flex items-center justify-between">
          <div className="font-medium text-slate-700">{item.label}</div>
          <button
            onClick={() => handleSettingChange(item.key, !(settings as any)[item.key])}
            className={`w-12 h-6 rounded-full transition-colors ${
              (settings as any)[item.key] ? 'bg-primary-500' : 'bg-slate-300'
            }`}
          >
            <div className={`w-5 h-5 rounded-full bg-white shadow transform transition-transform ${
              (settings as any)[item.key] ? (isRTL ? '-translate-x-6' : 'translate-x-6') : 'translate-x-0.5'
            }`} />
          </button>
        </div>
      ))}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {settings.soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          <span className="font-medium text-slate-700">{t.soundEnabled}</span>
        </div>
        <button
          onClick={() => handleSettingChange('soundEnabled', !settings.soundEnabled)}
          className={`w-12 h-6 rounded-full transition-colors ${
            settings.soundEnabled ? 'bg-primary-500' : 'bg-slate-300'
          }`}
        >
          <div className={`w-5 h-5 rounded-full bg-white shadow transform transition-transform ${
            settings.soundEnabled ? (isRTL ? '-translate-x-6' : 'translate-x-6') : 'translate-x-0.5'
          }`} />
        </button>
      </div>
    </div>
  );

  const renderPrivacySettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="font-medium text-slate-700">{t.twoFactorAuth}</div>
          <div className="text-sm text-slate-500">
            {isRTL ? 'إضافة طبقة أمان إضافية' : 'Add an extra layer of security'}
          </div>
        </div>
        <button
          onClick={() => handleSettingChange('twoFactorEnabled', !settings.twoFactorEnabled)}
          className={`w-12 h-6 rounded-full transition-colors ${
            settings.twoFactorEnabled ? 'bg-primary-500' : 'bg-slate-300'
          }`}
        >
          <div className={`w-5 h-5 rounded-full bg-white shadow transform transition-transform ${
            settings.twoFactorEnabled ? (isRTL ? '-translate-x-6' : 'translate-x-6') : 'translate-x-0.5'
          }`} />
        </button>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">{t.sessionTimeout}</label>
        <select
          value={settings.sessionTimeout}
          onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
          className="w-full md:w-64 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500"
        >
          <option value={15}>15</option>
          <option value={30}>30</option>
          <option value={60}>60</option>
          <option value={120}>120</option>
        </select>
      </div>
      <div className="flex items-center justify-between">
        <div className="font-medium text-slate-700">{t.autoLogout}</div>
        <button
          onClick={() => handleSettingChange('autoLogout', !settings.autoLogout)}
          className={`w-12 h-6 rounded-full transition-colors ${
            settings.autoLogout ? 'bg-primary-500' : 'bg-slate-300'
          }`}
        >
          <div className={`w-5 h-5 rounded-full bg-white shadow transform transition-transform ${
            settings.autoLogout ? (isRTL ? '-translate-x-6' : 'translate-x-6') : 'translate-x-0.5'
          }`} />
        </button>
      </div>
      <div className="pt-4">
        <Button variant="outline">
          <Lock size={18} className={isRTL ? 'ml-2' : 'mr-2'} />
          {t.changePassword}
        </Button>
      </div>
    </div>
  );

  const renderSettingContent = () => {
    switch (selectedSection) {
      case 'language': return renderLanguageSettings();
      case 'appearance': return renderAppearanceSettings();
      case 'notifications': return renderNotificationSettings();
      case 'privacy': return renderPrivacySettings();
      default:
        return (
          <div className="text-center py-12">
            <Settings size={48} className="mx-auto text-slate-300 mb-4" />
            <p className="text-slate-500">
              {isRTL ? 'قيد التطوير' : 'Coming soon'}
            </p>
          </div>
        );
    }
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
              <Settings className="text-primary-500" />
              {t.title}
            </h1>
            <p className="text-slate-500 mt-1">{t.subtitle}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Settings Menu */}
          <div className="lg:col-span-1">
            <Card>
              <div className="p-2">
                {settingSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setSelectedSection(section.id)}
                    className={`
                      w-full flex items-center gap-3 p-3 rounded-lg transition-colors text-start
                      ${selectedSection === section.id
                        ? 'bg-primary-50 text-primary-600'
                        : 'hover:bg-slate-50 text-slate-600'}
                    `}
                  >
                    <div className={selectedSection === section.id ? 'text-primary-500' : 'text-slate-400'}>
                      {section.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">
                        {isRTL ? section.labelAr : section.label}
                      </div>
                      <div className="text-xs text-slate-500 truncate">
                        {isRTL ? section.descriptionAr : section.description}
                      </div>
                    </div>
                    <ChevronRight size={16} className={isRTL ? 'rotate-180' : ''} />
                  </button>
                ))}
              </div>
            </Card>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3">
            <Card>
              <div className="p-4 border-b border-slate-200">
                <h2 className="font-semibold text-slate-800">
                  {isRTL
                    ? settingSections.find(s => s.id === selectedSection)?.labelAr
                    : settingSections.find(s => s.id === selectedSection)?.label}
                </h2>
              </div>
              <div className="p-6">
                {renderSettingContent()}
              </div>
              <div className="p-4 border-t border-slate-200 flex justify-end gap-2">
                <Button variant="outline">
                  <RefreshCw size={18} className={isRTL ? 'ml-2' : 'mr-2'} />
                  {t.reset}
                </Button>
                <Button>
                  <Save size={18} className={isRTL ? 'ml-2' : 'mr-2'} />
                  {t.save}
                </Button>
              </div>
            </Card>

            {/* Version Info */}
            <div className="mt-4 text-center text-sm text-slate-500">
              {t.version}: 1.0.0 | Yemen Health System © 2024
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
