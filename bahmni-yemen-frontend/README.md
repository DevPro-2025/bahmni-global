# Bahmni Yemen Frontend | واجهة باهمني اليمن

واجهة أمامية حديثة لنظام باهمني مخصصة لليمن مع دعم اللغتين العربية والإنجليزية.

Modern frontend for Bahmni system customized for Yemen with Arabic and English language support.

## المميزات | Features

- ✅ **دعم ثنائي اللغة | Bilingual Support**: عربي (RTL) وإنجليزي (LTR)
- ✅ **تصميم حديث | Modern Design**: Tailwind CSS مع مكونات قابلة لإعادة الاستخدام
- ✅ **مخصص لليمن | Yemen Customized**: محافظات اليمن، العملة اليمنية
- ✅ **متجاوب | Responsive**: يعمل على جميع الأجهزة
- ✅ **Type-Safe**: مبني بـ TypeScript

## التقنيات | Technologies

- **Framework**: Next.js 14+
- **UI**: React 18+
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React

## البدء السريع | Quick Start

```bash
# تثبيت الاعتماديات | Install dependencies
npm install

# تشغيل خادم التطوير | Run development server
npm run dev

# بناء للإنتاج | Build for production
npm run build

# تشغيل الإنتاج | Run production
npm start
```

## هيكل المشروع | Project Structure

```
bahmni-yemen-frontend/
├── src/
│   ├── components/
│   │   ├── layout/          # مكونات التخطيط
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── MainLayout.tsx
│   │   └── ui/              # مكونات واجهة المستخدم
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       ├── Select.tsx
│   │       ├── Card.tsx
│   │       └── Badge.tsx
│   ├── locales/             # ملفات الترجمة
│   │   ├── ar.json          # العربية
│   │   └── en.json          # الإنجليزية
│   ├── pages/               # صفحات التطبيق
│   │   ├── index.tsx        # الرئيسية
│   │   ├── patients/        # المرضى
│   │   ├── registration/    # التسجيل
│   │   ├── appointments/    # المواعيد
│   │   └── ...
│   ├── styles/
│   │   └── globals.css      # الأنماط العامة
│   └── lib/
│       └── utils.ts         # أدوات مساعدة
├── package.json
├── tailwind.config.ts
├── next.config.js
└── tsconfig.json
```

## الصفحات المتاحة | Available Pages

| الصفحة | Page | المسار | Path | الحالة | Status |
|--------|------|--------|------|--------|--------|
| الرئيسية | Dashboard | `/` | ✅ مكتمل |
| المرضى | Patients | `/patients` | ✅ مكتمل |
| التسجيل | Registration | `/registration` | ✅ مكتمل |
| المواعيد | Appointments | `/appointments` | ✅ مكتمل |
| السريري | Clinical | `/clinical` | 🔄 قيد التطوير |
| المختبر | Laboratory | `/laboratory` | 🔄 قيد التطوير |
| الصيدلية | Pharmacy | `/pharmacy` | 🔄 قيد التطوير |
| الفوترة | Billing | `/billing` | 🔄 قيد التطوير |
| التقارير | Reports | `/reports` | 🔄 قيد التطوير |

## تبديل اللغة | Language Switching

يمكن تبديل اللغة من الزر في الشريط العلوي أو عن طريق URL:

```
العربية: /ar/patients
الإنجليزية: /en/patients
```

## التكامل مع Backend | Backend Integration

يتكامل مع APIs الخاصة بـ:
- OpenMRS REST API
- Bahmni REST API
- OpenMRS FHIR R4 API

```typescript
// API Configuration
const API_CONFIG = {
  OPENMRS_BASE: '/openmrs/ws/rest/v1',
  BAHMNI_BASE: '/bahmni/ws/rest/v1',
  FHIR_BASE: '/openmrs/ws/fhir2/R4',
};
```

## المساهمة | Contributing

نرحب بالمساهمات! يرجى قراءة دليل المساهمة قبل إرسال PR.

Contributions are welcome! Please read the contributing guide before submitting a PR.

## الترخيص | License

هذا المشروع مرخص تحت رخصة MIT.

This project is licensed under the MIT License.
