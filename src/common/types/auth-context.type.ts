import { LoggedDto } from '../dtos/logged.dto';

export type AuthenticatedUser = LoggedDto;

export interface AuthenticatedLocals {
  logged?: AuthenticatedUser;
  [key: string]: unknown;
}
