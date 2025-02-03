const { withContentlayer } = require('next-contentlayer');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    NEXT_CMS_ASSET_ENV_ID: process.env.NEXT_CMS_ASSET_ENV_ID,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.graphassets.com',
      },
    ],
    formats: ['image/webp'],
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
};
module.exports = withBundleAnalyzer(withContentlayer(nextConfig));
