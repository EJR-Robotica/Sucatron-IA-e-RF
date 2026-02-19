<?php 
 //Verifica o modelo configurado. Se é mini ou G2
$res = $conn->prepare("SELECT * FROM configuracao WHERE id_configuracao = 1");
$res->execute();
while ($linha = $res->fetch(PDO::FETCH_OBJ, PDO::FETCH_ORI_NEXT)){
    $mod = $linha->modelo;
    $versao = $linha->versao;
    if ($mod==1) $modelo_nome="G2";
    else $modelo_nome="Multi Equipo";
}
    

?>

<table cellpadding="1" border="0" width="98%" class="">
    <tr>
        <td align="center"  width="10px" >
        </td>
        <td align="left"  width="" class="cabecalhocentro">
             <!-- BEGIN BLOCK_NOME_QUIOSQUE_COOPERATIVA -->
             <label class=""><h3>PLATAFORMA JABUTI EDU</h3></label>
             <label class=""><i>Versão: <?php echo $versao;?></i></label>
            <!-- END BLOCK_NOME_QUIOSQUE_COOPERATIVA -->
        </td>
        <td align="right" width="350px" valight="center">
            <span id="cab_modelo" class="fonte3"><?php echo "$modelo_nome <BR>";?></span>
            <span id="nome_usuario"><?php echo "$nome_pessoa" ?></span><Br>
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