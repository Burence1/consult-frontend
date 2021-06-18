import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: Observable<any>;
  userEmail: any;

  constructor(private auth:AuthService) { }

  ngOnInit(): void {
    this.user = this.auth.authUser();
    this.user.subscribe(user => {
      if (user) {
        this.userEmail = user.email;
        console.log(user)
      }
    });
  }
  logout() {
    this.auth.logout();
  }

}
