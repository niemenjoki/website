FUNCTION InputRegF_UINT : INT
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
	rReg:=WORD_TO_REAL(RegValue) / rMultiply;
	iTemp := SetAnalogPointF(Value := rReg, LockState := 1, Name := id_String);
	InputRegF_UINT := 0;
ELSE
	InputRegF_UINT := 9999;
END_IF;




END_FUNCTION