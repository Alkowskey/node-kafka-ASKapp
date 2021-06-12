import { Kafka, logLevel } from "kafkajs";

const clientId = process.env.CLIENTID || "nodejs-producer";
const brokers = [process.env.BROKERS || "localhost:9092"];
const topic = process.env.TOPIC || "message";

const kafka = new Kafka({ clientId, brokers, logLevel: logLevel.INFO });
const producer = kafka.producer({});

function randomNum(a: number, b: number): number {
  return Math.random() * (b - a) + a;
}

export const produce = async () => {
  await producer.connect();
  let i = 0;

  setInterval(async () => {
    try {
      await producer.send({
        topic,
        acks: 1,
        messages: [
          {
            key: String(i),
            value: String(randomNum(25, 30)),
          },
        ],
      });

      i++;
    } catch (err) {
      console.error("could not write message " + err);
    }
  }, 1000);
};
