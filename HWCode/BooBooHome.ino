/*  NETPIE ESP8266 basic sample                            */
/*  More information visit : https://netpie.io             */

#include <ESP8266WiFi.h>
#include <MicroGear.h>
#include <SoftwareSerial.h>

SoftwareSerial mySerial(13,15); //RX,TX

const char* ssid     = "Panyawut's iPhone";
const char* password = "ab1ab1ab1";


#define APPID   "BooBooHome"
#define KEY     "LxESkpmpJu6rYoZ"
#define SECRET  "GH5dbnX3PUlf6aRWvrNKq191a"
#define ALIAS   "esp8266"
#define Target  "web"

WiFiClient client;

int timer = 0;
MicroGear microgear(client);


/* If a new message arrives, do this */
void onMsghandler(char *topic, uint8_t* msg, unsigned int msglen) {
    Serial.print("Incoming message --> ");
    msg[msglen] = '\0';
    mySerial.print((char *)msg);
    Serial.println((char *)msg);
}

void onFoundgear(char *attribute, uint8_t* msg, unsigned int msglen) {
    Serial.print("Found new member --> ");
    for (int i=0; i<msglen; i++)
        Serial.print((char)msg[i]);
    Serial.println();  
}

void onLostgear(char *attribute, uint8_t* msg, unsigned int msglen) {
    Serial.print("Lost member --> ");
    for (int i=0; i<msglen; i++)
        Serial.print((char)msg[i]);
    Serial.println();
}

/* When a microgear is connected, do this */
void onConnected(char *attribute, uint8_t* msg, unsigned int msglen) {
    Serial.println("Connected to NETPIE...");
    /* Set the alias of this microgear ALIAS */
    microgear.setAlias(ALIAS);
}


void setup() {
    /* Add Event listeners */
    /* Call onMsghandler() when new message arraives */
    microgear.on(MESSAGE,onMsghandler);

    /* Call onFoundgear() when new gear appear */
    microgear.on(PRESENT,onFoundgear);

    /* Call onLostgear() when some gear goes offline */
    microgear.on(ABSENT,onLostgear);

    /* Call onConnected() when NETPIE connection is established */
    microgear.on(CONNECTED,onConnected);

    Serial.begin(115200);
    Serial.println("Starting...");

    /* Initial WIFI, this is just a basic method to configure WIFI on ESP8266.                       */
    /* You may want to use other method that is more complicated, but provide better user experience */
    if (WiFi.begin(ssid, password)) {
        while (WiFi.status() != WL_CONNECTED) {
            delay(500);
            Serial.print(".");
        }
    }

    Serial.println("WiFi connected");  
    Serial.println("IP address: ");
    Serial.println(WiFi.localIP());

    /* Initial with KEY, SECRET and also set the ALIAS here */
    microgear.init(KEY,SECRET,ALIAS);

    /* connect to NETPIE to a specific APPID */
    microgear.connect(APPID);
    Serial.println("Set up Complete");

    mySerial.begin(115200);

}

void loop() {
    /* To check if the microgear is still connected */
    if (microgear.connected()) {
        //Serial.println("connected");
        microgear.loop();
        if(mySerial.available()){
          String tmp =  mySerial.readStringUntil('a');
          
          //Serial.println(tmp.length());
          if(tmp != ""){
              Serial.println(tmp);
              microgear.chat(Target ,tmp);
              Serial.println("Success");
          }  
          
          //microgear.chat(Target ,250); // <- function ส่งขึ้นเน็ตพาย
        }
    }
    else {
        Serial.println("connection lost, reconnect...");
        if (timer >= 500) {
            microgear.connect(APPID);
            timer = 0;
        }
        else timer += 100;
    }
}
