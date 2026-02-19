var postou;

function executa_instrucao( comando ){
		
	if( !postou ){
		//alert("executa");
		postou = true;
	
                //Verifica se o usuário tem flag para enviar direto seu código
                id_pessoa=$('#id_pessoa').val();
                id_modulo=$('#id_modulo').val();
                $.ajax({
                    async: false,
                    type: "POST",
                    url: "services/getBandeiraDireto.php",
                    dataType: "json",
                    data: { 
                        id:id_pessoa
                    },
                    error: function(result) {
                        if( debug )
                            alert('ERRO DO SISTEMA: ' + e.responseText);
                    },
                    success: function(result) {
                        //alert("Autonomia:"+result);
                        if (result==1) {
                            $.ajax({
                                async: true,
                                type: "POST",
                                url: "/services/pi_proxy.php",
                                dataType: "json",
                                data: {"comando":comando },
                                error: function(e) {
                                    postou = false;	
                                    //alert("executou");
                                },
                                success: function(result) {
                                    postou = false;
                                    //alert("Não executou");
                                }
                            });
                        } else {
                            alert("Solicitar autorização ao mediador!");
                            enviado = true;
                            alterado = false;
                        }
                    }
                });        

        
		
	
	}
}
