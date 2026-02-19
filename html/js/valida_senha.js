/*

Biblioteca de validação de senhas


----- checkPassword - valida a senha digitada

exemplo de uso:
    if($("#senha").val().length<5 || $("#senha").val().length>10){
		alert("A SENHA precisa conter entre 5 e 10 caracteres.");
		$("#senha").focus();
		return false;
	}
    if(!checkPassword($("#senha").val())){
		alert("A SENHA deve conter apenas caracteres\nalfanuméricos (letras e/ou números).");
		$("#senha").focus();
		return false;
	}
    if($("#senha2").val() != $("#senha").val()){
		alert("A senha e a senha de confirmação não são idênticas. Por favor digite novamente.");
		$("#senha").focus();
		return false;
	}


*/


  
    
    
    
function checkPassword(sText) {
   var validChars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
   var isValid = true;
   var char;

   for (i=0;i<sText.length && isValid==true;i++){ 
      char = sText.charAt(i); 
      if (validChars.indexOf(char) == -1){
         isValid = false;
      }
   }
   return (isValid && (sText.length>0));   
}
    