<?php 

 header("Content-type: text/html; charset=utf-8");

include_once '../include/config.php';
include_once '../include/constantes.php';
include_once '../include/functions.php';
include_once '../include/database.php';
include_once '../include/sessao.php';

sess_start();


$instituicao = getFieldFromPage('instituicao', $FIELD_TYPE_TEXT);
$retorno = Array();


$sql = "select id_modulo, descricao from modulo";

if( isset( $SES_VAR['id_pessoa'] ) && $SES_VAR['id_pessoa'] == -1 )
	$sql = $sql." where id_modulo = 1 ";

$sql = $sql." order by descricao;";

$stmt = $conn->prepare($sql);
$stmt->execute();

if( $stmt->rowCount() > 0 ){

	while ($row = $stmt->fetch(PDO::FETCH_ASSOC, PDO::FETCH_ORI_NEXT)){

			 $retorno[] = $row;

	}

}


echo json_encode( $retorno );
	
?>