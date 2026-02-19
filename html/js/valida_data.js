/*
Biblioteca de validação de datas


----- checkData - valida se a data segue o padrão dd/mm/aaa

exemplo de uso:
	if(!checkData($("#data_nascimento").val())){
		alert("Preencha a DATA DE NASCIMENTO no formato dd/mm/aaaa!");
		$("#data_nascimento").focus();
		return false;
	}
	
	
	
----- checkIdade - Calcula a idade a partir de uma data de nascimento

exemplo de uso:
	if(checkIdade($("#nascimento").val())<18){
		alert("É necessário ser maior de 18 anos para se cadastrar.");
		$("#nascimento").focus();
		return false;
	}







*/

function checkData(d) {
	var date=d;
	var ardt=new Array;
	var ExpReg=new RegExp("(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[012])/[12][0-9]{3}");
	ardt=date.split("/");
	err=false;
	if ( date.search(ExpReg)==-1){
		err = true;
		}
	else if (((ardt[1]==4)||(ardt[1]==6)||(ardt[1]==9)||(ardt[1]==11))&&(ardt[0]>30))
		err = true;
	else if ( ardt[1]==2) {
		if ((ardt[0]>28)&&((ardt[2]%4)!=0))
			err = true;
		if ((ardt[0]>29)&&((ardt[2]%4)==0))
			err = true;
	}
	return !err;
}


function checkIdade(data){ 
   	hoje=new Date(); 
   	var array_data = data.split("/");
   	if (array_data.length!=3) {
      	 return 0;
	}

   	var ano = parseInt(array_data[2]); 
   	if (isNaN(ano)){
      	 return 0;
	}

   	var mes = parseInt(array_data[1]); 
   	if (isNaN(mes)){
      	 return 0;
	}

   	var dia = parseInt(array_data[0]);	
   	if (isNaN(dia)){
      	 return 0;
	}
	
   	idade = hoje.getFullYear()- ano - 1;

   	if (hoje.getMonth() + 1 - mes < 0)
      	 return idade;
   	if (hoje.getMonth() + 1 - mes > 0) 
      	 return idade + 1;
   	if (hoje.getUTCDate() - dia >= 0) 
      	 return idade + 1;

   	return idade;
} 
