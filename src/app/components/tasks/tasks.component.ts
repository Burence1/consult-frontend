import { Component, Input, OnInit } from '@angular/core';
import { Task } from './task';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';
import { TaskDialogResult } from './task-dialog/task-dialog.component';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { TaskService } from './tasks-services/task.service';
import { map } from 'rxjs/operators';
import { HoldService } from './tasks-services/hold.service';
import { DoneService } from './tasks-services/done.service';

const getObservable = (collection: AngularFireList<Task>) =>{
  const subject = new BehaviorSubject<Task[]>([]);
  collection.valueChanges().subscribe((val: Task[])=>{
    subject.next(val)
  });
  return subject
}

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  @Input() task?: Task;
  todo: Task[];
  inProgress: Task[];

  added = false;
  lenTasks = 0;
  msg = '';

  currentTask: Task = {
    title: '',
    owner: '',
    dateDue: 2,
    status: 'todo'
  }
 
  constructor(private dialog: MatDialog, private db: AngularFireDatabase, private taskService: TaskService, private store: AngularFirestore) { }

  ngOnInit(): void {

    this.retrieveTasks();
    this.retrieveUsers()

  }

  ngOnChanges(){
    this.msg = '';
    //this.currentTask = { ...this.task}
  }

  retrieveTasks(){
    this.taskService.getAll().snapshotChanges().pipe(
      map(changes => changes.map(c =>({
        key: c.payload.key, ...c.payload.val()
      })))
    ).subscribe(data => {
      this.todo = data;
      this.lenTasks = this.todo.length;
      console.log(this.todo)
    });
  }


  editTask(list: 'done' | 'todo' | 'inProgress', task: Task): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '400px',
      data: {
        task,
        enableDelete: true,
      }
    });
    dialogRef.afterClosed().subscribe((result: TaskDialogResult)=>{
      if(result.delete){
        this.taskService.delete(task.key)

      } 
      else{
        this.taskService.update(task.key, task)
      }
    })
  }

  newTask(): void{
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '400px',
      data: {
        task: {},
      },
    });
    dialogRef.afterClosed().subscribe((result: TaskDialogResult) => {result.task.status = 'todo',
      console.log("TASK",result.task.dateDue)
      this.taskService.create(result.task)
    });
    
    this.added = true; //might be problematic
  }

  retrieveUsers(){
   
  }
}
