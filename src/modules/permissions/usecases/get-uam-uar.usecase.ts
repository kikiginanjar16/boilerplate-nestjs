import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { UamUarView } from 'src/entities/uam-uar.view';

@Injectable()
export class GetUamUarUseCase {
    constructor(
        private readonly dataSource: DataSource,
    ) {}

    async paginate(page: number, limit: number): Promise<any> {
        const offset = (page - 1) * limit;
        const viewName = 'uam_uar_view';
        const data = await this.dataSource.query(
            `
                SELECT
                    user_id AS "userId",
                    user_name AS "userName",
                    user_email AS "userEmail",
                    user_role AS "userRole",
                    role_id AS "roleId",
                    role_title AS "roleTitle",
                    menu_id AS "menuId",
                    menu_title AS "menuTitle",
                    menu_url AS "menuUrl",
                    can_create AS "canCreate",
                    can_read AS "canRead",
                    can_update AS "canUpdate",
                    can_delete AS "canDelete",
                    can_approve AS "canApprove"
                FROM ${viewName}
                ORDER BY user_name ASC, role_title ASC, menu_title ASC
                LIMIT $1 OFFSET $2
            `,
            [limit, offset]
        );

        const totalResult = await this.dataSource.query(
            `
                SELECT COUNT(*)::int AS total
                FROM ${viewName}
            `
        );
        const total = totalResult?.[0]?.total ?? 0;

        return {
            data: data as UamUarView[],
            meta: {
                count: total,
                page: page,
                total_page: Math.ceil(total / limit),
            }
        };
    }

    async listAll(): Promise<UamUarView[]> {
        const viewName = 'uam_uar_view';
        const data = await this.dataSource.query(
            `
                SELECT
                    user_id AS "userId",
                    user_name AS "userName",
                    user_email AS "userEmail",
                    user_role AS "userRole",
                    role_id AS "roleId",
                    role_title AS "roleTitle",
                    menu_id AS "menuId",
                    menu_title AS "menuTitle",
                    menu_url AS "menuUrl",
                    can_create AS "canCreate",
                    can_read AS "canRead",
                    can_update AS "canUpdate",
                    can_delete AS "canDelete",
                    can_approve AS "canApprove"
                FROM ${viewName}
                ORDER BY user_name ASC, role_title ASC, menu_title ASC
            `
        );

        return data as UamUarView[];
    }
}
