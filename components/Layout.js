import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useEffect } from 'react';

import Footer from './Footer';
import Navbar from './Navbar';

const Layout = ({
  title,
  description,
  canonical = false,
  language,
  children,
}) => {
  const router = useRouter();
  useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    document.documentElement.lang = language;
  }, []);

  const handleRouteChange = (url) => {
    window.gtag?.('config', 'UA-142172758-1', {
      page_path: url,
    });
  };

  return (
    <div className="container">
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
        />
        <title>{title}</title>
        {canonical && <link rel="canonical" href="https://joonasjokinen.fi" />}
        <meta property="og:title" content={title} />
        <meta property="og:type" content="website" />
        <meta
          name="description"
          property="og:description"
          content={description}
        />
        <meta
          property="og:url"
          content={`https://joonasjokinen.fi${router?.asPath}`}
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="theme-color" content="#0e111b" />
      </Head>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=UA-142172758-1"
        strategy="afterInteractive"
      />
      <Script
        id="analytics-loader"
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'UA-142172758-1', { page_path: window.location.pathname });
            `,
        }}
        strategy="afterInteractive"
      />
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        crossOrigin="anonymous"
      />
      <Navbar language={language} />

      <main>{children}</main>
      <Footer language={language} />
    </div>
  );
};

Layout.defaultProps = {
  title: 'Joonas Jokinen',
  keywords: 'engineering, development, web, javascript, automation, science',
  description:
    'Sharing the things I have learned with a focus on web development, engineering, and science!',
};

export default Layout;
