FUNCTION_BLOCK FXIEC_EM300_FM
VAR_EXTERNAL

END_VAR

VAR_INPUT
	port :int;
	modbus_address :int;
	id_v_l1_n :string(30);
	id_v_l2_n :string(30);
	id_v_l3_n :string(30);
	id_v_l1_l2 :string(30);
	id_v_l2_l3 :string(30);
	id_v_l3_l1 :string(30);
	id_a_l1 :string(30);
	id_a_l2 :string(30);
	id_a_l3 :string(30);
	id_kw_l1 :string(30);
	id_kw_l2 :string(30);
	id_kw_l3 :string(30);
	id_kw :string(30);
	id_kva :string(30);
	id_kvar :string(30);
	id_pf :string(30);
	id_hz :string(30);
	id_kwh :string(30);
	id_kvarh :string(30);
	id_modbus_alarm:string(30);
	
END_VAR

VAR_OUTPUT

END_VAR

VAR
MODBUS:genericmodbus642fb;
udint_Result:udint;
Result:int;
i : INT;
END_VAR


MODBUS (Send:=0, Module:=modbus_address, StartRegister:=0, RegisterType:=3, Port:=port);
if MODBUS.datavalid = 1 then
	udint_Result := DoubleInputRegF(id_String:=id_v_l1_n,  HighRegValue:=MODBUS.REG1,  LowRegValue:=MODBUS.REG0,  rMultiplier:=10.0);
	udint_Result := DoubleInputRegF(id_String:=id_v_l2_n,  HighRegValue:=MODBUS.REG3,  LowRegValue:=MODBUS.REG2,  rMultiplier:=10.0);
	udint_Result := DoubleInputRegF(id_String:=id_v_l3_n,  HighRegValue:=MODBUS.REG5,  LowRegValue:=MODBUS.REG4,  rMultiplier:=10.0);
	udint_Result := DoubleInputRegF(id_String:=id_v_l1_l2,  HighRegValue:=MODBUS.REG7,  LowRegValue:=MODBUS.REG6,  rMultiplier:=10.0);
	udint_Result := DoubleInputRegF(id_String:=id_v_l2_l3,  HighRegValue:=MODBUS.REG9,  LowRegValue:=MODBUS.REG8,  rMultiplier:=10.0);
	udint_Result := DoubleInputRegF(id_String:=id_v_l3_l1,  HighRegValue:=MODBUS.REG11,  LowRegValue:=MODBUS.REG10,  rMultiplier:=10.0);
	udint_Result := DoubleInputRegF(id_String:=id_a_l1,  HighRegValue:=MODBUS.REG13,  LowRegValue:=MODBUS.REG12,  rMultiplier:=1000.0);
	udint_Result := DoubleInputRegF(id_String:=id_a_l2,  HighRegValue:=MODBUS.REG15,  LowRegValue:=MODBUS.REG14,  rMultiplier:=1000.0);
	udint_Result := DoubleInputRegF(id_String:=id_a_l3,  HighRegValue:=MODBUS.REG17,  LowRegValue:=MODBUS.REG16,  rMultiplier:=1000.0);
	udint_Result := DoubleInputRegF(id_String:=id_kw_l1,  HighRegValue:=MODBUS.REG19,  LowRegValue:=MODBUS.REG18,  rMultiplier:=10000.0);
	udint_Result := DoubleInputRegF(id_String:=id_kw_l2,  HighRegValue:=MODBUS.REG21,  LowRegValue:=MODBUS.REG20,  rMultiplier:=10000.0);
	udint_Result := DoubleInputRegF(id_String:=id_kw_l3,  HighRegValue:=MODBUS.REG23,  LowRegValue:=MODBUS.REG22,  rMultiplier:=10000.0);
	udint_Result := DoubleInputRegF(id_String:=id_kw,  HighRegValue:=MODBUS.REG41,  LowRegValue:=MODBUS.REG40,  rMultiplier:=10000.0);
	udint_Result := DoubleInputRegF(id_String:=id_kva,  HighRegValue:=MODBUS.REG43,  LowRegValue:=MODBUS.REG42,  rMultiplier:=10000.0);
	udint_Result := DoubleInputRegF(id_String:=id_kvar,  HighRegValue:=MODBUS.REG45,  LowRegValue:=MODBUS.REG44,  rMultiplier:=10000.0);
	Result:=InputRegF(id_String:=id_pf, RegValue:=MODBUS.Reg49,  rMultiplier:=1000.0);
end_if;

MODBUS (Send:=0, Module:=modbus_address, StartRegister:=50, RegisterType:=3, Port:=port);
if MODBUS.datavalid = 1 then
	Result:=InputRegF(id_String:=id_hz, RegValue:=MODBUS.Reg1,  rMultiplier:=10.0);
	udint_Result := DoubleInputRegF(id_String:=id_kwh,  HighRegValue:=MODBUS.REG3,  LowRegValue:=MODBUS.REG2,  rMultiplier:=10.0);
	udint_Result := DoubleInputRegF(id_String:=id_kvarh,  HighRegValue:=MODBUS.REG5,  LowRegValue:=MODBUS.REG4,  rMultiplier:=10.0);
end_if;

(* Tarkistetaan kommunikaation toimivuus ja asetetaan hälytyspisteen tila *)
Result := SetDigitalPointF( Value:=BOOL_TO_INT(GetSystemStatusF( Mode:=1, iParameter:=modbus_address, rParameter:=int_to_real(port) ) > 30.0), LockState:=1, Name:=id_modbus_alarm );
END_FUNCTION_BLOCK