import Link from 'next/link';

import ProjectPage from '@/components/ProjectPage/ProjectPage';
import { createPageMetadata } from '@/lib/metadata/createPageMetadata';
import { projectSitePages } from '@/lib/site/pageRecords.mjs';

const page = projectSitePages.fiInvoicePaymentSlip;

export function generateMetadata() {
  return createPageMetadata(page.metadata);
}

export default function FiInvoicePaymentSlipProjectPage() {
  return (
    <ProjectPage page={page}>
      <p>
        fi-invoice-payment-slip on ohjelmointikirjasto, joka lisää laskuun suomalaisen
        tilisiirtolomakkeen. Se on laskun alaosa, jossa ovat saajan tilinumero,
        viitenumero, eräpäivä ja summa sekä pankkiviivakoodi. Pankkisovellus lukee
        viivakoodista kaikki maksun tiedot, joten maksajan ei tarvitse näppäillä mitään.
      </p>

      <p>
        Käytän kirjastoa pienessä verkkokaupassani{' '}
        <Link href="/projektit/lieromaa">Lieromaassa</Link>: sen laskujen maksuosa
        piirretään tällä kirjastolla.
      </p>

      <h2>Mitä kirjasto tekee</h2>
      <ul>
        <li>Laskee viitenumeron tarkisteen, eli viitteen viimeisen numeron.</li>
        <li>
          Muodostaa pankkiviivakoodin ja QR-koodin Finanssiala ry:n ohjeiden mukaan.
          Koodit on testattu ohjeiden esimerkkejä vasten.
        </li>
        <li>
          Piirtää lomakkeen virallisilla mitoilla suomeksi ja ruotsiksi tai englanniksi.
        </li>
      </ul>

      <h2>Kenelle</h2>
      <p>
        Kirjasto on tarkoitettu ohjelmoijille, jotka tekevät laskuja omalla
        Node.js-sovelluksella, esimerkiksi verkkokaupassa. Se on ilmainen ja avointa
        lähdekoodia.
      </p>
    </ProjectPage>
  );
}
