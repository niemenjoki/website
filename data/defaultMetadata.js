import { SITE_URL } from './vars.mjs';

const title = 'Joonas Niemenjoki';
const description =
  'Käytännön kokemuksiin perustuvia havaintoja ja vinkkejä rakennusautomaatiosta ja sitä sivuavista aiheista.';
const siteName = 'Joonas Niemenjoki';
const portraitURL = '/images/portrait2024.avif';

export const defaultMetadata = {
  title,
  description,
  metadataBase: new URL(SITE_URL),

  authors: [{ name: 'Joonas Niemenjoki', url: '/tietoa' }],
  creator: siteName,
  publisher: siteName,

  openGraph: {
    title,
    description,
    siteName,
    type: 'website',
    url: '/',
    images: [
      {
        url: portraitURL,
        width: 1024,
        height: 1024,
        alt: 'Kasvokuva Joonas Niemenjoesta',
      },
    ],
    locale: 'fi_FI',
  },

  twitter: {
    card: 'summary_large_image',
    title: siteName,
    description:
      'Käytännön kokemuksiin perustuvia havaintoja ja vinkkejä rakennusautomaatiosta ja sitä sivuavista aiheista.',
    images: [portraitURL],
  },

  icons: {
    icon: '/icons/favicon.ico',
    apple: '/images/portrait2024.avif',
  },
  manifest: '/site.webmanifest',
};
