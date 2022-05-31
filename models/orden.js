"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Orden extends Model {

		static associate(models) {
			// define association here
		}

		/**
		 * Busca según criterios del objeto
		 * @param {obj} objWhere
		 * @returns {any}
		 */
		static async findWhere(objWhere){
			objWhere = {where: objWhere};
			let b = await Orden.findOne( objWhere );
			return b;
		}

		/**
		 * Cambia el status de una orden
		 * @param string stringStatus
		 * @returns {any}
		 */
		async cambiaStatus(stringStatus){
			this.orden_status = stringStatus;
			await this.save({ fields: ['orden_status'] });
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
