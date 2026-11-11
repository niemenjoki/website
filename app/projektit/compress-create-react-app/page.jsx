import ProjectPage from '@/components/ProjectPage/ProjectPage';
import { createPageMetadata } from '@/lib/metadata/createPageMetadata';
import { projectSitePages } from '@/lib/site/pageRecords.mjs';

const page = projectSitePages.compressCreateReactApp;

export function generateMetadata() {
  return createPageMetadata(page.metadata);
}

export default function CompressCraProjectPage() {
  return (
    <ProjectPage page={page}>
      <p>
        compress-create-react-app on ohjelmointityökalu, jonka julkaisin vuonna 2021. Se
        pakkaa verkkosivuston tiedostot valmiiksi pienempään kokoon. Pienemmät tiedostot
        siirtyvät nopeammin, joten sivu latautuu nopeammin etenkin puhelimella ja hitaalla
        yhteydellä.
      </p>

      <p>
        Työkalu on tehty sivustoille, jotka on rakennettu Create React App -nimisellä
        työkalulla. Create React App on sittemmin poistunut käytöstä, joten myös
        compress-create-react-app on merkitty vanhentuneeksi, eikä sitä enää ylläpidetä.
        Viimeinen versio 1.4.6 julkaistiin 29.7.2026.
      </p>

      <p>
        Työkalu on yhä ladattavissa vanhoja sivustoja varten, mutta uusiin sivustoihin
        kannattaa valita tuettu työkalu. Se on ilmainen ja avointa lähdekoodia.
      </p>
    </ProjectPage>
  );
}
