import { Rubik } from 'next/font/google';

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';

import AdSenseConsentGate from '@/components/AdSense/AdSenseConsentGate';
import Analytics from '@/components/Analytics/Analytics';
import Footer from '@/components/Footer/Footer';
import NavigationShell from '@/components/Navigation/NavigationShell';
import { ADSENSE_ENABLED } from '@/data/site/adsense';
import { getSiteSearchIndex } from '@/lib/search/siteSearchIndex.mjs';
import { getSiteNavigation } from '@/lib/siteStructure.mjs';
import { createSiteStructuredData } from '@/lib/structuredData/createSiteStructuredData';

import './globals.css';

config.autoAddCss = false;

export { defaultMetadata as metadata } from '@/data/site/defaultMetadata';

// Teema asetetaan ennen piirtoa, ettei vaalea teema vilkahda (sama tapa kuin Lieromaassa).
const themeInitializationScript = `(() => {
  let isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  try {
    const storedTheme = window.localStorage.getItem('darkMode');
    if (storedTheme === 'true') isDark = true;
    else if (storedTheme === 'false') isDark = false;
    else if (storedTheme !== null) window.localStorage.removeItem('darkMode');
  } catch {}
  document.documentElement.classList.toggle('dark', isDark);
  document.body.classList.toggle('dark', isDark);
})();`;

const rubik = Rubik({
  subsets: ['latin'],
  weight: ['400', '700', '800'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-site',
});

export default function RootLayout({ children }) {
  const navigation = getSiteNavigation();
  const structuredData = createSiteStructuredData();

  return (
    <html lang="fi" className={rubik.variable} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <script dangerouslySetInnerHTML={{ __html: themeInitializationScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
          }}
        />
        <div className="container">
          <a className="skip-link" href="#main-content">
            Siirry sisältöön
          </a>
          <NavigationShell navigation={navigation} searchItems={getSiteSearchIndex()} />
          <main id="main-content">{children}</main>
          <Footer navigation={navigation} />
        </div>
        <Analytics />
        {ADSENSE_ENABLED ? <AdSenseConsentGate /> : null}
      </body>
    </html>
  );
}
