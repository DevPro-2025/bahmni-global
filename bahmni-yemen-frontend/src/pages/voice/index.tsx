'use client';

import React, { useState, useEffect } from 'react';
import { MainLayout } from '@/components/layout';
import { Card, Button, Badge } from '@/components/ui';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Settings,
  History,
  HelpCircle,
  Play,
  Pause,
  ChevronRight,
  Check,
  AlertCircle,
  Loader2,
  User,
  Search,
  Calendar,
  FileText,
  Pill,
  TestTube,
  Activity,
} from 'lucide-react';

// Voice/Speech Assistant Module
// Matches the workflow of speech-assistant-frontend, speech-assistant-package

interface VoiceCommand {
  id: string;
  command: string;
  action: string;
  category: string;
  example: string;
}

interface CommandHistory {
  id: string;
  command: string;
  response: string;
  timestamp: string;
  status: 'success' | 'failed' | 'partial';
}

export default function VoiceAssistantPage() {
  const [locale, setLocale] = useState<'ar' | 'en'>('ar');
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTranscript, setCurrentTranscript] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showSettings, setShowSettings] = useState(false);
  
  const translations = {
    ar: {
      title: 'المساعد الصوتي',
      pageTitle: 'التحكم الصوتي',
      startListening: 'بدء الاستماع',
      stopListening: 'إيقاف الاستماع',
      listening: 'جاري الاستماع...',
      processing: 'جاري المعالجة...',
      mute: 'كتم الصوت',
      unmute: 'إلغاء الكتم',
      settings: 'الإعدادات',
      commandHistory: 'سجل الأوامر',
      availableCommands: 'الأوامر المتاحة',
      allCommands: 'جميع الأوامر',
      patientCommands: 'أوامر المرضى',
      appointmentCommands: 'أوامر المواعيد',
      clinicalCommands: 'أوامر سريرية',
      navigationCommands: 'أوامر التنقل',
      command: 'الأمر',
      action: 'الإجراء',
      example: 'مثال',
      tryIt: 'جرّب',
      success: 'ناجح',
      failed: 'فشل',
      partial: 'جزئي',
      noHistory: 'لا يوجد سجل أوامر',
      clearHistory: 'مسح السجل',
      voiceSettings: 'إعدادات الصوت',
      language: 'اللغة',
      voiceSpeed: 'سرعة الصوت',
      voicePitch: 'نبرة الصوت',
      sensitivity: 'حساسية الميكروفون',
      continuous: 'استماع مستمر',
      autoExecute: 'تنفيذ تلقائي',
      confirmActions: 'تأكيد الإجراءات',
      slow: 'بطيء',
      normal: 'عادي',
      fast: 'سريع',
      low: 'منخفض',
      high: 'مرتفع',
      tips: 'نصائح',
      tip1: 'تحدث بوضوح وببطء',
      tip2: 'استخدم الكلمات المفتاحية',
      tip3: 'انتظر النغمة قبل التحدث',
      tip4: 'راجع الأوامر المتاحة',
      quickCommands: 'أوامر سريعة',
      searchPatient: 'البحث عن مريض',
      newAppointment: 'موعد جديد',
      openDashboard: 'فتح لوحة التحكم',
      viewReports: 'عرض التقارير',
      sayCommand: 'قل أمراً...',
      assistant: 'المساعد',
      you: 'أنت',
    },
    en: {
      title: 'Voice Assistant',
      pageTitle: 'Voice Control',
      startListening: 'Start Listening',
      stopListening: 'Stop Listening',
      listening: 'Listening...',
      processing: 'Processing...',
      mute: 'Mute',
      unmute: 'Unmute',
      settings: 'Settings',
      commandHistory: 'Command History',
      availableCommands: 'Available Commands',
      allCommands: 'All Commands',
      patientCommands: 'Patient Commands',
      appointmentCommands: 'Appointment Commands',
      clinicalCommands: 'Clinical Commands',
      navigationCommands: 'Navigation Commands',
      command: 'Command',
      action: 'Action',
      example: 'Example',
      tryIt: 'Try It',
      success: 'Success',
      failed: 'Failed',
      partial: 'Partial',
      noHistory: 'No command history',
      clearHistory: 'Clear History',
      voiceSettings: 'Voice Settings',
      language: 'Language',
      voiceSpeed: 'Voice Speed',
      voicePitch: 'Voice Pitch',
      sensitivity: 'Microphone Sensitivity',
      continuous: 'Continuous Listening',
      autoExecute: 'Auto Execute',
      confirmActions: 'Confirm Actions',
      slow: 'Slow',
      normal: 'Normal',
      fast: 'Fast',
      low: 'Low',
      high: 'High',
      tips: 'Tips',
      tip1: 'Speak clearly and slowly',
      tip2: 'Use keywords',
      tip3: 'Wait for the tone before speaking',
      tip4: 'Review available commands',
      quickCommands: 'Quick Commands',
      searchPatient: 'Search Patient',
      newAppointment: 'New Appointment',
      openDashboard: 'Open Dashboard',
      viewReports: 'View Reports',
      sayCommand: 'Say a command...',
      assistant: 'Assistant',
      you: 'You',
    },
  };

  const t = translations[locale];
  const isRTL = locale === 'ar';

  const commands: VoiceCommand[] = [
    {
      id: '1',
      command: isRTL ? 'البحث عن مريض [اسم]' : 'Search patient [name]',
      action: isRTL ? 'فتح صفحة البحث والبحث عن المريض' : 'Open search page and search for patient',
      category: 'patient',
      example: isRTL ? 'البحث عن مريض أحمد محمد' : 'Search patient Ahmed Mohammed',
    },
    {
      id: '2',
      command: isRTL ? 'تسجيل مريض جديد' : 'Register new patient',
      action: isRTL ? 'فتح نموذج تسجيل مريض جديد' : 'Open new patient registration form',
      category: 'patient',
      example: isRTL ? 'تسجيل مريض جديد' : 'Register new patient',
    },
    {
      id: '3',
      command: isRTL ? 'حجز موعد' : 'Book appointment',
      action: isRTL ? 'فتح صفحة حجز المواعيد' : 'Open appointment booking page',
      category: 'appointment',
      example: isRTL ? 'حجز موعد للمريض رقم 001' : 'Book appointment for patient 001',
    },
    {
      id: '4',
      command: isRTL ? 'عرض مواعيد اليوم' : 'Show today appointments',
      action: isRTL ? 'عرض قائمة مواعيد اليوم' : 'Display today\'s appointments list',
      category: 'appointment',
      example: isRTL ? 'عرض مواعيد اليوم' : 'Show today appointments',
    },
    {
      id: '5',
      command: isRTL ? 'بدء استشارة' : 'Start consultation',
      action: isRTL ? 'فتح صفحة الاستشارة السريرية' : 'Open clinical consultation page',
      category: 'clinical',
      example: isRTL ? 'بدء استشارة للمريض أحمد' : 'Start consultation for patient Ahmed',
    },
    {
      id: '6',
      command: isRTL ? 'إدخال العلامات الحيوية' : 'Enter vitals',
      action: isRTL ? 'فتح نموذج العلامات الحيوية' : 'Open vitals form',
      category: 'clinical',
      example: isRTL ? 'إدخال العلامات الحيوية' : 'Enter vitals',
    },
    {
      id: '7',
      command: isRTL ? 'فتح [صفحة]' : 'Open [page]',
      action: isRTL ? 'التنقل إلى الصفحة المطلوبة' : 'Navigate to requested page',
      category: 'navigation',
      example: isRTL ? 'فتح لوحة التحكم' : 'Open dashboard',
    },
    {
      id: '8',
      command: isRTL ? 'طلب فحص مختبر' : 'Order lab test',
      action: isRTL ? 'فتح صفحة طلب الفحوصات' : 'Open lab order page',
      category: 'clinical',
      example: isRTL ? 'طلب فحص CBC' : 'Order CBC test',
    },
  ];

  const commandHistory: CommandHistory[] = [
    {
      id: '1',
      command: isRTL ? 'البحث عن مريض أحمد' : 'Search patient Ahmed',
      response: isRTL ? 'تم العثور على 3 نتائج' : 'Found 3 results',
      timestamp: '10:30 AM',
      status: 'success',
    },
    {
      id: '2',
      command: isRTL ? 'عرض مواعيد اليوم' : 'Show today appointments',
      response: isRTL ? 'لديك 5 مواعيد اليوم' : 'You have 5 appointments today',
      timestamp: '10:25 AM',
      status: 'success',
    },
    {
      id: '3',
      command: isRTL ? 'فتح التقارير' : 'Open reports',
      response: isRTL ? 'جاري فتح صفحة التقارير' : 'Opening reports page',
      timestamp: '10:20 AM',
      status: 'success',
    },
  ];

  const [settings, setSettings] = useState({
    language: locale,
    voiceSpeed: 'normal',
    voicePitch: 'normal',
    sensitivity: 'normal',
    continuous: false,
    autoExecute: false,
    confirmActions: true,
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return <Badge variant="success">{t.success}</Badge>;
      case 'failed':
        return <Badge variant="danger">{t.failed}</Badge>;
      case 'partial':
        return <Badge variant="warning">{t.partial}</Badge>;
      default:
        return null;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'patient':
        return <User className="h-4 w-4" />;
      case 'appointment':
        return <Calendar className="h-4 w-4" />;
      case 'clinical':
        return <Activity className="h-4 w-4" />;
      case 'navigation':
        return <ChevronRight className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const filteredCommands = selectedCategory === 'all'
    ? commands
    : commands.filter((cmd) => cmd.category === selectedCategory);

  const handleToggleListening = () => {
    if (isListening) {
      setIsListening(false);
      setCurrentTranscript('');
    } else {
      setIsListening(true);
      // Simulate listening
      setTimeout(() => {
        setCurrentTranscript(isRTL ? 'البحث عن مريض...' : 'Search patient...');
      }, 2000);
    }
  };

  return (
    <MainLayout title={t.pageTitle} locale={locale} onLocaleChange={setLocale}>
      <div className={`p-6 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <Mic className="h-7 w-7 text-blue-600" />
            {t.title}
          </h1>
          <Button
            variant="outline"
            onClick={() => setShowSettings(!showSettings)}
            className="flex items-center gap-2"
          >
            <Settings className="h-4 w-4" />
            {t.settings}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Voice Interface */}
          <div className="lg:col-span-2 space-y-6">
            {/* Voice Control Panel */}
            <Card className="p-8">
              <div className="text-center">
                {/* Microphone Button */}
                <button
                  onClick={handleToggleListening}
                  className={`w-32 h-32 rounded-full mx-auto flex items-center justify-center transition-all ${
                    isListening
                      ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                      : 'bg-blue-500 hover:bg-blue-600'
                  }`}
                >
                  {isListening ? (
                    <MicOff className="h-16 w-16 text-white" />
                  ) : (
                    <Mic className="h-16 w-16 text-white" />
                  )}
                </button>

                {/* Status Text */}
                <p className="mt-6 text-lg text-gray-700">
                  {isListening ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      {t.listening}
                    </span>
                  ) : (
                    t.sayCommand
                  )}
                </p>

                {/* Current Transcript */}
                {currentTranscript && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-600">{currentTranscript}</p>
                  </div>
                )}

                {/* Control Buttons */}
                <div className="flex justify-center gap-4 mt-6">
                  <Button
                    onClick={handleToggleListening}
                    className="flex items-center gap-2"
                  >
                    {isListening ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    {isListening ? t.stopListening : t.startListening}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsMuted(!isMuted)}
                    className="flex items-center gap-2"
                  >
                    {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    {isMuted ? t.unmute : t.mute}
                  </Button>
                </div>
              </div>
            </Card>

            {/* Quick Commands */}
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Mic className="h-5 w-5 text-blue-600" />
                {t.quickCommands}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: t.searchPatient, icon: <Search className="h-5 w-5" /> },
                  { label: t.newAppointment, icon: <Calendar className="h-5 w-5" /> },
                  { label: t.openDashboard, icon: <Activity className="h-5 w-5" /> },
                  { label: t.viewReports, icon: <FileText className="h-5 w-5" /> },
                ].map((cmd, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="flex flex-col items-center gap-2 h-auto py-4"
                  >
                    {cmd.icon}
                    <span className="text-sm">{cmd.label}</span>
                  </Button>
                ))}
              </div>
            </Card>

            {/* Available Commands */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-blue-600" />
                  {t.availableCommands}
                </h3>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border rounded-lg px-3 py-2 text-sm"
                >
                  <option value="all">{t.allCommands}</option>
                  <option value="patient">{t.patientCommands}</option>
                  <option value="appointment">{t.appointmentCommands}</option>
                  <option value="clinical">{t.clinicalCommands}</option>
                  <option value="navigation">{t.navigationCommands}</option>
                </select>
              </div>

              <div className="space-y-3">
                {filteredCommands.map((cmd) => (
                  <div
                    key={cmd.id}
                    className="p-4 bg-gray-50 rounded-lg flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white rounded-lg text-blue-600">
                        {getCategoryIcon(cmd.category)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{cmd.command}</p>
                        <p className="text-sm text-gray-500">{cmd.action}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {t.example}: &quot;{cmd.example}&quot;
                        </p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      {t.tryIt}
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Command History */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <History className="h-5 w-5 text-blue-600" />
                  {t.commandHistory}
                </h3>
                <Button size="sm" variant="outline">
                  {t.clearHistory}
                </Button>
              </div>

              {commandHistory.length > 0 ? (
                <div className="space-y-3">
                  {commandHistory.map((item) => (
                    <div key={item.id} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium text-gray-900 text-sm">
                            <span className="text-blue-600">{t.you}:</span> {item.command}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            <span className="text-green-600">{t.assistant}:</span> {item.response}
                          </p>
                        </div>
                        {getStatusBadge(item.status)}
                      </div>
                      <p className="text-xs text-gray-400 mt-2">{item.timestamp}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <History className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                  <p>{t.noHistory}</p>
                </div>
              )}
            </Card>

            {/* Tips */}
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-yellow-600" />
                {t.tips}
              </h3>
              <ul className="space-y-3">
                {[t.tip1, t.tip2, t.tip3, t.tip4].map((tip, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                    <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                    {tip}
                  </li>
                ))}
              </ul>
            </Card>

            {/* Settings Panel */}
            {showSettings && (
              <Card className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Settings className="h-5 w-5 text-blue-600" />
                  {t.voiceSettings}
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">{t.voiceSpeed}</label>
                    <select
                      value={settings.voiceSpeed}
                      onChange={(e) => setSettings({ ...settings, voiceSpeed: e.target.value })}
                      className="w-full border rounded-lg px-3 py-2"
                    >
                      <option value="slow">{t.slow}</option>
                      <option value="normal">{t.normal}</option>
                      <option value="fast">{t.fast}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">{t.sensitivity}</label>
                    <select
                      value={settings.sensitivity}
                      onChange={(e) => setSettings({ ...settings, sensitivity: e.target.value })}
                      className="w-full border rounded-lg px-3 py-2"
                    >
                      <option value="low">{t.low}</option>
                      <option value="normal">{t.normal}</option>
                      <option value="high">{t.high}</option>
                    </select>
                  </div>
                  <label className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">{t.continuous}</span>
                    <input
                      type="checkbox"
                      checked={settings.continuous}
                      onChange={(e) => setSettings({ ...settings, continuous: e.target.checked })}
                      className="h-4 w-4 text-blue-600 rounded"
                    />
                  </label>
                  <label className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">{t.autoExecute}</span>
                    <input
                      type="checkbox"
                      checked={settings.autoExecute}
                      onChange={(e) => setSettings({ ...settings, autoExecute: e.target.checked })}
                      className="h-4 w-4 text-blue-600 rounded"
                    />
                  </label>
                  <label className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">{t.confirmActions}</span>
                    <input
                      type="checkbox"
                      checked={settings.confirmActions}
                      onChange={(e) => setSettings({ ...settings, confirmActions: e.target.checked })}
                      className="h-4 w-4 text-blue-600 rounded"
                    />
                  </label>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
