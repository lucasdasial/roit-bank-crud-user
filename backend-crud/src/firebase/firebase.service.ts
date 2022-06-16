import { Injectable } from '@nestjs/common';
import firebase from 'firebase/app';
import { firebaseConfig } from './firebase.config';
import 'firebase/firestore';

@Injectable()
export class FirebaseService {
  db = firebase.firestore();

  static start() {
    console.log('firebase was loading');
    firebase.initializeApp(firebaseConfig);
  }

  async findAll(collection: string) {
    const list: Array<any> = [];
    const docs = await this.db.collection(collection).get();
    docs.forEach((doc) => {
      const obj = {
        id: doc.id,
        ...doc.data(),
      };
      list.push(obj);
    });
    return list;
  }

  async find(collection: string, id: string) {
    const doc = await this.db.collection(collection).doc(id).get();
    return doc.data();
  }

  async createDoc(collection: string, docId: string, obj: any) {
    type ResposneMsg = {
      message: string;
      tag: number;
    };
    let res: ResposneMsg;
    await this.db
      .collection(collection)
      .get()
      .then((docs) => {
        docs.forEach((doc) => {
          if (doc.id == docId) {
            res = { message: 'doc alredy created', tag: 0 };
            return;
          }
          this.db.collection(collection).doc(docId).set(obj);
          res = { message: 'doc created successfuly', tag: 1 };
        });
      });
    return res;
  }

  async updateDoc(collection: string, docId: string, updateObj: any) {
    try {
      await this.db.collection(collection).doc(docId).update(updateObj);
      return { message: 'doc updated' };
    } catch (error) {
      return { message: 'error when updating' };
    }
  }
  async delDoc(collection: string, docId: string) {
    try {
      await this.db.collection(collection).doc(docId).delete();
      return { message: 'exec delete successfully' };
    } catch (error) {
      return { message: 'error when exec delete ' };
    }
  }
}
