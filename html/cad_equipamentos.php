
<?php 

include_once 'header.php'; 
include_once 'include/database.php';
include_once 'include/sessao.php';

?>

<script type="text/javascript" src="js/valida_data.js"></script>
<script type="text/javascript" src="js/valida_senha.js"></script>
<script type="text/javascript" src="cad_equipamentos.js"></script>


<script type="text/javascript">

</script>
<style>

    
    
</style>

<?php 
include "cabecalho.php"; 
include "menu.php"; 
?>


<div id="corpo">

    <h3>Cadastro de Novo Usuário</h3>
    <br>    
    <form id="form_cadastro" name="form_cadastro">
    	<table class="tabela1" cellpadding="4">
			<tr>
                            <td align="right"><b>Nome: </b></td>
                            <td><input type="text" size="30" name="nome" id="nome" class="campopadrao" required/></td>
			</tr>    	
			<tr>
                            <td align="right"><b>Data de nascimento: </b></td>
                            <td><input type="text" size="30" name="data_nascimento" id="data_nascimento" class="campopadrao" required=/> <span class="fonte2">Ex: 08/02/1984 </span></td>
			</tr>
			<tr>
                            <td align="right"><b>E-mail: </b></td>
                            <td> 
                                <input type="text" size="30" name="email" id="email" class="campopadrao"/>
                            </td>
			</tr>   
			<tr>
                            <td align="right"><b>Instituição: </b></td>
                            <td> 
                                <input type="text" size="30" name="instituicao" id="instituicao" class="campopadrao" />
                            </td>
			</tr>   
			<tr>
                            <td align="right"><b>Equipe: </b></td>
                            <td> 
                                <input type="text" size="30" name="equipe" id="equipe" class="campopadrao" />
                            </td>
			</tr>   
			<tr>
                            <td align="right"><b>Senha: </b></td>
                            <td> 
                                <input type="password" size="30" name="senha" id="senha" class="campopadrao" required/>
                            </td>
			</tr>   
			<tr>
                            <td align="right"><b>Repita a Senha: </b></td>
                            <td> 
                                <input type="password" size="30" name="senha2" id="senha2" class="campopadrao" required/>
                            </td>
			</tr>   
    	</table>
    	
    	<br>
    	
    	<input class="botao fonte3" type="button" value="Salvar" onclick="salvar_cadastro();"> </td>
        <input class="botao fonte3" type="button" value="Voltar" onclick="volta_inicio();"> </td>
		    	
    	
    	
    </form>



</div>


<?php include_once 'footer.php'; ?>
