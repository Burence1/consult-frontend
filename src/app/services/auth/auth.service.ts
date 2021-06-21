import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import 'firebase/auth';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
// import 'rxjs/add/operator/switchMap';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: Observable<firebase.User>;
  private authState: any;
  currentId: any;

  // value: any;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private db: AngularFireDatabase,
    private toastr: ToastrService) {
    this.user = afAuth.authState;
    }

  // tslint:disable-next-line: typedef
  authUser() {
    return this.user;
  }

  // tslint:disable-next-line: typedef
  login(email: string, password: string) {
    this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((value: any) => {
        console.log('Nice, it worked!');
        this.toastr.success('Welcome to Consult!');
        this.router.navigateByUrl('/home');
      })
      .catch((err: { message: any }) => {
        console.log('Something went wrong: ', err.message);
        this.toastr.error('Incorrect email or password');
      });
  }

  // tslint:disable-next-line: typedef
  emailSignup(email: string, password: string, displayName: string) {
    this.afAuth.createUserWithEmailAndPassword(email, password)
    .then((user: any) => {
      this.authState = user;
      console.log('Success', user);
      const currentId = this.authState.user.uid;
      const status = 'online';
      this.setUserData(email, displayName, status, currentId);
      this.router.navigateByUrl('/login');
    })
    .catch((error: any) => {
      console.log('Something went wrong: ', error);
      this.toastr.error(error);
    });
  }

  // move data to real-time database
  setUserData(email: string, displayName: string, status: string, currentId: any): void {
    const path = `users/${currentId}`;
    const data = {
      email,
      displayName,
      status
    };
    this.db.object(path).update(data)
      .catch(error => console.log(error));
  }

  // tslint:disable-next-line: typedef
  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider)
      .then((value: firebase.auth.UserCredential) => {
        console.log('Success', value), this.router.navigateByUrl('/home');
        const currentId = value.user.uid;
        const status = 'online';
        this.setUserData(value.user.email, value.user.displayName, status, currentId);
        this.toastr.success('Welcome to Consult!');
      })
      .catch((error: any) => {
        console.log('Something went wrong: ', error);
        this.toastr.error('Incorrect email or password');
      });
  }

  // tslint:disable-next-line: typedef
  resetPassword(email: string) {
    return firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then((value: any) => {
        console.log('We have sent you a password reset link');
        this.toastr.success('Password reset link sent!');
        this.router.navigateByUrl('/login');
      })
      .catch((err: { message: any }) => {
        console.log('Something went wrong: ', err.message);
        this.toastr.error('Please check your email and try again');
      });
    }

  // tslint:disable-next-line: typedef
  logout() {
    this.afAuth.signOut().then(() => {
      console.log('signOut successful');
      this.toastr.success('You have been logout. See you next time.');
      this.router.navigate(['/login']);
      return 'You have been signed out.';
    });
  }

  // tslint:disable-next-line: typedef
  private oAuthLogin(provider: any) {
    return this.afAuth.signInWithPopup(provider);
  }
}
