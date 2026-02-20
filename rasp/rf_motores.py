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
VELOCIDADE    = 80
KICK_VEL      = 100   # duty cycle durante o kick (%)
KICK_TEMPO    = 0.15  # duração do kick em segundos
RAMP_STEP     = 10    # incremento de PWM por passo no ramp
RAMP_DELAY    = 0.01  # tempo entre passos do ramp (segundos)

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

def ramp_up(pwm, vel_alvo):
    """Sobe PWM gradualmente de 0 até vel_alvo para reduzir back-EMF."""
    for v in range(0, vel_alvo + 1, RAMP_STEP):
        pwm.ChangeDutyCycle(v)
        time.sleep(RAMP_DELAY)
    pwm.ChangeDutyCycle(vel_alvo)

def ramp_down(pwm, vel_atual):
    """Desce PWM gradualmente até 0 para reduzir pico de back-EMF."""
    for v in range(vel_atual, -1, -RAMP_STEP):
        pwm.ChangeDutyCycle(v)
        time.sleep(RAMP_DELAY)
    pwm.ChangeDutyCycle(0)

def kick(pwm, vel_alvo):
    """Pulso de 100% por KICK_TEMPO para vencer a inércia, depois ramp até vel_alvo."""
    pwm.ChangeDutyCycle(KICK_VEL)
    time.sleep(KICK_TEMPO)
    pwm.ChangeDutyCycle(vel_alvo)

def motor_esquerdo(direcao, vel=VELOCIDADE, kickstart=False):
    """direcao: 'frente', 'tras', 'parar'"""
    if direcao == 'frente':
        GPIO.output(IN1, GPIO.HIGH)
        GPIO.output(IN2, GPIO.LOW)
        if kickstart:
            kick(pwm_a, vel)
        else:
            ramp_up(pwm_a, vel)
    elif direcao == 'tras':
        GPIO.output(IN1, GPIO.LOW)
        GPIO.output(IN2, GPIO.HIGH)
        if kickstart:
            kick(pwm_a, vel)
        else:
            ramp_up(pwm_a, vel)
    else:
        ramp_down(pwm_a, VELOCIDADE)
        GPIO.output(IN1, GPIO.LOW)
        GPIO.output(IN2, GPIO.LOW)

def motor_direito(direcao, vel=VELOCIDADE, kickstart=False):
    """direcao: 'frente', 'tras', 'parar'"""
    if direcao == 'frente':
        GPIO.output(IN3, GPIO.HIGH)
        GPIO.output(IN4, GPIO.LOW)
        if kickstart:
            kick(pwm_b, vel)
        else:
            ramp_up(pwm_b, vel)
    elif direcao == 'tras':
        GPIO.output(IN3, GPIO.LOW)
        GPIO.output(IN4, GPIO.HIGH)
        if kickstart:
            kick(pwm_b, vel)
        else:
            ramp_up(pwm_b, vel)
    else:
        ramp_down(pwm_b, VELOCIDADE)
        GPIO.output(IN3, GPIO.LOW)
        GPIO.output(IN4, GPIO.LOW)

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

print("Sucatron RF - Aguardando comandos... (Ctrl+C para sair)")
print(f"Velocidade: {VELOCIDADE}%")

ultimo_cmd = ""

try:
    while True:
        f = GPIO.input(RF_FRENTE)
        t = GPIO.input(RF_TRAS)
        e = GPIO.input(RF_ESQUERDA)
        d = GPIO.input(RF_DIREITA)

        if f:
            novo = ultimo_cmd != "FRENTE"
            if novo:
                print("FRENTE")
                ultimo_cmd = "FRENTE"
            motor_esquerdo('frente', kickstart=novo)
            motor_direito('frente',  kickstart=novo)
        elif t:
            novo = ultimo_cmd != "TRAS"
            if novo:
                print("TRAS")
                ultimo_cmd = "TRAS"
            motor_esquerdo('tras', kickstart=novo)
            motor_direito('tras',  kickstart=novo)
        elif e:
            novo = ultimo_cmd != "ESQUERDA"
            if novo:
                print("ESQUERDA")
                ultimo_cmd = "ESQUERDA"
            motor_esquerdo('tras',   kickstart=novo)
            motor_direito('frente',  kickstart=novo)
        elif d:
            novo = ultimo_cmd != "DIREITA"
            if novo:
                print("DIREITA")
                ultimo_cmd = "DIREITA"
            motor_esquerdo('frente', kickstart=novo)
            motor_direito('tras',    kickstart=novo)
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
