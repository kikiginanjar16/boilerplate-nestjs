import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { PublicModule } from './modules/public/public.module';
import { CategoryModule } from './modules/categories/category.module';
import { MenuModule } from './modules/menus/menu.module';
import { NotificationModule } from './modules/notifications/notification.module';
import { PermissionModule } from './modules/permissions/permission.module';
import { RoleModule } from './modules/roles/role.module';
import Constant from './common/constant';
import { ProfileModule } from './modules/profiles/profile.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: Constant.DB_HOST,
      port: Constant.DB_PORT,
      username: Constant.DB_USER,
      password: Constant.DB_PASSWORD,
      database: Constant.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    PublicModule,
    CategoryModule,
    MenuModule,
    NotificationModule,
    PermissionModule,
    RoleModule,
    ProfileModule
  ],
})
export class AppModule {}
