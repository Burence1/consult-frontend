import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Todo } from '../models/task';
import { PatientService } from '../services/patient.service';
import { Profile } from 'src/app/profile';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProfileService } from 'src/app/services/profile.service';


@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  task: Todo = {};
  patientId!: string;
  currentId: string;
  profiles: Profile[];
  selected: string;

  constructor(private route: ActivatedRoute, private service: PatientService, private router: Router, private auth: AuthService, private profileService: ProfileService) {
    this.profileService.fetchAllProfiles().subscribe(
      (res) => {
        this.profiles = res;
        console.log(res);
      }, error => {
        console.error(error);
      }
    );
   }

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
