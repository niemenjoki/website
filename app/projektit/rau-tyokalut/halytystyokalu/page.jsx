import Advert from '@/components/Advert/Advert';
import Breadcrumbs from '@/components/Breadcumbs/Breadcrumbs';
import SafeImage from '@/components/SafeImage/SafeImage';
import SafeLink from '@/components/SafeLink/SafeLink';
import alarmPageImage from '@/public/images/content/projects/halytystyokalu.avif';

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
        <Breadcrumbs
          items={[
            { name: 'Etusivu', href: '/' },
            { name: 'RAU-työkalut', href: '/projektit/rau-tyokalut' },
            { name: 'Hälytystyökalu' },
          ]}
        />
        <h1>Hälytystyökalu</h1>
        <SafeImage
          src={alarmPageImage}
          alt="Kuvakaappaus Hälytystyökalusta, jossa pistelistasta muodostetaan hälytyssivu ja IEC-koodi"
          placeholder="blur"
          priority
          sizes="(max-width: 900px) 100vw, 900px"
          style={{ width: '100%', height: 'auto', marginBottom: '1.25rem' }}
        />
        <p className={classes.Lead}>
          Muuntaa FX-Editorista kopioidut pisteet hälytyssivun grafiikkakuvaksi ja generoi
          IEC koodin samassa muodossa kuin FX-Editorin template manager.
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
