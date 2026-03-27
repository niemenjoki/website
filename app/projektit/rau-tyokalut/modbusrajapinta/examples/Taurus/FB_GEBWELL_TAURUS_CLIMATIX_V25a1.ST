FUNCTION_BLOCK FB_GEBWELL_TAURUS_CLIMATIX_V25a1
VAR_EXTERNAL

END_VAR

VAR_INPUT
	iPort 	: INT;
	iModule	: INT;
	Comm_Alarm : STRING(30);
	sHalytys   : STRING(30);
	sAlarmCode : STRING(30);
	reg_0x0101 : STRING(30);
	reg_1x0101 : STRING(30);
	reg_1x0102 : STRING(30);
	reg_1x0191 : STRING(30);
	reg_1x0192 : STRING(30);
	reg_1x0193 : STRING(30);
	reg_1x0194 : STRING(30);
	reg_1x0196 : STRING(30);
	reg_1x0197 : STRING(30);
	reg_1x0198 : STRING(30);
	reg_1x0201 : STRING(30);
	reg_1x0202 : STRING(30);
	reg_1x0204 : STRING(30);
	reg_1x0301 : STRING(30);
	reg_1x0302 : STRING(30);
	reg_1x0303 : STRING(30);
	reg_1x0304 : STRING(30);
	reg_1x0305 : STRING(30);
	reg_1x0306 : STRING(30);
	reg_1x0307 : STRING(30);
	reg_1x0310 : STRING(30);
	reg_1x0311 : STRING(30);
	reg_1x0314 : STRING(30);
	reg_1x0315 : STRING(30);
	reg_1x0316 : STRING(30);
	reg_1x0321 : STRING(30);
	reg_1x0322 : STRING(30);
	reg_1x0323 : STRING(30);
	reg_1x0324 : STRING(30);
	reg_1x0325 : STRING(30);
	reg_1x0326 : STRING(30);
	reg_1x0327 : STRING(30);
	reg_1x0328 : STRING(30);
	reg_1x0329 : STRING(30);
	reg_1x0330 : STRING(30);
	reg_1x0331 : STRING(30);
	reg_1x0332 : STRING(30);
	reg_1x0333 : STRING(30);
	reg_1x0334 : STRING(30);
	reg_1x0335 : STRING(30);
	reg_1x0336 : STRING(30);
	reg_1x0337 : STRING(30);
	reg_1x0604 : STRING(30);
	reg_1x0701 : STRING(30);
	reg_1x0702 : STRING(30);
	reg_1x0703 : STRING(30);
	reg_1x0704 : STRING(30);
	reg_1x0708 : STRING(30);
	reg_1x0709 : STRING(30);
	reg_1x0801 : STRING(30);
	reg_1x0805 : STRING(30);
	reg_1x0901 : STRING(30);
	reg_1x0902 : STRING(30);
	reg_1x0903 : STRING(30);
	reg_1x0904 : STRING(30);
	reg_1x0905 : STRING(30);
	reg_1x1004 : STRING(30);
	reg_3x0101 : STRING(30);
	reg_3x0102 : STRING(30);
	reg_3x0104 : STRING(30);
	reg_3x0106 : STRING(30);
	reg_3x0108 : STRING(30);
	reg_3x0109 : STRING(30);
	reg_3x0110 : STRING(30);
	reg_3x0111 : STRING(30);
	reg_3x0112 : STRING(30);
	reg_3x0113 : STRING(30);
	reg_3x0114 : STRING(30);
	reg_3x0115 : STRING(30);
	reg_3x0116 : STRING(30);
	reg_3x0117 : STRING(30);
	reg_3x0118 : STRING(30);
	reg_3x0119 : STRING(30);
	reg_3x0199 : STRING(30);
	reg_3x0201 : STRING(30);
	reg_3x0202 : STRING(30);
	reg_3x0203 : STRING(30);
	reg_3x0204 : STRING(30);
	reg_3x0205 : STRING(30);
	reg_3x0206 : STRING(30);
	reg_3x0208 : STRING(30);
	reg_3x0210 : STRING(30);
	reg_3x0212 : STRING(30);
	reg_3x0213 : STRING(30);
	reg_3x0214 : STRING(30);
	reg_3x0215 : STRING(30);
	reg_3x0301 : STRING(30);
	reg_3x0302 : STRING(30);
	reg_3x0303 : STRING(30);
	reg_3x0304 : STRING(30);
	reg_3x0305 : STRING(30);
	reg_3x0306 : STRING(30);
	reg_3x0307 : STRING(30);
	reg_3x0308 : STRING(30);
	reg_3x0309 : STRING(30);
	reg_3x0310 : STRING(30);
	reg_3x0311 : STRING(30);
	reg_3x0312 : STRING(30);
	reg_3x0314 : STRING(30);
	reg_3x0315 : STRING(30);
	reg_3x0316 : STRING(30);
	reg_3x0317 : STRING(30);
	reg_3x0319 : STRING(30);
	reg_3x0320 : STRING(30);
	reg_3x0321 : STRING(30);
	reg_3x0322 : STRING(30);
	reg_3x0328 : STRING(30);
	reg_3x0501 : STRING(30);
	reg_3x0502 : STRING(30);
	reg_3x0503 : STRING(30);
	reg_3x0504 : STRING(30);
	reg_3x0505 : STRING(30);
	reg_3x0601 : STRING(30);
	reg_3x0602 : STRING(30);
	reg_3x0603 : STRING(30);
	reg_3x0604 : STRING(30);
	reg_3x0605 : STRING(30);
	reg_3x0701 : STRING(30);
	reg_3x0702 : STRING(30);
	reg_3x0703 : STRING(30);
	reg_3x0704 : STRING(30);
	reg_3x0705 : STRING(30);
	reg_3x0707 : STRING(30);
	reg_3x0708 : STRING(30);
	reg_3x0709 : STRING(30);
	reg_3x0713 : STRING(30);
	reg_3x0714 : STRING(30);
	reg_3x0801 : STRING(30);
	reg_3x0802 : STRING(30);
	reg_3x0804 : STRING(30);
	reg_3x0805 : STRING(30);
	reg_3x0806 : STRING(30);
	reg_3x0807 : STRING(30);
	reg_3x0808 : STRING(30);
	reg_3x0809 : STRING(30);
	reg_3x0811 : STRING(30);
	reg_3x0815 : STRING(30);
	reg_3x0901 : STRING(30);
	reg_3x0902 : STRING(30);
	reg_3x0903 : STRING(30);
	reg_3x0904 : STRING(30);
	reg_3x0905 : STRING(30);
	reg_3x0906 : STRING(30);
	reg_3x0908 : STRING(30);
	reg_3x1001 : STRING(30);
	reg_3x1002 : STRING(30);
	reg_3x1003 : STRING(30);
	reg_3x1004 : STRING(30);
	reg_3x1005 : STRING(30);
	reg_3x1101 : STRING(30);
	reg_3x1101b : STRING(30);
	reg_3x1102 : STRING(30);
	reg_3x1103 : STRING(30);
	reg_3x1104 : STRING(30);
	reg_3x1105 : STRING(30);
	reg_3x1109 : STRING(30);
	reg_3x1110 : STRING(30);
	reg_3x1116 : STRING(30);
	reg_3x1118 : STRING(30);
	reg_3x1119 : STRING(30);
	reg_3x1121 : STRING(30);
	reg_3x1122 : STRING(30);
	reg_3x1123 : STRING(30);
	reg_3x1201 : STRING(30);
	reg_3x1202 : STRING(30);
	reg_3x1203 : STRING(30);
	reg_3x1204 : STRING(30);
	reg_3x1205 : STRING(30);
	reg_3x1206 : STRING(30);
	reg_3x1207 : STRING(30);
	reg_3x1208 : STRING(30);
	reg_3x1209 : STRING(30);
	reg_3x1210 : STRING(30);
	reg_3x1211 : STRING(30);
	reg_3x1212 : STRING(30);
	reg_3x1213 : STRING(30);
	reg_3x1214 : STRING(30);
	reg_3x1215 : STRING(30);
	reg_3x1216 : STRING(30);
	reg_3x1220 : STRING(30);
	reg_3x1251 : STRING(30);
	reg_3x1252 : STRING(30);
	reg_3x1253 : STRING(30);
	reg_3x1254 : STRING(30);
	reg_3x1255 : STRING(30);
	reg_3x1256 : STRING(30);
	reg_3x1257 : STRING(30);
	reg_3x1258 : STRING(30);
	reg_3x1259 : STRING(30);
	reg_3x1260 : STRING(30);
	reg_3x1261 : STRING(30);
	reg_3x1262 : STRING(30);
	reg_3x1263 : STRING(30);
	reg_3x1264 : STRING(30);
	reg_3x1265 : STRING(30);
	reg_3x1266 : STRING(30);
	reg_3x1267 : STRING(30);
	reg_3x1268 : STRING(30);
	reg_4x0101 : STRING(30);
	reg_4x0102 : STRING(30);
	reg_4x0103 : STRING(30);
	reg_4x0103b: STRING(30);
	prosenttiAs: STRING(30);
	reg_4x0104 : STRING(30);
	reg_4x0105 : STRING(30);
	reg_4x0106 : STRING(30);
	reg_4x0111 : STRING(30);
	reg_4x0204 : STRING(30);
	reg_4x0206 : STRING(30);
	reg_4x0208 : STRING(30);
	reg_4x0210 : STRING(30);
	reg_4x0331 : STRING(30);
	reg_4x0333 : STRING(30);
	reg_4x0335 : STRING(30);
	reg_4x0501 : STRING(30);
	reg_4x0502 : STRING(30);
	reg_4x0503 : STRING(30);
	reg_4x0504 : STRING(30);
	reg_4x0505 : STRING(30);
	reg_4x0506 : STRING(30);
	reg_4x0507 : STRING(30);
	reg_4x0508 : STRING(30);
	reg_4x0509 : STRING(30);
	reg_4x0511 : STRING(30);
	reg_4x0512 : STRING(30);
	reg_4x0513 : STRING(30);
	reg_4x0514 : STRING(30);
	reg_4x0515 : STRING(30);
	reg_4x0516 : STRING(30);
	reg_4x0517 : STRING(30);
	reg_4x0518 : STRING(30);
	reg_4x0519 : STRING(30);
	reg_4x0520 : STRING(30);
	reg_4x0521 : STRING(30);
	reg_4x0522 : STRING(30);
	reg_4x0523 : STRING(30);
	reg_4x0524 : STRING(30);
	reg_4x0525 : STRING(30);
	reg_4x0526 : STRING(30);
	reg_4x0527 : STRING(30);
	reg_4x0528 : STRING(30);
	reg_4x0529 : STRING(30);
	reg_4x0530 : STRING(30);
	reg_4x0531 : STRING(30);
	reg_4x0532 : STRING(30);
	reg_4x0533 : STRING(30);
	reg_4x0534 : STRING(30);
	reg_4x0535 : STRING(30);
	reg_4x0601 : STRING(30);
	reg_4x0602 : STRING(30);
	reg_4x0603 : STRING(30);
	reg_4x0604 : STRING(30);
	reg_4x0605 : STRING(30);
	reg_4x0606 : STRING(30);
	reg_4x0607 : STRING(30);
	reg_4x0608 : STRING(30);
	reg_4x0609 : STRING(30);
	reg_4x0611 : STRING(30);
	reg_4x0612 : STRING(30);
	reg_4x0613 : STRING(30);
	reg_4x0614 : STRING(30);
	reg_4x0615 : STRING(30);
	reg_4x0616 : STRING(30);
	reg_4x0617 : STRING(30);
	reg_4x0618 : STRING(30);
	reg_4x0619 : STRING(30);
	reg_4x0620 : STRING(30);
	reg_4x0621 : STRING(30);
	reg_4x0622 : STRING(30);
	reg_4x0623 : STRING(30);
	reg_4x0624 : STRING(30);
	reg_4x0625 : STRING(30);
	reg_4x0626 : STRING(30);
	reg_4x0627 : STRING(30);
	reg_4x0628 : STRING(30);
	reg_4x0629 : STRING(30);
	reg_4x0630 : STRING(30);
	reg_4x0631 : STRING(30);
	reg_4x0632 : STRING(30);
	reg_4x0633 : STRING(30);
	reg_4x0634 : STRING(30);
	reg_4x0635 : STRING(30);
	reg_4x0701 : STRING(30);
	reg_4x0702 : STRING(30);
	reg_4x0703 : STRING(30);
	reg_4x0704 : STRING(30);
	reg_4x0705 : STRING(30);
	reg_4x0706 : STRING(30);
	reg_4x0707 : STRING(30);
	reg_4x0708 : STRING(30);
	reg_4x0709 : STRING(30);
	reg_4x0711 : STRING(30);
	reg_4x0712 : STRING(30);
	reg_4x0901 : STRING(30);
	reg_4x0902 : STRING(30);
	reg_4x1001 : STRING(30);
	reg_4x1002 : STRING(30);
	reg_4x1003 : STRING(30);
	reg_4x1004 : STRING(30);
	reg_4x1005 : STRING(30);
	reg_4x1006 : STRING(30);
	reg_4x1007 : STRING(30);
	reg_4x1008 : STRING(30);
	reg_4x1009 : STRING(30);
	reg_4x1011 : STRING(30);
	reg_4x1012 : STRING(30);
	reg_4x1013 : STRING(30);
	reg_4x1014 : STRING(30);
	reg_4x1015 : STRING(30);
	reg_4x1016 : STRING(30);
	reg_4x1017 : STRING(30);
	reg_4x1018 : STRING(30);
	reg_4x1019 : STRING(30);
	reg_4x1020 : STRING(30);
	reg_4x1021 : STRING(30);
	reg_4x1022 : STRING(30);
	reg_4x1023 : STRING(30);
	reg_4x1024 : STRING(30);
	reg_4x1025 : STRING(30);
	reg_4x1026 : STRING(30);
	reg_4x1027 : STRING(30);
	reg_4x1028 : STRING(30);
	reg_4x1029 : STRING(30);
	reg_4x1030 : STRING(30);
	reg_4x1031 : STRING(30);
	reg_4x1032 : STRING(30);
	reg_4x1033 : STRING(30);
	reg_4x1034 : STRING(30);
	reg_4x1035 : STRING(30);
	reg_4x1106 : STRING(30);
	reg_4x1107 : STRING(30);
	reg_4x1108 : STRING(30);
	reg_4x1112 : STRING(30);
	reg_4x1113 : STRING(30);
	reg_4x1114 : STRING(30);
	reg_4x1115 : STRING(30);
	reg_4x1124 : STRING(30);
	reg_4x1201 : STRING(30);
	reg_4x1202 : STRING(30);
	reg_4x1204 : STRING(30);
	reg_4x1210 : STRING(30);
	reg_4x1211 : STRING(30);
	reg_4x1212 : STRING(30);
	reg_4x1213 : STRING(30);
	reg_4x1214 : STRING(30);
	reg_4x1216 : STRING(30);
	reg_4x1251 : STRING(30);
	reg_4x1252 : STRING(30);
	reg_4x1253 : STRING(30);
	reg_4x1254 : STRING(30);
	reg_4x1255 : STRING(30);
	reg_4x1256 : STRING(30);
	reg_4x1257 : STRING(30);
	reg_4x1258 : STRING(30);
	reg_4x1259 : STRING(30);
	reg_4x1260 : STRING(30);
	reg_4x1261 : STRING(30);
	reg_4x1262 : STRING(30);
	reg_4x1263 : STRING(30);
	reg_4x1264 : STRING(30);
	reg_4x1265 : STRING(30);
	reg_4x1266 : STRING(30);
	reg_4x1267 : STRING(30);
	reg_4x1268 : STRING(30);
	reg_4x1269 : STRING(30);
	reg_4x1270 : STRING(30);
	reg_4x1271 : STRING(30);
	reg_4x1272 : STRING(30);
	reg_4x1273 : STRING(30);
	reg_4x1274 : STRING(30);
	reg_4x1275 : STRING(30);
	reg_4x1276 : STRING(30);
	reg_4x1278 : STRING(30);
	reg_4x1279 : STRING(30);
	reg_4x1280 : STRING(30);
	reg_4x1281 : STRING(30);
	reg_4x1282 : STRING(30);
	reg_4x1283 : STRING(30);
	reg_4x1284 : STRING(30);
	reg_4x1285 : STRING(30);
	reg_4x1286 : STRING(30);
	reg_4x1287 : STRING(30);
	reg_4x1288 : STRING(30);
	reg_4x1289 : STRING(30);
	reg_4x1290 : STRING(30);
	reg_4x1291 : STRING(30);
	reg_4x1292 : STRING(30);
	reg_4x1293 : STRING(30);
	reg_4x1294 : STRING(30);
	reg_4x1295 : STRING(30);
	reg_4x1296 : STRING(30);
	reg_4x1297 : STRING(30);
END_VAR

VAR_OUTPUT

END_VAR

VAR
	iTemp						: INT;
	udiTemp						: UDINT;
	iOnOffOhjaus 				: INT;
	iKomp1Tila 					: INT;
	iKomp2Tila 					: INT;
	iKompMaara 					: INT;
	iAlarmState					: INT;
	iAlarmCode 					: INT;
	bSuoraVAKOhjaus				: BOOL;
	
	tonAlarmAckButtonReset		: TON;
	tonJatkuvaKirjoitus			: TON;

	Modbus_0x0101 : GenericModbus642FB;
	Modbus_1x0101 : GenericModbus642FB;
	Modbus_1x0191 : GenericModbus642FB;
	Modbus_1x0301 : GenericModbus642FB;
	Modbus_1x0321 : GenericModbus642FB;
	Modbus_1x0604 : GenericModbus642FB;
	Modbus_1x0701 : GenericModbus642FB;
	Modbus_1x0801 : GenericModbus642FB;
	Modbus_1x0901 : GenericModbus642FB;
	Modbus_1x1004 : GenericModbus642FB;
	Modbus_3x0101 : GenericModbus642FB;
	Modbus_3x0199 : GenericModbus642FB;
	Modbus_3x0301 : GenericModbus642FB;
	Modbus_3x0315 : GenericModbus642FB;
	Modbus_3x0501 : GenericModbus642FB;
	Modbus_3x0601 : GenericModbus642FB;
	Modbus_3x0701 : GenericModbus642FB;
	Modbus_3x0801 : GenericModbus642FB;
	Modbus_3x0901 : GenericModbus642FB;
	Modbus_3x1001 : GenericModbus642FB;
	Modbus_3x1101 : GenericModbus642FB;
	Modbus_3x1116 : GenericModbus642FB;
	Modbus_3x1201 : GenericModbus642FB;
	Modbus_3x1211 : GenericModbus642FB;
	Modbus_3x1251 : GenericModbus642FB;
	Modbus_4x0101 : GenericModbus642FB;
	Modbus_4x0204 : GenericModbus642FB;
	Modbus_4x0331 : GenericModbus642FB;
	Modbus_4x0501 : GenericModbus642FB;
	Modbus_4x0517 : GenericModbus642FB;
	Modbus_4x0601 : GenericModbus642FB;
	Modbus_4x0617 : GenericModbus642FB;
	Modbus_4x0701 : GenericModbus642FB;
	Modbus_4x0901 : GenericModbus642FB;
	Modbus_4x1001 : GenericModbus642FB;
	Modbus_4x1018 : GenericModbus642FB;
	Modbus_4x1106 : GenericModbus642FB;
	Modbus_4x1201 : GenericModbus642FB;
	Modbus_4x1251 : GenericModbus642FB;
	Modbus_4x1269 : GenericModbus642FB;
	Modbus_4x1287 : GenericModbus642FB;
END_VAR

VAR CONSTANT
	COIL 			: INT := 1;
	DISCRETE 		: INT := 2;
	HOLDING 		: INT := 3;
	INPUT 			: INT := 4;
	SINGLE_COIL 	: INT := 5;
	SINGLE_HOLDING	: INT := 6;
END_VAR

(* 

FB_GEBWELL_TAURUS_CLIMATIX_V25a1
- Sopii Taurus EVI ja Taurus Inverter Pro lämpöpumpuille 

Versiohistoria:

V24a0 (30.9.2024 / Fidelix / Niemenjoki)
- Toimivaksi testatun erittäin suppean rajapinnan pohjalta tehty laajennus. Testaamatta kentällä.
- Tehty rekisterilistan "12.7.2024 CLIMATIX LÄMPÖPUMPPU MODBUS REKISTERIT" mukaan

V25a1 (24.1.2025 / Fidelix / Niemenjoki)
- Lisätty uudet rekisterit listan "9.12.2024 CLIMATIX LÄMPÖPUMPPU MODBUS REKISTERIT" mukaan
- Testattu kentällä toimivaksi

Selitteitä:
1) 0x = Coil Register 1x = Discrete input 3x = Input register 4x = Holding register
2) Luettu arvo täytää jakaa resoluutio kentän arvolla, jotta saadaan mitattu arvo.
3) 0 = 1 ja 2 pois päältä, 1 = 1 päällä ja 2 pois päältä, 2 = 1 pois päältä ja 2 päällä, 3 = 1 ja 2 päällä
4) 0 = Auto, 1 = Suojaus, 2 = Alennettu, 3 = Normaali, 4 = Mukavuus, 
5) 0 = Auto, 1= Pois päältä,2 =, 3 = Varalämpö
6) 0 = Ei hälytksiä, 1 = Aktiivisia hälytyksiä,2 = Aktiivisia kuitattuja hälytyksiä
7)  Tiettyjen antureiden lämpötilat (esim. KV varaajan)
8)  0 = Ulkolämpötila, 1 =, 2 = Kesä, 3 = Talvi
9)  32bit dataformaatti: Unsigned integer, little endian, byte swap
10)  1=Pois päältä, 2=Päällä, 3=Jäätymisensuojaus aktiivinen
11)  1= Pois päältä 2=Standby 3=Passiivijäähdytys, 4=Aktiivijäähdytys, 5=Jäätymisensuojaus aktiivinen																			

HUOM! Rekisterit pykältää -1:llä. Esim. rekisterilistan rekisteri 101 on Fidelix rekisteri 100.

Modbus-laitteet:
Coil: Start 100, Count 1
Discrete: Start 100, Count 2
Discrete: Start 190, Count 14
Discrete: Start 300, Count 16
Discrete: Start 320, Count 17
Discrete: Start 603, Count 1
Discrete: Start 700, Count 9
Discrete: Start 800, Count 5
Discrete: Start 900, Count 5
Discrete: Start 1003, Count 1
Input: Start 100, Count 19
Input: Start 198, Count 17
Input: Start 300, Count 14
Input: Start 314, Count 14
Input: Start 500, Count 5
Input: Start 600, Count 5
Input: Start 700, Count 14
Input: Start 800, Count 15
Input: Start 900, Count 8
Input: Start 1000, Count 5
Input: Start 1100, Count 11
Input: Start 1115, Count 9
Input: Start 1200, Count 10
Input: Start 1210, Count 10
Input: Start 1250, Count 18
Holding: Start 100, Count 11
Holding: Start 203, Count 7
Holding: Start 330, Count 5
Holding: Start 500, Count 16
Holding: Start 516, Count 19
Holding: Start 600, Count 16
Holding: Start 616, Count 19
Holding: Start 700, Count 12
Holding: Start 900, Count 2
Holding: Start 1000, Count 17
Holding: Start 1017, Count 18
Holding: Start 1105, Count 19
*)


(* Väylävika *)
iTemp := SetDigitalPointF( Value:=BOOL_TO_INT(GetSystemStatusF( Mode:=1, iParameter:=iModule, rParameter:=INT_TO_REAL(iPort)) > 30.0 ), LockState:=1, Name:=Comm_Alarm ) ;


(* Coil, Start 100, Count 1 *)
Modbus_0x0101(Send:=0, Port:=iPort, Module:=iModule, StartRegister:=100, RegisterType:=COIL);
IF Modbus_0x0101.Datavalid = 1 THEN
	Modbus_0x0101.Reg0 := CoilF_3(id_string:=reg_0x0101, RegValue:=Modbus_0x0101.Reg0, BitMask:=16#0100, Force:=FALSE, ReleaseOverride:=TRUE);
	Modbus_0x0101(Send:=2);
END_IF;


tonAlarmAckButtonReset.IN := ((getLockStateF(reg_0x0101) = 2) AND (getDigitalPointF(reg_0x0101) = 1));
tonAlarmAckButtonReset.PT := T#120s;
tonAlarmAckButtonReset();

IF tonAlarmAckButtonReset.Q THEN
	
	iTemp := setDigitalPointF(0, 3, reg_0x0101); 
	iTemp := setDigitalPointF(0, 1, reg_0x0101);
	
	IF getDigitalPointF(reg_1x0191) = 0 THEN
		iTemp := alarmAckF(2, 1, reg_1x0191);
	END_IF;
	
	IF getDigitalPointF(reg_1x0192) = 0 THEN
		iTemp := alarmAckF(2, 1, reg_1x0192);
	END_IF;
	
	
END_IF;
	

(* Discrete, Start 100, Count 2 *)
Modbus_1x0101(Send:=0, Port:=iPort, Module:=iModule, StartRegister:=100, RegisterType:=DISCRETE);
IF Modbus_1x0101.Datavalid = 1 THEN
	iTemp := DiscreteInputF(id_String:=reg_1x0101, RegValue:=Modbus_1x0101.Reg0, BitMask:=16#0100);
	iTemp := DiscreteInputF(id_String:=reg_1x0102, RegValue:=Modbus_1x0101.Reg0, BitMask:=16#0200);
END_IF;

(* Discrete, Start 190, Count 14 *)
Modbus_1x0191(Send:=0, Port:=iPort, Module:=iModule, StartRegister:=190, RegisterType:=DISCRETE);
IF Modbus_1x0191.Datavalid = 1 THEN
	iTemp := DiscreteInputF(id_String:=reg_1x0191, RegValue:=Modbus_1x0191.Reg0, BitMask:=16#0100);
	iTemp := DiscreteInputF(id_String:=reg_1x0192, RegValue:=Modbus_1x0191.Reg0, BitMask:=16#0200);
	iTemp := DiscreteInputF(id_String:=reg_1x0193, RegValue:=Modbus_1x0191.Reg0, BitMask:=16#0400);
	iTemp := DiscreteInputF(id_String:=reg_1x0194, RegValue:=Modbus_1x0191.Reg0, BitMask:=16#0800);
	(* Empty 195 *)
	iTemp := DiscreteInputF(id_String:=reg_1x0196, RegValue:=Modbus_1x0191.Reg0, BitMask:=16#2000);
	iTemp := DiscreteInputF(id_String:=reg_1x0197, RegValue:=Modbus_1x0191.Reg0, BitMask:=16#4000);
	iTemp := DiscreteInputF(id_String:=reg_1x0198, RegValue:=Modbus_1x0191.Reg0, BitMask:=16#8000);
	(* Empty 199-200 *)
	iTemp := DiscreteInputF(id_String:=reg_1x0201, RegValue:=Modbus_1x0191.Reg0, BitMask:=16#0004);
	iTemp := DiscreteInputF(id_String:=reg_1x0202, RegValue:=Modbus_1x0191.Reg0, BitMask:=16#0008);
	(* Empty 203 *)
	iTemp := DiscreteInputF(id_String:=reg_1x0204, RegValue:=Modbus_1x0191.Reg0, BitMask:=16#0020);
END_IF;

(* Discrete, Start 300, Count 16 *)
Modbus_1x0301(Send:=0, Port:=iPort, Module:=iModule, StartRegister:=300, RegisterType:=DISCRETE);
IF Modbus_1x0301.Datavalid = 1 THEN
	iTemp := DiscreteInputF(id_String:=reg_1x0301, RegValue:=Modbus_1x0301.Reg0, BitMask:=16#0100);
	iTemp := DiscreteInputF(id_String:=reg_1x0302, RegValue:=Modbus_1x0301.Reg0, BitMask:=16#0200);
	iTemp := DiscreteInputF(id_String:=reg_1x0303, RegValue:=Modbus_1x0301.Reg0, BitMask:=16#0400);
	iTemp := DiscreteInputF(id_String:=reg_1x0304, RegValue:=Modbus_1x0301.Reg0, BitMask:=16#0800);
	iTemp := DiscreteInputF(id_String:=reg_1x0305, RegValue:=Modbus_1x0301.Reg0, BitMask:=16#1000);
	iTemp := DiscreteInputF(id_String:=reg_1x0306, RegValue:=Modbus_1x0301.Reg0, BitMask:=16#2000);
	iTemp := DiscreteInputF(id_String:=reg_1x0307, RegValue:=Modbus_1x0301.Reg0, BitMask:=16#4000);
	(* Empty 308-309 *)
	iTemp := DiscreteInputF(id_String:=reg_1x0310, RegValue:=Modbus_1x0301.Reg0, BitMask:=16#0002);
	iTemp := DiscreteInputF(id_String:=reg_1x0311, RegValue:=Modbus_1x0301.Reg0, BitMask:=16#0004);
	(* Empty 312-313 *)
	iTemp := DiscreteInputF(id_String:=reg_1x0314, RegValue:=Modbus_1x0301.Reg0, BitMask:=16#0020);
	iTemp := DiscreteInputF(id_String:=reg_1x0315, RegValue:=Modbus_1x0301.Reg0, BitMask:=16#0040);
	iTemp := DiscreteInputF(id_String:=reg_1x0316, RegValue:=Modbus_1x0301.Reg0, BitMask:=16#0080);
END_IF;

(* Discrete, Start 320, Count 17 *)
Modbus_1x0321(Send:=0, Port:=iPort, Module:=iModule, StartRegister:=320, RegisterType:=DISCRETE);
IF Modbus_1x0321.Datavalid = 1 THEN
	iTemp := DiscreteInputF(id_String:=reg_1x0321, RegValue:=Modbus_1x0321.Reg0, BitMask:=16#0100);
	iTemp := DiscreteInputF(id_String:=reg_1x0322, RegValue:=Modbus_1x0321.Reg0, BitMask:=16#0200);
	iTemp := DiscreteInputF(id_String:=reg_1x0323, RegValue:=Modbus_1x0321.Reg0, BitMask:=16#0400);
	iTemp := DiscreteInputF(id_String:=reg_1x0324, RegValue:=Modbus_1x0321.Reg0, BitMask:=16#0800);
	iTemp := DiscreteInputF(id_String:=reg_1x0325, RegValue:=Modbus_1x0321.Reg0, BitMask:=16#1000);
	iTemp := DiscreteInputF(id_String:=reg_1x0326, RegValue:=Modbus_1x0321.Reg0, BitMask:=16#2000);
	iTemp := DiscreteInputF(id_String:=reg_1x0327, RegValue:=Modbus_1x0321.Reg0, BitMask:=16#4000);
	iTemp := DiscreteInputF(id_String:=reg_1x0328, RegValue:=Modbus_1x0321.Reg0, BitMask:=16#8000);
	iTemp := DiscreteInputF(id_String:=reg_1x0329, RegValue:=Modbus_1x0321.Reg0, BitMask:=16#0001);
	iTemp := DiscreteInputF(id_String:=reg_1x0330, RegValue:=Modbus_1x0321.Reg0, BitMask:=16#0002);
	iTemp := DiscreteInputF(id_String:=reg_1x0331, RegValue:=Modbus_1x0321.Reg0, BitMask:=16#0004);
	iTemp := DiscreteInputF(id_String:=reg_1x0332, RegValue:=Modbus_1x0321.Reg0, BitMask:=16#0008);
	iTemp := DiscreteInputF(id_String:=reg_1x0333, RegValue:=Modbus_1x0321.Reg0, BitMask:=16#0010);
	iTemp := DiscreteInputF(id_String:=reg_1x0334, RegValue:=Modbus_1x0321.Reg0, BitMask:=16#0020);
	iTemp := DiscreteInputF(id_String:=reg_1x0335, RegValue:=Modbus_1x0321.Reg0, BitMask:=16#0040);
	iTemp := DiscreteInputF(id_String:=reg_1x0336, RegValue:=Modbus_1x0321.Reg0, BitMask:=16#0080);
	iTemp := DiscreteInputF(id_String:=reg_1x0337, RegValue:=Modbus_1x0321.Reg1, BitMask:=16#0100);
END_IF;

(* Discrete, Start 603, Count 1 *)
Modbus_1x0604(Send:=0, Port:=iPort, Module:=iModule, StartRegister:=603, RegisterType:=DISCRETE);
IF Modbus_1x0604.Datavalid = 1 THEN
	iTemp := DiscreteInputF(id_String:=reg_1x0604, RegValue:=Modbus_1x0604.Reg0, BitMask:=16#0100);
END_IF;

(* Discrete, Start 700, Count 9 *)
Modbus_1x0701(Send:=0, Port:=iPort, Module:=iModule, StartRegister:=700, RegisterType:=DISCRETE);
IF Modbus_1x0701.Datavalid = 1 THEN
	iTemp := DiscreteInputF(id_String:=reg_1x0701, RegValue:=Modbus_1x0701.Reg0, BitMask:=16#0100);
	iTemp := DiscreteInputF(id_String:=reg_1x0702, RegValue:=Modbus_1x0701.Reg0, BitMask:=16#0200);
	iTemp := DiscreteInputF(id_String:=reg_1x0703, RegValue:=Modbus_1x0701.Reg0, BitMask:=16#0400);
	iTemp := DiscreteInputF(id_String:=reg_1x0704, RegValue:=Modbus_1x0701.Reg0, BitMask:=16#0800);
	(* Empty 705-707 *)
	iTemp := DiscreteInputF(id_String:=reg_1x0708, RegValue:=Modbus_1x0701.Reg0, BitMask:=16#8000);
	iTemp := DiscreteInputF(id_String:=reg_1x0709, RegValue:=Modbus_1x0701.Reg0, BitMask:=16#0001);
END_IF;


(* Discrete, Start 800, Count 5 *)
Modbus_1x0801(Send:=0, Port:=iPort, Module:=iModule, StartRegister:=800, RegisterType:=DISCRETE);
IF Modbus_1x0801.Datavalid = 1 THEN
	iTemp := DiscreteInputF(id_String:=reg_1x0801, RegValue:=Modbus_1x0801.Reg0, BitMask:=16#0100);
	(* Empty 802-804*)
	iTemp := DiscreteInputF(id_String:=reg_1x0805, RegValue:=Modbus_1x0801.Reg0, BitMask:=16#1000);
END_IF;

(* Discrete, Start 900, Count 5 *)
Modbus_1x0901(Send:=0, Port:=iPort, Module:=iModule, StartRegister:=900, RegisterType:=DISCRETE);
IF Modbus_1x0901.Datavalid = 1 THEN
	iTemp := DiscreteInputF(id_String:=reg_1x0901, RegValue:=Modbus_1x0901.Reg0, BitMask:=16#0100);
	iTemp := DiscreteInputF(id_String:=reg_1x0902, RegValue:=Modbus_1x0901.Reg0, BitMask:=16#0200);
	iTemp := DiscreteInputF(id_String:=reg_1x0903, RegValue:=Modbus_1x0901.Reg0, BitMask:=16#0400);
	iTemp := DiscreteInputF(id_String:=reg_1x0904, RegValue:=Modbus_1x0901.Reg0, BitMask:=16#0800);
	iTemp := DiscreteInputF(id_String:=reg_1x0905, RegValue:=Modbus_1x0901.Reg0, BitMask:=16#1000);
END_IF;

(* Discrete, Start 1003, Count 1 *)
Modbus_1x1004(Send:=0, Port:=iPort, Module:=iModule, StartRegister:=1003, RegisterType:=DISCRETE);
IF Modbus_1x1004.Datavalid = 1 THEN
	iTemp := DiscreteInputF(id_String:=reg_1x1004, RegValue:=Modbus_1x1004.Reg0, BitMask:=16#0100);
END_IF;

(* Input, Start 100, Count 19*)
Modbus_3x0101(Send:=0, Port:=iPort, Module:=iModule, StartRegister:=100, RegisterType:=INPUT);
IF Modbus_3x0101.Datavalid = 1 THEN
	iTemp := InputRegF(id_String:=reg_3x0101, RegValue:=Modbus_3x0101.Reg0, rMultiplier:=10.0);
	udiTemp := DoubleInputRegF(id_String:=reg_3x0102, HighRegValue:=Modbus_3x0101.Reg2, LowRegValue:=Modbus_3x0101.Reg1, rMultiplier:=1.0);
	udiTemp := DoubleInputRegF(id_String:=reg_3x0104, HighRegValue:=Modbus_3x0101.Reg4, LowRegValue:=Modbus_3x0101.Reg3, rMultiplier:=1.0);
	udiTemp := DoubleInputRegF(id_String:=reg_3x0106, HighRegValue:=Modbus_3x0101.Reg6, LowRegValue:=Modbus_3x0101.Reg5, rMultiplier:=1.0);
	iTemp := InputRegF(id_String:=reg_3x0108, RegValue:=Modbus_3x0101.Reg7, rMultiplier:=10.0);
	iTemp := InputRegF(id_String:=reg_3x0109, RegValue:=Modbus_3x0101.Reg8, rMultiplier:=10.0);
	iTemp := InputRegF(id_String:=reg_3x0110, RegValue:=Modbus_3x0101.Reg9, rMultiplier:=10.0);
	iTemp := InputRegF(id_String:=reg_3x0111, RegValue:=Modbus_3x0101.Reg10, rMultiplier:=10.0);
	iTemp := InputRegF(id_String:=reg_3x0112, RegValue:=Modbus_3x0101.Reg11, rMultiplier:=10.0);
	iTemp := InputRegF(id_String:=reg_3x0113, RegValue:=Modbus_3x0101.Reg12, rMultiplier:=10.0);
	iTemp := InputRegF(id_String:=reg_3x0114, RegValue:=Modbus_3x0101.Reg13, rMultiplier:=10.0);
	iTemp := InputRegF(id_String:=reg_3x0115, RegValue:=Modbus_3x0101.Reg14, rMultiplier:=10.0);
	iTemp := InputRegF(id_String:=reg_3x0116, RegValue:=Modbus_3x0101.Reg15, rMultiplier:=10.0);
	iTemp := InputRegF(id_String:=reg_3x0117, RegValue:=Modbus_3x0101.Reg16, rMultiplier:=10.0);
	iTemp := InputRegF(id_String:=reg_3x0118, RegValue:=Modbus_3x0101.Reg17, rMultiplier:=10.0);
	iTemp := InputRegF(id_String:=reg_3x0119, RegValue:=Modbus_3x0101.Reg18, rMultiplier:=10.0);
END_IF;


(* Input, Start 198, Count 17 *)
Modbus_3x0199(Send:=0, Port:=iPort, Module:=iModule, StartRegister:=198, RegisterType:=INPUT);
IF Modbus_3x0199.Datavalid = 1 THEN
    iTemp := InputRegF(id_String:=reg_3x0199, RegValue:=Modbus_3x0199.Reg0, rMultiplier:=1.0);
    iTemp := InputRegF(id_String:=reg_3x0201, RegValue:=Modbus_3x0199.Reg2, rMultiplier:=10.0);
    iTemp := InputRegF(id_String:=reg_3x0202, RegValue:=Modbus_3x0199.Reg3, rMultiplier:=10.0);
    iTemp := InputRegF(id_String:=reg_3x0203, RegValue:=Modbus_3x0199.Reg4, rMultiplier:=10.0);
    iTemp := InputRegF(id_String:=reg_3x0204, RegValue:=Modbus_3x0199.Reg5, rMultiplier:=1.0);
    iTemp := InputRegF(id_String:=reg_3x0205, RegValue:=Modbus_3x0199.Reg6, rMultiplier:=1.0);
    udiTemp := DoubleInputRegF(id_String:=reg_3x0206, HighRegValue:=Modbus_3x0199.Reg8, LowRegValue:=Modbus_3x0199.Reg7, rMultiplier:=1.0);
    udiTemp := DoubleInputRegF(id_String:=reg_3x0208, HighRegValue:=Modbus_3x0199.Reg10, LowRegValue:=Modbus_3x0199.Reg9, rMultiplier:=1.0);
    udiTemp := DoubleInputRegF(id_String:=reg_3x0210, HighRegValue:=Modbus_3x0199.Reg12, LowRegValue:=Modbus_3x0199.Reg11, rMultiplier:=1.0);
    iTemp := InputRegF(id_String:=reg_3x0212, RegValue:=Modbus_3x0199.Reg13, rMultiplier:=10.0);
    iTemp := InputRegF(id_String:=reg_3x0213, RegValue:=Modbus_3x0199.Reg14, rMultiplier:=1.0);
    iTemp := InputRegF(id_String:=reg_3x0214, RegValue:=Modbus_3x0199.Reg15, rMultiplier:=1.0);
    iTemp := InputRegF(id_String:=reg_3x0215, RegValue:=Modbus_3x0199.Reg16, rMultiplier:=10.0);
    
    (* Convert alarm state register into alarm register *)
    iAlarmState := getDigitalPointF(reg_3x0199);
    iTemp 		:= setDigitalPointF(BOOL_TO_INT(iAlarmState <> 0), 1, sHalytys);
END_IF;

(* Input, Start 300, Count 14 *)
Modbus_3x0301(Send:=0, Port:=iPort, Module:=iModule, StartRegister:=300, RegisterType:=INPUT);
IF Modbus_3x0301.Datavalid = 1 THEN
	iTemp := InputRegF(id_String:=reg_3x0301, RegValue:=Modbus_3x0301.Reg0, rMultiplier:=10.0);
	iTemp := InputRegF(id_String:=reg_3x0302, RegValue:=Modbus_3x0301.Reg1, rMultiplier:=10.0);
	iTemp := InputRegF(id_String:=reg_3x0303, RegValue:=Modbus_3x0301.Reg2, rMultiplier:=10.0);
	iTemp := InputRegF(id_String:=reg_3x0304, RegValue:=Modbus_3x0301.Reg3, rMultiplier:=10.0);
	iTemp := InputRegF(id_String:=reg_3x0305, RegValue:=Modbus_3x0301.Reg4, rMultiplier:=10.0);
	iTemp := InputRegF(id_String:=reg_3x0306, RegValue:=Modbus_3x0301.Reg5, rMultiplier:=1.0);
	iTemp := InputRegF(id_String:=reg_3x0307, RegValue:=Modbus_3x0301.Reg6, rMultiplier:=10.0);
	iTemp := InputRegF(id_String:=reg_3x0308, RegValue:=Modbus_3x0301.Reg7, rMultiplier:=10.0);
	iTemp := InputRegF(id_String:=reg_3x0309, RegValue:=Modbus_3x0301.Reg8, rMultiplier:=1.0);
	iTemp := InputRegF(id_String:=reg_3x0310, RegValue:=Modbus_3x0301.Reg9, rMultiplier:=1.0);
	iTemp := InputRegF(id_String:=reg_3x0311, RegValue:=Modbus_3x0301.Reg10, rMultiplier:=1.0);
	udiTemp := DoubleInputRegF(id_String:=reg_3x0312, HighRegValue:=Modbus_3x0301.Reg12, LowRegValue:=Modbus_3x0301.Reg11, rMultiplier:=1.0);
	iTemp := InputRegF(id_String:=reg_3x0314, RegValue:=Modbus_3x0301.Reg13, rMultiplier:=1.0);
END_IF;

(* Input, Start 314, Count 14 *)
Modbus_3x0315(Send:=0, Port:=iPort, Module:=iModule, StartRegister:=314, RegisterType:=INPUT);
IF Modbus_3x0315.Datavalid = 1 THEN
	iTemp := InputRegF(id_String:=reg_3x0315, RegValue:=Modbus_3x0315.Reg0, rMultiplier:=1.0);
	iTemp := InputRegF(id_String:=reg_3x0316, RegValue:=Modbus_3x0315.Reg1, rMultiplier:=1.0);
	udiTemp := DoubleInputRegF(id_String:=reg_3x0317, HighRegValue:=Modbus_3x0315.Reg3, LowRegValue:=Modbus_3x0315.Reg2, rMultiplier:=1.0);
	iTemp := InputRegF(id_String:=reg_3x0319, RegValue:=Modbus_3x0315.Reg4, rMultiplier:=1.0);
	iTemp := InputRegF(id_String:=reg_3x0320, RegValue:=Modbus_3x0315.Reg5, rMultiplier:=10.0);
	iTemp := InputRegF(id_String:=reg_3x0321, RegValue:=Modbus_3x0315.Reg6, rMultiplier:=10.0);
	iTemp := InputRegF(id_String:=reg_3x0322, RegValue:=Modbus_3x0315.Reg7, rMultiplier:=10.0);
	(* Empty 323-327*)
	iTemp := InputRegF(id_String:=reg_3x0328, RegValue:=Modbus_3x0315.Reg13, rMultiplier:=10.0);
END_IF;

(* Input, Start 500, Count 5 *)
Modbus_3x0501(Send:=0, Port:=iPort, Module:=iModule, StartRegister:=500, RegisterType:=INPUT);
IF Modbus_3x0501.Datavalid = 1 THEN
	iTemp := InputRegF(id_String:=reg_3x0501, RegValue:=Modbus_3x0501.Reg0, rMultiplier:=1.0);
	iTemp := InputRegF(id_String:=reg_3x0502, RegValue:=Modbus_3x0501.Reg1, rMultiplier:=10.0);
	iTemp := InputRegF(id_String:=reg_3x0503, RegValue:=Modbus_3x0501.Reg2, rMultiplier:=10.0);
	iTemp := InputRegF(id_String:=reg_3x0504, RegValue:=Modbus_3x0501.Reg3, rMultiplier:=10.0);
	iTemp := InputRegF(id_String:=reg_3x0505, RegValue:=Modbus_3x0501.Reg4, rMultiplier:=1.0);
END_IF;

(* Input, Start 600, Count 5 *)
Modbus_3x0601(Send:=0, Port:=iPort, Module:=iModule, StartRegister:=600, RegisterType:=INPUT);
IF Modbus_3x0601.Datavalid = 1 THEN
	iTemp := InputRegF(id_String:=reg_3x0601, RegValue:=Modbus_3x0601.Reg0, rMultiplier:=1.0);
	iTemp := InputRegF(id_String:=reg_3x0602, RegValue:=Modbus_3x0601.Reg1, rMultiplier:=10.0);
	iTemp := InputRegF(id_String:=reg_3x0603, RegValue:=Modbus_3x0601.Reg2, rMultiplier:=10.0);
	iTemp := InputRegF(id_String:=reg_3x0604, RegValue:=Modbus_3x0601.Reg3, rMultiplier:=10.0);
	iTemp := InputRegF(id_String:=reg_3x0605, RegValue:=Modbus_3x0601.Reg4, rMultiplier:=1.0);
END_IF;

(* Input, Start 700, Count 14 *)
Modbus_3x0701(Send:=0, Port:=iPort, Module:=iModule, StartRegister:=700, RegisterType:=INPUT);
IF Modbus_3x0701.Datavalid = 1 THEN
	iTemp := InputRegF(id_String:=reg_3x0701, RegValue:=Modbus_3x0701.Reg0, rMultiplier:=10.0);
	iTemp := InputRegF(id_String:=reg_3x0702, RegValue:=Modbus_3x0701.Reg1, rMultiplier:=10.0);
	iTemp := InputRegF(id_String:=reg_3x0703, RegValue:=Modbus_3x0701.Reg2, rMultiplier:=1.0);
	iTemp := InputRegF(id_String:=reg_3x0704, RegValue:=Modbus_3x0701.Reg3, rMultiplier:=1.0);
	udiTemp := DoubleInputRegF(id_String:=reg_3x0705, HighRegValue:=Modbus_3x0701.Reg5, LowRegValue:=Modbus_3x0701.Reg4, rMultiplier:=1.0);
	iTemp := InputRegF(id_String:=reg_3x0707, RegValue:=Modbus_3x0701.Reg6, rMultiplier:=1.0);
	iTemp := InputRegF(id_String:=reg_3x0708, RegValue:=Modbus_3x0701.Reg7, rMultiplier:=10.0);
	iTemp := InputRegF(id_String:=reg_3x0709, RegValue:=Modbus_3x0701.Reg8, rMultiplier:=10.0);
	iTemp := InputRegF(id_String:=reg_3x0713, RegValue:=Modbus_3x0701.Reg12, rMultiplier:=1.0);
	iTemp := InputRegF(id_String:=reg_3x0714, RegValue:=Modbus_3x0701.Reg13, rMultiplier:=1.0);
END_IF;

(* Input, Start 800, Count 15 *)
Modbus_3x0801(Send:=0, Port:=iPort, Module:=iModule, StartRegister:=800, RegisterType:=INPUT);
IF Modbus_3x0801.Datavalid = 1 THEN
	iTemp := InputRegF(id_String:=reg_3x0801, RegValue:=Modbus_3x0801.Reg0, rMultiplier:=1.0);
	udiTemp := DoubleInputRegF(id_String:=reg_3x0802, HighRegValue:=Modbus_3x0801.Reg2, LowRegValue:=Modbus_3x0801.Reg1, rMultiplier:=1.0);
	iTemp := InputRegF(id_String:=reg_3x0804, RegValue:=Modbus_3x0801.Reg3, rMultiplier:=1.0);
	iTemp := InputRegF(id_String:=reg_3x0805, RegValue:=Modbus_3x0801.Reg4, rMultiplier:=10.0);
	iTemp := InputRegF(id_String:=reg_3x0806, RegValue:=Modbus_3x0801.Reg5, rMultiplier:=1.0);
	iTemp := InputRegF(id_String:=reg_3x0807, RegValue:=Modbus_3x0801.Reg6, rMultiplier:=1.0);
	iTemp := InputRegF(id_String:=reg_3x0808, RegValue:=Modbus_3x0801.Reg7, rMultiplier:=1.0);
	udiTemp := DoubleInputRegF(id_String:=reg_3x0809, HighRegValue:=Modbus_3x0801.Reg9, LowRegValue:=Modbus_3x0801.Reg8, rMultiplier:=1.0);
	iTemp := InputRegF(id_String:=reg_3x0811, RegValue:=Modbus_3x0801.Reg10, rMultiplier:=1.0);
	(* Empty 812-814*)
	iTemp := InputRegF(id_String:=reg_3x0815, RegValue:=Modbus_3x0801.Reg14, rMultiplier:=10.0);
END_IF;

(* Input, Start 900, Count 8 *)
Modbus_3x0901(Send:=0, Port:=iPort, Module:=iModule, StartRegister:=900, RegisterType:=INPUT);
IF Modbus_3x0901.Datavalid = 1 THEN
	iTemp := InputRegF(id_String:=reg_3x0901, RegValue:=Modbus_3x0901.Reg0, rMultiplier:=10.0);
	iTemp := InputRegF(id_String:=reg_3x0902, RegValue:=Modbus_3x0901.Reg1, rMultiplier:=10.0);
	iTemp := InputRegF(id_String:=reg_3x0903, RegValue:=Modbus_3x0901.Reg2, rMultiplier:=1.0);
	iTemp := InputRegF(id_String:=reg_3x0904, RegValue:=Modbus_3x0901.Reg3, rMultiplier:=1.0);
	iTemp := InputRegF(id_String:=reg_3x0905, RegValue:=Modbus_3x0901.Reg4, rMultiplier:=10.0);
	iTemp := InputRegF(id_String:=reg_3x0906, RegValue:=Modbus_3x0901.Reg5, rMultiplier:=10.0);
	(* Empty 907 *)
	iTemp := InputRegF(id_String:=reg_3x0908, RegValue:=Modbus_3x0901.Reg7, rMultiplier:=10.0);
END_IF;

(* Input, Start 1000, Count 5 *)
Modbus_3x1001(Send:=0, Port:=iPort, Module:=iModule, StartRegister:=1000, RegisterType:=INPUT);
IF Modbus_3x1001.Datavalid = 1 THEN
	iTemp := InputRegF(id_String:=reg_3x1001, RegValue:=Modbus_3x1001.Reg0, rMultiplier:=1.0);
	iTemp := InputRegF(id_String:=reg_3x1002, RegValue:=Modbus_3x1001.Reg1, rMultiplier:=10.0);
	iTemp := InputRegF(id_String:=reg_3x1003, RegValue:=Modbus_3x1001.Reg2, rMultiplier:=10.0);
	iTemp := InputRegF(id_String:=reg_3x1004, RegValue:=Modbus_3x1001.Reg3, rMultiplier:=10.0);
	iTemp := InputRegF(id_String:=reg_3x1005, RegValue:=Modbus_3x1001.Reg4, rMultiplier:=1.0);
END_IF;

(* Input, Start 1100, Count 11 *)
Modbus_3x1101(Send:=0, Port:=iPort, Module:=iModule, StartRegister:=1100, RegisterType:=INPUT);
IF Modbus_3x1101.Datavalid = 1 THEN
	iTemp := InputRegF(id_String:=reg_3x1101, RegValue:=Modbus_3x1101.Reg0, rMultiplier:=1.0);
	
	IF Modbus_3x1101.Reg0 = 2 THEN
		iTemp := setDigitalPointF(1, 1, reg_3x1101b);
	ELSE
		iTemp := setDigitalPointF(0, 1, reg_3x1101b);
	END_IF;
	
	iTemp := InputRegF(id_String:=reg_3x1102, RegValue:=Modbus_3x1101.Reg1, rMultiplier:=10.0);
	iTemp := InputRegF(id_String:=reg_3x1103, RegValue:=Modbus_3x1101.Reg2, rMultiplier:=10.0);
	iTemp := InputRegF(id_String:=reg_3x1104, RegValue:=Modbus_3x1101.Reg3, rMultiplier:=10.0);
	iTemp := InputRegF(id_String:=reg_3x1105, RegValue:=Modbus_3x1101.Reg4, rMultiplier:=10.0);
	(* Empty 1106-1108*)
	iTemp := InputRegF(id_String:=reg_3x1109, RegValue:=Modbus_3x1101.Reg8, rMultiplier:=1.0);
	udiTemp := DoubleInputRegF(id_String:=reg_3x1110, HighRegValue:=Modbus_3x1101.Reg10, LowRegValue:=Modbus_3x1101.Reg9, rMultiplier:=1.0);
END_IF;

(* Input, Start 1115, Count 9 *)
Modbus_3x1116(Send:=0, Port:=iPort, Module:=iModule, StartRegister:=1115, RegisterType:=INPUT);
IF Modbus_3x1116.Datavalid = 1 THEN
	iTemp := InputRegF(id_String:=reg_3x1116, RegValue:=Modbus_3x1116.Reg0, rMultiplier:=1.0);
	iTemp := InputRegF(id_String:=reg_3x1118, RegValue:=Modbus_3x1116.Reg2, rMultiplier:=1.0);
	udiTemp := DoubleInputRegF(id_String:=reg_3x1119, HighRegValue:=Modbus_3x1116.Reg4, LowRegValue:=Modbus_3x1116.Reg3, rMultiplier:=1.0);
	iTemp := InputRegF(id_String:=reg_3x1121, RegValue:=Modbus_3x1116.Reg5, rMultiplier:=10.0);
	iTemp := InputRegF(id_String:=reg_3x1122, RegValue:=Modbus_3x1116.Reg6, rMultiplier:=1.0);
	udiTemp := DoubleInputRegF(id_String:=reg_3x1123, HighRegValue:=Modbus_3x1116.Reg8, LowRegValue:=Modbus_3x1116.Reg7, rMultiplier:=1.0);
END_IF;

(* Input, Start 1200, Count 10 *)
Modbus_3x1201(Send:=0, Port:=iPort, Module:=iModule, StartRegister:=1200, RegisterType:=INPUT);
IF Modbus_3x1201.Datavalid = 1 THEN
	iTemp := InputRegF(id_String:=reg_3x1201, RegValue:=Modbus_3x1201.Reg0, rMultiplier:=10.0);
	iTemp := InputRegF(id_String:=reg_3x1202, RegValue:=Modbus_3x1201.Reg1, rMultiplier:=10.0);
	iTemp := InputRegF(id_String:=reg_3x1203, RegValue:=Modbus_3x1201.Reg2, rMultiplier:=1.0);
	iTemp := InputRegF(id_String:=reg_3x1204, RegValue:=Modbus_3x1201.Reg3, rMultiplier:=1.0);
	iTemp := InputRegF(id_String:=reg_3x1205, RegValue:=Modbus_3x1201.Reg4, rMultiplier:=10.0);
	iTemp := InputRegF(id_String:=reg_3x1206, RegValue:=Modbus_3x1201.Reg5, rMultiplier:=10.0);
	iTemp := InputRegF(id_String:=reg_3x1207, RegValue:=Modbus_3x1201.Reg6, rMultiplier:=10.0);
	iTemp := InputRegF(id_String:=reg_3x1208, RegValue:=Modbus_3x1201.Reg7, rMultiplier:=10.0);
	iTemp := InputRegF(id_String:=reg_3x1209, RegValue:=Modbus_3x1201.Reg8, rMultiplier:=1.0);
	iTemp := InputRegF(id_String:=reg_3x1210, RegValue:=Modbus_3x1201.Reg9, rMultiplier:=1.0);
END_IF;

(* Input, Start 1210, Count 10 *)
Modbus_3x1211(Send:=0, Port:=iPort, Module:=iModule, StartRegister:=1210, RegisterType:=INPUT);
IF Modbus_3x1211.Datavalid = 1 THEN
	iTemp := InputRegF(id_String:=reg_3x1211, RegValue:=Modbus_3x1211.Reg0, rMultiplier:=1.0);
	iTemp := InputRegF(id_String:=reg_3x1212, RegValue:=Modbus_3x1211.Reg1, rMultiplier:=1.0);
	iTemp := InputRegF(id_String:=reg_3x1213, RegValue:=Modbus_3x1211.Reg2, rMultiplier:=1.0);
	iTemp := InputRegF(id_String:=reg_3x1214, RegValue:=Modbus_3x1211.Reg3, rMultiplier:=1.0);
	iTemp := InputRegF(id_String:=reg_3x1215, RegValue:=Modbus_3x1211.Reg4, rMultiplier:=1.0);
	iTemp := InputRegF(id_String:=reg_3x1216, RegValue:=Modbus_3x1211.Reg5, rMultiplier:=1.0);
	(* Empty 1217-1219*)
	iTemp := InputRegF(id_String:=reg_3x1220, RegValue:=Modbus_3x1211.Reg9, rMultiplier:=1.0);
END_IF;

(* Input, Start 1250, Count 18 *)
Modbus_3x1251(Send:=0, Port:=iPort, Module:=iModule, StartRegister:=1250, RegisterType:=INPUT);
IF Modbus_3x1251.Datavalid = 1 THEN
	iTemp := InputRegF(id_String:=reg_3x1251, RegValue:=Modbus_3x1251.Reg0, rMultiplier:=1.0);
	iTemp := InputRegF(id_String:=reg_3x1252, RegValue:=Modbus_3x1251.Reg1, rMultiplier:=1.0);
	iTemp := InputRegF(id_String:=reg_3x1253, RegValue:=Modbus_3x1251.Reg2, rMultiplier:=1.0);
	iTemp := InputRegF(id_String:=reg_3x1254, RegValue:=Modbus_3x1251.Reg3, rMultiplier:=10.0);
	iTemp := InputRegF(id_String:=reg_3x1255, RegValue:=Modbus_3x1251.Reg4, rMultiplier:=10.0);
	iTemp := InputRegF(id_String:=reg_3x1256, RegValue:=Modbus_3x1251.Reg5, rMultiplier:=10.0);
	iTemp := InputRegF(id_String:=reg_3x1257, RegValue:=Modbus_3x1251.Reg6, rMultiplier:=1.0);
	iTemp := InputRegF(id_String:=reg_3x1258, RegValue:=Modbus_3x1251.Reg7, rMultiplier:=1.0);
	iTemp := InputRegF(id_String:=reg_3x1259, RegValue:=Modbus_3x1251.Reg8, rMultiplier:=1.0);
	iTemp := InputRegF(id_String:=reg_3x1260, RegValue:=Modbus_3x1251.Reg9, rMultiplier:=10.0);
	iTemp := InputRegF(id_String:=reg_3x1261, RegValue:=Modbus_3x1251.Reg10, rMultiplier:=10.0);
	iTemp := InputRegF(id_String:=reg_3x1262, RegValue:=Modbus_3x1251.Reg11, rMultiplier:=10.0);
	iTemp := InputRegF(id_String:=reg_3x1263, RegValue:=Modbus_3x1251.Reg12, rMultiplier:=10.0);
	iTemp := InputRegF(id_String:=reg_3x1264, RegValue:=Modbus_3x1251.Reg13, rMultiplier:=10.0);
	iTemp := InputRegF(id_String:=reg_3x1265, RegValue:=Modbus_3x1251.Reg14, rMultiplier:=1.0);
	iTemp := InputRegF(id_String:=reg_3x1266, RegValue:=Modbus_3x1251.Reg15, rMultiplier:=10.0);
	iTemp := InputRegF(id_String:=reg_3x1267, RegValue:=Modbus_3x1251.Reg16, rMultiplier:=1.0);
	iTemp := InputRegF(id_String:=reg_3x1268, RegValue:=Modbus_3x1251.Reg17, rMultiplier:=1.0);
END_IF;



(* 
| Force 	| ReleaseOverride 	| Käyttötarkoitus
----------------------------------------------------------------------------------------------------------
| False  	| True             	| Paikallinen arvo oletuksena. Käsiasetus ylikirjoittaa väliaikaisesti. Paikallinen muutos ylikirjoittaa käsiasetuksen.
| False  	| False            	| Paikallinen arvo oletuksena. Käsiasetus ylikirjoittaa siihen asti, että piste vapautetaan automaatille.
| True   	| True             	| Ala-aseman arvo oletuksena. Ei voi muuttaa käsin, jos ohjelma kirjoittaa arvoa, koska piste palautuu aina automaatille.
| True   	| False            	| Ala-aseman arvo oletuksena. Käsiasetus ylikirjoittaa siihen asti, että piste vapautetaan automaatille.
*)

bSuoraVAKOhjaus := (LEN(reg_4x0103) < 1) AND (LEN(reg_4x0103b) > 1); (* %-asetusarvolle ei määritetty pistetunnusta, 0/1/2 ohjaukselle on *)

tonJatkuvaKirjoitus.IN := (NOT tonJatkuvaKirjoitus.Q);
tonJatkuvaKirjoitus.PT := T#30s;
tonJatkuvaKirjoitus();

(* Holding, Start 100, Count 11 *)
Modbus_4x0101(Send:=0, Port:=iPort, Module:=iModule, StartRegister:=100, RegisterType:=HOLDING);
IF Modbus_4x0101.Datavalid = 1 THEN

	Modbus_4x0101.Reg0 	:= HoldingRegF_3(id_string:=reg_4x0101, RegValue:=Modbus_4x0101.Reg0, rMultiplier:=1.0, Force:=False, ReleaseOverride:=True); (* Lämpöpumpun hätäseis *) 

	
	IF bSuoraVAKOhjaus THEN
		Modbus_4x0101.Reg1 	:= 1; (* Latauspiirin aktivointi aina päällä *) 
		
		
		(* 0/1/2 ohjauksen toteutus Taurus EVI:lle *)
		(*
			0% = laite on SEIS-tilassa
			5% = latauspumppu (Q9) sammuu
			15% = latauspumppu (Q9) käynnistyy
			20% = lämmönpyyntö 0%
			60% = lämmönpyyntö 50% -> ensimmäinen kompressori käynnistyy
			100% = lämmönpyyntö 100% -> toinen kompressori käynnistyy
			
			Toinen kompressori sammuu, kun kapasiteetti laskee 50%
			Ensimmäinen kompressori sammuu, kun kapasiteetti laskee 0%.
		*)
		iOnOffOhjaus 	:= getDigitalPointF(reg_4x0103b);
		iKomp1Tila		:= getDigitalPointF(reg_3x0310);
		iKomp2Tila		:= getDigitalPointF(reg_3x0315);
		iKompMaara		:= iKomp1Tila + iKomp2Tila;
		
		IF iOnOffOhjaus = 2 THEN
			Modbus_4x0101.Reg2 := 100; (* 2 kompressoria  käyntiin / pidetään käynnissä *)
			iTemp := setAnalogPointF(100.0, 1, prosenttiAs);
			
		ELSIF iOnOffOhjaus = 1 AND iKompMaara = 2 THEN
			Modbus_4x0101.Reg2 := 40;  (* Kaksi käy, halutaan yksi => pysäytetään toinen kompressoreista *)
			iTemp := setAnalogPointF(40.0, 1, prosenttiAs);
		ELSIF iOnOffOhjaus = 1 THEN
			Modbus_4x0101.Reg2 := 70; (* 0-1 käy, halutaan yksi => käynnistetään toinen kompressoreista *)
			iTemp := setAnalogPointF(70.0, 1, prosenttiAs);
		ELSIF iOnOffOhjaus = 10 THEN
			Modbus_4x0101.Reg2 := 18; (* Latauspumppu päälle *)
			iTemp := setAnalogPointF(18.0, 1, prosenttiAs);
		ELSIF iOnOffOhjaus = 0 THEN
			Modbus_4x0101.Reg2 := 0; (* Seis *)
			iTemp := setAnalogPointF(0.0, 1, prosenttiAs);
		END_IF;
		
	ELSE (* Normaali väyläkirjoitus *)
		
		Modbus_4x0101.Reg1 	:= HoldingRegF_3(id_string:=reg_4x0102, RegValue:=Modbus_4x0101.Reg1, rMultiplier:=1.0, Force:=False, ReleaseOverride:=True); (* Latauspiirin aktivointi *) 
		Modbus_4x0101.Reg2 	:= HoldingRegF_3(id_string:=reg_4x0103, RegValue:=Modbus_4x0101.Reg2, rMultiplier:=1.0, Force:=True, ReleaseOverride:=False); (* Lämpöpumpun asetusarvo % *)
	
	
	END_IF;
	
	Modbus_4x0101.Reg3 	:= HoldingRegF_3(id_string:=reg_4x0104, RegValue:=Modbus_4x0101.Reg3, rMultiplier:=10.0, Force:=True, ReleaseOverride:=False); (* Lämpöpumpun asetusarvo °C *) 
	Modbus_4x0101.Reg4 	:= HoldingRegF_3(id_string:=reg_4x0105, RegValue:=Modbus_4x0101.Reg4, rMultiplier:=1.0, Force:=False, ReleaseOverride:=True); (* Lämpöpumpun käyttötapa *) 
	Modbus_4x0101.Reg5 	:= HoldingRegF_3(id_string:=reg_4x0106, RegValue:=Modbus_4x0101.Reg5, rMultiplier:=1.0, Force:=False, ReleaseOverride:=True); (* Ulkoinen vapaa jäähdytys *) 
	Modbus_4x0101.Reg10 := HoldingRegF_3(id_string:=reg_4x0111, RegValue:=Modbus_4x0101.Reg10, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Lämpöpumpun kytkentäero *) 
	
	IF bSuoraVAKOhjaus AND tonJatkuvaKirjoitus.Q THEN
		Modbus_4x0101(Send:=1); (* Kirjoitetaan 30s välein, vaikka arvot ei olisi muuttuneet (tarvitaan latauspiirin aktivoinnin toimimiseksi) *)
	ELSE
		Modbus_4x0101(Send:=2); (* Kirjoitetaan vain, jos arvot ovat muuttuneet *)
	END_IF;
	
END_IF;



(* Holding, Start 203, Count 7 *)
Modbus_4x0204(Send:=0, Port:=iPort, Module:=iModule, StartRegister:=203, RegisterType:=HOLDING);
IF Modbus_4x0204.Datavalid = 1 THEN
	Modbus_4x0204.Reg0 := HoldingRegF_3(id_string:=reg_4x0204, RegValue:=Modbus_4x0204.Reg0, rMultiplier:=1.0, Force:=False, ReleaseOverride:=True); (* Latauspumpun minimi nopeus *) 
	Modbus_4x0204.Reg2 := HoldingRegF_3(id_string:=reg_4x0206, RegValue:=Modbus_4x0204.Reg2, rMultiplier:=1.0, Force:=False, ReleaseOverride:=True); (* Latauspumpun maksiminopeus *) 
	Modbus_4x0204.Reg4 := HoldingRegF_3(id_string:=reg_4x0208, RegValue:=Modbus_4x0204.Reg4, rMultiplier:=10.0, Force:=True, ReleaseOverride:=False); (* Latauspiirin lämpötilaeron asetusarvo (dT) *) 
	Modbus_4x0204.Reg6 := HoldingRegF_3(id_string:=reg_4x0210, RegValue:=Modbus_4x0204.Reg6, rMultiplier:=1.0, Force:=False, ReleaseOverride:=True); (* Keruupiirin lämpötilan asetusarvo *) 
	Modbus_4x0204(Send:=2);
END_IF;


(* Holding, Start 330, Count 5 *)
Modbus_4x0331(Send:=0, Port:=iPort, Module:=iModule, StartRegister:=330, RegisterType:=HOLDING);
IF Modbus_4x0331.Datavalid = 1 THEN
	Modbus_4x0331.Reg0 := HoldingRegF_3(id_string:=reg_4x0331, RegValue:=Modbus_4x0331.Reg0, rMultiplier:=1.0, Force:=False, ReleaseOverride:=True); (* Keruupumpun minimi nopeus *) 
	Modbus_4x0331.Reg2 := HoldingRegF_3(id_string:=reg_4x0333, RegValue:=Modbus_4x0331.Reg2, rMultiplier:=1.0, Force:=False, ReleaseOverride:=True); (* Keruupumpun maksimi nopeus *) 
	Modbus_4x0331.Reg4 := HoldingRegF_3(id_string:=reg_4x0335, RegValue:=Modbus_4x0331.Reg4, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Keruupiirin lämpötilaeron asetusarvo (dT) *) 
	Modbus_4x0331(Send:=2);
END_IF;

(* Holding, Start 500, Count 16 *)
Modbus_4x0501(Send:=0, Port:=iPort, Module:=iModule, StartRegister:=500, RegisterType:=HOLDING);
IF Modbus_4x0501.Datavalid = 1 THEN
	Modbus_4x0501.Reg0 := HoldingRegF_3(id_string:=reg_4x0501, RegValue:=Modbus_4x0501.Reg0, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Mukavuus asetusarvo *) 
	Modbus_4x0501.Reg1 := HoldingRegF_3(id_string:=reg_4x0502, RegValue:=Modbus_4x0501.Reg1, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Alennettu asetusarvo *) 
	Modbus_4x0501.Reg2 := HoldingRegF_3(id_string:=reg_4x0503, RegValue:=Modbus_4x0501.Reg2, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Suojaus asetusarvo *) 
	Modbus_4x0501.Reg3 := HoldingRegF_3(id_string:=reg_4x0504, RegValue:=Modbus_4x0501.Reg3, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Menoveden minimi asetusarvo *) 
	Modbus_4x0501.Reg4 := HoldingRegF_3(id_string:=reg_4x0505, RegValue:=Modbus_4x0501.Reg4, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Menoveden maksimi asetusarvo *) 
	Modbus_4x0501.Reg5 := HoldingRegF_3(id_string:=reg_4x0506, RegValue:=Modbus_4x0501.Reg5, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Kesä/talvi ulkolämpötilaasetusarvo *) 
	Modbus_4x0501.Reg6 := HoldingRegF_3(id_string:=reg_4x0507, RegValue:=Modbus_4x0501.Reg6, rMultiplier:=1.0, Force:=False, ReleaseOverride:=True); (* Kesä/talvi aikavakio *) 
	Modbus_4x0501.Reg7 := HoldingRegF_3(id_string:=reg_4x0508, RegValue:=Modbus_4x0501.Reg7, rMultiplier:=1.0, Force:=False, ReleaseOverride:=True); (* Kesä/talvi tila *) 
	Modbus_4x0501.Reg8 := HoldingRegF_3(id_string:=reg_4x0509, RegValue:=Modbus_4x0501.Reg8, rMultiplier:=1.0, Force:=False, ReleaseOverride:=True); (* Rakennuksen aikavakio *) 
	Modbus_4x0501.Reg10 := HoldingRegF_3(id_string:=reg_4x0511, RegValue:=Modbus_4x0501.Reg10, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Lämpökäyrä – UlkolämpötilaX1 (alin) *) 
	Modbus_4x0501.Reg11 := HoldingRegF_3(id_string:=reg_4x0512, RegValue:=Modbus_4x0501.Reg11, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Lämpökäyrä – Menovesi Y1 *) 
	Modbus_4x0501.Reg12 := HoldingRegF_3(id_string:=reg_4x0513, RegValue:=Modbus_4x0501.Reg12, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Lämpökäyrä – UlkolämpötilaX2 *) 
	Modbus_4x0501.Reg13 := HoldingRegF_3(id_string:=reg_4x0514, RegValue:=Modbus_4x0501.Reg13, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Lämpökäyrä – Menovesi X2 *) 
	Modbus_4x0501.Reg14 := HoldingRegF_3(id_string:=reg_4x0515, RegValue:=Modbus_4x0501.Reg14, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Lämpökäyrä – UlkolämpötilaX3 *) 
	Modbus_4x0501.Reg15 := HoldingRegF_3(id_string:=reg_4x0516, RegValue:=Modbus_4x0501.Reg15, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Lämpökäyrä – Menovesi X3 *) 
	Modbus_4x0501(Send:=2);
END_IF;

(* Holding, Start 516, Count 19 *)
Modbus_4x0517(Send:=0, Port:=iPort, Module:=iModule, StartRegister:=516, RegisterType:=HOLDING);
IF Modbus_4x0517.Datavalid = 1 THEN
	Modbus_4x0517.Reg0 := HoldingRegF_3(id_string:=reg_4x0517, RegValue:=Modbus_4x0517.Reg0, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Lämpökäyrä – UlkolämpötilaX4 *) 
	Modbus_4x0517.Reg1 := HoldingRegF_3(id_string:=reg_4x0518, RegValue:=Modbus_4x0517.Reg1, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Lämpökäyrä – Menovesi X4 *) 
	Modbus_4x0517.Reg2 := HoldingRegF_3(id_string:=reg_4x0519, RegValue:=Modbus_4x0517.Reg2, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Lämpökäyrä – UlkolämpötilaX5 (ylin) *) 
	Modbus_4x0517.Reg3 := HoldingRegF_3(id_string:=reg_4x0520, RegValue:=Modbus_4x0517.Reg3, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Lämpökäyrä – Menovesi Y5 *) 
	Modbus_4x0517.Reg4 := HoldingRegF_3(id_string:=reg_4x0521, RegValue:=Modbus_4x0517.Reg4, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Suuntaissiirto *) 
	Modbus_4x0517.Reg5 := HoldingRegF_3(id_string:=reg_4x0522, RegValue:=Modbus_4x0517.Reg5, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Menoveden asetusarvo *) 
	Modbus_4x0517.Reg6 := HoldingRegF_3(id_string:=reg_4x0523, RegValue:=Modbus_4x0517.Reg6, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Normaali asetusarvo *) 
	Modbus_4x0517.Reg7 := HoldingRegF_3(id_string:=reg_4x0524, RegValue:=Modbus_4x0517.Reg7, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Jäähdytyskäyrä – Ulkolämpötila X1 (alin) *) 
	Modbus_4x0517.Reg8 := HoldingRegF_3(id_string:=reg_4x0525, RegValue:=Modbus_4x0517.Reg8, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Jäähdytyskäyrä – Menovesi Y1 *) 
	Modbus_4x0517.Reg9 := HoldingRegF_3(id_string:=reg_4x0526, RegValue:=Modbus_4x0517.Reg9, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Jäähdytyskäyrä –Ulkolämpötila X2 *) 
	Modbus_4x0517.Reg10 := HoldingRegF_3(id_string:=reg_4x0527, RegValue:=Modbus_4x0517.Reg10, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Jäähdytyskäyrä – Menovesi X2 *) 
	Modbus_4x0517.Reg11 := HoldingRegF_3(id_string:=reg_4x0528, RegValue:=Modbus_4x0517.Reg11, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Jäähdytyskäyrä – Ulkolämpötila X3 *) 
	Modbus_4x0517.Reg12 := HoldingRegF_3(id_string:=reg_4x0529, RegValue:=Modbus_4x0517.Reg12, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Jäähdytyskäyrä – Menovesi X3 *) 
	Modbus_4x0517.Reg13 := HoldingRegF_3(id_string:=reg_4x0530, RegValue:=Modbus_4x0517.Reg13, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Jäähdytyskäyrä – Ulkolämpötila X4 *) 
	Modbus_4x0517.Reg14 := HoldingRegF_3(id_string:=reg_4x0531, RegValue:=Modbus_4x0517.Reg14, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Jäähdytyskäyrä – Menovesi X4 *) 
	Modbus_4x0517.Reg15 := HoldingRegF_3(id_string:=reg_4x0532, RegValue:=Modbus_4x0517.Reg15, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Jäähdytyskäyrä –Ulkolämpötila X5 (ylin) *) 
	Modbus_4x0517.Reg16 := HoldingRegF_3(id_string:=reg_4x0533, RegValue:=Modbus_4x0517.Reg16, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Jäähdytyskäyrä – Menovesi Y5 *) 
	Modbus_4x0517.Reg17 := HoldingRegF_3(id_string:=reg_4x0534, RegValue:=Modbus_4x0517.Reg17, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Kesä/talvi ulkolämpötilaasetusarvo - Jäähdytys *) 
	Modbus_4x0517.Reg18 := HoldingRegF_3(id_string:=reg_4x0535, RegValue:=Modbus_4x0517.Reg18, rMultiplier:=1.0, Force:=False, ReleaseOverride:=True); (* Kesä/talvi tila - Jäähdytys *) 
	Modbus_4x0517(Send:=2);
END_IF;

(* Holding, Start 600, Count 16 *)
Modbus_4x0601(Send:=0, Port:=iPort, Module:=iModule, StartRegister:=600, RegisterType:=HOLDING);
IF Modbus_4x0601.Datavalid = 1 THEN
	Modbus_4x0601.Reg0 := HoldingRegF_3(id_string:=reg_4x0601, RegValue:=Modbus_4x0601.Reg0, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Mukavuus asetusarvo *) 
	Modbus_4x0601.Reg1 := HoldingRegF_3(id_string:=reg_4x0602, RegValue:=Modbus_4x0601.Reg1, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Alennettu asetusarvo *) 
	Modbus_4x0601.Reg2 := HoldingRegF_3(id_string:=reg_4x0603, RegValue:=Modbus_4x0601.Reg2, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Suojaus asetusarvo *) 
	Modbus_4x0601.Reg3 := HoldingRegF_3(id_string:=reg_4x0604, RegValue:=Modbus_4x0601.Reg3, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Menoveden minimi asetusarvo *) 
	Modbus_4x0601.Reg4 := HoldingRegF_3(id_string:=reg_4x0605, RegValue:=Modbus_4x0601.Reg4, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Menoveden maksimiasetusarvo *) 
	Modbus_4x0601.Reg5 := HoldingRegF_3(id_string:=reg_4x0606, RegValue:=Modbus_4x0601.Reg5, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Kesä/talvi ulkolämpötilaasetusarvo *) 
	Modbus_4x0601.Reg6 := HoldingRegF_3(id_string:=reg_4x0607, RegValue:=Modbus_4x0601.Reg6, rMultiplier:=1.0, Force:=False, ReleaseOverride:=True); (* Kesä/talvi aikavakio *) 
	Modbus_4x0601.Reg7 := HoldingRegF_3(id_string:=reg_4x0608, RegValue:=Modbus_4x0601.Reg7, rMultiplier:=1.0, Force:=False, ReleaseOverride:=True); (* Kesä/talvi tila *) 
	Modbus_4x0601.Reg8 := HoldingRegF_3(id_string:=reg_4x0609, RegValue:=Modbus_4x0601.Reg8, rMultiplier:=1.0, Force:=False, ReleaseOverride:=True); (* Rakennuksen aikavakio *) 
	Modbus_4x0601.Reg10 := HoldingRegF_3(id_string:=reg_4x0611, RegValue:=Modbus_4x0601.Reg10, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Lämpökäyrä – UlkolämpötilaX1 (alin) *) 
	Modbus_4x0601.Reg11 := HoldingRegF_3(id_string:=reg_4x0612, RegValue:=Modbus_4x0601.Reg11, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Lämpökäyrä – Menovesi Y1 *) 
	Modbus_4x0601.Reg12 := HoldingRegF_3(id_string:=reg_4x0613, RegValue:=Modbus_4x0601.Reg12, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Lämpökäyrä – UlkolämpötilaX2 *) 
	Modbus_4x0601.Reg13 := HoldingRegF_3(id_string:=reg_4x0614, RegValue:=Modbus_4x0601.Reg13, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Lämpökäyrä – Menovesi X2 *) 
	Modbus_4x0601.Reg14 := HoldingRegF_3(id_string:=reg_4x0615, RegValue:=Modbus_4x0601.Reg14, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Lämpökäyrä – UlkolämpötilaX3 *) 
	Modbus_4x0601.Reg15 := HoldingRegF_3(id_string:=reg_4x0616, RegValue:=Modbus_4x0601.Reg15, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Lämpökäyrä – Menovesi X3 *) 
	Modbus_4x0601(Send:=2);
END_IF;

(* Holding, Start 616, Count 19 *)
Modbus_4x0617(Send:=0, Port:=iPort, Module:=iModule, StartRegister:=616, RegisterType:=HOLDING);
IF Modbus_4x0617.Datavalid = 1 THEN
	Modbus_4x0617.Reg0 := HoldingRegF_3(id_string:=reg_4x0617, RegValue:=Modbus_4x0617.Reg0, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Lämpökäyrä – UlkolämpötilaX4 *) 
	Modbus_4x0617.Reg1 := HoldingRegF_3(id_string:=reg_4x0618, RegValue:=Modbus_4x0617.Reg1, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Lämpökäyrä – Menovesi X4 *) 
	Modbus_4x0617.Reg2 := HoldingRegF_3(id_string:=reg_4x0619, RegValue:=Modbus_4x0617.Reg2, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Lämpökäyrä – UlkolämpötilaX5 (ylin) *) 
	Modbus_4x0617.Reg3 := HoldingRegF_3(id_string:=reg_4x0620, RegValue:=Modbus_4x0617.Reg3, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Lämpökäyrä – Menovesi Y5 *) 
	Modbus_4x0617.Reg4 := HoldingRegF_3(id_string:=reg_4x0621, RegValue:=Modbus_4x0617.Reg4, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Suuntaissiirto *) 
	Modbus_4x0617.Reg5 := HoldingRegF_3(id_string:=reg_4x0622, RegValue:=Modbus_4x0617.Reg5, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Menoveden asetusarvo *) 
	Modbus_4x0617.Reg6 := HoldingRegF_3(id_string:=reg_4x0623, RegValue:=Modbus_4x0617.Reg6, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Normaali asetusarvo *) 
	Modbus_4x0617.Reg7 := HoldingRegF_3(id_string:=reg_4x0624, RegValue:=Modbus_4x0617.Reg7, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Jäähdytyskäyrä –Ulkolämpötila X1 (alin) *) 
	Modbus_4x0617.Reg8 := HoldingRegF_3(id_string:=reg_4x0625, RegValue:=Modbus_4x0617.Reg8, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Jäähdytyskäyrä – Menovesi Y1 *) 
	Modbus_4x0617.Reg9 := HoldingRegF_3(id_string:=reg_4x0626, RegValue:=Modbus_4x0617.Reg9, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Jäähdytyskäyrä –Ulkolämpötila X2 *) 
	Modbus_4x0617.Reg10 := HoldingRegF_3(id_string:=reg_4x0627, RegValue:=Modbus_4x0617.Reg10, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Jäähdytyskäyrä – Menovesi X2 *) 
	Modbus_4x0617.Reg11 := HoldingRegF_3(id_string:=reg_4x0628, RegValue:=Modbus_4x0617.Reg11, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Jäähdytyskäyrä –Ulkolämpötila X3 *) 
	Modbus_4x0617.Reg12 := HoldingRegF_3(id_string:=reg_4x0629, RegValue:=Modbus_4x0617.Reg12, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Jäähdytyskäyrä – Menovesi X3 *) 
	Modbus_4x0617.Reg13 := HoldingRegF_3(id_string:=reg_4x0630, RegValue:=Modbus_4x0617.Reg13, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Jäähdytyskäyrä –Ulkolämpötila X4 *) 
	Modbus_4x0617.Reg14 := HoldingRegF_3(id_string:=reg_4x0631, RegValue:=Modbus_4x0617.Reg14, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Jäähdytyskäyrä – Menovesi X4 *) 
	Modbus_4x0617.Reg15 := HoldingRegF_3(id_string:=reg_4x0632, RegValue:=Modbus_4x0617.Reg15, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Jäähdytyskäyrä –Ulkolämpötila X5 (ylin) *) 
	Modbus_4x0617.Reg16 := HoldingRegF_3(id_string:=reg_4x0633, RegValue:=Modbus_4x0617.Reg16, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Jäähdytyskäyrä – Menovesi Y5 *) 
	Modbus_4x0617.Reg17 := HoldingRegF_3(id_string:=reg_4x0634, RegValue:=Modbus_4x0617.Reg17, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Kesä/talvi ulkolämpötilaasetusarvo - Jäähdytys *) 
	Modbus_4x0617.Reg18 := HoldingRegF_3(id_string:=reg_4x0635, RegValue:=Modbus_4x0617.Reg18, rMultiplier:=1.0, Force:=False, ReleaseOverride:=True); (* Kesä/talvi tila - Jäähdytys *) 
	Modbus_4x0617(Send:=2);
END_IF;

(* Holding, Start 700, Count 12 *)
Modbus_4x0701(Send:=0, Port:=iPort, Module:=iModule, StartRegister:=700, RegisterType:=HOLDING);
IF Modbus_4x0701.Datavalid = 1 THEN
	Modbus_4x0701.Reg0 := HoldingRegF_3(id_string:=reg_4x0701, RegValue:=Modbus_4x0701.Reg0, rMultiplier:=1.0, Force:=False, ReleaseOverride:=True); (* Käyttövesi käyttötapa *) 
	Modbus_4x0701.Reg1 := HoldingRegF_3(id_string:=reg_4x0702, RegValue:=Modbus_4x0701.Reg1, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Käyttövesi asetusarvo -suojaus *) 
	Modbus_4x0701.Reg2 := HoldingRegF_3(id_string:=reg_4x0703, RegValue:=Modbus_4x0701.Reg2, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Käyttövesi asetusarvo -alennettu *) 
	Modbus_4x0701.Reg3 := HoldingRegF_3(id_string:=reg_4x0704, RegValue:=Modbus_4x0701.Reg3, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Käyttövesi asetusarvo -mukavuus *) 
	Modbus_4x0701.Reg4 := HoldingRegF_3(id_string:=reg_4x0705, RegValue:=Modbus_4x0701.Reg4, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Käyttövesi menovedenasetusarvo *) 
	Modbus_4x0701.Reg5 := HoldingRegF_3(id_string:=reg_4x0706, RegValue:=Modbus_4x0701.Reg5, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Käyttöveden lataus hystereesi *) 
	Modbus_4x0701.Reg6 := HoldingRegF_3(id_string:=reg_4x0707, RegValue:=Modbus_4x0701.Reg6, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Käyttöveden lataus as. arv.korotus *) 
	Modbus_4x0701.Reg7 := HoldingRegF_3(id_string:=reg_4x0708, RegValue:=Modbus_4x0701.Reg7, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Käyttövesivaraajan lämpötila (ala-anturi) VAK:sta. Katso 7) *) 
	Modbus_4x0701.Reg8 := HoldingRegF_3(id_string:=reg_4x0709, RegValue:=Modbus_4x0701.Reg8, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Käyttövesivaraajan lämpötila (ylä-anturi) VAK:sta. Katso 7) *) 
	Modbus_4x0701.Reg10 := HoldingRegF_3(id_string:=reg_4x0711, RegValue:=Modbus_4x0701.Reg10, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Varaajan alaosan lämpötila VAK:sta. Katso 7) *) 
	Modbus_4x0701.Reg11 := HoldingRegF_3(id_string:=reg_4x0712, RegValue:=Modbus_4x0701.Reg11, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Käyttövesi asetusarvo - normaali *) 
	Modbus_4x0701(Send:=2);
END_IF;

(* Holding, Start 900, Count 2 *)
Modbus_4x0901(Send:=0, Port:=iPort, Module:=iModule, StartRegister:=900, RegisterType:=HOLDING);
IF Modbus_4x0901.Datavalid = 1 THEN
	Modbus_4x0901.Reg0 := HoldingRegF_3(id_string:=reg_4x0901, RegValue:=Modbus_4x0901.Reg0, rMultiplier:=10.0, Force:=True, ReleaseOverride:=False); (* Kaskadi menoveden lämpötilaVAK:sta. Katso 7) *) 
	Modbus_4x0901.Reg1 := HoldingRegF_3(id_string:=reg_4x0902, RegValue:=Modbus_4x0901.Reg1, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Ulkolämpötila VAK:sta. Katso7) *) 
	Modbus_4x0901(Send:=2);
END_IF;

(* Holding, Start 1000, Count 17 *)
Modbus_4x1001(Send:=0, Port:=iPort, Module:=iModule, StartRegister:=1000, RegisterType:=HOLDING);
IF Modbus_4x1001.Datavalid = 1 THEN
	Modbus_4x1001.Reg0 := HoldingRegF_3(id_string:=reg_4x1001, RegValue:=Modbus_4x1001.Reg0, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Mukavuus asetusarvo *) 
	Modbus_4x1001.Reg1 := HoldingRegF_3(id_string:=reg_4x1002, RegValue:=Modbus_4x1001.Reg1, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Alennettu asetusarvo *) 
	Modbus_4x1001.Reg2 := HoldingRegF_3(id_string:=reg_4x1003, RegValue:=Modbus_4x1001.Reg2, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Suojaus asetusarvo *) 
	Modbus_4x1001.Reg3 := HoldingRegF_3(id_string:=reg_4x1004, RegValue:=Modbus_4x1001.Reg3, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Menoveden minimi asetusarvo *) 
	Modbus_4x1001.Reg4 := HoldingRegF_3(id_string:=reg_4x1005, RegValue:=Modbus_4x1001.Reg4, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Menoveden maksimiasetusarvo *) 
	Modbus_4x1001.Reg5 := HoldingRegF_3(id_string:=reg_4x1006, RegValue:=Modbus_4x1001.Reg5, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Kesä/talvi ulkolämpötilaasetusarvo *) 
	Modbus_4x1001.Reg6 := HoldingRegF_3(id_string:=reg_4x1007, RegValue:=Modbus_4x1001.Reg6, rMultiplier:=1.0, Force:=False, ReleaseOverride:=True); (* Kesä/talvi aikavakio *) 
	Modbus_4x1001.Reg7 := HoldingRegF_3(id_string:=reg_4x1008, RegValue:=Modbus_4x1001.Reg7, rMultiplier:=1.0, Force:=False, ReleaseOverride:=True); (* Kesä/talvi tila *) 
	Modbus_4x1001.Reg8 := HoldingRegF_3(id_string:=reg_4x1009, RegValue:=Modbus_4x1001.Reg8, rMultiplier:=1.0, Force:=False, ReleaseOverride:=True); (* Rakennuksen aikavakio *) 
	Modbus_4x1001.Reg10 := HoldingRegF_3(id_string:=reg_4x1011, RegValue:=Modbus_4x1001.Reg10, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Lämpökäyrä – UlkolämpötilaX1 (alin) *) 
	Modbus_4x1001.Reg11 := HoldingRegF_3(id_string:=reg_4x1012, RegValue:=Modbus_4x1001.Reg11, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Lämpökäyrä – Menovesi Y1 *) 
	Modbus_4x1001.Reg12 := HoldingRegF_3(id_string:=reg_4x1013, RegValue:=Modbus_4x1001.Reg12, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Lämpökäyrä – UlkolämpötilaX2 *) 
	Modbus_4x1001.Reg13 := HoldingRegF_3(id_string:=reg_4x1014, RegValue:=Modbus_4x1001.Reg13, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Lämpökäyrä – Menovesi X2 *) 
	Modbus_4x1001.Reg14 := HoldingRegF_3(id_string:=reg_4x1015, RegValue:=Modbus_4x1001.Reg14, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Lämpökäyrä – UlkolämpötilaX3 *) 
	Modbus_4x1001.Reg15 := HoldingRegF_3(id_string:=reg_4x1016, RegValue:=Modbus_4x1001.Reg15, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Lämpökäyrä – Menovesi X3 *) 
	Modbus_4x1001.Reg16 := HoldingRegF_3(id_string:=reg_4x1017, RegValue:=Modbus_4x1001.Reg16, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Lämpökäyrä – UlkolämpötilaX4 *) 
	Modbus_4x1001(Send:=2);
END_IF;

(* Holding, Start 1017, Count 18 *)
Modbus_4x1018(Send:=0, Port:=iPort, Module:=iModule, StartRegister:=1017, RegisterType:=HOLDING);
IF Modbus_4x1018.Datavalid = 1 THEN
	Modbus_4x1018.Reg0 := HoldingRegF_3(id_string:=reg_4x1018, RegValue:=Modbus_4x1018.Reg0, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Lämpökäyrä – Menovesi X4 *) 
	Modbus_4x1018.Reg1 := HoldingRegF_3(id_string:=reg_4x1019, RegValue:=Modbus_4x1018.Reg1, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Lämpökäyrä – UlkolämpötilaX5 (ylin) *) 
	Modbus_4x1018.Reg2 := HoldingRegF_3(id_string:=reg_4x1020, RegValue:=Modbus_4x1018.Reg2, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Lämpökäyrä – Menovesi Y5 *) 
	Modbus_4x1018.Reg3 := HoldingRegF_3(id_string:=reg_4x1021, RegValue:=Modbus_4x1018.Reg3, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Suuntaissiirto *) 
	Modbus_4x1018.Reg4 := HoldingRegF_3(id_string:=reg_4x1022, RegValue:=Modbus_4x1018.Reg4, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Menoveden asetusarvo *) 
	Modbus_4x1018.Reg5 := HoldingRegF_3(id_string:=reg_4x1023, RegValue:=Modbus_4x1018.Reg5, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Normaali asetusarvo *) 
	Modbus_4x1018.Reg6 := HoldingRegF_3(id_string:=reg_4x1024, RegValue:=Modbus_4x1018.Reg6, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Jäähdytyskäyrä – Ulkolämpötila X1 (alin) *) 
	Modbus_4x1018.Reg7 := HoldingRegF_3(id_string:=reg_4x1025, RegValue:=Modbus_4x1018.Reg7, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Jäähdytyskäyrä – Menovesi Y1 *) 
	Modbus_4x1018.Reg8 := HoldingRegF_3(id_string:=reg_4x1026, RegValue:=Modbus_4x1018.Reg8, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Jäähdytyskäyrä – Ulkolämpötila X2 *) 
	Modbus_4x1018.Reg9 := HoldingRegF_3(id_string:=reg_4x1027, RegValue:=Modbus_4x1018.Reg9, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Jäähdytyskäyrä – Menovesi X2 *) 
	Modbus_4x1018.Reg10 := HoldingRegF_3(id_string:=reg_4x1028, RegValue:=Modbus_4x1018.Reg10, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Jäähdytyskäyrä –Ulkolämpötila X3 *) 
	Modbus_4x1018.Reg11 := HoldingRegF_3(id_string:=reg_4x1029, RegValue:=Modbus_4x1018.Reg11, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Jäähdytyskäyrä – Menovesi X3 *) 
	Modbus_4x1018.Reg12 := HoldingRegF_3(id_string:=reg_4x1030, RegValue:=Modbus_4x1018.Reg12, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Jäähdytyskäyrä –Ulkolämpötila X4 *) 
	Modbus_4x1018.Reg13 := HoldingRegF_3(id_string:=reg_4x1031, RegValue:=Modbus_4x1018.Reg13, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Jäähdytyskäyrä – Menovesi X4 *) 
	Modbus_4x1018.Reg14 := HoldingRegF_3(id_string:=reg_4x1032, RegValue:=Modbus_4x1018.Reg14, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Jäähdytyskäyrä –Ulkolämpötila X5 (ylin) *) 
	Modbus_4x1018.Reg15 := HoldingRegF_3(id_string:=reg_4x1033, RegValue:=Modbus_4x1018.Reg15, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Jäähdytyskäyrä – Menovesi Y5 *) 
	Modbus_4x1018.Reg16 := HoldingRegF_3(id_string:=reg_4x1034, RegValue:=Modbus_4x1018.Reg16, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Kesä/talvi ulkolämpötilaasetusarvo - Jäähdytys *) 
	Modbus_4x1018.Reg17 := HoldingRegF_3(id_string:=reg_4x1035, RegValue:=Modbus_4x1018.Reg17, rMultiplier:=1.0, Force:=False, ReleaseOverride:=True); (* Kesä/talvi tila - Jäähdytys *) 
	Modbus_4x1018(Send:=2);
END_IF;

(* Holding, Start 1105, Count 19 *)
Modbus_4x1106(Send:=0, Port:=iPort, Module:=iModule, StartRegister:=1105, RegisterType:=HOLDING);
IF Modbus_4x1106.Datavalid = 1 THEN
	Modbus_4x1106.Reg0 := HoldingRegF_3(id_string:=reg_4x1106, RegValue:=Modbus_4x1106.Reg0, rMultiplier:=10.0, Force:=TRUE, ReleaseOverride:=TRUE); (* Tulistuspiiri as.arvo *) 
	Modbus_4x1106.Reg1 := HoldingRegF_3(id_string:=reg_4x1107, RegValue:=Modbus_4x1106.Reg1, rMultiplier:=10.0, Force:=TRUE, ReleaseOverride:=TRUE); (* Tulistuspiiri kytkentäero *) 
	Modbus_4x1106.Reg2 := HoldingRegF_3(id_string:=reg_4x1108, RegValue:=Modbus_4x1106.Reg2, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Käynnistyksen hystereesi *) 
	Modbus_4x1106.Reg6 := HoldingRegF_3(id_string:=reg_4x1112, RegValue:=Modbus_4x1106.Reg6, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Tulistuspumppu dT as. arvo *) 
	Modbus_4x1106.Reg7 := HoldingRegF_3(id_string:=reg_4x1113, RegValue:=Modbus_4x1106.Reg7, rMultiplier:=1.0, Force:=False, ReleaseOverride:=True); (* Tulistuspumppu min. nopeus *) 
	Modbus_4x1106.Reg8 := HoldingRegF_3(id_string:=reg_4x1114, RegValue:=Modbus_4x1106.Reg8, rMultiplier:=1.0, Force:=False, ReleaseOverride:=True); (* Tulistuspumppu maks. nopeus *) 
	Modbus_4x1106.Reg9 := HoldingRegF_3(id_string:=reg_4x1115, RegValue:=Modbus_4x1106.Reg9, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Tulistusvaraaja säh.vastusas.arvo *) 
	Modbus_4x1106.Reg18 := HoldingRegF_3(id_string:=reg_4x1124, RegValue:=Modbus_4x1106.Reg18, rMultiplier:=10.0, Force:=True, ReleaseOverride:=False); (* Varaajanlämpötila (VAK:sta)Katso 7) *) 
	Modbus_4x1106(Send:=2);
END_IF;

(* Holding, Start 1200, Count 16 *)
Modbus_4x1201(Send:=0, Port:=iPort, Module:=iModule, StartRegister:=1200, RegisterType:=HOLDING);
IF Modbus_4x1201.Datavalid = 1 THEN
	Modbus_4x1201.Reg0 := HoldingRegF_3(id_string:=reg_4x1201, RegValue:=Modbus_4x1201.Reg0, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Jäähdytyksen aktivointi *) 
	Modbus_4x1201.Reg1 := HoldingRegF_3(id_string:=reg_4x1202, RegValue:=Modbus_4x1201.Reg1, rMultiplier:=1.0, Force:=False, ReleaseOverride:=True); (* Jäähdytyksen as.arvo *) 
	Modbus_4x1201.Reg3 := HoldingRegF_3(id_string:=reg_4x1204, RegValue:=Modbus_4x1201.Reg3, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Aktiivijäähdytys - as.arvonkorjaus *) 
	Modbus_4x1201.Reg9 := HoldingRegF_3(id_string:=reg_4x1210, RegValue:=Modbus_4x1201.Reg9, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Lauhteenpurku - as.arvonkorjaus *) 
	Modbus_4x1201.Reg10 := HoldingRegF_3(id_string:=reg_4x1211, RegValue:=Modbus_4x1201.Reg10, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Lauhteenpurku - as.arvo(ei läm. pyyntiä) *) 
	Modbus_4x1201.Reg11 := HoldingRegF_3(id_string:=reg_4x1212, RegValue:=Modbus_4x1201.Reg11, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Aktiivijäähdytys - lauhdutin dTas.arvo *) 
	Modbus_4x1201.Reg12 := HoldingRegF_3(id_string:=reg_4x1213, RegValue:=Modbus_4x1201.Reg12, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Passiivijäähdytys -keruupumpun nopeus *) 
	Modbus_4x1201.Reg13 := HoldingRegF_3(id_string:=reg_4x1214, RegValue:=Modbus_4x1201.Reg13, rMultiplier:=1.0, Force:=False, ReleaseOverride:=True); (* Aktiivijäähdytys - höyrystin dTas.arvo *) 
	Modbus_4x1201.Reg15 := HoldingRegF_3(id_string:=reg_4x1216, RegValue:=Modbus_4x1201.Reg15, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Jäähdytysvaraaja lämpötilaVAK:sta. Katso 7) *) 
	Modbus_4x1201(Send:=2);
END_IF;

(* Holding, Start 1250, Count 18 *)
Modbus_4x1251(Send:=0, Port:=iPort, Module:=iModule, StartRegister:=1250, RegisterType:=HOLDING);
IF Modbus_4x1251.Datavalid = 1 THEN
	Modbus_4x1251.Reg0 := HoldingRegF_3(id_string:=reg_4x1251, RegValue:=Modbus_4x1251.Reg0, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Mukavuus asetusarvo *) 
	Modbus_4x1251.Reg1 := HoldingRegF_3(id_string:=reg_4x1252, RegValue:=Modbus_4x1251.Reg1, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Alennettu asetusarvo *) 
	Modbus_4x1251.Reg2 := HoldingRegF_3(id_string:=reg_4x1253, RegValue:=Modbus_4x1251.Reg2, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Suojaus asetusarvo *) 
	Modbus_4x1251.Reg3 := HoldingRegF_3(id_string:=reg_4x1254, RegValue:=Modbus_4x1251.Reg3, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Menoveden minimi asetusarvo *) 
	Modbus_4x1251.Reg4 := HoldingRegF_3(id_string:=reg_4x1255, RegValue:=Modbus_4x1251.Reg4, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Menoveden maksimiasetusarvo *) 
	Modbus_4x1251.Reg5 := HoldingRegF_3(id_string:=reg_4x1256, RegValue:=Modbus_4x1251.Reg5, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Kesä/talvi ulkolämpötilaasetusarvo *) 
	Modbus_4x1251.Reg6 := HoldingRegF_3(id_string:=reg_4x1257, RegValue:=Modbus_4x1251.Reg6, rMultiplier:=1.0, Force:=False, ReleaseOverride:=True); (* Kesä/talvi aikavakio *) 
	Modbus_4x1251.Reg7 := HoldingRegF_3(id_string:=reg_4x1258, RegValue:=Modbus_4x1251.Reg7, rMultiplier:=1.0, Force:=False, ReleaseOverride:=True); (* Kesä/talvi tila *) 
	Modbus_4x1251.Reg8 := HoldingRegF_3(id_string:=reg_4x1259, RegValue:=Modbus_4x1251.Reg8, rMultiplier:=1.0, Force:=False, ReleaseOverride:=True); (* Rakennuksen aikavakio *) 
	Modbus_4x1251.Reg9 := HoldingRegF_3(id_string:=reg_4x1260, RegValue:=Modbus_4x1251.Reg9, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Lämpökäyrä – UlkolämpötilaX1 (alin) *) 
	Modbus_4x1251.Reg10 := HoldingRegF_3(id_string:=reg_4x1261, RegValue:=Modbus_4x1251.Reg10, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Lämpökäyrä – Menovesi Y1 *) 
	Modbus_4x1251.Reg11 := HoldingRegF_3(id_string:=reg_4x1262, RegValue:=Modbus_4x1251.Reg11, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Lämpökäyrä – UlkolämpötilaX2 *) 
	Modbus_4x1251.Reg12 := HoldingRegF_3(id_string:=reg_4x1263, RegValue:=Modbus_4x1251.Reg12, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Lämpökäyrä – Menovesi X2 *) 
	Modbus_4x1251.Reg13 := HoldingRegF_3(id_string:=reg_4x1264, RegValue:=Modbus_4x1251.Reg13, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Lämpökäyrä – UlkolämpötilaX3 *) 
	Modbus_4x1251.Reg14 := HoldingRegF_3(id_string:=reg_4x1265, RegValue:=Modbus_4x1251.Reg14, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Lämpökäyrä – Menovesi X3 *) 
	Modbus_4x1251.Reg15 := HoldingRegF_3(id_string:=reg_4x1266, RegValue:=Modbus_4x1251.Reg15, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Lämpökäyrä – UlkolämpötilaX4 *) 
	Modbus_4x1251.Reg16 := HoldingRegF_3(id_string:=reg_4x1267, RegValue:=Modbus_4x1251.Reg16, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Lämpökäyrä – Menovesi X4 *) 
	Modbus_4x1251.Reg17 := HoldingRegF_3(id_string:=reg_4x1268, RegValue:=Modbus_4x1251.Reg17, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Lämpökäyrä – UlkolämpötilaX5 (ylin) *) 
	Modbus_4x1251(Send:=2);
END_IF;

(* Holding, Start 1268, Count 18 *)
Modbus_4x1269(Send:=0, Port:=iPort, Module:=iModule, StartRegister:=1268, RegisterType:=HOLDING);
IF Modbus_4x1269.Datavalid = 1 THEN
	Modbus_4x1269.Reg0 := HoldingRegF_3(id_string:=reg_4x1269, RegValue:=Modbus_4x1269.Reg0, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Lämpökäyrä – Menovesi Y5 *) 
	Modbus_4x1269.Reg1 := HoldingRegF_3(id_string:=reg_4x1270, RegValue:=Modbus_4x1269.Reg1, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Suuntaissiirto *) 
	Modbus_4x1269.Reg2 := HoldingRegF_3(id_string:=reg_4x1271, RegValue:=Modbus_4x1269.Reg2, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Menoveden asetusarvo *) 
	Modbus_4x1269.Reg3 := HoldingRegF_3(id_string:=reg_4x1272, RegValue:=Modbus_4x1269.Reg3, rMultiplier:=11.0, Force:=False, ReleaseOverride:=True); (* Normaali asetusarvo *) 
	Modbus_4x1269.Reg4 := HoldingRegF_3(id_string:=reg_4x1273, RegValue:=Modbus_4x1269.Reg4, rMultiplier:=11.0, Force:=False, ReleaseOverride:=True); (* Menoveden asetusarvoVAK:sta. Katso 7) *) 
	Modbus_4x1269.Reg5 := HoldingRegF_3(id_string:=reg_4x1274, RegValue:=Modbus_4x1269.Reg5, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Mukavuus asetusarvo *) 
	Modbus_4x1269.Reg6 := HoldingRegF_3(id_string:=reg_4x1275, RegValue:=Modbus_4x1269.Reg6, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Alennettu asetusarvo *) 
	Modbus_4x1269.Reg7 := HoldingRegF_3(id_string:=reg_4x1276, RegValue:=Modbus_4x1269.Reg7, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Suojaus asetusarvo *) 
	Modbus_4x1269.Reg9 := HoldingRegF_3(id_string:=reg_4x1278, RegValue:=Modbus_4x1269.Reg9, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Menoveden minimi asetusarvo *) 
	Modbus_4x1269.Reg10 := HoldingRegF_3(id_string:=reg_4x1279, RegValue:=Modbus_4x1269.Reg10, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Menoveden maksimiasetusarvo *) 
	Modbus_4x1269.Reg11 := HoldingRegF_3(id_string:=reg_4x1280, RegValue:=Modbus_4x1269.Reg11, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Kesä/talvi ulkolämpötilaasetusarvo *) 
	Modbus_4x1269.Reg12 := HoldingRegF_3(id_string:=reg_4x1281, RegValue:=Modbus_4x1269.Reg12, rMultiplier:=1.0, Force:=False, ReleaseOverride:=True); (* Kesä/talvi aikavakio *) 
	Modbus_4x1269.Reg13 := HoldingRegF_3(id_string:=reg_4x1282, RegValue:=Modbus_4x1269.Reg13, rMultiplier:=1.0, Force:=False, ReleaseOverride:=True); (* Kesä/talvi tila *) 
	Modbus_4x1269.Reg14 := HoldingRegF_3(id_string:=reg_4x1283, RegValue:=Modbus_4x1269.Reg14, rMultiplier:=1.0, Force:=False, ReleaseOverride:=True); (* Rakennuksen aikavakio *) 
	Modbus_4x1269.Reg15 := HoldingRegF_3(id_string:=reg_4x1284, RegValue:=Modbus_4x1269.Reg15, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Lämpökäyrä – UlkolämpötilaX1 (alin) *) 
	Modbus_4x1269.Reg16 := HoldingRegF_3(id_string:=reg_4x1285, RegValue:=Modbus_4x1269.Reg16, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Lämpökäyrä – Menovesi Y1 *) 
	Modbus_4x1269.Reg17 := HoldingRegF_3(id_string:=reg_4x1286, RegValue:=Modbus_4x1269.Reg17, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Lämpökäyrä – UlkolämpötilaX2 *) 
	Modbus_4x1269(Send:=2);
END_IF;

(* Holding, Start 1286, Count 11 *)
Modbus_4x1287(Send:=0, Port:=iPort, Module:=iModule, StartRegister:=1286, RegisterType:=HOLDING);
IF Modbus_4x1287.Datavalid = 1 THEN
	Modbus_4x1287.Reg0 := HoldingRegF_3(id_string:=reg_4x1287, RegValue:=Modbus_4x1287.Reg0, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Lämpökäyrä – Menovesi X2 *) 
	Modbus_4x1287.Reg1 := HoldingRegF_3(id_string:=reg_4x1288, RegValue:=Modbus_4x1287.Reg1, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Lämpökäyrä – UlkolämpötilaX3 *) 
	Modbus_4x1287.Reg2 := HoldingRegF_3(id_string:=reg_4x1289, RegValue:=Modbus_4x1287.Reg2, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Lämpökäyrä – Menovesi X3 *) 
	Modbus_4x1287.Reg3 := HoldingRegF_3(id_string:=reg_4x1290, RegValue:=Modbus_4x1287.Reg3, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Lämpökäyrä – UlkolämpötilaX4 *) 
	Modbus_4x1287.Reg4 := HoldingRegF_3(id_string:=reg_4x1291, RegValue:=Modbus_4x1287.Reg4, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Lämpökäyrä – Menovesi X4 *) 
	Modbus_4x1287.Reg5 := HoldingRegF_3(id_string:=reg_4x1292, RegValue:=Modbus_4x1287.Reg5, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Lämpökäyrä – UlkolämpötilaX5 (ylin) *) 
	Modbus_4x1287.Reg6 := HoldingRegF_3(id_string:=reg_4x1293, RegValue:=Modbus_4x1287.Reg6, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Lämpökäyrä – Menovesi Y5 *) 
	Modbus_4x1287.Reg7 := HoldingRegF_3(id_string:=reg_4x1294, RegValue:=Modbus_4x1287.Reg7, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Suuntaissiirto *) 
	Modbus_4x1287.Reg8 := HoldingRegF_3(id_string:=reg_4x1295, RegValue:=Modbus_4x1287.Reg8, rMultiplier:=10.0, Force:=False, ReleaseOverride:=True); (* Menoveden asetusarvo *) 
	Modbus_4x1287.Reg9 := HoldingRegF_3(id_string:=reg_4x1296, RegValue:=Modbus_4x1287.Reg9, rMultiplier:=11.0, Force:=False, ReleaseOverride:=True); (* Normaali asetusarvo *) 
	Modbus_4x1287.Reg10 := HoldingRegF_3(id_string:=reg_4x1297, RegValue:=Modbus_4x1287.Reg10, rMultiplier:=11.0, Force:=False, ReleaseOverride:=True); (* Menoveden asetusarvoVAK:sta. Katso 7) *) 
	Modbus_4x1287(Send:=2);
END_IF;

(*-------------------------------------------------------------------------------------------*)
(* Hälytyskoodin generointi -----------------------------------------------------------------*)
(*-------------------------------------------------------------------------------------------*)

iAlarmCode := 0;
IF Modbus_1x0101.DataValid = 1 THEN
	IF 		WORD_TO_BOOL(Modbus_1x0101.Reg0 AND 16#0100) THEN iAlarmCode := 101; 	(* Ulkolämpötila *)
	ELSIF 	WORD_TO_BOOL(Modbus_1x0101.Reg0 AND 16#0200) THEN iAlarmCode := 102;	(* Sähkömittarin kommunikaatio *)
	END_IF;
END_IF;

IF iAlarmCode = 0 AND Modbus_1x0191.DataValid = 1 THEN
	IF		WORD_TO_BOOL(Modbus_1x0191.Reg0 AND 16#0400) THEN iAlarmCode := 193;	(* Lkm. IO ei saatavilla *)
	ELSIF	WORD_TO_BOOL(Modbus_1x0191.Reg0 AND 16#0800) THEN iAlarmCode := 194;	(* Lkm. IO käsikäytössä *)
	ELSIF	WORD_TO_BOOL(Modbus_1x0191.Reg0 AND 16#2000) THEN iAlarmCode := 196;	(* Arkisto täynnä *)
	ELSIF	WORD_TO_BOOL(Modbus_1x0191.Reg0 AND 16#4000) THEN iAlarmCode := 197;	(* Ulkoinen IO virhe *)
	ELSIF	WORD_TO_BOOL(Modbus_1x0191.Reg0 AND 16#8000) THEN iAlarmCode := 198;	(* Kommunikaatio moduulivaihdettu *)
	ELSIF	WORD_TO_BOOL(Modbus_1x0191.Reg0 AND 16#0004) THEN iAlarmCode := 201;	(* Menovesi *)
	ELSIF	WORD_TO_BOOL(Modbus_1x0191.Reg0 AND 16#0008) THEN iAlarmCode := 202;	(* Paluuvesi *)
	ELSIF	WORD_TO_BOOL(Modbus_1x0191.Reg0 AND 16#0020) THEN iAlarmCode := 204;	(* Latauspumppu *)
	END_IF;
END_IF;

IF iAlarmCode = 0 AND Modbus_1x0301.DataValid = 1 THEN
	IF 		WORD_TO_BOOL(Modbus_1x0301.Reg0 AND 16#0100) THEN iAlarmCode := 301;	(* Keruupiiri sisään *)
	ELSIF 	WORD_TO_BOOL(Modbus_1x0301.Reg0 AND 16#0200) THEN iAlarmCode := 302;	(* Keruupiiri ulos *)
	ELSIF 	WORD_TO_BOOL(Modbus_1x0301.Reg0 AND 16#0400) THEN iAlarmCode := 303;	(* Kuumakaasu lämpötila *)
	ELSIF 	WORD_TO_BOOL(Modbus_1x0301.Reg0 AND 16#0800) THEN iAlarmCode := 304;	(* Höyrystimen paine *)
	ELSIF 	WORD_TO_BOOL(Modbus_1x0301.Reg0 AND 16#1000) THEN iAlarmCode := 305;	(* Lauhduttimen paine *)
	ELSIF 	WORD_TO_BOOL(Modbus_1x0301.Reg0 AND 16#2000) THEN iAlarmCode := 306;	(* Keruupiirin säätöventtiili / Keruupumppu *)
	ELSIF 	WORD_TO_BOOL(Modbus_1x0301.Reg0 AND 16#4000) THEN iAlarmCode := 307;	(* Imukaasu lämpötila *)
	ELSIF 	WORD_TO_BOOL(Modbus_1x0301.Reg0 AND 16#0002) THEN iAlarmCode := 310;	(* Kompressori 1 *)
	ELSIF 	WORD_TO_BOOL(Modbus_1x0301.Reg0 AND 16#0004) THEN iAlarmCode := 311;	(* Kompressori 1 takaisinkytkentä *)
	ELSIF 	WORD_TO_BOOL(Modbus_1x0301.Reg0 AND 16#0020) THEN iAlarmCode := 314;	(* Paisuntaventtiili *)
	ELSIF 	WORD_TO_BOOL(Modbus_1x0301.Reg0 AND 16#0040) THEN iAlarmCode := 315;	(* Kompressori 2 *)
	ELSIF 	WORD_TO_BOOL(Modbus_1x0301.Reg0 AND 16#0080) THEN iAlarmCode := 316;	(* Kompressori 2 takaisinkytkentä *)
	END_IF;
END_IF;

IF iAlarmCode = 0 AND Modbus_1x0321.Datavalid = 1 THEN
	IF 		WORD_TO_BOOL(Modbus_1x0321.Reg0 AND 16#0100) THEN iAlarmCode := 321;  (* Maksimi korkea paine *)
	ELSIF	WORD_TO_BOOL(Modbus_1x0321.Reg0 AND 16#0200) THEN iAlarmCode := 322;  (* Minimi korkea paine *)
	ELSIF	WORD_TO_BOOL(Modbus_1x0321.Reg0 AND 16#0400) THEN iAlarmCode := 323;  (* MOP *)
	ELSIF	WORD_TO_BOOL(Modbus_1x0321.Reg0 AND 16#0800) THEN iAlarmCode := 324;  (* LOP *)
	ELSIF	WORD_TO_BOOL(Modbus_1x0321.Reg0 AND 16#1000) THEN iAlarmCode := 325;  (* Maksimi painesuhde *)
	ELSIF	WORD_TO_BOOL(Modbus_1x0321.Reg0 AND 16#2000) THEN iAlarmCode := 326;  (* Minimi painesuhde *)
	ELSIF	WORD_TO_BOOL(Modbus_1x0321.Reg0 AND 16#4000) THEN iAlarmCode := 327;  (* Ylipainekytkin *)
	ELSIF	WORD_TO_BOOL(Modbus_1x0321.Reg0 AND 16#8000) THEN iAlarmCode := 328;  (* Alipainekytkin *)
	ELSIF	WORD_TO_BOOL(Modbus_1x0321.Reg0 AND 16#0001) THEN iAlarmCode := 329;  (* Paisuntaventtiili auki *)
	ELSIF	WORD_TO_BOOL(Modbus_1x0321.Reg0 AND 16#0002) THEN iAlarmCode := 330;  (* Höyrystimen lämpötila *)
	ELSIF	WORD_TO_BOOL(Modbus_1x0321.Reg0 AND 16#0004) THEN iAlarmCode := 331;  (* Lauhde lämpötila *)
	ELSIF	WORD_TO_BOOL(Modbus_1x0321.Reg0 AND 16#0008) THEN iAlarmCode := 332;  (* Tulistus *)
	ELSIF	WORD_TO_BOOL(Modbus_1x0321.Reg0 AND 16#0010) THEN iAlarmCode := 333;  (* Taajuusmuuntajan kommunikaatio (LS Control) *)
	ELSIF	WORD_TO_BOOL(Modbus_1x0321.Reg0 AND 16#0020) THEN iAlarmCode := 334;  (* Taajuusmuuntajan kommunikaatio (KOSTAL) *)
	ELSIF	WORD_TO_BOOL(Modbus_1x0321.Reg0 AND 16#0040) THEN iAlarmCode := 335;  (* Ei paine muutosta *)
	ELSIF	WORD_TO_BOOL(Modbus_1x0321.Reg0 AND 16#0080) THEN iAlarmCode := 336;  (* Ei kompressoria vapaana *)
	ELSIF	WORD_TO_BOOL(Modbus_1x0321.Reg1 AND 16#0100) THEN iAlarmCode := 337;  (* Kaikki komp. Häl. *)
	END_IF;
END_IF;

IF iAlarmCode = 0 AND Modbus_1x0604.DataValid = 1 THEN
	IF 		WORD_TO_BOOL(Modbus_1x0604.Reg0 AND 16#0100) THEN iAlarmCode := 604;	(* Piiri 2 menovedenlämpötila *)
	END_IF;
END_IF;

IF iAlarmCode = 0 AND Modbus_1x0701.DataValid = 1 THEN
	IF 		WORD_TO_BOOL(Modbus_1x0701.Reg0 AND 16#0100) THEN iAlarmCode := 701;	(* Käyttövesivaraajan lämpötila (yläanturi) *)
	ELSIF 	WORD_TO_BOOL(Modbus_1x0701.Reg0 AND 16#0200) THEN iAlarmCode := 702;	(* Käyttövesivaraajan lämpötila (ala-anturi) *)
	ELSIF 	WORD_TO_BOOL(Modbus_1x0701.Reg0 AND 16#0400) THEN iAlarmCode := 703;	(* Käytövesi sähkölämmitin K6 *)
	ELSIF 	WORD_TO_BOOL(Modbus_1x0701.Reg0 AND 16#0800) THEN iAlarmCode := 704;	(* Vaihtoventtiili Q3 *)
	ELSIF 	WORD_TO_BOOL(Modbus_1x0701.Reg0 AND 16#8000) THEN iAlarmCode := 708;	(* Käyttöveden menovesilämpötila B38 *)
	ELSIF 	WORD_TO_BOOL(Modbus_1x0701.Reg0 AND 16#0001) THEN iAlarmCode := 709;	(* Käyttövedenkierron lämpötila B39 *)
	END_IF;
END_IF;

IF iAlarmCode = 0 AND Modbus_1x0801.DataValid = 1 THEN
	IF 		WORD_TO_BOOL(Modbus_1x0801.Reg0 AND 16#0100) THEN iAlarmCode := 801;	(* Sähkölämmitin 1 ja 2 *)
	END_IF;
END_IF;

IF iAlarmCode = 0 AND Modbus_1x0901.DataValid = 1 THEN
	IF 		WORD_TO_BOOL(Modbus_1x0901.Reg0 AND 16#0100) THEN iAlarmCode := 901;	(* Kaskadi menoveden lämpötila *)
	ELSIF 	WORD_TO_BOOL(Modbus_1x0901.Reg0 AND 16#0200) THEN iAlarmCode := 902;	(* Kaskadi masterkommunikaatio *)
	ELSIF 	WORD_TO_BOOL(Modbus_1x0901.Reg0 AND 16#0400) THEN iAlarmCode := 903;	(* Yhteinen keruupumppu *)
	ELSIF 	WORD_TO_BOOL(Modbus_1x0901.Reg0 AND 16#0800) THEN iAlarmCode := 904;	(* Kaskadi slave 1 kommunikaatio *)
	ELSIF 	WORD_TO_BOOL(Modbus_1x0901.Reg0 AND 16#1000) THEN iAlarmCode := 905;	(* Kaskadi slave 2 kommunikaatio *)
	END_IF;
END_IF;

IF iAlarmCode = 0 AND Modbus_1x1004.DataValid = 1 THEN
	IF 		WORD_TO_BOOL(Modbus_1x1004.Reg0 AND 16#0100) THEN iAlarmCode := 1004;	(* Piiri 3 menovedenlämpötila *)
	END_IF;
END_IF;

iTemp := setDigitalPointF(iAlarmCode, 1, sAlarmCode);
END_FUNCTION_BLOCK