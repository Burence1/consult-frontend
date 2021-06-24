import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { map } from 'rxjs/operators';
import { Task } from '../task';
import { AngularFireDatabase } from '@angular/fire/database';
import { HoldService } from '../tasks-services/hold.service';
import { TaskService } from '../tasks-services/task.service';

@Component({
  selector: 'app-on-hold',
  templateUrl: './on-hold.component.html',
  styleUrls: ['./on-hold.component.css']
})
export class OnHoldComponent implements OnInit {
  
  @Input() task: Task;

  @Output() edit = new EventEmitter<Task>();

  onHold: Task[];
  len = 0;
  msg = '';

  currentTask: Task = {
    title: '',
    owner: '',
    dateDue: 0,
    status: 'todo'
  }

  constructor(private service: HoldService, private taskService: TaskService) { }

  ngOnInit(): void {
    this.retrieveOnHoldTasks();
  }

  ngOnChanges(): void{
    this.msg = '';
    this.currentTask = { ...this.task}
  }
  retrieveOnHoldTasks(){
    this.service.getAll().snapshotChanges().pipe(
      map(changes => changes.map(c =>({
        key: c.payload.key, ...c.payload.val()
      })))
    ).subscribe(data =>{
      this.onHold = data;
      this.len = this.onHold.length;
    })
  }

  end(task: Task){
    this.service.delete(task.key)
  }

  clear(){
    this.service.clearAll()
  }

  deleteTask(): void{
    if(this.currentTask.key){
      this.service.delete(this.currentTask.key).then(() => {
       
        this.msg = 'task deleted successfully!'
      }).catch(err => console.log(err))
    }
  }

  continueTask(task: Task){
    this.deleteTask()
    this.taskService.create(task)
    task.status = 'todo';
  }

}
