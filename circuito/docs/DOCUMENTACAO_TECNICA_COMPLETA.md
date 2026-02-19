# DOCUMENTAÇÃO TÉCNICA -- MVP COMPLETO DO CIRCUITO

## 1. Arquitetura Geral

O robô opera com dois sistemas em paralelo:

### Sistema Inteligente

-   Raspberry Pi 3
-   IA conversacional em Python
-   Controle via GPIO
-   Driver L298N
-   Motores DC 12V

### Sistema Rádio

-   Receptor 2.4GHz
-   Estágio de potência discreto
-   Controle manual dos motores

------------------------------------------------------------------------

## 2. Fluxo da IA

Voz → Reconhecimento → Interpretação → GPIO → L298N → Motores

------------------------------------------------------------------------

## 3. Pinagem GPIO (Padrão BCM -- MVP)

  Função               GPIO
  -------------------- --------
  PWM Motor Esquerdo   GPIO18
  PWM Motor Direito    GPIO19
  Direção Motor A      GPIO7
  Direção Motor B      GPIO8
  UART TX              GPIO14
  UART RX              GPIO15

------------------------------------------------------------------------

## 4. Alimentação

-   12V para motores
-   5V regulado para Raspberry
-   GND comum entre sistemas

------------------------------------------------------------------------

## 5. Riscos Técnicos

-   Nunca ativar simultaneamente dois drivers no mesmo motor
-   Separar alimentação lógica e potência
-   Evitar retorno de corrente entre RF e L298N

------------------------------------------------------------------------

## 6. Registro Fotográfico

Fotos originais anexadas na pasta /fotos.
