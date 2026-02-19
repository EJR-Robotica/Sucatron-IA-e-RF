<?php 

include_once '../include/config.php';
include_once '../include/constantes.php';
include_once '../include/functions.php';
include_once '../include/database.php';
include_once '../include/sessao.php';



$codigo=$_POST["codigo"];
$retorno = Array();

//Pega todos os dados do equipamento para popular os camps da tela
$retorno = Array();

$stmt = $conn->prepare("SELECT * FROM equipes WHERE id_equipe=$codigo");
$stmt->execute();
if( $stmt->rowCount() > 0 ){
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC, PDO::FETCH_ORI_NEXT)){

        $retorno[] = $row;
    }
}

echo json_encode( $retorno );


	
?>