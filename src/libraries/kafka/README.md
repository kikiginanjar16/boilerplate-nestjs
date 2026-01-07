# Kafka Library

## Env

```
KAFKA_BROKERS=localhost:9092
KAFKA_CLIENT_ID=nestjs-app
```

## Usage

```ts
import KafkaClient from 'src/libraries/kafka';

const kafka = new KafkaClient();

await kafka.publish('events', JSON.stringify({ action: 'created' }));

await kafka.subscribe('events', 'my-consumer-group', async (payload) => {
    console.log(payload);
});

await kafka.disconnect();
```
