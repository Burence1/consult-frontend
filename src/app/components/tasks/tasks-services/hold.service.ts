import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Task } from '../task';

@Injectable({
  providedIn: 'root'
})
export class HoldService {

  private dbPath = '/inProgress';

  progressRef: AngularFireList<Task>;

  constructor(private db: AngularFireDatabase) {
    this.progressRef = db.list(this.dbPath)
   }

   getAll(): AngularFireList<Task>{
     return this.progressRef;
   }

   add(task: Task): any{
     return this.progressRef.push(task);
   }

   update(key: string, value: any): Promise<void>{
     return this.progressRef.update(key, value);
   }

   delete(key: string): Promise<void>{
     
    return this.progressRef.remove(key)
  }

  clearAll(): Promise<void>{
    return this.progressRef.remove()
  }
}
