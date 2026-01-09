/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable internationalized routing
  i18n: {
    locales: ['ar', 'en'],
    defaultLocale: 'ar',
    localeDetection: false,
  },
  // Enable React strict mode
  reactStrictMode: true,
  // Configure images
  images: {
    domains: ['localhost'],
    unoptimized: true,
  },
  // Enable standalone output for Docker
  output: 'standalone',
  // Configure environment variables
  env: {
    NEXT_PUBLIC_OPENMRS_URL: process.env.NEXT_PUBLIC_OPENMRS_URL || '/openmrs',
    NEXT_PUBLIC_BAHMNI_URL: process.env.NEXT_PUBLIC_BAHMNI_URL || '/bahmni',
  },
  // Configure rewrites for API proxy during development
  async rewrites() {
    return [
      {
        source: '/openmrs/:path*',
        destination: `${process.env.OPENMRS_URL || 'http://localhost:8080'}/openmrs/:path*`,
      },
      {
        source: '/bahmni/:path*',
        destination: `${process.env.BAHMNI_URL || 'http://localhost:8080'}/bahmni/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
