<?php 

include_once '../include/config.php';
include_once '../include/constantes.php';
include_once '../include/functions.php';
include_once '../include/database.php';
include_once '../include/sessao.php';



$retorno = Array();

$stmt = $conn->prepare("
	select *,  CONCAT( p.id_pessoa, ' - ', p.nome ) as mediador_nome, e.nome as equipe_nome
	from equipes e
	LEFT JOIN pessoa p on (e.mediador=p.id_pessoa)
	order by p.nome
");
$stmt->execute();
if( $stmt->rowCount() > 0 ){
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC, PDO::FETCH_ORI_NEXT)){

        $retorno[] = $row;
    }
}

echo json_encode( $retorno );

	
?>