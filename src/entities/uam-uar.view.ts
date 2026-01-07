import { ViewColumn, ViewEntity } from 'typeorm';

@ViewEntity({
    name: 'uam_uar_view',
    expression: `
        SELECT
            u.id AS user_id,
            u.name AS user_name,
            u.email AS user_email,
            u.role AS user_role,
            r.id AS role_id,
            r.title AS role_title,
            m.id AS menu_id,
            m.title AS menu_title,
            m.url AS menu_url,
            p.create AS can_create,
            p.read AS can_read,
            p.update AS can_update,
            p.delete AS can_delete,
            p.approve AS can_approve
        FROM users u
        LEFT JOIN roles r ON r.title = u.role::text
        LEFT JOIN permissions p ON p.role_id = r.id
        LEFT JOIN menus m ON m.id = p.menu_id
    `,
})
export class UamUarView {
    @ViewColumn({ name: 'user_id' })
    userId: string;

    @ViewColumn({ name: 'user_name' })
    userName: string;

    @ViewColumn({ name: 'user_email' })
    userEmail: string;

    @ViewColumn({ name: 'user_role' })
    userRole: string;

    @ViewColumn({ name: 'role_id' })
    roleId: string;

    @ViewColumn({ name: 'role_title' })
    roleTitle: string;

    @ViewColumn({ name: 'menu_id' })
    menuId: string;

    @ViewColumn({ name: 'menu_title' })
    menuTitle: string;

    @ViewColumn({ name: 'menu_url' })
    menuUrl: string;

    @ViewColumn({ name: 'can_create' })
    canCreate: number;

    @ViewColumn({ name: 'can_read' })
    canRead: number;

    @ViewColumn({ name: 'can_update' })
    canUpdate: number;

    @ViewColumn({ name: 'can_delete' })
    canDelete: number;

    @ViewColumn({ name: 'can_approve' })
    canApprove: number;
}
