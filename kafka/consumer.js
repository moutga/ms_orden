const { Kafka } = require("kafkajs");
const Orden = require("../models").orden;

const kafka = new Kafka({
	clientId: "ms.orden",
	brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({ groupId: "g2" });

/**
 * Consume las notificaciones de un topic
 */
async function consume() {

	await consumer.connect();
	await consumer.subscribe({ topics: ['credito-topic'], fromBeginning: true });
	await consumer.run({

		eachMessage: async ({ topic, partition, message }) => {
			// console.debug('Topic: '+topic);
			// if(message.key) console.debug('Key: '+message.key.toString());
			// console.debug('Message: '+message.value.toString());

			let msg = JSON.parse(message.value.toString());
			console.log(msg);
			let orden;

			try {
				orden = await Orden.findWhere( {id: msg.id_orden} );
				// console.log(orden);
				if( !orden ){
					console.log("no existe orden");
					// Acciones correspondientes
				}
			} catch (error) {
				console.log(error);
			}


			if(msg.estado === 'CREDITO_FAIL'){

				console.log("Falló el pago. Cambia estado de la orden a fallida");
				try {
					await orden.cambiaStatus('ORDEN_FAIL');
					console.log("Envía notificación correspondiente a orden no generada");
				} catch (error) {
					console.log(error);
				}

			} else{
				console.log("Pago exitoso. Cambia estado de la orden a exitosa");
				try {
					await orden.cambiaStatus('ORDEN_OK');
					console.log("Envía notificación correspondiente a orden generada");
				} catch (error) {
					console.log(error);
				}
			}

		}

	});

}

consume().catch((e) => console.error(`Error al consumir notificación ${e.message}`, e));

// module.exports = {
// 	consume,
// };
