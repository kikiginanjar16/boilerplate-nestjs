# RabbitMQ Library

## Env

```
RABBITMQ_URL=amqp://localhost:5672
```

## Usage

```ts
import RabbitMQClient from 'src/libraries/rabbitmq';

const rabbit = new RabbitMQClient();

await rabbit.publishToQueue('jobs', JSON.stringify({ id: 1 }));

await rabbit.consumeQueue('jobs', async (msg) => {
    const payload = msg.content.toString();
    console.log(payload);
});

await rabbit.close();
```
