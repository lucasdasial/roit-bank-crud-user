/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FirebaseService } from './firebase/firebase.service';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import 'dotenv/config';
import {
  HttpExceptionFilter,
  RoitResponseInterceptor,
} from '@roit/roit-response-handler';

async function bootstrap() {
  FirebaseService.start();
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors();

  //error de atrbuição de tipagem do param
  //---> app.useGlobalInterceptors(new RoitResponseInterceptor());

  const config = new DocumentBuilder()
    .setTitle('CRUD USERS')
    .setDescription('Api crud')
    .setVersion('1.0')
    .addTag('Users')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  await app.listen(process.env.PORT || 3000);
  console.log(
    `Server is running on http://localhost:${process.env.PORT || 3000}`,
  );
}
bootstrap();
