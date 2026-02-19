<?php 

include_once '../include/config.php';
include_once '../include/constantes.php';
include_once '../include/functions.php';
include_once '../include/database.php';
include_once '../include/sessao.php';



//$vars=$_POST["vars"];
//$conteudo=$_POST["conteu"];
$vars ="#fala1 = Oi";
$conteudo="PT 10 F1 #fala1";

$conteudo2=$conteudo;
//$conteudo2 = str_replace("\n", " \n", $conteudo2);
//$vars = str_replace("\n", " \n", $vars);





for ($i=0;$i<$qtd_caracteres;$i++) {
	echo "$i ";
	$char =  substr($vars, $i,1);
	if ($char=='#') {
		$vtemp.=$char;
		for ($j=$i+1;$j<=$qtd_caracteres;$j++) {
			$char2 =  substr($vars, $j,1);
			if($char2=='=') {
				$i=$j-1;
				$j=$qtd_caracteres;
			} else {
				$vtemp.=$char2;
			}
		}
	}
	if ($char=='=') {
		for ($k=$i+1;$k<=$qtd_caracteres;$k++) {
			$char2 =  substr($vars, $k,1);
			if($char2=='#') {
				$i=$k-1;
				$k=$qtd_caracteres;
			} else {
				$rtemp.=$char2;
			}
		}
	}
	if(($vtemp!="")&&($rtemp!="")) {
		$conteudo2 = str_replace("$vtemp", "$rtemp", $conteudo2);
		$temp.="($vtemp = $rtemp)";
		echo "6";

		$vtemp="";
		$rtemp="";


		
	}
	
}

	
		echo  "$temp";


	
?>