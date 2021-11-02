/** @type {import('next').NextConfig} */
const withPlugins = require('next-compose-plugins');

const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  env: {
    WEATHER_API_KEY: process.env.WEATHER_API_KEY,
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
            svgo: false,
            titleProp: true,
          },
        },
        'url-loader',
      ],
    });
    return config;
  },
};
module.exports = withPlugins([nextConfig]);
