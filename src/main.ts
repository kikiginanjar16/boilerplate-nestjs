import { RapidocModule } from "@b8n/nestjs-rapidoc";
import fastifyBasicAuth from '@fastify/basic-auth';
import fastifyHelmet from '@fastify/helmet';
import fastifyMultipart from '@fastify/multipart';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import Constant from './common/constant';
import { JWT_ACCESS_TOKEN, SWAGGER_PASSWORD, SWAGGER_USER } from './common/constant/constant';


async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const adapter = new FastifyAdapter();
  const fastify = adapter.getInstance();

  await fastify.register(fastifyHelmet as never);
  await fastify.register(fastifyMultipart as never, {
    limits: {
      fileSize: 2 * 1000 * 1024,
    },
  });
  await fastify.register(fastifyBasicAuth as never, {
    validate: async (username, password) => {
      if (username !== SWAGGER_USER || password !== SWAGGER_PASSWORD) {
        throw new Error('Unauthorized');
      }
    },
    authenticate: true,
  });

  fastify.addHook('onRequest', async (request, reply) => {
    const path = request.url.split('?')[0];
    if (path === '/docs' || path.startsWith('/docs/') || path === '/docs-json') {
      await (fastify as any).basicAuth(request, reply);
    }
  });

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    adapter,
  );

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

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
  logger.log(
    `Database synchronize is ${Constant.DB_SYNCHRONIZE ? 'enabled' : 'disabled'} for NODE_ENV=${Constant.NODE_ENV}`,
  );
  await app.listen(Constant.PORT, '0.0.0.0');
  logger.log(`Application is running on port ${Constant.PORT}`);
}
bootstrap();
