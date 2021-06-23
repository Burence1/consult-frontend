import { ChatFeedComponent } from './../chat-feed/chat-feed.component';
import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatService } from 'src/app/services/chat/chat.service';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit, AfterViewChecked {
  @ViewChild('scroller') private feedScroll: ElementRef;

  

  constructor(private chat: ChatService) { }

  ngOnInit(): void {

  }


  scrollToBottom(): void {
    this.feedScroll.nativeElement.scrollTop
      = this.feedScroll.nativeElement.scrollHeight;
  }

  // tslint:disable-next-line: typedef
  ngAfterViewChecked() {
    this.scrollToBottom();
  }
}
