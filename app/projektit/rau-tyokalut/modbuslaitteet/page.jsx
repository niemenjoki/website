import Advert from '@/components/Advert/Advert';
import Breadcrumbs from '@/components/Breadcumbs/Breadcrumbs';
import SafeImage from '@/components/SafeImage/SafeImage';
import SafeLink from '@/components/SafeLink/SafeLink';
import { rauToolsModbusDevicesPage, rauToolsPage } from '@/lib/site/pageRecords.mjs';
import { createProjectStructuredData } from '@/lib/structuredData/createProjectStructuredData';
import modbusDevicesImage from '@/public/images/content/projects/modbuslaitteet.avif';

import classes from './ModbusDeviceTool.module.css';
import ModbusDeviceToolClient from './ModbusDeviceToolClient';

export { default as generateMetadata } from './generateMetadata';

export default function ModbusDevicesPage() {
  const breadcrumbItems = [
    { name: 'Etusivu', href: '/' },
    { name: rauToolsPage.shortLabel, href: rauToolsPage.canonicalUrl },
    { name: rauToolsModbusDevicesPage.shortLabel },
  ];
  const structuredData = createProjectStructuredData({
    page: rauToolsModbusDevicesPage,
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
        <h1>{rauToolsModbusDevicesPage.shortLabel}</h1>
        <SafeImage
          src={modbusDevicesImage}
          alt="Kuvakaappaus Modbus-laitteet-työkalusta, jossa Modbus-koodista generoidaan laitelista ja FX-Editoriin sopiva näkymä"
          placeholder="blur"
          priority
          sizes="(max-width: 980px) 100vw, 980px"
          style={{ width: '100%', height: 'auto', marginBottom: '1.25rem' }}
        />
        <p className={classes.Lead}>
          {rauToolsModbusDevicesPage.lead ?? rauToolsModbusDevicesPage.description}
        </p>
        <p className={classes.BackLink}>
          <SafeLink href={rauToolsPage.canonicalUrl}>Kaikki RAU-työkalut</SafeLink>
        </p>

        <ModbusDeviceToolClient />
      </div>

      <Advert />
    </>
  );
}
