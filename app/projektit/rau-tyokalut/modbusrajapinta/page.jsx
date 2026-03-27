import Advert from '@/components/Advert/Advert';
import Breadcrumbs from '@/components/Breadcumbs/Breadcrumbs';
import SafeLink from '@/components/SafeLink/SafeLink';
import { rauToolsModbusInterfacePage, rauToolsPage } from '@/lib/site/pageRecords.mjs';
import { createProjectStructuredData } from '@/lib/structuredData/createProjectStructuredData';

import classes from './ModbusInterfaceTool.module.css';
import ModbusInterfaceToolClient from './ModbusInterfaceToolClient';

export { default as generateMetadata } from './generateMetadata';

export default function ModbusInterfacePage() {
  const breadcrumbItems = [
    { name: 'Etusivu', href: '/' },
    { name: rauToolsPage.shortLabel, href: rauToolsPage.canonicalUrl },
    { name: rauToolsModbusInterfacePage.shortLabel },
  ];
  const structuredData = createProjectStructuredData({
    page: rauToolsModbusInterfacePage,
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
        <div className={classes.TitleRow}>
          <h1>{rauToolsModbusInterfacePage.shortLabel}</h1>
          {rauToolsModbusInterfacePage.isBeta ? (
            <span className={classes.BetaBadge}>beta</span>
          ) : null}
        </div>
        <p className={classes.Lead}>
          {rauToolsModbusInterfacePage.lead ?? rauToolsModbusInterfacePage.description}
        </p>
        <p className={classes.BackLink}>
          <SafeLink href={rauToolsPage.canonicalUrl}>Kaikki RAU-työkalut</SafeLink>
        </p>

        <ModbusInterfaceToolClient />
      </div>

      <Advert />
    </>
  );
}
