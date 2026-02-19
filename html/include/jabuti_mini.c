bool getPage();
void connectServer(const char _server[], const char _serverGate[]);
void quantConnections ();
void workMode();
void echoOff();
void connectRede(const char _nameRede[], const char _senhaRede[]);
void sendCommand();
String readCommand(bool _print = false);
void (* resetArduino)(void) = 0;

#include <SoftwareSerial.h>
SoftwareSerial SerialEsp(10, 11); // RX, TX

const char nomeRede[] = "$ssid";
const char senhaRede[] = "$senha_ssid";

const char HOST_NAME[] = "$hostname";
const char HOST_GATE[] = "$porta";

void setup() {
  Serial.begin(9600);
  SerialEsp.begin(9600);

  SerialEsp.println("AT+RST");
  delay(5000);
  readCommand();

  echoOff();
  workMode();
  quantConnections();
  connectRede(nomeRede, senhaRede);
  connectServer(HOST_NAME, HOST_GATE);
  getPage();
}

void loop() {

  sendCommand();
  readCommand(1);
}

bool getPage() {
  const char getCall[] = "GET /jabutiedu/executa_equipamento.php?nome_equipamento=$nome_equipamento&senha_equipamento=$senha_equipamento HTTP/1.0\r\n"
                         "Host: www.example.com\r\n"
                         "Accept: text/html\r\n"
                         "Accept-Encoding: gzip, deflate\r\n"
                         "User-Agent: JabutiMini - Esp8266 \r\n\r\n";

  SerialEsp.print("AT+CIPSEND=0,");
  SerialEsp.println(strlen(getCall));
  delay(10);
  while (!SerialEsp.available() > 0) {}
  SerialEsp.print(getCall);

  unsigned long tempo = millis();
  bool response = true;
  Serial.print("Aguardando dados ");
  while ('+' != SerialEsp.read()) {
    Serial.print(".");
    if ((millis() - tempo > 5000)) { // Time out resposta servidor
      response = false;
      break;
    }
    Serial.println();
  }

  // criar chamada funcao de leitura.

  if (response) { // se resposta OK, ler dados.
    tempo = millis();
    while (true) {
      if (SerialEsp.available() > 0) {
        tempo = millis();
        char commandEsp = SerialEsp.read();
        Serial.print(commandEsp);
      }
      if ((millis() - tempo > 20)) {
        break;
      }
    }

    Serial.println("Lido comandos");
    closeConnect();
    Serial.println("Fechada conexao");
  } else {
    Serial.println("Nao foi obtia resposta do serivdor");
    closeConnect();
    Serial.println("Fechada conexao");
  }
}

void closeConnect() {
  SerialEsp.println("AT+CIPCLOSE=0");
  readCommand();
}

void workMode() {
  SerialEsp.println("AT+CWMODE=1");
  while (!SerialEsp.available() > 0) {}
  readCommand();
}

void echoOff() {
  SerialEsp.println("ATE0");
  while (!SerialEsp.available() > 0) {}
  readCommand();
}

void connectServer(const char _server[], const char _serverGate[]) {
  SerialEsp.print("AT+CIPSTART=0,\"TCP\",\"");
  SerialEsp.print(_server);
  SerialEsp.print("\",");
  SerialEsp.println(_serverGate);

  unsigned long tempo = millis();
  bool timeOut = false;

  Serial.print("Conectando ao host ");
  while ((!SerialEsp.available() > 0) && (!timeOut)) {
    delay(500);
    Serial.print(".");
    if (millis() - tempo > 1500) {
      timeOut = true;
    }
  }
  if (timeOut) {
    Serial.println();
    Serial.println("Tempo para conexão ao host excedido!");
    delay(500);
    resetArduino();
  }
  readCommand(1);
}

void quantConnections () {
  SerialEsp.println("AT+CIPMUX=1");
  while (!SerialEsp.available() > 0) {}
  readCommand();
}

void connectRede(const char _nameRede[], const char _senhaRede[]) {

  SerialEsp.print("AT+CWJAP=\"");
  SerialEsp.print(_nameRede);
  SerialEsp.print("\",\"");
  SerialEsp.print(_senhaRede);
  SerialEsp.println("\"");

  unsigned long tempo = millis();
  bool timeOut = false;
  Serial.print("Conectando a rede ");

  while ((!SerialEsp.available() > 0) && (!timeOut)) {
    delay(500);
    Serial.print(".");

    if (millis() - tempo > 15000) {
      timeOut = true;
    }
  }
  if (timeOut) {
    Serial.println(" Nao foi possivel conectar ao wifi, vamos reiniciar e tentar novamente...");
    delay(500);
    resetArduino();
  }
  Serial.println();
  readCommand();
}

void sendCommand() {
  if (Serial.available() > 0) {
    unsigned long tempo = 0;
    while (true) {
      if (Serial.available() > 0) {
        tempo = millis();
        char commandEsp = Serial.read();
        SerialEsp.print(commandEsp);
      }
      if ((millis() - tempo > 20)) {
        break;
      }
    }
    SerialEsp.println();
  }
}

String readCommand(bool _print = false) {
  if (SerialEsp.available() > 0) {
    unsigned long tempo = 0;
    char commandEsp[256] = {'\0'};
    byte contCommandEsp = 0;

    while (contCommandEsp < 254) {
      if (SerialEsp.available() > 0) {
        tempo = millis();
        commandEsp[contCommandEsp] = SerialEsp.read();
        contCommandEsp++;
      }
      if ((millis() - tempo > 20)) {
        break;
      }
    }
    if (_print) {
      Serial.print(commandEsp);
    }
    return commandEsp;
  }
}