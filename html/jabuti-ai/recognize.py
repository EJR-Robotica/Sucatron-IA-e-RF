import os
import json
import random
import sys
import re
import subprocess
from pathlib import Path
from dotenv import load_dotenv
import openai
import time
import threading
import RPi.GPIO as GPIO

import sounddevice

from enum import Enum

from recorder import LiveSpeechRecognizer
from command_processor import process_command

led_pin = 8
class LedState(Enum):
    PISCA_100 = 1
    PISCA_500 = 2
    DESLIGADO = 3
    LIGADO = 4
led_state = LedState.DESLIGADO

GPIO.setmode(GPIO.BCM)
GPIO.setup(25, GPIO.IN, pull_up_down = GPIO.PUD_UP)

GPIO.setup(led_pin, GPIO.OUT)
GPIO.output(led_pin, GPIO.LOW)

# Pisca Led
def blink_led():
    global led_state
    global led_pin
    led_out = False
    while True:
        if led_state == LedState.DESLIGADO:
            GPIO.output(led_pin, GPIO.LOW)
            
        elif led_state == LedState.LIGADO:
            GPIO.output(led_pin, GPIO.HIGH)
        
        else:
            led_out = not led_out
            if led_out:
                GPIO.output(led_pin, GPIO.HIGH)
            else:
                GPIO.output(led_pin, GPIO.LOW)
            
            if led_state == LedState.PISCA_500:
                time.sleep(0.4)
        
        #Sempre tem um timer de 100ms para nao travar na thread        
        time.sleep(0.1)

habilitado = GPIO.LOW
desabilitado = GPIO.HIGH


print("Iniciando Jabuti AI")

while GPIO.input(25) == desabilitado:
    time.sleep(1)

time.sleep(2)

print("Jabuti AI Habilitado")

blink_thread = threading.Thread(target=blink_led)
led_state = LedState.PISCA_500
blink_thread.daemon = True
blink_thread.start()

# Função de interrupção que será chamada quando o pino 25 mudar de estado
def shutdown_callback(channel):
    print("Jabuti AI Desligado pelo botão")
    led_state = LedState.DESLIGADO
    time.sleep(1)

    sys.exit()

# Adicionando o evento de interrupção para o pino 25
GPIO.add_event_detect(25, GPIO.RISING, callback=shutdown_callback, bouncetime=300)

# Carregar as variáveis do ambiente a partir do arquivo .env
load_dotenv()
api_key = os.getenv('OPENAI_API_KEY')

if not api_key:
    print("OpenAI API key not found in environment variables.")
    sys.exit(1)

# Inicializar o cliente OpenAI
openai.api_key = api_key

audio_playing = False

recognizer = LiveSpeechRecognizer()

# Ler o conteúdo do arquivo system_role.txt
with open("system_role.txt", "r") as file:
    system_role_content = file.read().strip()

# Configurar o modelo GPT-4
messages = [
    {
        "role": "system",
        "content": system_role_content
    },
]

def detect_wakeup(command: str, wakeup_words: list[str]):
    command = re.sub(r"[,\.!?]", "", command.lower())

    for word in wakeup_words:
        word = re.sub(r"[,\.!?]", "", word.lower())
        if word in command:
            return True

    return False

def detect_sleep(command: str, sleep_words: list[str]):
    command = re.sub(r"[,\.!?]", "", command.lower())

    for word in sleep_words:
        word = re.sub(r"[,\.!?]", "", word.lower())
        if word in command:
            return True

    return False

def play_audio_file(filename):
    global audio_playing
    audio_playing = True
    with open(os.devnull, 'w') as devnull:
        subprocess.run(["mpg123", filename], stdout=devnull, stderr=devnull)
    audio_playing = False

def play_audio_file_in_background(filename):
    thread = threading.Thread(target=play_audio_file, args=(filename,))
    thread.daemon = True
    thread.start()
    
def process_command_in_background(response_text):
    thread = threading.Thread(target=process_command, args=(response_text,))
    thread.daemon = True
    thread.start()

def generate_and_save_audio(input_text, filename): 
    sanitized_input = input_text.replace("\n", " ").replace("\"", "\\\"") 
    with openai.audio.speech.with_streaming_response.create( 
        model="tts-1", 
        voice="nova", 
        input=sanitized_input, 
    ) as response:
        response.stream_to_file(filename) 
    return True

with open("wakeup_words.json", "r") as f:
    wakeup_words = json.load(f)

with open("sleep_words.json", "r") as f:
    sleep_words = json.load(f)

conversation_active = False
last_interaction_time = time.time()

try:
    while GPIO.input(25) == habilitado:
        if not conversation_active:
            
            led_state = LedState.PISCA_500
            
            for message in recognizer.live_speech():
                print(message)

                if message == "Erro de API; verifique sua conexão com a internet" or message == "Não foi possível entender a entrada de áudio":
                    continue

                if detect_wakeup(message, wakeup_words):
                    print(f"Detectado: {message}")
                    detected_files = os.listdir("sounds/detected")
                    detected_file = random.choice(detected_files)
                    sound_path = str(Path("sounds/detected") / detected_file)
                    play_audio_file(sound_path)
                    conversation_active = True
                    last_interaction_time = time.time()
                    break
        else:
            
            led_state = LedState.PISCA_100
            
            for message in recognizer.live_speech(50):
                print(message)
                
                current_time = time.time()
                if current_time - last_interaction_time > 60:
                    print("Tempo de inatividade excedido. Voltando ao modo de espera...")
                    conversation_active = False
                    break


                if message == "Erro de API; verifique sua conexão com a internet" or message == "Não foi possível entender a entrada de áudio":
                    continue
                    
                led_state = LedState.LIGADO

                last_interaction_time = time.time()
                
                if detect_sleep(message, sleep_words):
                    response = "Tchau, até depois"
                    print(response)
                    generate_and_save_audio(response, "sounds/response.mp3")
                    play_audio_file("sounds/response.mp3")
                    os.remove("sounds/response.mp3")
                    conversation_active = False
                    break

                processing_files = os.listdir("sounds/processing")
                processing_file = random.choice(processing_files)
                sound_path = str(Path("sounds/processing") / processing_file)
                play_audio_file_in_background(sound_path)
                messages.append({"role": "user", "content": message})
                
                response = openai.chat.completions.create(
                    model="gpt-4o-mini",
                    messages=messages
                )

                response_text = response.choices[0].message.content
                print(f"ChatGPT: {response_text}")

                messages.append({"role": "assistant", "content": response_text})

                response_filename = "sounds/response.mp3"
                generate_and_save_audio(response_text, response_filename)
                
                process_command_in_background(response_text)
                
                #while audio_playing:
                    #time.sleep(0.1)
                play_audio_file(response_filename)
                os.remove(response_filename)
                
                break

    

except Exception as e:
    print(f"Erro: {e}")
finally:
     # Remove o evento de interrupção antes de limpar o GPIO
    GPIO.remove_event_detect(25)
    
    # Limpa o GPIO e garante que o LED esteja desligado
    GPIO.cleanup()
    GPIO.output(led_pin, GPIO.LOW)
    
    print("Jabuti AI Desligado")
    time.sleep(1)
    sys.exit()
