import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import Constant from './common/constant';
import JwtValidate from './middlewares/auth.middleware';
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
  app.use(JwtValidate)
  app.use(fingerprint);
  await app.listen(Constant.PORT);
  console.log(`Application is running on port ${Constant.PORT}`);
}
bootstrap();
