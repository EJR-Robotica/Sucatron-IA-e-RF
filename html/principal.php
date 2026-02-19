<?php
include_once 'header.php';
include_once 'include/database.php';
include_once 'include/sessao.php';

sess_start();
checa_sessao_usuario_logado();
$nome_pessoa = $SES_VAR['nome_pessoa'];
$id_usuario=$SES_VAR['id_pessoa'];
$id_modulo= $SES_VAR['id_modulo'];
$id_pessoa_tipo=$SES_VAR['id_pessoa_tipo'];
$usuario_logado=$id_usuario;


//Verifica qual é a equipe do usuario logado para popular um campo oculto que será usado como configuracoao para filtragem de varias telas
$stmt = $conn->prepare("select equipe from pessoa WHERE id_pessoa=$id_usuario");
$stmt->execute();
if( $stmt->rowCount() > 0 ){
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC, PDO::FETCH_ORI_NEXT)){
        $equipe_logada = $row['equipe'];
    }
}


//Desvia o tipo de usuario 3=usuario normal para a tela que representa o modulo que ele escolheu para trabalhar
if ($id_modulo !=-1) {
    header('Location: modulo' . $SES_VAR['id_modulo'] . '.php');
}

//if ($SES_VAR['id_pessoa_tipo'] == 3) {
  //  header('Location: modulo' . $SES_VAR['id_modulo'] . '.php');
//}



?>

<style>


    .btn_operacao {

        border: 1px solid #777;
        margin: 4px;
        padding:4px;
        text-align: center;
        color:#FFFFFF;
        width: 80px;
        cursor: pointer;
        text-align: center;
        background-color: #999;
        font-weight: bold;

    } 

    .btn_operacao:hover {
        color: #0000FF;	
    } 

    #overlay {
        position:fixed; 
        top:0;
        left:0;
        width:100%;
        height:100%;
        background:#000;
        opacity:0.5;
        filter:alpha(opacity=50);
    }

    #modal {
        position:absolute;
        background:url(imagens/tint20.png) 0 0 repeat;
        background:rgba(0,0,0,0.2);
        border-radius:14px;
        padding:8px;
    }

    #content {
        border-radius:8px;
        padding:20px;
        height: 100%;
    }

    #area_mostra_tudo {
        width: 100%;
        height: 80%;
    }


    .semaforo_verde {
        margin-left: 6px;
        margin-right: 6px;
        width: 70px;
        height: 30px;
        background-size: 69px 30px;
        background-position: center; 
        background-repeat: no-repeat;
        background-image: url("imagens/semaforo_verde.png");
    }

    .semaforo_amarelo {
        margin-left: 6px;
        margin-right: 6px;
        width: 70px;
        height: 30px;
        background-size: 69px 30px;
        background-position: center; 
        background-repeat: no-repeat;
        background-image: url("imagens/semaforo_amarelo.png");
    }

    .semaforo_vermelho {
        margin-left: 6px;
        margin-right: 6px;
        width: 70px;
        height: 30px;
        background-size: 69px 30px;
        background-position: center; 
        background-repeat: no-repeat;
        background-image: url("imagens/semaforo_vermelho.png");
    }

    .sair {
        color: red;
        font-weight: bold;
        font-size: x-small;
    }

</style>


<script type="text/javascript" src="js/valida_email.js"></script>
<script type="text/javascript" src="js/valida_data.js"></script>
<script type="text/javascript" src="js/valida_senha.js"></script>
<script type="text/javascript" src="js/modal.js"></script>
<script type="text/javascript" src="principal.js"></script>


<?php include "cabecalho.php"; ?>
<hr>
<?php include "menu.php"; ?>

<hr>


<div id="corpo">

    <div id="logados">


        <table id="tabela_logados" border="0" width="100%" class="tabela1" cellpadding="4">
            <thead>
                <tr class="tabelacabecalho1">
                    <th align="left" colspan="2">Pessoa</th>
                    <th align="left" >Equipe</th>
                    <th align="left" >Módulo</th>
                    <th  align="center" colspan="2">Código Programado</th>
                    <th align="left" width="150px" id="logados_equipamento_cabecalho"> Equipamento</th>
                    <th  align="" colspan="2">Operações</th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>

    </div>


    <div id="cadastrados">
        <table id="tabela_cadastrados" border="0" width="100%" class="tabela1" cellpadding="4">
            <thead>
                <tr class="tabelacabecalho1">
                    <th align="center">Livre</th>
                    <th align="center">ID</th>
                    <th align="left">Nome</th>
                    <th align="left">Instituição</th>
                    <th align="left">Time</th>
                    <th align="left" id="coluna_equipe">Equipe</th>
                    <th align="left" colspan="2" id="linha_equip_padrao_cab">Equipamento Padrão</th>
                    <th  align="center" colspan="2">Oper.</th>	
                </tr>
            </thead>
            <tbody ></tbody>
        </table>
        <hr>
        <table id="" border="0" width="100%" class="tabela1" cellpadding="4">
            <tr class="" >
                <td align="left"><button name="btn_cad_pessoas" id="btn_cad_pessoas" class="botaopadrao" colspan="7">CADASTRAR</button></td>
                <td width="10px"></td>
            </tr>
        </table>
    </div>


<div id="cadastrados_equipamento_padrao">
        <h3>Equipamento Padrão</h3><br>
        <table id="tabela_cadastrados_equipamento_padrao" border="0" width="100%" class="tabela1" cellpadding="4">
            <tr>
                <td align="right" width="80px"><b>ID: </b></td>
                <td><input type="text" size="12" name="cadequipad_id_pessoa" id="cadequipad_id_pessoa" class="campopadrao" disabled/></td>
            </tr>
            <tr>
                <td align="right" width="230px"><b>Pessoa: </b></td>
                <td><input type="text" size="30" name="cadequipad_pessoa_nome" id="cadequipad_pessoa_nome" class="campopadrao" disabled/></td>
            </tr>
            <tr>
                <td align="right" width="230px"><b>Equipamento: </b></td>
                <td>
                    <select name="cadequipad_equipamento" id="cadequipad_equipamento" class="campopadrao" style="width:230px;" required >
                    </select>
                </td>
            </tr>  
        </table>
        <hr>
        <table align="left" border="0"  width="100%"cellpadding="4" >
            <tr >
                <td align="left" width="" style="">
                    <button class="botaopadrao" name="btn_salvar_equipamento_padrao" id="btn_salvar_equipamento_padrao" onclick="click_equipamentos_padrao_salvar()">SALVAR</button>&nbsp;
                    <button class="botaopadrao" name="btn_salvar_equipamento_padrao" id="btn_salvar_equipamento_padrao" onclick="click_equipamentos_padrao_cancelar()">CANCELAR</button>
                </td>
            </tr>
        </table>  
    </div>    
    

    <div id="equipamentos">
        <table id="tabela_equipamentos" border="0" width="100%" class="tabela1" cellpadding="4">
            <thead>
                <tr class="tabelacabecalho1">
                    <th align="center">ID</th>
                    <th align="left">Nome</th>
                    <th align="left">Descrição</th>
                    <th align="left">Wi-fi</th>
                    <th align="left">Projeto</th>                    
                    <th align="left" id="equipamento_equipe_coluna">Equipe</th>                    
                    <th align="center" colspan="2">Oper.</th>	
                </tr>
            </thead>
            <tbody ></tbody>
        </table>
        <hr>
        <table id="" border="0" width="100%" class="tabela1" cellpadding="4">
            <tr class="" >
                <td align="left"><button name="btn_cad_equipamentos" id="btn_cad_equipamentos" class="botaopadrao" colspan="7">CADASTRAR</button></td>
                <td width="10px"></td>
            </tr>
        </table>
    </div>


    <div id="equipamentos_cad">
        <h3>Cadastro de Novo Equipamento</h3><br>
        <table id="tabela_equipamentos_cad" border="0" width="100%" class="tabela1" cellpadding="4">
            <tr>
                <td align="right" width="230px"><b>Nome do Equipamento: </b></td>
                <td><input type="text" size="30" name="nome_equipamento" id="nome_equipamento" class="campopadrao" required/></td>
            </tr>
            <tr>
                <td align="right"><b>Senha (equipamento): </b></td>
                <td><input type="password" size="12" name="senha_equipamento" id="senha_equipamento" class="campopadrao" required/></td>
            </tr>
            <tr>
                <td align="right"><b>Repita a Senha: </b></td>
                <td><input type="password" size="12" name="senha_equipamento2" id="senha_equipamento2" class="campopadrao" required/></td>
            </tr>
            <tr>
                <td align="right"><b>Descrição: </b></td>
                <td><input type="text" size="40" name="descricao_equipamento" id="descricao_equipamento" class="campopadrao"/></td>
            </tr>
            <tr>
                <td align="right"><b>IP Equipamento: </b></td>
                <td><input type="text" size="30" name="endereco_equipamento" id="endereco_equipamento" class="campopadrao"/></td>
            </tr>
            <tr>
                <td align="right"><b>SSID (Wi-Fi): </b></td>
                <td><input type="text" size="20" name="ssid_equipamento" id="ssid_equipamento" class="campopadrao" required /></td>
            </tr>
            <tr>
                <td align="right"><b>Senha SSID: </b></td>
                <td>
                    <input type="password" size="20" name="ssidsenha_equipamento" id="ssidsenha_equipamento" class="campopadrao" required />
                    <input type="checkbox" name="ssidsenha_equipamento_ocultarsenha" id="ssidsenha_equipamento_ocultarsenha" class="" onclick="mostra_senha(this.id,'ssidsenha_equipamento','mostrasenha');"/>
                    <span class="fonte2" id="mostrasenha">Mostrar Senha</span>
                    
                </td>
            </tr>
            <tr>
                <td align="right"><b>Servidor: </b></td>
                <td><input type="text" size="15" name="servidor" id="servidor" class="campopadrao"  value=""   disabled/></td>
            </tr>    
            <tr>
                <td align="right"><b>Porta: </b></td>
                <td><input type="text" size="4" name="porta" id="porta" size="8" class="campopadrao"  value="80" required ></td>
            </tr>  
            <tr>
            <tr id="equipamento_equipe_linha_cadastro">
                <td align="right"><b>Equipe: </b></td>
                <td> 
                        <select name="equipamento_equipe" id="equipamento_equipe"  onchange=""  class="campopadrao" style="width:150px;" required></select>
                </td>
            </tr>  
            <tr>
                <td align="right"><b>Projeto: </b></td>
                <td> 
                        <select name="cadequipad_projeto" id="cadequipad_projeto"  onchange="seleciona_projeto(this.value)"  class="campopadrao" style="width:150px;" required></select>
                </td>
            </tr>  
            <tr>                    
                <td> </td>
                <td>
                    <button class="botaopadrao" name="btn_salvar_equipamento" id="btn_salvar_equipamento" onclick="">SALVAR</button>&nbsp;
                </td>
            </tr>
            </table>
            <br>
            <table id="tabela_equipamentos_cad_firmware" border="0" width="100%" class="tabela1" cellpadding="4">
            <tralign="right" >   
                <td align="right"  width="230px"> </td>
                <td><span align="left"><h3>GERADOR DE FIRMWARE</h3></span></td>
            </tr>

            <tr>   
                <td align="right"><b> </b></td>
                <td><span align="left" id="span_descricao_projeto"></span></td>
            </tr> 
            <tr>
                <td></td>
                <td><a href="http://teste.com.br" target="_blank" id="link_projeto" class="link"><span align="left" id="span_link_projeto"></span></a></td>
            </tr>
            <tr>                    
                <td> </td>
                <td>
                    <button class="botaopadrao" name="btn_gerar_firmware" id="btn_gerar_firmware" disabled onclick="click_gerar_firmware() " disabled>GERAR FIRMWARE</button>&nbsp;
                </td>
            </tr>
            <tr>
                <td align="right"><b> </b></td>
                <td><textarea id="textarea_firmware_codigo" style="width:400px; height:200px;" ></textarea></td>
            </tr>
            <tbody ></tbody>
        </table>

        <hr>
        <table align="left" border="0"  width="100%"cellpadding="4" >
            <tr >
                <td align="left" width="" style="">
                    <button class="botaopadrao" name="btn_salvar_equipamento" id="btn_salvar_equipamento" onclick="click_equipamentos_cadastrar_cancelar()">VOLTAR</button>
                </td>
            </tr>
        </table>  
    </div>


    <div id="equipes">
        <table id="tabela_equipes" border="0" width="100%" class="tabela1" cellpadding="4">
            <thead>
                <tr class="tabelacabecalho1">
                    <th align="left">Código</th>
                    <th align="left">Nome</th>
                    <th align="left">Mediador</th>
                    <th align="left">Limite Usuários</th>
                    <th  align="center" colspan="2">Oper.</th>  
                </tr>
            </thead>
            <tbody ></tbody>
        </table>
        <hr>
        <table id="" border="0" width="100%" class="tabela1" cellpadding="4">
            <tr class="" >
                <td align="left"><button name="btn_cad_equipes" id="btn_cad_equipes" class="botaopadrao" colspan="7">CADASTRAR</button></td>
                <td width="10px"></td>
            </tr>
        </table>
    </div>


    <div id="pessoas_cad">
        <h3>Cadastro de novo Usuário</h3><br>
        <table id="tabela_pessoas_cad" border="0" width="100%" class="tabela1" cellpadding="4">
            <tr>
                <td align="right" width="230px"><b>Nome da Pessoa: </b></td>
                <td><input type="text" size="30" name="pessoa_nome" id="pessoa_nome" class="campopadrao" required/></td>
            </tr>

            <tr>
                <td align="right"><b>Data de nascimento: </b></td>
                <td><input type="text" size="10" name="pessoa_data_nascimento" id="pessoa_data_nascimento" class="campopadrao" required > <span class="fonte2">Ex: 08/02/1984 </span></td>
            </tr>
            <tr>
                <td align="right"><b>E-mail: </b></td>
                <td> 
                    <input type="text" size="35" name="pessoa_email" id="pessoa_email" class="campopadrao"/>
                </td>
            </tr>   
            <tr>
                <td align="right"><b>Instituição: </b></td>
                <td> 
                    <input type="text" size="25" name="pessoa_instituicao" id="pessoa_instituicao" class="campopadrao" />
                </td>
            </tr>   
            <tr>
                <td align="right"><b>Time: </b></td>
                <td> 
                    <input type="text" size="20" name="pessoa_time" id="pessoa_time" class="campopadrao" />
                </td>
            </tr>   
            <tr>
                <td align="right"><b>Senha: </b></td>
                <td> 
                    <input type="password" size="15" name="pessoa_senha" id="pessoa_senha" class="campopadrao" required  />
                </td>
            </tr>   
            <tr>
                <td align="right"><b>Repita a Senha: </b></td>
                <td> 
                    <input type="password" size="15" name="pessoa_senha2" id="pessoa_senha2" class="campopadrao" required   />
                </td>
            </tr>             
        </table>
        <hr>
        <table align="left" border="0"  width="100%"cellpadding="4" >
            <tr >
                <td align="left" width="150px" style="">
                    <button class="botaopadrao" name="btn_salvar_pessoa" id="btn_salvar_pessoa" onclick="click_pessoa_cadastrar()">SALVAR</button>
                </td>
                <td align="left" width="150px" style="">
                    <button class="botaopadrao" name="btn_salvar_pessoa_cancelar" id="btn_salvar_pessoa_cancelar" onclick="click_pessoa_cadastrar_cancelar()">CANCELAR</button>
                </td>     
                <td width="100%"> </td>
            </tr>            

        </table>  
    </div>


    <div id="equipes_cad">
        <h3>Cadastro de nova Equipe</h3><br>
        <table id="tabela_equipes_cad" border="0" width="100%" class="tabela1" cellpadding="4">
            <tr>
                <td align="right" width="230px"><b>Nome da Equipe: </b></td>
                <td><input type="text" size="30" name="nome_equipe" id="nome_equipe" class="campopadrao" required/></td>
            </tr>
            
            <tr>
                <td align="right"><b>Mediador: </b></td>
                <td> 
                    <select name="mediador" id="mediador"  onchange=""  class="campopadrao" style="width:150px;" required></select>
                </td>
            </tr>  

            <tr>
                <td align="right" width="230px"><b>Limite de Pessoas: </b></td>
                <td><input type="text" size="10" name="limite_pessoas" id="limite_pessoas" class="campopadrao" required/></td>
            </tr>

        </table>
        <hr>
        <table align="left" border="0"  width="100%"cellpadding="4" >
            <tr >
                <td align="left" width="150px" style="">
                    <button class="botaopadrao" name="btn_salvar_equipe" id="btn_salvar_equipe" onclick="click_equipe_cadastrar()">SALVAR</button>
                </td>
                <td align="left" width="150px" style="">
                    <button class="botaopadrao" name="btn_salvar_equipe_cancelar" id="btn_salvar_equipe_cancelar" onclick="click_equipe_cadastrar_cancelar()">CANCELAR</button>
                </td>     
                <td width="100%"> </td>
            </tr>            

        </table>  
    </div>


    <div id="configuracoes">
        <table id="tabela_configuracoes" border="0" width="100%" class="tabela1" cellpadding="4">
            <tr>
                <td align="right"><b>  </b></td>
                <td>
                    <span align="left"><h3>GERAIS</h3></span>
                </td>
            </tr>
            <tr id="tr_modelo">
                <td align="right" width="230px"><b>Modelo: </b></td>
                <td>
                    <select name="modelo" id="modelo" class="campopadrao" style="width:150px;" >
                        <option value="1">Jabuti G2</option>
                        <option value="2">Multi Equipamento</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td align="right" width="230px"><b>Tipo Medida: </b></td>
                <td>
                    <select name="tipomedida" id="tipomedida" class="campopadrao" style="width:150px;" required="">
                        <option value="1">Graus/Passos</option>
                        <option value="2">Tempo (ms)</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td align="right"><b>Servidor (hostname/ip): </b></td>
                <td><input type="text" size="12" name="host" id="host" class="campopadrao" required/></td>
            </tr>
            <tr>
                <td align="right" width="230px"><b>Língua da Fala: </b></td>
                <td>
                    <select name="lingua_fala" id="lingua_fala" class="campopadrao" style="width:150px;" required="">
                        <option value="f1">F1 - Português (Brasil)</option>
                        <option value="f2">F2 - Inglês</option>
                        <option value="f3">F3 - Inglês (Americano)</option>
                        <option value="f4">F4 - Espanhol</option>
                        <option value="f5">F5 - Alemão</option>
                    </select>
                </td>
            </tr>            
            <tr>
                <td align="right"><b>Versão: </b></td>
                <td><input type="text" size="12" name="versao" id="versao" class="campopadrao" disabled /></td>
            </tr>
            <tr>
                <td align="right"><b>Parar Tudo: </b></td>
                <td>
                    <a href="" class="link"><span class="fonte_parar" onclick="para_tudo()"> PARAR </span></a>
                </td>
            </tr>
            <tr>
                <td align="right"><b>  </b></td>
                <td>
                    <span align="left"><br><h3>CALIBRAGEM</h3></span>
                </td>
            </tr>
            <tr>
                <td align="right"><b>10º: </b></td>
                <td><input type="text" size="8" name="10" id="10" class="campopadrao" required/> ms</td>
            </tr>                
            <tr>
                <td align="right"><b>45º: </b></td>
                <td><input type="text" size="8" name="45" id="45" class="campopadrao" required/> ms</td>
            </tr>                
            <tr>
                <td align="right"><b>90º: </b></td>
                <td><input type="text" size="8" name="90" id="90" class="campopadrao" required/> ms</td>
            </tr>                
            <tr>
                <td align="right"><b>180º: </b></td>
                <td><input type="text" size="8" name="180" id="180" class="campopadrao" required/> ms</td>
            </tr>                
            <tr>
                <td align="right"><b>360º: </b></td>
                <td><input type="text" size="8" name="360" id="360" class="campopadrao" required/> ms</td>
            </tr>
            <tr>
                <td align="right"><b>1 Passo: </b></td>
                <td><input type="text" size="8" name="passo1" id="passo1" class="campopadrao" required/> ms</td>
            </tr>
            <tr>
                <td align="right"><b>  </b></td>
                <td>
                    <span align="left"><br><h3>CAMERA</h3></span>
                </td>
            </tr>
            <tr>
                <td align="right"><b>Ativar Camera: </b></td>
                <td>
                    <select name="ativarcamera" id="ativarcamera" class="campopadrao" style="width:80px;" required onchange="">
                        <option value="0">Não</option>
                        <option value="1">Sim</option>

                    </select>                    
                </td>
            </tr>
            <tr>
                <td align="right"><b>Host da Camera: </b></td>
                <td>
                    <input type="text" size="30" name="hostcamera" id="hostcamera" class="campopadrao" required alt="IP ou URL"/> 
                </td>
            </tr>                            
            <tbody ></tbody>
        </table>
        <hr>
        <table align="left" border="0"  width="100%"cellpadding="4" >
            <tr >
                <td align="left" width="" style="">
                    <button class="botaopadrao" name="btn_salvar_configuracoes" id="btn_salvar_configuracoes" onclick="click_configuracoes_salvar()">SALVAR</button>&nbsp;
                    <button class="botaopadrao" name="btn_cancelar_configuracoes" id="btn_cancelar_configuracoes" onclick="click_configuracoes_cancelar()">CANCELAR</button>
                </td>
            </tr>
        </table>   
    </div>




    <input name="paginainicial" id="paginainicial" value="logados" type="hidden"></input>
    <input name="equipe_logada" id="equipe_logada" type="hidden" value="<?php  echo "$equipe_logada";  ?>"></input>  
     <input name="usuario_logado" id="usuario_logado" type="hidden" value="<?php  echo "$usuario_logado";  ?>"></input>  
    <input name="id_usuario" id="id_usuario" value="<?php echo $id_usuario; ?>" type="hidden"></input>   
</div>





<?php include_once 'footer.php'; ?>
