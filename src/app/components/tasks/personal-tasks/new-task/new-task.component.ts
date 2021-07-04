import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from '../models/task';
import { CurrentUser } from '../tasks/tasks.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Profile } from 'src/app/profile';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {

  @Input() task: Task | null = null;

  @Output() edit = new EventEmitter<Task>();

  users: CurrentUser[] = [];
  user: CurrentUser;
  usersName: string;
  currentId: string;
  profiles: Profile[];
  profile: Profile;

  ngOnInit(): void{
    
  }
  constructor(private auth: AuthService, private profileService: ProfileService){

    this.auth.user.subscribe(
      (user) => {
        this.currentId = user.uid;
        //console.log(this.currentId);
        this.profileService.fetchProfileApi(this.currentId).subscribe(
          (res) => {
            this.profile = res;
            this.usersName = res.displayName;
            //console.log(res);
          },(error) => {
            console.error(error);
          });
      },(error) => {console.error(error);
      });
  }
  
  formatDate(date: string){
  return date.toString()
  }
}
  
