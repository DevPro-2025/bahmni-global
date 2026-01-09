import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { UserPlus, Save, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';

// Validation schema
const patientSchema = z.object({
  firstName: z.string().min(2, 'الاسم الأول مطلوب'),
  middleName: z.string().optional(),
  lastName: z.string().min(2, 'اسم العائلة مطلوب'),
  dateOfBirth: z.string().min(1, 'تاريخ الميلاد مطلوب'),
  gender: z.enum(['male', 'female']),
  nationalId: z.string().optional(),
  phone: z.string().min(9, 'رقم الهاتف غير صالح'),
  email: z.string().email('البريد الإلكتروني غير صالح').optional().or(z.literal('')),
  address: z.string().optional(),
  city: z.string().optional(),
  governorate: z.string().optional(),
  bloodType: z.string().optional(),
  maritalStatus: z.string().optional(),
  emergencyContact: z.string().optional(),
  emergencyPhone: z.string().optional(),
});

type PatientFormData = z.infer<typeof patientSchema>;

export default function RegistrationPage() {
  const router = useRouter();
  const locale = router.locale || 'ar';
  const isRTL = locale === 'ar';

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<PatientFormData>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      gender: 'male',
    },
  });

  const t = {
    title: isRTL ? 'تسجيل مريض جديد' : 'New Patient Registration',
    personalInfo: isRTL ? 'المعلومات الشخصية' : 'Personal Information',
    contactInfo: isRTL ? 'معلومات الاتصال' : 'Contact Information',
    medicalInfo: isRTL ? 'المعلومات الطبية' : 'Medical Information',
    emergencyInfo: isRTL ? 'معلومات الطوارئ' : 'Emergency Information',
    firstName: isRTL ? 'الاسم الأول' : 'First Name',
    middleName: isRTL ? 'اسم الأب' : 'Middle Name',
    lastName: isRTL ? 'اسم العائلة' : 'Last Name',
    dateOfBirth: isRTL ? 'تاريخ الميلاد' : 'Date of Birth',
    gender: isRTL ? 'الجنس' : 'Gender',
    male: isRTL ? 'ذكر' : 'Male',
    female: isRTL ? 'أنثى' : 'Female',
    nationalId: isRTL ? 'رقم الهوية' : 'National ID',
    phone: isRTL ? 'رقم الهاتف' : 'Phone Number',
    email: isRTL ? 'البريد الإلكتروني' : 'Email',
    address: isRTL ? 'العنوان' : 'Address',
    city: isRTL ? 'المدينة' : 'City',
    governorate: isRTL ? 'المحافظة' : 'Governorate',
    bloodType: isRTL ? 'فصيلة الدم' : 'Blood Type',
    maritalStatus: isRTL ? 'الحالة الاجتماعية' : 'Marital Status',
    single: isRTL ? 'أعزب' : 'Single',
    married: isRTL ? 'متزوج' : 'Married',
    divorced: isRTL ? 'مطلق' : 'Divorced',
    widowed: isRTL ? 'أرمل' : 'Widowed',
    emergencyContact: isRTL ? 'اسم جهة الاتصال للطوارئ' : 'Emergency Contact Name',
    emergencyPhone: isRTL ? 'هاتف الطوارئ' : 'Emergency Phone',
    save: isRTL ? 'حفظ' : 'Save',
    cancel: isRTL ? 'إلغاء' : 'Cancel',
    selectGender: isRTL ? 'اختر الجنس' : 'Select Gender',
    selectBloodType: isRTL ? 'اختر فصيلة الدم' : 'Select Blood Type',
    selectMaritalStatus: isRTL ? 'اختر الحالة الاجتماعية' : 'Select Marital Status',
    selectGovernorate: isRTL ? 'اختر المحافظة' : 'Select Governorate',
  };

  const genderOptions = [
    { value: 'male', label: t.male },
    { value: 'female', label: t.female },
  ];

  const bloodTypeOptions = [
    { value: 'A+', label: 'A+' },
    { value: 'A-', label: 'A-' },
    { value: 'B+', label: 'B+' },
    { value: 'B-', label: 'B-' },
    { value: 'AB+', label: 'AB+' },
    { value: 'AB-', label: 'AB-' },
    { value: 'O+', label: 'O+' },
    { value: 'O-', label: 'O-' },
  ];

  const maritalStatusOptions = [
    { value: 'single', label: t.single },
    { value: 'married', label: t.married },
    { value: 'divorced', label: t.divorced },
    { value: 'widowed', label: t.widowed },
  ];

  // Yemen governorates
  const governorateOptions = [
    { value: 'sanaa', label: isRTL ? 'صنعاء' : "Sana'a" },
    { value: 'aden', label: isRTL ? 'عدن' : 'Aden' },
    { value: 'taiz', label: isRTL ? 'تعز' : 'Taiz' },
    { value: 'hodeidah', label: isRTL ? 'الحديدة' : 'Hodeidah' },
    { value: 'ibb', label: isRTL ? 'إب' : 'Ibb' },
    { value: 'dhamar', label: isRTL ? 'ذمار' : 'Dhamar' },
    { value: 'hadramaut', label: isRTL ? 'حضرموت' : 'Hadramaut' },
    { value: 'marib', label: isRTL ? 'مأرب' : 'Marib' },
    { value: 'lahj', label: isRTL ? 'لحج' : 'Lahj' },
    { value: 'shabwah', label: isRTL ? 'شبوة' : 'Shabwah' },
    { value: 'abyan', label: isRTL ? 'أبين' : 'Abyan' },
    { value: 'aldali', label: isRTL ? 'الضالع' : 'Al Dali' },
    { value: 'amran', label: isRTL ? 'عمران' : 'Amran' },
    { value: 'hajjah', label: isRTL ? 'حجة' : 'Hajjah' },
    { value: 'saadah', label: isRTL ? 'صعدة' : "Sa'dah" },
    { value: 'albayda', label: isRTL ? 'البيضاء' : 'Al Bayda' },
    { value: 'almahwit', label: isRTL ? 'المحويت' : 'Al Mahwit' },
    { value: 'almahrah', label: isRTL ? 'المهرة' : 'Al Mahrah' },
    { value: 'rayma', label: isRTL ? 'ريمة' : 'Raymah' },
    { value: 'aljawf', label: isRTL ? 'الجوف' : 'Al Jawf' },
    { value: 'socotra', label: isRTL ? 'سقطرى' : 'Socotra' },
  ];

  const onSubmit = async (data: PatientFormData) => {
    try {
      // Here you would call your API to save the patient
      console.log('Patient data:', data);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Redirect to patients list
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
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary-100 rounded-lg">
            <UserPlus size={24} className="text-primary-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">{t.title}</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Personal Information */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>{t.personalInfo}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  label={t.firstName}
                  {...register('firstName')}
                  error={errors.firstName?.message}
                  required
                />
                <Input
                  label={t.middleName}
                  {...register('middleName')}
                />
                <Input
                  label={t.lastName}
                  {...register('lastName')}
                  error={errors.lastName?.message}
                  required
                />
                <Input
                  label={t.dateOfBirth}
                  type="date"
                  {...register('dateOfBirth')}
                  error={errors.dateOfBirth?.message}
                  required
                />
                <Select
                  label={t.gender}
                  options={genderOptions}
                  placeholder={t.selectGender}
                  {...register('gender')}
                  error={errors.gender?.message}
                  required
                />
                <Input
                  label={t.nationalId}
                  {...register('nationalId')}
                />
                <Select
                  label={t.maritalStatus}
                  options={maritalStatusOptions}
                  placeholder={t.selectMaritalStatus}
                  {...register('maritalStatus')}
                />
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>{t.contactInfo}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label={t.phone}
                  type="tel"
                  {...register('phone')}
                  error={errors.phone?.message}
                  required
                />
                <Input
                  label={t.email}
                  type="email"
                  {...register('email')}
                  error={errors.email?.message}
                />
                <Input
                  label={t.address}
                  {...register('address')}
                />
                <Input
                  label={t.city}
                  {...register('city')}
                />
                <Select
                  label={t.governorate}
                  options={governorateOptions}
                  placeholder={t.selectGovernorate}
                  {...register('governorate')}
                />
              </div>
            </CardContent>
          </Card>

          {/* Medical Information */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>{t.medicalInfo}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label={t.bloodType}
                  options={bloodTypeOptions}
                  placeholder={t.selectBloodType}
                  {...register('bloodType')}
                />
              </div>
            </CardContent>
          </Card>

          {/* Emergency Information */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>{t.emergencyInfo}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label={t.emergencyContact}
                  {...register('emergencyContact')}
                />
                <Input
                  label={t.emergencyPhone}
                  type="tel"
                  {...register('emergencyPhone')}
                />
              </div>
            </CardContent>
          </Card>

          {/* Form Actions */}
          <div className="flex gap-4 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              <X size={18} className="mr-2" />
              {t.cancel}
            </Button>
            <Button type="submit" isLoading={isSubmitting}>
              <Save size={18} className="mr-2" />
              {t.save}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
