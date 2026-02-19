<?php 

include_once '../include/config.php';
include_once '../include/constantes.php';
include_once '../include/functions.php';
include_once '../include/database.php';
include_once '../include/sessao.php';


$status = 1;

$resultado['resultado'] = 0;
$resultado['mensagem'] = "";


$data_nascimento = getFieldFromPage('data_nascimento', $FIELD_TYPE_TEXT);
$data=  explode("/", $data_nascimento);
$data_nascimento=$data[2]."-".$data[1]."-".$data[0]. " 00:00:00";
$equipe_logada = getFieldFromPage('equipe_logada', $FIELD_TYPE_TEXT);


$dados= array();
$dados['nome'] = getFieldFromPage('nome', $FIELD_TYPE_TEXT);
$dados['data_nascimento'] = $data_nascimento;
$dados['email'] = getFieldFromPage('email', $FIELD_TYPE_TEXT);
$dados['instituicao'] = getFieldFromPage('instituicao', $FIELD_TYPE_TEXT);
$dados['time'] = getFieldFromPage('time', $FIELD_TYPE_TEXT);
$dados['senha'] = md5(getFieldFromPage('senha', $FIELD_TYPE_TEXT));
$dados['equipe'] = $equipe_logada;

$dados['id_modulo'] = 0;



$stmt = $conn->prepare("SET NAMES 'utf8'");
$stmt->execute();
$stmt = $conn->prepare("SET character_set_connection=utf8");
$stmt->execute();
$stmt = $conn->prepare("SET character_set_client=utf8");
$stmt->execute();
$stmt = $conn->prepare("SET character_set_results=utf8");
$stmt->execute();



//executa cadastro
$resultado =  executeInsert($conn, "pessoa", $dados);


echo json_encode( $resultado );

?>