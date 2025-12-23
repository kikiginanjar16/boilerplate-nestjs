import { LoggedDto } from '../dtos/logged.dto';

export function createAuditFields(dto: any, logged: LoggedDto): void {
    dto.created_by = logged?.name;
    dto.updated_by = logged?.name;
    dto.created_id = logged?.id;
    dto.updated_id = logged?.id;
}

export function updateAuditFields(dto: any, logged: LoggedDto): void {
    dto.updated_by = logged?.name;
    dto.updated_id = logged?.id;
}

export function deleteAuditFields(logged: LoggedDto, dto: any = {}): any {
    dto.deleted_by = logged?.name;
    dto.deleted_id = logged?.id;
    dto.deleted_at = new Date();
    return dto;
}
