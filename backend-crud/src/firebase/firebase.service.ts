/* eslint-disable prettier/prettier */
import firebase from 'firebase/app';
import 'firebase/firestore';
import { firebaseConfig } from './firebase.config';

export class FirebaseService {
  static start() {
    firebase.initializeApp(firebaseConfig);
  }
  static getFirestoreDb() {
    return firebase.firestore();
  }
}
