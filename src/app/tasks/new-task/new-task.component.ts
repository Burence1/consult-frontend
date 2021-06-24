import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from '../task';
import { DoneService } from '../tasks-services/done.service';
import { TaskService } from '../tasks-services/task.service';
import { HoldService } from '../tasks-services/hold.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {

  @Input() task: Task | null = null;

  @Output() edit = new EventEmitter<Task>();

  @Output() donezo = new EventEmitter<any>();

  currentTask: Task = {
    title: '',
    owner: '',
    dateDue: 0,
    status: 'todo'
  }
  msg = '';
  flag = '';

  constructor(private service: DoneService, private taskService: TaskService, private onGoingService: HoldService) { }

  ngOnInit(): void {
    this.msg = '';
  }

  ngOnChanges(){
    this.msg = '';
    this.currentTask = { ...this.task}
  }

  deleteDoneTask(): void {
    if (this.currentTask.key) {
      this.service.delete(this.currentTask.key)
        .then(() => {
         
          this.msg = 'The task was updated successfully!';
          console.log(this.msg)
        })
        .catch(err => console.log(err));
    }
  }

  markDone(task: Task){
    console.log(task.status)
    if(task.status == 'todo'){
      console.log(task.status)
      this.taskService.delete(task.key)
    } 
    task.key = 'newly done'
    this.service.create(task);
    task.status = 'done';
  }

  onHold(task: Task){
    if(task.status == 'todo'){
      console.log(task.status)
      this.taskService.delete(task.key)
    } 
    console.log("done",this.flag)
    this.onGoingService.add(task)
    this.task.status = 'on-hold';
  }

}
