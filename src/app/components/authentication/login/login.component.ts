import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private toastr: ToastrService) {}

  ngOnInit(): void {}

  // tslint:disable-next-line: typedef
  loginGoogle() {
    this.authService.googleLogin();
  }

  toastMessage(){
    this.toastr.error("Please check username and password")
  }
}
