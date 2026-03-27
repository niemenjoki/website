FUNCTION HOLDINGREGF_3DINT : WORD
VAR_INPUT
	id_String : string(30);
	RegValue : word;
	rMultiplier : real;
	Force : bool;
	ReleaseOverride : bool;
END_VAR

VAR
	rMultiply : real;
	rFX2020 : real;
	rReg : real;
	iLockState : int;
	iTemp : int;
	iReg : dint;
END_VAR
(* Zero division not allowed *)
rMultiply := rMultiplier;
if (rMultiply = 0.0) then
	rMultiply := 1.0;
end_if;

rFX2020 := GetAnalogPointF(Name:=id_String); 
(* WORD_TO_INT conversion needed because of possible negative values *)
iReg:=WORD_TO_DINT(RegValue);
rReg:=DINT_TO_REAL(iReg) / rMultiply;
iLockState:=GetLockStateF(Name:=id_String);

IF id_String <> '' THEN
	if rFX2020 = rReg and releaseOverride = true then
		(* Same value -> release manual override *)
		iTemp:=SetAnalogPointF(Value:=rReg, LockState := 3, Name := id_String);
	elsif (iLockState = 2 or iLockState = 12 or force = true) then
		(* The value have been changed in FX *)	
		rReg := rFX2020;
	else
		(* The value may have been change in handterminal *)	
		iTemp:=SetAnalogPointF(Value:=rReg, LockState := 1, Name := id_String);
	end_if;
END_IF;

(* REAL_TO_INT conversion needed because of possible negative values *)
iReg := REAL_TO_DINT(rReg * rMultiply);
HoldingRegF_3dInt := DINT_TO_WORD(iReg);













END_FUNCTION