import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat/chat.service';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.css']
})
export class ChatFormComponent implements OnInit {

  message: any;

  constructor(private chat: ChatService) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line: typedef
  send() {
    this.chat.sendMessage(this.message);
    this.message = '';
  }

  // tslint:disable-next-line: typedef
  handleSubmit(event: any) {
    if (event.keyCode === 13) {
      this.send();
    }
  }
}
