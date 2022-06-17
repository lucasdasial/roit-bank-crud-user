/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  async create(createUserDto: CreateUserDto) {
    const dbContext = new FirebaseService();

    const email = createUserDto.email;

    const hash = await bcrypt.hash(email, 10);

    createUserDto.email = hash;

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

  async update(id: string, updateUserDto: UpdateUserDto) {
    const dbContext = new FirebaseService();

    if (updateUserDto.email) {
      const email = updateUserDto.email;
      const hash = await bcrypt.hash(email, 10);
      updateUserDto.email = hash;
    }
    return dbContext.updateDoc('users', id, updateUserDto);
  }

  remove(id: string) {
    const dbContext = new FirebaseService();
    return dbContext.delDoc('users', id);
  }
}
