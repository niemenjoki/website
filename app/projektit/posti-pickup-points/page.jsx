import Link from 'next/link';

import ProjectPage from '@/components/ProjectPage/ProjectPage';
import { createPageMetadata } from '@/lib/metadata/createPageMetadata';
import { projectSitePages } from '@/lib/site/pageRecords.mjs';

const page = projectSitePages.postiPickupPoints;

export function generateMetadata() {
  return createPageMetadata(page.metadata);
}

export default function PostiPickupPointsProjectPage() {
  return (
    <ProjectPage page={page}>
      <p>
        posti-pickup-points on ohjelmointikirjasto, joka hakee Postin noutopisteet ja
        pakettiautomaatit postinumeron perusteella. Verkkokaupan kassalla asiakas voi sen
        avulla valita lähimmän noutopisteen listasta, jossa näkyvät osoite ja etäisyys.
      </p>

      <p>
        Käytän kirjastoa pienessä verkkokaupassani{' '}
        <Link href="/projektit/lieromaa">Lieromaassa</Link>: sen kassa hakee noutopisteet
        tällä kirjastolla.
      </p>

      <h2>Mitä kirjasto tekee</h2>
      <ul>
        <li>
          Hoitaa kirjautumisen Postin rajapintaan ja muuttaa vastaukset selkeään muotoon.
        </li>
        <li>Rajaa haun halutessa pelkkiin pakettiautomaatteihin tai noutopisteisiin.</li>
        <li>Jättää halutessa Ahvenanmaan pois, jos sinne ei toimiteta.</li>
      </ul>

      <h2>Kenelle</h2>
      <p>
        Kirjasto on tarkoitettu ohjelmoijille, jotka tekevät verkkokauppaa Node.js:llä.
        Postin rajapinnan käyttöön tarvitaan omat tunnukset Postilta. Kirjasto on ilmainen
        ja avointa lähdekoodia.
      </p>
    </ProjectPage>
  );
}
