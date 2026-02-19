<?php 

include_once '../include/config.php';
include_once '../include/constantes.php';
include_once '../include/functions.php';
include_once '../include/database.php';
include_once '../include/sessao.php';


sess_start();

$codigo = $_POST["pessoa_codigo"];
$nome = $_POST["nome"];
$data_nascimento = $_POST["data_nascimento"];
$data=  explode("/", $data_nascimento);
$data_nascimento=$data[2]."-".$data[1]."-".$data[0]. " 00:00:00";
$email = $_POST["email"];
$instituicao = $_POST["instituicao"];
$time = $_POST["time"];
$senha = md5($_POST["senha"]);
$trocasenha = $_POST["trocasenha"];
$equipe_logada = $_POST["equipe_logada"];

if ($trocasenha==1) {
	$sql = "UPDATE pessoa SET senha = '$senha' WHERE id_pessoa = $codigo";
	$stmt = $conn->prepare($sql); $stmt->execute();
} 


$stmt = $conn->prepare("SET NAMES 'utf8'");
$stmt->execute();
$stmt = $conn->prepare("SET character_set_connection=utf8");
$stmt->execute();
$stmt = $conn->prepare("SET character_set_client=utf8");
$stmt->execute();
$stmt = $conn->prepare("SET character_set_results=utf8");
$stmt->execute();


$sql2 = "
	UPDATE pessoa SET 
		nome = '$nome',
		data_nascimento = '$data_nascimento',
		email = '$email',
		instituicao = '$instituicao',
		time = '$time',		
		equipe = '$equipe_logada'	
 	WHERE id_pessoa = $codigo
";
$stmt = $conn->prepare($sql2);
$stmt->execute();


echo json_encode( $sql2 );

?>


