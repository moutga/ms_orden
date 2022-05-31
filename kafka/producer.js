const { Kafka, Partitioners  } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'ms.orden',
  brokers: ['localhost:9092'],
});
const producer = kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner })

/**
 * Envía objMensaje vía el topic stringTopic
 * @param object objMensaje
 * @param string stringKey
 * @param string stringTopic
 */
async function nuevaNotif(objMensaje, stringKey, stringTopic){
	stringKey = stringKey.toString();

	objMensaje = JSON.stringify(objMensaje);
	let messages = [
		{ value: objMensaje, key: stringKey },
	];

	await producer.connect()
	await producer.send({
		topic: stringTopic,
		messages: messages,
	});
	await producer.disconnect(); 

}

async function testConnect(){
	let status = 'fail';
	try{
		await producer.connect();
		status = 'ok'
		return status;
	} catch(err){
		return status = err;
	}
}

module.exports = {
	nuevaNotif,
	testConnect
}
