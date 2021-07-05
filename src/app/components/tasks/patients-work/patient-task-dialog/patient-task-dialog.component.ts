import { Component, Inject, OnInit } from '@angular/core';
import { Profile } from 'src/app/profile';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProfileService } from 'src/app/services/profile.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Todo } from '../models/patient-task';
import { CurrentUser } from '../../personal-tasks/tasks/tasks.component';
import { ActivatedRoute, Params } from '@angular/router';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Component({
  selector: 'app-patient-task-dialog',
  templateUrl: './patient-task-dialog.component.html',
  styleUrls: ['./patient-task-dialog.component.css']
})
export class PatientTaskDialogComponent implements OnInit {
  currentId: string;
  profiles: Profile[];
  profile: Profile = new Profile;
  selectedValue: string;
  minDate: Date;
  user: CurrentUser;
  patientId!: string;
  assignee_email: string;

  private backupTask: Partial<Todo> = { ...this.data.task};

  constructor( private route: ActivatedRoute, private auth: AuthService, private profileService: ProfileService, public newdialogRef: MatDialogRef<Todo>, @Inject(MAT_DIALOG_DATA) public data: PatientTaskDialogData) { 
    this.minDate = new Date();

    this.profileService.fetchAllProfiles().subscribe(
      (res) => {
        this.profiles = res;
        //console.log(res);
      }, error => {
        console.error(error);
      }
    );

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
    console.log("route",this.route)
    this.route.params.subscribe((params: Params) =>{
      console.log("params",params)
      this.patientId = params.patientId;

      
    })

  }

  public sendEmail(e: Event) {
    console.log(this.assignee_email)
    e.preventDefault();
    emailjs.sendForm('service_33445jf', 'template_xi67ytx', e.target as HTMLFormElement, 'user_ZIsvOS6F3ZGfp18QHuJC5')
      .then((result: EmailJSResponseStatus) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
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