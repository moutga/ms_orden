const Sequelize = require("sequelize");
const orden = require("../models").orden;
const Event = require("../models").event;
const nProducer = require("../kafka/producer.js"); 

module.exports = {

	nuevaOrden: function(req, res) {

		//.o validaciones
		let {body} = req;
		const idProductosPosibles = [1,2,3,4,5];
		const idClientesPosibles = [1,2,3,4,5];
		const idVendedoresPosibles = [1,2,3,4,5];
		const metodosPagoPosibles = ["EFECTIVO","TARJETA"];

		if( !idProductosPosibles.includes(body.id_producto) ){
			return res.status(400).send({ status: 400, message: "Producto inexistente" });
		}

		if( !idClientesPosibles.includes(body.id_cliente) ){
			return res.status(400).send({ status: 400, message: "Cliente inexistente" });
		}

		if( !idVendedoresPosibles.includes(body.id_vendedor) ){
			return res.status(400).send({ status: 400, message: "Vendedor inexistente" });
		}

		if( !metodosPagoPosibles.includes(body.metodo_pago) ){
			return res.status(400).send({ status: 400, message: "Método de pago inválido" });
		}

		//.o***********************o./

		orden.create({

				id_cliente: body.id_cliente,
				id_vendedor: body.id_vendedor,
				id_producto: body.id_producto,
				metodo_pago: body.metodo_pago,
				monto: body.monto,
				direccion_envio: body.direccion_envio,

		})
		.then(async function(orden){

			res.status(200).send(orden);
			let notif = new Event();

			try{

				await notif.nuevaNotificacion(orden)
				await nProducer.nuevaNotif(orden,'test')

			} catch(e){
				console.log("Error al crear la notificación: " + e);
			}

		})
		.catch((error) => res.status(400).send(error));

		return orden;
	},

	listarOrdenes(req, res) {

		let {query} = req; // parámetros pasados tipo ?param=value
		if( Object.keys(query).length !== 0 ){
			//.o Enmascara claves de la query para que no coincidan con campos de la BD
			//@ delete Object.assign(query, {nuevaClave: query.viejaClave})['viejaClave'];
			delete Object.assign(query, {id_cliente: query.idc})['idc']; //.o renombra idc por id_cliente
		}

		let buscar = { where: {} }; //.o inicio con búsqueda vacía
		let paramsArray = Object.keys(query);
		const paramsAceptados = ["id_cliente","id_vendedor","id_producto","metodo_pago"];

		if( paramsArray.length !== 0 ){
			for(let p of paramsArray){

				if( !paramsAceptados.includes(p) ){
					return res.status(400).send({ status: 400, message: "Parámetro no aceptado: " + p });
				}

				//.o crea las condiciones de búsqueda via queries válidas
				buscar.where[p] = query[p];

			}
		}

		orden.findAll( buscar )
		.then(function(orden){

			if( orden.length === 0){
				return res.status(404).send({ status: 404, message: "No se encontraron órdenes que coincidan con esos parámetros" });
			}

			return res.status(200).send(orden);

		})
		.catch((error) => res.status(400).send(error));

		return orden;

	},

	buscarOrden(req, res) {

		//.o validaciones
		let {params} = req;

		if( typeof params.id === 'undefined' ){
			return res.status(404).send({ status: 400, message: "Debe indicar id de orden" });
		}
		if( !params.id ){
			return res.status(404).send({ status: 404, message: "No existe la orden id: " + params.id });
		}
		
		//.o***********************o./

		orden.findAll({
				where: {
					id: params.id,
				},
			})
		.then(function(orden){

			if( orden.length === 0){
				return res.status(400).send({ status: 400, message: "No se encontró orden con id " + params.id });
			}

			return res.status(200).send(orden);

		})
		.catch((error) => res.status(400).send(error));
		
		return orden;
		
	},

};