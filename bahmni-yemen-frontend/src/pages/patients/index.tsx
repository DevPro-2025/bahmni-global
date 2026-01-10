import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Users, Search, Plus, Eye, Edit, Calendar, UserPlus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

// Sample patient data matching OpenMRS patient structure
const samplePatients = [
  {
    uuid: 'patient-001-uuid',
    identifier: 'YEM-001',
    givenName: 'أحمد',
    middleName: 'عبدالله',
    familyName: 'محمد',
    gender: 'M',
    age: 35,
    birthDate: '1989-03-15',
    cityVillage: 'صنعاء',
    stateProvince: 'sanaa',
    dateCreated: '2024-01-05',
    extraIdentifiers: {},
    customAttribute: {},
  },
  {
    uuid: 'patient-002-uuid',
    identifier: 'YEM-002',
    givenName: 'فاطمة',
    middleName: 'علي',
    familyName: 'أحمد',
    gender: 'F',
    age: 28,
    birthDate: '1996-07-20',
    cityVillage: 'عدن',
    stateProvince: 'aden',
    dateCreated: '2024-01-08',
    extraIdentifiers: {},
    customAttribute: {},
  },
  {
    uuid: 'patient-003-uuid',
    identifier: 'YEM-003',
    givenName: 'محمد',
    middleName: 'صالح',
    familyName: 'العمري',
    gender: 'M',
    age: 45,
    birthDate: '1979-11-10',
    cityVillage: 'تعز',
    stateProvince: 'taiz',
    dateCreated: '2024-01-03',
    extraIdentifiers: {},
    customAttribute: {},
  },
  {
    uuid: 'patient-004-uuid',
    identifier: 'YEM-004',
    givenName: 'سارة',
    middleName: 'محمد',
    familyName: 'الحسني',
    gender: 'F',
    age: 22,
    birthDate: '2002-05-25',
    cityVillage: 'إب',
    stateProvince: 'ibb',
    dateCreated: '2024-01-07',
    extraIdentifiers: {},
    customAttribute: {},
  },
  {
    uuid: 'patient-005-uuid',
    identifier: 'YEM-005',
    givenName: 'عبدالله',
    middleName: 'أحمد',
    familyName: 'السعيدي',
    gender: 'M',
    age: 52,
    birthDate: '1972-09-08',
    cityVillage: 'الحديدة',
    stateProvince: 'hodeidah',
    dateCreated: '2024-01-06',
    extraIdentifiers: {},
    customAttribute: {},
  },
];

export default function PatientsPage() {
  const router = useRouter();
  const locale = router.locale || 'ar';
  const isRTL = locale === 'ar';
  
  // Search parameters matching Bahmni
  const [searchById, setSearchById] = useState('');
  const [searchByName, setSearchByName] = useState('');
  const [searchByAddress, setSearchByAddress] = useState('');
  const [searchResults, setSearchResults] = useState(samplePatients);
  const [noResultsMessage, setNoResultsMessage] = useState('');

  const t = {
    title: isRTL ? 'البحث عن مريض' : 'Patient Search',
    searchById: isRTL ? 'رقم المريض' : 'Patient ID',
    searchByName: isRTL ? 'الاسم' : 'Name',
    searchByAddress: isRTL ? 'العنوان' : 'Address',
    enterIdPlaceholder: isRTL ? 'أدخل رقم المريض' : 'Enter Patient ID',
    enterNamePlaceholder: isRTL ? 'أدخل الاسم' : 'Enter Name',
    enterAddressPlaceholder: isRTL ? 'أدخل العنوان' : 'Enter Address',
    search: isRTL ? 'بحث' : 'Search',
    newPatient: isRTL ? 'تسجيل مريض جديد' : 'Register New Patient',
    patientId: isRTL ? 'رقم المريض' : 'ID',
    name: isRTL ? 'الاسم' : 'Name',
    gender: isRTL ? 'الجنس' : 'Gender',
    age: isRTL ? 'العمر' : 'Age',
    dob: isRTL ? 'تاريخ الميلاد' : 'DOB',
    address: isRTL ? 'العنوان' : 'Address',
    registrationDate: isRTL ? 'تاريخ التسجيل' : 'Registration Date',
    male: isRTL ? 'ذ' : 'M',
    female: isRTL ? 'أ' : 'F',
    noResults: isRTL ? 'لا توجد نتائج للبحث' : 'No results found',
    noMoreResults: isRTL ? 'لا توجد مزيد من النتائج' : 'No more results',
    totalResults: isRTL ? 'النتائج' : 'Results',
    view: isRTL ? 'عرض' : 'View',
    edit: isRTL ? 'تعديل' : 'Edit',
    startVisit: isRTL ? 'بدء زيارة' : 'Start Visit',
    notAssigned: isRTL ? 'غير مخصص' : 'Not Assigned',
  };

  // Search by ID (matching Bahmni searchById)
  const handleSearchById = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchById.trim()) return;
    
    const results = samplePatients.filter(p => 
      p.identifier.toLowerCase().includes(searchById.toLowerCase())
    );
    
    setSearchResults(results);
    if (results.length === 0) {
      setNoResultsMessage(t.noResults);
    } else {
      setNoResultsMessage('');
    }
  };

  // Search by Name/Address (matching Bahmni searchPatients)
  const handleSearchByName = (e: React.FormEvent) => {
    e.preventDefault();
    
    const results = samplePatients.filter(p => {
      const fullName = `${p.givenName} ${p.middleName} ${p.familyName}`.toLowerCase();
      const nameMatch = !searchByName || fullName.includes(searchByName.toLowerCase());
      const addressMatch = !searchByAddress || 
        p.cityVillage?.toLowerCase().includes(searchByAddress.toLowerCase()) ||
        p.stateProvince?.toLowerCase().includes(searchByAddress.toLowerCase());
      
      return nameMatch && addressMatch;
    });
    
    setSearchResults(results);
    if (results.length === 0) {
      setNoResultsMessage(t.noResults);
    } else {
      setNoResultsMessage('');
    }
  };

  // Navigate to patient (matching Bahmni forPatient().doExtensionAction)
  const handlePatientClick = (patient: typeof samplePatients[0]) => {
    // In real app, this would navigate to patient dashboard
    router.push(`/patients/${patient.uuid}`);
  };

  // Format date for display
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString(isRTL ? 'ar-YE' : 'en-US');
  };

  return (
    <>
      <Head>
        <title>{isRTL ? 'المرضى - النظام الصحي اليمني' : 'Patients - Yemen Health System'}</title>
      </Head>

      <div className="space-y-6">
        {/* Search Section (matching Bahmni search.html) */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Search by ID */}
              <div className="flex-1">
                <form onSubmit={handleSearchById} className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    {t.searchById}
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={searchById}
                      onChange={(e) => setSearchById(e.target.value)}
                      placeholder={t.enterIdPlaceholder}
                      className={`flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                        isRTL ? 'text-right' : 'text-left'
                      }`}
                    />
                    <Button type="submit" disabled={!searchById.trim()}>
                      {t.search}
                    </Button>
                  </div>
                </form>
              </div>

              {/* Divider */}
              <div className="hidden lg:block w-px bg-slate-200" />

              {/* Search by Name/Address */}
              <div className="flex-[2]">
                <form onSubmit={handleSearchByName} className="space-y-2">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">
                        {t.searchByName}
                      </label>
                      <input
                        type="text"
                        value={searchByName}
                        onChange={(e) => setSearchByName(e.target.value)}
                        placeholder={t.enterNamePlaceholder}
                        className={`w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                          isRTL ? 'text-right' : 'text-left'
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">
                        {t.searchByAddress}
                      </label>
                      <input
                        type="text"
                        value={searchByAddress}
                        onChange={(e) => setSearchByAddress(e.target.value)}
                        placeholder={t.enterAddressPlaceholder}
                        className={`w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                          isRTL ? 'text-right' : 'text-left'
                        }`}
                      />
                    </div>
                    <div className="flex items-end">
                      <Button type="submit" className="w-full md:w-auto">
                        <Search size={18} className={isRTL ? 'ml-2' : 'mr-2'} />
                        {t.search}
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* No Results Message */}
        {noResultsMessage && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-yellow-800">{noResultsMessage}</p>
          </div>
        )}

        {/* Results Table (matching Bahmni search results) */}
        {searchResults.length > 0 && (
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50">
                      <th className={`px-4 py-3 text-sm font-semibold text-slate-700 ${isRTL ? 'text-right' : 'text-left'}`}>
                        {t.patientId}
                      </th>
                      <th className={`px-4 py-3 text-sm font-semibold text-slate-700 ${isRTL ? 'text-right' : 'text-left'}`}>
                        {t.name}
                      </th>
                      <th className={`px-4 py-3 text-sm font-semibold text-slate-700 ${isRTL ? 'text-right' : 'text-left'}`}>
                        {t.gender}
                      </th>
                      <th className={`px-4 py-3 text-sm font-semibold text-slate-700 ${isRTL ? 'text-right' : 'text-left'}`}>
                        {t.age}
                      </th>
                      <th className={`px-4 py-3 text-sm font-semibold text-slate-700 ${isRTL ? 'text-right' : 'text-left'}`}>
                        {t.dob}
                      </th>
                      <th className={`px-4 py-3 text-sm font-semibold text-slate-700 ${isRTL ? 'text-right' : 'text-left'}`}>
                        {t.address}
                      </th>
                      <th className={`px-4 py-3 text-sm font-semibold text-slate-700 ${isRTL ? 'text-right' : 'text-left'}`}>
                        {t.registrationDate}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchResults.map((patient, index) => (
                      <tr
                        key={patient.uuid}
                        onClick={() => handlePatientClick(patient)}
                        className="border-b border-slate-100 hover:bg-primary-50 cursor-pointer transition-colors"
                        tabIndex={9 + index}
                      >
                        <td className="px-4 py-3">
                          <span className="text-primary-600 font-medium hover:underline">
                            {patient.identifier || t.notAssigned}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-800">
                          {patient.givenName} {patient.middleName} {patient.familyName}
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-600">
                          {patient.gender === 'M' ? t.male : t.female}
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-600">
                          {patient.age}
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-600">
                          {formatDate(patient.birthDate)}
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-600">
                          {patient.cityVillage}
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-600">
                          {formatDate(patient.dateCreated)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Register New Patient Button */}
        <div className="flex justify-center">
          <Link href="/registration">
            <Button size="lg">
              <UserPlus size={20} className={isRTL ? 'ml-2' : 'mr-2'} />
              {t.newPatient}
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
