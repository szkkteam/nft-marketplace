import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
//import * as expressListRoutes from 'express-list-routes';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  //app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen(process.env.PORT || 3003);

  //expressListRoutes(app.getHttpServer()._events.request._router);
}
bootstrap();
