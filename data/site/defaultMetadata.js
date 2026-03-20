import { SITE_AUTHOR } from './author.js';
import {
  GOOGLE_SITE_VERIFICATION,
  SITE_DESCRIPTION,
  SITE_LOCALE,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
} from './constants.mjs';

const portraitImage = {
  url: SITE_AUTHOR.portraitPath,
  width: 1024,
  height: 1024,
  alt: SITE_AUTHOR.portraitAlt,
};

export const defaultMetadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),

  verification: {
    google: GOOGLE_SITE_VERIFICATION,
  },

  authors: [{ name: SITE_AUTHOR.name, url: SITE_AUTHOR.profilePath }],
  creator: SITE_NAME,
  publisher: SITE_NAME,

  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    type: 'website',
    url: '/',
    images: [portraitImage],
    locale: SITE_LOCALE,
  },

  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [portraitImage.url],
  },

  icons: {
    icon: '/icons/favicon.ico',
    apple: SITE_AUTHOR.portraitPath,
  },
  manifest: '/site.webmanifest',
};
