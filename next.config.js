const nextConfig = {
  async headers() {
    return [
      {
        source: '/:all*(png|jpg|jpeg|webp|avif|ico|svg)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        // Basic security headers. A full CSP needs more work because of AdSense.
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Content-Security-Policy', value: "frame-ancestors 'self'" },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/projektit/rau-tyokalut/:path+',
        destination: '/projektit/rau-tyokalut',
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
