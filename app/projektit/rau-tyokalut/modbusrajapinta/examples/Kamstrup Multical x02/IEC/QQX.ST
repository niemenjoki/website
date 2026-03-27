PROGRAM QQX
VAR
	MulticalFB1					:FXIEC_MULTICAL_FB;
END_VAR

VAR CONSTANT
	L_PER_H 	: REAL := 0.0027777778;
	M3_PER_H 	: REAL := 0.2777777778;
END_VAR
(*Multical 602 Modbus Floating point versio, desimaalien määrä aina oikein :)

default väylä asetukset
baud 19200
paritettti even
stopbit 1
address "sarjanumeron 3 viimeisintä numero ennen vuosilukia, 254max, jos suurempi niin 2 viimeistä"
esim 649455879/2014
		   xxx ->879 ->79
*)

MulticalFB1(
	Port 			:= 0,
	Address 		:= 0,
	Energy 			:= 'SLTMI_QQ1_ENERGIA_FM', (*Lämmitysenergia MWh*)
	Energy3			:= '', (*Jäähdytysenergia MWh*)
	Flow 			:= 'SLTMI_QQ1_FE_FM', (*l/h => l/s*)
	Volume			:= '', (* *)
	Power			:= 'SLTMI_QQ1_TEHO_FM', (*kW*)
	TE_inlet		:= 'SLTMI_QQ1_TE_Q1A_FM', (*'C*)
	TE_outlet		:= 'SLTMI_QQ1_TE_Q1B_FM', (*'C*)
	Comm_alarm		:= 'SLTMI_QQ1_MODBUS_FH', (*Tiedonsiirtohälytys*)
	rFlowMultiplier	:= L_PER_H (* Yksikkö vaihtelee. Katso mittarin näytöltä yksikkö ja kirjoita tähän L_PER_H tai M3_PER_H *)
);

END_PROGRAM