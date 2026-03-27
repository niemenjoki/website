PROGRAM EQSX
VAR
	fbGavazzi					:FXIEC_EM300_FM;
END_VAR
fbGavazzi (
	port			:=0, 
	modbus_address	:=1, 
	id_a_l1			:= 'SLTMI_EQ_S1_VIRTA_L1_FM', 
	id_a_l2			:= 'SLTMI_EQ_S1_VIRTA_L2_FM', 
	id_a_l3			:= 'SLTMI_EQ_S1_VIRTA_L3_FM',
	id_kw			:= 'SLTMI_EQ_S1_TEHO_FM', 
	id_hz			:= 'SLTMI_EQ_S1_TAAJUUS_FM', 
	id_kwh			:= 'SLTMI_EQ_S1_KULUTETTU_FM', 
	id_modbus_alarm	:= 'SLTMI_EQ_S1_MODBUS_FH'
);

END_PROGRAM