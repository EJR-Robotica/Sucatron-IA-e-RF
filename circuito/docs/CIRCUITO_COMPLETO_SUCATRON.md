# SUCATRON - CIRCUITO COMPLETO INTEGRADO (IA + RF)

## Versao: 1.0 | Data: 2026-02-19

---

## 1. VISAO GERAL

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          SUCATRON - SISTEMA COMPLETO                        │
│                                                                             │
│   ┌──────────────┐          ┌──────────────┐          ┌──────────────────┐  │
│   │  CONTROLE    │   2.4G   │  QF-1688R    │  4 fios  │   4x RELES      │  │
│   │  REMOTO      │─────────▶│  RECEPTOR    │─────────▶│   (interface)   │  │
│   │  (TX)        │          │  2.4G        │  motor   │                 │  │
│   └──────────────┘          └──────────────┘          └────────┬────────┘  │
│                                                                │ contatos  │
│                                                                ▼           │
│   ┌──────────────┐          ┌──────────────────────────────────────────┐   │
│   │  MICROFONE   │          │           RASPBERRY PI 3                 │   │
│   │  USB         │─────────▶│                                          │   │
│   ├──────────────┤          │  ┌─────────┐  ┌──────────┐  ┌────────┐  │   │
│   │  VOZ/IA      │          │  │ Python  │  │ GPIO     │  │ GPIO   │  │   │
│   │  Whisper+GPT │          │  │ (IA+RF) │─▶│ SAIDAS   │  │ENTRADAS│  │   │
│   └──────────────┘          │  └─────────┘  └────┬─────┘  └───┬────┘  │   │
│                             └────────────────────┼─────────────┼──────┘   │
│                                                  │             │          │
│                                    ┌─────────────┘      (leitura RF)     │
│                                    ▼                                      │
│   ┌────────────┐          ┌──────────────┐                                │
│   │ BATERIA    │─────────▶│    L298N     │                                │
│   │ 12V        │          │  (DRIVER)    │                                │
│   └──────┬─────┘          └──────┬───────┘                                │
│          │                       │                                        │
│          │ 5V reg         ┌──────┴──────┐                                 │
│          ▼                ▼             ▼                                  │
│   ┌──────────┐    ┌──────────┐  ┌──────────┐                              │
│   │ Rasp Pi  │    │ MOTOR    │  │ MOTOR    │                              │
│   │ (5V)     │    │ ESQ (E)  │  │ DIR (D)  │                              │
│   └──────────┘    └──────────┘  └──────────┘                              │
│                                                                           │
│   ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐                 │
│   │ LED      │  │ LED      │  │ BUZZER   │  │ LED      │                 │
│   │ OLHO E   │  │ OLHO D   │  │          │  │ STATUS   │                 │
│   └──────────┘  └──────────┘  └──────────┘  └──────────┘                 │
└───────────────────────────────────────────────────────────────────────────┘
```

---

## 2. PINAGEM GPIO COMPLETA (Padrao BCM)

```
                    RASPBERRY PI 3 - GPIO HEADER
                    ============================

                        3V3 [01] [02] 5V
                  SDA / GPIO2 [03] [04] 5V
                  SCL / GPIO3 [05] [06] GND
          DIR_MOT_A / GPIO7* [07] [08] GPIO14 / UART_TX*
                        GND [09] [10] GPIO15 / UART_RX*
          DIR_MOT_B / GPIO8* [11] [12] GPIO18 / PWM_MOT_E*
                      GPIO27 [13] [14] GND
                      GPIO22 [15] [16] GPIO23
                        3V3 [17] [18] GPIO24
              SPI_MOSI/GPIO10 [19] [20] GND
              SPI_MISO/GPIO9 [21] [22] GPIO25
              SPI_CLK/GPIO11 [23] [24] GPIO8  (ja usado DIR_MOT_B)
                        GND [25] [26] GPIO7  (ja usado DIR_MOT_A)
                      GPIO0  [27] [28] GPIO1
          LED_OLHO_E / GPIO5 [29] [30] GND
          LED_OLHO_D / GPIO6 [31] [32] GPIO12 / RF_DIREITA*
           LED_STATUS/GPIO13 [33] [34] GND
          PWM_MOT_D / GPIO19*[35] [36] GPIO16 / RF_ESQUERDA*
           RF_FRENTE /GPIO26 [37] [38] GPIO20 / RF_TRAS*
                        GND [39] [40] GPIO21 / BUZZER*
```

### Tabela de Alocacao GPIO

```
┌─────────┬───────────────────────┬───────────┬──────────────────────────────┐
│  GPIO   │  FUNCAO               │  DIRECAO  │  CONECTA EM                  │
├─────────┼───────────────────────┼───────────┼──────────────────────────────┤
│         │  === CONTROLE MOTORES (L298N) ===  │                              │
│  GPIO7  │  Direcao Motor A (IN1)│  SAIDA    │  L298N pino IN1              │
│  GPIO8  │  Direcao Motor B (IN2)│  SAIDA    │  L298N pino IN2              │
│  GPIO18 │  PWM Motor Esquerdo   │  SAIDA    │  L298N pino ENA              │
│  GPIO19 │  PWM Motor Direito    │  SAIDA    │  L298N pino ENB              │
│  GPIO23 │  Direcao Motor C (IN3)│  SAIDA    │  L298N pino IN3              │
│  GPIO24 │  Direcao Motor D (IN4)│  SAIDA    │  L298N pino IN4              │
├─────────┼───────────────────────┼───────────┼──────────────────────────────┤
│         │  === LEITURA RF (via RELES) ===    │                              │
│  GPIO26 │  RF Frente            │  ENTRADA  │  Rele 1 contato (COM)        │
│  GPIO20 │  RF Tras              │  ENTRADA  │  Rele 2 contato (COM)        │
│  GPIO16 │  RF Esquerda          │  ENTRADA  │  Rele 3 contato (COM)        │
│  GPIO12 │  RF Direita           │  ENTRADA  │  Rele 4 contato (COM)        │
├─────────┼───────────────────────┼───────────┼──────────────────────────────┤
│         │  === PERIFERICOS ===               │                              │
│  GPIO5  │  LED Olho Esquerdo    │  SAIDA    │  LED + Resistor 330R         │
│  GPIO6  │  LED Olho Direito     │  SAIDA    │  LED + Resistor 330R         │
│  GPIO13 │  LED Status (indicador│  SAIDA    │  LED + Resistor 330R         │
│  GPIO21 │  Buzzer               │  SAIDA    │  Buzzer + transistor NPN     │
├─────────┼───────────────────────┼───────────┼──────────────────────────────┤
│         │  === COMUNICACAO ===               │                              │
│  GPIO14 │  UART TX              │  SAIDA    │  PCB Jabuti pino TX          │
│  GPIO15 │  UART RX              │  ENTRADA  │  PCB Jabuti pino RX          │
└─────────┴───────────────────────┴───────────┴──────────────────────────────┘
```

---

## 3. CIRCUITO DOS 4 RELES (QF-1688R → Rasp Pi)

A placa QF-1688R-2.4G tem 4 saidas de H-bridge (2 fios por motor).
Cada fio de motor aciona a bobina de 1 rele.
O contato do rele sinaliza o GPIO da Rasp.

```
                     QF-1688R-45-1-2.4G
                     (Receptor do carrinho)
                    ┌─────────────────────┐
                    │  Y1=16MHz  2017.9.6 │
                    │                     │
                    │  MOT_TRACAO  (A) ───┼──── fio vermelho ──▶ RELE 1 (frente)
                    │  MOT_TRACAO  (B) ───┼──── fio preto ────▶ RELE 2 (tras)
                    │  MOT_DIRECAO (A) ───┼──── fio azul ─────▶ RELE 3 (esquerda)
                    │  MOT_DIRECAO (B) ───┼──── fio branco ───▶ RELE 4 (direita)
                    │                     │
                    │  GND ───────────────┼──── GND comum
                    │  VCC (4.5V~5V) ─────┼──── alimentacao do receptor
                    └─────────────────────┘


    DETALHE DE CADA RELE (repete 4 vezes):
    =======================================

    Saida QF-1688R                              Raspberry Pi GPIO
    (ex: MOT_TRACAO A)                          (ex: GPIO26 = RF Frente)


         Fio do motor                           3.3V (Rasp)
              │                                    │
              │                                 [10kΩ] ← pull-up
              │                                    │
              ▼                                    ├───────▶ GPIO26
     ┌────────────────┐                            │          (INPUT)
     │    BOBINA       │                     ┌─────┘
     │    DO RELE      │                     │
     │                 │               ┌─────┴─────┐
     │  ┌───────────┐ │               │  CONTATO   │
     │  │           │ │               │  DO RELE   │
     │  │  bobina   │ │               │            │
     │  │   (~70Ω)  │ │               │ COM ── NO  │
     │  │           │ │               │        │   │
     │  └─────┬─────┘ │               └────────┼───┘
     │        │       │                        │
     └────────┼───────┘                        │
              │                                │
              ▼                                ▼
         GND (QF-1688)                    GND (Rasp)


    *** IMPORTANTE: Diodo de protecao na bobina! ***

         Fio do motor
              │
              ├──────────┐
              │          │
              ▼       ┌──┴──┐
         ┌─────────┐  │DIODO│  1N4007
         │ BOBINA  │  │ ▲   │  (catodo no +)
         │  RELE   │  └──┬──┘
         └────┬────┘     │
              ├──────────┘
              ▼
         GND (QF-1688)
```

### Esquema dos 4 reles - Visao completa

```
    QF-1688R                    4x RELES                    RASPBERRY PI 3
    ════════                    ════════                    ═══════════════

                            ┌───────────┐
    MOT_TRACAO_A ──[D1]──▶ │  RELE 1   │──── contato ────▶ GPIO26 (FRENTE)
                            │  (frente) │                   c/ pull-up 10kΩ
                            └───────────┘

                            ┌───────────┐
    MOT_TRACAO_B ──[D2]──▶ │  RELE 2   │──── contato ────▶ GPIO20 (TRAS)
                            │  (tras)   │                   c/ pull-up 10kΩ
                            └───────────┘

                            ┌───────────┐
    MOT_DIRECAO_A ─[D3]──▶│  RELE 3   │──── contato ────▶ GPIO16 (ESQUERDA)
                            │  (esq.)   │                   c/ pull-up 10kΩ
                            └───────────┘

                            ┌───────────┐
    MOT_DIRECAO_B ─[D4]──▶│  RELE 4   │──── contato ────▶ GPIO12 (DIREITA)
                            │  (dir.)   │                   c/ pull-up 10kΩ
                            └───────────┘

    GND (QF-1688) ──────────── GND bobinas
                               GND contatos ──── GND (Rasp)

    D1~D4 = Diodo 1N4007 (protecao contra surto da bobina)
```

---

## 4. CIRCUITO DO L298N (Rasp Pi → Motores)

```
    RASPBERRY PI 3                 L298N                    MOTORES DC 12V
    ══════════════                 ═════                    ══════════════

    GPIO7  (DIR_A / IN1) ────────▶ IN1 ┐
                                        ├──▶ OUT1 ──┐
    GPIO8  (DIR_B / IN2) ────────▶ IN2 ┘            ├────▶ MOTOR ESQUERDO
                                        ┌──▶ OUT2 ──┘
    GPIO18 (PWM_E / ENA) ────────▶ ENA ┘


    GPIO23 (DIR_C / IN3) ────────▶ IN3 ┐
                                        ├──▶ OUT3 ──┐
    GPIO24 (DIR_D / IN4) ────────▶ IN4 ┘            ├────▶ MOTOR DIREITO
                                        ┌──▶ OUT4 ──┘
    GPIO19 (PWM_D / ENB) ────────▶ ENB ┘


    ALIMENTACAO DO L298N:
    ─────────────────────
    BATERIA 12V (+) ──────────────▶ +12V (VMS)
    BATERIA 12V (-) ──────────────▶ GND
    Rasp Pi GND ──────────────────▶ GND (comum!)

    *** Remover o jumper de 5V do L298N se alimentar a Rasp separado ***


    TABELA DE MOVIMENTOS:
    ┌──────────┬──────┬──────┬──────┬──────┬──────┬──────┐
    │ MOVIMENTO│ IN1  │ IN2  │ ENA  │ IN3  │ IN4  │ ENB  │
    ├──────────┼──────┼──────┼──────┼──────┼──────┼──────┤
    │ Frente   │ HIGH │ LOW  │ PWM  │ HIGH │ LOW  │ PWM  │
    │ Tras     │ LOW  │ HIGH │ PWM  │ LOW  │ HIGH │ PWM  │
    │ Esquerda │ LOW  │ HIGH │ PWM  │ HIGH │ LOW  │ PWM  │
    │ Direita  │ HIGH │ LOW  │ PWM  │ LOW  │ HIGH │ PWM  │
    │ Parar    │ LOW  │ LOW  │ LOW  │ LOW  │ LOW  │ LOW  │
    └──────────┴──────┴──────┴──────┴──────┴──────┴──────┘
```

---

## 5. CIRCUITO DOS LEDs E BUZZER

```
    RASPBERRY PI 3                COMPONENTES
    ══════════════                ═══════════

    LED OLHO ESQUERDO:
    GPIO5 ───[330Ω]───▶|── LED ──▶ GND
                       (anodo)   (catodo)

    LED OLHO DIREITO:
    GPIO6 ───[330Ω]───▶|── LED ──▶ GND
                       (anodo)   (catodo)

    LED STATUS (indicador IA/RF):
    GPIO13 ──[330Ω]───▶|── LED ──▶ GND
                       (anodo)   (catodo)

    BUZZER (com transistor driver):

    GPIO21 ──[1kΩ]──┐
                     │
                  ┌──┴──┐
                  │  B  │
                  │     │  BC547 (NPN)
                  │  E  │
                  └──┬──┘
                     │       ┌──────────┐
                     │    ┌──┤  BUZZER  ├──┐
                     │    │  └──────────┘  │
                     │    │                │
                     ▼    ▼                │
                    GND  GND              5V (Rasp)
```

---

## 6. CIRCUITO DE ALIMENTACAO

```
                         BATERIA / FONTE 12V
                         ═══════════════════
                                │
                         (+12V) ┤
                                │
                    ┌───────────┼─────────────────────────────┐
                    │           │                             │
                    ▼           ▼                             │
            ┌──────────┐  ┌──────────┐                       │
            │ L298N    │  │ REGULADOR│                       │
            │ +12V VMS │  │ 7805     │                       │
            └──────────┘  │ ou DC-DC │                       │
                          │ Buck     │                       │
                          │          │                       │
                          │ IN  OUT──┼──▶ 5V ──▶ Rasp Pi    │
                          │     GND  │          (micro USB   │
                          └──────┬───┘           ou pin 2/4) │
                                 │                           │
                                 │    ┌──────────────┐       │
                                 │    │  QF-1688R    │       │
                                 └───▶│  VCC (5V)    │       │
                                      └──────────────┘       │
                                                             │
                    GND COMUM ◀──────────────────────────────┘
                    (todos os GNDs conectados juntos)

    *** ATENCAO ***
    - Usar regulador de pelo menos 2A para a Rasp Pi
    - Capacitor 100uF na saida do regulador
    - GND DEVE ser comum entre TODOS os circuitos
```

---

## 7. DIAGRAMA DE CONEXOES COMPLETO (ESQUEMATICO GERAL)

```
╔══════════════════════════════════════════════════════════════════════════════╗
║                        SUCATRON - ESQUEMATICO GERAL                         ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  ┌─────────────┐                                                             ║
║  │ CONTROLE    │                                                             ║
║  │ REMOTO 2.4G │                                                             ║
║  └──────┬──────┘                                                             ║
║         │ RF 2.4GHz                                                          ║
║         ▼                                                                    ║
║  ┌─────────────────┐     ┌──────────────────────┐                            ║
║  │   QF-1688R      │     │   4x RELES + DIODOS  │                            ║
║  │   2.4G          │     │                       │                            ║
║  │                  │     │ RELE1 ─contato─ GPIO26│──┐                        ║
║  │  TRACAO_A ───────┼────▶│ RELE2 ─contato─ GPIO20│──┤                        ║
║  │  TRACAO_B ───────┼────▶│ RELE3 ─contato─ GPIO16│──┤  ENTRADAS              ║
║  │  DIRECAO_A ──────┼────▶│ RELE4 ─contato─ GPIO12│──┤  RF                    ║
║  │  DIRECAO_B ──────┼────▶│                       │  │                        ║
║  │                  │     └───────────────────────┘  │                        ║
║  │  GND ────────────┼──── GND comum                  │                        ║
║  │  VCC ◀───────────┼──── 5V regulado                │                        ║
║  └──────────────────┘                                │                        ║
║                                                      │                        ║
║         ┌────────────────────────────────────────────┘                        ║
║         │                                                                    ║
║         ▼                                                                    ║
║  ┌══════════════════════════════════════════════════════════════════┐         ║
║  ║                    RASPBERRY PI 3                                ║         ║
║  ║                                                                  ║         ║
║  ║  ENTRADAS (leitura RF via reles):                                ║         ║
║  ║    GPIO26 ◀── RF Frente   (pull-up 10kΩ a 3.3V)                 ║         ║
║  ║    GPIO20 ◀── RF Tras     (pull-up 10kΩ a 3.3V)                 ║         ║
║  ║    GPIO16 ◀── RF Esquerda (pull-up 10kΩ a 3.3V)                 ║         ║
║  ║    GPIO12 ◀── RF Direita  (pull-up 10kΩ a 3.3V)                 ║         ║
║  ║                                                                  ║         ║
║  ║  SAIDAS (controle L298N):                                        ║         ║
║  ║    GPIO7  ──▶ L298N IN1  (dir motor A)                           ║         ║
║  ║    GPIO8  ──▶ L298N IN2  (dir motor A)                           ║         ║
║  ║    GPIO18 ──▶ L298N ENA  (PWM motor esq)                        ║         ║
║  ║    GPIO23 ──▶ L298N IN3  (dir motor B)                           ║         ║
║  ║    GPIO24 ──▶ L298N IN4  (dir motor B)                           ║         ║
║  ║    GPIO19 ──▶ L298N ENB  (PWM motor dir)                        ║         ║
║  ║                                                                  ║         ║
║  ║  SAIDAS (perifericos):                                           ║         ║
║  ║    GPIO5  ──[330Ω]──▶ LED Olho Esquerdo ──▶ GND                 ║         ║
║  ║    GPIO6  ──[330Ω]──▶ LED Olho Direito  ──▶ GND                 ║         ║
║  ║    GPIO13 ──[330Ω]──▶ LED Status        ──▶ GND                 ║         ║
║  ║    GPIO21 ──[1kΩ]──▶ BC547 ──▶ Buzzer   ──▶ 5V                  ║         ║
║  ║                                                                  ║         ║
║  ║  COMUNICACAO:                                                    ║         ║
║  ║    GPIO14 ──▶ UART TX (para PCB Jabuti)                          ║         ║
║  ║    GPIO15 ◀── UART RX (da PCB Jabuti)                            ║         ║
║  ║                                                                  ║         ║
║  ║  ALIMENTACAO:                                                    ║         ║
║  ║    Pin 2/4 (5V) ◀── Regulador 5V                                ║         ║
║  ║    Pin 6/9/14/20/25/30/34/39 (GND) ── GND comum                 ║         ║
║  ║    USB ◀── Microfone USB                                         ║         ║
║  ║    Audio ──▶ Alto-falante (via amplificador)                     ║         ║
║  ╚══════════════════════════════════════════════════════════════════╝         ║
║         │                                                                    ║
║         │ GPIO 7,8,18,23,24,19                                               ║
║         ▼                                                                    ║
║  ┌──────────────────────┐                                                    ║
║  │       L298N          │                                                    ║
║  │                      │        ┌──────────────────┐                        ║
║  │  IN1 ◀── GPIO7       │        │                  │                        ║
║  │  IN2 ◀── GPIO8       │        │  MOTOR ESQUERDO  │                        ║
║  │  ENA ◀── GPIO18(PWM) ├──OUT1──┤  (DC 12V)        │                        ║
║  │                      ├──OUT2──┤                  │                        ║
║  │                      │        └──────────────────┘                        ║
║  │                      │                                                    ║
║  │  IN3 ◀── GPIO23      │        ┌──────────────────┐                        ║
║  │  IN4 ◀── GPIO24      │        │                  │                        ║
║  │  ENB ◀── GPIO19(PWM) ├──OUT3──┤  MOTOR DIREITO   │                        ║
║  │                      ├──OUT4──┤  (DC 12V)        │                        ║
║  │                      │        └──────────────────┘                        ║
║  │                      │                                                    ║
║  │  +12V ◀── Bateria    │                                                    ║
║  │  GND ─── GND comum   │                                                    ║
║  └──────────────────────┘                                                    ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
```

---

## 8. DETALHE DO RELE COM DIODO (cada um dos 4)

```
    Fio motor                                           Rasp Pi
    QF-1688R                                            GPIO
    ─────────                                           ─────

                  ┌──────── 1N4007 ────────┐
                  │        (catodo ▶)       │
                  │  ┌──────────────────┐   │
    MOTOR_x_A ────┼──┤                  │   │
                  │  │     BOBINA       │   │
                  │  │     DO RELE      │   │       3.3V (pin 1 ou 17)
                  │  │     (~5V/70mA)   │   │           │
                  │  │                  │   │        [10kΩ]  pull-up
                  │  └────────┬─────────┘   │           │
                  │           │             │           ├──────▶ GPIOxx
    GND ──────────┼───────────┘             │           │       (INPUT)
    (QF-1688)     │                         │     ┌─────┴─────┐
                  └─────────────────────────┘     │  CONTATO  │
                                                  │  RELE     │
                                                  │           │
                                                  │ NO ── COM │
                                                  │       │   │
                                                  └───────┼───┘
                                                          │
                                                          ▼
                                                    GND (Rasp)
                                                    (pin 6,9,etc)


    FUNCIONAMENTO:
    ─────────────
    1. Controle remoto pressionado → QF-1688R ativa saida do motor
    2. Corrente flui pela bobina do rele (~70mA)
    3. Rele fecha o contato (NO → COM)
    4. GPIO da Rasp e puxado para GND (leitura = LOW = ativo!)
    5. Quando solta o controle → rele abre → GPIO volta para HIGH (pull-up)

    * Diodo 1N4007: protege contra surto quando a bobina desliga
    * Pull-up 10kΩ: garante nivel HIGH quando rele aberto
```

---

## 9. LISTA COMPLETA DE MATERIAIS (BOM)

```
┌─────┬────────────────────────────────┬──────┬───────────┬─────────────────┐
│  #  │  COMPONENTE                    │ QTD  │ VALOR EST │  OBSERVACAO     │
├─────┼────────────────────────────────┼──────┼───────────┼─────────────────┤
│     │  === JA EXISTENTE ===          │      │           │                 │
│  1  │  Raspberry Pi 3               │  1   │  ----     │ Ja tem          │
│  2  │  L298N Driver                 │  1   │  ----     │ Ja tem (vermelho│
│  3  │  QF-1688R-45-1-2.4G receptor  │  1   │  ----     │ Ja tem          │
│  4  │  Controle remoto 2.4G (TX)    │  1   │  ----     │ Ja tem          │
│  5  │  Motores DC 12V (com reducao) │  2   │  ----     │ Ja tem (amarelos│
│  6  │  PCB Jabuti                   │  1   │  ----     │ Ja tem          │
│  7  │  Microfone USB                │  1   │  ----     │ Ja tem          │
│  8  │  Alto-falante                 │  1   │  ----     │ Ja tem          │
│  9  │  Bateria 12V                  │  1   │  ----     │ Ja tem          │
├─────┼────────────────────────────────┼──────┼───────────┼─────────────────┤
│     │  === PARA COMPRAR/SUCATAR ===  │      │           │                 │
│ 10  │  Rele 5V (SRD-05VDC ou sim.)  │  4   │  R$ 8,00  │ Pode ser de     │
│     │                                │      │           │ sucata!         │
│ 11  │  Diodo 1N4007                 │  4   │  R$ 1,00  │ Protecao bobina │
│ 12  │  Resistor 10kΩ               │  4   │  R$ 0,50  │ Pull-up GPIO    │
│ 13  │  Resistor 330Ω               │  3   │  R$ 0,50  │ LEDs            │
│ 14  │  Resistor 1kΩ                │  1   │  R$ 0,20  │ Base BC547      │
│ 15  │  BC547 (transistor NPN)       │  1   │  R$ 0,50  │ Driver buzzer   │
│ 16  │  LEDs (3mm ou 5mm)           │  3   │  R$ 1,00  │ 2 olhos + status│
│ 17  │  Buzzer 5V                    │  1   │  R$ 2,00  │ Ativo ou passivo│
│ 18  │  Regulador 5V (7805 ou buck)  │  1   │  R$ 5,00  │ Min 2A p/ Rasp  │
│ 19  │  Capacitor 100uF/25V         │  1   │  R$ 0,50  │ Filtro regulador│
│ 20  │  Fio fino (jumper)            │  2m  │  R$ 2,00  │ Ligacoes        │
├─────┼────────────────────────────────┼──────┼───────────┼─────────────────┤
│     │  TOTAL ESTIMADO               │      │ ~R$21,00  │                 │
└─────┴────────────────────────────────┴──────┴───────────┴─────────────────┘
```

---

## 10. NOTAS DE SEGURANCA

```
⚠  NUNCA ligar 12V diretamente na Raspberry Pi (queima!)
⚠  NUNCA ativar L298N e QF-1688R no mesmo motor ao mesmo tempo
⚠  SEMPRE usar diodo 1N4007 na bobina do rele (surto queima GPIO)
⚠  SEMPRE manter GND comum entre TODOS os circuitos
⚠  VERIFICAR com multimetro antes de ligar:
     - Tensao do regulador = 5.0V (±0.2V)
     - Continuidade dos GNDs
     - Nenhum curto entre 12V e 5V/3.3V
```

---

## 11. ORDEM DE MONTAGEM SUGERIDA

```
1. Montar regulador 5V e testar (sem Rasp conectada)
2. Ligar L298N na bateria 12V e testar motores manualmente
3. Conectar L298N nos GPIOs da Rasp e testar via Python
4. Montar os 4 reles com diodos em placa auxiliar
5. Conectar saidas do QF-1688R nas bobinas dos reles
6. Conectar contatos dos reles nos GPIOs da Rasp
7. Testar leitura RF com controle remoto
8. Integrar tudo no software (interpreter.py)
9. Montar LEDs, buzzer e testar
10. Teste final completo (IA + RF simultaneos)
```

---

*Documento gerado em 19/02/2026 - Projeto Sucatron v1.0*
