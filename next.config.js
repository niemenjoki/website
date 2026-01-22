const nextConfig = {
  async headers() {
    return [
      {
        source: '/:all*(png|jpg|jpeg|webp|avif|ico|svg)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/madot',
        destination: '/tuotteet/madot',
        permanent: true,
      },
      {
        source: '/madot-kampanja',
        destination: '/tuotteet/madot-kampanja',
        permanent: true,
      },
    ];
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
