import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task } from '../task';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css']
})
export class TaskDialogComponent implements OnInit {

  minDate: Date;
  private backupTask: Partial<Task> = { ...this.data.task };

  constructor(
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TaskDialogData) {
      this.minDate = new Date();
      // this.minDate.setDate(this.minDate)
    }

  cancel(): void {
    
    this.data.task.title = this.backupTask.title;
    this.data.task.description = this.backupTask.description;
    this.data.task.dateDue = this.backupTask.dateDue
    this.dialogRef.close(this.data);
  }

  ngOnInit(): void {
  }

  formatDate(e){
    var convertedDate = new Date(e.target.value)
    this.data.task.dateDue = convertedDate
    console.log(this.data.task.dateDue)
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
