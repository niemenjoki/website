import Link from 'next/link';

import ProjectPage from '@/components/ProjectPage/ProjectPage';
import SafeImage from '@/components/SafeImage/SafeImage';
import { createPageMetadata } from '@/lib/metadata/createPageMetadata';
import { projectSitePages } from '@/lib/site/pageRecords.mjs';
import wormsOnHandImage from '@/public/images/kompostimadot_kammenella.avif';

const page = projectSitePages.lieromaa;

export function generateMetadata() {
  return createPageMetadata(page.metadata);
}

export default function LieromaaProjectPage() {
  return (
    <ProjectPage page={page}>
      <SafeImage
        src={wormsOnHandImage}
        alt={page.image.alt}
        placeholder="blur"
        style={{ width: '100%', maxWidth: '600px', height: 'auto' }}
        priority
      />

      <p>
        Lieromaa on sivuprojektini, joka keskittyy matokompostointiin eli biojätteen
        kompostointiin kompostimatojen avulla kotitalouden mittakaavassa. Se syntyi omasta
        kiinnostuksesta kompostointiin ja kestävään arkeen, ja siitä kehittyi pieni
        sivutoimi, jota harjoitan toiminimellä.
      </p>

      <p>
        Lieromaan sivuilla kerron omien kokemusteni pohjalta, miten matokompostointi
        aloitetaan ja miten yleisimmät virheet vältetään. Verkkokaupasta saa
        kompostimatoja.
      </p>

      <p>
        Lieromaa on myös kokeilualustani sisällöntuotannolle, hakukoneoptimoinnille ja
        tekniikalle. Sivusto on ohjelmoitu kokonaan itse, ja siellä on käytössä myös muita
        projektejani: kävijätilastot kertoo <Link href="/projektit/looku">Looku</Link>,
        laskujen maksuosan piirtää{' '}
        <Link href="/projektit/fi-invoice-payment-slip">fi-invoice-payment-slip</Link> ja
        kassan noutopisteet hakee{' '}
        <Link href="/projektit/posti-pickup-points">posti-pickup-points</Link>.
      </p>
    </ProjectPage>
  );
}
