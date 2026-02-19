<?php

header('Content-Type: text/html; charset=utf-8');

//Tipo de banco de dados
$DBTYPE_MYSQL	=	1;
$DBTYPE_SQLITE	=	2;

//Tipo de dados
$FIELD_TYPE_INT 	= 1;
$FIELD_TYPE_NUMBER	= 2;
$FIELD_TYPE_JSON	= 3;
$FIELD_TYPE_STRING	= 4;
$FIELD_TYPE_TEXT	= 5;

//Tipo de usuario
$PESSOA_TIPO_ROOT			=	1;
$PESSOA_TIPO_ADMIN			=	2;
$PESSOA_TIPO_USUARIO		=	3;

//Tipo de registro do sistema
$LOG_ACESSO_SUCESSO 	= 1;
$LOG_ACESSO_FALHA 		= 2;
$LOG_ACESSO_LOGOUT 		= 14;

//Tabelas e campos permitidos no arqivo get Imagem
$get_image_tabelas = array();
$get_image_campos = array();

?>
