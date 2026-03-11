import { config } from 'dotenv';

config();

type EnvScope = 'all' | 'production';

class ConfigValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ConfigValidationError';
  }
}

const SAFE_SYNC_ENVIRONMENTS = new Set(['development', 'test', 'local']);

function readRawEnv(name: string): string | undefined {
  const value = process.env[name];
  if (value === undefined) {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed === '' ? undefined : trimmed;
}

function readString(name: string, defaultValue?: string): string {
  const value = readRawEnv(name);
  return value ?? defaultValue ?? '';
}

function readNumber(name: string, defaultValue: number): number {
  const raw = readRawEnv(name);
  if (raw === undefined) {
    return defaultValue;
  }

  const parsed = Number(raw);
  if (!Number.isInteger(parsed)) {
    throw new ConfigValidationError(
      `Invalid environment variable ${name}: expected an integer, received "${raw}".`,
    );
  }

  return parsed;
}

function readBoolean(name: string, defaultValue: boolean): boolean {
  const raw = readRawEnv(name);
  if (raw === undefined) {
    return defaultValue;
  }

  const normalized = raw.toLowerCase();
  if (['true', '1', 'yes', 'on'].includes(normalized)) {
    return true;
  }

  if (['false', '0', 'no', 'off'].includes(normalized)) {
    return false;
  }

  throw new ConfigValidationError(
    `Invalid environment variable ${name}: expected a boolean, received "${raw}".`,
  );
}

function requireString(name: string, scope: EnvScope): string {
  const value = readRawEnv(name);
  if (value !== undefined) {
    return value;
  }

  const scopeLabel =
    scope === 'production' ? 'when NODE_ENV=production' : 'in all environments';

  throw new ConfigValidationError(
    `Missing required environment variable ${name} ${scopeLabel}.`,
  );
}

const nodeEnv = readString('NODE_ENV', 'development');
const isProduction = nodeEnv === 'production';
const isDevelopment = nodeEnv === 'development';
const isTest = nodeEnv === 'test';

const jwtSecret = isProduction
  ? requireString('JWT_SECRET', 'production')
  : readString('JWT_SECRET', 'development-jwt-secret');

const databaseHost = isProduction
  ? requireString('DB_HOST', 'production')
  : readString('DB_HOST', 'localhost');
const databasePort = readNumber('DB_PORT', 5432);
const databaseUser = isProduction
  ? requireString('DB_USER', 'production')
  : readString('DB_USER', 'postgres');
const databasePassword = isProduction
  ? requireString('DB_PASSWORD', 'production')
  : readString('DB_PASSWORD', 'postgres');
const databaseName = isProduction
  ? requireString('DB_NAME', 'production')
  : readString('DB_NAME', 'boilerplate_nestjs');

const defaultSynchronize = SAFE_SYNC_ENVIRONMENTS.has(nodeEnv);
const dbSynchronize = readBoolean('DB_SYNCHRONIZE', defaultSynchronize);

export const env = {
  NODE_ENV: nodeEnv,
  isProduction,
  isDevelopment,
  isTest,
  PORT: readNumber('PORT', 3000),
  DB_HOST: databaseHost,
  DB_PORT: databasePort,
  DB_USER: databaseUser,
  DB_PASSWORD: databasePassword,
  DB_NAME: databaseName,
  DB_SYNCHRONIZE: isProduction ? false : dbSynchronize,
  REDIS_URL: readString('REDIS_URL', 'redis://localhost:6379'),
  RABBITMQ_URL: readString('RABBITMQ_URL', 'amqp://localhost:5672'),
  KAFKA_BROKERS: readString('KAFKA_BROKERS', 'localhost:9092'),
  KAFKA_CLIENT_ID: readString('KAFKA_CLIENT_ID', 'nestjs-app'),
  JWT_SECRET: jwtSecret,
  PII_ENCRYPTION_KEY: readString('PII_ENCRYPTION_KEY', jwtSecret),
  GOOGLE_CLIENT_ID: readString('GOOGLE_CLIENT_ID', ''),
  RATE_LIMIT_WINDOW_MS: readNumber('RATE_LIMIT_WINDOW_MS', 60000),
  RATE_LIMIT_MAX_ATTEMPTS: readNumber('RATE_LIMIT_MAX_ATTEMPTS', 5),
  MINIO_ENDPOINT: readString('MINIO_ENDPOINT', 'localhost'),
  MINIO_PORT: readNumber('MINIO_PORT', 9000),
  MINIO_ACCESS_KEY: isProduction
    ? readString('MINIO_ACCESS_KEY', '')
    : readString('MINIO_ACCESS_KEY', 'minio'),
  MINIO_SECRET_KEY: isProduction
    ? readString('MINIO_SECRET_KEY', '')
    : readString('MINIO_SECRET_KEY', 'minio123'),
  MINIO_BUCKET_PUBLIC: readString(
    'MINIO_BUCKET_PUBLIC',
    readString('MINIO_BUCKET', 'tetangga'),
  ),
  MINIO_BUCKET_PRIVATE: readString(
    'MINIO_BUCKET_PRIVATE',
    readString('MINIO_BUCKET', 'legal-tetangga'),
  ),
  SAUNGWA_API_KEY: isProduction
    ? readString('SAUNGWA_API_KEY', '')
    : readString('SAUNGWA_API_KEY', 'key'),
  SAUNGWA_APPKEY: readString('SAUNGWA_APPKEY', ''),
  SAUNGWA_AUTHKEY: readString('SAUNGWA_AUTHKEY', ''),
  SAUNGWA_BASE_URL: readString(
    'SAUNGWA_BASE_URL',
    'https://app.saungwa.com/api',
  ),
  SWAGGER_USER: isProduction
    ? readString('SWAGGER_USER', '')
    : readString('SWAGGER_USER', 'admin'),
  SWAGGER_PASSWORD: isProduction
    ? readString('SWAGGER_PASSWORD', '')
    : readString('SWAGGER_PASSWORD', 'admin'),
} as const;

export { ConfigValidationError };
