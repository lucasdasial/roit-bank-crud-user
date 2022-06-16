/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { FirebaseService } from './firebase/firebase.service';
import { AppController } from './app.controller';

@Module({
  imports: [UsersModule],
  controllers: [AppController],
  providers: [FirebaseService],
})
export class AppModule {}
