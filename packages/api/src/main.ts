import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { environment } from './config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: environment.CORS.ORIGIN,
      methods: environment.CORS.METHODS,
    },
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors({
    origin: environment.CORS.ORIGIN,
    methods: environment.CORS.METHODS,
  });

  const config = new DocumentBuilder()
    .setTitle('Vet Clinic API')
    .setVersion(environment.VERSION)
    .build();

  const documentFactory = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, documentFactory, {
    jsonDocumentUrl: 'docs/json',
  });

  await app.listen(environment.PORT);
}
void bootstrap();
