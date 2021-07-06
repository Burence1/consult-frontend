import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import * as firebase from 'firebase';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import firebase from 'firebase/app';
import 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { AdditionalChatServiceService } from 'src/app/services/additional/additional-chat-service.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export const snapshotToArray = (snapshot: any) => {
  const returnArr: any[] = [];

  snapshot.forEach((childSnapshot: any) => {
    const item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });

  return returnArr;
};

@Component({
  selector: 'app-addusers',
  templateUrl: './addusers.component.html',
  styleUrls: ['./addusers.component.css']
})
export class AddusersComponent implements OnInit {

  roomForm: FormGroup | any;
  chatname = '';
  roomname = '';
  ref = firebase.database().ref('rooms/');
  matcher = new MyErrorStateMatcher();
  admin: string;
  users: Array<any>;

  username: any[]
  uid: any
  value: any
  user: any
  userName: any

  constructor(private router: Router,
    private helper: AdditionalChatServiceService,
    private db: AngularFireDatabase,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar, private Auth: AngularFireAuth) {
    this.Auth.authState.subscribe(auth => {
      if (auth !== undefined && auth !== null) {
        this.user = auth;
      }
      this.getUser().valueChanges().subscribe(a => {
        this.userName = a;
        this.chatname = this.userName.displayName
      })

      firebase.database().ref('users/').on('value', (snapshot: any) => {
        snapshot.forEach((childSnapshot: any) => {
          let childKey = childSnapshot.key;
          let childData = childSnapshot.val();
          this.username = childData.displayName
          this.uid = childKey

        });
      });
    });
  }
  getUser() {
    const userId = this.user.uid;
    const path = `/users/${userId}`;
    return this.db.object(path);
  }

  getAllUsers() {
    return firebase.database().ref('users/').once("value", snap => {
      this.users = snapshotToArray(snap)
    })
  }

  ngOnInit(): void {
    this.roomForm = this.formBuilder.group({
      'roomname': [null, Validators.required]
    });
    this.getAllUsers()
  }

  open(list: any) {
    this.helper.openDialog(list)
  }

  closeModal() {
    this.helper.closeModal()
  }

  onFormSubmit(user: any) {

    const convo = user;
    this.admin = this.chatname
    const unique = String(this.admin) + String(convo.displayName)
    convo.convoname = unique
    console.log(unique)
    
    convo.sender = this.user.uid
    convo.receiver = convo.key
    console.log(convo)
    firebase.database().ref('conversations/').orderByChild('convoname').equalTo(unique).once('value', (snapshot: any) => {
      if (snapshot.exists()) {
        this.snackBar.open('conversation already exist!', 'undo',
          {
            duration: 2000
          });

      } else {
        const newRoom = firebase.database().ref('conversations/').push();
        newRoom.set(convo);
        this.router.navigate(['/convolist']);
      }

    });
  }
}
