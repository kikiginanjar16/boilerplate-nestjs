import { Consumer, Kafka, Producer } from 'kafkajs';

import Constant from 'src/common/constant';

class KafkaClient {
    private kafka: Kafka;
    private producer?: Producer;
    private consumer?: Consumer;

    constructor() {
        const brokers = Constant.KAFKA_BROKERS.split(',')
            .map((broker) => broker.trim())
            .filter(Boolean);

        this.kafka = new Kafka({
            clientId: Constant.KAFKA_CLIENT_ID,
            brokers,
        });
    }

    public async publish(topic: string, message: string): Promise<void> {
        if (!this.producer) {
            this.producer = this.kafka.producer();
            await this.producer.connect();
        }

        await this.producer.send({
            topic,
            messages: [{ value: message }],
        });
    }

    public async subscribe(
        topic: string,
        groupId: string,
        onMessage: (payload: string) => Promise<void>
    ): Promise<void> {
        if (!this.consumer) {
            this.consumer = this.kafka.consumer({ groupId });
            await this.consumer.connect();
        }

        await this.consumer.subscribe({ topic, fromBeginning: false });
        await this.consumer.run({
            eachMessage: async ({ message }) => {
                const value = message.value?.toString() || '';
                await onMessage(value);
            },
        });
    }

    public async disconnect(): Promise<void> {
        if (this.consumer) {
            await this.consumer.disconnect();
            this.consumer = undefined;
        }
        if (this.producer) {
            await this.producer.disconnect();
            this.producer = undefined;
        }
    }
}

export default KafkaClient;
