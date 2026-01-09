import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Users, Search, Plus, Eye, Edit, Phone, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';

// Sample patient data - would come from API in real app
const samplePatients = [
  {
    id: 'P001',
    firstName: 'أحمد',
    lastName: 'محمد',
    firstNameEn: 'Ahmed',
    lastNameEn: 'Mohammed',
    gender: 'male',
    age: 35,
    phone: '777123456',
    lastVisit: '2024-01-05',
    status: 'active',
  },
  {
    id: 'P002',
    firstName: 'فاطمة',
    lastName: 'علي',
    firstNameEn: 'Fatima',
    lastNameEn: 'Ali',
    gender: 'female',
    age: 28,
    phone: '771234567',
    lastVisit: '2024-01-08',
    status: 'active',
  },
  {
    id: 'P003',
    firstName: 'محمد',
    lastName: 'صالح',
    firstNameEn: 'Mohammed',
    lastNameEn: 'Saleh',
    gender: 'male',
    age: 45,
    phone: '770987654',
    lastVisit: '2024-01-03',
    status: 'active',
  },
  {
    id: 'P004',
    firstName: 'سارة',
    lastName: 'أحمد',
    firstNameEn: 'Sara',
    lastNameEn: 'Ahmed',
    gender: 'female',
    age: 22,
    phone: '773456789',
    lastVisit: '2024-01-07',
    status: 'inactive',
  },
  {
    id: 'P005',
    firstName: 'عبدالله',
    lastName: 'العمري',
    firstNameEn: 'Abdullah',
    lastNameEn: 'Al-Omari',
    gender: 'male',
    age: 52,
    phone: '774567890',
    lastVisit: '2024-01-06',
    status: 'active',
  },
];

export default function PatientsPage() {
  const router = useRouter();
  const locale = router.locale || 'ar';
  const isRTL = locale === 'ar';
  const [searchQuery, setSearchQuery] = useState('');

  const t = {
    title: isRTL ? 'المرضى' : 'Patients',
    search: isRTL ? 'البحث عن مريض...' : 'Search patients...',
    newPatient: isRTL ? 'مريض جديد' : 'New Patient',
    patientId: isRTL ? 'رقم المريض' : 'Patient ID',
    name: isRTL ? 'الاسم' : 'Name',
    gender: isRTL ? 'الجنس' : 'Gender',
    age: isRTL ? 'العمر' : 'Age',
    phone: isRTL ? 'الهاتف' : 'Phone',
    lastVisit: isRTL ? 'آخر زيارة' : 'Last Visit',
    status: isRTL ? 'الحالة' : 'Status',
    actions: isRTL ? 'الإجراءات' : 'Actions',
    male: isRTL ? 'ذكر' : 'Male',
    female: isRTL ? 'أنثى' : 'Female',
    active: isRTL ? 'نشط' : 'Active',
    inactive: isRTL ? 'غير نشط' : 'Inactive',
    years: isRTL ? 'سنة' : 'years',
    view: isRTL ? 'عرض' : 'View',
    edit: isRTL ? 'تعديل' : 'Edit',
    noPatients: isRTL ? 'لا يوجد مرضى' : 'No patients found',
    totalPatients: isRTL ? 'إجمالي المرضى' : 'Total Patients',
  };

  const filteredPatients = samplePatients.filter((patient) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      patient.id.toLowerCase().includes(searchLower) ||
      patient.firstName.includes(searchQuery) ||
      patient.lastName.includes(searchQuery) ||
      patient.firstNameEn.toLowerCase().includes(searchLower) ||
      patient.lastNameEn.toLowerCase().includes(searchLower) ||
      patient.phone.includes(searchQuery)
    );
  });

  return (
    <>
      <Head>
        <title>{isRTL ? 'المرضى - باهمني اليمن' : 'Patients - Bahmni Yemen'}</title>
      </Head>

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-100 rounded-lg">
              <Users size={24} className="text-primary-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">{t.title}</h1>
              <p className="text-sm text-slate-500">
                {t.totalPatients}: {filteredPatients.length}
              </p>
            </div>
          </div>
          <Link href="/registration">
            <Button>
              <Plus size={18} className="mr-2" />
              {t.newPatient}
            </Button>
          </Link>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="p-4">
            <div className="relative">
              <Search
                size={20}
                className={`absolute top-1/2 -translate-y-1/2 text-slate-400 ${
                  isRTL ? 'right-3' : 'left-3'
                }`}
              />
              <input
                type="text"
                placeholder={t.search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                  isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'
                }`}
              />
            </div>
          </CardContent>
        </Card>

        {/* Patients Table */}
        <Card>
          <CardContent className="p-0 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-4 py-3 text-start text-sm font-semibold text-slate-600">
                    {t.patientId}
                  </th>
                  <th className="px-4 py-3 text-start text-sm font-semibold text-slate-600">
                    {t.name}
                  </th>
                  <th className="px-4 py-3 text-start text-sm font-semibold text-slate-600">
                    {t.gender}
                  </th>
                  <th className="px-4 py-3 text-start text-sm font-semibold text-slate-600">
                    {t.age}
                  </th>
                  <th className="px-4 py-3 text-start text-sm font-semibold text-slate-600">
                    {t.phone}
                  </th>
                  <th className="px-4 py-3 text-start text-sm font-semibold text-slate-600">
                    {t.lastVisit}
                  </th>
                  <th className="px-4 py-3 text-start text-sm font-semibold text-slate-600">
                    {t.status}
                  </th>
                  <th className="px-4 py-3 text-start text-sm font-semibold text-slate-600">
                    {t.actions}
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-8 text-center text-slate-500">
                      {t.noPatients}
                    </td>
                  </tr>
                ) : (
                  filteredPatients.map((patient) => (
                    <tr
                      key={patient.id}
                      className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-4 py-3 text-sm font-medium text-primary-600">
                        {patient.id}
                      </td>
                      <td className="px-4 py-3">
                        <div>
                          <p className="text-sm font-medium text-slate-800">
                            {isRTL
                              ? `${patient.firstName} ${patient.lastName}`
                              : `${patient.firstNameEn} ${patient.lastNameEn}`}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600">
                        {patient.gender === 'male' ? t.male : t.female}
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600">
                        {patient.age} {t.years}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1 text-sm text-slate-600">
                          <Phone size={14} />
                          {patient.phone}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1 text-sm text-slate-600">
                          <Calendar size={14} />
                          {patient.lastVisit}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant={patient.status === 'active' ? 'success' : 'default'}>
                          {patient.status === 'active' ? t.active : t.inactive}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button
                            className="p-1.5 text-slate-500 hover:text-primary-600 hover:bg-primary-50 rounded"
                            title={t.view}
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            className="p-1.5 text-slate-500 hover:text-primary-600 hover:bg-primary-50 rounded"
                            title={t.edit}
                          >
                            <Edit size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
