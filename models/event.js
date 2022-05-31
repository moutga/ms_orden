"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Event extends Model {

		static associate(models) {
			// define association here
		}

		async nuevaNotificacion(objNotif){

			let notif = await Event.create({
				objeto: objNotif.constructor.name,
				id_objeto: objNotif.id,
				estado: "NUEVA",
				data: JSON.stringify( objNotif.dataValues )
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
