---
title: 'Lämpöpumppujen liittäminen rakennusautomaatiojärjestelmään'
date: '9 March, 2024'
excerpt: 'Lämpöpumppuja voidaan liittää rakennusautomaatiojärjestelmään lukuisilla eri tavoilla. Tässä julkaisussa käyn läpi erilaisten vaihtoehtojen etuja ja haittoja sekä mitä niiden yhteydessä kannattaa huomioida.'
tags: 'Lämpöpumput,Tekniikka'
keywords: 'automaatio,energiatehokkuus,fysiikka,kompressori,kylmäaine,käyttövesi,lauhdutin,lvi,lämmitysjärjestelmät,lämmönsiirto,lämpöpumpun toiminta,lämpöpumput,ohjaus,rakennusautomaatio,suunnittelu,säätö,uusiutuva energia,vaihtoventtiili,ympäristöystävällisyys,ohjelmointi,kehitys'
language: 'fi'
---

Lämpöpumppuja voidaan liittää rakennusautomaatiojärjestelmään lukuisilla eri tavoilla. Tässä julkaisussa käyn läpi erilaisten vaihtoehtojen etuja ja haittoja sekä mitä niiden yhteydessä kannattaa huomioida.

Eri vaihtoehdot voidaan karkeasti jakaa kolmeen tyyppiin:

1. Lämpöpumpun sisäisen ohjelman käyttö
2. Ulkoisten asetusarvojen kirjoitus
3. Kokonaan ulkoinen ohjaus

## Lämpöpumpun sisäisen ohjelman käyttö

Kaikki lämpöpumput on varustettu sisäisellä logiikalla, jonka ohjelma pystyy ohjaamaan lämpöpumpun toimintaa täysin itsenäisesti ilman ulkoista ohjausta. Tällöin lämpöpumppujen käyttöönottaja asettelee lämpöpumpuille paikallisesti erilaisia asetusarvoja, rakennusautomaation näkökulmasta olennaisimpana käyttöveden vakioasetusarvon sekä lämmitysverkoston ulkolämpötilakäyrän, ja lämpöpumppujen logiikka ohjaa keruu- ja lauhdepuolen kiertopumppuja sekä kompressoreita niin, että varaajat pysyvät halutuissa lämpötiloissa.

<aside>
   <h3>Lämpöpumppujen toiminta</h3>
   <div> Olen kirjoittanut myös lämpöpumppujen sisäisen kylmäainepiirin toiminnasta. Jos lämpöpumppujen fysiikkaa kiinnostaa, julkaisu löytyy täältä: <a href="https://niemenjoki.fi/blogi/julkaisu/kuinka-lampopumput-toimivat">Kuinka lämpöpumput toimivat</a>
   </div>
</aside>

Tavallisesti pelkkää sisäistä ohjelmaa käyttäessä rakennusautomaatioon tuodaan väylän kautta olennaisimpia mittaus- ja tilatietoja sekä summahälytys.

Järjestelmän suunnittelijan ja automaatiourakoitsijan kannalta lämpöpumppujen sisäisen ohjelman käyttö on yksinkertaisin vaihtoehto. Yksinkertaisuudestaan huolimatta en suosittele tätä vaihtoehtoa, koska koko muun järjestelmän toiminta on tällöin ohjelmoitava palvelemaan lämpöpumppuja, vaikka niiden nimenomaan pitäisi palvella muuta lämmitysjärjestelmää.

Jo pelkkä asetusarvojen muuttaminen muuttuu hankalaksi, kun huoltomies joutuu mennä paikan päälle näpyttelemään asetusarvoja lämpöpumpun käyttöpäätteelle, eikä sekään aina ole yksiselitteistä, kun erilaisia aseteltavia arvoja on usein valtava määrä. Pahimmillaan vääriä asetuksia muuttamalla voi saada koko järjestelmän sekaisin ja usein lopputuloksena on, että lämpö ei riitä, energiaa kuluu hukkaan tai lämpöpumppujen käyttöikä lyhenee.

Lisäksi käyttöönottovaiheessa lämpöpumppujen asetukset asetellaan parhaillaankin käyttöönottajan arvion perusteella, eikä niitä usein saada aseteltua optimaalisiksi. Käyttöönottajan kokemustaso ja laitekohtaisten sisäisten toimintojen tuntemuksen merkitys korostuvat. Jos silti päädytään tähän vaihtoehtoon, on ehdottoman tärkeää, että järjestelmän käyttöönoton tekee joku nimenomaan kyseisen lämpöpumppumallin toiminnan syvällisesti tunteva henkilö. Todennäköisesti paras vaihtoehto on lämpöpumppuvalmistajan edustaja.

## Ulkoisten asetusarvojen kirjoitus

Toisena vaihtoehtona on kirjoittaa lämpöpumpuille väylän kautta erilaisia ohjaukseen vaikuttavia arvoja. Sisäinen ohjelma tekee tällöin edelleen päätökset siitä, milloin ja kuinka tehokkaasti lämpöä tuotetaan, mutta ohjaus perustuu rakennusautomaatiojärjestelmästä syötettyihin asetuksiin.

Tämä on usein hyvä vaihtoehto, koska lämpöpumput saadaan tuottamaan lämpöä muun lämmitysjärjestelmän tarpeen mukaan, mutta suunnittelijan tai automaatiourakoitsijan ei silti tarvitse ymmärtää kovinkaan tarkkaan, miten kompressoreita, kiertopumppuja ja vaihtoventtiileitä kannattaa ohjata. Lisäksi useamman lämpöpumpun järjestelmässä sisäinen ohjelma pystyy huolehtimaan lämpöpumppujen vuorottelusta, jolloin niille kertyy pitkällä aikavälillä suurin piirtein yhtä paljon kulutusta.

Suosittelen tätä vaihtoehtoa useimmissa tapauksissa ja erityisesti silloin, kun lämmitysjärjestelmälle ei olla suunniteltu pidempiaikaista seurantaa ja hienosäätöä käyttöönoton jälkeen sekä silloin, kun hankkeessa ei ole mukana henkilöitä, jotka ymmärtävät lämpöpumppujen toimintaa syvällisemmin.

## Kokonaan ulkoinen ohjaus

Vaikka asetusarvoja kirjoittamalla saadaan usein tehtyä järjestelmiä, jotka toimivat hyvin, niissä voi silti kohteesta riippuen olla varaa hienosäädölle, jota ei pelkkiä asetusarvoja kirjoittamalla välttämättä saada tehtyä. Niimpä joskus paras ratkaisu on ohjata lämpöpumppuja suoraan rakennusautomaatiosta. Lämpöpumppujen sisäinen ohjelma huolehtii silloin pelkästään oman kylmäainepiirinsä turvallisuuteen liittyvästä automaatiosta eli käytännössä siitä, että lämpöpumpun sisäiset lämpötilat ja paineet pysyvät turvallisissa rajoissa. Useimmiten sisäisen ohjelman ohjattavaksi jätetään myös keruu- ja lauhdepumppujen ohjaus, mutta kompressorien käynnistyminen tapahtuu suoraan rakennusautomaatiojärjestelmän ohjaamana.

Asetusarvo-ohjaus perustuu yleensä pelkkiin yksittäisiin mittauksiin, esimerkiksi käyttövesi- ja lämmitysvesivaraajien lämpötilaan. Ulkoisen ohjauksen etuna on se, että kaikki lämmitysjärjestelmästä löytyvä tieto on hyödynnettävissä lämpöpumppujen ohjauksessa ja mahdollisuudet erilaisille ohjaustavoille ovat rajattomat. Toinen etu on se, että kaikkia lämpöpumppujen ohjaukseen liittyviä toimintoja voidaan hallita yhden käyttöliittymän kautta sen sijaan, että osa asetuksista pitäisi näpytellä lämpöpumpun käyttöpäätteen kautta.

Lämpöpumppujen kompressorien käynnistäminen aiheuttaa aina virtapiikkejä, jotka kuluttavat niitä ja liian usein toistuva käynnistyminen lyhentää niiden käyttöikää. Näin ollen kompressorien ohjaus on suunniteltava siten, että kompressorit käynnistyvät mahdollisimman harvoin. Samalla on kuitenkin pidettävä huolta, että verkostoissa on aina sopivasti lämpöä; Lämpöä pitää tietenkin olla aina tarpeeksi rakennuksen tarpeisiin, mutta toisaalta liika lämmittäminen lisää lämpöhäviöitä eli energiaa menee hukkaan. Sopivan tasapainon löytäminen näiden reunaehtojen sisällä vaatii suunnittelijalta että käyttöönottajalta paljon ammattitaitoa. Lisäksi on pidän tärkeänä, että erityisesti tällä tavoin tehtyä järjestelmää seurataan ja hienosäädetään aktiivisesti vielä jonkin aikaa käyttöönoton jälkeen.

Ammattitaitoisen suunnittelijan ja käyttöönottajan lisäksi ulkoisen ohjauksen toteutukseen tarvitaan myös vaativampaan ohjelmointiin kykenevä automaatiourakoitsija. Erityisesti lämpöpumppujen, lämmitettävien verkostojen ja vaihtoventtiilien määrän kasvaessa ohjelmointi muuttuu haastavaksi.

On huomioitava, mikä lämpöpumppu voi lämmittää mitäkin verkostoa, pidettävä huolta vaihtoventtiilien kääntymisestä oikeaan suuntaan, järjesteltävä lämpöpumput verkostokohtaisesti käyntiajan mukaiseen käynnistysjärjestykseen ottaen huomioon mahdolliset vikatilanteet, joiden aikana osaa lämpöpumpuista ei saada käynnistettyä ja samalla pitää huolehtia siitä, ettei kompressorit pysähdy turhaan esimerkiksi muutamaksi sekunniksi silloin, kun yhtä verkostoa palvellut lämpöpumppu käännetään vaihtoventtiilin avulla palvelemaan toista verkostoa.

Lämpöpumppuja voidaan ohjata monella tavalla ja eri vaihtoehdot tuovat mukanaan on erilaisia etuja ja haittoja, joita ohjaustavasta päättävien henkilöiden pitää arvioida kohdekohtaisesti. Kehotan kuitenkin välttämään pelkän lämpöpumpun sisäisen ohjelman käyttöä ja tuomaan vähintään osan lämpöpumppujen ohjauslogiikasta rakennusautomaatiojärjestelmän perään.
