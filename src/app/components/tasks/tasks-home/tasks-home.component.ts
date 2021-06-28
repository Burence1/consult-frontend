import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProfileService } from 'src/app/services/profile.service';
import { Profile } from 'src/app/profile';

@Component({
  selector: 'app-tasks-home',
  templateUrl: './tasks-home.component.html',
  styleUrls: ['./tasks-home.component.css']
})
export class TasksHomeComponent implements OnInit {
  profile: Profile;
  currentId: string;

  constructor() {
    
   }

  ngOnInit(): void {
  }

}
