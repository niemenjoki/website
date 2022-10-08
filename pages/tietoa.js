import Advert from '@/components/Advert';
import Layout from '@/components/Layout';
import classes from '@/styles/AboutPage.module.css';
import Image from 'next/image';
import portrait from '../public/images/portrait.png';

const AboutPage = () => {
  return (
    <Layout
      title={'Tietoa | Joonas Jokinen'}
      language="fi"
      i18n={`https://joonasjokinen.fi/about`}
    >
      <div className={classes.AboutPage}>
        <div className={classes.Info}>
          <Image
            src={portrait}
            alt="Valokuva Joonas Jokisesta"
            placeholder="blur"
            width={200}
            height={200}
          />
          <h1>Joonas Jokinen</h1>
        </div>
        <div className={classes.Bio}>
          <p>
            Olen Joonas Jokinen. Olen suomalainen insinööri ja itseopiskellut
            koodari. Olen harjoitellut koodaamista vuoden 2019 alusta lähtien.
            Osaan erityisesti web-teknologioita kuten React, Node.js, Next.js,
            MondoDB ja Express. Lisäksi olen myös käyttänyt hieman React
            Nativea, Electronia, Pythonia, C++:aa sekä Bashiä.
          </p>
          <p>
            Työskentelen tällä hetkellä projektinhoitajana
            rakennusautomaatioalalla. Teen rakennuksista älykkäämpiä ja
            ympäristöystävällisempiä. Työni sisältää muun muassa paljon
            kommunikointia asiakkaiden ja muiden urakoitsijoiden kanssa,
            automaatiojärjestelmien ohjelmointia, laitetilausten tekoa,
            asennusten aikatauluttamista sekä järjestelmien testausta. Pyrin
            tulevaisuudessa projektihommista automaatiojärjestelmien
            ohjelmointi- ja kehityshommiin.
          </p>
          <p>
            En ole vielä kadottanut lapsenomaista uteliaisuuttani, mikä on
            johtanut siihen, että olen oppinut kaikenlaisia, välillä
            erikoisiakin asioita. Tässä blogissa kirjoitan asioista, joita olen
            oppinut.
          </p>
        </div>
      </div>
      <Advert language="fi" />
    </Layout>
  );
};

export default AboutPage;
