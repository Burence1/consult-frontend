import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProfileService } from 'src/app/services/profile.service';
import { Profile } from 'src/app/profile';
import { AngularFireStorage } from '@angular/fire/storage';
import firebase from 'firebase/app';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-tasks-home',
  templateUrl: './tasks-home.component.html',
  styleUrls: ['./tasks-home.component.css']
})
export class TasksHomeComponent implements OnInit {
  profile: Profile;
  currentId: string;
  user: Observable<any>;
  uid: any;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,  ) {
    
   }

   findProfiles(){}

  ngOnInit(): void {
  }

  
}
