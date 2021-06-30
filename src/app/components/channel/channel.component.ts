import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked} from '@angular/core';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit,AfterViewChecked {

  @ViewChild('scroller') private feedContainer: ElementRef;


  constructor() { }

  ngOnInit(): void {
  }

  scrollToBottom(): void {
    this.feedContainer.nativeElement.scrollTop
      = this.feedContainer.nativeElement.scrollHeight;
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

}
