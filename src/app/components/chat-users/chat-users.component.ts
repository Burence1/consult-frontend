import { ChatService } from './../../services/chat/chat.service';
import { User } from './../../classes/user/user';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-chat-users',
  templateUrl: './chat-users.component.html',
  styleUrls: ['./chat-users.component.css']
})
export class ChatUsersComponent implements OnInit {
  users: User[];

  constructor(chat: ChatService) {
    chat.getUsers().valueChanges().subscribe(users => {
      this.users = users;
    });
  }

  ngOnInit(): void {
  }

}
