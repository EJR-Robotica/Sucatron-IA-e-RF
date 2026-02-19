<?php 

include_once 'header.php'; 
include_once 'include/database.php';
include_once 'include/sessao.php';

sess_start();
checa_sessao_usuario_logado();
$nome_pessoa = $SES_VAR['nome_pessoa'];

//Verifica se o usuario pode acessar este módulo
checa_sessao_permissao_modulo(7);

 //Verifica o modelo configurado. Se é mini ou G2
$res = $conn->prepare("SELECT * FROM configuracao WHERE id_configuracao = 1");
$res->execute();
while ($linha = $res->fetch(PDO::FETCH_OBJ, PDO::FETCH_ORI_NEXT)){
    $mod = $linha->modelo;
    if ($mod==1) $modelo_nome="JabutiEdu G2";
    else $modelo_nome="JabutiEdu Mini";
}


//Pega nome do equipamento
$retorno = Array();
$stmt = $conn->prepare("select e.nome as nome FROM pessoa p JOIN equipamentos e on (p.equipamento_padrao=e.id_equipamento) WHERE p.id_pessoa= :id_pessoa ;");
$stmt->bindValue("id_pessoa", $id_pessoa);
$stmt->execute();
if( $stmt->rowCount() > 0 ){
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC, PDO::FETCH_ORI_NEXT)){
        $retorno[] =  $row;
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

<div id="cabecalho">
<table cellpadding="1" border="0" width="100%" class="">
    <tr>
                <td align="center"  width="10px" >
        </td>
        <td align="left"  width="" class="cabecalhocentro">
             <!-- BEGIN BLOCK_NOME_QUIOSQUE_COOPERATIVA -->
             <label class=""><h2>JABUTI EDU G2</h2></label>
             <label class=""><i>Versão: <?php echo $versao; ?></i></label>
            <!-- END BLOCK_NOME_QUIOSQUE_COOPERATIVA -->
        </td>
        <td align="right" width="100px" valight="center">
        <td>
        <td align="right" width="100px" valight="center">
            <span id="cab_modelo" class="fonte3"><?php echo $modelo_nome;?></span>
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


<div id="corpo" style="position: absolute; ">
	<iframe src="http://192.168.0.123/blockly/blockly/apps/turtle/index.htm" style="height: 100%; width: 100%;"></iframe>
</div>
<?php include_once 'footer.php'; ?>
