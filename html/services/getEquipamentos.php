<?php 

include_once '../include/config.php';
include_once '../include/constantes.php';
include_once '../include/functions.php';
include_once '../include/database.php';
include_once '../include/sessao.php';


$equipe_logada=getFieldFromPage('equipe_logada', $FIELD_TYPE_TEXT);
$usuario_logado = getFieldFromPage('usuario_logado', $FIELD_TYPE_TEXT);

if($usuario_logado==1) {
	$sql="
		select *, e.nome as equipamento_nome, p.nome as projeto_nome,e.descricao as equipamento_descricao, p.descricao as projeto_descricao, ee.nome as equipe_nome
		from equipamentos e
		LEFT JOIN equipamentos_projetos p on (e.projeto=p.id_projeto)
                LEFT JOIN equipes ee ON (ee.id_equipe=e.equipe)
		order by id_equipamento;
	";
} else {
	$sql="
		select *, e.nome as equipamento_nome, p.nome as projeto_nome,e.descricao as equipamento_descricao, p.descricao as projeto_descricao
		from equipamentos e
		LEFT JOIN equipamentos_projetos p on (e.projeto=p.id_projeto)
		WHERE e.equipe = $equipe_logada
		order by id_equipamento;
	";	

}


$retorno = Array();

$stmt = $conn->prepare("$sql");
$stmt->execute();
if( $stmt->rowCount() > 0 ){
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC, PDO::FETCH_ORI_NEXT)){

        $retorno[] = $row;
    }
}

echo json_encode( $retorno );

	
?>