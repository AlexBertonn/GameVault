import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Base API')
    .setDescription('The base API description')
    .setVersion('1.0')
    .addTag('base')
    .addBearerAuth(
      {
        description: 'Please enter token in following format: Bearer `<JWT>`',
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'Authorization',
    )
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 8080);
  console.log(`Application is running on: http://localhost:${process.env.PORT ?? 8080}`);
  
}
void bootstrap();
