import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../task';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';



@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private dbPath = '/todo';

  tasksRef: AngularFireList<Task>;

  constructor(private db: AngularFireDatabase) { 
    this.tasksRef = db.list(this.dbPath)
  }

  getAll(): AngularFireList<Task>{
    return this.tasksRef;
  }

  create(task: Task): any{
    return this.tasksRef.push(task);
  }

  update(key: string, value: any): Promise<void>{
    return this.tasksRef.update(key, value);
  }

  delete(key: string): Promise<void>{
    return this.tasksRef.remove(key)
  }

  getUsers(){
    return this.db.list('users')
  }
}
