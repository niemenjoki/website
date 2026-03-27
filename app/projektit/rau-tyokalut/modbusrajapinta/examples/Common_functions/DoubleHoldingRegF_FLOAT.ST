FUNCTION DoubleHoldingRegF_FLOAT : DWORD
VAR_INPUT
	id_String : string(30);
	LowRegValue : word;
	HighRegValue : word;
END_VAR

VAR
	rFX2020 : real;
	rReg : real;
	iLockState : int;
	iTemp : int;
	iReg : int;
	dwArvo : dword;
	realArvo : real;
END_VAR
(*point value in Fx*)
rFX2020 := GetAnalogPointF(Name:=id_String); 

(* Value from modbus *)
dwArvo := WORD_TO_DWORD( HighRegValue );  (* Muunnnos 32 bittiseksi *)
dwArvo := SHL( dwArvo, 16 );   (* Siirret??n 16 bitti? vasemmalle *)
dwArvo := dwArvo OR WORD_TO_DWORD( LowRegValue );   (* Lis?t??n alemmat 16 bitti? *)
realArvo := WORD2_TO_REAL( dwArvo )  ;   (* Muunnetaan REAL tyyppiseksi *)
iLockState:=GetLockStateF(Name:=id_String);

IF id_String <> '' THEN
	if rFX2020 = realArvo then
		(* Same value -> release manual override *)
		iTemp:=SetAnalogPointF(Value:=rReg, LockState := 3, Name := id_String);
	elsif (iLockState = 2 or iLockState = 12) then
		(* The value have been changed in FX *)	
		realArvo := rFX2020; 
		dwArvo := REAL_TO_WORD2(realArvo); (*modify the return value so that it can be written to registers*)
	else
		(* The value may have been change in handterminal *)	
		iTemp:=SetAnalogPointF(Value:=realArvo, LockState := 1, Name := id_String);
	end_if;
END_IF;

(* return the register values in a DWORD*)
DoubleHoldingRegF_FLOAT := dwArvo;










END_FUNCTION