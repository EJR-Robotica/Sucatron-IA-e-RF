<?php 

include_once '../include/config.php';
include_once '../include/constantes.php';
include_once '../include/functions.php';
include_once '../include/database.php';
include_once '../include/sessao.php';

sess_start();


$id_pessoa = $_POST['id_pessoa'];
$id_modulo = $_POST['id_modulo'];
$conteudo = "";

$retorno = Array();

$stmt = $conn->prepare("select conteudo from pessoa_modulo where id_pessoa = :id_pessoa and id_modulo = :id_modulo;");
$stmt->bindValue("id_pessoa", $id_pessoa);
$stmt->bindValue("id_modulo", $id_modulo);
$stmt->execute();

if ($stmt->rowCount() > 0) {
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC, PDO::FETCH_ORI_NEXT)) {
        $conteudo = $row['conteudo'];
    }
}
$linhas = explode("\n", $conteudo);
for($x=0; $x < count( $linhas); $x++){
    $comando = "sudo python interpreter.py ".$linhas[$x];
    $comando = escapeshellcmd($comando);
    echo $comando."<br>\n\r";
    if( strpos( $linhas[$x] , "bu") == 0 ){
        //echo $linha[$x]."-".strpos( $linhas[$x] , "bu")."background ";
        echo exec( $comando );
    }
    else
        echo passthru( $comando );
}
	
	
$retorno = Array();
$retorno['resultado'] = $comando;

echo json_encode( $retorno );

	
?>