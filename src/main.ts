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
    .setTitle('Jasa Tetangga API')
    .setDescription('Aplikasi yang memungkinkan warga untuk berbagi informasi dan berita lokal di sekitar mereka. Fitur-fitur seperti forum diskusi, pengumpulan iuran, pengaturan kegiatan sosial, dan pembagian pengumuman menjadikan aplikasi ini berguna untuk interaksi sosial antarwarga.')
    .setVersion('1.0')
    .addTag('Jasa-Tetangga')
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
