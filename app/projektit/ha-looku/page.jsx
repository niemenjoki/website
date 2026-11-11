import Link from 'next/link';

import ProjectPage from '@/components/ProjectPage/ProjectPage';
import { createPageMetadata } from '@/lib/metadata/createPageMetadata';
import { projectSitePages } from '@/lib/site/pageRecords.mjs';

const page = projectSitePages.haLooku;

export function generateMetadata() {
  return createPageMetadata(page.metadata);
}

export default function HaLookuProjectPage() {
  return (
    <ProjectPage page={page}>
      <p>
        ha-looku tuo <Link href="/projektit/looku">Lookun</Link> kävijätilastot Home
        Assistantiin. Sivustojen sivunlataukset, kävijät ja verkkokaupan tilaukset näkyvät
        antureina samaan tapaan kuin kodin lämpötilat ja sähkönkulutus. Niitä voi seurata
        samassa näkymässä kodin muiden tietojen kanssa ja käyttää automaatioissa.
      </p>

      <h2>Mitä sillä voi tehdä</h2>
      <ul>
        <li>Koota sivustojen luvut kodin näkymään valmiilla korteilla.</li>
        <li>
          Saada ilmoituksen, jos sivustolle ei ole tullut yhtään sivunlatausta moneen
          tuntiin. Se tarkoittaa yleensä, että jokin on rikki.
        </li>
        <li>
          Seurata verkkokaupan tilauksia ja myyntiä sekä sitä, kuinka suuri osa kävijöistä
          ostaa jotain, esimerkiksi viimeisen viikon ajalta.
        </li>
      </ul>

      <h2>Mitä käyttöönotto vaatii</h2>
      <p>
        Integraatio asennetaan Home Assistantiin HACS:n kautta, ja Lookusta tarvitaan
        avain, jolla tietoja voi lukea. Integraatio vain lukee tietoja eikä muuta Lookun
        asetuksia. Vaiheet ovat Lookun suomenkielisissä ohjeissa.
      </p>

      <p>Integraatio on ilmainen ja avointa lähdekoodia.</p>
    </ProjectPage>
  );
}
