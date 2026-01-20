
import { config } from 'dotenv';
config();
export default class Constant {
    static readonly NODE_ENV: string = process.env.NODE_ENV || 'development';
    static readonly PORT: number = parseInt(process.env.PORT || '3000', 10);
    static readonly DB_HOST: string = process.env.DB_HOST || 'localhost';
    static readonly DB_PORT: number = parseInt(process.env.DB_PORT || '5432', 10);
    static readonly DB_USER: string = process.env.DB_USER || 'user';
    static readonly DB_PASSWORD: string = process.env.DB_PASSWORD || 'password';
    static readonly DB_NAME: string = process.env.DB_NAME || 'database';
    static readonly REDIS_URL: string = process.env.REDIS_URL || 'redis://localhost:6379';
    static readonly RABBITMQ_URL: string = process.env.RABBITMQ_URL || 'amqp://localhost:5672';
    static readonly KAFKA_BROKERS: string = process.env.KAFKA_BROKERS || 'localhost:9092';
    static readonly KAFKA_CLIENT_ID: string = process.env.KAFKA_CLIENT_ID || 'nestjs-app';
    static readonly JWT_SECRET: string = process.env.JWT_SECRET || 'secret';
    static readonly GOOGLE_CLIENT_ID: string = process.env.GOOGLE_CLIENT_ID || '';
    static readonly RATE_LIMIT_WINDOW_MS: number = parseInt(
        process.env.RATE_LIMIT_WINDOW_MS || '60000',
        10
    );
    static readonly RATE_LIMIT_MAX_ATTEMPTS: number = parseInt(
        process.env.RATE_LIMIT_MAX_ATTEMPTS || '5',
        10
    );
    static readonly SALT_ROUNDS: number = 10;
    static readonly DEFAULT_AVATAR : string = 'https://www.shutterstock.com/image-vector/young-smiling-man-avatar-brown-600nw-2261401207.jpg';
    static readonly MINIO_ENDPOINT: string = process.env.MINIO_ENDPOINT || 'localhost';
    static readonly MINIO_PORT: number = parseInt(process.env.MINIO_PORT || '9000', 10);
    static readonly MINIO_ACCESS_KEY: string = process.env.MINIO_ACCESS_KEY || 'minio';
    static readonly MINIO_SECRET_KEY: string = process.env.MINIO_SECRET_KEY || 'minio123';
    static readonly MINIO_BUCKET_PUBLIC: string = process.env.MINIO_BUCKET || 'tetangga';
    static readonly MINIO_BUCKET_PRIVATE: string = process.env.MINIO_BUCKET || 'legal-tetangga';
    static readonly SAUNGWA_API_KEY: string = process.env.SAUNGWA_API_KEY || 'key';
    static readonly SAUNGWA_APPKEY: string = process.env.SAUNGWA_APPKEY || '';
    static readonly SAUNGWA_AUTHKEY: string = process.env.SAUNGWA_AUTHKEY || '';
    static readonly SAUNGWA_BASE_URL: string = process.env.SAUNGWA_BASE_URL || 'https://app.saungwa.com/api';
}
