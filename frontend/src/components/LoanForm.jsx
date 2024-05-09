// loanform.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InputField from './InputField';

export default function LoanForm({ setCuota,settaza,setplazo,settotal,setVUF  }) {
  const [formData, setFormData] = useState({
    valorCredito: '',
    tasa: '',
    plazo: '',
    cuotaUF: '0',
    totalUF: '0',
    cuotaClP: '0',
    totalClP: '0',
  });

  const [valorUF, setValorUF] = useState('');

  useEffect(() => {
    axios
      .get("https://api.cmfchile.cl/api-sbifv3/recursos_api/uf?apikey=599cd22316598c0ec9fc843e23b2cdcc077159ba&formato=JSON")
      .then(res => {
        const data = res.data;
        setValorUF(parseInt(1000*parseFloat(data.UFs[0].Valor)));
      })
      .catch(error => {
        console.error("Error conectando con API CMF:", error);
      });
  }, []);

  useEffect(() => {
    console.log('Cuota actualizada:', formData.cuotaUF);
  }, [formData.cuotaUF]);


  const calcularCuota = (tasa, plazo, valor) => {
    var tasa = parseFloat(tasa / 100);
    const cuota = ((valor * tasa) / (1 - Math.pow((1 + tasa), -plazo))).toFixed(2);
    return cuota;
  };


  const calcularUFTotal = (cuota, plazo) =>{
    const totalUF = (cuota * plazo).toFixed(2);
    return totalUF;
  };

  const conversionCuotaCLP = (cuota, valorUF) =>{
    const cuotaCLP = (cuota * valorUF).toFixed(0);
    return cuotaCLP;
  };

  const conversionTotalCLP = (totalUF, valorUF) =>{
    const totalCLP = (totalUF * valorUF).toFixed(0);
    return totalCLP;
  };


  const imprimirCalculo = (event) => {
    event.preventDefault();
    const cuotaUF = calcularCuota(formData.tasa, formData.plazo, formData.valorCredito);
    const totalUF = calcularUFTotal(cuotaUF, formData.plazo);
    const cuotaCLP = conversionCuotaCLP(cuotaUF, valorUF);
    const totalCLP = conversionTotalCLP(totalUF, valorUF);

    setFormData({ ...formData, cuotaUF: cuotaUF, totalUF: totalUF, cuotaClP: cuotaCLP, totalClP: totalCLP});
    // setFormData({ ...formData, totalUF: totalUF});
    setCuota(cuotaUF);
    settaza(formData.tasa);
    setplazo(formData.plazo);
    settotal(totalUF);
    setVUF(valorUF)
  };


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="card">
      <div className="card-body">
        <form onSubmit={imprimirCalculo}>
          <h2 className="text-center">Simulaciones:</h2>
          <InputField
            label="Valor del crédito"
            id="valorCredito"
            name="valorCredito"
            value={formData.valorCredito}
            onChange={handleInputChange}
          />
          <InputField
            label="Tasa de préstamo"
            id="tasa"
            name="tasa"
            value={formData.tasa}
            onChange={handleInputChange}
          />
          <InputField
            label="Plazo de préstamo"
            id="plazo"
            name="plazo"
            value={formData.plazo}
            onChange={handleInputChange}
          />
          <button type="submit" name="botonPrestamo" id="botonPrestamo" className="bg-blue btn btn-primary" style={{backgroundColor: '#164863', color: '#FFFFFF', border: '2px solid #9BBEC8'}}>
            Calcular
          </button>
        </form>
        <div id="valorUF">Valor UF hoy: {valorUF} CLP</div>
        <div id="cuotasUF">Sus cuotas serían de: {formData.cuotaUF} UF</div>
        <div id="totalUF">Total: {formData.totalUF} UF</div>
        <div id="cuotasCLP">Sus cuotas serían de: {formData.cuotaClP} CLP</div>
        <div id="totalCLP">Total: {formData.totalClP} CLP</div>
        
      </div>
    </div>
  );
}
