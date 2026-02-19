<?php 

include_once '../include/config.php';
include_once '../include/constantes.php';
include_once '../include/functions.php';
include_once '../include/database.php';
include_once '../include/sessao.php';


$comando = "sudo python interpreter.py off";
$comando = escapeshellcmd($comando);
echo exec( $comando );

echo json_encode( $comando );

	
?>