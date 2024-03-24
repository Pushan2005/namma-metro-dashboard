#include <SPI.h>
#include <MFRC522.h>
#include <Servo.h>

#define SS_PIN 10
#define RST_PIN 7

MFRC522 rfid(SS_PIN, RST_PIN); // Instance of the class
MFRC522::MIFARE_Key key;

Servo doorServo; // Create a servo object to control the door

bool doorOpen = false; // Flag to keep track of the door state

void setup() {
  Serial.begin(9600);
  doorServo.attach(9); // Attaches the servo to pin 9
  SPI.begin(); // Init SPI bus
  rfid.PCD_Init(); // Init RC522
}

void loop() {
  // Reset the loop if no new card present on the sensor/reader. This saves the entire process when idle.
  if (!rfid.PICC_IsNewCardPresent())
    return;

  // Verify if the NUID has been read
  if (!rfid.PICC_ReadCardSerial())
    return;

  MFRC522::PICC_Type piccType = rfid.PICC_GetType(rfid.uid.sak);

  Serial.print(F("RFID Tag UID:"));
  printHex(rfid.uid.uidByte, rfid.uid.size);
  Serial.println("");

  // Open the door if it's closed
  if (!doorOpen) {
    openDoor();
    delay(1000); // Wait for 2 seconds
    closeDoor();
  }

  rfid.PICC_HaltA(); // Halt PICC
}

void openDoor() {
  doorServo.write(90); // Rotate servo to open position (adjust this angle as per your servo and door mechanism)
  doorOpen = true;
}

void closeDoor() {
  doorServo.write(0); // Rotate servo to closed position (adjust this angle as per your servo and door mechanism)
  doorOpen = false;
}

// Routine to dump a byte array as hex values to Serial.
void printHex(byte *buffer, byte bufferSize) {
  for (byte i = 0; i < bufferSize; i++) {
    Serial.print(buffer[i] < 0x10 ? " 0" : " ");
    Serial.print(buffer[i], HEX);
  }
}
