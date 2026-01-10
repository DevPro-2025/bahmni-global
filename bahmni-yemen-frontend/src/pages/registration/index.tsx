import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { UserPlus, Save, X, Camera, ChevronDown, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';

// OpenMRS/Bahmni compatible patient schema
const patientSchema = z.object({
  // Patient Identifier
  primaryIdentifier: z.string().optional(),
  identifierPrefix: z.string().optional(),
  hasOldIdentifier: z.boolean().optional(),
  
  // Names (matching OpenMRS person names)
  givenName: z.string().min(1, 'الاسم الأول مطلوب'),
  middleName: z.string().optional(),
  familyName: z.string().optional(),
  
  // Local Names (for Arabic)
  givenNameLocal: z.string().optional(),
  middleNameLocal: z.string().optional(),
  familyNameLocal: z.string().optional(),
  
  // Gender
  gender: z.enum(['M', 'F', 'O']),
  
  // Age/DOB (OpenMRS format)
  birthdate: z.string().optional(),
  birthdateEstimated: z.boolean().optional(),
  ageYears: z.string().optional(),
  ageMonths: z.string().optional(),
  ageDays: z.string().optional(),
  
  // Address (OpenMRS address hierarchy)
  address1: z.string().optional(), // Address Line 1
  address2: z.string().optional(), // Address Line 2
  address3: z.string().optional(), // Neighborhood/Sector
  address4: z.string().optional(), // Area
  address5: z.string().optional(), // Sub-district
  address6: z.string().optional(), // District
  cityVillage: z.string().optional(),
  countyDistrict: z.string().optional(),
  stateProvince: z.string().optional(), // Governorate
  country: z.string().optional(),
  postalCode: z.string().optional(),
  
  // Death Information
  dead: z.boolean().optional(),
  deathDate: z.string().optional(),
  causeOfDeath: z.string().optional(),
});

type PatientFormData = z.infer<typeof patientSchema>;

// Address hierarchy for Yemen (matching Bahmni config)
const yemenGovernorates = [
  { value: 'sanaa', labelAr: 'صنعاء', labelEn: "Sana'a" },
  { value: 'aden', labelAr: 'عدن', labelEn: 'Aden' },
  { value: 'taiz', labelAr: 'تعز', labelEn: 'Taiz' },
  { value: 'hodeidah', labelAr: 'الحديدة', labelEn: 'Hodeidah' },
  { value: 'ibb', labelAr: 'إب', labelEn: 'Ibb' },
  { value: 'dhamar', labelAr: 'ذمار', labelEn: 'Dhamar' },
  { value: 'hadramaut', labelAr: 'حضرموت', labelEn: 'Hadramaut' },
  { value: 'marib', labelAr: 'مأرب', labelEn: 'Marib' },
  { value: 'lahj', labelAr: 'لحج', labelEn: 'Lahj' },
  { value: 'shabwah', labelAr: 'شبوة', labelEn: 'Shabwah' },
  { value: 'abyan', labelAr: 'أبين', labelEn: 'Abyan' },
  { value: 'aldali', labelAr: 'الضالع', labelEn: 'Al Dali' },
  { value: 'amran', labelAr: 'عمران', labelEn: 'Amran' },
  { value: 'hajjah', labelAr: 'حجة', labelEn: 'Hajjah' },
  { value: 'saadah', labelAr: 'صعدة', labelEn: "Sa'dah" },
  { value: 'albayda', labelAr: 'البيضاء', labelEn: 'Al Bayda' },
  { value: 'almahwit', labelAr: 'المحويت', labelEn: 'Al Mahwit' },
  { value: 'almahrah', labelAr: 'المهرة', labelEn: 'Al Mahrah' },
  { value: 'rayma', labelAr: 'ريمة', labelEn: 'Raymah' },
  { value: 'aljawf', labelAr: 'الجوف', labelEn: 'Al Jawf' },
  { value: 'socotra', labelAr: 'سقطرى', labelEn: 'Socotra' },
];

export default function RegistrationPage() {
  const router = useRouter();
  const locale = router.locale || 'ar';
  const isRTL = locale === 'ar';
  
  const [useAge, setUseAge] = useState(true);
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
  const [showDeathInfo, setShowDeathInfo] = useState(false);
  const [patientImage, setPatientImage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<PatientFormData>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      gender: 'M',
      country: 'Yemen',
      birthdateEstimated: true,
      dead: false,
    },
  });

  // Translations matching original Bahmni
  const t = {
    newPatient: isRTL ? 'تسجيل مريض جديد' : 'New Patient',
    patientIdentifier: isRTL ? 'رقم المريض' : 'Patient Identifier',
    enterId: isRTL ? 'إدخال رقم المريض' : 'Enter ID',
    patientName: isRTL ? 'اسم المريض' : 'Patient Name',
    patientNameLocal: isRTL ? 'اسم المريض (عربي)' : 'Patient Name (Local)',
    givenName: isRTL ? 'الاسم الأول' : 'First Name',
    middleName: isRTL ? 'اسم الأب' : 'Middle Name',
    familyName: isRTL ? 'اسم العائلة' : 'Last Name',
    gender: isRTL ? 'الجنس' : 'Gender',
    selectGender: isRTL ? 'اختر الجنس' : 'Select Gender',
    male: isRTL ? 'ذكر' : 'Male',
    female: isRTL ? 'أنثى' : 'Female',
    other: isRTL ? 'آخر' : 'Other',
    age: isRTL ? 'العمر' : 'Age',
    years: isRTL ? 'سنوات' : 'Years',
    months: isRTL ? 'أشهر' : 'Months',
    days: isRTL ? 'أيام' : 'Days',
    dateOfBirth: isRTL ? 'تاريخ الميلاد' : 'Date of Birth',
    estimated: isRTL ? 'تقديري' : 'Estimated',
    addressInfo: isRTL ? 'معلومات العنوان' : 'Address Information',
    address1: isRTL ? 'العنوان 1' : 'Address Line 1',
    address2: isRTL ? 'العنوان 2' : 'Address Line 2',
    cityVillage: isRTL ? 'المدينة/القرية' : 'City/Village',
    countyDistrict: isRTL ? 'المديرية' : 'District',
    stateProvince: isRTL ? 'المحافظة' : 'Governorate',
    country: isRTL ? 'الدولة' : 'Country',
    postalCode: isRTL ? 'الرمز البريدي' : 'Postal Code',
    additionalInfo: isRTL ? 'معلومات إضافية' : 'Additional Information',
    deathInfo: isRTL ? 'معلومات الوفاة' : 'Death Information',
    isDead: isRTL ? 'متوفى' : 'Deceased',
    deathDate: isRTL ? 'تاريخ الوفاة' : 'Death Date',
    causeOfDeath: isRTL ? 'سبب الوفاة' : 'Cause of Death',
    save: isRTL ? 'حفظ' : 'Save',
    cancel: isRTL ? 'إلغاء' : 'Cancel',
    startVisit: isRTL ? 'بدء زيارة' : 'Start Visit',
    capturePhoto: isRTL ? 'التقاط صورة' : 'Capture Photo',
    selectGovernorate: isRTL ? 'اختر المحافظة' : 'Select Governorate',
    yemen: isRTL ? 'اليمن' : 'Yemen',
  };

  const genderOptions = [
    { value: 'M', label: t.male },
    { value: 'F', label: t.female },
    { value: 'O', label: t.other },
  ];

  const governorateOptions = yemenGovernorates.map(g => ({
    value: g.value,
    label: isRTL ? g.labelAr : g.labelEn,
  }));

  // Calculate birthdate from age (matching Bahmni logic)
  const calculateBirthdate = () => {
    const years = parseInt(watch('ageYears') || '0');
    const months = parseInt(watch('ageMonths') || '0');
    const days = parseInt(watch('ageDays') || '0');
    
    if (years || months || days) {
      const birthdate = new Date();
      birthdate.setFullYear(birthdate.getFullYear() - years);
      birthdate.setMonth(birthdate.getMonth() - months);
      birthdate.setDate(birthdate.getDate() - days);
      setValue('birthdate', birthdate.toISOString().split('T')[0]);
      setValue('birthdateEstimated', true);
    }
  };

  // Calculate age from birthdate (matching Bahmni logic)
  const calculateAge = () => {
    const birthdate = watch('birthdate');
    if (birthdate) {
      const birth = new Date(birthdate);
      const today = new Date();
      
      let years = today.getFullYear() - birth.getFullYear();
      let months = today.getMonth() - birth.getMonth();
      let days = today.getDate() - birth.getDate();
      
      if (days < 0) {
        months--;
        days += 30;
      }
      if (months < 0) {
        years--;
        months += 12;
      }
      
      setValue('ageYears', years.toString());
      setValue('ageMonths', months.toString());
      setValue('ageDays', days.toString());
    }
  };

  // Create OpenMRS compatible patient object
  const mapToOpenMRSPatient = (data: PatientFormData) => {
    return {
      patient: {
        person: {
          names: [{
            givenName: data.givenName,
            middleName: data.middleName,
            familyName: data.familyName,
            preferred: true,
          }],
          gender: data.gender,
          birthdate: data.birthdate,
          birthdateEstimated: data.birthdateEstimated,
          addresses: [{
            address1: data.address1,
            address2: data.address2,
            cityVillage: data.cityVillage,
            countyDistrict: data.countyDistrict,
            stateProvince: data.stateProvince,
            country: data.country || 'Yemen',
            postalCode: data.postalCode,
            preferred: true,
          }],
          dead: data.dead,
          deathDate: data.deathDate,
          causeOfDeath: data.causeOfDeath,
        },
        identifiers: data.primaryIdentifier ? [{
          identifier: data.primaryIdentifier,
          identifierType: { uuid: '' }, // Would come from config
          preferred: true,
        }] : [],
      },
      // Image would be added here if captured
      image: patientImage,
    };
  };

  const onSubmit = async (data: PatientFormData) => {
    try {
      const openMRSPatient = mapToOpenMRSPatient(data);
      console.log('OpenMRS Patient:', openMRSPatient);
      
      // Here you would call the OpenMRS API
      // POST /openmrs/ws/rest/v1/patient
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Redirect to patient dashboard or start visit
      router.push('/patients');
    } catch (error) {
      console.error('Error saving patient:', error);
    }
  };

  return (
    <>
      <Head>
        <title>{isRTL ? 'تسجيل مريض جديد - النظام الصحي اليمني' : 'New Patient Registration - Yemen Health System'}</title>
      </Head>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary-100 rounded-lg">
            <UserPlus size={24} className="text-primary-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">{t.newPatient}</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Patient Photo & Identifier Section */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex gap-6">
                {/* Photo Capture */}
                <div className="flex flex-col items-center">
                  <div className="w-32 h-32 bg-slate-100 rounded-lg border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden">
                    {patientImage ? (
                      <img src={patientImage} alt="Patient" className="w-full h-full object-cover" />
                    ) : (
                      <Camera size={32} className="text-slate-400" />
                    )}
                  </div>
                  <Button type="button" variant="ghost" size="sm" className="mt-2">
                    <Camera size={16} className="mr-1" />
                    {t.capturePhoto}
                  </Button>
                </div>

                {/* Patient Identifier */}
                <div className="flex-1">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    {t.patientIdentifier}
                  </label>
                  <div className="flex gap-2">
                    <Input
                      placeholder={isRTL ? 'البادئة' : 'Prefix'}
                      className="w-24"
                      {...register('identifierPrefix')}
                    />
                    <Input
                      placeholder={t.enterId}
                      className="flex-1"
                      {...register('primaryIdentifier')}
                    />
                  </div>
                  <label className="flex items-center gap-2 mt-2 text-sm text-slate-600">
                    <input
                      type="checkbox"
                      {...register('hasOldIdentifier')}
                      className="rounded border-slate-300"
                    />
                    {t.enterId}
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Patient Name Section (matching Bahmni) */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>{t.patientName}</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Local Name (Arabic) */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  {t.patientNameLocal}
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    placeholder={t.givenName}
                    {...register('givenNameLocal')}
                  />
                  <Input
                    placeholder={t.middleName}
                    {...register('middleNameLocal')}
                  />
                  <Input
                    placeholder={t.familyName}
                    {...register('familyNameLocal')}
                  />
                </div>
              </div>

              {/* English Name */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  {t.patientName} <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    placeholder={t.givenName}
                    {...register('givenName')}
                    error={errors.givenName?.message}
                    required
                  />
                  <Input
                    placeholder={t.middleName}
                    {...register('middleName')}
                  />
                  <Input
                    placeholder={t.familyName}
                    {...register('familyName')}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Gender Section */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Select
                  label={t.gender}
                  options={genderOptions}
                  placeholder={t.selectGender}
                  {...register('gender')}
                  error={errors.gender?.message}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Age/DOB Section (matching Bahmni toggle) */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex gap-4 mb-4">
                <button
                  type="button"
                  onClick={() => setUseAge(true)}
                  className={`px-4 py-2 rounded-lg ${useAge ? 'bg-primary-500 text-white' : 'bg-slate-100 text-slate-600'}`}
                >
                  {t.age}
                </button>
                <button
                  type="button"
                  onClick={() => setUseAge(false)}
                  className={`px-4 py-2 rounded-lg ${!useAge ? 'bg-primary-500 text-white' : 'bg-slate-100 text-slate-600'}`}
                >
                  {t.dateOfBirth}
                </button>
              </div>

              {useAge ? (
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">{t.years}</label>
                    <Input
                      type="number"
                      min="0"
                      max="150"
                      {...register('ageYears')}
                      onBlur={calculateBirthdate}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">{t.months}</label>
                    <Input
                      type="number"
                      min="0"
                      max="11"
                      {...register('ageMonths')}
                      onBlur={calculateBirthdate}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">{t.days}</label>
                    <Input
                      type="number"
                      min="0"
                      max="30"
                      {...register('ageDays')}
                      onBlur={calculateBirthdate}
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">{t.dateOfBirth}</label>
                    <Input
                      type="date"
                      {...register('birthdate')}
                      onBlur={calculateAge}
                    />
                  </div>
                  <div className="flex items-end">
                    <label className="flex items-center gap-2 text-sm text-slate-600">
                      <input
                        type="checkbox"
                        {...register('birthdateEstimated')}
                        className="rounded border-slate-300"
                      />
                      {t.estimated}
                    </label>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Address Section (matching Bahmni address hierarchy) */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>{t.addressInfo}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label={t.address1}
                  {...register('address1')}
                />
                <Input
                  label={t.address2}
                  {...register('address2')}
                />
                <Input
                  label={t.cityVillage}
                  {...register('cityVillage')}
                />
                <Input
                  label={t.countyDistrict}
                  {...register('countyDistrict')}
                />
                <Select
                  label={t.stateProvince}
                  options={governorateOptions}
                  placeholder={t.selectGovernorate}
                  {...register('stateProvince')}
                />
                <Input
                  label={t.country}
                  {...register('country')}
                  defaultValue={t.yemen}
                />
                <Input
                  label={t.postalCode}
                  {...register('postalCode')}
                />
              </div>
            </CardContent>
          </Card>

          {/* Additional Information (Collapsible - matching Bahmni) */}
          <Card className="mb-6">
            <CardHeader 
              className="cursor-pointer"
              onClick={() => setShowAdditionalInfo(!showAdditionalInfo)}
            >
              <div className="flex items-center gap-2">
                {showAdditionalInfo ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                <CardTitle>{t.additionalInfo}</CardTitle>
              </div>
            </CardHeader>
            {showAdditionalInfo && (
              <CardContent>
                {/* Custom attributes would go here based on configuration */}
                <p className="text-sm text-slate-500">
                  {isRTL 
                    ? 'السمات المخصصة ستظهر هنا بناءً على إعدادات النظام' 
                    : 'Custom attributes will appear here based on system configuration'}
                </p>
              </CardContent>
            )}
          </Card>

          {/* Death Information (Collapsible - matching Bahmni) */}
          <Card className="mb-6">
            <CardHeader 
              className="cursor-pointer"
              onClick={() => setShowDeathInfo(!showDeathInfo)}
            >
              <div className="flex items-center gap-2">
                {showDeathInfo ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                <CardTitle>{t.deathInfo}</CardTitle>
              </div>
            </CardHeader>
            {showDeathInfo && (
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      {...register('dead')}
                      className="rounded border-slate-300"
                    />
                    <label className="text-sm text-slate-700">{t.isDead}</label>
                  </div>
                  {watch('dead') && (
                    <>
                      <Input
                        label={t.deathDate}
                        type="date"
                        {...register('deathDate')}
                      />
                      <Input
                        label={t.causeOfDeath}
                        {...register('causeOfDeath')}
                      />
                    </>
                  )}
                </div>
              </CardContent>
            )}
          </Card>

          {/* Form Actions (matching Bahmni) */}
          <div className="flex gap-4 justify-end bg-slate-50 p-4 rounded-lg">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              <X size={18} className={isRTL ? 'ml-2' : 'mr-2'} />
              {t.cancel}
            </Button>
            <Button type="submit" isLoading={isSubmitting}>
              <Save size={18} className={isRTL ? 'ml-2' : 'mr-2'} />
              {t.save}
            </Button>
            <Button type="submit" variant="secondary" isLoading={isSubmitting}>
              {t.startVisit}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
