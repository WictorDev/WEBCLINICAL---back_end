import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from 'src/infrastructure/modules/app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('WebClinical api')
    .setDescription('The webclinical api documentation')
    .setVersion('1.0')
    .addTag('users')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  // Enable global validation
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // strip unknown properties
    forbidNonWhitelisted: true, // reject payloads with unknown props
    transform: true, // enable class-transformer
    transformOptions: { enableImplicitConversion: true },
  }));

  app.enableCors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    methods: 'GET,POST,PUT,DELETE,PATCH,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true,
  });

  const port = Number(process.env.PORT) || 8080;
  await app.listen(port);
}
bootstrap();