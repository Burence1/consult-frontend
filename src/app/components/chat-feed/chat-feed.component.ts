import { Component, OnInit,OnChanges } from '@angular/core';
import { ChatService } from 'src/app/services/chat/chat.service';
import { Observable } from 'rxjs';
import { AngularFireList } from '@angular/fire/database';
import { Chatmessage } from 'src/app/classes/message/chatmessage';


@Component({
  selector: 'app-chat-feed',
  templateUrl: './chat-feed.component.html',
  styleUrls: ['./chat-feed.component.css']
})
export class ChatFeedComponent implements OnInit,OnChanges {

  feed: Observable<any[]>;

  constructor(private chat: ChatService) { }

  ngOnInit(): void {
    this.feed = this.chat.getMessages().valueChanges();
  }

  ngOnChanges(): void {
    this.feed = this.chat.getMessages().valueChanges();
  }
}
