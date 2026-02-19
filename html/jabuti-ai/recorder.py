import time
import speech_recognition as sr

class LiveSpeechRecognizer:
    def __init__(self, interval=60):
        self.recognizer = sr.Recognizer()
        self.microphone = sr.Microphone()
        self.interval = interval
        self.last_adjusted_time = 0
        # ===== AJUSTES PARA AMBIENTE COM MUITO RUÍDO (EVENTOS) =====
        r = self.recognizer

        r.dynamic_energy_threshold = True
        r.dynamic_energy_adjustment_damping = 0.10   # reage rápido a mudança de ruído
        r.dynamic_energy_ratio = 2.2                # exige voz bem acima do ruído

        # piso mínimo de energia (evita captar música/eco distante)
        r.energy_threshold = max(r.energy_threshold, 400)

        # corte de fala mais agressivo
        r.pause_threshold = 0.55
        r.non_speaking_duration = 0.25
        r.phrase_threshold = 0.25
        #====================
        
        # Ajustes para “cortar” melhor a fala (ajuste fino depois)
        self.recognizer.pause_threshold = 0.7
        self.recognizer.non_speaking_duration = 0.35
        self.recognizer.phrase_threshold = 0.2

        # energia dinâmica ajuda em ruído variável
        self.recognizer.dynamic_energy_threshold = True

        # calibração inicial
        self._calibrate()

    def _calibrate(self):
        with self.microphone as source:
            self.recognizer.adjust_for_ambient_noise(source, duration=0.6)
        self.last_adjusted_time = time.time()

    def adjust_ambient_noise_if_needed(self):
        if time.time() - self.last_adjusted_time > self.interval:
            self._calibrate()

    def live_speech(self, wait_time=10, phrase_time_limit=8):
        """
        wait_time: tempo máximo aguardando alguém começar a falar
        phrase_time_limit: tempo máximo gravando uma fala (força corte mesmo com ruído)
        """
        while True:
            self.adjust_ambient_noise_if_needed()

            # ✅ abre e fecha o microfone a cada ciclo (não cruza yield com 'with')
            with self.microphone as source:
                print("Por favor, diga algo...")
                try:
                    audio = self.recognizer.listen(
                        source,
                        timeout=wait_time,
                        phrase_time_limit=phrase_time_limit
                    )
                except sr.WaitTimeoutError:
                    continue

            try:
                text = self.recognizer.recognize_google(audio, language="pt-BR")
                yield text
            except sr.RequestError:
                yield "Erro de API; verifique sua conexão com a internet"
            except sr.UnknownValueError:
                yield "Não foi possível entender a entrada de áudio"
