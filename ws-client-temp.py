#https://pypi.org/project/websocket-client/

import datetime
import random
from websocket import create_connection

f = open("temp-data.txt","r")                # считываем 
lines = f.readlines()
f.close()

i=0
f = open("temp-data.txt","w")                # перезаписываем (всё без первой строки)
for line in lines:
  if i!=0 or len(lines)<10:
    f.write(line)
  i+=1

# {'date':'2022-06-06 06:10:47.403466', 'value':0.612}
now = datetime.datetime.now()
val = random.randint(-1000, 1000)/1000.0
n = f.write("{'date':'"+str(now)+"', 'value':"+str(val)+"}\n") 
f.close()

#============================
#ws = create_connection("ws://echo.websocket.events/")
ws = create_connection("ws://vlasikovvlasikov.asuscomm.com:8000")
#print(ws.recv())
ws.send("ws-client-temp.py: new data")
print("Sent ws-client-temp: new data")
#print("Receiving...")
#result =  ws.recv()
#print("Received '%s'" % result)
ws.close()