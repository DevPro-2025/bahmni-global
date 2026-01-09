'use client';

import React, { useState } from 'react';
import { MainLayout } from '@/components/layout';
import { Card, Button, Badge, Input } from '@/components/ui';
import {
  Shield,
  Lock,
  Key,
  Smartphone,
  Mail,
  Eye,
  EyeOff,
  CheckCircle,
  AlertTriangle,
  Clock,
  User,
  LogIn,
  LogOut,
  Settings,
  History,
  Fingerprint,
  QrCode,
  RefreshCw,
  Copy,
  Download,
} from 'lucide-react';

// Security & Two-Factor Authentication Module
// Matches the workflow of two-factor-auth, bahmni-sms-plugins

interface LoginSession {
  id: string;
  device: string;
  browser: string;
  location: string;
  ip: string;
  lastActive: string;
  current: boolean;
}

interface AuditLog {
  id: string;
  action: string;
  user: string;
  timestamp: string;
  ip: string;
  status: 'success' | 'failed' | 'warning';
}

export default function SecurityPage() {
  const [locale, setLocale] = useState<'ar' | 'en'>('ar');
  const [show2FASetup, setShow2FASetup] = useState(false);
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [activeTab, setActiveTab] = useState<'2fa' | 'sessions' | 'audit'>('2fa');
  
  const translations = {
    ar: {
      title: 'الأمان والمصادقة',
      pageTitle: 'إعدادات الأمان',
      twoFactorAuth: 'المصادقة الثنائية',
      activeSessions: 'الجلسات النشطة',
      auditLog: 'سجل التدقيق',
      enable2FA: 'تفعيل المصادقة الثنائية',
      disable2FA: 'إلغاء المصادقة الثنائية',
      setup2FA: 'إعداد المصادقة الثنائية',
      status: 'الحالة',
      enabled: 'مفعّل',
      disabled: 'معطّل',
      authMethod: 'طريقة المصادقة',
      authenticatorApp: 'تطبيق المصادقة',
      smsVerification: 'رمز SMS',
      emailVerification: 'رمز البريد الإلكتروني',
      scanQRCode: 'امسح رمز QR',
      manualEntry: 'الإدخال اليدوي',
      secretKey: 'المفتاح السري',
      verificationCode: 'رمز التحقق',
      enterCode: 'أدخل الرمز من التطبيق',
      verify: 'تحقق',
      backupCodes: 'رموز الاسترداد',
      generateBackupCodes: 'إنشاء رموز استرداد',
      downloadCodes: 'تحميل الرموز',
      copyCode: 'نسخ الرمز',
      device: 'الجهاز',
      browser: 'المتصفح',
      location: 'الموقع',
      ipAddress: 'عنوان IP',
      lastActive: 'آخر نشاط',
      current: 'الجلسة الحالية',
      endSession: 'إنهاء الجلسة',
      endAllSessions: 'إنهاء جميع الجلسات',
      action: 'الإجراء',
      user: 'المستخدم',
      timestamp: 'التوقيت',
      success: 'ناجح',
      failed: 'فشل',
      warning: 'تحذير',
      loginAttempt: 'محاولة تسجيل دخول',
      passwordChange: 'تغيير كلمة المرور',
      settingsChange: 'تغيير الإعدادات',
      dataAccess: 'الوصول للبيانات',
      exportData: 'تصدير البيانات',
      filterByDate: 'تصفية حسب التاريخ',
      filterByAction: 'تصفية حسب الإجراء',
      allActions: 'جميع الإجراءات',
      securityTips: 'نصائح أمنية',
      tip1: 'استخدم كلمة مرور قوية وفريدة',
      tip2: 'فعّل المصادقة الثنائية',
      tip3: 'راجع الجلسات النشطة بانتظام',
      tip4: 'لا تشارك رموز المصادقة',
      passwordSecurity: 'أمان كلمة المرور',
      currentPassword: 'كلمة المرور الحالية',
      newPassword: 'كلمة المرور الجديدة',
      confirmPassword: 'تأكيد كلمة المرور',
      changePassword: 'تغيير كلمة المرور',
      lastPasswordChange: 'آخر تغيير لكلمة المرور',
      daysAgo: 'يوم مضى',
      passwordStrength: 'قوة كلمة المرور',
      weak: 'ضعيفة',
      medium: 'متوسطة',
      strong: 'قوية',
      step1: 'الخطوة 1',
      step2: 'الخطوة 2',
      step3: 'الخطوة 3',
      installApp: 'ثبّت تطبيق المصادقة',
      scanCode: 'امسح الرمز',
      enterVerification: 'أدخل رمز التحقق',
    },
    en: {
      title: 'Security & Authentication',
      pageTitle: 'Security Settings',
      twoFactorAuth: 'Two-Factor Authentication',
      activeSessions: 'Active Sessions',
      auditLog: 'Audit Log',
      enable2FA: 'Enable 2FA',
      disable2FA: 'Disable 2FA',
      setup2FA: 'Setup 2FA',
      status: 'Status',
      enabled: 'Enabled',
      disabled: 'Disabled',
      authMethod: 'Authentication Method',
      authenticatorApp: 'Authenticator App',
      smsVerification: 'SMS Verification',
      emailVerification: 'Email Verification',
      scanQRCode: 'Scan QR Code',
      manualEntry: 'Manual Entry',
      secretKey: 'Secret Key',
      verificationCode: 'Verification Code',
      enterCode: 'Enter code from app',
      verify: 'Verify',
      backupCodes: 'Backup Codes',
      generateBackupCodes: 'Generate Backup Codes',
      downloadCodes: 'Download Codes',
      copyCode: 'Copy Code',
      device: 'Device',
      browser: 'Browser',
      location: 'Location',
      ipAddress: 'IP Address',
      lastActive: 'Last Active',
      current: 'Current Session',
      endSession: 'End Session',
      endAllSessions: 'End All Sessions',
      action: 'Action',
      user: 'User',
      timestamp: 'Timestamp',
      success: 'Success',
      failed: 'Failed',
      warning: 'Warning',
      loginAttempt: 'Login Attempt',
      passwordChange: 'Password Change',
      settingsChange: 'Settings Change',
      dataAccess: 'Data Access',
      exportData: 'Export Data',
      filterByDate: 'Filter by Date',
      filterByAction: 'Filter by Action',
      allActions: 'All Actions',
      securityTips: 'Security Tips',
      tip1: 'Use a strong, unique password',
      tip2: 'Enable two-factor authentication',
      tip3: 'Review active sessions regularly',
      tip4: 'Never share authentication codes',
      passwordSecurity: 'Password Security',
      currentPassword: 'Current Password',
      newPassword: 'New Password',
      confirmPassword: 'Confirm Password',
      changePassword: 'Change Password',
      lastPasswordChange: 'Last Password Change',
      daysAgo: 'days ago',
      passwordStrength: 'Password Strength',
      weak: 'Weak',
      medium: 'Medium',
      strong: 'Strong',
      step1: 'Step 1',
      step2: 'Step 2',
      step3: 'Step 3',
      installApp: 'Install Authenticator App',
      scanCode: 'Scan Code',
      enterVerification: 'Enter Verification Code',
    },
  };

  const t = translations[locale];
  const isRTL = locale === 'ar';

  const sessions: LoginSession[] = [
    {
      id: '1',
      device: 'Windows PC',
      browser: 'Chrome 120',
      location: isRTL ? 'صنعاء، اليمن' : "Sana'a, Yemen",
      ip: '192.168.1.100',
      lastActive: isRTL ? 'الآن' : 'Now',
      current: true,
    },
    {
      id: '2',
      device: 'iPhone 14',
      browser: 'Safari 17',
      location: isRTL ? 'عدن، اليمن' : 'Aden, Yemen',
      ip: '192.168.2.50',
      lastActive: isRTL ? 'منذ ساعة' : '1 hour ago',
      current: false,
    },
    {
      id: '3',
      device: 'Android Tablet',
      browser: 'Chrome Mobile',
      location: isRTL ? 'تعز، اليمن' : 'Taiz, Yemen',
      ip: '192.168.3.75',
      lastActive: isRTL ? 'منذ يوم' : '1 day ago',
      current: false,
    },
  ];

  const auditLogs: AuditLog[] = [
    {
      id: '1',
      action: t.loginAttempt,
      user: 'admin',
      timestamp: '2024-01-09 10:30:00',
      ip: '192.168.1.100',
      status: 'success',
    },
    {
      id: '2',
      action: t.dataAccess,
      user: 'admin',
      timestamp: '2024-01-09 10:25:00',
      ip: '192.168.1.100',
      status: 'success',
    },
    {
      id: '3',
      action: t.loginAttempt,
      user: 'unknown',
      timestamp: '2024-01-09 09:45:00',
      ip: '10.0.0.50',
      status: 'failed',
    },
    {
      id: '4',
      action: t.passwordChange,
      user: 'admin',
      timestamp: '2024-01-08 15:00:00',
      ip: '192.168.1.100',
      status: 'success',
    },
    {
      id: '5',
      action: t.settingsChange,
      user: 'admin',
      timestamp: '2024-01-08 14:30:00',
      ip: '192.168.1.100',
      status: 'warning',
    },
  ];

  const backupCodes = [
    'ABCD-1234-EFGH',
    'IJKL-5678-MNOP',
    'QRST-9012-UVWX',
    'YZAB-3456-CDEF',
    'GHIJ-7890-KLMN',
    'OPQR-1234-STUV',
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return <Badge variant="success">{t.success}</Badge>;
      case 'failed':
        return <Badge variant="danger">{t.failed}</Badge>;
      case 'warning':
        return <Badge variant="warning">{t.warning}</Badge>;
      default:
        return null;
    }
  };

  return (
    <MainLayout title={t.pageTitle} locale={locale} onLocaleChange={setLocale}>
      <div className={`p-6 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <Shield className="h-7 w-7 text-blue-600" />
            {t.title}
          </h1>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b pb-2">
          <Button
            variant={activeTab === '2fa' ? 'primary' : 'outline'}
            onClick={() => setActiveTab('2fa')}
            className="flex items-center gap-2"
          >
            <Key className="h-4 w-4" />
            {t.twoFactorAuth}
          </Button>
          <Button
            variant={activeTab === 'sessions' ? 'primary' : 'outline'}
            onClick={() => setActiveTab('sessions')}
            className="flex items-center gap-2"
          >
            <User className="h-4 w-4" />
            {t.activeSessions}
          </Button>
          <Button
            variant={activeTab === 'audit' ? 'primary' : 'outline'}
            onClick={() => setActiveTab('audit')}
            className="flex items-center gap-2"
          >
            <History className="h-4 w-4" />
            {t.auditLog}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === '2fa' && (
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-full ${is2FAEnabled ? 'bg-green-100' : 'bg-gray-100'}`}>
                      <Fingerprint className={`h-6 w-6 ${is2FAEnabled ? 'text-green-600' : 'text-gray-400'}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{t.twoFactorAuth}</h3>
                      <p className="text-sm text-gray-500">
                        {t.status}: {is2FAEnabled ? (
                          <span className="text-green-600">{t.enabled}</span>
                        ) : (
                          <span className="text-gray-400">{t.disabled}</span>
                        )}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant={is2FAEnabled ? 'outline' : 'primary'}
                    onClick={() => {
                      if (is2FAEnabled) {
                        setIs2FAEnabled(false);
                      } else {
                        setShow2FASetup(true);
                      }
                    }}
                  >
                    {is2FAEnabled ? t.disable2FA : t.enable2FA}
                  </Button>
                </div>

                {show2FASetup && !is2FAEnabled && (
                  <div className="border-t pt-6">
                    <h4 className="font-medium text-gray-900 mb-4">{t.setup2FA}</h4>
                    
                    {/* Steps */}
                    <div className="space-y-6">
                      {/* Step 1 */}
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-medium">
                          1
                        </div>
                        <div className="flex-1">
                          <h5 className="font-medium text-gray-900">{t.step1}: {t.installApp}</h5>
                          <p className="text-sm text-gray-500 mt-1">
                            Google Authenticator, Microsoft Authenticator, Authy
                          </p>
                        </div>
                      </div>

                      {/* Step 2 */}
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-medium">
                          2
                        </div>
                        <div className="flex-1">
                          <h5 className="font-medium text-gray-900">{t.step2}: {t.scanCode}</h5>
                          <div className="mt-3 flex flex-col items-center">
                            <div className="w-40 h-40 bg-gray-100 border-2 border-dashed rounded-lg flex items-center justify-center">
                              <QrCode className="h-20 w-20 text-gray-400" />
                            </div>
                            <p className="text-sm text-gray-500 mt-2">{t.manualEntry}:</p>
                            <div className="flex items-center gap-2 mt-1">
                              <code className="bg-gray-100 px-3 py-1 rounded text-sm">JBSWY3DPEHPK3PXP</code>
                              <Button size="sm" variant="outline">
                                <Copy className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Step 3 */}
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-medium">
                          3
                        </div>
                        <div className="flex-1">
                          <h5 className="font-medium text-gray-900">{t.step3}: {t.enterVerification}</h5>
                          <div className="mt-3 flex gap-3">
                            <Input
                              type="text"
                              placeholder="000000"
                              value={verificationCode}
                              onChange={(e) => setVerificationCode(e.target.value)}
                              className="w-32 text-center text-lg tracking-widest"
                              maxLength={6}
                            />
                            <Button
                              onClick={() => {
                                if (verificationCode.length === 6) {
                                  setIs2FAEnabled(true);
                                  setShow2FASetup(false);
                                  setVerificationCode('');
                                }
                              }}
                            >
                              {t.verify}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {is2FAEnabled && (
                  <div className="border-t pt-6">
                    <h4 className="font-medium text-gray-900 mb-4">{t.backupCodes}</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
                      {backupCodes.map((code, index) => (
                        <code key={index} className="bg-gray-100 px-3 py-2 rounded text-sm text-center">
                          {code}
                        </code>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <Button variant="outline" className="flex items-center gap-2">
                        <RefreshCw className="h-4 w-4" />
                        {t.generateBackupCodes}
                      </Button>
                      <Button variant="outline" className="flex items-center gap-2">
                        <Download className="h-4 w-4" />
                        {t.downloadCodes}
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
            )}

            {activeTab === 'sessions' && (
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <User className="h-5 w-5 text-blue-600" />
                    {t.activeSessions}
                  </h3>
                  <Button variant="outline" size="sm" className="text-red-600 border-red-300">
                    <LogOut className="h-4 w-4 mr-2" />
                    {t.endAllSessions}
                  </Button>
                </div>

                <div className="space-y-4">
                  {sessions.map((session) => (
                    <div
                      key={session.id}
                      className={`p-4 border rounded-lg ${session.current ? 'border-green-300 bg-green-50' : ''}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gray-100 rounded-lg">
                            <Smartphone className="h-5 w-5 text-gray-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {session.device}
                              {session.current && (
                                <Badge variant="success" className="ml-2">{t.current}</Badge>
                              )}
                            </p>
                            <p className="text-sm text-gray-500">
                              {session.browser} • {session.location}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">{session.ip}</p>
                          <p className="text-sm text-gray-400">{session.lastActive}</p>
                        </div>
                      </div>
                      {!session.current && (
                        <div className="mt-3 pt-3 border-t">
                          <Button size="sm" variant="outline" className="text-red-600 border-red-300">
                            <LogOut className="h-4 w-4 mr-2" />
                            {t.endSession}
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {activeTab === 'audit' && (
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <History className="h-5 w-5 text-blue-600" />
                    {t.auditLog}
                  </h3>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    {t.exportData}
                  </Button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">{t.timestamp}</th>
                        <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">{t.action}</th>
                        <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">{t.user}</th>
                        <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">{t.ipAddress}</th>
                        <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">{t.status}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {auditLogs.map((log) => (
                        <tr key={log.id} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-500">{log.timestamp}</td>
                          <td className="px-4 py-3 text-sm text-gray-900">{log.action}</td>
                          <td className="px-4 py-3 text-sm text-gray-700">{log.user}</td>
                          <td className="px-4 py-3 text-sm text-gray-500">{log.ip}</td>
                          <td className="px-4 py-3">{getStatusBadge(log.status)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Password Security */}
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Lock className="h-5 w-5 text-blue-600" />
                {t.passwordSecurity}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">{t.currentPassword}</label>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">{t.newPassword}</label>
                  <Input type="password" placeholder="••••••••" />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">{t.confirmPassword}</label>
                  <Input type="password" placeholder="••••••••" />
                </div>
                <Button className="w-full">
                  <Lock className="h-4 w-4 mr-2" />
                  {t.changePassword}
                </Button>
                
                <p className="text-sm text-gray-500">
                  {t.lastPasswordChange}: <span className="font-medium">30 {t.daysAgo}</span>
                </p>
              </div>
            </Card>

            {/* Security Tips */}
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                {t.securityTips}
              </h3>
              
              <ul className="space-y-3">
                {[t.tip1, t.tip2, t.tip3, t.tip4].map((tip, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                    {tip}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
