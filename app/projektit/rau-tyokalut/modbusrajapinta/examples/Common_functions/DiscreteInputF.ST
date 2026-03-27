FUNCTION DiscreteInputF : INT
VAR_INPUT
	id_String : string(30);
	RegValue : word;
	BitMask : word;
END_VAR

VAR
	tulos : int;
END_VAR

IF id_String <> '' THEN
	(* Check BitMask defined bit status *)
	tulos := SetDigitalPointF(Value:=BOOL_TO_INT(WORD_TO_BOOL(RegValue AND BitMask)), LockState:=1, Name:=id_String);
	DiscreteInputF := 0;
ELSE
	DiscreteInputF := 9999;
END_IF;








END_FUNCTION