FUNCTION ReadAndSetBitF : WORD
VAR_INPUT
	id_string 			: String(30);
	RegValue 			: Word;
	BitNumber 			: uint;
	Force 				: bool;
	ReleaseOverride 	: bool;
END_VAR

VAR
	iFX2020 : int;
	iLockState : int;
	wTemp : Word;
	iReg : int;
	wReturn : word;
	
	iTemp : Int ;
	bitmask : word;
END_VAR
 

(* READS BIT FROM BIT STRING *)
wReturn := RegValue ;

if bitNumber <= 15 then 	

	
	iFX2020 := GetDigitalPointf( Name := ID_STRING );
	(* READ BIT VALUE *)
	bitmask :=  REAL_TO_WORD( 2.0 ** BitNumber) ;
	
	iReg := BOOL_TO_INT( WORD_TO_BOOL( RegValue AND BitMask ));
	
	(* READS LOCKSTATE *)
	iLockState:=GetLockStateF(Name:=id_String);
	
	IF id_String <> '' THEN
		if iFX2020 = iReg and releaseOverride = true then
			(* Same value -> release manual override *)
			iTemp:=SetDigitalPointF(Value:= iReg, LockState := 3, Name := id_String);
		elsif (iLockState = 2 or iLockState = 12 or force = true) then
			(* The value have been changed in FX *)	
			(* rReg := rFX2020; *)
			(* The value have been changed in FX *)				
			if (iFX2020 = 1) then 
				
				wReturn := (RegValue OR bitmask);
			else
				wReturn := (RegValue AND NOT(BitMask)); 
			end_if;
			
		else
			(* The value may have been change in handterminal *)	
			iTemp:=SetDigitalPointF(Value:=iReg, LockState := 1, Name := id_String);
		end_if;
	END_IF;
	
	
end_if;

ReadAndSetBitF := wReturn;




END_FUNCTION