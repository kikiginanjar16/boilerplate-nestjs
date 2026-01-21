import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import Constant from './common/constant';
import { RevokedToken } from './entities/revoked-token.entity';
import { JwtValidateMiddleware } from './middlewares/auth.middleware';
import { RateLimitMiddleware } from './middlewares/rate-limit.middleware';
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
      synchronize: true,
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
  providers: [JwtValidateMiddleware, RateLimitMiddleware],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RateLimitMiddleware).forRoutes(
      { path: 'v1/login', method: RequestMethod.POST },
      { path: 'v1/login/admin', method: RequestMethod.POST },
      { path: 'v1/oauth/google', method: RequestMethod.POST },
    );
    consumer.apply(JwtValidateMiddleware).forRoutes('*');
  }
}
