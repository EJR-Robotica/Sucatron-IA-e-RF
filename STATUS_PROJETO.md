# SUCATRON - Status do Projeto

**Atualizado em**: 20/02/2026
**Equipe**: EJR Robotica Educacional - Dois Irmaos/RS

---

## O que e o SUcatron

Robo educacional construido a partir de brinquedos RC reaproveitados (sucata), que ensina programacao para criancas atraves de 3 formas de interacao:

1. **Interface Web** - botoes no navegador (PHP + JavaScript)
2. **IA Conversacional** - comandos de voz com GPT-4o-mini (Python)
3. **Controle Remoto RF** - controle fisico 2.4GHz (QF-1688R)

---

## Onde estamos agora

### O que FUNCIONA

| Sistema | Como funciona | Script |
|---------|--------------|--------|
| **Web** | Navegador → PHP → `interpreter.py` → GPIO → Motores | `/var/www/html/services/interpreter.py` |
| **IA** | Voz → Whisper → GPT → `command_processor.py` → `interpreter.py` → GPIO | `/var/www/html/jabuti-ai/recognize.py` |

Ambos usam o `interpreter.py` como saida para os motores, controlando GPIO diretamente (sem L298N, sem PWM).

### O que esta em TESTE

| Sistema | Como funciona | Script |
|---------|--------------|--------|
| **RF** | Controle 2.4GHz → QF-1688R → Reles → Divisor tensao → GPIO (entrada) → `rf_motores.py` → L298N → Motores | `/home/pi/rf_motores.py` |

O `rf_motores.py` e um script de teste **isolado** para validar a leitura do controle remoto. Usa L298N com PWM para saida.

### O que FALTA

**Mesclar os 3 sistemas em um unico script** que:
- Leia entradas RF (GPIO 26, 20, 16, 21)
- Receba comandos da Web e IA (via interpreter ou API)
- Use uma unica pinagem de saida (preferencialmente via L298N com PWM)
- Defina prioridade entre fontes (ex: IA > RF > Web)

---

## Pinagem GPIO Atual (BCM) - Confirmada via SSH

### interpreter.py (Web + IA) - SAIDA

```
GPIO 23 → Motor Esquerdo Frente (HIGH)
GPIO 24 → Motor Esquerdo Tras (HIGH)
GPIO 17 → Motor Direito Frente (LOW = frente, invertido)
GPIO 22 → Motor Direito Tras (HIGH)
GPIO 9  → LED Olho Esquerdo
GPIO 11 → LED Olho Direito
GPIO 8  → LED Indicador (pisca = IA ativa)
GPIO 25 → Botao Liga/Desliga (pull-up)
```

### rf_motores.py (RF) - ENTRADA + SAIDA

```
ENTRADAS (reles → divisor tensao → GPIO):
  GPIO 26 (pino 37) ← Frente
  GPIO 20 (pino 38) ← Tras
  GPIO 16 (pino 36) ← Esquerda
  GPIO 21 (pino 40) ← Direita

SAIDAS (GPIO → L298N):
  GPIO 7  → IN1 (Motor Esq. dir A)
  GPIO 8  → IN2 (Motor Esq. dir B)
  GPIO 18 → ENA (PWM Motor Esquerdo, 1kHz)
  GPIO 23 → IN3 (Motor Dir. dir A)
  GPIO 24 → IN4 (Motor Dir. dir B)
  GPIO 19 → ENB (PWM Motor Direito, 1kHz)
```

### CONFLITO CONHECIDO

GPIO 23 e 24 sao usados por ambos os scripts com funcoes diferentes:
- `interpreter.py`: GPIO 23/24 = motor **esquerdo**
- `rf_motores.py`: GPIO 23/24 = L298N IN3/IN4 = motor **direito**

Isso e esperado porque os scripts ainda nao foram mesclados. Nao rodar os dois ao mesmo tempo.

---

## Hardware

| Componente | Modelo | Funcao |
|------------|--------|--------|
| Computador | Raspberry Pi 3 Model B+ | Cerebro (IP: 192.168.0.157) |
| Receptor RF | QF-1688R-45-1-2.4G | Recebe sinal do controle remoto |
| Driver Motor | L298N (placa vermelha) | Ponte H para motores DC |
| Shield | Placa custom ejrobotica.com.br | Interface eletrica Pi ↔ motores |
| Motores | DC 12V com caixa de reducao | Originais do brinquedo RC |
| Bateria | 12V de moto | Alimentacao geral |
| Regulador | LM2596 buck (12V → 5V, 3A) | Alimenta Pi e QF-1688R |
| Reles | 4 unidades com diodos | Interface RF → GPIO |
| Resistores | 16x 1kΩ | Divisores de tensao (12V → 3V) |

---

## Estrutura de Arquivos Relevantes

```
Na Raspberry Pi (192.168.0.157):

/home/pi/
  rf_motores.py          ← Script teste RF (NOVO)

/var/www/html/
  jabuti-ai/
    recognize.py          ← IA principal (wake word → GPT → comando)
    command_processor.py  ← Parser "COMANDOS;pf 1000;pd 250;"
    recorder.py           ← Reconhecimento de fala
    system_role.txt       ← Personalidade do robo
    requirements.txt      ← 33 dependencias Python
    .env                  ← API Key OpenAI (NAO COMMITAR)
  services/
    interpreter.py        ← Saida motores (Web + IA)
  include/
    config.php            ← DB: jabutiedu @ localhost:3306
```

---

## Acesso

| Item | Valor |
|------|-------|
| SSH | `ssh pi@192.168.0.157` (chave ou senha: 123) |
| Web | `http://192.168.0.157` |
| Login admin | `admin` / `1qaz@wsx` |
| Login demo | `livre` / `livre` |
| Banco | MySQL `jabutiedu` / `iqb73boi12xtb91te81e7i17` |

---

## Proximos Passos

1. **Validar rf_motores.py** - testar controle remoto → reles → motores
2. **Mesclar scripts** - unificar interpreter.py + rf_motores.py
3. **Definir pinagem final** - resolver conflito GPIO 23/24
4. **Trocar senha SSH** - 123 e inseguro
5. **Rotacionar API Key OpenAI** - chave pode estar exposta

---

## Documentacao Completa

- `circuito/docs/CIRCUITO_COMPLETO_SUCATRON.md` - Circuito integrado IA+RF
- `circuito/docs/GUIA_CONEXOES_PASSO_A_PASSO.md` - Guia de montagem com testes
- `circuito/docs/DOCUMENTACAO_TECNICA_COMPLETA.md` - Doc tecnica do hardware
- `PRE-MVP.md` - Visao do produto e escopo
- `SESSAO_2026-02-06.md` - Notas da primeira sessao

---

*Para retomar o trabalho em nova sessao, leia este arquivo primeiro.*
