#include <WiFi.h>
#include <PicoMQTT.h>

// Replace with your network credentials
const char* ssid     = "ESP32-Access-Point";
const char* password = "123456789";

// Set web server port number to 80
WiFiServer server(80);

// Variable to store the HTTP request
String header;

const int buttonPin = 4;

// check if is button is held or not for sending a message

int buttonState = 0;
int buttonPressed = 0;


class MQTT: public PicoMQTT::Server {
    protected:
        PicoMQTT::ConnectReturnCode auth(const char * client_id, const char * username, const char * password) override {
            // only accept client IDs which are 3 chars or longer
            if (String(client_id).length() < 3) {    // client_id is never NULL
                return PicoMQTT::CRC_IDENTIFIER_REJECTED;
            }

            // only accept connections if username and password are provided
            if (!username || !password) {  // username and password can be NULL
                // no username or password supplied
                return PicoMQTT::CRC_NOT_AUTHORIZED;
            }

            // accept two user/password combinations
            if ((String(password) == "secret")) {
                return PicoMQTT::CRC_ACCEPTED;
            }

            // reject all other credentials
            return PicoMQTT::CRC_BAD_USERNAME_OR_PASSWORD;
        }
} mqtt;

unsigned long last_publish_time = 0;
int greeting_number = 1;

void setup() {
  Serial.begin(115200);
  // Initialize the output variables as outputs

  pinMode(buttonPin, INPUT);

  // Connect to Wi-Fi network with SSID and password
  Serial.print("Setting AP (Access Point)…");
  // Remove the password parameter, if you want the AP (Access Point) to be open
  WiFi.softAP(ssid, password);

  IPAddress IP = WiFi.softAPIP();
  Serial.print("AP IP address: ");
  Serial.println(IP);
  Serial.println(WiFi.localIP());

  mqtt.subscribe("#", [](const char * topic, const char * payload) {
     // payload might be binary, but PicoMQTT guarantees that it's zero-terminated  
     Serial.printf("Received message in topic '%s': %s\n", topic, payload);
  });

  mqtt.begin();
}

void loop() {

    mqtt.loop();
    buttonState = digitalRead(buttonPin);
    if (buttonState == 1) {
      if (buttonPressed == 0) {
        Serial.println(buttonState);
        String t = "sensorButon/esp-" + WiFi.macAddress();
        String m = "Button has been pressed";
        Serial.printf("Publishing message in topic '%s': %s\n", t.c_str(), m.c_str());
        mqtt.publish(t, m);
        buttonPressed = 1;
      }
    }

    if (buttonState == 0) {
      buttonPressed = 0;
    }
    // Publish a greeting message every 10 seconds.
    if (millis() - last_publish_time >= 10000) {
        // We're publishing to a topic, which we're subscribed too, but these message will *not* be delivered locally.
        String topic = "picomqtt/esp-" + WiFi.macAddress();
        String message = "Hello #" + String(greeting_number++);
        Serial.printf("Publishing message in topic '%s': %s\n", topic.c_str(), message.c_str());
        mqtt.publish(topic, message);
        last_publish_time = millis();
    }

    

    
}
