<?php

include_once 'header.php'; 
include_once 'include/database.php';
include_once 'include/sessao.php';

sess_start();
checa_sessao_usuario_logado();
$nome_pessoa = $SES_VAR['nome_pessoa'];
$id_pessoa = $SES_VAR['id_pessoa'];
$id_modulo = $SES_VAR['id_modulo'];

//Verifica se o usuario pode acessar este módulo
checa_sessao_permissao_modulo(1);

?>


<script type="text/javascript" src="modulo1.js"></script>
<script type="text/javascript" src="js/pi_proxy.js"></script>
<link rel="stylesheet" media="screen" type="text/css" href="css/modulo1.css" />


<div id="cabecalho">
<table cellpadding="1" border="0" width="100%" class="">
    <tr>
        <td align="center"  width="10px" >
        </td>
        <td align="left"  width="" class="cabecalhocentro">
             <!-- BEGIN BLOCK_NOME_QUIOSQUE_COOPERATIVA -->
             <label class=""><h2>JABUTI EDU G2</h2></label>
             <label class=""><i>Versão: 16.02</i></label>
            <!-- END BLOCK_NOME_QUIOSQUE_COOPERATIVA -->
        </td>
        <td align="right" width="200px">
            <span id="" class="fonte9">Módulo 01</span><br>
            
        </td>
        <td align="right" width="150px">
            <span id="nome_usuario"><?=$nome_pessoa?></span><br>
            <!--
            <a href="configuracoes.php" class="link">
                <img src="imagens/configuracoes.png" width="25px" alt="Configurações" title="Configurações" >
            </a>
            -->
            
             <a href="index.php?logout=true" class="link">                
                <img src="imagens/sair.png" width="25px" alt="SAIR" title="Sair do Sistema" id="btn_logout"><br>
                <!-- <span class="sair">SAIR</span> -->
            </a>
        </td>

        <td align="center"  width="8px" class="" align="left">
 
        </td>     
      
    </tr>
</table> 
</div>

