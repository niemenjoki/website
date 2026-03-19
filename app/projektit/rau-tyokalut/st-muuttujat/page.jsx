import Advert from '@/components/Advert/Advert';
import Breadcrumbs from '@/components/Breadcumbs/Breadcrumbs';
import SafeImage from '@/components/SafeImage/SafeImage';
import SafeLink from '@/components/SafeLink/SafeLink';
import stVariablesImage from '@/public/images/content/projects/stmuuttujat.avif';

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
        <Breadcrumbs
          items={[
            { name: 'Etusivu', href: '/' },
            { name: 'RAU-työkalut', href: '/projektit/rau-tyokalut' },
            { name: 'ST-muuttujat' },
          ]}
        />
        <h1>ST-muuttujat</h1>
        <SafeImage
          src={stVariablesImage}
          alt="Kuvakaappaus ST-muuttujat-työkalusta, jossa Structured Text -koodista generoidaan muuttujien esittelylista"
          placeholder="blur"
          priority
          sizes="(max-width: 980px) 100vw, 980px"
          style={{ width: '100%', height: 'auto', marginBottom: '1.25rem' }}
        />
        <p className={classes.Lead}>
          Tämä työkalu generoi muuttujien esittelylistan koodin perusteella.
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
