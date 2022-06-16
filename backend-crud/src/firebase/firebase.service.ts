/* eslint-disable prettier/prettier */
import firebase from 'firebase/app';
import 'firebase/firestore';
import { stringify } from 'json5';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { firebaseConfig } from './firebase.config';

export class FirebaseService {
  static start() {
    firebase.initializeApp(firebaseConfig);
  }
}

export class FirestoreService {
  private db() {
    return firebase.firestore();
  }

  async AddUser(createUserDto: CreateUserDto) {
    const newUser = {
      name: createUserDto.name,
      age: createUserDto.age,
      ghub: createUserDto.ghub,
      uf: createUserDto.addressUF,
      city: createUserDto.addressCity,
      district: createUserDto.addressDistrict,
      street: createUserDto.addressStreet,
      number: createUserDto.addresNumber,
    };
    await this.db().collection('users').doc().set(newUser);
    return newUser;
  }

  async FindAllUsers() {
    const users: Array<any> = [];
    await this.db()
      .collection('users')
      .get()
      .then((res) => {
        res.forEach((doc) => {
          users.push(doc.data());
        });
      });
    return users;
  }

  async FindUser(id: number) {
    const user = await this.db()
      .collection('users')
      .doc(stringify(id))
      .get()
      .then((docUser) => {
        return docUser.data();
      });

    return user;
  }
}
