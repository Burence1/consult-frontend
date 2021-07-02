import { Component, OnInit, ElementRef, ViewChild, AfterViewChecked, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Chatmessage } from 'src/app/classes/message/chatmessage';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ProfileService } from 'src/app/services/profile.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Profile } from 'src/app/profile';



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
  selector: 'app-chat-feed',
  templateUrl: './chat-feed.component.html',
  styleUrls: ['./chat-feed.component.css']
})
export class ChatFeedComponent implements OnInit {
  @ViewChild('scroller') private feedScroll: ElementRef;
  // @ViewChild('chatcontent') chatcontent: ElementRef;
  // scrolltop: any | null;
  updateM: Chatmessage = {
    message: ''
  }
  chatForm: FormGroup;
  chatname = '';
  roomname = '';
  message = '';
  users: any[];
  chats: any[];
  user: any;
  userName: any;
  messages: any;
  rooms: any;
  matcher = new MyErrorStateMatcher();
  admin: any;
  msg:any;
  profile: Profile;
  currentId: string;
  isHandset$: Observable<boolean> = this.breakpointObserver
  .observe(Breakpoints.Handset)
  .pipe(
    map((result) => result.matches),
    shareReplay()
  );
  constructor(private Auth: AngularFireAuth, private db: AngularFireDatabase, private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private breakpointObserver: BreakpointObserver,
              private profileService: ProfileService,
              private auth: AuthService,) {
    this.Auth.authState.subscribe(auth => {
      if (auth !== undefined && auth !== null) {
        this.user = auth;
      }
      this.getUser().valueChanges().subscribe(a => {
        this.userName = a;
        this.chatname = this.userName.displayName;
      });

      this.roomname = this.route.snapshot.params.roomname;
      firebase.database().ref('chats/').on('value', resp => {
        const chats = snapshotToArray(resp);
        this.chats = chats.filter(x => x.roomname === this.roomname);
        console.log(this.chats);
       // setTimeout(() => this.scrolltop = this.chatcontent.nativeElement.scrollHeight, 500);
      });

      firebase.database().ref('roomusers/').orderByChild('roomname').equalTo(this.roomname).on('value', (resp2: any) => {
        const roomusers = snapshotToArray(resp2);
        this.users = roomusers.filter(x => x.status === 'online');
      });

      firebase.database().ref('rooms/').on('value', resp => {
        // this.rooms = [];
        const rooms = snapshotToArray(resp);
        this.rooms = rooms.filter(x => x.roomname === this.roomname)
        this.admin=this.rooms
      });
    });
    this.findProfiles();
    this.auth.user.subscribe(
      (user) => {
        this.currentId = user.uid;
        console.log(this.currentId);
        this.profileService.fetchProfileApi(this.currentId).subscribe(
          (res) => {
            this.profile = res;
            console.log(res);
          },
          (error) => {
            console.error(error);
          }
        );
      },
      (error) => {
        console.error(error);
      }
    );
  }

  findProfiles(){}

  // tslint:disable-next-line: typedef
  getUser() {
    const userId = this.user.uid;
    const path = `/users/${userId}`;
    return this.db.object(path);
  }


  ngOnInit(): void {
    this.chatForm = this.formBuilder.group({
      message: [null, Validators.required]
    });
  }

  // tslint:disable-next-line: typedef
  onFormSubmit(form: any) {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    var dateTime = date + ' ' + time;

    const chat = form;
    chat.roomname = this.roomname;
    chat.chatname = this.chatname;
    chat.date = dateTime;
    chat.type = 'message';
    const newMessage = firebase.database().ref('chats/').push();
    newMessage.set(chat);
    this.chatForm = this.formBuilder.group({
      'message': [null, Validators.required]
    });
  }

  deleteMsg(uid: any) {
    const key = uid
    var del = confirm('Are you sure you want to delete this message?');
    if (del) {
      firebase.database().ref(`chats/${key}`).remove();
    }
  }

  updateMsg(uid: any, message:any) {
    const key = uid
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    var dateTime = date + ' ' + time;

    const chat = message;
    chat.roomname = this.roomname;
    chat.chatname = this.chatname;
    chat.date = dateTime;
    chat.type = 'message';
    firebase.database().ref(`chats/${key}`).update(chat);
  }
  logout() {
    this.auth.logout();
  }

  // scrollToBottom(): void {
  //   this.feedScroll.nativeElement.scrollTop
  //     = this.feedScroll.nativeElement.scrollHeight;
  // }


  // // tslint:disable-next-line: typedef
  // ngAfterViewChecked() {
  //   this.scrollToBottom();
  // }
}
