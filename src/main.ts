import helmet from '@fastify/helmet';

import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

import { appConfig } from '@/libs/configs/app.config';
import { globalExceptionFilter } from '@/libs/filters/global-exception.filter';
import { consoleLogger } from '@/libs/loggers/console.logger';
import { validationPipe } from '@/libs/pipes/validation.pipe';

import { AppModule } from '@/app.module';

async function bootstrap() {
  const adapter = new FastifyAdapter({
    logger: consoleLogger,
  });

  const app = await NestFactory.create<NestFastifyApplication>(AppModule, adapter);

  app.register(helmet);
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  });

  app.useGlobalFilters(globalExceptionFilter);

  app.useGlobalPipes(validationPipe);

  await app.listen(appConfig.port, appConfig.host);
}

bootstrap();
