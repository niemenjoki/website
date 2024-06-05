---
title: 'Kuinka lämpöpumput toimivat?'
date: '26 February, 2024'
excerpt: 'Lämpöpumpuista puhutaan nykypäivänä paljon ja uusia lämpöpumppuja asentavia yrityksiä ilmestyy koko ajan lisää. Suuri osa meistä on varmaan jo ymmärtänyt, että ne ovat taloudellinen ja ympäristöystävällinen lämmitysmuoto. Oletko kuitenkaan koskaan miettinyt, mikä lämpöpumpuista tekee niin ympäristöystävällisiä ja miten ne ylipäätään toimivat käytännössä? Tässä julkaisussa teen parhaani selittääkseni lämpöpumppujen toiminnan mahdollisimman helposti ymmärrettävällä tavalla.'
tags: 'Lämpöpumput,MaallikonKielellä,Fysiikka,Tekniikka'
keywords: 'lämpöpumput, rakennusautomaatio, lämmitysjärjestelmät, energiatehokkuus, ympäristöystävällisyys, fysiikka, lämmönsiirto, kylmäaine, kompressori, lauhdutin, höyrystin, paisuntaventtiili, lvi, uusiutuva energia, kestävä kehitys, ympäristövaikutukset,lämpöpumpun toiminta,energiatehokkuus'
language: 'fi'
i18n: 'https://niemenjoki.fi/blog/post/how-heatpumps-work'
---

Lämpöpumpuista puhutaan nykypäivänä paljon ja uusia lämpöpumppuja asentavia yrityksiä ilmestyy koko ajan lisää. Suuri osa meistä on varmaan jo kuullut, että ne ovat taloudellinen ja ympäristöystävällinen lämmitysmuoto. Oletko kuitenkaan koskaan miettinyt, mikä lämpöpumpuista tekee niin ympäristöystävällisiä ja miten ne ylipäätään toimivat käytännössä? Tässä julkaisussa teen parhaani selittääkseni lämpöpumppujen toiminnan mahdollisimman helposti ymmärrettävällä tavalla.

## Lämpöpumppuihin liittyvä fysiikka

Ymmärtääksemme lämpöpumppujen toimintaa, on ensin ymmärrettävä hieman fysiikkaa. Älä säikähdä, yhtään laskukaavaa ei tarvitse osata. Riittää, että ymmärtää muutaman fysiikan periaatteen. Voit toki halutessasi syventyä lämpöpumppujen fysiikkaan tarkemminkin, esimerkiksi julkaisun alareunasta löytyvien linkkien avulla.

1. **Kaasun painen, tilavuus ja lämpötila riippuvat toisistaan**
   - a) Paineen pysyessä vakiona, tilavuus ja lämpötila ovat suoraan verrannollisia eli tilavuuden kasvaessa lämpötila kasvaa ja sama toisin päin ([Gay-Lussacin laki [1]](#viittaukset)).
   - b) Tilavuuden pysyessa vakiona, paine ja lämpötila ovat suoraan verrannollisia eli paineen kasvaessa lämpötila kasvaa ja sama toisin päin([Charlesin laki [2]](#viittaukset)).
   - c) Lämpötilan pysyessä vakiona, tilavuus ja lämpötila ovat kääntäen verrannollisia eli tilavuuden kasvaessa paine pienenee ja sama toisin päin ([Boylen laki [3]](#viittaukset)).
2. **Aineen olomuodon muutokset sitovat tai vapauttavat energiaa ([Olomuodon muutokset [4]](#viittaukset)).**
   - a) Sulaminen ja höyrystyminen sitovat energiaa ympäristöstään. Arkielämässä tämän ilmiön voi huomata esimerkiksi siitä, että suihkun jälkeen iholta höyrystyvä vesi jäähdyttää ihon pintaa.
   - b) Jähmettyminen ja tiivistyminen vapauttavat energiaa ympäristöönsä. Tätä on hankalampi huomata arkielämässä, mutta se kuitenkin pitää paikkansa.
3. **Energiaa ei voi luoda eikä kadottaa. Sitä voi vain muuttaa toiseen muotoon ([Energian säilymislaki [4]](#viittaukset)).**

Viittaan näihin asioihin myöhemmin tekstissä.

## Lämpöpumppujen energiatehokkuus

Esimerkiksi öljylämmityksessä öljyn kemiallinen energia ja sähkölämmityksessä sähköenergia muuttuvat suoraan lämpöenergiaksi. Koska energiaa ei voida luoda tyhjästä (ks. kohta 3), tavanomaisilla lämmitysmenetelmillä ei voida koskaan saavuttaa yli 100 % hyötysuhdetta. Todellisuudessa lämpöä menee aina myös vähän hukkaan, joten hyötysuhde on yleensä noin 80-99 %. Myös kaukolämpö tuotetaan pääasiassa polttamalla maakaasua, kivihiiltä, turvetta ja puuta, joten senkään hyötysuhde ei voi ylittää 100 % rajaa, vaikka se muuten onkin hyvä lämmitysmuoto.

<aside>
   <h3>Hyötysuhde</h3>
   <div>
      Hyötysuhde on luku, joka kertoo, miten paljon käytetystä energiasta saadaan hyödynnettyä halutulla tavalla. Jos esimerkiksi käytämme 5 kWh sähköä ja saamme tuotettua 1 kWh edestä valoa, lampun hyötysuhde on 1 / 5 eli 20 %. Toisin sanoen, hukkaamme 80 % käytetystä energiasta johonkin, lampun tapauksessa lampun lämpenemiseen.
   </div>
</aside>

Lämpöpumppu sen sijaan siirtää jo olemassa olevaa lämpöä paikasta toiseen esimerkiksi ulkoilmasta tai maaperästä rakennuksen lämmitysjärjestelmään. Olemassa olevan lämmön siirtämisen etuna on se, että voimme käyttää pienen määrän energiaa suuremman energiamäärän siirtämiseen paikasta toiseen. Yleensä lämpöpumpun hyötysuhde on noin 200-500 % eli lämpönä saadaan hyödynnettyä 2 - 5 kilowattituntia energiaa jokaista käytettyä kilowattituntia kohden.

## Lämpöpumppujen toiminta

Myös aineissa, joiden lämpötilan koemme arkielämässämme kylmiksi, on varastoitunutta lämpöenergiaa. Lämpöpumpuissa käytetään kylmäaineita, joiden ominaisuudet ovat sellaisia, että niiden olomuotoa on suhteellisen helppo muuttaa nesteestä kaasuksi ja takaisin niissä lämpötiloissa, joissa lämpöpumppua on tarkoitus käyttää. Käytettyjen kylmäaineiden kiehumispisteet riippuvat paineesta, jolloin niiden höyrystymistä ja tiivistymistä voidaan hallita altistamalla niitä erilaisille paineille eri vaiheissa lämpöpumpun prosessia.

<picture>
  <source srcset="/images/posts/kuinka-lampopumput-toimivat/lampopumppu_toimintakaavio.webp" type="image/webp" />
  <source srcset="/images/posts/kuinka-lampopumput-toimivat/lampopumppu_toimintakaavio.jpg" type="image/jpeg" />
  <img src="/images/posts/kuinka-lampopumput-toimivat/lampopumppu_toimintakaavio.jpg" alt="Lämpöpumpun toimintakaavio" style="max-width: calc(100vw - 4em)" loading="lazy"/>
</picture>

<sup>Kuva 1: Lämpöpumpun toimintakaavio. &copy; Joonas Niemenjoki 2024 [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.fi)</sup>

Lämpöpumput voivat käyttää lämmönlähteenään lähes mitä tahansa, tyypillisesti maaperään, ilmaan tai vesistöön varastoitunutta lämpöä. Jos lämmönlähteenä on ilma, sitä puhalletaan lämpöpumpun höyrystimen läpi ja muissa tapauksissa lämpö kerätään yleensä lämmönkeruunesteeseen, jota myös kierrätetään höyrystimen läpi.

Höyrystimen läpi kuljetettu ilma tai lämmönkeruuneste luovuttaa lämpöä höyrystimen kierukassa kulkevalle kylmälle nestemäiselle kylmäaineelle ja saa sen kiehumaan eli muuttumaan kaasumaiseksi (ks. 2 a).

Tämän jälkeen kompressori puristaa kaasumaista kylmäainetta, jolloin se lämpenee voimakkaasti (ks. 1b).

Seuraavaksi erittäin kuuma kaasumainen kylmäaine virtaa lauhdutinkierukan läpi. Lauhduttimen läpi puhalletaan rakennuksen sisäilmaa tai kierrätetään lämmitysjärjestelmän lämmitysvettä, jolloin kylmäaine tiivistyy ja luovuttaa lämpöä rakennukseen (ks. 2b), Kylmäaine on siis lämmennyt kompressorin paineen vaikutuksesta niin kuumaksi, että se on sisäilmaa tai lämmitysjärjestelmän nestettä kuumempaa ja näin ollen luonnostaan luovuttaa lämpönsä lämmitettävään kohteeseen.

Lauhduttimesta kylmäaine kulkee paisuntaventtiilille, jossa sen paine laskee huomattavasti, mikä saa sen jäähtymään (ks. 1b).

Jäähdytetty kylmäaine kulkee edelleen höyrystimeen keräämään lämpöä ja kierto alkaa uudestaan.

Vaikka lämpöpumppujen fysiikkaa ymmärtää, tuntuu joskus lähes uskomattomalta, että voimme pumpata maaperästä esimerkiksi 6 asteista lämmönkeruunestettä lämpöpumpulle ja palauttaa sen takaisin maaperään 2 asteisena ja pelkästään tuon lämpötilamuutoksen avulla voimme lämmittää kokonaisia rakennuksia! Kyse ei kuitenkaan ole taikuudesta vaan jonkun keksimästä älykkäästä tekniikasta. Lämpöpumppujen avulla voimme todella hyödyntää luonnonvaroja älykkäästi ja kestävästi lämmityksen tarpeisiimme.

## Viittaukset

1. [Gay-Lussacin laki - Wikipedia](https://fi.wikipedia.org/wiki/Gay-Lussacin_laki)
2. [Charlesin laki - Wikipedia](https://fi.wikipedia.org/wiki/Charlesin_laki)
3. [Boylen laki - Wikipedia](https://fi.wikipedia.org/wiki/Boylen_laki)
4. [Olomuodon muutokset - Omaan tahtiin fysiikka (Eiran aikuislukio)](https://fysiikka.omaantahtiin.com/etusivu/fysiikka-2/olomuodon-muutokset)
5. [Energian säilymislaki - Wikipedia](https://fi.wikipedia.org/wiki/Energian_s%C3%A4ilymislaki)
