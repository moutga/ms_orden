"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Event extends Model {

		static associate(models) {
			// define association here
		}

		async nuevaNotificacion(orden){

			let notif = await Event.create({
				objeto: orden.constructor.name,
				id_objeto: orden.id,
				estado: "NUEVA",
				data: JSON.stringify( orden.dataValues )
			});

			notif.save();

		}

	}

	Event.init(
		{
			objeto: { type: DataTypes.STRING, allowNull: false },
			id_objeto: { type: DataTypes.INTEGER, allowNull: false },
			estado: { type: DataTypes.INTEGER, allowNull: false },
			data: { type: DataTypes.INTEGER, allowNull: false },
		},
		{
			sequelize,
			modelName: "event",
			tableName: "event",
		}
	);

	return Event;

};
