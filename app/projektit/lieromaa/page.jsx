import Advert from '@/components/Advert/Advert';
import Breadcrumbs from '@/components/Breadcumbs/Breadcrumbs';
import SafeImage from '@/components/SafeImage/SafeImage';
import { lieromaaProjectPage } from '@/lib/site/pageRecords.mjs';
import { createProjectStructuredData } from '@/lib/structuredData/createProjectStructuredData';
import wormsOnHandImage from '@/public/images/kompostimadot_kammenella.avif';

import classes from './Lieromaa.module.css';

export { default as generateMetadata } from './generateMetadata';

export default function LieromaaProjectPage() {
  const breadcrumbItems = [
    { name: 'Etusivu', href: '/' },
    { name: lieromaaProjectPage.shortLabel },
  ];
  const structuredData = createProjectStructuredData({
    page: lieromaaProjectPage,
    breadcrumbItems,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
        }}
      />

      <div className={classes.ProjectPage}>
        <Breadcrumbs items={breadcrumbItems} />
        <h1>{lieromaaProjectPage.shortLabel}</h1>
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

      <Advert />
    </>
  );
}
