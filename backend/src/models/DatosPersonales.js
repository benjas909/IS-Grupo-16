import { Sequelize } from "sequelize";
import sequelize from "../database";

class DatosCliente extends Sequelize.Model {}

DatosCliente.init(
  {
    rut: Sequelize.DataTypes.STRING,
    nombre: Sequelize.DataTypes.STRING,
    valorUF: Sequelize.DataTypes.FLOAT,
    plazoCuota: Sequelize.DataTypes.INTEGER,
    total: Sequelize.DataTypes.FLOAT,
  },
  {
    sequelize,
    modelName: "DatosCliente",
  }
);

export default DatosCliente;
