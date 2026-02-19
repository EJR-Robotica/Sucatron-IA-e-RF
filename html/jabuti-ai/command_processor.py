import re
import subprocess
import shlex

def process_command(response_text: str):
	#match = re.match(r"(andar para (frente|tras)|virar a (direita|esquerda)) por (\d+) segundo(s?)",command)
	
	pattern = r'(\w{2,3})\s(\d+);'
	comandos = re.findall(pattern,response_text)
	
	for comando, valor in comandos:
		print(f'Executando {comando} {valor}')
		call_interpreter(comando,valor)
	return True
	
	if match:
		action = match.group(1)
		time_in_seconds = int(match.group(3))
		time_in_milliseconds = time_in_seconds * 1000
		
		if "andar" in command and "frente" in command:
			call_interpreter("pf",time_in_milliseconds)
		if "andar" in command and "tras" in command:
			call_interpreter("pt",time_in_milliseconds)
		if "virar" in command and "direita" in command:
			call_interpreter("pd",time_in_milliseconds)
		if "virar" in command and "esquerda" in command:
			call_interpreter("pe",time_in_milliseconds)
		return True
	return False
	
def call_interpreter(action,timeout):
	command = f"python3 ../services/interpreter.py {shlex.quote(action)} {shlex.quote(str(timeout))}"
	
	try:
		subprocess.run(command,shell=True,check=True)
		print(f"Interpretador chamado com acao = {action} e tempo = {timeout}")
	except subprocess.CalledProcessError as e:
		print(f"Erro na chamada do interpreter.py: {e}")
