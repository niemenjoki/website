import Advert from '@/components/Advert/Advert';
import SafeLink from '@/components/SafeLink/SafeLink';

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
        <h1>Modbus-laitteet</h1>
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
