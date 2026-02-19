var postou = false;


function carrega_modulos(){
	
	carrega_combo("services/getModulos.php", "id_modulo", "descricao", $("#id_modulo"),  null, "-- selecione um módulo--", 1);

}


function logout(){
    window.location= "index.php?logout=true";
}

function grava_arduino(conteudo,executar) {
    //alert("grava arduino");
    
    conteudo+="\n";
    modelo=$("#modelo").val();
    id_modulo=$("#id_modulo").val();
    id_pessoa=$("#id_pessoa").val();
    
    //alert(modelo+"/"+modulo+"/"+pessoa);
    
    $.ajax({
        async: false,
        type: "POST",
        url: "services/setEquipamentosExecuta.php",
        dataType: "json",
        data: {  
            id_pessoa:id_pessoa, 
            id_modulo: id_modulo, 
            "conteudo":conteudo,
            executar:executar
        },
        error: function(result) {
            if( debug )
                alert('ERRO DO SISTEMA: ' + e.responseText);
        },
        success: function(result) {
            //alert( result );
        }
     });
            
    
}




function executa_esquerda() {
    band=$("#bandeirinha").val();
    modelo=$("#modelo").val();
    var giro = $("#grau_giro").val();
    if (modelo==1) {
        executa_instrucao("pe "+ giro*100);
    } else {
        grava_arduino("pe "+ giro*100,band);
    }
}
    
function executa_direita () {
    band=$("#bandeirinha").val();
    modelo=$("#modelo").val();
    var giro = $("#grau_giro").val();
    
    if (modelo==1) {
        executa_instrucao("pd "+ giro*100);
    } else {
        grava_arduino("pd "+ giro*100,band);
    }
}

function buzina ( ) {
    band=$("#bandeirinha").val();
    modelo=$("#modelo").val();
    if (modelo==1) {
        executa_instrucao("bu 1");
    } else {
        grava_arduino("bu 1",band);
    }
}

function led_esquerdo () {
    band=$("#bandeirinha").val();
    modelo=$("#modelo").val();
    if (modelo==1) {
        executa_instrucao("le 500");
    } else {
        grava_arduino("le 500",band);
    }
}



function led_direito () {
    band=$("#bandeirinha").val();
    modelo=$("#modelo").val();
    if (modelo==1) {
        executa_instrucao("ld 500");
    } else {
        grava_arduino("ld 500",band);
    }
}



function baixa_caneta () {
    band=$("#bandeirinha").val();
    modelo=$("#modelo").val();
    if (modelo==1) {
        executa_instrucao("bc");
    } else {
        grava_arduino("bc",band);
    }
}


function sobe_caneta () {
    band=$("#bandeirinha").val();
    modelo=$("#modelo").val();
    if (modelo==1) {
        executa_instrucao("sc");
    } else {
        grava_arduino("sc",band);
    }
}
    
function executa_frente () {
    band=$("#bandeirinha").val();
    modelo=$("#modelo").val();
    passo_um=$("#passo1").val();

    var quanto = $("#quanto_andar").val();
    //alert(passo_um);
    if (modelo==1) {
        executa_instrucao("pf "+ quanto*passo_um);
    } else {
        grava_arduino("pf "+ quanto*passo_um,band);
    }    
}

function executa_tras () {
    band=$("#bandeirinha").val();
    modelo=$("#modelo").val();
    passo_um=$("#passo1").val();
    var quanto = $("#quanto_andar").val();
    if (modelo==1) {
        executa_instrucao("pt "+ quanto*passo_um);
    } else {
        grava_arduino("pt "+ quanto*passo_um,band);
    }
}
    
function fala() {
    band=$("#bandeirinha").val();
    modelo=$("#modelo").val();
    var texto = $("#texto_fala").val();
    //alert(texto);
    var lingua_fala= $("#lingua_fala").val();
    if (modelo==1) {
        executa_instrucao(lingua_fala +" "+ texto);
    } else {
        grava_arduino(lingua_fala +" "+ texto,band);
    }    
    
}


$(document).ready( function(){

    blockRightButton();
	
	carrega_modulos();

    modelo=$("#modelo").val();
    if (modelo==1) {
        $("#btn_bc").hide();
        $("#btn_sc").hide();
    } else if (modelo==2) {
        $("#btn_bc").show();
        $("#btn_sc").show();
    }

	$("#texto_fala").watermark("Digite o que a Jabuti deve falar", {className: 'field_watermark'});
	
	
	//------------ LISTENERS TECLADO ----------------
/*
    37 - left
    38 - up
    39 - right
    40 - down
*/
        document.onkeydown = tecla_pressionada

	//refazer essa parada
        //parada refeita com sucesso :D
	function tecla_pressionada(e) {
		var keyCode= e.keyCode;
		var charCode= e.charCode;

	  if(keyCode == 37) {
		var giro = $("#grau_giro").val();
		executa_instrucao("pe "+ giro);
	  } else if(keyCode == 38) {
		var quanto = $("#quanto_andar").val();
		executa_instrucao("pf "+ quanto);
	  } else if(keyCode == 39) {
		var giro = $("#grau_giro").val();
		executa_instrucao("pd "+ giro);
	  } else if(keyCode == 40) {
		var quanto = $("#quanto_andar").val();
		executa_instrucao("pt "+ quanto);
	  } else if(charCode == 122) {
		executa_instrucao("le 1");
	  } else if(charCode == 120) {
		executa_instrucao("ld 1");
	  } 
	}
	
	//------------ LISTENERS BOTOES ----------------
        



	
	//------------ LISTENERS GERAIS ----------------
	
	
	
	$("#btn_logout").click(function(e){
		if( confirm("Deseja encerrar o sistema e voltar para tela de inicio? ") )
			logout();
	});
	
        
        //Popula os campos de giro graus/tempo
        $.ajax({
            async: false,
            type: "POST",
            url: "services/getConfiguracoes.php",
            dataType: "json",
            data: {  
            },
            error: function(result) {
                if( debug )
                    alert('ERRO DO SISTEMA: ' + e.responseText);
            },
            success: function(result) {
                for(var y=0; y <  result.length; y++ ){
                    tipomedida=result[y]['tipomedida'];
                    modelo=result[y]['modelo'];
                    servidor=result[y]['servidor'];
                    calibragem10=result[y]['calibragem10'];
                    calibragem45=result[y]['calibragem45'];
                    calibragem90=result[y]['calibragem90'];
                    calibragem180=result[y]['calibragem180'];
                    calibragem360=result[y]['calibragem360'];
                    hostcamera=result[y]['hostcamera'];
                    usacamera=result[y]['usacamera'];
                }
                
                //Popula Select de Giro Graus/Tempo
                if (tipomedida==1) { //Graus
                    valor10nome="10º";
                    valor45nome="45º";
                    valor90nome="90º";
                    valor180nome="180º";
                    valor360nome="360º";
                } else { //Tempo
                    valor10nome=calibragem10+" ms";
                    valor45nome=calibragem45+" ms";
                    valor90nome=calibragem90+" ms";
                    valor180nome=calibragem180+" ms";
                    valor360nome=calibragem360+" ms";        
                }
                valor10=(calibragem10/100);
                valor45=(calibragem45/100);
                valor90=(calibragem90/100);
                valor180=(calibragem180/100);
                valor360=(calibragem360/100);
                $("select[id=grau_giro]").html("\
                    <option value='"+valor10+"'>"+valor10nome+"</option>\n\
                    <option value='"+valor45+"'>"+valor45nome+"</option>\n\
                    <option value='"+valor90+"'>"+valor90nome+"</option>\n\
                    <option value='"+valor180+"'>"+valor180nome+"</option>\n\
                    <option value='"+valor360+"'>"+valor360nome+"</option>\n\
                "); 
                
                //Popula Passos
                if (tipomedida==1) { //Passos
                    passo1="1 passo";
                    passo2="2 passos";
                    passo3="3 passos";
                    passo5="5 passos";
                    passo10="10 passos";
                } else {
                    passo1="100 ms";
                    passo2="200 ms";
                    passo3="300 ms";
                    passo5="500 ms";
                    passo10="1000 ms";                    
                }
                $("select[id=quanto_andar]").html("\
                    <option value='1'>"+passo1+"</option>\n\
                    <option value='2'>"+passo2+"</option>\n\
                    <option value='3'>"+passo3+"</option>\n\
                    <option value='5'>"+passo5+"</option>\n\
                    <option value='10'>"+passo10+"</option>\n\
                ");
                //destino=hostcamera;
                
                if (usacamera==1) {
                    $("#camera_div").show();;
                } else {
                    $("#camera_div").hide();;
                }
                
                document.getElementById('framecamera').src=hostcamera;
                //alert(hostcamera);
            }
        }); 
        
        //Verifica bandeirinha
        id_pessoa=$("#id_pessoa").val();
        $.ajax({
            async: false,
            type: "POST",
            url: "services/getBandeiraDireto.php",
            dataType: "json",
            data: { 
                id:id_pessoa
            },
            error: function(result) {
                if( debug )
                    alert('ERRO DO SISTEMA: ' + e.responseText);
            },
            success: function(result) {
                    //alert(result);
                    $("#bandeirinha").val(result);
            }
        });
        
        
	
        window.setInterval( checa_logado, 5000 );
	

	
});
