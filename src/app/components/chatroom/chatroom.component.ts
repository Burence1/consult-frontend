import { AddRoomComponent } from './../add-room/add-room.component';
import { RoomlistsComponent } from './../roomlists/roomlists.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ChatFeedComponent } from './../chat-feed/chat-feed.component';
import {
  Component,
  OnInit,
  Inject,
  ViewChild,
  ElementRef,
  AfterViewChecked,
  OnChanges,
} from '@angular/core';
import { Observable } from 'rxjs';
import { ChatService } from 'src/app/services/chat/chat.service';
import { MatDialog } from '@angular/material/dialog';
import { Profile } from 'src/app/profile';
import { ProfileService } from 'src/app/services/profile.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { FileService } from 'src/app/services/files/file-service.service';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css'],
})
export class ChatroomComponent implements OnInit, AfterViewChecked {
  @ViewChild('scroller') private feedScroll: ElementRef;
  user: Observable<any>;
  profile: Profile;
  displayNameInput: string;
  userEmail: any;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  currentId: string;

  constructor(
    private chat: ChatService,
    private breakpointObserver: BreakpointObserver,
    private auth: AuthService,
    public dialog: MatDialog,
    private profileService: ProfileService,
    @Inject(AngularFireStorage)
    private storage: AngularFireStorage,
    @Inject(FileService)
    private fileService: FileService
  ) {
    this.findProfiles();
    this.auth.user.subscribe(
      (user) => {
        this.currentId = user.uid;
        console.log(this.currentId);
        this.profileService.fetchProfileApi(this.currentId).subscribe(
          (res) => {
            this.profile = res;
            console.log(res);
          },
          (error) => {
            console.error(error);
          }
        );
      },
      (error) => {
        console.error(error);
      }
    );
  }

  // tslint:disable-next-line: typedef
  findProfiles() {}

  ngOnInit(): void {}

  // tslint:disable-next-line: typedef
  logout() {
    this.auth.logout();
  }

  scrollToBottom(): void {
    this.feedScroll.nativeElement.scrollTop =
      this.feedScroll.nativeElement.scrollHeight;
  }

  // tslint:disable-next-line: typedef
  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  // tslint:disable-next-line: typedef
  openDialog() {
    const dialogRef = this.dialog.open(AddRoomComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
