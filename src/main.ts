import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import Constant from './common/constant';
import JwtValidate from './middlewares/auth.middleware';
import helmet from 'helmet';
import * as expressBasicAuth from 'express-basic-auth';
import { SWAGGER_PASSWORD, SWAGGER_USER } from './common/constant/constant';

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
    app.use(`/docs`, expressBasicAuth({
      users: {
        [SWAGGER_USER]: SWAGGER_PASSWORD,
      },
      challenge: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Backend API')
    .setDescription('Backend API Documentation')
    .setVersion('1.0')
    .addTag('backend-api')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory)
  app.enableCors();
  app.enableVersioning();
  app.use(JwtValidate);
  app.use(fingerprint);
  app.use(helmet());
  await app.listen(Constant.PORT);
  console.log(`Application is running on port ${Constant.PORT}`);
}
bootstrap();
