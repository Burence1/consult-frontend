import { Component, OnInit } from '@angular/core';
import { Task } from './task';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';
import { TaskDialogResult } from './task-dialog/task-dialog.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  todo: Task[] = [
    {
      title: "Call patient 23",
      description: "In regards to her appointment",
      owner: "Dr J",
      created: new Date(),
      dateDue: new Date(2021,10,10)
    },
    {
      title: "Call nurse xyz",
      description: "medical supplies",
      owner: "Dr J",
      created: new Date(),
      dateDue: new Date(2021,10,10)
    }
  ]
  inProgress: Task[] = [];
  done: Task[] = [];

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  editTask(list: string, task: Task): void {}

  drop(event: CdkDragDrop<Task[]>): void {
    if (event.previousContainer === event.container) {
      return;
    }
    if (!event.container.data || !event.previousContainer.data) {
      return;
    }
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }

  newTask(): void{
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '400px',
      data: {
        task: {},
      },
    });
    dialogRef.afterClosed().subscribe((result: TaskDialogResult) => this.todo.push(result.task))
  }
}
