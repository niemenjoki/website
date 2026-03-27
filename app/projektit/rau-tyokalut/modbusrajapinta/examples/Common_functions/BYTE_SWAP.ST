FUNCTION_BLOCK BYTE_SWAP
VAR_EXTERNAL

END_VAR

VAR_INPUT
word_orig : word;
END_VAR

VAR_OUTPUT
word_swapped : word;
END_VAR

VAR
	original : word := 0;
	inverted : word := 0;
	byte1, byte2 : word;
END_VAR
(*Blokki vaihtaa 2-tavuisen sanan tavujen paikkaa*)

(*Input: 16-bittinen sana*)
(*Output: input tavut k??nnettyn?, alkuper?iset bitit 1-8 paikoilla 9-16 ja p?invastoin*)


	(*Luetaan alkuper?inen rekisterin arvo, jonka tavut k??nnet??n*)
	original := word_orig;
	
	(*Maskaus, jonka j?lkeen sanassa on vain 8 viimeist? bitti?*)
	byte1 := (original AND 16#00FF);
	
	(*Siirret??n toinen tavu ensimm?isen paikalle, eli 8 bitti? vasemmalle*)
	byte1 := SHL(byte1, 8);
	
	(*Uusi maskaus, jossa j?tet??n vain ensimm?inen tavu ja 8 nollaa per??n*)
	byte2 := (original AND 16#FF00);
	
	(*Siirret??n tavun verran oikealle, jolloin 1. tavu menee 2. paikalle*)
	byte2 := SHR(byte2, 8);
	
	(*Lopuksi yhdistet??n tavut ja kirjoitetaan uusi arvo rekisteriin*)
	inverted := (byte1 OR byte2);

	word_swapped := inverted;

END_FUNCTION_BLOCK