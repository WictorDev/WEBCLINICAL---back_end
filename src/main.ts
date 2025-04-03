import { NestFactory } from '@nestjs/core';
import { AppModule } from './core/modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:5173',
    methods: 'GET,POST,PUT,DELETE,PATCH',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true,
  });

  await app.listen(8080);
}
bootstrap();