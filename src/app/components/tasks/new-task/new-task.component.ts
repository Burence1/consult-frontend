import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from '../task';
import { CurrentUser } from '../tasks.component';
import { AuthService } from 'src/app/services/auth/auth.service';

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
  usersName: string = '';

  ngOnInit(): void{
    
  }
  constructor(private auth: AuthService){
    this.auth.authUser().subscribe((res: any) =>{
      console.log("User", res)
      let newuser = {
        name: res.displayName,
        email: res.email
      }
     // this.users.push(newuser);
      this.usersName = newuser.name;
      // this.usersName = this.user.name;
      // console.log("testing user",this.usersName)
      // console.log(this.users)
    })
  }
  formatDate(date: string){
  return date.toString()
  }
}
  
