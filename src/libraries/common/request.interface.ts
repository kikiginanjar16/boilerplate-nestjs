import { AuthenticatedUser } from 'src/common/types/auth-context.type';

import { AppResponse } from './http.interface';

export interface IResponse extends AppResponse {
  logged?: AuthenticatedUser;
}
