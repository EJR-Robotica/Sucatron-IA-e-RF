

var postou = false;

function checkForm(){
    
	//Pega dados para realizar validações básicas
    modulo=$("#id_modulo").val();
    id=$("#login").val();

    //Se o usuário logado for Administrador 
    if (modulo==0) {
        alert("Selecione um módulo!");
        return false;
    }  
    
    //Se o usuário logado for um Administrador 
    if ((id==1)||(id==-1)) {
        if (modulo!=-1) {
            alert("Um Administrador só pode acessar o painel de controle!");
            return false;
        } else {
            
        }
    } 
    return true;
        
}


function carrega_modulos(){
	modelo=$("#modelo").val();
	carrega_combo("services/getModulos.php", "id_modulo", "descricao", $("#id_modulo"),  null, "Selecione", 0);
	if (modelo==1) {
		id_modulo_html=$("#id_modulo").html();
		$("#id_modulo").html(id_modulo_html+"<option value='7'>Blockly</option>");
	}
}

$(document).ready( function(){

	//$.watermark.options.className = 'field_watermark';
		
	$("#login").watermark("ID", {className: 'field_watermark'});
	$("#senha").watermark("Senha", {className: 'field_watermark'});

	carrega_modulos();
	
	$("#btn_acessa").click(function(e){
		
		if( checkForm() ){
		
			if( !postou ){
				
				postou = true;
				
				$.ajax({
					async: true,
					type: "POST",
					url: "services/login.php",
					dataType: "json",
					data: $('#login_form').serialize(),
					error: function(result) {
						alert('ERRO DO SISTEMA: ' + e.responseText);
                        alert( result.result );
                        postou = false;	
					},
					success: function(result) {
						//alert(result.result);
						if( parseInt( result.result ) == 1 ){
						
							window.location.href = 'principal.php';	
							
						} else {
							
							alert( result.result );
						}
						
						postou = false;
					}
				});
			}
			
		}
		
	});

	
});


