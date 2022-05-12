import { NestFactory } from '@nestjs/core';
import * as expressListRoutes from 'express-list-routes';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  await app.listen(3000);

  expressListRoutes(app.getHttpServer()._events.request._router);
}
bootstrap();
