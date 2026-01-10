# خطة تحديث الواجهات الأمامية لنظام Bahmni اليمن
# Bahmni Yemen Frontend Modernization Plan

## نظرة عامة | Overview

هذه الخطة الشاملة لتحديث جميع الواجهات الأمامية لنظام Bahmni بواجهات حديثة ومخصصة لليمن مع دعم اللغتين العربية والإنجليزية.

This comprehensive plan outlines the modernization of all Bahmni frontend interfaces with modern, Yemen-customized interfaces supporting Arabic and English languages.

---

## المرحلة 1: التحليل والتخطيط | Phase 1: Analysis & Planning

### 1.1 تحليل الواجهات الحالية | Current Interface Analysis

| الوحدة | Module | الوصف | Description |
|--------|--------|-------|-------------|
| `bahmni-frontend` | الواجهة الرئيسية الحديثة | Main modern frontend |
| `openmrs-module-bahmniapps` | تطبيقات EMR الأساسية | Core EMR applications |
| `openmrs-module-appointments-frontend` | نظام المواعيد | Appointments system |
| `implementer-interface` | واجهة المنفذين | Implementer interface |
| `bahmni-lab-frontend` | واجهة المختبر | Lab frontend |

### 1.2 الوظائف المطلوب الحفاظ عليها | Functions to Preserve

- ✅ تسجيل المرضى | Patient Registration
- ✅ البحث عن المرضى | Patient Search
- ✅ السجل الطبي الإلكتروني | Electronic Medical Record (EMR)
- ✅ نظام المواعيد | Appointments System
- ✅ إدارة الأسرّة | Bed Management
- ✅ نظام المختبر | Laboratory System
- ✅ الصيدلية | Pharmacy
- ✅ الفوترة | Billing
- ✅ التقارير | Reports
- ✅ لوحة التحكم | Dashboard

---

## المرحلة 2: البنية التقنية | Phase 2: Technical Architecture

### 2.1 التقنيات المقترحة | Proposed Technologies

```
┌─────────────────────────────────────────────────────────────┐
│                    Bahmni Yemen Frontend                      │
├─────────────────────────────────────────────────────────────┤
│  Framework:     React 18+ / Next.js 14+                      │
│  UI Library:    Tailwind CSS + Headless UI                   │
│  State:         Redux Toolkit / Zustand                      │
│  i18n:          react-i18next (Arabic RTL + English LTR)     │
│  Forms:         React Hook Form + Zod validation             │
│  API:           REST + OpenMRS FHIR APIs                     │
│  Charts:        Recharts / Chart.js                          │
│  Tables:        TanStack Table                               │
│  Icons:         Lucide React                                 │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 هيكل المشروع | Project Structure

```
bahmni-yemen-frontend/
├── 📁 apps/
│   ├── 📁 registration/        # تسجيل المرضى
│   ├── 📁 clinical/            # السجل السريري
│   ├── 📁 appointments/        # المواعيد
│   ├── 📁 laboratory/          # المختبر
│   ├── 📁 pharmacy/            # الصيدلية
│   ├── 📁 billing/             # الفوترة
│   ├── 📁 reports/             # التقارير
│   └── 📁 admin/               # الإدارة
├── 📁 packages/
│   ├── 📁 ui/                  # مكونات UI المشتركة
│   ├── 📁 i18n/                # الترجمات (AR/EN)
│   ├── 📁 api/                 # خدمات API
│   ├── 📁 hooks/               # React Hooks مشتركة
│   └── 📁 utils/               # أدوات مساعدة
├── 📁 locales/
│   ├── 📁 ar/                  # اللغة العربية
│   └── 📁 en/                  # اللغة الإنجليزية
└── 📁 public/
    └── 📁 assets/              # الصور والأيقونات
```

---

## المرحلة 3: دعم اللغات | Phase 3: Language Support

### 3.1 اللغة العربية (RTL) | Arabic Language

```javascript
// مثال على ملف الترجمة العربية
// ar/common.json
{
  "app": {
    "title": "نظام باهمني اليمن",
    "welcome": "مرحباً بك"
  },
  "patient": {
    "registration": "تسجيل مريض جديد",
    "search": "البحث عن مريض",
    "name": "اسم المريض",
    "id": "رقم المريض",
    "age": "العمر",
    "gender": "الجنس",
    "male": "ذكر",
    "female": "أنثى",
    "phone": "رقم الهاتف",
    "address": "العنوان"
  },
  "appointments": {
    "title": "المواعيد",
    "new": "موعد جديد",
    "date": "التاريخ",
    "time": "الوقت",
    "doctor": "الطبيب",
    "status": "الحالة"
  }
}
```

### 3.2 اللغة الإنجليزية (LTR) | English Language

```javascript
// en/common.json
{
  "app": {
    "title": "Bahmni Yemen System",
    "welcome": "Welcome"
  },
  "patient": {
    "registration": "New Patient Registration",
    "search": "Search Patient",
    "name": "Patient Name",
    "id": "Patient ID",
    "age": "Age",
    "gender": "Gender",
    "male": "Male",
    "female": "Female",
    "phone": "Phone Number",
    "address": "Address"
  },
  "appointments": {
    "title": "Appointments",
    "new": "New Appointment",
    "date": "Date",
    "time": "Time",
    "doctor": "Doctor",
    "status": "Status"
  }
}
```

### 3.3 تبديل اللغات | Language Switching

```typescript
// LanguageSwitcher.tsx
const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  
  return (
    <select onChange={(e) => i18n.changeLanguage(e.target.value)}>
      <option value="ar">العربية</option>
      <option value="en">English</option>
    </select>
  );
};
```

---

## المرحلة 4: تصميم الواجهات | Phase 4: UI Design

### 4.1 نظام الألوان اليمني | Yemen Color Scheme

```css
:root {
  /* الألوان الرئيسية - Primary Colors */
  --primary-500: #1e40af;      /* أزرق داكن */
  --primary-600: #1e3a8a;
  
  /* الألوان الثانوية - Secondary Colors */
  --secondary-500: #059669;    /* أخضر */
  
  /* ألوان الحالة - Status Colors */
  --success: #10b981;          /* نجاح */
  --warning: #f59e0b;          /* تحذير */
  --error: #ef4444;            /* خطأ */
  --info: #3b82f6;             /* معلومات */
  
  /* الخلفيات - Backgrounds */
  --bg-light: #f8fafc;
  --bg-card: #ffffff;
}
```

### 4.2 الخطوط | Fonts

```css
/* للعربية */
@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700&display=swap');

/* للإنجليزية */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

:root {
  --font-ar: 'Cairo', sans-serif;
  --font-en: 'Inter', sans-serif;
}

[dir="rtl"] {
  font-family: var(--font-ar);
}

[dir="ltr"] {
  font-family: var(--font-en);
}
```

---

## المرحلة 5: خطة التنفيذ | Phase 5: Implementation Plan

### 5.1 الجدول الزمني | Timeline

| المرحلة | Phase | المدة | Duration | المخرجات | Deliverables |
|---------|-------|-------|----------|----------|--------------|
| 1 | إعداد المشروع | 1 أسبوع | Project Setup, Base Config |
| 2 | المكونات الأساسية | 2 أسبوع | Core UI Components |
| 3 | تسجيل المرضى | 2 أسبوع | Patient Registration Module |
| 4 | السجل السريري | 3 أسابيع | Clinical Record Module |
| 5 | المواعيد | 1 أسبوع | Appointments Module |
| 6 | المختبر | 2 أسبوع | Laboratory Module |
| 7 | الصيدلية | 2 أسبوع | Pharmacy Module |
| 8 | الفوترة | 2 أسبوع | Billing Module |
| 9 | التقارير | 2 أسبوع | Reports Module |
| 10 | الاختبار والنشر | 2 أسبوع | Testing & Deployment |

**المجموع: 19 أسبوع تقريباً | Total: ~19 weeks**

### 5.2 أولويات التنفيذ | Implementation Priorities

```
عالية الأولوية | High Priority:
├── 1. تسجيل المرضى
├── 2. البحث عن المرضى
├── 3. السجل السريري الأساسي
└── 4. المواعيد

متوسطة الأولوية | Medium Priority:
├── 5. المختبر
├── 6. الصيدلية
└── 7. الفوترة

منخفضة الأولوية | Lower Priority:
├── 8. التقارير المتقدمة
├── 9. لوحة التحكم
└── 10. الإعدادات المتقدمة
```

---

## المرحلة 6: الملفات المطلوب إنشاؤها | Phase 6: Files to Create

### 6.1 ملفات الإعداد | Configuration Files

```bash
# الملفات الأساسية
bahmni-yemen-frontend/
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── next.config.js
├── .env.example
├── .env.local
└── next-i18next.config.js
```

### 6.2 المكونات الأساسية | Core Components

```
packages/ui/
├── Button/
├── Input/
├── Select/
├── Modal/
├── Table/
├── Card/
├── Navbar/
├── Sidebar/
├── Footer/
├── DatePicker/
├── TimePicker/
└── LanguageSwitcher/
```

---

## المرحلة 7: التكامل مع Backend | Phase 7: Backend Integration

### 7.1 نقاط الاتصال | API Endpoints

```typescript
// api/config.ts
const API_CONFIG = {
  OPENMRS_BASE: '/openmrs/ws/rest/v1',
  BAHMNI_BASE: '/bahmni/ws/rest/v1',
  FHIR_BASE: '/openmrs/ws/fhir2/R4',
};

// المسارات الرئيسية | Main Endpoints
const ENDPOINTS = {
  // المرضى | Patients
  PATIENTS: `${API_CONFIG.OPENMRS_BASE}/patient`,
  PATIENT_SEARCH: `${API_CONFIG.BAHMNI_BASE}/search/patient`,
  
  // المواعيد | Appointments
  APPOINTMENTS: `${API_CONFIG.BAHMNI_BASE}/appointments`,
  
  // المختبر | Lab
  LAB_ORDERS: `${API_CONFIG.OPENMRS_BASE}/order`,
  LAB_RESULTS: `${API_CONFIG.BAHMNI_BASE}/labResults`,
  
  // الأدوية | Drugs
  DRUGS: `${API_CONFIG.OPENMRS_BASE}/drug`,
  PRESCRIPTIONS: `${API_CONFIG.BAHMNI_BASE}/prescription`,
};
```

---

## الخطوات التالية | Next Steps

1. ✅ الموافقة على الخطة | Approve this plan
2. ⬜ إنشاء مجلد المشروع الجديد | Create new project folder
3. ⬜ إعداد البنية الأساسية | Set up base structure
4. ⬜ إنشاء المكونات الأساسية | Create core components
5. ⬜ إضافة ملفات الترجمة | Add translation files
6. ⬜ بناء الوحدات واحدة تلو الأخرى | Build modules one by one

---

## ملاحظات مهمة | Important Notes

> ⚠️ **تنبيه**: هذه الخطة للواجهات الأمامية فقط. الـ Backend (OpenMRS, Bahmni Core) سيبقى كما هو.
> 
> ⚠️ **Note**: This plan is for frontend only. The Backend (OpenMRS, Bahmni Core) will remain unchanged.

---

**هل توافق على هذه الخطة؟ | Do you approve this plan?**

للبدء في التنفيذ، يرجى الرد بـ "نعم، ابدأ التنفيذ" | To start implementation, please reply with "Yes, start implementation"
