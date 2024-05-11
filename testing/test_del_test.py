
import requests
import unittest
import json


class LoanFormTest(unittest.TestCase):

    def test_create_user(self):
        post = {"nombre":"usuario", "email":"email@email.cl","password":"contra"}
        res = requests.post("http://localhost:8080/users/create", json=post)
        print(" ------------ ")
        print(" Inputs => nombre:usuario, email:email@email.cl,password:contra ")
        print(" Salida esperada => codigo 200, creacion exitosa ")
        print(" Contexto => Prueba de creacion usuario nuevo ")
        print(" ------------ ")
        print(res.status_code)
        print(" ------------ ")
    
        
    def test_get_user(self):
        res = json.loads(requests.get("http://localhost:8080/users").text)
        print(" ------------ ")
        print(" Inputs => ninguno")
        print(" Salida esperada => retorna los usuarios de la base de datos ")
        print(" Contexto => Prueba de GET tabla Users ")
        print(" ------------ ")
        for user in res:
            print(user)

    def test_get_clients(self):
        res = json.loads(requests.get("http://localhost:8080/clients").text)
        print(" ------------ ")
        print(" Inputs => ninguno")
        print(" Salida esperada => retorna los clientes de la base de datos ")
        print(" Contexto => Prueba de GET tabla Clientes ")
        print(" ------------ ")
        for client in res:
            print(client)
    
    def test_create_client(self):
        post = {"id":11,"name":"usuario11", "age":"22"}
        res = requests.post("http://localhost:8080/clients", json=post)
        print(" ------------ ")
        print(" Inputs => id:11, name:usuario11, age:22 ")
        print(" Salida esperada => codigo 200, creacion exitosa ")
        print(" Contexto => Prueba de creacion cliente nuevo ")
        print(" ------------ ")
        print(res.status_code)
        print(" ------------ ")
        
unittest.main()
