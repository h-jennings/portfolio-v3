const { withContentlayer } = require('next-contentlayer');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  outputFileTracing: true,
  env: {
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
  },
  images: {
    domains: ['media.graphassets.com'],
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
