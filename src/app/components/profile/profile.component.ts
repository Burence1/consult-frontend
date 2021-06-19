import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line: typedef
  signOut() {
    this.authService.logout();
  }
}
