<?php 

header('Content-Type: text/html; charset=utf-8');

//mysql_query("SET NAMES 'utf8'");
//mysql_query('SET character_set_connection=utf8');
//mysql_query('SET character_set_client=utf8');
//mysql_query('SET character_set_results=utf8');

$nome_sistema 	= ""; //sistema roda na raiz do servidor

$conn_banco   = 'jabutiedu';            // nome do banco
$conn_host    = 'localhost';   		// host
$conn_usuario = 'jabutiedu';       // usuario
$conn_senha   = 'iqb73boi12xtb91te81e7i17';       // senha
$conn_port	  = "3306";

$cmd			= "php ";


//terminar os caminhos com barra
$caminho_base 			= "/var/www/";
$caminho_absoluto 	= $caminho_base."/".$nome_sistema."/";
$caminho_log 				= $caminho_base."/".$nome_sistema."/services/logs/";
$caminho_services 	= $caminho_base."/".$nome_sistema."/services/";
$pathUploadTmp 		= $caminho_base."/".$nome_sistema."/services/tmp/";


date_default_timezone_set('America/Sao_Paulo');





?>
