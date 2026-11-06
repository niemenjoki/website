import { privacyPolicyPage } from '@/lib/site/pageRecords.mjs';
import { createPageStructuredData } from '@/lib/structuredData/createPageStructuredData';

import classes from './Tietosuoja.module.css';

export { default as generateMetadata } from './generateMetadata';

export default function PrivacyPage() {
  const structuredData = createPageStructuredData({
    pageUrl: privacyPolicyPage.pageUrl,
    pageName: privacyPolicyPage.title,
    description: privacyPolicyPage.description,
    pageType: privacyPolicyPage.pageType,
    pageIdSuffix: privacyPolicyPage.pageIdSuffix,
  });

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
          <em>
            Päivitetty:{' '}
            {new Date(privacyPolicyPage.updatedAt).toLocaleDateString('fi-FI', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </em>
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
          Sivuston oma analytiikka kirjaa sivujen avaukset palvelimella ilman evästeitä,
          eikä selaimeesi tallenneta sitä varten mitään (ks. Oma analytiikka). Lisäksi
          sivustolla käytetään kolmannen osapuolen palveluita, jotka voivat kerätä tietoa,
          kuten IP-osoitteita, selaintietoja, laitetietoja ja selauskäyttäytymistä.
          Sivustoa voi käyttää myös mainostenesto-ohjelmien tai muiden seurantaa estävien
          työkalujen kanssa.
        </p>

        <h2>Käsittelyn tarkoitukset ja oikeusperusteet</h2>
        <p>Henkilötietoja käsitellään seuraaviin tarkoituksiin:</p>
        <ul>
          <li>
            Mainosten näyttäminen ja kohdentaminen (Google AdSense): Oikeusperusteena
            suostumus (GDPR Art. 6(1)(a)).
          </li>
          <li>
            Sivuston käytön analysointi (sivuston oma analytiikka): Oikeusperusteena
            oikeutettu etu (GDPR Art. 6(1)(f)) sivuston kehittämiseksi.
          </li>
          <li>
            Sivuston toimittaminen ja suojaaminen (Vercel ja Cloudflare): Oikeusperusteena
            oikeutettu etu (GDPR Art. 6(1)(f)).
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

        <h2>Oma analytiikka</h2>
        <p>
          Sivustolla käytetään omaa kevyttä analytiikkaa sivuston käytön seuraamiseen. Kun
          avaat sivun, sivuston palvelin kirjaa sivupolun, aikaleiman, ulkoisen viittaavan
          sivun osoitteen ilman URL-parametreja (esimerkiksi google.com), mahdolliset
          UTM-kampanjaparametrit (utm_source, utm_medium, utm_campaign, utm_content ja
          utm_term), laitetyypin, selaimen ja käyttöjärjestelmän nimen sekä maan, jos
          sivuston palveluntarjoaja ilmoittaa sen pyynnön mukana. Samalla palvelin laskee
          IP-osoitteesta ja selaintunnisteesta kävijätiivisteen, jolla saman päivän
          käynnit voidaan laskea yhteen. Laskennassa käytetään satunnaista avainta, joka
          vaihtuu joka päivä ja poistetaan vuorokauden päätyttyä, joten samaa kävijää ei
          voi tunnistaa eri päivinä. IP-osoitetta ja selaintunnistetta ei tallenneta, eikä
          selaimeesi tallenneta tätä varten mitään. Kävijätiiviste on pseudonyymi tieto,
          ja sitä käsitellään henkilötietona.
        </p>
        <p>
          Jos selaimesi lähettää Do Not Track- tai Global Privacy Control -asetuksen,
          sivun avausta ei kirjata. Hakukoneiden ja muiden automaattisten ohjelmien
          pyyntöjä ei myöskään kirjata. Tiedot tallennetaan ylläpitäjän omalle
          palvelimelle, eikä niitä luovuteta eteenpäin. Raportointi tehdään sivu- ja
          päivätasolla.
        </p>

        <h2>Sivuston ylläpito</h2>
        <p>
          Sivusto toimii Vercelin palvelussa Cloudflaren välityksellä. Palvelut
          käsittelevät sivupyyntöjen yhteydessä teknisiä tietoja, kuten IP-osoitetta ja
          selaimen tietoja, jotta sivu voidaan toimittaa ja palvelu suojata
          väärinkäytöksiltä.
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
          palveluissa kuvatulla tavalla (Google, Vercel ja Cloudflare). Oman analytiikan
          tiedot pysyvät omassa hallinnassani. En luovuta tietoja muille osapuolille ilman
          suostumustasi.
        </p>

        <h2>Tietojen säilytysaika</h2>
        <p>
          Tietoja säilytetään vain niin kauan kuin on tarpeen edellä mainittuihin
          tarkoituksiin. Tarkemmat säilytysajat on kuvattu kunkin palvelun kohdalla. Kun
          tiedot eivät enää ole tarpeen, ne poistetaan tai anonymisoidaan.
        </p>
        <p>
          Oman analytiikan yksittäiset sivun avaukset säilytetään 25 kuukautta, minkä
          jälkeen niistä jää vain päiväkohtainen yhteenveto. Kävijätiivisteen päivittäinen
          avain poistetaan vuorokauden päätyttyä.
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
          joonas.niemenjoki(a)gmail.com. Vastaan pyyntöösi kuukauden kuluessa.
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
