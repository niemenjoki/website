FUNCTION_BLOCK FB_Oilon_RE
VAR_EXTERNAL

END_VAR

VAR_INPUT
	iPort : INT;
	iAddress : INT;
	sModuleError : STRING(30);
	sHoldreg_10240 : STRING(30);
	sHoldreg_10241 : STRING(30);
	sHoldreg_11264 : STRING(30);
	sHoldreg_11282 : STRING(30);
	sHoldreg_11290 : STRING(30);
	sHoldreg_11294 : STRING(30);
	sHoldreg_13313 : STRING(30);
	sHoldreg_17410 : STRING(30);
	sHoldreg_17419 : STRING(30);
	sHoldreg_17429 : STRING(30);
	sHoldReg_11280 : STRING(30);
	sHoldreg_18432 : STRING(30);
	sHoldreg_18436 : STRING(30);
	sHoldreg_20480 : STRING(30);
	sHoldreg_20484 : STRING(30);
	sHoldreg_20492 : STRING(30);
	sHoldreg_20496 : STRING(30);
	sHoldreg_20505 : STRING(30);
	sHoldreg_20507 : STRING(30);
	sHoldreg_20547 : STRING(30);
	sHoldreg_20556 : STRING(30);
	sHoldreg_20834 : STRING(30);
	sHoldreg_20842 : STRING(30);
	sHoldreg_20846 : STRING(30);
	sHoldreg_20848 : STRING(30);
	sHoldreg_20871 : STRING(30);
	sHoldreg_20877 : STRING(30);
	sHoldreg_34854 : STRING(30);
	sHoldreg_34855 : STRING(30);
	sHoldreg_34856 : STRING(30);
	sHoldreg_35851 : STRING(30);
	sHoldreg_35887 : STRING(30);
	sHoldreg_38420 : STRING(30);
	sHoldreg_39040 : STRING(30);
	sHoldreg_42016 : STRING(30);
	sHoldreg_42056 : STRING(30);
END_VAR

VAR_OUTPUT

END_VAR

VAR
	fbOilonReg : GenericModbus642FB;
	udiTemp : UDINT;
	iTemp : INT;
	viiveAjastin : TON;
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

(*************************************************************************************************************************************************************************)
(*** Read only rekisterit ************************************************************************************************************************************************)
(*************************************************************************************************************************************************************************)

fbOilonReg(Send:=0, Port:=iPort, Module:=iAddress, StartRegister:= 11264, RegisterType:=3);
IF fbOilonReg.datavalid = 1 THEN
	fbOilonReg.Reg0 	:= holdingRegF(id_String := sHoldreg_11264, RegValue := fbOilonReg.Reg0,  	rMultiplier:=64.0, 		Force := FALSE, ReleaseOverride := TRUE);
END_IF;

fbOilonReg(Send:=0, Port:=iPort, Module:=iAddress, StartRegister:= 11290, RegisterType:=3);
IF fbOilonReg.datavalid = 1 THEN
	fbOilonReg.Reg0 	:= holdingRegF(id_String := sHoldreg_11290, RegValue := fbOilonReg.Reg0,  	rMultiplier:=64.0, 		Force := FALSE, ReleaseOverride := TRUE);
END_IF;

fbOilonReg(Send:=0, Port:=iPort, Module:=iAddress, StartRegister:= 17410, RegisterType:=3);
IF fbOilonReg.datavalid = 1 THEN
	fbOilonReg.Reg0 	:= holdingRegF(id_String := sHoldreg_17410, RegValue := fbOilonReg.Reg0,  	rMultiplier:=64.0, 		Force := FALSE, ReleaseOverride := TRUE);
END_IF;

fbOilonReg(Send:=0, Port:=iPort, Module:=iAddress, StartRegister:= 18432, RegisterType:=3);
IF fbOilonReg.datavalid = 1 THEN
	fbOilonReg.Reg0 	:= holdingRegF(id_String := sHoldreg_18432, RegValue := fbOilonReg.Reg0,  	rMultiplier:=64.0, 		Force := FALSE, ReleaseOverride := TRUE);
	fbOilonReg.Reg4 	:= holdingRegF(id_String := sHoldreg_18436, RegValue := fbOilonReg.Reg4,  	rMultiplier:=64.0, 		Force := FALSE, ReleaseOverride := TRUE);
END_IF;

fbOilonReg(Send:=0, Port:=iPort, Module:=iAddress, StartRegister:= 20480, RegisterType:=3);
IF fbOilonReg.datavalid = 1 THEN
	fbOilonReg.Reg0 	:= holdingRegF(id_String := sHoldreg_20480, RegValue := fbOilonReg.Reg0, 	rMultiplier:=64.0, 		Force := FALSE, ReleaseOverride := TRUE);
	fbOilonReg.Reg4 	:= holdingRegF(id_String := sHoldreg_20484, RegValue := fbOilonReg.Reg4,  	rMultiplier:=64.0, 		Force := FALSE, ReleaseOverride := TRUE);
	fbOilonReg.Reg12 	:= holdingRegF(id_String := sHoldreg_20492, RegValue := fbOilonReg.Reg12,  	rMultiplier:=1.0, 		Force := FALSE, ReleaseOverride := TRUE);
	fbOilonReg.Reg16 	:= holdingRegF(id_String := sHoldreg_20496, RegValue := fbOilonReg.Reg16,  	rMultiplier:=1.0, 		Force := FALSE, ReleaseOverride := TRUE);
END_IF;


fbOilonReg(Send:=0, Port:=iPort, Module:=iAddress, StartRegister:= 20505, RegisterType:=3);
IF fbOilonReg.datavalid = 1 THEN
	udiTemp 			:= doubleInputRegF(id_string := sHoldreg_20505, HighRegValue := fbOilonReg.Reg0, LowRegValue := fbOilonReg.Reg1, rMultiplier := 3600.0);
	udiTemp 			:= doubleInputRegF(id_string := sHoldreg_20507, HighRegValue := fbOilonReg.Reg2, LowRegValue := fbOilonReg.Reg3, rMultiplier := 1.0);
END_IF;
	
fbOilonReg(Send:=0, Port:=iPort, Module:=iAddress, StartRegister:= 20556, RegisterType:=3);
IF fbOilonReg.datavalid = 1 THEN
	fbOilonReg.Reg0 	:= holdingRegF(id_String := sHoldreg_20556, RegValue := fbOilonReg.Reg0,  	rMultiplier:=1.0, 		Force := FALSE, ReleaseOverride := TRUE);
END_IF;

fbOilonReg(Send:=0, Port:=iPort, Module:=iAddress, StartRegister:= 20834, RegisterType:=3);
IF fbOilonReg.datavalid = 1 THEN
	fbOilonReg.Reg0 	:= holdingRegF(id_String := sHoldreg_20834, RegValue := fbOilonReg.Reg0,  	rMultiplier:=1.0, 		Force := FALSE, ReleaseOverride := TRUE);
	fbOilonReg.Reg8 	:= holdingRegF(id_String := sHoldreg_20842, RegValue := fbOilonReg.Reg8,  	rMultiplier:=1.0, 		Force := FALSE, ReleaseOverride := TRUE);
	fbOilonReg.Reg12 	:= holdingRegF(id_String := sHoldreg_20846, RegValue := fbOilonReg.Reg12,  	rMultiplier:=1.0, 		Force := FALSE, ReleaseOverride := TRUE);
	fbOilonReg.Reg14 	:= holdingRegF(id_String := sHoldreg_20848, RegValue := fbOilonReg.Reg14,  	rMultiplier:=1.0, 		Force := FALSE, ReleaseOverride := TRUE);
END_IF;

fbOilonReg(Send:=0, Port:=iPort, Module:=iAddress, StartRegister:= 20871, RegisterType:=3);
IF fbOilonReg.datavalid = 1 THEN
	fbOilonReg.Reg0 	:= holdingRegF(id_String := sHoldreg_20871, RegValue := fbOilonReg.Reg0,  	rMultiplier:=64.0, 		Force := FALSE, ReleaseOverride := TRUE);
	fbOilonReg.Reg6 	:= holdingRegF(id_String := sHoldreg_20877, RegValue := fbOilonReg.Reg6,  	rMultiplier:=64.0, 		Force := FALSE, ReleaseOverride := TRUE);
END_IF;

fbOilonReg(Send:=0, Port:=iPort, Module:=iAddress, StartRegister:= 16#8C0B, RegisterType:=3);
IF fbOilonReg.datavalid = 1 THEN
	fbOilonReg.Reg0 	:= holdingRegF(id_String := sHoldreg_35851, RegValue := fbOilonReg.Reg0,  	rMultiplier:=64.0, 		Force := FALSE, ReleaseOverride := TRUE);
END_IF;

fbOilonReg(Send:=0, Port:=iPort, Module:=iAddress, StartRegister:= 16#8C2F, RegisterType:=3);
IF fbOilonReg.datavalid = 1 THEN
	fbOilonReg.Reg0 	:= holdingRegF(id_String := sHoldreg_35887, RegValue := fbOilonReg.Reg0,  	rMultiplier:=1.0, 		Force := FALSE, ReleaseOverride := TRUE);
END_IF;

fbOilonReg(Send:=0, Port:=iPort, Module:=iAddress, StartRegister:= 16#9614, RegisterType:=3);
IF fbOilonReg.datavalid = 1 THEN
	fbOilonReg.Reg0 	:= holdingRegF(id_String := sHoldreg_38420, RegValue := fbOilonReg.Reg0,  	rMultiplier:=1.0, 		Force := FALSE, ReleaseOverride := TRUE);
END_IF;

fbOilonReg(Send:=0, Port:=iPort, Module:=iAddress, StartRegister:= 16#9880, RegisterType:=3);
IF fbOilonReg.datavalid = 1 THEN
	fbOilonReg.Reg0 	:= holdingRegF(id_String := sHoldreg_39040, RegValue := fbOilonReg.Reg0,  	rMultiplier:=1.0, 		Force := FALSE, ReleaseOverride := TRUE);
END_IF;

(*************************************************************************************************************************************************************************)
(*** Read/write rekisterit ***********************************************************************************************************************************************)
(*************************************************************************************************************************************************************************)

fbOilonReg(Send:=0, Port:=iPort, Module:=iAddress, StartRegister:= 10240, RegisterType:=3);
IF fbOilonReg.datavalid = 1 THEN
	fbOilonReg.Reg0 	:= holdingRegF(id_String := sHoldreg_10240, RegValue := fbOilonReg.Reg0,  	rMultiplier:=1.0, 		Force := TRUE, ReleaseOverride := FALSE);
	fbOilonReg.Reg1 	:= holdingRegF(id_String := sHoldreg_10241, RegValue := fbOilonReg.Reg1,  	rMultiplier:=64.0, 		Force := TRUE, ReleaseOverride := FALSE);
	fbOilonReg(Send:=2);
END_IF;

fbOilonReg(Send:=0, Port:=iPort, Module:=iAddress, StartRegister:= 11280, RegisterType:=3);
IF fbOilonReg.datavalid = 1 THEN
	fbOilonReg.Reg0 	:= holdingRegF(id_String := sHoldReg_11280, RegValue := fbOilonReg.Reg0,  	rMultiplier:=1.0, 		Force := FALSE, ReleaseOverride := TRUE);
	fbOilonReg(Send:=2);
END_IF;

fbOilonReg(Send:=0, Port:=iPort, Module:=iAddress, StartRegister:= 11282, RegisterType:=3);
IF fbOilonReg.datavalid = 1 THEN
	fbOilonReg.Reg0 	:= holdingRegF(id_String := sHoldreg_11282, RegValue := fbOilonReg.Reg0,  	rMultiplier:=1.0, 		Force := FALSE, ReleaseOverride := TRUE);
	fbOilonReg.Reg12 	:= holdingRegF(id_String := sHoldreg_11294, RegValue := fbOilonReg.Reg12,  rMultiplier:=64.0, 		Force := TRUE, ReleaseOverride := TRUE);
	fbOilonReg(Send:=2);
END_IF;

fbOilonReg(Send:=0, Port:=iPort, Module:=iAddress, StartRegister:= 17419, RegisterType:=3);
IF fbOilonReg.datavalid = 1 THEN
	fbOilonReg.Reg0 	:= holdingRegF(id_String := sHoldreg_17419, RegValue := fbOilonReg.Reg0,  	rMultiplier:=64.0, 		Force := TRUE, ReleaseOverride := TRUE);
	fbOilonReg(Send:=2);
END_IF;

fbOilonReg(Send:=0, Port:=iPort, Module:=iAddress, StartRegister:= 17429, RegisterType:=3);
IF fbOilonReg.datavalid = 1 THEN
	fbOilonReg.Reg0 	:= holdingRegF(id_String := sHoldreg_17429, RegValue := fbOilonReg.Reg0,  	rMultiplier:=64.0, 		Force := TRUE, ReleaseOverride := TRUE);
	fbOilonReg(Send:=2);
END_IF;

fbOilonReg(Send:=0, Port:=iPort, Module:=iAddress, StartRegister:= 20547, RegisterType:=3);
IF fbOilonReg.datavalid = 1 THEN
	fbOilonReg.Reg0 	:= holdingRegF(id_String := sHoldreg_20547, RegValue := fbOilonReg.Reg0,  	rMultiplier:=1.0, 		Force := FALSE, ReleaseOverride := TRUE);
	fbOilonReg(Send:=2);
END_IF;

fbOilonReg(Send:=0, Port:=iPort, Module:=iAddress, StartRegister:= 16#8826, RegisterType:=3);
IF fbOilonReg.datavalid = 1 THEN
	fbOilonReg.Reg0 	:= holdingRegF(id_String := sHoldreg_34854, RegValue := fbOilonReg.Reg0,  	rMultiplier:=1.0, 		Force := TRUE, ReleaseOverride := TRUE);
	fbOilonReg.Reg1 	:= holdingRegF(id_String := sHoldreg_34855, RegValue := fbOilonReg.Reg1,  	rMultiplier:=1.0, 		Force := TRUE, ReleaseOverride := TRUE);
	fbOilonReg.Reg2 	:= holdingRegF(id_String := sHoldreg_34856, RegValue := fbOilonReg.Reg2,  	rMultiplier:=1.0, 		Force := TRUE, ReleaseOverride := TRUE);
	fbOilonReg(Send:=2);
END_IF;

fbOilonReg(Send:=0, Port:=iPort, Module:=iAddress, StartRegister:= 16#A420, RegisterType:=3);
IF fbOilonReg.datavalid = 1 THEN
	fbOilonReg.Reg0 := holdingRegF(id_String := sHoldreg_42016, RegValue := fbOilonReg.Reg0,  rMultiplier:=64.0, Force := TRUE, ReleaseOverride := FALSE);
	fbOilonReg.Reg1 := INT_TO_WORD(16#C01);
	fbOilonReg(Send:=2);
END_IF;

fbOilonReg(Send:=0, Port:=iPort, Module:=iAddress, StartRegister:= 16#A448, RegisterType:=3);
IF fbOilonReg.datavalid = 1 THEN
	fbOilonReg.Reg0 	:= holdingRegF(id_String := sHoldreg_42056, RegValue := fbOilonReg.Reg0,  	rMultiplier:=1.0, 		Force := FALSE, ReleaseOverride := TRUE);
	fbOilonReg(Send:=2);
END_IF;

(*************************************************************************************************************************************************************************)
(*** Väylävika ***********************************************************************************************************************************************************)
(*************************************************************************************************************************************************************************)
iTemp := setDigitalPointF(BOOL_TO_INT(getSystemStatusF(1, iAddress, INT_TO_REAL(iPort)) > 30.0), 1, sModuleError);


(*************************************************************************************************************************************************************************)
(*** Kuittausnapin nollaus ***********************************************************************************************************************************************)
(*************************************************************************************************************************************************************************)
viiveAjastin.IN := getDigitalPointF(sHoldreg_20547) <> 0;
viiveAjastin.PT := t#15s;
viiveAjastin();

IF viiveAjastin.Q THEN
	(* Poistetaan kuittauspisteen käsiohjaus. Asetetaan kuittauspisteen arvo takaisin nollaksi *)
	iTemp := setDigitalPointF(0, 3, sHoldreg_20547); 
	iTemp := setDigitalPointF(0, 1, sHoldreg_20547);
	
	(* Kuitataan hälytyspiste *)
	iTemp := alarmAckF(2, 1, sHoldreg_35887);
END_IF;

END_FUNCTION_BLOCK