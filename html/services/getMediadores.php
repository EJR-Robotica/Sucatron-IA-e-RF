<?php 

include_once '../include/config.php';
include_once '../include/constantes.php';
include_once '../include/functions.php';
include_once '../include/database.php';
include_once '../include/sessao.php';


$retorno = Array();

$mediador=$_POST["mediador"];
$operacao=$_POST["operacao"];

if ($operacao==2) {
	$stmt = $conn->prepare("
		select *,p.nome as pessoa_nome 
		from pessoa p
		LEFT JOIN equipes e ON (mediador=id_pessoa) 
		WHERE id_pessoa = $mediador
		OR (
			e.mediador is null
			AND id_pessoa not in (1,-1)
		)
		order by p.nome
	");
} else if ($operacao==1) {
	$stmt = $conn->prepare("
		select *,p.nome as pessoa_nome 
		from pessoa p
		LEFT JOIN equipes e ON (mediador=id_pessoa) 
		WHERE e.mediador is null
		AND id_pessoa not in (1,-1)
		order by p.nome
	");
} else {
	return false;
}
$stmt->execute();
if( $stmt->rowCount() > 0 ){
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC, PDO::FETCH_ORI_NEXT)){

        $retorno[] = $row;
    }
}

echo json_encode( $retorno );

	
?>