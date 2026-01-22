import Advert from '@/components/Advert/Advert';

import classes from './CompressCra.module.css';
import structuredData from './structuredData.json';

export { default as generateMetadata } from './generateMetadata';

export default function CompressCraProjectPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
        }}
      />

      <div className={classes.ProjectPage}>
        <h1>compress-create-react-app</h1>
        <div className={classes.Badges}>
          <a
            href="https://www.npmjs.com/package/compress-create-react-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://img.shields.io/npm/v/compress-create-react-app.svg"
              alt="npm version"
              loading="lazy"
            />
          </a>

          <a
            href="https://www.npmjs.com/package/compress-create-react-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://img.shields.io/npm/dm/compress-create-react-app.svg"
              alt="npm monthly downloads"
              loading="lazy"
            />
          </a>
        </div>
        <p>
          compress-create-react-app on React-kehittäjille tarkoitettu apuohjelma, jota
          käytetään Create React App -ympäristön kanssa. Create React App helpottaa
          verkkosivujen tekemistä, mutta ei sellaisenaan tarjoa helppoa tapaa pakata
          sivuston tiedostoja valmiiksi palvelinta varten.
        </p>

        <p>
          Verkkosivujen pakkaaminen tarkoittaa sitä, että sivuston HTML-, CSS- ja
          JavaScript-tiedostot pienennetään ennen kuin ne siirretään käyttäjälle. Tämä
          vähentää siirrettävän datan määrää, nopeuttaa sivujen latautumista ja parantaa
          käyttökokemusta. Hyöty näkyy erityisesti mobiililaitteilla ja hitaammilla
          verkkoyhteyksillä, mutta myös yleisesti kevyempänä ja nopeampana sivustona.
        </p>

        <p>
          compress-create-react-app tekee tiedostojen pakkaamisesta kehittäjän
          näkökulmasta yksinkertaista. Työkalu pakkaa sivuston tiedostot automaattisesti
          ilman, että sovelluksen rakennetta tarvitsee muuttaa tai konfiguroida
          monimutkaisia työkaluja käsin.
        </p>

        <p>
          Työkalu on julkaistu avoimena lähdekoodina ja on tarkoitettu käytettäväksi
          olemassa olevien Create React App -projektien lisänä silloin, kun sivuston
          suorituskykyä halutaan parantaa vaivattomasti.
        </p>

        <p>
          👉 Projektin lähdekoodi:{' '}
          <a
            className="extlink"
            href="https://github.com/niemenjoki/compress-create-react-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            github.com/niemenjoki/compress-create-react-app
          </a>
        </p>
      </div>

      <Advert adClient="ca-pub-5560402633923389" adSlot="1051764153" />
    </>
  );
}
