'use client';

import React, { useState } from 'react';
import { MainLayout } from '@/components/layout';
import { Card, Button, Badge } from '@/components/ui';
import {
  Shield,
  Users,
  Settings,
  Database,
  Globe,
  Bell,
  Lock,
  UserCog,
  Building,
  FileText,
  Activity,
  AlertCircle,
  CheckCircle,
  ChevronRight,
  Plus,
  Edit,
  Trash2,
  Key,
  RefreshCw,
} from 'lucide-react';

// Admin Module - System Administration
// Matches Bahmni admin module for system configuration and user management

interface AdminUser {
  id: string;
  username: string;
  fullName: string;
  fullNameAr: string;
  email: string;
  role: string;
  roleAr: string;
  lastLogin?: string;
  status: 'ACTIVE' | 'INACTIVE' | 'LOCKED';
  createdAt: string;
}

interface SystemLog {
  id: string;
  action: string;
  actionAr: string;
  user: string;
  userAr: string;
  timestamp: string;
  details: string;
  severity: 'INFO' | 'WARNING' | 'ERROR';
}

const mockUsers: AdminUser[] = [
  {
    id: '1', username: 'admin', fullName: 'System Administrator', fullNameAr: 'مدير النظام',
    email: 'admin@hospital.ye', role: 'Super Admin', roleAr: 'مدير عام',
    lastLogin: '2024-01-10 08:30', status: 'ACTIVE', createdAt: '2023-01-01'
  },
  {
    id: '2', username: 'dr.ali', fullName: 'Dr. Ali Hassan', fullNameAr: 'د. علي حسن',
    email: 'ali.hassan@hospital.ye', role: 'Doctor', roleAr: 'طبيب',
    lastLogin: '2024-01-10 09:15', status: 'ACTIVE', createdAt: '2023-06-15'
  },
  {
    id: '3', username: 'nurse.sara', fullName: 'Nurse Sara Ahmed', fullNameAr: 'الممرضة سارة أحمد',
    email: 'sara.ahmed@hospital.ye', role: 'Nurse', roleAr: 'ممرضة',
    lastLogin: '2024-01-10 07:00', status: 'ACTIVE', createdAt: '2023-08-20'
  },
  {
    id: '4', username: 'lab.tech', fullName: 'Mohammed Saleh', fullNameAr: 'محمد صالح',
    email: 'mohammed.lab@hospital.ye', role: 'Lab Technician', roleAr: 'فني مختبر',
    lastLogin: '2024-01-09 16:30', status: 'ACTIVE', createdAt: '2023-09-10'
  },
  {
    id: '5', username: 'pharmacy.1', fullName: 'Fatima Omar', fullNameAr: 'فاطمة عمر',
    email: 'fatima.pharmacy@hospital.ye', role: 'Pharmacist', roleAr: 'صيدلانية',
    status: 'INACTIVE', createdAt: '2023-07-01'
  },
  {
    id: '6', username: 'billing.clerk', fullName: 'Khalid Abdullah', fullNameAr: 'خالد عبدالله',
    email: 'khalid.billing@hospital.ye', role: 'Billing Clerk', roleAr: 'موظف فوترة',
    lastLogin: '2024-01-08 14:00', status: 'LOCKED', createdAt: '2023-10-05'
  },
];

const mockLogs: SystemLog[] = [
  {
    id: '1', action: 'User Login', actionAr: 'تسجيل دخول',
    user: 'admin', userAr: 'مدير النظام', timestamp: '2024-01-10 08:30:15',
    details: 'Successful login from 192.168.1.100', severity: 'INFO'
  },
  {
    id: '2', action: 'Patient Registration', actionAr: 'تسجيل مريض',
    user: 'nurse.sara', userAr: 'الممرضة سارة', timestamp: '2024-01-10 09:15:22',
    details: 'New patient YEM-025 registered', severity: 'INFO'
  },
  {
    id: '3', action: 'Failed Login', actionAr: 'فشل تسجيل الدخول',
    user: 'billing.clerk', userAr: 'موظف الفوترة', timestamp: '2024-01-10 07:45:10',
    details: 'Account locked after 3 failed attempts', severity: 'WARNING'
  },
  {
    id: '4', action: 'Database Backup', actionAr: 'نسخ احتياطي',
    user: 'system', userAr: 'النظام', timestamp: '2024-01-10 00:00:00',
    details: 'Automated daily backup completed', severity: 'INFO'
  },
  {
    id: '5', action: 'Configuration Change', actionAr: 'تغيير إعدادات',
    user: 'admin', userAr: 'مدير النظام', timestamp: '2024-01-09 16:30:00',
    details: 'Updated billing configuration', severity: 'WARNING'
  },
];

interface AdminMenuItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  labelAr: string;
  description: string;
  descriptionAr: string;
  badge?: string;
}

const adminMenuItems: AdminMenuItem[] = [
  {
    id: 'users', icon: <UserCog size={24} />,
    label: 'User Management', labelAr: 'إدارة المستخدمين',
    description: 'Manage users, roles, and permissions', descriptionAr: 'إدارة المستخدمين والأدوار والصلاحيات',
    badge: '6'
  },
  {
    id: 'roles', icon: <Key size={24} />,
    label: 'Roles & Permissions', labelAr: 'الأدوار والصلاحيات',
    description: 'Configure access control', descriptionAr: 'إعداد التحكم في الوصول',
  },
  {
    id: 'locations', icon: <Building size={24} />,
    label: 'Locations', labelAr: 'المواقع',
    description: 'Manage hospital locations and wards', descriptionAr: 'إدارة مواقع المستشفى والأجنحة',
  },
  {
    id: 'concepts', icon: <Database size={24} />,
    label: 'Concept Dictionary', labelAr: 'قاموس المفاهيم',
    description: 'Medical concepts and terminology', descriptionAr: 'المفاهيم والمصطلحات الطبية',
  },
  {
    id: 'forms', icon: <FileText size={24} />,
    label: 'Form Builder', labelAr: 'منشئ النماذج',
    description: 'Create and manage clinical forms', descriptionAr: 'إنشاء وإدارة النماذج السريرية',
  },
  {
    id: 'locale', icon: <Globe size={24} />,
    label: 'Localization', labelAr: 'التعريب',
    description: 'Language and locale settings', descriptionAr: 'إعدادات اللغة والمنطقة',
  },
  {
    id: 'notifications', icon: <Bell size={24} />,
    label: 'Notifications', labelAr: 'الإشعارات',
    description: 'Configure system notifications', descriptionAr: 'إعداد إشعارات النظام',
  },
  {
    id: 'security', icon: <Lock size={24} />,
    label: 'Security Settings', labelAr: 'إعدادات الأمان',
    description: 'Password policies and security', descriptionAr: 'سياسات كلمة المرور والأمان',
  },
  {
    id: 'logs', icon: <Activity size={24} />,
    label: 'System Logs', labelAr: 'سجلات النظام',
    description: 'View system activity logs', descriptionAr: 'عرض سجلات نشاط النظام',
  },
  {
    id: 'backup', icon: <RefreshCw size={24} />,
    label: 'Backup & Restore', labelAr: 'النسخ الاحتياطي',
    description: 'Database backup management', descriptionAr: 'إدارة النسخ الاحتياطي لقاعدة البيانات',
  },
];

export default function AdminPage() {
  const [locale, setLocale] = useState<'ar' | 'en'>('ar');
  const [selectedSection, setSelectedSection] = useState<string>('users');
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);

  const isRTL = locale === 'ar';

  const t = {
    title: isRTL ? 'إدارة النظام' : 'System Administration',
    subtitle: isRTL ? 'إدارة إعدادات النظام والمستخدمين' : 'Manage system settings and users',
    users: isRTL ? 'المستخدمين' : 'Users',
    addUser: isRTL ? 'إضافة مستخدم' : 'Add User',
    username: isRTL ? 'اسم المستخدم' : 'Username',
    fullName: isRTL ? 'الاسم الكامل' : 'Full Name',
    email: isRTL ? 'البريد الإلكتروني' : 'Email',
    role: isRTL ? 'الدور' : 'Role',
    lastLogin: isRTL ? 'آخر دخول' : 'Last Login',
    status: isRTL ? 'الحالة' : 'Status',
    actions: isRTL ? 'الإجراءات' : 'Actions',
    active: isRTL ? 'نشط' : 'Active',
    inactive: isRTL ? 'غير نشط' : 'Inactive',
    locked: isRTL ? 'مقفل' : 'Locked',
    edit: isRTL ? 'تعديل' : 'Edit',
    delete: isRTL ? 'حذف' : 'Delete',
    resetPassword: isRTL ? 'إعادة تعيين كلمة المرور' : 'Reset Password',
    unlock: isRTL ? 'فتح القفل' : 'Unlock',
    systemLogs: isRTL ? 'سجلات النظام' : 'System Logs',
    action: isRTL ? 'الإجراء' : 'Action',
    user: isRTL ? 'المستخدم' : 'User',
    timestamp: isRTL ? 'الوقت' : 'Timestamp',
    details: isRTL ? 'التفاصيل' : 'Details',
    severity: isRTL ? 'الأهمية' : 'Severity',
    info: isRTL ? 'معلومات' : 'Info',
    warning: isRTL ? 'تحذير' : 'Warning',
    error: isRTL ? 'خطأ' : 'Error',
    overview: isRTL ? 'نظرة عامة' : 'Overview',
    totalUsers: isRTL ? 'إجمالي المستخدمين' : 'Total Users',
    activeUsers: isRTL ? 'المستخدمين النشطين' : 'Active Users',
    lockedAccounts: isRTL ? 'الحسابات المقفلة' : 'Locked Accounts',
    todayLogins: isRTL ? 'تسجيلات اليوم' : 'Today\'s Logins',
  };

  const getStatusBadge = (status: AdminUser['status']) => {
    switch (status) {
      case 'ACTIVE': return <Badge variant="success">{t.active}</Badge>;
      case 'INACTIVE': return <Badge variant="secondary">{t.inactive}</Badge>;
      case 'LOCKED': return <Badge variant="danger">{t.locked}</Badge>;
    }
  };

  const getSeverityBadge = (severity: SystemLog['severity']) => {
    switch (severity) {
      case 'INFO': return <Badge variant="info">{t.info}</Badge>;
      case 'WARNING': return <Badge variant="warning">{t.warning}</Badge>;
      case 'ERROR': return <Badge variant="danger">{t.error}</Badge>;
    }
  };

  const stats = {
    totalUsers: mockUsers.length,
    activeUsers: mockUsers.filter(u => u.status === 'ACTIVE').length,
    lockedAccounts: mockUsers.filter(u => u.status === 'LOCKED').length,
    todayLogins: mockUsers.filter(u => u.lastLogin?.startsWith('2024-01-10')).length,
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
              <Shield className="text-primary-500" />
              {t.title}
            </h1>
            <p className="text-slate-500 mt-1">{t.subtitle}</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                <Users className="text-primary-500" size={20} />
              </div>
              <div>
                <div className="text-sm text-slate-500">{t.totalUsers}</div>
                <div className="text-xl font-bold text-slate-800">{stats.totalUsers}</div>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="text-green-500" size={20} />
              </div>
              <div>
                <div className="text-sm text-slate-500">{t.activeUsers}</div>
                <div className="text-xl font-bold text-green-600">{stats.activeUsers}</div>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <Lock className="text-red-500" size={20} />
              </div>
              <div>
                <div className="text-sm text-slate-500">{t.lockedAccounts}</div>
                <div className="text-xl font-bold text-red-600">{stats.lockedAccounts}</div>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Activity className="text-blue-500" size={20} />
              </div>
              <div>
                <div className="text-sm text-slate-500">{t.todayLogins}</div>
                <div className="text-xl font-bold text-blue-600">{stats.todayLogins}</div>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Admin Menu */}
          <div className="lg:col-span-1">
            <Card>
              <div className="p-4 border-b border-slate-200">
                <h2 className="font-semibold text-slate-800">{t.overview}</h2>
              </div>
              <div className="p-2">
                {adminMenuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedSection(item.id)}
                    className={`
                      w-full flex items-center gap-3 p-3 rounded-lg transition-colors text-start
                      ${selectedSection === item.id
                        ? 'bg-primary-50 text-primary-600'
                        : 'hover:bg-slate-50 text-slate-600'}
                    `}
                  >
                    <div className={selectedSection === item.id ? 'text-primary-500' : 'text-slate-400'}>
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">
                        {isRTL ? item.labelAr : item.label}
                      </div>
                    </div>
                    {item.badge && (
                      <Badge variant={selectedSection === item.id ? 'primary' : 'secondary'}>
                        {item.badge}
                      </Badge>
                    )}
                    <ChevronRight size={16} className={isRTL ? 'rotate-180' : ''} />
                  </button>
                ))}
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {selectedSection === 'users' && (
              <Card>
                <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                  <h2 className="font-semibold text-slate-800">{t.users}</h2>
                  <Button>
                    <Plus size={18} className={isRTL ? 'ml-2' : 'mr-2'} />
                    {t.addUser}
                  </Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-4 py-3 text-start text-sm font-medium text-slate-600">{t.username}</th>
                        <th className="px-4 py-3 text-start text-sm font-medium text-slate-600">{t.fullName}</th>
                        <th className="px-4 py-3 text-start text-sm font-medium text-slate-600">{t.role}</th>
                        <th className="px-4 py-3 text-start text-sm font-medium text-slate-600">{t.lastLogin}</th>
                        <th className="px-4 py-3 text-start text-sm font-medium text-slate-600">{t.status}</th>
                        <th className="px-4 py-3 text-start text-sm font-medium text-slate-600">{t.actions}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {mockUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-4 py-3 text-sm font-medium text-primary-600">{user.username}</td>
                          <td className="px-4 py-3">
                            <div className="text-sm font-medium">
                              {isRTL ? user.fullNameAr : user.fullName}
                            </div>
                            <div className="text-xs text-slate-500">{user.email}</div>
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {isRTL ? user.roleAr : user.role}
                          </td>
                          <td className="px-4 py-3 text-sm text-slate-500">
                            {user.lastLogin || '-'}
                          </td>
                          <td className="px-4 py-3">{getStatusBadge(user.status)}</td>
                          <td className="px-4 py-3">
                            <div className="flex gap-1">
                              <Button variant="outline" size="sm">
                                <Edit size={14} />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Key size={14} />
                              </Button>
                              {user.status === 'LOCKED' && (
                                <Button variant="outline" size="sm" className="text-green-500">
                                  <Lock size={14} />
                                </Button>
                              )}
                              <Button variant="outline" size="sm" className="text-red-500">
                                <Trash2 size={14} />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            )}

            {selectedSection === 'logs' && (
              <Card>
                <div className="p-4 border-b border-slate-200">
                  <h2 className="font-semibold text-slate-800">{t.systemLogs}</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-4 py-3 text-start text-sm font-medium text-slate-600">{t.timestamp}</th>
                        <th className="px-4 py-3 text-start text-sm font-medium text-slate-600">{t.action}</th>
                        <th className="px-4 py-3 text-start text-sm font-medium text-slate-600">{t.user}</th>
                        <th className="px-4 py-3 text-start text-sm font-medium text-slate-600">{t.details}</th>
                        <th className="px-4 py-3 text-start text-sm font-medium text-slate-600">{t.severity}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {mockLogs.map((log) => (
                        <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-4 py-3 text-sm text-slate-500">{log.timestamp}</td>
                          <td className="px-4 py-3 text-sm font-medium">
                            {isRTL ? log.actionAr : log.action}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {isRTL ? log.userAr : log.user}
                          </td>
                          <td className="px-4 py-3 text-sm text-slate-500">{log.details}</td>
                          <td className="px-4 py-3">{getSeverityBadge(log.severity)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            )}

            {!['users', 'logs'].includes(selectedSection) && (
              <Card className="p-12 text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Settings size={32} className="text-slate-400" />
                </div>
                <h3 className="text-lg font-medium text-slate-800 mb-2">
                  {isRTL
                    ? adminMenuItems.find(i => i.id === selectedSection)?.labelAr
                    : adminMenuItems.find(i => i.id === selectedSection)?.label}
                </h3>
                <p className="text-slate-500">
                  {isRTL
                    ? adminMenuItems.find(i => i.id === selectedSection)?.descriptionAr
                    : adminMenuItems.find(i => i.id === selectedSection)?.description}
                </p>
                <Button className="mt-4">
                  {isRTL ? 'إعداد' : 'Configure'}
                </Button>
              </Card>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
