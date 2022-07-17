# -*- coding: utf-8 -*-
from lxml import etree
 
def parseXML(xmlFile):
    """
    Парсинг XML
    """
    with open(xmlFile) as fobj:
        xml = fobj.read()
    
    root = etree.fromstring(xml)
    
    #for appt in root.getchildren():
    for elem in root.getchildren():
            if not elem.text:
                text = "None"
            else:
                text = elem.text
            
            print(elem.tag + " => " + text)
 
 
if __name__ == "__main__":
    parseXML("config.xml")