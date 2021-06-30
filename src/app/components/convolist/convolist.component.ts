import { ChatService } from 'src/app/services/chat/chat.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import firebase from 'firebase/app';
import 'firebase/auth';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/classes/user/user';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-convolist',
  templateUrl: './convolist.component.html',
  styleUrls: ['./convolist.component.css']
})
export class ConvolistComponent implements OnInit {

  user: any;
  userId: any
  userName: any;
  chatname: any;
  displayedColumns: string[] = ['roomname'];
  conversations: any;
  isLoadingResults = true;
  receiver: any
  userid: string

  constructor() { }

  ngOnInit(): void {
  }

}
