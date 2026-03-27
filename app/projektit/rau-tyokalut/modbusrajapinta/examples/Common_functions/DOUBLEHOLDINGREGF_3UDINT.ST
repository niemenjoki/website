FUNCTION DOUBLEHOLDINGREGF_3UDINT : UDINT
VAR_INPUT
	id_String : string(30);
	HighRegValue : word;
	LowRegValue : word;
	rMultiplier : real;
	Force : bool;
	ReleaseOverride : bool;
END_VAR

VAR
	rMultiply : real;
	rFX2025 : real;
	rReg : real;
	iLockState : int;
	iTemp : int;
	iReg : int;
	udiConversion : udint;
	rconversion : real;
	Result : int;
END_VAR
(* Zero division not allowed *)
rMultiply := rMultiplier;
if (rMultiply = 0.0) then
	rMultiply := 1.0;
end_if;

(* Read current FX2025 value *)
rFX2025 := GetAnalogPointF(Name:=id_String);

(* Convert double register value to real value *)
udiConversion := 65536*WORD_TO_UDINT(HighRegValue) + WORD_TO_UDINT(LowRegValue);
rConversion := UDINT_TO_REAL(udiConversion)/rMultiply;

(* Check LockState *)
iLockState:=GetLockStateF(Name:=id_String);

if id_String <> '' then
	if (rFX2025 = rConversion and ReleaseOverride = true) then
		(* Same value -> release manual override *)
		Result := SetAnalogPointF(Value:=rConversion, LockState:=3, Name:=id_String);
	elsif (iLockState = 2 or iLockState = 12 or Force = true) then
		(* The value have been changed in FX *)	
		udiConversion := REAL_TO_UDINT(rFX2025 * rMultiply);
	else
		(* The value may have been changed in modbus equipment *)
		Result := SetAnalogPointF(Value:=rConversion, LockState:=1, Name:=id_String);
	end_if;
end_if;

DoubleHoldingRegF_3UDINT := udiConversion;










END_FUNCTION