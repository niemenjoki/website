import Advert from '@/components/Advert/Advert';
import SafeImage from '@/components/SafeImage/SafeImage';
import portrait from '@/public/images/portrait2024.avif';

import classes from './Tietoa.module.css';
import structuredData from './structuredData.json';

export { default as generateMetadata } from './generateMetadata';

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
        }}
      />

      <div className={classes.AboutPage}>
        <div className={classes.Info}>
          <SafeImage
            src={portrait}
            alt="Valokuva Joonas Niemenjoesta"
            placeholder="blur"
            width={200}
            height={200}
            priority
          />
          <h1>Joonas Niemenjoki</h1>
        </div>

        <div className={classes.Bio}>
          <h2>Minusta</h2>
          <p>
            Hei, olen Joonas Niemenjoki. Työskentelen rakennusautomaation parissa,
            erityisesti lämpöpumppujärjestelmien ja niiden ohjauslogiikan kanssa.
            Ohjelmoin, viritän ja korjaan järjestelmiä, jotka vaikuttavat ihmisten arkeen
            usein huomaamatta: sisälämpötilaan, energiankulutukseen ja järjestelmien
            pitkäikäisyyteen. Minua kiinnostaa ennen kaikkea se, miten asiat toimivat
            oikeissa rakennuksissa – ei vain paperilla tai suunnitelmissa.
          </p>

          <h2>Työni ydin</h2>
          <p>
            Olen työskennellyt pääasiassa asuinkerrostalojen, toimistorakennusten,
            koulujen ja päiväkotien rakennusautomaation parissa vuodesta 2021 lähtien.
            Nykyisin suurin osa työstäni liittyy lämpöpumppujärjestelmiin, sekä uusien
            toteuttamiseen että vanhojen, huonosti toimivien järjestelmien korjaamiseen.
          </p>
          <p>
            En toimi järjestelmäsuunnittelijana, mutta annan usein palautetta
            suunnitteluratkaisuista käytännön kokemusteni pohjalta.
          </p>

          <h2>Miksi tämä sivusto</h2>
          <p>
            Jaan ajoittain sisältöä LinkedInissä, mutta siellä sisällön pituudella ja
            muodolla on omat rajoitteensa. Erillinen sivusto antaa mahdollisuuden
            kirjoittaa pidempää ja syvällisempää sisältöä sekä käyttää enemmän kuvia ja
            interaktiivisia elementtejä tekstin tukena.
          </p>
          <p>
            Uskon, että huolellisesti tehty automaatio tekee elämästä helpompaa muille,
            vaikka sitä ei aina huomata. Kun järjestelmät toimivat loogisesti ja
            ennustettavasti, ne säästävät energiaa, rahaa ja hermoja. Joskus ne myös
            innostavat muita tekemään asiat hieman paremmin.
          </p>

          <hr />

          <p>
            <small>
              Sivustolla esitetyt näkemykset ja mielipiteet ovat omiani eivätkä edusta
              työnantajani tai minkään muun sidosryhmän kantoja tai näkemyksiä.
            </small>
          </p>
        </div>
      </div>

      <Advert adClient="ca-pub-5560402633923389" adSlot="1051764153" />
    </>
  );
}
