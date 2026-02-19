var postou = false;
var enviado = false;
var alterado = false;

function carrega_modulos(){
	carrega_combo("services/getModulos.php", "id_modulo", "descricao", $("#id_modulo"),  null, "-- selecione um módulo--", 1);
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



function logout(){
	window.location= "index.php?logout=true";
}

//tamanhos em pixeis
var tamanho_botao = 60;
var padding = 6;
var margem	= 3;
var borda = 1;

// quantas colunas de botões serão
var colunas = 5;


var botoes = [ 

    {element: "div", id:"btn_frente",comando:"pf", pula_linha:true, espaco:true, class: "btn_comando btn_frente" }, 
    {element: "div",id:"btn_tras",comando:"pt",pula_linha:true, espaco:true, class: "btn_comando btn_tras"},  
    {element: "div",id:"btn_1",comando:"1", pula_linha:false, espaco:false, class: "btn_comando"},
	{element: "div",id:"btn_2",comando:"2", pula_linha:false, espaco:false, class: "btn_comando"},
	{element: "div",id:"btn_3",comando:"3", pula_linha:false, espaco:false, class: "btn_comando"},
	

	{element: "div",id:"btn_esquerda",comando:"pe",pula_linha:true, espaco:true, class: "btn_comando btn_esquerda"},
	{element: "div",id:"btn_direita",comando:"pd",pula_linha:true, espaco:true, class: "btn_comando btn_direita"},
	{element: "div",id:"btn_4",comando:"4", pula_linha:false, espaco:false, class: "btn_comando"},
	{element: "div",id:"btn_5",comando:"5", pula_linha:false, espaco:false, class: "btn_comando"},
	{element: "div",id:"btn_6",comando:"6", pula_linha:false, espaco:false, class: "btn_comando"},
	

	{element: "div",id:"btn_tempo",comando:"t",pula_linha:true, espaco:true, class: "btn_comando"},
	{element: "div",id:"btn_buzina",comando:"bu",pula_linha:true, espaco:true, class: "btn_comando"},
	{element: "div",id:"btn_7",comando:"7", pula_linha:false, espaco:false, class: "btn_comando"},
	{element: "div",id:"btn_8",comando:"8", pula_linha:false, espaco:false, class: "btn_comando"},
	{element: "div",id:"btn_9",comando:"9", pula_linha:false, espaco:false, class: "btn_comando"},
	
	{element: "div",id:"btn_ledesquerdo",comando:"le",pula_linha:true, espaco:true, class: "btn_comando"},
	{element: "div",id:"btn_leddireito",comando:"ld",pula_linha:true, espaco:true, class: "btn_comando"},
	{element: "div",id:"btn_ledambos",comando:"lde",pula_linha:true, espaco:true, class: "btn_comando"},
	{element: "div",id:"btn_0",comando:"0", pula_linha:false, espaco:false, class: "btn_comando"},
	{element: "div",id:"btn_ponto",comando:".", pula_linha:false, espaco:false, class: "btn_comando"},

	{element: "div",id:"btn_baixacaneta",comando:"bc",pula_linha:true, espaco:true, class: "btn_comando"},
	{element: "div",id:"btn_sobecaneta",comando:"sc",pula_linha:true, espaco:true, class: "btn_comando"},

	{element: "input",id:"txt_frase",comando:"", funcao:"nenhuma", class: "btn_input_text", width:"265px", height: "30px"},
	{element: "div",id:"btn_frase",comando:"Inserir", funcao:"adiciona_frase", class: "btn_comando", width:"95px", height: "30px"},
	{element: "br", id:"br", class: "pula_linha", width:"0px", height: "0px"},
	{element: "div",id:"btn_limpar",comando:"Limpar", funcao:"click_limpar", class: "btn_comando", width:"100px", height: "30px"},
	{element: "div",id:"btn_enviar",comando:"Enviar", funcao:"click_enviar", class: "btn_comando", width:"100px", height: "30px"}

];



function pinta_botoes( container ){
	//itera a lista para criar os botões

	//prepara os estilos
	var tbw = tamanho_botao+"px";
	var tbh = tbw;
	var mg = margem+"px";
	var pd = padding+"px";
	var ttb = (tamanho_botao + (margem*2) + (padding*2) + (borda*2) ) * colunas ; //tamanho total do botão X colunas
	var border = "border + "+ borda + "px solid #555";
	
	//altera o tamanho do conteiner mde botões de acordo com a coluna
	container.css( {"width": ttb, "height":ttb  } );
	
	for(var b = 0; b < botoes.length ; b++ ){

		var tbw = tamanho_botao+"px";
		var tbh = tbw;
		
		var obj;

		if( botoes[b]['id'] != "vazio" ){
	
			obj = $("<"+ botoes[b]['element'] +">", botoes[b]);
			border = borda + "px solid #555";
			
			if( botoes[b].width != undefined ){
				tbw = botoes[b].width;
			}

			if( botoes[b].height != undefined ){
				tbh = botoes[b].height;
			}
				
			
			//amarra função
			if( botoes[b].funcao != undefined  ){
				
				obj.click( eval( botoes[b].funcao ) );
				
			} else {

				//função de click padrão, caso uma função customizada não seja declarada
				obj.click(function(){
					
					//zera o envio
					enviado = false;
					alterado = true;
					
					$("#btn_enviar").css( {"background-color":"#dddd00"  } );
					
					if( this.attributes['pula_linha'] != undefined && this.attributes['pula_linha'].value == "true" ){
						
						if( $('#container_programa').val().length > 0 )
							$('#container_programa').val( $('#container_programa').val() + "\n");
		
					}	
						
					$('#container_programa').val( $('#container_programa').val() +  this.attributes['comando'].value );
					
					if( this.attributes['espaco'] != undefined && this.attributes['espaco'].value == "true" )
						$('#container_programa').val( $('#container_programa').val() + " ");
				});				
				
			}

			
			//conteudo do botão
			if( botoes[b]['class'] == "btn_comando" ){
				var texto = $("<span>", { html:botoes[b]['comando'].toUpperCase() });
				obj.append( texto );
			}
			
			container.append(obj);
		
		} else {
			
			//botão vazio
			border = borda + "px solid #ddd";
			obj = $("<div>", {class:"btn_vazio"});
		}

		//Aplica os tamanhos e appenda
		obj.css( {"width": tbw, "height":tbh, "margin":mg, "padding":pd, "border":border  } );
		container.append(obj);
	}
	
	
	$("#btn_enviar").css( {"background-color":"#dddd00"  } );
	
	
}

//funcões customizadas

function click_limpar( e ){
	
	//troca...
	$('#container_programa').val( "" );
	
	alterado = true;
	
}

function nenhuma(){
	
}

function adiciona_frase( e ){
	
	//pega o texto
	var texto = $('#container_programa').val();
	
	//pula a linha
	if( $('#container_programa').val().length > 0 )
		texto = texto + "\n";

	//Adiciona a frase
	var lingua_fala=$('#lingua_fala').val();
	texto = texto + lingua_fala + " " + $("#txt_frase").val();
	
	
	//troca...
	$('#container_programa').val( texto );
	
        //limpa texto digitado
       $("#txt_frase").val("");

        
	alterado = true;
	
}

function executa_pessoa( id_pessoa, id_modulo ){
	
	var timestamp = new Date().getTime();
	
	$.ajax({
		async: false,
		type: "POST",
		url: "services/executaPessoa.php",
		dataType: "json",
		data: { timestamp : timestamp, id_pessoa:id_pessoa, id_modulo: id_modulo },
		error: function(result) {
			
			if( debug )
				alert('ERRO DO SISTEMA: ' + e.responseText);
	
		},
		success: function(result) {
			
			alert( result );
			//atualiza_logados();
		}
	});
}


function click_enviar( e ){

    if( !enviado ){

        //Verifica se o usuário tem flag para enviar direto seu código
        id_pessoa=$('#id_pessoa').val();
        id_modulo=$('#id_modulo').val();
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
                comandos=$('#container_programa').val();
                var comandos2="";
                $.ajax({
                    async: false,
                    type: "POST",
                    url: "services/getConfiguracoes.php",
                    dataType: "json",
                    data: {  
                    },
                    error: function(result2) {
                        if( debug ) alert('ERRO DO SISTEMA: ' + e.responseText);
                    },
                    success: function(result2) {
                        var conteudo2="";
                        for(var y=0; y <  result2.length; y++ ){
                            tipomedida=result2[y]['tipomedida'];
                        }

                        if (tipomedida==1) { //é por graus e passos
                            var cmd_max="";
                            var cmd_comando = "";
                            var conteudo = "";
                            var max = "";
                            var conteudo="";
                            conteudo=comandos;
                            conteudo=conteudo.split("\n");
                            max=conteudo.length;


                            for (i=0;i<max;i++) {
                                var cmd="";
                                var cmd = conteudo[i];
                                var cmd = cmd.split(" ");
                                cmd_max=cmd.length;
                                cmd_comando=cmd[0];
                                    var cmd_valor = "";
                                for (j=1;j<cmd_max;j++) {
                                    var temp=cmd[j];
                                    cmd_valor+=temp+" ";
                                }
                                //alert(cmd_comando+" / "+cmd_valor);
                                //Descobre quantos milesegundos é um graus e multiplica pela quantidade de graus digitada


                                c360=$("#c360").val();
                                passo1=$("#passo1").val();
                                porgrau=c360/360;
                                if ((cmd_comando=="pf")||(cmd_comando=="pt")) { //por passo
                                    cmd_valor=cmd_valor*passo1;
                                    cmd_valor=cmd_valor.toFixed(0);
                                } else if ((cmd_comando=="pd")||(cmd_comando=="pe")) { // por grau
                                    cmd_valor=cmd_valor*porgrau;
                                    cmd_valor=cmd_valor.toFixed(0);
                                }
                                conteudo2+=cmd_comando + " " + cmd_valor+"\n";
                                //alert(conteudo2);

                            }
                                            //alert(conteudo2);
                        } else if (tipomedida==2) { // é por milisegundos
                                            //alert("milisegundos");
                                            //return "bbbb";
                                            conteudo2=comandos;
                        } else {
                           alert("Erro");
                        } 
                        //alert(conteudo2);
                        update_pessoa_modulo( conteudo2, 1 );
                        $("#btn_enviar").css( {"background-color":"#00dd00"  } );

                        modelo=$("#modelo").val();

                        //alert(modelo+"/"+result);

                        if (modelo==1) {
                            if (result==1) {
                                executa_pessoa(id_pessoa, id_modulo);
                            } else {
                                alert("Seu exercício foi enviado com sucesso! Aguarde o moderador executar.");
                                enviado = false;
                                alterado = false;
                            }
                        } else { //modelo mini
                            if (result==1) {
                                conteudo="";
                                grava_arduino(conteudo2,1); //O 1 significa que tem bandiera, pode executar
                                //alert("grava arduinio e executa direto");

                            } else {
                                conteudo="";
                                //alert("grava arduino e aguarda aprovacao para executar");
                                grava_arduino(conteudo2,0); //O 1 significa que tem bandiera, pode executar
                                alert("Seu exercício foi enviado com sucesso! Aguarde o moderador executar.");
                                enviado = false;
                                alterado = false;
                            }
                        }
                    }
                });
            }
        });
}
}



function atualiza_conteudo(){
    if( !enviado && alterado ){
            conteudo=$('#container_programa').val();
            c360=$('#c360').val();
            passo1=$('#passo1').val();
            tipomedida=$('#tipomedida').val();

            conteudo2=converte_conteudo_grauspassos(conteudo,c360,passo1,tipomedida)
            //alert(conteudo2);
            update_pessoa_modulo(conteudo2, 0 );
            $("#btn_enviar").css( {"background-color":"#dddd00"  } );
            alterado = false;
    }
}




$(document).ready( function(){
	
    blockRightButton();

    $("#painel_esquerdo").hide();
        
	
	//desliga keypress no textarea
	$('#container_programa').keypress( function(e) {
		
		//if (e.keyCode == 96) {
			e.preventDefault();
			// Do stuff.
		//}
	});
	
	pinta_botoes( $("#container_botoes") );
	
	
	carrega_modulos();

	$("#txt_frase").watermark("O que a Jabuti deve falar", {className: 'field_watermark'});
	
	$("#btn_logout").click(function(e){
		if( confirm("Deseja encerrar o sistema e voltar para tela de inicio? ") )
			logout();
	});


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
                passo1=result[y]['passo1'];
                c360=result[y]['calibragem360'];
            }
            if (tipomedida==1) { //ocultar
                $("#medida").text("Graus/Passos");
                $("#passo1").show();
                $("#passo1").text(passo1+" ms");
            } else if (tipomedida==2) {
				$("#medida").text("Milisegudos");
				$("#passo1_texto").hide();
				$("#passo1").hide();
                $("#passo1").text(" ");				
            } else {
               alert("Erro");
            }
            $("#c360").val(c360);
            $("#passo1").val(passo1);

            
                  
        }
    });  
	
	
	window.setInterval( checa_logado, 5000 );
	
	window.setInterval( atualiza_conteudo, 3000 );
        
        
        //Limpa conteudo ao entrar no módulo
        click_limpar();
	
});


function converte_conteudo_grauspassos (conteudo,c360,passo1,tipomedida) {
    //alert("Recebeu os comandos:\n"+conteudo);
    var conteudo2="";
    if (tipomedida==1) { //é por graus e passos
        var cmd_max="";
        var cmd_comando = "";
        var max = "";
        conteudo=conteudo.split("\n");
        max=conteudo.length;


        for (i=0;i<max;i++) {
            var cmd="";
            var cmd = conteudo[i];
            var cmd = cmd.split(" ");
            cmd_max=cmd.length;
            cmd_comando=cmd[0];
                var cmd_valor = "";
            for (j=1;j<cmd_max;j++) {
                var temp=cmd[j];
                cmd_valor+=temp+" ";
            }
            //alert(cmd_comando+" / "+cmd_valor);
            //Descobre quantos milesegundos é um graus e multiplica pela quantidade de graus digitada


            c360=c360;
            passo1=passo1;
            porgrau=c360/360;
            if ((cmd_comando=="pf")||(cmd_comando=="pt")) { //por passo
                cmd_valor=cmd_valor*passo1;
                cmd_valor=cmd_valor.toFixed(0);
            } else if ((cmd_comando=="pd")||(cmd_comando=="pe")) { // por grau
                cmd_valor=cmd_valor*porgrau;
                cmd_valor=cmd_valor.toFixed(0);
            }
            conteudo2+=cmd_comando + " " + cmd_valor+"\n";
            //alert(conteudo2);

        }
    } else if (tipomedida==2) { // é por milisegundos
        conteudo2=conteudo;
    } else {
       alert("Erro");
    }
    //alert("Devolve os comandos convertidos:\n"+conteudo2);
    return conteudo2;

}
