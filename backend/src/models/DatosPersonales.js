
import { Sequelize } from 'sequelize';
import sequelize from '../database';

class DatosPersonales extends Sequelize.Model {}

DatosPersonales.init({
  rut: Sequelize.DataTypes.STRING,
  nombre: Sequelize.DataTypes.STRING,
  valorUF: Sequelize.DataTypes.FLOAT,
  plazoCuota: Sequelize.DataTypes.INTEGER,
  total: Sequelize.DataTypes.FLOAT,
}, {
  sequelize,
  modelName: 'DatosPersonales',
});

export default DatosPersonales;
