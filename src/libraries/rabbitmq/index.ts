import * as amqp from 'amqplib';
import type { Channel, ChannelModel, ConsumeMessage } from 'amqplib';

import Constant from 'src/common/constant';

class RabbitMQClient {
    private connection?: ChannelModel;
    private channel?: Channel;

    private async ensureChannel(): Promise<Channel> {
        if (!this.connection) {
            this.connection = await amqp.connect(Constant.RABBITMQ_URL);
        }

        if (!this.channel) {
            this.channel = await this.connection.createChannel();
        }

        return this.channel;
    }

    public async publishToQueue(queue: string, message: string): Promise<void> {
        const channel = await this.ensureChannel();
        await channel.assertQueue(queue, { durable: true });
        channel.sendToQueue(queue, Buffer.from(message), { persistent: true });
    }

    public async consumeQueue(
        queue: string,
        onMessage: (message: ConsumeMessage) => Promise<void>
    ): Promise<void> {
        const channel = await this.ensureChannel();
        await channel.assertQueue(queue, { durable: true });
        await channel.consume(queue, async (msg) => {
            if (!msg) return;
            try {
                await onMessage(msg);
                channel.ack(msg);
            } catch (error) {
                console.error('RabbitMQ message handler failed', error);
                channel.nack(msg, false, false);
            }
        });
    }

    public async close(): Promise<void> {
        if (this.channel) {
            await this.channel.close();
            this.channel = undefined;
        }
        if (this.connection) {
            await this.connection.close();
            this.connection = undefined;
        }
    }
}

export default RabbitMQClient;
