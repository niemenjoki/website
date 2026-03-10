import Advert from '@/components/Advert/Advert';
import SafeLink from '@/components/SafeLink/SafeLink';

import classes from './StVariableTool.module.css';
import StVariableToolClient from './StVariableToolClient';
import structuredData from './structuredData.json';

export { default as generateMetadata } from './generateMetadata';

export default function StVariablesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
        }}
      />

      <div className={classes.Page}>
        <h1>ST-muuttujat</h1>
        <p className={classes.Lead}>
          Tämä työkalu generoi muuttujien esittelylistan IEC ST -koodin perusteella.
        </p>
        <p className={classes.BackLink}>
          <SafeLink href="/projektit/rau-tyokalut">Kaikki RAU-työkalut</SafeLink>
        </p>

        <StVariableToolClient />
      </div>

      <Advert adClient="ca-pub-5560402633923389" adSlot="1051764153" />
    </>
  );
}
