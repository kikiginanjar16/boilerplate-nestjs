import { ADMIN } from '../constant/constant';
import MessageHandler from '../message';
import { LoggedDto } from '../dtos/logged.dto';

// Throws if a non-admin tries to access a record they did not create.
export function assertOwnershipOrAdmin(entity: { created_id?: string }, logged: LoggedDto): void {
  if (!entity) {
    return;
  }

  if (logged?.role === ADMIN) {
    return;
  }

  if (entity.created_id && entity.created_id !== logged?.id) {
    throw new Error(MessageHandler.ERR007);
  }
}
