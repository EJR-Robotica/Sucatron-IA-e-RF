
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




$nome = getFieldFromPage('nome', $FIELD_TYPE_TEXT);
$data_nascimento = getFieldFromPage('data_nascimento', $FIELD_TYPE_TEXT);
$data=  explode("/", $data_nascimento);
$data_nascimento=$data[2]."-".$data[1]."-".$data[0]. " 00:00:00";

$email= getFieldFromPage('email', $FIELD_TYPE_STRING);
$instituicao	= getFieldFromPage('instituicao', $FIELD_TYPE_TEXT);
$time = getFieldFromPage('time', $FIELD_TYPE_TEXT);
$senha = getFieldFromPage('senha', $FIELD_TYPE_STRING);
$senha_2 = getFieldFromPage('senha_2', $FIELD_TYPE_STRING);


/* TODO: validações
 * 
 * 
 */

$resultado['resultado'] = 0;
$resultado['mensagem'] = "";

$dados= array();

$dados['id_pessoa_tipo'] = $PESSOA_TIPO_USUARIO;
$dados['nome'] = $nome;
$dados['instituicao'] = $instituicao;
$dados['time'] = $time;
$dados['email'] = $email;
$dados['login'] = $email;
$dados['senha'] = md5($senha);
$dados['id_modulo'] = 0;
$dados['data_nascimento'] = $data_nascimento;
$dados['interativo'] = 0;




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


$retorno=Array();
$stmt = $conn->prepare("select max(id_pessoa) as id from pessoa");
$stmt->execute();



if( $stmt->rowCount() > 0 ){
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC, PDO::FETCH_ORI_NEXT)){
        $id=$row['id'];
    }
}

if( $resultado[0] = "00000") {
    $resultado['resultado'] = 1;
    $resultado['mensagem'] = "Cadastro salvo com sucesso! Seu ID é: $id";
} else {
    $resultado['resultado'] = 0;
    $resultado['mensagem'] = "Erro na gravação do cadastro!";
}

echo json_encode( $resultado );

?>