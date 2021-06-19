import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit,Input } from '@angular/core';
import { User } from 'src/app/classes/user/user';


@Component({
  selector: 'app-user-items',
  templateUrl: './user-items.component.html',
  styleUrls: ['./user-items.component.css']
})
export class UserItemsComponent implements OnInit {
  @Input() user: User;

  constructor(private afAuth: AngularFireAuth) { }

  ngOnInit(): void {
  }

}
