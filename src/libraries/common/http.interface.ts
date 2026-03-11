import { AuthenticatedLocals, AuthenticatedUser } from 'src/common/types/auth-context.type';

export interface AppRequest {
  url?: string;
  path?: string;
  ip?: string;
  headers: Record<string, string | string[] | undefined>;
  fingerprint?: {
    hash?: string;
  };
  logged?: AuthenticatedUser;
  [key: string]: unknown;
}

export interface AppResponse {
  locals?: AuthenticatedLocals;
  status(code: number): AppResponse;
  send?(payload: unknown): unknown;
  json?(payload: unknown): unknown;
  [key: string]: unknown;
}

export const getHeader = (req: AppRequest, name: string): string | undefined => {
  const value = req.headers?.[name.toLowerCase()];
  if (Array.isArray(value)) {
    return value[0];
  }
  return value;
};

export const getPathname = (req: AppRequest): string => {
  const value = req.path || req.url || '/';
  return value.split('?')[0];
};

export const getIpAddress = (req: AppRequest): string => {
  const forwarded = req.headers?.['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length > 0) {
    return forwarded.split(',')[0].trim();
  }
  if (Array.isArray(forwarded) && forwarded.length > 0) {
    return forwarded[0].split(',')[0].trim();
  }
  return req.ip || 'unknown';
};
