import { Chatmessage } from '../../classes/message/chatmessage';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';

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
@Component({
  selector: 'app-one-chat',
  templateUrl: './one-chat.component.html',
  styleUrls: ['./one-chat.component.css']
})
export class OneChatComponent implements OnInit {
  constructor(private Auth: AngularFireAuth, private db: AngularFireDatabase, private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) {
    this.Auth.authState.subscribe(auth => {
      if (auth !== undefined && auth !== null) {
        this.user = auth;
      }
      this.getUser().valueChanges().subscribe(a => {
        this.userName = a;
        this.chatname = this.userName.displayName;
      });

      firebase.database().ref('conversations/').on('value', (snapshot: any) => {
        snapshot.forEach((childSnapshot: any) => {
          let childKey = childSnapshot.key;
          let childData = childSnapshot.val();
          this.convoname = childData.convoname;
          console.log(this.convoname);
         });
      });

      this.roomname = this.route.snapshot.params.displayName;
      console.log(this.roomname);
      firebase.database().ref('messages/').on('value', resp => {
        let chats = snapshotToArray(resp);
        console.log(chats);
        this.chats = chats.filter(x => x.roomname === this.roomname);
        setTimeout(() => this.scrolltop = this.chatcontent.nativeElement.scrollHeight, 500);
      });

      firebase.database().ref('roomusers/').orderByChild('roomname').equalTo(this.roomname).on('value', (resp2: any) => {
        const roomusers = snapshotToArray(resp2);
        this.users = roomusers.filter(x => x.status === 'online');
      });
    });
  }
  @ViewChild('chatcontent') chatcontent: ElementRef;
  scrolltop: any | null;

  updateM: Chatmessage = {
    message: ''
  };

  chatForm: FormGroup;
  chatname = '';
  roomname = '';
  message = '';
  users: any[];
  chats: any[];
  user: any;
  userName: any;
  messages: any;
  matcher = new MyErrorStateMatcher();
  conversations: any;
  convoname: any;
  name: any;

  getUser() {
    const userId = this.user.uid;
    const path = `/users/${userId}`;
    return this.db.object(path);
  }


  ngOnInit(): void {
    this.chatForm = this.formBuilder.group({
      'message': [null, Validators.required]
    });

  }
  onFormSubmit(form: any) {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    var dateTime = date + ' ' + time;

    const chat = form;

    chat.roomname = this.roomname;

    chat.chatname = this.chatname;
    chat.sender = this.user.displayName;

    chat.name = this.convoname;

    chat.date = dateTime;
    chat.type = 'message';
    const newMessage = firebase.database().ref('messages/').push();
    newMessage.set(chat);
    this.chatForm = this.formBuilder.group({
      'message': [null, Validators.required]
    });
  }

  deleteMsg(uid: any) {
    const key = uid;
    var del = confirm('Want to delete?');
    if (del) {
      firebase.database().ref(`messages/${key}`).remove();
    }
  }

  UpdateMsg(uid: any) {
    const key = uid;
    var del = confirm("Want to delete?");
    if (del) {
      firebase.database().ref(`chats/${key}`).update(this.updateM);
    }
  }
}
