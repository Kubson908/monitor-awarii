import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*',
      credentials: false,
    },
  });
  await app.setGlobalPrefix('api');
  await app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(process.env.PORT);
}
bootstrap();
