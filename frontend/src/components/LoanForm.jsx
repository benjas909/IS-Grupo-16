
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InputField from './InputField';

export default function LoanForm() {
  const [formData, setFormData] = useState({
    valorCredito: '',
    tasa: '',
    plazo: '',
    cuotaUF: '0',
    totalUF: '0',
    cuotaClp: '0',
    totalClp: '0',
  });

  const [cuota, setCuota] = useState('');
  const [valorUF, setValorUF] = useState('');

  useEffect(() => {
    axios
      .get("https://api.cmfchile.cl/api-sbifv3/recursos_api/uf?apikey=599cd22316598c0ec9fc843e23b2cdcc077159ba&formato=JSON")
      .then(res => {
        const data = res.data;
        setValorUF(data.UFs[0].Valor);
      })
      .catch(error => {
        console.error("Error conectando con api UF:", error);
      });
  }, []);

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
    var tasa = parseFloat(tasa / 100);
    const cuota = ((valor * tasa) / (1 - Math.pow((1 + tasa), -plazo))).toFixed(2);

    return cuota;
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
          <button type="submit" className="btn btn-primary">
            Calcular
          </button>
        </form>
        <div>Valor UF hoy: {valorUF}</div>
        <div>Sus cuotas serían de: {formData.cuotaUF} UF</div>
        <div>Total: {formData.totalUF} UF</div>
        <div>Sus cuotas serían de: {formData.cuotaClp} CLP</div>
        <div>Total: {formData.totalClp} CLP</div>
      </div>
    </div>
  );
}
