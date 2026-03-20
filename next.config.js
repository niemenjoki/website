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
        source: '/projektit/rau-tyokalut/halysivu',
        destination: '/projektit/rau-tyokalut/halytystyokalu',
        permanent: true,
      },
      {
        source: '/blog/post/compress-create-react-app-make-it-faster',
        destination: '/projektit/compress-create-react-app',
        permanent: true,
      },
      {
        source: '/projects/compress-create-react-app',
        destination: '/projektit/compress-create-react-app',
        permanent: true,
      },
      {
        source: '/blog/page/1',
        destination: '/blogi',
        permanent: true,
      },
      {
        source: '/blog',
        destination: '/blogi',
        permanent: true,
      },
      {
        source: '/en',
        destination: '/',
        permanent: true,
      },
    ];
  },
  reactStrictMode: true,
};

export default nextConfig;
