import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Profile } from 'src/app/profile';
import { Task } from '../task';
import { ProfileService } from 'src/app/services/profile.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CurrentUser } from '../tasks.component';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css']
})
export class TaskDialogComponent implements OnInit {
  currentId: string;
  profiles: Profile[];
  selectedValue: string;
  minDate: Date;
  user: CurrentUser;

  private backupTask: Partial<Task> = { ...this.data.task };

  constructor(private auth: AuthService, private profileService: ProfileService,
              public dialogRef: MatDialogRef<TaskDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: TaskDialogData) {
      this.minDate = new Date();
      // this.minDate.setDate(this.minDate)
      this.profileService.fetchAllProfiles().subscribe(
        (res) => {this.profiles = res;
          // console.log(res);
        }, error => {
          console.error(error);
        });

      this.auth.authUser().subscribe((res: any) => {
          this.user = {
            name: res.displayName,
            email: res.email
          };
        });
    }

  cancel(): void {

    this.data.task.title = this.backupTask.title;
    this.data.task.description = this.backupTask.description;
    this.data.task.owner = this.backupTask.owner;
    this.data.task.from = this.backupTask.from;
    this.data.task.to = this.backupTask.to;
    this.data.task.dateDue = this.backupTask.dateDue;
    this.dialogRef.close(this.data);
  }
  // tslint:disable-next-line: typedef
  assign(){
    this.data.task.owner = this.user.name;
    console.log(this.user.name)
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
