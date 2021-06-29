import { Component, OnInit } from '@angular/core';
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

  todo  = getObservable(this.db.collection('todo')) as Observable<Task[]>;
  inProgress = getObservable(this.db.collection('inProgress')) as Observable<Task[]>;
  done = getObservable(this.db.collection('done')) as Observable<Task[]>;
  currentId: string;
  profile: Profile;

  constructor(private dialog: MatDialog, private db: AngularFirestore, private auth: AuthService, private profileService: ProfileService) {
    this.auth.user.subscribe(
      (user) => {
        this.currentId = user.uid;
        console.log(this.currentId);
        this.profileService.fetchProfileApi(this.currentId).subscribe(
          (res) => {
            this.profile = res;
            console.log(res);
          },
          (error) => {
            console.error(error);
          }
        );
      },
      (error) => {
        console.error(error);
      }
    );
   }

  ngOnInit(): void {
    console.log("BS",this.todo)
    // this.todo.forEach(items =>{
    //   items.forEach(item => console.log(item.dateDue.toDate()))
    // })
  }

  editTask(list: 'done' | 'todo' | 'inProgress', task: Task): void {
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
    dialogRef.afterClosed().subscribe((result: TaskDialogResult) => this.db.collection('todo').add(result.task))
  }
}