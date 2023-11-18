import { Sequelize } from "sequelize";
import sequelize from "../database.js";
class Request extends Sequelize.Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
    Request.belongsTo(models.client, {
      foreignKey: "rutSolicitante",
    });
  }
}
Request.init(
  {
    tasa: Sequelize.DataTypes.INTEGER,
    valorUF: Sequelize.DataTypes.FLOAT,
    plazo: Sequelize.DataTypes.INTEGER,
    cuota: Sequelize.DataTypes.INTEGER,
    total: Sequelize.DataTypes.INTEGER,
  },
  {
    sequelize,
    modelName: "Request",
  }
);

export default Request;
