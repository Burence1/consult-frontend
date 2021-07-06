import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProfileService } from 'src/app/services/profile.service';
import { Profile } from 'src/app/profile';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';


import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { CurrentUser } from '../tasks/tasks.component';



@Component({
  selector: 'app-tasks-home',
  templateUrl: './tasks-home.component.html',
  styleUrls: ['./tasks-home.component.css'],
})
export class TasksHomeComponent implements OnInit {
  profile: Profile;
  currentId: string;
  uid: any;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
    user: CurrentUser;
    
  constructor(
    private breakpointObserver: BreakpointObserver) {
        
        
   }

  ngOnInit(): void {
  }

  
}
