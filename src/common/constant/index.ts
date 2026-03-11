
import { env } from '../config/env';

export default class Constant {
    static readonly NODE_ENV: string = env.NODE_ENV;
    static readonly PORT: number = env.PORT;
    static readonly DB_HOST: string = env.DB_HOST;
    static readonly DB_PORT: number = env.DB_PORT;
    static readonly DB_USER: string = env.DB_USER;
    static readonly DB_PASSWORD: string = env.DB_PASSWORD;
    static readonly DB_NAME: string = env.DB_NAME;
    static readonly DB_SYNCHRONIZE: boolean = env.DB_SYNCHRONIZE;
    static readonly REDIS_URL: string = env.REDIS_URL;
    static readonly RABBITMQ_URL: string = env.RABBITMQ_URL;
    static readonly KAFKA_BROKERS: string = env.KAFKA_BROKERS;
    static readonly KAFKA_CLIENT_ID: string = env.KAFKA_CLIENT_ID;
    static readonly JWT_SECRET: string = env.JWT_SECRET;
    static readonly GOOGLE_CLIENT_ID: string = env.GOOGLE_CLIENT_ID;
    static readonly RATE_LIMIT_WINDOW_MS: number = env.RATE_LIMIT_WINDOW_MS;
    static readonly RATE_LIMIT_MAX_ATTEMPTS: number = env.RATE_LIMIT_MAX_ATTEMPTS;
    static readonly SALT_ROUNDS: number = 10;
    static readonly DEFAULT_AVATAR : string = 'https://www.shutterstock.com/image-vector/young-smiling-man-avatar-brown-600nw-2261401207.jpg';
    static readonly MINIO_ENDPOINT: string = env.MINIO_ENDPOINT;
    static readonly MINIO_PORT: number = env.MINIO_PORT;
    static readonly MINIO_ACCESS_KEY: string = env.MINIO_ACCESS_KEY;
    static readonly MINIO_SECRET_KEY: string = env.MINIO_SECRET_KEY;
    static readonly MINIO_BUCKET_PUBLIC: string = env.MINIO_BUCKET_PUBLIC;
    static readonly MINIO_BUCKET_PRIVATE: string = env.MINIO_BUCKET_PRIVATE;
    static readonly SAUNGWA_API_KEY: string = env.SAUNGWA_API_KEY;
    static readonly SAUNGWA_APPKEY: string = env.SAUNGWA_APPKEY;
    static readonly SAUNGWA_AUTHKEY: string = env.SAUNGWA_AUTHKEY;
    static readonly SAUNGWA_BASE_URL: string = env.SAUNGWA_BASE_URL;
}
