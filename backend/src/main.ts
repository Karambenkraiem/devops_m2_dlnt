import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
    app.use('/uploads', express.static(join(process.cwd(), 'uploads')));
  // app.enableCors({
  //   origin: 'http://localhost:3000',
  // });

  await app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
