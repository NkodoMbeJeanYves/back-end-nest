import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json, urlencoded } from 'express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap () {
  const app = await NestFactory.create(AppModule);

  // initialize swagger-api
  const options = new DocumentBuilder()
    .setTitle('Documentation of standard Nest-Api')
    .setDescription('My API documentation')
    .setVersion('1.0')
    .addTag('Datnek')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  // definir le prefix d'accès à l'api 
  app.setGlobalPrefix('nest-api');

  // uploader des fichiers d'une taille de moins de 100mb
  app.use(json({ limit: '100mb' }));
  app.use(urlencoded({ extended: true, limit: '100mb' }));

  // activer CORS
  app.enableCors();
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
