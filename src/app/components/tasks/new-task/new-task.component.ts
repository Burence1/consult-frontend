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

  ngOnInit(): void{
    
  }
}
