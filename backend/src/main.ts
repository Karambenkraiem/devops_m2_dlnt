


import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const port = process.env.PORT || 3001;



  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });


  app.enableCors({
    origin: true,
    credentials: true,
  });


  await app.listen(process.env.PORT ?? 3000);
  // await app.listen(port, '0.0.0.0');

}

bootstrap();