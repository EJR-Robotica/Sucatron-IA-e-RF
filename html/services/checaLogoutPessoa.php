<?php 

include_once '../include/config.php';
include_once '../include/constantes.php';
include_once '../include/functions.php';
include_once '../include/database.php';
include_once '../include/sessao.php';


sess_start();

$resultado['out'] = 0;


if( !isset( $SES_VAR['id_pessoa'] ) )
	$resultado['out'] = 1;
else {
	
	$id_pessoa = $SES_VAR['id_pessoa'];
	
	$sql = "select id_pessoa from vw_usuario_logado where id_pessoa = :id_pessoa";
	$stmt = $conn->prepare($sql);
	$stmt->bindParam("id_pessoa", $id_pessoa);
	$stmt->execute();
	
	if( $stmt->rowCount() == 0  ){
	
		$resultado['out'] = 1;
		
	}
	
	
	
	
	
}
	

echo json_encode( $resultado );

?>