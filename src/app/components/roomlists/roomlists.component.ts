import { ChatService } from 'src/app/services/chat/chat.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import firebase from 'firebase/app';
import 'firebase/auth';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/classes/user/user';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';

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
  selector: 'app-roomlists',
  templateUrl: './roomlists.component.html',
  styleUrls: ['./roomlists.component.css']
})
export class RoomlistsComponent implements OnInit {
  user: any;
  userName: any;
  chatname: any;
  displayedColumns: string[] = ['roomname'];
  rooms: any[];
  isLoadingResults = true;


  constructor(private Auth: AngularFireAuth, private db: AngularFireDatabase, private route: ActivatedRoute, private router: Router, private auth: AuthService, private chat: ChatService) {
    this.Auth.authState.subscribe(auth => {
      if (auth !== undefined && auth !== null) {
        this.user = auth;
        this.chatname = this.user.password;
        console.log(this.chatname)
      }
      this.getUser().valueChanges().subscribe(a => {
        this.userName = a;
        this.chatname = this.userName.displayName
      });
    });
    firebase.database().ref('rooms/').on('value', resp => {
      this.rooms = [];
      this.rooms = snapshotToArray(resp);
      this.isLoadingResults = false;
    });

  }

  getUser() {
    const userId = this.user.uid;
    const path = `/users/${userId}`;
    return this.db.object(path);
  }

  ngOnInit(): void {
  }

  enterChatRoom(roomname: string) {
    // const chat = { roomname: '', chatname: '', message: '', date: '', type: '' };
    // chat.roomname = roomname;
    // chat.chatname = this.chatname;
    // console.log(chat.chatname)
    // chat.date = this.datepipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss');
    // chat.message = `${this.chatname} enter the room`;
    // chat.type = 'join';
    // const newMessage = firebase.database().ref('chats/').push();
    // newMessage.set(chat);

    firebase.database().ref('roomusers/').orderByChild('roomname').equalTo(roomname).on('value', (resp: any) => {
      let roomuser = [];
      roomuser = snapshotToArray(resp);
      const user = roomuser.find(x => x.chatname === this.chatname);
      if (user !== undefined) {
        const userRef = firebase.database().ref('roomusers/' + user.key);
        userRef.update({ status: 'online' });
      } else {
        const newroomuser = { roomname: '', chatname: '', status: '' };
        newroomuser.roomname = roomname;
        newroomuser.chatname = this.chatname;
        newroomuser.status = 'online';
        const newRoomUser = firebase.database().ref('roomusers/').push();
        newRoomUser.set(newroomuser);
      }
    });

    this.router.navigate(['/chatroom', roomname]);
  }

}
