const Sequelize = require("sequelize");
// const Event = require("../models").Event;
const Event = require("../models").event;

module.exports = {

	listarNotificaciones(req, res) {

		let {query} = req; // parámetros pasados tipo ?param=value
		//.o Renombra claves de la query para que no coincidan con campos de la BD
		//.o si hay query
		if( Object.keys(query).length !== 0 ){
			//delete Object.assign(query, {nuevaClave: query.viejaClave})['viejaClave'];
		}

		let buscar = { where: {} }; //.o inicio con búsqueda vacía
		let paramsArray = Object.keys(query);
		const paramsAceptados = ["estado"];

		if( paramsArray.length !== 0 ){
			for(let p of paramsArray){

				if( !paramsAceptados.includes(p) ){
					return res.status(400).send({ status: 400, message: "Parámetro no aceptado: " + p });
				}

				//.o crea las condiciones de búsqueda via queries válidas
				buscar.where[p] = query[p];

			}
		}
		
		Event.findAll( buscar )
		.then(function(Event){

			if( Event.length === 0){
				return res.status(404).send({ status: 404, message: "No se encontraron notificaciones que coincidan con esos parámetros" });
			}

			for(let e of Event){ //.o convierto a JSON el campo data de la notificación
				e.data = JSON.parse(e.data)
			}
			
			return res.status(200).send(Event);

		})
		.catch((error) => res.status(400).send(error));

		return Event;

	}

}