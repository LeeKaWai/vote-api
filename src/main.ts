require('dotenv').config({
  path:
    './configs/env/.env-' +
    (process.env.NODE_ENV ? process.env.NODE_ENV : 'development'),
});

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

import { GlobalExceptionsFilter } from './core/filter/global.exception.filter';
import { AppModule } from './app.module';
// import packageJson from '../package.json';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const options = new DocumentBuilder()
    .setTitle('Vote Api')
    .setDescription('Vote Api')
    .setVersion('1.0.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'Token',
      },
      'access_token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.useGlobalFilters(new GlobalExceptionsFilter());

  await app.listen(process.env.PORT);
  console.info(
    '%s run in [ %s ] environment successfully at port %s',
    // packageJson.name,
    'vote-api',
    process.env.NODE_ENV || 'development',
    process.env.PORT,
  );
}
bootstrap();
