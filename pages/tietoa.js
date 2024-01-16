import Advert from '@/components/Advert';
import Layout from '@/components/Layout';
import classes from '@/styles/AboutPage.module.css';
import Image from 'next/image';
import portrait from '../public/images/portrait2024.png';

const AboutPage = () => {
  return (
    <Layout
      title={'Tietoa | Joonas Niemenjoki'}
      language="fi"
      i18n={`https://niemenjoki.fi/about`}
    >
      <div className={classes.AboutPage}>
        <div className={classes.Info}>
          <Image
            src={portrait}
            alt="Valokuva Joonas Niemenjoesta"
            placeholder="blur"
            width={200}
            height={200}
          />
          <h1>Joonas Niemenjoki</h1>
        </div>
        <div className={classes.Bio}>
          <p>
            Moi👋 Olen Joonas, suomalainen insinööri ja ohjelmoija. Olen
            harjoitellut koodaamista noin vuoden 2019 alusta lähtien. Osaan
            erityisesti rakennusautomaation prosessien ohjelmointia sekä
            web-teknologioita kuten React, Node.js, Next.js, MondoDB ja Express.
            Lisäksi olen myös käyttänyt hieman React Nativea, Electronia,
            Pythonia, C++:aa sekä Bashiä.
          </p>
          <p>
            Työni on vuodesta 2021 lähtien keskittynyt pääasiassa
            lämpöpumppujärjestelmien ohjelmointiin, testaamiseen ja
            toiminnanvarmistamiseen. Autan ihmisiä löytämään ja korjaamaan
            ongelmien syitä huonosti toimivissa lämmitysjärjestelmissä. Olen
            myös osallistunut lämpöpumppujärjestelmien suunnitteluun ja
            ohjelmoinut järjestelmiä, joissa suurin osa lämpöpumpun toiminnasta
            on ohjattu kiinteistöautomaatiojärjestelmän avulla, mukaan lukien
            toiminnallisuuksia kompressorien ohjaus lämpötilapoikkeamaan
            perustuvaan muuttuvan viiveen avulla, vuorotteluautomaatio ja
            vaihtoventtiilikytkentäisten järjestelmien käyntijärjestyksen
            määrittely.
          </p>
          <p>
            Nautin eniten haastavista ohjelmointiprojekteista, joissa minulla on
            mahdollisuus luoda uusia ratkaisuja sen sijaan, että kopioisin
            rutinoituneesti koodia vanhoista projekteista.
          </p>
          <p>
            Laita viestiä, jos tarvitset apua lämpöpumppuongelmissa tai
            tarvitset jonkun koodaamaan haastavan prosessin
            kiinteistöautomaatiojärjestelmään.
          </p>
        </div>
      </div>
      <Advert language="fi" />
    </Layout>
  );
};

export default AboutPage;
