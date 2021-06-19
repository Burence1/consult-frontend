import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireDatabaseModule, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';

import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { AuthService } from '../auth/auth.service';
import firebase from 'firebase/app';
import 'firebase/auth'
import { Chatmessage } from 'src/app/classes/message/chatmessage';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  user: any;
  chatMessages: AngularFireList<any>;
  chatMessage: Chatmessage;
  userName: any;

  constructor(private db: AngularFireDatabase,
    private Auth: AngularFireAuth) {
    this.Auth.authState.subscribe(auth => {
      if (auth !== undefined && auth !== null) {
        this.user = auth;
      }
      this.getUser().valueChanges().subscribe(a => {
        this.userName = a;
      });
    })
  }
  getUser() {
    const userId = this.user.uid;
    const path = `/users/${userId}`;
    return this.db.object(path);
  }

  getUsers() {
    const path = `/users`;
    console.log(path)
    return this.db.list(path);
  }

  sendMessage(msg: string) {
    const timestamp = this.getTimeStamp();
    const email = this.user.email;
    this.chatMessages = this.getMessages();
    this.chatMessages.push({
      message: msg,
      timeSent: timestamp,
      userName: this.userName.displayName,
      email: email
    })
  }

  getMessages(): AngularFireList<Chatmessage[]> {
    // query to create our message feed binding
    return this.db.list(' messages', ref => ref.orderByKey().limitToLast(25));
  }

  getTimeStamp() {
    const now = new Date();
    const date = now.getUTCFullYear() + '/' +
      (now.getUTCMonth() + 1) + '/' +
      now.getUTCDate();
    const time = now.getUTCHours() + ':' +
      now.getUTCMinutes() + ':' +
      now.getUTCSeconds();
    return (date + ' ' + time);
  }
}
