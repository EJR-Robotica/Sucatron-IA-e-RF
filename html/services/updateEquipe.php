<?php 

include_once '../include/config.php';
include_once '../include/constantes.php';
include_once '../include/functions.php';
include_once '../include/database.php';
include_once '../include/sessao.php';


sess_start();

$codigo = $_POST["equipe_codigo"];
$nome = $_POST["nome"];
$mediador = $_POST["mediador"];
$limite_pessoas = $_POST["limite_pessoas"];

//Limpar a equipe do cadastro de pessoa do mediador atual antes de alterar para o novo mediador
$stmt = $conn->prepare("select mediador from equipes WHERE id_equipe=$codigo");
$stmt->execute();
if( $stmt->rowCount() > 0 ){
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC, PDO::FETCH_ORI_NEXT)){
        $mediador_anterior=$row['mediador'];
    }
}
$sql = "
	UPDATE pessoa SET 
		equipe = null		
 	WHERE id_pessoa = $mediador_anterior
";

$stmt = $conn->prepare($sql);
$stmt->execute();



//Atualiza a equipe com os novos dados
$sql = "
	UPDATE equipes SET 
		nome = '$nome', 
		mediador = '$mediador',
		limite_pessoas = '$limite_pessoas' 		
 	WHERE id_equipe = $codigo
";

$stmt = $conn->prepare($sql);
$stmt->execute();



//Atualiza cadastro da pessoa/mediador o código da equipe
$sql = "
	UPDATE pessoa SET 
		equipe = '$codigo'	
 	WHERE id_pessoa = $mediador
";

$stmt = $conn->prepare($sql);
$stmt->execute();

echo json_encode( $sql );

?>


