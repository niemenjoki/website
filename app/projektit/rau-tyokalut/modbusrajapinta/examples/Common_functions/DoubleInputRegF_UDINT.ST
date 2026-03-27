FUNCTION DoubleInputRegF_UDINT : UDINT
VAR_INPUT
	id_String : string(30);
	HighRegValue : word;
	LowRegValue : word;
	rMultiplier : real;
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

(* Convert double register value to real value *)
udiConversion := 65536*WORD_TO_UDINT(HighRegValue) + WORD_TO_UDINT(LowRegValue);
rConversion := UDINT_TO_REAL(udiConversion)/rMultiply;

(* Save value to point database *)
Result := SetAnalogPointF(Value:=rConversion, LockState:=1, Name:=id_String);

DoubleInputRegF_UDINT := udiConversion;



END_FUNCTION