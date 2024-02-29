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
          <h1>Joonas Niemenjoki</h1>
        </div>
        <div className={classes.Bio}>
          <p>
            Hi👋, I&apos;m Joonas, a Finnish engineer and programmer. I&apos;ve
            been practicing coding since the beginning of 2019. I specialize in
            programming building automation processes and web technologies such
            as React, Node.js, Next.js, MongoDB, and Express. Additionally, I
            have some experience with React Native, Electron, Python, C++, and
            Bash.
          </p>
          <p>
            Since 2021, my work has mainly focused on programming, testing, and
            ensuring the functionality of heat pump systems. I help people
            identify and fix the causes of issues in poorly functioning heating
            systems. I&apos;ve also been involved in the design of heat pump
            systems and programmed systems where most of the heat pump&apos;s
            operation is controlled through building automation systems. This
            includes functionalities like temperature deviation based variable
            delays in compressor control and start order determination with
            switch valve connected systems.
          </p>
          <p>
            I enjoy challenging programming projects where I have the
            opportunity to create new solutions rather than simply copying code
            from old projects.
          </p>
          <p>
            Feel free to reach out if you need help with heat pump issues or if
            you need someone to code a challenging process into a building
            automation system. I'm happy to help directly with quick queries,
            and if needed, I can pass on your request to the right person if it
            requires a larger investment of time and resources from my employer.
          </p>
        </div>
      </div>
      <Advert language="en" />
    </Layout>
  );
};

export default AboutPage;
