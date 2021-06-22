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
      this.showCustomNotification(payload);
    });
  }

  // tslint:disable-next-line: typedef
  showCustomNotification(payload: any) {
    const notifyData = payload.notification;
    const title = notifyData.title;
    const options = {
      body: notifyData.body,
      icon: './assets/images/logo.jpg',
      badge: './assets/images/badge.png',
      image: './assets/images/logo.jpg',

    };
    console.log('New notification.', notifyData);
    const notify: Notification = new Notification(title, options);

    notify.onclick = event => {
      event.preventDefault();
      window.location.href = 'http://localhost:4200/home';
    };
  }
}
