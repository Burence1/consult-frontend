import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Patient } from '../models/patient';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private dPath = `/patients/id/tasks`

  constructor(private store: AngularFirestore) { }



}
