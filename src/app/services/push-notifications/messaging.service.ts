import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class MessagingService {
  currentMessage = new BehaviorSubject(null);

  constructor(private af: AngularFireMessaging) {}

  // tslint:disable-next-line: typedef
  requestPermission() {
    this.af.requestToken.subscribe(
      (token) => {
        console.log(token);
      },
      (err) => {
        console.error('Unable to get permission to notify.', err);
      }
    );
  }

  // tslint:disable-next-line: typedef
  receiveMessage() {
    this.af.messages.subscribe((payload) => {
      console.log('New message received. ', payload);
      this.currentMessage.next(payload);
    });
  }
}
