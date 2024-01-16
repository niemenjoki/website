import Advert from '@/components/Advert';
import Layout from '@/components/Layout';
import classes from '@/styles/AboutPage.module.css';
import Image from 'next/image';
import portrait from '../public/images/portrait2024.png';

const AboutPage = () => {
  return (
    <Layout
      title={'About | Joonas Niemenjoki'}
      language="en"
      i18n={`https://niemenjoki.fi/tietoa`}
    >
      <div className={classes.AboutPage}>
        <div className={classes.Info}>
          <Image
            src={portrait}
            alt="Picture of Joonas Niemenjoki"
            placeholder="blur"
            width={200}
            height={200}
          />
          <h1>Joonas Niemejoki</h1>
        </div>
        <div className={classes.Bio}>
          <p>
            My name is Joonas Niemenjoki. I&apos;m a Finnish engineer and a self
            taught programmer. I&apos;ve been practising programming since the
            beginning of 2019, and I now confidently use web technologies like
            React, Node.js, Next.js, MondoDB, and Express. I&apos;ve also
            dabbled with React Native, Electron, Python, C++ and Bash.
          </p>
          <p>
            I currently make my living as a project manager for a Finnish
            building automation company, making buildings smarter and more
            environmentally friendly. My job involves communication with clients
            and other contractors, programming automation systems as well as
            scheduling and testing installations. I aim to eventually shift away
            from automation projects and more towards programming and developing
            automation systems.
          </p>
          <p>
            I never lost my childhood curiosity which has led me to learn all
            kinds of sometimes random things. In this blog, I write about the
            things I&apos;ve learned.
          </p>
        </div>
      </div>
      <Advert language="en" />
    </Layout>
  );
};

export default AboutPage;
