FUNCTION DoubleInputReg_WM14 : REAL
VAR_INPUT
	id_String : string(30);
	HighRegValue : word;
	LowRegValue : word;
END_VAR

VAR
	dwArvo : dword;
	realArvo : real;
	result : int;
END_VAR

dwArvo := WORD_TO_DWORD( HighRegValue );  (* Muunnnos 32 bittiseksi *)
dwArvo := SHL( dwArvo, 16 );   (* Siirret??n 16 bitti? vasemmalle *)
dwArvo := dwArvo OR WORD_TO_DWORD( LowRegValue );   (* Lis?t??n alemmat 16 bitti? *)
realArvo := WORD2_TO_REAL( dwArvo )  ;   (* Muunnetaan REAL tyyppiseksi *)

(* Talletetaan arvo mittauspisteeseen *)
result := SetAnalogPointF( Value := realArvo , LockState:=1, Name:= id_String );

DoubleInputReg_WM14 := realArvo;




END_FUNCTION