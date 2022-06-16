/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FirebaseService } from './firebase/firebase.service';
import {
  HttpExceptionFilter,
  RoitResponseInterceptor,
} from '@roit/roit-response-handler';

async function bootstrap() {
  FirebaseService.start();
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());

  //error de atrbuição de tipagem do param
  //---> app.useGlobalInterceptors(new RoitResponseInterceptor());
  await app.listen(3000);
}
bootstrap();
