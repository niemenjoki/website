const nextConfig = {
  async headers() {
    return [
      {
        // Images in public/ keep their names when replaced, so they are not cached as immutable.
        source: '/:all*(png|jpg|jpeg|webp|avif|ico|svg)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=86400' }],
      },
      {
        // Build assets have a content hash in their names. This rule comes after the image rule so that it wins.
        source: '/_next/static/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        // Basic security headers. The CSP does not restrict scripts: AdSense needs a long, changing source list, and
        // nonces would require dynamic rendering of the static pages.
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          {
            key: 'Content-Security-Policy',
            value:
              "object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'self'; upgrade-insecure-requests",
          },
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
