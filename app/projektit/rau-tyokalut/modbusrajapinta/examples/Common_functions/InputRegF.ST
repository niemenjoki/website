FUNCTION InputRegF : INT
VAR_INPUT
	id_String : string(30);
	RegValue : word;
	rMultiplier : real;
END_VAR

VAR
	rMultiply : real;
	rReg : real;
	iReg : int;
	iTemp : int;
END_VAR
(* Zero division not allowed *)
rMultiply := rMultiplier;
if (rMultiply = 0.0) then
	rMultiply := 1.0;
end_if;

IF id_String <> '' THEN
	(* WORD_TO_INT conversion needed because of possible negative values *)
	iReg:=WORD_TO_INT(RegValue);
	rReg:=INT_TO_REAL(iReg) / rMultiply;
	iTemp := SetAnalogPointF(Value := rReg, LockState := 1, Name := id_String);
	InputRegF := 0;
ELSE
	InputRegF := 9999;
END_IF;




END_FUNCTION