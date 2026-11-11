import Link from 'next/link';

import ProjectPage from '@/components/ProjectPage/ProjectPage';
import { createPageMetadata } from '@/lib/metadata/createPageMetadata';
import { projectSitePages } from '@/lib/site/pageRecords.mjs';

const page = projectSitePages.looku;

export function generateMetadata() {
  return createPageMetadata(page.metadata);
}

export default function LookuProjectPage() {
  return (
    <ProjectPage page={page}>
      <p>
        Looku on kävijätilastojen ohjelma verkkosivustoille. Se kertoo, mitkä sivut
        kiinnostavat, mistä lukijat tulevat ja mitkä kampanjat toimivat. Tavallisista
        analytiikkapalveluista se eroaa siinä, että selaimeen ei ladata seurantaskriptiä
        eikä kävijän laitteelle tallenneta mitään. Sivuston oma palvelin kirjaa jokaisen
        sivunlatauksen, ja tiedot pysyvät omalla koneella.
      </p>

      <p>
        Tein Lookun alun perin pientä verkkokauppaani{' '}
        <Link href="/projektit/lieromaa">Lieromaata</Link> varten. Halusin nähdä, mitkä
        sivut ja kampanjat toimivat, ilman että kävijöiden tietoja lähtee ulkopuoliseen
        analytiikkapalveluun. Siitä kasvoi työkalu, jota kuka tahansa pienen palvelimen
        omistaja voi käyttää. Looku on käytössä tällä sivustolla ja Lieromaassa.
      </p>

      <h2>Mitä Lookusta näkee</h2>
      <ul>
        <li>
          Suosituimmat sivut ja sen, tulevatko lukijat hakukoneista, somesta vai toisilta
          sivustoilta.
        </li>
        <li>
          Verkkokaupan tilaukset ja myydyimmät tuotteet samassa näkymässä kävijätietojen
          kanssa.
        </li>
        <li>Kuukausikatsauksen tavallisina lauseina, halutessa myös sähköpostiin.</li>
        <li>
          Luvut, joita mainosten estäjät eivät vääristä, koska mittaus tapahtuu
          palvelimella eikä selaimessa.
        </li>
      </ul>

      <h2>Mitä käyttöönotto vaatii</h2>
      <p>
        Looku asennetaan omalle palvelimelle, esimerkiksi kotipalvelimelle, ja se
        kytketään sivustoon pienellä liittimellä. Asennus vaatii jonkin verran palvelimen
        ylläpidon osaamista, mutta suomenkielisissä ohjeissa on vaiheittaiset oppaat
        ensimmäisestä kokeilusta valmiiseen asennukseen. Demosta näkee, miltä Looku
        näyttää keksityllä datalla.
      </p>

      <p>
        Looku on ilmainen ja avointa lähdekoodia. Sen luvut saa myös Home Assistantiin
        integraatiolla <Link href="/projektit/ha-looku">ha-looku</Link>.
      </p>
    </ProjectPage>
  );
}
