// PersonalInfoForm.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InputField from './InputField';


export default function PersonalInfoForm({ formData, setFormData, cuota, setCuota,taza, plazo, total,VUF }) {
  const [rut, setRut] = useState('');
  const [nombre, setNombre] = useState('');


  const enviarDatosPersonales = async (event) => {
    event.preventDefault();

    let clienteId = await verificarClienteExistente(parseInt(rut, 10));

    if (!clienteId) {
      console.log('No se encontró un cliente existente. Creando un nuevo cliente.');
      const nuevoCliente = {
        id: parseInt(rut, 10),
        nombre: nombre,
      };
      const responseCliente = await crearNuevoCliente(nuevoCliente);
      clienteId = parseInt(rut, 10);
    }

    const datosPersonales = {
      rutSolicitante: clienteId,
      nombre,
      tasa: parseInt(taza, 10),
      valorUF: parseFloat(VUF),
      plazo: parseInt(plazo, 10),
      total: parseFloat(total, 10),
      cuota: parseFloat(cuota),  
    };
    console.log('Cuota en PersonalInfoForm:', cuota);
    try {
      console.log(datosPersonales);
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/requests`, datosPersonales);

      if (response.ok) {
        console.log('Datos enviados con éxito');
      } else {
        console.error('Error al enviar datos:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error de red:', error.message);
    }
  };

  const verificarClienteExistente = async (rut) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/clients/?id=${rut}`);
      const filteredClients = response.data.filter(client => client.id === rut);

      if (filteredClients.length > 0) {
        return filteredClients[0].id;
      } else {
        console.log('No se encontró un cliente existente con el ID específico (rut).');
        return null;
      }
    } catch (error) {
      console.error('Error al verificar cliente existente:', error.message);
      return null;
    }
  };

  const crearNuevoCliente = async (nuevoCliente) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/clients`, nuevoCliente);
      return response.data;
    } catch (error) {
      console.error('Error al crear nuevo cliente:', error.message);
      throw error;
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <form onSubmit={enviarDatosPersonales}>
          <h2 className="text-center">Datos Personales</h2>
          <InputField
            label="RUT Solicitante"
            id="rut"
            name="rut"
            value={rut}
            onChange={(e) => setRut(e.target.value)}
          />
          <InputField
            label="Nombre"
            id="nombre"
            name="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <button type="submit" className="btn btn-primary" style={{backgroundColor: '#164863', color: '#FFFFFF', border: '2px solid #9BBEC8'}}>
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}
