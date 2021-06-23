// import { Component, OnInit } from '@angular/core';
// import { WindowService } from 'src/app/services/window/window.service';
// import * as firebase from 'firebase';
// import { AngularFireAuth } from '@angular/fire/auth';
// import { PhoneNumber } from 'src/app/classes/phoneNumber/phone-number';


// @Component({
//   selector: 'app-phone-login',
//   templateUrl: './phone-login.component.html',
//   styleUrls: ['./phone-login.component.css']
// })
// export class PhoneLoginComponent implements OnInit {

//   windowRef: any;

//   phoneNumber = new PhoneNumber();

//   verificationCode: string;

//   user: any;

//   constructor(private afAuth: AngularFireAuth,
//               private win: WindowService) { }

//   // tslint:disable-next-line: typedef
//   ngOnInit() {
//     this.windowRef = this.win.windowRef;
//     this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');

//     this.windowRef.recaptchaVerifier.render();
//   }


//   // tslint:disable-next-line: typedef
//   sendLoginCode() {

//     const appVerifier = this.windowRef.recaptchaVerifier;

//     const num = this.phoneNumber.e164;

//     firebase.auth().signInWithPhoneNumber(num, appVerifier)
//             .then(result => {

//                 this.windowRef.confirmationResult = result;

//             })
//             .catch( error => console.log(error) );

//   }

//   // tslint:disable-next-line: typedef
//   verifyLoginCode() {
//     this.windowRef.confirmationResult
//                   .confirm(this.verificationCode)
//                   .then( result => {

//                     this.user = result.user;

//     })
//     .catch( error => console.log(error, 'Incorrect code entered?'));
//   }


// }
