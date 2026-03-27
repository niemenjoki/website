FUNCTION CoilF_3 : WORD
VAR_INPUT
	id_String : string(30);
	RegValue : word;
	BitMask : word;
	Force : bool;
	ReleaseOverride : bool;
END_VAR

VAR
	iTemp : int;
	iLockState : int;
	bFX2020 : bool;
	bReg : bool;
	ReturnValue : word;
END_VAR

bFX2020 := INT_TO_BOOL(GetDigitalPointF(Name:=id_String)); 
bReg:=WORD_TO_BOOL(RegValue AND BitMask);
iLockState:=GetLockStateF(Name:=id_String);

ReturnValue := RegValue;
IF id_String <> '' THEN
	if bFX2020 = bReg and releaseOverride = true then
		(* Same value -> release manual override *)
		iTemp:=SetDigitalPointF(Value:=BOOL_TO_INT(bReg), LockState := 3, Name := id_String);
	elsif (iLockState = 2 or iLockState = 12 or force = true) then
		(* The value have been changed in FX *)	
		if (bFX2020 = true) then 
			ReturnValue := (RegValue OR BitMask);
		else
			ReturnValue := (RegValue AND NOT(BitMask)); 
		end_if;
	else
		(* The value may have been changed in handterminal *)	
	 	iTemp:=SetDigitalPointF(Value:=BOOL_TO_INT(bReg), LockState := 1, Name := id_String);
	end_if;
END_IF;

CoilF_3 := ReturnValue;













END_FUNCTION