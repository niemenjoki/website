import Advert from '@/components/Advert/Advert';
import SafeLink from '@/components/SafeLink/SafeLink';

import classes from './AlarmPageTool.module.css';
import AlarmPageToolClient from './AlarmPageToolClient';
import structuredData from './structuredData.json';

export { default as generateMetadata } from './generateMetadata';

export default function AlarmPagePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
        }}
      />

      <div className={classes.Page}>
        <h1>Hälysivu</h1>
        <p className={classes.Lead}>
          Muuntaa FX-Editorista kopioidun pistekanta-XML:n kopioitavaksi HTML-koodiksi
          hälytysivua varten.
        </p>
        <p className={classes.BackLink}>
          <SafeLink href="/projektit/rau-tyokalut">Kaikki RAU-työkalut</SafeLink>
        </p>

        <AlarmPageToolClient />
      </div>

      <Advert adClient="ca-pub-5560402633923389" adSlot="1051764153" />
    </>
  );
}
