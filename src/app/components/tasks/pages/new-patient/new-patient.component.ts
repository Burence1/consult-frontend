import { EventEmitter, Input } from '@angular/core';
import { Component, OnInit, Output } from '@angular/core';

import { Patient } from '../models/patient';
import { TaskService } from '../services/task.service';
import { PatientService } from '../services/patient.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-patient',
  templateUrl: './new-patient.component.html',
  styleUrls: ['./new-patient.component.css']
})
export class NewPatientComponent implements OnInit {
  patient: Patient = {}

  constructor(private service: PatientService, private router: Router) { }

  ngOnInit(): void {
  }

  addPatient(){
  this.service.addPatient(this.patient).then((response: any) =>{
    console.log("res",response)
    this.router.navigate(['/patients', response.id]) //whyyyyyy
  })
  console.log("patient",this.patient)
  //then we navigate to /patients/patient.id
 
  }

}
