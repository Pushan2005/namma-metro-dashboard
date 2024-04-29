import serial as Serial
import time
import csv
from datetime import datetime
import threading

# change COM port if using on different machine
ports = ['COM10', 'COM9', 'COM6']
sers = [Serial.Serial(port, 9600, timeout=1) for port in ports]
time.sleep(2)

uid_status = {}
data = []

def listen_to_port(ser, port):
    global uid_status, data
    while True:
        if ser.in_waiting > 0:
            line = ser.readline().decode('utf-8').rstrip()
            current_datetime = datetime.now()
            current_date = current_datetime.strftime('%Y-%m-%d')
            current_time = current_datetime.strftime('%H:%M:%S')
            
            if line in uid_status:
                status = 'Out'
                del uid_status[line]
            else:
                status = 'In'
                uid_status[line] = True
            
            data.append([current_date, current_time, line, status, port])

for ser, port in zip(sers, ports):
    threading.Thread(target=listen_to_port, args=(ser, port)).start()
    
with open('rfid_data.csv', 'w', newline='') as file:
    writer = csv.writer(file)
    writer.writerow(['Date', 'Time', 'UID', 'Check', 'COM'])
    while True:
        if data:
            writer.writerows(data)
            file.flush()
            data = []
        time.sleep(1)