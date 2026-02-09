import { Rubik } from 'next/font/google';
import Script from 'next/script';

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';

import Analytics from '@/components/Analytics/Analytics';
import Footer from '@/components/Footer/Footer';
import Navbar from '@/components/Navbar/Navbar';

import './globals.css';

config.autoAddCss = false;

export const metadata = {
  verification: {
    google: 'QnhqvG850vkdtc4C7pk0jp9JUDowtwf-vVks_iHQLWY',
  },
};

const rubik = Rubik({
  subsets: ['latin'],
  weight: ['400', '700', '800'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://www.niemenjoki.fi/#website',
      url: 'https://www.niemenjoki.fi',
      name: 'Joonas Niemenjoki',
      description:
        'Käytännön kokemuksiin perustuvia havaintoja ja vinkkejä rakennusautomaatiosta ja sitä sivuavista aiheista.',
      publisher: {
        '@type': 'Organization',
        '@id': 'https://www.niemenjoki.fi/#organization',
        name: 'niemenjoki',
      },
      inLanguage: 'fi',
    },
    {
      '@type': 'Person',
      '@id': 'https://www.niemenjoki.fi/#joonas',
      name: 'Joonas Niemenjoki',
      url: 'https://www.linkedin.com/in/joonasniemenjoki',
      jobTitle: 'Creator',
      worksFor: { '@id': 'https://www.niemenjoki.fi/#organization' },
      sameAs: ['https://www.linkedin.com/in/joonasniemenjoki'],
      image: 'https://www.niemenjoki.fi/images/portrait2024.avif',
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="fi" className={rubik.variable}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
          }}
        />
        <div className="container">
          <Navbar />
          <main>{children}</main>
          <Footer />
        </div>
        <Analytics />
        <Script
          async
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5560402633923389"
          crossOrigin="anonymous"
        />
      </body>
    </html>
  );
}
