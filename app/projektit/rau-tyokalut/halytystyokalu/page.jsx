import Advert from '@/components/Advert/Advert';
import Breadcrumbs from '@/components/Breadcumbs/Breadcrumbs';
import SafeImage from '@/components/SafeImage/SafeImage';
import SafeLink from '@/components/SafeLink/SafeLink';
import { rauToolsAlarmPage, rauToolsPage } from '@/lib/site/pageRecords.mjs';
import { createProjectStructuredData } from '@/lib/structuredData/createProjectStructuredData';
import alarmPageImage from '@/public/images/content/projects/halytystyokalu.avif';

import classes from './AlarmPageTool.module.css';
import AlarmPageToolClient from './AlarmPageToolClient';

export { default as generateMetadata } from './generateMetadata';

export default function AlarmPagePage() {
  const breadcrumbItems = [
    { name: 'Etusivu', href: '/' },
    { name: rauToolsPage.shortLabel, href: rauToolsPage.canonicalUrl },
    { name: rauToolsAlarmPage.shortLabel },
  ];
  const structuredData = createProjectStructuredData({
    page: rauToolsAlarmPage,
    breadcrumbItems,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
        }}
      />

      <div className={classes.Page}>
        <p className={classes.SmallPrint}>
          Virheilmoitukset ja parannusehdotukset: joonas.niemenjoki@gmail.com
        </p>
        <Breadcrumbs items={breadcrumbItems} />
        <h1>{rauToolsAlarmPage.shortLabel}</h1>
        <SafeImage
          src={alarmPageImage}
          alt="Kuvakaappaus Hälytystyökalusta, jossa pistelistasta muodostetaan hälytyssivu ja IEC-koodi"
          placeholder="blur"
          priority
          sizes="(max-width: 900px) 100vw, 900px"
          style={{ width: '100%', height: 'auto', marginBottom: '1.25rem' }}
        />
        <p className={classes.Lead}>
          {rauToolsAlarmPage.lead ?? rauToolsAlarmPage.description}
        </p>
        <p className={classes.BackLink}>
          <SafeLink href={rauToolsPage.canonicalUrl}>Kaikki RAU-työkalut</SafeLink>
        </p>

        <AlarmPageToolClient />
      </div>

      <Advert />
    </>
  );
}
