<?php 

include_once '../include/config.php';
include_once '../include/constantes.php';
include_once '../include/functions.php';
include_once '../include/database.php';
include_once '../include/sessao.php';

$nome = getFieldFromPage('nome', $FIELD_TYPE_TEXT);
$mediador = getFieldFromPage('mediador', $FIELD_TYPE_TEXT);
$limite_pessoas = getFieldFromPage('limite_pessoas', $FIELD_TYPE_TEXT);
$status = 1;


$resultado['resultado'] = 0;
$resultado['mensagem'] = "";

$dados= array();
$dados['nome'] = $nome;
$dados['mediador'] = $mediador;
$dados['limite_pessoas'] = $limite_pessoas;

$stmt = $conn->prepare("SET NAMES 'utf8'");
$stmt->execute();
$stmt = $conn->prepare("SET character_set_connection=utf8");
$stmt->execute();
$stmt = $conn->prepare("SET character_set_client=utf8");
$stmt->execute();
$stmt = $conn->prepare("SET character_set_results=utf8");
$stmt->execute();


//executa cadastro
$resultado =  executeInsert($conn, "equipes", $dados);



//Grava no cadastro do mediador o código da equipe
//Verifica ultimo registro
$stmt = $conn->prepare("select max(id_equipe) as id from equipes");
$stmt->execute();
if( $stmt->rowCount() > 0 ){
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC, PDO::FETCH_ORI_NEXT)){
        $ultimo=$row['id'];
    }
}
//Atualiza cadastro da pessoa/mediador o código da equipe
$sql = "
	UPDATE pessoa SET 
		equipe = '$ultimo'	
 	WHERE id_pessoa = $mediador
";

$stmt = $conn->prepare($sql);
$stmt->execute();



echo json_encode( $resultado );

?>