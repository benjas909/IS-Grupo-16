import React from 'react'
import { useState  } from 'react';

export default function index() {
    const [formData, setFormData] = useState({
        tasa: '',
        plazo: '',
        calculo: '',
      })

   
    const [calculo, setCalulo] = useState("")
    const imprimirCalculo = (event)=>{
        event.preventDefault()
        const resultado = calcular(formData.tasa, formData.plazo);
        setCalulo(resultado)


    }
    const calcular= (tasa, plazo)=>{
        return (tasa * plazo);
    }

    const handleInputChange = (event)=>{
        const { name , value}= event.target;
        setFormData({
            ...formData,
            [name]: value,
        })

    }

    return (
            <div>
                Simulación de prestamo
                <form onSubmit={imprimirCalculo}>
                    <label for="tasa">Tasa de prestamo:</label>
                    <input type="text" id="tasa" name="tasa" value={formData.tasa} onChange={handleInputChange}></input><br></br>
                    <label for="plazo">Plazo de prestamo:</label>
                    <input type="text" id="plazo" name="plazo" value={formData.plazo} onChange={handleInputChange}></input><br></br>
                    <input type="submit" value="Calcular" ></input>
                </form>
                Su la UF de hoy es: <br></br>
                Calculo: {calculo}

            </div>
            
        )
}