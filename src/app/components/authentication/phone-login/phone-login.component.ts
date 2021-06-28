import { Component, OnInit } from '@angular/core';
import { WindowService } from 'src/app/services/window/window.service';
const config = {
  apiKey: 'AIzaSyB3mBUPgJ-drLGaMass8FdKRyJzToqEOa4',
  authDomain: 'userauth-3c76a.firebaseapp.com',
  projectId: 'userauth-3c76a',
  storageBucket: 'userauth-3c76a.appspot.com',
  messagingSenderId: '329320770247',
  appId: '1:329320770247:web:b0d6211ac58834b457ace2',
  measurementId: 'G-DXEDLCP9XL',
};
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { PhoneNumber } from 'src/app/classes/phoneNumber/phone-number';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-phone-login',
  templateUrl: './phone-login.component.html',
  styleUrls: ['./phone-login.component.css'],
})
export class PhoneLoginComponent implements OnInit {

  windowRef: any;
  phone: any;
  phoneNumber = new PhoneNumber();
  verificationCode: string;
  user: any;
  currentId: any;

  constructor(
    private afAuth: AngularFireAuth,
    private win: WindowService,
    private toastr: ToastrService,
    private router: Router) {}

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.windowRef = this.win.windowRef;
    firebase.initializeApp(config);
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      'recaptcha-container'
    );

    this.windowRef.recaptchaVerifier.render().then((widgetId) => {
      this.windowRef.recaptchaWidgetId = widgetId;
    });
  }

  // tslint:disable-next-line: typedef
  sendLoginCode() {
    const appVerifier = this.windowRef.recaptchaVerifier;

    const num = this.phoneNumber.e164;

    firebase
      .auth()
      .signInWithPhoneNumber(this.phone, appVerifier)
      .then((result) => {
        this.windowRef.confirmationResult = result;
      })
      .catch((error) => console.log('error', error));
  }

  // tslint:disable-next-line: typedef
  verifyLoginCode() {
    this.windowRef.confirmationResult
      .confirm(this.verificationCode)
      .then((result) => {
        this.user = result.user;
        console.log(result);
        this.toastr.success('Welcome to Consult');
        this.router.navigateByUrl('/home');
      })
      .catch((error) => {
        console.log(error, 'Incorrect code entered?');
        this.toastr.error('Incorrect SMS verification code entered!');
      });
  }
}

