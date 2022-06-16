/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { FirebaseService } from './firebase/firebase.service';

@Module({
  imports: [UsersModule],
  controllers: [],
  providers: [FirebaseService],
})
export class AppModule {}
