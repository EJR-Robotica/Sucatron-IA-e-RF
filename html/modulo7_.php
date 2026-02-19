a
<?php 

include_once 'header.php'; 
include_once 'include/database.php';
include_once 'include/sessao.php';

sess_start();
checa_sessao_usuario_logado();
$nome_pessoa = $SES_VAR['nome_pessoa'];

//Verifica se o usuario pode acessar este módulo
checa_sessao_permissao_modulo(7);

?>

<div id="cabecalho">
    <div style="float:left; margin-right: 20px"> <img src="imagens/logo_laboti_cabecalho.png"> </div>       
    <div style="float:left; text-align: left;">
        <h2>Projeto Jabuti Edu</h2> 
        Versão 1.0 
    </div>

    <div style="float:right; text-align: right ;">

        <!-- 
                <img class="top_right_button" src="imagens/configuration.png">
        -->

        <img class="top_right_button" src="imagens/power-button.png" id="btn_logout">  
    </div>

    <div style="float:right; text-align: right ;">
        <span>Bem vindo <?= $nome_pessoa ?></span>
        <select id="id_modulo"></select>
    </div>
</div>


<div id="corpo" style="position: absolute; ">
	<iframe src="/blockly/blockly/apps/turtle/index.html?lang=pt-br" style="height: 100%; width: 100%;"></iframe>
</div>
<?php include_once 'footer.php'; ?>
