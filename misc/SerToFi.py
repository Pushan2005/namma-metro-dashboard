import serial as Serial
import time
import csv
from datetime import datetime

# Set up the serial connection (COM port may vary)
ser = Serial.Serial('COM10', 9600, timeout=1)
time.sleep(2)  # wait for the connection to initialize

with open('rfid_data.csv', 'w', newline='') as file:
    writer = csv.writer(file)
    while True:
        if ser.in_waiting > 0:
            line = ser.readline().decode('utf-8').rstrip()
            current_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')  # Corrected here
            writer.writerow([current_time, line])
            file.flush()