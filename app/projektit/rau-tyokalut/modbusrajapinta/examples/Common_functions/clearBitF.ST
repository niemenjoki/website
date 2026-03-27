FUNCTION clearBitF : WORD
VAR_INPUT
bitString : word;
bitNumber : uint;
END_VAR

VAR
wResult : word;
wTemp : word;
END_VAR
(************************************************************) 
(*	Function clears bit in given bit string 				*)
(*															*)
(*	Inputs: bitString as 16bit word							*)
(*			bitNumber as unsigned integer from 0 to 15		*)
(*	Returns: bitString with the bit cleared as 16bit word  	*)
(*	Use: bitString:=clearBitF(bitString, bitNumber);	 	*)
(*													  		*)
(************************************************************)

if bitNumber > 15 then
	wResult := bitString;
else
	wTemp := 1;
	wTemp := SHL(wTemp, bitNumber);
	wResult := bitString AND (16#FFFF XOR wTemp);
end_if;
clearBitF := wResult;

END_FUNCTION