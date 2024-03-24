import serial as Serial
import time
import csv
from datetime import datetime

# Set up the serial connection (COM port may vary)
ser = Serial.Serial('COM10', 9600, timeout=1)
time.sleep(2)  # wait for the connection to initialize

with open('misc/rfid_data.csv', 'w', newline='') as file:
    writer = csv.writer(file)
    writer.writerow(['Date', 'Time', 'UID'])
    while True:
        if ser.in_waiting > 0:
            line = ser.readline().decode('utf-8').rstrip()
            current_datetime = datetime.now()
            current_date = current_datetime.strftime('%Y-%m-%d')
            current_time = current_datetime.strftime('%H:%M:%S')
            writer.writerow([current_date, current_time, line])
            file.flush()