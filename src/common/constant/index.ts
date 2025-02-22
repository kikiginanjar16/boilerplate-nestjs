
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
    static readonly JWT_SECRET: string = process.env.JWT_SECRET || 'secret';
    static readonly SALT_ROUNDS: number = 10;
    static readonly DEFAULT_AVATAR : string = 'https://www.shutterstock.com/image-vector/young-smiling-man-avatar-brown-600nw-2261401207.jpg';
    static readonly MINIO_ENDPOINT: string = process.env.MINIO_ENDPOINT || 'http://localhost:9000';
    static readonly MINIO_PORT: number = parseInt(process.env.MINIO_PORT || '9000', 10);
    static readonly MINIO_ACCESS_KEY: string = process.env.MINIO_ACCESS_KEY || 'minio';
    static readonly MINIO_SECRET_KEY: string = process.env.MINIO_SECRET_KEY || 'minio123';
    static readonly MINIO_BUCKET_PUBLIC: string = process.env.MINIO_BUCKET || 'tetangga';
    static readonly MINIO_BUCKET_PRIVATE: string = process.env.MINIO_BUCKET || 'legal-tetangga';
    static readonly SAUNGWA_API_KEY: string = process.env.SAUNGWA_API_KEY || 'key';
}

