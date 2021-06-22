import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from '../task';
@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {

  @Input() task: Task | null = null;

  @Output() edit = new EventEmitter<Task>();

  constructor() { }

  ngOnInit(): void {
  }

}
