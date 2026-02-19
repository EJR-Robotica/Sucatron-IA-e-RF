<?php 

include_once '../include/config.php';
include_once '../include/constantes.php';
include_once '../include/functions.php';
include_once '../include/database.php';
include_once '../include/sessao.php';

$id_pessoa = getFieldFromPage('id_pessoa', $FIELD_TYPE_STRING);
$retorno = Array();

$dados['id_pessoa']="$id_pessoa";

$resultado =  executeDelete($conn, "pessoa", $dados);

//$stmt = $conn->prepare("DELETE FROM pessoas WHERE ip_pessoa=:id_pessoa");
//$stmt->bindValue("id_pessoa", $id_pessoa);

echo json_encode( $resultado );

	
?>