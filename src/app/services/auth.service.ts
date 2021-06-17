import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import 'firebase/auth';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/switchMap';
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router) {}

  // tslint:disable-next-line: typedef
  login(email: string, password: string) {
    this.afAuth.signInWithEmailAndPassword(email, password)
    .then((value: any) => {
      console.log('Nice, it worked!');
      this.router.navigateByUrl('/profile');
    })
    .catch((err: { message: any; }) => {
      console.log('Something went wrong: ', err.message);
    });
  }

  // tslint:disable-next-line: typedef
  emailSignup(email: string, password: string) {
    this.afAuth.createUserWithEmailAndPassword(email, password)
    .then((value: any) => {
     console.log('Success', value);
     this.router.navigateByUrl('/login');
    })
    .then( async value => {
      (await this.afAuth.currentUser).sendEmailVerification()
      .then(() => console.log('Email verification sent'))
      .catch((error: any) => {
        console.log(error.message);
      });
    })
    .catch((error: any) => {
      console.log('Something went wrong: ', error);
    });
  }

  // tslint:disable-next-line: typedef
  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider)
      .then((value: any) => {
     console.log('Success', value),
     this.router.navigateByUrl('/profile');
   })
    .catch((error: any) => {
      console.log('Something went wrong: ', error);
    });
  }

  // tslint:disable-next-line: typedef
  resetPassword(email) {
    return firebase.auth().sendPasswordResetEmail(email)
    .then(() => console.log('We have sent you a password reset link'))
    .catch(error => console.log(error.message));
  }

  // tslint:disable-next-line: typedef
  logout() {
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }

  // tslint:disable-next-line: typedef
  private oAuthLogin(provider: any) {
    return this.afAuth.signInWithPopup(provider);
  }
}
