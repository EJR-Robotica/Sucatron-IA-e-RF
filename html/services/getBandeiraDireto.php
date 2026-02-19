<?php 

include_once '../include/config.php';
include_once '../include/constantes.php';
include_once '../include/functions.php';
include_once '../include/database.php';
include_once '../include/sessao.php';



$id=$_POST["id"];

$retorno = Array();

//Verifica qual é o valor da bandeira no banco, se tem acesso direto ou não.
$stmt = $conn->prepare("SELECT direto FROM pessoa WHERE id_pessoa=$id");
$stmt->execute();
if( $stmt->rowCount() > 0 ){
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC, PDO::FETCH_ORI_NEXT)){
        $bandeira=$row["direto"];
        $retorno[] = $row;
    }
}
echo json_encode( "$bandeira" );


	
?>