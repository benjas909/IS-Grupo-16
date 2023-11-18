"use strict";
import { Sequelize } from "sequelize";
import sequelize from "../database.js";
class Client extends Sequelize.Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
    Client.hasMany(models.Request, {
      foreignKey: "rutSolicitante",
    });
  }
}
Client.init(
  {
    name: Sequelize.DataTypes.STRING,
    age: Sequelize.DataTypes.INTEGER,
  },
  {
    sequelize,
    modelName: "Client",
  }
);

export default Client;
