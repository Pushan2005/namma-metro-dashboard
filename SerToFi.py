import serial as Serial
import time
import csv

# Set up the serial connection (COM port may vary)
ser = Serial.Serial('COM10', 9600, timeout=1)
time.sleep(2)  # wait for the connection to initialize

with open('rfid_data.csv', 'w', newline='') as file:
    writer = csv.writer(file)
    while True:
        if ser.in_waiting > 0:
            line = ser.readline().decode('utf-8').rstrip()
            print(line)
            writer.writerow([line])