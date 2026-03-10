import Advert from '@/components/Advert/Advert';
import SafeLink from '@/components/SafeLink/SafeLink';

import classes from './RauToolsPage.module.css';
import structuredData from './structuredData.json';

export { default as generateMetadata } from './generateMetadata';

export default function RauToolsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
        }}
      />

      <div className={classes.Page}>
        <h1>RAU-työkalut</h1>
        <p className={classes.Lead}>
          Tähän osioon kokoan rakennusautomaation sekalaisia aputyökaluja. Työkalut on
          tarkoitettu lähtökohtaisesti Fidelix-järjestelmien käyttäjille.
        </p>
        <div className={classes.ToolCatalog}>
          <SafeLink className={classes.ToolCard} href="/projektit/rau-tyokalut/halysivu">
            <h2 className={classes.CardTitle}>Hälysivu</h2>
            <p className={classes.CardDescription}>
              Muuntaa FX-Editorista kopioidun pistekanta-XML:n kopioitavaksi HTML-koodiksi
              hälytysivua varten.
            </p>
            <p className={classes.CardMeta}>
              Avaa työkalu{' '}
              <span className={classes.Arrow}>
                <span></span>
                <span></span>
                <span></span>
              </span>
            </p>
          </SafeLink>
        </div>
      </div>

      <Advert adClient="ca-pub-5560402633923389" adSlot="1051764153" />
    </>
  );
}
