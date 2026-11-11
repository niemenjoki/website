import ProjectPage from '@/components/ProjectPage/ProjectPage';
import { createPageMetadata } from '@/lib/metadata/createPageMetadata';
import { projectSitePages } from '@/lib/site/pageRecords.mjs';

const page = projectSitePages.haKryptex;

export function generateMetadata() {
  return createPageMetadata(page.metadata);
}

export default function HaKryptexProjectPage() {
  return (
    <ProjectPage page={page}>
      <p>
        ha-kryptex yhdistää Kryptex-louhintaohjelman Home Assistantiin. Kryptex louhii
        kryptovaluuttaa tietokoneen näytönohjaimella ja suorittimella ja maksaa tuoton
        bitcoineina. Integraatio tuo louhinnan tiedot Home Assistantiin, ja louhinnan voi
        keskeyttää ja käynnistää automaattisesti esimerkiksi sähkön hinnan mukaan.
      </p>

      <p>
        Tein integraation omaan käyttööni. Autotallini ensisijainen lämmönlähde on
        tietokone, joka louhii, ja Home Assistant ohjaa sitä sähkön hinnan ja tallin
        lämpötilan mukaan.
      </p>

      <h2>Mitä sillä voi tehdä</h2>
      <ul>
        <li>Seurata saldoa ja tuottoa bitcoineina ja halutessa euroina.</li>
        <li>
          Nähdä jokaisen näytönohjaimen lämpötilan, tehonkulutuksen ja louhintatehon.
        </li>
        <li>
          Laskea, millä sähkön hinnalla louhinta kannattaa, ja keskeyttää louhinta
          automaattisesti, kun sähkö maksaa enemmän kuin louhinta tuottaa. Pörssisähkön
          hinnat saa Home Assistantiin esimerkiksi Nord Pool -integraatiolla.
        </li>
      </ul>

      <h2>Mitä käyttöönotto vaatii</h2>
      <p>
        Louhivalle Windows-koneelle asennetaan pieni apuohjelma, jonka kautta Home
        Assistant on yhteydessä Kryptexiin kotiverkossa. Kryptex-tunnuksia tai
        pilvipalvelua ei tarvita. Integraatio on HACS:n oletuslistalla, joten sen löytää
        suoraan HACS:n hausta.
      </p>

      <p>Integraatio on ilmainen ja avointa lähdekoodia.</p>
    </ProjectPage>
  );
}
