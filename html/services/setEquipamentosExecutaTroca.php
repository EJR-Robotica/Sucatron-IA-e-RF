<?php 

include_once '../include/config.php';
include_once '../include/constantes.php';
include_once '../include/functions.php';
include_once '../include/database.php';
include_once '../include/sessao.php';

sess_start();


$id_pessoa = $_POST['id_pessoa'];
$id_modulo = $_POST['id_modulo'];
$conteudo = $_POST['conteudo'];
$executar = $_POST['executar'];


$retorno = Array();


//Verifica qual é o equipamento padrão
$stmt = $conn->prepare("select equipamento_padrao from pessoa where id_pessoa = :id_pessoa ");
$stmt->bindValue("id_pessoa", $id_pessoa);
$stmt->execute();
if ($stmt->rowCount() > 0) {
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC, PDO::FETCH_ORI_NEXT)) {
        $equipamento = $row['equipamento_padrao'];
    }
}


//Atualiza o executar do equipamento
$dados['executar']=1;
$condicao['id_equipamento']=$equipamento;

executeUpdate(  $conn  , "equipamentos_executar", $dados, $condicao);

echo json_encode( "( $executar )" );

?>