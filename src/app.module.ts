import {
  Module,
} from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import Constant from './common/constant';
import { RevokedToken } from './entities/revoked-token.entity';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CategoryModule } from './modules/categories/category.module';
import { MenuModule } from './modules/menus/menu.module';
import { NotificationModule } from './modules/notifications/notification.module';
import { PermissionModule } from './modules/permissions/permission.module';
import { ProfileModule } from './modules/profiles/profile.module';
import { PublicModule } from './modules/public/public.module';
import { RoleModule } from './modules/roles/role.module';
import { UsersModule } from './modules/users/users.module';

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
      synchronize: Constant.DB_SYNCHRONIZE,
    }),
    TypeOrmModule.forFeature([RevokedToken]),
    UsersModule,
    PublicModule,
    CategoryModule,
    MenuModule,
    NotificationModule,
    PermissionModule,
    RoleModule,
    ProfileModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
