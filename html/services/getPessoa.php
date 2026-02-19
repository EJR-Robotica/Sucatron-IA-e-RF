<?php 

include_once '../include/config.php';
include_once '../include/constantes.php';
include_once '../include/functions.php';
include_once '../include/database.php';
include_once '../include/sessao.php';

sess_start();


$id_pessoa = getFieldFromPage('id_pessoa', $FIELD_TYPE_INT);


$retorno = Array();

$stmt = $conn->prepare("select * from pessoa where id_pessoa = :id_pessoa;");
$stmt->bindValue("id_pessoa", $id_pessoa);
$stmt->execute();

if( $stmt->rowCount() > 0 ){
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC, PDO::FETCH_ORI_NEXT)){
        $retorno[] =  $row;
    }
}


echo json_encode( $retorno );


	
?>