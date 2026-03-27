FUNCTION CoilF_2 : WORD
VAR_INPUT
	id_String : string(30);
	RegValue : word;
	BitMask : word;
	force : int;
END_VAR

VAR
	iTemp : int;
	iLockState : int;
	bFX2020 : bool;
	bReg : bool;
	ReturnValue : word;
END_VAR
(*Different version of the CoilF-function, added a new input parameter 'force' that indicates if the value is wanted to be
 forced from FX to the modbus device 0 = no forcing, 1 = value is forced *)

bFX2020 := INT_TO_BOOL(GetDigitalPointF(Name:=id_String)); 
bReg:=WORD_TO_BOOL(RegValue AND BitMask);
iLockState:=GetLockStateF(Name:=id_String);

ReturnValue := RegValue;
IF id_String <> '' THEN
	if bFX2020 = bReg then
		(* Same value -> release manual override *)
		iTemp:=SetDigitalPointF(Value:=BOOL_TO_INT(bReg), LockState := 3, Name := id_String);
	elsif (iLockState = 2 or iLockState = 12 or force = 1) then
		(* The value have been changed in FX, or user wants to force the point from FX *)	
		if (bFX2020 = true) then 
			ReturnValue := (RegValue OR BitMask);
		else
			ReturnValue := (RegValue AND NOT(BitMask)); 
		end_if;
	else
		(* The value may have been change in handterminal *)	
	 	iTemp:=SetDigitalPointF(Value:=BOOL_TO_INT(bReg), LockState := 1, Name := id_String);
	end_if;
END_IF;

CoilF_2 := ReturnValue;









END_FUNCTION