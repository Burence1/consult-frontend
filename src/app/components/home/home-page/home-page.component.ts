import { Component, Inject, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { ProfileService } from 'src/app/services/profile.service';
import { FileService } from 'src/app/services/files/file-service.service';
import { Profile } from 'src/app/profile';
import { MessagingService } from 'src/app/services/push-notifications/messaging.service';
import firebase from 'firebase/app';
import 'firebase/firestore';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  profile: Profile;
  currentId: string;
  selected!: Date | null;
  user: Observable<any>;
  userEmail: any;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  message: any;
  opened!: boolean;
  username: any;
  uid: any;
  searchText = '';

  constructor(
    private auth: AuthService,
    private breakpointObserver: BreakpointObserver,
    private profileService: ProfileService,
    @Inject(AngularFireStorage)
    private storage: AngularFireStorage,
    @Inject(FileService)
    private fileService: FileService,
    private messagingService: MessagingService
  ) {
    firebase.database().ref('users/').on('value', (snapshot: any) => {
      snapshot.forEach((childSnapshot: any) => {
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val();
        this.username = childData.displayName;
        this.uid = childKey;
        console.log(this.username);

      });
    });
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

  findProfiles() {}

  ngOnInit(): void {
    this.messagingService.requestPermission();
    this.messagingService.receiveMessage();
    this.message = this.messagingService.currentMessage;
    this.user = this.auth.authUser();
    this.user.subscribe((user) => {
      if (user) {
        this.userEmail = user.email;
        console.log(user);
      }
    });
  }
  // tslint:disable-next-line: typedef
  logout() {
    this.auth.logout();
  }

  // tslint:disable-next-line: typedef
  filterCondition(users) {
    return users.displayName.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1;
  }

}
