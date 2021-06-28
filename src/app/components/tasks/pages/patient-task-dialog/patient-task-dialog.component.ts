import { Component, Inject, OnInit } from '@angular/core';
import { Profile } from 'src/app/profile';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProfileService } from 'src/app/services/profile.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Todo } from '../models/task';

@Component({
  selector: 'app-patient-task-dialog',
  templateUrl: './patient-task-dialog.component.html',
  styleUrls: ['./patient-task-dialog.component.css']
})
export class PatientTaskDialogComponent implements OnInit {
  currentId: string;
  profiles: Profile[];
  selected: string;

  private backupTask: Partial<Todo> = { ...this.data.task};

  constructor(private auth: AuthService, private profileService: ProfileService, public newdialogRef: MatDialogRef<Todo>, @Inject(MAT_DIALOG_DATA) public data: PatientTaskDialogData) { 
    this.profileService.fetchAllProfiles().subscribe(
      (res) => {
        this.profiles = res;
        console.log(res);
      }, error => {
        console.error(error);
      }
    );
  }

  ngOnInit(): void {
  }

  cancel(): void{
    this.data.task.title = this.backupTask.title;
    this.data.task.description = this.backupTask.description;
    this.data.task.dateDue = this.backupTask.dateDue;
    this.data.task.assignedTo = this.backupTask.assignedTo;
    this.newdialogRef.close(this.data)
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