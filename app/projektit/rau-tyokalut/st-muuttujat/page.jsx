import Advert from '@/components/Advert/Advert';
import Breadcrumbs from '@/components/Breadcumbs/Breadcrumbs';
import SafeImage from '@/components/SafeImage/SafeImage';
import SafeLink from '@/components/SafeLink/SafeLink';
import { rauToolsPage, rauToolsStVariablesPage } from '@/lib/site/pageRecords.mjs';
import { createProjectStructuredData } from '@/lib/structuredData/createProjectStructuredData';
import stVariablesImage from '@/public/images/content/projects/stmuuttujat.avif';

import classes from './StVariableTool.module.css';
import StVariableToolClient from './StVariableToolClient';

export { default as generateMetadata } from './generateMetadata';

export default function StVariablesPage() {
  const breadcrumbItems = [
    { name: 'Etusivu', href: '/' },
    { name: rauToolsPage.shortLabel, href: rauToolsPage.canonicalUrl },
    { name: rauToolsStVariablesPage.shortLabel },
  ];
  const structuredData = createProjectStructuredData({
    page: rauToolsStVariablesPage,
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
        <h1>{rauToolsStVariablesPage.shortLabel}</h1>
        <SafeImage
          src={stVariablesImage}
          alt="Kuvakaappaus ST-muuttujat-työkalusta, jossa Structured Text -koodista generoidaan muuttujien esittelylista"
          placeholder="blur"
          priority
          sizes="(max-width: 980px) 100vw, 980px"
          style={{ width: '100%', height: 'auto', marginBottom: '1.25rem' }}
        />
        <p className={classes.Lead}>
          {rauToolsStVariablesPage.lead ?? rauToolsStVariablesPage.description}
        </p>
        <p className={classes.BackLink}>
          <SafeLink href={rauToolsPage.canonicalUrl}>Kaikki RAU-työkalut</SafeLink>
        </p>

        <StVariableToolClient />
      </div>

      <Advert />
    </>
  );
}
