const { Kafka, Partitioners  } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'ms.orden',
  brokers: ['localhost:9092'],
});
const producer = kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner })

/**
 * Envía objMensaje vía el topic stringTopic
 * @param object objMensaje
 * @param string stringTopic
 */
async function nuevaNotif(objMensaje,stringTopic){

	objMensaje = JSON.stringify(objMensaje);
	let messages = [
		{ value: objMensaje, /* key: paraOrdenamiento */ },
	];

	try{

		await producer.connect()
		await producer.send({
			topic: stringTopic,
			messages: messages,
		});
		await producer.disconnect();

	}catch(err){
		throw Error("No se pudo crear la notificación: "+err);
	}

}

module.exports = {
	nuevaNotif,
}
