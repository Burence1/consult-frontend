import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../task';

@Injectable({
  providedIn: 'root'
})
export class NewTaskService {

  constructor(private store: AngularFirestore) { }

  getObservable = (collection: AngularFirestoreCollection<Task>) =>{
    const subject = new BehaviorSubject<Task[]>([]);
    collection.valueChanges({idField: 'id'}).subscribe((val: Task[])=>{;
      subject.next(val)
    });
    return subject
  }

  getTasks(){
   
   let todo  = this.getObservable(this.store.collection('todo')) as Observable<Task[]>;
    return todo;
  }
}