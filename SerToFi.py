import serial as Serial
import time

# Set up the serial connection (COM port may vary)
ser = Serial.Serial('COM3', 9600, timeout=1)
time.sleep(2)  # wait for the connection to initialize

with open('rfid_data.txt', 'w') as file:
    while True:
        if ser.in_waiting > 0:
            line = ser.readline().decode('utf-8').rstrip()
            print(line)
            file.write(line + '\n')
