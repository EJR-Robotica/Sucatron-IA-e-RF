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

$id_pessoa	= getFieldFromPage('id_pessoa', $FIELD_TYPE_STRING);

$resultado['resultado'] = 1;
$resultado['mensagem'] = "";

$dados= array();


//encontra a sessão do cara...

$sql = "select id_sessao from sessao where dados_sessao like '%\"id_pessoa\":\"".$id_pessoa. "\"%' and estado = 1";
$stmt = $conn->prepare($sql);
$stmt->execute();

//echo $sql."<br>";

//var_dump( $result );

if( $stmt->rowCount() > 0  ){

	while( 	$row = $stmt->fetch(PDO::FETCH_ASSOC, PDO::FETCH_ORI_NEXT) ){

		//invalida as sessões
		$sql = "delete from sessao where id_sessao = :id_sessao";
		$stmt = $conn->prepare($sql);
		$stmt->bindParam("id_sessao", $row['id_sessao'] );
		//var_dump( $stmt->execute() );
						
	}
	 
	$sql = "update pessoa set ultimo_acesso = 0 where id_pessoa = :id_pessoa";
	$stmt = $conn->prepare($sql);
	$stmt->bindParam("id_pessoa", $id_pessoa );
	$stmt->execute();
		
}

echo json_encode( $resultado );

?>