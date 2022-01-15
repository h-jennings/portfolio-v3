/** @type {import('next').NextConfig} */
const withPlugins = require('next-compose-plugins');

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
    domains: ['openweathermap.org'],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            prettier: false,
            svgo: false,
            titleProp: true,
          },
        },
        {
          loader: 'file-loader',
          options: {
            name: 'static/media/[name].[hash].[ext]',
          },
        },
      ],
      issuer: {
        and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
      },
    });
    return config;
  },
};
module.exports = withPlugins([withBundleAnalyzer], nextConfig);
