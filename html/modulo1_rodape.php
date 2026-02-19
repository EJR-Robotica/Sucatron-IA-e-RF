	<div id="painel_esquerdo">

		<div>	
			<div id="pe_esquerdo">
                            <img class="btn" id="btn_seta_esquerda" src="imagens/seta_esquerda.png" onmousedown="executa_esquerda();">
			</div>
		
			<div id="pe_centro">
                            <!--
                            <option value="1">10º</option>
                            <option value="2.7">45º</option>
                            <option value="5.4">90º</option>
                            <option value="10.8">180º</option>
                            <option value="22.5">360º</option>
                            -->
                            <select id="grau_giro" class="">
                            </select>
			</div>
		
			<div id="pe_direito">
				<img class="btn" id="btn_seta_direita" src="imagens/seta_direita.png" onmousedown="executa_direita();">
			</div>
		</div>
		
		<div style="clear: both;"></div>
		
		<div style="text-align: center;">
			<img  class="btn" id="btn_buzina" src="imagens/botao_buzina.png" onmousedown="buzina();">
			<img  class="btn" id="btn_le" src="imagens/botao_le.png" onmousedown="led_esquerdo();">
			<img  class="btn" id="btn_ld" src="imagens/botao_ld.png" onmousedown="led_direito();">
		</div>
	
		<div style="text-align: center; width: 100%; height: 64px;">
                    <input type="text" value="" id="texto_fala" name="texto_fala" style="font-size: 14pt" class="campopadrao"><br>
                        <img class="btn" src="imagens/speaker.png" width="96" height="60" id="btn_fala" onmousedown="fala();">
			   

		</div>
	
	</div>

	
	<div id="painel_direito">
		<div id="pd_cima">
			<img class="btn" id="btn_seta_frente" src="imagens/seta_frente.png"  onmousedown="executa_frente();">
		</div>
	
		<div id="pd_centro">
			<select id="quanto_andar">
			</select>
		</div>
	
		<div id="pd_baixo">
			<img class="btn" id="btn_seta_tras" src="imagens/seta_tras.png" onmousedown="executa_tras();">
		</div>
	
	</div>
	
</div>
<input type="hidden" name="id_pessoa" id="id_pessoa" value="<?php echo $id_pessoa; ?>">
<input type="hidden" name="id_modulo" id="id_modulo" value="<?php echo $id_modulo; ?>">



<?php include_once 'footer.php'; ?>
