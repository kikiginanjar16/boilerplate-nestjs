import { Logger } from '@nestjs/common';
import * as Minio from 'minio';

import Constant from 'src/common/constant';

class MinioClient {
    private client: Minio.Client;
    private readonly useSSL: boolean;
    private readonly host: string;
    private readonly port: number;
    constructor() {
        const rawEndpoint = Constant.MINIO_ENDPOINT;
        const normalizedEndpoint = rawEndpoint.replace(/^https?:\/\//, '');
        const [hostFromEndpoint, portFromEndpoint] = normalizedEndpoint.split(':');

        this.useSSL = rawEndpoint.startsWith('https');
        this.host = hostFromEndpoint;
        this.port = portFromEndpoint ? parseInt(portFromEndpoint, 10) : Constant.MINIO_PORT;

        this.client = new Minio.Client({
            endPoint: this.host,
            port: this.port,
            useSSL: this.useSSL,
            accessKey: Constant.MINIO_ACCESS_KEY,
            secretKey: Constant.MINIO_SECRET_KEY
        });
    }

    async upload(objectName: string, stream: string, metaData: any) {
        try {
            await this.client.putObject(
                Constant.MINIO_BUCKET_PUBLIC,
                objectName,
                stream,
                metaData
            );

            Logger.log('File uploaded successfully.');
            const protocol = this.useSSL ? 'https' : 'http';
            const base_url = `${protocol}://${this.host}:${this.port}`;
            return {
                bucket: Constant.MINIO_BUCKET_PUBLIC,
                filename: objectName,
                meta: metaData,
                path: `${Constant.MINIO_BUCKET_PUBLIC}/${objectName}`,
                url: `${base_url}/${Constant.MINIO_BUCKET_PUBLIC}/${objectName}`
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        }

        return null;
    }

    async uploadLegal(objectName: string, stream: string, metaData: any) {
        try {
            await this.client.putObject(
                Constant.MINIO_BUCKET_PRIVATE,
                objectName,
                stream,
                metaData
            );

            Logger.log('File uploaded successfully.');
            const protocol = this.useSSL ? 'https' : 'http';
            const base_url = `${protocol}://${this.host}:${this.port}`;
            return {
                bucket: Constant.MINIO_BUCKET_PRIVATE,
                filename: objectName,
                meta: metaData,
                path: `${Constant.MINIO_BUCKET_PRIVATE}/${objectName}`,
                url: `${base_url}/${Constant.MINIO_BUCKET_PRIVATE}/${objectName}`
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        }

        return null;
    }

    async download(bucket: string, objectName: string, downloadPath: string) {
        try {
            await this.client.fGetObject(bucket, objectName, downloadPath);
            console.log('File downloaded successfully.');
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    }

    async getPresignedUrl(bucket, objectName: string, expiry: number) {
        try {
            const url = await this.client.presignedGetObject(bucket, objectName, expiry);
            return url;
        } catch (error) {
            console.error('Error generating presigned URL:', error);
            throw error;
        }
    }
}

export default MinioClient;
