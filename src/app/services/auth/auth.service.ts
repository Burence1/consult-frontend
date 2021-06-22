import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import 'firebase/auth';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

// import 'rxjs/add/operator/switchMap';
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: any;
  private authState: any;
  currentId: any

  // value: any;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router, private db: AngularFireDatabase
    ) {
    this.user = afAuth.authState;
    }

  authUser() {
    return this.user;
  }

  // tslint:disable-next-line: typedef
  login(email: string, password: string) {
    this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((value: any) => {
        console.log('Nice, it worked!');
        this.router.navigateByUrl('/home');
      })
      .catch((err: { message: any }) => {
        console.log('Something went wrong: ', err.message);
      });
  }

  // tslint:disable-next-line: typedef
  emailSignup(displayName: string, email: string, password: string, confirmPassword: string ) {
    this.afAuth.createUserWithEmailAndPassword(email, password)
    .then((user: any) => {
      this.authState = user;
     console.log('Success', user);
      const currentId = this.authState.user.uid
      const status = 'online';
      this.setUserData(email, displayName, status, currentId);
     this.router.navigateByUrl('/login');
    })
    .catch((error: any) => {
      console.log('Something went wrong: ', error);
    });
  }

  //move data ton real-time database
  setUserData(email: string, displayName: string, status: string, currentId: any): void {
    const path = `users/${currentId}`;
    const data = {
      email: email,
      displayName: displayName,
      status: status
    };
    this.db.object(path).update(data)
      .catch(error => console.log(error));
  }

  // tslint:disable-next-line: typedef
  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider)
      .then((value: any) => {
        console.log('Success', value), this.router.navigateByUrl('/home');
      })
      .catch((error: any) => {
        console.log('Something went wrong: ', error);
      });
  }

  // tslint:disable-next-line: typedef
  resetPassword(email: string) {
    return firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => console.log('We have sent you a password reset link'))
      .catch((error) => console.log(error.message));
  }

  // tslint:disable-next-line: typedef
  logout() {
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }

  // tslint:disable-next-line: typedef
  private oAuthLogin(provider: any) {
    return this.afAuth.signInWithPopup(provider);
  }
}
