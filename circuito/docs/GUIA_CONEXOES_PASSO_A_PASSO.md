# SUCATRON - GUIA DE CONEXOES PASSO A PASSO
## Bateria: 12V de moto | Resistores: 1kΩ

---

## LISTA DO QUE VOCE PRECISA

```
Ja tenho:
  [x] Raspberry Pi 3
  [x] QF-1688R-45-1-2.4G (receptor RF)
  [x] Controle remoto 2.4G
  [x] 4 reles com diodos (ja montados nos cabos)
  [x] L298N (placa vermelha)
  [x] 2 motores DC
  [x] Resistores de 1kΩ (precisa de pelo menos 16)
  [x] Fios/jumpers

Preciso arranjar:
  [ ] Bateria 12V de moto
  [ ] Regulador de tensao 5V (modulo buck DC-DC, pelo menos 3A)
      Exemplo: LM2596 (custa ~R$8 no Mercado Livre)
```

---

## PASSO 1 - ALIMENTACAO (primeiro de tudo!)

Antes de ligar qualquer coisa, monta a parte da energia.

```
    BATERIA 12V DE MOTO
    ┌─────┬─────┐
    │  +  │  -  │
    └──┬──┴──┬──┘
       │     │
       │     │
   VERMELHO  PRETO
       │     │
       ├─────┼──────────────────────────────────────────┐
       │     │                                          │
       │     │    REGULADOR BUCK LM2596                 │
       │     │    ┌─────────────────────┐               │
       │     │    │                     │               │
       ├─────┼───▶│  IN+    OUT+ ──────▶│──── FIO VERMELHO ──▶ 5V
       │     │    │                     │                       (pra Rasp e QF-1688)
       │     └───▶│  IN-    OUT- ──────▶│──── FIO PRETO ──────▶ GND
       │          │                     │
       │          └─────────────────────┘
       │
       │    *** ANTES de ligar a Rasp, gire o trimpot do LM2596
       │    *** ate o multimetro marcar 5.0V ~ 5.1V na saida!
       │
       │
       ├──── FIO VERMELHO GROSSO ──────▶ L298N pino "+12V"
       │
       └──── (o positivo vai pra 2 lugares: regulador E L298N)


    RESUMO DO PASSO 1:
    ┌───────────────┬──────────────────────────────┐
    │ BATERIA 12V + │ ──▶ Regulador IN+            │
    │               │ ──▶ L298N pino +12V          │
    ├───────────────┼──────────────────────────────┤
    │ BATERIA 12V - │ ──▶ Regulador IN-            │
    │               │ ──▶ L298N pino GND           │
    │               │ ──▶ Rasp Pi GND              │
    │               │ ──▶ QF-1688R GND             │
    │               │ (todos os GNDs juntos!)       │
    └───────────────┴──────────────────────────────┘
```

### Teste do Passo 1:
```
    Com multimetro:
    - Mede entre OUT+ e OUT- do regulador = deve dar 5.0V
    - Mede entre +12V e GND do L298N = deve dar ~12V
    - Se OK, vai pro passo 2
```

---

## PASSO 2 - LIGAR A RASPBERRY PI

```
    Saida do regulador 5V:

    OUT+ (5V) ──── FIO VERMELHO ──▶ Rasp Pi pino fisico 2 (5V)
    OUT- (GND) ─── FIO PRETO ────▶ Rasp Pi pino fisico 6 (GND)


    HEADER DA RASP (vista de cima, com USB pra baixo):

         ┌─────────────────────┐
         │ (3V3)  1 ●  ● 2  (5V) ◀── regulador OUT+ (vermelho)
         │        3 ●  ● 4  (5V)
         │        5 ●  ● 6  (GND) ◀── regulador OUT- (preto)
         │        7 ●  ● 8
         │  (GND) 9 ●  ● 10
         │       11 ●  ● 12
         │       13 ●  ● 14 (GND)
         │       15 ●  ● 16
         │ (3V3) 17 ●  ● 18
         │       19 ●  ● 20 (GND)
         │       21 ●  ● 22
         │       23 ●  ● 24
         │ (GND) 25 ●  ● 26
         │       27 ●  ● 28
         │       29 ●  ● 30 (GND)
         │       31 ●  ● 32
         │       33 ●  ● 34 (GND)
         │       35 ●  ● 36
         │       37 ●  ● 38
         │ (GND) 39 ●  ● 40
         └─────────────────────┘
              (portas USB)
```

### Teste do Passo 2:
```
    - A Rasp deve ligar (LED vermelho acende)
    - Se nao ligar: verifica se o regulador ta dando 5V
    - Se ligar: vai pro passo 3
```

---

## PASSO 3 - LIGAR O L298N NA RASPBERRY PI

Sao 6 fios da Rasp pro L298N:

```
    RASPBERRY PI                          L298N
    (pino fisico → GPIO)                  (pinos da placa)
    ═══════════════════                   ═════════════════

    Pino 26 (GPIO7)  ── fio ──────────▶  IN1
    Pino 24 (GPIO8)  ── fio ──────────▶  IN2
    Pino 12 (GPIO18) ── fio ──────────▶  ENA  (remover o jumper!)

    Pino 16 (GPIO23) ── fio ──────────▶  IN3
    Pino 18 (GPIO24) ── fio ──────────▶  IN4
    Pino 35 (GPIO19) ── fio ──────────▶  ENB  (remover o jumper!)

    Pino 6 (GND)     ── fio ──────────▶  GND  (se ainda nao ligou)


    NO L298N:
    ┌──────────────────────────────────────────────────────────┐
    │                                                          │
    │   [ENA]  [IN1]  [IN2]  [IN3]  [IN4]  [ENB]              │
    │     ▲      ▲      ▲      ▲      ▲      ▲                │
    │     │      │      │      │      │      │                │
    │   GPIO18 GPIO7  GPIO8  GPIO23 GPIO24 GPIO19              │
    │                                                          │
    │                    ┌──────────┐                           │
    │   OUT1 ──── fio ───┤ MOTOR    │                           │
    │   OUT2 ──── fio ───┤ ESQUERDO │                           │
    │                    └──────────┘                           │
    │                                                          │
    │                    ┌──────────┐                           │
    │   OUT3 ──── fio ───┤ MOTOR    │                           │
    │   OUT4 ──── fio ───┤ DIREITO  │                           │
    │                    └──────────┘                           │
    │                                                          │
    │   +12V ◀── bateria (+)                                   │
    │   GND  ◀── bateria (-)  ──── GND da Rasp                │
    │                                                          │
    │   *** IMPORTANTE: tire os jumpers do ENA e ENB! ***      │
    │   *** Senao o PWM nao funciona ***                       │
    │                                                          │
    └──────────────────────────────────────────────────────────┘


    MAPA VISUAL NA RASP (os pinos que voce vai usar nesse passo):

         ┌─────────────────────┐
         │        1 ●  ● 2  (5V) ◀── ja ligado
         │        3 ●  ● 4
         │        5 ●  ● 6  (GND) ◀── ja ligado + L298N GND
         │        7 ●  ● 8
         │        9 ●  ● 10
         │       11 ●  ★ 12  GPIO18 → ENA (PWM motor esq)
         │       13 ●  ● 14
         │       15 ●  ★ 16  GPIO23 → IN3
         │       17 ●  ★ 18  GPIO24 → IN4
         │       19 ●  ● 20
         │       21 ●  ● 22
         │       23 ●  ★ 24  GPIO8  → IN2
         │       25 ●  ★ 26  GPIO7  → IN1
         │       27 ●  ● 28
         │       29 ●  ● 30
         │       31 ●  ● 32
         │       33 ●  ● 34
         │     ★ 35 ●  ● 36         GPIO19 → ENB (PWM motor dir)
         │       37 ●  ● 38
         │       39 ●  ● 40
         └─────────────────────┘
              ★ = pino usado neste passo
```

### Teste do Passo 3:
```python
    # Salva como teste_motores.py e roda na Rasp
    import RPi.GPIO as GPIO
    import time

    GPIO.setmode(GPIO.BCM)

    # Motor esquerdo
    GPIO.setup(7, GPIO.OUT)   # IN1
    GPIO.setup(8, GPIO.OUT)   # IN2
    GPIO.setup(18, GPIO.OUT)  # ENA

    # Teste: motor esquerdo pra frente por 2 segundos
    GPIO.output(7, GPIO.HIGH)
    GPIO.output(8, GPIO.LOW)
    GPIO.output(18, GPIO.HIGH)
    print("Motor esquerdo girando...")
    time.sleep(2)

    # Para
    GPIO.output(18, GPIO.LOW)
    print("Parou!")

    GPIO.cleanup()
```
```
    Se o motor girou: passo 3 OK!
    Se girou pro lado errado: inverte os fios OUT1/OUT2 no motor
    Se nao girou: verifica as conexoes IN1/IN2/ENA
```

---

## PASSO 4 - LIGAR O QF-1688R (receptor RF)

```
    Saida do regulador 5V:

    OUT+ (5V) ──── fio ──▶ QF-1688R pino VCC
    OUT- (GND) ─── fio ──▶ QF-1688R pino GND


    ┌───────────────────────┐
    │      QF-1688R         │
    │      2.4G             │
    │                       │
    │   VCC ◀── 5V do       │
    │          regulador    │
    │                       │
    │   GND ◀── GND comum  │
    │                       │
    │   MOTOR TRACAO A ─────┼──▶ fio → ja vai pro rele 1 (frente)
    │   MOTOR TRACAO B ─────┼──▶ fio → ja vai pro rele 2 (tras)
    │   MOTOR DIRECAO A ────┼──▶ fio → ja vai pro rele 3 (esquerda)
    │   MOTOR DIRECAO B ────┼──▶ fio → ja vai pro rele 4 (direita)
    │                       │
    └───────────────────────┘

    *** Os fios das saidas de motor do QF-1688R ja estao
    *** ligados nos reles que voce ja montou. NAO MUDA NADA aqui.
```

### Teste do Passo 4:
```
    - Liga o QF-1688R (deve ter um LED ou indicacao)
    - Aperta o controle remoto
    - Os reles devem fazer "click" quando voce aperta cada direcao
    - Se faz click: passo 4 OK!
```

---

## PASSO 5 - CONECTAR OS RELES NA RASPBERRY PI (com divisor de tensao)

Este e o passo principal! Os cabos azuis que saem dos reles (que iam pros motores) agora vao pra Rasp Pi **atraves de divisores de tensao**.

### Como montar cada divisor (repete 4 vezes):

```
    CABO QUE SAI                                          RASPBERRY
    DO CONTATO                                            PI GPIO
    DO RELE                                               (entrada)
    ──────────                                            ─────────

        │
        │   Resistor 1        Resistor 2       Resistor 3
        ├────[1kΩ]──────────────[1kΩ]──────────────[1kΩ]────┐
        │                                                     │
        │                                        Ponto ──────▶│──▶ GPIO
        │                                        do meio      │
        │                              Resistor 4             │
        │                        ┌───────[1kΩ]───────────┐    │
        │                        │                        │    │
        │                        ▼                        │    │
        │                       GND                       │    │
        │                      (Rasp)                     │    │
        │                                                 │    │
        │                                                      │
        └──────────────────────────────────────────────────────┘


    SIMPLIFICADO:

    Cabo rele ──[1kΩ]──[1kΩ]──[1kΩ]──┬──[1kΩ]── GND (Rasp)
                                       │
                                    GPIO (Rasp)

    Tensao que chega no GPIO: 12V x 1kΩ / (1kΩ+1kΩ+1kΩ+1kΩ) = 3.0V ✅
```

### Ligacao dos 4 divisores:

```
    RELE 1 (frente):
    Cabo ──[1kΩ]──[1kΩ]──[1kΩ]──┬──[1kΩ]── GND
                                  │
                        Pino fisico 37 (GPIO26) da Rasp


    RELE 2 (tras):
    Cabo ──[1kΩ]──[1kΩ]──[1kΩ]──┬──[1kΩ]── GND
                                  │
                        Pino fisico 38 (GPIO20) da Rasp


    RELE 3 (esquerda):
    Cabo ──[1kΩ]──[1kΩ]──[1kΩ]──┬──[1kΩ]── GND
                                  │
                        Pino fisico 36 (GPIO16) da Rasp


    RELE 4 (direita):
    Cabo ──[1kΩ]──[1kΩ]──[1kΩ]──┬──[1kΩ]── GND
                                  │
                        Pino fisico 32 (GPIO12) da Rasp


    Total de resistores: 16 unidades de 1kΩ (4 por canal)
```

### Onde ligar o GND dos divisores:
```
    Use qualquer pino GND da Rasp que esteja livre:
    Pino 9, 14, 20, 25, 30, 34 ou 39

    Pode usar o mesmo GND pra todos os 4 divisores (emenda os fios)
```

### Mapa visual na Rasp (pinos deste passo):
```
         ┌─────────────────────┐
         │        1 ●  ● 2  (5V)
         │        3 ●  ● 4
         │        5 ●  ● 6  (GND)
         │        7 ●  ● 8
         │  (GND) 9 ●  ● 10
         │       11 ●  ● 12
         │       13 ●  ● 14 (GND)
         │       15 ●  ● 16
         │       17 ●  ● 18
         │       19 ●  ● 20 (GND)
         │       21 ●  ● 22
         │       23 ●  ● 24
         │ (GND) 25 ●  ● 26
         │       27 ●  ● 28
         │       29 ●  ● 30 (GND)
         │       31 ●  ★ 32  GPIO12 ◀── divisor rele 4 (DIREITA)
         │       33 ●  ● 34 (GND) ◀── GND dos divisores
         │       35 ●  ★ 36  GPIO16 ◀── divisor rele 3 (ESQUERDA)
         │       ★ 37 ●  ★ 38  GPIO20 ◀── divisor rele 2 (TRAS)
         │ (GND) 39 ●  ● 40
         └─────────────────────┘
              ★ 37 = GPIO26 ◀── divisor rele 1 (FRENTE)
```

### Teste do Passo 5:
```python
    # Salva como teste_rf.py e roda na Rasp
    import RPi.GPIO as GPIO
    import time

    GPIO.setmode(GPIO.BCM)
    GPIO.setup(26, GPIO.IN)  # frente
    GPIO.setup(20, GPIO.IN)  # tras
    GPIO.setup(16, GPIO.IN)  # esquerda
    GPIO.setup(12, GPIO.IN)  # direita

    print("Aperte o controle remoto...")
    print("(Ctrl+C pra sair)")

    try:
        while True:
            if GPIO.input(26):
                print(">>> FRENTE!")
            if GPIO.input(20):
                print(">>> TRAS!")
            if GPIO.input(16):
                print(">>> ESQUERDA!")
            if GPIO.input(12):
                print(">>> DIREITA!")
            time.sleep(0.1)
    except KeyboardInterrupt:
        GPIO.cleanup()
        print("Saiu!")
```
```
    Roda o teste, aperta cada botao do controle remoto.
    Se aparece a direcao certa no terminal: PASSO 5 OK!

    Se nao aparece nada: mede com multimetro a tensao no pino GPIO
    enquanto aperta o controle. Deve dar ~3.0V.

    Se aparece a direcao errada: troca os fios dos reles de lugar.
```

---

## PASSO 6 - TESTE FINAL INTEGRADO (RF → Rasp → L298N → Motores)

```python
    # Salva como teste_completo.py e roda na Rasp
    import RPi.GPIO as GPIO
    import time

    GPIO.setmode(GPIO.BCM)

    # --- SAIDAS (L298N) ---
    MOTOR_PINS = [7, 8, 18, 23, 24, 19]
    for pin in MOTOR_PINS:
        GPIO.setup(pin, GPIO.OUT)
        GPIO.output(pin, GPIO.LOW)

    # PWM nos pinos ENA e ENB
    pwm_esq = GPIO.PWM(18, 1000)  # 1kHz
    pwm_dir = GPIO.PWM(19, 1000)
    pwm_esq.start(0)
    pwm_dir.start(0)

    # --- ENTRADAS (RF via divisor) ---
    GPIO.setup(26, GPIO.IN)  # frente
    GPIO.setup(20, GPIO.IN)  # tras
    GPIO.setup(16, GPIO.IN)  # esquerda
    GPIO.setup(12, GPIO.IN)  # direita

    VELOCIDADE = 70  # 0-100 (percentual do PWM)

    def frente():
        GPIO.output(7, GPIO.HIGH)
        GPIO.output(8, GPIO.LOW)
        GPIO.output(23, GPIO.HIGH)
        GPIO.output(24, GPIO.LOW)
        pwm_esq.ChangeDutyCycle(VELOCIDADE)
        pwm_dir.ChangeDutyCycle(VELOCIDADE)

    def tras():
        GPIO.output(7, GPIO.LOW)
        GPIO.output(8, GPIO.HIGH)
        GPIO.output(23, GPIO.LOW)
        GPIO.output(24, GPIO.HIGH)
        pwm_esq.ChangeDutyCycle(VELOCIDADE)
        pwm_dir.ChangeDutyCycle(VELOCIDADE)

    def esquerda():
        GPIO.output(7, GPIO.LOW)
        GPIO.output(8, GPIO.HIGH)
        GPIO.output(23, GPIO.HIGH)
        GPIO.output(24, GPIO.LOW)
        pwm_esq.ChangeDutyCycle(VELOCIDADE)
        pwm_dir.ChangeDutyCycle(VELOCIDADE)

    def direita():
        GPIO.output(7, GPIO.HIGH)
        GPIO.output(8, GPIO.LOW)
        GPIO.output(23, GPIO.LOW)
        GPIO.output(24, GPIO.HIGH)
        pwm_esq.ChangeDutyCycle(VELOCIDADE)
        pwm_dir.ChangeDutyCycle(VELOCIDADE)

    def parar():
        pwm_esq.ChangeDutyCycle(0)
        pwm_dir.ChangeDutyCycle(0)
        GPIO.output(7, GPIO.LOW)
        GPIO.output(8, GPIO.LOW)
        GPIO.output(23, GPIO.LOW)
        GPIO.output(24, GPIO.LOW)

    print("SUCATRON - Controle RF ativo!")
    print("Use o controle remoto. Ctrl+C pra sair.")

    try:
        while True:
            if GPIO.input(26):
                frente()
                print("FRENTE")
            elif GPIO.input(20):
                tras()
                print("TRAS")
            elif GPIO.input(16):
                esquerda()
                print("ESQUERDA")
            elif GPIO.input(12):
                direita()
                print("DIREITA")
            else:
                parar()
            time.sleep(0.05)
    except KeyboardInterrupt:
        parar()
        pwm_esq.stop()
        pwm_dir.stop()
        GPIO.cleanup()
        print("Desligou!")
```

---

## RESUMO DE TODOS OS FIOS

```
TOTAL DE CONEXOES:
══════════════════

BATERIA 12V (+) ─────▶ Regulador IN+ ──▶ Rasp 5V (pino 2)
                  └──▶ L298N +12V         └──▶ QF-1688R VCC

BATERIA 12V (-) ─────▶ Regulador IN- ──▶ Rasp GND (pino 6)
                  └──▶ L298N GND          └──▶ QF-1688R GND
                                           └──▶ GND divisores

RASP → L298N (6 fios):
  Pino 26 (GPIO7)  → IN1
  Pino 24 (GPIO8)  → IN2
  Pino 12 (GPIO18) → ENA
  Pino 16 (GPIO23) → IN3
  Pino 18 (GPIO24) → IN4
  Pino 35 (GPIO19) → ENB

L298N → MOTORES (4 fios):
  OUT1 → Motor Esquerdo fio A
  OUT2 → Motor Esquerdo fio B
  OUT3 → Motor Direito fio A
  OUT4 → Motor Direito fio B

QF-1688R → RELES (ja montado, nao mexe)

RELES → DIVISORES → RASP (4 canais, 16 resistores):
  Rele 1 cabo ──[1k][1k][1k]──┬──[1k]──GND → Pino 37 (GPIO26) frente
  Rele 2 cabo ──[1k][1k][1k]──┬──[1k]──GND → Pino 38 (GPIO20) tras
  Rele 3 cabo ──[1k][1k][1k]──┬──[1k]──GND → Pino 36 (GPIO16) esquerda
  Rele 4 cabo ──[1k][1k][1k]──┬──[1k]──GND → Pino 32 (GPIO12) direita
```

---

## DIAGRAMA FINAL COMPLETO

```
    ┌──────────┐
    │BATERIA   │
    │  12V     │
    │  MOTO    │
    └──┬───┬───┘
       │   │
  (+)──┘   └──(-) GND COMUM ─────────────────────────────────────────┐
       │                                                              │
       ├────────────────────┐                                         │
       │                    │                                         │
       ▼                    ▼                                         │
  ┌─────────┐        ┌───────────┐                                    │
  │REGULADOR│        │   L298N   │                                    │
  │ BUCK    │        │           │                                    │
  │ 12V→5V  │        │IN1◀─GPIO7│         ┌──────────┐               │
  │         │        │IN2◀─GPIO8│         │  MOTOR   │               │
  │OUT+ OUT-│        │ENA◀─GPIO18──(PWM)  │  ESQ.    │◀──OUT1,OUT2   │
  └──┬───┬──┘        │           │         └──────────┘               │
     │   │           │IN3◀─GPIO23│                                    │
     │   │           │IN4◀─GPIO24│         ┌──────────┐               │
     │   │           │ENB◀─GPIO19──(PWM)   │  MOTOR   │               │
     │   │           │           │         │  DIR.    │◀──OUT3,OUT4   │
     │   │           │+12V◀─bat+ │         └──────────┘               │
     │   │           │GND──◀─────┼──────────────────────────GND       │
     │   │           └───────────┘                                    │
     │   │                                                            │
     │   └──GND                                                       │
     │                                                                │
     ▼  5V                                                            │
     ├──────────────────────────┐                                     │
     │                          │                                     │
     ▼                          ▼                                     │
  ┌────────────────┐    ┌──────────────┐                              │
  │ RASPBERRY PI 3 │    │  QF-1688R    │                              │
  │                │    │  2.4G        │                              │
  │ 5V  (pino 2)  │    │              │     ┌────────┐               │
  │ GND (pino 6)  │    │  VCC ◀── 5V  │     │ RELE 1 │               │
  │                │    │  GND ◀── GND │  ┌─▶│(frente)│──divisor──GPIO26
  │                │    │              │  │  └────────┘               │
  │ GPIO7  ──▶IN1  │    │  MOT_A+ ────┼──┘                           │
  │ GPIO8  ──▶IN2  │    │             │      ┌────────┐               │
  │ GPIO18 ──▶ENA  │    │  MOT_A- ────┼───┬─▶│ RELE 2 │──divisor──GPIO20
  │ GPIO23 ──▶IN3  │    │             │   │  │(tras)  │               │
  │ GPIO24 ──▶IN4  │    │  MOT_B+ ────┼───┼──▶────────┐               │
  │ GPIO19 ──▶ENB  │    │             │   │  │ RELE 3 │──divisor──GPIO16
  │                │    │  MOT_B- ────┼───┼──▶(esq.)  │               │
  │ GPIO26 ◀──div1 │    │             │   │  └────────┘               │
  │ GPIO20 ◀──div2 │    └─────────────┘   │  ┌────────┐               │
  │ GPIO16 ◀──div3 │                      └─▶│ RELE 4 │──divisor──GPIO12
  │ GPIO12 ◀──div4 │                         │(dir.)  │               │
  │                │                         └────────┘               │
  └────────────────┘                                                  │
                                                                      │
  GND COMUM ◀─────────────────────────────────────────────────────────┘
```

---

*Guia gerado em 19/02/2026 - Projeto Sucatron v1.0*
