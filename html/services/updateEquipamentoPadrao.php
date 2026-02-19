<?php 

include_once '../include/config.php';
include_once '../include/constantes.php';
include_once '../include/functions.php';
include_once '../include/database.php';
include_once '../include/sessao.php';

$timestamp = getFieldFromPage('timestamp', $FIELD_TYPE_STRING);
$id = getFieldFromPage('id_pessoa', $FIELD_TYPE_INT);
$equipamento = getFieldFromPage('equipamento', $FIELD_TYPE_INT);

$result['resultado'] = 0;
$result['mensagem'] = "";

$dados['equipamento_padrao'] = $equipamento;
$condicao['id_pessoa'] = $id;

$result=executeUpdate(  $conn  , "pessoa", $dados, $condicao);

echo json_encode($result );

?>