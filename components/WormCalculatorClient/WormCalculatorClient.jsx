'use client';

import { useState } from 'react';

import Advert from '@/components/Advert/Advert';
import PostRecommendation from '@/components/PostRecommendation/PostRecommendation';
import SafeLink from '@/components/SafeLink/SafeLink';
import SocialShareButtons from '@/components/SocialShareButtons/SocialShareButtons';
import useDebounce from '@/hooks/useDebounce';

import classes from './WormCalculatorClient.module.css';

export default function WormCalculatorClient({ recommendedPosts }) {
  const title = 'Matolaskuri';
  const description =
    'Syötä kotitaloutesi tiedot ja laskuri arvioi tuottamasi biojätteen määrän sekä tarvittavan matomäärän.';

  const [adults, setAdults] = useState(2);
  const [teens, setTeens] = useState(0);
  const [children, setChildren] = useState(0);
  const [toddlers, setToddlers] = useState(0);
  const [diet, setDiet] = useState('sekaruoka');
  const [result, setResult] = useState(null);

  const baseWaste = { adult: 250, teen: 300, child: 200, toddler: 120 };
  const dietFactors = {
    sekaruoka: 1.0,
    kasvispainotteinen: 1.1,
    kasvis: 1.2,
    vegaani: 1.3,
  };

  function calculate() {
    const factor = dietFactors[diet];
    const total =
      adults * baseWaste.adult +
      teens * baseWaste.teen +
      children * baseWaste.child +
      toddlers * baseWaste.toddler;
    const adjustedTotal = Math.round(total * factor);
    const min = Math.round(adjustedTotal * 0.8);
    const max = Math.round(adjustedTotal * 1.2);
    const wormsNeeded = adjustedTotal;
    const halfStart = Math.round(wormsNeeded / 2);
    const quarterStart = Math.round(wormsNeeded / 4);
    const eighthStart = Math.round(wormsNeeded / 8);
    setResult({
      scraps: [min, max],
      wormsNeeded,
      options: { halfStart, quarterStart, eighthStart },
    });
  }

  useDebounce(
    () => {
      calculate();
    },
    2000,
    [adults, teens, children, toddlers, diet]
  );

  return (
    <article className={classes.WormCalculatorClient}>
      <h1>{title}</h1>
      <p>{description}</p>

      <div className={classes.Content}>
        <h2>Miksi laskuri on hyödyllinen?</h2>
        <p>
          Kompostimatojen määrän mitoittaminen oikein auttaa pitämään kompostorin
          tasapainossa. Liian pieni populaatio ei ehdi käsittelemään kaikkea jätettä, ja
          liian suuri populaatio taas kärsii ruoan puutteesta. Laskurin avulla saat
          karkean arvion siitä, kuinka monta matoa kotitaloutesi tuottaman biojätteen
          käsittelyyn tarvitaan.
        </p>
        <p>
          Jos sinulla ei vielä ole matoja, voit ostaa niitä{' '}
          <SafeLink href="/tuotteet/madot">täältä</SafeLink>.
        </p>

        <h2>Laskuri</h2>
        <p>
          Arvio perustuu kotitalouden kokoon, ruokavalioon ja oletukseen, että
          matopopulaatio kaksinkertaistuu noin 3 kuukaudessa. Tulokset ovat
          suuntaa-antavia – käytännössä biojätteen määrä ja matojen syönti riippuvat mm.
          lämpötilasta, kosteudesta ja ruoan laadusta.
        </p>

        <div className={classes.CalculatorForm}>
          <label>
            Aikuiset:
            <input
              type="number"
              value={adults}
              onChange={(e) => setAdults(Number(e.target.value))}
            />
          </label>
          <label>
            Teinit (13–17 v.):
            <input
              type="number"
              value={teens}
              onChange={(e) => setTeens(Number(e.target.value))}
            />
          </label>
          <label>
            Lapset (4–12 v.):
            <input
              type="number"
              value={children}
              onChange={(e) => setChildren(Number(e.target.value))}
            />
          </label>
          <label>
            Taaperot (1–3 v.):
            <input
              type="number"
              value={toddlers}
              onChange={(e) => setToddlers(Number(e.target.value))}
            />
          </label>
          <label>
            Ruokavalio:
            <select value={diet} onChange={(e) => setDiet(e.target.value)}>
              <option value="sekaruoka">Sekaruokavalio</option>
              <option value="kasvispainotteinen">Kasvispainotteinen</option>
              <option value="kasvis">Kasvis</option>
              <option value="vegaani">Vegaani</option>
            </select>
          </label>
        </div>

        {result && (
          <div style={{ marginTop: '2rem' }}>
            <h3>Tulokset</h3>
            <p>
              Kotitaloutesi tuottaa arviolta {result.scraps[0]} – {result.scraps[1]} g
              biojätettä viikossa. Sen käsittelemiseen tarvitaan noin{' '}
              <strong>{result.wormsNeeded} matoa</strong>.
            </p>
            <p>
              Koko suositellun määrän hankkimalla kompostori toimii heti täydellä teholla.
              Käytännössä isoja matomääriä voi kuitenkin olla vaikea saada ostettua
              kerralla. Toinen vaihtoehto on hankkia pieni määrä matoja ja odottaa, että
              ne lisääntyy.
            </p>

            <ul>
              <li>
                Jos aloitat noin {result.options.halfStart} madolla, kestää noin 3
                kuukautta, että sinulla on tarvittava määrä matoja.
              </li>
              <li>
                Jos aloitat noin {result.options.quarterStart} madolla, aikaa kuluu noin 6
                kuukautta.
              </li>
              <li>
                Vähimmäisvaihtoehtona {result.options.eighthStart} madolla kompostori
                toimii täysillä noin vuoden kuluttua.
              </li>
            </ul>

            <small>
              Laskelma perustuu oletukseen, että yksi mato painaa noin 0.5 g ja syö noin 1
              g biojätettä viikossa. Populaatio tuplaantuu keskimäärin 3 kuukauden välein.
            </small>
          </div>
        )}

        <h2>Vinkkejä tulosten tulkintaan</h2>
        <ul>
          <li>
            Jos aloitat pienellä matomäärällä, anna populaation kasvaa rauhassa – vältä
            liiallista ruokintaa.
          </li>
          <li>
            Jos aloitat suurella määrällä, varmista että biojätettä riittää heti alusta
            asti.
          </li>
          <li>
            Muista, että matojen kasvu ja syönti vaihtelevat kompostorin olosuhteiden
            mukaan.
          </li>
        </ul>
      </div>

      <SocialShareButtons title={title} text={description} tags={['matokomposti']} />
      <Advert adClient="ca-pub-5560402633923389" adSlot="1051764153" />
      <PostRecommendation
        posts={recommendedPosts}
        customTitle="Aiheeseen liittyviä blogijulkaisuja"
      />
    </article>
  );
}
