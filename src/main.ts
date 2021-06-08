require('dotenv').config({
  path:
    './configs/env/.env-' +
    (process.env.NODE_ENV ? process.env.NODE_ENV : 'development'),
});

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import packageJson from '../package.json';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.PORT);
  console.info(
    '%s run in [ %s ] environment successfully at port %s',
    packageJson.name,
    process.env.NODE_ENV || 'development',
    process.env.PORT,
  );
}
bootstrap();
