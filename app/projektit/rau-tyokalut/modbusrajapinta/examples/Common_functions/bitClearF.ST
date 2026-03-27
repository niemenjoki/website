FUNCTION bitClearF : BOOL
VAR_INPUT
bitString : word;
bitNumber : uint;
END_VAR

VAR
bResult : bool;
wTemp : word;
END_VAR
(************************************************************) 
(*	Function checks if bit is cleared in given bit string 	*)
(*															*)
(*	Inputs: bitString as 16bit word							*)
(*			bitNumber as unsigned integer from 0 to 15		*)
(*	Returns: Boolean value							  		*)
(*	Use: if bitClearF(bitString, bitNumber) then	 	  	*)
(*				do_something();						  		*)
(*		 end_if;											*)
(*													  		*)
(************************************************************)

if bitNumber > 15 then
	bResult := false;
else
	wTemp := 1;
	wTemp := SHL(wTemp, bitNumber);
	bResult := (bitString AND wTemp) = 0; 
end_if;
bitClearF := bResult;




END_FUNCTION