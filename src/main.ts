import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as express from 'express';
import * as path from 'path';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cookieParser());
  // Enable CORS
  app.enableCors({
    origin: 'http://localhost:5173', // Frontend URL
    credentials: true, // Allow cookies
  });

  app.useGlobalPipes(new ValidationPipe());
  app.set('view engine', 'ejs');
  app.use(express.static(path.join(__dirname, '../public')));
  // app.set('views', path.join(__dirname, '../src/short-links/views'));

  app.set('views', [
    path.join(__dirname, '../src/short-links/views'),
    path.join(__dirname, '../src/password-links/views'),
  ]);
  
  const config = new DocumentBuilder()
    .setTitle('cats sample')
    .setDescription('cats api description')
    .setVersion('1.0')
    .addTag('cats')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
