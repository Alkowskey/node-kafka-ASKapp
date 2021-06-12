import { Kafka, logLevel } from "kafkajs";

import { Temp } from "./models/temp";

const clientId = process.env.CLIENTID || "nodejs-producer";
const brokers = [process.env.BROKERS || "localhost:9092"];
const topic = process.env.TOPIC || "message";

const kafka = new Kafka({
  clientId,
  brokers,
  logLevel: logLevel.INFO,
});

const consumer = kafka.consumer({
  groupId: clientId,
  minBytes: 5,
  maxBytes: 1e6,
  maxWaitTimeInMs: 3000,
});
let i = 0,
  sum = 0;

export const consume = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic, fromBeginning: true });
  await consumer.run({
    eachMessage: async ({ message }) => {
      i++;
      if (!isNaN(Number(message.value))) {
        sum += Number(message.value);
      } else {
        throw new Error(`value is not a number: ${typeof message.value}`);
      }

      if (i % 10 == 0) {
        const temp = Temp.build({ temp: sum / 10, timestamp: new Date() });
        temp.save();
        console.log(
          `avg temp: ${temp.temp} time: ${temp.timestamp.toISOString()}`
        );
        sum = 0;
      }
    },
  });
};
