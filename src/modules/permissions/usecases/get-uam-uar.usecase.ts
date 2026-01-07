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
                SELECT *
                FROM ${viewName}
                ORDER BY "userName" ASC, "roleTitle" ASC, "menuTitle" ASC
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
}
