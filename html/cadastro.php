
<?php 

include_once 'header.php'; 
include_once 'include/database.php';
include_once 'include/sessao.php';

?>

<script type="text/javascript" src="js/valida_email.js"></script>
<script type="text/javascript" src="js/valida_data.js"></script>
<script type="text/javascript" src="js/valida_senha.js"></script>
<script type="text/javascript" src="cadastro.js"></script>


<script type="text/javascript">
<!--
//-->
</script>


<style>


	
</style>

<div id="cabecalho">
    <div style="float:left; margin-right: 20px"> <img src="imagens/jabuti_logo.png"  width="80px"> </div>	
		<div style="float:left; text-align: left;">
				 <h2>Projeto Jabuti Edu</h2> 
				 Versão 16.02
	 </div>
</div>


<div id="corpo">

    <h3>Cadastro de Novo Usuário</h3>
    <br>    
    <form id="form_cadastro" name="form_cadastro">
    	<table class="tabela1" cellpadding="4">
			<tr>
                            <td align="right" width="230px"><b>Nome: </b></td>
                            <td><input type="text" size="25" name="nome" id="nome" class="campopadrao" required/></td>
			</tr>    	
			<tr>
                            <td align="right"><b>Data de nascimento: </b></td>
                            <td><input type="text" size="10" name="data_nascimento" id="data_nascimento" class="campopadrao" required=/> <span class="fonte2">Ex: 08/02/1984 </span></td>
			</tr>
			<tr>
                            <td align="right"><b>E-mail: </b></td>
                            <td> 
                                <input type="text" size="35" name="email" id="email" class="campopadrao"/>
                            </td>
			</tr>   
			<tr>
                            <td align="right"><b>Instituição: </b></td>
                            <td> 
                                <input type="text" size="25" name="instituicao" id="instituicao" class="campopadrao" />
                            </td>
			</tr>   
			<tr>
                            <td align="right"><b>Time: </b></td>
                            <td> 
                                <input type="text" size="20" name="time" id="time" class="campopadrao" />
                            </td>
			</tr>   
			<tr>
                            <td align="right"><b>Senha: </b></td>
                            <td> 
                                <input type="password" size="15" name="senha" id="senha" class="campopadrao" required/>
                            </td>
			</tr>   
			<tr>
                            <td align="right"><b>Repita a Senha: </b></td>
                            <td> 
                                <input type="password" size="15" name="senha2" id="senha2" class="campopadrao" required/>
                            </td>
			</tr>   
    	</table>
        <hr>
    	
    	<input class="botao fonte3" type="button" value="Salvar" onclick="salvar_cadastro();"> </td>
        <input class="botao fonte3" type="button" value="Voltar" onclick="volta_inicio();"> </td>
		    	
    	
    	
    </form>



</div>


<?php include_once 'footer.php'; ?>
