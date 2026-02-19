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


 //Verifica o modelo configurado. Se é mini ou G2
$res = $conn->prepare("SELECT * FROM configuracao WHERE id_configuracao = 1");
$res->execute();
while ($linha = $res->fetch(PDO::FETCH_OBJ, PDO::FETCH_ORI_NEXT)){
    $mod = $linha->modelo;
    $lingua_fala = $linha->lingua_fala;
    $tipomedida = $linha->tipomedida;
    $m360 = $linha->calibragem360;
    $m180 = $linha->calibragem180;
    $m90 = $linha->calibragem90;
    $m45 = $linha->calibragem45;
    $m10 = $linha->calibragem10;
    $passo1 = $linha->passo1;
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


<script type="text/javascript" src="modulo1.js"></script>
<script type="text/javascript" src="js/pi_proxy.js"></script>
<link rel="stylesheet" media="screen" type="text/css" href="css/modulo1.css" />


<div id="cabecalho">
<table cellpadding="1" border="0 " width="100%" class="">
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
        <td align="right" width="400px" valight="center">
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

    
	<div id="painel_esquerdo">

		<div>	
			<div id="pe_esquerdo">
                            <img class="btn" id="btn_seta_esquerda" src="imagens/seta_esquerda.png" onmousedown="executa_esquerda();">
			</div>
		
			<div id="pe_centro">
                            <!--
                            <option value="1">10º</option>
                            <option value="2.7">45º</option>
                            <option value="5.4">90º</option>
                            <option value="10.8">180º</option>
                            <option value="22.5">360º</option>
                            -->
                            <select id="grau_giro" class="">
                            </select>
			</div>
		
			<div id="pe_direito">
				<img class="btn" id="btn_seta_direita" src="imagens/seta_direita.png" onmousedown="executa_direita();">
			</div>
		</div>
		
		<div style="clear: both;"></div>
		
		<div style="text-align: center;">
			<img  class="btn" id="btn_buzina" src="imagens/botao_buzina.png" onmousedown="buzina();">
			<img  class="btn" id="btn_le" src="imagens/botao_le.png" onmousedown="led_esquerdo();">
			<img  class="btn" id="btn_ld" src="imagens/botao_ld.png" onmousedown="led_direito();">
            <img  class="btn" id="btn_bc" src="imagens/botao_bc.png" onmousedown="baixa_caneta();">
            <img  class="btn" id="btn_sc" src="imagens/botao_sc.png" onmousedown="sobe_caneta();">
		</div>
	
        <div style="text-align: center; width: 100%; height: 64px;">
            <div style="float: right;">
                <img class="btn" src="imagens/speaker.png" width="86" height="66" id="btn_fala" onmousedown="fala()">
            </div>
            <div style="float: right; margin-top: 24px;">
                <input type="text" value="" id="texto_fala" name="texto_fala" style="font-size: 14pt; width:400px;" >
            </div>
		</div>
	
	</div>

	
	<div id="painel_direito">
		<div id="pd_cima">
			<img class="btn" id="btn_seta_frente" src="imagens/seta_frente.png"  onmousedown="executa_frente();">
		</div>
	
		<div id="pd_centro">
			<select id="quanto_andar">
			</select>
		</div>
	
		<div id="pd_baixo">
			<img class="btn" id="btn_seta_tras" src="imagens/seta_tras.png" onmousedown="executa_tras();">
		</div>
	
	</div>

</div>
<input type="hidden" name="id_pessoa" id="id_pessoa" value="<?php echo $id_pessoa; ?>">
<input type="hidden" name="id_modulo" id="id_modulo" value="<?php echo $id_modulo; ?>">
<input type="hidden" name="modelo" id="modelo" value="<?php echo $mod; ?>">
<input type="hidden" name="tipomedida" id="tipomedida" value="<?php echo $tipomedida; ?>">

<input type="hidden" name="m360" id="m360" value="<?php echo $m360; ?>">
<input type="hidden" name="m180" id="m180" value="<?php echo $m180; ?>">
<input type="hidden" name="m90" id="m90" value="<?php echo $m90; ?>">
<input type="hidden" name="m45" id="m45" value="<?php echo $m45; ?>">
<input type="hidden" name="m10" id="m10" value="<?php echo $m10; ?>">
<input type="hidden" name="passo1" id="passo1" value="<?php echo $passo1; ?>">





<input type="hidden" name="lingua_fala" id="lingua_fala" value="<?php echo $lingua_fala; ?>">
<input type="hidden" name="bandeirinha" id="bandeirinha" value="">

<div align="center" id="camera_div">
<iframe name="framecamera" id="framecamera" src="" width="170" height=145">
</div>

<?php include_once 'footer.php'; ?>
