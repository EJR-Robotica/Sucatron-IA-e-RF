#!/usr/bin/env python

import os
import sys
import RPi.GPIO as GPIO
import time

print('Number of arguments:', len(sys.argv), 'arguments.')
print('Argument List:', str(sys.argv))

GPIO.setwarnings(False)

GPIO.setmode(GPIO.BCM)
GPIO.setup(23, GPIO.OUT)
GPIO.setup(24, GPIO.OUT)
GPIO.setup(17, GPIO.OUT)
GPIO.setup(22, GPIO.OUT)
GPIO.setup(9, GPIO.OUT)
GPIO.setup(11, GPIO.OUT)
GPIO.output(23, GPIO.LOW)
GPIO.output(24, GPIO.LOW)
GPIO.output(17, GPIO.LOW)
GPIO.output(22, GPIO.LOW)

def parar():
    GPIO.output(23, GPIO.LOW)
    GPIO.output(24, GPIO.LOW)
    GPIO.output(17, GPIO.LOW)
    GPIO.output(22, GPIO.LOW)
    GPIO.cleanup()

def desligar():
    GPIO.output(9, GPIO.LOW)
    GPIO.output(11, GPIO.LOW)
    GPIO.cleanup()

message = sys.argv[1]
try:
    timeout = float(sys.argv[2])
    timeout = timeout/1000
except ValueError:
    saying = " "
    parsed = sys.argv[2:]
    for word in parsed:
        saying = saying + word
    print(saying)
print("executando ")
print(message)
print(time)

if message == 'pf':
    GPIO.output(24, GPIO.LOW)
    GPIO.output(23, GPIO.HIGH)
    GPIO.output(22, GPIO.HIGH)
    GPIO.output(17, GPIO.LOW)

    time.sleep(timeout)
    parar()
elif message == 'pt':
    
    GPIO.output(24, GPIO.HIGH)
    GPIO.output(23, GPIO.LOW)
    GPIO.output(17, GPIO.HIGH)
    GPIO.output(22, GPIO.LOW)    
    time.sleep(timeout)
    parar()
elif message == 'pe':
    GPIO.output(23, GPIO.LOW)
    GPIO.output(24, GPIO.HIGH)
    GPIO.output(22, GPIO.HIGH)
    GPIO.output(17, GPIO.LOW)
    time.sleep(timeout)
    parar()
elif message == 'lde':
    GPIO.output(9, GPIO.HIGH)
    GPIO.output(11, GPIO.HIGH)
    time.sleep(timeout)
    desligar()
elif message == 'ld':
    GPIO.output(9, GPIO.HIGH)
    time.sleep(timeout)
    desligar()
elif message == 'le':
    GPIO.output(11, GPIO.HIGH)
    time.sleep(timeout)
    desligar()
elif message == 'off':
    desligar()
elif message == 'pd':
    GPIO.output(24, GPIO.LOW)
    GPIO.output(23, GPIO.HIGH)
    GPIO.output(17, GPIO.HIGH)
    GPIO.output(22, GPIO.LOW)
    time.sleep(timeout)
    parar()
elif message == 'f1':
    os.system('espeak "    ' + saying + '" -v  brazil -s130 -p60 -g2 -a100 2>/dev/null --stdout > output.mp3 && omxplayer output.mp3')
elif message == 'f2':
    os.system('espeak "' + saying + '" -v  en -s130 -p60 -g2 -a100 2>/dev/null --stdout > output.mp3 && omxplayer output.mp3')    
elif message == 'f3':
    os.system('espeak "' + saying + '" -v  en-us -s130 -p60 -g2 -a100 2>/dev/null --stdout > output.mp3 && omxplayer output.mp3')   
elif message == 'f4':
    os.system('espeak "' + saying + '" -v  es -s130 -p60 -g2 -a100 2>/dev/null --stdout > output.mp3 && omxplayer output.mp3') 
elif message == 'f5':
    os.system('espeak "' + saying + '" -v  de -s130 -p60 -g2 -a100 2>/dev/null --stdout > output.mp3 && omxplayer output.mp3')
elif message == 'bu' :
    os.system("omxplayer /var/www/html/audios/busina.mp3")  
elif message == 'a1' :
    os.system("omxplayer /var/www/html/audios/a1.mp3")
elif message == 'a2' :
    os.system("omxplayer /var/www/html/audios/a2.mp3")
elif message == 'a3':
    os.system("omxplayer /var/www/html/audios/a3.mp3")
elif message == 'a4':
    os.system("omxplayer /var/www/html/audios/a4.mp3")
elif message == 'a5':
    os.system("omxplayer /var/www/html/audios/a5.mp3")
elif message == 'a6':
    os.system("omxplayer /var/www/html/audios/a6.mp3")
elif message == 'a7':
    os.system("omxplayer /var/www/html/audios/a7.mp3")
elif message == 'a8':
    os.system("omxplayer /var/www/html/audios/a8.mp3")
elif message == 'a9':
    os.system("omxplayer /var/www/html/audios/a9.mp3")


