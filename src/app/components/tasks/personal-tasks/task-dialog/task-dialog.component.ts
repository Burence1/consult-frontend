import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Profile } from 'src/app/profile';
import { Task } from '../models/task';
import { ProfileService } from 'src/app/services/profile.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CurrentUser } from '../tasks/tasks.component';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css']
})
export class TaskDialogComponent implements OnInit {
  currentId: string;
  profiles: Profile[];
  profile: Profile;
  selectedValue: string;
  minDate: Date;
  user: CurrentUser;

  private backupTask: Partial<Task> = { ...this.data.task };

  constructor(private auth: AuthService, private profileService: ProfileService,
              public dialogRef: MatDialogRef<TaskDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: TaskDialogData)
               {
      this.minDate = new Date();
      this.profileService.fetchAllProfilesSnapshot().subscribe(
        (res) => {
          this.profiles = res.map((value) => {
            const profile = value.payload.val();
            profile.id = value.payload.key;
            return profile;
          });
         // console.log(this.profiles);
        },
        (error) => {
          console.error(error);
        }
      );

      // this.auth.authUser().subscribe((res: any) => {
      //     this.user = {
      //       name: res.displayName,
      //       email: res.email
      //     };
      //   });
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

  cancel(): void {

    this.data.task.title = this.backupTask.title;
    this.data.task.description = this.backupTask.description;
    this.data.task.owner = this.backupTask.owner;
    this.data.task.start = this.backupTask.start;
    this.data.task.end = this.backupTask.end;
    this.data.task.dateDue = this.backupTask.dateDue;
    this.dialogRef.close(this.data);
  }
  // tslint:disable-next-line: typedef
  assign(){
    console.log(this.profile.displayName)
    this.data.task.owner = this.profile.displayName;
  }
  ngOnInit(): void {
  }

  // tslint:disable-next-line: typedef
  formatDate(e){
    const convertedDate = new Date(e.target.value);
    this.data.task.dateDue = convertedDate;
    console.log(this.data.task.dateDue);
    }
}

export interface TaskDialogData {
  task: Partial<Task>;
  enableDelete: boolean;
}

export interface TaskDialogResult {
  task: Task;
  delete?: boolean;
}
