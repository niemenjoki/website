import { SITE_DESCRIPTION, SITE_NAME } from '@/data/site/constants.mjs';

export default function manifest() {
  return {
    name: SITE_NAME,
    short_name: 'Niemenjoki',
    description: SITE_DESCRIPTION,
    start_url: '/',
    scope: '/',
    display: 'standalone',
    theme_color: '#0e111b',
    background_color: '#0e111b',
    icons: [
      {
        src: '/icons/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
