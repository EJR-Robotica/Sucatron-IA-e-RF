<?php 

include_once '../include/config.php';
include_once '../include/constantes.php';
include_once '../include/functions.php';
include_once '../include/database.php';
include_once '../include/sessao.php';

/*
if( checa_sessao_permite_servico() == false ){
	//devolve erro -1 que serve para demonstrar que o usuario não tem permissão de fazer nada
	echo "{'resultado':-1, 'mensagem':''}";
}
*/

sess_start();

$codigo = $_POST["codigo"];
$timestamp = $_POST["timestamp"];
$nome = $_POST["nome"];
$senha_equipamento = $_POST["senha_equipamento"];
$descricao = $_POST["descricao"];
$ssid = $_POST["ssid"];
$senha_ssid = $_POST["senha_ssid"];
$servidor = $_POST["servidor"];
$porta = $_POST["porta"];
$projeto = $_POST["projeto"];
$equipamento_equipe = $_POST["equipamento_equipe"];
$equipe_logada = $_POST["equipe_logada"];


if ($equipe_logada=="0") {
    $equipe=$equipamento_equipe;
} else {
    $equipe=$equipe_logada;
}


$sql = "
	UPDATE equipamentos SET 
		nome = '$nome', 
		id_senha = '$senha_equipamento', 
		descricao = '$descricao', 
		endereco = '$endereco', 
		ssid = '$ssid', 
		ssid_senha = '$senha_ssid', 
		host = '$servidor', 
		porta = '$porta', 
		equipe = '$equipe', 
		projeto = '$projeto' 		
 	WHERE id_equipamento = $codigo
";

$stmt = $conn->prepare("SET NAMES 'utf8'");
$stmt->execute();
$stmt = $conn->prepare("SET character_set_connection=utf8");
$stmt->execute();
$stmt = $conn->prepare("SET character_set_client=utf8");
$stmt->execute();
$stmt = $conn->prepare("SET character_set_results=utf8");
$stmt->execute();

$stmt = $conn->prepare($sql);

$stmt->execute();

echo json_encode( $sql );

?>


