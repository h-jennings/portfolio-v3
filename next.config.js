/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  env: {
    WEATHER_API_KEY: process.env.WEATHER_API_KEY,
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
  },
  images: {
    domains: ['openweathermap.org', 'media.graphassets.com'],
  },
  async redirects() {
    return [
      {
        source: '/about',
        destination: '/',
        permanent: true,
      },
      {
        source: '/dod',
        destination: '/work/dwr',
        permanent: true,
      },
      {
        source: '/portfolio-v1',
        destination: 'https://v2.hunterjennings.dev/portfolio-v1',
        permanent: true,
      },
      {
        source: '/caffeinator',
        destination: 'https://v2.hunterjennings.dev/caffeinator',
        permanent: true,
      },
    ];
  },
  webpack: (config) => {
    return config;
  },
};
module.exports = withBundleAnalyzer(nextConfig);
