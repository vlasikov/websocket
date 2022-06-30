# scraper.py
import requests
from bs4 import BeautifulSoup
from lxml import html

# получаем значения с сайта
url = 'https://yandex.ru/pogoda/?utm_campaign=informer&utm_medium=web&utm_content=main_informer&utm_source=home&utm_term=title'
response = requests.get(url)
soup = BeautifulSoup(response.text, 'lxml')

list_temp = soup.findAll('div', {'class': 'fact__hour-temp'})
list_label = soup.findAll('div', {'class': 'fact__hour-label'})

i=0
j=0
str_time=''
str_temp=''
str_temp_carrent=''
lines = []
for str in list_temp:
	#print(str)
	temp = list_temp[i]
	time = list_label[i]

	str_temp = ''.join(temp)				# в строку
	str_temp = str_temp.replace('+', "")
	str_temp = str_temp.replace('°', "")
	str_time = ''.join(time)				# в строку
	if(str_temp!='Восход' and  str_temp!='Закат'):
		#print(str_temp+'---'+str_time)
		lines.append ("{'time':'"+str_time+"', 'value':"+str_temp+"}")
		print(lines[j]);
		j += 1
	i += 1
str_temp_carrent = lines[0];				# текущая температура

i=0
f = open("temp-data-ya.txt","w")            # перезаписываем прогноз
for line in lines:
  	f.write(line+"\n")
f.close()
	
# файл с реальной (старой) температурой
f = open("temp-data.txt","r")               # считываем 
lines = f.readlines()
f.close()

i=0
f = open("temp-data.txt","w")               # перезаписываем старые значения (всё без первой строки)
for line in lines:
  if i!=0 or len(lines)<144:
    f.write(line)
  i+=1
f.write(str_temp_carrent +"\n") 			# текущее значение сохраняем
f.close()
