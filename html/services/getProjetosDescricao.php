<?php 

include_once '../include/config.php';
include_once '../include/constantes.php';
include_once '../include/functions.php';
include_once '../include/database.php';
include_once '../include/sessao.php';


$retorno = Array();
$id_projeto=$_POST["id_projeto"];

$stmt = $conn->prepare("select descricao,link from equipamentos_projetos WHERE id_projeto=$id_projeto");
$stmt->execute();
if( $stmt->rowCount() > 0 ){
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC, PDO::FETCH_ORI_NEXT)){

        $retorno[] = $row;
    }
}

echo json_encode( $retorno );

	
?>