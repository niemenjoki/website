import Advert from '@/components/Advert/Advert';
import Breadcrumbs from '@/components/Breadcumbs/Breadcrumbs';
import SafeImage from '@/components/SafeImage/SafeImage';
import wormsOnHandImage from '@/public/images/kompostimadot_kammenella.avif';

import classes from './Lieromaa.module.css';
import structuredData from './structuredData.json';

export { default as generateMetadata } from './generateMetadata';

export default function LieromaaProjectPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
        }}
      />

      <div className={classes.ProjectPage}>
        <Breadcrumbs items={[{ name: 'Etusivu', href: '/' }, { name: 'Lieromaa' }]} />
        <h1>Lieromaa</h1>
        <SafeImage
          src={wormsOnHandImage}
          alt="Valokuva Joonas Niemenjoesta"
          placeholder="blur"
          style={{ width: '100%', maxWidth: '600px', height: 'auto' }}
          priority
        />
        <p>
          Lieromaa on sivuprojektini, joka syntyi käytännön tarpeesta ja omasta
          kiinnostuksesta kompostointiin ja kestävään arkeen, ja josta kehittyi
          pienimuotoinen, toiminimen kautta harjoitettava sivutoimi. Projektin ytimessä on
          matokompostointi eli biojätteen käsittely kompostimatojen avulla
          kotitalousmittakaavassa.
        </p>

        <p>
          Sivustolla jaan omien kokemusteni pohjalta tietoa matokompostoinnista, autan
          aiheesta kiinnostuneita alkuun ja myyn kompostimatoja. Tavoitteena on madaltaa
          kynnystä aloittaa ja välttää yleisimmät virheet.
        </p>

        <p>
          Lieromaa toimii samalla kokeilualustana sisällöntuotannolle,
          hakukoneoptimoinnille ja teknisille ratkaisuille, joita hyödynnän myös muissa
          projekteissani. Sivusto on ohjelmoitu kokonaan itse ja sen kehitys on jatkuvaa.
        </p>

        <p>
          👉 Tutustu projektiin osoitteessa{' '}
          <a
            className="extlink"
            href="https://www.lieromaa.fi/"
            target="_blank"
            rel="noopener noreferrer"
          >
            lieromaa.fi
          </a>
        </p>
      </div>

      <Advert adClient="ca-pub-5560402633923389" adSlot="1051764153" />
    </>
  );
}
