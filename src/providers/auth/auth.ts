import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

@Injectable()
export class AuthProvider {

  constructor() {
    console.log('Hello AuthProvider Provider');
  }

  loginUser(email:string, password:string):Promise<any>{
    return firebase.auth().signInWithEmailAndPassword(email,password);
  }

  signupUser(email:string,password:string):Promise<any>{
    return firebase
    .auth()
    .createUserWithEmailAndPassword(email,password)
    .then(newUser => {
      firebase
        .database()
        .ref(`/userProfile/${newUser.user.uid}/email`)
        .set(email);
    })
  }

  resetPassword(email:string):Promise<void>{
    return firebase.auth().sendPasswordResetEmail(email);
  }

  logoutUser():Promise<void>{
    const userId: string = firebase.auth().currentUser.uid;
  firebase
    .database()
    .ref(`/userProfile/${userId}`)
    .off();
    return firebase.auth().signOut();
  }

}
