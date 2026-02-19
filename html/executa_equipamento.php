<?php

//Inclui biblioteca que tem os dados de conexão com o banco
include_once 'include/config.php';
include_once 'include/functions.php';

//Pega por get os dados necessários para autenticar
$nome_equipamento = $_GET["nome_equipamento"];
$senha_equipamento = $_GET["senha_equipamento"];

//Conecta no banco de dados e dá inicio as operações
$conecta = mysql_connect($conn_host, $conn_usuario, $conn_senha) or print (mysql_error()); 
mysql_select_db($conn_banco, $conecta) or print(mysql_error()); 

//Verifica se a senha do equipamento bate com a senha do banco. Autentica equipamento
$sql = "SELECT id_equipamento,id_senha FROM equipamentos WHERE nome like '$nome_equipamento'";
if (!$query=  mysql_query($sql)) die ("Erro SQL". mysql_error());
$dados=  mysql_fetch_array($query);
$id_equipamento=$dados[0];
$senha_banco=$dados[1];
if ($senha_banco==$senha_equipamento) {
    //echo "Equipamento AUTENTICADO!";
    $sql="SELECT conteudo,executar FROM equipamentos_executar WHERE id_equipamento=$id_equipamento ";
    if (!$query=  mysql_query($sql)) die ("Erro SQL". mysql_error());
    $dados=mysql_fetch_array($query); 
    $resultado=$dados[0];
    $resultado=$resultado."\r\n";
    $executar=$dados[1];
    if ($executar==1) {
    	echo "#$resultado#";
    	$sql="UPDATE equipamentos_executar SET executar=0 WHERE id_equipamento=$id_equipamento ";
    	if (!$query=  mysql_query($sql)) die ("Erro SQL". mysql_error());	
    }else{echo "#\r\n#";}
} else {
    ///echo "#\r\n#";
}



//Fechar conexão com o banco de dados
mysql_close($conecta); 




?>

