import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task } from '../task';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css']
})
export class TaskDialogComponent implements OnInit {

  private backupTask: Partial<Task> = { ...this.data.task}

  constructor(
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TaskDialogData
  ) { }

  ngOnInit(): void {
  }

  cancel(): void{
    this.data.task.title = this.backupTask.title;
    this.data.task.owner = this.backupTask.owner
    this.data.task.dateDue = this.backupTask.dateDue
    this.dialogRef.close(this.data);
  }

  formatDate(e) {
    var convertDate = new Date(e.target.value);
    this.data.task.dateDue = convertDate
    console.log("heh",this.data.task.dateDue)
  }

}

export interface TaskDialogData{
  task: Partial<Task>;
  enableDelete: boolean;
}

export interface TaskDialogResult{
  task: Task;
  delete?: boolean;
}
