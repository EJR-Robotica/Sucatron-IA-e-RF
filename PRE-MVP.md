# JABUTI IA - Pre-MVP

## Visao do Produto

**Jabuti Edu** e uma plataforma de robotica educacional que ensina programacao para criancas atraves de:
1. Controle manual de um robo fisico
2. Programacao visual com blocos (Blockly)
3. Comandos de voz com IA (GPT)

---

## Proposta de MVP

### Objetivo Principal
Validar a **interacao por voz com IA** como diferencial pedagogico.

### Hipotese a Validar
> "Criancas aprendem programacao de forma mais engajada quando podem conversar naturalmente com o robo, em vez de apenas arrastar blocos."

---

## Escopo MVP (Sugestao)

### Fase 1 - Core (Prioridade Alta)

| Feature | Descricao | Status |
|---------|-----------|--------|
| Wake Word | Robo responde a "Ola Jabuti" | Existente |
| Comandos Basicos por Voz | Frente, tras, esquerda, direita | Existente |
| Feedback Sonoro | Robo fala o que esta fazendo | Existente |
| LED Indicador | Visual de estado (ouvindo/processando) | Existente |

### Fase 2 - Experiencia (Prioridade Media)

| Feature | Descricao | Status |
|---------|-----------|--------|
| Modo Educador | Perguntas escolares respondidas pelo GPT | Existente |
| Danca | Sequencia de movimentos por comando de voz | Existente |
| Multilingue | Falar em outros idiomas | Existente |

### Fase 3 - Expansao (Prioridade Baixa)

| Feature | Descricao | Status |
|---------|-----------|--------|
| Interface Web | Acompanhar comandos em tempo real | Parcial |
| Gravacao de Programas | Salvar sequencias de voz | A fazer |
| Multiplos Robos | Controlar varios robos | Parcial |

---

## Checklist Pre-Lancamento

### Hardware
- [ ] Testar servos (frente/tras/esquerda/direita)
- [ ] Testar LEDs (olhos)
- [ ] Testar buzina
- [ ] Testar microfone USB
- [ ] Testar alto-falante
- [ ] Testar botao liga/desliga

### Software
- [ ] Testar recognize.py na Rasp
- [ ] Verificar dependencias Python (requirements.txt)
- [ ] Testar conexao com OpenAI
- [ ] Validar wake words
- [ ] Validar sleep words

### Seguranca
- [ ] Rotacionar API Key OpenAI
- [ ] Mudar senha SSH (123 -> algo seguro)
- [ ] Backup do banco de dados

### Documentacao
- [ ] Manual do usuario
- [ ] Guia de instalacao
- [ ] Lista de comandos de voz

---

## Arquitetura MVP

```
┌─────────────────────────────────────────────────────────────┐
│                      USUARIO (Crianca)                       │
│                           │                                  │
│                      Comando de Voz                          │
│                           ▼                                  │
├─────────────────────────────────────────────────────────────┤
│                    RASPBERRY PI 3                            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │  Microfone  │─▶│ recognize.py│─▶│   OpenAI    │          │
│  │    USB      │  │  (Python)   │  │  Whisper+   │          │
│  └─────────────┘  └──────┬──────┘  │  GPT-4o     │          │
│                          │         └─────────────┘          │
│                          ▼                                   │
│                 ┌─────────────────┐                          │
│                 │ command_processor│                          │
│                 │     .py         │                          │
│                 └────────┬────────┘                          │
│                          │                                   │
│                          ▼                                   │
│                 ┌─────────────────┐                          │
│                 │  interpreter.py │                          │
│                 │     (GPIO)      │                          │
│                 └────────┬────────┘                          │
│                          │                                   │
├──────────────────────────┼──────────────────────────────────┤
│                          ▼                                   │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐     │
│  │  Motor   │  │  Motor   │  │   LEDs   │  │  Buzina  │     │
│  │ Esquerdo │  │ Direito  │  │  (Olhos) │  │          │     │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘     │
│                       ROBO JABUTI                            │
└─────────────────────────────────────────────────────────────┘
```

---

## Comandos de Voz Suportados (MVP)

### Movimento
- "Anda para frente por 2 segundos"
- "Vai para tras"
- "Vira a direita"
- "Vira a esquerda"
- "Para"

### Interacao
- "Ola Jabuti" (wake word)
- "Tchau" (sleep word)
- "Toca a buzina"
- "Pisca os olhos"
- "Faz uma danca"

### Educacional
- "Quanto e 5 mais 3?"
- "Qual a capital do Brasil?"
- "Me conta uma historia"

---

## Metricas de Sucesso MVP

| Metrica | Meta |
|---------|------|
| Taxa de reconhecimento de voz | > 80% |
| Tempo de resposta (voz -> acao) | < 5 segundos |
| Engajamento (comandos por sessao) | > 10 |
| Satisfacao do usuario | Qualitativo |

---

## Riscos e Mitigacoes

| Risco | Probabilidade | Impacto | Mitigacao |
|-------|---------------|---------|-----------|
| Latencia da API OpenAI | Media | Alto | Cache de respostas comuns |
| Ruido ambiente | Alta | Medio | Microfone direcional |
| Custo API OpenAI | Media | Medio | Limitar tokens/resposta |
| Wi-Fi instavel | Media | Alto | Modo offline basico |

---

## Proximas Decisoes Necessarias

1. **Prioridade de features**: Focar em IA ou em Blockly primeiro?
2. **Publico-alvo**: Qual faixa etaria? 6-8? 9-12?
3. **Modelo de negocio**: Venda do robo? Assinatura? Licenca escolar?
4. **Testes**: Onde testar com criancas reais?

---

## Timeline Sugerida

| Semana | Atividade |
|--------|-----------|
| 1 | Validar hardware + corrigir bugs |
| 2 | Testar IA com usuarios reais |
| 3 | Ajustar prompts e comandos |
| 4 | Documentar e preparar demo |

---

*Documento gerado em 06/02/2026 - Versao 0.1*
