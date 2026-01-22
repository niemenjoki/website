import classes from './Tietosuoja.module.css';
import structuredData from './structuredData.json';

export { default as generateMetadata } from './generateMetadata';

export default function PrivacyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
        }}
      />

      <div className={classes.PrivacyPage}>
        <h1>Tietosuojaseloste</h1>
        <p>
          <em>Päivitetty: 20. tammikuuta 2026</em>
        </p>

        <p>
          Tätä verkkosivustoa ylläpitää Joonas Niemenjoki (rekisterinpitäjä). Tässä
          tietosuojaselosteessa kerrotaan käytännöistä, jotka liittyvät henkilötietojen
          keräämiseen, käyttöön, säilyttämiseen ja luovuttamiseen kolmansille osapuolille
          tämän sivuston yhteydessä GDPR:n (EU 2016/679) mukaisesti. Sivusto ei edellytä
          henkilötietojen antamista käytön ehtona, eikä sivustolla käytetä automaattista
          päätöksentekoa tai profilointia, joka tuottaisi oikeusvaikutuksia.
        </p>

        <h2>Tietojen kerääminen ja käyttö</h2>
        <p>
          Tämä verkkosivusto ei suoraan kerää mitään henkilökohtaisesti tunnistettavaa
          tietoa. Sivustolla käytetään kuitenkin kolmannen osapuolen palveluita, jotka
          voivat kerätä tietoa, kuten IP-osoitteita, selaintietoja, laitetietoja ja
          selauskäyttäytymistä. Sivustoa voi käyttää myös mainostenesto-ohjelmien tai
          muiden seurantaa estävien työkalujen kanssa.
        </p>

        <h2>Käsittelyn tarkoitukset ja oikeusperusteet</h2>
        <p>Henkilötietoja käsitellään seuraaviin tarkoituksiin:</p>
        <ul>
          <li>
            Mainosten näyttäminen ja kohdentaminen (Google AdSense): Oikeusperusteena
            suostumus (GDPR Art. 6(1)(a)).
          </li>
          <li>
            Sivuston käytön ja suorituskyvyn analysointi (Vercel Analytics ja Speed
            Insights): Oikeusperusteena oikeutettu etu (GDPR Art. 6(1)(f)) sivuston
            kehittämiseksi.
          </li>
          <li>
            Käyttäjäasetusten tallentaminen (localStorage): Oikeusperusteena
            välttämättömyys palvelun tarjoamiseksi (GDPR Art. 6(1)(b)) tai oikeutettu etu.
          </li>
        </ul>

        <h2>Google AdSense</h2>
        <p>
          Sivustolla käytetään Google AdSensea mainosten näyttämiseen. Google voi kerätä
          tietoja, kuten IP-osoitteen, selaintyypin, laitetiedot, selaustottumuksia ja
          muita tunnisteita. Google voi käsitellä tietoja itsenäisenä rekisterinpitäjänä
          ja siirtää niitä myös EU-/ETA-alueen ulkopuolelle. Tietosiirrot suojataan GDPR:n
          mukaisesti vakiosopimuslausekkeilla. Google Consent Mode -toimintoa käytetään
          suostumuksen pyytämiseen ennen ei-välttämättömien evästeiden tallentamista tai
          käyttämistä.
        </p>
        <p>
          Google voi käyttää tietoja profilointiin kohdennettujen mainosten näyttämiseksi
          suostumuksen perusteella. Tietoja säilytetään palvelinlokeissa, ja ne
          anonymisoidaan osittain 9 kuukauden (IP-osoite) ja 18 kuukauden (evästeet)
          jälkeen Googlen tietojen säilytyskäytäntöjen mukaisesti.
        </p>
        <p>
          Lisätietoja saat Googlen tietosuojakäytännöistä:{' '}
          <a
            href="https://support.google.com/adsense/topic/13821022?hl=fi"
            target="_blank"
            rel="noreferrer"
          >
            Google AdSensen tietosuojakäytännöt
          </a>{' '}
          ja{' '}
          <a
            href="https://policies.google.com/technologies/retention?hl=fi"
            target="_blank"
            rel="noreferrer"
          >
            Googlen tietojen säilytys
          </a>
          .
        </p>

        <h2>Vercel Analytics ja Speed Insights</h2>
        <p>
          Sivustolla käytetään myös Vercel Analyticsia ja Speed Insights -palvelua
          sivuston käytön ja suorituskyvyn seuraamiseen. Kerätty tieto on tilastollista ja
          anonymisoitua eikä sisällä henkilökohtaisesti tunnistettavia tietoja. Tietoja,
          kuten reitti, URL, verkkonopeus, selain, laite, maa, käyttöjärjestelmä ja Web
          Vitals -metriikit, käytetään aggregoidusti. Näiden palveluiden avulla voidaan
          esimerkiksi seurata kävijämäärää ja kehittää sivuston käytettävyyttä.
          Vierailijaistunnot hylätään 24 tunnin jälkeen, ja aggregoidut tiedot säilytetään
          Vercelin käytäntöjen mukaisesti, tyypillisesti 30-90 päivää suunnitelmasta
          riippuen.
        </p>
        <p>
          Lisätietoja löydät palveluntarjoajien sivuilta:
          <br />
          <a
            href="https://vercel.com/docs/analytics/privacy-policy"
            target="_blank"
            rel="noreferrer"
          >
            Vercel Analyticsin tietosuoja
          </a>{' '}
          ja{' '}
          <a
            href="https://vercel.com/docs/speed-insights/privacy-policy"
            target="_blank"
            rel="noreferrer"
          >
            Speed Insightsin tietosuoja
          </a>
          .
        </p>

        <h2>LocalStorage</h2>
        <p>
          Kun vaihdat vaaleaan tai tummaan tilaan, sivusto tallentaa mieltymyksesi
          selaimesi paikalliseen tallennustilaan (localStorage). Näin valittu teema on
          käytössä myös seuraavalla käyntikerralla. Tämä tieto tallennetaan ainoastaan
          laitteellesi eikä sitä siirretä eteenpäin. Tietoa säilytetään toistaiseksi,
          kunnes poistat sen selaimestasi.
        </p>

        <h2>Evästeet</h2>
        <p>
          Sivusto ei itse käytä evästeitä, mutta Google AdSense sekä muut kolmannen
          osapuolen palvelut voivat käyttää evästeitä mainosten näyttämiseen,
          kohdentamiseen ja tilastointiin. Voit ohjeistaa selaimesi kieltämään kaikki
          evästeet tai ilmoittamaan, kun evästeitä lähetetään. Voit peruuttaa
          suostumuksesi milloin tahansa suostumuksenhallintatyökalun kautta tai selaimen
          asetuksista.
        </p>

        <h2>Tietojen vastaanottajat</h2>
        <p>
          Henkilötietoja luovutetaan kolmansille osapuolille vain edellä mainituissa
          palveluissa kuvatulla tavalla (Google, Vercel). Emme luovuta tietoja muille
          osapuolille ilman suostumustasi.
        </p>

        <h2>Tietojen säilytysaika</h2>
        <p>
          Tietoja säilytetään vain niin kauan kuin on tarpeen edellä mainittuihin
          tarkoituksiin. Tarkemmat säilytysajat on kuvattu kunkin palvelun kohdalla. Kun
          tiedot eivät enää ole tarpeen, ne poistetaan tai anonymisoidaan.
        </p>

        <h2>Rekisteröidyn oikeudet</h2>
        <p>Sinulla on seuraavat oikeudet GDPR:n mukaisesti:</p>
        <ul>
          <li>Oikeus saada pääsy tietoihisi (Art. 15).</li>
          <li>Oikeus tietojen oikaisemiseen (Art. 16).</li>
          <li>Oikeus tietojen poistamiseen ("oikeus tulla unohdetuksi", Art. 17).</li>
          <li>Oikeus käsittelyn rajoittamiseen (Art. 18).</li>
          <li>
            Oikeus vastustaa käsittelyä (Art. 21), esimerkiksi oikeutettuun etuun
            perustuvaa käsittelyä.
          </li>
          <li>Oikeus tietojen siirrettävyyteen (Art. 20).</li>
          <li>
            Oikeus peruuttaa suostumus milloin tahansa (Art. 7(3)), ilman että se
            vaikuttaa ennen peruuttamista suoritetun käsittelyn lainmukaisuuteen.
          </li>
        </ul>
        <p>
          Voit käyttää oikeuksiasi ottamalla yhteyttä sähköpostitse osoitteeseen
          joonas.niemenjoki(a)gmail.com. Vastaamme pyyntöösi kuukauden kuluessa.
        </p>

        <h2>Valitusoikeus</h2>
        <p>
          Jos katsot, että henkilötietojesi käsittely rikkoo GDPR:ää, sinulla on oikeus
          tehdä valitus valvontaviranomaiselle, kuten Suomen tietosuojavaltuutetulle
          (www.tietosuoja.fi).
        </p>

        <h2>Yhteystiedot</h2>
        <p>
          Jos sinulla on kysyttävää tästä tietosuojaselosteesta, voit ottaa yhteyttä
          sähköpostitse osoitteeseen joonas.niemenjoki(a)gmail.com.
        </p>
      </div>
    </>
  );
}
