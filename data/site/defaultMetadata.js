import { SITE_AUTHOR } from './author.js';
import {
  GOOGLE_SITE_VERIFICATION,
  SITE_DESCRIPTION,
  SITE_LOCALE,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
} from './constants.mjs';

// Share cards need a wide PNG or JPEG, so pages without an image of their own use this one (app/jakokuva.png).
export const defaultShareImage = {
  url: '/jakokuva.png',
  width: 1200,
  height: 630,
  alt: SITE_TITLE,
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
    images: [defaultShareImage],
    locale: SITE_LOCALE,
  },

  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [defaultShareImage.url],
  },

  icons: {
    icon: '/icons/favicon.ico',
    apple: '/icons/apple-touch-icon.png',
  },
};
