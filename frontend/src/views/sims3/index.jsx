import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

export default function Index() {
  const history = useHistory();
  
  
  const [formData, setFormData] = useState({
    valorCredito: '',
    tasa: '',
    plazo: '',
    cuotaUF: '0',
    totalUF: '0',
    cuotaClp: '0',
    totalClp: '0',
  })
  
  const [cuota, setCuota] = useState('');
  const [rut, setRut] = useState('');
  const [nombre, setNombre] = useState('');
  const [valorUF, setValorUF] = useState('');
  const [plazoCuota, setPlazoCuota] = useState('');
  const [total, setTotal] = useState('');
  const [tasaP, setTasaP] = useState('');
  
  useEffect(() => {
    axios.get("https://api.cmfchile.cl/api-sbifv3/recursos_api/uf?apikey=599cd22316598c0ec9fc843e23b2cdcc077159ba&formato=JSON")
      .then(res => {
        console.log(res)
        const data = res.data;
        setValorUF(data.UFs[0].Valor)
      })
      .catch(error => {
      console.error("Error conectando con api UF:", error);
      })
  },[]);


  


  useEffect(() => {
    console.log('Cuota actualizada:', formData.cuotaUF);
  }, [formData.cuotaUF]);


  const imprimirCalculo = (event) => {
    event.preventDefault();
    const cuotaUF = calcularCuota(formData.tasa, formData.plazo, formData.valorCredito);
    setFormData({ ...formData, cuotaUF: cuotaUF });
    setCuota(cuotaUF);

  };

  const calcularCuota = (tasa, plazo, valor) => {
    var tasa = parseFloat(tasa/100)
    const cuota = ((valor * tasa) / ( 1 - Math.pow((1+tasa),(-plazo)))).toFixed(2)
    
    return cuota;
  };

  const calcularUFTotal = (cuota, plazo) =>{
    return ((cuota*plazo).toFixed(2))
  };

  const calcularCuotaClp = (cuota, valorUF) => {
    return ((cuota*valorUF).toFixed(2))
  };

  const calcularTotalClp =(UFtotal, valorUF) => {
    return ((UFtotal * valorUF).toFixed(2))
  };


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const enviarDatosPersonales = async (event) => {
    event.preventDefault();

    let clienteId = await verificarClienteExistente(parseInt(rut, 10));

    if (!clienteId) {
      console.log('No se encontró un cliente existente. Creando un nuevo cliente.')
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
      cuota: parseInt(formData.cuotaUF, 10),
    };
    

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
    <div>
      <div className="container">
        <h2 className="text-center">Préstamos</h2>
        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <form onSubmit={imprimirCalculo}>
                  <h2 className="text-center">Simulaciones:</h2>
                  <div className="form-group">
                    <label htmlFor="valorCredito">Valor del credito:</label>
                    <input
                      type="text"
                      id="valorCredito"
                      name="valorCredito"
                      value={formData.valorCredito}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="tasa">Tasa de préstamo:</label>
                    <input
                      type="text"
                      id="tasa"
                      name="tasa"
                      value={formData.tasa}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="plazo">Plazo de préstamo:</label>
                    <input
                      type="text"
                      id="plazo"
                      name="plazo"
                      value={formData.plazo}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Calcular
                  </button>
                </form>
                <div>Valor UF hoy: {valorUF}</div>
                <div>Sus cuotas serían de: {formData.cuotaUF} UF</div>
                <div>Total: {formData.totalUF} UF</div>
                <div>Sus cuotas serían de: {formData.cuotaClp} Clp</div>
                <div>Total: {formData.totalClp} Clp</div>

              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <form onSubmit={enviarDatosPersonales}>
                  <h2 className="text-center">Datos Personales</h2>
                  <div className="form-group">
                    <label htmlFor="rut">RUT Solicitante:</label>
                    <input
                      type="text"
                      id="rut"
                      name="rut"
                      value={rut}
                      onChange={(e) => setRut(e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="nombre">Nombre:</label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="tasaP">Tasa de prestamos:</label>
                    <input
                      type="text"
                      id="tasaP"
                      name="tasaP"
                      value={tasaP}
                      onChange={(e) => setTasaP(e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="valorUF">Valor UF:</label>
                    <input
                      type="text"
                      id="valorUF"
                      name="valorUF"
                      value={valorUF}
                      onChange={(e) => setValorUF(e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="plazoCuota">Plazo de préstamo:</label>
                    <input
                      type="text"
                      id="plazoCuota"
                      name="plazoCuota"
                      value={plazoCuota}
                      onChange={(e) => setPlazoCuota(e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="total">Total:</label>
                    <input
                      type="text"
                      id="total"
                      name="total"
                      value={total}
                      onChange={(e) => setTotal(e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Enviar
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}