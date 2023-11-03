import React from 'react'

export default function index() {
    const calcularPrestamo = (event)=>{
        
    }

    return (
            <div>
                Simulación de prestamo
                <form onSubmit={calcularPrestamo}>
                    <label for="tasa">Tasa de prestamo:</label>
                    <input type="text" id="tasa" name="tasa"></input><br></br>
                    <label for="plazo">Plazo de prestamo:</label>
                    <input type="text" id="plazo" name="plazo"></input><br></br>
                    <input type="submit" value="Calcular"></input>
                </form>
            </div>
            
        )
}