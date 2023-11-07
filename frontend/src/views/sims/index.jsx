
import React, { useState } from 'react';

export default function Index() {
  const [formData, setFormData] = useState({
    tasa: '',
    plazo: '',
    calculo: '',
  });

  const [calculo, setCalculo] = useState('');
  const [rut, setRut] = useState('');
  const [nombre, setNombre] = useState('');
  const [valorUF, setValorUF] = useState('');
  const [plazoCuota, setPlazoCuota] = useState('');
  const [total, setTotal] = useState('');
  const [tasaP, setTasaP] = useState('');

  const imprimirCalculo = (event) => {
    event.preventDefault();
    const resultado = calcular(formData.tasa, formData.plazo);
    setCalculo(resultado);
  };

  const calcular = (tasa, plazo) => {
    return tasa * plazo;
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const enviarDatosPersonales = (event) => {
    event.preventDefault();

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
                <div>
                  Sus cuotas serían de: {calculo}
                </div>
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
