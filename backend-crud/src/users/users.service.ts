/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    const dbContext = new FirebaseService();
    return dbContext.createDoc('users', createUserDto.id, createUserDto);
  }

  findAll() {
    const dbContext = new FirebaseService();
    return dbContext.findAll('users');
  }

  findOne(id: string) {
    const dbContext = new FirebaseService();
    return dbContext.find('users', id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const dbContext = new FirebaseService();
    return dbContext.updateDoc('users', id, updateUserDto);
  }

  remove(id: string) {
    const dbContext = new FirebaseService();
    return dbContext.delDoc('users', id);
  }
}
