#!/usr/bin/env python3
"""
Sucatron - Controle de motores via RF
Lê os 4 canais do receptor QF-1688R (via divisor de tensão + GPIO)
e controla os motores pelo L298N.

Pinagem GPIO (BCM):
  RF FRENTE   -> GPIO26 (pino físico 37)
  RF TRAS     -> GPIO20 (pino físico 38)
  RF ESQUERDA -> GPIO16 (pino físico 36)
  RF DIREITA  -> GPIO21 (pino físico 40)
  GND comum   -> pino físico 39

  L298N IN1   -> GPIO7
  L298N IN2   -> GPIO8
  L298N ENA   -> GPIO18 (PWM motor A - esquerdo)
  L298N IN3   -> GPIO23
  L298N IN4   -> GPIO24
  L298N ENB   -> GPIO19 (PWM motor B - direito)
"""

import RPi.GPIO as GPIO
import time

# ── Pinos RF (entradas) ──────────────────────────────────────────────
RF_FRENTE    = 26   # pino 37
RF_TRAS      = 20   # pino 38
RF_ESQUERDA  = 16   # pino 36
RF_DIREITA   = 21   # pino 40

# ── Pinos L298N (saídas) ─────────────────────────────────────────────
IN1 = 7    # Motor A (esquerdo) - direção
IN2 = 8
ENA = 18   # Motor A - PWM

IN3 = 23   # Motor B (direito) - direção
IN4 = 24
ENB = 19   # Motor B - PWM

# ── Velocidade (0 a 100) ─────────────────────────────────────────────
VELOCIDADE = 80

# ── Debounce (segundos) ───────────────────────────────────────────────
DEBOUNCE = 0.05  # 50ms — ignora transições mais rápidas que isso

# ── Setup GPIO ───────────────────────────────────────────────────────
GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

# Entradas RF com pull-down interno
GPIO.setup(RF_FRENTE,   GPIO.IN, pull_up_down=GPIO.PUD_DOWN)
GPIO.setup(RF_TRAS,     GPIO.IN, pull_up_down=GPIO.PUD_DOWN)
GPIO.setup(RF_ESQUERDA, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)
GPIO.setup(RF_DIREITA,  GPIO.IN, pull_up_down=GPIO.PUD_DOWN)

# Saídas L298N
GPIO.setup(IN1, GPIO.OUT)
GPIO.setup(IN2, GPIO.OUT)
GPIO.setup(ENA, GPIO.OUT)
GPIO.setup(IN3, GPIO.OUT)
GPIO.setup(IN4, GPIO.OUT)
GPIO.setup(ENB, GPIO.OUT)

# PWM
pwm_a = GPIO.PWM(ENA, 1000)
pwm_b = GPIO.PWM(ENB, 1000)
pwm_a.start(0)
pwm_b.start(0)


# ── Funções dos motores ──────────────────────────────────────────────

def motor_esquerdo(direcao, vel=VELOCIDADE):
    """direcao: 'frente', 'tras', 'parar'"""
    if direcao == 'frente':
        GPIO.output(IN1, GPIO.HIGH)
        GPIO.output(IN2, GPIO.LOW)
        pwm_a.ChangeDutyCycle(vel)
    elif direcao == 'tras':
        GPIO.output(IN1, GPIO.LOW)
        GPIO.output(IN2, GPIO.HIGH)
        pwm_a.ChangeDutyCycle(vel)
    else:
        GPIO.output(IN1, GPIO.LOW)
        GPIO.output(IN2, GPIO.LOW)
        pwm_a.ChangeDutyCycle(0)

def motor_direito(direcao, vel=VELOCIDADE):
    """direcao: 'frente', 'tras', 'parar'"""
    if direcao == 'frente':
        GPIO.output(IN3, GPIO.HIGH)
        GPIO.output(IN4, GPIO.LOW)
        pwm_b.ChangeDutyCycle(vel)
    elif direcao == 'tras':
        GPIO.output(IN3, GPIO.LOW)
        GPIO.output(IN4, GPIO.HIGH)
        pwm_b.ChangeDutyCycle(vel)
    else:
        GPIO.output(IN3, GPIO.LOW)
        GPIO.output(IN4, GPIO.LOW)
        pwm_b.ChangeDutyCycle(0)

def parar():
    motor_esquerdo('parar')
    motor_direito('parar')

def frente():
    motor_esquerdo('frente')
    motor_direito('frente')

def tras():
    motor_esquerdo('tras')
    motor_direito('tras')

def girar_esquerda():
    motor_esquerdo('tras')
    motor_direito('frente')

def girar_direita():
    motor_esquerdo('frente')
    motor_direito('tras')


# ── Loop principal ───────────────────────────────────────────────────

# Estado estável anterior de cada canal
estado_anterior = {RF_FRENTE: 0, RF_TRAS: 0, RF_ESQUERDA: 0, RF_DIREITA: 0}
# Momento da última leitura diferente
tempo_mudanca  = {RF_FRENTE: 0, RF_TRAS: 0, RF_ESQUERDA: 0, RF_DIREITA: 0}
# Leitura pendente (ainda não confirmada)
leitura_raw    = {RF_FRENTE: 0, RF_TRAS: 0, RF_ESQUERDA: 0, RF_DIREITA: 0}

def ler_debounce():
    """Retorna o estado estável dos 4 canais após debounce."""
    agora = time.time()
    for pino in [RF_FRENTE, RF_TRAS, RF_ESQUERDA, RF_DIREITA]:
        raw = GPIO.input(pino)
        if raw != leitura_raw[pino]:
            leitura_raw[pino] = raw
            tempo_mudanca[pino] = agora
        if (agora - tempo_mudanca[pino]) >= DEBOUNCE:
            estado_anterior[pino] = leitura_raw[pino]
    return (estado_anterior[RF_FRENTE],
            estado_anterior[RF_TRAS],
            estado_anterior[RF_ESQUERDA],
            estado_anterior[RF_DIREITA])

print("Sucatron RF - Aguardando comandos... (Ctrl+C para sair)")
print(f"Velocidade: {VELOCIDADE}%")

ultimo_cmd = ""

try:
    while True:
        f, t, e, d = ler_debounce()

        if f:
            if ultimo_cmd != "FRENTE":
                print("FRENTE")
                ultimo_cmd = "FRENTE"
            frente()
        elif t:
            if ultimo_cmd != "TRAS":
                print("TRAS")
                ultimo_cmd = "TRAS"
            tras()
        elif e:
            if ultimo_cmd != "ESQUERDA":
                print("ESQUERDA")
                ultimo_cmd = "ESQUERDA"
            girar_esquerda()
        elif d:
            if ultimo_cmd != "DIREITA":
                print("DIREITA")
                ultimo_cmd = "DIREITA"
            girar_direita()
        else:
            if ultimo_cmd != "":
                print("PARADO")
                ultimo_cmd = ""
            parar()

        time.sleep(0.01)

except KeyboardInterrupt:
    print("\nEncerrando...")

finally:
    parar()
    pwm_a.stop()
    pwm_b.stop()
    GPIO.cleanup()
    print("GPIO limpo. Tchau!")
