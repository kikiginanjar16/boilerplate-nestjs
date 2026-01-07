import { createClient, RedisClientType } from 'redis';

import Constant from 'src/common/constant';

class RedisClient {
    private client: RedisClientType;

    constructor() {
        this.client = createClient({ url: Constant.REDIS_URL });
        this.client.on('error', (error) => {
            console.error('Redis Client Error', error);
        });
    }

    private async ensureConnected(): Promise<void> {
        if (!this.client.isOpen) {
            await this.client.connect();
        }
    }

    public async get(key: string): Promise<string | null> {
        await this.ensureConnected();
        return this.client.get(key);
    }

    public async set(key: string, value: string, ttlSeconds?: number): Promise<void> {
        await this.ensureConnected();
        if (ttlSeconds) {
            await this.client.set(key, value, { EX: ttlSeconds });
            return;
        }

        await this.client.set(key, value);
    }

    public async del(key: string): Promise<void> {
        await this.ensureConnected();
        await this.client.del(key);
    }

    public async disconnect(): Promise<void> {
        if (this.client.isOpen) {
            await this.client.quit();
        }
    }
}

export default RedisClient;
