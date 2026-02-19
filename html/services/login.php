<?php 

include_once '../include/config.php';
include_once '../include/constantes.php';
include_once '../include/functions.php';
include_once '../include/database.php';
include_once '../include/sessao.php';


sess_reset();


$login = getFieldFromPage('login', $FIELD_TYPE_STRING);
$senha = md5(getFieldFromPage('senha', $FIELD_TYPE_STRING));
$id_modulo = getFieldFromPage('id_modulo', $FIELD_TYPE_STRING);


//echo $senha."-".$login."-".$id_modulo."-".$_GET['senha'];

$stmt = $conn->prepare("select id_pessoa, nome, id_pessoa_tipo, id_modulo,equipe from pessoa where id_pessoa = :login and senha = :senha;");
$stmt->bindValue("login", $login );
$stmt->bindValue("senha", $senha );
$stmt->execute();


if( $stmt->rowCount() > 0 ){
    
    while ($row = $stmt->fetch(PDO::FETCH_OBJ, PDO::FETCH_ORI_NEXT)){
        
        //Verifica o modelo configurado. 
        $res = $conn->prepare("SELECT * FROM configuracao WHERE id_configuracao = 1");
        $res->execute();
        while ($linha = $res->fetch(PDO::FETCH_OBJ, PDO::FETCH_ORI_NEXT)){
            $modelo = $linha->modelo;
        }
        
        //Verifica se o usuário tem equipamento padrão definido
        $id=$row->id_pessoa;
        $equipe=$row->equipe;
        $res = $conn->prepare("SELECT equipamento_padrao FROM pessoa WHERE id_pessoa =:id_pessoa");
        $res->bindParam("id_pessoa", $id );
        $res->execute();
        while ($linha = $res->fetch(PDO::FETCH_OBJ, PDO::FETCH_ORI_NEXT)){
            $equipamento = $linha->equipamento_padrao;
        }

        $id_pessoa = $row->id_pessoa;



        //atualiza o modulo da pessoa
        $sql = "update pessoa set id_modulo= :id_modulo, ultimo_acesso = now() where id_pessoa = :id_pessoa;";
        $stmt2 = $conn->prepare($sql);
        $stmt2->bindValue("id_modulo", $id_modulo );
        $stmt2->bindParam("id_pessoa", $id_pessoa );
        $stmt2->execute();


        //verifica se o registro do modulo existe na tabela pessoa_modulo
        $stmt2 = $conn->prepare("select id_pessoa, id_modulo from pessoa_modulo where  id_modulo= :id_modulo and id_pessoa = :id_pessoa;");
        $stmt2->bindParam("id_modulo", $id_modulo );
        $stmt2->bindParam("id_pessoa", $id_pessoa );
        $stmt2->execute();

        //Se não existir o registro, cria um novo vazio
        if( $stmt2->rowCount() == 0 ){
            $sql = "insert into pessoa_modulo( id_pessoa, id_modulo, conteudo) values (  :id_pessoa, :id_modulo, '' );";
            $stmt2 = $conn->prepare($sql);
            $stmt2->bindValue("id_modulo", $id_modulo );
            $stmt2->bindValue("id_pessoa", $id_pessoa );
            $stmt2->execute();
        }


        if ($modelo==1 ) {

            sess_start();

            $SES_VAR['id_pessoa']= $id_pessoa;
            $SES_VAR['nome_pessoa']= utf8_encode(  $row->nome );
            $SES_VAR['id_pessoa_tipo'] = $row->id_pessoa_tipo;
            $SES_VAR['id_modulo']= $id_modulo;


            if (($id_modulo==-1)&&(($login!=1)&&($login!=-1)))          {
                echo '{"result":"Você não tem permissão para acessar o Painel de Controle!"}'; 
                exit;
            } else {
                $resultado = 1;
                $result['result'] = $resultado;
            }

            echo json_encode( $result );

            sess_close();

            exit; 

        } else if ($modelo==2) {



            //Se for um usuario administrador deixa logar
            if (($login!=1)&&($login!=-1)) {
                
                //Verifica se o usuario tem uma equipe definida
                $res = $conn->prepare("SELECT * FROM pessoa WHERE id_pessoa =$login ");
                $res->execute();
                while ($linha = $res->fetch(PDO::FETCH_OBJ, PDO::FETCH_ORI_NEXT)){
                    $equipe = $linha->equipe;
                }
                if ($equipe=="") { //Não tem equipe
                    echo '{"result":"Você não tem uma equipe definida. Entre em contato com um administrador para ter acesso a plataforma! (eloirjr@gmail.com)"}'; 
                    exit;
                } else { //tem equipe
                    //Verifica se o usuario é um mediador
                    $res = $conn->prepare("SELECT * FROM equipes WHERE mediador =$login ");
                    $res->execute();
                    while ($linha = $res->fetch(PDO::FETCH_OBJ, PDO::FETCH_ORI_NEXT)){
                        $mediador = $linha->mediador;
                    }
                    if ($mediador=="") { //Se for usuário normal deve ter equipamento vinculado


                        //Verifica se o usuário tem equipamento definido
                        $id=$row->id_pessoa;
                        $res = $conn->prepare("SELECT equipamento_padrao FROM pessoa WHERE id_pessoa =:id_pessoa");
                        $res->bindParam("id_pessoa", $id );
                        $res->execute();
                        while ($linha = $res->fetch(PDO::FETCH_OBJ, PDO::FETCH_ORI_NEXT)){
                            $equipamento = $linha->equipamento_padrao;
                        }
                        if ($equipamento=="") {
                            echo '{"result":"Solicite a um mediador que vincule um equipamento ao seu usuário!"}'; 
                            exit;
                        } else {
                            //echo '{"result":"entrou aqui ('; echo "SELECT * FROM equipes WHERE mediador =$login "; echo ')"}'; exit;
                            if ($id_modulo==-1) {
                                echo '{"result":"Você não tem permissão para acessar o Painel de Controle."}'; 
                                exit;
                            }                            

                        }
                    } else { //se for um mediador só pode logar no módulo painel de controle
                        

                        if ($id_modulo!=-1) {
                            echo '{"result":"Você é mediador. Só pode entrar no PAINEL DE CONTROLE com este usuário."}'; 
                            exit;
                        }
                    }
                }
            }

            //echo '{"result":"tudo certo"}'; 
            //exit;

            sess_start();

            $SES_VAR['id_pessoa']= $id_pessoa;
            $SES_VAR['nome_pessoa']= utf8_encode(  $row->nome );
            $SES_VAR['id_pessoa_tipo'] = $row->id_pessoa_tipo;
            $SES_VAR['id_modulo']= $id_modulo;

            echo '{"result":"1"}'; 
            sess_close();
            exit; 


        }
    }
} else {
    echo '{"result":"ID ou Senha incorreto(a)!"}';  
    exit;
}

?>
