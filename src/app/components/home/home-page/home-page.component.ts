import { Component, Inject, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { ProfileService } from 'src/app/services/profile.service';
import { FileService } from 'src/app/services/files/file-service.service';
import { Profile } from 'src/app/profile';


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
  
  constructor(private auth:AuthService,private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
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
}
