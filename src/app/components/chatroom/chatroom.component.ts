import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';


@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit, AfterViewChecked {
  @ViewChild('scroller') private feedScroll: ElementRef;


  constructor() { }

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
