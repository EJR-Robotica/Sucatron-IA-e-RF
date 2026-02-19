var file = location.href.substring(location.href.lastIndexOf("/")+1,255);
var currentPage = "";
var linkAtual = "";
var lastResult = null;
var lastTipo = 0;
var id_usuario = "";
var header = '';
var content = '';
var editing = false;
var	headerDistribuidores = '';
var	contentDistribuidores = '';
var	headerGerentes = '';
var	contentGerentes = '';
var	headerSupervisores = '';
var	contentSupervisores = '';
var	headerVendedores = '';
var	contentVendedores = '';
var	headerVendedoresB = '';
var	contentVendedoresB = '';
var cpfResult = false;


 
// --------------------------------------------------------------------------------------------------
function getInternetExplorerVersion() {
	var rv = -1;
	if (navigator.appName == 'Microsoft Internet Explorer') {
		var ua = navigator.userAgent;
		var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
		if (re.exec(ua) != null) {
			rv = parseFloat( RegExp.$1 );
		}
	}
	return rv;
}

// --------------------------------------------------------------------------------------------------
function isOnlyNumbers(sText) {
   var validChars = "0123456789";
   var isNumber=true;
   var char;

   for (i=0;i<sText.length && isNumber==true;i++){ 
      char = sText.charAt(i); 
      if (validChars.indexOf(char) == -1){
         isNumber = false;
      }
   }
   return (isNumber && (sText.length>0));   
}

// --------------------------------------------------------------------------------------------------
function getDigits(n) {
    return n.replace(/[^\d]+/g,'');
}

// --------------------------------------------------------------------------------------------------
function createBidimensionalArray(n1,n2){
	var a1 = new Array(n1);
	for(var i=0;i<n1;i++){
		a1[i] = new Array(n2);
	}
	return a1;
}

// --------------------------------------------------------------------------------------------------
function checkDate(d) {
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

// --------------------------------------------------------------------------------------------------
function remove(str, sub) {
	i = str.indexOf(sub);
	r = "";
	if (i == -1) return str;
	r += str.substring(0,i) + remove(str.substring(i + sub.length), sub);
	return r;
}

// --------------------------------------------------------------------------------------------------
function checkCPF(cpf) {
	CPF = remove(cpf, ".");
	CPF = remove(CPF, "-");	
	if (CPF.length != 11 || CPF == "00000000000" || CPF == "11111111111" ||
	  	CPF == "22222222222" ||	CPF == "33333333333" || CPF == "44444444444" ||
	  	CPF == "55555555555" || CPF == "66666666666" || CPF == "77777777777" ||
	  	CPF == "88888888888" || CPF == "99999999999")
	return false;
	soma = 0;
	for(i=0; i < 9; i ++)
		soma += parseInt(CPF.charAt(i)) * (10 - i);
	resto = 11 - (soma % 11);
	if(resto == 10 || resto == 11)
		resto = 0;
	if(resto != parseInt(CPF.charAt(9)))
		return false;
	soma = 0;
	for(i = 0; i < 10; i ++)
		soma += parseInt(CPF.charAt(i)) * (11 - i);
	resto = 11 - (soma % 11);
	if(resto == 10 || resto == 11)
		resto = 0;
	if(resto != parseInt(CPF.charAt(10)))
		return false;
	return true;
}

// --------------------------------------------------------------------------------------------------
function checkCNPJ(cnpj) {
 
    cnpj = cnpj.replace(/[^\d]+/g,'');
 
    if(cnpj == '') return false;
     
    if (cnpj.length != 14)
        return false;
 
    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" || 
        cnpj == "11111111111111" || 
        cnpj == "22222222222222" || 
        cnpj == "33333333333333" || 
        cnpj == "44444444444444" || 
        cnpj == "55555555555555" || 
        cnpj == "66666666666666" || 
        cnpj == "77777777777777" || 
        cnpj == "88888888888888" || 
        cnpj == "99999999999999")
        return false;
         
    // Valida DVs
    tamanho = cnpj.length - 2
    numeros = cnpj.substring(0,tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
        return false;
         
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0,tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
          return false;
           
    return true;
}

// --------------------------------------------------------------------------------------------------
function checkEmail(email) {
	if(/^[a-z0-9._-]+@[a-z0-9.-]{2,}[.][a-z]{2,4}$/.test(email)){
		return true;
	} else {
		return false;
	}
}

// --------------------------------------------------------------------------------------------------
function disableScroll() {
	document.body.scroll = "no";
	document.body.style.overflow = "hidden";
	document.width = window.innerWidth;
	document.height = window.innerHeight;
	scroll(0, 0);
}

// --------------------------------------------------------------------------------------------------
function zeroPad(num,count) {
	var numZeropad = num + '';
	while(numZeropad.length < count) {
		numZeropad = "0" + numZeropad;
	}
	return numZeropad;
}

// --------------------------------------------------------------------------------------------------
function redirectIncompatible() {
	var ver = getInternetExplorerVersion();
	if ( ver > -1 ) {
		if ( ver < 7.0 ) {
			window.location.href = 'incompativel/incompativel.asp';
		}
	}
}


// --------------------------------------------------------------------------------------------------
function mouseOver(id, src, linkAtivo) {
	if(linkAtivo != linkAtual) {
		$("#"+id).attr("src", src);
	}
}

// --------------------------------------------------------------------------------------------------
function balloontip(id, over) {
	if(over == true) {
		$("#"+id).stop().fadeTo(300, 1);
	} else {
		$("#"+id).stop().fadeTo(300, 0);
	}
}

// --------------------------------------------------------------------------------------------------
function getDocHeight() {
    var D = document;
    return Math.max(
        Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
        Math.max(D.body.offsetHeight, D.documentElement.offsetHeight),
        Math.max(D.body.clientHeight, D.documentElement.clientHeight)
    );
}

// --------------------------------------------------------------------------------------------------
jQuery.fn.center2 = function () {
    this.css("position","absolute");
    this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + 
                                                $(window).scrollTop()) + "px");
    this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + 
                                                $(window).scrollLeft()) + "px");
    return this;
}

// --------------------------------------------------------------------------------------------------
function checkFormLogin() {
	if($("#usuario").val().length==0){
		alert("O campo EMAIL é obrigatório.");
		$("#usuario").focus();
		return false;
	}
	if($("#senha").val().length==0){
		alert("O campo SENHA é obrigatório.");
		$("#senha").focus();
		return false;
	}
	$.ajax({
		async: false,
		type: "POST",
		url: "services/login.php",
		dataType: "json",
		data: $('#login').serialize(),
		error: function(result) {alert('ERRO DO SISTEMA: ' + e.responseText)},
		success: function(result) {
			if(result[0].result=="1"){
				window.location.href = 'status_ranking_geral.php';				
			} else if(result[0].result=="2"){
				window.location.href = 'senha.php';				
			} else {
				alert("Email ou senha inválidos.");
				$("#usuario").focus();
			}
		}
	});
}


function checkFormTrocaSenha() {

	if($("#senha_atual").val().length==0){
		alert("O campo SENHA é obrigatório.");
		$("#senha_atual").focus();
		return false;
	}
	if($("#nova_senha").val().length==0){
		alert("O campo NOVA SENHA é obrigatório.");
		$("#nova_senha").focus();
		return false;
	}
	if($("#confirma_senha").val().length==0){
		alert("O campo CONFIRMA NOVA SENHA é obrigatório.");
		$("#confirma_senha").focus();
		return false;
	}
	
	if($("#nova_senha").val() != $("#confirma_senha").val()){
		alert("O campo SENHA deve ser igual nos dois campos de confirmação.");
		$("#nova_senha").focus();
		return false;
	}
	
	$.ajax({
		async: false,
		type: "POST",
		url: "services/trocaSenha.php",
		dataType: "json",
		data: $('#formSenha').serialize(),
		error: function(result) {alert('ERRO DO SISTEMA: ' + e.responseText)},
		success: function(result) {
			if(result[0].result=="1"){
				window.location.href = 'status_ranking_geral.php';				
			}  else {
				alert("Email ou senha inválidos.");
				$("#usuario").focus();
			}
		}
	});
}

// --------------------------------------------------------------------------------------------------
function buscaCPF(cpf){
	var cpfResult = false;
	$.ajax({
		async: false,
		type: "POST",
		url: "services/getCPF.php",
		dataType: "json",
		data: "cpf="+cpf,
		error: function(e) {alert('ERRO DO SISTEMA: ' + e.responseText)},
		success: function(e) {
			if(e[0]){
				cpfResult = e[0].result=='1';
			}
		}
	});
	return cpfResult;
}

// --------------------------------------------------------------------------------------------------
function checkFormIncluir() {
	if($("#nome").val().length==0 || $("#nome").val()=="Nome"){
		alert("O campo NOME é obrigatório.");
		$("#nome").focus();
		return false;
	}
	if($("#cnpj").val().length==0 || $("#cnpj").val()=="CNPJ/CPF"){
		alert("O campo CNPJ/CPF é obrigatório.");
		$("#cnpj").focus();
		return false;
	}
	if(!checkCPF($("#cnpj").val())){
		if(!checkCNPJ($("#cnpj").val())){
			alert("O campo CNPJ/CPF deve conter um CNPJ ou CPF válido.");
			$("#cnpj").focus();
			return false;
		}
	}
	if(buscaCPF($("#cnpj").val())){
		alert("CNPJ/CPF já cadastrado.");
		$("#cnpj").focus();
		return false;
	}
	if(!checkEmail($("#email").val())){
		alert("O campo EMAIL é obrigatório e deve conter um endereço válido.");
		$("#email").focus();
		return false;
	}
	return true;
}

// --------------------------------------------------------------------------------------------------
function checkFormDistribuidor() {
	if($("#grupo").val().length==0){
		alert("O campo GRUPO é obrigatório.");
		$("#grupo").focus();
		return false;
	}
	if($("#razao_social").val().length==0){
		alert("O campo RAZÃO SOCIAL é obrigatório.");
		$("#razao_social").focus();
		return false;
	}
	if($("#nome").val().length==0){
		alert("O campo NOME FANTASIA é obrigatório.");
		$("#nome").focus();
		return false;
	}
	if($("#cnpj").val().length==0){
		alert("O campo CNPJ é obrigatório.");
		$("#cnpj").focus();
		return false;
	}
	if(!checkCNPJ($("#cnpj").val())){
		alert("O campo CNPJ deve conter um número válido.");
		$("#cnpj").focus();
		return false;
	}
	if(!editing){
		if(buscaCPF($("#cnpj").val())){
			alert("CNPJ já cadastrado.");
			$("#cnpj").focus();
			return false;
		}
	}
	if($("#endereco").val().length==0){
		alert("O campo ENDEREÇO é obrigatório.");
		$("#endereco").focus();
		return false;
	}
	if($("#bairro").val().length==0){
		alert("O campo BAIRRO é obrigatório.");
		$("#bairro").focus();
		return false;
	}
	if($("#cidade").val().length==0){
		alert("O campo CIDADE é obrigatório.");
		$("#cidade").focus();
		return false;
	}
	if($("#cep").val().length==0){
		alert("O campo CEP é obrigatório.");
		$("#cep").focus();
		return false;
	}
	if($("#responsavel").val().length==0){
		alert("O campo RESPONSAVEL é obrigatório.");
		$("#responsavel").focus();
		return false;
	}
	if($("#telefone").val().length==0){
		alert("O campo TELEFONE é obrigatório.");
		$("#telefone").focus();
		return false;
	}
	if(!checkEmail($("#email").val())){
		alert("O campo EMAIL é obrigatório e deve conter um endereço válido.");
		$("#email").focus();
		return false;
	}
	return true;
}

// --------------------------------------------------------------------------------------------------
function editar(tipo, id){
	editing = true;
	switch(tipo){
		case 3:
			$("#formCadastroDistLista").hide();
			$("#formCadastroDist").show();
			$('#formCadastroDist').each(function(){this.reset();});
			$("#grupo").val(lastResult[id].grupo);
			$("#razao_social").val(lastResult[id].razao_social);
			$("#nome").val(lastResult[id].nome);
			$("#cnpj").val(lastResult[id].cnpj);
			$("#ie").val(lastResult[id].ie);
			$("#endereco").val(lastResult[id].endereco);
			$("#bairro").val(lastResult[id].bairro);
			$("#cidade").val(lastResult[id].cidade);
			$("#uf").val(lastResult[id].uf);
			$("#cep").val(lastResult[id].cep);
			$("#responsavel").val(lastResult[id].responsavel);
			$("#telefone").val(lastResult[id].telefone);
			$("#email").val(lastResult[id].email);
			$("#valor_meta").val(lastResult[id].valor_meta);
			id_usuario = lastResult[id].id_usuario;
			break;
		default:
			break;	
	}
}

// --------------------------------------------------------------------------------------------------
function excluir(id){
	if(confirm("Deseja realmente excluir este registro?\n\nIMPORTANTE: Todos os registros subordinados\na este registro também serão excluídos.")){
		$.ajax({
			async: false,
			type: "POST",
			url: "services/incDistribuidor.php",
			dataType: "json",
			data: "id_usuario="+id+"&estado=9",
			error: function(e) {alert('ERRO DO SISTEMA: ' + e.responseText)},
			success: function(result) {
				if(result[0].result=="1"){
					alert("Registro(s) excluido(s) com sucesso.");
					window.location.href = currentPage + '.php';
					return true;
				} else {
					alert("Erro de comunicação com o servidor. Tente novamente.");
					return false;
				}
			}
		});
	} else {
		return false;
	}
}

// --------------------------------------------------------------------------------------------------
function gravar(tipo){
	switch(tipo){
		case 3:
			if(checkFormDistribuidor()){
				$.ajax({
					async: false,
					type: "POST",
					url: "services/incDistribuidor.php",
					dataType: "json",
					data: $('#formCadastroDist').serialize()+(id_usuario != "" ? "&id_usuario="+id_usuario : ""),
					error: function(e) {alert('ERRO DO SISTEMA: ' + e.responseText)},
					success: function(result) {
						if(result[0].result=="1"){
							alert("Dados gravados com sucesso.");
							window.location.href = 'cadastro_de_participantes_distribuidores.php';
							return true;
						} else {
							alert("Erro de comunicação com o servidor. Tente novamente.");
							return false;
						}
					}
				});		
			}
			break;
		case 4:
			if(checkFormIncluir()){
				$.ajax({
					async: false,
					type: "POST",
					url: "services/incGerente.php",
					dataType: "json",
					data: 'id_distribuidor=' + $('#distribuidor').val() + '&nome=' + $('#nome').val() + '&email=' + $('#email').val() + '&cnpj=' + $('#cnpj').val(),
					error: function(e) {alert('ERRO DO SISTEMA: ' + e.responseText)},
					success: function(result) {
						if(result[0].result=="1"){
							alert("Dados gravados com sucesso.");
							$('#nome').val('Nome');
							$('#cnpj').val('CNPJ/CPF');
							$('#email').val('Email');
							listaGerentes();
							return true;
						} else {
							alert("Erro de comunicação com o servidor. Tente novamente.");
							return false;
						}
					}
				});		
			}
			break;
		case 5:
			if(checkFormIncluir()){
				$.ajax({
					async: false,
					type: "POST",
					url: "services/incSupervisor.php",
					dataType: "json",
					data: 'id_distribuidor=' + $('#distribuidor').val() + '&id_gerente=' + $('#gerente').val() + '&nome=' + $('#nome').val() + '&email=' + $('#email').val() + '&cnpj=' + $('#cnpj').val(),
					error: function(e) {alert('ERRO DO SISTEMA: ' + e.responseText)},
					success: function(result) {
						if(result[0].result=="1"){
							alert("Dados gravados com sucesso.");
							$('#nome').val('Nome');
							$('#cnpj').val('CNPJ/CPF');
							$('#email').val('Email');
							listaSupervisores();
							return true;
						} else {
							alert("Erro de comunicação com o servidor. Tente novamente.");
							return false;
						}
					}
				});		
			}
			break;
		case 6:
			if(checkFormIncluir()){
				$.ajax({
					async: false,
					type: "POST",
					url: "services/incVendedor.php",
					dataType: "json",
					data: 'id_distribuidor=' + $('#distribuidor').val() + '&id_gerente=' + $('#gerente').val() + '&id_supervisor=' + $('#supervisor').val() + '&nome=' + $('#nome').val() + '&email=' + $('#email').val() + '&cnpj=' + $('#cnpj').val(),
					error: function(e) {alert('ERRO DO SISTEMA: ' + e.responseText)},
					success: function(result) {
						if(result[0].result=="1"){
							alert("Dados gravados com sucesso.");
							$('#nome').val('Nome');
							$('#cnpj').val('CNPJ/CPF');
							$('#email').val('Email');
							listaVendedores();
							return true;
						} else {
							alert("Erro de comunicação com o servidor. Tente novamente.");
							return false;
						}
					}
				});		
			}
			break;
		default:
			break;	
	}
	return false;
}

// --------------------------------------------------------------------------------------------------
function gravarMetas(tipo){
	switch(tipo){
		case 3:
		case 4:
		case 5:
		case 6:
			lastTipo = tipo;
			$.ajax({
				async: false,
				type: "POST",
				url: "services/updMetas.php",
				dataType: "json",
				data: $('#formCadastro').serialize(),
				error: function(e) {alert('ERRO DO SISTEMA: ' + e.responseText)},
				success: function(result) {
					if(result[0].result=="1"){
						alert("Dados gravados com sucesso.");
						// window.location.href = currentPage + '.php';
						switch(lastTipo){
							case 3 :
								var selected = $("#distribuidor").val();
								comboDistribuidores();
								$("#distribuidor").val(selected);
								$("#distribuidor").prop("selectedIndex");
								$("#cnpj0").val(lastResult[$("#distribuidor").prop("selectedIndex")].cnpj);
								$("#email0").val(lastResult[$("#distribuidor").prop("selectedIndex")].email);
								$("#resultado_meta0").val(lastResult[$("#distribuidor").prop("selectedIndex")].resultado_meta);
								$("#id0").val(lastResult[$("#distribuidor").prop("selectedIndex")].id_usuario);
								break;
							case 4 :
								listaGerentes();
								break;
							case 5 :
								listaSupervisores();
								break;
							case 6 :
								listaVendedores();
								break;
							default :
								break;
						}
						return true;
					} else {
						alert("Erro de comunicação com o servidor. Tente novamente.");
						return false;
					}
				}
			});		
			break;
	}
	return false;
}

// --------------------------------------------------------------------------------------------------
function comboDistribuidores(){
	$.ajax({
		async: false,
		type: "POST",
		url: "services/getDistribuidor.php",
		dataType: "json",
		data: "tipo=3",
		error: function(e) {alert('ERRO DO SISTEMA: ' + e.responseText)},
		success: function(result) {
			if(result[0]){
				var html = "";
				for(i=0;i<result.length;i++){
					html += '<option value="' + result[i].id_usuario + '">' + result[i].nome + '</option>'; 
				}
				$("#distribuidor").html(html);
				lastResult = result;
			} else {
				alert("Erro de comunicação com o servidor. Clique OK para tentar novamente.");
				window.location.href = currentPage + ".php";
			}
		}
	});
}

// --------------------------------------------------------------------------------------------------
function comboGerentes(){
	$.ajax({
		async: false,
		type: "POST",
		url: "services/getGerente.php",
		dataType: "json",
		data: "id_distribuidor=" + $('#distribuidor').val(),
		error: function(e) {alert('ERRO DO SISTEMA: ' + e.responseText)},
		success: function(result) {
			if(result[0]){
				var html = '';
				for(i=0;i<result.length;i++){
					html += '<option value="' + result[i].id_usuario + '">' + result[i].nome + '</option>'; 
				}
				$("#gerente").html(html);
				lastResult = result;
			} else {
				html = '<option value="0">&lt;NENHUM&gt;</option>';
				$("#gerente").html(html);
			}
		}
	});
}

// --------------------------------------------------------------------------------------------------
function comboSupervisores(){
	$.ajax({
		async: false,
		type: "POST",
		url: "services/getSupervisor.php",
		dataType: "json",
		data: "id_distribuidor=" + $('#distribuidor').val() + "&id_gerente=" + $('#gerente').val(),
		error: function(e) {alert('ERRO DO SISTEMA: ' + e.responseText)},
		success: function(result) {
			if(result[0]){
				var html = '';
				for(i=0;i<result.length;i++){
					html += '<option value="' + result[i].id_usuario + '">' + result[i].nome + '</option>'; 
				}
				html += '<option value="0">&lt;NENHUM&gt;</option>';
				$("#supervisor").html(html);
				lastResult = result;
			} else {
				html = '<option value="0">&lt;NENHUM&gt;</option>';
				$("#supervisor").html(html);
			}
		}
	});
}

// --------------------------------------------------------------------------------------------------
function comboGrupos(){
	if($("#distribuidor").val()=="0"){
		$('#filtroGrupo').show();
		var html = '<option value="">&lt;TODOS&gt;</option>';
		for(var i=1;i<=5;i++){
			html += '<option value="GRUPO '+String.fromCharCode(64+i)+'">GRUPO '+String.fromCharCode(64+i)+'</option>';
		   	$("#grupo").html(html);
		}
	} else {
		$('#filtroGrupo').hide();
		$("#grupo").html('<option value="">&lt;TODOS&gt;</option>');
	}
}

// --------------------------------------------------------------------------------------------------
function listaGerentes(){
	$.ajax({
		async: false,
		type: "POST",
		url: "services/getGerente.php",
		dataType: "json",
		data: "id_distribuidor=" + $('#distribuidor').val(),
		error: function(e) {alert('ERRO DO SISTEMA: ' + e.responseText)},
		success: function(result) {
			if(result[0]){
				var html = header;
				for(i=0;i<result.length;i++){
					html += content.replace(/_NOME_VALUE_/g,result[i].nome);
					html = html.replace(/_CNPJ_VALUE_/g,result[i].cnpj);
					html = html.replace(/_EMAIL_VALUE_/g,result[i].email);
					html = html.replace(/_VALOR_META_VALUE_/g,result[i].valor_meta);
					html = html.replace(/_RESULTADO_META_VALUE_/g,result[i].resultado_meta);
					html = html.replace(/_ID_VALUE_/g,result[i].id_usuario);
					html = html.replace(/_NOME_/g,"nome"+i);
					html = html.replace(/_CNPJ_/g,"cnpj"+i);
					html = html.replace(/_EMAIL_/g,"email"+i);
					html = html.replace(/_VALOR_META_/g,"valor_meta"+i);
					html = html.replace(/_RESULTADO_META_/g,"resultado_meta"+i);
					html = html.replace(/_ID_/g,"id"+i);
					html = html.replace(/_FN_EDITAR_/g,"javascript:editar(3," + i + ");");
					html = html.replace(/_FN_EXCLUIR_/g,"javascript:excluir(" + result[i].id_usuario + ");");
				}
				$("#lista").html(html);
				lastResult = result;
			} else {
				$("#lista").html('<tr id="listaHeader"><td><strong>Nenhum registro encontrado.</strong></td></tr>');
			}
		}
	});
}

// --------------------------------------------------------------------------------------------------
function listaSupervisores(){
	$.ajax({
		async: false,
		type: "POST",
		url: "services/getSupervisor.php",
		dataType: "json",
		data: "id_distribuidor=" + $('#distribuidor').val() + "&id_gerente=" + $('#gerente').val(),
		error: function(e) {alert('ERRO DO SISTEMA: ' + e.responseText)},
		success: function(result) {
			if(result[0]){
				var html = header;
				for(i=0;i<result.length;i++){
					html += content.replace(/_NOME_VALUE_/g,result[i].nome);
					html = html.replace(/_CNPJ_VALUE_/g,result[i].cnpj);
					html = html.replace(/_EMAIL_VALUE_/g,result[i].email);
					html = html.replace(/_VALOR_META_VALUE_/g,result[i].valor_meta);
					html = html.replace(/_RESULTADO_META_VALUE_/g,result[i].resultado_meta);
					html = html.replace(/_ID_VALUE_/g,result[i].id_usuario);
					html = html.replace(/_NOME_/g,"nome"+i);
					html = html.replace(/_CNPJ_/g,"cnpj"+i);
					html = html.replace(/_EMAIL_/g,"email"+i);
					html = html.replace(/_VALOR_META_/g,"valor_meta"+i);
					html = html.replace(/_RESULTADO_META_/g,"resultado_meta"+i);
					html = html.replace(/_ID_/g,"id"+i);
					html = html.replace(/_FN_EDITAR_/g,"javascript:editar(3," + i + ");");
					html = html.replace(/_FN_EXCLUIR_/g,"javascript:excluir(" + result[i].id_usuario + ");");
				}
				$("#lista").html(html);
				lastResult = result;
			} else {
				$("#lista").html('<tr id="listaHeader"><td><strong>Nenhum registro encontrado.</strong></td></tr>');
			}
		}
	});
}

// --------------------------------------------------------------------------------------------------
function listaVendedores(){
	$.ajax({
		async: false,
		type: "POST",
		url: "services/getVendedor.php",
		dataType: "json",
		data: "id_distribuidor=" + $('#distribuidor').val() + "&id_gerente=" + $('#gerente').val() + "&id_supervisor=" + $('#supervisor').val(),
		error: function(e) {alert('ERRO DO SISTEMA: ' + e.responseText)},
		success: function(result) {
			if(result[0]){
				var html = header;
				for(i=0;i<result.length;i++){
					html += content.replace(/_NOME_VALUE_/g,result[i].nome);
					html = html.replace(/_CNPJ_VALUE_/g,result[i].cnpj);
					html = html.replace(/_EMAIL_VALUE_/g,result[i].email);
					html = html.replace(/_VALOR_META_VALUE_/g,result[i].valor_meta);
					html = html.replace(/_VALOR_CARTEIRA_VALUE_/g,result[i].valor_carteira);
					html = html.replace(/_VALOR_ATENDIDOS_1_VALUE_/g,result[i].valor_atendidos);
					html = html.replace(/_RESULTADO_META_VALUE_/g,result[i].resultado_meta);
					html = html.replace(/_RESULTADO_CARTEIRA_VALUE_/g,result[i].resultado_carteira);
					html = html.replace(/_RESULTADO_ATENDIDOS_1_VALUE_/g,result[i].resultado_atendidos);
					html = html.replace(/_ID_VALUE_/g,result[i].id_usuario);
					html = html.replace(/_NOME_/g,"nome"+i);
					html = html.replace(/_CNPJ_/g,"cnpj"+i);
					html = html.replace(/_EMAIL_/g,"email"+i);
					html = html.replace(/_VALOR_META_/g,"valor_meta"+i);
					html = html.replace(/_RESULTADO_META_/g,"resultado_meta"+i);
					html = html.replace(/_VALOR_CARTEIRA_/g,"valor_carteira"+i);
					html = html.replace(/_VALOR_ATENDIDOS_1_/g,"valor_atendidos_1_"+i);
					
					html = html.replace(/_RESULTADO_META_/g,"resultado_meta"+i);
					html = html.replace(/_RESULTADO_CARTEIRA_/g,"resultado_carteira"+i);
					html = html.replace(/_RESULTADO_ATENDIDOS_1_/g,"resultado_atendidos_1_"+i);
					html = html.replace(/_ID_/g,"id"+i);
					html = html.replace(/_FN_EDITAR_/g,"javascript:editar(3," + i + ");");
					html = html.replace(/_FN_EXCLUIR_/g,"javascript:excluir(" + result[i].id_usuario + ");");
					
					
					html = html.replace(/_VALOR_ATENDIDOS_2_VALUE_/g,result[i].valor_atendidos_2);
					html = html.replace(/_VALOR_ATENDIDOS_2_/g,"valor_atendidos_2_"+i);

					html = html.replace(/_RESULTADO_ATENDIDOS_2_VALUE_/g,result[i].resultado_atendidos_2);
					html = html.replace(/_RESULTADO_ATENDIDOS_2_/g,"resultado_atendidos_2_"+i);

					
					
				}
				$("#lista").html(html);
				lastResult = result;
			} else {
				$("#lista").html('<tr id="listaHeader"><td><strong>Nenhum registro encontrado.</strong></td></tr>');
			}
		}
	});
}

// --------------------------------------------------------------------------------------------------
function listaRankingDistribuidores(){
	$.ajax({
		async: false,
		type: "POST",
		url: "services/getRankingDistribuidor.php",
		dataType: "json",
		data: "id_distribuidor=" + $('#distribuidor').val(),
		error: function(e) {alert('ERRO DO SISTEMA: ' + e.responseText)},
		success: function(result) {
			if(result[0]){
				var html = headerDistribuidores;
				for(i=0;i<result.length;i++){
					html += contentDistribuidores.replace(/_NOME_VALUE_/g,result[i].nome);
					html = html.replace(/_CNPJ_VALUE_/g,result[i].cnpj);
					html = html.replace(/_EMAIL_VALUE_/g,result[i].email);
					html = html.replace(/_PORCENTAGEM_META_VALUE_/g,parseFloat(result[i].porcentagem_meta).toFixed(2));
					html = html.replace(/_NOME_/g,"nome"+i);
					html = html.replace(/_CNPJ_/g,"cnpj"+i);
					html = html.replace(/_EMAIL_/g,"email"+i);
					html = html.replace(/_PERCENTUAL_META_/g,"porcentual_meta"+i);
					html = html.replace(/_POS_/g,i+1);
				}
				$("#listaDistribuidores").html(html);
				lastResult = result;
			} else {
				$("#listaDistribuidores").html('<tr id="listaGerentesHeader"><td><strong>Nenhum registro encontrado.</strong></td></tr>');
			}
		}
	});
}

// --------------------------------------------------------------------------------------------------
function listaRankingGerentes(){
	$.ajax({
		async: false,
		type: "POST",
		url: "services/getRankingGerente.php",
		dataType: "json",
		data: "id_distribuidor=" + $('#distribuidor').val(),
		error: function(e) {alert('ERRO DO SISTEMA: ' + e.responseText)},
		success: function(result) {
			if(result[0]){
				var html = $('#distribuidor').val() != "0" ? headerDistribuidores : headerGerentes;
				for(i=0;i<result.length;i++){
					html += $('#distribuidor').val() != "0" ? contentDistribuidores.replace(/_NOME_VALUE_/g,result[i].nome) : contentGerentes.replace(/_NOME_VALUE_/g,result[i].nome);
					html = html.replace(/_DIST_VALUE_/g,result[i].nome_distribuidor);
					html = html.replace(/_CNPJ_VALUE_/g,result[i].cnpj);
					html = html.replace(/_EMAIL_VALUE_/g,result[i].email);
					html = html.replace(/_PORCENTAGEM_META_VALUE_/g,parseFloat(result[i].porcentagem_meta).toFixed(2));
					html = html.replace(/_NOME_/g,"nome"+i);
					html = html.replace(/_DIST_/g,"dist"+i);
					html = html.replace(/_CNPJ_/g,"cnpj"+i);
					html = html.replace(/_EMAIL_/g,"email"+i);
					html = html.replace(/_PERCENTUAL_META_/g,"porcentual_meta"+i);
					html = html.replace(/_POS_/g,i+1);
				}
				$("#listaGerentes").html(html);
				lastResult = result;
			} else {
				$("#listaGerentes").html('<tr id="listaGerentesHeader"><td><strong>Nenhum registro encontrado.</strong></td></tr>');
			}
		}
	});
}

// --------------------------------------------------------------------------------------------------
function listaRankingSupervisores(){
	$.ajax({
		async: false,
		type: "POST",
		url: "services/getRankingSupervisor.php",
		dataType: "json",
		data: "id_distribuidor=" + $('#distribuidor').val(),
		error: function(e) {alert('ERRO DO SISTEMA: ' + e.responseText)},
		success: function(result) {
			if(result[0]){
				var html = $('#distribuidor').val() != "0" ? headerDistribuidores : headerSupervisores;
				for(i=0;i<result.length;i++){
					html += $('#distribuidor').val() != "0" ? contentDistribuidores.replace(/_NOME_VALUE_/g,result[i].nome) : contentSupervisores.replace(/_NOME_VALUE_/g,result[i].nome);
					html = html.replace(/_DIST_VALUE_/g,result[i].nome_distribuidor);
					html = html.replace(/_CNPJ_VALUE_/g,result[i].cnpj);
					html = html.replace(/_EMAIL_VALUE_/g,result[i].email);
					html = html.replace(/_PORCENTAGEM_META_VALUE_/g,parseFloat(result[i].porcentagem_meta).toFixed(2));
					html = html.replace(/_NOME_/g,"nome"+i);
					html = html.replace(/_DIST_/g,"dist"+i);
					html = html.replace(/_CNPJ_/g,"cnpj"+i);
					html = html.replace(/_EMAIL_/g,"email"+i);
					html = html.replace(/_PERCENTUAL_META_/g,"porcentual_meta"+i);
					html = html.replace(/_POS_/g,i+1);
				}
				$("#listaSupervisores").html(html);
				lastResult = result;
			} else {
				$("#listaSupervisores").html('<tr id="listaSupervisoresHeader"><td><strong>Nenhum registro encontrado.</strong></td></tr>');
			}
		}
	});
}

// --------------------------------------------------------------------------------------------------
function listaRankingVendedores(){
	$.ajax({
		async: false,
		type: "POST",
		url: "services/getRankingVendedorMeta.php",
		dataType: "json",
		data: "id_distribuidor=" + $('#distribuidor').val(),
		error: function(e) {alert('ERRO DO SISTEMA: ' + e.responseText)},
		success: function(result) {
			if(result[0]){
				var html = $('#distribuidor').val() != "0" ? headerDistribuidores : headerVendedores;
				for(i=0;i<result.length;i++){
					html += $('#distribuidor').val() != "0" ? contentDistribuidores.replace(/_NOME_VALUE_/g,result[i].nome_vendedor) : contentVendedores.replace(/_NOME_VALUE_/g,result[i].nome_vendedor);
					html = html.replace(/_DIST_VALUE_/g,result[i].nome_distribuidor);
					html = html.replace(/_CNPJ_VALUE_/g,result[i].cnpj);
					html = html.replace(/_EMAIL_VALUE_/g,result[i].email);
					html = html.replace(/_PORCENTAGEM_META_VALUE_/g,parseFloat(result[i].porcentagem_meta).toFixed(2));
					html = html.replace(/_NOME_/g,"nome"+i);
					html = html.replace(/_DIST_/g,"dist"+i);
					html = html.replace(/_CNPJ_/g,"cnpj"+i);
					html = html.replace(/_EMAIL_/g,"email"+i);
					html = html.replace(/_PERCENTUAL_META_/g,"porcentual_meta"+i);
					html = html.replace(/_POS_/g,i+1);
				}
				$("#listaVendedores").html(html);
				lastResult = result;
			} else {
				$("#listaVendedores").html('<tr id="listaVendedoresHeader"><td><strong>Nenhum registro encontrado.</strong></td></tr>');
			}
		}
	});
}

// --------------------------------------------------------------------------------------------------
function listaRankingVendedoresB(){
	$.ajax({
		async: false,
		type: "POST",
		url: "services/getRankingVendedorAtendido.php",
		dataType: "json",
		data: "id_distribuidor=" + $('#distribuidor').val(),
		error: function(e) {alert('ERRO DO SISTEMA: ' + e.responseText)},
		success: function(result) {
			if(result[0]){
				var html = $('#distribuidor').val() != "0" ? headerDistribuidores : headerVendedoresB;
				for(i=0;i<result.length;i++){
					html += $('#distribuidor').val() != "0" ? contentDistribuidores.replace(/_NOME_VALUE_/g,result[i].nome_vendedor) : contentVendedoresB.replace(/_NOME_VALUE_/g,result[i].nome_vendedor);
					html = html.replace(/de Meta/g,"Atend");
					html = html.replace(/_DIST_VALUE_/g,result[i].nome_distribuidor);
					html = html.replace(/_CNPJ_VALUE_/g,result[i].cnpj);
					html = html.replace(/_EMAIL_VALUE_/g,result[i].email);
					html = html.replace(/_PORCENTAGEM_META_VALUE_/g,parseFloat(result[i].porcentagem_atendidos).toFixed(2));
					html = html.replace(/_NOME_/g,"nome"+i);
					html = html.replace(/_DIST_/g,"dist"+i);
					html = html.replace(/_CNPJ_/g,"cnpj"+i);
					html = html.replace(/_EMAIL_/g,"email"+i);
					html = html.replace(/_PERCENTUAL_META_/g,"porcentual_meta"+i);
					html = html.replace(/_POS_/g,i+1);
				}
				$("#listaVendedoresB").html(html);
				lastResult = result;
			} else {
				$("#listaVendedoresB").html('<tr id="listaVendedoresHeaderB"><td><strong>Nenhum registro encontrado.</strong></td></tr>');
			}
		}
	});
}


function listaRankingVendedoresB_2(){
	$.ajax({
		async: false,
		type: "POST",
		url: "services/getRankingVendedorAtendido_2.php",
		dataType: "json",
		data: "id_distribuidor=" + $('#distribuidor').val(),
		error: function(e) {alert('ERRO DO SISTEMA: ' + e.responseText)},
		success: function(result) {
			if(result[0]){
				var html = $('#distribuidor').val() != "0" ? headerDistribuidores : headerVendedoresB;
				for(i=0;i<result.length;i++){
					html += $('#distribuidor').val() != "0" ? contentDistribuidores.replace(/_NOME_VALUE_/g,result[i].nome_vendedor) : contentVendedoresB.replace(/_NOME_VALUE_/g,result[i].nome_vendedor);
					html = html.replace(/de Meta/g,"Atend");
					html = html.replace(/_DIST_VALUE_/g,result[i].nome_distribuidor);
					html = html.replace(/_CNPJ_VALUE_/g,result[i].cnpj);
					html = html.replace(/_EMAIL_VALUE_/g,result[i].email);
					html = html.replace(/_PORCENTAGEM_META_VALUE_/g,parseFloat(result[i].porcentagem_atendidos).toFixed(2));
					html = html.replace(/_NOME_/g,"nome"+i);
					html = html.replace(/_DIST_/g,"dist"+i);
					html = html.replace(/_CNPJ_/g,"cnpj"+i);
					html = html.replace(/_EMAIL_/g,"email"+i);
					html = html.replace(/_PERCENTUAL_META_/g,"porcentual_meta"+i);
					html = html.replace(/_POS_/g,i+1);
				}
				$("#listaVendedoresB_2").html(html);
				lastResult = result;
			} else {
				$("#listaVendedoresB_2").html('<tr id="listaVendedoresHeaderB_2"><td><strong>Nenhum registro encontrado.</strong></td></tr>');
			}
		}
	});
}

// --------------------------------------------------------------------------------------------------
function listaStatusAuxiliar( fase ){

	$.ajax({
		async: false,
		type: "POST",
		url: "services/getStatusGeral.php",
		dataType: "json",
		data: {"id_distribuidor":$('#distribuidor').val(),"id_fase":fase},
		error: function(e) {alert('ERRO DO SISTEMA: ' + e.responseText)},
		success: function(result) {
			if(result){
				var i = 1;
				for(var obj in result){
					if(i==7 || i==10 || i==12){
						$("#f"+fase+"t"+i).val(parseFloat(result[obj]).toFixed(2));
					} else {
						$("#f"+fase+"t"+i).val(parseFloat(result[obj]).toFixed(0));
					}
					i++;
				}
			} else {

			}
		}
	});

	
}


function listaStatus(){
	listaStatusAuxiliar(1);
	listaStatusAuxiliar(2);
	listaStatusAuxiliar(3);
	
}


// --------------------------------------------------------------------------------------------------
// CONTROLE Operacional
// --------------------------------------------------------------------------------------------------

//Ação da fase
var FASE_INICIA_CADASTRO		= 3;
var FASE_ENCERRA_CADASTRO		= 4;
var FASE_INICIA_META			= 5;
var FASE_ENCERRA_META			= 6;
var FASE_INICIA_RESULTADO		= 15;
var FASE_ENCERRA_RESULTADO		= 16;
var FASE_ENCERRA_FASE			= 7;

var EMAIL_SEMANA				= 8;
var EMAIL_TRES					= 9;
var EMAIL_UM					= 10;

function carregaDadosOperacao(){

	//dispara o ajax que recupera o estado das fases
	getFase(1);
	getFase(2);
	getFase(3);

	getUltimaExecucao(1);
	getUltimaExecucao(2);
	getUltimaExecucao(3);
	
}


function getFase( fase ) {
	
	$.ajax({
		async: false,
		type: "POST",
		url: "services/getFase.php",
		dataType: "json",
		data: {"id_fase":fase},
		error: function(e) {alert('ERRO DO SISTEMA: ' + e.responseText)},
		success: function(result) {
			if( result[0] ){
				
				setaBotoes( fase, result[0]['estado_cadastro'], result[0]['estado_meta'], result[0]['estado_resultado'], result[0]['estado_campanha'] );
				atualizaEstadoBotoes();
				
			} else {
				alert("Erro de comunicação com o servidor. Clique OK para tentar novamente.");
			}
		}
	});
}

function getUltimaExecucao( fase ) {
	
	$.ajax({
		async: false,
		type: "POST",
		url: "services/getUltimaExecucao.php",
		dataType: "json",
		data: {"id_fase":fase},
		error: function(e) {alert('ERRO DO SISTEMA: ' + e.responseText)},
		success: function(result) {
		    for(var key in result) {
				$("#msg_"+key+fase).html( result[key]);
			}
		}
	});
}

function updateEstadoBotao( btn ){
	var estado = $( btn ).attr("estado");
	
	if( estado == undefined)
		estado = 0;
	
	estado = parseInt( estado );
	
	if( estado == 1 ){
		$(btn).css('opacity','1');
		$(btn).addClass('btn-operacional');
		$(btn).removeClass('bg-cinza');
		
	} else if( estado == 0 ){
		$(btn).css('opacity','0.5');
		$(btn).addClass('bg-cinza');
	}
}

function atualizaEstadoBotoes( ){
	
	var nome = new Array("Participantes","Metas","Resultados","Campanha");
	var tipo = new Array("Iniciar","Finalizar");
	
	//percorre todos objetos para checar o estado
	for(var x=0; x < nome.length; x++){
		for(var y=0; y < tipo.length; y++){
			for(var f=1;f < 4; f++){

				if(x==0 && y==0){
					btn = "#btEmailSemana"+f;
					updateEstadoBotao(btn);
					btn = "#btEmailTres"+f;
					updateEstadoBotao(btn);
					btn = "#btEmailUm"+f;
					updateEstadoBotao(btn);
				}
				
				var btn = "#bt"+tipo[y]+nome[x]+f;
				
				//checa se o objeto existe
				if(  $( btn ) == null )
					continue;
				
				updateEstadoBotao( btn );
			}
		}
	}
}

var acao_email = 0;

function executaBotao( event ){
	var acao = event.data.acao; 

	if(acao == EMAIL_SEMANA || acao == EMAIL_TRES || acao == EMAIL_UM){
		acao_email = acao;

		$("#formEmailDistribuidores").fadeIn( 300 );

		//alert( acao );	
		
	} else {
	
		if( !confirm("Você confirma essa operação?") ) {
			
			
			
		}
		else {
		
		
		$.ajax({
			async: false,
			type: "POST",
			url: "services/setFase.php",
			dataType: "json",
			data: {"acao":acao },
			error: function(e) {alert('ERRO DO SISTEMA: ' + e.responseText)},
			success: function(result) {
				window.location.href = "";
				//carregaDadosOperacao();
			}
		});
		}
	}
}


function estadoBotao( botao, estado, acao ){
	$(botao).unbind();
	if( acao != null ){
		$(botao).bind( "click", {"acao":acao }, executaBotao );
	}
	$(botao).attr("estado", estado);
}


function setaBotoes (fase, estado_cadastro, estado_meta, estado_resultado, estado_campanha){
	
	//seletores
	var btn_ini_par = "#btIniciarParticipantes" + fase;
	var btn_ini_met = "#btIniciarMetas" + fase;
	var btn_fin_par = "#btFinalizarParticipantes" + fase;
	var btn_fin_met = "#btFinalizarMetas" + fase;
	var btn_ini_res = "#btIniciarResultados" + fase;
	var btn_fin_res = "#btFinalizarResultados" + fase;
	var btn_fin_cam = "#btFinalizarCampanha" + fase;

	var btn_email_sem = "#btEmailSemana" + fase;
	var btn_email_3 = "#btEmailTres" + fase;
	var btn_email_1 = "#btEmailUm" + fase;
	
	
	if( estado_campanha == 1 ) {
		estadoBotao( btn_fin_cam, 1, FASE_ENCERRA_FASE );
	
		estadoBotao( btn_email_sem, 1, EMAIL_SEMANA );
		estadoBotao( btn_email_3, 1, EMAIL_TRES );
		estadoBotao( btn_email_1, 1, EMAIL_UM );
		
	} else {
		estadoBotao( btn_fin_cam, 0, null );
		estado_cadastro = 9;
		estado_meta = 9;
		estado_resultado = 9;
		estado_campanha = 9;
		
		estadoBotao( btn_email_sem, 0, null );
		estadoBotao( btn_email_3, 0, null );
		estadoBotao( btn_email_1, 0, null );
	}
	
	//Cadastro
	if( estado_cadastro == 1 ){
		estadoBotao( btn_ini_par, 0, null );
		estadoBotao( btn_fin_par, 1, FASE_ENCERRA_CADASTRO );
	} else if( estado_cadastro == 0 ) {
		estadoBotao( btn_ini_par, 1, FASE_INICIA_CADASTRO );
		estadoBotao( btn_fin_par, 0, null  );
	} else if( estado_cadastro == 9 ) {
		estadoBotao( btn_ini_par, 0, null  );
		estadoBotao( btn_fin_par, 0, null  );
	}

	//Meta
	if( estado_meta == 1 ){
		estadoBotao( btn_ini_met, 0, null   );
		estadoBotao( btn_fin_met, 1, FASE_ENCERRA_META );
	} else if( estado_meta == 0 ) {
		estadoBotao( btn_ini_met, 1, FASE_INICIA_META );
		estadoBotao( btn_fin_met, 0, null   );
	} else if( estado_meta == 9 ) {
		estadoBotao( btn_ini_met, 0, null   );
		estadoBotao( btn_fin_met, 0, null   );
	}
	
	//Resultado
	if( estado_resultado == 1 ){
		estadoBotao( btn_ini_res, 0, null );
		estadoBotao( btn_fin_res, 1, FASE_ENCERRA_RESULTADO );
	} else if( estado_resultado == 0 ) {
		estadoBotao( btn_ini_res, 1, FASE_INICIA_RESULTADO );
		estadoBotao( btn_fin_res, 0, null );
	} else if( estado_resultado == 9 ) {
		estadoBotao( btn_ini_res, 0, null );
		estadoBotao( btn_fin_res, 0, null );
	}
}





		

// --------------------------------------------------------------------------------------------------
jQuery(document).ready(function(e){
	redirectIncompatible();
	
  	var altura = getDocHeight() - 134;
  	jQuery('#linhas-verticais').css('height', altura+'px');

	window.onresize = function(event) {
    	var altura = getDocHeight() - 134;
		jQuery('#linhas-verticais').css('height', altura+'px');
	}
	
	var imagePath = 'images/bg/home/';
	var totalImages = 1;
	var imagesPerPage = 1;
	
	var imgArray = new Array();
	var srcArray = new Array();
	
	for(i=0;i<totalImages;i++){
		srcArray[i] = {image: imagePath + zeroPad(i+1,2) + '.jpg'};
	}
	
	if(totalImages!=imagesPerPage){
		i=0;
		while(i<imagesPerPage){
			rnd = Math.floor(Math.random() * srcArray.length);
			if(srcArray[rnd] != 'selected'){
				imgArray[i] = srcArray[rnd];
				srcArray[rnd] = 'selected';
				i++;
			}
		}
	} else {
		imgArray = srcArray;
	}
	
	$.supersized({

		//Functionality
		slideshow               :   1,			//Slideshow on/off
		autoplay				:	1,			//Slideshow starts playing automatically
		start_slide             :   1,			//Start slide (0 is random)
		random					: 	0,			//Randomize slide order (Ignores start slide)
		slide_interval          :   7000,		//Length between transitions
		transition              :   1, 			//0-None, 1-Fade, 2-Slide Top, 3-Slide Right, 4-Slide Bottom, 5-Slide Left, 6-Carousel Right, 7-Carousel Left
		transition_speed		:	800,		//Speed of transition
		new_window				:	1,			//Image links open in new window/tab
		pause_hover             :   0,			//Pause slideshow on hover
		keyboard_nav            :   0,			//Keyboard navigation on/off
		performance				:	2,			//0-Normal, 1-Hybrid speed/quality, 2-Optimizes image quality, 3-Optimizes transition speed // (Only works for Firefox/IE, not Webkit)
		image_protect			:	1,			//Disables image dragging and right click with Javascript
		image_path				:	'images/bg/home/',	//Default image path

		//Size & Position
		min_width		        :   0,			//Min width allowed (in pixels)
		min_height		        :   0,			//Min height allowed (in pixels)
		vertical_center         :   1,			//Vertically center background
		horizontal_center       :   1,			//Horizontally center background
		fit_portrait         	:   0,			//Portrait images will not exceed browser height
		fit_landscape			:   0,			//Landscape images will not exceed browser width
		
		//Components
		navigation              :   0,			//Slideshow controls on/off
		thumbnail_navigation    :   0,			//Thumbnail navigation
		slide_counter           :   0,			//Display slide numbers
		slide_captions          :   0,			//Slide caption (Pull from "title" in slides array)
		slides 					:  	imgArray	//Slideshow Images
									
	}); 
	
	jQuery.ajaxSetup({
	  beforeSend: function() {
		$.blockUI({message: '<img src="images/loading.gif" />', 
 				   css: {width:'34px', height:'34px', padding:'2px 0px 0px 2px',
					   top:  ($(window).height() - 34) /2 + 'px', 
					   left: ($(window).width() - 34) /2 + 'px', 
					   border:'#ccc 1px solid', '-webkit-border-radius': '5px','-moz-border-radius': '5px', 'border-radius': '5px'} 
				 })},
	  error: function(){
		 $.unblockUI();
	  },
	  complete: function(){
		 $.unblockUI();
	  },
	  success: function(){
		 $.unblockUI();
	  }
	});

	currentPage = $(location).attr('href').match(/.*\/([^/]+)\.([^?]+)/i)[1];
	switch(currentPage){
		case "":
		case "www.desafiokelloggs.com":
		case "index":
			$("#login input").keypress(function (e) {
				if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
					checkFormLogin();
					return false;
				} else {
					return true;
				}
			});	
			$("#enviar").click(function(e){
				checkFormLogin();
			});		
			$("#usuario").focus();
			$("#logout").hide();
			break;

		case "senha":
			$("#senha_atual").focus();
			$("#senha_atual").val("");
			$("#nova_senha").val("");
			$("#confirma_senha").val("");
			$("#enviar").click(function(e){
				checkFormTrocaSenha();
			});		

			break;

		case "status_ranking_geral":
			mouseOver('btn1', 'images/btn1_over.png', 'status_ranking_geral');
			linkAtual = 'status_ranking_geral';

			headerDistribuidores = '<tr id="listaDistribuidoresHeader">' + $("#listaDistribuidoresHeader").html() + '</tr>';
			contentDistribuidores = '<tr id="listaDistribuidoresContent">'  + $("#listaDistribuidoresContent").html() + '</tr>';
			headerGerentes = '<tr id="listaGerentesHeader">' + $("#listaGerentesHeader").html() + '</tr>';
			contentGerentes = '<tr id="listaGerentesContent">'  + $("#listaGerentesContent").html() + '</tr>';
			headerSupervisores = '<tr id="listaSupervisoresHeader">' + $("#listaSupervisoresHeader").html() + '</tr>';
			contentSupervisores = '<tr id="listaSupervisoresContent">'  + $("#listaSupervisoresContent").html() + '</tr>';
			headerVendedores = '<tr id="listaVendedoresHeader">' + $("#listaVendedoresHeader").html() + '</tr>';
			contentVendedores = '<tr id="listaVendedoresContent">'  + $("#listaVendedoresContent").html() + '</tr>';
			headerVendedoresB = '<tr id="listaVendedoresBHeader">' + $("#listaVendedoresBHeader").html() + '</tr>';
			contentVendedoresB = '<tr id="listaVendedoresBContent">'  + $("#listaVendedoresBContent").html() + '</tr>';

			headerVendedoresB2 = '<tr id="listaVendedoresB_2Header">' + $("#listaVendedoresB_2Header").html() + '</tr>';
			contentVendedoresB2 = '<tr id="listaVendedoresB_2Content">'  + $("#listaVendedoresB_2Content").html() + '</tr>';
			
			$.ajax({
				async: false,
				type: "POST",
				url: "services/getDistribuidor.php",
				dataType: "json",
				data: "tipo=3",
				error: function(e) {alert('ERRO DO SISTEMA: ' + e.responseText)},
				success: function(result) {
					if(result[0]){
						var html = '<option value="0">&lt;TODOS&gt;</option>';
						for(i=0;i<result.length;i++){
							html += '<option value="' + result[i].id_usuario + '">' + result[i].nome + '</option>'; 
						}
						$("#distribuidor").html(html);
						lastResult = result;						
					} else {
						alert("Erro de comunicação com o servidor. Clique OK para tentar novamente.");
						window.location.href = "status_ranking_geral.php";
					}
				}
			});
			comboGrupos();
			listaRankingDistribuidores();
			listaRankingGerentes();
			listaRankingSupervisores();
			listaRankingVendedores();
			listaRankingVendedoresB();
			listaRankingVendedoresB_2();
			
			$("#distribuidor").change(function(e){
				comboGrupos();
				listaRankingDistribuidores();
				listaRankingGerentes();
				listaRankingSupervisores();
				listaRankingVendedores();
				listaRankingVendedoresB();
				listaRankingVendedoresB_2();
			});

			$("#btnSalvar").click(function(){
				window.location.href = 'services/getRankingExcel.php?id_distribuidor='+$("#distribuidor").val()+'&grupo='+$("#grupo").val();
			});
			break;

		case "status_da_campanha":
			mouseOver('btn1', 'images/btn1_over.png', 'status_ranking_geral');
			linkAtual = 'status_ranking_geral';
			$.ajax({
				async: false,
				type: "POST",
				url: "services/getDistribuidor.php",
				dataType: "json",
				data: "tipo=3",
				error: function(e) {alert('ERRO DO SISTEMA: ' + e.responseText)},
				success: function(result) {
					if(result[0]){
						var html = '<option value="0">&lt;TODOS&gt;</option>';
						for(i=0;i<result.length;i++){
							html += '<option value="' + result[i].id_usuario + '">' + result[i].nome + '</option>'; 
						}
						$("#distribuidor").html(html);
						lastResult = result;						
					} else {
						alert("Erro de comunicação com o servidor. Clique OK para tentar novamente.");
						window.location.href = "status_da_campanha.php";
					}
				}
			});

			listaStatus();
			
			$("#distribuidor").change(function(e){
				listaStatus();
			});

			$("#btn_gerar_relatorio").click(function(e){
				
				window.location.href="services/getExcelGeral.php?id_distribuidor="+$("#distribuidor").val();
				//document.getElementById("formExcel").submit();
				//alert("Função indisponível no momento.");
				
			});

			break;

		case "status_operacional_da_campanha":
			mouseOver('btn1', 'images/btn1_over.png', 'status_ranking_geral');
			linkAtual = 'status_ranking_geral';
			
			var options = { 
			        target:        '#acao',   // target element(s) to be updated with server response 
			        //beforeSubmit:  showRequest,  // pre-submit callback 
			        success:       retornoEnvioEmail  // post-submit callback 
			 
			        // other available options: 
			        //url:       url         // override for form's 'action' attribute 
			        //type:      type        // 'get' or 'post', override for form's 'method' attribute 
			        //dataType:  null        // 'xml', 'script', or 'json' (expected server response type) 
			        //clearForm: true        // clear all form fields after successful submit 
			        //resetForm: true        // reset the form after successful submit 
			 
			        // $.ajax options can be used here too, for example: 
			        //timeout:   3000 
			    }; 
			 
			    // bind form using 'ajaxForm' 
			    $('#formEmail').ajaxForm(options); 

				carregaDadosOperacao();
			    
			break;
		
		case "cadastro_de_participantes_distribuidores":
			mouseOver('btn2', 'images/btn2_over.png', 'cadastro_de_participantes_distribuidores');
			linkAtual = 'cadastro_de_participantes_distribuidores';
			header = '<tr id="listaHeader">' + $("#listaHeader").html() + '</tr>';
			content = '<tr id="listaContent">'  + $("#listaContent").html() + '</tr>';
			$.ajax({
				async: false,
				type: "POST",
				url: "services/getDistribuidor.php",
				dataType: "json",
				data: "tipo=3",
				error: function(e) {alert('ERRO DO SISTEMA: ' + e.responseText)},
				success: function(result) {
					if(result[0]){
						var html = header;
						for(i=0;i<result.length;i++){
							html += content.replace(/_NOME_VALUE_/g,result[i].nome);
							html = html.replace(/_EMAIL_VALUE_/g,result[i].email);
							html = html.replace(/_CNPJ_VALUE_/g,result[i].cnpj);
							html = html.replace(/_NOME_/g,"nome"+i);
							html = html.replace(/_EMAIL_/g,"email"+i);
							html = html.replace(/_CNPJ_/g,"cnpj"+i);
							html = html.replace(/_FN_EDITAR_/g,"javascript:editar(3," + i + ");");
							html = html.replace(/_FN_EXCLUIR_/g,"javascript:excluir(" + result[i].id_usuario + ");");
						}
						$("#lista").html(html);
						lastResult = result;
					} else {
						alert("Erro de comunicação com o servidor. Clique OK para tentar novamente.");
						window.location.href = "cadastro_de_participantes_distribuidores.php";
					}
				}
			});
			
			$("#btnSalvar").click(function(e){
				gravar(3);
			});
			
			$("#btnCancelar").click(function(e){
				$("#formCadastroDistLista").show();
				$("#formCadastroDist").hide();

			});
			$("#btnIncluir").click(function(e){
				editing = false;
				$('#formCadastroDist').each(function(){this.reset();});
				$("#formCadastroDistLista").hide();
				$("#formCadastroDist").show();
				$("#grupo").focus();
				id_usuario="";
			});
			
			break;

		case "cadastro_de_participantes_gerentes":
			mouseOver('btn2', 'images/btn2_over.png', 'cadastro_de_participantes_distribuidores');
			linkAtual = 'cadastro_de_participantes_distribuidores';
			header = '<tr id="listaHeader">' + $("#listaHeader").html() + '</tr>';
			content = '<tr id="listaContent">'  + $("#listaContent").html() + '</tr>';
			comboDistribuidores();
			listaGerentes();
			$("#distribuidor").change(function(e){
				if(($("#nome").val()=="Nome")&&($("#email").val()=="Email")){
					listaGerentes();
				} else {
					if(confirm("ATENÇÃO: Dados não salvos serão perdidos.\n\nDeseja continuar?")){
						listaGerentes();
					}
				}
			});
			$("#btnSalvarSmall").click(function(e){
				gravar(4);
			});

			break;

		case "cadastro_de_participantes_supervisores":
			mouseOver('btn2', 'images/btn2_over.png', 'cadastro_de_participantes_distribuidores');
			linkAtual = 'cadastro_de_participantes_distribuidores';
			header = '<tr id="listaHeader">' + $("#listaHeader").html() + '</tr>';
			content = '<tr id="listaContent">'  + $("#listaContent").html() + '</tr>';
			comboDistribuidores();
			comboGerentes();
			listaSupervisores();
			$("#distribuidor").change(function(e){
				if(($("#nome").val()=="Nome")&&($("#email").val()=="Email")){
					comboGerentes();
					listaSupervisores();
				} else {
					if(confirm("ATENÇÃO: Dados não salvos serão perdidos.\n\nDeseja continuar?")){
						comboGerentes();
						listaSupervisores();
					}
				}
			});
			$("#gerente").change(function(e){
				if(($("#nome").val()=="Nome")&&($("#email").val()=="Email")){
					listaSupervisores();
				} else {
					if(confirm("ATENÇÃO: Dados não salvos serão perdidos.\n\nDeseja continuar?")){
						listaSupervisores();
					}
				}
			});
			$("#btnSalvarSmall").click(function(e){
				gravar(5);
			});

			break;

		case "cadastro_de_participantes_vendedores":
			mouseOver('btn2', 'images/btn2_over.png', 'cadastro_de_participantes_distribuidores');
			linkAtual = 'cadastro_de_participantes_distribuidores';
			header = '<tr id="listaHeader">' + $("#listaHeader").html() + '</tr>';
			content = '<tr id="listaContent">'  + $("#listaContent").html() + '</tr>';
			comboDistribuidores();
			comboGerentes();
			comboSupervisores();
			listaVendedores();
			$("#distribuidor").change(function(e){
				if(($("#nome").val()=="Nome")&&($("#email").val()=="Email")){
					comboGerentes();
					comboSupervisores();
					listaVendedores();
				} else {
					if(confirm("ATENÇÃO: Dados não salvos serão perdidos.\n\nDeseja continuar?")){
						comboGerentes();
						comboSupervisores();
						listaVendedores();
					}
				}
			});
			$("#gerente").change(function(e){
				if(($("#nome").val()=="Nome")&&($("#email").val()=="Email")){
					comboSupervisores();
					listaVendedores();
				} else {
					if(confirm("ATENÇÃO: Dados não salvos serão perdidos.\n\nDeseja continuar?")){
						comboSupervisores();
						listaVendedores();
					}
				}
			});
			$("#supervisor").change(function(e){
				if(($("#nome").val()=="Nome")&&($("#email").val()=="Email")){
					listaVendedores();
				} else {
					if(confirm("ATENÇÃO: Dados não salvos serão perdidos.\n\nDeseja continuar?")){
						listaVendedores();
					}
				}
			});
			$("#btnSalvarSmall").click(function(e){
				gravar(6);
			});
		break;	
		
		case "cadastro_de_metas_distribuidores":
			mouseOver('btn3', 'images/btn3_over.png', 'cadastro_de_metas_gerentes');
			linkAtual = 'cadastro_de_metas_gerentes';
			header = '<tr id="listaHeader">' + $("#listaHeader").html() + '</tr>';
			content = '<tr id="listaContent">'  + $("#listaContent").html() + '</tr>';

			comboDistribuidores();
			$("#cnpj0").val(lastResult[0].cnpj);
			$("#email0").val(lastResult[0].email);
			$("#valor_meta0").val(lastResult[0].valor_meta);
			$("#valor_meta_cliente0").val(lastResult[0].valor_meta_cliente);
			$("#id0").val(lastResult[0].id_usuario);
			$("#distribuidor").change(function(e){
				$("#cnpj0").val(lastResult[$("#distribuidor").prop("selectedIndex")].cnpj);
				$("#email0").val(lastResult[$("#distribuidor").prop("selectedIndex")].email);
				$("#valor_meta0").val(lastResult[$("#distribuidor").prop("selectedIndex")].valor_meta);
				$("#valor_meta_cliente0").val(lastResult[$("#distribuidor").prop("selectedIndex")].valor_meta_cliente);
				$("#id0").val(lastResult[$("#distribuidor").prop("selectedIndex")].id_usuario);
			});
			$("#btnGravar").click(function(e){
				gravarMetas(3);
			});
			break;

		case "cadastro_de_metas_gerentes":
			mouseOver('btn3', 'images/btn3_over.png', 'cadastro_de_metas_gerentes');
			linkAtual = 'cadastro_de_metas_gerentes';
			header = '<tr id="listaHeader">' + $("#listaHeader").html() + '</tr>';
			content = '<tr id="listaContent">'  + $("#listaContent").html() + '</tr>';

			comboDistribuidores();
			listaGerentes();
			$("#distribuidor").change(function(e){
				if(($("#nome").val()=="Nome")&&($("#email").val()=="Email")){
					listaGerentes();
				} else {
					if(confirm("ATENÇÃO: Dados não salvos serão perdidos.\n\nDeseja continuar?")){
						listaGerentes();
					}
				}
			});
			$("#btnGravar").click(function(e){
				gravarMetas(4);
			});
			break;

		case "cadastro_de_metas_supervisores":
			mouseOver('btn3', 'images/btn3_over.png', 'cadastro_de_metas_gerentes');
			linkAtual = 'cadastro_de_metas_gerentes';
			header = '<tr id="listaHeader">' + $("#listaHeader").html() + '</tr>';
			content = '<tr id="listaContent">'  + $("#listaContent").html() + '</tr>';

			comboDistribuidores();
			comboGerentes();
			listaSupervisores();
			$("#distribuidor").change(function(e){
				if(($("#nome").val()=="Nome")&&($("#email").val()=="Email")){
					comboGerentes();
					listaSupervisores();
				} else {
					if(confirm("ATENÇÃO: Dados não salvos serão perdidos.\n\nDeseja continuar?")){
						comboGerentes();
						listaSupervisores();
					}
				}
			});
			$("#gerente").change(function(e){
				if(($("#nome").val()=="Nome")&&($("#email").val()=="Email")){
					listaSupervisores();
				} else {
					if(confirm("ATENÇÃO: Dados não salvos serão perdidos.\n\nDeseja continuar?")){
						listaSupervisores();
					}
				}
			});
			$("#btnGravar").click(function(e){
				gravarMetas(5);
			});
			break;

		case "cadastro_de_metas_vendedores":
			mouseOver('btn3', 'images/btn3_over.png', 'cadastro_de_metas_gerentes');
			linkAtual = 'cadastro_de_metas_gerentes';
			header = '<tr id="listaHeader">' + $("#listaHeader").html() + '</tr>';
			content = '<tr id="listaContent">'  + $("#listaContent").html() + '</tr>';

			comboDistribuidores();
			comboGerentes();
			comboSupervisores();
			listaVendedores();
			$("#distribuidor").change(function(e){
				if(($("#nome").val()=="Nome")&&($("#email").val()=="Email")){
					comboGerentes();
					comboSupervisores();
					listaVendedores();
				} else {
					if(confirm("ATENÇÃO: Dados não salvos serão perdidos.\n\nDeseja continuar?")){
						comboGerentes();
						comboSupervisores();
						listaVendedores();
					}
				}
			});
			$("#gerente").change(function(e){
				if(($("#nome").val()=="Nome")&&($("#email").val()=="Email")){
					comboSupervisores();
					listaVendedores();
				} else {
					if(confirm("ATENÇÃO: Dados não salvos serão perdidos.\n\nDeseja continuar?")){
						comboSupervisores();
						listaVendedores();
					}
				}
			});
			$("#supervisor").change(function(e){
				if(($("#nome").val()=="Nome")&&($("#email").val()=="Email")){
					listaVendedores();
				} else {
					if(confirm("ATENÇÃO: Dados não salvos serão perdidos.\n\nDeseja continuar?")){
						listaVendedores();
					}
				}
			});
			$("#btnGravar").click(function(e){
				gravarMetas(6);
			});
		break;
		
		case "cadastro_de_resultados_distribuidores":
			mouseOver('btn4', 'images/btn4_over.png', 'cadastro_de_resultados_gerentes');
			linkAtual = 'cadastro_de_resultados_gerentes';
			header = '<tr id="listaHeader">' + $("#listaHeader").html() + '</tr>';
			content = '<tr id="listaContent">'  + $("#listaContent").html() + '</tr>';

			comboDistribuidores();
			$("#cnpj0").val(lastResult[0].cnpj);
			$("#email0").val(lastResult[0].email);
			$("#resultado_meta0").val(lastResult[0].resultado_meta);
			$("#id0").val(lastResult[0].id_usuario);
			$("#distribuidor").change(function(e){
				$("#cnpj0").val(lastResult[$("#distribuidor").prop("selectedIndex")].cnpj);
				$("#email0").val(lastResult[$("#distribuidor").prop("selectedIndex")].email);
				$("#resultado_meta0").val(lastResult[$("#distribuidor").prop("selectedIndex")].resultado_meta);
				$("#id0").val(lastResult[$("#distribuidor").prop("selectedIndex")].id_usuario);
			});
			$("#btnGravar").click(function(e){
				gravarMetas(3);
			});
			break;

		case "cadastro_de_resultados_gerentes":
			mouseOver('btn4', 'images/btn4_over.png', 'cadastro_de_resultados_gerentes');
			linkAtual = 'cadastro_de_resultados_gerentes';
			header = '<tr id="listaHeader">' + $("#listaHeader").html() + '</tr>';
			content = '<tr id="listaContent">'  + $("#listaContent").html() + '</tr>';

			comboDistribuidores();
			listaGerentes();
			$("#distribuidor").change(function(e){
				if(($("#nome").val()=="Nome")&&($("#email").val()=="Email")){
					listaGerentes();
				} else {
					if(confirm("ATENÇÃO: Dados não salvos serão perdidos.\n\nDeseja continuar?")){
						listaGerentes();
					}
				}
			});
			$("#btnGravar").click(function(e){
				gravarMetas(4);
			});
			break;

		case "cadastro_de_resultados_supervisores":
			mouseOver('btn4', 'images/btn4_over.png', 'cadastro_de_resultados_gerentes');
			linkAtual = 'cadastro_de_resultados_gerentes';
			header = '<tr id="listaHeader">' + $("#listaHeader").html() + '</tr>';
			content = '<tr id="listaContent">'  + $("#listaContent").html() + '</tr>';

			comboDistribuidores();
			comboGerentes();
			listaSupervisores();
			$("#distribuidor").change(function(e){
				if(($("#nome").val()=="Nome")&&($("#email").val()=="Email")){
					comboGerentes();
					listaSupervisores();
				} else {
					if(confirm("ATENÇÃO: Dados não salvos serão perdidos.\n\nDeseja continuar?")){
						comboGerentes();
						listaSupervisores();
					}
				}
			});
			$("#gerente").change(function(e){
				if(($("#nome").val()=="Nome")&&($("#email").val()=="Email")){
					listaSupervisores();
				} else {
					if(confirm("ATENÇÃO: Dados não salvos serão perdidos.\n\nDeseja continuar?")){
						listaSupervisores();
					}
				}
			});
			$("#btnGravar").click(function(e){
				gravarMetas(5);
			});
			break;

		case "cadastro_de_resultados_vendedores":
			mouseOver('btn4', 'images/btn4_over.png', 'cadastro_de_resultados_gerentes');
			linkAtual = 'cadastro_de_resultados_gerentes';
			header = '<tr id="listaHeader">' + $("#listaHeader").html() + '</tr>';
			content = '<tr id="listaContent">'  + $("#listaContent").html() + '</tr>';

			comboDistribuidores();
			comboGerentes();
			comboSupervisores();
			listaVendedores();
			$("#distribuidor").change(function(e){
				if(($("#nome").val()=="Nome")&&($("#email").val()=="Email")){
					comboGerentes();
					comboSupervisores();
					listaVendedores();
				} else {
					if(confirm("ATENÇÃO: Dados não salvos serão perdidos.\n\nDeseja continuar?")){
						comboGerentes();
						comboSupervisores();
						listaVendedores();
					}
				}
			});
			$("#gerente").change(function(e){
				if(($("#nome").val()=="Nome")&&($("#email").val()=="Email")){
					comboSupervisores();
					listaVendedores();
				} else {
					if(confirm("ATENÇÃO: Dados não salvos serão perdidos.\n\nDeseja continuar?")){
						comboSupervisores();
						listaVendedores();
					}
				}
			});
			$("#supervisor").change(function(e){
				if(($("#nome").val()=="Nome")&&($("#email").val()=="Email")){
					listaVendedores();
				} else {
					if(confirm("ATENÇÃO: Dados não salvos serão perdidos.\n\nDeseja continuar?")){
						listaVendedores();
					}
				}
			});
			$("#btnGravar").click(function(e){
				gravarMetas(6);
			});
			break;
			
		case "regulamento_e_premiacoes":	
			mouseOver('btn5', 'images/btn5_over.png', 'regulamento_e_premiacoes');
			linkAtual = 'regulamento_e_premiacoes';
			break;
	}
});
