import { Component, OnInit, ViewChild } from '@angular/core';
import { Task } from './task';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';
import { TaskDialogResult } from './task-dialog/task-dialog.component';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Profile } from 'src/app/profile';
import { ProfileService } from 'src/app/services/profile.service';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { map, tap, scan, mergeMap, throttleTime } from 'rxjs/operators';

const getObservable = (collection: AngularFirestoreCollection<Task>) =>{
  const subject = new BehaviorSubject<Task[]>([]);
  collection.valueChanges({idField: 'id'}).subscribe((val: Task[])=>{
    subject.next(val)
  });
  return subject
}



@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  @ViewChild(CdkVirtualScrollViewport)
  viewport: CdkVirtualScrollViewport;

  theEnd = false;
  batch = 10;
  offset = new BehaviorSubject(null);
  infinite: Observable<any[]>;

  todo  = getObservable(this.db.collection('todo')) as Observable<Task[]>;
  inProgress = getObservable(this.db.collection('inProgress')) as Observable<Task[]>;
  done = getObservable(this.db.collection('done')) as Observable<Task[]>;
  currentId: string;
  profile: Profile;
  myuser: CurrentUser;

  constructor(private dialog: MatDialog, private db: AngularFirestore, private auth: AuthService, private profileService: ProfileService) {
    this.auth.user.subscribe(
      (user) => {this.currentId = user.uid;
        this.profileService.fetchProfileApi(this.currentId).subscribe(
          (res) => { this.profile = res },
          (error) => {
            console.error(error);
          });
      },
      (error) => { console.error(error)});

   }

  ngOnInit(): void {
  
  }

  editTask(list: 'done' | 'todo' | 'inProgress', task: Task): void {
    console.log("task",task)
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '400px',
      data: {
        task,
        enableDelete: true,
      }
    });
    dialogRef.afterClosed().subscribe((result: TaskDialogResult)=>{
     
      if(result.delete){
       this.db.collection(list).doc(task.id).delete();

      } else{
       this.db.collection(list).doc(task.id).update(task);
      }
    })
  }

  drop(event: CdkDragDrop<Task[] | any>): void {
    if (event.previousContainer === event.container) {
      return;
    }
    
    const item = event.previousContainer.data[event.previousIndex];
    this.db.firestore.runTransaction(() =>{
      const promise = Promise.all([
        this.db.collection(event.previousContainer.id).doc(item.id).delete(),
        this.db.collection(event.container.id).add(item),
      ]);
      return promise;
    })
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }

  newTask(): void{
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '400px',
      data: {
        task: {},
      },
    });
    dialogRef.afterClosed().subscribe((result: TaskDialogResult) => {
      result.task.created = new Date();
      this.db.collection('todo').add(result.task)
    })
  }

  filterTasks(){

  }

}

export interface CurrentUser{
  name: string;
  email: string;
}