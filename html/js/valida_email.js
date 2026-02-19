/*

Biblioteca de validação de email


----- validateEmailTypo - valida tipografia do email

exemplo de uso:
	$("#email").blur(function(e) {
		validateEmailTypo(document.form_cadastro.email);
	});



------ checkEmail - Valida se o email é valido, com @ e .

exemplo de uso:

	if($("#email").val().length>0){
		if(!checkEmail($("#email").val())){
			alert("O campo EMAIL deve conter um endereço válido!");
			$("#email").focus();
			return false;
		}
	}
	
*/






function createBidimensionalArray(n1,n2){
	var a1 = new Array(n1);
	for(var i=0;i<n1;i++){
		a1[i] = new Array(n2);
	}
	return a1;
}

function validateEmailTypo(textField) {
	var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;  
    if(!emailPattern.test(textField.value)){
		return false;		
	}  
    var email = textField.value.split("@");
	var emailFilter = createBidimensionalArray(71,2);
	emailFilter[0][0] = new RegExp("^(.+)\.b$");
	emailFilter[0][1] = "$1.br";
	emailFilter[1][0] = new RegExp("^(.+)\.b[et]+r$");
	emailFilter[1][1] = "$1.br";
	emailFilter[2][0] = new RegExp("^bkb\.com\.br$");
	emailFilter[2][1] = "itaubank.com.br";
	emailFilter[3][0] = new RegExp("^bo{2,}l\.com\.br$");
	emailFilter[3][1] = "bol.com.br";
	emailFilter[4][0] = new RegExp("^bolcom\.br$");
	emailFilter[4][1] = "bol.com.br";
	emailFilter[5][0] = new RegExp("^(.+)\.br{2,}$");
	emailFilter[5][1] = "$1.br";
	emailFilter[6][0] = new RegExp("^(.+)\.c[io]{1}n?.?br$");
	emailFilter[6][1] = "$1.com.br";
	emailFilter[7][0] = new RegExp("^clik21\.com\.br$");
	emailFilter[7][1] = "click21.com.br";
	emailFilter[8][0] = new RegExp("^(.+)\.c[xpmi]{1}o?m{0,2}.?br$");
	emailFilter[8][1] = "$1.com.br";
	emailFilter[9][0] = new RegExp("^g[l]{2,}.*ma?il\.com$");
	emailFilter[9][1] = "globomail.com";
	emailFilter[10][0] = new RegExp("^g[^lo].*ma?il.com(.br)?$");
	emailFilter[10][1] = "gmail.com";
	emailFilter[11][0] = new RegExp("^globo.com.br$");
	emailFilter[11][1] = "globo.com";
	emailFilter[12][0] = new RegExp("^g[^m]{0,2}ail\.com[^\.]*.*$");
	emailFilter[12][1] = "gmail.com";
	emailFilter[13][0] = new RegExp("^gm[^a]{0,2}il\.com[^\.]*.*$");
	emailFilter[13][1] = "gmail.com";
	emailFilter[14][0] = new RegExp("^gma[^i]*l\.com[^\.]*.*$");
	emailFilter[14][1] = "gmail.com";
	emailFilter[15][0] = new RegExp("^gmai[^l]*\.com[^\.]*.*$");
	emailFilter[15][1] = "gmail.com";
	emailFilter[16][0] = new RegExp("^h.{1,2}otmail\.com[^\.]*.*$");
	emailFilter[16][1] = "hotmail.com";
	emailFilter[17][0] = new RegExp("^([^hg]|.h)otmail.com[^.]*.*$");
	emailFilter[17][1] = "hotmail.com";
	emailFilter[18][0] = new RegExp("^ho.{1,2}tmail\.com[^\.]*.*$");
	emailFilter[18][1] = "hotmail.com";
	emailFilter[19][0] = new RegExp("^hot.{1,2}mail\.com[^\.]*.*$");
	emailFilter[19][1] = "hotmail.com";
	emailFilter[20][0] = new RegExp("^hot(,ail)?.com(\.br)?$");
	emailFilter[20][1] = "hotmail.com";
	emailFilter[21][0] = new RegExp("^hot(amil|mial)(\.com)?(\.br)?$");
	emailFilter[21][1] = "hotmail.com";
	emailFilter[22][0] = new RegExp("^hot[a-z]{1}mal\.com.*$");
	emailFilter[22][1] = "hotmail.com";
	emailFilter[23][0] = new RegExp("^hotim[a-z]*i[a-z]*\.com.*$");
	emailFilter[23][1] = "hotmail.com";
	emailFilter[24][0] = new RegExp("^hotmai.{1,2}l\.com[^\.]*.*$");
	emailFilter[24][1] = "hotmail.com";
	emailFilter[25][0] = new RegExp("^hotmail\.br$");
	emailFilter[25][1] = "hotmail.com";
	emailFilter[26][0] = new RegExp("^hotmail\.co[^m]{0,1}$");
	emailFilter[26][1] = "hotmail.com";
	emailFilter[27][0] = new RegExp("^hotmail\.com[^\.]{1}.*$");
	emailFilter[27][1] = "hotmail.com";
	emailFilter[28][0] = new RegExp("^hotma.+il(\.com)?(\.br)?$");
	emailFilter[28][1] = "hotmail.com";
	emailFilter[29][0] = new RegExp("^hotmail\.com\.br$");
	emailFilter[29][1] = "hotmail.com";
	emailFilter[30][0] = new RegExp("^h[^o]*tmail\.com[^\.]*.*$");
	emailFilter[30][1] = "hotmail.com";
	emailFilter[31][0] = new RegExp("^hot[^m]*ail\.com[^\.]*.*$");
	emailFilter[31][1] = "hotmail.com";
	emailFilter[32][0] = new RegExp("^hot\.mail\.com$");
	emailFilter[32][1] = "hotmail.com";
	emailFilter[33][0] = new RegExp("^hotm[^a]*il\.com[^\.]*.*$");
	emailFilter[33][1] = "hotmail.com";
	emailFilter[34][0] = new RegExp("^hotma[^i]*l\.com[^\.]*.*$");
	emailFilter[34][1] = "hotmail.com";
	emailFilter[35][0] = new RegExp("^hotmai[^l]*\.com[^\.]*.*$");
	emailFilter[35][1] = "hotmail.com";
	emailFilter[36][0] = new RegExp("^hotmail(,|.\.)com$");
	emailFilter[36][1] = "hotmail.com";
	emailFilter[37][0] = new RegExp("^hotmail$");
	emailFilter[37][1] = "hotmail.com";
	emailFilter[38][0] = new RegExp("^ho(?!t).*[mt]*ail\.com[^\.]*.*$");
	emailFilter[38][1] = "hotmail.com";
	emailFilter[39][0] = new RegExp("^htomail\.com$");
	emailFilter[39][1] = "hotmail.com";
	emailFilter[40][0] = new RegExp("^ibeste*.com$");
	emailFilter[40][1] = "ibest.com.br";
	emailFilter[41][0] = new RegExp("^ig.com(br)?$");
	emailFilter[41][1] = "ig.com.br";
	emailFilter[42][0] = new RegExp("^igi\.com\.br$");
	emailFilter[42][1] = "ig.com.br";
	emailFilter[43][0] = new RegExp("^ig(.com?)?$");
	emailFilter[43][1] = "ig.com.br";
	emailFilter[44][0] = new RegExp("^itelefonica\.com$");
	emailFilter[44][1] = "itelefonica.com.br";
	emailFilter[45][0] = new RegExp("^msn\.com\.br$");
	emailFilter[45][1] = "msn.com";
	emailFilter[46][0] = new RegExp("^rot[a-z]?mail\.com$");
	emailFilter[46][1] = "hotmail.com";
	emailFilter[47][0] = new RegExp("^superig.com$");
	emailFilter[47][1] = "superig.com.br";
	emailFilter[48][0] = new RegExp("^teraa.com.br$");
	emailFilter[48][1] = "terra.com.br";
	emailFilter[49][0] = new RegExp("^tera\.com\.br$");
	emailFilter[49][1] = "terra.com.br";
	emailFilter[50][0] = new RegExp("^ter{2,}a(.c[om]{0,2})?$");
	emailFilter[50][1] = "terra.com.br";
	emailFilter[51][0] = new RegExp("^terr[r]+a\.com\.br$");
	emailFilter[51][1] = "terra.com.br";
	emailFilter[52][0] = new RegExp("^u[^o]{1}l\.com\.br?$");
	emailFilter[52][1] = "uol.com.br";
	emailFilter[53][0] = new RegExp("^uol{2,}.com.br?$");
	emailFilter[53][1] = "uol.com.br";
	emailFilter[54][0] = new RegExp("^uol(\.com)$");
	emailFilter[54][1] = "uol.com.br";
	emailFilter[55][0] = new RegExp("^vol\.com\.br$");
	emailFilter[55][1] = "uol.com.br";
	emailFilter[56][0] = new RegExp("^ya(hhoo|hooo)\.com\.br$");
	emailFilter[56][1] = "yahoo.com.br";
	emailFilter[57][0] = new RegExp("^[^y]*ahoo\.com\.br$");
	emailFilter[57][1] = "yahoo.com.br";
	emailFilter[58][0] = new RegExp("^y[^a]*hoo\.com\.br$");
	emailFilter[58][1] = "yahoo.com.br";
	emailFilter[59][0] = new RegExp("^ya[^h]*oo\.com\.br$");
	emailFilter[59][1] = "yahoo.com.br";
	emailFilter[60][0] = new RegExp("^yah[^o]*o\.com\.br$");
	emailFilter[60][1] = "yahoo.com.br";
	emailFilter[61][0] = new RegExp("^yaho[^o]*\.com\.br$");
	emailFilter[61][1] = "yahoo.com.br";
	emailFilter[62][0] = new RegExp("^yahoo\.com[^\.]+$");
	emailFilter[62][1] = "yahoo.com";
	emailFilter[63][0] = new RegExp("^yah?ool.com?(.br)?$");
	emailFilter[63][1] = "yahoo.com.br";
	emailFilter[64][0] = new RegExp("^yhaoo\.com\.br$");
	emailFilter[64][1] = "yahoo.com.br";
	emailFilter[65][0] = new RegExp("^zipemail\.com\.br$");
	emailFilter[65][1] = "zipmail.com.br";
	emailFilter[66][0] = new RegExp("^bo+l.c[om]{2}$");
	emailFilter[66][1] = "bol.com.br";
	emailFilter[67][0] = new RegExp("^bo+l.c[om]{0,1}.br$");
	emailFilter[67][1] = "bol.com.br";
	emailFilter[68][0] = new RegExp("^gmail.c[om]{0,2}.br$");
	emailFilter[68][1] = "gmail.com";
	emailFilter[69][0] = new RegExp("^(.+).com.be$");
	emailFilter[69][1] = "$1.com.br";
	emailFilter[70][0] = new RegExp("^gmail[A-Za-z0-9]+.com$");
	emailFilter[70][1] = "gmail.com";
	for(var i=0;i<emailFilter.length;i++){
		if (email[1].toLowerCase().match(emailFilter[i][0])) {
			if(confirm("Você digitou: '"+textField.value.toLowerCase()+"'.\nDeseja alterar para: '"+email[0].toLowerCase()+"@"+email[1].toLowerCase().replace(emailFilter[i][0], emailFilter[i][1])+"'?")){
				textField.value = email[0]+"@"+email[1].toLowerCase().replace(emailFilter[i][0], emailFilter[i][1]);
			}
			break;
		}
	}
}	


function checkEmail(email) {
	if(/^[a-z0-9._-]+@[a-z0-9.-]{2,}[.][a-z]{2,3}$/.test(email)){
		return true;
	} else {
		return false;
	}
}
