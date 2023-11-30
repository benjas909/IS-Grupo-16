// PersonalInfoForm.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InputField from './InputField';


export default function PersonalInfoForm({ formData, setFormData, cuota, setCuota }) {
  const [rut, setRut] = useState('');
  const [nombre, setNombre] = useState('');
  const [tasaP, setTasaP] = useState('');
  const [valorUF, setValorUF] = useState('');
  const [plazoCuota, setPlazoCuota] = useState('');
  const [total, setTotal] = useState('');

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
      tasa: parseInt(tasaP, 10),
      valorUF: parseFloat(valorUF),
      plazo: parseInt(plazoCuota, 10),
      total: parseInt(total, 10),
      cuota: parseInt(cuota),  
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
          <InputField
            label="Tasa de préstamos"
            id="tasaP"
            name="tasaP"
            value={tasaP}
            onChange={(e) => setTasaP(e.target.value)}
          />
          <InputField
            label="Valor UF"
            id="valorUF"
            name="valorUF"
            value={valorUF}
            onChange={(e) => setValorUF(e.target.value)}
          />
          <InputField
            label="Plazo de préstamo"
            id="plazoCuota"
            name="plazoCuota"
            value={plazoCuota}
            onChange={(e) => setPlazoCuota(e.target.value)}
          />
          <InputField
            label="Total"
            id="total"
            name="total"
            value={total}
            onChange={(e) => setTotal(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}
