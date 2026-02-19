<style>
            .textarea_vars { width: 500px; height: 150px }
</style>

<?php 

include_once 'header.php'; 
include_once 'include/database.php';
include_once 'include/sessao.php';

sess_start();
checa_sessao_usuario_logado();
$nome_pessoa = $SES_VAR['nome_pessoa'];

//Verifica se o usuario pode acessar este módulo
checa_sessao_permissao_modulo(2);

//pega o conteudo original
$id_pessoa = $SES_VAR['id_pessoa'];
$id_modulo = $SES_VAR['id_modulo'];
$conteudo ="";

$stmt = $conn->prepare("select conteudo from pessoa_modulo where id_pessoa = :id_pessoa and id_modulo = :id_modulo;");
$stmt->bindValue("id_pessoa", $id_pessoa);
$stmt->bindValue("id_modulo", $id_modulo);
$stmt->execute();

if( $stmt->rowCount() > 0 ){

	while ($row = $stmt->fetch(PDO::FETCH_ASSOC, PDO::FETCH_ORI_NEXT)){

		$conteudo = $row['conteudo'];

	}

}

//Verifica o modelo configurado. Se é mini ou G2
$res = $conn->prepare("SELECT * FROM configuracao WHERE id_configuracao = 1");
$res->execute();
while ($linha = $res->fetch(PDO::FETCH_OBJ, PDO::FETCH_ORI_NEXT)){
    $mod = $linha->modelo;
    $lingua_fala = $linha->lingua_fala;
    $c360 = $linha->calibragem360;
    $passo1 = $linha->passo1;      
    $tipomedida = $linha->tipomedida;      
    if ($mod==1) $modelo_nome="G2";
    else $modelo_nome="Multi Equipo";
}

//Pega nome do equipamento
$retorno = Array();
$stmt = $conn->prepare("select e.nome as nome FROM pessoa p JOIN equipamentos e on (p.equipamento_padrao=e.id_equipamento) WHERE p.id_pessoa= :id_pessoa ;");
$stmt->bindValue("id_pessoa", $id_pessoa);
$stmt->execute();
if( $stmt->rowCount() > 0 ){
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC, PDO::FETCH_ORI_NEXT)){
        $retorno[] = $row;
        if ($mod==2) $equipamento_nome=$row["nome"]; else $equipamento_nome="";
    }
}

        
 //Verifica a versão
$res = $conn->prepare("SELECT * FROM configuracao WHERE id_configuracao = 1");
$res->execute();
while ($linha = $res->fetch(PDO::FETCH_OBJ, PDO::FETCH_ORI_NEXT)){
    $versao = $linha->versao;
}

?>


<script type="text/javascript" src="modulo5.js"></script>
<link rel="stylesheet" media="screen" type="text/css" href="css/modulo5.css" />


<div id="cabecalho">
<table cellpadding="1" border="0" width="100%" class="">
    <tr>
                <td align="center"  width="10px" >
        </td>
        <td align="left"  width="" class="cabecalhocentro">
             <!-- BEGIN BLOCK_NOME_QUIOSQUE_COOPERATIVA -->
              <label class=""><h3>PLATAFORMA JABUTI EDU</h3></label>
             <label class=""><i>Versão: <?php echo $versao; ?></i></label>
            <!-- END BLOCK_NOME_QUIOSQUE_COOPERATIVA -->
        </td>
        <td align="right" width="100px" valight="center">
        <td>
        <td align="right" width="350px" valight="center">
            <span id="cab_modelo" class="fonte3"><?php echo $modelo_nome;?></span><br>
            <span id="nome_usuario"><?php echo "$nome_pessoa" ?></span><Br>
            <span id="equipamento" class="fonte2"><?php echo $equipamento_nome;?></span>

        </td>
        <td align="left" width="30px" valight="center">
            <a href="index.php?logout=true" class="link">                
                <img src="imagens/sair.png" width="35px" alt="SAIR" title="Sair do Sistema" id="btn_logout"><br>
            </a>
        </td>

        <td align="center"  width="8px" class="" align="left">
 
        </td>
      
    </tr>
</table> 
</div>

<!-- Fim do cabeçalho -->


<div id="corpo">
    <div id="painel_esquerdo">
        <table width="100%">
            <tr>
                <td  align="left">
                    <span class="fonte11"><b>Tipo de Medida:</b></span> <span name="medida" id="medida" class="fonte10"></span>
                </td>
                <td align="left">
                    <span class="fonte11" id="passo1_texto"><b>1 Passo: </b></span> <span name="passo1" id="passo1" class="fonte10"></span>
                </td>
            </tr>
        </table>
        <textarea id="container_programa" onkeyup="botao_amarelo()"></textarea>
        <input type="checkbox" name="loop" ide="loop"> Loop
        <div id="container_botoes"></div>
    </div>
    <div id="painel_direito">
        <table width="100%">
            <tr>
                <td  align="left">
                    <span class="fonte11">VARIÁVEIS</span>
                </td>
            </tr>
             <tr>
                <td  align="left">
                </td>
            </tr>           
        </table>
        
        <textarea class="textarea_vars" name="textarea_vars" id="textarea_vars"></textarea>
    </div>
</div>
<input type="hidden" name="id_pessoa" id="id_pessoa" value="<?php echo $id_pessoa; ?>">
<input type="hidden" name="id_modulo" id="id_modulo" value="<?php echo $id_modulo; ?>">
<input type="hidden" name="modelo" id="modelo" value="<?php echo $mod; ?>">
<input type="hidden" name="c360" id="c360" value="<?php echo $c360 ?>">
<input type="hidden" name="passo1" id="passo1" value="<?php echo $passo1 ?>">
<input type="hidden" name="tipomedida" id="tipomedida" value="<?php echo $tipomedida ?>">
<input type="hidden" name="lingua_fala" id="lingua_fala" value="<?php echo $lingua_fala; ?>">
<input type="hidden" name="conteudo2" id="conteudo2" value="">

<?php include_once 'footer.php'; ?>
