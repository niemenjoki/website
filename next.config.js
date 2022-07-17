const withPlugins = require('next-compose-plugins');
const withPWA = require('next-pwa');

const nextConfig = {
  productionBrowserSourceMaps: true,
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = withPlugins(
  [
    [
      withPWA,
      {
        pwa: {
          dest: 'public',
          disable: process.env.NODE_ENV === 'development',
        },
      },
    ],
  ],
  nextConfig
);
