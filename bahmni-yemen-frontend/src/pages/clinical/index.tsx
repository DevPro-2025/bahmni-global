import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import {
  Stethoscope,
  Search,
  FileText,
  Activity,
  Thermometer,
  HeartPulse,
  Weight,
  Ruler,
  ChevronDown,
  ChevronRight,
  Plus,
  Save,
  AlertCircle,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

// Sample patient data for demonstration
const samplePatient = {
  uuid: 'patient-001-uuid',
  identifier: 'YEM-001',
  givenName: 'أحمد',
  middleName: 'عبدالله',
  familyName: 'محمد',
  gender: 'M',
  age: 35,
  birthDate: '1989-03-15',
};

// Sample vitals history
const sampleVitals = [
  { date: '2024-01-15', temperature: 37.2, pulse: 72, bp: '120/80', respRate: 16, weight: 75, height: 175 },
  { date: '2024-01-08', temperature: 36.8, pulse: 68, bp: '118/78', respRate: 14, weight: 75, height: 175 },
  { date: '2024-01-01', temperature: 37.0, pulse: 70, bp: '122/82', respRate: 15, weight: 76, height: 175 },
];

// Sample diagnoses
const sampleDiagnoses = [
  { uuid: '1', name: 'Hypertension', certainty: 'CONFIRMED', order: 'PRIMARY', date: '2024-01-15' },
  { uuid: '2', name: 'Type 2 Diabetes', certainty: 'CONFIRMED', order: 'SECONDARY', date: '2024-01-15' },
];

// Sample observations/history
const sampleHistory = [
  { date: '2024-01-15', type: 'Chief Complaint', value: 'Headache and dizziness for 3 days' },
  { date: '2024-01-15', type: 'History of Present Illness', value: 'Patient reports persistent headaches...' },
  { date: '2024-01-08', type: 'Chief Complaint', value: 'Follow-up visit' },
];

// Common diagnosis concepts for autocomplete
const commonDiagnoses = [
  'Hypertension',
  'Type 2 Diabetes Mellitus',
  'Upper Respiratory Infection',
  'Malaria',
  'Typhoid Fever',
  'Pneumonia',
  'Anemia',
  'Gastritis',
  'Urinary Tract Infection',
  'Bronchitis',
];

export default function ClinicalPage() {
  const router = useRouter();
  const locale = router.locale || 'ar';
  const isRTL = locale === 'ar';

  // State
  const [selectedPatient, setSelectedPatient] = useState(samplePatient);
  const [activeTab, setActiveTab] = useState<'consultation' | 'history' | 'orders'>('consultation');
  const [expandedSections, setExpandedSections] = useState({
    vitals: true,
    history: false,
    diagnoses: true,
    treatment: false,
    disposition: false,
  });

  // Vitals form state
  const [vitals, setVitals] = useState({
    temperature: '',
    pulse: '',
    systolic: '',
    diastolic: '',
    respiratoryRate: '',
    weight: '',
    height: '',
    spo2: '',
  });

  // Diagnosis state
  const [newDiagnosis, setNewDiagnosis] = useState('');
  const [diagnosisCertainty, setDiagnosisCertainty] = useState<'PROVISIONAL' | 'CONFIRMED'>('PROVISIONAL');
  const [diagnosisOrder, setDiagnosisOrder] = useState<'PRIMARY' | 'SECONDARY'>('PRIMARY');
  const [diagnoses, setDiagnoses] = useState(sampleDiagnoses);

  // Chief complaint
  const [chiefComplaint, setChiefComplaint] = useState('');
  const [historyOfPresentIllness, setHistoryOfPresentIllness] = useState('');

  const t = {
    title: isRTL ? 'السجل السريري' : 'Clinical Record',
    consultation: isRTL ? 'الاستشارة' : 'Consultation',
    history: isRTL ? 'السوابق المرضية' : 'History',
    orders: isRTL ? 'الطلبات' : 'Orders',
    vitals: isRTL ? 'العلامات الحيوية' : 'Vitals',
    temperature: isRTL ? 'الحرارة (°C)' : 'Temperature (°C)',
    pulse: isRTL ? 'النبض (bpm)' : 'Pulse (bpm)',
    bloodPressure: isRTL ? 'ضغط الدم' : 'Blood Pressure',
    systolic: isRTL ? 'الانقباضي' : 'Systolic',
    diastolic: isRTL ? 'الانبساطي' : 'Diastolic',
    respiratoryRate: isRTL ? 'معدل التنفس' : 'Respiratory Rate',
    weight: isRTL ? 'الوزن (كجم)' : 'Weight (kg)',
    height: isRTL ? 'الطول (سم)' : 'Height (cm)',
    spo2: isRTL ? 'تشبع الأكسجين %' : 'SpO2 %',
    historySection: isRTL ? 'التاريخ المرضي' : 'History',
    chiefComplaint: isRTL ? 'الشكوى الرئيسية' : 'Chief Complaint',
    historyOfPresentIllness: isRTL ? 'تاريخ المرض الحالي' : 'History of Present Illness',
    diagnoses: isRTL ? 'التشخيصات' : 'Diagnoses',
    addDiagnosis: isRTL ? 'إضافة تشخيص' : 'Add Diagnosis',
    provisional: isRTL ? 'مبدئي' : 'Provisional',
    confirmed: isRTL ? 'مؤكد' : 'Confirmed',
    primary: isRTL ? 'أساسي' : 'Primary',
    secondary: isRTL ? 'ثانوي' : 'Secondary',
    treatment: isRTL ? 'العلاج' : 'Treatment',
    disposition: isRTL ? 'التصرف' : 'Disposition',
    save: isRTL ? 'حفظ' : 'Save',
    saveAndClose: isRTL ? 'حفظ وإغلاق' : 'Save & Close',
    patientInfo: isRTL ? 'معلومات المريض' : 'Patient Info',
    age: isRTL ? 'العمر' : 'Age',
    gender: isRTL ? 'الجنس' : 'Gender',
    male: isRTL ? 'ذكر' : 'Male',
    female: isRTL ? 'أنثى' : 'Female',
    years: isRTL ? 'سنة' : 'years',
    previousVisits: isRTL ? 'الزيارات السابقة' : 'Previous Visits',
    noPatientSelected: isRTL ? 'الرجاء اختيار مريض' : 'Please select a patient',
    searchPlaceholder: isRTL ? 'ابحث عن تشخيص...' : 'Search diagnosis...',
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleAddDiagnosis = () => {
    if (newDiagnosis.trim()) {
      setDiagnoses([
        ...diagnoses,
        {
          uuid: Date.now().toString(),
          name: newDiagnosis,
          certainty: diagnosisCertainty,
          order: diagnosisOrder,
          date: new Date().toISOString().split('T')[0],
        },
      ]);
      setNewDiagnosis('');
    }
  };

  const handleRemoveDiagnosis = (uuid: string) => {
    setDiagnoses(diagnoses.filter(d => d.uuid !== uuid));
  };

  const SectionHeader = ({ title, section, icon: Icon }: { title: string; section: keyof typeof expandedSections; icon: React.ElementType }) => (
    <button
      onClick={() => toggleSection(section)}
      className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors"
    >
      <div className="flex items-center gap-2">
        <Icon size={20} className="text-primary-600" />
        <span className="font-semibold text-slate-800">{title}</span>
      </div>
      {expandedSections[section] ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
    </button>
  );

  return (
    <>
      <Head>
        <title>{isRTL ? 'السجل السريري - النظام الصحي اليمني' : 'Clinical - Yemen Health System'}</title>
      </Head>

      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary-100 rounded-lg">
            <Stethoscope size={24} className="text-primary-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">{t.title}</h1>
          </div>
        </div>

        {/* Patient Header Card */}
        {selectedPatient && (
          <Card className="bg-primary-50 border-primary-200">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">
                      {selectedPatient.givenName[0]}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-800">
                      {selectedPatient.givenName} {selectedPatient.middleName} {selectedPatient.familyName}
                    </h2>
                    <div className="flex flex-wrap gap-4 text-sm text-slate-600 mt-1">
                      <span>{selectedPatient.identifier}</span>
                      <span>{t.age}: {selectedPatient.age} {t.years}</span>
                      <span>{t.gender}: {selectedPatient.gender === 'M' ? t.male : t.female}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge variant="success">{isRTL ? 'زيارة نشطة' : 'Active Visit'}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tabs */}
        <div className="border-b border-slate-200">
          <div className="flex gap-4">
            {(['consultation', 'history', 'orders'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 font-medium border-b-2 transition-colors ${
                  activeTab === tab
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                {t[tab]}
              </button>
            ))}
          </div>
        </div>

        {/* Consultation Tab */}
        {activeTab === 'consultation' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Form - 2/3 width */}
            <div className="lg:col-span-2 space-y-4">
              {/* Vitals Section */}
              <Card>
                <SectionHeader title={t.vitals} section="vitals" icon={Activity} />
                {expandedSections.vitals && (
                  <CardContent className="p-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          <Thermometer size={14} className="inline mr-1" />
                          {t.temperature}
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          value={vitals.temperature}
                          onChange={(e) => setVitals({ ...vitals, temperature: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                          placeholder="37.0"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          <HeartPulse size={14} className="inline mr-1" />
                          {t.pulse}
                        </label>
                        <input
                          type="number"
                          value={vitals.pulse}
                          onChange={(e) => setVitals({ ...vitals, pulse: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                          placeholder="72"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          {t.systolic}
                        </label>
                        <input
                          type="number"
                          value={vitals.systolic}
                          onChange={(e) => setVitals({ ...vitals, systolic: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                          placeholder="120"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          {t.diastolic}
                        </label>
                        <input
                          type="number"
                          value={vitals.diastolic}
                          onChange={(e) => setVitals({ ...vitals, diastolic: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                          placeholder="80"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          {t.respiratoryRate}
                        </label>
                        <input
                          type="number"
                          value={vitals.respiratoryRate}
                          onChange={(e) => setVitals({ ...vitals, respiratoryRate: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                          placeholder="16"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          <Weight size={14} className="inline mr-1" />
                          {t.weight}
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          value={vitals.weight}
                          onChange={(e) => setVitals({ ...vitals, weight: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                          placeholder="70"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          <Ruler size={14} className="inline mr-1" />
                          {t.height}
                        </label>
                        <input
                          type="number"
                          value={vitals.height}
                          onChange={(e) => setVitals({ ...vitals, height: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                          placeholder="170"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          {t.spo2}
                        </label>
                        <input
                          type="number"
                          value={vitals.spo2}
                          onChange={(e) => setVitals({ ...vitals, spo2: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                          placeholder="98"
                        />
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>

              {/* History Section */}
              <Card>
                <SectionHeader title={t.historySection} section="history" icon={FileText} />
                {expandedSections.history && (
                  <CardContent className="p-4 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        {t.chiefComplaint}
                      </label>
                      <textarea
                        value={chiefComplaint}
                        onChange={(e) => setChiefComplaint(e.target.value)}
                        rows={2}
                        className={`w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 ${isRTL ? 'text-right' : 'text-left'}`}
                        placeholder={isRTL ? 'أدخل الشكوى الرئيسية...' : 'Enter chief complaint...'}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        {t.historyOfPresentIllness}
                      </label>
                      <textarea
                        value={historyOfPresentIllness}
                        onChange={(e) => setHistoryOfPresentIllness(e.target.value)}
                        rows={4}
                        className={`w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 ${isRTL ? 'text-right' : 'text-left'}`}
                        placeholder={isRTL ? 'أدخل تاريخ المرض الحالي...' : 'Enter history of present illness...'}
                      />
                    </div>
                  </CardContent>
                )}
              </Card>

              {/* Diagnoses Section */}
              <Card>
                <SectionHeader title={t.diagnoses} section="diagnoses" icon={AlertCircle} />
                {expandedSections.diagnoses && (
                  <CardContent className="p-4 space-y-4">
                    {/* Add Diagnosis */}
                    <div className="flex flex-col md:flex-row gap-2">
                      <div className="flex-1">
                        <input
                          type="text"
                          value={newDiagnosis}
                          onChange={(e) => setNewDiagnosis(e.target.value)}
                          list="diagnosis-options"
                          className={`w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 ${isRTL ? 'text-right' : 'text-left'}`}
                          placeholder={t.searchPlaceholder}
                        />
                        <datalist id="diagnosis-options">
                          {commonDiagnoses.map(d => (
                            <option key={d} value={d} />
                          ))}
                        </datalist>
                      </div>
                      <select
                        value={diagnosisCertainty}
                        onChange={(e) => setDiagnosisCertainty(e.target.value as 'PROVISIONAL' | 'CONFIRMED')}
                        className="px-3 py-2 border border-slate-300 rounded-lg"
                      >
                        <option value="PROVISIONAL">{t.provisional}</option>
                        <option value="CONFIRMED">{t.confirmed}</option>
                      </select>
                      <select
                        value={diagnosisOrder}
                        onChange={(e) => setDiagnosisOrder(e.target.value as 'PRIMARY' | 'SECONDARY')}
                        className="px-3 py-2 border border-slate-300 rounded-lg"
                      >
                        <option value="PRIMARY">{t.primary}</option>
                        <option value="SECONDARY">{t.secondary}</option>
                      </select>
                      <Button onClick={handleAddDiagnosis}>
                        <Plus size={16} className={isRTL ? 'ml-1' : 'mr-1'} />
                        {t.addDiagnosis}
                      </Button>
                    </div>

                    {/* Diagnosis List */}
                    <div className="space-y-2">
                      {diagnoses.map((diagnosis) => (
                        <div
                          key={diagnosis.uuid}
                          className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <span className="font-medium">{diagnosis.name}</span>
                            <Badge variant={diagnosis.certainty === 'CONFIRMED' ? 'success' : 'warning'}>
                              {diagnosis.certainty === 'CONFIRMED' ? t.confirmed : t.provisional}
                            </Badge>
                            <Badge variant={diagnosis.order === 'PRIMARY' ? 'default' : 'secondary'}>
                              {diagnosis.order === 'PRIMARY' ? t.primary : t.secondary}
                            </Badge>
                          </div>
                          <button
                            onClick={() => handleRemoveDiagnosis(diagnosis.uuid)}
                            className="text-red-500 hover:text-red-700"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                )}
              </Card>

              {/* Treatment Section */}
              <Card>
                <SectionHeader title={t.treatment} section="treatment" icon={FileText} />
                {expandedSections.treatment && (
                  <CardContent className="p-4">
                    <p className="text-slate-500 text-center py-8">
                      {isRTL ? 'قريباً - وصف الأدوية والعلاجات' : 'Coming Soon - Prescriptions and Treatments'}
                    </p>
                  </CardContent>
                )}
              </Card>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3">
                <Button variant="outline">
                  {isRTL ? 'إلغاء' : 'Cancel'}
                </Button>
                <Button>
                  <Save size={16} className={isRTL ? 'ml-2' : 'mr-2'} />
                  {t.save}
                </Button>
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  {t.saveAndClose}
                </Button>
              </div>
            </div>

            {/* Sidebar - 1/3 width */}
            <div className="space-y-4">
              {/* Previous Vitals */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    {isRTL ? 'العلامات الحيوية السابقة' : 'Previous Vitals'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-slate-50 border-b">
                          <th className="px-3 py-2 text-start">{isRTL ? 'التاريخ' : 'Date'}</th>
                          <th className="px-3 py-2 text-start">T</th>
                          <th className="px-3 py-2 text-start">BP</th>
                          <th className="px-3 py-2 text-start">P</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sampleVitals.map((v, idx) => (
                          <tr key={idx} className="border-b border-slate-100">
                            <td className="px-3 py-2">{v.date}</td>
                            <td className="px-3 py-2">{v.temperature}</td>
                            <td className="px-3 py-2">{v.bp}</td>
                            <td className="px-3 py-2">{v.pulse}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Recent History */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    {isRTL ? 'السوابق الحديثة' : 'Recent History'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {sampleHistory.slice(0, 3).map((h, idx) => (
                    <div key={idx} className="border-b border-slate-100 pb-2">
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>{h.type}</span>
                        <span>{h.date}</span>
                      </div>
                      <p className="text-sm text-slate-700 mt-1 line-clamp-2">{h.value}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <Card>
            <CardContent className="p-6">
              <p className="text-slate-500 text-center py-8">
                {isRTL ? 'عرض السوابق المرضية الكاملة للمريض' : 'View complete patient history'}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <Card>
            <CardContent className="p-6">
              <p className="text-slate-500 text-center py-8">
                {isRTL ? 'طلبات المختبر والأدوية' : 'Lab and medication orders'}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
}
