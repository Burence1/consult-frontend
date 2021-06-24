import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../tasks-services/task.service';


@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {
  @Input() task?: Task;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  
  currentTask: Task = {
    title: '',
    owner: '',
    dateDue: 2,
    status: 'todo'
  }
  message = '';

  constructor(private service: TaskService) { }

  ngOnInit(): void {
    this.message = '';
  }

  ngOnChanges(): void{
    this.message = '';
    this.currentTask = { ...this.task}
  }

  updateTask(): void{
    const data = {
      title: this.currentTask.title,
      owner: this.currentTask.owner,
      dateDue: this.currentTask.dateDue
    };

    if(this.currentTask.key){
      this.service.update(this.currentTask.key, data)
      .then(() => this.message = 'Task updated successfully!')
      .catch(err => console.log(err));
    }
  }

  deleteTask(): void{
    if(this.currentTask.key){
      this.service.delete(this.currentTask.key).then(() => {
        this.refreshList.emit();
        this.message = 'task deleted successfully!'
      }).catch(err => console.log(err))
    }
  }

}
