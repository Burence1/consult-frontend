import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../task';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProfileService } from 'src/app/services/profile.service';
import { Profile } from 'src/app/profile';



@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private dbPath = '/todo';

  userName: string = '';
  currentId: string;
  profiles: Profile[];
  profile: Profile = new Profile;
  len: number = 0;

  tasksRef: AngularFireList<Task>;

  constructor(private db: AngularFireDatabase, private auth: AuthService, private profileService: ProfileService,) { 
    this.tasksRef = db.list(this.dbPath)

    this.auth.user.subscribe((user) => {
      this.currentId = user.uid;
      this.profileService.fetchProfileApi(this.currentId).subscribe((res) => {
          this.profile = res;
        },(error) => {
          console.error(error);
        });
    });

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
