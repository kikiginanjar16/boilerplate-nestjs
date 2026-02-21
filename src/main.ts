import { RapidocModule } from "@b8n/nestjs-rapidoc";
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as expressBasicAuth from 'express-basic-auth';
import helmet from 'helmet';

import { AppModule } from './app.module';
import Constant from './common/constant';
import { JWT_ACCESS_TOKEN, SWAGGER_PASSWORD, SWAGGER_USER } from './common/constant/constant';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.use(`/docs`, expressBasicAuth({
    users: {
      [SWAGGER_USER]: SWAGGER_PASSWORD,
    },
    challenge: true,
  }),
  );

  const config = new DocumentBuilder()
    .setTitle("BE API Documentation")
    .setDescription("API Description for BE")
    .setVersion("1.0")
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        name: "Authorization",
        in: "header",
      },
      `${JWT_ACCESS_TOKEN}`,
    )
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  RapidocModule.setup("docs", app as any, documentFactory, {
    rapidocOptions: {
      persistAuth: true,
    },
  });


  app.enableCors();
  app.enableVersioning();
  app.use(helmet());
  await app.listen(Constant.PORT);
  console.log(`Application is running on port ${Constant.PORT}`);
}
bootstrap();
