import { Logger } from '@nestjs/common';
import * as Minio from 'minio';
import Constant from 'src/common/constant';

class MinioClient {
    private client: Minio.Client;
    constructor() {
        this.client = new Minio.Client({
            endPoint: Constant.MINIO_ENDPOINT,
            port: 9000,
            useSSL: false,
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
            const base_url = `http://${Constant.MINIO_ENDPOINT}:${Constant.MINIO_PORT}`;
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
            const base_url = `http://${Constant.MINIO_ENDPOINT}:${Constant.MINIO_PORT}`;
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