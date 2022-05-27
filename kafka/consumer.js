const { Kafka } = require("kafkajs");

const kafka = new Kafka({
	clientId: "ms.orden",
	brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({ groupId: "g1" });

/**
 * Consume las notificaciones de un topic
 */
async function consume() {

	await consumer.connect();
	await consumer.subscribe({ topics: ['test'], fromBeginning: true });
	await consumer.run({

		eachMessage: async ({ topic, partition, message }) => {
			console.debug('Topic: '+topic);
			console.debug('Key: '+message.key.toString());
			console.debug('Message: '+message.value.toString());
		}

	});

}

consume().catch((e) => console.error(`Error al consumir notificación ${e.message}`, e));

// module.exports = {
// 	consume,
// };
