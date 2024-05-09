import requests
import unittest
from splinter import Browser
import time

def procesar_resultado(texto:str):
    val = texto.split(":")[1].strip().split(" ")[0].strip()
    return float(val)

def simulacion(valorCredito, tasa, plazo):
    tup = ['valorUF','cuotasUF','totalUF','cuotasCLP','totalCLP']
    r = []
    with Browser() as browser:
        browser.visit("http://localhost:3000/")
        browser.fill('valorCredito', valorCredito)
        browser.fill('tasa', tasa)
        browser.fill('plazo', plazo)
        browser.find_by_id('botonPrestamo').first.click()
        browser.find_by_id('botonPrestamo').first.click()
        aux = lambda x: procesar_resultado(browser.find_by_id(x)[0].text)
        r = list(map(aux,tup))
    return r

"""with Browser() as browser:
    browser.visit("http://localhost:3000/")
    browser.fill('valorCredito', '3')
    browser.fill('tasa', '21')
    browser.fill('plazo', '8')
    browser.find_by_id('botonPrestamo').first.click()
    browser.find_by_id('botonPrestamo').first.click()
    copied_text = browser.find_by_id('valorUF')[0].text
    copied_text2 = browser.find_by_id('cuotasUF')[0].text
    copied_text3 = browser.find_by_id('totalUF')[0].text
    copied_text4 = browser.find_by_id('cuotasCLP')[0].text
    copied_text5 = browser.find_by_id('totalCLP')[0].text

    print(procesar_resultado(copied_text))
    print(procesar_resultado(copied_text2))
    print(procesar_resultado(copied_text3))
    print(procesar_resultado(copied_text4))
    print(procesar_resultado(copied_text5))"""

v = requests.get("https://api.cmfchile.cl/api-sbifv3/recursos_api/uf?apikey=599cd22316598c0ec9fc843e23b2cdcc077159ba&formato=JSON")
print(v.text)


class LoanFormTest(unittest.TestCase):
    
    @classmethod
    def setUpClass(cls):
        cls.url = "http://localhost:3000/"

    
    def basic_test(self):
        valorUF,cuotasUF,totalUF,cuotasCLP,totalCLP = simulacion(1,1,1)
        v = 
