/* Controllers */
const ordenController = require("../controllers/ordenController");
const eventController = require("../controllers/eventController");

module.exports = (app) => {

	app.get("/api", (req, res) =>
		res.status(200).send({
			message:
				"Nada que ver aquí",
		})
	);
	
	//@ Rutas para ORDEN
	app.post(
		"/api/orden/nueva/",
		ordenController.nuevaOrden
	);

	app.get("/api/orden/lista", ordenController.listarOrdenes);

	// //.o Ambas para recuperar orden por id
	app.get("/api/orden/:id", ordenController.buscarOrden);
	app.get("/api/orden/", ordenController.buscarOrden); //.o por si viene como query ?id=X

	//@ Rutas para EVENT
	app.get("/api/notif/lista", eventController.listarNotificaciones);

};
