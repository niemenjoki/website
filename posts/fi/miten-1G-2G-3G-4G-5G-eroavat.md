---
title: 'Miten eri verkkoteknologiat kuten 4G ja 5G eroavat toisistaan?'
date: '1 October, 2022'
excerpt: 'Yhä uudempia verkkoteknologioita jatkuvasti kehitetään ja otetaan käyttöön. Mitä eroa niiden välillä oikeastaan on ja onko uusille tekniikoille oikeasti tarvetta?'
tags: 'MaallikonKielellä,Infrastruktuuri'
keywords: 'MTA,Ruotsi,1G,Hz,taajuus,modulaatio,am,fm,kaistanleveys,radio,kommunikatio,teksti,viesti,internet,asioiden,data,langaton,4G,5G'
language: 'fi'
i18n: 'https://niemenjoki.fi/blog/post/how-cellular-networks-like-5g-4g-are-different'
---

## Analoginen verkko ja puhelut (0G-1G)

Ensimmäinen matkapuhelinverkko (MTA, Mobiltelefonisystem A) otettiin käyttöön Ruotsissa vuonna 1956. Puhelimet olivat niin suuria ja painavia, että käytännössä niitä asennettiin vain autoihin. Radiomastot kuitenkin kommunikoivat jo silloin langattomasti autopuhelinten kanssa. Vaikka verkko mahdollisti liikkumisen radiomaston kantaman alueella, yhteys katkesi aina, jos piti yhdistää toiseen radiomastoon. Verkolla oli noin 125 käyttäjää Tukholman ja Göteborgin alueella.

Myös Norjassa otettiin vuonna 1966 käyttöön oma verkko (OLT, Offentlig Landmobil Telefoni) samoin kuin Suomessa vuonna 1971 (ARP, autoradiopuhelin).

Ensimmäisen sukupolven matkapuhelinverkot (1G) välittivät ääntä analogisena viestinä moduloidun kantoaallon avulla. Jos halutaan esimerkiksi lähettää yksinkertainen 100 Hz ääniaalto, se voidaan yhdistää huomattavasti korkeataajuisempaan, 850 MHz kantoaaltoon. Yhdistäminen tapahtuu amplitudimodulaation (AM) tai taajuusmodulaation (FM) avulla.

Amplitudimodulaatiossa muutetaan kantoaallon aplitudia lähetettävän datan perusteella. Taajuusmodulaatiossa amplitudi pysyy kokoajan samana, mutta lähetettävän datan perusteella muutetaankin kantoaallon taajuutta.

<img src="/images/posts/how-cellular-networks-like-5g-4g-are-different/AM_FM.gif" alt="Animaatio amplitudi- ja taajuusmodulaation eroista" />

Puheluiden välittäminen kyseisellä tekniikalla vaatii tarkan taajuusalueen, joka määrittyy matalimman ja korkeimman käytetyn taajuuden mukaan. Jos joku käyttäjä puhuu puhelimessa jollain taajuusalueella, muiden on käytettävä eri taajuusaluetta. Muuten puhelut aiheuttavat toisilleen häiriöitä. Mitä enemmän taajuuksia tietyllä puhelinmastolla on käytössä, sitä useampi henkilö voi puhua puhelimessa samaan aikaan. Tätä kutsutaan kaistanleveydeksi (bandwidth).

Käyttäjämäärien lisääntyessä verkko on jatkuvalla koetuksella. Uusien taajuusalueiden lisääminen kaistanleveyden kasvattamiseksi on yksi vaihtoehto, mutta siihen liittyy ongelmansa. Radio- ja TV-kanavat, armeijan järjestelmät, GPS ja monet muut järjestelmät kukin tarvitsevat oman taajuusalueensa minkä vuoksi uusien taajuusalueiden varaaminen puhelinverkon käyttöön voi maksaa operaattorille tähtitieteellisiä summia. Näin on silti tehty jokaisessa verkon kehitysvaiheessa.

Vuosien saatossa on kuitenkin tehty myös paljon töitä sen eteen, että kullakin taajuusalueella voitaisiin välittää mahdollisimman paljon dataa. Yksinkertaisimmillaan tämä voi tarkoittaa esimerkiksi useamman puhelinmaston rakentamista. Sen sijaan, että käytettäisin yhtä tehokasta mastoa kokonaisten kaupunkien alueella, voidaankin käyttää useita vähemmän tehokkaita mastoja. Tällöin eri puolilla kaupunkia liikkuville käyttäjille voidaan varata samoja taajuusalueita, koska matalampitehoisten mastojen signaalit eivät kanna tarpeeksi pitkälle aiheuttaaksen häiriöitä.

Käyttäjämäärää saatiin siis kasvatettua, mutta datasiirron nopeus pysyi silti alhaisena. Parhaimmillaan 1G-verkot pystyivät siirtämään dataa 2,4 kbps nopeudella.

## Digitaalinen verkko ja tekstiviestit (2G)

Lopulta kehitettiin 2G-verkko, joka hyödynsi täysin digitaalista järjestelmää ja laittoi käyntiin varsinaisen matkapuhelinten aikakauden. Jos olet ikäiseni tai vanhempi, ensikosketuksesi matkapuhelimiin sijoittuu todennäköisesti juuri 2G-aikaan. Ensimmäinen puhelimeni oli upea Nokia 5110. Sillä pystyi toki soittamaan, mutta digitaalinen 2G-verkko mahdollisti myös täysin uudenlaisen kommunikaatiotavan, tekstiviestit.

<img src="/images/posts/how-cellular-networks-like-5g-4g-are-different/nokia_5110.jpg" alt="Nokia 5110 matkapuhelin" />

Kun 2G julkaistiin, se pystyi saavuttamaan noin 9.6 kbps nopeuden ja teksiviestien lähettäminen onnistui sujuvasti. Ennen 3G verkon julkaisua sen nopeutta oltiin kuitenkin saatu nostettua ja se oli jo 200 kbps. Tämä onnistui uuden teknologian, GPRS:n (General Packet Radio Switching) avulla, jota usein kutsutaan nimellä 2.5G.

## Langaton internet (3G)

Kun Apple julkaisi toisen iPhone-mallinsa, 3G teki jo kovaa vauhtia tuloaan. Se hyödynsi jälleen uusia taajuusalueita. On arvioitu, että Eurooppalaiset operaattorit maksoivat tuona aikana yhteensä yli 100 miljardia euroa saadakseen uusia taajuuksia käytöönsä.

Lisäksi 3G hyödynsi erittäin tehokkaasti pakettikytkentäteknologiaa, jota GPRS aiemmin oli hyödyntänyt. Sen avulla tuhannet käyttäjät pystyivät käyttämään samoja taajuusalueita huomattavasti tehokkaammin, kun data jaettiin pieniin datapaketteihin, jotka voitiin lähettää eri taajuusalueiden kautta pienissä osissa vastaanottajalle. Sen sijaan, että olisi pitänyt odottaa taajuusalueen täyttä vapautumista, nyt pystyttiin lähettämään pieniä osia datasta aina kun jollain taajuusalueella oli vähänkään vapaata. Tämä mahdollisti suuremmaat tiedonsiirtonopeudet ja useamman yhtäaikaisen käyttäjän.

Vuonna 2005 julkaistiin jälleen uusi teknologia, HSPA (High Speed Packet Access), jonka käytöstä kuvaavan H+ merkin olet todennäköisesti nähnyt omassa puhelimessasikin. Tekniikkaa kutsutaan usein 3.5G:ksi ja se mahdollisti jo 42 Mbps (42 000 kbps) nopeuden.

## Korkealaatuinen suoratoisto (4G)

4G:n mukana tuli jälleen uusi teknologia, LTE (Long Term Evolution), joka hyödynsi uusia, aiemmin analogisille TV-lähetyksille varattuja 700 MHz taajuuksia. Lisäksi otettiin käyttöön uusi tegnologia OFDM (Orthogonal Frequency Division Multiplexing), jonka avulla voidaan lähettää entistä enemmän dataa yhdellä taajuusalueella jonkin sortin monimutkaisen taikuuden (matematiikan) avulla.

Jos oikein miettii, on melko käsittämätöntä, että ylipäätään pystymme striimaamaan HD-videoita puhelimella ilman yhtäkään johtoa. Silti videoiden laatua halutaan parantaa entisestään ja pikkuhiljaa enemmän ja enemmän laitteita televisioista jääkaappeihin ja itseohjautuvista robottiajoneuvoista teollisuusautomaatioon kytketään osaksi langatonta verkkoa, eikä nykyinenkään järjestelmä enää meinaa riittää. Operaattorit joutuvat nyt turvautumaan taajuusalueisiin, joita kukaan ei halua käyttää: korkeataajuiset millimetriaallot.

## Esineiden internet (5G)

Kukaan ei ole aiemmin halunnut käyttää korkeita taajuuksia puhelinverkkojen yhteydessä, koska ne ovat huonoja läpäisemään juuri mitään esteitä, mukaan lukien esimerkiksi sadetta. Tämän vuoksi operaattoreiden on asennettava valtava määrä uusia mastoja, mistä moni kuluttaja pelästyy.

Mastojen lisääminen auttaa taajuusalueiden ruuhkautumisessa, mutta lisäksin 5G hyödyntää uutta massive MIMO teknologiaa, joka mahdollistaa signaalin lähetyksen pelkästään kunkin käyttäjän suuntaan valokeilojen tapaan sen sijaan, että sitä lähetettäisiin joka suuntaan. 5G:n avulla pystytään saavuttamaan jopa 1000 Mbps (1000000kbps) nopeus..

5G parantaa nettiyhteyksien nopeutta ja vähentää yhteyksien ruuhkautumista. Tämä on välttämätöntä monille uusille teknologioioille kuten itseohjautuville autoille ja esineiden internetille.

## Lopuksi: 5G ei ole vaarallista

Elektromagneettisen säteilyn ääripäässä on gammasäteily, jolla on valtava taajuus. Suurempi taajuus tarkoittaa suurempaa energiamäärää ja gammasäteily tosiaan tutkitusti aiheuttaa syöpää. Myös hieman matalataajuisempi säteily voi aiheuttaa syöpää, jos se on ionisoivaa eli riittävän voimakasenergistä, että se irrottaa elektroneja soluistamme.

5G:n taajuus ei ole lähelläkään ionisoivan säteilyn rajaa, vaan huomattavasti matalampi. Sen taajuus on itseasiassa matalampi kuin tavallisen näkyvän valon. Jos siis pelkäät 5G:tä, kannattanee jatkossa varoa myös kotisi kattolamppuja, koska niiden säteily on 5G:täkin korkeataajuisempaa!
