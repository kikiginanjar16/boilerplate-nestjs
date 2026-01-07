# Redis Library

## Env

```
REDIS_URL=redis://localhost:6379
```

## Usage

```ts
import RedisClient from 'src/libraries/redis';

const redis = new RedisClient();

await redis.set('key', 'value', 60);
const value = await redis.get('key');
await redis.del('key');

await redis.disconnect();
```
