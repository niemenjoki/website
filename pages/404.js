import Layout from '@/components/Layout';
import classNames from '@/styles/NotFoundPage.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const NotFoundPage = () => {
  const router = useRouter();
  const [language, setLanguage] = useState('en');
  useEffect(() => {
    const languagePreference = localStorage.getItem('languagePreference');
    if (languagePreference === 'fi') setLanguage('fi');
  }, []);

  const updateLanguagePreference = (e, language) => {
    e.preventDefault();
    if (language === 'en') {
      localStorage.setItem('languagePreference', 'fi');
      router.push('/');
    } else {
      localStorage.setItem('languagePreference', 'en');
      router.push('/en');
    }
  };

  return (
    <Layout title={'404 | Joonas Niemenjoki'} language={language}>
      <div className={classNames.Oops}>
        {language === 'en' ? 'Oops!' : 'Hups!'}
      </div>
      <h1 className={classNames.NotFoundPage}>
        {language === 'en'
          ? 'Looks like the page you are looking for does not exist'
          : 'Näyttää siltä, että etsimääsi sivua ei ole olemassa'}
      </h1>
      <div className={classNames.Suggestion}>
        {language === 'en'
          ? 'Maybe you can find it here:'
          : 'Kokeile löytyisikö etsimäsi sivu täältä:'}
      </div>
      <div className={classNames.LinkWrapper}>
        <Link href={language === 'en' ? '/blog' : '/blogi'} className="hover">
          {language === 'en' ? 'Recent Blogposts' : 'Viimeisimmät julkaisut'}
        </Link>
      </div>
      <div className={classNames.LinkWrapper}>
        <Link
          href={language === 'en' ? '/projects' : '/projektit'}
          className="hover"
        >
          {language === 'en' ? 'Projects' : 'Projektit'}
        </Link>
      </div>
      <div
        className={classNames.LinkWrapper + ' hover'}
        href={language === 'en' ? '/' : '/en'}
        onClick={(e) => updateLanguagePreference(e, language)}
      >
        {language === 'en' ? 'Finnish pages' : 'Englanninkieliset sivut'}
      </div>
    </Layout>
  );
};
export default NotFoundPage;
