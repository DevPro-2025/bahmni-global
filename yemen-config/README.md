# Yemen Health System - Theme Overlay Configuration

This configuration provides a professional UI/UX redesign for Bahmni as a Theme/Skin overlay.

## 📋 Overview

This is **NOT** a replacement frontend. It's a CSS/Styling overlay that:
- ✅ Loads on top of Bahmni's original interfaces
- ✅ Preserves all workflows, behaviors, and functionality
- ✅ Only changes visual appearance (UI/UX)
- ✅ Removes Bahmni branding → "النظام الصحي اليمني" / "Yemen Health System"
- ✅ Supports Arabic (RTL) and English (LTR) only
- ✅ Localizes for Yemen (governorates, currency)

## 🎯 What This Does

| Feature | Description |
|---------|-------------|
| **Branding** | Replaces "Bahmni" with "Yemen Health System" / "النظام الصحي اليمني" |
| **Modern UI** | Professional design with improved layout, spacing, typography |
| **RTL Support** | Full right-to-left support for Arabic |
| **i18n** | Arabic/English translations only |
| **Yemen Localization** | Governorates, Yemeni Rial (YER) |

## 🚫 What This Does NOT Do

- ❌ Does not change any workflow or behavior
- ❌ Does not modify backend or APIs
- ❌ Does not change form fields or their order
- ❌ Does not add/remove any functionality
- ❌ Does not affect validation rules
- ❌ Does not change error handling logic

## 📁 Structure

```
yemen-config/
├── README.md                    # This file
├── styles/
│   ├── yemen-theme.css          # Main theme CSS overlay
│   ├── yemen-variables.css      # CSS variables (colors, fonts, spacing)
│   ├── yemen-rtl.css            # RTL-specific styles
│   ├── yemen-components.css     # Component overrides
│   └── yemen-responsive.css     # Responsive breakpoints
├── i18n/
│   ├── ar.json                  # Arabic translations
│   └── en.json                  # English translations
├── branding/
│   ├── branding.json            # Branding configuration
│   └── logo.svg                 # Yemen Health System logo
└── assets/
    └── fonts/                   # Custom fonts if needed
```

## 🔧 Installation

### Method 1: Docker Volume Mount

Add to your `docker-compose.yml`:

```yaml
services:
  bahmniapps:
    volumes:
      - ./yemen-config/styles:/var/www/bahmniapps/styles/yemen:ro
      - ./yemen-config/i18n:/var/www/bahmniapps/i18n/custom:ro
      - ./yemen-config/branding:/var/www/bahmniapps/branding/custom:ro
```

### Method 2: Nginx Include

Add to your nginx configuration:

```nginx
# Include Yemen theme CSS
location /bahmni/styles/yemen/ {
    alias /path/to/yemen-config/styles/;
}
```

### Method 3: App Config

In Bahmni app configuration, add:

```json
{
  "customStylesheet": "/bahmni/styles/yemen/yemen-theme.css",
  "locale": "ar",
  "supportedLocales": ["ar", "en"]
}
```

## 🎨 Design Reference

The visual design is based on the `bahmni-yemen-frontend` Next.js prototype, which serves as:
- Design System reference
- Visual inspiration
- UX guide

**Note:** The Next.js prototype is NOT a production frontend.

## 📝 Usage Notes

1. This overlay works with Bahmni version 0.93+
2. Test with both Arabic and English locales
3. Verify RTL layout in Arabic mode
4. All original Bahmni functionality remains intact

## 🔄 Updates

When updating Bahmni, this overlay should continue to work as it only adds CSS on top of existing styles. If Bahmni changes class names or structure significantly, the overlay may need adjustment.
