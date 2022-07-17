# -*- coding: utf-8 -*-
import xml.etree.ElementTree as xml

def createXML(filename):
    """
    Создаем XML файл.
    """
    root = xml.Element("configuration")

    url = xml.SubElement(root, "url")
    url.text = "https://yandex.ru/pogoda/?utm_campaign=informer&utm_medium=web&utm_content=main_informer&utm_source=home&utm_term=title"
    #root.append(url)

    appt = xml.Element("appointment")
    root.append(appt)
    
    # создаем дочерний суб-элемент. 
    begin = xml.SubElement(appt, "begin")
    begin.text = "1181251680"
    
    uid = xml.SubElement(appt, "uid")
    uid.text = "040000008200E000"
    
    alarmTime = xml.SubElement(appt, "alarmTime")
    alarmTime.text = "1181572063"
    
    state = xml.SubElement(appt, "state")
    
    location = xml.SubElement(appt, "location")
    
    duration = xml.SubElement(appt, "duration")
    duration.text = "1800"
    
    subject = xml.SubElement(appt, "subject")
    
    tree = xml.ElementTree(root)
    with open(filename, "wb") as fh:
        tree.write(fh)

if __name__ == "__main__":
    createXML("config.xml")