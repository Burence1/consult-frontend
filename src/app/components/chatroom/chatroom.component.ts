import { AddRoomComponent } from './../add-room/add-room.component';
import { RoomlistsComponent } from './../roomlists/roomlists.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ChatFeedComponent } from './../chat-feed/chat-feed.component';
import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatService } from 'src/app/services/chat/chat.service';
import {MatDialog} from '@angular/material/dialog';
import { Profile } from 'src/app/profile';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit, AfterViewChecked {
  @ViewChild('scroller') private feedScroll: ElementRef;
  user: Observable<any>;
  profile: Profile;
  displayNameInput: string;
  userEmail: any;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  

  constructor(private chat: ChatService, private breakpointObserver: BreakpointObserver, private auth:AuthService, public dialog: MatDialog) { }

  ngOnInit(): void {

  }

  logout() {
    this.auth.logout();
  }


  scrollToBottom(): void {
    this.feedScroll.nativeElement.scrollTop
      = this.feedScroll.nativeElement.scrollHeight;
  }

  // tslint:disable-next-line: typedef
  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddRoomComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}


