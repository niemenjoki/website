PROGRAM MLP1_1
VAR
	iKeruuohjaus1	: INT;
	iKeruuohjaus2	: INT;
	iKeruupumppu	: INT;
	
	iTemp			: INT;
	fbOilonRE		: FB_Oilon_RE;
END_VAR
(* 
FB_Oilon_RE
Fidelix / Jokinen
14.3.2022

Modbus-laitteet:
HOLDING Start: 10240 Count: 2
HOLDING Start: 11264 Count: 1
HOLDING Start: 11280 Count: 1
HOLDING Start: 11282 Count: 13
HOLDING Start: 11290 Count: 1
HOLDING Start: 17410 Count: 1
HOLDING Start: 17419 Count: 1
HOLDING Start: 17429 Count: 1
HOLDING Start: 18432 Count: 5
HOLDING Start: 20480 Count: 17
HOLDING Start: 20547 Count: 1
HOLDING Start: 20505 Count: 3
HOLDING Start: 20556 Count: 1
HOLDING Start: 20834 Count: 15
HOLDING Start: 20871 Count: 7
HOLDING Start: 34854 Count: 3
HOLDING Start: 35851 Count: 1
HOLDING Start: 35887 Count: 1
HOLDING Start: 38420 Count: 1
HOLDING Start: 39040 Count: 1
HOLDING Start: 42016 Count: 2
HOLDING Start: 42056 Count: 1
*)


fbOilonRE(
iPort 			:= 0,
iAddress 		:= 11,

sModuleError 	:= 'SLTMI_MLP1-1_MODBUS_FH', (* Väylävikahälytys *)

(* Lämpöpumpusta riippuen kirjoitettavat arvot ********************************************************************************)
sHoldreg_10240 	:= '',								(* Käyttövesi päälle/pois. MASTER, JOLLA VAIHTOVENTTIILI *)
sHoldreg_10241 	:= 'SLTMI_TE_B3-1_C', 				(* Käyttövesivaraajan asetusarvo. KV MASTER *)
sHoldreg_11280	:= '', 								(* Käyttöveden maksimilatausaika 10-600 min. KV MASTER *)
sHoldreg_11290 	:= 'SLTMI_MLP1-1_KV_KOROTUS_FM:1', 	(* Korotus käyttöveden latauksessa. KV MASTER *)
sHoldreg_11294 	:= 'SLTMI_MLP1-1_KV_KYTKERO_FM:1', 	(* Käyttöveden kytkentäero. KV MASTER *)
sHoldreg_17419	:= '', 								(* Kompressorin käynnistyksen eroalue. LV MASTER *)
sHoldreg_17429	:= '', 								(* Kompressorin pysäytyksen eroalue. LV MASTER *)
sHoldreg_34854 	:= '', 								(* Lämmityssäädön asteminuutit ylöspäin (C°min) LV MASTER *)
sHoldreg_34855 	:= '', 								(* Lämmityssäädön asteminuutit alaspäin (C°min) LV MASTER *)
sHoldreg_34856 	:= '', 								(* Lämmityssäädön portaan viive (min) LV MASTER *)
sHoldreg_42016 	:= '',								(* Lämmitysverkoston asetusarvo. LV MASTER *)

(* Kaikille lämpöpumpuille kirjoitettavat arvot ********************************************************************************)
sHoldreg_11282 	:= 'SLTMI_MLP1-1_HATA_FO', 		(* Pumpun hätäkäyttö. MASTER+SLAVE *)
sHoldreg_20547 	:= 'SLTMI_MLP1-1_HALYKUITT_FO', (* Hälytysten kuittaus MASTER+SLAVE *)
sHoldreg_42056 	:= 'SLTMI_MLP1-1_PAKKO_FO', 	(* Pakkokäynnistys (0=Auto, 1=Pois, 2=Käy) MASTER+SLAVE *)

(* Lämpöpumpusta riippuen luettavat ********************************************************************************************)
sHoldreg_11264 	:= 'SLTMI_TE_B3-1_FM', 	(* Käyttövesivaraajan lämpötila TEB3. KV MASTER *)
sHoldreg_17410 	:= '', 					(* Lämmitysverkoston varaajan lämpötila TEB4. LV MASTER *)
sHoldreg_18432 	:= '',					(* Lämmitysverkoston käytössä oleva asetusarvo. LV MASTER *)
sHoldreg_18436 	:= '',					(* Lämmitysverkoston menoveden lämpötila TEB10. LV MASTER *)
sHoldreg_35851 	:= '',  				(* Ulkolämpötila. MASTER, JOHON ULKOANTURI ON KYTKETTY (tarvittaessa) *)
sHoldreg_38420 	:= '', 					(* Vaihtoventtiilin tilatieto VV01. MASTER, JOLLA VAIHTOVENTTIILI *)

(* Kaikilta lämpöpumpuilta luettavat arvot *************************************************************************************)
sHoldreg_20480 	:= 'SLTMI_MLP1-1_TE_B71A_FM', 	(* Lauhduttimelle palaavan nesteen lämpötila TEB71. MASTER+SLAVE *)
sHoldreg_20484 	:= 'SLTMI_MLP1-1_TE_B21A_FM', 	(* Lauhduttimelta lähtevän nesteen lämpötila TEB21. MASTER+SLAVE *)
sHoldreg_20492 	:= 'SLTMI_MLP1-1_LEPOAIKA_FM', 	(* Kompressorin lepoaikaa jäljellä (min). MASTER+SLAVE *)
sHoldreg_20496 	:= 'SLTMI_MLP1-1_KAYNTAIKA_FM', (* Kompressorin minimikÃ¤yntiaikaa jäljellä. MASTER+SLAVE *)
sHoldreg_20505 	:= 'SLTMI_MLP1-1_KAYTTOT_FM', 	(* Kompressorin käyttötunnit, 32-bit. MASTER+SLAVE *)
sHoldreg_20507 	:= 'SLTMI_MLP1-1_KAYNN_FI', 	(* Kompressorin käynnistysten lukumäärä 32-bit. MASTER+SLAVE *)
sHoldreg_20556 	:= 'SLTMI_MLP1-1_TILA_FI', 		(* Lämpöpumpun tilakoodi. MASTER+SLAVE *)
sHoldreg_20834 	:= 'SLTMI_MLP1-1_KOMP_FI', 		(* Kompressorin tilatieto. MASTER+SLAVE *)
sHoldreg_20842 	:= 'SLTMI_MLP1-1_KERUU_FI', 	(* Liuospumpun ohjaustieto. MASTER+SLAVE *)
sHoldreg_20846 	:= 'SLTMI_PU11_MLP_FI',			(* Latauspumpun ohjaustieto. MASTER+SLAVE *)
sHoldreg_20848 	:= 'SLTMI_PU11_MLP_FM', 		(* Latauspumpun säätonopeus (%). MASTER+SLAVE *)
sHoldreg_20871 	:= 'SLTMI_MLP1-1_TE_B91A_FM', 	(* Höyrystimelle palaavan nesteen lämpötila TEB91. MASTER+SLAVE *)
sHoldreg_20877 	:= 'SLTMI_MLP1-1_TE_B92A_FM', 	(* Höyrystimeltä lähtevän nesteen lämpötila TEB92. MASTER+SLAVE *)
sHoldreg_35887 	:= 'SLTMI_MLP1-1_FH', 			(* Hälytys. MASTER+SLAVE *)
sHoldreg_39040 	:= 'SLTMI_MLP1-1_HKOODI_FI' 	(* Hälytyskoodi. MASTER+SLAVE *)
);

(* Kumpi tahansa samassa tornissa olevista kompressoreista voi käynnistää keruupumpun *)
iKeruuohjaus1 := getDigitalPointF('SLTMI_MLP1-1_KERUU_FI');
iKeruuohjaus2 := getDigitalPointF('SLTMI_MLP2-1_KERUU_FI');
iKeruupumppu  := BOOL_TO_INT((iKeruuohjaus1 = 1) OR (iKeruuohjaus2 = 1));

(* Sulkuventtiili kytketty pumpun kanssa samaan liittimeen *)
iTemp := setDigitalPointF(iKeruupumppu, 1, 'SLTMI_PU1_MLP_FI');
iTemp := setDigitalPointF(iKeruupumppu, 1, 'SLTMI_TV1_MLP_FI');

END_PROGRAM