import { AppResponse } from './http.interface';
import { AuthenticatedUser } from 'src/common/types/auth-context.type';

export interface IResponse extends AppResponse {
  logged?: AuthenticatedUser;
}
