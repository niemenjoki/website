FUNCTION fxe_Input64F :REAL
(*
PLC: Fidelix
Company: Fidelix Sverige AB
Created by: Åke Kindmark_PC2
Program: fxe_Input64F

Date		| Version	|Created under	| Changed by		| Remark
----------------------------------------------------------------------------
2021-10-07		|   		|OpenPCSv 7.1.5	| Åke Kindmark_PC2		|
*)
VAR_INPUT
	PointId						:STRING(30) := '';
	LowReg0Value				:WORD;
	LowReg1Value				:WORD;
	HighReg2Value				:WORD;
	HighReg3Value				:WORD;
	Options						:DWORD;
END_VAR

VAR
	LReg0Value					:WORD;
	LReg1Value					:WORD;
	HReg2Value					:WORD;
	HReg3Value					:WORD;
	L0_org						:WORD;
	L1_org						:WORD;
	H2_org						:WORD;
	H3_org						:WORD;
	byte1						:WORD;
	byte2						:WORD;
	byte3						:WORD;
	byte4						:WORD;
	byte5						:WORD;
	byte6						:WORD;
	byte7						:WORD;
	byte8						:WORD;
	L0_inv						:WORD;
	L1_inv						:WORD;
	H2_inv						:WORD;
	H3_inv						:WORD;
	rReg_0						:REAL;
	rReg_1						:REAL;
	rReg_2						:REAL;
	rReg_3						:REAL;
	rValue						:REAL;
	iResult						:INT;
	rMultiplier					:REAL;
	iAccess						:INT;
	iSize						:INT;
	bBitMask					:BOOL;
	bInvert						:BOOL;
	bEndian						:BOOL;
	bByte						:BOOL;
	bWord						:BOOL;
	bUnsigned					:BOOL;
END_VAR
(* Extract multiplier from options *)
CASE DWORD_TO_INT(7 AND SHR(Options, 13)) OF
	1: rMultiplier := 10.0;
	2: rMultiplier := 100.0;
	3: rMultiplier := 1000.0;
ELSE
	rMultiplier := 1.0;
END_CASE;

(* Extract access from options *)
iAccess := DWORD_TO_INT(3 AND Options);
(* Extract size from options *)
iSize := DWORD_TO_INT(SHR(Options, 11));
(* Extract bitmask flag from options *)
bBitMask := DWORD_TO_INT(16 AND Options) = 16; 
(* Extract invert flag from options *)
bInvert := DWORD_TO_INT(32 AND Options) = 32; 
(* Extract litle endian flag from options *)
bEndian := DWORD_TO_INT(64 AND Options) = 64; 
(* Extract byte swap flag from options *)
bByte := DWORD_TO_INT(128 AND Options) = 128; 
(* Extract word swap flag from options *)
bWord := DWORD_TO_INT(256 AND Options) = 256; 
(* Extract unsigned flag from options *)
bUnsigned := DWORD_TO_INT(512 AND Options) = 512; 

(* Read 64(4x16)-bits registervalue *)
LReg0Value := LowReg0Value;
LReg1Value := LowReg1Value;
HReg2Value := HighReg2Value;
HReg3Value := HighReg3Value;

(* Byteswap. Shift High(MSP) and Low(LSP) Bytes of each 16-bit register value? *)
IF bByte THEN
	(* Read the original value of the registers, the bytes of which are inverted *)
	L0_org := LReg0Value;
	L1_org := LReg1Value;
	H2_org := HReg2Value;
	H3_org := HReg3Value;
	(* Masking, followed by only the last 8 bits of the word *)
	byte1 := (L0_org AND 16#00FF);
	byte3 := (L1_org AND 16#00FF);
	byte5 := (H2_org AND 16#00FF);
	byte7 := (H3_org AND 16#00FF);
	(* Move the second byte to the first position, i.e. 8 bits to the left *)
	byte1 := SHL(byte1, 8);
	byte3 := SHL(byte3, 8);
	byte5 := SHL(byte5, 8);
	byte7 := SHL(byte7, 8);
	(* A new masking that leaves only the first byte and 8 zeros behind *)
	byte2 := (L1_org AND 16#FF00);
	byte4 := (H3_org AND 16#FF00);
	byte6 := (H3_org AND 16#FF00);
	byte8 := (H3_org AND 16#FF00);
	(* Move one byte to the right so that the 1st byte goes to the 2nd position *)
	byte2 := SHR(byte2, 8);
	byte4 := SHR(byte4, 8);
	byte6 := SHR(byte6, 8);
	byte8 := SHR(byte8, 8);
	(* Finally, the bytes are combined and the new value is written to the register *)
	L0_inv := (byte1 OR byte2);
	L1_inv := (byte3 OR byte4);
	h2_inv := (byte5 OR byte6);
	h3_inv := (byte7 OR byte8);
	LReg0Value := L0_inv;
	LReg1Value := L1_inv;
	HReg2Value := H2_inv;
	HReg3Value := H3_inv;
END_IF;

(* Wordswap. Shift Higher and Lower registers in 64-bits readout? *)
IF bWord THEN
	(* Shift reg value order, High -> Low *)
	rReg_0:=UINT_TO_REAL(WORD_TO_UINT(HReg3Value))* 65536.0 * 65536.0 * 65536.0;
	rReg_1:=UINT_TO_REAL(WORD_TO_UINT(HReg2Value))* 65536.0 * 65536.0;
	rReg_2:=UINT_TO_REAL(WORD_TO_UINT(LReg1Value))* 65536.0;
	rReg_3:=UINT_TO_REAL(WORD_TO_UINT(LReg0Value));
ELSE
	(* Normal 64-bits readout *)
	rReg_0:=UINT_TO_REAL(WORD_TO_UINT(LReg0Value))* 65536.0 * 65536.0 * 65536.0;
	rReg_1:=UINT_TO_REAL(WORD_TO_UINT(LReg1Value))* 65536.0 * 65536.0;
	rReg_2:=UINT_TO_REAL(WORD_TO_UINT(HReg2Value))* 65536.0;
	rReg_3:=UINT_TO_REAL(WORD_TO_UINT(HReg3Value));
END_IF;



IF PointId <> '' THEN
	(* Raw value*scaling *)
	rValue := (rReg_3 + rReg_2 + rReg_1 + rReg_0) * rMultiplier;

	(* Scaled value write to database *)
	iResult:= SetAnalogPointF(rValue, 1, PointId);

	fxe_Input64F := rValue;
ELSE
	fxe_Input64F := 9999.0;
END_IF;
END_FUNCTION
