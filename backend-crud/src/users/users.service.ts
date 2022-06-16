/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { FirestoreService } from 'src/firebase/firebase.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    const dbContext = new FirestoreService();
    return createUserDto;
  }

  async findAll() {
    const dbContext = new FirestoreService();
    return await dbContext.FindAllUsers();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a  ${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
