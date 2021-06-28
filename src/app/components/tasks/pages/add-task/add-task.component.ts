import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Todo } from '../models/task';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  task: Todo = {};
  patientId!: string;

  constructor(private route: ActivatedRoute, private service: PatientService, private router: Router) { }

  ngOnInit(): void {

    this.route.params.subscribe((params: Params) =>{
        console.log("task params",params)
        this.patientId = params.patientId;
        
    })

  }

  addTask(){
    this.task.done = false;
    this.service.addTask(this.patientId, this.task).then((response: Todo) =>{
      this.router.navigate(['../'], {relativeTo: this.route})
    })

  }

}
