import { Component, OnInit } from '@angular/core';
import { Task } from './task';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent, TaskDialogResult } from '../task-dialog/task-dialog.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  todo: Task[] = [
    {
      title: 'Buy milk',
      description: 'Go to the store and buy milk',
      owner: "Jane",
      dateDue: new Date(2021,10,10),
      created: new Date()
    },
    {
      title: 'Create a task manager app',
      description: 'Using Firebase and Angular create a Kanban app!',
      owner: "Doe",
      dateDue: new Date(2021,11,11),
      created: new Date()
    }
  ];
  inProgress: Task[] = [];
  done: Task[] = [];

  editTask(list: 'done' | 'todo' | 'inProgress', task: Task): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '270px',
      data: {
        task,
        enableDelete: true,
      },
    });
    dialogRef.afterClosed().subscribe((result: TaskDialogResult) => {
      const dataList = this[list];
      const taskIndex = dataList.indexOf(task);
      if (result.delete) {
        dataList.splice(taskIndex, 1);
      } else {
        dataList[taskIndex] = task;
      }
    });
  }

  drop(event: CdkDragDrop<Task[]|null>): void {
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


   items: Observable<any[]>;
  constructor(private db: AngularFireDatabase, private dialog: MatDialog) {
    this.items = db.list('todo').valueChanges();
  }


  ngOnInit(): void {
      console.log(this.items)
  }

  newTask(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '270px',
      data: {
        task: {},
      },
    });
    dialogRef
      .afterClosed()
      .subscribe((result: TaskDialogResult) => this.todo.push(result.task));
  }

  

}
