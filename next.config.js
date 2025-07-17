const withPlugins = require('next-compose-plugins');
const withPWA = require('next-pwa');

const nextConfig = {
  productionBrowserSourceMaps: true,
  reactStrictMode: true,
  swcMinify: true,
};

const pwaConfig = {
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
};

module.exports = withPlugins(
  [
    [withPWA, { pwa: pwaConfig }],
  ],
  nextConfig
);
