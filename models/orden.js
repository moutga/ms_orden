"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Orden extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}

	Orden.init(
		{
			id_cliente:{type: DataTypes.INTEGER, allowNull: false},
			id_vendedor: {type: DataTypes.INTEGER, allowNull: false},
			id_producto: {type: DataTypes.INTEGER, allowNull: false},
			metodo_pago: {type: DataTypes.STRING, allowNull: false},
			monto: {type: DataTypes.FLOAT, allowNull: false},
			direccion_envio: {type: DataTypes.STRING, allowNull: false},
			orden_status: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "orden",
     		tableName: "orden"
		}
	);
  
	return Orden;

};
