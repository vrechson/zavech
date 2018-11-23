#include<SPI.h>
#include<Wire.h>

#define MOTOR1 5
#define MOTOR2 6

int velocidade = 0;

void setup(){
  Serial.begin(9600);
  pinMode(MOTOR1,OUTPUT);
  pinMode(MOTOR2,OUTPUT);
  delay(1000);
}

void loop(){
  int recebeValor = analogRead(A12);
  Serial.println(recebeValor);
  velocidade = 150;
  analogWrite(MOTOR1,velocidade);
  analogWrite(MOTOR2,0);
}

