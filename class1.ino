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

 */

#include <SPI.h>
#include <Ethernet.h>
byte mac[] = {
  0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED
};
IPAddress ip(200, 18, 97, 11);
EthernetServer server(80);

void setup() {
  Serial.begin(9600);
  while (!Serial) {}
  Ethernet.begin(mac, ip);
  server.begin();
  Serial.print("server is at ");
  Serial.println(Ethernet.localIP());

  //DEFINE LED
  pinMode(LED_BUILTIN, OUTPUT);
}


void loop() {
  EthernetClient client = server.available();
  
  //GET HTTP PACKET
  String readString; 
  if (client) {
    boolean currentLineIsBlank = true;
    while (client.connected()) {
      if (client.available()) {
        char c = client.read();
        
        // ?
        char b = c;

        //STORE PACKET
        if (readString.length() < 100) {
          readString += c; 
        }

        //?
        c = b;
        
        //CHECK IF IT IS ON OR OFF
        if (readString.indexOf("lighton") > 0){
          digitalWrite(LED_BUILTIN, HIGH);  
        }
        else if (readString.indexOf("lightoff") > 0){
          digitalWrite(LED_BUILTIN, LOW);
        }


        if (c == '\n' && currentLineIsBlank) {
          client.println("HTTP/1.1 200 OK");
          client.println("Content-Type: text/html");
          client.println("Connection: close"); 
          //client.println("Refresh: 5");  // refresh the page automatically every 5 sec
          client.println();
          client.println("<!DOCTYPE HTML>");
          client.println("<html>");
          client.println("<a href=\"?lighton\">TURN ON</a></br>");
          client.println("<a href=\"?lightoff\">TURN OFF</a>");
          client.println("</html>");
          break;
        }
        if (c == '\n') {
          currentLineIsBlank = true;
        } else if (c != '\r') {
          currentLineIsBlank = false;
        }
      }
    }

    delay(1);
    client.stop();
    Serial.println("client disconnected");
  }
}
