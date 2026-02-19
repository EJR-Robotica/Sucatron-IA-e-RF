
var debug_utilidades = false;


 /**
    * Disable right-click of mouse, F12 key, and save key combinations on page
    * By Arthur Gareginyan (https://www.arthurgareginyan.com)
    * For full source code, visit https://mycyberuniverse.com
    */
function blockRightButton() {
    document.addEventListener("contextmenu", function(e){
      e.preventDefault();
    }, false);
    document.addEventListener("keydown", function(e) {
    //document.onkeydown = function(e) {
      // "I" key
      if (e.ctrlKey && e.shiftKey && e.keyCode == 73) {
        disabledEvent(e);
      }
      // "J" key
      if (e.ctrlKey && e.shiftKey && e.keyCode == 74) {
        disabledEvent(e);
      }
      // "S" key + macOS
      if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
        disabledEvent(e);
      }
      // "U" key
      if (e.ctrlKey && e.keyCode == 85) {
        disabledEvent(e);
      }
      // "F12" key
      if (event.keyCode == 123) {
        disabledEvent(e);
      }
    }, false);
    function disabledEvent(e){
      if (e.stopPropagation){
        e.stopPropagation();
      } else if (window.event){
        window.event.cancelBubble = true;
      }
      e.preventDefault();
      return false;
    }
  };



function checa_logado( ){
	
	var timestamp = new Date().getTime();
	
	$.ajax({
		async: false,
		type: "POST",
		url: "services/checaLogoutPessoa.php",
		dataType: "json",
		data: {timestamp:timestamp},
		success: function(result) {

			//alert(result['out']);
			
			if( result['out'] == 1)
				window.location = 'index.php';
			
		},
		error: function(result){
				if( debug_utilidades )
						alert('ERRO DO SISTEMA: ' + e.responseText); 
		}
	});

}

function update_pessoa_modulo( conteudo, enviou ){
	
	var timestamp = new Date().getTime();
	$.ajax({
		async: false,
		type: "POST",
		url: "services/updatePessoaModulo.php",
		dataType: "json",
		data: {timestamp:timestamp, conteudo:conteudo, enviou: enviou },
		success: function(result) {

			//faz nada...	
			
		},
		error: function(result){
				if( debug_utilidades )
						alert('ERRO DO SISTEMA: ' + e.responseText); 
		}
	});

}


function carrega_combo( metodo, campo_id, campo_descricao, combo_jquery, parametros, texto_selecione, item_padrao, texto_nenhum ){
	
	var timestamp = new Date().getTime();
		
	if( parametros == null)
		parametros = {timestamp:timestamp};
	else
		parametros['timestamp'] = timestamp;
	
	if( texto_selecione == null )
		texto_selecione = "- selecione um item -";

	if( texto_nenhum == null )
		texto_nenhum = "- nenhum item -";
		
	
	$.ajax({
		async: false,
		type: "POST",
		url: metodo,
		dataType: "json",
		data: parametros,
		success: function(result) {
			if(result[0]){
				var html = "";
				
				html += '<option value="0">'+texto_selecione+'</option>';
				
				for(var i=0;i<result.length;i++){
				
					var selected = "";
					
					if( item_padrao != null && result[i][campo_id] == item_padrao)
						selected = " selected ";
					
              
					html += '<option value="' + result[i][campo_id] + '" '+selected+'>' + result[i][campo_descricao] + '</option>'; 
				}
                

				combo_jquery.html(html);
				lastResult = result;
				
			} else {
				var html = "";
				html += '<option value="0">'+texto_nenhum+'</option>';
				combo_jquery.html(html);
				lastResult = result;
				
			}
		},
		error: function(result){
				if( debug_utilidades )
						alert('ERRO DO SISTEMA: ' + e.responseText); 
		}
	});

}


function salva_form( metodo, form_jquery, callback_sucesso, callback_erro ){
	
	var timestamp = new Date().getTime();
	
	parametros = form_jquery.serializeArray();
	
	if( parametros == null)
		parametros = {timestamp:timestamp};
	else
		parametros['timestamp'] = timestamp;
	
	$.ajax({
		async: false,
		type: "POST",
		url: metodo,
		dataType: "json",
		data: parametros,
		error: function(result) {
		
			if( callback_erro == null ){
				
					alert('ERRO DO SISTEMA: ' + result.responseText);
			}
			else
				callback_erro( result );
			
		},
		success: function( result ) {
			//para ser sucesso a resposta deve ser um jSON com um objeto chamado "resultado" = 1
			
			if(result['resultado'] == 0){
			
				if( callback_erro == null ){
					alert( result.mensagem);
				} else
					callback_erro( result );

			} else	if(result['resultado'] == 1){
				
				if( callback_sucesso == null ){
					alert( result.mensagem);
				} else
					callback_sucesso( result );

			}

		
		}
	});

}

function selecionar(select, valor)
{
    var combo = document.getElementById(select);

    for (var i = 0; i < combo.options.length; i++)
    {
        if (combo.options[i].value == valor)
        {
            combo.options[i].selected = "true";
            break;
        }
    }
}




