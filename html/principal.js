

var atualizando_logados = false;
var atualizando_cadastrados = false;
var atualizando_equipamentos = false;
var atualizando_equipes = false;

var debug = false;

function objLength(obj){
    var i=0;
    for (var x in obj){
      if(obj.hasOwnProperty(x)){
        i++;
      }
    } 
    return i;
}




function checkForm(){
	
	
	
	return true;
}


function carrega_modulos(){
	
	
	carrega_combo("services/getModulos.php", "id_modulo", "descricao", $("#id_modulo"),  null);

}

function para_tudo () {
    $.ajax({
        async: false,
        type: "POST",
        url: "services/paratudo.php",
        dataType: "json",
        data: { 
        },
        error: function(result) {
            if( debug )
                alert('ERRO DO SISTEMA: ' + e.responseText);
        },
        success: function(result) {
            alert( result );
        }
    });

}



var pessoa_mostra_tudo = 0;

function mostra_tudo( obj ){
	
	pessoa_mostra_tudo = obj.attributes['id_pessoa'].value;

	var conteudo = "<textarea id='area_mostra_tudo' class='modal'></textarea>";
	modal.open({content: conteudo, width:680, height:500});
	conteudo3=obj.attributes['conteudo'].value;
        $.ajax({
            async: false,
            type: "POST",
            url: "services/getConfiguracoes.php",
            dataType: "json",
            data: { },
            error: function(result) {
                if( debug ) alert('ERRO DO SISTEMA: ' + e.responseText);
            },
            success: function(result) {
                for(var y=0; y <  result.length; y++ ){
                    c360=result[y]['calibragem360'];
                    passo1=result[y]['passo1'];
                    tipomedida=result[y]['tipomedida'];
                }
                if (tipomedida==1) {
                    //alert(conteudo3+"/"+c360+"/"+passo1+"/"+tipomedida);
                    conteudo3=desconverte_conteudo_grauspassos (conteudo3,c360,passo1,tipomedida);
                } else if (tipomedida==2) {

                } else {
                    alert("Erro!");
                }
            }
        });        
	$("#area_mostra_tudo").val( conteudo3 );

	
}

function atualiza_mostra_tudo( id_pessoa, conteudo ){
	
	if( pessoa_mostra_tudo == id_pessoa){
		
		
		$("#area_mostra_tudo").val( conteudo );
		
	}
	
}

function bandeira(valor) {
    //alert(valor);
    $.ajax({
        async: false,
        type: "POST",
        url: "services/getBandeira.php",
        dataType: "json",
        data: { 
            id : valor 
        },
        error: function(result) {
            if( debug )
                alert('ERRO DO SISTEMA: ' + e.responseText);
        },
        success: function(novabandeira) {
            //res=result[0].direto;
            //alert(res);
            //alert(novabandeira);
            if (novabandeira==1) {
                    document.getElementById("band"+valor).src="imagens/bandeira.png";
            } else {
                    document.getElementById("band"+valor).src="imagens/bandeira2.png";

            }
        }
    });
}



function atualiza_logados(){
	var timestamp = new Date().getTime();
	if( !atualizando_logados){
		atualizando_logados = true;
		
        equipe_logada = $("#equipe_logada").val();
        usuario_logado = $("#usuario_logado").val();

        $.ajax({
            async: false,
            type: "POST",
            url: "services/getLogados.php",
            dataType: "json",
            data: { 
                timestamp : timestamp,
                equipe_logada : equipe_logada,
                usuario_logado : usuario_logado
            },
            error: function(result) {
                if( debug )
                alert('ERRO DO SISTEMA: ' + e.responseText);
                atualizando_logados = false;	
            },
            success: function(result) {
                
                //if (result=="") alert("nada"); 
                //else alert("tem");
                
                $('#tabela_logados tbody').empty();

                var tabela = $('#tabela_logados');
                for(var x=0; x <  result.length; x++ ) {

                    e_mediador= result[x]['e_mediador'];
                    if (e_mediador==1) {
                        e_mediador_texto = "*";
                        cadastrados_linha_classe="tab_linhas_amarelo";

                    } else {
                        e_mediador_texto = "";
                        cadastrados_linha_classe="lin";
                    }   


                    var tr = $("<tr class='"+cadastrados_linha_classe+"'>");

                    var td = $("<td align=''>");
                    td.html( result[x]['id_pessoa']);
                    tr.append( td );

                    var td = $("<td align='left'>");
                    td.html( result[x]['nome']+" "+e_mediador_texto );
                    tr.append( td );

                    var td = $("<td align='left'>");
                    td.html( result[x]['equipe'] );
                    tr.append( td );

                    var td = $("<td align='left'>");
                    td.html( result[x]['modulo_nome'] );
                    tr.append( td );

                    /*var td = $("<td align='left'>");
                    var conteudo = result[x]['conteudo'];
                    var pos = conteudo.lastIndexOf('\n');
                    conteudo = conteudo.substring(pos, conteudo.length );
                    td.html( " ... " +conteudo);
                    tr.append( td );*/

                    var td = $("<td align='right' width='90px'>");
                    var link = $("<a>", {class:"btn_operacao",id_pessoa:result[x]['id_pessoa'], conteudo:result[x]['conteudo']}  );
                    link.html("Avaliar");
                    link.click( function(){ mostra_tudo( this ); }  );
                    td.append( link);
                    tr.append( td );
                    
                    conteudo3=result[x]['conteudo'];

                    
                    //se a tela de mostrar tudo estiver aberta, chama o preenchimento
                    $.ajax({
                        async: false,
                        type: "POST",
                        url: "services/getConfiguracoes.php",
                        dataType: "json",
                        data: { },
                        error: function(result) {
                            if( debug ) alert('ERRO DO SISTEMA: ' + e.responseText);
                        },
                        success: function(result) {
                            for(var y=0; y <  result.length; y++ ){
                                c360=result[y]['calibragem360'];
                                passo1=result[y]['passo1'];
                                tipomedida=result[y]['tipomedida'];
                            }
                            if (tipomedida==1) {
                                //alert(conteudo3+"/"+c360+"/"+passo1+"/"+tipomedida);
                                conteudo3=desconverte_conteudo_grauspassos (conteudo3,c360,passo1,tipomedida);
                            } else if (tipomedida==2) {
                                
                            } else {
                                alert("Erro!");
                            }
                            
                                                       

                        }
                    });
                    
                    //alert(conteudo3);
                    atualiza_mostra_tudo( result[x]['id_pessoa'], conteudo3 ); 
                    
                    

                    //Semaforos
                    var td = $("<td align='left' width='80px'>");
                    var modulo_enviado = result[x]['enviou'];
                    var tempo_parado = result[x]['tempo_parado'];
                    var classe = "semaforo_amarelo";
                    if( tempo_parado > 60 )
                            classe = "semaforo_vermelho";
                    if( modulo_enviado == 1 )
                            classe = "semaforo_verde";
                    var imagem = $("<div>", {class:classe }  );
                    td.append( imagem);
                    tr.append( td );

                    //Equipamento
                    equip_nome=result[x]['equipamentopadrao']; //pega equipamento da linha/pessoa
                    //Verifica qual é o modelo   
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
                                model=result[y]['modelo'];
                            }


                            if (model!=1) {
                                 var td = $("<td align='left'>");
                                 //td.html("<select class='campopadrao' name='equipamento' id='equipamento'  style=''><option value=''>Nenhum</option>"+options+"</select>");
                                 td.html(equip_nome);
                                 tr.append( td );  
                            }

                        }
                   });

                    //Operações
                    var td = $("<td width='100px'>");

                    var link2 = $("<a>", {class:"btn_operacao", id_pessoa:result[x]['id_pessoa'], id_modulo:result[x]['id_modulo'] }  );
                    link2.html("Executar");
                    link2.click( function(){ executa_pessoa( this.attributes['id_pessoa'].value, this.attributes['id_modulo'].value ); }  );
                    td.append( link2 );

                    var link3 = $("<a>", {class:"btn_operacao", id_pessoa:result[x]['id_pessoa'] }  );
                    link3.html("Logout");
                    link3.click( function(){ logout_pessoa( this.attributes['id_pessoa'].value ); }  );
                    td.append( link3);
                    tr.append( td );
                    tabela.append( tr );
                }
                atualizando_logados = false;
            }
		});
		
	} // fim atualizando_logados
		
} //fim atualiza_logados




function atualiza_cadastrados() {
	
	var timestamp = new Date().getTime();
	if( !atualizando_cadastrados) {
			
		atualizando_cadastrados = true;


        //Se o modelo for JabutiEduG2 ocultar partes da tela
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
                    modelo=result[y]['modelo'];
                }
            }
        }); 

        equipe_logada = $("#equipe_logada").val();
        usuario_logado = $("#usuario_logado").val();
        //alert(usuario_logado);
        //alert(equipe_logada);

		$.ajax({
			async: false,
			type: "POST",
			url: "services/getCadastrados.php",
			dataType: "json",
			data: { 
                timestamp : timestamp,
                equipe_logada : equipe_logada,
                usuario_logado : usuario_logado
            },
			error: function(result) {
				if( debug ) alert('ERRO DO SISTEMA: ' + e.responseText);
				atualizando_cadastrados = false;	
			},
			success: function(result) {
                //alert(JSON.stringify(result));
                //alert(objLength(result)); //returns 4                         

                max=objLength(result);
                //alert(max);
                
                $('#tabela_cadastrados tbody').empty();

                var tabela = $('#tabela_cadastrados');

                for (var x=0; x <  max; x++ ){
                        //alert(result.length);

                        //alert("cadastrados");

                    e_mediador= result[x]['e_mediador'];
                    if (e_mediador==1) {
                        e_mediador_texto = "*";
                        cadastrados_linha_classe="tab_linhas_amarelo";

                    } else {
                        e_mediador_texto = "";
                        cadastrados_linha_classe="lin";
                    }    

                    var tr = $("<tr class='"+cadastrados_linha_classe+"'>");

                    //Bandeira
                    var td = $("<td align='center'>");
                    bandeira_id=result[x]['id_pessoa'];
                    band=result[x]['direto'];
                    if (band==0)  bandeira_atual="bandeira2.png";
                    else bandeira_atual="bandeira.png";
                    if (e_mediador!=1) {
                        td.html(" <img width='20px' src='imagens/"+bandeira_atual+"' title='Bandeira' alt='Bandeira' id='band"+bandeira_id+"' onclick='bandeira("+bandeira_id+")'>");
                    } else {
                        td.html(" ");                        
                    }
                    tr.append( td );

                    //ID
                    var td = $("<td align='center'>");
                    td.html( result[x]['id_pessoa'] );
                    tr.append( td );


                    
                    //Nome
                    
                    var td = $("<td>");
                    td.html( result[x]['nome'] + e_mediador_texto);
                    tr.append( td );
                    
                    
                    //Instituição
                    var td = $("<td>");
                    td.html( result[x]['instituicao'] );
                    tr.append( td );

                    //Time
                    var td = $("<td>");
                    td.html( result[x]['time'] );
                    tr.append( td );


                    //Equipe
                    var td = $("<td id='coluna_equipe'>");
                    equipe = result[x]['equipe'];
                    equipe_nome = result[x]['equipe_nome'];
                    td.html( equipe +" - " +equipe_nome);
                    tr.append( td );                    
                    
                    
                    if (modelo!=1) { 
                        //Equipamento PAdrão
                        var td = $("<td align='right' id=''>");
                        td.html( result[x]['equipamentopadrao'] );
                        tr.append( td );

                        var td = $("<td align='left' width='150px'  id=''>");
                        var link4 = $("<a>", {class:"btn_operacao", id_pessoa:result[x]['id_pessoa'] }  );
                        link4.html("Equipo");
                        link4.click( function(){ click_equipamentos_padrao_alterar( this.attributes['id_pessoa'].value ); }  );
                        td.append( link4);
                        tr.append( td );
                    }        
                    
                    //Editar
                    var td = $("<td align='right' width='90px'>");
                    var link4 = $("<a>", {class:"btn_operacao", id_pessoa:result[x]['id_pessoa'] }  );
                    link4.html("Editar");
                    link4.click( function(){ editar_pessoa( this.attributes['id_pessoa'].value ); }  );
                    td.append( link4);
                    tr.append( td );

                    //Excluir
                    var td = $("<td align='right' width='90px'>");
                    var link4 = $("<a>", {class:"btn_operacao", id_pessoa:result[x]['id_pessoa'] }  );
                    link4.html("Excluir");
                    link4.click( function(){ excluir_pessoa( this.attributes['id_pessoa'].value ); }  );
                    td.append( link4);
                    tr.append( td );

                    tabela.append( tr );
    					
    			}
			    atualizando_cadastrados = false;
		    }
	   });
    } else {
            //echo "teste";
    }// fim atualizando_cadastrados
} //fim atualiza_cadastrados


function excluir_pessoa(id_pessoa) {
    var timestamp = new Date().getTime();
    if( !atualizando_cadastrados){
        atualizando_cadastrados = true;
        $.ajax({
            async: false,
            type: "POST",
            url: "services/delCadastrado.php",
            dataType: "json",
            data: { timestamp : timestamp, id_pessoa:id_pessoa },
            error: function(result) {

                    if( debug )
                            alert('ERRO DO SISTEMA: ' + e.responseText);

                    atualizando_cadastrados = false;	
            },
            success: function(result) {
                //alert(JSON.stringify(result));
                alert("Pessoa excluída com sucesso!");
                atualizando_cadastrados=false;
                atualiza_cadastrados();
            }
        });
    }
}

function excluir_equipamento(id_equipamento) {
    var timestamp = new Date().getTime();
    $.ajax({
        async: false,
        type: "POST",
        url: "services/delEquipamento.php",
        dataType: "json",
        data: { 
            timestamp : timestamp, 
            id_equipamento:id_equipamento 
        },
        error: function(result) {
            if( debug ) alert('ERRO DO SISTEMA: ' + e.responseText);
            atualizando_equipamentos = false;	
        },
        success: function(result) {
            //alert(JSON.stringify(result));
            alert("Equipamento excluído com sucesso!");
            atualizando_equipamentos=false;
            atualiza_equipamentos();
        }
    });
}

function excluir_equipe(id_equipe) {
    var timestamp = new Date().getTime();
    $.ajax({
        async: false,
        type: "POST",
        url: "services/delEquipe.php",
        dataType: "json",
        data: { 
            timestamp : timestamp, 
            id_equipe:id_equipe 
        },
        error: function(result) {
            if( debug ) alert('ERRO DO SISTEMA: ' + e.responseText);
            atualizando_equipes = false;   
        },
        success: function(result) {
            //alert(JSON.stringify(result));
            alert("Equipe excluída com sucesso!");
            atualizando_equipes=false;
            atualiza_equipes();
        }
    });
}


function editar_equipamento(id_equipamento) {
    click_equipamentos_cadastrar();
    document.getElementById('btn_salvar_equipamento').setAttribute('onclick', 'click_equipamentos_cadastrar_salvar(2,'+id_equipamento+')');
    $.ajax({
        async: false,
        type: "POST",
        url: "services/getEquipamentoEditar.php",
        dataType: "json",
        data: {  
            codigo:id_equipamento
        },
        error: function(result) {
            if( debug )
                alert('ERRO DO SISTEMA: ' + e.responseText);
        },
        success: function(result) {
            var nome = result[0]['nome'];
            var id_senha = result[0]['id_senha'];
            var descricao = result[0]['descricao'];
            var endereco = result[0]['endereco'];
            var status = result[0]['status'];
            var ssid = result[0]['ssid'];
            var ssid_senha = result[0]['ssid_senha'];
            //Popula Servidor
            $.ajax({
                async: false,
                type: "POST",
                url: "services/getConfiguracoes.php",
                dataType: "json",
                data: { },
                error: function(result) {
                    if( debug )
                        alert('ERRO DO SISTEMA: ' + e.responseText);
                },
                success: function(result) {
                    for(var y=0; y <  result.length; y++ ){
                        servidor=result[y]['servidor'];
                    }
                    //alert(servidor);
                    $("#servidor").val(servidor);
                }
            });
            var host = result[0]['host'];
            var datacadastro = result[0]['datacadastro'];
            var porta = result[0]['porta'];
            var projeto = result[0]['projeto'];
            var equipamento_equipe = result[0]['equipe'];
            $("input[name=nome_equipamento]").val(nome);
            $("input[name=senha_equipamento]").val(id_senha);
            $("input[name=senha_equipamento2]").val(id_senha);
            $("input[name=descricao_equipamento]").val(descricao);
            $("input[name=endereco_equipamento]").val(endereco);
            $("input[name=ssid_equipamento]").val(ssid);
            $("input[name=ssidsenha_equipamento]").val(ssid_senha);
            $("input[name=porta]").val(porta);
            //Seleciona o equipe
            var combo = document.getElementById("cadequipad_projeto");
            for (var i = 0; i < combo.options.length; i++) {
                if (combo.options[i].value == projeto) {
                    combo.options[i].selected = "true";
                    break;
                }
            }            
            //Seleciona a equipe do equipamento
            var combo = document.getElementById("equipamento_equipe");
            for (var i = 0; i < combo.options.length; i++) {
                if (combo.options[i].value == equipamento_equipe) {
                    combo.options[i].selected = "true";
                    break;
                }
            }            

            //Mostra descrição do projeto 
            seleciona_projeto(projeto);

            //Troca o destino do botão salvar para para atualizar
            //document.getElementById("cadequipad_projeto").onclick("click_equipamentos_editar_salvar()");
        }
    });


}




function editar_equipe(id_equipe) {
    $.ajax({
        async: false,
        type: "POST",
        url: "services/getEquipeEditar.php",
        dataType: "json",
        data: {  
            codigo:id_equipe
        },
        error: function(result) {
            if( debug )
                alert('ERRO DO SISTEMA: ' + e.responseText);
        },
        success: function(result) {
            //alert(result);
            var nome = result[0]['nome'];
            var mediador = result[0]['mediador'];
            var limite_pessoas = result[0]['limite_pessoas'];
            //Mostrar formulário de cadastro de equipes
            click_equipes_cadastrar(2,mediador); 
            
            //Define o destino do botão salvar (que é Editar)
            document.getElementById('btn_salvar_equipe').setAttribute('onclick', 'click_equipes_cadastrar_salvar(2,'+id_equipe+')');


            //Atualiza os campos na tela
            $('#nome_equipe').val(nome);
            $('#limite_pessoas').val(limite_pessoas);


            //Seleciona o mediador
            var combo = document.getElementById("mediador");
            for (var i = 0; i < combo.options.length; i++) {
                if (combo.options[i].value == mediador) {
                    combo.options[i].selected = "true";
                    break;
                }
            }            
        }
    });
}



function editar_pessoa(id_pessoa) {
    $.ajax({
        async: false,
        type: "POST",
        url: "services/getPessoaEditar.php",
        dataType: "json",
        data: {  
            codigo:id_pessoa
        },
        error: function(result) {
            if( debug )
                alert('ERRO DO SISTEMA: ' + e.responseText);
        },
        success: function(result) {
            //alert(result);
            var nome = result[0]['nome'];
            var data_nascimento = result[0]['data_nascimento'];
            var instituicao = result[0]['instituicao'];
            var email = result[0]['email'];
            var time = result[0]['time']


            //Mostrar formulário de cadastro de equipes
            click_pessoas_cadastrar(2); 
            
            //Define o destino do botão salvar (que é Editar)
            document.getElementById('btn_salvar_pessoa').setAttribute('onclick', 'click_pessoas_cadastrar_salvar(2,'+id_pessoa+')');;

            //Senha não é obrigatório se ficar vazio
            $("input[name=pessoa_senha]").removeAttr('required');
            $("input[name=pessoa_senha2]").removeAttr('required');

            //Popula todos os campos da tela conforme item a ser editado
            $('#pessoa_nome').val(nome);
            
            datanasc=data_nascimento;
            datanasc=datanasc.split(" ");
            datanasc=datanasc[0];
            datanasc=datanasc.split("-");
            datanasc=datanasc[2]+"/"+datanasc[1]+"/"+datanasc[0];
            $('#pessoa_data_nascimento').val(datanasc);
            $('#pessoa_email').val(email);
            $('#pessoa_instituicao').val(instituicao);
            $('#pessoa_time').val(time);
            $('#pessoa_senha').val("");
            $('#pessoa_senha2').val("");



 
        }
    });


}



//Pesquisa Firmwares
function pesquisa_firmwares(id_pessoa) {
    alert("entrou");
    
}



function atualiza_equipamentos(){

    equipe_logada = $("#equipe_logada").val();
    //alert(equipe_logada);
    usuario_logado = $("#usuario_logado").val();

    var timestamp = new Date().getTime();
    if( !atualizando_equipamentos){
        atualizando_equipamentos = true;
        $.ajax({
            async: false,
            type: "POST",
            url: "services/getEquipamentos.php",
            dataType: "json",
            data: { 
                timestamp : timestamp,
                equipe_logada : equipe_logada,
                usuario_logado : usuario_logado
             },
            error: function(result) {

                    if( debug )
                            alert('ERRO DO SISTEMA: ' + e.responseText);

                    atualizando_equipamentos = false;	
            },
            success: function(result) {
                //alert(JSON.stringify(result));
                //alert(objLength(result)); //returns 4                         
                max=objLength(result);
                //alert(max);
                $('#tabela_equipamentos tbody').empty();
                var tabela = $('#tabela_equipamentos');
                for (var x=0; x <  max; x++ ){
                    //alert(result.length);


                    var tr = $("<tr class='lin'>");

                    //ID
                    var td = $("<td align='center'>");
                    td.html( result[x]['id_equipamento'] );
                    tr.append( td );

                    //Nome
                    var td = $("<td>");
                    td.html( result[x]['equipamento_nome'] );
                    tr.append( td );


                    //Descrição
                    var td = $("<td>");
                    td.html( result[x]['equipamento_descricao'] );
                    tr.append( td );


                    //SSID
                    var td = $("<td>");
                    td.html( result[x]['ssid'] );
                    tr.append( td );


                    //Projeto
                    var td = $("<td>");
                    td.html( result[x]['projeto_nome'] );
                    tr.append( td );                    

                    //Equipe
                    if ((usuario_logado=='1')||(usuario_logado=='-1')) {
                        var td = $("<td id='equipamento_equipe_coluna'>");
                        td.html( "("+result[x]['equipe']+") "+result[x]['equipe_nome'] );
                        tr.append( td );                    
                    }

                    //Editar
                    var td = $("<td align='right' width='90px'>");
                    var link5 = $("<a>", {class:"btn_operacao", id_equipamento:result[x]['id_equipamento'] }  );
                    link5.html("Editar");
                    link5.click( function(){ editar_equipamento( this.attributes['id_equipamento'].value ); }  );
                    td.append( link5);
                    tr.append( td );                    

                    //Excluir
                    var td = $("<td align='right' width='90px'>");
                    var link5 = $("<a>", {class:"btn_operacao", id_equipamento:result[x]['id_equipamento'] }  );
                    link5.html("Excluir");
                    link5.click( function(){ excluir_equipamento( this.attributes['id_equipamento'].value ); }  );
                    td.append( link5);
                    tr.append( td );


                    tabela.append( tr );
                }
                atualizando_equipamentos = false;
            }
        });
    } else {
        //echo "teste";
    }// fim atualizando_equipamentos


		
} //fim atualiza_equipamentos




function atualiza_equipes(){

    var timestamp = new Date().getTime();
    if( !atualizando_equipes){
        atualizando_equipes = true;
        $.ajax({
            async: false,
            type: "POST",
            url: "services/getEquipes.php",
            dataType: "json",
            data: { timestamp : timestamp },
            error: function(result) {
                if( debug )
                    alert('ERRO DO SISTEMA: ' + e.responseText);
                atualizando_equipes = false;   
            },
            success: function(result) {
                //alert(result);
                max=objLength(result);
                $('#tabela_equipes tbody').empty();
                var tabela = $('#tabela_equipes');
                for (var x=0; x <  max; x++ ){
                    var tr = $("<tr class='lin'>");

                    //ID
                    var td = $("<td align='center'>");
                    td.html( result[x]['id_equipe'] );
                    tr.append( td );

                    //Nome
                    var td = $("<td>");
                    td.html( result[x]['equipe_nome'] );
                    tr.append( td );


                    //Mediador
                    var td = $("<td>");
                    td.html( result[x]['mediador_nome'] );
                    tr.append( td );

                    //Limite
                    var td = $("<td >");
                    td.html( result[x]['limite_pessoas'] );
                    tr.append( td );

                    //Editar
                    var td = $("<td align='right' width='90px'>");
                    var link5 = $("<a>", {class:"btn_operacao", id_equipe:result[x]['id_equipe'] }  );
                    link5.html("Editar");
                    link5.click( function(){ editar_equipe( this.attributes['id_equipe'].value ); }  );
                    td.append( link5);
                    tr.append( td );                    

                    //Excluir
                    var td = $("<td align='right' width='90px'>");
                    var link5 = $("<a>", {class:"btn_operacao", id_equipe:result[x]['id_equipe'] }  );
                    link5.html("Excluir");
                    link5.click( function(){ excluir_equipe( this.attributes['id_equipe'].value ); }  );
                    td.append( link5);
                    tr.append( td );


                    tabela.append( tr );
                }
                atualizando_equipe = false;
            }
        });
    } else {
        //echo "teste";
    }


        
} //fim atualiza_equipamentos


function logout_pessoa( id_pessoa ){
	
	var timestamp = new Date().getTime();
	
	$.ajax({
		async: false,
		type: "POST",
		url: "services/logoutPessoa.php",
		dataType: "json",
		data: { timestamp : timestamp, id_pessoa:id_pessoa },
		error: function(result) {
			
			if( debug )
				alert('ERRO DO SISTEMA: ' + e.responseText);
	
		},
		success: function(result) {
			
			atualiza_logados();
		}
	});
}


function bloqueia_pessoa( id_pessoa ){
    var timestamp = new Date().getTime();
}


function executa_pessoa( id_pessoa, id_modulo ){
    var timestamp = new Date().getTime();
    //Verifica qual é o equipamento padrão do usuário logado
    $.ajax({
        async: false,
        type: "POST",
        url: "services/getPessoa.php",
        dataType: "json",
        data: { id_pessoa: id_pessoa },
        error: function(result2) {
            if( debug )
                alert('ERRO DO SISTEMA: ' + e.responseText);
        },
        success: function(result3) {
            //alert(result2);
            equipamento_padrao=result3[0]['equipamento_padrao'];
            //Se o modelo for G2 então executa o interpretador phyton, senão grava na tabela para a arduino ler
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
                        modelo=result[y]['modelo'];
                    }

                    if (modelo==1) {
                        //Executa interpretador phyton
                        $.ajax({
                            async: false,
                            type: "POST",
                            url: "services/executaPessoa.php",
                            dataType: "json",
                            data: { timestamp : timestamp, id_pessoa:id_pessoa, id_modulo: id_modulo},
                            error: function(result) {
                                if( debug )
                                    alert('ERRO DO SISTEMA: ' + e.responseText);
                            },
                            success: function(result) {
                                alert( result );
                            }
                         });
                     } else {
                        //alert("Apenas troca o comando para executar no equpamento!");
                        $.ajax({
                            async: false,
                            type: "POST",
                            url: "services/setEquipamentosExecutaTroca.php",
                            dataType: "json",
                            data: { 
                                timestamp : timestamp, 
                                id_pessoa:id_pessoa, 
                                id_modulo: id_modulo, 
                                executar:'1'
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
                }
            }); 
        }
    });            
}

function converte_data(valor){
    split = valor.split(' ');
    data = split[0];
    hora = split[1];
    data=data.split('-');
    data=data[2]+"/"+data[1]+"/"+data[0];
    return data;
}

function click_cadastrados () {
    $("#logados").hide();
    $("#configuracoes").hide();
    $("#equipamentos").hide();
    $("#equipamentos_cad").hide();
    $("#equipes_cad").hide();    
    $("#pessoas_cad").hide();       
    $("#cadastrados_equipamento_padrao").hide();
    $("#equipes").hide();

    $("#cadastrados").show();
    $("#cadastrados").fadeIn(200);
    classe = document.getElementById('btn_cadastrados').className; 
    document.getElementById('btn_equipes').className = 'label_button link ';        
    document.getElementById('btn_cadastrados').className = 'label_button link negrito';
    document.getElementById('btn_logados').className = 'label_button link';
    document.getElementById('btn_configuracoes').className = 'label_button link';
    document.getElementById('btn_equipamentos').className = 'label_button link';
    $("#btn_cad_pessoas").focus();
}

function click_logados (){
    $("#cadastrados").hide();
    $("#equipamentos").hide();
    $("#configuracoes").hide();
    $("#equipamentos_cad").hide();
    $("#pessoas_cad").hide(); 
    $("#equipes_cad").hide();    
    $("#cadastrados_equipamento_padrao").hide();
    $("#equipes").hide();
    $("#logados").show();
    $("#logados").fadeIn(200);
    classe = document.getElementById('btn_cadastrados').className; 
    document.getElementById('btn_equipes').className = 'label_button link ';        
    document.getElementById('btn_cadastrados').className = 'label_button link ';
    document.getElementById('btn_equipamentos').className = 'label_button link ';
    document.getElementById('btn_configuracoes').className = 'label_button link ';
    document.getElementById('btn_logados').className = 'label_button link negrito';
}

function click_equipamentos () {
    $("#logados").hide();
    $("#cadastrados").hide();
    $("#configuracoes").hide();
    $("#equipamentos_cad").hide();
    $("#pessoas_cad").hide(); 
    $("#equipes_cad").hide();    
    $("#cadastrados_equipamento_padrao").hide();
    $("#equipes").hide();
    $("#equipamentos").show();
    $("#equipamentos").fadeIn(200);
    classe = document.getElementById('btn_cadastrados').className; 
    document.getElementById('btn_equipes').className = 'label_button link ';    
    document.getElementById('btn_equipamentos').className = 'label_button link negrito';
    document.getElementById('btn_logados').className = 'label_button link';
    document.getElementById('btn_configuracoes').className = 'label_button link';
    document.getElementById('btn_cadastrados').className = 'label_button link'; 
    $("#btn_cad_equipamentos").focus();
}


function click_equipes () {
    $("#logados").hide();
    $("#cadastrados").hide();
    $("#configuracoes").hide();
    $("#equipamentos_cad").hide();
    $("#equipes_cad").hide();    
    $("#pessoas_cad").hide(); 
    $("#cadastrados_equipamento_padrao").hide();
    $("#equipamentos").hide();
    $("#equipes").show();
    $("#equipes").fadeIn(200);
    classe = document.getElementById('btn_cadastrados').className; 
    document.getElementById('btn_equipes').className = 'label_button link negrito';
    document.getElementById('btn_equipamentos').className = 'label_button link';    
    document.getElementById('btn_logados').className = 'label_button link';
    document.getElementById('btn_configuracoes').className = 'label_button link';
    document.getElementById('btn_cadastrados').className = 'label_button link'; 
    $("#btn_cad_equipes").focus();
}



function click_configuracoes () {
    $("#logados").hide();
    $("#cadastrados").hide();
    $("#equipamentos_cad").hide();
    $("#equipes_cad").hide(); 
    $("#equipes").hide();   
    $("#equipamentos").hide();
    $("#pessoas_cad").hide();     
    $("#cadastrados_equipamento_padrao").hide();
    $("#configuracoes").show();
    $("#configuracoes").fadeIn(200);
    classe = document.getElementById('btn_cadastrados').className; 
    document.getElementById('btn_equipes').className = 'label_button link ';    
    document.getElementById('btn_equipamentos').className = 'label_button link ';
    document.getElementById('btn_logados').className = 'label_button link';
    document.getElementById('btn_configuracoes').className = 'label_button link negrito';
    document.getElementById('btn_cadastrados').className = 'label_button link';  
    
    //Popular os campos com as configurações do banco de dados
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
                passo1=result[y]['passo1'];
                versao=result[y]['versao'];
                hostcamera=result[y]['hostcamera'];
                usacamera=result[y]['usacamera'];
                lingua_fala=result[y]['lingua_fala'];
            }
            selecionar("modelo",modelo);
            selecionar("tipomedida",tipomedida);
            selecionar("lingua_fala",lingua_fala);
            $("#host").val(servidor);          
            $("#10").val(calibragem10);          
            $("#45").val(calibragem45);          
            $("#90").val(calibragem90);          
            $("#180").val(calibragem180);          
            $("#360").val(calibragem360);
            $("#passo1").val(passo1);            
            $("#hostcamera").val(hostcamera);          
            $("#versao").val(versao);       
            //alert(usacamera);
            selecionar("ativarcamera",usacamera);
        }
    }); 
}


function click_equipamentos_cadastrar () {

    //Habilita botão salvar
    document.getElementById('btn_gerar_firmware').disabled=true;
    document.getElementById('btn_salvar_equipamento').disabled=false;


    //Limpa todo os campos do formulário
    $("input[name=nome_equipamento]").val("");
    $("input[name=senha_equipamento]").val("");
    $("input[name=senha_equipamento2]").val("");
    $("input[name=descricao_equipamento]").val("");
    $("input[name=endereco_equipamento]").val("");
    $("input[name=ssid_equipamento]").val("");
    $("input[name=ssidsenha_equipamento]").val("");
    $("input[name=servidor]").val("");
    $("input[name=porta]").val("80");

    //Define o destino do botão salvar
    document.getElementById('btn_salvar_equipamento').setAttribute('onclick', 'click_equipamentos_cadastrar_salvar(1)');

    //Trata o menu
    $("#logados").hide();
    $("#cadastrados").hide();
    $("#configuracoes").hide();
    $("#equipamentos").hide();
    $("#cadastrados_equipamento_padrao").hide();
    $("#equipes").hide();
    $("#equipes_cad").hide();
    $("#pessoas_cad").hide();     
    $("#equipamentos_cad").show();
    $("#equipamentos_cad").fadeIn(200);
    classe = document.getElementById('btn_cadastrados').className; 
    document.getElementById('btn_equipamentos').className = 'label_button link negrito';
    document.getElementById('btn_logados').className = 'label_button link';
    document.getElementById('btn_configuracoes').className = 'label_button link';
    document.getElementById('btn_cadastrados').className = 'label_button link'; 
    
    //Popula projetos 
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
                servidor=result[y]['servidor'];
            }
            $("#servidor").val(servidor);
            
            $.ajax({
                async: false,
                type: "POST",
                url: "services/getProjetos.php",
                dataType: "json",
                data: {  },
                error: function(result2) {
                    if( debug )
                        alert('ERRO DO SISTEMA: ' + e.responseText);
                },
                success: function(result2) {
                    var options="<option value='0'>Selecione</option>";
                    for(var y=0; y <  result2.length; y++ ){
                        id_projeto=result2[y]['id_projeto'];
                        nome=result2[y]['nome'];
                        options=options+"<option  value='"+id_projeto+"'>"+nome+" </option>";
                    }
                    $("select[name=cadequipad_projeto]").html(options);           
                }
            });  
            
            
            //Popula equipamento_equipe
            $.ajax({
                async: false,
                type: "POST",
                url: "services/getEquipes.php",
                dataType: "json",
                data: {  },
                error: function(result2) {
                    if( debug )
                        alert('ERRO DO SISTEMA: ' + e.responseText);
                },
                success: function(result2) {
                    var options="<option value='0'>Selecione</option>";
                    for(var y=0; y <  result2.length; y++ ){
                        id_equipe=result2[y]['id_equipe'];
                        nome=result2[y]['equipe_nome'];
                        options=options+"<option  value='"+id_equipe+"'>"+nome+" </option>";
                    }
                    $("select[name=equipamento_equipe]").html(options);           
                }
            });
        }
    });
    
    
    
}


function click_pessoas_cadastrar (operacao) {

    $("#data_nascimento").mask("99/99/9999",{placeholder:"_"});


    //Limpa todo os campos do formulário
    $("input[name=pessoa_nome]").val("");
    $("input[name=pessoa_data_nascimento]").val("");
    $("input[name=pessoa_email]").val("");
    $("input[name=pessoa_instituicao]").val("");
    $("input[name=pessoa_time]").val("");
    $("input[name=pessoa_senha]").val("");
    $("input[name=pessoa_senha2]").val("");
   

    //Define o destino do botão salvar
    document.getElementById('btn_salvar_pessoa').setAttribute('onclick', 'click_pessoas_cadastrar_salvar(1)');

    //QUando é cadastro a senha é obrigatória
    $("input[name=pessoa_senha]").attr("required","required");
    $("input[name=pessoa_senha2]").attr("required","required");

    //Trata o menu
    $("#logados").hide();
    $("#cadastrados").hide();
    $("#configuracoes").hide();
    $("#equipamentos").hide();
    $("#cadastrados_equipamento_padrao").hide();
    $("#equipes").hide(); 
    $("#equipes_cad").hide();
    $("#pessoas_cad").show();
    $("#pessoas_cad").fadeIn(200);
    classe = document.getElementById('btn_cadastrados').className; 
    document.getElementById('btn_cadastrados').className = 'label_button link negrito';   
    document.getElementById('btn_equipes').className = 'label_button link';    
    document.getElementById('btn_equipamentos').className = 'label_button link ';
    document.getElementById('btn_logados').className = 'label_button link';
    document.getElementById('btn_configuracoes').className = 'label_button link';
    //document.getElementById('pessoas_senha').removeAttribute("required");
    //document.getElementById('pessoas_senha').required = true;
    //$('#pessoas_senha').removeAttribute("required");


}

function click_equipes_cadastrar (operacao,mediador) {

    //Limpa todo os campos do formulário
    $("input[name=nome_equipe]").val("");
    $("select[name=mediador]").val("");
    $("input[name=limite_pessoas]").val("");

    //Define o destino do botão salvar
    document.getElementById('btn_salvar_equipe').setAttribute('onclick', 'click_equipes_cadastrar_salvar(1)');

    //Trata o menu
    $("#logados").hide();
    $("#cadastrados").hide();
    $("#configuracoes").hide();
    $("#equipamentos").hide();
    $("#cadastrados_equipamento_padrao").hide();
    $("#equipes").hide(); 
    $("#pessoas_cad").hide(); 
    $("#equipes_cad").show();
    $("#equipes_cad").fadeIn(200);
    classe = document.getElementById('btn_cadastrados').className; 
    document.getElementById('btn_equipes').className = 'label_button link negrito';    
    document.getElementById('btn_equipamentos').className = 'label_button link ';
    document.getElementById('btn_logados').className = 'label_button link';
    document.getElementById('btn_configuracoes').className = 'label_button link';
    document.getElementById('btn_cadastrados').className = 'label_button link'; 
    

    //Popula coptions do campo Mediador
    $.ajax({
        async: false,
        type: "POST",
        url: "services/getMediadores.php",
        dataType: "json",
        data: {  
            mediador : mediador,
            operacao : operacao
        },
        error: function(result2) {
            if( debug )
                alert('ERRO DO SISTEMA: ' + e.responseText);
        },
        success: function(result2) {
            //alert(result2);
            //alert(operacao);
            var options="<option value='0'>Selecione</option>";
            for(var y=0; y <  result2.length; y++ ){
                id_projeto=result2[y]['id_pessoa'];
                nome=result2[y]['pessoa_nome'];
                options=options+"<option  value='"+id_projeto+"'>"+nome+" </option>";
            }
            $("select[name=mediador]").html(options);           
        }
    });     

}






function seleciona_projeto(valor) {
    //alert(valor);

    
    //alert("Projeto Selecionado"+valor);
    $.ajax({
        async: false,
        type: "POST",
        url: "services/getProjetosDescricao.php",
        dataType: "json",
        data: { id_projeto: valor },
        error: function(result2) {
            if( debug )
                alert('ERRO DO SISTEMA: ' + e.responseText);
        },
        success: function(result3) {
            //alert(result3);
            descricao=result3[0]['descricao'];
            link=result3[0]['link'];

            //Popula a descrição do projeto
            $("#span_descricao_projeto").text(descricao);
            
            //Popula o link do projeto
            document.getElementById('link_projeto').setAttribute('href', "http://"+link);
            $("#span_link_projeto").text("http://"+link);
            
        }
    }); 
}

//Equipamento Padrão tela de cadastro
function click_equipamentos_padrao_alterar (id_pessoa) {
    //Trata o menu 
    $("#logados").hide();
    $("#cadastrados").hide();
    $("#configuracoes").hide();
    $("#equipamentos").hide();
    $("#equipamentos_cad").hide();
    $("#pessoas_cad").hide(); 
    $("#equipes").hide();
    $("#cadastrados_equipamento_padrao").show();
    $("#cadastrados_equipamento_padrao").fadeIn(200);
    classe = document.getElementById('btn_cadastrados').className; 
    document.getElementById('btn_equipamentos').className = 'label_button link ';
    document.getElementById('btn_logados').className = 'label_button link';
    document.getElementById('btn_configuracoes').className = 'label_button link';
    document.getElementById('btn_cadastrados').className = 'label_button link negrito'; 
    
    
    //Carrega id e nome da pessoa 
    //alert(id_pessoa);
    $.ajax({
        async: false,
        type: "POST",
        url: "services/getPessoa.php",
        dataType: "json",
        data: { id_pessoa: id_pessoa },
        error: function(result2) {
            if( debug )
                alert('ERRO DO SISTEMA: ' + e.responseText);
        },
        success: function(result3) {
            //alert(result2);
            nome=result3[0]['nome'];
            $("#cadequipad_id_pessoa").val(id_pessoa);
            $("#cadequipad_pessoa_nome").val(nome);
        }
    });  
    
    
    //Carrega equipamentos na tela conforme Equipamento Padrão
    equipe_logada = $("#equipe_logada").val();
    usuario_logado = $("#usuario_logado").val();
    //alert(equipe_logada+"/"+usuario_logado);
    $.ajax({
        async: false,
        type: "POST",
        url: "services/getEquipamentos.php",
        dataType: "json",
        data: { 
            usuario_logado : usuario_logado,
            equipe_logada : equipe_logada
         },
        error: function(result2) {
            if( debug )
                alert('ERRO DO SISTEMA: ' + e.responseText);
        },
        success: function(result2) {
            //alert(result2);
            var options="<option value=''>Nenhum</option>";
            for(var y=0; y <  result2.length; y++ ){
                equip_id=result2[y]['id_equipamento'];
                equip_nome=result2[y]['equipamento_nome'];
                options=options+"<option  value='"+equip_id+"'>"+equip_nome+" </option>";
            }
            $("select[name=cadequipad_equipamento]").html(options);           
        }
    });  
    
    
    //Popula o equipamento caso já tenha um definido como padrão
        $.ajax({
        async: false,
        type: "POST",
        url: "services/getPessoa.php",
        dataType: "json",
        data: { id_pessoa: id_pessoa },
        error: function(result2) {
            if( debug )
                alert('ERRO DO SISTEMA: ' + e.responseText);
        },
        success: function(result3) {
            //alert(result2);
            equipamentopadrao=result3[0]['equipamento_padrao'];
            selecionar("cadequipad_equipamento",equipamentopadrao);
        }
    }); 
    
    
    
}

function click_equipamentos_padrao_cancelar () {
    //alert("Cancelar Registro do Equipamento");
    click_cadastrados();
}



function click_equipamentos_cadastrar_salvar (operacao,equipamento_codigo) {
    //alert("Salvar equipamento");
    var timestamp = new Date().getTime();
    nome=$("#nome_equipamento").val();
    senha_equipamento=$("#senha_equipamento").val();
    senha_equipamento2=$("#senha_equipamento2").val();
    descricao=$("#descricao_equipamento").val();
    endereco=$("#endereco_equipamento").val();
    ssid=$("#ssid_equipamento").val();
    senha_ssid=$("#ssidsenha_equipamento").val();
    servidor=$("#servidor").val();
    porta=$("#porta").val();
    projeto=$("#cadequipad_projeto").val();
    equipe_logada=$("#equipe_logada").val();
    equipamento_equipe=$("#equipamento_equipe").val();


    //Obrigatoriedade: Nome do equipamento
    if (senha_equipamento=="") { 
        alert("É obrigatório o preenchimento do campo 'Nome (equipamento)'"); 
        $("#nome_equipamento").focus();
        return false;  
    }
    

    if (ssid=="") { 
        alert("É obrigatório o preenchimento do campo 'SSID (equipamento)'"); 
        $("#ssid_equipamento").focus();
        return false;  
    }


    if (senha_ssid=="") { 
        alert("É obrigatório o preenchimento do campo 'SSID Senha (equipamento)'"); 
        $("#ssidsenha_equipamento").focus();
        return false;  
    }

    
    //Obrigatoriedade: Senha do equipamento
    if (senha_equipamento=="") { 
        alert("É obrigatório o preenchimento do campo 'Senha (equipamento)'"); 
        $("#senha_equipamento").focus();
        return false;  
    }
    
    
    //Obrigatoriedade: Senha do equipamento
    if (senha_equipamento2=="") { 
        alert("É obrigatório o preenchimento do campo 'Repita a senha'"); 
        $("#senha_equipamento2").focus();
        return false;  
    }

    //Obrigatoriedade: Projeto
    if (projeto=="0") {
        alert("É obrigatório o preenchimento do campo 'Projetos'");
        $("#cadequipad_projeto").focus();
        return false;
    } 

    
    //Verifica se as senhas digitada e redigitada batem
    if (senha_equipamento!=senha_equipamento2) {
        alert("A senha digitada para o equpamento não bateu com a senha re-digitada! Digite novamente a senha!");
        $("#senha_equipamento").val("");
        $("#senha_equipamento2").val("");    
        $("#senha_equipamento").focus();
        return false;
    } 
    
    
    if (operacao==1) { //É um cadastro novo
        $.ajax({
            async: false,
            type: "POST",
            url: "services/setEquipamento.php",
            dataType: "json",
            data: { 
                timestamp : timestamp, 
                nome:nome, 
                senha_equipamento: senha_equipamento ,
                descricao: descricao ,
                endereco: endereco ,
                ssid: ssid ,
                senha_ssid: senha_ssid ,
                servidor: servidor ,
                porta : porta , 
                projeto : projeto,
                equipamento_equipe : equipamento_equipe,
                equipe_logada : equipe_logada
            },
            error: function(result) {
                if( debug )
                    alert('ERRO DO SISTEMA: ' + e.responseText);
            },
            success: function(result) {
                //alert(result);
                
                //Limpa campos do formulário
                alert("Equipamento cadastrado com sucesso!");

 
                //click_equipamentos();
            }
        }); 
    } else if (operacao==2) { //É uma edição 
        $.ajax({
            async: false,
            type: "POST",
            url: "services/updateEquipamento.php",
            dataType: "json",
            data: { 
                "codigo" : equipamento_codigo,
                "timestamp" : timestamp, 
                "nome" : nome, 
                "senha_equipamento" : senha_equipamento ,
                "descricao" : descricao ,
                "endereco" : endereco ,
                "ssid" : ssid ,
                "senha_ssid" : senha_ssid ,
                "servidor" : servidor ,
                "porta" : porta , 
                "equipamento_equipe" : equipamento_equipe , 
                "equipe_logada" : equipe_logada , 
                "projeto" : projeto
            },
            error: function(result) {
                if( debug )
                    alert('ERRO DO SISTEMA: ' + e.responseText);
            },
            success: function(result) {
                //alert(result);
                alert("Equipamento alterado com sucesso!");
            }
        });

    } else {
        alert("Erro! Operação desconhecida");
    }
     
    document.getElementById('btn_gerar_firmware').disabled=false;
    document.getElementById('btn_salvar_equipamento').disabled=true;
    $("#btn_gerar_firmware").focus();

    
    //Atualiza listagem de equipamentos 
    $("#paginainicial").val("equipamentos");;
    atualizando_equipamentos=false;
    atualiza_equipamentos();


    $("#btn_gerar_firmware").enabled=true;   
    document.getElementById('cadequipad_projeto').disabled=false;  
}


function click_equipamentos_padrao_salvar () {
    //alert("Salvar equipamento");
    var timestamp = new Date().getTime();
    equipamento=$("#cadequipad_equipamento").val();
    id_pessoa=$("#cadequipad_id_pessoa").val();
    //alert(equipamento+"/"+id_pessoa);
    

    //Atualiza equipamento padrão da pessoa
    $.ajax({
        async: false,
        type: "POST",
        url: "services/updateEquipamentoPadrao.php",
        dataType: "json",
        data: { 
            timestamp : timestamp, 
            id_pessoa: id_pessoa,
            equipamento: equipamento
        },
        error: function(result) {
            if( debug )
                alert('ERRO DO SISTEMA: ' + e.responseText);
        },
        success: function(result) {
            //alert(result);
            alert("Equipamento Padrão alterado com sucesso!");
            atualiza_cadastrados();
            click_cadastrados();

        }
    });           
}


function click_equipes_cadastrar_salvar (operacao,equipe_codigo) {
    //alert("Salvar equipamento");
    var timestamp = new Date().getTime();
    nome=$("#nome_equipe").val();
    mediador=$("#mediador").val();
    limite_pessoas=$("#limite_pessoas").val();


    //Obrigatoriedade: Nome do equipamento
    if (nome=="") { 
        alert("É obrigatório o preenchimento do campo 'Nome (Equipe)'"); 
        $("#nome_equipe").focus();
        return false;  
    } 

    //Obrigatoriedade: mediador
    if (mediador=="0") {
        alert("É obrigatório o preenchimento do campo 'Mediador'");
        $("#mediador").focus();
        return false;
    } 
    

    //Obrigatoriedade: Limite Pessoas
    if (limite_pessoas=="") {
        alert("É obrigatório o preenchimento do campo 'Limite de Pessoas'");
        $("#limite_pessoas").focus();
        return false;
    } 

    if (operacao==1) { //É um cadastro novo
        $.ajax({
            async: false,
            type: "POST",
            url: "services/setEquipe.php",
            dataType: "json",
            data: { 
                nome:nome, 
                mediador : mediador,
                limite_pessoas: limite_pessoas
            },
            error: function(result) {
                if( debug )
                    alert('ERRO DO SISTEMA: ' + e.responseText);
            },
            success: function(result) {
                //alert(result);
                
                //Limpa campos do formulário
                alert("Equipe cadastrado com sucesso!");
            }
        }); 
    } else if (operacao==2) { //É uma edição 
        //alert(equipe_codigo);       

        $.ajax({
            async: false,
            type: "POST",
            url: "services/updateEquipe.php",
            dataType: "json",
            data: {  
                "equipe_codigo" : equipe_codigo,
                "nome" : nome, 
                "mediador" : mediador,
                "limite_pessoas" : limite_pessoas
            },
            error: function(result) {
                if( debug )
                    alert('ERRO DO SISTEMA: ' + e.responseText);
            },
            success: function(result) {
                //alert(result);
                alert("Equipe alterado com sucesso!");
            }
        });

    } else {
        alert("Erro! Operação desconhecida");
    }
     

    //Atualiza listagem de equipes 
    $("#paginainicial").val("equipes");;
    atualizando_equipes=false;
    atualiza_equipes();
    click_equipes();

    document.getElementById('mediador').disabled=false;
    
}



function click_pessoas_cadastrar_salvar (operacao,pessoa_codigo) {
    //alert("Salvar equipamento");
    var timestamp = new Date().getTime();
    nome=$("#pessoa_nome").val();
    pessoa_nome=$("#pessoa_nome").val();

    data_nascimento=$("#pessoa_data_nascimento").val();
    email=$("#pessoa_email").val();
    instituicao=$("#pessoa_instituicao").val();
    time=$("#pessoa_time").val();
    senha=$("#pessoa_senha").val();
    senha2=$("#pessoa_senha2").val();
    equipe_logada=$("#equipe_logada").val();
    usuario_logado=$("#usuario_logado").val();


    //Obrigatoriedade: Nome do equipamento
    if (nome=="") { 
        alert("É obrigatório o preenchimento do campo 'Nome (Pessoa)'"); 
        $("#nome_pessoa").focus();
        return false;  
    } 

  
    //Obrigatoriedade: Nome do equipamento
    if (data_nascimento=="") { 
        alert("É obrigatório o preenchimento do campo 'Data de Nascimento'"); 
        $("#nome_data_nascimento").focus();
        return false;  
    } 

    //Valida Senha
    if ((senha!="")||(senha2!="")) { 
        if (senha==senha2) {
            trocasenha=1;
        } else {
            trocasenha=0;
            alert("As senhas não conferem! Favor digitar novamente. OBS: Se não quer alterar a senha atual, deixe em branco os 2 campos de senha.'"); 
            $("#pessoa_senha").val("");
            $("#pessoa_senha2").val("");
            $("#pessoa_senha").focus();
            return false;  
        }
    } else {
        trocasenha=0;
    }

    //Só faz a validação de limite de pessoas se não for admin
    if ((usuario_logado!='1')&&(usuario_logado!='-1')) { 


        //Verifica o limite de cadastro que o mediador pode fazer
        var parar=0;
        $.ajax({
            async: false,
            type: "POST",
            url: "services/getLimiteCadastros.php",
            dataType: "json",
            data: { 
                equipe_logada : equipe_logada
            },
            error: function(result) {
                if( debug ) alert('ERRO DO SISTEMA: ' + e.responseText);
            },
            success: function(result) {
                //alert(result);
                limite = result[0]['limite_pessoas'];


                $.ajax({
                    async: false,
                    type: "POST",
                    url: "services/getTotalPessoasEquipe.php",
                    dataType: "json",
                    data: { 
                        equipe_logada : equipe_logada
                    },
                    error: function(result2) {
                        if( debug ) alert('ERRO DO SISTEMA: ' + e.responseText);
                    },
                    success: function(result2) {
                        totalpessoas = result2[0]['totalpessoas']-1; //deve sempre desconsiderar o mediador
                        //alert("Total pessoas: " + totalpessoas+ " Total Limite: " + limite);

                        if ((totalpessoas>=limite)&&(operacao==1)) {
                            alert("Você atingiu o limite de cadastros! Para obter mais entre em contato com um administrador (eloirjr@gmail.com)");
                            parar=1;
                        }
                    }
                });

            }
        }); 
        if (parar==1) return false;
    }
    if (operacao==1) { //É um cadastro novo
        $.ajax({
            async: false,
            type: "POST",
            url: "services/setPessoa.php",
            dataType: "json",
            data: { 
                nome : nome, 
                data_nascimento: data_nascimento,
                email: email,
                instituicao : instituicao,
                time : time,
                senha : senha,
                equipe_logada : equipe_logada
            },
            error: function(result) {
                if( debug )
                    alert('ERRO DO SISTEMA: ' + e.responseText);
            },
            success: function(result) {
                //alert(result);
                
                //Limpa campos do formulário
                alert("Usuário cadastrada com sucesso!");
            }
        }); 
    } else if (operacao==2) { //É uma edição 
        //alert(equipe_codigo);       

        $.ajax({
            async: false,
            type: "POST",
            url: "services/updatePessoa.php",
            dataType: "json",
            data: {  
                "pessoa_codigo" : pessoa_codigo,
                "nome" : pessoa_nome,
                "data_nascimento": data_nascimento,
                "email": email,
                "instituicao" : instituicao, 
                "time" : time,
                "senha" : senha,
                "trocasenha" : trocasenha,
                "equipe_logada" : equipe_logada
            },
            error: function(result) {
                if( debug )
                    alert('ERRO DO SISTEMA: ' + e.responseText);
            },
            success: function(result) {
                //alert(result);
                alert("Usuário ALTERADO com sucesso!");
            }
        });

    } else {
        alert("Erro! Operação desconhecida");
    }
     

    //Atualiza listagem de equipes 
    $("#paginainicial").val("pessoas");;
    atualizando_pessoas=false;
    atualiza_cadastrados();
    click_cadastrados();

    document.getElementById('mediador').disabled=false;
    
}



function click_configuracoes_salvar () {
    //alert("Salvar equipamento");
    var timestamp = new Date().getTime();
    modelo=$("#modelo").val();
    tipomedida=$("#tipomedida").val();
    host=$("#host").val();
    calibragem10=$("#10").val();
    calibragem45=$("#45").val();
    calibragem90=$("#90").val();
    calibragem180=$("#180").val();
    calibragem360=$("#360").val();
    passo1=$("#passo1").val();
    hostcamera=$("#hostcamera").val();
    usacamera=$("#ativarcamera").val();
    lingua_fala=$("#lingua_fala").val();
    
    //Servidor
    //alert(servidor);
    if (servidor=="") { 
        alert("É obrigatório o preenchimento do campo 'Servidor (hostname/ip)'"); 
        $("#host").focus();
        return false;  
    }
    
    //Calibragem10
    if (calibragem10=="") { 
        alert("É obrigatório o preenchimento do campo 'Calibragem 10º'"); 
        $("#10").focus();
        return false;  
    }
    
    //Calibragem45
    if (calibragem45=="") { 
        alert("É obrigatório o preenchimento do campo 'Calibragem 45º'"); 
        $("#45").focus();
        return false;  
    }
    
    //Calibragem90
    if (calibragem90=="") { 
        alert("É obrigatório o preenchimento do campo 'Calibragem 90º'"); 
        $("#90").focus();
        return false;  
    }
    
    //Calibragem180
    if (calibragem180=="") { 
        alert("É obrigatório o preenchimento do campo 'Calibragem 180º'"); 
        $("#180").focus();
        return false;  
    }
    
    //Calibragem360
    if (calibragem360=="") { 
        alert("É obrigatório o preenchimento do campo 'Calibragem 360º'"); 
        $("#360").focus();
        return false;  
    }

    
    //1 Passo
    if (passo1=="") { 
        alert("É obrigatório o preenchimento do campo '1 Passo'"); 
        $("#passo1").focus();
        return false;  
    }

    //Atualiza dados de configuaração no banco
    $.ajax({
        async: false,
        type: "POST",
        url: "services/setConfiguracoes.php",
        dataType: "json",
        data: { 
            timestamp : timestamp, 
            modelo:modelo, 
            tipomedida: tipomedida ,
            servidor: host ,
            calibragem10: calibragem10 ,
            calibragem45: calibragem45 ,
            calibragem90: calibragem90 ,
            calibragem180: calibragem180 ,
            calibragem360: calibragem360, 
            passo1: passo1,
            usacamera: usacamera, 
            hostcamera: hostcamera ,
            lingua_fala: lingua_fala
        },
        error: function(result) {
            if( debug )
                alert('ERRO DO SISTEMA: ' + e.responseText);
        },
        success: function(result) {
            //alert(result);
            alert("Configurações alteradas com sucesso!");
            click_configuracoes();
        }
    });        
        
    //Atualiza página para que o sistema oculte ou mostre os campos conforme modelo definido
    window.location.reload();
    
}

function click_equipamentos_cadastrar_cancelar () {
    //alert("Cancelar Registro do Equipamento");
    click_equipamentos();
}


function click_pessoa_cadastrar_cancelar () {
    //alert("Cancelar Registro do Equipamento");
    click_cadastrados();
}

function click_equipe_cadastrar_cancelar () {
    click_equipes();
}
 
function mostra_senha(id_combo, id_input, id_span) {
    var objcombo = document.getElementById(id_combo);
    var objinput = document.getElementById(id_input);
    var objspan = document.getElementById(id_span);
    if (objcombo)
    {
        if (objinput)
        {
            if (objcombo.checked == 1)
            {
                if (objspan)
                {
                    objspan.innerHTML = "Senha Atual: <b>" + objinput.value + " </b>";
                }
            } else
            {
                if (objspan)
                {
                    objspan.innerHTML = "Mostrar Senha";
                }
            }
        } else
        {
            alert("Não existe o campo senha :" + id_input)
        }
    }
}



function pagina_inicial () {
    pagina=$("#paginainicial").val();
    if (pagina=="logados") {
        click_logados();
    }
    if (pagina=="cadastrados") {
        click_cadastrados()();
    }
    if (pagina=="equipamentos") {
        click_equipamentos();
    }
    if (pagina=="configuracoes") {
        click_configuracoes();
    }
    
}



function click_gerar_firmware () {
    id_projeto=$("#cadequipad_projeto").val();


    //Verifica se todos os dados foram preenchidos corretamente
    ssid_senha=$("#ssidsenha_equipamento").val();
    ssid_nome=$("#ssid_equipamento").val();
    nome_equipamento=$("#nome_equipamento").val();
    senha_equipamento=$("#senha_equipamento").val();
    hostname=$("#servidor").val();
    porta=$("#porta").val();


    if(nome_equipamento=="") {
        alert("Para gerar Firmware você deve preencher o campo: Nome do equipamento");
        return false;
    }
    if(senha_equipamento=="") {
        alert("Para gerar Firmware você deve preencher o campo: Senha do Equipamento");
        return false;
    }
    if(ssid_nome=="") {
        alert("Para gerar Firmware você deve preencher o campo: SSID Nome");
        return false;
    }
    if(ssid_senha=="") {
        alert("Para gerar Firmware você deve preencher o campo: SSID Senha");
        return false;
    }
    if(porta=="") {
        alert("Para gerar Firmware você deve preencher o campo: Porta");
        return false;
    }


    //Gera o firmware na tela
    $.ajax({
        async: false,
        type: "POST",
        url: "services/getProjetosFirmware.php",
        dataType: "json",
        data: {  id_projeto:id_projeto },
        error: function(result2) {
            if( debug )
                alert('ERRO DO SISTEMA: ' + e.responseText);
        },
        success: function(result3) {
            //alert(result3);
            for(var y=0; y <  result3.length; y++ ){
                conteudo=result3[y]['conteudo'];
            }
            //alert(conteudo);
            //Substituir as variáveis do firmare pelas informações descritas acima
            var conteudo2=conteudo;
            conteudo2 = conteudo2.replace("$nome_equipamento",nome_equipamento);
            conteudo2 = conteudo2.replace("$senha_equipamento",senha_equipamento);
            conteudo2 = conteudo2.replace("$porta",porta);
            conteudo2 = conteudo2.replace("$ssid",ssid_nome);
            conteudo2 = conteudo2.replace("$senha_ssid",ssid_senha);
            conteudo2 = conteudo2.replace("$hostname",hostname);
            $("#textarea_firmware_codigo").text(conteudo2);

                    
        }
    }); 

}


$(document).ready( function(){
	
	
	carrega_modulos();
    
    //Define qual será o item do menu default a ser mostrado quando carrega a pagina
    paginaini=$("#paginainicial").val();
    //alert(paginaini);
    pagina_inicial(paginaini);

    $("#data_nascimento").mask("99/99/9999",{placeholder:"_"});


    //Ao clicar no item do menu LOGADOS
	$("#btn_logados").click(function(e){
           click_logados();
	});
	
    //Ao clicar no item do menu CADASTRADOS
	$("#btn_cadastrados").click(function(e){
          click_cadastrados();
	});

    //Ao clicar no botão Cadastrar nova pessoa
    $("#btn_cad_pessoas").click(function(e){
        click_pessoas_cadastrar(1,"");
    }); 

    //Ao clicar no item do menu EQUIPAMENTOS
	$("#btn_equipamentos").click(function(e){
            click_equipamentos();
	});

        //Ao clicar no EQUIPAMENTOS CADASTRAR
	$("#btn_cad_equipamentos").click(function(e){
            click_equipamentos_cadastrar();
	});
    $("#btn_cad_equipes").click(function(e){
            click_equipes_cadastrar(1,"");
    });    

    //Ao clicar no item do menu EQUIPES
    $("#btn_equipes").click(function(e){
            click_equipes();
    });
       
        
    //Ao clicar no item do menu CONFIGURACOES
	$("#btn_configuracoes").click(function(e){
            click_configuracoes();
	});
        	
    //Carrega os itens das telas de listagens 
    atualiza_logados();
    atualiza_cadastrados();
	atualiza_equipamentos();
    atualiza_equipes();
    
	//Tempo para  a atualização das listagens  
	window.setInterval(atualiza_logados, 5000 );
	window.setInterval(atualiza_cadastrados, 5000 );
	window.setInterval(atualiza_equipamentos, 5000 );
    window.setInterval(atualiza_equipes, 5000 );

    //Camera    
    $("#hostcamera").watermark("IP ou URL", {className: 'field_watermark'});

    
    //Conforme o Modelo do servidor (Multiplos equipamentos ou apenas um) ocultar alguns itens do menu
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
                mode=result[y]['modelo'];
            }
            if (mode==1) { //ocultar
                $("#linha_equip_padrao_cab").hide();
                $("#menu_equipamento").hide();
                $("#menu_equipes").hide();                
                $("#logados_equipamento_cabecalho").hide();
            } else {
                $("#linha_equip_padrao_cab").show();                    
                $("#menu_equipamento").show();
                $("#menu_equipes").show();                
                $("#logados_equipamento_cabecalho").show();

            }        
        }
    });  

    //Ocultar alguns itens do menu conforme usuario logado
    usuario_logado=$("#usuario_logado").val(); 
    if ((usuario_logado==1)||(usuario_logado==-1)) {
        $("#menu_equipes").show();
        $("#menu_configuracoes").show();
        $("#equipamento_equipe_coluna").show();
        $("#equipamento_equipe_linha_cadastro").show();
    } else {
        $("#menu_equipes").hide();
        $("#menu_configuracoes").hide();  
        $("#equipamento_equipe_coluna").hide();
        $("#equipamento_equipe_linha_cadastro").hide();        
    }


    if (modelo==1) {
        $("#menu_equipes").hide();
    }

    id_usuario=$("#id_usuario").val();
    //alert(id_usuario);
    if (id_usuario=='-1') 
        $("#tr_modelo").show();
    else             
        $("#tr_modelo").hide();



        
});


function desconverte_conteudo_grauspassos (conteudo,c360,passo1,tipomedida) {
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
                cmd_valor=cmd_valor/passo1;
                cmd_valor=cmd_valor.toFixed(0);
            } else if ((cmd_comando=="pd")||(cmd_comando=="pe")) { // por grau
                cmd_valor=cmd_valor/porgrau;
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






