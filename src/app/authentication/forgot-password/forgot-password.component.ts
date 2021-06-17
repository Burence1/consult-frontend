import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  email: string;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line: typedef
  resetPassword(email) {
    this.auth.resetPassword(this.email)
    .then(() => this.router.navigate(['/login']));
  }

}
