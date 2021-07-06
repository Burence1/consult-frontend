import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { Profile } from 'src/app/profile';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProfileService } from 'src/app/services/profile.service';
import { Task } from '../models/task';
import { myEvent } from '../task-calendar/event';



const getObservable = (collection: AngularFirestoreCollection<Task>) =>{
  const subject = new BehaviorSubject<Task[]>([]);
  collection.valueChanges({idField: 'id'}).subscribe((val: Task[])=>{;
    subject.next(val)
  });
  return subject
}

@Injectable({
  providedIn: 'root'
})
export class NewTaskService {

  events: myEvent[] = []
  tasks: any;
  anyE: myEvent = {title: '', owner: '', end: new Date(), start: new Date()}
  userName: string = '';
  currentId: string;
  profiles: Profile[];
  profile: Profile = new Profile;
  len: number = 0;

  constructor(private store: AngularFirestore, private auth: AuthService, private profileService: ProfileService,) { 

      
    this.auth.user.subscribe((user) => {
      this.currentId = user.uid;
      this.profileService.fetchProfileApi(this.currentId).subscribe((res) => {
          this.profile = res;

          this.tasks = this.getTasks()
         this.events = this.getEvents()
        },(error) => {
          console.error(error);
        });
    });
  }


  getTasks(){
   
   let todo  = getObservable(this.store.collection('todo')) as Observable<Task[]>;
    return todo;
  }



  getEvents(){

    this.store.collection('todo', ref => ref.where("owner", "==", `${this.profile.displayName}`)).valueChanges().subscribe(data=>{
      this.tasks = data;
      console.log("whyyy",this.profile.displayName)
      this.tasks.forEach(task=>{
         task.end = task.end.toDate()
         task.start = task.start.toDate()
         task.created = task.created.toDate()
         task.dateDue = task.dateDue.toDate()
        });
    });
    return this.tasks;
  }


}