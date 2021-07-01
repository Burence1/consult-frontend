import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Patient } from '../models/patient';
import { Todo } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  searchValue: string = "";
  results: any;
  private dbPath = '/patients';
  patients = this.store.collection('patients', ref => ref.orderBy('firstName')).valueChanges({idField: 'id'});

  patientsRef: AngularFirestoreCollection<Patient>;

  constructor(private store: AngularFirestore) { 
    this.patientsRef = this.store.collection('patients', ref => ref.orderBy('firstName'));
  }
  getAll(): AngularFirestoreCollection<Patient> {
    return this.patientsRef;

  }

  searchPatient(name: string){
    let results = this.store.collection('patients', ref => ref.where("firstName", "==", "search")).valueChanges({idField: 'id'}) as Observable<Patient[]>;
    return results;
  }

 

  addPatient(patient: Patient): any{
    return this.patientsRef.add({ ...patient})
  }

  updatePatient(key: string, value: any): Promise<void>{
    return this.patientsRef.doc(key).update(value);
  }

  removePatient(key: string): Promise<void>{
      return this.patientsRef.doc(key).delete();
  }

  addTask(patientId: string, task: Todo): any{
    let tasksRef = this.store.collection(`patients/${patientId}/tasks`);
 
    return tasksRef.add({...task});

  }


  getPatientTasks(patientId: string){
    let tasks = this.store.collection('patients').doc(patientId).collection('tasks', ref => ref.orderBy('dateDue', 'asc')).valueChanges({idField: 'id'}) as Observable<any>;
    return tasks;
  }

  getDoneTasks(patientId: string){
    let tasks = this.patientsRef.doc(patientId).collection('tasks', ref => ref.where("done", "==", true)).valueChanges({idField: 'id'}) as Observable<any>;
    return tasks
  }

  getUndoneTasks(patientId: string){
    let tasks = this.patientsRef.doc(patientId).collection('tasks', ref => ref.where("done", "==", false)).valueChanges({idField: 'id'}) as Observable<any>;
    return tasks
  }

  updateTask(patientId: string, taskId: string, value: any): any{
   return this.store.collection('patients').doc(patientId).collection('tasks').doc(taskId).update(value);

  }

  deleteTask(patientId: string, taskId: string): any{
    return this.store.collection('patients').doc(patientId).collection('tasks').doc(taskId).delete();
  }
}
