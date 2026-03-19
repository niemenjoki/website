import Advert from '@/components/Advert/Advert';
import Breadcrumbs from '@/components/Breadcumbs/Breadcrumbs';
import SafeImage from '@/components/SafeImage/SafeImage';
import SafeLink from '@/components/SafeLink/SafeLink';
import modbusDevicesImage from '@/public/images/content/projects/modbuslaitteet.avif';

import classes from './ModbusDeviceTool.module.css';
import ModbusDeviceToolClient from './ModbusDeviceToolClient';
import structuredData from './structuredData.json';

export { default as generateMetadata } from './generateMetadata';

export default function ModbusDevicesPage() {
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
            { name: 'Modbus-laitteet' },
          ]}
        />
        <h1>Modbus-laitteet</h1>
        <SafeImage
          src={modbusDevicesImage}
          alt="Kuvakaappaus Modbus-laitteet-työkalusta, jossa Modbus-koodista generoidaan laitelista ja FX-Editoriin sopiva näkymä"
          placeholder="blur"
          priority
          sizes="(max-width: 980px) 100vw, 980px"
          style={{ width: '100%', height: 'auto', marginBottom: '1.25rem' }}
        />
        <p className={classes.Lead}>
          Muodostaa Modbus-funktiolohkosta Modbus-laitelistat sekä FX-Editoriin sopivan
          XML:n. Kutsukoodin avulla saat erikseen sekä tarvittavat että kaikki
          Modbus-laitteet.
        </p>
        <p className={classes.BackLink}>
          <SafeLink href="/projektit/rau-tyokalut">Kaikki RAU-työkalut</SafeLink>
        </p>

        <ModbusDeviceToolClient />
      </div>

      <Advert adClient="ca-pub-5560402633923389" adSlot="1051764153" />
    </>
  );
}
