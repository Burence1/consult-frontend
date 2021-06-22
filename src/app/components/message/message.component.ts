import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatService } from 'src/app/services/chat/chat.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Chatmessage } from 'src/app/classes/message/chatmessage';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @Input() chatMessage: Chatmessage;
  userEmail?: string;
  userName?: string;
  messageContent?: string;
  timeStamp?: Date = new Date();
  isOwnMessage: boolean;
  ownEmail: string;


  constructor(private auth: AuthService) {
    auth.authUser().subscribe((user: { email: string; }) => {
      this.ownEmail = user.email;
      this.isOwnMessage = this.ownEmail === this.userEmail;
    });
  }

  // tslint:disable-next-line: typedef
  ngOnInit(chatMessage = this.chatMessage) {
    this.messageContent = chatMessage.message;
    this.timeStamp = chatMessage.timeSent;
    this.userEmail = chatMessage.email;
    this.userName = chatMessage.userName;
  }
}
