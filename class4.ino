/*
  Web Server
 A simple web server that shows the value of the analog input pins.
 using an Arduino Wiznet Ethernet shield.
 Circuit:
 * Ethernet shield attached to pins 10, 11, 12, 13
 * Analog inputs attached to pins A0 through A5 (optional)
 created 18 Dec 2009
 by David A. Mellis
 modified 9 Apr 2012
 by Tom Igoe
 modified 02 Sept 2015
 by Arturo Guadalupi
 Besides that, this project was modified by Matheus Vrech and Bruna Zamith for university classes purpose, enjoy it
 */

/*
 * Libraries and Definitions
 *****************************************************/
#include <SPI.h>
#include <Ethernet.h>
#include <Wire.h>

/*
 * Ethernet Configuration
 *****************************************************/
byte mac[] = {
  0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED
};

IPAddress ip(200, 18, 97, 11);
EthernetServer server(80);

/*
 * Motor Configuration
 *****************************************************/
 int motorPin1 = 5,
  motorPin2 = 6,
  _speed = 0,
  _direction = 1;

/*
 * Setup
 *****************************************************/
void setup() {
  Serial.begin(9600);
  while (!Serial) {}
  Ethernet.begin(mac, ip);
  server.begin();
  Serial.print("server is at ");
  Serial.println(Ethernet.localIP());

  pinMode(5, OUTPUT);
  pinMode(6, OUTPUT);
}

/*
 * Loop
 *****************************************************/
void loop() {
  //myStepper.step(1);
  if (digitalRead(pinButton)) {
    counter++;
  }

  EthernetClient client = server.available();
  /* Get the http packet */
  String readString; 
  if (client) {
    boolean currentLineIsBlank = true;
    while (client.connected()) {
      if (client.available()) {
        char c = client.read();
        
         Serial.write(c);
         
        /* Store the entire packet */
        if (readString.length() < 100) {
          readString += c;
        } 

        /* Receive GET commands */
        if (readString.indexOf("lighton") > 0) {
          digitalWrite(LED_BUILTIN, HIGH);
          client.println("HTTP/1.1 200 OK");
          break;
        }
        else if (readString.indexOf("lightoff") > 0) {
          digitalWrite(LED_BUILTIN, LOW);
          client.println("HTTP/1.1 200 OK");
          break;
        }
        /* working with our motor right now */
        else if (readString.indexOf("dc_slow") > 0) {
          _speed = 160;
          client.println("HTTP/1.1 200 OK");
          break;
        }
        else if (readString.indexOf("dc_medium") > 0) {
          _speed = 200;
          client.println("HTTP/1.1 200 OK");
          break;
        }
        else if (readString.indexOf("dc_fast") > 0) {
          _speed = 255;
          client.println("HTTP/1.1 200 OK");
          break;
        }
        else if (readString.indexOf("dc_stop") > 0) {
          _speed = 0;
          client.println("HTTP/1.1 200 OK");
          break;
        }
        else if (readString.indexOf("dc_reverse") > 0) {
          _direction = _direction ? -1 : 1;
          client.println("HTTP/1.1 200 OK");
          break;
        }
        /* end of motor functions */                                                   
        if (c == '\n' && currentLineIsBlank) {
          client.println("HTTP/1.1 200 OK");
          client.println("Content-Type: text/html");
          client.println("Connection: keep-alive"); 
          //client.println("Refresh: 5");  // refresh the page automatically every 5 sec
          client.println();
          client.println("<!DOCTYPE HTML>");
          client.println("<html>");
          client.println("<head></head>");
          /* easter egg for ninjas */
          client.println("<body>i'm a happy arduino, and you found my easter egg!<br>curiosity will kill you anyway.</body>");
          client.println("</html>");
        }
        if (c == '\n') {
          currentLineIsBlank = true;
        } else if (c != '\r') {
          currentLineIsBlank = false;
        }
      }
    }

    /* wait for something: nothing at all*/
    delay(1);
    //client.stop();
    //Serial.println("client disconnected");
  }
}
