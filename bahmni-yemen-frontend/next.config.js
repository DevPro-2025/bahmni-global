/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable internationalized routing
  i18n: {
    locales: ['ar', 'en'],
    defaultLocale: 'ar',
    localeDetection: true,
  },
  // Enable React strict mode
  reactStrictMode: true,
  // Configure images
  images: {
    domains: ['localhost'],
  },
};

module.exports = nextConfig;
