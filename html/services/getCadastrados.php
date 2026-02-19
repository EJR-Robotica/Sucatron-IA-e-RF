<?php 

include_once '../include/config.php';
include_once '../include/constantes.php';
include_once '../include/functions.php';
include_once '../include/database.php';
include_once '../include/sessao.php';

$usuario_logado = getFieldFromPage('usuario_logado', $FIELD_TYPE_TEXT);
$equipe_logada = getFieldFromPage('equipe_logada', $FIELD_TYPE_TEXT);


if ($usuario_logado=="1" || $usuario_logado=="-1") {
	$sql = "select * from vw_usuario_cadastrado order by equipe, id_pessoa;";
} else {
	$sql = "
		select *
		from vw_usuario_cadastrado 
		WHERE equipe = $equipe_logada 
		AND id_pessoa not in ($usuario_logado)
		order by equipe;
	";
}

$retorno = Array();

$stmt = $conn->prepare("$sql");
$stmt->execute();

if( $stmt->rowCount() > 0 ){

	while ($row = $stmt->fetch(PDO::FETCH_ASSOC, PDO::FETCH_ORI_NEXT)){

			 $retorno[] =  $row;

	}

}

echo json_encode( $retorno );

	
?>