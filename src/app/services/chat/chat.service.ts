import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireDatabaseModule, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';

import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { AuthService } from '../auth/auth.service';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Chatmessage } from 'src/app/classes/message/chatmessage';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export const snapshotToArray = (snapshot: any) => {
  const returnArr: any[] = [];

  snapshot.forEach((childSnapshot: any) => {
    const item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });

  return returnArr;
};

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  chatname: '' | null;
  roomname: any;
  message: '';
  users: any[];
  chats: any[];
  matcher = new MyErrorStateMatcher();

  user: any;
  chatMessages: AngularFireList<any>;
  chatMessage: Chatmessage;
  userName: any;
  messages: any

  //create groups
  groups: any;
  groupChats: AngularFireList<any>;
  group: any
  test: any
  chatcontent: any;

  constructor(private db: AngularFireDatabase,
    private Auth: AngularFireAuth, private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,) {
    this.Auth.authState.subscribe(auth => {
      if (auth !== undefined && auth !== null) {
        this.user = auth;
      }
      this.getUser().valueChanges().subscribe(a => {
        this.userName = a;
      });
      this.chatname = this.chatname;
      this.roomname = this.route.snapshot.params.roomname;
      firebase.database().ref('chats/').on('value', resp => {
        this.chats = [];
        this.chats = snapshotToArray(resp);
        // setTimeout(() => this.scrolltop = this.chatcontent.nativeElement.scrollHeight, 500);
      });
      firebase.database().ref('roomusers/').orderByChild('roomname').equalTo(this.roomname).on('value', (resp2: any) => {
        const roomusers = snapshotToArray(resp2);
        this.users = roomusers.filter(x => x.status === 'online');
      });
    });
  }

  getGroup() {
    return this.group
  }

  getGroupss(): Observable<any> {
    this.groupChats = this.db.list('/groups');
    return this.groupChats.valueChanges();
  }


  // tslint:disable-next-line: typedef
  getUser() {
    const userId = this.user.uid;
    const path = `/users/${userId}`;
    return this.db.object(path);
  }

  // tslint:disable-next-line: typedef
  getUsers() {
    const path = `/users`;
    console.log(path);
    return this.db.list(path);
  }

  // tslint:disable-next-line: typedef
  sendMessage(msg: any) {
    const chat = msg
    chat.roomname = this.roomname
    chat.chatname = this.userName.displayName
    chat.date = this.getTimeStamp()
    chat.email = this.user.email
    chat.type = 'message'

    const newMessage = firebase.database().ref('chats/').push();
    newMessage.set(chat);
    // this.chatForm = this.formBuilder.group({
    //   'message': [null, Validators.required]
    // });
  }

  create(title: string) {
    const timestamp = this.getTimeStamp();
    const email = this.user.email;
    // this.chatMessages = this.getMessages();
    this.test = this.getGroupss();
    console.log(this.test)
    firebase.database().ref('/groups').push({
      userName: '',
      title: title,
      timeSent: new Date().toDateString(),
      messages: [{
        message: '',
        timeSent: new Date(),
        userName: '',
        email: email
      }],
    })
  }

  getMessages(): AngularFireList<Chatmessage[]> {
    // query to create our message feed binding
    return this.db.list(' messages', ref => ref.orderByKey().limitToLast(25));
  }

  // tslint:disable-next-line: typedef
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
