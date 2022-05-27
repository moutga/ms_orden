const { Kafka, Partitioners  } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'ms.orden',
  brokers: ['localhost:9092'],
});
const producer = kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner })

/**
 * Envía objMensaje vía el topic stringTopic
 * @param object objMensaje
 * @param integer intKey
 * @param string stringTopic
 */
async function nuevaNotif(objMensaje, intKey, stringTopic){
	intKey = intKey.toString();

	objMensaje = JSON.stringify(objMensaje);
	let messages = [
		{ value: objMensaje, key: intKey },
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
