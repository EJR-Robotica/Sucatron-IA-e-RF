import openai
from dotenv import load_dotenv
import os
import subprocess

# Carregar as variáveis do ambiente a partir do arquivo .env
load_dotenv()
api_key = os.getenv('OPENAI_API_KEY')

# Função para chamar o curl
def generate_and_save_audio(input_text, filename):
    sanitized_input = input_text.replace("\n", " ").replace("\"", "\\\"")
    curl_command = [
        "curl", "https://api.openai.com/v1/audio/speech",
        "-H", f"Authorization: Bearer {api_key}",
        "-H", "Content-Type: application/json",
        "-d", f'{{"model": "tts-1", "input": "{sanitized_input}", "voice": "nova", "response_format": "mp3"}}',
        "--output", filename
    ]
    subprocess.run(curl_command)

# Listas de frases
detected_phrases = [
    "Oi! Pode falar!", "Estou ouvindo, diga algo!", "Pronto para te ouvir!", "Fale, estou aqui!",
    "Sim, pode falar!", "Estou pronto, o que você tem a dizer?", "Pode falar agora!",
    "Estou ouvindo você, pode começar.", "Vamos lá, diga o que precisa!", "Estou aqui, pode falar."
]

processing_phrases = [
    "Hmm, deixa eu pensar...", "Estou processando sua pergunta...", "Só um momento, estou pensando...",
    "Deixa eu ver...", "Estou analisando isso...", "Aguarde um momento enquanto penso...",
    "Processando sua resposta...", "Um instante, estou verificando...", "Estou trabalhando nisso...",
    "Só um instante, por favor..."
]

# Certifique-se de que o diretório "sounds/detected" e "sounds/processing" existem
os.makedirs("sounds/detected", exist_ok=True)
os.makedirs("sounds/processing", exist_ok=True)

# Gerar e salvar áudios para "detected"
for i, text in enumerate(detected_phrases):
    filename = f"sounds/detected/detected_{i+1}.mp3"
    generate_and_save_audio(text, filename)

# Gerar e salvar áudios para "processing"
for i, text in enumerate(processing_phrases):
    filename = f"sounds/processing/processing_{i+1}.mp3"
    generate_and_save_audio(text, filename)

