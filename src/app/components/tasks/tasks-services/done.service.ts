import { Injectable } from '@angular/core';
import { Task } from '../task';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class DoneService {

  private donePath = '/done';

  doneRef: AngularFireList<Task>;

  constructor(private db: AngularFireDatabase) { 
    this.doneRef = db.list(this.donePath)
  }

  getAll(): AngularFireList<Task>{
    return this.doneRef;
  }

  create(task: Task): any{
    return this.doneRef.push(task);
  }

  update(key: string, value: any): Promise<void>{
    return this.doneRef.update(key, value);
  }

  delete(key: string): Promise<void>{
    return this.doneRef.remove(key)
  
  }

  clearAll(): Promise<void>{
    return this.doneRef.remove()
  }
}
