import { Component, Inject, OnInit } from '@angular/core';
import { Profile } from 'src/app/profile';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProfileService } from 'src/app/services/profile.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Todo } from '../models/patient-task';
import { CurrentUser } from '../../personal-tasks/tasks/tasks.component';

@Component({
  selector: 'app-patient-task-dialog',
  templateUrl: './patient-task-dialog.component.html',
  styleUrls: ['./patient-task-dialog.component.css']
})
export class PatientTaskDialogComponent implements OnInit {
  currentId: string;
  profiles: Profile[];
  profile: Profile;
  selectedValue: string;
  minDate: Date;
  user: CurrentUser;

  private backupTask: Partial<Todo> = { ...this.data.task};

  constructor(private auth: AuthService, private profileService: ProfileService, public newdialogRef: MatDialogRef<Todo>, @Inject(MAT_DIALOG_DATA) public data: PatientTaskDialogData) { 
    this.minDate = new Date();

    this.profileService.fetchAllProfiles().subscribe(
      (res) => {
        this.profiles = res;
        //console.log(res);
      }, error => {
        console.error(error);
      }
    );
    // this.auth.authUser().subscribe((res: any) =>{
    //   this.user = {
    //     name: res.displayName,
    //     email: res.email
    //   }
    // })
    this.auth.user.subscribe(
      (user) => {
        this.currentId = user.uid;
        console.log(this.currentId);
        this.profileService.fetchProfileApi(this.currentId).subscribe(
          (res) => {
            this.profile = res;
            console.log(res);
          },(error) => {
            console.error(error);
          });
      },(error) => {console.error(error);
      });
  }

  ngOnInit(): void {
  }
  showProfs(profile: Profile){
    console.log("check",profile)
  }
  cancel(): void{
    this.data.task.title = this.backupTask.title;
    this.data.task.description = this.backupTask.description;
    this.data.task.dateDue = this.backupTask.dateDue;
    this.data.task.assignedTo = this.backupTask.assignedTo;
    this.newdialogRef.close(this.data)
  }
  selfAssign(){
    
    this.data.task.assignedTo = this.profile.displayName;
  }

  formatDate(e){
    // var convertedDate = new Date(e.target.value)
    // this.data.task.dateDue = convertedDate
    // console.log(this.data.task.dateDue)
    }

}
export interface PatientTaskDialogData{
  task: Partial<Todo>;
  enableDelete: true
}

export interface PatientTaskDialogResult{
  task: Todo;
  delete?: true
}