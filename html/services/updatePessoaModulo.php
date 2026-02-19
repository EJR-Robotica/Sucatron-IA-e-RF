<?php 

include_once '../include/config.php';
include_once '../include/constantes.php';
include_once '../include/functions.php';
include_once '../include/database.php';
include_once '../include/sessao.php';

/*
if( checa_sessao_permite_servico() == false ){
	//devolve erro -1 que serve para demonstrar que o usuario não tem permissão de fazer nada
	echo "{'resultado':-1, 'mensagem':''}";
}
*/

sess_start();

$id_pessoa = $SES_VAR['id_pessoa'];
$id_modulo = $SES_VAR['id_modulo'];

$enviou =  getFieldFromPage('enviou', $FIELD_TYPE_INT) ;
$conteudo = $_POST["conteudo"];


$sql = "update pessoa_modulo set conteudo=:conteudo, enviou = :enviou, ultima_atualizacao = now() where 1=1  and id_pessoa=:id_pessoa  and id_modulo=:id_modulo;";
$stmt = $conn->prepare($sql);

$stmt->bindValue("conteudo", $conteudo);
$stmt->bindValue("id_pessoa", $id_pessoa);
$stmt->bindValue("id_modulo", $id_modulo);
$stmt->bindValue("enviou", $enviou);

$stmt->execute();

$resultado['resultado'] = 1;

echo json_encode( $resultado );

?>