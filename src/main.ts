import { RapidocModule } from "@b8n/nestjs-rapidoc";
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import Constant from './common/constant';
import { ValidationPipe } from '@nestjs/common';
import JwtValidate from './middlewares/auth.middleware';
import helmet from 'helmet';
import * as expressBasicAuth from 'express-basic-auth';
import { JWT_ACCESS_TOKEN, SWAGGER_PASSWORD, SWAGGER_USER } from './common/constant/constant';

const Fingerprint = require('express-fingerprint');
const fingerprint = Fingerprint({
  parameters: [
    Fingerprint.useragent,
    Fingerprint.acceptHeaders,
    Fingerprint.geoip
  ]
});

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
  RapidocModule.setup("docs", app, documentFactory, {
    rapidocOptions: {
      persistAuth: true,
    },
  });


  app.enableCors();
  app.enableVersioning();
  app.use(JwtValidate);
  app.use(fingerprint);
  app.use(helmet());
  await app.listen(Constant.PORT);
  console.log(`Application is running on port ${Constant.PORT}`);
}
bootstrap();
