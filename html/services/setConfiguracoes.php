<?php 

include_once '../include/config.php';
include_once '../include/constantes.php';
include_once '../include/functions.php';
include_once '../include/database.php';
include_once '../include/sessao.php';

$timestamp = getFieldFromPage('timestamp', $FIELD_TYPE_STRING);
$modelo = getFieldFromPage('modelo', $FIELD_TYPE_STRING);
$tipomedida = getFieldFromPage('tipomedida', $FIELD_TYPE_STRING);
$servidor = getFieldFromPage('servidor', $FIELD_TYPE_TEXT);
$calibragem10 = getFieldFromPage('calibragem10', $FIELD_TYPE_STRING);
$calibragem45 = getFieldFromPage('calibragem45', $FIELD_TYPE_STRING);
$calibragem90 = getFieldFromPage('calibragem90', $FIELD_TYPE_STRING);
$calibragem180 = getFieldFromPage('calibragem180', $FIELD_TYPE_STRING);
$calibragem360 = getFieldFromPage('calibragem360', $FIELD_TYPE_STRING);
$passo1 = getFieldFromPage('passo1', $FIELD_TYPE_STRING);
$hostcamera = getFieldFromPage('hostcamera', $FIELD_TYPE_TEXT);
$usacamera = getFieldFromPage('usacamera', $FIELD_TYPE_INT);
$lingua_fala = getFieldFromPage('lingua_fala', $FIELD_TYPE_TEXT);


$result['resultado'] = 0;
$result['mensagem'] = "";

$dados['modelo'] = $modelo;
$dados['tipomedida'] = $tipomedida;
$dados['servidor'] = $servidor;
$dados['calibragem10'] = $calibragem10;
$dados['calibragem45'] = $calibragem45;
$dados['calibragem90'] = $calibragem90;
$dados['calibragem180'] = $calibragem180;
$dados['calibragem360'] = $calibragem360;
$dados['passo1'] = $passo1;
$dados['hostcamera'] = $hostcamera;
$dados['usacamera'] = $usacamera;
$dados['lingua_fala'] = $lingua_fala;

$condicao['id_configuracao']="1";

executeUpdate(  $conn  , "configuracao", $dados, $condicao);

if ($usacamera==1) {
    //Ativar motion
    $comando = "sudo service motion restart";
    $comando = escapeshellcmd($comando);
    echo exec( $comando );

    
} else {
    $comando = "sudo service motion stop";
    $comando=escapeshellcmd($comando);
    echo exec( $comando );
}



echo json_encode($usacamera );

?>