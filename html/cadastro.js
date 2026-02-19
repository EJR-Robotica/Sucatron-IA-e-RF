

var postou = false;

function checkForm(){
	return true;
}


function cadastro_sucesso( result ){
	alert(result.mensagem);
	window.location= "index.php";
		
}


function salvar_cadastro(){
	
	//validações
	
	if($("#nome").val().length < 3 ){
		alert("Preencha o seu nome");
		$("#nome").focus();
		return false;
	}
	
	
	if(!checkData($("#data_nascimento").val())){
		alert("Preencha a DATA DE NASCIMENTO no formato dd/mm/aaaa!");
		$("#data_nascimento").focus();
		return false;
	}
	
	if($("#email").val().length>0){
		if(!checkEmail($("#email").val())){
			alert("O campo EMAIL deve conter um endereço válido!");
			$("#email").focus();
			return false;
		}
	}
	
	
    if($("#senha").val().length<3 || $("#senha").val().length>10){
		alert("A SENHA precisa conter entre 3 e 10 caracteres.");
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
	
	
	salva_form( "services/setCadastro.php", $("#form_cadastro"), cadastro_sucesso );
}



function volta_inicio(){
	
	window.location= "index.php";
	
}


$(document).ready( function(){

	//$.watermark.options.className = 'field_watermark';
		
	
	$("#email").blur(function(e) {
		validateEmailTypo(document.form_cadastro.email);
	});
	
	$("#data_nascimento").mask("99/99/9999",{placeholder:"_"});
	
	carrega_instituicoes();
	carrega_times();
	
});