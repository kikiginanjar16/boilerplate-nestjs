# Database Cheatsheet

A quick reference guide for common TypeORM operations: creating views, writing queries, and more.

## 1. Creating a SQL View

To define a database view in TypeORM, use the `@ViewEntity` decorator. Views are read-only by default.

```typescript
import { ViewEntity, ViewColumn, BaseEntity, DataSource } from 'typeorm';
import { User } from './user.entity';

@ViewEntity({
    expression: (dataSource: DataSource) =>
        dataSource
            .createQueryBuilder()
            .select('user.id', 'id')
            .addSelect('user.name', 'name')
            .addSelect('count(post.id)', 'post_count')
            .from(User, 'user')
            .leftJoin('user.posts', 'post')
            .groupBy('user.id')
})
export class UserStatsView extends BaseEntity {
    @ViewColumn()
    id: string;

    @ViewColumn()
    name: string;

    @ViewColumn({ name: 'post_count' })
    postCount: number;
}
```

## 1.1 UAM/UAR View Example (User + Role + Menu + Permission)

This example joins users to roles via `user.role = role.title`, then links roles to permissions and menus.

```typescript
import { DataSource, ViewColumn, ViewEntity } from 'typeorm';
import { Menu } from './menu.entity';
import { Permission } from './permission.entity';
import { Role } from './role.entity';
import { User } from './user.entity';

@ViewEntity({
    expression: (dataSource: DataSource) =>
        dataSource
            .createQueryBuilder()
            .select('user.id', 'user_id')
            .addSelect('user.name', 'user_name')
            .addSelect('user.email', 'user_email')
            .addSelect('user.role', 'user_role')
            .addSelect('role.id', 'role_id')
            .addSelect('role.title', 'role_title')
            .addSelect('menu.id', 'menu_id')
            .addSelect('menu.title', 'menu_title')
            .addSelect('menu.url', 'menu_url')
            .addSelect('permission.create', 'can_create')
            .addSelect('permission.read', 'can_read')
            .addSelect('permission.update', 'can_update')
            .addSelect('permission.delete', 'can_delete')
            .addSelect('permission.approve', 'can_approve')
            .from(User, 'user')
            .leftJoin(Role, 'role', 'role.title = user.role')
            .leftJoin(Permission, 'permission', 'permission.role_id = role.id')
            .leftJoin(Menu, 'menu', 'menu.id = permission.menu_id'),
})
export class UamUarView {
    @ViewColumn({ name: 'user_id' })
    userId: string;
}
```

## 2. Reading from a View

You interact with Views just like regular Entities, but you cannot `save()` or `update()` them.

```typescript
// 1. Inject Repository
constructor(
    @InjectComponent(UserStatsView)
    private readonly userStatsRepo: Repository<UserStatsView>
) {}

// 2. Query
async getStats(): Promise<UserStatsView[]> {
    return this.userStatsRepo.find({
        where: {
            postCount: MoreThan(5)
        },
        order: {
            postCount: 'DESC'
        }
    });
}
```

## 3. Complex Select Queries (QueryBuilder)

Use `createQueryBuilder` when finding objects via standard methods is not enough (e.g., complex joins, subqueries, aggregations).

### Standard Select

```typescript
const users = await this.userRepository.createQueryBuilder('user')
    .leftJoinAndSelect('user.photos', 'photo')
    .where('user.name = :name', { name: 'Timber' })
    .andWhere('photo.isPublic = :isPublic', { isPublic: true })
    .orderBy('user.id', 'DESC')
    .getMany();
```

### Raw SQL Select

Sometimes you need raw performance or specific SQL functions not easily mapped to entities.

```typescript
const rawData = await this.userRepository.query(
    `SELECT * FROM users WHERE id = $1`, [id]
);
```

### Subqueries

```typescript
const qb = this.userRepository.createQueryBuilder('user');
const users = await qb
    .where((qb) => {
        const subQuery = qb.subQuery()
            .select('photo.userId')
            .from('photo', 'photo')
            .where('photo.isPublic = :isPublic')
            .getQuery();
        return 'user.id IN ' + subQuery;
    })
    .setParameter('isPublic', true)
    .getMany();
```
