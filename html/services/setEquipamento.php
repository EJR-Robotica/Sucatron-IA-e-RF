<?php 

include_once '../include/config.php';
include_once '../include/constantes.php';
include_once '../include/functions.php';
include_once '../include/database.php';
include_once '../include/sessao.php';

$timestamp = getFieldFromPage('timestamp', $FIELD_TYPE_STRING);
$nome = getFieldFromPage('nome', $FIELD_TYPE_TEXT);
$senha_equipamento = getFieldFromPage('senha_equipamento', $FIELD_TYPE_TEXT);
$descricao = getFieldFromPage('descricao', $FIELD_TYPE_TEXT);
$endereco = getFieldFromPage('endereco', $FIELD_TYPE_TEXT);
$ssid = getFieldFromPage('ssid', $FIELD_TYPE_TEXT);
$senha_ssid = getFieldFromPage('senha_ssid', $FIELD_TYPE_TEXT);
$porta = getFieldFromPage('porta', $FIELD_TYPE_TEXT);
$projeto = getFieldFromPage('projeto', $FIELD_TYPE_TEXT);
$equipe_logada = getFieldFromPage('equipe_logada', $FIELD_TYPE_TEXT);
$equipamento_equipe = getFieldFromPage('equipamento_equipe', $FIELD_TYPE_TEXT);
$status = 1;

if ($equipe_logada=="0") {
    $equipe=$equipamento_equipe;
} else {
    $equipe=$equipe_logada;
}


$resultado['resultado'] = 0;
$resultado['mensagem'] = "";

$dados= array();
$dados['datacadastro'] = $timestamp;
$dados['nome'] = "$nome";
$dados['id_senha'] = $senha_equipamento;
$dados['descricao'] = $descricao;
$dados['endereco'] = $endereco;
$dados['ssid'] = $ssid;
$dados['ssid_senha'] = $senha_ssid;
$dados['status'] = $status;
$dados['projeto'] = $projeto;
$dados['porta'] = $porta;
$dados['equipe'] = $equipe;
$dados['datacadastro'] = date("Y-m-d H:i:s");

$stmt = $conn->prepare("SET NAMES 'utf8'");
$stmt->execute();
$stmt = $conn->prepare("SET character_set_connection=utf8");
$stmt->execute();
$stmt = $conn->prepare("SET character_set_client=utf8");
$stmt->execute();
$stmt = $conn->prepare("SET character_set_results=utf8");
$stmt->execute();

//executa cadastro
$resultado =  executeInsert($conn, "equipamentos", $dados);


//Verifica qual foi o ultimo registro de equipamento cadastrado
$stmt = $conn->prepare("select max(id_equipamento) as id from equipamentos");
$stmt->execute();
if( $stmt->rowCount() > 0 ){
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC, PDO::FETCH_ORI_NEXT)){
        $ultimo=$row['id'];
    }
}
//Insere na tabela que o arduino lê (modelo mini)
$dados2["id_equipamento"]="$ultimo";
$dados2["conteudo"]="";
$resultado2 =  executeInsert($conn, "equipamentos_executar", $dados2);


echo json_encode( $resultado );

?>