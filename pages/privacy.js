import Layout from '@/components/Layout';
import classes from '@/styles/PrivacyPage.module.css';
import Link from 'next/link';

const PrivacyPage = () => {
  return (
    <Layout
      title={'Privacy policy | Joonas Niemenjoki'}
      language="en"
      i18n={`https://niemenjoki.fi/tietosuoja`}
    >
      <div className={classes.PrivacyPage}>
        <h1>Privacy Policy</h1>
        <p>
          <Link href="/tietosuoja">
            <a>🇫🇮 Lue tämä tietosuojaseloste suomeksi</a>
          </Link>
        </p>
        <p>
          <em>Last updated: 22nd January 2024</em>
        </p>

        <p>
          This a personal website operated by Joonas Niemenjoki. This privacy
          policy informs you of policies regarding the collection, use, and
          disclosure of Personal Information on this website.
        </p>
        <h2>Information Collection and Use</h2>
        <p>
          This website does not not directly collect any personally identifiable
          information. However, it utilizes third-party services that may
          collect information. You&apos;re free to continue using this website
          even if you use ad blockers or any other services that prevent the use
          of data collecting third party services on this website.
        </p>
        <h2>Google AdSense and Google Analytics</h2>
        <p>
          Google AdSense and Google Analytics are used on this site to serve ads
          and analyze user behavior. These services may collect data such as IP
          addresses, browser type, browsing habits, and device information.
          Please refer to Google&apos;s privacy policies for more details on how
          they handle this data:{' '}
          <a
            href="https://support.google.com/adsense/topic/13821022?hl=en"
            target="_blank"
            rel="noreferrer"
          >
            Google AdSense Privacy & Terms
          </a>{' '}
          and{' '}
          <a
            href="https://support.google.com/analytics/topic/2919631?hl=en"
            target="_blank"
            rel="noreferrer"
          >
            Google Analytics Privacy & Terms.
          </a>
        </p>
        <h2>LocalStorage</h2>
        <p>
          When you switch between light and dark modes or Finnish and English on
          this website, we store your preferences in your browser&apos;s
          localStorage. This way, we can automatically use the theme and
          language of your choice next time you visit out site. This data is
          stored locally on the your device and is not transfered anywhere.
        </p>
        <h2>Cookies</h2>
        <p>
          This website itself doesn&apos;t use cookies but it utilizes
          third-party services that use them. You can instruct your browser to
          refuse all cookies or to indicate when a cookie is being sent.
        </p>
        <h2>Contact</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact me
          at joonas.niemenjoki(a)gmail.com.
        </p>
      </div>
    </Layout>
  );
};

export default PrivacyPage;
