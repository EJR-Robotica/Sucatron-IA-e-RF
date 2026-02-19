<?php 

include_once '../include/config.php';
include_once '../include/constantes.php';
include_once '../include/functions.php';
include_once '../include/database.php';
include_once '../include/sessao.php';


$equipe_logada = getFieldFromPage('equipe_logada', $FIELD_TYPE_TEXT);

$retorno = Array();

$stmt = $conn->prepare("select count(id_pessoa) as totalpessoas from pessoa where equipe=$equipe_logada");
$stmt->execute();
if( $stmt->rowCount() > 0 ){
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC, PDO::FETCH_ORI_NEXT)){
        $retorno[] =  $row;
    }
}

echo json_encode( $retorno );

	
?>