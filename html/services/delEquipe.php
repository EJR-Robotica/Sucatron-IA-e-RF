<?php 

include_once '../include/config.php';
include_once '../include/constantes.php';
include_once '../include/functions.php';
include_once '../include/database.php';
include_once '../include/sessao.php';

$id = getFieldFromPage('id_equipe', $FIELD_TYPE_STRING);
$retorno = Array();
$dados['id_equipe']="$id";



//Limpa a equipe (do cadastro de pessoas) das pessoas quem pertencem a esta equipe
$sql = "
	UPDATE pessoa SET 
		equipe = null		
 	WHERE equipe = $id
";
$stmt = $conn->prepare($sql);
$stmt->execute();

//Excluir a equiepe
$resultado =  executeDelete($conn, "equipes", $dados);

//$stmt = $conn->prepare("DELETE FROM pessoas WHERE ip_pessoa=:id_pessoa");
//$stmt->bindValue("id_pessoa", $id_pessoa);

echo json_encode( $resultado );

	
?>