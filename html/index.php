<?php 
include_once 'header.php'; 
include_once 'include/sessao.php';

sess_start();

$logout = getFieldFromPage("logout");
if( $logout != "") {
    
    logout();
    
    sess_reset();
    
}

        
 //Verifica a versão
$res = $conn->prepare("SELECT * FROM configuracao WHERE id_configuracao = 1");
$res->execute();
while ($linha = $res->fetch(PDO::FETCH_OBJ, PDO::FETCH_ORI_NEXT)){
    $versao = $linha->versao;
    $modelo = $linha->modelo;
}
	
	
?>


<script type="text/javascript" src="index.js"></script>

<div>

	<div class="login-painel">
	
		<div style="width: 100%; height: 120px;">
		</div>

		<div style="width: 100%; height: 100px; text-align: center">
                        <br>
            <p class="main-logo2">Plataforma</p>
			<p class="main-logo">Jabuti Edu</p>
			<p class="main-versao">Versão <?php echo $versao;?><br>&nbsp;</p>
		</div>
			
		
		<div style="width: 100%; height: 90px; text-align: center" >
			<form id="login_form" method="post">
					<div style="margin:10px;">
                                            <input class="login_field" type="text" name="login" id="login" size="20" maxlength="128" value="" required>
					</div>	

					<div style="margin:10px;">
                                            <input class="login_field" type="password" name="senha" id="senha" size="20" maxlength="20" required>
					</div>

					<div style="margin:10px;">
                                            <select class="modulo_login_field" name="id_modulo" id="id_modulo" required></select>
					</div>
					
					<div style="margin:10px;">
                                                <button class="login_botao" type="button" id="btn_acessa" class="botaopadraocadastrar">Entrar</button><br>
                                                <span style="font-size: 10pt;"> <a href="cadastro.php"><br><b>Cadastrar-se aqui</b></a></span><br>
					</div>
					

			</form>
            <input class="modelo" type="hidden" name="modelo" id="modelo" size="" maxlength="" value="<?php echo $modelo; ?>" required>
		
		</div>

	</div>
	
</div>

<?php include_once 'footer.php'; ?>
