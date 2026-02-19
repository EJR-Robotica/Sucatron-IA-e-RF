<?php

//Arquivo: Sessao.php
//Módulo de persistência de sessão
//**************************************

include_once 'config.php';
include_once 'database.php';
include_once 'cypher.php';

header('Content-Type: text/html; charset=utf-8');


$user_agent = $_SERVER[ 'HTTP_USER_AGENT' ];
$remote_addr = $_SERVER[ 'REMOTE_ADDR' ];

//Data de expiração da sessão - 1 x 30 dias x 24 horas x 3600 segundos
$expired_date = 1 * 30 * 24 * 3600 ;  

srand((double)microtime()*1000000);

//aqui ficam os dados da sessão - id_sessao e os dados do usuario
$SES_VAR = array();

//Essa é a chave do cookie de sessão... deve ser algo aleatório...
$chave_cookie_sessao = "LIN)(&XI@&!OHasda@&";

if( isset( $_COOKIE[ $chave_cookie_sessao ] ) )
	$SESSID = decryptString( $_COOKIE[ $chave_cookie_sessao ] );

/*
function arrayToGlobal( $arr ){
	GLOBAL $SES_VAR;
	//var_dump( $arr );

	while (list($key,$val)=each($arr) )
	{
		//pega da variavel global e não do $sess_var
		GLOBAL ${$key};
		${$key} = $val;

		$SES_VAR[$key] = $val;
	}
}
*/

function copyArrayData($from, &$to ){
	
	while (list($key,$val)=each($from) )
	{
		$to[$key] = $val;
	}
}

function generate_SID()
{
	GLOBAL $remote_addr;
	return md5(rand(0,32000) . $remote_addr . rand(0,32000));
}

function setaCookieSessao(){
	
	Global $SESSID, $expired_date, $chave_cookie_sessao;
	
	//setcookie("CookieTeste", $value);
	//setcookie("CookieTeste", $value, time()+3600);  /* expira em 1 hora */
	//setcookie("CookieTeste", $value, time()+3600, "/~rasmus/", ".example.com", 1);
	setcookie( $chave_cookie_sessao ,  encryptString( $SESSID ), time()+$expired_date*3600,"/");
		
}


function criaNovaSessao(){
	
	global $SESSID, $chave_cookie_sessao, $SES_VAR, $conn, $expired_date, $user_agent, $remote_addr;
	
	$SESSID = generate_SID();
	
	$SES_VAR = array();
	$SES_VAR['id_sessao'] =  $SESSID;
	

	$dados = array();
	$dados['id_sessao'] = $SESSID;
	$dados['estado'] = 1;
	$dados['data_expira'] = date('Y-m-d H:i:s', time() + $expired_date );
	$dados['user_agent'] = $user_agent;
	$dados['remote_ip'] = $remote_addr;
	
	executeInsert($conn, "sessao", $dados);
	
	setaCookieSessao();
}


function sess_start()
{
	global $SESSID, $chave_cookie_sessao, $SES_VAR, $conn, $expired_date, $user_agent, $remote_addr;
	
	if (!$SESSID) {
		criaNovaSessao();
		return;
	}
				
	//checa no banco de dados se a sessão existe
	$sql = "select id_sessao, data_expira, data_ultimo_acesso, estado, dados_sessao from sessao where id_sessao = :id_sessao and estado = 1";
	$stmt = $conn->prepare( $sql );
	$stmt->bindParam("id_sessao", $SESSID );
	$stmt->execute();
	
	if( $stmt->rowCount() > 0 ){
	
		while ($row = $stmt->fetch(PDO::FETCH_ASSOC, PDO::FETCH_ORI_NEXT)){
			
			//se a sessão expirou, cai fora...
			if ( time() > strtotime( $row['data_expira'] ) )
			{
				//deleta a sessao no banco (estado = 9)
				criaNovaSessao();
				return;
			}
			
			$SES_VAR = array();
			$SES_VAR['id_sessao'] = $SESSID;

			//arrayToGlobal(  $row ); antes decupava a sessão em globais...
			//agora parseia o jason em um array e devolve
			$dados_sessao = json_decode( $row['dados_sessao']   );
		   	
			if( count( $dados_sessao ) > 0   )			{
				copyArrayData($dados_sessao  , $SES_VAR);
			}
		
		}
	
	} else { //se a sessão ainda não está no banco de dados, não faz nada
		
		//cria uma nova sessão
		criaNovaSessao();
		
	}
}


/*
 * 
 *	Fecha a sessão e atualiza os dados. 
 * IMPORTANTE - se não executar isso, a sessão não pe persistida 
 * 
 */
function sess_close()
{
			global $SESSID, $SES_VAR, $conn, $user_agent, $_SERVER, $remote_addr;

			$dados = array();
			$dados_sessao = array();
			$condicao = array();
			
			while (list($key,$val)=each($SES_VAR) )
			{
				$val = $SES_VAR[ $key ];
			
				if( $key == "id_sessao") {
					$condicao['id_sessao'] = $val;
					
				} else if( $key == "data_ultimo_acesso") {
						$timestamp = time(); // Salva o timestamp atual numa variável
						$dados['data_ultimo_acesso'] = date('Y-m-d H:i:s', $timestamp);

				}	else if( $key == "data_expira") {
						$timestamp = time(); // Salva o timestamp atual numa variável
						//$dados['data_ultimo_acesso	'] = date('Y-m-d H:i:s', $timestamp);
						
				} else {
					$dados_sessao[ $key ] = $val;
					
				}
				
			}
			
			$dados['dados_sessao'] = json_encode(   $dados_sessao );
			$dados['user_agent'] = $user_agent;
			$dados['remote_ip'] = $remote_addr;
			
		    executeUpdate(  $conn  , "sessao", $dados, $condicao);

		    //Executa o log dos dados para tracking da sessão. Comentar essa parte para performance
		    /*
		    $dados = array();
		    $dados['id_sessao'] = $SES_VAR["id_sessao" ];
		    $dados['dados_enviados'] = json_encode( $_POST );
		    executeInsert($conn, "sessao_log", $dados);
			 */
}


function logout(){
	
	global $SES_VAR, $conn;
	
	$id_pessoa = $SES_VAR['id_pessoa'];
	
	$sql = "select id_sessao from sessao where dados_sessao like '%\"id_pessoa\":\"".$id_pessoa. "\"%' and estado = 1";
	$stmt = $conn->prepare($sql);
	$stmt->execute();
	
	if( $stmt->rowCount() > 0  ){
	
		while( 	$row = $stmt->fetch(PDO::FETCH_ASSOC, PDO::FETCH_ORI_NEXT) ){
	
			//invalida as sessões
			$sql = "delete from sessao where id_sessao = :id_sessao";
			$stmt = $conn->prepare($sql);
			$stmt->bindParam("id_sessao", $row['id_sessao'] );
			//var_dump( $stmt->execute() );
	
		}
	
		$sql = "update pessoa set ultimo_acesso = 0 where id_pessoa = :id_pessoa";
		$stmt = $conn->prepare($sql);
		$stmt->bindParam("id_pessoa", $id_pessoa );
		$stmt->execute();
		
		sess_reset();
		unset(  $SES_VAR );
		
	}
	

}

function sess_reset() {
	
	GLOBAL $chave_cookie_sessao, $SES_VAR, $conn ;
	
	unset($_COOKIE[$chave_cookie_sessao]);
	setcookie($chave_cookie_sessao, NULL, -1); 

	unset(  $SES_VAR['id_pessoa']  );
	
	if ( isset($SES_VAR['id_sessao'])  ){
	
		//desativa a sessão no banco de dados
		$dados= array();
		$dados['estado'] = 9;
	
		$condicao= array();
		$condicao['id_sessao'] = $SES_VAR['id_sessao'];
	
		executeUpdate( $conn, "sessao", $dados, $condicao);

		//echo "resetou";
		
	}
}


function checa_sessao_usuario_logado(){
	
	GLOBAL $SES_VAR;
		
	if( !isset( $SES_VAR['id_pessoa'] ) ){
		sess_reset();
	  	header('Location: index.php');
	}
		
	if( $SES_VAR['id_pessoa'] == 0 ) {
		sess_reset();
		header('Location: index.php');
	}
			
}


function checa_sessao_permite_servico(){
	
	GLOBAL $SES_VAR;
	
	if( !isset( $SES_VAR['id_pessoa'] ) ){
		sess_reset();
		return false;
	  	//header('Location: index.php');
	}
		
	if( $SES_VAR['id_pessoa'] == 0 ) {
		sess_reset();
		return false;
		//header('Location: index.php');
	}
	
	return true;
}


function checa_sessao_permissao_modulo( $modulo ){

	GLOBAL $SES_VAR;

	if( !isset( $SES_VAR['id_pessoa'] ) ){
		sess_reset();
		header('Location: index.php');
	}

	if( $SES_VAR['id_pessoa'] == 0 ) {
		sess_reset();
		header('Location: index.php');
	}

	//usuario livre só pode modulo 1
	if( $SES_VAR['id_pessoa'] == -1 && $modulo == 2 ) {
		header('Location: modulo1.php');
	}
	
}
	
?>